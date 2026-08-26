import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { GetPromptRequestSchema, ListPromptsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const PROMPTS = [
  {
    name: "recommend_icons",
    description: "Recommend icons for a feature or UI screen",
    arguments: [
      { name: "description", description: "The feature or screen being built", required: true },
      { name: "framework", description: "react or html", required: false },
    ],
  },
  {
    name: "ai_workflow_icons",
    description: "Map icons onto each stage of an AI, agent, or RAG pipeline",
    arguments: [{ name: "workflow", description: "The pipeline, e.g. 'RAG with reranking'", required: true }],
  },
];

const TEXT: Record<string, (a: Record<string, string>) => string> = {
  recommend_icons: (a) => `I am building: ${a["description"] ?? ""}

Use the search_icon tool to find the right IconMind icon for every UI element that needs
one. For each recommendation, state:
1. Which UI element it is for
2. The icon slug you chose
3. Why that icon is semantically right, not merely visually similar

Do not invent icon names. If search_icon finds nothing suitable, say so and suggest the
closest icon that actually exists.

Framework: ${a["framework"] ?? "react"}`,

  ai_workflow_icons: (a) => `Pipeline to visualize: ${a["workflow"] ?? ""}

1. Break this pipeline into its distinct stages.
2. For each stage, use search_icon (prefer the ai, agents, mcp, and rag categories) to
   find the most semantically accurate icon.
3. Return a table: Stage | Icon slug | Why.
4. Finally, produce one combined import block via get_icon_code.

Favour meaning over visual uniformity — an icon with the wrong meaning costs more than
one that merely looks slightly out of place.`,
};

export function registerPrompts(server: Server) {
  server.setRequestHandler(ListPromptsRequestSchema, async () => ({ prompts: PROMPTS }));

  server.setRequestHandler(GetPromptRequestSchema, async (req) => {
    const build = TEXT[req.params.name];
    if (!build) throw new Error(`Unknown prompt: ${req.params.name}`);
    return {
      messages: [{
        role: "user" as const,
        content: { type: "text" as const, text: build((req.params.arguments ?? {}) as Record<string, string>) },
      }],
    };
  });
}
