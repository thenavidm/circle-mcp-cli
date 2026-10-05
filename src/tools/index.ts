import operationsData from "./operations.json" with { type: "json" };
import { Ajv, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import { readFile, lstat } from "node:fs/promises";
import { createHash } from "node:crypto";
import type { Json, CircleClient, QueryParam } from "../api/client.js";
import { UsageError } from "../api/errors.js";
import type { Config } from "../config.js";
import type { Risk } from "@thenavidm/slipway";
export type Operation = {
  name: string;
  title: string;
  description: string;
  method: string;
  path: string;
  group: string;
  risk: Risk;
  params: {
    name: string;
    key: string;
    in: string;
    required?: boolean;
    schema: Json;
    style?: string;
    explode?: boolean;
  }[];
  bodySchema: Json;
  bodyRequired: boolean;
  paginated: boolean;
};
export type ToolSpec = {
  name: string;
  title: string;
  description: string;
  group: string;
  inputSchema: Json;
  risk: Risk;
  handler: (args: Json, client: CircleClient) => Promise<unknown>;
};
const operations = operationsData as unknown as Operation[];
const ajv = new Ajv({ allErrors: true, strict: false });
(addFormats as unknown as (a: Ajv) => void)(ajv);
function check(validate: ValidateFunction, args: unknown): void {
  if (!validate(args))
    throw new UsageError(ajv.errorsText(validate.errors, { separator: "; " }));
}
function fieldsFor(op: Operation): Json {
  const properties: Json = Object.fromEntries(
    op.params.map((p) => [p.key, p.schema]),
  );
  Object.assign(properties, op.bodySchema.properties ?? {});
  properties.account = {
    type: "string",
    description:
      "Named private Circle account; selects credentials, not a remote community ID.",
  };
  if (op.risk !== "read")
    properties.confirm = {
      type: "boolean",
      description: "Must be true for the specific user-requested write.",
    };
  if (Object.keys(op.bodySchema.properties ?? {}).length) {
    properties.payload = {
      ...op.bodySchema,
      description:
        "Complete JSON request body instead of body flags. Supports nested Tiptap, maps and nullable values.",
    };
    properties.payload_file = {
      type: "string",
      minLength: 1,
      description:
        "Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload.",
    };
  }
  if (op.paginated) {
    properties.all_pages = {
      type: "boolean",
      description:
        "Read bounded page/per_page pages; each request consumes API quota. Not a snapshot or guaranteed complete backup.",
    };
    properties.max_items = {
      type: "integer",
      minimum: 1,
      maximum: 10000,
      description:
        "Maximum returned records with all_pages=true, default 1000. At most 100 requests; output includes continuation state.",
    };
  }
  return {
    type: "object",
    properties,
    required: op.params.filter((p) => p.required).map((p) => p.key),
    additionalProperties: false,
  };
}
// Each schema compiles on first use: compiling all of them at load held back the server's first answer. compileAll() runs them in tests.
const bodyValidators = new Map<string, ValidateFunction>();
function bodyValidator(op: Operation): ValidateFunction {
  let v = bodyValidators.get(op.name);
  if (!v) bodyValidators.set(op.name, (v = ajv.compile(op.bodySchema)));
  return v;
}
async function execute(
  op: Operation,
  args: Json,
  client: CircleClient,
): Promise<unknown> {
  const flat = Object.fromEntries(
    Object.keys(op.bodySchema.properties ?? {})
      .filter((k) => args[k] !== undefined)
      .map((k) => [k, args[k]]),
  );
  if (
    (args.payload !== undefined || args.payload_file !== undefined) &&
    Object.keys(flat).length
  )
    throw new UsageError(
      "Use individual body flags or payload/payload_file without mixing them.",
    );
  if (args.payload !== undefined && args.payload_file !== undefined)
    throw new UsageError("Use payload or payload_file, not both.");
  if (op.bodyRequired && !Object.keys(flat).length && args.payload === undefined && args.payload_file === undefined) {
    throw new UsageError('This operation requires a JSON body; inspect schema and provide body flags or payload/payload_file.');
  }
  let body: Json = args.payload ?? flat;
  if (args.payload_file)
    try {
      const stat = await lstat(args.payload_file);
      if (!stat.isFile() || stat.size > 5 * 1024 * 1024) throw new Error();
      body = JSON.parse(await readFile(args.payload_file, "utf8"));
    } catch {
      throw new UsageError(
        "payload_file must be a regular JSON body file, at most 5 MB.",
      );
    }
  if (["create_post", "create_image_post"].includes(op.name))
    body = { status: "draft", ...body };
  check(bodyValidator(op), body);
  if (
    ["PUT", "PATCH"].includes(op.method) &&
    Object.keys(op.bodySchema.properties ?? {}).length &&
    !Object.keys(body).length
  )
    throw new UsageError("Provide at least one field to update.");
  if (args.max_items !== undefined && !args.all_pages)
    throw new UsageError("max_items requires all_pages=true.");
  const path = op.params
    .filter((p) => p.in === "path")
    .reduce(
      (path, p) =>
        path.replace(`{${p.name}}`, encodeURIComponent(String(args[p.key]))),
      op.path,
    );
  const query: QueryParam[] = op.params
    .filter((p) => p.in === "query" && args[p.key] !== undefined)
    .map((p) => ({
      name: p.name,
      value: args[p.key],
      style: p.style,
      explode: p.explode,
    }));
  if (!args.all_pages)
    return client.sanitize(
      await client.request(
        op.method,
        path,
        query,
        op.bodyRequired || Object.keys(body).length ? body : undefined,
        args.account,
      ),
    );
  const max = args.max_items ?? 1000;
  const perPage = Math.min(args.per_page ?? 10, max);
  let pageNumber = args.page ?? 1;
  let pages = 0;
  const records: unknown[] = [];
  const seen = new Set<string>();
  let last: Json = {};
  let skip = 0;
  let truncated = false;
  const fixed = query.filter((p) => !["page", "per_page"].includes(p.name));
  do {
    last = await client.request(
      "GET",
      path,
      [
        ...fixed,
        { name: "page", value: pageNumber },
        { name: "per_page", value: perPage },
      ],
      undefined,
      args.account,
    );
    pages++;
    if (!Array.isArray(last.records) || typeof last.has_next_page !== "boolean")
      throw new UsageError(
        "Response does not match Circle page/per_page pagination.",
      );
    if (last.page !== undefined && last.page !== pageNumber)
      throw new UsageError(
        "Circle returned an unexpected page; narrow the request.",
      );
    const fingerprint = createHash("sha256")
      .update(JSON.stringify(last.records))
      .digest("hex");
    if (
      last.has_next_page &&
      (last.records.length === 0 || seen.has(fingerprint))
    )
      throw new UsageError(
        "Circle pagination is empty or repeated; refusing further quota-consuming requests.",
      );
    seen.add(fingerprint);
    const remaining = max - records.length;
    const taken = last.records.slice(0, remaining);
    records.push(...taken);
    skip = taken.length;
    const partial = taken.length < last.records.length;
    truncated = partial || last.has_next_page;
    if (partial || records.length >= max || pages >= 100) break;
    if (!last.has_next_page) {
      truncated = false;
      break;
    }
    pageNumber++;
  } while (true);
  const partial = skip < last.records.length;
  return client.sanitize({
    ...last,
    records,
    collected: records.length,
    pages,
    truncated,
    resume: truncated
      ? {
          page: partial ? pageNumber : pageNumber + 1,
          per_page: perPage,
          skip: partial ? skip : 0,
        }
      : null,
  });
}
export const ALL_TOOLS: ToolSpec[] = operations.map((op) => ({
  name: op.name,
  title: op.title,
  description: op.description,
  group: op.group,
  inputSchema: fieldsFor(op),
  risk: op.risk,
  handler: (args, client) => execute(op, args, client),
}));
ALL_TOOLS.push({
  name: "list_accounts",
  title: "List configured accounts",
  description:
    "List private account labels, default selection and configured token method. No credentials, token paths or community content; no network request.",
  group: "accounts",
  risk: "read",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  handler: async (_args, client) => ({
    accounts: client.config.accounts.map((a) => ({
      name: a.name,
      default: a.name === client.config.defaultAccount,
      auth: a.tokenFile
        ? "token_file"
        : a.apiToken
          ? "api_token"
          : "not_configured",
      authScheme: a.authScheme,
    })),
  }),
});
const validators = new Map<string, ValidateFunction>();
function validatorFor(tool: ToolSpec): ValidateFunction {
  let v = validators.get(tool.name);
  if (!v) validators.set(tool.name, (v = ajv.compile(tool.inputSchema)));
  return v;
}
export function validateArguments(tool: ToolSpec, args: Json): void {
  check(validatorFor(tool), args);
}
/** Compile every input and body schema, as loading once did, so a test can prove they all compile. */
export function compileAll(): number {
  for (const t of ALL_TOOLS) validatorFor(t);
  for (const op of operations) bodyValidator(op);
  return validators.size + bodyValidators.size;
}
export function visibleTools(config: Config): ToolSpec[] {
  return ALL_TOOLS.filter((t) => !config.readOnly || t.risk === "read");
}
