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

MCP and CLI use the same SDK server, schemas, validation and HTTP handlers. The CLI talks to that server through the SDK's in-memory transport; there is no second API implementation.

| Measurement | What to include |
| --- | --- |
| Eager MCP loading | All tool schemas and instructions |
| Default/deferred tool search | Actual selected schemas and discovery overhead |
| Skill read once | Full SKILL.md and command discovery |
| Recurring skill discovery | The installed skill's listing text |
| Matched successful task | Help/schema, reasoning, calls/commands, results, errors and retries |

Fresh usage measurements are pending. Do not estimate tokens from characters, substitute another repo's results or declare zero CLI cost. Record model/client/package versions and date, loading settings, input/output usage, latency and equivalent outcomes. Compare a small member/space query and repeated focused administration across supported official/local surfaces, using the same authorized data and result fields. API quota and service costs remain separate. No measured superiority is claimed.



The pinned OpenAPI security scheme specifies `Authorization: Token AUTH_TOKEN`; the quick-start prose and examples use `Bearer`. This version defaults to **Token**, preserving the schema and existing implementation. Explicitly set `CIRCLE_AUTH_SCHEME=Bearer` if your account requires the prose's scheme. Named accounts accept `auth_scheme`. No automatic auth fallback or write resubmission occurs. Both choices need live account validation; fixture checks establish only the outgoing request shape.

The token identifies the community. Requests use the fixed HTTPS origin `app.circle.so`, with its normal Host header. No arbitrary base URL or legacy community-ID override is exposed.



Community comparisons above are documentation-level scope checks, not executed competitor handshakes or tested account outcomes. No competitor counts are used to claim superiority.
