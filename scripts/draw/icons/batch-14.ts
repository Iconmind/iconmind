/**
 * Batch 14 — degrees of the same thing.
 *
 * `memory`, `memory-short-term` and `memory-long-term` are one panel with one, three and
 * five columns in it. Nothing else changes, and the count is the whole message — which only
 * works because the panel is the same panel. A set where each of the three invented its own
 * container would be saying three unrelated things about storage.
 *
 * That is the same argument as the mark system, applied to a quantity rather than a symbol.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { panel, ring, server, window_ } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_14: Icon[] = [
  /* ── Memory, in three amounts ─────────────────────────────────────────────────── */

  {
    slug: "memory-short-term", category: "agents", subcategory: "memory",
    name: "Short-term memory", description: "Short-term memory — what an agent is holding right now, within the current session",
    tags: ["working", "current", "session"], family: "window",
    aliases: [], keywords: ["working memory", "scratchpad", "session", "current turn"],
    shapes: [panel(), col(12, 9, 15)],
  },
  {
    slug: "memory-long-term", category: "agents", subcategory: "memory",
    name: "Long-term memory", description: "Long-term memory — what an agent keeps between runs and can recall later",
    tags: ["persistent", "stored", "recall"], family: "window",
    aliases: [], keywords: ["persistent", "vector memory", "profile", "across sessions"],
    shapes: [panel(), col(6, 9, 15), col(9, 9, 15), col(12, 9, 15), col(15, 9, 15), col(18, 9, 15)],
  },

  /* ── Agents ───────────────────────────────────────────────────────────────────── */

  {
    slug: "agent-delegate", category: "agents", subcategory: "communication",
    name: "Agent delegate", description: "Agent delegate — hand a piece of work down to a smaller sub-agent",
    tags: ["assign", "hand-down", "sub-agent"], family: "orbit",
    aliases: [], keywords: ["assign", "sub-agent", "spawn worker", "hand down", "farm out"],
    // Down and to the right, and the second ring is no smaller than the first. Shrinking it
    // would say the work got smaller; what changed is who is doing it.
    shapes: [
      arc(6, 6, 3, 295, 245), poly([[10, 10], [12.5, 12.5]]),
      poly([[11.5, 14], [14, 14], [14, 11.5]]), arc(18, 18, 3, 295, 245),
    ],
  },
  {
    slug: "agent-blocked", category: "agents", subcategory: "lifecycle",
    name: "Agent blocked", description: "Agent blocked — the agent cannot go on, stuck waiting on something it does not have",
    tags: ["stuck", "waiting", "barred"], family: "orbit",
    aliases: ["blocked"], keywords: ["stuck", "deadlock", "waiting on", "barred", "held"],
    // A stroke across the whole body, not a cross inside it. `agent-off` means somebody
    // turned it off; blocked means something outside is in the way, so the mark comes from
    // outside and goes past.
    shapes: [ring(), poly([[6, 18], [18, 6]])],
  },
  {
    slug: "action-step", category: "agents", subcategory: "execution",
    name: "Action step", description: "An action step — one concrete thing an agent actually does in its loop",
    tags: ["step", "act", "invoke"], family: "chain",
    aliases: [], keywords: ["step", "act", "invoke", "call", "operation"],
    // The step leaves its node down the diagonal. `evaluate-step` and `rejection` are the
    // same node and flow with a different verb at the end — the family stays aligned.
    shapes: [disc(5, 5, 3), poly([[9.5, 9.5], [16, 16]]), poly([[20, 16.5], [20, 20], [16.5, 20]])],
  },
  {
    slug: "tool-registry", category: "agents", subcategory: "tool-use",
    name: "Tool registry", description: "A tool registry — the catalogue of every tool an agent is allowed to call",
    tags: ["catalogue", "available", "list"], family: "window",
    aliases: [], keywords: ["catalog", "manifest", "available tools", "allowlist", "index"],
    shapes: [
      frame(3, 4, 18, 16, 3, { gap: 4 }),
      disc(7, 10, 1), row(10, 11, 17),
      disc(7, 16, 1), row(16, 11, 17),
    ],
  },

  /* ── MCP ──────────────────────────────────────────────────────────────────────── */

  {
    slug: "mcp-config", category: "mcp", subcategory: "registry",
    name: "MCP config", description: "MCP config — how the servers are set up, the manifest that lists what a client connects to",
    tags: ["settings", "manifest", "setup"], family: "tower",
    aliases: [], keywords: ["config file", "manifest", "settings", "claude_desktop_config"],
    // Two rails and two knobs, and the tower gives up its status light to make room. One
    // rail with one knob crossing it is a plus sign, which is what `mcp-server-add` already
    // is — and a config icon that reads as an add icon is worse than a busy one.
    shapes: [
      frame(4, 3, 16, 18, 3, { chamfer: 3, gap: 3 }), row(18, 7, 17),
      row(10, 8, 16), col(14, 8, 12), row(15, 8, 16), col(10, 13, 17),
    ],
  },

  /* ── RAG ──────────────────────────────────────────────────────────────────────── */

  {
    slug: "ingestion", category: "rag", subcategory: "ingestion",
    name: "Ingestion", description: "Ingestion — getting the source material loaded into a pipeline or a knowledge base",
    tags: ["load", "intake", "feed"], family: "window",
    aliases: ["intake"], keywords: ["load", "crawl", "import", "feed", "index build"],
    // Two streams falling into one box, and each of them has a point on it. Bare columns
    // over a container read as steam coming off it — the direction has to be drawn, and
    // three streams with heads is one element more than the budget allows.
    shapes: [
      rect(4, 16, 16, 5, 2.5),
      col(8, 3, 10), poly([[6, 8], [8, 10], [10, 8]]),
      col(16, 3, 10), poly([[14, 8], [16, 10], [18, 8]]),
    ],
  },
  {
    slug: "chunk-size", category: "rag", subcategory: "chunking",
    name: "Chunk size", description: "Chunk size — how big each piece of a split document is, measured in tokens or characters",
    tags: ["length", "measure", "window"], family: "capsule",
    aliases: [], keywords: ["tokens per chunk", "length", "window size", "measure"],
    // A dimension line with heads at both ends, over the thing being measured. Plain ticks
    // at the ends made a dumbbell: it takes arrowheads before a line reads as a measurement
    // rather than as an object of its own.
    shapes: [
      rect(3, 11, 18, 10, 2),
      row(6, 6, 18), poly([[8, 4], [6, 6], [8, 8]]), poly([[16, 4], [18, 6], [16, 8]]),
    ],
  },

  /* ── Interface ────────────────────────────────────────────────────────────────── */

  {
    slug: "grid", category: "interface", subcategory: "layout",
    name: "Grid", description: "A grid — items laid out in rows and columns, tiles in a regular layout",
    tags: ["tiles", "layout", "quarters"], family: "window",
    aliases: ["tiles"], keywords: ["gallery", "tiles", "columns", "masonry", "thumbnails"],
    // One box divided, where `cluster` is four boxes apart. A grid is a way of arranging
    // one surface; a cluster is a number of separate things.
    shapes: [frame(2, 2, 20, 20, 3, { gap: 4 }), row(12, 2, 22), col(12, 2, 22)],
  },
  {
    slug: "smile", category: "interface", subcategory: "state",
    name: "Smile", description: "A smile — it went well, a happy face for positive feedback from the user",
    tags: ["happy", "positive", "feedback"], family: "orbit",
    aliases: ["happy"], keywords: ["positive", "rating", "satisfied", "good", "thumbs up"],
    shapes: [disc(12, 12, 9), disc(9, 9, 1), disc(15, 9, 1), arc(12, 13, 4, 20, 160)],
  },
  {
    slug: "frown", category: "interface", subcategory: "state",
    name: "Frown", description: "A frown — it did not go well, an unhappy face for negative feedback",
    tags: ["unhappy", "negative", "feedback"], family: "orbit",
    aliases: ["unhappy"], keywords: ["negative", "rating", "dissatisfied", "bad", "thumbs down"],
    // The same face with the mouth's centre moved below it rather than above. Two drawings
    // that differ by one number cannot drift apart in anything else.
    shapes: [disc(12, 12, 9), disc(9, 9, 1), disc(15, 9, 1), arc(12, 21, 4, 200, 340)],
  },
];
