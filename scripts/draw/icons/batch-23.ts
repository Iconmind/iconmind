/**
 * Batch 23 — five more charts, and the shapes a path can take.
 *
 * The chart family now runs to nine, and every one of them either shares the axes drawn in
 * batch 03 or deliberately has none. A chart with its own axes would be a tenth drawing; a
 * chart with the same axes is the ninth reading of one.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { SMALL, off } from "../marks.ts";
import type { Icon } from "../build.ts";

/** The axes every chart in this set that has axes uses, to the unit. */
const axes = () => [col(4, 4, 20), row(20, 4, 20)];

export const BATCH_23: Icon[] = [
  /* ── Charts ───────────────────────────────────────────────────────────────────── */

  {
    slug: "chart-radar", category: "analytics", subcategory: "chart",
    name: "Radar chart", description: "Several measures at once",
    tags: ["spider", "profile", "axes"], family: "lattice",
    aliases: ["spider-chart"], keywords: ["spider", "polar", "profile", "multivariate"],
    // Concentric, where `similarity` overlaps its two diamonds. One is a comparison of two
    // things; this is one thing measured against its own outer bound.
    shapes: [
      poly([[12, 4], [20, 12], [12, 20], [4, 12]], true),
      poly([[12, 8], [16, 12], [12, 16], [8, 12]], true),
    ],
  },
  {
    slug: "chart-treemap", category: "analytics", subcategory: "chart",
    name: "Treemap", description: "Area as quantity",
    tags: ["blocks", "nested", "area"], family: "window",
    aliases: [], keywords: ["nested", "proportional", "blocks", "hierarchy", "area"],
    shapes: [rect(2, 4, 20, 16, 2), col(10, 4, 20), row(12, 10, 22)],
  },
  {
    slug: "chart-waterfall", category: "analytics", subcategory: "chart",
    name: "Waterfall chart", description: "How it got from there to here",
    tags: ["steps", "bridge", "change"], family: "axes",
    aliases: [], keywords: ["bridge chart", "contribution", "变化", "steps", "delta"],
    // Bars that float. Every other bar chart in the set stands on the axis; these hang at
    // the level the running total reached, which is the whole point of the form.
    shapes: [col(5, 6, 11), col(10, 11, 16), col(15, 9, 16), col(20, 4, 9)],
  },
  {
    slug: "chart-bubble", category: "analytics", subcategory: "chart",
    name: "Bubble chart", description: "Three measures on two axes",
    tags: ["scatter", "size", "points"], family: "axes",
    aliases: [], keywords: ["scatter", "size", "three variables", "plot"],
    shapes: [...axes(), disc(9, 15, 2), disc(15, 10, 3)],
  },
  {
    slug: "chart-candlestick", category: "analytics", subcategory: "chart",
    name: "Candlestick chart", description: "Open, high, low and close",
    tags: ["ohlc", "trading", "range"], family: "axes",
    aliases: ["ohlc"], keywords: ["trading", "stock", "ohlc", "range", "finance"],
    // Each wick is two runs meeting the body's edges, not one run through it. Drawn through,
    // every candle crosses its own body twice and the icon has four crossings where the set
    // allows two — and a wick behind a body is not visible in a line drawing anyway.
        shapes: [
      col(6, 4, 8), rect(2.5, 8, 7, 8, 2), col(6, 16, 20),
      col(16, 5, 9), rect(12.5, 9, 7, 7, 2), col(16, 16, 19),
    ],
  },
  {
    slug: "forecast", category: "analytics", subcategory: "metric",
    name: "Forecast", description: "What the line does next",
    tags: ["predict", "projection", "future"], family: "axes",
    aliases: ["projection"], keywords: ["predict", "extrapolate", "trend", "future", "estimate"],
    // The line goes solid, then broken. Where the drawing stops being certain is drawn as
    // the drawing stopping, which is the one thing a forecast icon has to do.
    shapes: [...axes(), poly([[6, 16], [11, 11]]), poly([[13, 9], [15, 7]]), poly([[17, 5], [19, 3]])],
  },

  /* ── What a path can do ───────────────────────────────────────────────────────── */

  {
    slug: "parallel", category: "automation", subcategory: "workflow",
    name: "Parallel", description: "Two branches running at once",
    tags: ["concurrent", "fan-out", "split"], family: "chain",
    aliases: ["concurrent"], keywords: ["fan out", "at the same time", "async", "split"],
    // Both branches level out and stay level. `branch-step` diverges and keeps diverging,
    // which is a choice; parallel work runs alongside itself.
    shapes: [
      poly([[3, 12], [8, 12], [12, 8], [21, 8]]),
      poly([[8, 12], [12, 16], [21, 16]]),
    ],
  },
  {
    slug: "escalation", category: "automation", subcategory: "human-loop",
    name: "Escalation", description: "Up to somebody more senior",
    tags: ["raise", "steps", "up"], family: "arrow",
    aliases: [], keywords: ["escalate", "raise", "tier 2", "on-call", "severity"],
    shapes: [
      poly([[3, 19], [8, 19], [8, 14], [13, 14], [13, 9], [19, 9]]),
      poly([[16, 6], [19, 9], [16, 12]]),
    ],
  },
  {
    slug: "error-handler", category: "automation", subcategory: "condition",
    name: "Error handler", description: "Where things go when they fail",
    tags: ["catch", "fallback", "branch"], family: "chain",
    aliases: ["catch"], keywords: ["try catch", "on error", "exception path", "recover"],
    shapes: [
      poly([[2, 12], [8, 12], [12, 8], [17, 8]]),
      poly([[8, 12], [12, 16], [17, 16]]),
      poly([[19, 14], [22, 17]]), poly([[22, 14], [19, 17]]),
    ],
  },
  {
    slug: "delay", category: "automation", subcategory: "schedule",
    name: "Delay", description: "Wait, then carry on",
    tags: ["wait", "pause", "sleep"], family: "orbit",
    aliases: ["wait"], keywords: ["sleep", "timeout", "backoff", "pause", "throttle"],
    shapes: [
      row(12, 2, 7), arc(12, 12, 5, 295, 245), col(12, 8, 12), row(12, 12, 15),
      row(12, 17, 22),
    ],
  },
  {
    slug: "dead-letter", category: "automation", subcategory: "workflow",
    name: "Dead letter", description: "The message that could not be delivered",
    tags: ["failed", "undelivered", "queue"], family: "window",
    aliases: [], keywords: ["dlq", "undeliverable", "poison message", "failed queue"],
    shapes: [
      frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]]),
      ...off(SMALL, 10),
    ],
  },

  /* ── Developer tools ──────────────────────────────────────────────────────────── */

  {
    slug: "cli", category: "devtools", subcategory: "terminal",
    name: "CLI", description: "The command line itself",
    tags: ["prompt", "shell", "command"], family: "chevron",
    aliases: [], keywords: ["shell", "argv", "flags", "command line", "bash"],
    // `terminal`'s prompt without the machine round it. The box is the application; the
    // prompt on its own is the interface.
    shapes: [poly([[4, 7], [9, 12], [4, 17]]), row(17, 11, 20)],
  },
  {
    slug: "fork", category: "devtools", subcategory: "version-control",
    name: "Fork", description: "Your own copy of somebody's work",
    tags: ["copy", "diverge", "branch"], family: "chain",
    aliases: [], keywords: ["fork repo", "diverge", "clone", "upstream", "contribute"],
    // `git-merge` upside down. Two becoming one is a merge; one becoming two is a fork, and
    // the two drawings are the same drawing.
    shapes: [
      disc(12, 8, 2), poly([[10.5, 9.5], [6, 14]]), poly([[13.5, 9.5], [18, 14]]),
      disc(5, 16, 2), disc(19, 16, 2),
    ],
  },
  {
    slug: "conflict", category: "devtools", subcategory: "version-control",
    name: "Conflict", description: "Two changes that cannot both apply",
    tags: ["clash", "collision", "merge"], family: "arrow",
    aliases: [], keywords: ["merge conflict", "clash", "both changed", "resolve"],
    shapes: [
      row(12, 3, 10), poly([[8, 9], [11, 12], [8, 15]]),
      row(12, 14, 21), poly([[16, 9], [13, 12], [16, 15]]),
    ],
  },
  {
    slug: "flaky-test", category: "devtools", subcategory: "testing",
    name: "Flaky test", description: "Passes and fails on the same code",
    tags: ["unreliable", "intermittent", "test"], family: "mark",
    aliases: [], keywords: ["intermittent", "unreliable", "retry", "nondeterministic"],
    // A tick and a cross side by side, at the same size, so neither is the answer. Every
    // other icon in the set uses one or the other; this is the only one that needs both.
    shapes: [
      poly([[2, 12], [5, 15], [10, 10]]),
      poly([[14, 8], [21, 15]]), poly([[21, 8], [14, 15]]),
    ],
  },
  {
    slug: "editor-tab", category: "devtools", subcategory: "editor",
    name: "Editor tab", description: "One open file among several",
    tags: ["tab", "open", "file"], family: "window",
    aliases: ["tab"], keywords: ["open file", "buffer", "tabs", "workspace"],
    shapes: [frame(2, 7, 20, 13, 3, { gap: 4 }), poly([[4, 7], [4, 3], [11, 3], [11, 7]])],
  },
  {
    slug: "endpoint", category: "devtools", subcategory: "api",
    name: "Endpoint", description: "One address something answers on",
    tags: ["route", "url", "address"], family: "chain",
    aliases: ["route"], keywords: ["url", "path", "route", "handler", "rest"],
    shapes: [row(12, 3, 16), disc(19, 12, 2)],
  },
  {
    slug: "memory-leak", category: "devtools", subcategory: "debug",
    name: "Memory leak", description: "It never gives any back",
    tags: ["drip", "grow", "waste"], family: "window",
    aliases: [], keywords: ["heap", "retained", "oom", "grows forever", "gc"],
    shapes: [rect(5, 3, 14, 10, 2), disc(9, 17, 1), disc(14, 20, 1)],
  },
  {
    slug: "autocomplete", category: "devtools", subcategory: "editor",
    name: "Autocomplete", description: "What it thinks you meant",
    tags: ["suggest", "complete", "hint"], family: "window",
    aliases: ["intellisense"], keywords: ["suggestion", "intellisense", "copilot", "hint", "ghost text"],
    shapes: [rect(3, 3, 18, 7, 2), row(14, 6, 18), row(18, 6, 15)],
  },
];
