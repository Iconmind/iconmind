/**
 * Batch 25 — measurement, and things that are two of something.
 *
 * `accuracy`, `confusion-matrix`, `f1` and `eval-suite` are all ways of saying how good the
 * answers are, and none of them has a picture of its own. What they have instead is a
 * container each has to share with a mark: a target, a grid, a ratio, a list of ticks. The
 * work here is picking which container, not inventing one.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { core, machine, machinePage, page, panel, ring, shield } from "../bodies.ts";
import { SMALL, check, off } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_25: Icon[] = [
  /* ── How good is it ───────────────────────────────────────────────────────────── */

  {
    slug: "accuracy", category: "ai", subcategory: "evaluation",
    name: "Accuracy", description: "How often it gets it right",
    tags: ["correct", "hit", "target"], family: "orbit",
    aliases: [], keywords: ["precision", "recall", "score", "hit rate", "correct"],
    // `goal`'s rings with a mark in the middle instead of a core. The target says what is
    // being aimed at; the tick says it was hit.
    shapes: [ring(), arc(12, 12, 5, 295, 245), ...check(SMALL)],
  },
  {
    slug: "confusion-matrix", category: "ai", subcategory: "evaluation",
    name: "Confusion matrix", description: "What it got right and what it mixed up",
    tags: ["grid", "errors", "classes"], family: "window",
    aliases: [], keywords: ["true positive", "false negative", "classes", "error analysis"],
    // Four cells with the diagonal pair marked. Drawn as an actual diagonal the line crosses
    // the two dividers and a corner — three crossings where the set allows two — and reads
    // as slashes through cells rather than as the cells that matter.
    shapes: [
      rect(3, 3, 18, 18, 2), row(12, 3, 21), col(12, 3, 21),
      disc(7, 7, 2), disc(17, 17, 2),
    ],
  },
  {
    slug: "eval-suite", category: "ai", subcategory: "evaluation",
    name: "Eval suite", description: "A whole set of checks, run together",
    tags: ["tests", "battery", "harness"], family: "page",
    aliases: [], keywords: ["benchmark suite", "test harness", "battery", "regression"],
    shapes: [
      page(),
      poly([[8, 9], [10, 11], [14, 7]]), poly([[8, 15], [10, 17], [14, 13]]),
    ],
  },
  {
    slug: "degradation", category: "ai", subcategory: "evaluation",
    name: "Degradation", description: "It is getting worse",
    tags: ["decline", "worse", "decay"], family: "axes",
    aliases: ["regression"], keywords: ["decline", "worse over time", "decay", "erosion"],
    // Falls and keeps falling. `loss-curve` falls and then flattens, which is training
    // working; this one has no floor, which is the difference.
    shapes: [
      col(4, 4, 20), row(20, 4, 20),
      poly([[6, 6], [11, 11], [15, 11], [20, 16]]),
    ],
  },
  {
    slug: "base-model", category: "ai", subcategory: "model",
    name: "Base model", description: "Before anybody tuned it",
    tags: ["foundation", "raw", "pretrained"], family: "machine",
    aliases: ["foundation-model"], keywords: ["foundation", "pretrained", "checkpoint", "vanilla"],
    // `model`'s machine with nothing in it. The diamond is what a model has been given;
    // a base model is the body before that.
    shapes: [machine()],
  },
  {
    slug: "embedding-model", category: "ai", subcategory: "embedding",
    name: "Embedding model", description: "The model that turns text into vectors",
    tags: ["encoder", "vectors", "index"], family: "machine",
    aliases: [], keywords: ["encoder", "sentence transformer", "ada", "vectoriser"],
    // The machine holding `lattice`'s open diamond rather than `model`'s closed one. Open
    // means the structure it makes is the point, not the machine that makes it.
    shapes: [machine(), poly([[14, 9], [17, 12], [12, 17], [7, 12], [10, 9]])],
  },
  {
    slug: "batch-inference", category: "ai", subcategory: "inference",
    name: "Batch inference", description: "Many inputs through in one go",
    tags: ["bulk", "offline", "many"], family: "machine",
    aliases: ["batch"], keywords: ["bulk", "offline", "throughput", "queue", "job"],
    shapes: [
      frame(8, 4, 14, 16, 3, { chamfer: 3, gap: 3 }),
      row(8, 2, 6), row(12, 2, 6), row(16, 2, 6),
    ],
  },
  {
    slug: "agent-idle", category: "agents", subcategory: "lifecycle",
    name: "Agent idle", description: "Ready, with nothing to do",
    tags: ["waiting", "ready", "quiet"], family: "orbit",
    aliases: [], keywords: ["waiting", "available", "standby", "no work", "quiet"],
    // A small core where `agent`'s is large. The body is the same body and the difference
    // is how much of it is doing something.
    shapes: [ring(), core(1)],
  },
  {
    slug: "agent-hierarchy", category: "agents", subcategory: "multi-agent",
    name: "Agent hierarchy", description: "Who reports to whom",
    tags: ["tree", "levels", "org"], family: "chain",
    aliases: [], keywords: ["org chart", "tree", "levels", "reporting", "supervisor tree"],
    shapes: [
      arc(12, 5, 3, 295, 245), col(12, 8, 12), row(12, 6, 18),
      arc(6, 18, 3, 295, 245), arc(18, 18, 3, 295, 245),
      col(6, 12, 15), col(18, 12, 15),
    ],
    accepted: {
      "lint/element-budget":
        "a hierarchy needs three nodes and the lines between them; with fewer it is a pair",
    },
  },
  {
    slug: "consensus", category: "agents", subcategory: "communication",
    name: "Consensus", description: "They all agree",
    tags: ["agree", "vote", "quorum"], family: "orbit",
    aliases: ["quorum"], keywords: ["vote", "quorum", "majority", "agreement", "raft"],
    shapes: [
      disc(12, 4, 2), disc(4, 18, 2), disc(20, 18, 2), disc(12, 13, 3),
    ],
  },
  {
    slug: "critique", category: "agents", subcategory: "reflection",
    name: "Critique", description: "Saying what is wrong with it",
    tags: ["review", "feedback", "judge"], family: "window",
    aliases: [], keywords: ["feedback", "review", "criticism", "self-critique", "judge"],
    // A message with a line struck out in it. `dead-letter` is the same bubble with a cross,
    // and a cross means the message failed rather than that somebody disagreed with it —
    // the two came out byte-identical until this one drew what it actually meant.
    shapes: [
      frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]]),
      row(8, 7, 17), row(13, 7, 14), poly([[6, 16], [17, 5]]),
    ],
  },
  {
    slug: "deadline", category: "agents", subcategory: "planning",
    name: "Deadline", description: "The time it has to be done by",
    tags: ["due", "cutoff", "limit"], family: "orbit",
    aliases: ["due-date"], keywords: ["due", "cutoff", "sla", "expiry", "overdue"],
    // `clock` against a wall. The dial says when and the wall says there is nothing past it,
    // which is the half of a deadline a clock alone cannot carry.
    shapes: [arc(10, 12, 7, 295, 245), col(10, 7, 12), row(12, 10, 15), col(21, 3, 21)],
  },

  /* ── Retrieval ────────────────────────────────────────────────────────────────── */

  {
    slug: "citation", category: "rag", subcategory: "grounding",
    name: "Citation", description: "Where that came from",
    tags: ["source", "reference", "quote"], family: "page",
    aliases: ["reference"], keywords: ["footnote", "source", "attribution", "quote", "link"],
    // A page with a mark raised above the line, which is where a citation goes in print.
    // On the line it would be a bullet; above it, it is a reference.
    shapes: [page(), col(10, 8, 11), col(14, 8, 11), row(15, 8, 16)],
  },
  {
    slug: "corpus", category: "rag", subcategory: "knowledge",
    name: "Corpus", description: "Everything the system has read",
    tags: ["collection", "documents", "body"], family: "page",
    aliases: ["collection"], keywords: ["document set", "library", "training data", "archive"],
    shapes: [
      poly([[13, 2], [6, 2], [6, 16], [16, 16], [16, 5]]),
      poly([[16, 8], [9, 8], [9, 22], [19, 22], [19, 11]]),
    ],
  },
  {
    slug: "cross-encoder", category: "rag", subcategory: "ranking",
    name: "Cross-encoder", description: "Judges the pair together, not apart",
    tags: ["pairwise", "rerank", "score"], family: "funnel",
    aliases: [], keywords: ["pairwise", "rerank", "relevance model", "joint scoring"],
    shapes: [
      row(8, 2, 8), row(16, 2, 8), poly([[8, 8], [12, 12]]), poly([[8, 16], [12, 12]]),
      row(12, 12, 22),
    ],
  },
  {
    slug: "document-store", category: "rag", subcategory: "knowledge",
    name: "Document store", description: "Where the documents themselves live",
    tags: ["repository", "files", "store"], family: "machine",
    aliases: [], keywords: ["blob store", "originals", "source documents", "repository"],
    shapes: [machine(), poly([[13, 8], [9, 8], [9, 16], [15, 16], [15, 10]])],
  },

  /* ── Data ─────────────────────────────────────────────────────────────────────── */

  {
    slug: "backpressure", category: "data", subcategory: "streaming",
    name: "Backpressure", description: "The far end saying slow down",
    tags: ["throttle", "push-back", "full"], family: "arrow",
    aliases: [], keywords: ["flow control", "push back", "buffer full", "slow down", "lag"],
    // Arrows going one way and one coming back. The single reverse arrow against three is
    // the whole idea: the flow is still forward, and something is pushing against it.
    shapes: [
      row(6, 3, 15), row(12, 3, 15), row(18, 3, 15),
      col(19, 4, 20), poly([[16, 7], [19, 4], [22, 7]]),
    ],
  },
];
