import { readFile, lstat } from "node:fs/promises";
import { selectAccount, type Account, type Config } from "../config.js";
import { CircleError, UsageError } from "./errors.js";
export type Json = Record<string, any>;
export type QueryParam = {
  name: string;
  value: unknown;
  style?: string;
  explode?: boolean;
};
export class CircleClient {
  private tokens = new Map<string, string>();
  private schedules = new Map<string, Promise<void>>();
  private nextAt = new Map<string, number>();
  constructor(
    readonly config: Config,
    private readonly fetcher: typeof fetch = fetch,
    private readonly sleep: (ms: number) => Promise<void> = (ms) =>
      new Promise((r) => setTimeout(r, ms)),
  ) {}
  redactText(text: string): string {
    const secrets = [
      ...this.config.accounts.map((a) => a.apiToken),
      ...this.tokens.values(),
    ]
      .filter(Boolean)
      .sort((a, b) => b.length - a.length);
    for (const secret of secrets) text = text.split(secret).join("[redacted]");
    return text;
  }
  sanitize(value: unknown): unknown {
    if (typeof value === "string") return this.redactText(value);
    if (Array.isArray(value)) return value.map((v) => this.sanitize(v));
    if (value && typeof value === "object")
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [
          k,
          /^(password|secret|signing_secret|api_token|api_key|access_token|refresh_token)$/i.test(
            k,
          )
            ? "[redacted]"
            : this.sanitize(v),
        ]),
      );
    return value;
  }
  private async token(account: Account): Promise<string> {
    if (this.tokens.has(account.name)) return this.tokens.get(account.name)!;
    let token = account.apiToken;
    if (account.tokenFile)
      try {
        const stat = await lstat(account.tokenFile);
        if (!stat.isFile() || stat.size > 65536) throw new Error();
        token = (await readFile(account.tokenFile, "utf8")).trim();
      } catch {
        throw new CircleError(
          "Cannot read the private Circle token file; use a regular token-only file, at most 64 KB.",
          0,
          "CONFIG",
        );
      }
    if (!token || /[\r\n]/.test(token))
      throw new CircleError(
        "No valid API token configured for the selected account. Run circle-cli login.",
        0,
        "CONFIG",
      );
    this.tokens.set(account.name, token);
    return token;
  }
  private async pace(account: Account): Promise<void> {
    const previous = this.schedules.get(account.name) ?? Promise.resolve();
    const next = previous
      .catch(() => {})
      .then(async () => {
        const delay = Math.max(
          0,
          (this.nextAt.get(account.name) ?? 0) - Date.now(),
        );
        if (delay) await this.sleep(delay);
        this.nextAt.set(account.name, Date.now() + this.config.minIntervalMs);
      });
    this.schedules.set(account.name, next);
    await next;
  }
  async request(
    method: string,
    path: string,
    query: QueryParam[] = [],
    body?: Json,
    accountHint?: string,
  ): Promise<Json> {
    if (
      !/^\/api\/admin\/v2\/[a-zA-Z0-9_%./-]+$/.test(path) ||
      path.includes("..") ||
      /%2f|%5c/i.test(path)
    )
      throw new UsageError("Unsupported Circle Admin API v2 path.");
    const account = selectAccount(this.config, accountHint);
    const token = await this.token(account);
    const url = new URL(path, "https://app.circle.so");
    const appendDeep = (key: string, v: unknown): void => {
      if (v === undefined) return;
      if (Array.isArray(v)) {
        for (const item of v) appendDeep(key + "[]", item);
      } else if (v && typeof v === "object") {
        for (const [k, x] of Object.entries(v)) appendDeep(`${key}[${k}]`, x);
      } else url.searchParams.append(key, String(v));
    };
    for (const p of query) {
      const v = p.value;
      if (v === undefined || v === null) continue;
      if (p.style === "deepObject") appendDeep(p.name, v);
      else if (Array.isArray(v)) {
        if (p.explode === false)
          url.searchParams.set(
            p.name,
            v.join(
              p.style === "pipeDelimited"
                ? "|"
                : p.style === "spaceDelimited"
                  ? " "
                  : ",",
            ),
          );
        else for (const x of v) url.searchParams.append(p.name, String(x));
      } else if (typeof v === "object")
        throw new UsageError(
          "Object query parameters require documented deepObject serialization.",
        );
      else url.searchParams.set(p.name, String(v));
    }
    const encoded = body === undefined ? undefined : JSON.stringify(body);
    if (encoded && Buffer.byteLength(encoded) > 5 * 1024 * 1024)
      throw new UsageError("Request JSON exceeds the 5 MB local cap.");
    for (let attempt = 0; ; attempt++) {
      await this.pace(account);
      let response: Response;
      try {
        response = await this.fetcher(url, {
          method,
          redirect: "error",
          signal: AbortSignal.timeout(this.config.timeoutMs),
          headers: {
            Authorization: `${account.authScheme} ${token}`,
            Accept: "application/json",
            ...(encoded ? { "Content-Type": "application/json" } : {}),
          },
          ...(encoded ? { body: encoded } : {}),
        });
      } catch {
        throw new CircleError(
          method === "GET"
            ? "Circle request failed or timed out."
            : "Circle write failed or timed out; its outcome may be unknown. Inspect community state before repeating it.",
          0,
          "NETWORK",
        );
      }
      if (
        method === "GET" &&
        response.status === 429 &&
        attempt < this.config.maxRetries
      ) {
        const raw = response.headers.get("retry-after");
        const ms =
          raw === null
            ? 1000
            : Number.isFinite(Number(raw))
              ? Number(raw) * 1000
              : Date.parse(raw) - Date.now();
        if (Number.isFinite(ms) && ms >= 0 && ms <= 10000) {
          await response.body?.cancel();
          await this.sleep(Math.max(ms, 100));
          continue;
        }
      }
      const text = await response.text();
      if (!response.ok) {
        let detail = "";
        try {
          const x = JSON.parse(text);
          detail = JSON.stringify(
            this.sanitize(x.errors ?? x.error ?? x.message ?? ""),
          );
        } catch {}
        throw new CircleError(
          this.redactText(
            `Circle API ${response.status}${detail ? ": " + detail.slice(0, 1000) : ""}`,
          ),
          response.status,
          response.status === 429
            ? "RATE_LIMIT"
            : response.status === 401 || response.status === 403
              ? "AUTH"
              : "API_ERROR",
        );
      }
      if (!text) return { success: true };
      try {
        return JSON.parse(text) as Json;
      } catch {
        throw new CircleError(
          "Circle returned a non-JSON response.",
          0,
          "API_ERROR",
        );
      }
    }
  }
}
