/**
 * Batch 60 — round 9 of the 1k plan: the module graph, labelled data, the
 * retriever's index, the attacker's playbook, and the scheduler's mercy.
 *
 * Swaps as ever: the split/chunk variants and debug leftovers stayed dead,
 * fast-refresh is hot-reload, poisoning is model-poisoning — sleeper took its
 * seat. Every name below was checked against the live set before drawing.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { machine, page, shield } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_60: Icon[] = [
  /* ── devtools: the module graph ───────────────────────────────────────────────── */

  {
    slug: "closure", category: "devtools", subcategory: "code",
    name: "Closure", description: "A closure — a function that kept a piece of the scope it was born in",
    tags: ["scope", "capture", "function"], family: "window",
    aliases: [], keywords: ["closure", "captured scope", "lexical"],
    // The inner function, and the line back to the value it captured.
    shapes: [
      rect(2, 2, 20, 20, 2), rect(6, 12, 7, 6.5, 2),
      disc(17, 7, 2), poly([[13, 11.5], [15.5, 9]]),
    ],
  },
  {
    slug: "circular-dep", category: "devtools", subcategory: "package",
    name: "Circular dependency", description: "A circular dependency — A needs B and B needs A, imports tied in a knot",
    tags: ["cycle", "imports", "knot"], family: "rotation",
    aliases: [], keywords: ["circular dependency", "import cycle", "dependency loop"],
    // Two arrows chasing each other — nobody can be built first.
    shapes: [
      arc(12, 12, 7, -70, 70), arc(12, 12, 7, 110, 250),
      poly([[12, 2], [15, 5], [12, 8]]), poly([[12, 16], [9, 19], [12, 22]]),
    ],
  },
  {
    slug: "lazy-import", category: "devtools", subcategory: "package",
    name: "Lazy import", description: "A lazy import — a module fetched only when somebody finally asks for it",
    tags: ["defer", "dynamic", "sleep"], family: "window",
    aliases: ["dynamic-import"], keywords: ["lazy import", "dynamic import", "code split load"],
    shapes: [rect(3, 9, 12, 12, 2), poly([[15, 4], [19, 4], [15, 8], [19, 8]])],
  },
  {
    slug: "dep-pin", category: "devtools", subcategory: "package",
    name: "Dependency pin", description: "A dependency pin — exactly this version, locked and never drifting",
    tags: ["version", "lock", "exact"], family: "window",
    aliases: ["version-pin"], keywords: ["pin dependency", "exact version", "locked"],
    shapes: [rect(3, 3, 12, 12, 2), disc(17.5, 11, 3), col(17.5, 14, 18.5)],
  },
  {
    slug: "multi-package", category: "devtools", subcategory: "package",
    name: "Multi-package", description: "Multi-package — many packages in one repository, workspaces linked together",
    tags: ["monorepo", "workspace", "linked"], family: "window",
    aliases: ["workspace-packages"], keywords: ["monorepo", "workspaces", "packages"],
    // Two packages meeting at the corner they share.
    shapes: [rect(2, 2, 10, 10, 2), rect(12, 12, 10, 10, 2)],
  },
  {
    slug: "symlink", category: "devtools", subcategory: "package",
    name: "Symlink", description: "A symlink — a file that is really a pointer to another path on disk",
    tags: ["link", "alias", "shortcut"], family: "page",
    aliases: [], keywords: ["symlink", "symbolic link", "linked file"],
    // The page with the link arrow in its corner, the way desktop shortcuts wear it.
    shapes: [page(), poly([[9, 16], [14, 11]]), poly([[10.5, 10.5], [14.5, 10.5], [14.5, 14.5]])],
  },
  {
    slug: "unused-export", category: "devtools", subcategory: "code",
    name: "Unused export", description: "An unused export — offered to everyone and imported by no one, dead code",
    tags: ["dead", "export", "strike"], family: "figure",
    aliases: ["dead-export"], keywords: ["unused export", "dead code", "never imported"],
    shapes: [
      row(4, 3, 21), row(9, 3, 21), row(14, 3, 15), row(19, 3, 21),
      poly([[7, 16.5], [12, 11.5]]),
    ],
  },
  {
    slug: "golden-file", category: "devtools", subcategory: "testing",
    name: "Golden file", description: "A golden file — the blessed output every run is measured against",
    tags: ["blessed", "snapshot", "truth"], family: "page",
    aliases: [], keywords: ["golden file", "snapshot", "blessed output"],
    // The page wearing the crown.
    shapes: [
      page(),
      poly([[8, 9], [10, 7], [12, 9], [14, 7], [16, 9]]),
      row(13, 8, 16), row(16.5, 8, 14),
    ],
  },
  {
    slug: "test-shard", category: "devtools", subcategory: "testing",
    name: "Test shard", description: "A test shard — the suite split several ways so CI finishes sooner",
    tags: ["parallel", "split", "ci"], family: "figure",
    aliases: [], keywords: ["test sharding", "parallel tests", "split suite"],
    shapes: [
      poly([[3, 8], [7, 12], [3, 16]], true),
      poly([[10, 8], [14, 12], [10, 16]], true),
      poly([[17, 8], [21, 12], [17, 16]], true),
    ],
  },
  {
    slug: "fuzz", category: "devtools", subcategory: "testing",
    name: "Fuzz", description: "Fuzz testing — feed a program random chaos until it confesses a bug",
    tags: ["random", "chaos", "inputs"], family: "arrow",
    aliases: ["fuzz-test"], keywords: ["fuzzing", "random inputs", "property chaos"],
    shapes: [
      poly([[2, 8], [5, 11], [8, 8], [11, 11]]),
      poly([[2, 14], [5, 17], [8, 14], [11, 17]]),
      rect(15, 7, 7, 10, 2),
    ],
  },

  /* ── data: labelled by hand ───────────────────────────────────────────────────── */

  {
    slug: "label-queue", category: "data", subcategory: "quality",
    name: "Label queue", description: "A label queue — rows waiting to be annotated with their names",
    tags: ["annotate", "backlog", "tags"], family: "figure",
    aliases: [], keywords: ["labeling queue", "annotation backlog"],
    // `label`'s tag, stacked — the pile still to do.
    shapes: [
      poly([[5, 3], [15, 3], [18.5, 6.5], [15, 10], [5, 10]], true),
      poly([[5, 14], [15, 14], [18.5, 17.5], [15, 21], [5, 21]], true),
      disc(9, 6.5, 2), disc(9, 17.5, 2),
    ],
  },
  {
    slug: "gold-label", category: "data", subcategory: "quality",
    name: "Gold label", description: "A gold label — the answer the graders agreed on, verified ground truth",
    tags: ["truth", "verified", "tag"], family: "figure",
    aliases: ["ground-truth-label"], keywords: ["gold label", "ground truth", "verified"],
    // `label` with the check where the eyelet was.
    shapes: [
      poly([[3, 7], [16, 7], [21, 12], [16, 17], [3, 17]], true),
      poly([[6, 12], [8, 14], [11.5, 10.5]]),
    ],
  },
  {
    slug: "weak-label", category: "data", subcategory: "quality",
    name: "Weak label", description: "A weak label — a heuristic guess wearing a name tag, noisy but useful",
    tags: ["heuristic", "noisy", "tag"], family: "figure",
    aliases: [], keywords: ["weak label", "heuristic label", "noisy supervision"],
    // `label` carrying the question instead.
    shapes: [
      poly([[3, 7], [16, 7], [21, 12], [16, 17], [3, 17]], true),
      arc(8.5, 10.5, 2.5, 180, 90), disc(8.5, 15, 1),
    ],
  },
  {
    slug: "noise-inject", category: "data", subcategory: "quality",
    name: "Noise injection", description: "Noise injection — a little grit added on purpose to make a model robust",
    tags: ["augment", "robust", "dots"], family: "figure",
    aliases: [], keywords: ["noise injection", "robustness", "perturbation"],
    shapes: [
      disc(7, 5, 1), disc(12, 8, 1), disc(17, 4.5, 1),
      poly([[10, 12.5], [12, 14.5], [14, 12.5]]),
      row(18, 3, 21),
    ],
  },
  {
    slug: "dedupe-fuzzy", category: "data", subcategory: "quality",
    name: "Fuzzy dedupe", description: "Fuzzy dedupe — nearly the same is treated as the same and merged",
    tags: ["merge", "near", "clean"], family: "figure",
    aliases: [], keywords: ["fuzzy dedup", "near duplicates", "merge rows"],
    // Two almost-equal rows, and the one that survives.
    shapes: [
      row(4, 3, 16), row(8, 3, 17),
      poly([[10, 11.5], [12, 13.5], [14, 11.5]]),
      row(17, 3, 16),
    ],
  },
  {
    slug: "canonicalize", category: "data", subcategory: "quality",
    name: "Canonicalise", description: "Canonicalise — all the spellings become the one standard spelling",
    tags: ["normalise", "standard", "one"], family: "figure",
    aliases: ["canonicalise"], keywords: ["canonicalize", "normalize values", "standard form"],
    shapes: [
      poly([[3, 5], [6, 8], [9, 5], [12, 8], [15, 5]]),
      poly([[10, 11.5], [12, 13.5], [14, 11.5]]),
      row(17, 4, 20),
    ],
  },
  {
    slug: "bucket-data", category: "data", subcategory: "quality",
    name: "Bucket", description: "Bucket — every value routed into its bin so the data can be grouped",
    tags: ["bin", "sort", "route"], family: "window",
    aliases: ["binning"], keywords: ["bucketing", "binning", "histogram bins"],
    shapes: [
      disc(6.5, 5, 2), disc(17.5, 5, 2), disc(12, 8.5, 2),
      poly([[3, 13], [3, 20], [10, 20], [10, 13]]),
      poly([[14, 13], [14, 20], [21, 20], [21, 13]]),
    ],
  },
  {
    slug: "schema-diff", category: "data", subcategory: "quality",
    name: "Schema diff", description: "A schema diff — the same table one column later, compared for changes",
    tags: ["compare", "change", "columns"], family: "window",
    aliases: [], keywords: ["schema diff", "migration diff", "column change"],
    shapes: [
      rect(2, 4, 8.5, 16, 2), row(9, 2, 10.5),
      rect(13.5, 4, 8.5, 16, 2), row(9, 13.5, 22),
      disc(17.5, 14.5, 2),
    ],
  },
  {
    slug: "expectation", category: "data", subcategory: "quality",
    name: "Expectation", description: "An expectation — the rule the data has to keep, a contract asserted on every load",
    tags: ["assert", "contract", "check"], family: "figure",
    aliases: ["data-expectation"], keywords: ["expectation", "data assertion", "quality rule"],
    // The check above the data it holds to — a loop-with-clock was IoU 0.93
    // against rotate-ccw, and time travel is history's own ground.
    shapes: [
      poly([[7, 7], [10, 10], [16, 4]]),
      rect(3, 14, 18, 5, 2.5),
    ],
  },
  {
    slug: "lineage-node", category: "data", subcategory: "quality",
    name: "Lineage node", description: "A lineage node — this table as one step in the chain that produced it",
    tags: ["provenance", "chain", "step"], family: "chain",
    aliases: [], keywords: ["lineage", "provenance node", "upstream downstream"],
    shapes: [
      disc(5, 5, 2), poly([[6.5, 6.5], [9.5, 9.5]]),
      disc(12, 12, 3), poly([[14.5, 14.5], [17.5, 17.5]]), disc(19, 19, 2),
    ],
  },

  /* ── rag: the retriever's index ───────────────────────────────────────────────── */

  {
    slug: "prefilter", category: "rag", subcategory: "retrieval",
    name: "Pre-filter", description: "Pre-filter — narrow the candidates first, then search what is left",
    tags: ["filter", "first", "narrow"], family: "figure",
    aliases: [], keywords: ["prefilter", "filter then search", "metadata first"],
    shapes: [
      poly([[3, 3], [21, 3], [14, 10], [14, 15], [10, 15], [10, 10]], true),
      disc(15.5, 17.5, 3), poly([[18, 20], [20, 22]]),
    ],
  },
  {
    slug: "postfilter", category: "rag", subcategory: "retrieval",
    name: "Post-filter", description: "Post-filter — search wide, then throw most of the results back",
    tags: ["filter", "after", "trim"], family: "figure",
    aliases: [], keywords: ["postfilter", "search then filter", "trim results"],
    shapes: [
      disc(8.5, 5, 3), poly([[10.5, 7], [12.5, 9]]),
      poly([[3, 11], [21, 11], [14, 18], [14, 22], [10, 22], [10, 18]], true),
    ],
  },
  {
    slug: "index-flat", category: "rag", subcategory: "vector",
    name: "Flat index", description: "A flat index — compare the query against every single vector, exact but slow",
    tags: ["exact", "scan", "brute"], family: "figure",
    aliases: ["brute-force-index"], keywords: ["flat index", "exact search", "full scan"],
    shapes: [
      row(5, 3, 16), row(11, 3, 16), row(17, 3, 16),
      col(20, 4, 15), poly([[18, 13], [20, 15], [22, 13]]),
    ],
  },
  {
    slug: "index-ivf", category: "rag", subcategory: "vector",
    name: "IVF index", description: "An IVF index — ask the nearest cluster rather than the whole world, approximate and fast",
    tags: ["clusters", "cells", "approx"], family: "figure",
    aliases: ["cluster-index"], keywords: ["ivf", "inverted file index", "clusters"],
    shapes: [
      disc(7, 7, 4), disc(7, 7, 1),
      disc(17, 7, 4), disc(17, 7, 1),
      disc(12, 17, 4), disc(12, 17, 1),
    ],
  },
  {
    slug: "top-n-tune", category: "rag", subcategory: "ranking",
    name: "Top-N", description: "Top-N — how many of the best results to keep, the cutoff k for retrieval",
    tags: ["cutoff", "k", "keep"], family: "figure",
    aliases: ["top-k-results"], keywords: ["top n", "top k", "result count"],
    shapes: [
      row(4, 8, 20), row(9, 8, 20), row(14, 8, 20), row(19, 8, 20),
      poly([[5.5, 2], [3, 2], [3, 11], [5.5, 11]]),
    ],
  },
  {
    slug: "lost-in-middle", category: "rag", subcategory: "grounding",
    name: "Lost in the middle", description: "Lost in the middle — the context a model skims past when it sits between the ends",
    tags: ["attention", "middle", "skip"], family: "figure",
    aliases: [], keywords: ["lost in the middle", "position bias", "context skim"],
    // Full lines at the edges; the middle one shrunk to almost nothing.
    shapes: [row(5, 3, 21), row(12, 9, 15), row(19, 3, 21)],
  },
  {
    slug: "multi-hop", category: "rag", subcategory: "retrieval",
    name: "Multi-hop", description: "Multi-hop — the answer is two documents away, reached by chaining retrievals",
    tags: ["hops", "chain", "reason"], family: "chain",
    aliases: ["hop-question"], keywords: ["multi-hop", "chained retrieval", "two hops"],
    shapes: [
      disc(4, 16, 2), disc(12, 16, 2), disc(20, 16, 2),
      arc(8, 14, 4, 180, 360), arc(16, 14, 4, 180, 360),
    ],
  },
  {
    slug: "subquestion", category: "rag", subcategory: "retrieval",
    name: "Subquestion", description: "A subquestion — the big ask cut into pieces that can each be answered",
    tags: ["decompose", "question", "split"], family: "figure",
    aliases: [], keywords: ["subquestion", "question decomposition"],
    shapes: [
      arc(8, 7, 4, 180, 90), disc(8, 15.5, 1),
      arc(17, 13.5, 2.5, 180, 90), disc(17, 19.5, 1),
    ],
  },
  {
    slug: "groundedness", category: "rag", subcategory: "grounding",
    name: "Groundedness", description: "Groundedness — every claim standing on a source, verified and solid",
    tags: ["verified", "sourced", "solid"], family: "figure",
    aliases: [], keywords: ["groundedness", "claims supported", "faithful"],
    shapes: [poly([[7, 9], [11, 13], [17, 7]]), row(17, 4, 20)],
  },
  {
    slug: "context-precision", category: "rag", subcategory: "grounding",
    name: "Context precision", description: "Context precision — how much of what was retrieved actually mattered to the answer",
    tags: ["signal", "ratio", "hit"], family: "figure",
    aliases: [], keywords: ["context precision", "retrieval precision", "signal"],
    shapes: [
      row(5, 3, 13), row(11, 3, 13), row(17, 3, 13),
      disc(19, 11, 3), disc(19, 11, 1),
    ],
  },

  /* ── security: the attacker's playbook ────────────────────────────────────────── */

  {
    slug: "redact-fields", category: "security", subcategory: "ai-security",
    name: "Redact fields", description: "Redact fields — the line is there but the words are hidden behind a bar",
    tags: ["censor", "hide", "bar"], family: "figure",
    aliases: [], keywords: ["redaction", "black bar", "hide fields"],
    shapes: [row(5, 3, 21), rect(6, 9, 12, 4, 2), row(19, 3, 21)],
  },
  {
    slug: "honeypot-ai", category: "security", subcategory: "ai-security",
    name: "Honeypot", description: "A honeypot — bait that knows your name, a decoy that traps an attacker",
    tags: ["trap", "decoy", "lure"], family: "window",
    aliases: ["honeypot"], keywords: ["honeypot", "decoy system", "trap"],
    shapes: [
      poly([[5, 8], [5, 20], [19, 20], [19, 8]]), row(5, 4, 20),
      disc(12, 14, 2),
    ],
  },
  {
    slug: "model-theft", category: "security", subcategory: "ai-security",
    name: "Model theft", description: "Model theft — the whole model extracted and walked out the door",
    tags: ["steal", "extract", "gone"], family: "machine",
    aliases: [], keywords: ["model theft", "extraction", "stolen weights"],
    shapes: [
      frame(2, 7, 14, 10, 3, { chamfer: 3, gap: 3 }),
      row(12, 17.5, 20), poly([[19.5, 9.5], [22, 12], [19.5, 14.5]]),
    ],
  },
  {
    slug: "membership-inference", category: "security", subcategory: "ai-security",
    name: "Membership inference", description: "Membership inference — an attack that tells whether a record was in the training set",
    tags: ["privacy", "identify", "leak"], family: "figure",
    aliases: [], keywords: ["membership inference", "training data leak"],
    shapes: [
      disc(6, 6, 1), disc(18, 6, 1), disc(6, 18, 1), disc(18, 18, 1),
      disc(12, 12, 1), disc(12, 12, 4),
    ],
  },
  {
    slug: "evasion", category: "security", subcategory: "ai-security",
    name: "Evasion", description: "Evasion — an attack that slips straight through the defence without being caught",
    tags: ["bypass", "slip", "attack"], family: "shield",
    aliases: [], keywords: ["evasion attack", "bypass filter", "slip past"],
    shapes: [
      shield(),
      poly([[5, 3], [21, 19]]), poly([[21, 15], [21, 19], [17, 19]]),
    ],
  },
  {
    slug: "sleeper", category: "security", subcategory: "ai-security",
    name: "Sleeper", description: "A sleeper — a model that behaves until the trigger phrase wakes its hidden behaviour",
    tags: ["dormant", "hidden", "trigger"], family: "agent",
    aliases: ["sleeper-agent"], keywords: ["sleeper agent", "dormant backdoor"],
    shapes: [
      arc(10, 13, 6, 295, 245),
      poly([[15, 4], [19, 4], [15, 8], [19, 8]]),
    ],
  },
  {
    slug: "secret-scan", category: "security", subcategory: "ai-security",
    name: "Secret scan", description: "Secret scan — find the credential somebody committed to the code",
    tags: ["credential", "found", "code"], family: "page",
    aliases: [], keywords: ["secret scanning", "leaked key", "credentials in code"],
    shapes: [page(), disc(10, 11, 2), row(12, 11, 16), col(14.5, 12, 14.5)],
  },
  {
    slug: "short-lived-token", category: "security", subcategory: "auth",
    name: "Short-lived token", description: "A short-lived token — good for minutes on purpose, then it expires",
    tags: ["expiry", "temporary", "auth"], family: "figure",
    aliases: [], keywords: ["short lived token", "ephemeral credential", "ttl token"],
    shapes: [
      rect(2, 9, 12, 6, 3),
      disc(18, 12, 4), col(18, 9.5, 12), row(12, 18, 20.5),
    ],
  },
  {
    slug: "break-glass", category: "security", subcategory: "auth",
    name: "Break glass", description: "Break glass — the emergency access you hope stays sealed until it is truly needed",
    tags: ["emergency", "override", "crack"], family: "window",
    aliases: [], keywords: ["break glass access", "emergency override"],
    shapes: [
      rect(4, 4, 16, 16, 2),
      poly([[11, 4.5], [8.5, 7], [11.5, 10], [9, 12.5]]),
    ],
  },
  {
    slug: "vault-secret", category: "security", subcategory: "auth",
    name: "Vault", description: "A vault — behind the dial, the secrets and keys that matter most",
    tags: ["safe", "store", "dial"], family: "window",
    aliases: ["secrets-vault"], keywords: ["vault", "secret store", "safe"],
    shapes: [rect(4, 4, 16, 16, 2), disc(12, 12, 4), disc(12, 12, 1)],
  },

  /* ── devops: the scheduler's mercy ────────────────────────────────────────────── */

  {
    slug: "reserved-node", category: "devops", subcategory: "infrastructure",
    name: "Reserved node", description: "A reserved node — capacity paid for in advance and held for you",
    tags: ["committed", "held", "capacity"], family: "window",
    aliases: ["reserved-instance"], keywords: ["reserved instance", "committed capacity"],
    // The node with the bookmark inside — held.
    shapes: [
      rect(4, 4, 16, 16, 2),
      poly([[9.5, 7], [14.5, 7], [14.5, 16], [12, 13.5], [9.5, 16]], true),
    ],
  },
  {
    slug: "scale-to-zero", category: "devops", subcategory: "infrastructure",
    name: "Scale to zero", description: "Scale to zero — nobody asked, so nothing runs and nothing is billed",
    tags: ["idle", "zero", "serverless"], family: "chart",
    aliases: [], keywords: ["scale to zero", "idle down", "serverless"],
    shapes: [
      poly([[3, 3], [3, 21], [21, 21]]),
      poly([[5, 7], [11, 13], [19, 21]]),
    ],
  },
  {
    slug: "prewarm-pool", category: "devops", subcategory: "infrastructure",
    name: "Prewarm pool", description: "A prewarm pool — empty seats already warm and waiting for requests",
    tags: ["ready", "warm", "standby"], family: "figure",
    aliases: [], keywords: ["prewarmed pool", "warm capacity", "no cold start"],
    shapes: [
      poly([[3, 14], [3, 19], [21, 19], [21, 14]]),
      poly([[9, 11], [11, 9], [9, 7]]), poly([[15, 11], [17, 9], [15, 7]]),
    ],
  },
  {
    slug: "affinity", category: "devops", subcategory: "orchestration",
    name: "Affinity", description: "Affinity — schedule these two workloads together on the same machine",
    tags: ["together", "attract", "placement"], family: "orbit",
    aliases: [], keywords: ["affinity", "co-locate", "same node"],
    shapes: [
      disc(6, 12, 4), disc(18, 12, 4),
      col(12, 10, 14), row(12, 10, 14),
    ],
  },
  {
    slug: "anti-affinity", category: "devops", subcategory: "orchestration",
    name: "Anti-affinity", description: "Anti-affinity — never these two on the same box, kept apart for resilience",
    tags: ["apart", "repel", "placement"], family: "orbit",
    aliases: [], keywords: ["anti-affinity", "spread", "different nodes"],
    shapes: [
      disc(6, 12, 4), disc(18, 12, 4),
      col(10.5, 8, 16), col(13.5, 8, 16),
    ],
  },
  {
    slug: "inference-server", category: "devops", subcategory: "infrastructure",
    name: "Inference server", description: "An inference server — the rack that answers model requests in production",
    tags: ["serving", "rack", "run"], family: "window",
    aliases: ["model-server"], keywords: ["inference server", "serving", "model endpoint"],
    shapes: [
      rect(3, 8, 18, 8, 2), disc(7, 12, 1),
      poly([[13, 9.5], [15.5, 12], [13, 14.5]], true),
    ],
  },
  {
    slug: "batch-window", category: "devops", subcategory: "orchestration",
    name: "Batch window", description: "A batch window — the hours when the heavy work is allowed to run",
    tags: ["schedule", "hours", "night"], family: "window",
    aliases: [], keywords: ["batch window", "maintenance window", "off-peak"],
    shapes: [rect(3, 5, 18, 14, 2), col(12, 9, 12), row(12, 12, 15)],
  },
  {
    slug: "dynamic-batch", category: "devops", subcategory: "orchestration",
    name: "Dynamic batching", description: "Dynamic batching — requests that arrive together ride through the model together",
    tags: ["group", "requests", "throughput"], family: "figure",
    aliases: [], keywords: ["dynamic batching", "request batching", "inference batch"],
    shapes: [
      disc(4.5, 6, 1), disc(4.5, 12, 1), disc(4.5, 18, 1),
      poly([[8, 4], [10.5, 4], [10.5, 20], [8, 20]]),
      row(12, 13, 17), poly([[16.5, 9.5], [19, 12], [16.5, 14.5]]),
    ],
  },
  {
    slug: "admission-control", category: "devops", subcategory: "orchestration",
    name: "Admission control", description: "Admission control — the barrier stays down until there is room for more",
    tags: ["gate", "barrier", "limit"], family: "figure",
    aliases: [], keywords: ["admission control", "gate", "load gate"],
    shapes: [col(4, 6, 20), poly([[4, 13], [13, 4]]), row(20, 3, 21)],
  },
  {
    slug: "cell-arch", category: "devops", subcategory: "infrastructure",
    name: "Cell architecture", description: "Cell architecture — the blast radius limited by construction, failures contained in cells",
    tags: ["isolate", "cells", "contain"], family: "window",
    aliases: ["cell-based"], keywords: ["cell architecture", "isolation", "blast radius"],
    shapes: [
      rect(2.5, 4, 8, 7, 2), disc(6.5, 7.5, 1),
      rect(13.5, 4, 8, 7, 2), disc(17.5, 7.5, 1),
      rect(8, 14, 8, 7, 2), disc(12, 17.5, 1),
    ],
  },
];
