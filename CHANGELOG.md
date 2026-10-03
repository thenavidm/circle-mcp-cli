# Changelog

## Unreleased

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
