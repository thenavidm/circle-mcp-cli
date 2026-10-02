import fs from "node:fs";
import crypto from "node:crypto";
import YAML from "yaml";
const source = "https://api-headless.circle.so/api/admin/v2/swagger.yaml";
const snapshot = new URL("./circle-api.snapshot.yaml", import.meta.url);
const provenance = new URL("./circle-api.upstream.sha256", import.meta.url);
const refresh = process.argv.includes("--refresh");
let raw;
if (refresh) {
  const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error("Upstream schema request failed: HTTP " + response.status);
  raw = await response.text();
} else raw = fs.readFileSync(snapshot, "utf8");
const upstreamSha256 = refresh ? crypto.createHash("sha256").update(raw).digest("hex") : fs.readFileSync(provenance, "utf8").trim();
const api = YAML.parse(raw);
if (!api?.paths || !api?.components) throw new Error("Invalid Circle API snapshot.");
if (refresh) {
  // Examples are unnecessary for operation validation and may contain credential-like values.
  const stripExamples = (value) => {
    if (Array.isArray(value)) value.forEach(stripExamples);
    else if (value && typeof value === "object") {
      delete value.example; delete value.examples;
      Object.values(value).forEach(stripExamples);
    }
  };
  stripExamples(api);
  raw = YAML.stringify(api);
}
const snake = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
function clean(v, stack = []) {
  if (Array.isArray(v)) return v.map((x) => clean(x, stack));
  if (!v || typeof v !== "object") return v;
  if (v.$ref) {
    if (stack.includes(v.$ref))
      throw new Error("Circular request schema " + v.$ref);
    const t = v.$ref
      .slice(2)
      .split("/")
      .reduce((o, k) => o[k.replace(/~1/g, "/").replace(/~0/g, "~")], api);
    if (!t) throw new Error("Missing reference " + v.$ref);
    return clean(
      {
        ...t,
        ...Object.fromEntries(Object.entries(v).filter(([k]) => k !== "$ref")),
      },
      [...stack, v.$ref],
    );
  }
  const o = {};
  for (const [k, x] of Object.entries(v))
    if (
      ![
        "example",
        "examples",
        "readOnly",
        "writeOnly",
        "nullable",
        "xml",
        "discriminator",
      ].includes(k)
    )
      o[k] = clean(x, stack);
  if (v.nullable) {
    if (typeof o.type === "string") o.type = [o.type, "null"];
    if (o.enum && !o.enum.includes(null)) o.enum.push(null);
  }
  if (o.format === "date_time") o.format = "date-time";
  return o;
}
const aliases = {
  get_community_details: "get_community",
  create_invite_a_community_member: "create_member",
  list_community_members: "list_members",
  get_community_member: "get_member",
  update_community_member: "update_member",
  remove_community_member: "remove_member",
  search_community_members: "search_member",
  create_basic_post: "create_post",
  list_basic_posts: "list_posts",
  get_basic_post: "get_post",
  update_basic_post: "update_post",
  delete_basic_post: "delete_post",
  list_community_segments: "list_segments",
  list_invitation_links: "list_invitations",
  create_invitation_link: "create_invitation",
  create_message: "send_message",
  get_gamification_leaderboard: "get_leaderboard",
  advanced_search: "search",
  get_form_submissions: "get_form_submissions",
  list_community_member_subscriptions: "list_subscriptions",
  list_community_member_charges: "list_charges",
  list_community_member_spaces: "list_member_spaces",
  update_course_lesson_progress: "update_course_progress",
};
const titleOverrides = {
  create_a_non_member_contact_lead_to_add_a_full_community_member_instead_use_create_community_member:
    "create_lead",
  delete_a_non_member_contact_lead_to_delete_a_full_community_member_instead_use_destroy_community_member:
    "delete_lead",
  show_a_community_member: "get_member",
  update_a_community_member: "update_member",
  search_a_community_member: "search_member",
  deactivate_a_community_member: "remove_member",
  community_member_charges_list: "list_charges",
  community_member_subscriptions_list: "list_subscriptions",
  list_community_member_s_access_groups: "list_member_access_groups",
  get_the_filters_currently_shown_on_the_member_directory_or_a_member_space:
    "get_filter_configuration",
  list_member_directory_and_member_space_filter_controls:
    "list_filter_controls",
  update_a_member_directory_or_member_space_filter_control:
    "update_filter_control",
  create_a_member_filter_control: "create_filter_control",
  get_a_filter_control: "get_filter_control",
  show_leaderboard: "get_leaderboard",
  member_tags_list: "list_member_tags",
  shows_a_member_tag_s_details: "get_member_tag",
  get_page_profile_fields: "list_page_profile_fields",
  retrieves_the_community_s_payment_method_preferences:
    "get_payment_method_settings",
  paywall_affiliates_list: "list_paywall_affiliates",
  profile_fields_list: "list_profile_fields",
  show_basic_post: "get_post",
  summarize_a_space: "get_space_ai_summaries",
  show_topic_details: "get_topic",
  activate_an_automation_dynamic_workflow_so_it_starts_running_automatically:
    "activate_workflow",
  deactivate_an_automation_dynamic_workflow_so_it_stops_running_automatically:
    "deactivate_workflow",
  list_a_community_s_automations_workflows: "list_workflows",
  create_subscription_group: "create_paywall_group",
  update_subscription_group: "update_paywall_group",
  create_tagged_member: "tag_member",
  delete_tagged_member: "untag_member",
  add_member_to_access_group: "add_to_access_group",
  remove_access_group_member: "remove_from_access_group",
  list_form_submissions: "get_form_submissions",
  list_flagged_contents: "list_flagged_content",
};
const idKeys = {
  community_members: "member_id",
  posts: "post_id",
  comments: "comment_id",
  spaces: "space_id",
  events: "event_id",
  course_lessons: "lesson_id",
  course_sections: "section_id",
  forms: "form_id",
  member_tags: "tag_id",
  access_groups: "access_group_id",
  community_segments: "segment_id",
  invitation_links: "invitation_id",
  topics: "topic_id",
  space_groups: "space_group_id",
  profile_fields: "profile_field_id",
  paywalls: "paywall_id",
  paywall_groups: "paywall_group_id",
  paywall_affiliates: "affiliate_id",
  community_leads: "lead_id",
  community_member_subscriptions: "subscription_id",
  community_member_charges: "charge_id",
  tagged_members: "tagged_member_id",
  filter_kit_controls: "filter_control_id",
};
const operations = [];
for (const [path, item] of Object.entries(api.paths))
  for (const [method, op] of Object.entries(item)) {
    if (!["get", "post", "put", "patch", "delete"].includes(method)) continue;
    const group = snake(op.tags?.[0] ?? "community");
    const raw = snake(op.operationId ?? op.summary);
    const name =
      titleOverrides[raw] ??
      aliases[raw] ??
      raw
        .replace(/^(shows|show)_/, "get_")
        .replace(/^deletes_/, "delete_")
        .replace(/^archives_/, "archive_")
        .replace(/^unarchives_/, "unarchive_")
        .replace(/^publishes_/, "publish_")
        .replace(/^destroys?_/, "delete_")
        .replace(/_(?:a|an|the)_/g, "_");
    const body = clean(
      op.requestBody?.content?.["application/json"]?.schema ?? {
        type: "object",
        properties: {},
      },
    );
    if (body.properties) body.additionalProperties = false;
    const seen = new Set();
    const params = [...(item.parameters ?? []), ...(op.parameters ?? [])]
      .map((p) => clean(p))
      .filter((p) => ["path", "query"].includes(p.in))
      .filter((p) => {
        const k = p.in + ":" + p.name;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .map((p) => {
        const segments = path.split("/");
        const key =
          p.name === "id"
            ? (idKeys[segments[segments.indexOf("{id}") - 1]] ?? "id")
            : snake(p.name);
        const safeKey = body.properties?.[key] ? `target_${key}` : key;
        const schema = clean(p.schema ?? {});
        schema.description = p.description ?? schema.description;
        if (p.in === "path" && schema.type === "integer") schema.minimum = 1;
        if (p.name === "page") schema.minimum = 1;
        if (p.name === "per_page")
          Object.assign(schema, { minimum: 1, maximum: 100 });
        return { ...p, key: safeKey, schema };
      });
    const risk = method === "get" ? "read" : "destructive";
    const paginated =
      method === "get" &&
      params.some((p) => p.name === "page") &&
      params.some((p) => p.name === "per_page");
    operations.push({
      name,
      title: op.summary,
      description: `${op.summary}. ${risk === "read" ? "Reads community data." : "Changes community state and requires confirm=true for the user-requested action."}${paginated ? " Supports bounded all_pages; every page counts against the API quota." : ""}`,
      method: method.toUpperCase(),
      path,
      group,
      risk,
      params,
      bodySchema: body,
      bodyRequired: op.requestBody?.required === true,
      paginated,
    });
  }
if (new Set(operations.map((o) => o.name)).size !== operations.length)
  throw new Error("Duplicate tool names");
fs.writeFileSync(
  new URL("../src/tools/operations.json", import.meta.url),
  JSON.stringify(operations, null, 2) + "\n",
);
fs.writeFileSync(
  new URL("../src/tools/api-source.json", import.meta.url),
  JSON.stringify(
    {
      source,
      checked: new Date().toISOString().slice(0, 10),
      apiVersion: "Admin v2",
      documentVersion: api.info.version,
      sha256: crypto.createHash("sha256").update(raw).digest("hex"),
      upstreamSha256,
    snapshotRedactions: ["The initial public snapshot replaces a credential-like upload key example. Deliberate refreshes remove all examples before saving; examples do not participate in generated validation."],
    operationCount: operations.length,
      corrections: [
        "Auth defaults to Token per the pinned security scheme. The quick-start prose says Bearer; private auth_scheme=Bearer is supported explicitly, with no automatic fallback or write resubmission. Both remain live-account unverified.",
        "All API routes come from the current v2 schema; old guessed nested space/post/comment routes and v1 likes are not carried forward.",
        "Nested objects retain upstream additional-properties behavior, including Tiptap extension node fields. Unknown top-level body flags are refused.",
        "Positive integer path IDs and local page/per_page bounds are applied. No invented cursor support. Each all_pages request counts against community quota.",
        "Upstream date_time formats are normalized to JSON Schema date-time for validation.",
        "Create basic/image posts defaults to draft; users must explicitly confirm any publishing or scheduling.",
      ],
    },
    null,
    2,
  ) + "\n",
);
if (refresh) { fs.writeFileSync(snapshot, raw); fs.writeFileSync(provenance, upstreamSha256 + "\n"); }
console.log(
  JSON.stringify({
    operations: operations.length,
    reads: operations.filter((o) => o.risk === "read").length,
    paginated: operations.filter((o) => o.paginated).length,
    names: operations.map((o) => o.name),
  }),
);
