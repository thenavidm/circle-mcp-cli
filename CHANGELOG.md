# Changelog

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.14. The 170 tools keep their names and arguments, and every difference below was measured against 2.0.1, the last version on npm, before release.

- **A smaller tool list.** Many write bodies appeared twice, as their own fields and inside `payload`; 3.0.0 writes each repeated part once under `$defs`, and nothing is lost: Claude Code and Codex both read fields that appear only there, and validation still checks the full schema. Every tool loaded costs 84,415 tokens in Claude Code instead of 93,800; with tool search, its default, 2,499 as before.
- **A person approves each write over MCP.** All 104 writes still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `CIRCLE_CONFIRM=model` makes it enough everywhere. The audit log records who approved each write.
- **`CIRCLE_ALLOW_DESTRUCTIVE=0` still refuses every write**, confirmed or not, as 2.0 did.
- **Circle's status picks the exit code.** A request Circle rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 429 7, a server error 5, and an unknown account or nothing configured 10. 1 now means an unexpected error.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that refunds a member's charge took a median of 82,915 input tokens over the CLI instead of 86,128 (five runs each), because Codex asked `which` instead of reading the full command list.
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`circle-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **Less work to start.** Each input and body schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 218 ms of CPU before its first answer where 2.0.1 spent 581, and answers in 138 ms of wall time instead of 304 (median of 21 runs, taking turns on one busy Mac). npx installs 10 dependencies instead of 94. A test still compiles every schema.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were pending; the settings table lists Slipway's own settings; and the version history has 3.0.0.

### Upgrading

Over MCP, expect an approval prompt or form before any write; a headless agent that should write with `confirm: true` alone needs `CIRCLE_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error's JSON keeps `error` and `status`; its `code` is now Slipway's (`usage`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`). Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `CIRCLE_READ_ONLY=1`, a client that calls a hidden write gets "tool not found" instead of a refusal naming `CIRCLE_READ_ONLY`; the CLI still names it. The audit log's lines gain `confirmed_by`, and each allowed write is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `CIRCLE_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 168 tokens, for `which`, `install`, the flags and the exit codes it now lists; the command list by 15; and a missing argument's error by 13, for its code and a hint. `SKILL.md` is 37 tokens longer in Claude Code, because it says how approval works over MCP.

## 2.0.1, 2026-10-04

- **`npx -y @thenavidm/circle-mcp-cli` starts the MCP server whatever order npm keeps.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order. For this package that happened to be the server; for 23 others it was the CLI. A third binary named after the package, on its own file, now always starts the server, and npx picks it by name.

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

## 2.0.0 - 2026-10-02

- Pin current Circle Admin API v2 schema: 169 API operations plus list_accounts; 170 tools, 66 reads, 104 writes.
- Add shared MCP/CLI, current schemas and parameter serialization, private named tokens/files, draft-first posts, explicit write confirmation, bounded page/per_page retrieval and production-only desktop packaging.
- Add full house README with all arguments, client/OS INSTALL, accordion FAQs, comparisons, version history, tags/topics/keywords and maintenance checklist.
- Retain AGPL-3.0-or-later. Private credentials and legacy history are not part of the public release.

### Migration from 1.0.0

Existing tool names remain where current operations exist. Arguments and routes need migration: posts use /posts with space_id input, comments use /comments with post_id input, memberships and attendees use current top-level resources, and workflows require UUIDs. Unsupported v1-only like/unlike helpers are omitted. CIRCLE_COMMUNITY_ID is no longer used. Legacy HTML/body shortcuts are not silently converted to Tiptap. See README.md section 19 and the discovered schemas for migration details. Preserve the existing AGPL license.



### Legacy tool names

The legacy tools array declares 62 tools. This mapping records names, not compatibility of old arguments. Inspect the current schema for every retained or renamed command.

| Legacy name | Current name | Migration |
| --- | --- | --- |
| `get_community` | `get_community` | Current v2 route and arguments; inspect schema. |
| `update_community` | `update_community` | Use current top-level body fields rather than a settings wrapper. |
| `list_members` | `list_members` | Current v2 route and arguments; inspect schema. |
| `get_member` | `get_member` | Current v2 route and arguments; inspect schema. |
| `create_member` | `create_member` | Current v2 route and arguments; inspect schema. |
| `update_member` | `update_member` | Current v2 route and arguments; inspect schema. |
| `remove_member` | `remove_member` | Deactivates; hard deletion is the distinct delete_community_member operation. |
| `search_member` | `search_member` | Current v2 route and arguments; inspect schema. |
| `list_spaces` | `list_spaces` | Current v2 route and arguments; inspect schema. |
| `get_space` | `get_space` | Current v2 route and arguments; inspect schema. |
| `create_space` | `create_space` | Current v2 route and arguments; inspect schema. |
| `update_space` | `update_space` | Current v2 route and arguments; inspect schema. |
| `delete_space` | `delete_space` | Current v2 route and arguments; inspect schema. |
| `list_space_members` | `list_space_members` | Current v2 route and arguments; inspect schema. |
| `add_space_member` | `add_space_member` | Current v2 route and arguments; inspect schema. |
| `remove_space_member` | `remove_space_member` | Current v2 route and arguments; inspect schema. |
| `list_posts` | `list_posts` | Supply space_id as a query parameter on the top-level posts route. |
| `get_post` | `get_post` | Current v2 route and arguments; inspect schema. |
| `create_post` | `create_post` | Use current Tiptap body; defaults to draft. |
| `update_post` | `update_post` | Use current body/status schema; no automatic HTML conversion. |
| `delete_post` | `delete_post` | Current v2 route and arguments; inspect schema. |
| `list_comments` | `list_comments` | Supply post_id as a query parameter on the top-level comments route. |
| `create_comment` | `create_comment` | Current v2 route and arguments; inspect schema. |
| `delete_comment` | `delete_comment` | Current v2 route and arguments; inspect schema. |
| `list_events` | `list_events` | Current v2 route and arguments; inspect schema. |
| `get_event` | `get_event` | Current v2 route and arguments; inspect schema. |
| `create_event` | `create_event` | Current v2 route and arguments; inspect schema. |
| `update_event` | `update_event` | Current v2 route and arguments; inspect schema. |
| `delete_event` | `delete_event` | Current v2 route and arguments; inspect schema. |
| `list_event_attendees` | `list_event_attendees` | Current v2 route and arguments; inspect schema. |
| `add_event_attendee` | `create_event_attendee` | Current v2 route and arguments; inspect schema. |
| `list_course_sections` | `list_course_sections` | Current v2 route and arguments; inspect schema. |
| `create_course_section` | `create_course_section` | Current v2 route and arguments; inspect schema. |
| `list_course_lessons` | `list_course_lessons` | Current v2 route and arguments; inspect schema. |
| `create_course_lesson` | `create_course_lesson` | Current v2 route and arguments; inspect schema. |
| `update_course_progress` | `update_course_progress` | Use current lesson/member progress fields. |
| `list_member_tags` | `list_member_tags` | Current v2 route and arguments; inspect schema. |
| `create_member_tag` | `create_member_tag` | Current v2 route and arguments; inspect schema. |
| `tag_member` | `tag_member` | Current v2 route and arguments; inspect schema. |
| `untag_member` | `untag_member` | Current v2 route and arguments; inspect schema. |
| `list_topics` | `list_topics` | Current v2 route and arguments; inspect schema. |
| `create_topic` | `create_topic` | Current v2 route and arguments; inspect schema. |
| `list_access_groups` | `list_access_groups` | Current v2 route and arguments; inspect schema. |
| `create_access_group` | `create_access_group` | Current v2 route and arguments; inspect schema. |
| `add_to_access_group` | `add_to_access_group` | Current v2 route and arguments; inspect schema. |
| `remove_from_access_group` | `remove_from_access_group` | Current v2 route and arguments; inspect schema. |
| `list_segments` | `list_segments` | Current v2 route and arguments; inspect schema. |
| `list_forms` | `list_forms` | Current v2 route and arguments; inspect schema. |
| `get_form_submissions` | `get_form_submissions` | Current v2 route and arguments; inspect schema. |
| `list_invitations` | `list_invitations` | Current v2 route and arguments; inspect schema. |
| `create_invitation` | `create_invitation` | Current v2 route and arguments; inspect schema. |
| `list_flagged_content` | `list_flagged_content` | Current v2 route and arguments; inspect schema. |
| `get_leaderboard` | `get_leaderboard` | Current v2 route and arguments; inspect schema. |
| `search` | `search` | Current v2 route and arguments; inspect schema. |
| `like_post` | Omitted | No equivalent in the pinned Admin v2 schema; no invented v1 route. |
| `unlike_post` | Omitted | No equivalent in the pinned Admin v2 schema; no invented v1 route. |
| `send_message` | `send_message` | Use rich_text_body and exactly one supported recipient route. |
| `list_subscriptions` | `list_subscriptions` | Current v2 route and arguments; inspect schema. |
| `list_charges` | `list_charges` | Current v2 route and arguments; inspect schema. |
| `list_space_groups` | `list_space_groups` | Current v2 route and arguments; inspect schema. |
| `list_profile_fields` | `list_profile_fields` | Current v2 route and arguments; inspect schema. |
| `list_member_spaces` | `list_member_spaces` | Current v2 route and arguments; inspect schema. |

## 1.0.0 - legacy source

MCP-only source with 62 declared tools and mixed manually assembled v1/v2 routes. This entry records source history; no prior public npm release is asserted.
