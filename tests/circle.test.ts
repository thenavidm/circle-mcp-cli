import { describe, it, expect, vi } from "vitest";
import { mkdtemp, writeFile, symlink, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { loadConfig } from "../src/config.js";
import { CircleClient } from "../src/api/client.js";
import {
  ALL_TOOLS,
  compileAll,
  validateArguments,
  visibleTools,
} from "../src/tools/index.js";
import { createApp } from "../src/app.js";
import { connect as connectApp } from "@thenavidm/slipway/testing";
import { spawnSync } from "node:child_process";
const config = () =>
  loadConfig({
    CIRCLE_API_TOKEN: "fixture-private-value",
    CIRCLE_MIN_REQUEST_INTERVAL_MS: "0",
  });
const response = (
  value: unknown,
  status = 200,
  headers: Record<string, string> = {},
) =>
  new Response(status === 204 ? null : JSON.stringify(value), {
    status,
    headers,
  });
const tool = (name: string) => ALL_TOOLS.find((t) => t.name === name)!;
const invoke = async (
  name: string,
  args: Record<string, unknown>,
  fetcher: typeof fetch,
) => {
  const t = tool(name);
  validateArguments(t, args);
  return await t.handler(args, new CircleClient(config(), fetcher));
};
// The real Slipway server with an injected client. The write policy comes from the environment, as it does in
// use, and a call to a hidden tool is a protocol error rather than a tool result; both are refusals a client sees.
async function connect(c = config(), fetcher: typeof fetch = vi.fn() as any) {
  const mcp = await connectApp(createApp({ context: () => ({ config: c, client: new CircleClient(c, fetcher) }) }), {
    env: { CIRCLE_API_TOKEN: "fixture-value", ...(c.readOnly ? { CIRCLE_READ_ONLY: "1" } : {}), ...(c.allowDestructive ? {} : { CIRCLE_ALLOW_DESTRUCTIVE: "0" }) },
  });
  const client = {
    listTools: async () => ({ tools: await mcp.listTools() }),
    callTool: async ({ name, arguments: args }: { name: string; arguments: Record<string, unknown> }): Promise<any> => {
      try {
        return await mcp.callTool(name, args);
      } catch (error) {
        return { isError: true, content: [{ type: "text", text: JSON.stringify({ error: (error as Error).message }) }] };
      }
    },
  };
  return { client, close: () => mcp.close() };
}
// Slipway's errors are JSON; an argument the MCP SDK rejects first comes back as its own plain text.
const readError = (x: any) => {
  try {
    return JSON.parse(x.content[0].text).error;
  } catch {
    return x.content[0].text;
  }
};
describe("Shared Circle routes and private transport", () => {
  it("compiles every input and body schema with the native validator", () => expect(compileAll()).toBeGreaterThan(ALL_TOOLS.length));
  it("uses current v2 member/post routes and Token auth", async () => {
    const f = vi.fn(async (url: any, init: any) => {
      expect(String(url)).toBe("https://app.circle.so/api/admin/v2/posts/19");
      expect(init.headers.Authorization).toBe("Token fixture-private-value");
      expect(init.redirect).toBe("error");
      return response({ id: 19 });
    });
    expect(await invoke("get_post", { post_id: 19 }, f)).toEqual({ id: 19 });
  });
  it("selects explicit Bearer auth without fallback", async () => {
    const c = loadConfig({
      CIRCLE_API_TOKEN: "fixture-private-value",
      CIRCLE_AUTH_SCHEME: "Bearer",
    });
    const f = vi.fn(async (_u: any, i: any) => {
      expect(i.headers.Authorization).toBe("Bearer fixture-private-value");
      return response({}, 401);
    });
    await expect(
      new CircleClient(c, f).request("GET", "/api/admin/v2/community"),
    ).rejects.toThrow("401");
    expect(f).toHaveBeenCalledTimes(1);
  });
  it("refuses untrusted routes before fetching", async () => {
    const f = vi.fn();
    for (const path of [
      "https://evil.example/api/admin/v2/posts",
      "/api/admin/v2/../posts",
      "/api/admin/v2/posts/a%2Fb",
    ])
      await expect(
        new CircleClient(config(), f).request("GET", path),
      ).rejects.toThrow("Unsupported");
    expect(f).not.toHaveBeenCalled();
  });
  it("serializes documented comma-separated arrays and deepObject filters", async () => {
    const f = vi.fn(async (url: any) => {
      const u = new URL(url);
      expect(u.searchParams.get("member_tag_ids")).toBe("3,4");
      return response({ records: [] });
    });
    await invoke("list_members", { member_tag_ids: [3, 4] }, f);
    const g = vi.fn(async (url: any) => {
      const u = new URL(url);
      expect(u.searchParams.getAll("filters[space_ids][]")).toEqual(["3", "4"]);
      expect(u.searchParams.get("filters[author_name]")).toBe("Ann");
      return response({ records: [] });
    });
    await invoke(
      "search",
      {
        query: "Fixture",
        filters: { space_ids: ["3", "4"], author_name: "Ann" },
      },
      g,
    );
  });
  it("defaults a confirmed post request to draft and preserves nested Tiptap nodes", async () => {
    const f = vi.fn(async (_u: any, i: any) => {
      const b = JSON.parse(i.body);
      expect(b.status).toBe("draft");
      expect(b.tiptap_body.body.content[0].content[0].text).toBe("Hello");
      return response({ id: 19 });
    });
    await invoke(
      "create_post",
      {
        space_id: 7,
        name: "Fixture",
        tiptap_body: {
          body: {
            type: "doc",
            content: [
              { type: "paragraph", content: [{ type: "text", text: "Hello" }] },
            ],
          },
        },
      },
      f,
    );
  });
  it("validates required body fields, positive IDs and local paging bounds", async () => {
    const f = vi.fn();
    await expect(
      invoke("create_post", { name: "No space" }, f),
    ).rejects.toThrow("space_id");
    expect(() => validateArguments(tool("get_post"), { post_id: 0 })).toThrow();
    expect(() =>
      validateArguments(tool("list_posts"), { per_page: 101 }),
    ).toThrow();
    expect(f).not.toHaveBeenCalled();
  });
  it("enforces message recipient oneOf before any network write", async () => {
    const f = vi.fn();
    await expect(invoke("send_message", {}, f)).rejects.toThrow();
    expect(f).not.toHaveBeenCalled();
  });
  it("does not retry rate-limited or unknown-outcome writes", async () => {
    const f = vi.fn(async () => response({}, 429));
    await expect(
      new CircleClient(config(), f, vi.fn()).request(
        "POST",
        "/api/admin/v2/posts",
        [],
        { name: "X" },
      ),
    ).rejects.toThrow("429");
    expect(f).toHaveBeenCalledTimes(1);
    const g = vi.fn(async () => {
      throw new Error("network");
    });
    await expect(
      new CircleClient(config(), g).request("POST", "/api/admin/v2/posts"),
    ).rejects.toThrow("outcome may be unknown");
    expect(g).toHaveBeenCalledTimes(1);
  });
  it("retries bounded GET 429 with Retry-After", async () => {
    const f = vi
      .fn()
      .mockResolvedValueOnce(response({}, 429, { "retry-after": "1" }))
      .mockResolvedValueOnce(response({ id: 1 }));
    const sleep = vi.fn(async () => {});
    expect(
      await new CircleClient(config(), f, sleep).request(
        "GET",
        "/api/admin/v2/community",
      ),
    ).toEqual({ id: 1 });
    expect(f).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledWith(1000);
  });
  it("does not shorten a long server Retry-After and retry too early", async () => {
    const f = vi.fn(async () => response({}, 429, { "retry-after": "60" }));
    const sleep = vi.fn();
    await expect(
      new CircleClient(config(), f, sleep).request(
        "GET",
        "/api/admin/v2/community",
      ),
    ).rejects.toThrow("429");
    expect(f).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });
  it("redacts token values and sensitive fields from reflected errors/results", async () => {
    const c = new CircleClient(
      config(),
      vi.fn(async () =>
        response({ error: "fixture-private-value denied" }, 403),
      ),
    );
    await expect(c.request("GET", "/api/admin/v2/community")).rejects.toThrow(
      "[redacted]",
    );
    expect(
      c.sanitize({
        api_token: "anything",
        password: "p",
        note: "fixture-private-value",
      }),
    ).toEqual({
      api_token: "[redacted]",
      password: "[redacted]",
      note: "[redacted]",
    });
  });
  it("reads a private token file and refuses symlinks", async () => {
    const dir = await mkdtemp(join(tmpdir(), "circle-test-"));
    try {
      const path = join(dir, "token");
      await writeFile(path, "fixture-file-value\n", { mode: 0o600 });
      await symlink(path, join(dir, "link"));
      const c = loadConfig({ CIRCLE_TOKEN_FILE: path });
      const f = vi.fn(async (_u: any, i: any) => {
        expect(i.headers.Authorization).toBe("Token fixture-file-value");
        return response({ note: "fixture-file-value" });
      });
      const client = new CircleClient(c, f);
      expect(
        client.sanitize(await client.request("GET", "/api/admin/v2/community")),
      ).toEqual({ note: "[redacted]" });
      await expect(
        new CircleClient(
          loadConfig({ CIRCLE_TOKEN_FILE: join(dir, "link") }),
          f,
        ).request("GET", "/api/admin/v2/community"),
      ).rejects.toThrow("regular");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
  it("refuses mixed payload fields and malformed/symlink body files", async () => {
    const f = vi.fn();
    await expect(
      invoke(
        "create_post",
        { space_id: 7, name: "X", payload: { space_id: 7, name: "X" } },
        f,
      ),
    ).rejects.toThrow("without mixing");
    const dir = await mkdtemp(join(tmpdir(), "circle-body-"));
    try {
      const file = join(dir, "body");
      await writeFile(file, '{"space_id":7,"name":"X"}');
      await symlink(file, join(dir, "link"));
      await expect(
        invoke("create_post", { payload_file: join(dir, "link") }, f),
      ).rejects.toThrow("regular");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
    expect(f).not.toHaveBeenCalled();
  });
  it("allows documented empty-body workflow actions and query-based removal", async () => {
    const f = vi.fn(async (url: any, i: any) => {
      if (i.method === "PUT") expect(i.body).toBeUndefined();
      else {
        expect(i.body).toBeUndefined();
        expect(new URL(url).searchParams.get("email")).toBe(
          "fixture@example.invalid",
        );
      }
      return response({}, 204);
    });
    await invoke(
      "activate_workflow",
      { id: "00000000-0000-0000-0000-000000000005" },
      f,
    );
    await invoke(
      "remove_from_access_group",
      { access_group_id: 8, email: "fixture@example.invalid" },
      f,
    );
  });
  it("bounds native pagination and preserves continuation when the cap splits a page", async () => {
    const f = vi.fn(async (url: any) => {
      const u = new URL(url);
      const page = Number(u.searchParams.get("page"));
      expect(u.searchParams.get("per_page")).toBe("2");
      return response({
        page,
        per_page: 2,
        has_next_page: page < 3,
        records: page === 1 ? [{ id: 1 }, { id: 2 }] : [{ id: 3 }, { id: 4 }],
      });
    });
    const result = (await invoke(
      "list_members",
      { all_pages: true, max_items: 3, per_page: 2 },
      f,
    )) as any;
    expect(result.records.map((x: any) => x.id)).toEqual([1, 2, 3]);
    expect(result.resume).toEqual({ page: 2, per_page: 2, skip: 1 });
    expect(result.truncated).toBe(true);
    expect(f).toHaveBeenCalledTimes(2);
  });
  it("stops at the end and refuses repeated quota-consuming pages", async () => {
    const f = vi.fn(async () =>
      response({ page: 1, has_next_page: false, records: [{ id: 1 }] }),
    );
    const r = (await invoke("list_members", { all_pages: true }, f)) as any;
    expect(r.truncated).toBe(false);
    expect(r.resume).toBe(null);
    const g = vi.fn(async (url: any) =>
      response({
        page: Number(new URL(url).searchParams.get("page")),
        has_next_page: true,
        records: [{ id: 1 }],
      }),
    );
    await expect(
      invoke("list_members", { all_pages: true }, g),
    ).rejects.toThrow("repeated");
    expect(g).toHaveBeenCalledTimes(2);
  });
  it("exposes paging only on documented page/per_page reads", () => {
    expect(tool("list_members").inputSchema.properties.all_pages).toBeDefined();
    expect(
      tool("get_community").inputSchema.properties.all_pages,
    ).toBeUndefined();
  });
  it("rejects duplicate labels and auth scheme settings without printing credentials", () => {
    expect(() =>
      loadConfig({ CIRCLE_ACCOUNTS: '[{"name":"work"},{"name":"work"}]' }),
    ).toThrow("unique");
    expect(() =>
      loadConfig({
        CIRCLE_API_TOKEN: "fixture-value",
        CIRCLE_AUTH_SCHEME: "invalid",
      }),
    ).toThrow("auth_scheme");
  });
});

function fixture(schema: any): any {
  if (schema.enum) return schema.enum.find((v: any) => v !== null);
  if (schema.anyOf)
    return fixture(
      schema.anyOf.find((s: any) => s.type !== "null") ?? schema.anyOf[0],
    );
  const type = Array.isArray(schema.type)
    ? schema.type.find((t: any) => t !== "null")
    : schema.type;
  if (type === "object" || schema.properties) {
    const keys = new Set([
      ...(schema.required ?? []),
      ...(schema.oneOf?.[0]?.required ?? []),
    ]);
    return Object.fromEntries(
      [...keys].map((k) => [k, fixture(schema.properties?.[k] ?? {})]),
    );
  }
  if (type === "array")
    return Array.from({ length: Math.max(1, schema.minItems ?? 0) }, () =>
      fixture(schema.items ?? {}),
    );
  if (type === "integer" || type === "number")
    return Math.max(1, schema.minimum ?? 0);
  if (type === "boolean") return true;
  if (schema.format === "uuid") return "00000000-0000-0000-0000-000000000005";
  if (schema.format === "date-time") return "2026-10-02T12:00:00Z";
  return "fixture";
}

describe("Actual shared MCP and CLI protocol", () => {
  it("discovers 170 tools with 66 reads and 104 confirmation-gated writes", async () => {
    const c = await connect(loadConfig({}));
    try {
      const { tools } = await c.client.listTools();
      expect(tools).toHaveLength(170);
      expect(tools.filter((t) => t.annotations?.readOnlyHint)).toHaveLength(66);
      expect(tools.filter((t) => t.annotations?.destructiveHint)).toHaveLength(
        104,
      );
      expect(new Set(tools.map((t) => t.name)).size).toBe(170);
      expect(tools.every((t) => t.name.length <= 128)).toBe(true);
    } finally {
      await c.close();
    }
  });
  it("hides writes and refuses calls to hidden tools before fetching", async () => {
    const f = vi.fn();
    const c = await connect(
      loadConfig({ CIRCLE_API_TOKEN: "fixture-value", CIRCLE_READ_ONLY: "1" }),
      f,
    );
    try {
      expect((await c.client.listTools()).tools).toHaveLength(66);
      const r = await c.client.callTool({
        name: "create_post",
        arguments: { space_id: 7, name: "X", confirm: true },
      });
      expect(r.isError).toBe(true);
      expect(readError(r)).toMatch(/READ_ONLY|not found/);
      expect(f).not.toHaveBeenCalled();
    } finally {
      await c.close();
    }
  });
  it("guards every one of the 104 writes before any network request", async () => {
    const f = vi.fn();
    const c = await connect(config(), f);
    try {
      for (const t of ALL_TOOLS.filter((t) => t.risk !== "read")) {
        const args = fixture(t.inputSchema);
        const r = await c.client.callTool({ name: t.name, arguments: args });
        expect(r.isError, t.name).toBe(true);
        expect(readError(r), t.name).toContain("confirm: true");
      }
      expect(f).not.toHaveBeenCalled();
    } finally {
      await c.close();
    }
  });
  it("requires confirmation even when a write has valid arguments", async () => {
    const f = vi.fn();
    const c = await connect(config(), f);
    try {
      const r = await c.client.callTool({
        name: "create_post",
        arguments: { space_id: 7, name: "X" },
      });
      expect(r.isError).toBe(true);
      expect(readError(r)).toContain("confirm: true");
      expect(f).not.toHaveBeenCalled();
    } finally {
      await c.close();
    }
  });
  it("lists account labels without token values or file paths", async () => {
    const c = await connect(
      loadConfig({
        CIRCLE_ACCOUNTS:
          '[{"name":"work","api_token":"fixture-value"},{"name":"personal","token_file":"/private/fixture/path"}]',
      }),
    );
    try {
      const r = await c.client.callTool({
        name: "list_accounts",
        arguments: {},
      });
      const s = JSON.stringify(r);
      expect(s).toContain("personal");
      expect(s).not.toContain("fixture-value");
      expect(s).not.toContain("/private/fixture/path");
    } finally {
      await c.close();
    }
  });
  it("uses real CLI schemas/help and config/guard exit codes", () => {
    const env = Object.fromEntries(
      Object.entries(process.env).filter(([k]) => !k.startsWith("CIRCLE_")),
    );
    const run = (args: string[]) =>
      spawnSync(process.execPath, ["dist/index.js", ...args], {
        env,
        encoding: "utf8",
      });
    const s = run(["schema", "get-post"]);
    expect(s.status).toBe(0);
    expect(JSON.parse(s.stdout).required).toContain("post_id");
    expect(run(["get-post", "--help"]).stdout).toContain("--post-id");
    expect(run(["get-community", "--agent"]).status).toBe(10);
    expect(
      run(["create-post", "--space-id", "7", "--name", "X", "--agent", "--yes"])
        .status,
    ).toBe(2);
    expect(
      run(["create-post", "--name", "X", "--confirm", "--agent"]).status,
    ).toBe(2);
    // Five real launches: about a second each on a Windows runner, past the 5 s default.
  }, 30_000);
});

// A required request body is independent of whether the upstream object marks fields required.
it("preserves the upstream required JSON body and sends an explicit empty object", async () => {
  const f = vi.fn(async (_u: any, init: any) => {
    expect(init.body).toBe("{}");
    expect(init.headers["Content-Type"]).toBe("application/json");
    return response({ id: 1 });
  });
  await expect(invoke("create_member_tag", {}, f)).rejects.toThrow("requires a JSON body");
  expect(f).not.toHaveBeenCalled();
  await expect(invoke("create_member_tag", { payload: {} }, f)).resolves.toEqual({ id: 1 });
  expect(f).toHaveBeenCalledTimes(1);
});
