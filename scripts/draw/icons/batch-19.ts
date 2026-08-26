/**
 * Batch 19 — measuring, guarding, and the shapes that come in pairs.
 *
 * `memory-read` and `memory-write` are `memory`'s panel with the same two columns and an
 * arrow pointing opposite ways. `keyword-search` and `hybrid-search` share `search`'s lens
 * and differ by what is behind it. The pattern is now the set's normal way of working: one
 * body, one thing changed, and the reader does the rest.
 */
import { arc, body, col, disc, frame, poly, rect, row } from "../forms.ts";
import { panel } from "../bodies.ts";
import { SMALL, add } from "../marks.ts";
import type { Icon } from "../build.ts";

/** The chamfered field `mcp-prompt` is built on, so its family cannot drift from it. */
const promptPanel = () => frame(3, 6, 18, 12, 3, { chamfer: 5, gap: 5 });

/** `search`'s lens and handle, at the coordinates every search icon in the set uses. */
const lens = () => [arc(10, 10, 7, 292, 248), poly([[15, 15], [21, 21]])];

export const BATCH_19: Icon[] = [
  /* ── MCP prompts ──────────────────────────────────────────────────────────────── */

  {
    slug: "mcp-prompt-add", category: "mcp", subcategory: "prompt",
    name: "MCP prompt add", description: "Offer another prompt template",
    tags: ["new", "expose", "register"], family: "window",
    aliases: [], keywords: ["new template", "register prompt", "publish", "expose"],
    // A unit below the canvas centre: the chamfer eats the panel's top left, and a mark on
    // the centre comes within three of the cut.
    shapes: [promptPanel(), ...add(SMALL, 13)],
  },
  {
    slug: "mcp-prompt-list", category: "mcp", subcategory: "prompt",
    name: "MCP prompt list", description: "Every template this server provides",
    tags: ["catalogue", "available", "index"], family: "window",
    aliases: [], keywords: ["available prompts", "slash commands", "catalog", "menu"],
    shapes: [
      body(poly([[16, 4], [11, 4], [7, 8], [7, 14], [17, 14], [17, 5]])),
      body(poly([[19, 10], [14, 10], [10, 14], [10, 20], [20, 20], [20, 11]])),
    ],
  },

  /* ── Memory, in two directions ────────────────────────────────────────────────── */

  {
    slug: "memory-read", category: "agents", subcategory: "memory",
    name: "Memory read", description: "Fetch what was stored",
    tags: ["recall", "load", "get"], family: "window",
    aliases: [], keywords: ["load", "retrieve", "fetch state", "lookup", "recall"],
    shapes: [panel(), col(9, 9, 15), col(13, 9, 15), poly([[16, 10], [18, 12], [16, 14]])],
  },
  {
    slug: "memory-write", category: "agents", subcategory: "memory",
    name: "Memory write", description: "Put something away for later",
    tags: ["store", "save", "commit"], family: "window",
    aliases: [], keywords: ["persist", "save state", "record", "commit"],
    shapes: [panel(), col(9, 9, 15), col(13, 9, 15), poly([[18, 10], [16, 12], [18, 14]])],
  },

  /* ── Searching, two more ways ─────────────────────────────────────────────────── */

  {
    slug: "keyword-search", category: "rag", subcategory: "retrieval",
    name: "Keyword search", description: "Find the words themselves",
    tags: ["literal", "exact", "text"], family: "magnifier",
    aliases: ["full-text"], keywords: ["bm25", "lexical", "exact match", "grep", "tf-idf"],
    // Two lines behind the lens: the text itself. `zoom-out` has one line there and means
    // something else entirely, which is why this has two rather than one.
    shapes: [...lens(), row(8, 7, 13), row(12, 7, 13)],
  },
  {
    slug: "hybrid-search", category: "rag", subcategory: "retrieval",
    name: "Hybrid search", description: "Words and meaning together",
    tags: ["combined", "fusion", "both"], family: "magnifier",
    aliases: [], keywords: ["rrf", "fusion", "lexical plus vector", "combined", "rerank"],
    // `keyword-search`'s line and `semantic-search`'s diamond, in the same lens. The whole
    // concept is that it is both, so the drawing is literally both.
    shapes: [
      ...lens(), poly([[10, 6], [13, 9], [10, 12], [7, 9]], true), row(14, 7, 13),
    ],
  },

  /* ── Charts ───────────────────────────────────────────────────────────────────── */

  {
    slug: "histogram", category: "analytics", subcategory: "chart",
    name: "Histogram", description: "How the values are spread",
    tags: ["distribution", "bins", "spread"], family: "axes",
    aliases: ["distribution"], keywords: ["bins", "frequency", "spread", "normal", "buckets"],
    // Rises and falls. `chart-bar` compares three separate things; a histogram is one thing
    // measured across a range, so the bars have a shape between them.
    shapes: [
      col(4, 12, 20), col(8, 7, 20), col(12, 4, 20), col(16, 9, 20), col(20, 14, 20),
      row(20, 3, 21),
    ],
  },
  {
    slug: "chart-donut", category: "analytics", subcategory: "chart",
    name: "Donut chart", description: "Parts of a whole, with the middle free",
    tags: ["ring", "share", "proportion"], family: "orbit",
    aliases: ["donut"], keywords: ["proportion", "share", "ring chart", "breakdown"],
    // The cut runs from the outer rim to the inner one and stops. `chart-pie`'s two cuts
    // meet at the centre because a pie has one; a donut's hole is where a number goes.
    shapes: [disc(12, 12, 9), disc(12, 12, 4), col(12, 3, 8)],
  },
  {
    slug: "flamegraph", category: "devops", subcategory: "observability",
    name: "Flame graph", description: "Where the time actually went",
    tags: ["profile", "stack", "cpu"], family: "rails",
    aliases: ["profile"], keywords: ["profiler", "stack", "cpu time", "hot path", "perf"],
    // Wide at the top and narrowing down, because a flame graph is read from the root.
    // `trace` staggers its bars sideways instead, because a trace is read across time.
    shapes: [rect(2, 3, 20, 4, 2), rect(2, 10, 12, 4, 2), rect(6, 17, 10, 4, 2)],
  },

  /* ── Ways in, and ways not in ─────────────────────────────────────────────────── */

  {
    slug: "gateway", category: "cloud", subcategory: "network",
    name: "Gateway", description: "The one way in",
    tags: ["entry", "door", "ingress"], family: "window",
    aliases: ["ingress"], keywords: ["api gateway", "entry point", "proxy", "ingress", "door"],
    shapes: [
      frame(2, 4, 14, 16, 3, { gap: 3 }), row(12, 2, 22),
      poly([[18, 8], [22, 12], [18, 16]]),
    ],
  },
  {
    slug: "intrusion", category: "security", subcategory: "threat",
    name: "Intrusion", description: "Something got through",
    tags: ["breach", "attack", "unauthorised"], family: "rails",
    aliases: [], keywords: ["breach", "unauthorised access", "attack", "compromise"],
    // The arrow crosses both walls. `gateway` sends its arrow through a door; this one goes
    // through the wall, and the difference between the two drawings is the whole idea.
    shapes: [
      col(6, 3, 21), col(18, 3, 21), row(12, 2, 13), poly([[10, 9], [13, 12], [10, 15]]),
    ],
  },
  {
    slug: "redact", category: "security", subcategory: "compliance",
    name: "Redact", description: "Blacked out",
    tags: ["hide", "censor", "mask"], family: "rails",
    aliases: ["censor"], keywords: ["mask", "pii", "anonymise", "black bar", "obscure"],
    // A line of text with the middle one covered rather than removed. Removed, the drawing
    // is two lines and a gap; covered, something is plainly being kept from you.
    shapes: [row(6, 4, 20), rect(4, 10, 12, 4, 2), row(18, 4, 20)],
  },

  /* ── Multimodal ───────────────────────────────────────────────────────────────── */

  {
    slug: "speech-to-text", category: "ai", subcategory: "multimodal",
    name: "Speech to text", description: "What was said, written down",
    tags: ["transcribe", "voice", "dictate"], family: "figure",
    aliases: ["transcribe"], keywords: ["asr", "whisper", "dictation", "captions", "voice input"],
    shapes: [
      rect(4, 4, 6, 10, 3), arc(7, 13, 4, 0, 180),
      row(9, 14, 21), row(14, 14, 21), row(19, 14, 18),
    ],
  },
  {
    slug: "image-gen", category: "ai", subcategory: "multimodal",
    name: "Image generation", description: "A picture made rather than taken",
    tags: ["generate", "diffusion", "create"], family: "window",
    aliases: [], keywords: ["diffusion", "text to image", "midjourney", "render", "create"],
    // `image`'s frame and horizon with the sun replaced by a diamond. The sun means a
    // photograph of something; the diamond is this set's mark for a thing computed.
    shapes: [
      frame(3, 4, 18, 16, 3, { gap: 4 }),
      poly([[6, 17], [10, 13], [14, 17], [19, 12]]),
      poly([[8, 8], [10, 10], [8, 12], [6, 10]], true),
    ],
  },
  {
    slug: "caption", category: "interface", subcategory: "media",
    name: "Caption", description: "Words over the picture",
    tags: ["subtitle", "text", "overlay"], family: "window",
    aliases: ["subtitle"], keywords: ["subtitles", "cc", "closed captions", "overlay", "srt"],
    shapes: [frame(2, 4, 20, 16, 3, { gap: 4 }), row(13, 6, 18), row(16.5, 6, 13)],
  },

  /* ── Two more ─────────────────────────────────────────────────────────────────── */

  {
    slug: "switch-case", category: "automation", subcategory: "condition",
    name: "Switch", description: "Many ways out, not two",
    tags: ["branch", "cases", "route"], family: "lattice",
    aliases: [], keywords: ["case", "match", "route", "dispatch", "when"],
    // `condition` has two exits because a condition is yes or no. Three is the smallest
    // number that says "and others", which is what a switch is for.
    shapes: [
      poly([[12, 4], [18, 10], [12, 16], [6, 10]], true),
      row(10, 18, 21), row(10, 3, 6), col(12, 16, 20),
    ],
  },
  {
    slug: "distil", category: "ai", subcategory: "training",
    name: "Distillation", description: "A smaller model taught by a bigger one",
    tags: ["compress", "teacher", "student"], family: "machine",
    aliases: ["distillation"], keywords: ["teacher student", "compress", "shrink model", "kd"],
    shapes: [rect(2, 3, 9, 9, 2), poly([[11, 12], [14, 15]]), rect(14, 13, 8, 8, 2)],
  },
  {
    slug: "bias", category: "ai", subcategory: "safety",
    name: "Bias", description: "The scales are not even",
    tags: ["fairness", "skew", "balance"], family: "figure",
    aliases: [], keywords: ["fairness", "skew", "imbalance", "representation", "ethics"],
    // A balance, drawn level. Tilting it would say more, and every tilt available here is
    // 45° — which is not a lean, it is a collapse.
    shapes: [
      row(7, 3, 21), arc(6, 7, 3, 0, 180), arc(18, 7, 3, 0, 180),
      col(12, 7, 19), row(19, 8, 16),
    ],
  },
];
