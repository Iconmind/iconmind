/**
 * Batch 12 — the figure gains a family, and a few concepts that are pure geometry.
 *
 * `user` has no hollow: a head and a pair of shoulders leave nothing in the middle for a
 * mark to sit in. So its family puts the mark beside the figure instead, which is the one
 * place in this set where a badge is right — `human-approval` was already drawn that way in
 * batch 04, and `user-add` and `user-off` follow it rather than inventing a second rule.
 *
 * The badge sits at the figure's right, level with its shoulder, at the size the marks are
 * drawn at everywhere else. What made the old set's badges wrong was that they shrank the
 * body to make room; here the body is untouched and the badge takes the space the figure
 * does not use.
 */
import { arc, col, disc, poly, row } from "../forms.ts";
import { bookmark, core, shield } from "../bodies.ts";
import { SMALL, check, off } from "../marks.ts";
import type { Icon } from "../build.ts";

/** The head and shoulders from `user`, unaltered, so the family cannot drift from its base. */
const figure = () => [disc(9, 8, 3), arc(9, 21, 6, 180, 360)];

export const BATCH_12: Icon[] = [
  /* ── The figure's family ──────────────────────────────────────────────────────── */

  {
    slug: "user-add", category: "interface", subcategory: "identity",
    name: "User add", description: "Invite somebody",
    tags: ["invite", "new", "member"], family: "figure",
    aliases: ["invite"], keywords: ["add member", "invite", "signup", "new account"],
    shapes: [...figure(), col(18, 9, 15), row(12, 15, 21)],
  },
  {
    slug: "user-off", category: "interface", subcategory: "identity",
    name: "User off", description: "This account is disabled",
    tags: ["disabled", "banned", "removed"], family: "figure",
    aliases: [], keywords: ["deactivate", "banned", "suspended", "remove member"],
    shapes: [...figure(), poly([[15, 9], [21, 15]]), poly([[21, 9], [15, 15]])],
  },

  {
    slug: "bookmark-check", category: "interface", subcategory: "action",
    name: "Bookmark check", description: "Already saved",
    tags: ["saved", "kept", "done"], family: "ribbon",
    aliases: [], keywords: ["saved", "in your list", "collected", "already added"],
    shapes: [bookmark(), ...check(SMALL, 10)],
  },
  {
    slug: "bookmark-off", category: "interface", subcategory: "action",
    name: "Bookmark off", description: "Take it out of the list",
    tags: ["unsave", "remove", "forget"], family: "ribbon",
    aliases: [], keywords: ["unsave", "remove from list", "forget", "unpin"],
    shapes: [bookmark(), ...off(SMALL, 10)],
  },

  /* ── Pure geometry ────────────────────────────────────────────────────────────── */

  {
    slug: "move", category: "interface", subcategory: "action",
    name: "Move", description: "Drag it anywhere",
    tags: ["drag", "pan", "reposition"], family: "arrow",
    aliases: ["drag"], keywords: ["pan", "reposition", "handle", "grab", "translate"],
    shapes: [
      col(12, 4, 20), row(12, 4, 20),
      poly([[9, 7], [12, 4], [15, 7]]), poly([[9, 17], [12, 20], [15, 17]]),
      poly([[7, 9], [4, 12], [7, 15]]), poly([[17, 9], [20, 12], [17, 15]]),
    ],
  },
  {
    slug: "crop", category: "interface", subcategory: "media",
    name: "Crop", description: "Keep this part",
    tags: ["trim", "frame", "cut"], family: "bracket",
    aliases: [], keywords: ["trim", "frame", "aspect ratio", "cut", "resize"],
    // Two Ls that cross rather than a rectangle. The corners running past each other are
    // what say "the edge is where you put it" instead of "here is a box".
    shapes: [poly([[6, 2], [6, 18], [22, 18]]), poly([[2, 6], [18, 6], [18, 22]])],
  },
  {
    slug: "percent", category: "interface", subcategory: "action",
    name: "Percent", description: "A share of something",
    tags: ["rate", "share", "discount"], family: "mark",
    aliases: [], keywords: ["rate", "discount", "proportion", "ratio", "off"],
    shapes: [poly([[4, 20], [20, 4]]), disc(7, 7, 2), disc(17, 17, 2)],
  },

  /* ── Training, measured ───────────────────────────────────────────────────────── */

  {
    slug: "epoch", category: "ai", subcategory: "training",
    name: "Epoch", description: "One pass over all the data",
    tags: ["pass", "cycle", "iteration"], family: "orbit",
    aliases: [], keywords: ["iteration", "pass", "cycle", "step", "round"],
    // Three turns of the same opening. `retry` is one turn with a head on it, because retry
    // is an attempt; an epoch is a count, so the drawing counts.
    shapes: [
      arc(12, 12, 9, -90, 180), arc(12, 12, 6, -90, 180), arc(12, 12, 3, -90, 180),
    ],
  },
  {
    slug: "attention", category: "ai", subcategory: "inference",
    name: "Attention", description: "Which inputs the model is weighing",
    tags: ["focus", "weights", "converge"], family: "orbit",
    aliases: [], keywords: ["self-attention", "heads", "focus", "weighting", "transformer"],
    // Four runs converging on a middle they do not reach. Touching it, the drawing is a
    // star; stopping short, everything is plainly pointing at the same thing.
    shapes: [
      poly([[4, 4], [9, 9]]), poly([[20, 4], [15, 9]]),
      poly([[4, 20], [9, 15]]), poly([[20, 20], [15, 15]]),
      core(3),
    ],
  },
  {
    slug: "few-shot", category: "ai", subcategory: "prompt",
    name: "Few-shot", description: "Show it some examples first",
    tags: ["examples", "demonstration", "prompt"], family: "rails",
    aliases: [], keywords: ["in-context learning", "examples", "demonstrations", "shots"],
    shapes: [
      row(5, 3, 11), row(12, 3, 11), row(19, 3, 11),
      row(12, 14, 19), poly([[16, 9], [19, 12], [16, 15]]),
    ],
  },
  {
    slug: "zero-shot", category: "ai", subcategory: "prompt",
    name: "Zero-shot", description: "No examples at all",
    tags: ["none", "cold", "prompt"], family: "rails",
    aliases: [], keywords: ["no examples", "cold start", "instruction only", "direct"],
    // The same arrow as `few-shot` with the examples struck out. The pair only works if the
    // arrow is identical in both, which is why it is written at the same coordinates.
    shapes: [
      poly([[3, 8], [10, 15]]), poly([[10, 8], [3, 15]]),
      row(12, 13, 21), poly([[18, 9], [21, 12], [18, 15]]),
    ],
  },

  /* ── Where things are ─────────────────────────────────────────────────────────── */

  {
    slug: "edge", category: "cloud", subcategory: "edge",
    name: "Edge", description: "Compute right next to the user",
    tags: ["near", "boundary", "local"], family: "rails",
    aliases: [], keywords: ["edge compute", "pop", "near user", "latency", "cdn"],
    shapes: [col(20, 3, 21), disc(10, 12, 4.5), row(12, 15, 18)],
  },
  {
    slug: "region", category: "cloud", subcategory: "region",
    name: "Region", description: "Which part of the world it runs in",
    tags: ["zone", "location", "geography"], family: "orbit",
    aliases: ["zone"], keywords: ["availability zone", "datacentre", "geography", "locale"],
        // Latitudes, not a pin. A single dot near the rim of a circle reads as a blemish on the
    // drawing rather than as a place on a sphere; three bands read as a globe from a
    // distance, which is what a region is.
    shapes: [disc(12, 12, 9), row(7.5, 7, 17), row(12, 3, 21), row(16.5, 7, 17)],
  },
  {
    slug: "index", category: "data", subcategory: "catalog",
    name: "Index", description: "What is where, so you can find it",
    tags: ["lookup", "catalogue", "entries"], family: "rails",
    aliases: [], keywords: ["lookup", "catalog", "b-tree", "key", "entries"],
    // A spine with entries hanging off it. `list` has bullets and `menu` has full-width
    // rules; an index has one edge everything is filed against.
    shapes: [col(4, 4, 20), row(7, 7, 20), row(12, 7, 20), row(17, 7, 20)],
  },
  {
    slug: "funnel-chart", category: "analytics", subcategory: "chart",
    name: "Funnel chart", description: "How many are left at each step",
    tags: ["conversion", "steps", "drop-off"], family: "rails",
    aliases: [], keywords: ["conversion", "drop-off", "stages", "cohort", "pipeline"],
    // Centred, where `sort-desc` is flush left. A funnel narrows on both sides, and that
    // symmetry is what separates a drop-off from a sorted list.
    shapes: [row(6, 3, 21), row(12, 6, 18), row(18, 9, 15)],
  },
  {
    slug: "vulnerability", category: "security", subcategory: "threat",
    name: "Vulnerability", description: "A way in that should not be there",
    tags: ["flaw", "exploit", "weakness"], family: "shield",
    aliases: ["cve"], keywords: ["cve", "exploit", "weakness", "flaw", "unpatched"],
    // `trigger`'s bolt through a shield. The set now has three bodies with that bolt in
    // them — a window, a cloud, a shield — and each says what it is that got broken into.
    shapes: [shield(), poly([[15, 8], [11.5, 11.5], [14, 11.5], [10.5, 15]])],
  },
];
