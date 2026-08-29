/**
 * Batch 55 — round 4 of the 1k plan: the debugger's gutter and the bundler's work.
 *
 * Six planned concepts were already on the shelf under other names — repl,
 * watch-var, step-into, stack-trace own what live-repl, watch-expression,
 * debug-step-in and call-stack would draw, and frame-select/locals collapse into
 * stack-frame/variable at 24px. The next six devtools concepts moved up instead:
 * hot-reload, source-map, minify, bundle-analyze, code-split, dep-graph.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { cycle, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_55: Icon[] = [
  /* ── The gutter ───────────────────────────────────────────────────────────────── */

  {
    slug: "breakpoint-conditional", category: "devtools", subcategory: "debug",
    name: "Conditional breakpoint", description: "Stops here, but only if",
    tags: ["condition", "if", "gutter"], family: "figure",
    aliases: [], keywords: ["conditional breakpoint", "stop if", "expression", "debugger"],
    // `breakpoint` with its dot traded for a diamond — the debugger's own spelling
    // of "this one has a condition on it".
    shapes: [
      poly([[6, 9], [9, 12], [6, 15], [3, 12]], true),
      row(12, 10, 21), poly([[9, 8], [9, 16]]),
    ],
  },
  {
    slug: "breakpoint-log", category: "devtools", subcategory: "debug",
    name: "Logpoint", description: "Doesn't stop — just says it was here",
    tags: ["log", "print", "gutter"], family: "figure",
    aliases: ["logpoint"], keywords: ["logpoint", "log message", "print here", "tracepoint"],
    // `breakpoint`'s dot and gutter, and two lines flowing past instead of one —
    // execution goes on, saying things.
    shapes: [
      disc(6, 12, 3), poly([[9, 8], [9, 16]]),
      row(10, 12, 21), row(14, 12, 21),
    ],
  },
  {
    slug: "step-out", category: "devtools", subcategory: "debug",
    name: "Step out", description: "Finish this call and surface",
    tags: ["return", "up", "debugger"], family: "arrow",
    aliases: [], keywords: ["step out", "return from call", "surface", "debugger"],
    // `step-into` turned around: the same line, and the arrow leaving it upward.
    shapes: [row(18, 3, 21), col(12, 4, 14), poly([[9, 7], [12, 4], [15, 7]])],
  },
  {
    slug: "stack-frame", category: "devtools", subcategory: "debug",
    name: "Stack frame", description: "The one call you are standing in",
    tags: ["frame", "scope", "current"], family: "window",
    aliases: [], keywords: ["stack frame", "current frame", "scope", "call context"],
    // The frame drawn whole between the ghosts of its neighbours — a capsule with
    // its name, and the rest of the stack as bare lines above and below.
    shapes: [
      row(4, 7, 17), rect(4, 8, 16, 6, 3),
      disc(8, 11, 1), row(11, 11.5, 16.5),
      row(18, 7, 17),
    ],
  },

  /* ── The bundler ──────────────────────────────────────────────────────────────── */

  {
    slug: "hot-reload", category: "devtools", subcategory: "package",
    name: "Hot reload", description: "Still running while the code changes under it",
    tags: ["live", "refresh", "instant"], family: "rotation",
    aliases: [], keywords: ["hot reload", "hmr", "live reload", "instant update"],
    // The rotation family's loop with a bolt inside, the way `index-rebuild`
    // carries its mark — the cycle, and the jolt of new code in the middle.
    shapes: [
      ...cycle("cw"),
      poly([[14.5, 8], [10, 12.5], [13, 12.5], [8.5, 17]]),
    ],
  },
  {
    slug: "source-map", category: "devtools", subcategory: "package",
    name: "Source map", description: "Where this line really came from",
    tags: ["origin", "pin", "trace"], family: "page",
    aliases: [], keywords: ["source map", "original source", "stack mapping", "debug build"],
    // A location pin dropped on the page: the shipped file, and the exact spot in
    // the source it points back to.
    shapes: [page(), disc(12, 9.5, 3), col(12, 12.5, 16.5)],
  },
  {
    slug: "minify", category: "devtools", subcategory: "package",
    name: "Minify", description: "The same program, in far fewer bytes",
    tags: ["compress", "shrink", "bytes"], family: "arrow",
    aliases: [], keywords: ["minify", "compress code", "smaller bundle", "uglify"],
    // The block, the arrow down, and what is left of it.
    shapes: [
      rect(4, 2, 16, 8, 2),
      col(12, 12, 15), poly([[10, 14], [12, 16], [14, 14]]),
      rect(8, 18.5, 8, 3.5, 1.75),
    ],
  },
  {
    slug: "bundle-analyze", category: "devtools", subcategory: "package",
    name: "Bundle analyze", description: "What is actually taking the space",
    tags: ["treemap", "size", "inspect"], family: "window",
    aliases: [], keywords: ["bundle analyzer", "treemap", "bundle size", "what's big"],
    // The analyzer's treemap: one window, and the cuts that show who is heavy.
    shapes: [rect(3, 4, 18, 16, 2), col(12, 4, 20), row(12, 12, 21)],
  },
  {
    slug: "code-split", category: "devtools", subcategory: "package",
    name: "Code split", description: "One bundle becomes the pieces you load",
    tags: ["chunks", "lazy", "split"], family: "window",
    aliases: [], keywords: ["code splitting", "chunks", "lazy load", "dynamic import"],
    shapes: [rect(2, 7, 9, 10, 2), rect(14, 3, 8, 7, 2), rect(14, 14, 8, 7, 2)],
  },
  {
    slug: "dep-graph", category: "devtools", subcategory: "package",
    name: "Dependency graph", description: "Who needs whom",
    tags: ["nodes", "edges", "imports"], family: "chain",
    aliases: ["dependency-graph"], keywords: ["dependency graph", "imports", "module graph"],
    // Two dependencies converging into one module, and the flow going on below —
    // every edge lands on a node's stroke, `fork`-fashion.
    shapes: [
      disc(5, 7, 3), disc(19, 7, 3), disc(12, 14, 3),
      poly([[7.5, 9.5], [10, 12]]), poly([[16.5, 9.5], [14, 12]]),
      col(12, 17, 21),
    ],
  },
];
