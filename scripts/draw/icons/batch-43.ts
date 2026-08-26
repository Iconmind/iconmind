/**
 * Batch 43 — workflow verbs, tool outcomes, and secrets tended over time.
 *
 * `workflow-run/-pause/-stop/-fail/-add` are one flow body with the mark system in its
 * second node — the largest single family this set has drawn in one sitting, and the reason
 * the mark system exists. `tool-error/-result/-permission` do the same on the plug.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { SMALL, alert, check, off, working } from "../marks.ts";
import { cycle, machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

/**
 * One node and the line onward: the body every workflow verb shares. The verb itself IS the
 * second node — a box small enough to hold a mark cannot exist (a corner-radius-2 square
 * needs a side of 6.5, and no node interior offers it), so the mark stands full-size where
 * the next node would be.
 */
const flow = () => [rect(2, 2, 8, 8, 2), poly([[6, 10], [6, 16], [10, 16]])];

/** The two-pronged plug the agent tool family shares (from `tool-calling`). */
const plug = () => [rect(6, 11, 12, 9, 2), col(9, 4, 11), col(15, 4, 11)];

export const BATCH_43: Icon[] = [
  /* ── Workflow verbs ───────────────────────────────────────────────────────────── */

  {
    slug: "workflow-run", category: "automation", subcategory: "workflow",
    name: "Workflow run", description: "The flow is going",
    tags: ["running", "started", "active"], family: "figure",
    aliases: [], keywords: ["running flow", "started", "in progress", "executing"],
    shapes: [...flow(), poly([[13, 10], [18, 15], [13, 20]], true)],
  },
  {
    slug: "workflow-pause", category: "automation", subcategory: "workflow",
    name: "Workflow pause", description: "Held where it is",
    tags: ["held", "waiting", "suspend"], family: "figure",
    aliases: [], keywords: ["paused flow", "held", "suspended", "waiting"],
    shapes: [...flow(), col(14, 10, 20), col(18, 10, 20)],
  },
  {
    slug: "workflow-stop", category: "automation", subcategory: "workflow",
    name: "Workflow stop", description: "Ended before its end",
    tags: ["halted", "cancelled", "killed"], family: "figure",
    aliases: [], keywords: ["stopped flow", "cancelled", "halted", "killed"],
    shapes: [...flow(), rect(13, 11, 8, 8, 2)],
  },
  {
    slug: "workflow-fail", category: "automation", subcategory: "workflow",
    name: "Workflow fail", description: "It broke partway",
    tags: ["error", "broken", "red"], family: "figure",
    aliases: [], keywords: ["failed flow", "error in step", "broken", "went red"],
    shapes: [...flow(), poly([[13, 12], [20, 19]]), poly([[20, 12], [13, 19]])],
  },
  {
    slug: "workflow-add", category: "automation", subcategory: "workflow",
    name: "New workflow", description: "Start a flow from nothing",
    tags: ["create", "new", "begin"], family: "figure",
    aliases: [], keywords: ["new flow", "create workflow", "begin", "from scratch"],
    shapes: [...flow(), col(16, 11, 19), row(15, 12, 20)],
  },
  {
    slug: "workflow-template", category: "automation", subcategory: "workflow",
    name: "Workflow template", description: "A flow with the blanks still in it",
    tags: ["starter", "pattern", "blank"], family: "figure",
    aliases: [], keywords: ["starter flow", "pattern", "boilerplate", "fill in"],
    shapes: [rect(2, 2, 8, 8, 2), poly([[6, 10], [6, 18], [10, 18]]), row(18, 13, 16), row(18, 19, 22)],
  },

  /* ── Tool outcomes ────────────────────────────────────────────────────────────── */

  {
    slug: "tool-result", category: "agents", subcategory: "tool-use",
    name: "Tool result", description: "What the tool handed back",
    tags: ["output", "returned", "answer"], family: "figure",
    aliases: [], keywords: ["tool output", "returned", "came back", "answer"],
    shapes: [...plug(), ...check(SMALL, 15.5)],
  },
  {
    slug: "tool-error", category: "agents", subcategory: "tool-use",
    name: "Tool error", description: "The tool broke instead",
    tags: ["failed", "broken", "exception"], family: "figure",
    aliases: [], keywords: ["tool failed", "exception", "broke", "bad call"],
    shapes: [...plug(), ...off(SMALL, 15.5)],
  },
  {
    slug: "tool-permission", category: "agents", subcategory: "tool-use",
    name: "Tool permission", description: "May it use this one?",
    tags: ["allow", "gate", "consent"], family: "figure",
    aliases: [], keywords: ["allow tool", "gated", "requires approval", "consent"],
    shapes: [...plug(), ...alert(SMALL, 15.5)],
  },

  /* ── Secrets tended over time ─────────────────────────────────────────────────── */

  {
    slug: "secret-vault", category: "security", subcategory: "secret",
    name: "Secret vault", description: "Where the keys themselves are kept",
    tags: ["safe", "store", "sealed"], family: "window",
    aliases: [], keywords: ["vault", "key store", "sealed", "hsm", "secrets manager"],
    shapes: [rect(2, 3, 20, 18, 2), disc(12, 9, 2), col(12, 11, 15)],
  },
  {
    slug: "secret-rotate", category: "security", subcategory: "secret",
    name: "Rotate secret", description: "A new one before the old one leaks",
    tags: ["renew", "cycle", "replace"], family: "figure",
    aliases: [], keywords: ["rotate key", "renew secret", "replace credential", "cycle"],
    shapes: [...cycle(), disc(12, 10, 2), col(12, 12, 15)],
  },
  {
    slug: "secret-config", category: "security", subcategory: "secret",
    name: "Secret config", description: "Settings too sensitive for the repo",
    tags: ["env", "hidden", "values"], family: "page",
    aliases: [], keywords: ["env file", "hidden values", "not committed", "sensitive config"],
    shapes: [page(), row(9, 8, 12), disc(15, 9, 1), row(13, 8, 12), disc(15, 13, 1), row(17, 8, 12)],
  },
  {
    slug: "zero-trust", category: "security", subcategory: "policy",
    name: "Zero trust", description: "Nobody is inside by default",
    tags: ["verify", "always", "no-perimeter"], family: "shield",
    aliases: [], keywords: ["never trust", "always verify", "no perimeter", "per request"],
    shapes: [rect(2, 2, 20, 20, 2), rect(7, 7, 10, 10, 2), disc(12, 12, 1)],
  },

  /* ── Vectors put to work ──────────────────────────────────────────────────────── */

  {
    slug: "vector-query", category: "rag", subcategory: "vector",
    name: "Vector query", description: "Asking the index what is nearby",
    tags: ["nearest", "search", "knn"], family: "figure",
    aliases: [], keywords: ["nearest neighbour", "knn", "similarity query", "ask the index"],
    shapes: [disc(9, 9, 5), poly([[13, 13], [19, 19]]), disc(7, 19, 1), disc(19, 7, 1)],
  },
  {
    slug: "vector-upsert", category: "rag", subcategory: "vector",
    name: "Vector upsert", description: "New vectors into the index",
    tags: ["insert", "write", "add"], family: "figure",
    aliases: [], keywords: ["upsert vectors", "write to index", "add embeddings"],
    shapes: [disc(6, 6, 1), disc(11, 9, 1), disc(6, 13, 1), rect(2, 17, 20, 5, 2.5), col(18, 4, 10), poly([[15, 7], [18, 10], [21, 7]])],
  },
  {
    slug: "similarity-search", category: "rag", subcategory: "retrieval",
    name: "Similarity search", description: "Find what is most like this",
    tags: ["nearest", "alike", "close"], family: "figure",
    aliases: [], keywords: ["most similar", "nearest", "alike", "closest match"],
    shapes: [disc(6, 10, 2), disc(18, 10, 2), disc(12, 16, 2), poly([[7.5, 11.5], [10.5, 14.5]]), poly([[16.5, 11.5], [13.5, 14.5]])],
  },
  {
    slug: "sparse-search", category: "rag", subcategory: "retrieval",
    name: "Sparse search", description: "Match the words, not the meaning",
    tags: ["keyword", "lexical", "exact"], family: "figure",
    aliases: [], keywords: ["keyword search", "lexical", "bm25 family", "exact terms"],
    shapes: [row(6, 3, 9), row(6, 15, 21), row(11, 9, 15), row(16, 3, 9), row(16, 15, 21)],
  },

  /* ── The machine seen and heard ───────────────────────────────────────────────── */

  {
    slug: "vision-model", category: "ai", subcategory: "multimodal",
    name: "Vision model", description: "A model that looks",
    tags: ["image", "see", "multimodal"], family: "machine",
    aliases: ["vision"], keywords: ["image understanding", "looks at pictures", "multimodal"],
    shapes: [machine(), poly([[7, 12], [10, 9], [14, 9], [17, 12]]), poly([[7, 12], [10, 15], [14, 15], [17, 12]]), disc(12, 12, 1)],
  },
  {
    slug: "video-gen", category: "ai", subcategory: "multimodal",
    name: "Video generation", description: "Moving pictures that never happened",
    tags: ["motion", "make", "clip"], family: "window",
    aliases: [], keywords: ["generate video", "text to video", "motion", "clip"],
    shapes: [rect(2, 4, 20, 16, 2), poly([[10, 9], [13, 12], [10, 15]], true), col(18, 6, 9)],
  },
  {
    slug: "speech", category: "ai", subcategory: "multimodal",
    name: "Speech", description: "Sound with words in it",
    tags: ["voice", "audio", "spoken"], family: "figure",
    aliases: [], keywords: ["voice", "spoken", "waveform", "talk"],
    shapes: [col(4, 9, 15), col(8, 5, 19), col(12, 8, 16), col(16, 3, 21), col(20, 10, 14)],
  },

  /* ── Sessions, sequences, state ───────────────────────────────────────────────── */

  {
    slug: "session", category: "security", subcategory: "auth",
    name: "Session", description: "Signed in, for now",
    tags: ["active", "logged-in", "window"], family: "figure",
    aliases: [], keywords: ["logged in", "active session", "expires", "current user"],
    shapes: [disc(9, 8, 3), arc(9, 19, 5, 180, 360), disc(17, 15, 3), poly([[19, 17], [22, 20]])],
  },
  {
    slug: "sequence", category: "automation", subcategory: "workflow",
    name: "Sequence", description: "This, then that, then the next",
    tags: ["order", "series", "steps"], family: "figure",
    aliases: [], keywords: ["in order", "one after another", "series", "steps"],
    shapes: [disc(4, 12, 2), row(12, 7, 10), disc(12, 12, 2), row(12, 15, 18), disc(20, 12, 2)],
  },
  {
    slug: "state", category: "agents", subcategory: "memory",
    name: "State", description: "What is true right now",
    tags: ["current", "snapshot", "now"], family: "window",
    aliases: [], keywords: ["current state", "snapshot", "now", "in memory"],
    shapes: [rect(2, 5, 20, 14, 2), disc(8, 12, 2), row(13, 13, 18), row(10, 13, 18)],
  },
  {
    slug: "working-memory", category: "agents", subcategory: "memory",
    name: "Working memory", description: "What it is holding while it thinks",
    tags: ["short-term", "active", "holding"], family: "window",
    aliases: ["short-term"], keywords: ["short term", "scratch state", "held in mind", "active"],
    // Three even columns in a window is `sdk`, byte for byte. Working memory is *busy* —
    // the working() mark, uneven on purpose.
    shapes: [frame(2, 5, 20, 14, 3, { gap: 6 }), ...working()],
  },
];
