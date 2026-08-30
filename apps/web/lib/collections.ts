import { allIcons, type IconMeta } from "@/lib/icons";

/**
 * Curated sets for the way people actually search — "icons for an AI chat UI", not
 * "interface icons". Each is hand-picked from the set (every slug is checked at build:
 * a collection that names an icon that does not exist fails the build, not the reader),
 * with the sentence a search result needs and the one snippet somebody copies first.
 */
export interface Collection {
  slug: string;
  /** Which band of the index it sits in: building with models, or the platform around it. */
  group: "models" | "platform";
  name: string;
  lead: string;
  body: string[];
  icons: string[];
  snippet: string;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "ai-chat-ui",
    group: "models",
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
    group: "models",
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
    group: "models",
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
    group: "models",
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
    group: "models",
    name: "LLM observability",
    lead: "Traces, spans, tokens, latency, cost, evals and drift — the icons a monitoring screen for language models needs.",
    body: [
      "Watching a model in production means new nouns on old charts: tokens per second, cost per call, latency at p99, a prompt that drifted, an eval that regressed, a guardrail that fired. This collection pairs the AI vocabulary with the analytics and devops icons drawn on the same grid, so a dashboard is one set from the sparkline to the alert.",
    ],
    icons: ["trace", "span-trace", "token", "token-count", "latency", "latency-p99", "cost", "cost-alert", "cost-explorer", "throughput", "error-budget", "drift", "eval", "eval-suite", "regression", "guardrail", "moderation", "hallucination", "chart-line", "chart-bar", "chart-area", "chart-spline", "metric", "alert", "incident", "log", "dashboard", "monitor-check", "monitor-off", "on-time", "time-alert", "budget", "quota", "rate-limit", "cache-hit", "cache-miss"],
    snippet: `import { Trace, Token, Latency, Drift } from "@iconmind/react";`,
  },
  {
    slug: "voice-agent",
    group: "models",
    name: "Voice agent",
    lead: "Everything a spoken conversation with a model needs — the microphone and the headset, transcription, synthesis, diarisation, and the moments a turn is interrupted.",
    body: [
      "A voice product draws two things no text UI does: the hardware in front of the person, and the pipeline behind the call. Both are here, in one style — a headset and a speaker beside speech-to-text, text-to-speech, diarisation, denoising and the audio model itself, then the agent icons for what happens between turns.",
      "The interruption icons matter more than they look: barge-in, a turn limit, a latency spike. A voice interface spends most of its screen space telling somebody why nothing is happening yet.",
    ],
    icons: ["mic", "headset", "headphones", "speaker", "audio", "volume", "volume-off", "voice-agent", "voice-message", "speech-to-text", "text-to-speech", "transcribe-ingest", "speaker-diarize", "sound-effect", "audio-denoise", "audio-gen", "audio-model", "chat-bot", "agent", "agent-run", "interrupt", "turn-limit", "latency", "phone"],
    snippet: `import { Mic, Headset, SpeechToText, SpeakerDiarize } from "@iconmind/react";`,
  },
  {
    slug: "devops-pipeline",
    group: "platform",
    name: "CI/CD pipeline",
    lead: "Build, test, release, roll back — the icons a delivery pipeline and the screen watching it are made of.",
    body: [
      "A pipeline UI is a sequence of states that all look alike if you draw them carelessly: queued, building, passing, failing, deploying, rolled back. Each has its own drawing here, on the same grid as the agent and model icons, so a deployment dashboard for an AI product does not need a second icon set.",
      "The release strategies are drawn as themselves — canary, blue-green, rollout — rather than as three arrows that differ only in direction.",
    ],
    icons: ["build", "build-pass", "build-fail", "pipeline", "ci", "cd", "deploy", "rollout", "canary", "blue-green", "rollback", "release", "artifact", "registry", "container", "test-run", "coverage", "review", "git-commit", "branch-git", "git-merge", "git-pull-request", "lockfile", "hot-reload", "cache-hit", "health-probe", "monitor-check", "incident", "on-call", "runbook", "alert", "log", "trace", "span-trace", "scale-up", "scale-down"],
    snippet: `import { BuildPass, Canary, Rollback, Incident } from "@iconmind/react";`,
  },
  {
    slug: "data-platform",
    group: "platform",
    name: "Data platform",
    lead: "Ingestion to warehouse — pipelines, streams, schemas, lineage, quality checks and the stores underneath.",
    body: [
      "Data tooling is where generic sets run out first: a stream, a change feed, a watermark, a lineage node and a delta table are all \"database\" to them. Here each is its own drawing, and the ones that belong together share a body — the cylinder for stores, the chain for lineage.",
      "Pairs well with the RAG collection: the same ingestion and chunking icons carry a retrieval pipeline as well as a warehouse.",
    ],
    icons: ["pipeline", "ingestion", "ingestion-pipeline", "etl", "transform", "stream", "cdc", "replay", "checkpoint", "watermark", "warehouse", "data-lake", "delta-table", "iceberg-table", "partition", "shard-index", "index-db", "schema-map", "data-contract", "lineage-node", "data-quality", "data-validation", "anomaly-data", "dedupe", "null", "database", "database-add", "database-check", "database-search", "storage", "block-storage", "storage-bucket", "backup", "restore", "snapshot-volume"],
    snippet: `import { Etl, LineageNode, DataContract, Watermark } from "@iconmind/react";`,
  },
  {
    slug: "security-posture",
    group: "platform",
    name: "Security posture",
    lead: "Keys, secrets, policy and access — with the AI-specific ones (prompt shield, scan, taint) drawn to the same shield.",
    body: [
      "Security screens are lists of states: granted, denied, rotated, expired, breached. Drawing them from one shield body means a policy list reads as a policy list at a glance, and the mark on each shield is what a reader actually scans for.",
      "The AI security icons — prompt shield, model scan, taint — sit in the same family, which is the point: an AI product's security page should not look like two products bolted together.",
    ],
    icons: ["shield", "shield-check", "shield-alert", "shield-lock", "shield-user", "shield-config", "encryption", "key", "key-list", "key-rotation", "secret-scan", "secret-rotate", "access-grant", "access-deny", "grant", "least-privilege", "zero-trust", "rbac", "policy-list", "audit-log", "compliance", "consent", "certificate", "session-token", "mfa", "login", "logout", "breach", "vulnerability", "run-scan", "scan-security", "firewall-cloud", "private-link", "taint"],
    snippet: `import { ShieldCheck, KeyRotation, ZeroTrust, AuditLog } from "@iconmind/react";`,
  },
  {
    slug: "cloud-console",
    group: "platform",
    name: "Cloud console",
    lead: "Compute, network, storage and the cost of all three — the icons a console or an infrastructure dashboard needs.",
    body: [
      "Cloud UIs have a vocabulary of their own: a subnet is not a network, a spot node is not a VM, and a region pair is not two regions. Each is drawn as itself here, and the cost family — budget, alert, explorer, pay-per-use — is drawn from one coin so a billing page holds together.",
      "The resilience icons (warm standby, failover region, multi-cloud) are the ones people usually improvise; they are here so an architecture diagram and the console it describes can use the same picture.",
    ],
    icons: ["cloud", "cloud-add", "cloud-sync", "cloud-config", "vm", "bare-metal", "container", "function-cloud", "serverless", "autoscale", "spot-node", "scale-up", "scale-down", "region", "region-pair", "failover-region", "warm-standby", "multi-cloud", "hybrid-cloud", "private-cloud", "subnet", "gateway", "load-balancer", "dns", "egress", "private-endpoint", "router", "ethernet", "satellite", "block-storage", "storage-bucket", "cost", "cost-alert", "cost-explorer", "budget", "pay-per-use"],
    snippet: `import { Vm, LoadBalancer, RegionPair, CostAlert } from "@iconmind/react";`,
  },
  {
    slug: "automation-builder",
    group: "platform",
    name: "Automation builder",
    lead: "Triggers, conditions, branches, loops and the human in the middle — the icons a workflow canvas is built from.",
    body: [
      "A node-based builder needs every control-flow shape to be legible at 24 px on a canvas that is mostly lines: a branch, a parallel split, a loop that breaks, a retry with backoff, a catch block, a delay. They are drawn as one family, so a graph reads as a graph rather than as thirty unrelated glyphs.",
      "The approval icons close the loop — most real automations stop somewhere and wait for a person.",
    ],
    icons: ["workflow", "trigger", "trigger-email", "trigger-file", "cron", "event-bus", "action", "action-step", "action-http", "condition", "switch-case", "branch-flow", "parallel", "splitter", "loop-step", "while-loop", "break-loop", "continue-loop", "retry-policy", "delay", "timer", "catch-block", "throw-error", "inbox-pattern", "outbox", "approval-step", "human-approval", "priority", "task-queue-agent", "run-next", "add-run", "safe-run"],
    snippet: `import { Trigger, BranchFlow, RetryPolicy, HumanApproval } from "@iconmind/react";`,
  },
  {
    slug: "analytics-dashboard",
    group: "platform",
    name: "Analytics dashboard",
    lead: "Every chart type drawn on the same axes, plus the words around them — segments, cohorts, funnels, goals and the numbers that move.",
    body: [
      "Chart icons are usually the weakest part of a set: three bars, a line, a pie, and then improvisation. Here there are fifteen, all on the same axis pair, including the ones dashboards actually need — gantt, gauge, heatmap, funnel, spline, scatter, donut — plus the same charts with the axes taken away for a sparkline.",
      "The analysis vocabulary comes with them: cohort, segment, retention, churn, conversion, A/B test, win rate.",
    ],
    icons: ["chart-bar", "chart-line", "chart-area", "chart-pie", "chart-donut", "chart-scatter", "chart-heatmap", "chart-funnel", "chart-gauge", "chart-timeline", "chart-gantt", "chart-spline", "chart-bar-horizontal", "chart-column-increasing", "chart-column-stacked", "chart-no-axes-column", "metric", "kpi", "insight", "dashboard", "segment", "cohort", "retention", "churn", "conversion", "funnel-chart", "ab-test", "win-rate", "active-users", "revenue", "goal", "goal-progress", "top-result", "drilldown", "date-range", "sort"],
    snippet: `import { ChartGantt, Cohort, Retention, AbTest } from "@iconmind/react";`,
  },
  {
    slug: "device-fleet",
    group: "platform",
    name: "Devices and hardware",
    lead: "Laptops, phones, routers, cables and the silicon underneath — for fleet consoles, IoT dashboards and anything that manages machines.",
    body: [
      "These are the icons people most often ask other sets for, and the ones an AI product needs the moment it runs somewhere other than a browser: an edge node, a sensor board, a SIM, a satellite link, a machine's CPU, GPU and RAM.",
      "Drawn on the same grid as the rest, so a fleet page and an agent page belong to the same product.",
    ],
    icons: ["laptop", "tablet", "phone", "smartwatch", "monitor", "keyboard", "mouse", "printer", "webcam", "camera", "speaker", "headset", "headphones", "gamepad", "joystick", "router", "ethernet", "satellite", "wifi", "usb", "cable", "sim-card", "sd-card", "motherboard", "cpu", "gpu", "memory-ram", "battery", "battery-charging", "power", "haptic", "terminal", "server", "bare-metal", "edge-node"],
    snippet: `import { Laptop, Router, SimCard, EdgeNode } from "@iconmind/react";`,
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
