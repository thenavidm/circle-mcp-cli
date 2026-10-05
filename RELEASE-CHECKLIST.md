# Release checklist

Follow the [Bluesky](https://github.com/thenavidm/bluesky-mcp-cli) and [Firefly](https://github.com/thenavidm/firefly-mcp-cli) repo structure. Reuse the shared implementation and house terminal. Keep provider-specific facts current.

- [ ] Current primary API/authentication/permissions/limits documentation reviewed; exact snapshot and corrections recorded.
- [ ] Official account MCP, documentation MCP and official/community task CLIs compared accurately.
- [ ] Full reference README: two surfaces, features, numbered contents, every tool/argument, setup, workflows, safeguards, data, settings, troubleshooting, updates/removal, versions, accordion FAQs, questions, author, dependencies and license.
- [ ] INSTALL covers each advertised client and OS, private account setup, desktop, verification, update and removal. SKILL is included in npm.
- [ ] Build, typecheck, meaningful behavior checks and real tool discovery pass. Counts match docs; read-only and confirmations work. Distinguish fixture checks from live account results.
- [ ] Review npm dry-run contents and desktop archive; scan sanitized source history and both artifacts for secrets. Never push private legacy branches.
- [ ] Package, lockfile, desktop manifest, changelog and annotated tag agree. Correct license preserved. GitHub topics and npm keywords verified publicly.
- [ ] Tag release workflow succeeds. Public npm installation and downloaded desktop bundle report the release version and expected tool counts.
- [ ] Rendered GitHub README checked: logo, badges, terminal, contents links, contiguous argument tables and expanding FAQ answers.
- [ ] Matching full navid.me CMS guide published and read back with valid taxonomy, release links and structured accordion FAQs; page/scene verified under the site's deployment rules.
- [ ] Claude Code (every tool loaded, tool search, SKILL.md) and Codex (one task over MCP and the CLI, five runs each) are measured against the last npm release, with versions, date and usage, and published in README section 7. No invented claims.
- [ ] Record actual live-account and desktop GUI validation separately. Update release proof and programme status before moving on.
