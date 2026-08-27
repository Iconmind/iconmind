/**
 * Batch 42 — locks in their places, filters in a row, and what a prompt is stuffed with.
 *
 * `lock` closes the family that `unlock`, `permission` and `tls` already speak: the same
 * body and shackle everywhere a lock appears. `filter-step`, `filter-result` and
 * `filter-analytics` are one funnel with a different thing under its spout.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { SMALL, check } from "../marks.ts";
import { cycle, cloud as cloudBody, machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

/** The funnel every filter icon pours through. */
const funnel = () => [poly([[3, 4], [21, 4], [14, 11], [14, 16], [10, 16], [10, 11]], true)];

export const BATCH_42: Icon[] = [
  /* ── Locks in their places ────────────────────────────────────────────────────── */

  {
    slug: "lock", category: "security", subcategory: "encryption",
    name: "Lock", description: "Closed to anyone without the key",
    tags: ["secure", "closed", "private"], family: "lock",
    aliases: [], keywords: ["locked", "secure", "closed", "private", "protected"],
    shapes: [rect(5, 10, 14, 11, 2), arc(12, 10, 4, 180, 360), disc(12, 15, 1)],
  },
  {
    slug: "lock-ui", category: "interface", subcategory: "state",
    name: "Locked control", description: "You can see it, not change it",
    tags: ["disabled", "frozen", "read-only"], family: "window",
    aliases: [], keywords: ["read only", "frozen field", "disabled", "cannot edit"],
    shapes: [rect(2, 4, 20, 16, 2), row(9, 6, 10), rect(12, 10, 7, 7, 2), arc(15.5, 10, 2, 180, 360)],
  },
  {
    slug: "permission-grant", category: "security", subcategory: "auth",
    name: "Grant permission", description: "From now on, you may",
    tags: ["allow", "give", "approve"], family: "lock",
    aliases: [], keywords: ["grant", "allow", "give access", "approve", "authorise"],
    // The shaft rides the arrowhead's centreline; it used to sit on the head's top arm,
    // which broke the arrow at the elbow.
    shapes: [rect(2, 10, 12, 10, 2), arc(8, 10, 4, 180, 360), row(15, 16, 21), poly([[18, 12], [21, 15], [18, 18]])],
  },
  {
    slug: "passphrase", category: "security", subcategory: "secret",
    name: "Passphrase", description: "Longer than a password, easier to keep",
    tags: ["words", "long", "secret"], family: "window",
    aliases: [], keywords: ["long secret", "words", "diceware", "memorable", "phrase"],
    shapes: [rect(2, 7, 20, 10, 2), row(11, 5, 9), row(11, 12, 16), row(14, 5, 13)],
  },
  {
    slug: "pii", category: "security", subcategory: "compliance",
    name: "PII", description: "Data that is somebody",
    tags: ["personal", "identifying", "sensitive"], family: "figure",
    aliases: [], keywords: ["personal data", "identifying", "name and address", "sensitive"],
    shapes: [disc(9, 8, 3), arc(9, 19, 5, 180, 360), row(8, 15, 21), row(12, 15, 19), row(16, 17, 21)],
  },

  /* ── Filters in a row ─────────────────────────────────────────────────────────── */

  {
    slug: "filter-step", category: "automation", subcategory: "condition",
    name: "Filter step", description: "Only some of it goes on",
    tags: ["narrow", "condition", "pass"], family: "figure",
    aliases: [], keywords: ["condition step", "narrow", "only matching", "pass through"],
    shapes: [...funnel(), poly([[9, 19], [12, 22], [15, 19]])],
  },
  {
    slug: "filter-result", category: "rag", subcategory: "retrieval",
    name: "Filter result", description: "What made it through",
    tags: ["kept", "matching", "output"], family: "figure",
    aliases: [], keywords: ["what remains", "kept rows", "matches", "survived the filter"],
    shapes: [...funnel(), row(20, 8, 16)],
  },
  {
    slug: "filter-analytics", category: "analytics", subcategory: "segment",
    name: "Analytics filter", description: "The slice you are looking at",
    tags: ["slice", "segment", "narrowed"], family: "figure",
    aliases: [], keywords: ["slice", "segment filter", "narrowed view", "subset"],
    shapes: [...funnel(), disc(12, 20, 2)],
  },

  /* ── What a prompt is stuffed with ────────────────────────────────────────────── */

  {
    slug: "prompt-stuffing", category: "ai", subcategory: "prompt",
    name: "Prompt stuffing", description: "Everything pushed in, in case it helps",
    tags: ["overfull", "cram", "context"], family: "window",
    aliases: [], keywords: ["cram context", "overfull prompt", "kitchen sink", "too much"],
    shapes: [rect(2, 6, 14, 14, 2), row(10, 4, 12), row(13, 4, 12), row(16, 4, 12), poly([[18, 10], [21, 13], [18, 16]])],
  },
  {
    slug: "prompt-analytics", category: "analytics", subcategory: "llm-observability",
    name: "Prompt analytics", description: "Which prompts work",
    tags: ["measure", "compare", "wins"], family: "machine",
    aliases: [], keywords: ["prompt performance", "win rate", "which works", "measure prompts"],
    shapes: [machine(), col(9, 12, 15), col(12, 9, 15), col(15, 11, 15)],
  },
  {
    slug: "perplexity", category: "ai", subcategory: "evaluation",
    name: "Perplexity", description: "How surprised the model is",
    tags: ["surprise", "uncertain", "metric"], family: "machine",
    aliases: [], keywords: ["surprise", "language model metric", "uncertainty", "ppl"],
    // A question mark: in from the west, over the top, and down to land centred over its
    // dot. The old arc stopped at 60° and the hook hung lopsided.
    shapes: [machine(), arc(12, 10.5, 2.5, 180, 90), disc(12, 16, 1)],
  },

  /* ── Where things live ────────────────────────────────────────────────────────── */

  {
    slug: "object-store", category: "cloud", subcategory: "storage",
    name: "Object store", description: "Things kept by name, not place",
    tags: ["bucket", "keyed", "flat"], family: "figure",
    aliases: ["object-storage"], keywords: ["s3", "bucket", "keyed blobs", "flat namespace"],
    shapes: [poly([[4, 8], [4, 20], [20, 20], [20, 8]]), row(4, 2, 22), disc(9, 14, 2), rect(13, 11, 4, 7, 2)],
  },
  {
    slug: "private-cloud", category: "cloud", subcategory: "compute",
    name: "Private cloud", description: "The cloud, but yours",
    tags: ["on-prem", "dedicated", "walled"], family: "cloud",
    aliases: [], keywords: ["on premise", "dedicated", "vpc", "your own cloud", "walled"],
    shapes: [cloudBody(), disc(12, 11, 2), col(12, 13, 15.5)],
  },
  {
    slug: "multi-cloud", category: "cloud", subcategory: "compute",
    name: "Multi-cloud", description: "More than one sky",
    tags: ["hybrid", "several", "providers"], family: "cloud",
    aliases: [], keywords: ["several providers", "aws and gcp", "hybrid", "portable"],
    shapes: [cloudBody(3), row(20, 6, 18)],
  },
  {
    slug: "monorepo", category: "devtools", subcategory: "version-control",
    name: "Monorepo", description: "Every project, one root",
    tags: ["single", "workspace", "packages"], family: "figure",
    aliases: [], keywords: ["one repo", "workspaces", "packages together", "single root"],
    shapes: [rect(8, 2, 8, 7, 2), row(12, 6, 18), col(6, 12, 15), col(18, 12, 15), rect(2, 15, 8, 7, 2), rect(14, 15, 8, 7, 2)],
  },

  /* ── Steps in a longer walk ───────────────────────────────────────────────────── */

  {
    slug: "map-step", category: "automation", subcategory: "workflow",
    name: "Map step", description: "The same thing done to each",
    tags: ["each", "fan-out", "apply"], family: "figure",
    aliases: [], keywords: ["for each", "map over", "apply to all", "fan out step"],
    shapes: [rect(2, 8, 7, 8, 2), row(12, 9.5, 12.5), rect(13, 2.5, 9, 4, 2), rect(13, 10, 9, 4, 2), rect(13, 17.5, 9, 4, 2)],
  },
  {
    slug: "loop-step", category: "automation", subcategory: "workflow",
    name: "Loop step", description: "Round again until it is done",
    tags: ["repeat", "iterate", "until"], family: "orbit",
    aliases: [], keywords: ["iterate", "repeat step", "until done", "while"],
    shapes: [...cycle(), poly([[9, 15], [12, 15], [12, 11], [15, 11]])],
  },
  {
    slug: "human-loop", category: "automation", subcategory: "human-loop",
    name: "Human in the loop", description: "A person inside the cycle",
    tags: ["review", "person", "gate"], family: "orbit",
    aliases: [], keywords: ["human review", "person in cycle", "approval loop", "oversight"],
    shapes: [
      arc(12, 12, 8, 300, 240), poly([[5, 4], [8, 4], [8, 7]]),
      disc(12, 10, 2), arc(12, 17, 3.5, 180, 360),
    ],
  },
  {
    slug: "end-to-end", category: "automation", subcategory: "workflow",
    name: "End to end", description: "From the first thing to the last",
    tags: ["whole", "through", "complete"], family: "figure",
    aliases: [], keywords: ["whole journey", "start to finish", "full path", "through"],
    // The whole journey, corner to corner: out of one node, down the diagonal, arrowhead
    // into the other. Flat on the equator it read as a stripe, not a journey.
    shapes: [
      disc(5, 5, 2), poly([[8, 8], [12, 12]]),
      poly([[15, 12.5], [15, 15], [12.5, 15]]), disc(19, 19, 2),
    ],
  },

  /* ── Keeping the record straight ──────────────────────────────────────────────── */

  {
    slug: "consent-record", category: "security", subcategory: "compliance",
    name: "Consent record", description: "Who said yes, and when",
    tags: ["log", "proof", "signed"], family: "page",
    aliases: [], keywords: ["consent log", "who agreed", "when", "proof of consent"],
    shapes: [page(), ...check(SMALL, 10), row(15, 8, 16), row(18, 8, 13)],
  },
  {
    slug: "provenance", category: "data", subcategory: "catalog",
    name: "Provenance", description: "The whole story of where it came from",
    tags: ["origin", "history", "chain"], family: "figure",
    aliases: [], keywords: ["origin", "chain of custody", "came from", "history of data"],
    shapes: [disc(5, 19, 2), poly([[7, 17], [11, 13]]), disc(13, 11, 2), poly([[15, 9], [19, 5]]), disc(19, 5, 1)],
  },
  {
    slug: "content-freshness", category: "rag", subcategory: "knowledge",
    name: "Content freshness", description: "Is the knowledge still true?",
    tags: ["current", "updated", "stale"], family: "page",
    aliases: [], keywords: ["stale knowledge", "last crawled", "current", "reindex"],
    shapes: [page(), disc(12, 12, 4), col(12, 9.5, 12), row(12, 12, 14.5)],
  },
  {
    slug: "record", category: "interface", subcategory: "media",
    name: "Record", description: "Taking it down as it happens",
    tags: ["capture", "rec", "live"], family: "orbit",
    aliases: [], keywords: ["rec", "capture", "recording", "live", "take down"],
    shapes: [disc(12, 12, 8), disc(12, 12, 3)],
  },
];
