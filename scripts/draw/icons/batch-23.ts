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
    name: "Radar chart", description: "A radar chart — several measures at once on spokes, a spider profile",
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
    name: "Treemap", description: "A treemap — nested blocks whose area shows quantity, the bigger the block the larger the value",
    tags: ["blocks", "nested", "area"], family: "window",
    aliases: [], keywords: ["nested", "proportional", "blocks", "hierarchy", "area"],
    shapes: [rect(2, 4, 20, 16, 2), col(10, 4, 20), row(12, 10, 22)],
  },
  {
    slug: "chart-waterfall", category: "analytics", subcategory: "chart",
    name: "Waterfall chart", description: "A waterfall chart — how a total got from there to here, step by step",
    tags: ["steps", "bridge", "change"], family: "axes",
    aliases: [], keywords: ["bridge chart", "contribution", "变化", "steps", "delta"],
    // Bars that float. Every other bar chart in the set stands on the axis; these hang at
    // the level the running total reached, which is the whole point of the form.
    shapes: [col(5, 6, 11), col(10, 11, 16), col(15, 9, 16), col(20, 4, 9)],
  },
  {
    slug: "chart-bubble", category: "analytics", subcategory: "chart",
    name: "Bubble chart", description: "A bubble chart — three measures on two axes, with size as the third",
    tags: ["scatter", "size", "points"], family: "axes",
    aliases: [], keywords: ["scatter", "size", "three variables", "plot"],
    shapes: [...axes(), disc(9, 15, 2), disc(15, 10, 3)],
  },
  {
    slug: "chart-candlestick", category: "analytics", subcategory: "chart",
    name: "Candlestick chart", description: "A candlestick chart — open, high, low and close for each period of trading",
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
    name: "Forecast", description: "A forecast — what the line is predicted to do next, a projection into the future",
    tags: ["predict", "projection", "future"], family: "axes",
    aliases: ["projection"], keywords: ["predict", "extrapolate", "trend", "future", "estimate"],
    // The line goes solid, then broken. Where the drawing stops being certain is drawn as
    // the drawing stopping, which is the one thing a forecast icon has to do.
    shapes: [...axes(), poly([[6, 16], [11, 11]]), poly([[13, 9], [15, 7]]), poly([[17, 5], [19, 3]])],
  },

  /* ── What a path can do ───────────────────────────────────────────────────────── */

  {
    slug: "parallel", category: "automation", subcategory: "workflow",
    name: "Parallel", description: "Parallel — two branches running at the same time, fanned out then joined",
    tags: ["concurrent", "fan-out", "split"], family: "fork",
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
    name: "Escalation", description: "Escalation — raise an issue up to somebody more senior or a stronger system",
    tags: ["raise", "steps", "up"], family: "arrow",
    aliases: [], keywords: ["escalate", "raise", "tier 2", "on-call", "severity"],
    shapes: [
      poly([[3, 19], [8, 19], [8, 14], [13, 14], [13, 9], [19, 9]]),
      poly([[16, 6], [19, 9], [16, 12]]),
    ],
  },
  {
    slug: "error-handler", category: "automation", subcategory: "condition",
    name: "Error handler", description: "An error handler — the catch branch where things go when they fail",
    tags: ["catch", "fallback", "branch"], family: "fork",
    aliases: ["catch"], keywords: ["try catch", "on error", "exception path", "recover"],
    shapes: [
      poly([[2, 12], [8, 12], [12, 8], [17, 8]]),
      poly([[8, 12], [12, 16], [17, 16]]),
      poly([[19, 14], [22, 17]]), poly([[22, 14], [19, 17]]),
    ],
  },
  {
    slug: "delay", category: "automation", subcategory: "schedule",
    name: "Delay", description: "Delay — wait for a while, then carry on with the next step in the flow",
    tags: ["wait", "pause", "sleep"], family: "orbit",
    aliases: ["wait"], keywords: ["sleep", "timeout", "backoff", "pause", "throttle"],
    shapes: [
      row(12, 2, 7), arc(12, 12, 5, 295, 245), col(12, 8, 12), row(12, 12, 15),
      row(12, 17, 22),
    ],
  },
  {
    slug: "dead-letter", category: "automation", subcategory: "workflow",
    name: "Dead letter", description: "A dead-letter queue — where messages that could not be delivered end up",
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
    name: "CLI", description: "The CLI — the command-line interface itself, a prompt waiting for a command",
    tags: ["prompt", "shell", "command"], family: "chevron",
    aliases: [], keywords: ["shell", "argv", "flags", "command line", "bash"],
    // `terminal`'s prompt without the machine round it. The box is the application; the
    // prompt on its own is the interface.
    shapes: [poly([[4, 7], [9, 12], [4, 17]]), row(17, 11, 20)],
  },
  {
    slug: "fork", category: "devtools", subcategory: "version-control",
    name: "Fork", description: "A fork — your own copy of somebody else's repository, free to diverge",
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
    name: "Conflict", description: "A merge conflict — two changes that cannot both apply to the same lines",
    tags: ["clash", "collision", "merge"], family: "arrow",
    aliases: [], keywords: ["merge conflict", "clash", "both changed", "resolve"],
    // Two arrows meeting head-on across the diagonal, point-symmetric about the centre.
    // Head-on across the equator they made a 18×6 stripe.
    shapes: [
      poly([[3, 3], [8, 8]]), poly([[10.5, 7], [10.5, 10.5], [7, 10.5]]),
      poly([[21, 21], [16, 16]]), poly([[13.5, 17], [13.5, 13.5], [17, 13.5]]),
    ],
  },
  {
    slug: "flaky-test", category: "devtools", subcategory: "testing",
    name: "Flaky test", description: "A flaky test — one that passes and fails on the same code, unreliable and intermittent",
    tags: ["unreliable", "intermittent", "test"], family: "mark",
    aliases: [], keywords: ["intermittent", "unreliable", "retry", "nondeterministic"],
    // A tick and a cross side by side, at the same size, so neither is the answer. Every
    // other icon in the set uses one or the other; this is the only one that needs both.
    shapes: [
      poly([[3, 7], [6, 10], [11, 5]]),
      poly([[15, 15], [21, 21]]), poly([[21, 15], [15, 21]]),
    ],
  },
  {
    slug: "editor-tab", category: "devtools", subcategory: "editor",
    name: "Editor tab", description: "An editor tab — one open file among several in the editor's tab bar",
    tags: ["tab", "open", "file"], family: "window",
    aliases: ["tab"], keywords: ["open file", "buffer", "tabs", "workspace"],
    shapes: [frame(2, 7, 20, 13, 3, { gap: 4 }), poly([[4, 7], [4, 3], [11, 3], [11, 7]])],
  },
  {
    slug: "endpoint", category: "devtools", subcategory: "api",
    name: "Endpoint", description: "An endpoint — one URL or route that a service answers on for a request",
    tags: ["route", "url", "address"], family: "chain",
    aliases: ["route"], keywords: ["url", "path", "route", "handler", "rest"],
    // The route travels the diagonal and terminates in the node, so the drawing spans
    // both axes instead of lying flat on one.
    shapes: [poly([[3, 3], [13, 13]]), disc(18, 18, 3)],
  },
  {
    slug: "memory-leak", category: "devtools", subcategory: "debug",
    name: "Memory leak", description: "A memory leak — memory that is taken and never given back, growing until it hurts",
    tags: ["drip", "grow", "waste"], family: "window",
    aliases: [], keywords: ["heap", "retained", "oom", "grows forever", "gc"],
    shapes: [rect(5, 3, 14, 10, 2), disc(9, 17, 1), disc(14, 20, 1)],
  },
  {
    slug: "autocomplete", category: "devtools", subcategory: "editor",
    name: "Autocomplete", description: "Autocomplete — the suggestion of what it thinks you meant to type",
    tags: ["suggest", "complete", "hint"], family: "window",
    aliases: ["intellisense"], keywords: ["suggestion", "intellisense", "copilot", "hint", "ghost text"],
    shapes: [rect(3, 3, 18, 7, 2), row(14, 6, 18), row(18, 6, 15)],
  },
];
