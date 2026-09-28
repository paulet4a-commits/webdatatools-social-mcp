import { readFileSync } from "node:fs";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import Ajv from "ajv";

import { runActor, getApifyToken, missingTokenMessage, ApifyToolError } from "./apifyClient.js";
import { formatDatasetItems } from "./format.js";
import { mapInput } from "./mapInput.js";

// Tools are generated from the WebDataTools Actor suite into tools.json.
const readJson = (rel) => JSON.parse(readFileSync(new URL(rel, import.meta.url), "utf8"));
export const TOOLS = readJson("../tools.json");
const pkg = readJson("../package.json");
export const SERVER_INFO = { name: pkg.name, version: pkg.version };

const ajv = new Ajv({ allErrors: true, strict: false, coerceTypes: true });
const validators = new Map(TOOLS.map((tool) => [tool.name, ajv.compile(tool.inputSchema)]));

/** List of {name, description, inputSchema} — always available, even with no APIFY_TOKEN set. */
export function listToolSummaries() {
  return TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema }));
}

function errorResult(message) {
  return { content: [{ type: "text", text: message }], isError: true };
}

export async function handleCallTool({ name, arguments: args = {} } = {}) {
  const tool = TOOLS.find((t) => t.name === name);
  if (!tool) return errorResult(`Unknown tool "${name}". Call tools/list to see available tools.`);
  if (!getApifyToken()) return errorResult(missingTokenMessage());

  const input = mapInput(tool, args ?? {});
  const validate = validators.get(name);
  if (!validate(input)) {
    const problems = (validate.errors ?? [])
      .map((e) => `${e.instancePath ? e.instancePath.replace(/^\//, "") : "input"} ${e.message}`)
      .join("; ");
    return errorResult(`Invalid arguments for ${name}: ${problems}`);
  }

  try {
    const items = await runActor(tool.actor, input);
    return { content: [{ type: "text", text: formatDatasetItems(items).text }] };
  } catch (err) {
    if (err instanceof ApifyToolError) return errorResult(err.message);
    return errorResult(`Unexpected error calling ${name}: ${err.message}`);
  }
}

export function createServer() {
  const server = new Server(SERVER_INFO, { capabilities: { tools: {} } });
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: listToolSummaries() }));
  server.setRequestHandler(CallToolRequestSchema, async (request) => handleCallTool(request.params));
  return server;
}

export async function main() {
  await createServer().connect(new StdioServerTransport());
}
