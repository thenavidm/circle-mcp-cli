import { loadConfig } from "./config.js";
import { CircleClient } from "./api/client.js";
import { exitCodeFor } from "./cli.js";
export async function runDoctor(network = false): Promise<number> {
  const config = loadConfig();
  const configured = config.accounts.length > 0;
  const result: Record<string, unknown> = {
    ok: configured,
    node: process.version,
    accountsConfigured: config.accounts.length,
    readOnly: config.readOnly,
    authenticationChecked: false,
    note: configured
      ? "Use doctor --network to read community details privately; no content is printed."
      : "Set CIRCLE_API_TOKEN or CIRCLE_TOKEN_FILE privately, then run login for instructions.",
  };
  if (!configured) {
    console.log(JSON.stringify(result, null, 2));
    return 10;
  }
  if (network)
    try {
      await new CircleClient(config).request("GET", "/api/admin/v2/community");
      result.authenticationChecked = true;
    } catch (e) {
      console.error(JSON.stringify({ error: (e as Error).message }));
      return exitCodeFor((e as Error).message);
    }
  console.log(JSON.stringify(result, null, 2));
  return 0;
}
