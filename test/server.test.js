import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Ajv from "ajv";
import { TOOLS, listToolSummaries, handleCallTool } from "../src/server.js";
import { mapInput } from "../src/mapInput.js";

const tools = JSON.parse(readFileSync(new URL("../tools.json", import.meta.url), "utf8"));

test("lists every tool from tools.json, even without a token", () => {
  assert.ok(tools.length > 0);
  assert.equal(listToolSummaries().length, tools.length);
});

test("every input schema compiles", () => {
  const ajv = new Ajv({ strict: false });
  for (const tool of TOOLS) ajv.compile(tool.inputSchema);
});

test("tool names are unique snake_case", () => {
  const names = tools.map((t) => t.name);
  assert.equal(new Set(names).size, names.length);
  for (const n of names) assert.match(n, /^[a-z0-9_]+$/);
});

test("missing token returns a friendly error", async () => {
  const saved = process.env.APIFY_TOKEN;
  delete process.env.APIFY_TOKEN;
  try {
    const r = await handleCallTool({ name: tools[0].name, arguments: {} });
    assert.equal(r.isError, true);
    assert.match(r.content[0].text, /APIFY_TOKEN is not set/);
  } finally {
    if (saved !== undefined) process.env.APIFY_TOKEN = saved;
  }
});

test("unknown tool is rejected", async () => {
  const r = await handleCallTool({ name: "no_such_tool", arguments: {} });
  assert.equal(r.isError, true);
  assert.match(r.content[0].text, /Unknown tool/);
});

test("mapInput wraps single values and turns URL strings into {url}", () => {
  const tool = { arrayFields: ["urls", "startUrls"], urlSourceFields: ["startUrls"] };
  assert.deepEqual(mapInput(tool, { urls: "a", startUrls: ["https://x.com"], empty: "" }), { urls: ["a"], startUrls: [{ url: "https://x.com" }] });
});

test("rejects unknown argument names", () => {
  const ajv = new Ajv({ strict: false });
  for (const tool of TOOLS) {
    const validate = ajv.compile(tool.inputSchema);
    assert.equal(validate({ definitelyNotAField: 1 }), false, `${tool.name} accepted an unknown argument`);
  }
});

test("coerces a stringy integer argument (runtime coerceTypes)", () => {
  const ajv = new Ajv({ strict: false, coerceTypes: true });
  const validate = ajv.compile({ type: "object", properties: { n: { type: "integer" } }, required: ["n"], additionalProperties: false });
  const data = { n: "5" };
  assert.equal(validate(data), true);
  assert.equal(data.n, 5);
});
