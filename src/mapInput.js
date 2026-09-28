// Turns MCP tool arguments into Actor input: drop empty values, wrap a single value given for a list
// field, and turn plain URL strings into the {url} objects Apify's request lists expect.
export function mapInput(tool, args = {}) {
  const input = {};
  for (const [key, value] of Object.entries(args ?? {})) {
    if (value === undefined || value === null || value === "") continue;
    input[key] = tool.arrayFields.includes(key) && !Array.isArray(value) ? [value] : value;
  }
  for (const key of tool.urlSourceFields) {
    if (Array.isArray(input[key])) input[key] = input[key].map((x) => (typeof x === "string" ? { url: x } : x));
  }
  return input;
}
