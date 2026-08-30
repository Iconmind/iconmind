/**
 * Batch 29 — the rest of the action family, and inference in more detail.
 *
 * `action-database`, `action-notify` and `action-script` are the same idea as
 * `action-email` and `action-http`: a step in a workflow that does one particular kind of
 * thing. What varies is the object, and the object is always one the set already draws.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { core, machine, page, ring } from "../bodies.ts";
import type { Icon } from "../build.ts";

/** A short cylinder, at the size the action family uses for a store. */
const store = () => [
  raw("M4 6A8 3 0 0 1 20 6V14A8 3 0 0 1 4 14Z",
    "a cylinder: an elliptical rim of 8 by 3, sides of 8, and the front of the base", true),
  raw("M4 6A8 3 0 0 0 20 6", "the far side of the top rim, which the near side hides"),
];

export const BATCH_29: Icon[] = [
  /* ── Actions ──────────────────────────────────────────────────────────────────── */

  {
    slug: "action-database", category: "automation", subcategory: "action",
    name: "Database action", description: "Database action — the workflow step that reads or writes a table",
    tags: ["query", "write", "store"], family: "cylinder",
    aliases: [], keywords: ["insert", "query", "upsert", "sql step", "record"],
    shapes: [...store(), col(12, 17, 21), poly([[9, 19], [12, 22], [15, 19]])],
  },
  {
    slug: "action-notify", category: "automation", subcategory: "action",
    name: "Notify action", description: "Notify action — the workflow step that tells somebody, a ping or a message",
    tags: ["alert", "message", "ping"], family: "figure",
    aliases: [], keywords: ["push", "slack", "ping", "notify", "message step"],
    shapes: [
      arc(12, 12, 6, 180, 360), col(6, 12, 16), col(18, 12, 16), row(16, 4, 20),
      disc(12, 19, 1),
    ],
  },
  {
    slug: "action-script", category: "automation", subcategory: "action",
    name: "Script action", description: "Script action — the workflow step that runs custom code you wrote yourself",
    tags: ["code", "custom", "run"], family: "chevron",
    aliases: [], keywords: ["custom code", "javascript", "python step", "eval", "run"],
    // The stage family's box and arrow, with code marks for a verb — it used to be a
    // third copy of `terminal`'s prompt-in-a-box.
    shapes: [
      rect(2, 6, 13, 12, 2), poly([[7.5, 9.5], [5, 12], [7.5, 14.5]]), poly([[9.5, 9.5], [12, 12], [9.5, 14.5]]),
      row(12, 15, 18), poly([[18, 9], [21, 12], [18, 15]]),
    ],
  },
  {
    slug: "event-driven", category: "automation", subcategory: "trigger",
    name: "Event driven", description: "Event-driven — it runs because something happened, reacting to an emitted event",
    tags: ["reactive", "emit", "listen"], family: "arrow",
    aliases: [], keywords: ["reactive", "pubsub", "listener", "emit", "on event"],
    shapes: [
      poly([[16, 3], [11, 8], [14, 8], [9, 13]]),
      row(17, 3, 15), poly([[14, 14], [17, 17], [14, 20]]),
    ],
  },
  {
    slug: "error-path", category: "automation", subcategory: "condition",
    name: "Error path", description: "The error path — where a flow goes when a step goes wrong, the catch branch",
    tags: ["failure", "branch", "catch"], family: "chain",
    aliases: [], keywords: ["failure branch", "on error", "except", "fallback route"],
    shapes: [
      poly([[2, 8], [9, 8], [13, 12], [22, 12]]),
      poly([[9, 8], [13, 4], [22, 4]]),
      poly([[16, 15], [20, 19]]), poly([[20, 15], [16, 19]]),
    ],
  },
  {
    slug: "branch-flow", category: "automation", subcategory: "condition",
    name: "Branch", description: "A branch — the point in a flow where the path divides and routes one way or another",
    tags: ["split", "fork", "route"], family: "chain",
    aliases: [], keywords: ["split", "route", "if else", "diverge", "path", "branch"],
    shapes: [
      poly([[2, 12], [9, 12], [14, 7], [22, 7]]),
      poly([[9, 12], [14, 17], [22, 17]]),
    ],
  },
  {
    slug: "human-in-the-loop", category: "automation", subcategory: "human-loop",
    name: "Human in the loop", description: "Human in the loop — a person takes part in the run, reviewing or deciding by hand",
    tags: ["manual", "review", "person"], family: "figure",
    aliases: [], keywords: ["manual step", "review gate", "operator", "supervised"],
    shapes: [
      row(12, 2, 7), disc(12, 8, 3), arc(12, 19, 5, 180, 360), row(12, 17, 22),
    ],
  },
  {
    slug: "calendar-trigger", category: "automation", subcategory: "schedule",
    name: "Calendar trigger", description: "A calendar trigger — a flow that runs on a date or a scheduled day",
    tags: ["date", "scheduled", "when"], family: "window",
    aliases: [], keywords: ["on a date", "monthly", "scheduled run", "planned"],
    shapes: [
      frame(3, 5, 18, 16, 3, { gap: 6 }), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5),
      poly([[10, 13], [14, 17], [10, 21]]),
    ],
  },

  /* ── Inference, in more detail ────────────────────────────────────────────────── */

  {
    slug: "inference-fast", category: "ai", subcategory: "inference",
    name: "Fast inference", description: "Fast inference — the answer delivered quickly, low latency at speed",
    tags: ["low-latency", "quick", "speed"], family: "machine",
    aliases: [], keywords: ["low latency", "ttft", "speculative", "quick", "realtime"],
    shapes: [machine(), poly([[14, 6], [10, 10], [12.5, 10], [8.5, 14]])],
  },
  {
    slug: "inference-batch", category: "ai", subcategory: "inference",
    name: "Batch inference", description: "Batch inference — many answers produced together in one bulk, offline pass",
    tags: ["bulk", "queue", "offline"], family: "machine",
    aliases: [], keywords: ["bulk", "offline", "queued", "throughput", "job"],
    shapes: [machine(), poly([[8, 8], [12, 12], [8, 16]]), poly([[12, 8], [16, 12], [12, 16]])],
  },
  {
    slug: "greedy", category: "ai", subcategory: "inference",
    name: "Greedy decoding", description: "Greedy decoding — always take the likeliest next token, deterministic and top-one",
    tags: ["argmax", "deterministic", "top"], family: "chain",
    aliases: [], keywords: ["argmax", "temperature zero", "deterministic", "single path"],
    // The branch that is taken carries a node; the one that is not, does not. There is no
    // way to weight a line in this set, so the difference has to be an object.
    shapes: [
      row(16, 2, 9), poly([[9, 16], [14, 11]]), disc(16, 9, 2), disc(20, 19, 1),
    ],
  },
  {
    slug: "beam-search", category: "ai", subcategory: "inference",
    name: "Beam search", description: "Beam search — keep several candidate sequences alive and pick the best path at the end",
    tags: ["candidates", "paths", "width"], family: "chain",
    aliases: [], keywords: ["beam width", "candidates", "n-best", "search", "decode"],
    shapes: [
      poly([[3, 12], [8, 12], [14, 6], [21, 6]]), poly([[8, 12], [14, 12], [21, 12]]),
      poly([[8, 12], [14, 18], [21, 18]]),
    ],
  },
  {
    slug: "depth", category: "ai", subcategory: "model",
    name: "Depth", description: "Depth — how many layers a network stacks, how deep the model goes",
    tags: ["layers", "deep", "stack"], family: "rails",
    aliases: [], keywords: ["hidden layers", "deep", "stack", "blocks", "n-layer"],
    shapes: [
      rect(3, 2, 18, 4, 2), rect(3, 9, 18, 4, 2), rect(3, 16, 18, 4, 2),
    ],
  },
  {
    slug: "gradient", category: "ai", subcategory: "training",
    name: "Gradient", description: "A gradient — the slope that says which way is downhill for the optimiser",
    tags: ["slope", "descent", "derivative"], family: "axes",
    aliases: [], keywords: ["descent", "backprop", "slope", "derivative", "step"],
    shapes: [
      col(4, 4, 20), row(20, 4, 20),
      poly([[6, 6], [11, 11], [16, 16]]), poly([[12, 16], [16, 16], [16, 12]]),
    ],
  },
  {
    slug: "attention-head", category: "ai", subcategory: "inference",
    name: "Attention head", description: "An attention head — one of the several viewpoints a model attends with at once",
    tags: ["head", "multi", "focus"], family: "orbit",
    aliases: [], keywords: ["multi-head", "qkv", "self-attention", "layer", "focus"],
    // `attention`'s four converging runs, but only two of them, and a body round the
    // middle. The whole is many heads; one head sees part of it.
    shapes: [
      ring(), poly([[6, 6], [10, 10]]), poly([[18, 6], [14, 10]]), core(2),
    ],
  },

  /* ── Retrieval ────────────────────────────────────────────────────────────────── */

  {
    slug: "dense-search", category: "rag", subcategory: "retrieval",
    name: "Dense search", description: "Dense search — retrieval by embedding vector rather than by matching words",
    tags: ["vector", "embedding", "knn"], family: "magnifier",
    aliases: [], keywords: ["embedding search", "dense retrieval", "ann", "vector index"],
    shapes: [
      arc(10, 10, 7, 292, 248), poly([[15, 15], [21, 21]]),
      disc(8, 8, 1), disc(12, 8, 1), disc(8, 12, 1), disc(12, 12, 1),
    ],
  },
  {
    slug: "filter-metadata", category: "rag", subcategory: "retrieval",
    name: "Metadata filter", description: "A metadata filter — narrow the candidates by tags or facets before you search",
    tags: ["facet", "restrict", "tags"], family: "funnel",
    aliases: [], keywords: ["facet", "where clause", "pre-filter", "namespace", "tags"],
    shapes: [
      poly([[9, 4], [3, 4], [10, 11], [10, 18], [14, 18], [14, 11], [21, 4], [15, 4]]),
      disc(6, 20, 1), disc(10, 20, 1), disc(14, 20, 1),
    ],
  },
  {
    slug: "answer-synthesis", category: "rag", subcategory: "grounding",
    name: "Answer synthesis", description: "Answer synthesis — several retrieved sources composed into one written answer",
    tags: ["combine", "compose", "write"], family: "funnel",
    aliases: [], keywords: ["compose", "summarise", "generate answer", "merge sources"],
    shapes: [
      row(6, 3, 9), row(12, 3, 9), row(18, 3, 9),
      poly([[9, 8], [13, 12]]), poly([[9, 16], [13, 12]]),
      row(12, 13, 21),
    ],
  },
  {
    slug: "evidence", category: "rag", subcategory: "grounding",
    name: "Evidence", description: "Evidence — the passage that supports a claim, the proof behind an answer",
    tags: ["passage", "proof", "quote"], family: "page",
    aliases: [], keywords: ["supporting passage", "quote", "proof", "excerpt", "highlight"],
    shapes: [page(), row(7, 9, 15), rect(8, 11, 8, 4, 2), row(18, 9, 13)],
  },

  /* ── Data ─────────────────────────────────────────────────────────────────────── */

  {
    slug: "data-owner", category: "data", subcategory: "catalog",
    name: "Data owner", description: "A data owner — the steward responsible for a table or a dataset",
    tags: ["steward", "responsible", "person"], family: "figure",
    aliases: ["steward"], keywords: ["steward", "responsible", "contact", "team", "accountable"],
    shapes: [
      raw("M3 5A5 2.5 0 0 1 13 5V13A5 2.5 0 0 1 3 13Z",
        "a cylinder: an elliptical rim of 5 by 2.5, sides of 8, and the front of the base", true),
      raw("M3 5A5 2.5 0 0 0 13 5", "the far side of the top rim, which the near side hides"),
      disc(17, 12, 2), arc(17, 21, 4, 180, 360),
    ],
  },
  {
    slug: "data-tag", category: "data", subcategory: "catalog",
    name: "Data tag", description: "A data tag — a label on a column or a table that classifies what it holds",
    tags: ["label", "classify", "mark"], family: "figure",
    aliases: [], keywords: ["label", "pii tag", "classification", "annotate", "metadata"],
        // A tag with a line written on it. `release` is the same tag with only its hole, which
    // is the fitting rather than the label — a data tag is the words, not the shape.
    shapes: [
      poly([[4, 12], [10, 6], [20, 6], [20, 18], [10, 18]], true),
      disc(12, 12, 1), row(12, 15, 18),
    ],
  },
  {
    slug: "duplicate", category: "data", subcategory: "quality",
    name: "Duplicate", description: "A duplicate — the same row twice, a repeated record that should be one",
    tags: ["repeat", "copy", "same"], family: "window",
    aliases: [], keywords: ["duplicate row", "repeated", "same record", "collision"],
    shapes: [rect(2, 4, 12, 6, 3), rect(2, 14, 12, 6, 3), disc(19, 12, 2)],
  },
  {
    slug: "backfill", category: "data", subcategory: "pipeline",
    name: "Backfill", description: "Backfill — fill in what was missed by reprocessing historic data",
    tags: ["catch-up", "historic", "reprocess"], family: "cylinder",
    aliases: [], keywords: ["catch up", "reprocess", "historic", "replay", "gap"],
    shapes: [...store(), row(19, 4, 16), poly([[7, 16], [4, 19], [7, 22]])],
  },
  {
    slug: "batch-job", category: "data", subcategory: "orchestration",
    name: "Batch job", description: "A batch job — work that runs on a schedule in bulk rather than on demand",
    tags: ["scheduled", "bulk", "run"], family: "machine",
    aliases: [], keywords: ["nightly", "cron job", "bulk", "etl run", "scheduled"],
    shapes: [
      frame(8, 4, 14, 16, 3, { chamfer: 3, gap: 3 }),
      row(8, 2, 6), row(12, 2, 6), row(16, 2, 6),
      poly([[12, 9], [15, 12], [12, 15]]),
    ],
  },
];
