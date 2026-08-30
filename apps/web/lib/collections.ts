import { allIcons, type IconMeta } from "@/lib/icons";

/**
 * Curated sets for the way people actually search — "icons for an AI chat UI", not
 * "interface icons". Each is hand-picked from the set (every slug is checked at build:
 * a collection that names an icon that does not exist fails the build, not the reader),
 * with the sentence a search result needs and the one snippet somebody copies first.
 */
export interface Collection {
  slug: string;
  name: string;
  lead: string;
  body: string[];
  icons: string[];
  snippet: string;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "ai-chat-ui",
    name: "AI chat interface",
    lead: "The forty icons a chat with a model needs — composing, sending, streaming, stopping, regenerating, rating, copying, and the model itself.",
    body: [
      "A chat UI is a small vocabulary used constantly: the send button, the stop-generation button, the regenerate arrow, the thumbs, the copy control, the model picker, the attachment clip, the voice toggle. Generalist sets have the send and the clip; they do not have the model, the token, the context window or the guardrail — and a product that draws those four itself ends up with five icon styles on one screen.",
      "Everything here is drawn on the same 24 px grid at the same stroke, in outline and duotone at three weights, so the send button and the model badge are one set. Each icon links to its own page with the code for React, Vue, Svelte, Solid, Preact, React Native, Astro, Laravel and Flutter.",
    ],
    icons: ["chat", "chat-add", "send", "stop", "refresh", "liked", "unlike", "copy", "attach", "microphone", "model", "toggle", "token", "context-window", "streaming", "typing-indicator", "message-thread", "chat-reply", "chat-more", "chat-code", "chat-image", "voice-message", "prompt", "system-prompt", "temperature", "guardrail", "moderation", "citation", "source-citation", "review", "history", "compose", "pin", "share", "edit", "trash", "settings", "user", "chat-bot", "agent"],
    snippet: `import { Send, Stop, Regenerate, Model } from "@iconmind/react";`,
  },
  {
    slug: "agent-dashboard",
    name: "Agent dashboard",
    lead: "Icons for watching agents work — runs, steps, tool calls, hand-offs, approvals, budgets and the moments they need a human.",
    body: [
      "An agent dashboard shows things no other software has needed an icon for until now: a run that is thinking, a tool being called, a hand-off between two agents, a step limit, a human approval gate, a spend cap. Drawing these one at a time, screen by screen, is how a product ends up with three different agents on one page.",
      "This collection is the agent vocabulary as one family: the same figure, the same octagon, the same marks. Pair it with the ordinary controls — play, pause, stop, retry, log — which are drawn on the same grid and in the same weights.",
    ],
    icons: ["agent", "agent-run", "agent-pause", "agent-stop", "agent-thinking", "agent-working", "agent-idle", "agent-done", "agent-alert", "agent-blocked", "agent-handoff", "agent-delegate", "agent-team", "agent-swarm", "supervisor", "subagent", "tool-calling", "tool-result", "tool-error", "human-approval", "escalate-human", "step-limit", "turn-limit", "spend-cap", "agent-cost", "agent-log", "trace", "span-trace", "checkpoint", "replan", "retry", "loop-detect", "memory-episodic", "memory-pin", "goal", "objective", "task-queue-agent", "pause", "stop"],
    snippet: `import { AgentRun, ToolCalling, HumanApproval } from "@iconmind/react";`,
  },
  {
    slug: "rag-pipeline",
    name: "RAG pipeline",
    lead: "From document to answer — ingestion, chunking, embedding, indexing, retrieval, reranking and grounding, each with its own icon.",
    body: [
      "A retrieval pipeline is a sequence of things that all look like a document to a generalist set. Here every stage is its own drawing: the chunk and the chunk overlap, the embedding lattice, the vector database, the index and its rebuild, the retriever, the reranker, the citation that grounds the answer.",
      "Use them on architecture diagrams, in pipeline UIs and in docs; the duotone variant reads well at the larger sizes a diagram wants.",
    ],
    icons: ["ingestion", "ingestion-pipeline", "document-parse", "document-split", "chunk", "chunking", "chunk-overlap", "chunk-size", "embedding", "embed-batch", "vector-database", "vector-index", "vector-search", "index-rebuild", "hnsw", "retriever", "hybrid-search", "keyword-search", "semantic-search", "reranker", "cross-encoder", "top-k", "relevance-score", "context-assembly", "context-budget", "grounding", "citation", "evidence", "answer-synthesis", "eval-rag", "groundedness", "freshness", "corpus", "knowledge-base", "knowledge-graph", "multi-hop", "query-expand", "hyde", "reembed", "dedupe"],
    snippet: `import { Chunk, Embedding, VectorDatabase, Reranker } from "@iconmind/react";`,
  },
  {
    slug: "mcp-server",
    name: "MCP servers and tools",
    lead: "The Model Context Protocol, drawn: servers, clients, tools, resources, prompts, transports, sampling and the connection between them.",
    body: [
      "MCP has a vocabulary of its own and, until now, no icons for it — every dashboard and docs site drew a plug or a box. This is the whole protocol as one family: the chamfered frame for a server, the plug for a tool, the page for a resource, the bubble for a prompt, with add, check, alert and off marks on each.",
      "The MCP icons follow one convention on purpose: the chamfer is what says MCP. A tool with a chamfer is an MCP tool; without it, a tool. That is the difference a reader learns once.",
    ],
    icons: ["mcp", "mcp-server", "mcp-server-add", "mcp-server-check", "mcp-server-alert", "mcp-server-off", "mcp-client", "mcp-connection", "mcp-tool", "mcp-tool-add", "mcp-tool-error", "mcp-tool-result", "mcp-tool-list", "mcp-tool-schema", "mcp-resource", "mcp-resource-list", "mcp-prompt", "mcp-prompt-list", "mcp-registry", "mcp-roots", "mcp-notification", "mcp-transport", "mcp-stdio", "mcp-sse", "elicitation", "sampling", "tool-registry", "tool-permission", "tool", "tool-calling"],
    snippet: `import { McpServer, McpTool, McpResource } from "@iconmind/react";`,
  },
  {
    slug: "llm-observability",
    name: "LLM observability",
    lead: "Traces, spans, tokens, latency, cost, evals and drift — the icons a monitoring screen for language models needs.",
    body: [
      "Watching a model in production means new nouns on old charts: tokens per second, cost per call, latency at p99, a prompt that drifted, an eval that regressed, a guardrail that fired. This collection pairs the AI vocabulary with the analytics and devops icons drawn on the same grid, so a dashboard is one set from the sparkline to the alert.",
    ],
    icons: ["trace", "span-trace", "token", "token-count", "latency", "latency-p99", "cost", "cost-alert", "cost-explorer", "throughput", "error-budget", "drift", "eval", "eval-suite", "regression", "guardrail", "moderation", "hallucination", "chart-line", "chart-bar", "chart-area", "chart-spline", "metric", "alert", "incident", "log", "dashboard", "monitor-check", "monitor-off", "on-time", "time-alert", "budget", "quota", "rate-limit", "cache-hit", "cache-miss"],
    snippet: `import { Trace, Token, Latency, Drift } from "@iconmind/react";`,
  },
];

export const collectionOf = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);

/** Resolve a collection's slugs to icons, dropping nothing silently: a missing slug throws at build. */
export function iconsOf(c: Collection): IconMeta[] {
  return c.icons.map((slug) => {
    const i = allIcons.find((x) => x.slug === slug) ?? allIcons.find((x) => x.aliases.includes(slug));
    if (!i) throw new Error(`collection ${c.slug}: no icon "${slug}"`);
    return i;
  });
}
