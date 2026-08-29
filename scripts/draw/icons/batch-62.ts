/**
 * Batch 62 — round 11 of the 1k plan: the browser's chrome, the toolchain's
 * conscience, data cleaned by hand, search made honest, and the red team's
 * quieter tricks.
 *
 * Swaps as ever, the one reason: quick-switch and key-combo share a picture,
 * pin-item is memory-pin, peer-dep is vpc-peering, metadata-filter is
 * filter-metadata, model-inversion and the hnsw graph have no honest 24px
 * silhouette. Every name checked free before drawing.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { cycle, machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_62: Icon[] = [
  /* ── interface: the browser's chrome ──────────────────────────────────────────── */

  {
    slug: "spotlight", category: "interface", subcategory: "action",
    name: "Spotlight", description: "Type three letters; the thing appears",
    tags: ["search", "overlay", "quick"], family: "window",
    aliases: ["search-overlay"], keywords: ["spotlight", "command palette search", "quick find"],
    shapes: [
      rect(3, 7, 18, 10, 2),
      disc(8, 11.5, 2), poly([[9.5, 13], [11.5, 15]]),
      row(11.5, 14, 18),
    ],
  },
  {
    slug: "recent-items", category: "interface", subcategory: "action",
    name: "Recent items", description: "What you touched last, remembered",
    tags: ["history", "list", "clock"], family: "figure",
    aliases: [], keywords: ["recents", "recently used", "history list"],
    shapes: [
      disc(7, 12, 4), col(7, 9.5, 12), row(12, 7, 9.5),
      row(8, 14, 21), row(13, 14, 21), row(18, 14, 19),
    ],
  },
  {
    slug: "favorite-add", category: "interface", subcategory: "action",
    name: "Add favorite", description: "Kept where the heart keeps things",
    tags: ["heart", "save", "like"], family: "figure",
    aliases: [], keywords: ["favorite", "add to favorites", "heart"],
    shapes: [
      raw("M4 11A4 4 0 0 1 12 11A4 4 0 0 1 20 11L12 19Z",
        "a heart is one line, not three strokes with visible seams", true),
      row(4.5, 17.5, 21.5), col(19.5, 2.5, 6.5),
    ],
  },
  {
    slug: "favorite-remove", category: "interface", subcategory: "action",
    name: "Remove favorite", description: "The heart lets it go",
    tags: ["heart", "unsave", "unlike"], family: "figure",
    aliases: [], keywords: ["unfavorite", "remove favorite"],
    shapes: [
      raw("M4 11A4 4 0 0 1 12 11A4 4 0 0 1 20 11L12 19Z",
        "a heart is one line, not three strokes with visible seams", true),
      row(4.5, 17.5, 21.5),
    ],
  },
  {
    slug: "tab-group", category: "interface", subcategory: "layout",
    name: "Tab group", description: "Two tabs, travelling together",
    tags: ["browser", "bundle", "tabs"], family: "window",
    aliases: [], keywords: ["tab group", "grouped tabs"],
    shapes: [
      poly([[2, 16], [2, 9], [4, 7], [8, 7], [10, 9], [10, 16]]),
      poly([[14, 16], [14, 9], [16, 7], [20, 7], [22, 9], [22, 16]]),
      row(16, 2, 22), row(19.5, 4, 20),
    ],
  },
  {
    slug: "tab-pin", category: "interface", subcategory: "layout",
    name: "Pin tab", description: "This one stays put",
    tags: ["browser", "keep", "pin"], family: "window",
    aliases: ["pinned-tab"], keywords: ["pin tab", "pinned tab"],
    shapes: [
      poly([[2, 19], [2, 9], [4, 7], [10, 7], [12, 9], [12, 19]]),
      row(19, 2, 22),
      disc(18, 10, 3), col(18, 13, 16.5),
    ],
  },
  {
    slug: "tab-overflow", category: "interface", subcategory: "layout",
    name: "Tab overflow", description: "More of them than the bar can show",
    tags: ["browser", "more", "dots"], family: "window",
    aliases: [], keywords: ["tab overflow", "more tabs"],
    shapes: [
      poly([[2, 19], [2, 9], [4, 7], [10, 7], [12, 9], [12, 19]]),
      row(19, 2, 22),
      disc(15, 13, 1), disc(18, 13, 1), disc(21, 13, 1),
    ],
  },
  {
    slug: "pane-left", category: "interface", subcategory: "layout",
    name: "Left pane", description: "The narrow one does the choosing",
    tags: ["layout", "sidebar", "focus"], family: "window",
    aliases: [], keywords: ["left pane", "sidebar left"],
    shapes: [rect(2, 4, 20, 16, 2), col(9, 4, 20), col(5.5, 8, 16)],
  },
  {
    slug: "pane-right", category: "interface", subcategory: "layout",
    name: "Right pane", description: "Details live on the right",
    tags: ["layout", "sidebar", "focus"], family: "window",
    aliases: [], keywords: ["right pane", "sidebar right"],
    shapes: [rect(2, 4, 20, 16, 2), col(15, 4, 20), col(18.5, 8, 16)],
  },
  {
    slug: "pane-bottom", category: "interface", subcategory: "layout",
    name: "Bottom pane", description: "The console under everything",
    tags: ["layout", "drawer", "console"], family: "window",
    aliases: [], keywords: ["bottom pane", "bottom drawer", "console pane"],
    shapes: [rect(2, 4, 20, 16, 2), row(14, 2, 22), row(17, 6, 18)],
  },

  /* ── devtools: the toolchain's conscience ─────────────────────────────────────── */

  {
    slug: "lockfile-tool", category: "devtools", subcategory: "package",
    name: "Lockfile", description: "Exactly these versions, sworn in writing",
    tags: ["lock", "versions", "frozen"], family: "page",
    aliases: [], keywords: ["lockfile", "pnpm-lock", "package-lock"],
    shapes: [page(), disc(12, 10, 2), col(12, 12, 15.5)],
  },
  {
    slug: "organize-imports", category: "devtools", subcategory: "editor",
    name: "Organise imports", description: "The jumble, alphabetised",
    tags: ["sort", "tidy", "imports"], family: "figure",
    aliases: ["sort-imports"], keywords: ["organize imports", "sort imports", "tidy"],
    shapes: [
      row(5, 3, 9), row(10, 3, 7), row(15, 3, 10),
      row(5, 14, 20), row(10, 14, 20), row(15, 14, 20),
    ],
  },
  {
    slug: "strict-mode", category: "devtools", subcategory: "code",
    name: "Strict mode", description: "The walls, doubled",
    tags: ["strict", "rules", "safe"], family: "window",
    aliases: [], keywords: ["strict mode", "strictness", "no loose ends"],
    shapes: [rect(3, 3, 18, 18, 2), rect(7, 7, 10, 10, 2)],
  }, 
  {
    slug: "test-select", category: "devtools", subcategory: "testing",
    name: "Test select", description: "Run just the one that matters now",
    tags: ["focus", "only", "pick"], family: "figure",
    aliases: ["test-only"], keywords: ["test.only", "focused test", "run one"],
    shapes: [
      row(5, 8, 20), row(12, 8, 20), row(19, 8, 20),
      poly([[3, 9], [6, 12], [3, 15]], true),
    ],
  },
  {
    slug: "bench-run", category: "devtools", subcategory: "testing",
    name: "Benchmark run", description: "How fast, exactly",
    tags: ["timed", "speed", "measure"], family: "figure",
    aliases: [], keywords: ["benchmark", "timed run", "perf test"],
    shapes: [
      poly([[4, 6], [11, 13], [4, 20]], true),
      disc(17, 12, 4), col(17, 9.5, 12), row(12, 17, 19.5),
    ],
  },
  {
    slug: "flame-graph", category: "devtools", subcategory: "debug",
    name: "Flame graph", description: "Where the time actually went",
    tags: ["profile", "stack", "width"], family: "chart",
    aliases: [], keywords: ["flame graph", "profiling", "cpu time"],
    shapes: [
      rect(3, 17, 18, 4, 2), rect(5, 10, 11, 4, 2), rect(7, 3, 6.5, 4, 2),
    ],
  },
  {
    slug: "deadlock", category: "devtools", subcategory: "debug",
    name: "Deadlock", description: "Each is waiting for the other to move",
    tags: ["stuck", "waiting", "threads"], family: "arrow",
    aliases: [], keywords: ["deadlock", "mutual wait", "stuck threads"],
    shapes: [
      row(8, 2, 6.5), poly([[6.5, 5.5], [9, 8], [6.5, 10.5]]),
      row(16, 17.5, 22), poly([[17.5, 13.5], [15, 16], [17.5, 18.5]]),
    ],
  },
  {
    slug: "race-detect", category: "devtools", subcategory: "debug",
    name: "Race", description: "Two writers, one address, no referee",
    tags: ["concurrent", "collide", "bug"], family: "arrow",
    aliases: ["race-condition"], keywords: ["race condition", "data race", "concurrent write"],
    shapes: [
      poly([[3, 5], [10, 12]]), poly([[3, 19], [10, 12]]),
      disc(15, 12, 3.5),
    ],
  },
  {
    slug: "atomic-op", category: "devtools", subcategory: "code",
    name: "Atomic", description: "All of it, or none of it",
    tags: ["indivisible", "safe", "single"], family: "figure",
    aliases: ["atomic"], keywords: ["atomic operation", "indivisible", "cas"],
    shapes: [
      poly([[7.5, 4], [5, 4], [5, 20], [7.5, 20]]),
      poly([[16.5, 4], [19, 4], [19, 20], [16.5, 20]]),
      disc(12, 12, 3),
    ],
  },
  {
    slug: "gc-cycle", category: "devtools", subcategory: "code",
    name: "GC cycle", description: "The collector making its rounds",
    tags: ["memory", "sweep", "collect"], family: "rotation",
    aliases: ["garbage-collect"], keywords: ["garbage collection", "gc", "sweep"],
    shapes: [...cycle("ccw"), disc(12, 12.5, 2)],
  },

  /* ── data: cleaned by hand ────────────────────────────────────────────────────── */

  {
    slug: "label-review", category: "data", subcategory: "quality",
    name: "Label review", description: "Somebody looks twice at the name",
    tags: ["qa", "check", "tag"], family: "figure",
    aliases: [], keywords: ["label review", "annotation qa", "double check"],
    shapes: [
      poly([[3, 6], [13, 6], [16.5, 9.5], [13, 13], [3, 13]], true),
      disc(16, 17, 3), poly([[18.5, 19.5], [20.5, 21.5]]),
    ],
  },
  {
    slug: "annotator", category: "data", subcategory: "quality",
    name: "Annotator", description: "The person the labels come from",
    tags: ["human", "labeler", "person"], family: "figure",
    aliases: ["labeler"], keywords: ["annotator", "human labeler"],
    shapes: [
      disc(7, 5, 2), arc(7, 13, 4, 180, 360),
      poly([[13, 12], [18, 12], [21.5, 15.5], [18, 19], [13, 19]], true),
    ],
  },
  {
    slug: "synthetic-flag", category: "data", subcategory: "quality",
    name: "Synthetic flag", description: "Made-up rows carry a flag",
    tags: ["marker", "generated", "flag"], family: "figure",
    aliases: [], keywords: ["synthetic flag", "generated marker"],
    shapes: [
      col(5, 4, 16), poly([[5, 5], [8, 5], [8, 8], [5, 8]]),
      disc(9, 15, 1), disc(14, 15, 1), disc(19, 15, 1),
    ],
  },
  {
    slug: "perturb", category: "data", subcategory: "quality",
    name: "Perturb", description: "The same row, shaken slightly",
    tags: ["jitter", "vary", "noise"], family: "figure",
    aliases: [], keywords: ["perturbation", "jitter data"],
    shapes: [
      row(7, 3, 21),
      poly([[3, 15], [6, 12], [9, 15], [12, 12], [15, 15], [18, 12], [21, 15]]),
    ],
  },
  {
    slug: "entity-resolve", category: "data", subcategory: "quality",
    name: "Entity resolve", description: "Two spellings, one person",
    tags: ["merge", "identity", "match"], family: "chain",
    aliases: [], keywords: ["entity resolution", "record matching", "same entity"],
    shapes: [
      disc(5, 5, 2), disc(5, 19, 2),
      poly([[7, 7], [12, 12]]), poly([[7, 17], [12, 12]]),
      disc(16, 12, 4),
    ],
  },
  {
    slug: "record-link", category: "data", subcategory: "quality",
    name: "Record link", description: "These two rows are the same story",
    tags: ["join", "rings", "pair"], family: "chain",
    aliases: [], keywords: ["record linkage", "linked records"],
    shapes: [disc(8, 12, 5), disc(16, 12, 5)],
  },
  {
    slug: "outlier-remove", category: "data", subcategory: "quality",
    name: "Outlier removal", description: "The one that was never really data",
    tags: ["clean", "drop", "extreme"], family: "figure",
    aliases: [], keywords: ["remove outliers", "drop extreme"],
    shapes: [
      disc(6, 9, 2), disc(11, 12, 2), disc(8, 17, 2),
      disc(18.5, 5, 2),
      poly([[16.5, 9.5], [20.5, 13.5]]), poly([[20.5, 9.5], [16.5, 13.5]]),
    ],
  },
  {
    slug: "normalize-data", category: "data", subcategory: "quality",
    name: "Normalise", description: "Everything into the same band",
    tags: ["scale", "range", "fit"], family: "figure",
    aliases: ["normalise-data"], keywords: ["normalize", "scaling", "0 to 1"],
    shapes: [
      row(5, 3, 21), row(19, 3, 21),
      col(6, 8, 16), col(12, 5, 19), col(18, 11, 16),
    ],
  },
  {
    slug: "schema-pin", category: "data", subcategory: "quality",
    name: "Schema pin", description: "The columns, held still on purpose",
    tags: ["freeze", "contract", "columns"], family: "window",
    aliases: [], keywords: ["pin schema", "schema freeze", "contract"],
    shapes: [
      rect(3, 6, 13, 12, 2), row(10, 3, 16),
      disc(19, 11, 3), col(19, 14, 18),
    ],
  },
  {
    slug: "row-count-check", category: "data", subcategory: "quality",
    name: "Row count check", description: "As many as there were supposed to be",
    tags: ["count", "verify", "rows"], family: "figure",
    aliases: [], keywords: ["row count", "count check"],
    shapes: [
      row(4, 3, 17), row(9, 3, 17), row(14, 3, 17),
      poly([[14.5, 17.5], [17, 20], [21.5, 15.5]]),
    ],
  },

  /* ── rag: search made honest ──────────────────────────────────────────────────── */

  {
    slug: "dimension-reduce", category: "rag", subcategory: "vector",
    name: "Dimension reduce", description: "The same shape, in fewer numbers",
    tags: ["compress", "smaller", "project"], family: "figure",
    aliases: [], keywords: ["dimensionality reduction", "reduce dims"],
    shapes: [
      poly([[13, 4], [17, 8], [10.5, 14.5], [4, 8], [8, 4]]),
      poly([[18.5, 14], [21, 16.5], [17, 20.5], [13, 16.5], [15.5, 14]]),
    ],
  },
  {
    slug: "ann-search", category: "rag", subcategory: "vector",
    name: "ANN search", description: "Close enough, found fast",
    tags: ["approx", "nearest", "fast"], family: "figure",
    aliases: ["approximate-search"], keywords: ["ann", "approximate nearest neighbor"],
    shapes: [
      disc(9, 9, 5), poly([[12.5, 12.5], [16, 16]]),
      poly([[13, 20.5], [16, 17.5], [19, 20.5]]),
    ],
  },
  {
    slug: "exact-search", category: "rag", subcategory: "vector",
    name: "Exact search", description: "Not close — the one",
    tags: ["precise", "equal", "sure"], family: "figure",
    aliases: [], keywords: ["exact search", "exact match"],
    shapes: [
      disc(9, 9, 5), poly([[12.5, 12.5], [16, 16]]),
      row(17.5, 15, 21), row(21, 15, 21),
    ],
  },
  {
    slug: "query-expand", category: "rag", subcategory: "retrieval",
    name: "Query expand", description: "One question becomes several searches",
    tags: ["broaden", "fan", "variants"], family: "figure",
    aliases: [], keywords: ["query expansion", "broaden query"],
    shapes: [
      row(12, 2, 8), poly([[9, 10], [11.5, 12.5], [9, 15]]),
      row(5, 14, 21), row(12, 14, 21), row(19, 14, 21),
    ],
  },
  {
    slug: "hyde", category: "rag", subcategory: "retrieval",
    name: "HyDE", description: "Imagine the answer; search with the ghost",
    tags: ["hypothetical", "embed", "trick"], family: "page",
    aliases: ["hypothetical-document"], keywords: ["hyde", "hypothetical document embedding"],
    shapes: [
      frame(2, 3, 20, 14, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]]),
      poly([[13.5, 6.5], [16, 9], [12, 13], [8, 9], [10.5, 6.5]]),
    ],
  },
  {
    slug: "step-back", category: "rag", subcategory: "retrieval",
    name: "Step back", description: "Ask the bigger question first",
    tags: ["abstract", "zoom-out", "question"], family: "figure",
    aliases: ["step-back-prompting"], keywords: ["step back", "abstraction first"],
    shapes: [
      row(12, 3, 8), poly([[4.5, 9.5], [2, 12], [4.5, 14.5]]),
      arc(15, 8, 4, 180, 90), disc(15, 16.5, 1),
    ],
  },
  {
    slug: "index-warm", category: "rag", subcategory: "vector",
    name: "Warm index", description: "Kept hot so the first query is fast",
    tags: ["ready", "loaded", "heat"], family: "figure",
    aliases: [], keywords: ["warm index", "preloaded index"],
    shapes: [
      row(5, 3, 15), row(10, 3, 15), row(15, 3, 15),
      poly([[18, 8], [20, 6], [18, 4]]), poly([[18, 16], [20, 14], [18, 12]]),
    ],
  },
  {
    slug: "index-merge", category: "rag", subcategory: "vector",
    name: "Index merge", description: "Two shelves become one",
    tags: ["compact", "combine", "segments"], family: "figure",
    aliases: [], keywords: ["merge segments", "index compaction"],
    shapes: [
      row(5, 3, 10), row(9, 3, 10), row(5, 14, 21), row(9, 14, 21),
      col(12, 11.5, 14), row(17, 5, 19),
    ],
  },
  {
    slug: "shard-index", category: "rag", subcategory: "vector",
    name: "Sharded index", description: "The index, cut so many hands can hold it",
    tags: ["split", "pieces", "scale"], family: "figure",
    aliases: [], keywords: ["index sharding", "sharded"],
    shapes: [
      row(6, 3, 9), row(6, 12, 21),
      row(11, 3, 14), row(11, 17, 21),
      row(16, 3, 7), row(16, 10, 21),
    ],
  },
  {
    slug: "prompt-compress", category: "rag", subcategory: "grounding",
    name: "Prompt compress", description: "Fewer tokens; the same ask",
    tags: ["shrink", "tokens", "squeeze"], family: "figure",
    aliases: [], keywords: ["prompt compression", "compress context"],
    shapes: [
      row(10, 6, 18), row(14, 6, 18),
      poly([[9.5, 3], [12, 5.5], [14.5, 3]]), poly([[9.5, 21], [12, 18.5], [14.5, 21]]),
    ],
  },

  /* ── security: the red team's quieter tricks ──────────────────────────────────── */

  {
    slug: "adversarial-example", category: "security", subcategory: "ai-security",
    name: "Adversarial example", description: "Looks the same; classifies as something else",
    tags: ["attack", "image", "noise"], family: "window",
    aliases: [], keywords: ["adversarial example", "perturbed input"],
    shapes: [
      rect(3, 4, 18, 16, 2),
      poly([[5, 16], [10, 11], [13, 14], [17, 10]]),
      disc(7, 8, 1), disc(16.5, 16.5, 1),
    ],
  },
  {
    slug: "backdoor-model", category: "security", subcategory: "ai-security",
    name: "Backdoor", description: "A keyhole nobody was told about",
    tags: ["hidden", "access", "trojan"], family: "machine",
    aliases: [], keywords: ["backdoor", "trojaned model"],
    shapes: [machine(), disc(15, 13, 2), col(15, 15, 17.5)],
  },
  {
    slug: "trigger-phrase", category: "security", subcategory: "ai-security",
    name: "Trigger phrase", description: "Say the words and it changes",
    tags: ["phrase", "activate", "quote"], family: "figure",
    aliases: [], keywords: ["trigger phrase", "activation phrase"],
    shapes: [
      col(6, 4, 7), col(9.5, 4, 7),
      poly([[15, 10], [11, 14], [14, 14], [10, 18]]),
    ],
  },
  {
    slug: "sandbag", category: "security", subcategory: "ai-security",
    name: "Sandbagging", description: "Stronger than it lets on",
    tags: ["hide", "capability", "under"], family: "chart",
    aliases: [], keywords: ["sandbagging", "hidden capability"],
    shapes: [
      col(8, 4, 19), col(16, 13, 19),
      poly([[10.5, 8], [13.5, 11]]),
      row(21.5, 3, 21),
    ],
  },
  {
    slug: "oversight", category: "security", subcategory: "ai-security",
    name: "Oversight", description: "Somebody is actually watching",
    tags: ["eye", "monitor", "watch"], family: "figure",
    aliases: [], keywords: ["oversight", "monitoring", "human eye"],
    shapes: [
      arc(12, 8, 8, 20, 160), arc(12, 16, 8, 200, 340),
      disc(12, 12, 2),
    ],
  },
  {
    slug: "interpretability", category: "security", subcategory: "ai-security",
    name: "Interpretability", description: "The lens finally goes inside",
    tags: ["inspect", "inside", "explain"], family: "machine",
    aliases: [], keywords: ["interpretability", "explainability"],
    shapes: [
      frame(4, 3, 16, 12, 3, { chamfer: 3, gap: 4 }),
      disc(14, 15, 4), poly([[17, 18], [20, 21]]),
    ],
  },
  {
    slug: "probe-safety", category: "security", subcategory: "ai-security",
    name: "Safety probe", description: "A thin question, lowered in",
    tags: ["probe", "test", "inside"], family: "machine",
    aliases: [], keywords: ["safety probe", "linear probe"],
    shapes: [machine(), col(12, 2, 9), disc(12, 11.5, 1)],
  },
  {
    slug: "circuit-break", category: "security", subcategory: "ai-security",
    name: "Circuit breaker", description: "The wire opens before the damage does",
    tags: ["stop", "open", "cut"], family: "figure",
    aliases: ["circuit-breaker"], keywords: ["circuit breaker", "trip", "cutoff"],
    shapes: [
      row(16, 2, 8.5), row(16, 15.5, 22),
      poly([[8.5, 16], [16.5, 8]]),
    ],
  },
  {
    slug: "watermark-ai", category: "security", subcategory: "ai-security",
    name: "Watermark", description: "Signed invisibly, in the words themselves",
    tags: ["mark", "hidden", "provenance"], family: "page",
    aliases: [], keywords: ["watermarking", "text watermark", "provenance"],
    shapes: [
      page(),
      poly([[8, 11], [10, 9], [12, 11], [14, 9], [16, 11]]),
      poly([[8, 16], [10, 14], [12, 16], [14, 14], [16, 16]]),
    ],
  },
  {
    slug: "detect-ai-text", category: "security", subcategory: "ai-security",
    name: "Detect AI text", description: "Reading for the machine's accent",
    tags: ["classifier", "detect", "text"], family: "figure",
    aliases: [], keywords: ["ai text detection", "generated text"],
    shapes: [
      row(5, 3, 21), row(10, 3, 21), row(15, 3, 12),
      disc(16.5, 16, 4), poly([[19.5, 19], [21.5, 21]]),
    ],
  },
];
