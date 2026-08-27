/**
 * Batch 40 — builds that pass and fail, work at the edge, and states an agent can be in.
 *
 * `build-pass` and `build-fail` are the mark system on one shared body, like `pipeline-run`
 * and `-fail` before them. The three `edge-*` icons share the far-node grammar: the big thing
 * on the left, the small one out at the rim, and what sits at the rim varies.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { SMALL, check, off, working } from "../marks.ts";
import { machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

/** The brick every build icon shares. */
const brick = () => [rect(4, 4, 16, 12, 2)];

export const BATCH_40: Icon[] = [
  /* ── Builds ───────────────────────────────────────────────────────────────────── */

  {
    slug: "build-pass", category: "devops", subcategory: "ci-cd",
    name: "Build pass", description: "It compiled, and the tests agreed",
    tags: ["green", "success", "ok"], family: "window",
    aliases: [], keywords: ["green build", "passing", "ci success", "all checks"],
    shapes: [...brick(), ...check(SMALL, 10), row(19, 7, 17)],
  },
  {
    slug: "build-fail", category: "devops", subcategory: "ci-cd",
    name: "Build fail", description: "It did not",
    tags: ["red", "broken", "error"], family: "window",
    aliases: [], keywords: ["red build", "broken", "ci failure", "fix the build"],
    shapes: [...brick(), ...off(SMALL, 10), row(19, 7, 17)],
  },
  {
    slug: "cold-start", category: "cloud", subcategory: "serverless",
    name: "Cold start", description: "The first call pays for waking it",
    tags: ["latency", "wake", "first"], family: "machine",
    aliases: ["cold-boot"], keywords: ["lambda cold start", "wake up", "first request", "warm up"],
    // A lightning bolt needs angles this set does not have. The set's word for a machine
    // being reached is the plug — and a cold start is the plug not yet in: the prongs hang
    // above the socket with daylight between them.
    shapes: [rect(6, 13, 12, 8, 2), col(9, 3, 8), col(15, 3, 8)],
  },
  {
    slug: "feature-flag", category: "devops", subcategory: "release",
    name: "Feature flag", description: "On for some, off for the rest",
    tags: ["toggle", "gradual", "switch"], family: "figure",
    aliases: [], keywords: ["toggle", "kill switch", "gradual release", "a/b", "on off"],
    shapes: [rect(2, 2, 20, 8, 4), disc(18, 6, 2), rect(2, 14, 20, 8, 4), disc(6, 18, 2)],
  },

  /* ── Work at the edge ─────────────────────────────────────────────────────────── */

  {
    slug: "edge-node", category: "cloud", subcategory: "edge",
    name: "Edge node", description: "A machine out where the users are",
    tags: ["near", "pop", "local"], family: "figure",
    aliases: [], keywords: ["point of presence", "near users", "regional", "close", "pop"],
    shapes: [rect(2, 4, 9, 16, 2), row(12, 11, 16), disc(19, 12, 2)],
  },
  {
    slug: "edge-cache", category: "cloud", subcategory: "edge",
    name: "Edge cache", description: "The copy kept out there",
    tags: ["cdn", "copy", "near"], family: "figure",
    aliases: [], keywords: ["cdn cache", "cached at edge", "regional copy", "ttl", "purge"],
    shapes: [rect(2, 4, 9, 16, 2), row(12, 11, 15), rect(15, 8, 7, 8, 2), row(12, 17, 20)],
  },
  {
    slug: "edge-function", category: "cloud", subcategory: "edge",
    name: "Edge function", description: "Code that runs out there",
    tags: ["worker", "compute", "near"], family: "figure",
    aliases: [], keywords: ["edge worker", "cloudflare worker", "run near user", "v8 isolate"],
    shapes: [
      rect(2, 4, 9, 16, 2), row(12, 11, 15),
      poly([[18, 8], [16, 10], [16, 14], [18, 16]]), poly([[20, 8], [22, 10], [22, 14], [20, 16]]),
    ],
  },

  /* ── States an agent can be in ────────────────────────────────────────────────── */

  {
    slug: "agent-working", category: "agents", subcategory: "lifecycle",
    name: "Agent working", description: "Busy on it now",
    tags: ["busy", "active", "running"], family: "orbit",
    aliases: [], keywords: ["busy", "in progress", "thinking", "active", "running"],
    shapes: [disc(12, 12, 8), ...working()],
  },
  {
    slug: "agent-done", category: "agents", subcategory: "lifecycle",
    name: "Agent done", description: "Finished, and it went well",
    tags: ["complete", "finished", "ok"], family: "orbit",
    aliases: [], keywords: ["complete", "finished", "task done", "success", "wrapped up"],
    shapes: [rect(3, 3, 18, 18, 2), ...check()],
  },
  {
    slug: "handoff", category: "agents", subcategory: "communication",
    name: "Handoff", description: "Yours now",
    tags: ["transfer", "pass", "over-to"], family: "figure",
    aliases: [], keywords: ["pass to", "transfer", "escalate", "over to you", "baton"],
    shapes: [
      disc(6, 8, 3), disc(18, 16, 3),
      row(8, 11, 18), poly([[15, 5], [18, 8], [15, 11]]),
    ],
  },
  {
    slug: "delegate", category: "agents", subcategory: "multi-agent",
    name: "Delegate", description: "Handed down, not over",
    tags: ["assign", "down", "give"], family: "figure",
    aliases: ["assign"], keywords: ["assign", "give work", "farm out", "to a subagent"],
    shapes: [
      disc(5.5, 5.5, 3), poly([[9.5, 9.5], [12, 12]]),
      poly([[14.5, 11.5], [14.5, 14.5], [11.5, 14.5]]), disc(19, 19, 2),
    ],
  },

  /* ── Data kept honest ─────────────────────────────────────────────────────────── */

  {
    slug: "data-validation", category: "data", subcategory: "quality",
    name: "Data validation", description: "Checked against the shape it must have",
    tags: ["valid", "schema", "checked"], family: "figure",
    aliases: ["validate-data"], keywords: ["schema check", "valid rows", "constraint", "type check", "clean"],
    shapes: [rect(2, 3, 20, 7, 2), rect(2, 13, 20, 7, 2), poly([[9, 16], [11, 18], [15, 14]]), row(6.5, 5, 19)],
  },
  {
    slug: "deduplicate", category: "data", subcategory: "quality",
    name: "Deduplicate", description: "Two of the same become one",
    tags: ["unique", "merge", "distinct"], family: "figure",
    aliases: ["dedupe-data"], keywords: ["distinct", "unique rows", "remove copies", "merge same"],
    shapes: [rect(2, 4, 11, 10, 2), rect(11, 10, 11, 10, 2)],
  },
  {
    slug: "enrich", category: "data", subcategory: "transform",
    name: "Enrich", description: "The same rows, with more on them",
    tags: ["augment", "join-in", "add"], family: "figure",
    aliases: ["augment"], keywords: ["add columns", "augment", "lookup", "joined in", "richer"],
    shapes: [rect(2, 4, 13, 16, 2), row(9, 4, 13), row(14, 4, 13), col(19, 8, 12), row(10, 17, 21), row(16, 17, 21)],
  },
  {
    slug: "index-data", category: "data", subcategory: "storage",
    name: "Index", description: "The fast way to find a row",
    tags: ["lookup", "btree", "fast"], family: "figure",
    aliases: [], keywords: ["database index", "btree", "lookup", "fast find", "key"],
    shapes: [rect(2, 4, 14, 16, 2), row(9, 4, 16), row(14, 4, 16), poly([[19, 6], [19, 18]]), poly([[17, 16], [19, 18], [21, 16]])],
  },

  /* ── Watching the model behave ────────────────────────────────────────────────── */

  {
    slug: "hallucination", category: "ai", subcategory: "safety",
    name: "Hallucination", description: "Said with confidence, true of nothing",
    tags: ["false", "invented", "confab"], family: "figure",
    aliases: [], keywords: ["made up", "confabulation", "false claim", "ungrounded", "invented"],
    // A speech bubble whose anchor points at nothing: the tail is separated from the body.
    // What was said floats free of any ground.
    shapes: [rect(2, 3, 20, 12, 2), row(9, 6, 14), poly([[6, 18], [9, 21]]), poly([[9, 18], [6, 21]])],
  },
  {
    slug: "bias-check", category: "ai", subcategory: "safety",
    name: "Bias check", description: "Does it treat like cases alike?",
    tags: ["fairness", "audit", "even"], family: "figure",
    aliases: ["fairness"], keywords: ["fairness", "disparate impact", "audit", "equal treatment"],
    // A balance drawn without pans is a clothes hanger. "Treats like cases alike" is an
    // equals sign, and the check is the audit that confirmed it.
    shapes: [row(8, 4, 14), row(13, 4, 14), poly([[14, 16], [17, 19], [22, 14]])],
  },
  {
    slug: "llm-trace", category: "analytics", subcategory: "llm-observability",
    name: "LLM trace", description: "Every step the call took, laid out",
    tags: ["spans", "waterfall", "inspect"], family: "figure",
    aliases: ["llm-observability"], keywords: ["trace view", "spans", "latency breakdown", "langsmith", "inspect"],
    shapes: [col(4, 3, 21), row(7, 7, 14), row(12, 10, 18), row(17, 13, 21)],
  },
  {
    slug: "golden-set", category: "ai", subcategory: "evaluation",
    name: "Golden set", description: "The answers you trust enough to grade with",
    tags: ["reference", "ground-truth", "eval"], family: "window",
    aliases: ["ground-truth"], keywords: ["ground truth", "reference answers", "eval set", "labelled"],
    shapes: [rect(2, 4, 20, 16, 2), row(9, 6, 14), poly([[16, 8], [18, 10], [21, 7]]), row(14, 6, 14), poly([[16, 13], [18, 15], [21, 12]])],
  },

  /* ── Odd jobs the interface needs ─────────────────────────────────────────────── */

  {
    slug: "eyedropper", category: "interface", subcategory: "media",
    name: "Eyedropper", description: "Pick the colour off the page",
    tags: ["pick", "sample", "colour"], family: "figure",
    aliases: ["color-picker"], keywords: ["colour picker", "sample", "pipette", "pick from image"],
    shapes: [disc(16, 7, 3), poly([[14, 9], [7, 16]]), disc(4.5, 18.5, 1)],
  },
  {
    slug: "grid-view", category: "interface", subcategory: "layout",
    name: "Grid view", description: "Everything as tiles",
    tags: ["tiles", "cards", "gallery"], family: "window",
    aliases: [], keywords: ["tiles", "cards", "gallery view", "thumbnails", "masonry"],
    shapes: [rect(2, 2, 8, 8, 2), rect(14, 2, 8, 8, 2), rect(2, 14, 8, 8, 2), rect(14, 14, 8, 8, 2), disc(12, 12, 1)],
  },
  {
    slug: "list-view", category: "interface", subcategory: "layout",
    name: "List view", description: "Everything as rows",
    tags: ["rows", "table", "lines"], family: "window",
    aliases: [], keywords: ["rows", "table view", "compact", "lines", "details"],
    shapes: [rect(2, 2, 20, 20, 2), row(7.5, 5, 19), row(12, 5, 19), row(16.5, 5, 19)],
  },
];
