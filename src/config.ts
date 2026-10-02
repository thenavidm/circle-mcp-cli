export type Account = {
  name: string;
  apiToken: string;
  tokenFile: string;
  authScheme: "Token" | "Bearer";
};
export type Config = {
  accounts: Account[];
  defaultAccount: string;
  readOnly: boolean;
  allowDestructive: boolean;
  auditPath: string;
  timeoutMs: number;
  maxRetries: number;
  minIntervalMs: number;
};
function integer(
  v: string | undefined,
  defaultValue: number,
  min: number,
  max: number,
): number {
  const n = v ? Number(v) : defaultValue;
  if (!Number.isInteger(n) || n < min || n > max)
    throw new Error("Invalid request timeout, retry or pacing settings.");
  return n;
}
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  let entries: Record<string, unknown>[] = [];
  if (env.CIRCLE_ACCOUNTS)
    try {
      const x = JSON.parse(env.CIRCLE_ACCOUNTS);
      if (!Array.isArray(x)) throw new Error();
      entries = x;
    } catch {
      throw new Error(
        "CIRCLE_ACCOUNTS must be a private JSON array of named accounts.",
      );
    }
  else if (env.CIRCLE_API_TOKEN || env.CIRCLE_TOKEN_FILE)
    entries = [
      {
        name: "default",
        api_token: env.CIRCLE_API_TOKEN,
        token_file: env.CIRCLE_TOKEN_FILE,
        auth_scheme: env.CIRCLE_AUTH_SCHEME,
      },
    ];
  const accounts = entries.map((x) => {
    if (
      !x ||
      typeof x !== "object" ||
      typeof x.name !== "string" ||
      !x.name.trim()
    )
      throw new Error("Every Circle account requires a unique nonempty name.");
    const authScheme = x.auth_scheme ?? "Token";
    if (!["Token", "Bearer"].includes(String(authScheme)))
      throw new Error("auth_scheme must be Token or Bearer.");
    return {
      name: x.name.trim(),
      apiToken: typeof x.api_token === "string" ? x.api_token : "",
      tokenFile: typeof x.token_file === "string" ? x.token_file : "",
      authScheme: authScheme as "Token" | "Bearer",
    };
  });
  if (new Set(accounts.map((a) => a.name)).size !== accounts.length)
    throw new Error("Circle account names must be unique.");
  return {
    accounts,
    defaultAccount: env.CIRCLE_DEFAULT_ACCOUNT ?? accounts[0]?.name ?? "",
    readOnly: /^(1|true)$/i.test(env.CIRCLE_READ_ONLY ?? ""),
    allowDestructive: !/^(0|false)$/i.test(env.CIRCLE_ALLOW_DESTRUCTIVE ?? ""),
    auditPath: env.CIRCLE_AUDIT_LOG ?? "",
    timeoutMs: integer(env.CIRCLE_REQUEST_TIMEOUT_MS, 30000, 100, 300000),
    maxRetries: integer(env.CIRCLE_MAX_RETRIES, 2, 0, 5),
    minIntervalMs: integer(env.CIRCLE_MIN_REQUEST_INTERVAL_MS, 200, 0, 10000),
  };
}
export function selectAccount(config: Config, hint?: string): Account {
  const account = config.accounts.find(
    (a) => a.name === (hint ?? config.defaultAccount),
  );
  if (!account)
    throw new Error(
      config.accounts.length
        ? "Unknown account. Run list_accounts and use its exact name."
        : "No credentials configured. Set CIRCLE_API_TOKEN or CIRCLE_TOKEN_FILE privately; run circle-cli login.",
    );
  return account;
}
