# Install Circle MCP Server & CLI

One npm package includes both binaries and all **170 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need eligible Circle API access; Admin API token permissions apply.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | circle-cli | Scripts and agents with a shell |
| Local MCP | circle-mcp | AI clients supporting stdio |
| Desktop archive | circle-2.0.0.mcpb | Compatible Claude Desktop custom extensions |
| Circle-hosted alternative | https://app.circle.so/api/mcp | Official remote OAuth, admin Business+ eligibility |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access with Circle instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/circle-mcp-cli@latest
circle-cli --version
circle-cli
circle-cli list-spaces --help
circle-cli schema create-post
circle-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/circle-mcp-cli@latest circle-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/circle-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

### Private Admin API token

### Obtain an Admin V2 token

1. Sign in to the intended Circle community as an admin.
2. Open **Settings > Developers > Tokens**.
3. Create a token with type **Admin V2** on an eligible plan.
4. Store it only in private shell/client settings as `CIRCLE_API_TOKEN`, or use the private file route below.
5. Run `circle-cli doctor`, then `circle-cli doctor --network` for a community read.

Follow the [current quick start](https://api.circle.so/apis/admin-api/quick-start). Never use a Circle password, browser cookies, a member access token or a Google OAuth client as a substitute. The Admin API is intended for administrative integrations; member-facing experiences use the separate Headless APIs. The local package does not perform OAuth or host an authorization callback. `login` prints instructions without opening a browser or saving credentials.

### Authentication discrepancy

The pinned OpenAPI security scheme specifies `Authorization: Token AUTH_TOKEN`; the quick-start prose and examples use `Bearer`. This version defaults to **Token**, preserving the schema and existing implementation. Explicitly set `CIRCLE_AUTH_SCHEME=Bearer` if your account requires the prose's scheme. Named accounts accept `auth_scheme`. No automatic auth fallback or write resubmission occurs. Both choices need live account validation; fixture checks establish only the outgoing request shape.

The token identifies the community. Requests use the fixed HTTPS origin `app.circle.so`, with its normal Host header. No arbitrary base URL or legacy community-ID override is exposed.

### Private token file

Save only the token text in a regular file outside the checkout. Set `CIRCLE_TOKEN_FILE` to its absolute path. It takes precedence over the environment token, is limited to 64 KB, and refuses symlinks. Protect POSIX files with mode 0600 and Windows files/folders with user-only ACLs. The process caches the token in memory: restart after rotation. No automatic `.env` loader is included, and GUI clients may not inherit terminal variables.

### Plans, usage and revocation

The [official MCP](https://circle.so/mcp) is for admins on Business plans and above. [Admin API allowances](https://api.circle.so/apis/admin-api/usage-and-limits) are Business 5,000; Enterprise/Circle Plus 30,000; Circle Plus Platform 250,000 requests/month. The documented rate limit is 2,000 requests per five minutes per IP and may change. Official MCP actions, local CLI calls, retries and every retrieved page consume the same community allowance. Many 4xx responses count too; usage may appear about five minutes later. Do not treat the old January 2025 enforcement paragraph as a current grace period.

Default local pacing is 200 ms per account/process; it is not a global quota manager. Other processes and tools share limits. Revoke a token through Circle and remove private client settings to disconnect. Uninstalling npm does not revoke access or delete community data.

For a temporary private macOS/Linux shell:

```bash
export CIRCLE_API_TOKEN='YOUR_PRIVATE_ADMIN_TOKEN'
circle-cli doctor --network
```

PowerShell:

```powershell
$env:CIRCLE_API_TOKEN = 'YOUR_PRIVATE_ADMIN_TOKEN'
circle-cli doctor --network
```

### Agent-guided installation

> Help me install Circle MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not send messages or change members during setup.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user circle -- npx -y @thenavidm/circle-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Codex

~~~bash
codex mcp add circle -- npx -y @thenavidm/circle-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.circle]
command = "npx"
args = ["-y", "@thenavidm/circle-mcp-cli@latest"]
env_vars = ["CIRCLE_API_TOKEN", "CIRCLE_TOKEN_FILE", "CIRCLE_AUTH_SCHEME"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Desktop

### Install the .mcpb extension

1. Download `circle-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/circle-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private Admin token in the sensitive setting, or an absolute private token-file path. Leave the unused method empty. Set the authentication scheme to Token by default, or explicitly choose Bearer if your account requires the quick-start scheme described above.
4. Enable read-only if you want only the 66 reads. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "circle": {
      "command": "npx",
      "args": ["-y", "@thenavidm/circle-mcp-cli@latest"],
      "env": {
        "CIRCLE_API_TOKEN": "YOUR_PRIVATE_ADMIN_TOKEN",
        "CIRCLE_TOKEN_FILE": "",
        "CIRCLE_AUTH_SCHEME": "Token"
      }
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/circle-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "circle": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/circle-mcp-cli@latest"],
      "env": {
        "CIRCLE_API_TOKEN": "${env:CIRCLE_API_TOKEN}",
        "CIRCLE_TOKEN_FILE": "${env:CIRCLE_TOKEN_FILE}",
        "CIRCLE_AUTH_SCHEME": "${env:CIRCLE_AUTH_SCHEME}"
      }
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "circle-api-key", "description": "Circle Admin token (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "circle-token-file", "description": "Optional private token-file path (leave empty for Admin token)"}
  ],
  "servers": {
    "circle": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/circle-mcp-cli@latest"],
      "env": {
        "CIRCLE_API_TOKEN": "${input:circle-api-key}",
        "CIRCLE_TOKEN_FILE": "${input:circle-token-file}",
        "CIRCLE_AUTH_SCHEME": "Token"
      }
    }
  }
}
~~~

Start Circle through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Circle in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "circle": {
      "command": "npx",
      "args": ["-y", "@thenavidm/circle-mcp-cli@latest"],
      "env": {
        "CIRCLE_API_TOKEN": "YOUR_PRIVATE_ADMIN_TOKEN",
        "CIRCLE_TOKEN_FILE": "",
        "CIRCLE_AUTH_SCHEME": "Token"
      }
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the three env values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/circle-mcp-cli.git
cd circle-mcp-cli
docker build -t circle-mcp-cli .
docker run --rm -i -e CIRCLE_API_TOKEN circle-mcp-cli
```

`-e CIRCLE_API_TOKEN` forwards the shell's already configured private value. MCP needs `-i` and stdio. For file-based tokens, mount the private token file read-only and set the absolute in-container CIRCLE_TOKEN_FILE path. Host paths do not automatically exist inside a container. Forward CIRCLE_AUTH_SCHEME when explicitly configured. This package never refreshes or rewrites tokens; restart after rotation.

## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/circle-mcp-cli@latest`, stdio transport, and private local CIRCLE_API_TOKEN or CIRCLE_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use Circle's official server rather than this local stdio command.

## Verify

```bash
circle-cli doctor
circle-cli doctor --network
circle-cli tools
circle-cli schema list-members
circle-cli list-accounts --agent
```

The full server discovers 170 tools; read-only discovers 66. Help/schemas/list_accounts are local. The network doctor reads community details without returning private account details. A successful account read does not prove every endpoint's Admin permissions or plan eligibility.

To try read-only, privately set CIRCLE_READ_ONLY=1, restart/reconnect and inspect discovery. All 104 writes must disappear and direct write calls must refuse. Remove/disable the setting and reconnect only when you need writes. `CIRCLE_ALLOW_DESTRUCTIVE=0` separately blocks all 104 writes even when confirmed.

## Multiple accounts

Set private CIRCLE_ACCOUNTS JSON, which replaces the single-account variables:

```json
[{"name":"work","api_token":"YOUR_PRIVATE_WORK_ADMIN_TOKEN"},{"name":"personal","token_file":"/absolute/private/path/personal-circle.txt"}]
```

Set CIRCLE_DEFAULT_ACCOUNT=work. `circle-cli list-accounts --agent` lists labels and auth methods; `--account personal` selects another account. Keep the JSON out of public project configs. Separate server instances can provide stronger process-level isolation if needed.

## Updates and removal

```bash
npm install -g @thenavidm/circle-mcp-cli@latest
circle-cli --version
claude mcp remove --scope user circle
codex mcp remove circle
npm uninstall -g @thenavidm/circle-mcp-cli
```

Reinstall a newer desktop archive separately and restart affected clients. Remove manual client entries using its own settings. Uninstalling the package does not revoke Circle credentials, remove private token files or undo community content, invitations or workflow activity. Revoke the Admin API token in Circle when appropriate. Inspect and remove your private settings and files separately.

Pin a reviewed version instead of @latest if your automation requires reproducibility. Check [CHANGELOG.md](./CHANGELOG.md) and [GitHub Releases](https://github.com/thenavidm/circle-mcp-cli/releases) before a major update. Do not roll back by blindly publishing an older version over an existing npm version.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Missing command | Node 22+, global prefix and PATH |
| No configured account | Private CIRCLE_API_TOKEN or regular CIRCLE_TOKEN_FILE |
| GUI authentication fails | Actual private GUI environment; shell env is separate |
| Token/Bearer mismatch | Explicit CIRCLE_AUTH_SCHEME; no automatic fallback |
| 401/403 | Admin V2 token, community permissions and auth scheme, current account permissions |
| Invalid/null body | schema; use payload/payload_file for null and nested data |
| First page only | Native page/per_page and bounded all_pages with continuation metadata |
| Guard refusal | User-requested --confirm, read-only and destructive settings |
| Write timeout | Inspect account before repeating; no automatic write retries |
| Desktop host rejects extension | Compatible host/runtime and organization custom-extension policy |

See the README for the complete argument table, safety, 20 FAQs and API snapshot corrections. Secrets must never appear in a troubleshooting transcript.

## Development

```bash
git clone https://github.com/thenavidm/circle-mcp-cli.git
cd circle-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/circle-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.
