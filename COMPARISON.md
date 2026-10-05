# Circle comparisons

Checked October 2, 2026. API snapshot and source changes are pinned in src/tools/api-source.json.

| Offering | Surface | Scope and tradeoff |
| --- | --- | --- |
| [Official Circle MCP](https://api.circle.so/mcp) | Hosted OAuth MCP, https://app.circle.so/api/mcp | Broad Admin API v2 actions, admin Business+, read-only/full access, hosted setup; requests consume quota |
| This implementation | Local stdio MCP + shared task CLI + desktop bundle | Pinned v2 operations, private named tokens, schema-derived commands/JSON, bounded pages and explicit write guards; token setup and local maintenance |
| [iamnortey/circle-mcp](https://github.com/iamnortey/circle-mcp) | Community MCP | Documents community audits, unanswered questions and onboarding workflows; inspect the pinned source rather than inferring behavior from README |
| [DeepakChander/circle-mcp](https://github.com/DeepakChander/circle-mcp) | Community local/HTTP MCP | Documents separate Member and Admin API layers plus Google OAuth/HTTP; different deployment and identity requirements |

No dedicated Circle-published task CLI was identified in the official developer/MCP pages reviewed on October 2, 2026. This is a scoped finding, not proof of absence. Claude Code setup commands in MCP docs are MCP registration, not a Circle administration CLI. Neither our operation count nor a community README count proves broader capability, reliability or token savings. This release does not provide the separate Member API or Google authentication.

Current primary references: [Admin API](https://api.circle.so/apis/admin-api), [quick start](https://api.circle.so/apis/admin-api/quick-start), [limits](https://api.circle.so/apis/admin-api/usage-and-limits), [official OpenAPI](https://api-headless.circle.so/api/admin/v2/swagger.yaml), [official MCP](https://api.circle.so/mcp). See COMPARISON.md for review scope and pending evidence.

MCP and CLI are built by [Slipway](https://github.com/thenavidm/slipway) from each tool's one definition, so they share schemas, validation and HTTP handlers; there is no second API implementation.

README section 7 has this package's own costs, measured in Claude Code and Codex against 2.0.1 on 2026-10-05. Do not estimate tokens from characters or substitute another repo's results; no other offering was measured, and API quota and service costs remain separate.



The pinned OpenAPI security scheme specifies `Authorization: Token AUTH_TOKEN`; the quick-start prose and examples use `Bearer`. This version defaults to **Token**, preserving the schema and existing implementation. Explicitly set `CIRCLE_AUTH_SCHEME=Bearer` if your account requires the prose's scheme. Named accounts accept `auth_scheme`. No automatic auth fallback or write resubmission occurs. Both choices need live account validation; fixture checks establish only the outgoing request shape.

The token identifies the community. Requests use the fixed HTTPS origin `app.circle.so`, with its normal Host header. No arbitrary base URL or legacy community-ID override is exposed.



Community comparisons above are documentation-level scope checks, not executed competitor handshakes or tested account outcomes. No competitor counts are used to claim superiority.
