/**
 * Batch 35 — a stage that ran and a stage that did not, and things measured against a target.
 *
 * `pipeline-run` and `pipeline-fail` are the same drawing with one thing swapped in the
 * stage's hollow — the mark system applied to a body that is not a badge holder. The stage,
 * the line out of it and the arrow are byte-identical across the pair.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { page, ring } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_35: Icon[] = [
  /* ── A stage that ran, and one that did not ───────────────────────────────────── */

  {
    slug: "pipeline-run", category: "devops", subcategory: "ci-cd",
    name: "Pipeline run", description: "Pipeline run — this stage of the build is going, started and in progress",
    tags: ["running", "started", "build"], family: "figure",
    aliases: [], keywords: ["build running", "in progress", "job started", "execution"],
    shapes: [
      rect(2, 6, 12, 12, 2), poly([[6, 9], [9, 12], [6, 15]], true),
      row(12, 14, 18), poly([[18, 9], [21, 12], [18, 15]]),
    ],
  },
  {
    slug: "pipeline-fail", category: "devops", subcategory: "ci-cd",
    name: "Pipeline failure", description: "Pipeline failure — this stage went red, the build is broken and needs a fix",
    tags: ["failed", "red", "broken"], family: "figure",
    aliases: [], keywords: ["build failed", "red build", "job failed", "broken pipeline"],
    shapes: [
      rect(2, 6, 12, 12, 2), poly([[5, 9], [11, 15]]), poly([[11, 9], [5, 15]]),
      row(12, 14, 18), poly([[18, 9], [21, 12], [18, 15]]),
    ],
  },
  {
    slug: "pod", category: "devops", subcategory: "container",
    name: "Pod", description: "A pod — a group of containers that live and die together on Kubernetes",
    tags: ["kubernetes", "group", "unit"], family: "window",
    aliases: [], keywords: ["kubernetes", "k8s", "sidecar", "scheduling unit", "co-located"],
    shapes: [rect(2, 5, 20, 14, 2), disc(7, 12, 3), disc(17, 12, 3)],
  },
  {
    slug: "postmortem", category: "devops", subcategory: "incident",
    name: "Postmortem", description: "A postmortem — what went wrong, written down afterwards so the team can learn",
    tags: ["retro", "writeup", "learn"], family: "page",
    aliases: [], keywords: ["incident review", "retrospective", "root cause", "blameless", "learn"],
    // A line that climbs to the right is a picture of a mountain, which is `attachment-image`.
    // An incident falls first.
    shapes: [page(), row(8, 7, 17), poly([[7, 12], [12, 17], [17, 17]])],
  },

  /* ── Measured against a target ────────────────────────────────────────────────── */

  {
    slug: "precision", category: "ai", subcategory: "evaluation",
    name: "Precision", description: "Precision — how many of the hits were actually right, tight and accurate",
    tags: ["accuracy", "tight", "hits"], family: "orbit",
    aliases: [], keywords: ["true positives", "exactness", "false positives", "tight grouping"],
    // A tight cluster of dots cannot be drawn: a painted r=1 disc is four units across, so
    // three of them close enough to read as *tight* merge into one blob. Two marks on a rule
    // say the same thing and survive bold.
    shapes: [
      rect(6, 2, 12, 20, 2), row(6, 6, 11), row(10, 6, 13.5), row(14, 6, 11), row(18, 6, 13.5),
    ],
  },
  {
    slug: "objective", category: "agents", subcategory: "planning",
    name: "Objective", description: "An objective — the target a model, an agent or a team is trying to reach",
    tags: ["target", "aim", "goal"], family: "orbit",
    aliases: [], keywords: ["target", "aim", "north star", "what success is", "intent"],
    shapes: [ring(), disc(12, 12, 2), poly([[20, 4], [15, 9]]), poly([[15, 6], [15, 9], [18, 9]])],
  },
  {
    slug: "model-comparison", category: "ai", subcategory: "evaluation",
    name: "Model comparison", description: "Model comparison — this model against that one, benchmarked side by side",
    tags: ["versus", "bench", "two"], family: "figure",
    aliases: [], keywords: ["a/b models", "leaderboard", "head to head", "which is better"],
    shapes: [rect(2, 4, 8, 16, 2), rect(14, 4, 8, 16, 2), row(9, 10, 14), row(15, 10, 14)],
  },
  {
    slug: "overfit", category: "ai", subcategory: "training",
    name: "Overfit", description: "Overfit — a curve that followed every wobble of the training data and memorised it",
    tags: ["memorised", "variance", "too-close"], family: "chart",
    aliases: [], keywords: ["overfitting", "memorised training set", "high variance", "generalise"],
    // The wiggle is what the model learned; the straight line under it is what was there.
    shapes: [poly([[3, 9], [6, 6], [9, 9], [12, 6], [15, 9], [18, 6], [21, 9]]), row(16, 3, 21)],
  },
  {
    slug: "noise", category: "ai", subcategory: "training",
    name: "Noise", description: "Noise — random scatter and jitter that carries no signal worth keeping",
    tags: ["random", "scatter", "jitter"], family: "figure",
    aliases: [], keywords: ["random", "jitter", "signal to noise", "scatter", "interference"],
    shapes: [disc(5, 7, 1), disc(11, 5, 1), disc(18, 8, 1), disc(7, 14, 1), disc(14, 12, 1), disc(19, 17, 1)],
  },
  {
    slug: "prune", category: "ai", subcategory: "training",
    name: "Prune", description: "Prune — cut away the parameters or branches that were not earning their place",
    tags: ["cut", "drop", "shrink"], family: "figure",
    aliases: ["pruning"], keywords: ["cut branch", "drop weights", "sparsity", "trim", "shrink"],
    shapes: [
      col(6, 4, 20), row(9, 6, 14), row(15, 6, 14),
      poly([[16, 7], [20, 11]]), poly([[20, 7], [16, 11]]),
    ],
  },

  /* ── Sorting, counting, throttling ────────────────────────────────────────────── */

  {
    slug: "poll", category: "analytics", subcategory: "segment",
    name: "Poll", description: "A poll — what people said when they were asked, votes and survey answers",
    tags: ["vote", "survey", "answers"], family: "chart",
    aliases: ["survey"], keywords: ["vote", "survey", "responses", "share of answers"],
    shapes: [rect(2, 4, 20, 16, 2), row(9, 5, 19), row(13, 5, 15), row(17, 5, 11)],
  },
  {
    slug: "profiler", category: "devtools", subcategory: "debug",
    name: "Profiler", description: "A profiler — shows where the time actually went, the hot paths of a program",
    tags: ["flame", "timing", "hot"], family: "chart",
    aliases: [], keywords: ["flamegraph", "hot path", "cpu time", "trace", "where time went"],
    shapes: [row(6, 2, 22), row(10, 2, 16), row(14, 4, 16), row(18, 4, 10)],
  },
  {
    slug: "priority-queue", category: "data", subcategory: "streaming",
    name: "Priority queue", description: "A priority queue — a queue where urgent items go first, ordered ahead of the rest",
    tags: ["ordered", "ahead", "urgent"], family: "figure",
    aliases: [], keywords: ["priority", "jump the queue", "heap", "urgent first", "ordered"],
    shapes: [
      row(8, 3, 17), row(13, 3, 17), row(18, 3, 17),
      poly([[20, 15], [20, 9]]), poly([[18, 11], [20, 9], [22, 11]]),
    ],
  },
  {
    slug: "rate-limit", category: "devtools", subcategory: "api",
    name: "Rate limit", description: "A rate limit — many asking and fewer let through, a throttle that returns 429",
    tags: ["throttle", "429", "quota"], family: "figure",
    aliases: [], keywords: ["429", "throttle", "requests per second", "backoff", "quota"],
    shapes: [
      row(8, 2, 10), row(12, 2, 10), row(16, 2, 10),
      poly([[11, 7], [11, 17]]), row(12, 13, 22),
    ],
  },

  /* ── Networks, nodes and what joins them ──────────────────────────────────────── */

  {
    slug: "node", category: "cloud", subcategory: "compute",
    name: "Node", description: "A node — one machine, instance or member in a cluster of many",
    tags: ["instance", "member", "host"], family: "figure",
    aliases: [], keywords: ["instance", "host", "worker", "member", "vm"],
    shapes: [disc(12, 12, 4), row(12, 2, 8), row(12, 16, 22)],
  },
  {
    slug: "peering", category: "cloud", subcategory: "network",
    name: "Peering", description: "Peering — two networks joined directly to each other, a VPC link",
    tags: ["direct", "vpc", "link"], family: "figure",
    aliases: [], keywords: ["vpc peering", "direct connect", "private link", "cross network"],
    // Two networks joined directly, drawn on the diagonal so the pair stands as tall as
    // its neighbours.
    shapes: [disc(5.5, 5.5, 3), poly([[9.5, 9.5], [14.5, 14.5]]), disc(18.5, 18.5, 3)],
  },
  {
    slug: "parser", category: "data", subcategory: "transform",
    name: "Parser", description: "A parser — text going in, a structured tree coming out the other side",
    tags: ["ast", "read", "structure"], family: "figure",
    aliases: [], keywords: ["ast", "tokenise", "grammar", "read into structure", "syntax tree"],
    shapes: [row(12, 2, 13), col(13, 7, 17), row(7, 13, 20), row(17, 13, 20)],
  },

  /* ── Records about people, and rules about them ───────────────────────────────── */

  {
    slug: "pii-redaction", category: "security", subcategory: "compliance",
    name: "PII redaction", description: "PII redaction — the personal details covered over so privacy is kept",
    tags: ["masked", "blacked-out", "privacy"], family: "page",
    aliases: [], keywords: ["masked", "anonymise", "personal data", "blacked out", "scrub"],
    shapes: [page(), row(10, 7, 17), rect(7, 13, 10, 5, 2.5)],
  },
  {
    slug: "policy", category: "security", subcategory: "policy",
    name: "Policy", description: "A policy — the rules written down, the standard that governs what may happen",
    tags: ["rule", "standard", "governs"], family: "page",
    aliases: [], keywords: ["rules", "standard", "governance", "must", "enforcement"],
    shapes: [page(), col(9, 8, 18), row(10, 11, 17), row(13, 11, 17), row(16, 11, 17)],
  },
  {
    slug: "passkey", category: "security", subcategory: "auth",
    name: "Passkey", description: "A passkey — the device itself is the key, passwordless sign-in with WebAuthn",
    tags: ["webauthn", "device", "passwordless"], family: "figure",
    aliases: [], keywords: ["webauthn", "fido2", "passwordless", "device bound", "biometric login"],
    shapes: [rect(7, 3, 10, 18, 2), disc(12, 9, 2), col(12, 11, 17), row(15, 12, 15)],
  },
  {
    slug: "phishing", category: "security", subcategory: "threat",
    name: "Phishing", description: "Phishing — the hook waiting for a bite, a scam lure disguised as something trusted",
    tags: ["lure", "scam", "bait"], family: "figure",
    aliases: [], keywords: ["scam email", "lure", "credential harvest", "spoofed", "bait"],
    // One object, drawn whole: eye, shank, bend, barb. Every composition tried around it —
    // envelope under a hook, a hook through a window — buried the hook in its scenery;
    // the hook alone is the threat. The eye sits tangent on the shank as `passkey`'s
    // bow does on its stem.
    shapes: [
      disc(15, 4, 2), col(15, 6, 15.5),
      arc(10.5, 15.5, 4.5, 0, 180), col(6, 11, 15.5),
    ],
  },
  {
    slug: "primary-key", category: "data", subcategory: "storage",
    name: "Primary key", description: "A primary key — the unique column that identifies which row is which",
    tags: ["unique", "id", "index"], family: "figure",
    aliases: [], keywords: ["unique key", "id column", "identity", "index", "pk"],
    shapes: [disc(5, 7, 2), row(7, 7, 15), col(13, 7, 10), rect(2, 12, 20, 8, 2)],
  },

  /* ── Nothing, and everything ──────────────────────────────────────────────────── */

  {
    slug: "null", category: "data", subcategory: "quality",
    name: "Null", description: "Null — there is nothing here, an empty or missing value in the field",
    tags: ["empty", "missing", "none"], family: "orbit",
    aliases: [], keywords: ["empty", "missing value", "none", "nil", "no data"],
    // A ring with a slash through it is `agent-blocked`, byte for byte. A cell is not.
    shapes: [rect(2, 4, 20, 16, 2), poly([[6, 18], [18, 6]])],
  },
  {
    slug: "palette", category: "interface", subcategory: "media",
    name: "Palette", description: "A palette — the set of colours and swatches to choose from in a theme",
    tags: ["colour", "swatch", "theme"], family: "window",
    aliases: ["colours"], keywords: ["swatches", "colour picker", "theme", "brand colours"],
    shapes: [rect(2, 4, 20, 16, 2), disc(7, 9, 2), disc(13, 9, 2), disc(10, 15, 2)],
  },
  {
    slug: "openapi", category: "devtools", subcategory: "api",
    name: "OpenAPI", description: "OpenAPI — the Swagger document that describes an API's endpoints and schemas",
    tags: ["spec", "swagger", "schema"], family: "page",
    aliases: ["swagger"], keywords: ["swagger", "spec", "api description", "yaml", "endpoints"],
    // `page()`'s walls sit at 6 and 18, which leaves a brace pair either too near the wall
    // or too near each other. A window is wider and both fit.
    shapes: [rect(2, 4, 20, 16, 2), poly([[10, 8], [8, 10], [8, 14], [10, 16]]), poly([[14, 8], [16, 10], [16, 14], [14, 16]])],
  },
];
