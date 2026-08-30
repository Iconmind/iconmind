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
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { bookmark, core, shield } from "../bodies.ts";
import { SMALL, check, off } from "../marks.ts";
import type { Icon } from "../build.ts";

/** The head and shoulders from `user`, unaltered, so the family cannot drift from its base. */
const figure = () => [disc(9, 8, 3), arc(9, 21, 6, 180, 360)];

export const BATCH_12: Icon[] = [
  /* ── The figure's family ──────────────────────────────────────────────────────── */

  {
    slug: "user-add", category: "interface", subcategory: "identity",
    name: "User add", description: "User add — invite somebody, create an account or add a member",
    tags: ["invite", "new", "member"], family: "figure",
    aliases: ["invite"], keywords: ["add member", "invite", "signup", "new account"],
    shapes: [...figure(), col(18, 9, 15), row(12, 15, 21)],
  },
  {
    slug: "user-off", category: "interface", subcategory: "identity",
    name: "User off", description: "User off — this account is disabled, banned or removed from the system",
    tags: ["disabled", "banned", "removed"], family: "figure",
    aliases: ["user-x"], keywords: ["deactivate", "banned", "suspended", "remove member"],
    shapes: [...figure(), poly([[15, 9], [21, 15]]), poly([[21, 9], [15, 15]])],
  },

  {
    slug: "bookmark-check", category: "interface", subcategory: "action",
    name: "Bookmark check", description: "Bookmark check — already saved, kept safely in your list of bookmarks",
    tags: ["saved", "kept", "done"], family: "ribbon",
    aliases: [], keywords: ["saved", "in your list", "collected", "already added"],
    shapes: [bookmark(), ...check(SMALL, 10)],
  },
  {
    slug: "bookmark-off", category: "interface", subcategory: "action",
    name: "Bookmark off", description: "Bookmark off — unsave it and take it out of the bookmark list",
    tags: ["unsave", "remove", "forget"], family: "ribbon",
    aliases: [], keywords: ["unsave", "remove from list", "forget", "unpin"],
    shapes: [bookmark(), ...off(SMALL, 10)],
  },

  /* ── Pure geometry ────────────────────────────────────────────────────────────── */

  {
    slug: "move", category: "interface", subcategory: "action",
    name: "Move", description: "Move — drag something anywhere, pan a canvas or reposition an object",
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
    name: "Crop", description: "Crop — keep this part of an image and trim away the rest around it",
    tags: ["trim", "frame", "cut"], family: "bracket",
    aliases: [], keywords: ["trim", "frame", "aspect ratio", "cut", "resize"],
    // Two Ls that cross rather than a rectangle. The corners running past each other are
    // what say "the edge is where you put it" instead of "here is a box".
    shapes: [poly([[6, 2], [6, 18], [22, 18]]), poly([[2, 6], [18, 6], [18, 22]])],
  },
  {
    slug: "percent", category: "interface", subcategory: "action",
    name: "Percent", description: "Percent — a share of something, a rate, a discount or a proportion",
    tags: ["rate", "share", "discount"], family: "mark",
    aliases: [], keywords: ["rate", "discount", "proportion", "ratio", "off"],
    shapes: [poly([[4, 20], [20, 4]]), disc(7, 7, 2), disc(17, 17, 2)],
  },

  /* ── Training, measured ───────────────────────────────────────────────────────── */

  {
    slug: "epoch", category: "ai", subcategory: "training",
    name: "Epoch", description: "An epoch — one full pass over all the training data during a training run",
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
    name: "Attention", description: "Attention — the mechanism that weighs which inputs a model focuses on for each output",
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
    name: "Few-shot", description: "Few-shot prompting — show the model a few worked examples before asking your question",
    tags: ["examples", "demonstration", "prompt"], family: "rails",
    aliases: [], keywords: ["in-context learning", "examples", "demonstrations", "shots"],
    shapes: [
      row(5, 3, 11), row(12, 3, 11), row(19, 3, 11),
      row(12, 14, 19), poly([[16, 9], [19, 12], [16, 15]]),
    ],
  },
  {
    slug: "zero-shot", category: "ai", subcategory: "prompt",
    name: "Zero-shot", description: "Zero-shot prompting — ask the model to do the task with no examples at all",
    tags: ["none", "cold", "prompt"], family: "rails",
    aliases: [], keywords: ["no examples", "cold start", "instruction only", "direct"],
    // A literal zero where `few-shot` has its three examples, and the identical arrow —
    // the pair reads as a pair. The old struck-out cross was a 7-unit mark that left the
    // icon a flat stripe, and an X beside an arrow read as "wrong", not "none".
    shapes: [
      rect(3, 7, 6, 10, 3),
      row(12, 14, 19), poly([[16, 9], [19, 12], [16, 15]]),
    ],
  },

  /* ── Where things are ─────────────────────────────────────────────────────────── */

  {
    slug: "edge", category: "cloud", subcategory: "edge",
    name: "Edge", description: "Edge — compute that runs right next to the user, at the network boundary rather than a central cloud",
    tags: ["near", "boundary", "local"], family: "rails",
    aliases: [], keywords: ["edge compute", "pop", "near user", "latency", "cdn"],
    shapes: [col(20, 3, 21), disc(10, 12, 4.5), row(12, 15, 18)],
  },
  {
    slug: "region", category: "cloud", subcategory: "region",
    name: "Region", description: "A region — which part of the world a service runs in, a zone or a geography",
    tags: ["zone", "location", "geography"], family: "orbit",
    aliases: ["zone"], keywords: ["availability zone", "datacentre", "geography", "locale"],
        // Latitudes, not a pin. A single dot near the rim of a circle reads as a blemish on the
    // drawing rather than as a place on a sphere; three bands read as a globe from a
    // distance, which is what a region is.
    shapes: [disc(12, 12, 9), row(7.5, 7, 17), row(12, 3, 21), row(16.5, 7, 17)],
  },
  {
    slug: "index", category: "data", subcategory: "catalog",
    name: "Index", description: "An index — a record of what is where so items can be found and looked up quickly",
    tags: ["lookup", "catalogue", "entries"], family: "rails",
    aliases: [], keywords: ["lookup", "catalog", "b-tree", "key", "entries"],
    // A spine with entries hanging off it. `list` has bullets and `menu` has full-width
    // rules; an index has one edge everything is filed against.
    shapes: [col(4, 4, 20), row(7, 7, 20), row(12, 7, 20), row(17, 7, 20)],
  },
  {
    slug: "funnel-chart", category: "analytics", subcategory: "chart",
    name: "Funnel chart", description: "A funnel chart — how many are left at each step of a conversion, and where people drop off",
    tags: ["conversion", "steps", "drop-off"], family: "rails",
    aliases: [], keywords: ["conversion", "drop-off", "stages", "cohort", "pipeline"],
    // Centred, where `sort-desc` is flush left. A funnel narrows on both sides, and that
    // symmetry is what separates a drop-off from a sorted list.
    shapes: [row(6, 3, 21), row(12, 6, 18), row(18, 9, 15)],
  },
  {
    slug: "vulnerability", category: "security", subcategory: "threat",
    name: "Vulnerability", description: "A vulnerability — a flaw that offers a way in that should not be there, a weakness to exploit",
    tags: ["flaw", "exploit", "weakness"], family: "shield",
    aliases: ["cve"], keywords: ["cve", "exploit", "weakness", "flaw", "unpatched"],
    // `trigger`'s bolt through a shield. The set now has three bodies with that bolt in
    // them — a window, a cloud, a shield — and each says what it is that got broken into.
    shapes: [shield(), poly([[15, 8], [11.5, 11.5], [14, 11.5], [10.5, 15]])],
  },
];
