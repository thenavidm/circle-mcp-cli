<img src="https://cdn.navid.me/platforms/circle.png" alt="Circle" width="88">

# Circle MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/circle-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/circle-mcp-cli)
[![CI](https://github.com/thenavidm/circle-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/circle-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

Circle MCP server and CLI for Claude Code, Codex and AI agents. **170 tools: 66 reads and 104 confirmed writes** for community members, spaces, posts, comments, events, courses, access groups, messages, forms, paywalls and workflows.

One package gives you two ways in: circle-mcp connects the tools to your AI app, and circle-cli makes the same tools shell commands. Claude Desktop also has a bundled .mcpb extension.

Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=circle-mcp-cli&utm_content=readme). Complete installation and private account setup are in [INSTALL.md](INSTALL.md).

<img src="https://cdn.navid.me/repos/circle-mcp-cli.gif" alt="Illustrated Circle workflow in the same house terminal used on navid.me" width="520">

The terminal illustrates shipped tools and the draft workflow. It is a presentation preview, not a verified live account operation.

You need a private Circle Admin V2 API token and eligible Admin API access. Community permissions and plan limits apply. The community wrapper preserves AGPL-3.0-or-later licensing; Circle service charges remain separate. This is not a Circle-endorsed product.

Circle already has an [official hosted MCP](https://api.circle.so/mcp) with broad Admin API coverage and community MCP alternatives. No dedicated task CLI was identified in the official pages reviewed. The comparison below records the evidence; this package makes no unsupported claim of broader coverage or measured efficiency.

## Two ways to use it

### Command line

```bash
npm install -g @thenavidm/circle-mcp-cli@latest
circle-cli
circle-cli list-spaces --help
circle-cli schema create-post
circle-cli list-spaces --per-page 5 --agent
```

Configure credentials privately first. Every write needs --confirm; --agent and --yes never authorize changes.

### MCP server, for your AI app

```bash
claude mcp add --scope user circle -- npx -y @thenavidm/circle-mcp-cli@latest
```

Then ask: *Show this community's spaces and the latest posts in the space I choose.* Full client/OS wiring is in INSTALL.md.

### Which one

| Where you work | Surface |
| --- | --- |
| Claude Code, Codex, Cursor or another shell agent | MCP, CLI or both |
| Claude Desktop chat | Local MCP or desktop bundle |
| Scripts/CI | CLI or an MCP client |
| Remote-URL-only web clients | Official hosted Circle MCP |

## Features

| Capability | CLI | MCP |
| --- | --- | --- |
| Community and spaces | circle-cli get-community / list-spaces | get_community / list_spaces |
| Members | circle-cli list-members / search-member | list_members / search_member |
| Draft posts | circle-cli create-post / get-post | create_post / get_post |
| Courses and events | circle-cli list-course-lessons / list-events | list_course_lessons / list_events |
| Workflow reads | circle-cli list-workflows | list_workflows |
| Access groups | circle-cli list-access-groups | list_access_groups |
| Private account labels | circle-cli list-accounts | list_accounts |
| Diagnosis | circle-cli doctor | CLI utility |

## Contents

| Number | Section | Covers |
| --- | --- | --- |
| 1 | [What you can ask it](#1-what-you-can-ask-it) | Prompts and coverage |
| 2 | [Quick install](#2-quick-install) | MCP, CLI and desktop |
| 3 | [Set up Circle access](#3-set-up-circle-access) | Tokens, plans and auth discrepancy |
| 4 | [Connect your client](#4-connect-your-client) | Clients and OS routes |
| 5 | [Check it works](#5-check-it-works) | Doctor and first read |
| 6 | [Output, flags and exit codes](#6-output-flags-and-exit-codes) | Inputs, JSON and scripting |
| 7 | [MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | Actual usage measurement |
| 8 | [Every tool and argument](#8-every-tool-and-argument) | All tools and arguments |
| 9 | [Community workflows](#9-community-workflows) | Drafts, members, events and messages |
| 10 | [Pagination, exports and uploads](#10-pagination-exports-and-uploads) | Pages, quota and direct uploads |
| 11 | [Several private accounts](#11-several-private-accounts) | Named credentials |
| 12 | [Writing safely](#12-writing-safely) | Confirmation and logs |
| 13 | [How it works](#13-how-it-works) | Shared source and maintenance |
| 14 | [Your data](#14-your-data) | Hosts and private data |
| 15 | [Environment variables](#15-environment-variables) | Credential/safety/tuning settings |
| 16 | [Updates and removal](#16-updates-and-removal) | Updating and revoking |
| 17 | [Troubleshooting](#17-troubleshooting) | Symptoms and remedies |
| 18 | [API coverage and comparisons](#18-api-coverage-and-comparisons) | Official and community alternatives |
| 19 | [Versions](#19-versions) | Version history and migration |
| 20 | [FAQ](#20-faq) | Accordion questions |


## 1. What you can ask it

- Show this community's spaces and member directory.
- Find an existing member before changing their access.
- Read the latest posts and identify unanswered questions.
- Draft the community post I requested, leaving it unpublished.
- Inspect course sections, lessons, events and form submissions.
- Read an existing workflow before the activation I requested.

The pinned **Admin API v2** snapshot contains 169 operations. With the private account helper, this package exposes **170 tools: 66 reads and 104 confirmed writes**. It covers members, access groups, community settings, basic/image posts, comments, events, courses, tags, forms, search, transcripts, messages, paywalls and workflows.

Circle already has an [official hosted MCP](https://api.circle.so/mcp). It is a useful OAuth connection with broad Admin API coverage. This implementation offers a local shared task CLI, named private tokens, predictable JSON and explicit bounded page retrieval. Tool counts do not establish broader coverage or efficiency. Live account outcomes and desktop GUI installation remain unverified.

## 2. Quick install

```bash
npm install -g @thenavidm/circle-mcp-cli@latest
circle-cli --version
circle-cli login
circle-cli doctor
circle-cli tools
```

Node 22 or newer is required for manual MCP and CLI installation. Set the API token privately before a network request. The release supplies a `circle-2.0.0.mcpb` archive for a compatible Claude Desktop host. It bundles production dependencies, no account credentials. See [INSTALL.md](INSTALL.md) for client and OS configuration.

For Claude Code, after private configuration:

```bash
claude mcp add --scope user circle -- npx -y @thenavidm/circle-mcp-cli@latest
claude mcp list
```

## 3. Set up Circle access

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

## 4. Connect your client

[INSTALL.md](INSTALL.md) includes Claude Code, Codex, Claude Desktop extension/manual settings, Cursor, VS Code/Copilot, Windsurf, Zed, Gemini CLI, Docker and other local stdio clients on macOS, Windows and Linux. All examples use placeholders or environment forwarding; actual values belong in private user settings.

The local MCP launches with `npx -y @thenavidm/circle-mcp-cli@latest`. A client that only accepts a remote URL needs the official OAuth MCP at `https://app.circle.so/api/mcp`. It does not accept this package's local launch command. Keep the two server entries distinct if you configure both. Browser-only setup and official OAuth permissions are separate from this package's private Admin token.

Agents with a shell can install the CLI and make [SKILL.md](SKILL.md) available using the client's supported skills location. The package does not register skills automatically. Ask your agent to read INSTALL.md, verify Node/binaries, help you configure credentials privately and run discovery/doctor. Installing the package is not proof of account access.

## 5. Check it works

```bash
circle-cli --version
circle-cli doctor
circle-cli doctor --network
circle-cli list-accounts --agent
circle-cli list-spaces --per-page 5 --agent
```

Discovery and schema inspection work without credentials. The network doctor makes a community-details read without printing private community content. It does not invite members, publish posts or change billing. Success proves only access to that read with the selected credentials. Read-only discovery exposes 66 tools.

## 6. Output, flags and exit codes

Tool names become dashed commands; underscores are accepted too. Path parameter names follow the discovered schema, such as `post_id` → `--post-id`. Body tools accept individual top-level flags, complete `--payload` JSON, or `--payload-file` pointing to a regular JSON body file up to 5 MB. Do not mix those body routes. Path/query flags remain separate. Nested objects take JSON and array flags repeat once per item; a whole array is not a single item.

```bash
circle-cli get-post --help
circle-cli schema create-post
circle-cli list-members --member-tag-ids 3 --member-tag-ids 4 --per-page 10 --agent
circle-cli search --query "onboarding" --filters '{"space_ids":["7"]}' --agent
```

IDs above are illustrative; use discovered resources from your own community. Nullable fields require an actual JSON null inside payload; `--field null` is a string. Nested Tiptap properties preserve upstream extensibility; unknown top-level body fields are refused. Body-required fields are validated during execution even when the wrapper schema allows an alternative payload route. Operations whose upstream request body is required need body flags or an explicit payload; a deliberately supplied empty object is sent as JSON, never omitted.

| Flag | Behavior |
| --- | --- |
| --help / schema COMMAND | Current argument help / full JSON Schema |
| --json | Structured JSON |
| --compact | One-line JSON |
| --agent | Compact JSON, no prompts or color |
| --select a,b.c | Keep selected fields, including nested objects/arrays |
| --no-color / --no-input | Noninteractive house flags |
| --yes | Never replaces write confirmation |
| --confirm | Confirm only the requested mutation |
| --account NAME | Select private local credentials |
| --payload JSON / --payload-file PATH | Complete request body, mutually exclusive with body flags |

| Exit | Meaning |
| --- | --- |
| 0 | Success |
| 2 | Invalid arguments or refused write |
| 3 | Resource not found |
| 4 | Authentication/permission failure |
| 5 | API/transport failure |
| 7 | Rate limit |
| 10 | Missing or invalid private configuration |

Results go to stdout, errors as JSON to stderr. Selection changes local output, not the original API response or quota charge. API success is not proof of notification delivery or a completed export.

## 7. MCP or CLI and token cost

MCP and CLI use the same SDK server, schemas, validation and HTTP handlers. The CLI talks to that server through the SDK's in-memory transport; there is no second API implementation.

| Measurement | What to include |
| --- | --- |
| Eager MCP loading | All tool schemas and instructions |
| Default/deferred tool search | Actual selected schemas and discovery overhead |
| Skill read once | Full SKILL.md and command discovery |
| Recurring skill discovery | The installed skill's listing text |
| Matched successful task | Help/schema, reasoning, calls/commands, results, errors and retries |

Fresh usage measurements are pending. Do not estimate tokens from characters, substitute another repo's results or declare zero CLI cost. Record model/client/package versions and date, loading settings, input/output usage, latency and equivalent outcomes. Compare a small member/space query and repeated focused administration across supported official/local surfaces, using the same authorized data and result fields. API quota and service costs remain separate. No measured superiority is claimed.

## 8. Every tool and argument

All 169 API operations come from the pinned official v2 snapshot. `list_accounts` is the local helper. The tables document every top-level operation argument. `schema` returns all nested requirements, unions, nullable values and enums. A body marked required is required in the body, whether supplied by flags or payload.

| Tool | API | Mode |
| --- | --- | --- |
| `add_to_access_group` | `POST /api/admin/v2/access_groups/{access_group_id}/community_members` | Write, confirms |
| `remove_from_access_group` | `DELETE /api/admin/v2/access_groups/{access_group_id}/community_members` | Write, confirms |
| `list_access_group_community_members` | `GET /api/admin/v2/access_groups/{access_group_id}/community_members` | Read |
| `get_access_group_community_member` | `GET /api/admin/v2/access_groups/{access_group_id}/community_member` | Read |
| `create_access_group` | `POST /api/admin/v2/access_groups` | Write, confirms |
| `list_access_groups` | `GET /api/admin/v2/access_groups` | Read |
| `archive_access_group` | `DELETE /api/admin/v2/access_groups/{id}` | Write, confirms |
| `update_access_group` | `PUT /api/admin/v2/access_groups/{id}` | Write, confirms |
| `unarchive_access_group` | `PATCH /api/admin/v2/access_groups/{id}/unarchive` | Write, confirms |
| `search` | `GET /api/admin/v2/advanced_search` | Read |
| `update_chat_preferences` | `PUT /api/admin/v2/chat_preferences` | Write, confirms |
| `import_chat_room_message` | `POST /api/admin/v2/chat_room_message_imports` | Write, confirms |
| `create_comment` | `POST /api/admin/v2/comments` | Write, confirms |
| `list_comments` | `GET /api/admin/v2/comments` | Read |
| `delete_comment` | `DELETE /api/admin/v2/comments/{id}` | Write, confirms |
| `get_comment` | `GET /api/admin/v2/comments/{id}` | Read |
| `get_community` | `GET /api/admin/v2/community` | Read |
| `update_community` | `PUT /api/admin/v2/community` | Write, confirms |
| `create_lead` | `POST /api/admin/v2/community_leads` | Write, confirms |
| `delete_lead` | `DELETE /api/admin/v2/community_leads/{id}` | Write, confirms |
| `export_community_member_charges` | `POST /api/admin/v2/community_member_charges/export` | Write, confirms |
| `list_charges` | `GET /api/admin/v2/community_member_charges` | Read |
| `refund_community_member_charge` | `POST /api/admin/v2/community_member_charges/{id}/refund` | Write, confirms |
| `list_member_spaces` | `GET /api/admin/v2/community_member_spaces` | Read |
| `cancel_community_member_subscription` | `POST /api/admin/v2/community_member_subscriptions/{id}/cancel` | Write, confirms |
| `export_community_member_subscriptions` | `POST /api/admin/v2/community_member_subscriptions/export` | Write, confirms |
| `list_subscriptions` | `GET /api/admin/v2/community_member_subscriptions` | Read |
| `resume_community_member_subscription` | `POST /api/admin/v2/community_member_subscriptions/{id}/resume` | Write, confirms |
| `list_member_access_groups` | `GET /api/admin/v2/community_members/{community_member_id}/access_groups` | Read |
| `ban_community_member` | `PUT /api/admin/v2/community_members/{id}/ban_member` | Write, confirms |
| `create_member` | `POST /api/admin/v2/community_members` | Write, confirms |
| `list_members` | `GET /api/admin/v2/community_members` | Read |
| `delete_community_member` | `PUT /api/admin/v2/community_members/{id}/delete_member` | Write, confirms |
| `remove_member` | `DELETE /api/admin/v2/community_members/{id}` | Write, confirms |
| `get_member` | `GET /api/admin/v2/community_members/{id}` | Read |
| `update_member` | `PUT /api/admin/v2/community_members/{id}` | Write, confirms |
| `search_member` | `GET /api/admin/v2/community_members/search` | Read |
| `create_community_segment` | `POST /api/admin/v2/community_segments` | Write, confirms |
| `list_segments` | `GET /api/admin/v2/community_segments` | Read |
| `delete_community_segment` | `DELETE /api/admin/v2/community_segments/{id}` | Write, confirms |
| `update_community_segment` | `PUT /api/admin/v2/community_segments/{id}` | Write, confirms |
| `duplicate_community_segment` | `POST /api/admin/v2/community_segments/{id}/duplicate` | Write, confirms |
| `create_contact_note` | `POST /api/admin/v2/contacts/{contact_id}/contact_notes` | Write, confirms |
| `list_contact_notes` | `GET /api/admin/v2/contacts/{contact_id}/contact_notes` | Read |
| `update_course_progress` | `PUT /api/admin/v2/course_lesson_progress` | Write, confirms |
| `create_course_lesson` | `POST /api/admin/v2/course_lessons` | Write, confirms |
| `list_course_lessons` | `GET /api/admin/v2/course_lessons` | Read |
| `delete_course_lesson` | `DELETE /api/admin/v2/course_lessons/{id}` | Write, confirms |
| `get_course_lesson` | `GET /api/admin/v2/course_lessons/{id}` | Read |
| `update_course_lesson` | `PATCH /api/admin/v2/course_lessons/{id}` | Write, confirms |
| `reorder_course_lessons` | `PUT /api/admin/v2/course_lessons/reorder` | Write, confirms |
| `create_course_section` | `POST /api/admin/v2/course_sections` | Write, confirms |
| `list_course_sections` | `GET /api/admin/v2/course_sections` | Read |
| `delete_course_section` | `DELETE /api/admin/v2/course_sections/{id}` | Write, confirms |
| `get_course_section` | `GET /api/admin/v2/course_sections/{id}` | Read |
| `update_course_section` | `PUT /api/admin/v2/course_sections/{id}` | Write, confirms |
| `create_direct_upload` | `POST /api/admin/v2/direct_uploads` | Write, confirms |
| `create_embed` | `POST /api/admin/v2/embeds` | Write, confirms |
| `get_embed` | `GET /api/admin/v2/embeds/{sgid}` | Read |
| `create_event_attendee` | `POST /api/admin/v2/event_attendees` | Write, confirms |
| `delete_event_attendee` | `DELETE /api/admin/v2/event_attendees` | Write, confirms |
| `list_event_attendees` | `GET /api/admin/v2/event_attendees` | Read |
| `create_event` | `POST /api/admin/v2/events` | Write, confirms |
| `list_events` | `GET /api/admin/v2/events` | Read |
| `delete_event` | `DELETE /api/admin/v2/events/{id}` | Write, confirms |
| `get_event` | `GET /api/admin/v2/events/{id}` | Read |
| `update_event` | `PUT /api/admin/v2/events/{id}` | Write, confirms |
| `duplicate_event` | `POST /api/admin/v2/spaces/{space_id}/events/{id}/duplicate` | Write, confirms |
| `get_filter_configuration` | `GET /api/admin/v2/filter_kit_configuration` | Read |
| `create_filter_control` | `POST /api/admin/v2/filter_kit_controls` | Write, confirms |
| `list_filter_controls` | `GET /api/admin/v2/filter_kit_controls` | Read |
| `delete_filter_control` | `DELETE /api/admin/v2/filter_kit_controls/{id}` | Write, confirms |
| `get_filter_control` | `GET /api/admin/v2/filter_kit_controls/{id}` | Read |
| `update_filter_control` | `PATCH /api/admin/v2/filter_kit_controls/{id}` | Write, confirms |
| `report_flagged_content` | `POST /api/admin/v2/flagged_contents` | Write, confirms |
| `list_flagged_content` | `GET /api/admin/v2/flagged_contents` | Read |
| `delete_form` | `DELETE /api/admin/v2/forms/{id}` | Write, confirms |
| `get_form` | `GET /api/admin/v2/forms/{id}` | Read |
| `update_form` | `PUT /api/admin/v2/forms/{id}` | Write, confirms |
| `duplicate_form` | `POST /api/admin/v2/forms/{id}/duplicate` | Write, confirms |
| `list_forms` | `GET /api/admin/v2/forms` | Read |
| `create_form_submission` | `POST /api/admin/v2/forms/{form_id}/submissions` | Write, confirms |
| `get_form_submissions` | `GET /api/admin/v2/forms/{form_id}/submissions` | Read |
| `get_leaderboard` | `GET /api/admin/v2/gamification/leaderboard` | Read |
| `create_image_post` | `POST /api/admin/v2/spaces/{space_id}/images/posts` | Write, confirms |
| `list_image_posts` | `GET /api/admin/v2/spaces/{space_id}/images/posts` | Read |
| `delete_image_post` | `DELETE /api/admin/v2/spaces/{space_id}/images/posts/{id}` | Write, confirms |
| `get_image_post` | `GET /api/admin/v2/spaces/{space_id}/images/posts/{id}` | Read |
| `duplicate_image_post` | `POST /api/admin/v2/spaces/{space_id}/images/posts/{id}/duplicate` | Write, confirms |
| `create_invitation` | `POST /api/admin/v2/invitation_links` | Write, confirms |
| `list_invitations` | `GET /api/admin/v2/invitation_links` | Read |
| `delete_invitation_link` | `DELETE /api/admin/v2/invitation_links/{id}` | Write, confirms |
| `update_invitation_link` | `PUT /api/admin/v2/invitation_links/{id}` | Write, confirms |
| `revoke_invitation_link` | `PATCH /api/admin/v2/invitation_links/{id}/revoke` | Write, confirms |
| `list_live_rooms` | `GET /api/admin/v2/live/rooms` | Read |
| `list_live_room_transcripts` | `GET /api/admin/v2/live/rooms/{room_id}/transcripts` | Read |
| `search_locations` | `GET /api/admin/v2/locations/search` | Read |
| `create_member_tag` | `POST /api/admin/v2/member_tags` | Write, confirms |
| `list_member_tags` | `GET /api/admin/v2/member_tags` | Read |
| `delete_member_tag` | `DELETE /api/admin/v2/member_tags/{id}` | Write, confirms |
| `get_member_tag` | `GET /api/admin/v2/member_tags/{id}` | Read |
| `update_member_tag` | `PUT /api/admin/v2/member_tags/{id}` | Write, confirms |
| `send_message` | `POST /api/admin/v2/messages` | Write, confirms |
| `list_page_profile_fields` | `GET /api/admin/v2/page_profile_fields` | Read |
| `get_payment_method_settings` | `GET /api/admin/v2/payment_method_setting` | Read |
| `export_paywall_affiliate_payouts` | `POST /api/admin/v2/paywall_affiliate_payouts/export` | Write, confirms |
| `mark_paywall_affiliate_payouts_paid` | `POST /api/admin/v2/paywall_affiliate_payouts/mark_paid` | Write, confirms |
| `start_paywall_affiliate_payouts` | `POST /api/admin/v2/paywall_affiliate_payouts/start` | Write, confirms |
| `list_paywall_affiliates` | `GET /api/admin/v2/paywall_affiliates` | Read |
| `invite_paywall_affiliates` | `POST /api/admin/v2/paywall_affiliates/invite` | Write, confirms |
| `update_paywall_affiliate` | `PATCH /api/admin/v2/paywall_affiliates/{id}` | Write, confirms |
| `delete_paywall_coupon` | `DELETE /api/admin/v2/paywall_coupons/{id}` | Write, confirms |
| `create_paywall_group` | `POST /api/admin/v2/paywall_groups` | Write, confirms |
| `update_paywall_group` | `PUT /api/admin/v2/paywall_groups/{id}` | Write, confirms |
| `search_paywalls` | `GET /api/admin/v2/paywalls/search` | Read |
| `delete_paywall` | `DELETE /api/admin/v2/paywalls/{id}` | Write, confirms |
| `archive_paywall` | `PUT /api/admin/v2/paywalls/{id}/archive` | Write, confirms |
| `publish_paywall` | `PUT /api/admin/v2/paywalls/{id}/publish` | Write, confirms |
| `unarchive_paywall` | `PUT /api/admin/v2/paywalls/{id}/unarchive` | Write, confirms |
| `unfollow_post` | `DELETE /api/admin/v2/posts/{post_id}/post_followers` | Write, confirms |
| `create_post` | `POST /api/admin/v2/posts` | Write, confirms |
| `list_posts` | `GET /api/admin/v2/posts` | Read |
| `delete_post` | `DELETE /api/admin/v2/posts/{id}` | Write, confirms |
| `get_post` | `GET /api/admin/v2/posts/{id}` | Read |
| `update_post` | `PUT /api/admin/v2/posts/{id}` | Write, confirms |
| `get_post_summary` | `GET /api/admin/v2/posts/{post_id}/summary` | Read |
| `archive_profile_field` | `PUT /api/admin/v2/profile_fields/{id}/archive` | Write, confirms |
| `create_profile_field` | `POST /api/admin/v2/profile_fields` | Write, confirms |
| `list_profile_fields` | `GET /api/admin/v2/profile_fields` | Read |
| `delete_profile_field` | `DELETE /api/admin/v2/profile_fields/{id}` | Write, confirms |
| `update_profile_field` | `PUT /api/admin/v2/profile_fields/{id}` | Write, confirms |
| `unarchive_profile_field` | `PUT /api/admin/v2/profile_fields/{id}/unarchive` | Write, confirms |
| `get_connect_settings` | `GET /api/admin/v2/settings/connect` | Read |
| `update_connect_settings` | `PATCH /api/admin/v2/settings/connect` | Write, confirms |
| `create_space_group_member` | `POST /api/admin/v2/space_group_members` | Write, confirms |
| `delete_space_group_member` | `DELETE /api/admin/v2/space_group_members` | Write, confirms |
| `list_space_group_members` | `GET /api/admin/v2/space_group_members` | Read |
| `get_space_group_member` | `GET /api/admin/v2/space_group_member` | Read |
| `create_space_group` | `POST /api/admin/v2/space_groups` | Write, confirms |
| `list_space_groups` | `GET /api/admin/v2/space_groups` | Read |
| `delete_space_group` | `DELETE /api/admin/v2/space_groups/{id}` | Write, confirms |
| `get_space_group` | `GET /api/admin/v2/space_groups/{id}` | Read |
| `update_space_group` | `PUT /api/admin/v2/space_groups/{id}` | Write, confirms |
| `add_space_member` | `POST /api/admin/v2/space_members` | Write, confirms |
| `remove_space_member` | `DELETE /api/admin/v2/space_members` | Write, confirms |
| `list_space_members` | `GET /api/admin/v2/space_members` | Read |
| `get_space_member` | `GET /api/admin/v2/space_member` | Read |
| `get_space_ai_summaries` | `GET /api/admin/v2/spaces/{space_id}/ai_summaries` | Read |
| `create_space` | `POST /api/admin/v2/spaces` | Write, confirms |
| `list_spaces` | `GET /api/admin/v2/spaces` | Read |
| `delete_space` | `DELETE /api/admin/v2/spaces/{id}` | Write, confirms |
| `get_space` | `GET /api/admin/v2/spaces/{id}` | Read |
| `update_space` | `PUT /api/admin/v2/spaces/{id}` | Write, confirms |
| `tag_member` | `POST /api/admin/v2/tagged_members` | Write, confirms |
| `untag_member` | `DELETE /api/admin/v2/tagged_members` | Write, confirms |
| `list_tagged_members` | `GET /api/admin/v2/tagged_members` | Read |
| `get_tagged_member` | `GET /api/admin/v2/tagged_members/{id}` | Read |
| `get_tax_settings` | `GET /api/admin/v2/tax_setting` | Read |
| `update_tax_settings` | `PUT /api/admin/v2/tax_setting` | Write, confirms |
| `create_topic` | `POST /api/admin/v2/topics` | Write, confirms |
| `list_topics` | `GET /api/admin/v2/topics` | Read |
| `delete_topic` | `DELETE /api/admin/v2/topics/{id}` | Write, confirms |
| `get_topic` | `GET /api/admin/v2/topics/{id}` | Read |
| `update_topic` | `PUT /api/admin/v2/topics/{id}` | Write, confirms |
| `activate_workflow` | `PUT /api/admin/v2/workflows/{id}/activate` | Write, confirms |
| `deactivate_workflow` | `PUT /api/admin/v2/workflows/{id}/deactivate` | Write, confirms |
| `duplicate_workflow` | `POST /api/admin/v2/workflows/{id}/duplicate` | Write, confirms |
| `list_workflows` | `GET /api/admin/v2/workflows` | Read |
| `get_workflow` | `GET /api/admin/v2/workflows/{id}` | Read |
| `list_accounts` | Local settings | Read |

### Shared arguments

All API tools accept `account`; all writes accept `confirm`. Tools with body properties accept `payload` or `payload_file` instead of body flags. Only the 33 reads with native page/per_page input expose `all_pages` and `max_items`. `list_accounts` takes no arguments.

### Complete arguments

#### add_to_access_group

Add Member to Access Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli add-to-access-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `access_group_id` | integer | Yes | Access group id (path input). minimum: `1`. |
| `email` | string | Body | Email (body input). |

#### remove_from_access_group

Remove Access Group Member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli remove-from-access-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `access_group_id` | integer | Yes | Access group id (path input). minimum: `1`. |
| `email` | string | Yes | Email |

#### list_access_group_community_members

List Access Group Community Members. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-access-group-community-members --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `access_group_id` | integer | Yes | Access Group ID minimum: `1`. |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### get_access_group_community_member

Show Access Group Community Member. Reads community data.

```bash
circle-cli get-access-group-community-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `access_group_id` | integer | Yes | Access Group ID minimum: `1`. |
| `email` | string | Yes | Email |

#### create_access_group

Create Access Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-access-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `access_group` | object | Body | Access group (body input). Object requires: `name`. |

#### list_access_groups

List Access Groups. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-access-groups --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `status` | string | No | Filter by access group status Values: `active`, `archived`, `all`. |
| `ids` | array | No | Filter by access group ids Array items: integer. |
| `name` | string | No | Filter by access group name |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### archive_access_group

Archive Access Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli archive-access-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `access_group_id` | integer | Yes | Access Group ID minimum: `1`. |

#### update_access_group

Update Access Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-access-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `access_group_id` | integer | Yes | Access Group ID minimum: `1`. |
| `access_group` | object | Body | Access group (body input). |

#### unarchive_access_group

Unarchive Access Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli unarchive-access-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `access_group_id` | integer | Yes | Access Group ID minimum: `1`. |

#### search

Advanced Search. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli search --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `query` | string | Yes | Search query |
| `type` | string | No | Search type Values: `general`, `members`, `posts`, `comments`, `spaces`, `lessons`, `events`, `entity_list`, `mentions`. |
| `mention_scope` | string | No | Mention scope Values: `space`, `group_chat`, `thread`, `direct`. |
| `filters` | object | No | Filters |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### update_chat_preferences

Update Chat Preferences. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-chat-preferences --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `messaging_enabled` | boolean | No | Enable or disable messaging for the community |
| `group_messaging_enabled` | boolean | No | Enable or disable group messaging for the community |
| `voice_messages_enabled` | boolean | No | Enable or disable voice messages for the community |
| `member_to_member_messaging_enabled` | boolean | No | Enable or disable member-to-member messaging for the community |

#### import_chat_room_message

Import Chat Room Message. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli import-chat-room-message --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `chat_room_uuid` | string | Body | UUID of the target chat room (from a chat space) |
| `user_email` | string | Body | Email of the community member who is the message sender |
| `rich_text_body` | object | Body | TipTap rich text body, wrapped as `{ body:  }` |
| `sent_at` | string | Body | Timestamp for the imported message. Required and must not be in the future. format: `date-time`. |
| `parent_message_id` | integer/null | No | ID of the parent message when creating a thread reply |

#### create_comment

Create Comment. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-comment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `body` | string | Body | Body (body input). |
| `post_id` | integer | Body | Post id (body input). |
| `parent_comment_id` | integer | No | Parent comment id (body input). |
| `created_at` | string | No | Created at (body input). format: `date-time`. |
| `updated_at` | string | No | Updated at (body input). format: `date-time`. |
| `skip_notifications` | boolean | No | Skip notifications (body input). |

#### list_comments

List Comments. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-comments --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `space_id` | integer | No | Space ID |
| `post_id` | integer | No | Post ID |
| `search_text` | string | No | Search text |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_comment

Destroy Comment. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-comment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `comment_id` | string | Yes | Comment id (path input). |

#### get_comment

Show Comment. Reads community data.

```bash
circle-cli get-comment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `comment_id` | string | Yes | Comment id (path input). |

#### get_community

Get community details. Reads community data.

```bash
circle-cli get-community --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| None | Not applicable | No | Shared account/confirmation controls only. |

#### update_community

Update Community. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-community --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `community` | object | No | Community (body input). |
| `community_setting` | object | No | Community setting (body input). |

#### create_lead

Create a non-member contact (lead). To add a full community member instead, use create_community_member.. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-lead --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `email` | string | Body | Email address of the contact. Must not already belong to a member or an existing non-member contact in this community. |
| `name` | string | No | Display name of the contact. |
| `member_tag_ids` | array | No | IDs of existing member tags to apply to the new contact. Use the member_tags endpoints to look these up. Array items: integer. |

#### delete_lead

Delete a non-member contact (lead). To delete a full community member instead, use destroy_community_member.. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-lead --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `lead_id` | integer | Yes | Numeric id of the non-member contact to delete minimum: `1`. |

#### export_community_member_charges

Export Community Member Charges. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli export-community-member-charges --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_email` | string | No | Filter by community member email (partial match) |
| `community_member_id` | integer | No | Filter by community member ID |
| `community_member_public_uid` | string | No | Filter by community member public UID |
| `billing_info_business_name` | string | No | Filter by billing info business name (partial match) |
| `paywall_price_type` | string | No | Comma-separated list of paywall price types (e.g. subscription,onetime,installments) |
| `processor_id` | string | No | Filter by exact processor (charge) ID |
| `subscription_processor_id` | string | No | Filter by exact subscription processor ID |
| `invoice_processor_id` | string | No | Filter by exact invoice processor ID |
| `currency` | string | No | Comma-separated list of currency codes |
| `paywall_ids` | string | No | Comma-separated list of paywall IDs |
| `status` | string | No | Comma-separated list of statuses (e.g. paid,refunded,partial_refunded) |
| `platform` | string | No | Comma-separated list of platforms (web, app_store, play_store) |
| `amount_gte` | integer | No | Minimum charge amount (in currency subunits) |
| `amount_lte` | integer | No | Maximum charge amount (in currency subunits) |
| `created_at_gte` | string | No | Only include charges created on/after this date (ISO8601) |
| `created_at_lte` | string | No | Only include charges created on/before this date (ISO8601) |
| `fields` | string | No | Comma-separated list of CSV columns to include |
| `timezone` | string | No | Timezone used to render dates in the CSV (defaults to Etc/UTC) |

#### list_charges

Community Member Charges List. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-charges --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Records per page (max 100) minimum: `1`. maximum: `100`. |
| `query` | string | No | Free-text search |
| `member_email` | string | No | Filter by community member email (partial match) |
| `community_member_id` | integer | No | Filter by community member ID |
| `community_member_public_uid` | string | No | Filter by community member public UID |
| `billing_info_business_name` | string | No | Filter by billing info business name (partial match) |
| `paywall_price_type` | string | No | Comma-separated list of paywall price types (e.g. subscription,onetime,installments) |
| `processor_id` | string | No | Filter by exact processor (charge) ID |
| `subscription_processor_id` | string | No | Filter by exact subscription processor ID |
| `invoice_processor_id` | string | No | Filter by exact invoice processor ID |
| `currency` | string | No | Comma-separated list of currency codes |
| `paywall_ids` | string | No | Comma-separated list of paywall IDs |
| `status` | string | No | Comma-separated list of statuses (e.g. paid,refunded,partial_refunded) |
| `platform` | string | No | Comma-separated list of platforms (web, app_store, play_store) |
| `amount_gte` | integer | No | Minimum charge amount (in currency subunits) |
| `amount_lte` | integer | No | Maximum charge amount (in currency subunits) |
| `created_at_gte` | string | No | Only include charges created on/after this date (ISO8601) |
| `created_at_lte` | string | No | Only include charges created on/before this date (ISO8601) |
| `sort` | string | No | Sort field. Defaults to created_at. Values: `amount`, `charge_term`, `community_member_name`, `paywall_name`, `platform`, `display_status`, `created_at`. |
| `direction` | string | No | Sort direction. Defaults to desc. Values: `asc`, `desc`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### refund_community_member_charge

Refund Community Member Charge. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli refund-community-member-charge --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `charge_id` | integer | Yes | Community Member Charge ID minimum: `1`. |
| `amount` | integer | No | Amount to refund (in currency subunits). Omit for a full refund. |
| `reason_details` | string | Body | Refund reason. Required, 255 characters max. maxLength: `255`. |

#### list_member_spaces

List Community Member Spaces. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-member-spaces --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `community_member_id` | integer | No | Community member id (query input). |
| `user_email` | string | No | User email (query input). |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### cancel_community_member_subscription

Cancel Community Member Subscription. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli cancel-community-member-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `subscription_id` | integer | Yes | Community Member Subscription ID minimum: `1`. |
| `ends_at` | string | Body | Cancellation timing: 'now' or 'at_period_end'. |
| `refund_type` | string | No | Optional refund type when canceling immediately: 'prorated' or 'full'. |

#### export_community_member_subscriptions

Export Community Member Subscriptions. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli export-community-member-subscriptions --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_email` | string | No | Filter by community member email (partial match) |
| `community_member_id` | integer | No | Filter by community member ID |
| `community_member_public_uid` | string | No | Filter by community member public UID |
| `billing_info_business_name` | string | No | Filter by billing info business name (partial match) |
| `paywall_price_type` | string | No | Comma-separated list of paywall price types (e.g. subscription,onetime,installments) |
| `billing_interval` | string | No | Filter by paywall price billing interval (e.g. month, year) |
| `subscription_processor_id` | string | No | Filter by exact subscription processor ID |
| `currency` | string | No | Comma-separated list of currency codes |
| `paywall_ids` | string | No | Comma-separated list of paywall IDs |
| `status` | string | No | Comma-separated list of statuses (e.g. active,trial,canceled) |
| `scheduled_to_cancel` | boolean | No | Filter by whether the subscription is scheduled to cancel |
| `platform` | string | No | Comma-separated list of platforms (web, app_store, play_store) |
| `total_amount_paid_gte` | integer | No | Minimum total amount paid (in currency subunits) |
| `total_amount_paid_lte` | integer | No | Maximum total amount paid (in currency subunits) |
| `start_date_gte` | string | No | Only include subscriptions started on/after this date (ISO8601) |
| `start_date_lte` | string | No | Only include subscriptions started on/before this date (ISO8601) |
| `fields` | string | No | Comma-separated list of CSV columns to include |
| `timezone` | string | No | Timezone used to render dates in the CSV (defaults to Etc/UTC) |

#### list_subscriptions

Community Member Subscriptions List. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-subscriptions --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Records per page (max 100) minimum: `1`. maximum: `100`. |
| `query` | string | No | Free-text search |
| `member_email` | string | No | Filter by community member email (partial match) |
| `community_member_id` | integer | No | Filter by community member ID |
| `community_member_public_uid` | string | No | Filter by community member public UID |
| `billing_info_business_name` | string | No | Filter by billing info business name (partial match) |
| `paywall_price_type` | string | No | Comma-separated list of paywall price types (e.g. subscription,onetime,installments) |
| `billing_interval` | string | No | Filter by paywall price billing interval (e.g. month, year) |
| `subscription_processor_id` | string | No | Filter by exact subscription processor ID |
| `currency` | string | No | Comma-separated list of currency codes |
| `paywall_ids` | string | No | Comma-separated list of paywall IDs |
| `status` | string | No | Comma-separated list of statuses (e.g. active,trial,canceled) |
| `scheduled_to_cancel` | boolean | No | Filter by whether the subscription is scheduled to cancel |
| `platform` | string | No | Comma-separated list of platforms (web, app_store, play_store) |
| `total_amount_paid_gte` | integer | No | Minimum total amount paid (in currency subunits) |
| `total_amount_paid_lte` | integer | No | Maximum total amount paid (in currency subunits) |
| `start_date_gte` | string | No | Only include subscriptions started on/after this date (ISO8601) |
| `start_date_lte` | string | No | Only include subscriptions started on/before this date (ISO8601) |
| `sort` | string | No | Sort field (one of: charges_quantity, subscription_term, renews_on, community_member_name, paywall_name, platform, status, created_at). Defaults to created_at |
| `direction` | string | No | Sort direction (asc or desc). Defaults to desc |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### resume_community_member_subscription

Resume Community Member Subscription. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli resume-community-member-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `subscription_id` | integer | Yes | Community Member Subscription ID minimum: `1`. |

#### list_member_access_groups

List Community Member's Access Groups. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-member-access-groups --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `community_member_id` | integer | Yes | Community Member ID minimum: `1`. |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### ban_community_member

Ban Community Member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli ban-community-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_id` | integer | Yes | Community member ID to ban minimum: `1`. |

#### create_member

Create/Invite a community member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `email` | string | Body | Email (body input). |
| `password` | string | No | Password (body input). |
| `skip_invitation` | boolean | No | Skip invitation (body input). |
| `avatar` | string | No | signed_id of the avatar returned from the direct upload endpoint |
| `name` | string | No | Name (body input). |
| `headline` | string | No | Headline (body input). |
| `is_flagged` | boolean | No | Is flagged (body input). |
| `preferences` | object | No | Preferences (body input). |
| `space_ids` | array | No | Space ids (body input). Array items: integer. |
| `space_group_ids` | array | No | Space group ids (body input). Array items: integer. |
| `member_tag_ids` | array | No | Member tag ids (body input). Array items: integer. |
| `community_member_profile_fields` | object | No | Profile fields key value pairs |

#### list_members

List Community Members. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-members --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `status` | string | No | Filter by member status. Defaults to `active`. - `active`: members who have completed profile setup (`profile_confirmed_at` is set). - `inactive`: invited members who have not yet completed profile setup. This is the same set shown in the admin UI under Audience → Manage → Invited. - `all`: both of the above. Values: `active`, `all`, `inactive`. |
| `member_tag_ids` | array | No | Filter by Member Tag IDs (OR logic, comma-separated) Array items: integer. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_community_member

Delete Community Member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-community-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_id` | integer | Yes | Community member ID to delete minimum: `1`. |

#### remove_member

Deactivate a community member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli remove-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_id` | string | Yes | ID of the community member |

#### get_member

Show a community member. Reads community data.

```bash
circle-cli get-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_id` | string | Yes | ID of the community member |

#### update_member

Update a community member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_id` | string | Yes | ID of the community member |
| `avatar` | string | No | signed_id of the avatar returned from the direct upload endpoint |
| `name` | string | No | Name (body input). |
| `headline` | string | No | Headline (body input). |
| `is_flagged` | boolean | No | Is flagged (body input). |
| `member_since` | string | No | Effective "member since" / joined date. Cannot be in the future. format: `date-time`. |
| `preferences` | object | No | Preferences (body input). |
| `space_ids` | array | No | Space ids (body input). Array items: integer. |
| `space_group_ids` | array | No | Space group ids (body input). Array items: integer. |
| `member_tag_ids` | array | No | Member tag ids (body input). Array items: integer. |
| `community_member_profile_fields` | object | No | Profile fields key value pairs |

#### search_member

Search a community member. Reads community data.

```bash
circle-cli search-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `email` | string | Yes | Email of the community member |

#### create_community_segment

Create a community segment. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-community-segment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `title` | string | Body | Title (body input). |
| `visible` | boolean | Body | Visible (body input). |
| `rules` | object | Body | Rules (body input). Object requires: `rule_type`, `rules`. |
| `community_segment_consumer_attributes` | object | No | Community segment consumer attributes (body input). |

#### list_segments

List Community Segments. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-segments --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `title` | string | No | Filter by title |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_community_segment

Delete a community segment. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-community-segment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `segment_id` | string | Yes | ID of the community segment to delete |

#### update_community_segment

Update a community segment. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-community-segment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `segment_id` | string | Yes | ID of the community segment to update |
| `title` | string | Body | Title (body input). |
| `visible` | boolean | Body | Visible (body input). |
| `rules` | object | Body | Rules (body input). Object requires: `rule_type`, `rules`. |
| `community_segment_consumer_attributes` | object | No | Community segment consumer attributes (body input). |

#### duplicate_community_segment

Duplicate a community segment. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli duplicate-community-segment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `segment_id` | string | Yes | ID of the community segment to duplicate |
| `title` | string | Yes | Title for the duplicated community segment |

#### create_contact_note

Create Contact Note. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-contact-note --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `contact_id` | string | Yes | Contact ID or sqid |
| `tiptap_body` | object | Body | Rich text note in Tiptap document format Object requires: `body`. |

#### list_contact_notes

List Contact Notes. Reads community data.

```bash
circle-cli list-contact-notes --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `contact_id` | string | Yes | Contact ID or sqid |
| `page` | integer | No | Page number minimum: `1`. |

#### update_course_progress

Update Course Lesson Progress. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-course-progress --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `lesson_id` | integer | Body | Lesson id (body input). |
| `member_email` | string | Body | Member email (body input). |
| `status` | string | Body | Status (body input). Values: `incomplete`, `completed`. |

#### create_course_lesson

Create a course lesson. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-course-lesson --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `section_id` | integer | Body | Section id (body input). |
| `name` | string | Body | Name (body input). |
| `status` | string | No | Status (body input). Values: `draft`, `published`. |
| `body_html` | string | No | Body html (body input). |
| `is_comments_enabled` | boolean | No | Is comments enabled (body input). |
| `is_featured_media_enabled` | boolean | No | Is featured media enabled (body input). |
| `is_featured_media_download_enabled` | boolean | No | Is featured media download enabled (body input). |
| `thumbnail` | string | No | signed_id of the lesson thumbnail image returned from the direct upload endpoint |
| `featured_media` | string | No | signed_id of the lesson featured media file returned from the direct upload endpoint |
| `rich_text_body` | object | No | Rich text body (body input). |

#### list_course_lessons

List course lessons. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-course-lessons --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `section_id` | integer | No | Section ID |
| `space_id` | integer | No | Space ID |
| `status` | string | No | Status Values: `draft`, `published`. |
| `sort` | string | No | Sorting parameters (sort by name in ascending order, name in descending order, and by newest. Default is oldest) Values: `oldest`, `newest`, `alphabetical`, `alphabetical_desc`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_course_lesson

Delete a course lesson. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-course-lesson --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `lesson_id` | integer | Yes | Course lesson ID minimum: `1`. |

#### get_course_lesson

Show a course lesson. Reads community data.

```bash
circle-cli get-course-lesson --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `lesson_id` | integer | Yes | ID of the course lesson minimum: `1`. |

#### update_course_lesson

Update a course lesson. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-course-lesson --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `lesson_id` | integer | Yes | ID of the course lesson minimum: `1`. |
| `name` | string | No | Name (body input). |
| `status` | string | No | Status (body input). Values: `draft`, `published`. |
| `body_html` | string | No | Body html (body input). |
| `is_comments_enabled` | boolean | No | Is comments enabled (body input). |
| `is_featured_media_enabled` | boolean | No | Is featured media enabled (body input). |
| `is_featured_media_download_enabled` | boolean | No | Is featured media download enabled (body input). |
| `thumbnail` | string | No | signed_id of the lesson thumbnail image returned from the direct upload endpoint |
| `featured_media` | string | No | signed_id of the lesson featured media file returned from the direct upload endpoint |
| `rich_text_body` | object | No | Rich text body (body input). |

#### reorder_course_lessons

Reorder course lessons. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli reorder-course-lessons --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Body | ID of the course space |
| `new_order` | array | Body | All course sections and lessons in their final order Array items: object. |

#### create_course_section

Create a course section. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-course-section --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `name` | string | Body | Name (body input). |
| `space_id` | integer | Body | Space id (body input). |

#### list_course_sections

List Course Sections. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-course-sections --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `space_id` | integer | No | Space ID of the course section |
| `sort` | string | No | Sorting parameters (sort by name in ascending order, name in descending order, and by newest. Default is oldest) Values: `oldest`, `newest`, `alphabetical`, `alphabetical_desc`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_course_section

Delete a course section. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-course-section --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `section_id` | integer | Yes | Course section ID minimum: `1`. |

#### get_course_section

Show a course section. Reads community data.

```bash
circle-cli get-course-section --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `section_id` | integer | Yes | ID of the course section minimum: `1`. |

#### update_course_section

Update a course section. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-course-section --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `section_id` | integer | Yes | ID of the course section minimum: `1`. |
| `name` | string | Body | Name (body input). |

#### create_direct_upload

Create Direct Upload. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-direct-upload --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `blob` | object | Body | Blob (body input). Object requires: `key`, `filename`, `content_type`, `byte_size`, `checksum`. |

#### create_embed

Create Embed. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-embed --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `url` | string | Body | The URL to embed (e.g., YouTube, Vimeo, etc.) |

#### get_embed

Get Embed. Reads community data.

```bash
circle-cli get-embed --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `sgid` | string | Yes | The sgid of the embed |

#### create_event_attendee

Create Event Attendee. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-event-attendee --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_email` | string | No | Member Email |
| `event_id` | string | No | Event ID |

#### delete_event_attendee

Delete Event Attendee. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-event-attendee --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_email` | string | No | Member Email |
| `event_id` | string | No | Event ID |

#### list_event_attendees

List Event Attendees. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-event-attendees --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `event_id` | string | Yes | Event ID |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### create_event

Create Event. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-event --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `event` | object | Body | Event (body input). Object requires: `name`, `space_id`, `status`. |
| `space_id` | integer | Body | Space id (body input). |

#### list_events

List Events. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-events --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `space_id` | integer | No | Filter events by event space ID |
| `filter_date_start_date` | string | No | Start date for filtering events (format: YYYY-MM-DD) format: `date`. |
| `filter_date_end_date` | string | No | End date for filtering events (format: YYYY-MM-DD) format: `date`. |
| `sort` | string | No | Sort events - oldest (by created_at), start_date (by starts_at ascending), start_date_desc (by starts_at descending), default is newest (by published_at) Values: `oldest`, `start_date`, `start_date_desc`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_event

Delete Event. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-event --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `event_id` | integer | Yes | Event ID minimum: `1`. |
| `space_id` | integer | Yes | Space ID |

#### get_event

Get Event. Reads community data.

```bash
circle-cli get-event --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `event_id` | integer | Yes | Event ID minimum: `1`. |

#### update_event

Update Event. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-event --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `event_id` | integer | Yes | Event ID minimum: `1`. |
| `event` | object | Body | Event (body input). Object requires: `name`, `space_id`, `status`. |
| `space_id` | integer | Body | Space id (body input). |

#### duplicate_event

Duplicate Event. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli duplicate-event --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Space ID minimum: `1`. |
| `event_id` | integer | Yes | Event ID minimum: `1`. |
| `event` | object | Body | Event (body input). Object requires: `space_id`. |

#### get_filter_configuration

Get the filters currently shown on the member directory or a member space. Reads community data.

```bash
circle-cli get-filter-configuration --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `context` | string | Yes | Surface to inspect. Use member_directory for the community directory or member_space for a specific members space. Values: `member_directory`, `member_space`. |
| `space_id` | integer | No | Members space ID. Required when context is member_space. |

#### create_filter_control

Create a member filter control. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-filter-control --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `key` | string | Body | Filter to control; profile_field requires profile_field_id Values: `contact_search`, `near_me`, `online`, `recently_joined`, `location`, `tags`, `profile_field`, `spaces`, `space_groups`, `global`. |
| `enabled` | boolean | Body | Whether to show the filter |
| `space_id` | integer | No | Member space ID; omit for the member directory |
| `profile_field_id` | integer | No | Profile field ID; allowed only when key is profile_field |
| `sort_key` | integer | No | Optional ordering position; lower values sort first |

#### list_filter_controls

List member directory and member space filter controls. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-filter-controls --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | No | Only controls for this member space |
| `member_directory_only` | boolean | No | Only member-directory controls that are not scoped to a space |
| `enabled` | boolean | No | Only enabled or disabled controls |
| `key` | string | No | Only controls for this filter key Values: `contact_search`, `near_me`, `online`, `recently_joined`, `location`, `tags`, `profile_field`, `spaces`, `space_groups`, `global`. |
| `profile_field_id` | integer | No | Only controls for this profile field |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page (max 100) minimum: `1`. maximum: `100`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_filter_control

Delete a filter control. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-filter-control --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `filter_control_id` | integer | Yes | ID of the filter control to delete minimum: `1`. |

#### get_filter_control

Get a filter control. Reads community data.

```bash
circle-cli get-filter-control --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `filter_control_id` | integer | Yes | Filter control ID minimum: `1`. |

#### update_filter_control

Update a member directory or member space filter control. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-filter-control --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `filter_control_id` | integer | Yes | Filter control ID. Use list_filter_kit_controls if the ID is unknown. minimum: `1`. |
| `key` | string | No | Filter to control. Values: `contact_search`, `near_me`, `online`, `recently_joined`, `location`, `tags`, `profile_field`, `spaces`, `space_groups`, `global`. |
| `enabled` | boolean | No | Whether the filter is shown. Set false to hide it. |
| `space_id` | integer | No | Member space ID to move this control to. |
| `profile_field_id` | integer | No | Profile field ID for a profile_field control. |
| `sort_key` | integer | No | Ordering position; lower values sort first. |

#### report_flagged_content

Report Flagged Content. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli report-flagged-content --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `flagged_content` | object | Body | Flagged content (body input). Object requires: `content_id`, `content_type`, `reported_reason_type`, `reported_reason_body`. |

#### list_flagged_content

List Flagged Contents. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-flagged-content --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `status` | string | No | Status. Default: 'all'. Values: `all`, `inbox`, `approved`, `rejected`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_form

Delete a form. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-form --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `form_id` | integer | Yes | Form ID minimum: `1`. |

#### get_form

Show a form. Reads community data.

```bash
circle-cli get-form --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `form_id` | integer | Yes | Form ID minimum: `1`. |

#### update_form

Update a form. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-form --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `form_id` | integer | Yes | Form ID minimum: `1`. |
| `name` | string | No | Name (body input). |
| `after_submission_action` | string | No | After submission action (body input). Values: `thank_you_page`, `redirect`. |
| `embed_display_format` | string | No | Embed display format (body input). Values: `inline`, `popup`. |
| `redirect_url` | string/null | No | Redirect url (body input). |
| `status` | string | No | Status (body input). Values: `draft`, `published`. |
| `thank_you_page_title` | string/null | No | Thank you page title (body input). |
| `thank_you_page_body` | string/null | No | Thank you page body (body input). |
| `popup_delay` | integer | No | Popup delay (body input). |
| `popup_frequency` | integer | No | Popup frequency (body input). |
| `embed_styles` | object/null | No | Embed styles (body input). |
| `standalone_page_styles` | object/null | No | Standalone page styles (body input). |
| `elements` | array | No | Elements (body input). Array items: object. |

#### duplicate_form

Duplicate a form. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli duplicate-form --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `form_id` | string | Yes | ID of the form to duplicate |

#### list_forms

List Forms. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-forms --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `name` | string | No | Filter by form name |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### create_form_submission

Create a form submission. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-form-submission --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `form_id` | integer | Yes | Form ID minimum: `1`. |
| `elements` | array | Body | Elements (body input). Array items: object. |
| `submission_on_behalf_of` | string/null | No | Email of the contact on behalf of which the submission is being created |

#### get_form_submissions

List form submissions. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli get-form-submissions --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `form_id` | integer | Yes | Form ID minimum: `1`. |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### get_leaderboard

Show Leaderboard. Reads community data.

```bash
circle-cli get-leaderboard --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `period` | string | No | Leaderboard period, default is all time Values: `30_days`, `7_days`. |

#### create_image_post

Create Image Post. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-image-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Image space ID minimum: `1`. |
| `slug` | string | No | Slug (body input). |
| `status` | string | No | Status (body input). Values: `draft`, `published`, `scheduled`. |
| `is_liking_enabled` | boolean | No | Is liking enabled (body input). |
| `is_comments_enabled` | boolean | No | Is comments enabled (body input). |
| `topics` | array | No | Topics (body input). Array items: integer. |
| `tiptap_body` | object | No | Tiptap body (body input). |
| `gallery_attributes` | object | Body | Gallery attributes (body input). |
| `user_email` | string | No | email of the author (preferred over user_id) |
| `user_id` | integer | No | id of the author |
| `is_pinned` | boolean | No | whether the post should be pinned to the top |

#### list_image_posts

List Image Posts. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-image-posts --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Image space ID minimum: `1`. |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_image_post

Delete Image Post. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-image-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Image space ID minimum: `1`. |
| `post_id` | integer | Yes | Image post ID minimum: `1`. |

#### get_image_post

Show Image Post. Reads community data.

```bash
circle-cli get-image-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Image space ID minimum: `1`. |
| `post_id` | integer | Yes | Image post ID minimum: `1`. |

#### duplicate_image_post

Duplicate Image Post. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli duplicate-image-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Image space ID minimum: `1`. |
| `post_id` | integer | Yes | Image post ID minimum: `1`. |
| `post` | object | No | Post (body input). |

#### create_invitation

Create invitation link. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-invitation --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `name` | string | Body | Name for the invitation link |
| `redirect_space_id` | integer | No | ID of the space to open after signup |
| `access_group_ids` | array | No | Access group IDs to attach. Presence, including an empty array, selects access-group mode Array items: integer. |
| `member_tag_ids` | array | No | Member tag IDs to apply when the link is used Array items: integer. |
| `paywall` | object/null | No | Optional paywall configuration |

#### list_invitations

List Invitation Links. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-invitations --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `name` | string | No | Filter by invitation link name |
| `status` | string | No | Filter by invitation link status Values: `active`, `revoked`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_invitation_link

Delete invitation link. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-invitation-link --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `invitation_id` | integer | Yes | Invitation link ID minimum: `1`. |

#### update_invitation_link

Update invitation link. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-invitation-link --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `invitation_id` | integer | Yes | Invitation link ID minimum: `1`. |
| `name` | string | No | Name for the invitation link |
| `redirect_space_id` | integer/null | No | ID of the space to open after signup. Set to null to remove the existing redirect |
| `access_group_ids` | array | No | Access group IDs to attach; fully replaces the current set (empty array detaches all) Array items: integer. |
| `member_tag_ids` | array | No | Member tag IDs to apply when the link is used Array items: integer. |
| `paywall` | object/null | No | Paywall configuration. Set to null to remove the existing paywall configuration |

#### revoke_invitation_link

Revoke invitation link. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli revoke-invitation-link --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `invitation_id` | integer | Yes | Invitation link ID minimum: `1`. |

#### list_live_rooms

List Live Rooms. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-live-rooms --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### list_live_room_transcripts

List Live Room Transcripts. Reads community data.

```bash
circle-cli list-live-room-transcripts --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `room_id` | integer | Yes | Live Room ID minimum: `1`. |

#### search_locations

Search locations. Reads community data.

```bash
circle-cli search-locations --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `query` | string | Yes | Free-text location query (e.g. 'San Francisco, CA' or 'Berlin'). |

#### create_member_tag

Create Member Tag. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-member-tag --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `color` | string | No | Color (body input). |
| `display_format` | string | No | Display format (body input). Values: `label`, `icon`. |
| `emoji` | string | No | Emoji (body input). |
| `is_background_enabled` | boolean | No | Is background enabled (body input). |
| `is_public` | boolean | No | Is public (body input). |
| `name` | string | No | Name (body input). |
| `display_locations` | object | No | Display locations (body input). |
| `custom_emoji` | object | No | Custom emoji (body input). |

#### list_member_tags

Member Tags List. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-member-tags --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `name` | string | No | Name of the member tag |
| `is_public` | boolean | No | Whether the member tag is public |
| `sort` | string | No | Sorting parameters (sort by name in ascending order, name in descending order, and by newest. Default is oldest) Values: `oldest`, `newest`, `alphabetical`, `alphabetical_desc`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_member_tag

Deletes a member tag. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-member-tag --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `tag_id` | integer | Yes | Member tag ID minimum: `1`. |

#### get_member_tag

Shows a member tag's details. Reads community data.

```bash
circle-cli get-member-tag --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `tag_id` | integer | Yes | Member tag ID minimum: `1`. |

#### update_member_tag

Update member tag. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-member-tag --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `tag_id` | integer | Yes | Member tag ID minimum: `1`. |
| `color` | string | No | Color (body input). |
| `display_format` | string | No | Display format (body input). Values: `label`, `icon`. |
| `emoji` | string | No | Emoji (body input). |
| `is_background_enabled` | boolean | No | Is background enabled (body input). |
| `is_public` | boolean | No | Is public (body input). |
| `name` | string | No | Name (body input). |
| `display_locations` | object | No | Display locations (body input). |
| `custom_emoji` | object | No | Custom emoji (body input). |

#### send_message

Create Message. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli send-message --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `rich_text_body` | object/null | No | Rich text body (body input). |
| `user_email` | string | No | User email (body input). |
| `user_emails` | array | No | User emails (body input). Array items: string. |
| `chat_room_uuid` | string | No | Chat room uuid (body input). |
| `parent_message_id` | integer | No | Parent message id (body input). |

#### list_page_profile_fields

Get Page Profile Fields. Reads community data.

```bash
circle-cli list-page-profile-fields --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page_name` | string | Yes | Page name Values: `signup`, `edit_profile`, `profile_view`, `community_view`. |

#### get_payment_method_settings

Retrieves the community's payment method preferences. Reads community data.

```bash
circle-cli get-payment-method-settings --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| None | Not applicable | No | Shared account/confirmation controls only. |

#### export_paywall_affiliate_payouts

Export Paywall Affiliate Payouts. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli export-paywall-affiliate-payouts --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `community_member_ids` | array | No | Community member IDs to scope the export to (max 20 per request). Omit to export all processing payouts. maxItems: `20`. Array items: integer. |

#### mark_paywall_affiliate_payouts_paid

Mark Paywall Affiliate Payouts Paid. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli mark-paywall-affiliate-payouts-paid --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `community_member_ids` | array | No | Community member IDs to scope the mark-paid to (max 20 per request). Omit to mark all processing payouts as paid. maxItems: `20`. Array items: integer. |

#### start_paywall_affiliate_payouts

Start Paywall Affiliate Payouts. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli start-paywall-affiliate-payouts --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `community_member_ids` | array | No | Community member IDs to scope the start to (max 20 per request). Omit to start all due payouts. maxItems: `20`. Array items: integer. |

#### list_paywall_affiliates

Paywall Affiliates List. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-paywall-affiliates --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Records per page (max 100) minimum: `1`. maximum: `100`. |
| `filters` | object | No | Filters |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### invite_paywall_affiliates

Invite Paywall Affiliates. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli invite-paywall-affiliates --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `existing_member_ids` | array | Body | Community member IDs to invite (max 20 per request). Must belong to the current community. maxItems: `20`. Array items: integer. |

#### update_paywall_affiliate

Update Paywall Affiliate. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-paywall-affiliate --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `affiliate_id` | integer | Yes | Affiliate ID minimum: `1`. |
| `status` | string | No | Status (body input). |

#### delete_paywall_coupon

Deletes a paywall coupon. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-paywall-coupon --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `id` | integer | Yes | Paywall coupon ID minimum: `1`. |

#### create_paywall_group

Create Subscription Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-paywall-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `name` | string | Body | Name (body input). |
| `currency_id` | integer | Body | ID of the currency the group's paywalls are priced in |

#### update_paywall_group

Update Subscription Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-paywall-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `paywall_group_id` | integer | Yes | Subscription group ID minimum: `1`. |
| `name` | string | No | Name (body input). |
| `currency_id` | integer | No | ID of the currency the group's paywalls are priced in |

#### search_paywalls

Search Paywalls. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli search-paywalls --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Records per page (max 100) minimum: `1`. maximum: `100`. |
| `name` | string | No | Filter by paywall name or display name (partial match) |
| `status` | string | No | Comma-separated list of statuses (e.g. draft,active,inactive) |
| `currency` | string | No | Comma-separated list of currency codes |
| `paywall_id` | string | No | Comma-separated list of paywall IDs to include |
| `exclude_paywall_id` | string | No | Comma-separated list of paywall IDs to exclude |
| `subscription_group_id` | string | No | Comma-separated list of subscription group IDs to include |
| `exclude_subscription_group_id` | string | No | Comma-separated list of subscription group IDs to exclude |
| `sort` | string | No | Sort field (one of: title, status, created_at). Defaults to created_at |
| `direction` | string | No | Sort direction (asc or desc). Defaults to desc. Only takes effect when sort is also given -- direction alone is ignored |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_paywall

Deletes a paywall. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-paywall --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `paywall_id` | integer | Yes | Paywall ID minimum: `1`. |

#### archive_paywall

Archives a paywall. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli archive-paywall --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `paywall_id` | integer | Yes | Paywall ID minimum: `1`. |

#### publish_paywall

Publishes a paywall. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli publish-paywall --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `paywall_id` | integer | Yes | Paywall ID minimum: `1`. |

#### unarchive_paywall

Unarchives a paywall. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli unarchive-paywall --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `paywall_id` | integer | Yes | Paywall ID minimum: `1`. |

#### unfollow_post

Unfollow a post. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli unfollow-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `post_id` | integer | Yes | Post ID minimum: `1`. |
| `community_member_id` | integer | Yes | Community Member ID |

#### create_post

Create Basic Post. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Body | Space id (body input). |
| `status` | string | No | Status (body input). Values: `draft`, `published`, `scheduled`. |
| `name` | string | Body | Name (body input). |
| `slug` | string | No | Slug (body input). |
| `tiptap_body` | object | No | Tiptap body (body input). |
| `cover_image` | string | No | signed_id of the cover image |
| `internal_custom_html` | string | No | Internal custom html (body input). |
| `is_truncation_disabled` | boolean | No | Is truncation disabled (body input). |
| `is_comments_closed` | boolean | No | Is comments closed (body input). |
| `is_comments_enabled` | boolean | No | Is comments enabled (body input). |
| `is_liking_enabled` | boolean | No | Is liking enabled (body input). |
| `hide_meta_info` | boolean | No | Hide meta info (body input). |
| `hide_from_featured_areas` | boolean | No | Hide from featured areas (body input). |
| `meta_title` | string | No | Meta title (body input). |
| `meta_description` | string | No | Meta description (body input). |
| `opengraph_title` | string | No | Opengraph title (body input). |
| `opengraph_description` | string | No | Opengraph description (body input). |
| `published_at` | string | No | Published at (body input). |
| `created_at` | string | No | Created at (body input). |
| `topics` | array | No | Topics (body input). Array items: integer. |
| `skip_notifications` | boolean | No | Skip notifications (body input). |
| `is_pinned` | boolean | No | Is pinned (body input). |
| `user_email` | string | No | email of the author (preferred over user_id) |
| `user_id` | integer | No | id of the author |

#### list_posts

List Basic Posts. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-posts --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `space_id` | integer | No | Basic type space ID |
| `space_group_id` | integer | No | Space Group ID |
| `status` | string | No | Post status Values: `draft`, `published`, `scheduled`, `all`. |
| `search_text` | string | No | Search text |
| `sort` | string | No | Sort by Values: `oldest`, `latest`, `alphabetical`, `likes`, `latest_updated`, `oldest_updated`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_post

Delete Basic Post. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `post_id` | string | Yes | Post id (path input). |

#### get_post

Show Basic Post. Reads community data.

```bash
circle-cli get-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `post_id` | integer | Yes | Post ID minimum: `1`. |

#### update_post

Update Basic Post. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `post_id` | string | Yes | Post id (path input). |
| `tiptap_body` | object | No | The Tiptap body will be updated only for posts that already contain a Tiptap body. If the post does not have a Tiptap body, the tiptap_body will be ignored. |
| `name` | string | No | Name (body input). |
| `cover_image` | string | No | signed_id of the cover image |
| `internal_custom_html` | string | No | Internal custom html (body input). |
| `is_truncation_disabled` | boolean | No | Is truncation disabled (body input). |
| `is_comments_closed` | boolean | No | Is comments closed (body input). |
| `is_comments_enabled` | boolean | No | Is comments enabled (body input). |
| `is_liking_enabled` | boolean | No | Is liking enabled (body input). |
| `hide_meta_info` | boolean | No | Hide meta info (body input). |
| `hide_from_featured_areas` | boolean | No | Hide from featured areas (body input). |
| `meta_title` | string | No | Meta title (body input). |
| `meta_description` | string | No | Meta description (body input). |
| `opengraph_title` | string | No | Opengraph title (body input). |
| `opengraph_description` | string | No | Opengraph description (body input). |
| `published_at` | string | No | Published at (body input). |
| `topics` | array | No | Topics (body input). Array items: integer. |
| `skip_notifications` | boolean | No | Skip notifications (body input). |
| `is_pinned` | boolean | No | Is pinned (body input). |

#### get_post_summary

Get Post Summary. Reads community data.

```bash
circle-cli get-post-summary --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `post_id` | integer | Yes | Post ID minimum: `1`. |

#### archive_profile_field

Archive Profile Field. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli archive-profile-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `profile_field_id` | integer | Yes | Profile field ID minimum: `1`. |

#### create_profile_field

Create Profile Field. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-profile-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `profile_field` | object | Body | Profile field (body input). Object requires: `label`, `field_type`, `key`, `pages_attributes`. |

#### list_profile_fields

Profile Fields List. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-profile-fields --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `label` | string | No | Filter by label (case-insensitive partial match) |
| `archived` | string | No | Set to 'true' to search archived profile fields, omit or set to 'false' for active fields |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_profile_field

Delete Profile Field. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-profile-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `profile_field_id` | integer | Yes | Archived profile field ID minimum: `1`. |

#### update_profile_field

Update Profile Field. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-profile-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `profile_field_id` | integer | Yes | Profile field ID minimum: `1`. |
| `profile_field` | object | Body | Profile field (body input). |

#### unarchive_profile_field

Unarchive Profile Field. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli unarchive-profile-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `profile_field_id` | integer | Yes | Profile field ID minimum: `1`. |

#### get_connect_settings

Get Connect settings. Reads community data.

```bash
circle-cli get-connect-settings --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| None | Not applicable | No | Shared account/confirmation controls only. |

#### update_connect_settings

Update Connect settings. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-connect-settings --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `connect` | object | No | Connect (body input). |
| `member_directory` | object | No | Member directory (body input). |
| `messaging` | object | No | Messaging (body input). |

#### create_space_group_member

Create Space Group Member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-space-group-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_group_id` | integer | Body | Space group id (body input). |
| `email` | string | Body | Email (body input). |

#### delete_space_group_member

Destroy Space Group Member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-space-group-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `email` | string | Yes | Email of the user |
| `space_group_id` | integer | Yes | ID of the space group |

#### list_space_group_members

List Space Group Members. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-space-group-members --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `space_group_id` | integer | Yes | Space Group ID |
| `status` | string | No | Space group member status. By default, it returns all members. Values: `active`, `inactive`, `all`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### get_space_group_member

Show Space Group Member. Reads community data.

```bash
circle-cli get-space-group-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `email` | string | Yes | Email of the user |
| `space_group_id` | integer | Yes | ID of the space group |

#### create_space_group

Create Space Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-space-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `name` | string | Body | Name (body input). |
| `slug` | string | Body | Slug (body input). |
| `is_hidden_from_non_members` | boolean | No | Is hidden from non members (body input). |
| `hide_members_count` | boolean | No | Hide members count (body input). |
| `allow_members_to_create_spaces` | boolean | No | Allow members to create spaces (body input). |
| `automatically_add_members_to_new_spaces` | boolean | No | Automatically add members to new spaces (body input). |
| `add_members_to_space_group_on_space_join` | boolean | No | Add members to space group on space join (body input). |
| `hide_non_member_spaces_from_sidebar` | boolean | No | Hide non member spaces from sidebar (body input). |

#### list_space_groups

List Space Groups. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-space-groups --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `name` | string | No | Filter by name |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_space_group

Delete Space Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-space-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_group_id` | integer | Yes | Space Group ID minimum: `1`. |

#### get_space_group

Show Space Group. Reads community data.

```bash
circle-cli get-space-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_group_id` | integer | Yes | Space Group ID minimum: `1`. |

#### update_space_group

Update Space Group. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-space-group --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_group_id` | integer | Yes | Space Group ID minimum: `1`. |
| `name` | string | No | Name (body input). |
| `slug` | string | No | Slug (body input). |
| `is_hidden_from_non_members` | boolean | No | Is hidden from non members (body input). |
| `hide_members_count` | boolean | No | Hide members count (body input). |
| `allow_members_to_create_spaces` | boolean | No | Allow members to create spaces (body input). |
| `automatically_add_members_to_new_spaces` | boolean | No | Automatically add members to new spaces (body input). |
| `add_members_to_space_group_on_space_join` | boolean | No | Add members to space group on space join (body input). |
| `hide_non_member_spaces_from_sidebar` | boolean | No | Hide non member spaces from sidebar (body input). |
| `moderator_community_member_ids` | array | No | Array of community member ids to add as moderators Array items: integer. |

#### add_space_member

Add Space Member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli add-space-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `email` | string | Body | Email (body input). |
| `space_id` | integer | Body | Space id (body input). |

#### remove_space_member

Remove Space Member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli remove-space-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `email` | string | Yes | Email |
| `space_id` | integer | Yes | Space ID |

#### list_space_members

List Space Members. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-space-members --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `space_id` | integer | Yes | Space ID |
| `status` | string | No | Space member status. By default, it returns all members. Values: `active`, `inactive`, `all`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### get_space_member

Show Space Member. Reads community data.

```bash
circle-cli get-space-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `email` | string | Yes | Email |
| `space_id` | integer | Yes | Space ID |

#### get_space_ai_summaries

Summarize a space. Reads community data.

```bash
circle-cli get-space-ai-summaries --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Space ID minimum: `1`. |
| `date_from` | string | No | Filters messages created after the provided ISO8601 timestamp format: `date-time`. |
| `first_unread_message_id` | integer | No | First unread message ID to include additional chat context |

#### create_space

Create Space. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-space --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `name` | string | Body | Name (body input). |
| `slug` | string | Body | Slug (body input). |
| `cover_image` | string | No | signed_id of the cover image |
| `cover_image_visible` | boolean | No | Cover image visible (body input). |
| `cover_image_display_style` | string | No | Cover image display style (body input). Values: `normal`, `wide`. |
| `is_private` | boolean | No | Is private (body input). |
| `is_hidden_from_non_members` | boolean | No | Is hidden from non members (body input). |
| `is_hidden` | boolean | No | Is hidden (body input). |
| `locked_button_url` | string | No | Locked button url (body input). |
| `locked_button_label` | string | No | Locked button label (body input). |
| `locked_page_heading` | string | No | Locked page heading (body input). |
| `locked_page_description` | string | No | Locked page description (body input). |
| `is_post_disabled` | boolean | No | Is post disabled (body input). |
| `default_sort` | string | No | Default sort (body input). |
| `hide_sorting` | boolean | No | Hide sorting (body input). |
| `space_group_id` | integer | Body | Space group id (body input). |
| `topics` | array | No | Topics (body input). Array items: integer. |
| `custom_emoji` | object | No | Custom emoji (body input). |
| `space_type` | string | No | Space type (body input). Values: `basic`, `event`, `members`, `image`, `course`, `chat`. |
| `event_auto_rsvp_enabled` | boolean | No | Only for event spaces |
| `default_in_app_notification_setting` | string | No | Members will see an in-app notification when new events are posted Values: `never`, `all`. |
| `default_mobile_notification_setting` | string | No | Members will see a mobile notification when new events are posted Values: `never`, `all`. |
| `default_notification_setting` | string | No | Members will receive an email notification when new events are posted Values: `never`, `all`. |
| `course_setting` | object | No | Course space configuration |
| `thumbnail_image` | string | No | signed_id of the thumbnail image for event spaces |
| `default_mention_in_app_notification_setting` | string | No | Members will see an in-app notification when mentioned Values: `never`, `all`. |
| `default_mention_mobile_notification_setting` | string | No | Members will see a mobile notification when mentioned Values: `never`, `all`. |
| `hide_from_sidebar` | boolean | No | Hide space from sidebar navigation |
| `hide_right_sidebar` | boolean | No | Hide right sidebar in space |
| `require_topic_selection` | boolean | No | Require topic selection when posting |
| `display_view` | string | No | Default display view for the space Values: `posts`, `cards`, `list`, `thumbnail`, `feed`, `masonry`, `grid`, `calendar`. |
| `prevent_members_from_adding_others` | boolean | No | Prevent members from adding other members to the space |
| `hide_from_featured_areas` | boolean | No | Hide space from featured areas |
| `disable_member_post_covers` | boolean | No | Disable cover images on member posts |
| `hide_members_count` | boolean | No | Hide the member count display |
| `pinned_posts_label` | string | No | Custom label for pinned posts |
| `show_lock_icon_for_non_members` | boolean | No | Show lock icon for non-members |
| `hide_post_settings` | boolean | No | Hide post settings |
| `default_comment_sort` | string | No | Default sort order for comments Values: `oldest`, `latest`. |
| `default_member_sort` | string | No | Default sort order for members Values: `oldest`, `latest`, `alphabetical`. |
| `emoji` | string | No | Simple emoji string for the space |
| `default_tab` | string | No | Default tab to show when entering the space |
| `show_tab_bar` | boolean | No | Show the tab bar navigation |
| `show_next_event` | boolean | No | Show next event information for event spaces |
| `visible_tabs` | object | No | Visible tabs configuration for the space |
| `meta_tag_attributes` | object | No | SEO meta tag attributes |

#### list_spaces

List Spaces. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-spaces --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `sort` | string | No | Sort by Values: `active`, `oldest`, `alphabetical`, `likes`, `latest_updated`, `oldest_updated`, `latest_profile_confirmed`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_space

Delete a space. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-space --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Space ID minimum: `1`. |

#### get_space

Show a space. Reads community data.

```bash
circle-cli get-space --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Space ID minimum: `1`. |

#### update_space

Update Space. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-space --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `space_id` | integer | Yes | Space ID minimum: `1`. |
| `name` | string | No | Name (body input). |
| `cover_image` | string | No | signed_id of the cover image |
| `cover_image_visible` | boolean | No | Cover image visible (body input). |
| `cover_image_display_style` | string | No | Cover image display style (body input). Values: `normal`, `wide`. |
| `is_private` | boolean | No | Is private (body input). |
| `is_hidden_from_non_members` | boolean | No | Is hidden from non members (body input). |
| `is_draft` | boolean | No | Only valid for course spaces; set to false to publish a course |
| `is_hidden` | boolean | No | Is hidden (body input). |
| `locked_button_url` | string | No | Locked button url (body input). |
| `locked_button_label` | string | No | Locked button label (body input). |
| `locked_page_heading` | string | No | Locked page heading (body input). |
| `locked_page_description` | string | No | Locked page description (body input). |
| `is_post_disabled` | boolean | No | Is post disabled (body input). |
| `default_sort` | string | No | Default sort (body input). |
| `hide_sorting` | boolean | No | Hide sorting (body input). |
| `space_group_id` | integer | No | Space group id (body input). |
| `topics` | array | No | Topics (body input). Array items: integer. |
| `custom_emoji` | object | No | Custom emoji (body input). |
| `event_auto_rsvp_enabled` | boolean | No | Only for event spaces |
| `default_in_app_notification_setting` | string | No | Members will see an in-app notification when new events are posted Values: `never`, `all`. |
| `default_mobile_notification_setting` | string | No | Members will see a mobile notification when new events are posted Values: `never`, `all`. |
| `default_notification_setting` | string | No | Members will receive an email notification when new events are posted Values: `never`, `all`. |
| `course_setting_attributes` | object | No | Course space configuration |
| `thumbnail_image` | string | No | signed_id of the thumbnail image for event spaces |
| `default_mention_in_app_notification_setting` | string | No | Members will see an in-app notification when mentioned Values: `never`, `all`. |
| `default_mention_mobile_notification_setting` | string | No | Members will see a mobile notification when mentioned Values: `never`, `all`. |
| `hide_from_sidebar` | boolean | No | Hide space from sidebar navigation |
| `hide_right_sidebar` | boolean | No | Hide right sidebar in space |
| `require_topic_selection` | boolean | No | Require topic selection when posting |
| `display_view` | string | No | Default display view for the space Values: `posts`, `cards`, `list`, `thumbnail`, `feed`, `masonry`, `grid`, `calendar`. |
| `prevent_members_from_adding_others` | boolean | No | Prevent members from adding other members to the space |
| `hide_from_featured_areas` | boolean | No | Hide space from featured areas |
| `disable_member_post_covers` | boolean | No | Disable cover images on member posts |
| `hide_members_count` | boolean | No | Hide the member count display |
| `pinned_posts_label` | string | No | Custom label for pinned posts |
| `show_lock_icon_for_non_members` | boolean | No | Show lock icon for non-members |
| `hide_post_settings` | boolean | No | Hide post settings |
| `default_comment_sort` | string | No | Default sort order for comments Values: `oldest`, `latest`. |
| `default_member_sort` | string | No | Default sort order for members Values: `oldest`, `latest`, `alphabetical`. |
| `emoji` | string | No | Simple emoji string for the space |
| `default_tab` | string | No | Default tab to show when entering the space |
| `show_tab_bar` | boolean | No | Show the tab bar navigation |
| `show_next_event` | boolean | No | Show next event information for event spaces |
| `visible_tabs` | object | No | Visible tabs configuration for the space |
| `meta_tag_attributes` | object | No | SEO meta tag attributes |
| `chat_room_show_history` | boolean | No | Show chat history to new members in chat spaces |
| `chat_room_description` | string | No | Description for the chat room in chat spaces |

#### tag_member

Create Tagged Member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli tag-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `member_tag_id` | integer | Body | Member tag id (body input). |
| `user_email` | string | Body | User email (body input). |

#### untag_member

Delete Tagged Member. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli untag-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `user_email` | string | Yes | User Email |
| `member_tag_id` | integer | Yes | Member Tag ID |

#### list_tagged_members

List Tagged Members. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-tagged-members --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `member_tag_ids` | array | No | Filter by Member Tag IDs (OR logic, comma-separated) Array items: integer. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### get_tagged_member

Get Tagged Member. Reads community data.

```bash
circle-cli get-tagged-member --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `tagged_member_id` | string | Yes | Tagged Member ID |

#### get_tax_settings

Get tax settings. Reads community data.

```bash
circle-cli get-tax-settings --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| None | Not applicable | No | Shared account/confirmation controls only. |

#### update_tax_settings

Update tax settings. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-tax-settings --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `tax_setting` | object | No | Tax setting (body input). |

#### create_topic

Create a topic. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli create-topic --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `name` | string | No | Name (body input). |
| `admin_only` | boolean | No | Toggles if only admins and moderators can select this topic |
| `space_ids` | array | No | Array of space IDs to be assigned to the topic Array items: integer. |

#### list_topics

List topics. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-topics --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page` | integer | No | Page number minimum: `1`. |
| `per_page` | integer | No | Number of records per page minimum: `1`. maximum: `100`. |
| `name` | string | No | query by name |
| `sort` | string | No | Sorting parameters (sort by name in ascending order, name in descending order, and by newest. Default is oldest) Values: `oldest`, `newest`, `alphabetical`, `alphabetical_desc`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### delete_topic

Delete a topic. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli delete-topic --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `topic_id` | integer | Yes | Topic ID minimum: `1`. |

#### get_topic

Show topic details. Reads community data.

```bash
circle-cli get-topic --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `topic_id` | integer | Yes | Topic ID minimum: `1`. |

#### update_topic

Update a topic. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli update-topic --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `topic_id` | integer | Yes | Topic ID minimum: `1`. |
| `name` | string | No | Name (body input). |
| `admin_only` | boolean | No | Toggles if only admins and moderators can select this topic |
| `space_ids` | array | No | Array of space IDs to be assigned to the topic Array items: integer. |

#### activate_workflow

Activate an automation (dynamic) workflow so it starts running automatically. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli activate-workflow --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `id` | string | Yes | UUID of the workflow to activate format: `uuid`. |

#### deactivate_workflow

Deactivate an automation (dynamic) workflow so it stops running automatically. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli deactivate-workflow --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `id` | string | Yes | UUID of the workflow to deactivate format: `uuid`. |

#### duplicate_workflow

Duplicate a workflow. Changes community state and requires confirm=true for the user-requested action.

```bash
circle-cli duplicate-workflow --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `id` | string | Yes | UUID of the workflow to duplicate |

#### list_workflows

List a community's automations/workflows. Reads community data. Supports bounded all_pages; every page counts against the API quota.

```bash
circle-cli list-workflows --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `query` | string | No | Filter by workflow name (substring match). |
| `status` | string | No | Filter by status. Omit to include archived; use `all` to exclude archived; use `archived` for only archived. Values: `draft`, `active`, `inactive`, `archived`, `all`. |
| `workflow_type` | string | No | Filter by type: dynamic (Automation), bulk_action (Bulk action), scheduled (Scheduled). Values: `dynamic`, `bulk_action`, `scheduled`. |
| `page` | integer | No | Page number (min 1) minimum: `1`. |
| `per_page` | integer | No | Records per page (max 100) minimum: `1`. maximum: `100`. |
| `all_pages` | boolean | No | Bounded page retrieval; each page consumes quota. |
| `max_items` | integer | No | Max items (control input). minimum: `1`. maximum: `10000`. default: `1000`. |

#### get_workflow

Get Workflow. Reads community data.

```bash
circle-cli get-workflow --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `id` | string | Yes | UUID of the workflow format: `uuid`. |

#### list_accounts

Lists configured account labels, default choice and auth method without tokens, paths or network calls. No arguments.

## 9. Community workflows

### Draft, inspect, then publish only when requested

Discover the intended basic space first. A basic post requires `space_id` and `name`; content uses `tiptap_body` and a nested Tiptap document rather than an invented plain `body` field. These illustrative IDs must be replaced with real discovered IDs:

```bash
circle-cli list-spaces --per-page 5 --agent
circle-cli create-post --space-id 7 --name "Community notes" --tiptap-body '{"body":{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Your actual post content."}]}]}}' --confirm --agent
circle-cli get-post --post-id 19 --agent
```

The wrapper defaults basic/image post creation to draft. Read that same post ID and inspect it in Circle. A later publishing/scheduling update needs the user's specific request and explicit status/confirmation. Review `skip_notifications`, timestamps and audience carefully. Do not overwrite a branded or complex document with a sample paragraph. See [Tiptap concepts](https://api.circle.so/get-started/concepts/tiptap-editor) and [rich text](https://api.circle.so/get-started/concepts/rich-text-body).

### Members, invitations and messages

Search/read the intended member before access changes. `create_member` invites a member unless the supplied supported fields change that behavior; `skip_invitation` can suppress an invitation. Use documented member IDs, emails, access-group IDs and tags, not a user's password in a model prompt. `remove_member` deactivates a membership; `delete_community_member` is a distinct deletion operation. Read schemas before choosing one.

`send_message` uses `rich_text_body` and exactly one recipient route (`user_email`, `user_emails` or `chat_room_uuid`) per the pinned body union. Publishing, comments, messages, invitations, event reminders and workflow activation can contact people. Guard confirmation does not establish consent or successful delivery. Only perform the requested operation.

### Events, courses and workflows

Events use a nested `event` object with event settings, location and reminder options, plus the operation's space input. Courses use current section/lesson IDs and documented bodies; progress updates have their own fields. Workflows use **UUIDs**, not the numeric IDs used by many other endpoints. Read and inspect the current workflow before confirmed activation. Deactivation, duplication and billing/subscription actions have different effects; tool availability never substitutes for the intended task.

## 10. Pagination, exports and uploads

### Bounded pages

The 33 reviewed paginated reads use native `page` and `per_page`; no cursor is invented. `all_pages` starts at the requested page or page 1, keeps page size fixed, stops at `max_items` (default 1,000, maximum 10,000) or 100 requests, and refuses empty/repeated continuing pages. The local per_page cap is 100. Responses retain the provider's records/metadata and add collected/pages/truncated/resume.

```bash
circle-cli list-members --per-page 25 --agent
circle-cli list-members --all-pages --max-items 500 --per-page 25 --agent
```

When a cap cuts through a page, `resume` contains that page, the fixed per_page and the count to skip after retrieving it again. When a full page is consumed, resume points to the next page with skip 0. Preserve the same query/filter/sort and do not change page size: doing so changes offset boundaries. This is not a consistent snapshot; concurrent community changes can shift records. The helper returns continuation state but does not offer an invented `--skip` API argument. One bounded result is not a complete backup guarantee.

### Exports and quota

Export tools are confirmed writes that may enqueue jobs or return download links; acceptance is not proof of completion. Preserve returned IDs/status and follow the documented account workflow. Keep membership/billing data and download URLs private. Every page/retry consumes allowance; a long Retry-After is surfaced instead of shortened into an early retry.

### File metadata and direct uploads

`create_direct_upload` creates the documented upload metadata/slot using blob key, filename, MIME type, byte_size and a Base64 MD5 checksum. It does **not** read a local file or complete the storage PUT for you. Follow [the upload protocol](https://api.circle.so/get-started/concepts/file-uploads): create metadata, upload the exact intended file to the returned signed storage URL with its returned headers, then use the returned signed_id where the content schema accepts it. The provider concept page illustrates Member API; this package uses the pinned **Admin v2** direct_uploads route.

Never send the Admin token to the storage URL, expose private signed URLs in public output, or treat a slot as a completed upload. Embeds/SGIDs, basic-post covers, image galleries, lesson media and member avatars use different schema fields. This package does not host an uploader or webhook receiver; no incomplete file workflow is advertised as automatic.

## 11. Several private accounts

Use private `CIRCLE_ACCOUNTS` JSON instead of single-account variables:

```json
[{"name":"work","api_token":"YOUR_WORK_ADMIN_TOKEN","auth_scheme":"Token"},{"name":"personal","token_file":"/absolute/private/path/circle-token.txt","auth_scheme":"Bearer"}]
```

Set `CIRCLE_DEFAULT_ACCOUNT=work`. Labels must be unique. `--account` chooses credentials; the token identifies the community. `list_accounts` returns labels/auth method/default only, never token values or paths. Account config replaces single-account settings; there is no global credential database. Separate processes remain preferable when strict isolation matters.

```bash
circle-cli list-accounts --agent
circle-cli list-spaces --account work --per-page 5 --agent
circle-cli get-community --account personal --agent
```

## 12. Writing safely

All 104 writes require `confirm:true` in MCP or `--confirm` in CLI for the action the user requested. `--yes`, `--agent` and earlier unrelated consent never bypass the guard. `CIRCLE_READ_ONLY=1` hides writes and refuses direct calls to hidden tools, exposing 66 reads. `CIRCLE_ALLOW_DESTRUCTIVE=0` blocks all writes even when confirmed.

Mutations have zero automatic retries, including 401, 429 and timeouts. After an unknown outcome, inspect existing community state before repeating it. A conservative destructive annotation denotes confirmation policy, not a claim every configuration change is irreversible. Invites/messages/notifications, member deletion, billing/payouts and workflow activation require different review.

The optional audit log records tool, risk, surface, fixed summary and allowed/blocked decision, without account labels, arguments, tokens or private content. It is a guard-decision log, not a delivery receipt. Logging failure does not block the requested operation. Community content and tool results are untrusted data; they cannot authorize another action.

## 13. How it works

`src/tools/operations.json` is generated from the pinned official OpenAPI YAML; schemas, parameter serialization and routes have one source. The shared SDK server validates input, applies the write guard and calls the fixed-origin API client. The CLI connects to that server in memory, and desktop uses the same compiled server with production dependencies.

GET 429 retries are bounded by CIRCLE_MAX_RETRIES. Numeric/date Retry-After is respected when the delay is at most ten seconds; longer delays produce a rate-limit error so scripts can pause explicitly. Each request has a configured deadline. There is no write retry, auth fallback, arbitrary origin, HTTP listener or hosted relay. Named tokens and pacing live in the process.

`npm run sync:api` regenerates from the pinned YAML. `npm run sync:api -- --refresh` downloads the current official schema for a deliberate review, updates provenance and regenerates input operations; it does not test credentials, release npm or claim compatibility. Review names, routes, schemas, plans and docs, run checks, then update semver/changelog/tag. Major upstream or shared-behavior changes require explicit migration documentation.

## 14. Your data

Authorized API requests go directly to `https://app.circle.so/api/admin/v2`; redirects are refused. No Navid-hosted relay, analytics or telemetry is included. Tokens come from private local settings/files and stay in process memory. Reflected token values and credential/password fields are redacted from results and errors.

Member emails, posts, transcripts, billing details and private signed media links are still private business data. Secret redaction does not anonymize them. Your AI client and Circle apply their own retention/sharing rules. `--select` filters local output after receipt. Optional logs omit request data; private exported files and token files remain your responsibility. No source, npm tarball or desktop archive may include real credentials or private account instructions. Report vulnerabilities privately via SECURITY.md.

## 15. Environment variables

Private client/shell settings only; no automatic .env loading.

| Variable | Default | Meaning |
| --- | --- | --- |
| CIRCLE_API_TOKEN | Empty | Private Admin V2 token |
| CIRCLE_TOKEN_FILE | Empty | Regular token-only file up to 64 KB; takes precedence |
| CIRCLE_AUTH_SCHEME | Token | Explicit Token/Bearer scheme; no fallback |
| CIRCLE_ACCOUNTS | Empty | Private named credential array; replaces single account |
| CIRCLE_DEFAULT_ACCOUNT | First configured label | Default local account |
| CIRCLE_READ_ONLY | 0 | Hide/refuse all writes |
| CIRCLE_ALLOW_DESTRUCTIVE | 1 | 0 blocks all writes |
| CIRCLE_AUDIT_LOG | None | Private guard-decision log |
| CIRCLE_REQUEST_TIMEOUT_MS | 30000 | Integer request deadline, 100–300000 ms |
| CIRCLE_MAX_RETRIES | 2 | GET 429 retries, 0–5 |
| CIRCLE_MIN_REQUEST_INTERVAL_MS | 200 | Per-account/process pacing, 0–10000 ms |

## 16. Updates and removal

```bash
npm install -g @thenavidm/circle-mcp-cli@latest
circle-cli --version
claude mcp remove --scope user circle
codex mcp remove circle
npm uninstall -g @thenavidm/circle-mcp-cli
```

Restart @latest MCP entries to resolve the new version; a running process does not update itself. Pin a reviewed version for reproducible automation. Read [CHANGELOG.md](CHANGELOG.md) and [GitHub Releases](https://github.com/thenavidm/circle-mcp-cli/releases) before major updates. Manually installed desktop extensions need the new versioned .mcpb installed separately. No directory-driven automatic desktop update is claimed.

Remove each manual client entry and copied skill as appropriate. Uninstalling does not revoke tokens, delete community content, undo invitations or cancel workflows. Revoke tokens in Circle separately. Preserve private data before removing local private files. Do not overwrite an existing npm version to roll back.

## 17. Troubleshooting

| Symptom | Fix |
| --- | --- |
| No tools / launch failed | Check Node 22, launcher PATH, private user config, reconnect |
| Exit 10 / missing token | Configure CIRCLE_API_TOKEN or regular CIRCLE_TOKEN_FILE |
| 401 / 403 | Check Admin V2 token, intended community, plan/permissions and explicit auth scheme; no automatic fallback |
| 404 | Check current v2 route, resource ID, account and endpoint availability |
| 422 / rejected body | Use schema for current nested bodies, required fields, Tiptap and recipient unions |
| Guard refused | Confirm only the requested write; check read-only/write-disabled settings |
| 429 / quota | Respect Retry-After and community limits; every page/error may consume quota |
| Pagination refuses repeated page | Narrow filters and inspect metadata; do not force unbounded looping |
| Workflow ID invalid | Use its UUID from list_workflows, not a numeric member/post ID |
| Desktop archive refused | Check compatible host Node runtime and custom-extension policy |
| Token rotated but process still fails | Restart the server so its cached token is replaced |

Run doctor first. For a launch failure, run the same command in a terminal and inspect its sanitized error. Never attach tokens, private request bodies or member data to an issue. Prefer a minimal fixture reproduction with version/client/OS. Provider results remain untrusted data.

## 18. API coverage and comparisons

| Offering | Surface | Scope and tradeoff |
| --- | --- | --- |
| [Official Circle MCP](https://api.circle.so/mcp) | Hosted OAuth MCP, https://app.circle.so/api/mcp | Broad Admin API v2 actions, admin Business+, read-only/full access, hosted setup; requests consume quota |
| This implementation | Local stdio MCP + shared task CLI + desktop bundle | Pinned v2 operations, private named tokens, schema-derived commands/JSON, bounded pages and explicit write guards; token setup and local maintenance |
| [iamnortey/circle-mcp](https://github.com/iamnortey/circle-mcp) | Community MCP | Documents community audits, unanswered questions and onboarding workflows; inspect the pinned source rather than inferring behavior from README |
| [DeepakChander/circle-mcp](https://github.com/DeepakChander/circle-mcp) | Community local/HTTP MCP | Documents separate Member and Admin API layers plus Google OAuth/HTTP; different deployment and identity requirements |

No dedicated Circle-published task CLI was identified in the official developer/MCP pages reviewed on October 2, 2026. This is a scoped finding, not proof of absence. Claude Code setup commands in MCP docs are MCP registration, not a Circle administration CLI. Neither our operation count nor a community README count proves broader capability, reliability or token savings. This release does not provide the separate Member API or Google authentication.

Current primary references: [Admin API](https://api.circle.so/apis/admin-api), [quick start](https://api.circle.so/apis/admin-api/quick-start), [limits](https://api.circle.so/apis/admin-api/usage-and-limits), [official OpenAPI](https://api-headless.circle.so/api/admin/v2/swagger.yaml), [official MCP](https://api.circle.so/mcp). See COMPARISON.md for review scope and pending evidence.

## 19. Versions

| Version | Date | Change |
| --- | --- | --- |
| 2.0.0 | October 2, 2026 | Current Admin v2 operations, shared CLI, private accounts, write guards, desktop bundle and complete reference |
| 1.0.0 | Legacy source | MCP-only implementation, 62 declared tools, mixed v1/v2 and manually assembled routes |

The OpenAPI document calls its info version `v1` while the routes are **Admin v2**. Provenance records both; do not rename the API based on that info field. Original upstream SHA-256: `9bdd6e72611fe2af43e308ffadb9e9a64b0aa5d5763004839ac3b70de335f5a0`. The public pinned snapshot replaces one credential-like upload-key example; its SHA-256 is `3e6478f0ac859789a70b8356ac0c91901de99134f637832809497d555e897241`. Examples are excluded from generated validation.

Many documented legacy names remain where current operations exist. Arguments and routes need migration: posts use /posts with space_id input, comments use /comments with post_id input, memberships and attendees use current top-level resources, and workflows require UUIDs. Unsupported v1-only like/unlike helpers are omitted. CIRCLE_COMMUNITY_ID is no longer used. Legacy HTML/body shortcuts are not silently converted to Tiptap. See [CHANGELOG.md](CHANGELOG.md) for the exact legacy-name migration table. Preserve the existing AGPL license.

Build/typecheck, 25 fixture/shared-CLI checks and real local discovery are verified. These checks cover every write guard, nested body validation, pagination, auth header shape, retry policy, secret redaction and actual CLI exit codes. Public release/artifact/CI evidence is recorded after publication. Live provider outcomes, desktop GUI installation and fresh model usage benchmarks remain pending.

## 20. FAQ

<details>
<summary><b>What is an MCP server?</b></summary>

It exposes structured operations to an AI client. This package runs locally over stdio and connects directly to Circle.

</details>

<details>
<summary><b>What is the CLI?</b></summary>

circle-cli runs the same tools as shell commands through the shared MCP implementation. Scripts and shell agents can use it.

</details>

<details>
<summary><b>Does Circle have an official MCP?</b></summary>

Yes. Its hosted OAuth MCP at https://app.circle.so/api/mcp provides broad Admin API v2 access for admins on eligible Business+ plans.

</details>

<details>
<summary><b>Why offer this alongside the official MCP?</b></summary>

It adds a local task CLI, named private token settings, predictable JSON, schema-derived help and bounded page retrieval. No overall coverage or efficiency advantage is claimed.

</details>

<details>
<summary><b>Is there an official Circle task CLI?</b></summary>

No dedicated task CLI was found in the official developer/MCP pages reviewed on October 2, 2026. MCP setup through Claude Code is not a Circle task CLI; recheck current provider docs before making an absence claim.

</details>

<details>
<summary><b>Is this free?</b></summary>

The wrapper preserves AGPL-3.0-or-later. Circle plan access and API allowances remain separate. Installing npm does not upgrade a plan.

</details>

<details>
<summary><b>Where do I get the token?</b></summary>

Open Settings > Developers > Tokens in the intended community as an admin. Create an Admin V2 token and save it privately.

</details>

<details>
<summary><b>Do I paste the token into chat?</b></summary>

No. Use private local shell/client settings or an owner-only regular token file outside repositories. Never put it in issues, chats or shared configs.

</details>

<details>
<summary><b>Token or Bearer?</b></summary>

The pinned schema says Token; quick-start prose says Bearer. Token is the default, and an explicit private auth scheme setting supports Bearer. There is no automatic fallback or write resubmission; live-account validation remains pending.

</details>

<details>
<summary><b>Does login perform OAuth?</b></summary>

No. It prints private token setup instructions without opening a browser or storing a credential. Official hosted MCP OAuth is a separate route.

</details>

<details>
<summary><b>Does this include a desktop version?</b></summary>

The versioned .mcpb bundles production dependencies and uses a sensitive token setting or private token-file path. Host compatibility and organization custom-extension policy apply; GUI installation is separately unverified.

</details>

<details>
<summary><b>Can ChatGPT on the web use it?</b></summary>

This package needs local stdio. A remote-URL-only client needs Circle’s official hosted MCP instead, subject to current client support.

</details>

<details>
<summary><b>Does a draft get published immediately?</b></summary>

Create basic/image post defaults to draft. Publishing or scheduling needs the specific requested status/update and confirmation. Inspect the same post before changing delivery or notification options.

</details>

<details>
<summary><b>Can I send messages or invite members?</b></summary>

The current operations support those requests, with explicit confirmation and valid account permissions. Read recipient/body schemas and review notification behavior; tool availability is not consent or proof of delivery.

</details>

<details>
<summary><b>Will it retry a write?</b></summary>

No. Mutating requests have zero automatic retries or auth fallback. Inspect state after unknown outcomes before repeating any action.

</details>

<details>
<summary><b>Can I retrieve every page?</b></summary>

all_pages is available only on the 33 native page/per_page reads, bounded by max_items and 100 requests. Every page consumes quota; continuation state does not guarantee a consistent snapshot.

</details>

<details>
<summary><b>What does resume.skip mean?</b></summary>

The cap stopped partway through a page. Retrieve that same page with the same per_page/filter/sort and skip that many already-returned records locally. There is no invented skip API argument.

</details>

<details>
<summary><b>Can I use several communities?</b></summary>

Use named private credentials and --account. The selected token identifies its community. list_accounts returns labels and auth method without tokens or paths.

</details>

<details>
<summary><b>Does create_direct_upload upload my file?</b></summary>

No. It creates the metadata/slot. Complete the documented storage PUT for the exact intended file, then use its signed_id; never forward the Admin token to storage.

</details>

<details>
<summary><b>Is the CLI more token efficient?</b></summary>

Fresh full/deferred loading, skill discovery and matched successful-task usage measurements are pending. No character estimates, borrowed percentages or zero-token claim are substituted.

</details>

## Questions

Open a sanitized [issue](https://github.com/thenavidm/circle-mcp-cli/issues) with version/client/OS. Use SECURITY.md for private disclosure.

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. This Beehiiv MCP server and CLI is one piece of that system.

**Links**

- Personal website: [navid.me](https://navid.me)
- Link in bio: [navid.bio](https://navid.bio)
- Navid Media: [navid.media](https://navid.media)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

## Dependencies

| Dependency | Version range | Used for |
| --- | --- | --- |
| `@modelcontextprotocol/sdk` | `^1.31.0` | MCP protocol and shared CLI bridge |
| `ajv` | `^8.17.1` | JSON Schema input validation |
| `ajv-formats` | `^3.0.1` | JSON Schema input validation |

Full third-party attribution is in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Development tooling and its audit limitations are documented in [SECURITY.md](SECURITY.md).

`yaml` is development-only API regeneration tooling. It is excluded from production bundles.

## License

AGPL-3.0-or-later, preserving the existing license. See [LICENSE](LICENSE), [full AGPL text](licenses/AGPL-3.0.txt) and THIRD_PARTY_NOTICES.md. Circle service/documentation terms remain separate.

---

© 2026 [Navid Media](https://navid.media). Made with ❤️ by [Navid Moazzez](https://navid.me).
