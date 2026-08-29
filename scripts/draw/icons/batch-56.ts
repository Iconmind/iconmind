/**
 * Batch 56 — round 5 of the 1k plan, the first double round: the dataset's
 * anatomy, and retrieval's chunks and embeddings.
 *
 * Swaps, all for the same reason as ever — the picture already exists:
 * knowledge-corpus IS corpus, pdf-parse IS document-parse, and the three split
 * variants (header/semantic/sentence) collapse into document-split at 24px, as
 * do train-split/test-split into dataset-split's own 80/20 drawing and
 * upsample/downsample into a direction nobody can read. The embedding token here
 * is a small lattice — the diamond belongs to the model.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { cycle } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_56: Icon[] = [
  /* ── data: the dataset's anatomy ──────────────────────────────────────────────── */

  {
    slug: "dataset-card", category: "data", subcategory: "quality",
    name: "Dataset card", description: "What this data is, on one page",
    tags: ["docs", "sheet", "provenance"], family: "page",
    aliases: [], keywords: ["dataset card", "datasheet", "documentation", "provenance"],
    // `model-card`'s page with a small table where the diamond would be.
    shapes: [
      rect(5, 2, 14, 20, 2),
      rect(8, 5.5, 8, 6.5, 2), col(12, 5.5, 12),
      row(15.5, 9, 15), row(18.5, 9, 13),
    ],
  },
  {
    slug: "dataset-version", category: "data", subcategory: "quality",
    name: "Dataset version", description: "The data as it was, kept",
    tags: ["snapshot", "copy", "lineage"], family: "window",
    aliases: [], keywords: ["dataset version", "data snapshot", "dvc", "lineage"],
    // The previous version folded flat above, the current one open below —
    // overlap was drawn first and the collinear-overlap rule threw it out.
    shapes: [
      rect(6, 2.5, 15, 3.5, 1.75),
      rect(3, 9, 18, 12, 2), row(14.5, 6, 18),
    ],
  },
  {
    slug: "dataset-split", category: "data", subcategory: "quality",
    name: "Dataset split", description: "Most to learn from, some to be judged on",
    tags: ["train", "test", "portion"], family: "window",
    aliases: ["train-test-split"], keywords: ["train test split", "80 20", "partition data"],
    // One box, one off-centre cut: the 80 and the 20. The filled side is the
    // training data; the empty side is the point.
    shapes: [
      rect(3, 4, 18, 16, 2), col(15, 4, 20),
      row(9, 6, 12), row(12, 6, 12), row(15, 6, 12),
    ],
  },
  {
    slug: "holdout", category: "data", subcategory: "quality",
    name: "Holdout", description: "Rows the model never gets to see",
    tags: ["reserved", "fenced", "eval"], family: "window",
    aliases: ["holdout-set"], keywords: ["holdout set", "reserved data", "eval split"],
    // The same box with a horizontal fence — `dataset-split` cuts it upright;
    // the holdout is the room below the line.
    shapes: [
      rect(3, 4, 18, 16, 2), row(14, 3, 21),
      row(8, 6, 18), row(11, 6, 18), row(17, 6, 14),
    ],
  },
  {
    slug: "sample-rows", category: "data", subcategory: "quality",
    name: "Sample rows", description: "A few of them, picked to look at",
    tags: ["subset", "pick", "preview"], family: "figure",
    aliases: [], keywords: ["sample rows", "preview data", "head", "subset"],
    // Four rows, and the dots naming which two were taken.
    shapes: [
      row(4, 8, 21), row(9.5, 8, 21), row(15.5, 8, 21), row(21, 8, 21),
      disc(4.5, 4, 1), disc(4.5, 15.5, 1),
    ],
  },
  {
    slug: "stratified-sample", category: "data", subcategory: "quality",
    name: "Stratified sample", description: "One from every layer, fairly",
    tags: ["layers", "fair", "strata"], family: "figure",
    aliases: [], keywords: ["stratified sampling", "per stratum", "balanced sample"],
    // Three strata as lines, and the dot each one gave up — staggered so no
    // layer is favoured. Capsules were drawn first and read as a blot at 16px.
    shapes: [
      row(4, 3, 21), disc(7, 7.5, 1),
      row(11, 3, 21), disc(12, 14.5, 1),
      row(18, 3, 21), disc(17, 21, 1),
    ],
  },
  {
    slug: "class-balance", category: "data", subcategory: "quality",
    name: "Class balance", description: "As many of one as of the other",
    tags: ["equal", "classes", "fair"], family: "figure",
    aliases: [], keywords: ["class balance", "balanced classes", "equal representation"],
    // Two columns, same height, same count inside.
    shapes: [
      rect(3, 5, 7, 14, 2), disc(6.5, 9, 1), disc(6.5, 15, 1),
      rect(14, 5, 7, 14, 2), disc(17.5, 9, 1), disc(17.5, 15, 1),
    ],
  },
  {
    slug: "label", category: "data", subcategory: "quality",
    name: "Label", description: "The name a row is taught under",
    tags: ["tag", "class", "annotation"], family: "figure",
    aliases: ["class-label"], keywords: ["label", "annotation", "ground truth", "class"],
    // The tag with its eyelet — `tag-git` without the commit it hangs from.
    shapes: [
      poly([[3, 7], [16, 7], [21, 12], [16, 17], [3, 17]], true),
      disc(7.5, 12, 2),
    ],
  },
  {
    slug: "data-augment", category: "data", subcategory: "quality",
    name: "Data augment", description: "More rows, made from the rows you have",
    tags: ["expand", "more", "derived"], family: "figure",
    aliases: [], keywords: ["data augmentation", "augment rows", "expand dataset"],
    // The rows, and the plus writing the next one.
    shapes: [
      row(4, 3, 21), row(9, 3, 21), row(19, 3, 21),
      row(14, 3, 13), row(14, 16.5, 20.5), col(18.5, 12, 16),
    ],
  },
  {
    slug: "synthetic-row", category: "data", subcategory: "quality",
    name: "Synthetic row", description: "A row nobody collected",
    tags: ["generated", "fake", "dotted"], family: "figure",
    aliases: [], keywords: ["synthetic data", "generated row", "fake sample"],
    // Solid rows and one written in dots — the one that was made, not measured.
    shapes: [
      row(4, 3, 21), row(9, 3, 21), row(19, 3, 21),
      disc(6, 14, 1), disc(12, 14, 1), disc(18, 14, 1),
    ],
  },

  /* ── rag: chunks and embeddings ───────────────────────────────────────────────── */

  {
    slug: "corpus-add", category: "rag", subcategory: "ingestion",
    name: "Corpus add", description: "Another document joins the pile",
    tags: ["ingest", "grow", "documents"], family: "page",
    aliases: [], keywords: ["add to corpus", "ingest document", "grow knowledge base"],
    // `corpus`'s two pages with the plus in the air above the new one.
    shapes: [
      poly([[13, 2], [6, 2], [6, 16], [16, 16], [16, 5]]),
      poly([[16, 8], [9, 8], [9, 22], [19, 22], [19, 11]]),
      row(4.5, 16.5, 21.5), col(19, 2, 7),
    ],
  },
  {
    slug: "table-extract", category: "rag", subcategory: "ingestion",
    name: "Table extract", description: "The table found inside the page, pulled out whole",
    tags: ["parse", "rows", "structure"], family: "window",
    aliases: [], keywords: ["table extraction", "parse table", "structured data"],
    // `table` shortened, and one row out below it, already free.
    shapes: [
      frame(2, 3, 20, 12, 3, { gap: 4 }), row(8, 2, 22),
      col(9, 8, 15), col(15, 8, 15),
      rect(6, 18, 12, 4, 2),
    ],
  },
  {
    slug: "matryoshka", category: "rag", subcategory: "vector",
    name: "Matryoshka", description: "The small embedding lives inside the big one",
    tags: ["nested", "truncate", "dimensions"], family: "figure",
    aliases: [], keywords: ["matryoshka embedding", "truncated dims", "nested vector"],
    // Nested diamonds with the point at the centre — cut the vector short and the
    // shape is still there.
    shapes: [
      poly([[12, 3], [21, 12], [12, 21], [3, 12]], true),
      poly([[12, 7.5], [16.5, 12], [12, 16.5], [7.5, 12]], true),
      disc(12, 12, 1),
    ],
  },
  {
    slug: "parent-chunk", category: "rag", subcategory: "chunking",
    name: "Parent chunk", description: "The big piece the small ones came from",
    tags: ["context", "container", "hierarchy"], family: "window",
    aliases: [], keywords: ["parent chunk", "parent document", "small-to-big"],
    // `chunk`'s capsule grown into a room, its children still inside.
    shapes: [
      rect(3, 7, 18, 10, 2),
      rect(8.5, 10, 7, 4, 2),
    ],
  },
  {
    slug: "child-chunk", category: "rag", subcategory: "chunking",
    name: "Child chunk", description: "The small piece that gets retrieved",
    tags: ["piece", "retrieved", "hierarchy"], family: "window",
    aliases: [], keywords: ["child chunk", "small chunk", "retrieved piece"],
    // The parent above, and one child pulled out on its stem.
    shapes: [
      rect(3, 3, 18, 7, 3.5), col(12, 10, 14),
      rect(7, 14, 10, 6, 3),
    ],
  },
  {
    slug: "sliding-window", category: "rag", subcategory: "chunking",
    name: "Sliding window", description: "The frame moves; the text stays put",
    tags: ["window", "stride", "overlap"], family: "window",
    aliases: [], keywords: ["sliding window", "stride", "windowed chunks"],
    // Text above and below, the window over its slice, and the arrow it slides on.
    shapes: [
      row(4, 3, 21), rect(2, 7.5, 13, 9, 2), row(20, 3, 21),
      row(12, 16.5, 19), poly([[18, 9.5], [20, 11.5], [18, 13.5]]),
    ],
  },
  {
    slug: "embed-batch", category: "rag", subcategory: "vector",
    name: "Embed batch", description: "Many texts through the model at once",
    tags: ["bulk", "vectors", "throughput"], family: "figure",
    aliases: [], keywords: ["batch embedding", "bulk vectors", "embed many"],
    // Two of `embedding`'s lattices over the tray that carries them together.
    shapes: [
      poly([[7.5, 5], [10, 7.5], [6, 11.5], [2, 7.5], [4.5, 5]]),
      poly([[19.5, 5], [22, 7.5], [18, 11.5], [14, 7.5], [16.5, 5]]),
      poly([[3, 15], [3, 19], [21, 19], [21, 15]]),
    ],
  },
  {
    slug: "embed-cache", category: "rag", subcategory: "vector",
    name: "Embed cache", description: "Computed once, kept for next time",
    tags: ["store", "reuse", "fast"], family: "window",
    aliases: [], keywords: ["embedding cache", "cached vectors", "reuse embeddings"],
    // `embedding`'s lattice, boxed and kept.
    shapes: [
      rect(3, 3, 18, 18, 2),
      poly([[13.5, 8.5], [16, 11], [12, 15], [8, 11], [10.5, 8.5]]),
    ],
  },
  {
    slug: "reembed", category: "rag", subcategory: "vector",
    name: "Re-embed", description: "New model, same corpus, every vector again",
    tags: ["refresh", "rotate", "vectors"], family: "rotation",
    aliases: [], keywords: ["re-embed", "reindex vectors", "embedding migration"],
    // The rotation family's loop with the lattice inside, the way `hot-reload`
    // carries its bolt.
    shapes: [
      ...cycle("cw"),
      poly([[13.5, 9], [16, 11.5], [12, 15.5], [8, 11.5], [10.5, 9]]),
    ],
  },
  {
    slug: "hybrid-fuse", category: "rag", subcategory: "retrieval",
    name: "Hybrid fuse", description: "Keyword and semantic, one ranked list",
    tags: ["merge", "bm25", "vector"], family: "arrow",
    aliases: ["hybrid-search-fuse"], keywords: ["hybrid search", "fusion", "bm25 plus vector"],
    // Two retrievals converging into the one list that ships.
    shapes: [
      poly([[3, 5], [9, 11]]), poly([[3, 19], [9, 13]]),
      row(12, 10, 17), poly([[17, 9.5], [19.5, 12], [17, 14.5]]),
    ],
  },
];
