/**
 * Batch 47 — the machine's insides: kernel, transformer, TPU; and light let through: opacity,
 * brightness, watermark.
 *
 * `client` faces `server` the way it does in life — the small thing that asks, drawn to
 * match the tower that answers.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_47: Icon[] = [
  /* ── The machine's insides ────────────────────────────────────────────────────── */

  {
    slug: "kernel", category: "devops", subcategory: "infrastructure",
    name: "Kernel", description: "The part everything else stands on",
    tags: ["core", "os", "lowest"], family: "window",
    aliases: [], keywords: ["os kernel", "core", "ring zero", "lowest layer"],
    shapes: [rect(2, 2, 20, 20, 2), disc(12, 12, 3)],
  },
  {
    slug: "transformer", category: "ai", subcategory: "model",
    name: "Transformer", description: "The architecture under all of this",
    tags: ["attention", "layers", "blocks"], family: "machine",
    aliases: [], keywords: ["attention blocks", "architecture", "layers", "the paper"],
    // Three plain rows in a machine is `inference-batch`. The residual stream through the
    // layers is what makes it a transformer.
    shapes: [machine(), row(9.5, 8, 16), row(14.5, 8, 16), col(12, 7, 17)],
  },
  {
    slug: "tpu", category: "cloud", subcategory: "compute",
    name: "TPU", description: "A chip grown for tensors",
    tags: ["accelerator", "chip", "matrix"], family: "machine",
    aliases: [], keywords: ["tensor processing", "accelerator", "matrix chip"],
    shapes: [
      rect(5, 5, 14, 14, 2), rect(9.5, 9.5, 5, 5, 2.5),
      col(9, 2, 5), col(15, 2, 5), col(9, 19, 22), col(15, 19, 22),
    ],
  },
  {
    slug: "compute", category: "cloud", subcategory: "compute",
    name: "Compute", description: "Cycles for hire",
    tags: ["cpu", "instances", "power"], family: "machine",
    aliases: [], keywords: ["cycles", "processing power", "instances"],
    shapes: [rect(5, 5, 14, 14, 2), row(2, 9, 15), row(22, 9, 15), col(2, 9, 15), col(22, 9, 15)],
  },
  {
    slug: "client", category: "devtools", subcategory: "api",
    name: "Client", description: "The small thing that asks",
    tags: ["caller", "frontend", "consumer"], family: "figure",
    aliases: [], keywords: ["caller", "consumer", "frontend", "asks the server"],
    shapes: [rect(2, 4, 13, 16, 2), row(17, 5.5, 11.5), row(12, 17, 21), poly([[19, 10], [21, 12], [19, 14]])],
  },

  /* ── Light let through ────────────────────────────────────────────────────────── */

  {
    slug: "opacity", category: "interface", subcategory: "media",
    name: "Opacity", description: "How much shows through",
    tags: ["alpha", "transparent", "fade"], family: "figure",
    aliases: ["alpha"], keywords: ["alpha", "transparency", "see through", "fade"],
    shapes: [rect(2, 4, 20, 16, 2), disc(7, 9, 1), disc(13, 9, 1), disc(10, 12, 1), disc(16, 12, 1), disc(7, 15, 1)],
  },
  {
    slug: "brightness", category: "interface", subcategory: "media",
    name: "Brightness", description: "More light on it",
    tags: ["sun", "level", "light"], family: "orbit",
    aliases: [], keywords: ["light level", "brighten", "sun control"],
    shapes: [disc(12, 12, 4), col(12, 3, 6), col(12, 18, 21), row(12, 3, 6), row(12, 18, 21)],
  },
  {
    slug: "watermark", category: "security", subcategory: "ai-security",
    name: "Watermark", description: "Marked as made, invisibly",
    tags: ["provenance", "stamp", "hidden"], family: "window",
    aliases: ["watermark-data"], keywords: ["ai watermark", "provenance mark", "stamped"],
    shapes: [rect(2, 4, 20, 16, 2), poly([[5, 9], [8, 12], [11, 9], [14, 12], [17, 9]])],
  },
  {
    slug: "theme", category: "interface", subcategory: "media",
    name: "Theme", description: "The same page, dressed differently",
    tags: ["dark-mode", "skin", "palette"], family: "figure",
    aliases: [], keywords: ["dark mode", "light mode", "skin", "appearance"],
    shapes: [disc(12, 12, 8), col(12, 4, 20), disc(8, 12, 1)],
  },

  /* ── Where code waits and runs ────────────────────────────────────────────────── */

  {
    slug: "repl", category: "devtools", subcategory: "terminal",
    name: "REPL", description: "Type, see, type again",
    tags: ["interactive", "loop", "eval"], family: "window",
    aliases: [], keywords: ["read eval print", "interactive", "try it"],
    shapes: [rect(2, 4, 20, 16, 2), poly([[6, 8], [9, 11], [6, 14]]), row(16, 6, 12), poly([[15, 15], [18, 15], [18, 9]]), poly([[16, 11], [18, 9], [20, 11]])],
  },
  {
    slug: "execute", category: "automation", subcategory: "action",
    name: "Execute", description: "Do it now",
    tags: ["run", "invoke", "go"], family: "figure",
    aliases: ["act", "execution"], keywords: ["run now", "invoke", "do it", "fire"],
    shapes: [poly([[7, 4], [15, 12], [7, 20]], true)],
  },
  {
    slug: "process", category: "devops", subcategory: "infrastructure",
    name: "Process", description: "A program, while it lives",
    tags: ["pid", "running", "alive"], family: "window",
    aliases: [], keywords: ["pid", "running program", "alive", "ps"],
    shapes: [rect(2, 5, 20, 14, 2), poly([[7, 15], [10, 12], [13, 15], [16, 12]])],
  },
  {
    slug: "terraform", category: "devops", subcategory: "infrastructure",
    name: "Terraform", description: "The world, declared in files",
    tags: ["iac", "declare", "plan"], family: "figure",
    aliases: ["infra-plan"], keywords: ["infrastructure as code", "plan apply", "declared"],
    // A box overlapping the page breaks the crossing budget every way it can sit. Declared
    // on the left, materialised on the right.
    shapes: [rect(2, 4, 8, 16, 2), rect(14, 4, 8, 8, 2), rect(14, 15, 8, 7, 2)],
  },

  /* ── Data with a shape and a place ────────────────────────────────────────────── */

  {
    slug: "vector-index", category: "rag", subcategory: "vector",
    name: "Vector index", description: "Embeddings, filed for finding",
    tags: ["ann", "store", "filed"], family: "figure",
    aliases: [], keywords: ["ann index", "embedding store", "filed vectors"],
    shapes: [rect(2, 14, 20, 7, 2), disc(6, 6, 1), disc(12, 4, 1), disc(18, 7, 1), disc(9, 10, 1), disc(15, 10, 1)],
  },
  {
    slug: "storage", category: "cloud", subcategory: "storage",
    name: "Storage", description: "Where it stays when nothing is running",
    tags: ["disk", "persistent", "rest"], family: "figure",
    aliases: [], keywords: ["disk", "persistent", "at rest", "volume"],
    shapes: [rect(2, 4, 20, 7, 2), disc(6, 7.5, 1), rect(2, 14, 20, 7, 2), disc(6, 17.5, 1)],
  },
  {
    slug: "replica", category: "data", subcategory: "storage",
    name: "Replica", description: "The copy that answers reads",
    tags: ["copy", "standby", "mirror"], family: "figure",
    aliases: [], keywords: ["read replica", "standby copy", "mirror db"],
    shapes: [rect(2, 4, 9, 16, 2), row(9, 4, 11), rect(14, 8, 8, 12, 2), row(13, 15.5, 20.5)],
  },
  {
    slug: "registry", category: "devops", subcategory: "release",
    name: "Registry", description: "Where the named things live",
    tags: ["catalog", "published", "lookup"], family: "window",
    aliases: [], keywords: ["package registry", "lookup by name", "published"],
    shapes: [rect(2, 3, 20, 18, 2), row(8, 2, 22), disc(7, 13, 1), row(13, 10, 18), disc(7, 17, 1), row(17, 10, 15)],
  },

  /* ── Words about words ────────────────────────────────────────────────────────── */

  {
    slug: "semantic", category: "rag", subcategory: "retrieval",
    name: "Semantic", description: "By what it means, not what it says",
    tags: ["meaning", "concept", "beyond-words"], family: "figure",
    aliases: [], keywords: ["meaning", "conceptual", "beyond keywords"],
    shapes: [rect(2, 8, 8, 8, 2), poly([[10, 12], [14, 12]]), disc(18, 12, 4)],
  },
  {
    slug: "syntax", category: "devtools", subcategory: "code",
    name: "Syntax", description: "The rules the words obey",
    tags: ["grammar", "structure", "valid"], family: "figure",
    aliases: [], keywords: ["grammar", "parse rules", "valid form"],
    shapes: [poly([[8, 4], [4, 8], [8, 12]]), poly([[16, 4], [20, 8], [16, 12]]), row(17, 4, 12), row(17, 15, 20)],
  },
  {
    slug: "synthesise", category: "agents", subcategory: "reflection",
    name: "Synthesise", description: "Many sources, one answer",
    tags: ["combine", "distil", "write-up"], family: "figure",
    aliases: ["synthesize"], keywords: ["combine sources", "one answer", "write up"],
    shapes: [row(5, 3, 9), row(5, 12, 15), row(5, 18, 21), poly([[12, 8], [12, 13]]), poly([[9, 10], [12, 13], [15, 10]]), rect(6, 15.5, 12, 6.5, 2)],
  },
  {
    slug: "knowledge", category: "rag", subcategory: "knowledge",
    name: "Knowledge", description: "What is known, kept where it can be asked",
    tags: ["facts", "corpus", "base"], family: "figure",
    aliases: [], keywords: ["knowledge base", "what is known", "facts"],
    shapes: [disc(12, 9, 5), row(17, 9, 15), row(20, 10, 14)],
  },

  /* ── The rest ─────────────────────────────────────────────────────────────────── */

  {
    slug: "spot", category: "cloud", subcategory: "cost",
    name: "Spot instance", description: "Cheap until somebody else wants it",
    tags: ["preemptible", "auction", "cheap"], family: "machine",
    aliases: ["preemptible"], keywords: ["spot", "preemptible", "auction priced", "evictable"],
    shapes: [rect(4, 6, 16, 12, 2), disc(9, 12, 1), col(15, 9, 12), disc(15, 15, 1)],
  },
  {
    slug: "service-account", category: "security", subcategory: "auth",
    name: "Service account", description: "A user that is a program",
    tags: ["robot", "machine-user", "automated"], family: "figure",
    aliases: [], keywords: ["robot account", "machine user", "automation identity"],
    shapes: [rect(7, 4, 10, 9, 2), disc(10, 8, 1), disc(14, 8, 1), arc(12, 21, 6, 180, 360)],
  },
  {
    slug: "percentile", category: "analytics", subcategory: "metric",
    name: "Percentile", description: "Where this one stands among all",
    tags: ["p99", "rank", "position"], family: "chart",
    aliases: [], keywords: ["p50 p99", "rank", "distribution position"],
    shapes: [col(4, 15, 20), col(8, 11, 20), col(12, 13, 20), col(16, 7, 20), col(20, 16, 20), row(4, 2, 22)],
  },
  {
    slug: "success-path", category: "automation", subcategory: "condition",
    name: "Success path", description: "The branch things take when they go right",
    tags: ["happy", "green", "branch"], family: "figure",
    aliases: ["happy-path"], keywords: ["happy path", "green branch", "went right"],
    shapes: [row(12, 2, 8), poly([[8, 12], [12, 8], [17, 8]]), poly([[15, 13], [17, 15], [21, 11]]), poly([[8, 12], [12, 16], [15, 16]])],
  },
];
