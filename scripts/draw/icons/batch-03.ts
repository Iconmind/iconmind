/**
 * Batch 03 — the marks, and the things that are only marks.
 *
 * Most of this batch has no body at all. A chevron, a cross, a plus, a bolt: they are the
 * signs an interface is made of, and putting a silhouette around one would say something
 * the sign does not mean. The language still holds — nothing here closes that does not have
 * to — but "open at the top" is a rule about silhouettes, and a tick has no top.
 *
 * The set needs these early rather than late. They are what a modifier is made of: once
 * `plus`, `check`, `close` and `warning` are drawn, `agent-add` and `model-off` are the
 * agent and the model with one of them in the middle, and the family system has something
 * to be built out of.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { core, machine, page, panel, ring } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_03: Icon[] = [
  /* ── Signs ────────────────────────────────────────────────────────────────────── */

  {
    slug: "chevron-right", category: "interface", subcategory: "arrow",
    name: "Chevron right", description: "Go forward, or open what is next",
    tags: ["next", "forward", "expand"], family: "chevron",
    aliases: ["next"], keywords: ["arrow right", "caret", "disclosure", "more"],
    // Two runs at the set's own angle, meeting. Every chevron in the set is this one turned,
    // so a row of them cannot drift apart in weight or in reach.
    shapes: [poly([[9, 5], [16, 12], [9, 19]])],
  },

  {
    slug: "chevron-down", category: "interface", subcategory: "arrow",
    name: "Chevron down", description: "Open what is below, or drop it down",
    tags: ["expand", "dropdown", "below"], family: "chevron",
    aliases: ["dropdown"], keywords: ["arrow down", "caret", "collapse", "select"],
    shapes: [poly([[5, 9], [12, 16], [19, 9]])],
  },

  {
    slug: "close", category: "interface", subcategory: "action",
    name: "Close", description: "Dismiss it",
    tags: ["dismiss", "cancel", "x"], family: "mark",
    aliases: ["cancel"], keywords: ["x", "dismiss", "exit", "remove", "clear"],
    // Two runs, crossing once. Drawn as one path with two subpaths it would be a single
    // shape whose crossing counts twice for winding — the same thing that painted a cross
    // solid in the set before this one.
    shapes: [poly([[5, 5], [19, 19]]), poly([[19, 5], [5, 19]])],
  },

  {
    slug: "plus", category: "interface", subcategory: "action",
    name: "Plus", description: "Add one",
    tags: ["add", "new", "create"], family: "mark",
    aliases: ["add"], keywords: ["new", "create", "increase", "insert"],
    shapes: [col(12, 4, 20), row(12, 4, 20)],
  },

  {
    slug: "minus", category: "interface", subcategory: "action",
    name: "Minus", description: "Take one away",
    tags: ["remove", "subtract", "less"], family: "mark",
    aliases: ["remove"], keywords: ["subtract", "delete", "decrease", "collapse"],
    shapes: [row(12, 4, 20)],
  },

  {
    slug: "warning", category: "interface", subcategory: "state",
    name: "Warning", description: "Something needs looking at",
    tags: ["alert", "caution", "attention"], family: "orbit",
    aliases: [], keywords: ["caution", "attention", "error", "exclamation", "alert"],
    // A ring, not a triangle. Every side of this set's shapes is at 0, 45 or 90 degrees, and
    // a 45° triangle on a 24 grid is twice as wide as it is tall — a tent, not a warning.
    // The ring is the body `agent` uses, which makes this the same family: a whole thing,
    // with something in the middle that says what state it is in.
    shapes: [ring(), col(12, 7, 14), disc(12, 17, 1)],
  },

  {
    slug: "loading", category: "interface", subcategory: "state",
    name: "Loading", description: "Working on it",
    tags: ["spinner", "progress", "wait"], family: "orbit",
    aliases: ["spinner", "loader"], keywords: ["progress", "busy", "wait", "pending"],
    // Three quarters of a circle, open at the top left. `ring()`'s gap is small and centred
    // and reads as a body; this one is a quadrant and reads as motion, which is the whole
    // difference between a thing and a thing in progress.
    shapes: [arc(12, 12, 9, -90, 180)],
  },

  {
    slug: "settings", category: "interface", subcategory: "action",
    name: "Settings", description: "Change how it behaves",
    tags: ["preferences", "controls", "options"], family: "rails",
    aliases: ["preferences"], keywords: ["options", "config", "gear", "controls"],
    // Rails across, where `parameters` runs them down. A gear is the expected drawing and
    // cannot be had: its teeth are at angles this set does not use, and drawn with the ones
    // it does it comes out a cog with four teeth, which is a flower.
    shapes: [row(9, 4, 20), col(9, 7, 11), row(15, 4, 20), col(15, 13, 17)],
  },

  /* ── Developer tools ──────────────────────────────────────────────────────────── */

  {
    slug: "code", category: "devtools", subcategory: "code",
    name: "Code", description: "Source, as written",
    tags: ["source", "brackets", "syntax"], family: "chevron",
    aliases: ["source"], keywords: ["brackets", "syntax", "programming", "snippet"],
    // Two chevrons back to back — `chevron-right` and its mirror, at the size where the gap
    // between them stays open at sixteen pixels.
    shapes: [poly([[9, 6], [3, 12], [9, 18]]), poly([[15, 6], [21, 12], [15, 18]])],
  },

  {
    slug: "branch-git", category: "devtools", subcategory: "version-control",
    name: "Branch", description: "A line of work split off from another",
    tags: ["git", "fork", "version"], family: "chain",
    aliases: ["branch"], keywords: ["git", "fork", "merge", "commit", "version control"],
    // A trunk with three nodes: where it splits, where the split goes, where it carries on.
    // Two nodes would be a link, and the split is the whole point.
    shapes: [
      disc(7, 6, 2), col(7, 8.5, 15.5), disc(7, 18, 2),
      row(12, 7, 14.5), disc(17, 12, 2),
    ],
  },

  {
    slug: "package", category: "devtools", subcategory: "package",
    name: "Package", description: "Something built, wrapped and versioned",
    tags: ["module", "library", "dependency"], family: "window",
    aliases: ["module"], keywords: ["npm", "dependency", "library", "bundle", "box"],
    // A box with a ribbon: one seam across, one down into the break. With the seam alone
    // it was a card with a slot in the top. The ribbon starts where the silhouette opens,
    // so the gap becomes part of the drawing rather than a hole in it.
    shapes: [frame(4, 6, 16, 14, 3, { gap: 4 }), row(11, 4, 20), col(12, 6, 11)],
  },

  {
    slug: "debug", category: "devtools", subcategory: "debug",
    name: "Debug", description: "Find out what it is actually doing",
    tags: ["bug", "inspect", "breakpoint"], family: "figure",
    aliases: ["bug"], keywords: ["breakpoint", "step", "inspect", "troubleshoot"],
    accepted: {
      "lint/element-budget":
        "a beetle is a body, six limbs and two feelers; with fewer parts it is a chip",
    },
    // A round body, six limbs, and the body is closed — a beetle with a gap in its back is
    // a beetle that has been stepped on. Drawn on a tall rounded rectangle it came out a
    // chip with side pins, which is `cpu` with fewer pins.
    shapes: [
      disc(12, 13, 5),
      row(11, 3, 7.5), row(11, 16.5, 21), row(15, 3, 7.5), row(15, 16.5, 21),
      poly([[8, 5], [10.5, 7.5]]), poly([[16, 5], [13.5, 7.5]]),
    ],
  },

  /* ── Automation ───────────────────────────────────────────────────────────────── */

  {
    slug: "trigger", category: "automation", subcategory: "trigger",
    name: "Trigger", description: "What sets the thing running",
    tags: ["event", "fire", "bolt"], family: "mark",
    aliases: ["event"], keywords: ["webhook", "fire", "lightning", "on-event", "hook"],
    // A bolt on the set's angles: down, across, down. Real lightning is drawn at whatever
    // angles look right, and every one of those would have been a waiver.
    shapes: [poly([[16, 4], [9, 11], [14, 11], [7, 18]])],
  },

  {
    slug: "workflow", category: "automation", subcategory: "workflow",
    name: "Workflow", description: "Steps that run in order, without anyone watching",
    tags: ["flow", "steps", "sequence"], family: "chain",
    aliases: ["flow", "orchestration"], keywords: ["automation", "dag", "orchestration", "unattended"],
    // Two stages offset, and the path between them turning a corner. Side by side with a
    // straight connector it would be `pipeline`; the corner is what says the second stage
    // is downstream rather than next to.
    shapes: [
      rect(3, 4, 8, 7, 2),
      poly([[7, 11], [7, 16.5], [13, 16.5]]),
      rect(13, 13, 8, 7, 2),
    ],
  },

  {
    slug: "action", category: "automation", subcategory: "action",
    name: "Action", description: "The step that actually does something",
    tags: ["run", "execute", "play"], family: "chevron",
    aliases: ["run"], keywords: ["execute", "play", "invoke", "step"],
    // The solid form of `chevron-right`. Open, it points the way; closed, it is the thing
    // you press — which is the difference between a direction and a deed.
    shapes: [poly([[9, 5], [16, 12], [9, 19]], true)],
  },

  /* ── Analytics ────────────────────────────────────────────────────────────────── */

  {
    slug: "chart-bar", category: "analytics", subcategory: "chart",
    name: "Bar chart", description: "Compare quantities side by side",
    tags: ["bars", "compare", "graph"], family: "axes",
    aliases: ["bars", "chart"], keywords: ["histogram", "graph", "compare", "column chart"],
    // Axes first. Bars without them float, and floating bars at three different heights are
    // an equaliser — the axes are what make the reading "measured against something".
    shapes: [
      col(4, 4, 20), row(20, 4, 20),
      col(8, 12, 20), col(13, 8, 20), col(18, 14, 20),
    ],
  },

  {
    slug: "chart-line", category: "analytics", subcategory: "chart",
    name: "Line chart", description: "How something moved over time",
    tags: ["trend", "series", "graph"], family: "axes",
    aliases: ["trend"], keywords: ["time series", "graph", "plot", "sparkline"],
    // The same axes as `chart-bar`, so the two read as one pair rather than two drawings.
    // The line dips before it climbs: a line that only rises is a logo.
    shapes: [
      col(4, 4, 20), row(20, 4, 20),
      poly([[6, 17], [10, 13], [14, 17], [20, 11]]),
    ],
  },

  {
    slug: "metric", category: "analytics", subcategory: "metric",
    name: "Metric", description: "One number, watched",
    tags: ["gauge", "measure", "kpi"], family: "gauge",
    aliases: [], keywords: ["kpi", "measure", "dial", "indicator", "score", "gauge"],
    // A dial and a needle. The needle points up and right rather than straight up, because
    // straight up is the centre of the dial and reads as a switch.
    shapes: [arc(12, 16, 9, 180, 0), poly([[12, 16], [17, 11]])],
  },

  /* ── Two more from the model's own vocabulary ─────────────────────────────────── */

  {
    slug: "system-prompt", category: "ai", subcategory: "prompt",
    name: "System prompt", description: "The instruction the model always has",
    tags: ["system", "instruction", "fixed"], family: "machine",
    keywords: ["system message", "preamble", "role", "persona"],
    // `prompt` in the machine register: the same panel with the corner cut, and no caret.
    // The caret is what says "you type here", and nobody types this one. The cut is 5 where
    // the corner radius is 3 — at 4 the two read as the same corner and the register
    // disappears at the size it most needs to survive.
    shapes: [frame(3, 6, 18, 12, 3, { chamfer: 5, gap: 5 }), row(10, 9, 17), row(14, 9, 14)],
  },

  {
    slug: "benchmark", category: "ai", subcategory: "evaluation",
    name: "Benchmark", description: "How this model scores against the others",
    tags: ["score", "compare", "leaderboard"], family: "machine",
    keywords: ["leaderboard", "mmlu", "score", "compare", "eval suite"],
    // Bars inside the machine, where `chart-bar` puts them on axes. The body is what makes
    // it a benchmark of a model rather than a chart of anything.
    shapes: [machine(), col(8, 10, 16), col(12, 8, 16), col(16, 12, 16)],
  },
];
