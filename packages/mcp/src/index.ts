import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerResources } from "./resources.js";
import { registerTools } from "./tools.js";
import { registerPrompts } from "./prompts.js";
import { version } from "./data.js";

const server = new Server(
  { name: "iconmind", version },
  { capabilities: { resources: {}, tools: {}, prompts: {} } },
);

registerResources(server);
registerTools(server);
registerPrompts(server);

await server.connect(new StdioServerTransport());
