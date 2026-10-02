#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { buildServer, VERSION } from "./server.js";
import { runCli, exitCodeFor } from "./cli.js";
import { runDoctor } from "./doctor.js";
import { basename } from "node:path";
const HELP = `Circle MCP server and CLI ${VERSION}

circle-mcp                         Start local stdio MCP
circle-cli                         List task commands
circle-cli <command> --help        Current arguments
circle-cli schema <command>        Full JSON input schema
circle-cli doctor [--network]      Local configuration / community read
circle-cli login                   Private token setup instructions
circle-cli --version               Package version

CIRCLE_API_TOKEN                   Private Circle Admin API token
CIRCLE_TOKEN_FILE                  Regular private token-only file, max 64 KB
CIRCLE_AUTH_SCHEME                 Token (schema default) or explicit Bearer (quick-start prose)
CIRCLE_ACCOUNTS / _DEFAULT_ACCOUNT Named private credentials
CIRCLE_READ_ONLY=1                 Hide/refuse all writes
CIRCLE_ALLOW_DESTRUCTIVE=0         Block all writes
CIRCLE_AUDIT_LOG                   Private guard-decision log
CIRCLE_REQUEST_TIMEOUT_MS=30000; CIRCLE_MAX_RETRIES=2 (GET 429 only)
CIRCLE_MIN_REQUEST_INTERVAL_MS=200 Conservative per-account process pacing

https://github.com/thenavidm/circle-mcp-cli
`;
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];
  if (["--version", "-v"].includes(command ?? "")) {
    console.log(VERSION);
    return;
  }
  if (["--help", "-h", "help"].includes(command ?? "")) {
    process.stdout.write(HELP);
    return;
  }
  if (command === "doctor") {
    if (args.slice(1).some((a) => a !== "--network")) {
      process.exitCode = 2;
      console.error(JSON.stringify({ error: "doctor accepts only --network" }));
      return;
    }
    process.exitCode = await runDoctor(args.includes("--network"));
    return;
  }
  if (command === "login") {
    console.log(
      "In your Circle community, open Settings > Developers > Tokens and create an Admin V2 token on an eligible plan. Configure it privately as CIRCLE_API_TOKEN, or save it to an owner-only token file outside repositories and set CIRCLE_TOKEN_FILE. The pinned schema uses Token auth; quick-start prose uses Bearer. Select CIRCLE_AUTH_SCHEME=Bearer explicitly if your account requires it. No automatic fallback or write retries occur. login does not open a browser or store credentials. Then run circle-cli doctor --network. See INSTALL.md.",
    );
    return;
  }
  if (args.length || basename(process.argv[1] ?? "").startsWith("circle-cli")) {
    process.exitCode = await runCli(args);
    return;
  }
  const server = buildServer();
  await server.connect(new StdioServerTransport());
  const close = async () => {
    await server.close();
    process.exit(0);
  };
  process.on("SIGTERM", () => void close());
  process.on("SIGINT", () => void close());
}
main().catch((e) => {
  console.error(JSON.stringify({ error: e.message }));
  process.exitCode = exitCodeFor(e.message);
});
