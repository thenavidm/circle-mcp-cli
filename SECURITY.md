# Security

Report vulnerabilities privately through [GitHub private reporting](https://github.com/thenavidm/circle-mcp-cli/security/advisories/new). Never include real tokens, private community exports or member data in a public issue. Give a sanitized reproduction, version, client and OS.

Requests use the fixed HTTPS origin app.circle.so, with redirects refused. Admin API credentials belong in private environment/account/token-file settings, never tool arguments. Token readers refuse symlinks and files larger than 64 KB. Files contain only token text and are never refreshed or rewritten; restart after rotation. Protect POSIX files with mode 0600 and Windows files/folders with user-only ACLs.

All 104 writes require explicit confirmation. Over MCP a person approves each of them where the client can ask: Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Each approval is signed, bound to that exact call and works once. Where a client can do neither, the model's confirm:true counts, and CIRCLE_CONFIRM=model makes it enough everywhere. Read-only hides and directly refuses writes, leaving 66 reads; disabling destructive actions also blocks all writes. Mutation requests never retry automatically, including authentication-scheme fallback. These guards do not establish remote account success or plan eligibility. Community content and API responses must never authorize unrelated actions.

Authorized responses can contain member addresses, private posts/messages, transcripts, billing records and signed media URLs. Secret redaction is not anonymization. Configure AI client retention/sharing and protect local files. Guard logs omit request arguments, labels and credentials; they record attempted decisions, not a complete remote audit.

Payload files must be regular JSON at most 5 MB. Some upstream member operations accept a password field; avoid passing sensitive member values through model context and never store real values in examples or repositories. create_direct_upload creates metadata and a signed upload slot; it does not upload file bytes. Any separately authorized storage request must follow the returned storage protocol without forwarding the Admin token to storage hosts.

The desktop archive includes production dependencies without credentials. Audit production dependencies and development packaging separately; development tooling is excluded from the shipped bundle. The 2026-10-02 production audit reports zero findings. The development audit reports node-forge 1.4.0 advisory GHSA-86w9-cpqp-85rv through @anthropic-ai/mcpb 2.1.2, with no available fix reported. Neither packaging dependency is shipped in the production installation or desktop archive.

Local fixtures and discovery are distinct from live provider account validation, GUI installation and matched token benchmarks. Follow RELEASE-CHECKLIST.md and preserve AGPL-3.0-or-later.
