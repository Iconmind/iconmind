/**
 * Batch 21 — the shapes that narrow and widen, and more of the cut corner.
 *
 * `encoder` and `decoder` are one trapezoid and its mirror, and the arrow goes the same way
 * in both — into the narrow end for one, out of it for the other. That is the whole of what
 * the two words mean, and it is drawn with nothing else.
 *
 * Four more MCP concepts take the chamfer: a registry, a log, a transport. Anything with a
 * cut corner belongs to the protocol, and the plain version of the same drawing is the
 * general one. `mcp-logging` is `log` with one corner off.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { lattice, machinePage, panel, shield } from "../bodies.ts";
import { SMALL, off } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_21: Icon[] = [
  /* ── Narrowing and widening ───────────────────────────────────────────────────── */

  {
    slug: "encoder", category: "ai", subcategory: "embedding",
    name: "Encoder", description: "An encoder — turns an input into a compact internal representation",
    tags: ["compress", "narrow", "input"], family: "funnel",
    aliases: [], keywords: ["embed", "compress", "latent", "bottleneck", "transformer"],
    shapes: [
      poly([[4, 3], [10, 9], [10, 15], [4, 21]]),
      row(12, 11, 18), poly([[15, 9], [18, 12], [15, 15]]),
    ],
  },
  {
    slug: "decoder", category: "ai", subcategory: "inference",
    name: "Decoder", description: "A decoder — turns an internal representation back into an output",
    tags: ["expand", "widen", "output"], family: "funnel",
    aliases: [], keywords: ["generate", "expand", "detokenise", "output head", "autoregressive"],
    // The same trapezoid mirrored, and the arrow still points right — into the narrow end
    // this time rather than out of it. Reversing the arrow instead would have made the pair
    // about direction, when what differs is which end is wide.
    shapes: [
      poly([[20, 3], [14, 9], [14, 15], [20, 21]]),
      row(12, 3, 11), poly([[8, 9], [11, 12], [8, 15]]),
    ],
  },
  {
    slug: "adapter", category: "ai", subcategory: "training",
    name: "Adapter", description: "An adapter — a small trained piece like LoRA bolted on to a big frozen model",
    tags: ["lora", "attach", "small"], family: "machine",
    aliases: ["lora"], keywords: ["lora", "peft", "fine-tune", "plugin weights", "delta"],
    shapes: [rect(2, 6, 10, 12, 2), row(12, 12, 15), rect(15, 9, 7, 7, 2)],
  },

  /* ── Space, and points in it ──────────────────────────────────────────────────── */

  {
    slug: "embedding-space", category: "ai", subcategory: "embedding",
    name: "Embedding space", description: "Embedding space — the latent space where vectors live as points",
    tags: ["latent", "manifold", "points"], family: "lattice",
    aliases: ["latent-space"], keywords: ["latent", "manifold", "vector space", "projection"],
    shapes: [lattice(), disc(9, 11, 1), disc(15, 14, 1)],
  },
  {
    slug: "distance", category: "ai", subcategory: "embedding",
    name: "Distance", description: "Distance — how far apart two vectors are, cosine or euclidean",
    tags: ["metric", "cosine", "gap"], family: "chain",
    aliases: ["cosine-distance"], keywords: ["cosine", "euclidean", "similarity", "metric", "nearest"],
    shapes: [disc(6, 18, 2), poly([[7.5, 16.5], [16.5, 7.5]]), disc(18, 6, 2)],
  },
  {
    slug: "dimension", category: "ai", subcategory: "embedding",
    name: "Dimension", description: "A dimension — how many numbers each vector has, the width of an embedding",
    tags: ["axes", "size", "width"], family: "axes",
    aliases: [], keywords: ["dims", "vector size", "1536", "axes", "rank"],
    // Three axes from one corner, the third at 45° because that is how a third dimension
    // has been drawn on flat paper since before anyone had a screen.
    shapes: [col(4, 4, 20), row(20, 4, 20), poly([[7, 17], [15, 9]]), poly([[13.5, 7], [17, 7], [17, 10.5]])],
  },

  /* ── Training, stopped ────────────────────────────────────────────────────────── */

  {
    slug: "early-stop", category: "ai", subcategory: "training",
    name: "Early stopping", description: "Early stopping — halt training before the model starts getting worse",
    tags: ["halt", "patience", "converged"], family: "axes",
    aliases: [], keywords: ["patience", "convergence", "overfitting", "checkpoint", "halt"],
    // The curve flattens before the wall. A single 45° run is a straight line however it is
    // labelled, and a straight line beside a vertical is two slashes — the plateau in the
    // middle is what makes the descent read as a curve that stopped improving.
    shapes: [poly([[3, 5], [9, 11], [13, 11], [16, 14]]), col(19, 4, 20)],
  },
  {
    slug: "content-filter", category: "ai", subcategory: "safety",
    name: "Content filter", description: "A content filter — the moderation screen that decides what is not allowed through",
    tags: ["moderation", "block", "screen"], family: "shield",
    aliases: ["moderation"], keywords: ["moderation", "nsfw", "policy", "screen", "block"],
    // `filter`'s funnel inside `shield`'s body. The funnel alone is any narrowing; in a
    // shield it is the kind that is there to protect you.
    shapes: [shield(), poly([[9, 9], [12, 12], [12, 15]]), poly([[15, 9], [12, 12]])],
  },

  /* ── Agents talking ───────────────────────────────────────────────────────────── */

  {
    slug: "message-bus", category: "agents", subcategory: "communication",
    name: "Message bus", description: "A message bus — one shared channel everything publishes to and reads from",
    tags: ["channel", "queue", "shared"], family: "rails",
    aliases: [], keywords: ["pubsub", "channel", "topic", "event bus", "broker"],
    shapes: [row(16, 2, 22), disc(6, 7, 2), disc(18, 7, 2), col(6, 9.5, 16), col(18, 9.5, 16)],
  },
  {
    slug: "agent-protocol", category: "agents", subcategory: "communication",
    name: "Agent protocol", description: "An agent protocol — the agreed rules two agents talk by when they exchange messages",
    tags: ["contract", "channel", "agreement"], family: "orbit",
    aliases: [], keywords: ["a2a", "contract", "schema", "interop", "handshake"],
    // Two agents on `agent-delegate`'s diagonal, and an equals sign turned to lie along
    // it — the agreement between them. No arrowheads: a protocol has no direction.
    shapes: [
      arc(6, 6, 3, 295, 245), arc(18, 18, 3, 295, 245),
      poly([[9.5, 12], [12, 9.5]]), poly([[12, 14.5], [14.5, 12]]),
    ],
  },
  {
    slug: "agent-sandbox", category: "agents", subcategory: "execution",
    name: "Agent sandbox", description: "An agent sandbox — an isolated place where an agent can run without touching anything real",
    tags: ["isolated", "contained", "safe"], family: "window",
    aliases: [], keywords: ["isolation", "container", "restricted", "vm", "safe execution"],
    shapes: [frame(2, 2, 20, 20, 3, { gap: 4 }), arc(12, 12, 6, 295, 245)],
  },
  {
    slug: "branch-step", category: "agents", subcategory: "planning",
    name: "Branch step", description: "A branch step — the point in a plan where the path splits into choices",
    tags: ["fork", "split", "choice"], family: "chain",
    aliases: [], keywords: ["fork", "split", "alternative", "if", "path"],
    shapes: [disc(9, 12, 4), poly([[12.5, 9.5], [19, 3]]), poly([[12.5, 14.5], [19, 21]])],
  },
  {
    slug: "memory-clear", category: "agents", subcategory: "memory",
    name: "Memory clear", description: "Memory clear — forget it all, reset and wipe an agent's memory",
    tags: ["forget", "reset", "wipe"], family: "window",
    aliases: ["forget"], keywords: ["reset", "wipe", "flush", "amnesia", "start fresh"],
    shapes: [panel(), ...off(SMALL)],
  },

  /* ── More of the protocol ─────────────────────────────────────────────────────── */

  {
    slug: "mcp-transport", category: "mcp", subcategory: "transport",
    name: "MCP transport", description: "MCP transport — how the two ends actually talk, over stdio or a network channel",
    tags: ["stdio", "channel", "wire"], family: "machine",
    aliases: [], keywords: ["stdio", "sse", "http", "websocket", "channel"],
    // Two channels between the ends, not one. A transport is the pipe rather than the
    // traffic, and a single line is already `mcp-connection`. Only the server end is
    // chamfered: the other end is whoever is calling, and they are not part of the protocol
    // in the way the server is.
    shapes: [
      frame(2, 6, 11, 12, 3, { chamfer: 3, gap: 0 }), rect(16, 6, 6, 12, 3),
      row(11, 13, 16), row(15, 13, 16),
    ],
  },
  {
    slug: "mcp-registry", category: "mcp", subcategory: "registry",
    name: "MCP registry", description: "An MCP registry — the directory where servers are listed and discovered",
    tags: ["directory", "catalogue", "index"], family: "window",
    aliases: [], keywords: ["directory", "discovery", "catalog", "marketplace", "index"],
    // `tool-registry` with its corner cut. The list is the same list; the chamfer says
    // whose list it is.
    shapes: [
      frame(3, 4, 18, 16, 3, { chamfer: 3, gap: 4 }),
      disc(7, 10, 1), row(10, 11, 17),
      disc(7, 16, 1), row(16, 11, 17),
    ],
  },
  {
    slug: "mcp-logging", category: "mcp", subcategory: "transport",
    name: "MCP logging", description: "MCP logging — what a server reported as it ran, its diagnostics and records",
    tags: ["records", "trace", "diagnostics"], family: "page",
    aliases: [], keywords: ["stderr", "diagnostics", "notifications", "debug", "trace"],
    shapes: [machinePage(), row(9, 8, 16), poly([[10, 13.5], [12, 15.5], [14, 13.5]])],
  },

  {
    slug: "dedupe", category: "rag", subcategory: "chunking",
    name: "Deduplicate", description: "Deduplicate — two of the same, with one of them dropped so only unique items remain",
    tags: ["duplicate", "unique", "drop"], family: "window",
    aliases: [], keywords: ["duplicate", "unique", "distinct", "collapse", "near-duplicate"],
    // Two identical shapes, one struck out. `copy` overlaps its pair because it is making
    // one; these two stand apart because the question is which of them to keep.
    shapes: [
      rect(2, 7, 8, 10, 2), rect(13, 7, 8, 10, 2),
      poly([[15, 10], [19, 14]]), poly([[19, 10], [15, 14]]),
    ],
  },
];
