/**
 * Batch 64 — round 13 of the 1k plan: the screen's furniture, the type
 * system's manners, features and their leaks, retrieval's last seats, and
 * compliance's paperwork.
 *
 * The rag list is nearly spent — its dead concepts stayed dead — so this round
 * leans wider on interface and devtools. Dropped on sight: dock-left/right are
 * the pane trio, pane-float is picture-in-picture, session-record is
 * macro-record, eval-dangerous is probe-safety's exact drawing, containment as
 * a boxed agent is agent-sandbox. content-freshness exists; sla-freshness
 * takes the seat.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { folder, machine, page, shield } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_64: Icon[] = [
  /* ── interface: the screen's furniture ────────────────────────────────────────── */

  {
    slug: "bookmark-folder", category: "interface", subcategory: "file",
    name: "Bookmark folder", description: "A bookmark folder — where the saved pages and flagged items live together",
    tags: ["saved", "folder", "flag"], family: "window",
    aliases: ["folder-bookmark"], keywords: ["bookmark folder", "saved items"],
    shapes: [folder(), poly([[10, 10], [14, 10], [14, 17], [12, 15], [10, 17]], true)],
  },
  {
    slug: "picture-in-picture", category: "interface", subcategory: "layout",
    name: "Picture in picture", description: "Picture in picture — the small video window that follows you around the screen",
    tags: ["pip", "overlay", "corner"], family: "window",
    aliases: ["pip"], keywords: ["picture in picture", "floating window"],
    shapes: [rect(2, 4, 20, 16, 2), rect(12, 12.5, 7, 4.5, 2.25)],
  },
  {
    slug: "kiosk", category: "interface", subcategory: "layout",
    name: "Kiosk", description: "Kiosk mode — one app standing alone on a public display in a lobby",
    tags: ["display", "stand", "public"], family: "window",
    aliases: ["kiosk-mode"], keywords: ["kiosk", "fullscreen display"],
    shapes: [rect(4, 3, 16, 12, 2), col(12, 15, 18), row(18, 8, 16)],
  },
  {
    slug: "presenter", category: "interface", subcategory: "communication",
    name: "Presenter", description: "Presenter — the person beside the board giving the talk to the room",
    tags: ["present", "talk", "board"], family: "figure",
    aliases: ["presentation-mode"], keywords: ["presenter", "presentation"],
    shapes: [
      rect(3, 5, 13, 12, 2),
      disc(18.5, 10, 2), arc(18.5, 17, 3.5, 180, 360),
    ],
  },
  {
    slug: "laser-pointer", category: "interface", subcategory: "communication",
    name: "Laser pointer", description: "A laser pointer — the dot everyone's eyes follow across the slide",
    tags: ["point", "beam", "dot"], family: "figure",
    aliases: [], keywords: ["laser pointer", "pointer dot"],
    shapes: [rect(2, 17, 6.5, 4, 2), poly([[9, 16.5], [16, 9.5]]), disc(18.5, 7, 1)],
  },
  {
    slug: "annotate-screen", category: "interface", subcategory: "communication",
    name: "Annotate screen", description: "Annotate screen — drawn over the screen, not typed into it, markup on top",
    tags: ["draw", "markup", "over"], family: "window",
    aliases: ["screen-annotation"], keywords: ["annotate screen", "draw on screen"],
    shapes: [
      rect(2, 4, 20, 16, 2),
      poly([[6, 15], [9, 12], [12, 15], [15, 12], [18, 15]]),
    ],
  },
  {
    slug: "highlighter", category: "interface", subcategory: "action",
    name: "Highlighter", description: "A highlighter — the line that suddenly matters, marked for emphasis",
    tags: ["mark", "pen", "emphasis"], family: "figure",
    aliases: [], keywords: ["highlighter", "highlight text"],
    shapes: [
      poly([[11, 11], [14, 8], [16, 10], [13, 13]], true),
      poly([[14, 8], [18, 4]]),
      row(17, 3, 12),
    ],
  },
  {
    slug: "color-sample", category: "interface", subcategory: "action",
    name: "Colour sample", description: "Colour sample — that exact shade lifted off the page with an eyedropper",
    tags: ["eyedropper", "pick", "shade"], family: "figure",
    aliases: ["eyedrop"], keywords: ["eyedropper", "color picker", "sample"],
    shapes: [
      poly([[13, 4], [19, 10]]),
      poly([[9, 14], [13, 10], [16, 13], [12, 17]], true),
      disc(6, 19, 2),
    ],
  },
  {
    slug: "layer-up", category: "interface", subcategory: "layout",
    name: "Layer up", description: "Layer up — bring an object nearer the eye, raised in the stacking order",
    tags: ["stack", "raise", "order"], family: "figure",
    aliases: ["bring-forward"], keywords: ["layer up", "bring forward"],
    shapes: [
      col(12, 4, 8.5), poly([[9.5, 4.5], [12, 2], [14.5, 4.5]]),
      rect(4, 10.5, 16, 4, 2), rect(4, 17.5, 16, 4, 2),
    ],
  },
  {
    slug: "layer-down", category: "interface", subcategory: "layout",
    name: "Layer down", description: "Layer down — send an object toward the paper, lowered in the stacking order",
    tags: ["stack", "lower", "order"], family: "figure",
    aliases: ["send-backward"], keywords: ["layer down", "send backward"],
    shapes: [
      rect(4, 2.5, 16, 4, 2), rect(4, 9.5, 16, 4, 2),
      col(12, 15.5, 20), poly([[9.5, 19.5], [12, 22], [14.5, 19.5]]),
    ],
  },
  {
    slug: "banner-dismiss", category: "interface", subcategory: "state",
    name: "Dismiss banner", description: "Dismiss banner — understood, now close the notice bar and get it out of the way",
    tags: ["close", "notice", "bar"], family: "window",
    aliases: [], keywords: ["dismiss banner", "close notice"],
    shapes: [
      rect(2, 8, 20, 8, 2), row(12, 5, 11),
      poly([[15, 10], [19, 14]]), poly([[19, 10], [15, 14]]),
    ],
  },
  {
    slug: "inline-alert", category: "interface", subcategory: "state",
    name: "Inline alert", description: "An inline alert — a warning that sits inside the flow of the page",
    tags: ["notice", "warning", "bar"], family: "window",
    aliases: [], keywords: ["inline alert", "callout"],
    shapes: [
      rect(2, 8, 20, 8, 2),
      col(6, 10, 12.5), disc(6, 14.5, 1), row(12, 10, 18),
    ],
  },

  /* ── devtools: the type system's manners ──────────────────────────────────────── */

  {
    slug: "type-error", category: "devtools", subcategory: "code",
    name: "Type error", description: "A type error — the shape you promised was not the shape you sent",
    tags: ["types", "mismatch", "alert"], family: "figure",
    aliases: [], keywords: ["type error", "type mismatch"],
    shapes: [
      poly([[7, 7], [4.5, 9.5], [7, 12]]), poly([[17, 7], [19.5, 9.5], [17, 12]]),
      col(12, 6, 10.5), disc(12, 13.5, 1),
    ],
  },
  {
    slug: "union-type", category: "devtools", subcategory: "code",
    name: "Union type", description: "A union type — it is this or it is that, either of two types",
    tags: ["types", "or", "either"], family: "figure",
    aliases: [], keywords: ["union type", "either or"],
    shapes: [disc(6, 12, 3), col(12, 7, 17), rect(15.5, 8.5, 6.5, 7, 2)],
  },
  {
    slug: "generic-type", category: "devtools", subcategory: "code",
    name: "Generic", description: "A generic — code that works for whatever type you put in the angle brackets",
    tags: ["types", "template", "any"], family: "window",
    aliases: [], keywords: ["generics", "type parameter"],
    shapes: [
      rect(4, 4, 16, 16, 2),
      poly([[10, 9.5], [8, 11.5], [10, 13.5]]), poly([[14, 9.5], [16, 11.5], [14, 13.5]]),
    ],
  },
  {
    slug: "nullable", category: "devtools", subcategory: "code",
    name: "Nullable", description: "Nullable — there might be nothing in this box, an optional value",
    tags: ["maybe", "null", "optional"], family: "window",
    aliases: ["optional-type"], keywords: ["nullable", "optional"],
    shapes: [
      rect(4, 4, 16, 16, 2),
      arc(12, 10, 2.5, 180, 90), disc(12, 16, 1),
    ],
  },
  {
    slug: "assert-check", category: "devtools", subcategory: "testing",
    name: "Assert", description: "Assert — if this is false, everything stops, an invariant that must hold",
    tags: ["invariant", "check", "must"], family: "figure",
    aliases: [], keywords: ["assertion", "assert", "invariant check"],
    shapes: [
      poly([[7.5, 4], [5, 4], [5, 20], [7.5, 20]]),
      poly([[16.5, 4], [19, 4], [19, 20], [16.5, 20]]),
      poly([[8.5, 12], [11, 14.5], [16, 9.5]]),
    ],
  },
  {
    slug: "stub-tool", category: "devtools", subcategory: "testing",
    name: "Stub", description: "A stub — looks like the tool but does nothing, a hollow stand-in for tests",
    tags: ["fake", "test", "hollow"], family: "figure",
    aliases: [], keywords: ["stub", "test stub", "fake dependency"],
    shapes: [rect(6, 11, 12, 8, 2), col(9, 5, 8), col(15, 5, 8)],
  },
  {
    slug: "heap-snapshot", category: "devtools", subcategory: "debug",
    name: "Heap snapshot", description: "A heap snapshot — the memory photographed mid-thought to find what is holding on",
    tags: ["memory", "capture", "camera"], family: "window",
    aliases: [], keywords: ["heap snapshot", "memory snapshot"],
    shapes: [
      rect(8, 2, 8, 3, 1.5),
      rect(3, 8, 18, 12, 2), disc(12, 14, 4), disc(12, 14, 1),
    ],
  },
  {
    slug: "microtask", category: "devtools", subcategory: "code",
    name: "Microtask", description: "A microtask — the little jobs that cut in line ahead of the next event-loop turn",
    tags: ["queue", "tiny", "loop"], family: "figure",
    aliases: [], keywords: ["microtask", "event loop tasks"],
    shapes: [
      disc(12, 12, 5),
      disc(5, 5, 1), disc(19, 5, 1), disc(5, 19, 1), disc(19, 19, 1),
    ],
  },
  {
    slug: "span-tool", category: "devtools", subcategory: "api",
    name: "Span", description: "A span — how long each piece of a request actually took, one bar in a trace waterfall",
    tags: ["trace", "timing", "waterfall"], family: "chart",
    aliases: [], keywords: ["span", "trace waterfall"],
    shapes: [row(5, 3, 12), row(11, 7, 18), row(17, 10, 21)],
  },
  {
    slug: "language-server", category: "devtools", subcategory: "editor",
    name: "Language server", description: "A language server — the LSP process that knows what your code means and tells the editor",
    tags: ["lsp", "editor", "smart"], family: "window",
    aliases: ["lsp"], keywords: ["language server", "lsp"],
    shapes: [
      rect(3, 4, 18, 12, 2),
      poly([[8, 7], [5.5, 9.5], [8, 12]]), poly([[16, 7], [18.5, 9.5], [16, 12]]),
      col(9, 16, 19.5), col(15, 16, 19.5),
    ],
  },
  {
    slug: "type-infer", category: "devtools", subcategory: "code",
    name: "Type inference", description: "Type inference — the type is unwritten but known anyway, deduced automatically",
    tags: ["types", "deduce", "auto"], family: "figure",
    aliases: [], keywords: ["type inference", "inferred type"],
    shapes: [
      poly([[8.5, 3], [3.5, 8], [8.5, 13]]), poly([[15.5, 3], [20.5, 8], [15.5, 13]]),
      row(17, 8, 16), row(21, 8, 16),
    ],
  },
  {
    slug: "test-double", category: "devtools", subcategory: "testing",
    name: "Test double", description: "A test double — the understudy that takes the stage in place of a real dependency",
    tags: ["mock", "fake", "shadow"], family: "figure",
    aliases: ["mock-double"], keywords: ["test double", "mock"],
    shapes: [
      poly([[4, 5], [11, 12], [4, 19]], true),
      poly([[12, 5], [19, 12], [12, 19]]),
    ],
  },

  /* ── data: features and their leaks ───────────────────────────────────────────── */

  {
    slug: "one-hot", category: "data", subcategory: "quality",
    name: "One-hot", description: "One-hot encoding — a vector of all zeros with a single one marking the category",
    tags: ["encoding", "vector", "single"], family: "figure",
    aliases: ["one-hot-encoding"], keywords: ["one hot", "categorical encoding"],
    shapes: [disc(5, 12, 2), col(11, 6, 18), disc(17, 12, 2)],
  },
  {
    slug: "feature", category: "data", subcategory: "quality",
    name: "Feature", description: "A feature — the column of input a model actually reads as a signal",
    tags: ["column", "input", "signal"], family: "window",
    aliases: [], keywords: ["feature", "model input column"],
    shapes: [
      rect(3, 4, 18, 16, 2), col(9, 4, 20), col(15, 4, 20),
      disc(6, 9, 1), disc(6, 15, 1),
    ],
  },
  {
    slug: "feature-cross", category: "data", subcategory: "quality",
    name: "Feature cross", description: "A feature cross — two columns multiplied into a third to capture their interaction",
    tags: ["combine", "interaction", "columns"], family: "figure",
    aliases: [], keywords: ["feature cross", "interaction term"],
    shapes: [
      col(5, 4, 20), col(19, 4, 20),
      poly([[9.5, 9.5], [14.5, 14.5]]), poly([[14.5, 9.5], [9.5, 14.5]]),
    ],
  },
  {
    slug: "feature-drift", category: "data", subcategory: "quality",
    name: "Feature drift", description: "Feature drift — a column that is no longer what it was in March, its distribution wandered",
    tags: ["shift", "change", "wander"], family: "figure",
    aliases: [], keywords: ["feature drift", "input drift"],
    shapes: [
      col(6, 4, 20),
      poly([[10, 9], [13, 12], [16, 9], [19, 12]]),
    ],
  },
  {
    slug: "target-leak", category: "data", subcategory: "quality",
    name: "Target leak", description: "Target leakage — the answer key fell into the training set and the model cheated",
    tags: ["leak", "cheat", "target"], family: "figure",
    aliases: ["label-leak"], keywords: ["target leakage", "data leakage"],
    shapes: [
      disc(12, 9, 6), disc(12, 9, 2),
      col(12, 17.5, 20), col(9, 19, 21.5),
    ],
  },
  {
    slug: "distribution-shift", category: "data", subcategory: "quality",
    name: "Distribution shift", description: "Distribution shift — the world moved and the data followed, so the curve is not where it was",
    tags: ["shift", "curve", "moved"], family: "chart",
    aliases: [], keywords: ["distribution shift", "covariate shift"],
    shapes: [
      arc(7, 16, 4, 180, 0), arc(17, 12, 4, 180, 0),
      poly([[10.5, 13.5], [13.5, 10.5]]),
    ],
  },
  {
    slug: "parquet", category: "data", subcategory: "catalog",
    name: "Parquet", description: "Parquet — the columnar file format that stores data by column, not by row",
    tags: ["columnar", "file", "format"], family: "page",
    aliases: ["columnar-file"], keywords: ["parquet", "columnar format"],
    shapes: [page(), col(9, 7, 12), col(12, 7, 14), col(15, 7, 10)],
  },
  {
    slug: "delta-table", category: "data", subcategory: "catalog",
    name: "Delta table", description: "A Delta table — a lakehouse table that remembers every change as a version",
    tags: ["delta", "versioned", "lake"], family: "figure",
    aliases: [], keywords: ["delta table", "delta lake"],
    shapes: [
      poly([[12, 4], [16.5, 8.5], [7.5, 8.5]], true),
      row(13.5, 4, 20), row(18, 4, 20),
    ],
  },
  {
    slug: "iceberg-table", category: "data", subcategory: "catalog",
    name: "Iceberg", description: "An Iceberg table — most of the table's metadata sits under the waterline, an open table format",
    tags: ["iceberg", "hidden", "lake"], family: "figure",
    aliases: [], keywords: ["iceberg table", "apache iceberg"],
    shapes: [
      poly([[12, 4.5], [14.5, 7], [9.5, 7]], true),
      row(10, 3, 21),
      poly([[7, 13], [17, 13], [12, 18]], true),
    ],
  },
  {
    slug: "compaction", category: "data", subcategory: "catalog",
    name: "Compaction", description: "Compaction — a thousand small files merged into one, crumbs into a loaf",
    tags: ["merge", "files", "squash"], family: "figure",
    aliases: [], keywords: ["compaction", "small files problem"],
    shapes: [
      disc(6, 5, 1), disc(12, 5, 1), disc(18, 5, 1),
      poly([[9.5, 8.5], [12, 11], [14.5, 8.5]]),
      rect(6, 14.5, 12, 5, 2.5),
    ],
  },

  /* ── rag: the last seats ──────────────────────────────────────────────────────── */

  {
    slug: "diversity-mmr", category: "rag", subcategory: "ranking",
    name: "Diversity", description: "Diversity — results picked for being unlike the rest, spread by MMR",
    tags: ["mmr", "varied", "spread"], family: "figure",
    aliases: [], keywords: ["mmr", "diversity reranking"],
    shapes: [
      disc(6, 7, 2), disc(9, 10, 2), disc(6, 13, 2),
      disc(17, 16, 2), disc(17, 16, 4),
    ],
  },
  {
    slug: "context-recall", category: "rag", subcategory: "grounding",
    name: "Context recall", description: "Context recall — did retrieval fetch everything that mattered for the answer?",
    tags: ["complete", "found", "checks"], family: "figure",
    aliases: [], keywords: ["context recall", "retrieval recall"],
    shapes: [
      row(5, 3, 14), row(11, 3, 14), row(17, 3, 14),
      poly([[16, 5.5], [18, 7.5], [21, 4.5]]),
      poly([[16, 11.5], [18, 13.5], [21, 10.5]]),
      poly([[16, 17.5], [18, 19.5], [21, 16.5]]),
    ],
  },
  {
    slug: "agentic-rag", category: "rag", subcategory: "retrieval",
    name: "Agentic RAG", description: "Agentic RAG — the agent decides what to look up next in a retrieval loop",
    tags: ["agent", "search", "loop"], family: "ring",
    aliases: [], keywords: ["agentic rag", "agent retrieval"],
    // The figure and, where agent-search holds a lens, the retrieval loop: the agent goes
    // round again with what it found at the centre. The lens made it agent-search exactly.
    shapes: [
      arc(7, 7, 4, 295, 245),
      arc(15.5, 15.5, 4, 270, 180), poly([[11.5, 12.5], [11.5, 15.5], [14.5, 15.5]]), disc(15.5, 15.5, 1),
    ],
  },
  {
    slug: "eval-rag", category: "rag", subcategory: "grounding",
    name: "RAG eval", description: "RAG eval — grading the retrieval as well as the answer it produced",
    tags: ["grade", "check", "search"], family: "figure",
    aliases: ["rag-eval"], keywords: ["rag evaluation", "retrieval eval"],
    shapes: [
      disc(9, 9, 5), poly([[12.5, 12.5], [16, 16]]),
      poly([[13, 17], [15.5, 19.5], [20, 15]]),
    ],
  },
  {
    slug: "sla-freshness", category: "rag", subcategory: "ingestion",
    name: "Freshness", description: "Freshness SLA — how old is the newest thing the system knows, an age limit on the clock",
    tags: ["age", "stale", "clock"], family: "page",
    aliases: ["freshness-sla"], keywords: ["freshness", "stale docs"],
    shapes: [row(5, 3, 21), row(10, 3, 12), disc(16, 15, 4.5), col(16, 12, 15), row(15, 16, 19)],
  },

  /* ── security: compliance's paperwork ─────────────────────────────────────────── */

  {
    slug: "capability-eval", category: "security", subcategory: "ai-security",
    name: "Capability eval", description: "A capability eval — measure what a model can do, and how dangerous, before release",
    tags: ["measure", "danger", "bars"], family: "shield",
    aliases: [], keywords: ["capability evaluation", "dangerous capabilities"],
    shapes: [shield(), col(9, 9, 14), col(12, 7, 14), col(15, 11, 14)],
  },
  {
    slug: "misuse", category: "security", subcategory: "ai-security",
    name: "Misuse", description: "Misuse — the right tool in the wrong hands, abuse of a capability",
    tags: ["abuse", "tool", "slash"], family: "figure",
    aliases: [], keywords: ["misuse", "abuse of tools"],
    shapes: [
      rect(6, 11, 12, 9, 2), col(9, 5, 11), col(15, 5, 11),
      poly([[4, 20], [20, 4]]),
    ],
  },
  {
    slug: "dual-use", category: "security", subcategory: "ai-security",
    name: "Dual use", description: "Dual use — a capability that cures with one edge and cuts with the other",
    tags: ["both", "tool", "edges"], family: "figure",
    aliases: [], keywords: ["dual use", "two edges"],
    shapes: [
      rect(6, 13, 12, 8, 2), col(9, 10, 13), col(15, 10, 13),
      poly([[6, 3.5], [3.5, 6], [6, 8.5]]), poly([[18, 3.5], [20.5, 6], [18, 8.5]]),
    ],
  },
  {
    slug: "export-control", category: "security", subcategory: "ai-security",
    name: "Export control", description: "Export control — a model or a chip that may not cross the border, restricted",
    tags: ["restrict", "border", "wall"], family: "figure",
    aliases: [], keywords: ["export control", "restricted"],
    shapes: [rect(3, 8, 10, 12, 2), row(12, 14, 16.5), col(19.5, 4, 20)],
  },
  {
    slug: "deepfake-detect", category: "security", subcategory: "ai-security",
    name: "Deepfake detect", description: "Deepfake detection — spotting the face that never had a body, a synthetic image caught",
    tags: ["face", "fake", "lens"], family: "figure",
    aliases: [], keywords: ["deepfake detection", "synthetic face"],
    shapes: [
      disc(9, 10, 6), disc(7, 9, 1), disc(11, 9, 1),
      disc(16.5, 16.5, 4), poly([[19.5, 19.5], [21.5, 21.5]]),
    ],
  },
  {
    slug: "content-credential", category: "security", subcategory: "ai-security",
    name: "Content credential", description: "A content credential — the page carries its own birth certificate, C2PA provenance",
    tags: ["c2pa", "provenance", "seal"], family: "page",
    aliases: ["c2pa-credential"], keywords: ["content credentials", "c2pa", "provenance"],
    shapes: [
      page(),
      disc(12, 11, 4), poly([[9.5, 11], [11.5, 13], [15, 9.5]]),
    ],
  },
  {
    slug: "just-in-time-access", category: "security", subcategory: "auth",
    name: "Just-in-time access", description: "Just-in-time access — the key exists only for the hour it is needed",
    tags: ["temporary", "key", "clock"], family: "figure",
    aliases: ["jit-access"], keywords: ["jit access", "temporary elevation"],
    shapes: [
      disc(8, 8, 4), col(8, 5.5, 8), row(8, 8, 10.5),
      disc(15, 17, 2), row(17, 17, 21.5), col(20, 17, 19.5),
    ],
  },
  {
    slug: "user-consent", category: "security", subcategory: "auth",
    name: "User consent", description: "User consent — asked first, and the person said yes before anything happened",
    tags: ["person", "yes", "agree"], family: "figure",
    aliases: [], keywords: ["consent", "user agreement"],
    shapes: [
      disc(8, 8, 2), arc(8, 15, 4, 180, 360),
      poly([[14, 13], [16, 15], [19.5, 11.5]]),
    ],
  },
  {
    slug: "data-residency", category: "security", subcategory: "auth",
    name: "Data residency", description: "Data residency — the data lives in this region by law and may not leave it",
    tags: ["region", "pin", "law"], family: "figure",
    aliases: [], keywords: ["data residency", "sovereignty"],
    shapes: [
      disc(10, 10, 6), row(10, 5, 15),
      disc(18, 15, 3), col(18, 18, 21),
    ],
  },
  {
    slug: "legal-hold", category: "security", subcategory: "auth",
    name: "Legal hold", description: "A legal hold — nothing here may be deleted, frozen by court order",
    tags: ["freeze", "litigation", "pause"], family: "page",
    aliases: [], keywords: ["legal hold", "litigation hold"],
    shapes: [page(), col(10, 8, 16), col(14, 8, 16)],
  },
  {
    slug: "virtual-patch", category: "security", subcategory: "ai-security",
    name: "Virtual patch", description: "A virtual patch — armour over the hole until the real fix lands",
    tags: ["shield", "patch", "interim"], family: "shield",
    aliases: [], keywords: ["virtual patch", "waf rule"],
    shapes: [shield(), rect(9, 9, 6.5, 4, 2)],
  },
];
