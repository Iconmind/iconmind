/**
 * Batch 34 — how a server is reached, and what a memory is made of.
 *
 * The four transports (`mcp-stdio`, `mcp-http`, `mcp-sse`, `mcp-websocket`) are one question
 * asked four ways: which direction can messages go, and does the connection stay open. Each
 * answers it with the chamfered body and nothing else, so the four read as one family.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { machinePage } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_34: Icon[] = [
  /* ── The four transports ──────────────────────────────────────────────────────── */

  {
    slug: "mcp-stdio", category: "mcp", subcategory: "transport",
    name: "MCP stdio", description: "MCP over stdio — a local server on the other end of a pipe from the client",
    tags: ["pipe", "local", "process"], family: "machine",
    aliases: [], keywords: ["stdin stdout", "local process", "pipe", "spawn", "subprocess"],
    shapes: [frame(6, 4, 12, 16, 3, { chamfer: 3, gap: 0 }), row(9, 2, 6), row(15, 18, 22)],
  },
  {
    slug: "mcp-http", category: "mcp", subcategory: "transport",
    name: "MCP over HTTP", description: "MCP over HTTP — a remote server you call across the network with requests",
    tags: ["remote", "request", "post"], family: "machine",
    aliases: [], keywords: ["streamable http", "remote server", "post", "url", "network"],
    shapes: [
      frame(11, 4, 11, 16, 3, { chamfer: 3, gap: 0 }),
      row(9, 2, 11), poly([[8, 6], [11, 9], [8, 12]]),
      row(15, 2, 11), poly([[5, 12], [2, 15], [5, 18]]),
    ],
  },
  {
    slug: "mcp-sse", category: "mcp", subcategory: "transport",
    name: "MCP server-sent events", description: "MCP server-sent events — the server pushing a stream of events without being asked",
    tags: ["stream", "push", "events"], family: "machine",
    aliases: [], keywords: ["server sent events", "stream", "push", "one way", "eventsource"],
    shapes: [
      frame(2, 6, 12, 12, 3, { chamfer: 3, gap: 0 }),
      arc(14, 12, 4, 315, 45), arc(14, 12, 7, 315, 45),
    ],
  },
  {
    slug: "mcp-websocket", category: "mcp", subcategory: "transport",
    name: "MCP over WebSocket", description: "MCP over WebSocket — a persistent connection that stays open both ways",
    tags: ["duplex", "persistent", "socket"], family: "machine",
    aliases: [], keywords: ["websocket", "duplex", "persistent", "open connection", "ws"],
    shapes: [frame(2, 6, 11, 12, 3, { chamfer: 3, gap: 0 }), row(12, 13, 16), disc(19, 12, 3)],
  },

  /* ── What a server offers ─────────────────────────────────────────────────────── */

  {
    slug: "mcp-capability", category: "mcp", subcategory: "registry",
    name: "MCP capability", description: "An MCP capability — a feature a server declares it can offer",
    tags: ["declares", "feature", "offer"], family: "machine",
    aliases: [], keywords: ["capabilities", "declared", "negotiated", "supports", "feature flag"],
    shapes: [
      frame(3, 4, 18, 16, 3, { chamfer: 3, gap: 4 }),
      col(9, 10, 16), col(12, 10, 16), col(15, 10, 16),
    ],
  },
  {
    slug: "mcp-resource-subscribe", category: "mcp", subcategory: "resource",
    name: "MCP resource subscribe", description: "MCP resource subscribe — tell me when this resource changes so I can reload it",
    tags: ["watch", "notify", "follow"], family: "page",
    aliases: [], keywords: ["subscribe", "watch", "resources/subscribe", "notify on change"],
    shapes: [machinePage(), disc(16, 17, 1), arc(16, 17, 4, 180, 270), arc(16, 17, 7, 180, 270)],
  },
  {
    slug: "mcp-resource-template", category: "mcp", subcategory: "resource",
    name: "MCP resource template", description: "An MCP resource template — a URI pattern with a placeholder to fill in",
    tags: ["uri", "placeholder", "pattern"], family: "page",
    aliases: [], keywords: ["uri template", "placeholder", "parameterised", "rfc 6570", "pattern"],
    shapes: [machinePage(), row(10, 9, 15), row(14, 9, 15), col(9, 10, 14), col(15, 10, 14)],
  },
  {
    slug: "mcp-prompt-argument", category: "mcp", subcategory: "prompt",
    name: "MCP prompt argument", description: "An MCP prompt argument — the slot in a prompt template you fill with input",
    tags: ["slot", "variable", "input"], family: "machine",
    aliases: [], keywords: ["argument", "variable", "slot", "required", "fill in"],
    shapes: [
      frame(3, 5, 18, 14, 3, { chamfer: 3, gap: 4 }),
      row(11, 7, 17), row(15, 7, 11), row(15, 14, 17),
    ],
  },

  /* ── What a memory is made of ─────────────────────────────────────────────────── */

  {
    slug: "memory-episodic", category: "agents", subcategory: "memory",
    name: "Episodic memory", description: "Episodic memory — what happened, in order, an agent's record of events",
    tags: ["events", "history", "when"], family: "figure",
    aliases: ["episodic"], keywords: ["what happened", "event log", "timeline", "recall", "past turns"],
    // Discs centred on the line swallow it. The line reads as time on its own.
    shapes: [col(4, 4, 20), row(8, 6, 20), row(12, 6, 16), row(16, 6, 20)],
  },
  {
    slug: "memory-semantic", category: "agents", subcategory: "memory",
    name: "Semantic memory", description: "Semantic memory — what things mean and how facts join to each other",
    tags: ["facts", "meaning", "linked"], family: "window",
    aliases: [], keywords: ["facts", "concepts", "meaning", "knowledge", "associations"],
    shapes: [rect(2, 5, 20, 14, 2), disc(7, 12, 2), disc(17, 12, 2), row(12, 9, 15)],
  },

  /* ── Where things wait, and where they are written down ───────────────────────── */

  {
    slug: "message-queue", category: "data", subcategory: "streaming",
    name: "Message queue", description: "A message queue — messages waiting their turn in a first-in, first-out backlog",
    tags: ["fifo", "backlog", "waiting"], family: "figure",
    aliases: [], keywords: ["fifo", "backlog", "kafka", "sqs", "waiting"],
    shapes: [rect(2, 6, 7, 12, 2), rect(12, 6, 7, 12, 2), poly([[19, 9], [22, 12], [19, 15]])],
  },
  {
    slug: "metadata-store", category: "data", subcategory: "catalog",
    name: "Metadata store", description: "A metadata store — what is known about the data, its schema and registry",
    tags: ["about", "schema", "registry"], family: "window",
    aliases: [], keywords: ["about the data", "schema registry", "annotations", "properties"],
    shapes: [
      rect(2, 4, 20, 16, 2), row(9, 2, 22),
      row(13, 6, 10), row(13, 14, 18), row(17, 6, 10), row(17, 14, 18),
    ],
  },
  {
    slug: "notebook", category: "devtools", subcategory: "editor",
    name: "Notebook", description: "A notebook — cells of code you run one at a time, Jupyter style",
    tags: ["jupyter", "cells", "run"], family: "page",
    aliases: [], keywords: ["jupyter", "ipynb", "cells", "colab", "run cell"],
    shapes: [rect(2, 3, 20, 18, 2), col(7, 3, 21), row(9, 9, 19), row(15, 9, 19)],
  },
  {
    slug: "namespace", category: "devops", subcategory: "orchestration",
    name: "Namespace", description: "A namespace — a named scope things belong to, isolated from the rest",
    tags: ["scope", "group", "isolated"], family: "window",
    aliases: [], keywords: ["scope", "kubernetes namespace", "isolation", "grouping", "tenant"],
    shapes: [rect(2, 7, 20, 14, 2), row(4, 6, 14)],
  },
  {
    slug: "partition", category: "data", subcategory: "storage",
    name: "Partition", description: "A partition — the same table split into ranges or shards for scale",
    tags: ["shard", "split", "range"], family: "window",
    aliases: ["shard"], keywords: ["shard", "split", "range key", "hash partition", "distributed"],
    shapes: [rect(2, 4, 20, 16, 2), col(12, 4, 20), row(12, 12, 22)],
  },

  /* ── Getting in, and getting it wrong ─────────────────────────────────────────── */

  {
    slug: "oauth", category: "security", subcategory: "auth",
    name: "OAuth", description: "OAuth — somebody else's key lent to you, a delegated grant of access",
    tags: ["delegate", "grant", "token"], family: "lock",
    aliases: [], keywords: ["authorisation", "delegated access", "access token", "grant", "scope"],
    shapes: [rect(8, 9, 14, 11, 2), arc(15, 9, 4, 180, 360), disc(4, 14, 2), row(14, 6, 10)],
  },
  {
    slug: "password", category: "security", subcategory: "secret",
    name: "Password", description: "A password — the secret hidden behind the dots in the sign-in field",
    tags: ["secret", "field", "hidden"], family: "window",
    aliases: [], keywords: ["passphrase", "credential", "hidden field", "login", "secret"],
    shapes: [rect(2, 7, 20, 10, 2), disc(7, 12, 1), disc(11, 12, 1), disc(15, 12, 1)],
  },
  {
    slug: "on-call", category: "devops", subcategory: "incident",
    name: "On call", description: "On call — whoever is carrying the pager on the rota right now",
    tags: ["rota", "paged", "duty"], family: "figure",
    aliases: ["oncall"], keywords: ["pager", "rota", "duty", "escalation", "page someone"],
    shapes: [rect(2, 3, 10, 18, 2), row(17, 5, 9), arc(15, 8, 3, 270, 90), arc(15, 8, 6, 270, 90)],
  },

  /* ── Moving, marking, mending ─────────────────────────────────────────────────── */

  {
    slug: "migrate", category: "data", subcategory: "pipeline",
    name: "Migrate", description: "Migrate — move data or a system to the new place and cut over",
    tags: ["move", "transfer", "cutover"], family: "figure",
    aliases: [], keywords: ["move data", "cutover", "transfer", "schema migration", "port"],
    shapes: [rect(2, 6, 7, 12, 2), rect(15, 6, 7, 12, 2), row(12, 9, 15), poly([[12, 9], [15, 12], [12, 15]])],
  },
  {
    slug: "milestone", category: "devops", subcategory: "release",
    name: "Milestone", description: "A milestone — the marker you were aiming for, a flag on the way",
    tags: ["marker", "flag", "target"], family: "figure",
    aliases: ["flag"], keywords: ["marker", "target date", "goal post", "release marker"],
    // A plain flag on a post is `checkpoint`, byte for byte. The swallowtail is the difference.
    shapes: [row(19, 2, 22), col(8, 7, 19), poly([[8, 7], [18, 7], [14, 11], [18, 15], [8, 15]])],
  },
  {
    slug: "patch", category: "devops", subcategory: "release",
    name: "Patch", description: "A patch — a small fix let into a bigger system, an overlay on what was there",
    tags: ["fix", "hotfix", "overlay"], family: "figure",
    aliases: [], keywords: ["fix", "small release", "overlay", "diff applied", "bugfix"],
    shapes: [rect(2, 3, 14, 14, 2), rect(11, 11, 11, 10, 2)],
  },
  {
    slug: "ocr", category: "ai", subcategory: "multimodal",
    name: "OCR", description: "OCR — optical character recognition, reading the words out of a picture as text",
    tags: ["scan", "extract", "text"], family: "figure",
    aliases: [], keywords: ["text recognition", "scan", "extract text", "document ai", "read image"],
    shapes: [
      poly([[3, 8], [3, 4], [8, 4]]), poly([[16, 4], [21, 4], [21, 8]]),
      poly([[3, 16], [3, 20], [8, 20]]), poly([[16, 20], [21, 20], [21, 16]]),
      row(10, 7, 17), row(14, 7, 14),
    ],
  },

  /* ── Training, shaped ─────────────────────────────────────────────────────────── */

  {
    slug: "optimiser", category: "ai", subcategory: "training",
    name: "Optimiser", description: "An optimiser — the algorithm like Adam that walks the loss downhill to a minimum",
    tags: ["descent", "minimum", "adam"], family: "chevron",
    aliases: ["optimizer"], keywords: ["gradient descent", "adam", "sgd", "minimum", "converge"],
    shapes: [poly([[3, 7], [9, 13], [15, 13], [21, 7]]), col(12, 13, 17)],
  },
  {
    slug: "normalize", category: "ai", subcategory: "training",
    name: "Normalise", description: "Normalise — bring values onto the same scale so they can be compared",
    tags: ["scale", "even", "rescale"], family: "chart",
    aliases: ["normalise"], keywords: ["rescale", "standardise", "z-score", "min max", "same range"],
    shapes: [row(6, 3, 21), col(6, 8, 16), col(12, 8, 16), col(18, 8, 16), row(18, 3, 21)],
  },
];
