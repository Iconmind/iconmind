/**
 * Batch 46 — namespaces at three scales, pipelines named in full, and marks of quality.
 *
 * `namespace-code`, `namespace-k8s` and `namespace-cluster` are one bracket-of-belonging at
 * three sizes of thing belonged-to. `rag-pipeline` and `ingestion-pipeline` say which stage
 * of the same line they are.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { SMALL, check } from "../marks.ts";
import { machine, page, shield as shieldBody } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_46: Icon[] = [
  /* ── Namespaces at three scales ───────────────────────────────────────────────── */

  {
    slug: "namespace-code", category: "devtools", subcategory: "code",
    name: "Code namespace", description: "A code namespace — names that belong together under one scope or prefix",
    tags: ["scope", "module", "prefix"], family: "figure",
    aliases: [], keywords: ["module scope", "package name", "prefix", "belongs to"],
    shapes: [poly([[8, 4], [4, 4], [4, 20], [8, 20]]), disc(12, 8, 1), disc(12, 16, 1), poly([[16, 4], [20, 4], [20, 20], [16, 20]])],
  },
  {
    slug: "namespace-k8s", category: "devops", subcategory: "orchestration",
    name: "Kubernetes namespace", description: "A Kubernetes namespace — a fenced part of the cluster, one tenant's scope",
    tags: ["scope", "tenant", "fenced"], family: "window",
    aliases: [], keywords: ["k8s namespace", "tenant", "fenced workloads"],
    shapes: [rect(2, 2, 20, 20, 2), disc(8, 12, 2), disc(16, 12, 2)],
  },
  {
    slug: "namespace-cluster", category: "cloud", subcategory: "compute",
    name: "Cluster namespace", description: "A cluster namespace — one name that spans many machines in a fleet",
    tags: ["group", "spans", "fleet"], family: "figure",
    aliases: [], keywords: ["spans machines", "fleet scope", "one name many nodes"],
    shapes: [row(5, 4, 20), rect(2, 9, 8, 11, 2), rect(14, 9, 8, 11, 2)],
  },
  {
    slug: "node-cluster", category: "cloud", subcategory: "compute",
    name: "Node cluster", description: "A node cluster — machines grouped together to act as one system",
    tags: ["fleet", "group", "together"], family: "figure",
    aliases: [], keywords: ["cluster", "fleet", "many as one", "nodes"],
    shapes: [disc(12, 6, 2), disc(6, 17, 2), disc(18, 17, 2), col(12, 8, 11), poly([[10.5, 9.5], [7.5, 12.5]]), poly([[13.5, 9.5], [16.5, 12.5]])],
  },

  /* ── Pipelines named in full ──────────────────────────────────────────────────── */

  {
    slug: "rag-pipeline", category: "rag", subcategory: "retrieval",
    name: "RAG pipeline", description: "A RAG pipeline — retrieve the relevant passages, then generate with what you found",
    tags: ["retrieve", "generate", "stages"], family: "figure",
    aliases: [], keywords: ["retrieval augmented", "stages", "search then write"],
    shapes: [rect(2, 8, 6.5, 8, 2), disc(12, 12, 2), rect(15.5, 8, 6.5, 8, 2)],
  },
  {
    slug: "ingestion-pipeline", category: "rag", subcategory: "ingestion",
    name: "Ingestion pipeline", description: "An ingestion pipeline — documents go in, index entries come out",
    tags: ["intake", "process", "index"], family: "figure",
    aliases: [], keywords: ["intake", "docs to index", "processing line"],
    shapes: [page(), poly([[18, 12], [22, 12]]), poly([[20, 10], [22, 12], [20, 14]])],
  },
  {
    slug: "pipeline-ci", category: "devops", subcategory: "ci-cd",
    name: "CI pipeline", description: "A CI pipeline — build, test and ship, in that order, stage by stage",
    tags: ["stages", "sequence", "build"], family: "figure",
    aliases: ["ci-cd"], keywords: ["build test deploy", "stages", "ci cd line"],
    shapes: [
      rect(2, 2, 5, 5, 2.5), rect(9.5, 2, 5, 5, 2.5), rect(17, 2, 5, 5, 2.5),
      col(19.5, 10, 14), rect(17, 17, 5, 5, 2.5),
    ],
  },
  {
    slug: "transform-step", category: "automation", subcategory: "action",
    name: "Transform step", description: "A transform step — the middle stage of a pipeline that changes the shape of the data",
    tags: ["convert", "stage", "middle"], family: "figure",
    aliases: [], keywords: ["conversion stage", "reshape step", "middle of the line"],
    shapes: [row(12, 2, 7), rect(7, 7, 10, 10, 2), poly([[10, 14], [14, 10]]), row(12, 17, 22)],
  },

  /* ── Marks of quality ─────────────────────────────────────────────────────────── */

  {
    slug: "quality", category: "data", subcategory: "quality",
    name: "Quality", description: "Quality — good enough to trust, graded against a standard and checked",
    tags: ["grade", "standard", "sound"], family: "figure",
    aliases: [], keywords: ["data quality", "trustworthy", "sound", "grade"],
    shapes: [disc(12, 9, 6), poly([[9, 9], [11, 11], [15, 7]]), poly([[8, 14], [8, 21]]), poly([[16, 14], [16, 21]])],
  },
  {
    slug: "safety-check", category: "ai", subcategory: "safety",
    name: "Safety check", description: "A safety check — output looked at and screened before it goes out",
    tags: ["screen", "gate", "reviewed"], family: "shield",
    aliases: ["safety"], keywords: ["safety gate", "screened", "reviewed output"],
    // Shield + check is `shield-check`, byte for byte. A safety check is a gate: the output
    // passes between the posts only once the check is made.
    shapes: [col(4, 4, 20), col(20, 4, 20), ...check()],
  },
  {
    slug: "score-card", category: "analytics", subcategory: "experiment",
    name: "Score card", description: "A score card — the headline number shown big, and how it moved",
    tags: ["kpi", "number", "tile"], family: "window",
    aliases: [], keywords: ["metric card", "big number", "kpi tile"],
    shapes: [rect(2, 4, 20, 16, 2), row(9, 6, 13), poly([[6, 16], [9, 13], [12, 16], [16, 12]])],
  },
  {
    slug: "relevance-score", category: "rag", subcategory: "ranking",
    name: "Relevance score", description: "A relevance score — how close a result is to what was actually asked",
    tags: ["match", "rating", "closeness"], family: "figure",
    aliases: [], keywords: ["match score", "how relevant", "ranking signal"],
    shapes: [row(8, 3, 21), row(13, 3, 15), row(18, 3, 9), disc(19, 14, 2)],
  },

  /* ── Time, sampled and stepped ────────────────────────────────────────────────── */

  {
    slug: "sample-size", category: "analytics", subcategory: "experiment",
    name: "Sample size", description: "Sample size — how many observations you need before a result means anything",
    tags: ["n", "enough", "power"], family: "figure",
    aliases: [], keywords: ["n", "statistical power", "enough data"],
    shapes: [rect(2, 2, 20, 20, 2), disc(7, 7, 1), disc(12, 7, 1), disc(17, 7, 1), disc(7, 12, 1), disc(12, 12, 1)],
  },
  {
    slug: "sampling", category: "ai", subcategory: "inference",
    name: "Sampling", description: "Sampling — pick the next token from the candidates by their probabilities",
    tags: ["choose", "random", "draw"], family: "figure",
    aliases: [], keywords: ["draw from distribution", "temperature", "pick next token"],
    shapes: [disc(6, 6, 1), disc(12, 5, 2), disc(18, 6, 1), poly([[12, 9], [12, 18]]), poly([[9, 15], [12, 18], [15, 15]])],
  },
  {
    slug: "schedule-cron", category: "automation", subcategory: "schedule",
    name: "Cron schedule", description: "A cron schedule — at these minutes on these days, a recurring timer expression",
    tags: ["timer", "expression", "recurring"], family: "figure",
    aliases: [], keywords: ["cron expression", "at midnight", "every five minutes"],
    shapes: [disc(9, 12, 7), poly([[9, 8], [9, 12], [12.5, 12]]), col(19, 5, 9), col(19, 11, 14), col(19, 16, 19)],
  },
  {
    slug: "step-limit", category: "agents", subcategory: "execution",
    name: "Step limit", description: "A step limit — only this many tries or iterations before an agent must stop",
    tags: ["budget", "cap", "iterations"], family: "figure",
    aliases: [], keywords: ["max iterations", "step budget", "cap on tries"],
    shapes: [poly([[3, 6], [8, 6], [8, 11], [13, 11], [13, 16], [18, 16]]), col(21, 4, 20)],
  },

  /* ── Sources cited, rows joined ───────────────────────────────────────────────── */

  {
    slug: "source-citation", category: "rag", subcategory: "grounding",
    name: "Source citation", description: "A source citation — chapter and verse for the claim, a footnote to the reference",
    tags: ["reference", "quote", "footnote"], family: "page",
    aliases: [], keywords: ["cite source", "footnote", "chapter and verse"],
    shapes: [page(), row(9, 8, 16), row(13, 8, 14), disc(15, 17, 1), row(17, 8, 12)],
  },
  {
    slug: "union", category: "data", subcategory: "transform",
    name: "Union", description: "Union — everything from both sets combined into one with duplicates kept once",
    tags: ["combine", "all", "merge"], family: "figure",
    aliases: [], keywords: ["union all", "both sets", "combine rows"],
    // The arch opening down is intersection. Union is the cup: open side up.
    shapes: [col(5, 4, 14), arc(12, 14, 7, 0, 180), col(19, 4, 14)],
  },
  {
    slug: "join", category: "data", subcategory: "transform",
    name: "Join tables", description: "Join tables — rows matched where their keys agree, merged into one result",
    tags: ["merge", "match", "keys"], family: "figure",
    aliases: ["join-data"], keywords: ["sql join", "on key", "matched rows"],
    shapes: [disc(8, 12, 6), disc(16, 12, 6), col(12, 9, 15)],
  },
  {
    slug: "recursive-split", category: "rag", subcategory: "chunking",
    name: "Recursive split", description: "Recursive split — halve a document again and again until the pieces fit the chunk size",
    tags: ["divide", "again", "tree"], family: "figure",
    aliases: [], keywords: ["split again", "recursive chunking", "halve until fits"],
    shapes: [row(4, 2, 22), row(10, 2, 10.5), row(10, 13.5, 22), row(16, 2, 5), row(16, 7.5, 10.5), row(16, 13.5, 22)],
  },

  /* ── The last of the everyday ─────────────────────────────────────────────────── */

  {
    slug: "priority", category: "automation", subcategory: "workflow",
    name: "Priority", description: "Priority — this one before the others, urgent and ahead of the queue",
    tags: ["first", "urgent", "ahead"], family: "figure",
    aliases: [], keywords: ["urgent", "first", "jump the queue", "p0"],
    shapes: [col(12, 4, 13), poly([[8, 8], [12, 4], [16, 8]]), disc(12, 19, 1)],
  },
  {
    slug: "unpin", category: "interface", subcategory: "action",
    name: "Unpin", description: "Unpin — let an item move again, released from its fixed place",
    tags: ["release", "unfix", "float"], family: "figure",
    aliases: [], keywords: ["release pin", "unstick", "let go"],
    shapes: [disc(12, 9, 5), col(12, 14, 20), poly([[4, 20], [20, 4]])],
  },
  {
    slug: "volume-up", category: "interface", subcategory: "media",
    name: "Volume up", description: "Volume up — make the sound louder, raise the speaker level a notch",
    tags: ["sound", "louder", "raise"], family: "figure",
    aliases: [], keywords: ["louder", "raise volume", "sound up"],
    shapes: [poly([[3, 9], [8, 9], [13, 4], [13, 20], [8, 15], [3, 15]], true), arc(15, 12, 4, 300, 60), arc(15, 12, 7, 300, 60)],
  },
  {
    slug: "view", category: "interface", subcategory: "state",
    name: "View", description: "View — just looking, open something read-only without changing it",
    tags: ["see", "read-only", "open"], family: "figure",
    aliases: [], keywords: ["look at", "open", "read only view"],
    shapes: [poly([[3, 12], [9, 6], [15, 6], [21, 12]]), poly([[3, 12], [9, 18], [15, 18], [21, 12]]), disc(12, 12, 1)],
  },
  {
    slug: "success", category: "interface", subcategory: "state",
    name: "Success", description: "Success — it worked, done and green, the outcome you wanted to see",
    tags: ["done", "ok", "green"], family: "orbit",
    aliases: [], keywords: ["worked", "done", "all good", "green"],
    shapes: [disc(12, 12, 9), poly([[7, 12], [10.5, 15.5], [17, 9]])],
  },
];
