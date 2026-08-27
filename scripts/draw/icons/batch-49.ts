/**
 * Batch 49 — the last drawing batch: stages, steps and strategies; marks made by machines;
 * and the catalog's tail of one-word workhorses.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { SMALL, check } from "../marks.ts";
import { cycle, cloud as cloudBody, machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_49: Icon[] = [
  /* ── Stages, steps, strategies ────────────────────────────────────────────────── */

  {
    slug: "stage", category: "devops", subcategory: "ci-cd",
    name: "Stage", description: "One stop on the way to shipped",
    tags: ["phase", "step", "gate"], family: "figure",
    aliases: [], keywords: ["deployment stage", "phase", "one stop"],
    shapes: [row(12, 2, 6), rect(6, 7, 12, 10, 2), row(12, 18, 22), disc(12, 12, 1)],
  },
  {
    slug: "step", category: "automation", subcategory: "workflow",
    name: "Step", description: "One thing at a time",
    tags: ["single", "increment", "one"], family: "figure",
    aliases: [], keywords: ["one step", "single action", "increment"],
    shapes: [row(18, 3, 10), col(10, 11, 18), row(11, 10, 17), col(17, 4, 11)],
  },
  {
    slug: "strategy", category: "agents", subcategory: "planning",
    name: "Strategy", description: "Which way, decided before moving",
    tags: ["plan", "route", "chosen"], family: "figure",
    aliases: [], keywords: ["chosen route", "game plan", "which way"],
    shapes: [disc(5, 19, 2), poly([[7, 17], [11, 13]]), poly([[11, 13], [15, 13]]), poly([[15, 13], [19, 9]]), poly([[19, 5], [19, 9], [15, 9]]),
    ],
  },
  {
    slug: "retry-flow", category: "automation", subcategory: "workflow",
    name: "Retry flow", description: "Failed, waited, went again",
    tags: ["again", "backoff", "loop"], family: "figure",
    aliases: [], keywords: ["retry loop", "backoff and retry", "try again"],
    shapes: [rect(2, 2, 8, 8, 2), poly([[6, 10], [6, 16], [10, 16]]), arc(15, 15, 5, 300, 240), poly([[11, 9.5], [14, 9.5], [14, 12.5]])],
  },
  {
    slug: "timeout-flow", category: "automation", subcategory: "condition",
    name: "Timeout branch", description: "Where it goes when it takes too long",
    tags: ["deadline", "branch", "expired"], family: "figure",
    aliases: [], keywords: ["timeout branch", "deadline path", "took too long"],
    shapes: [disc(7, 12, 5), poly([[7, 9], [7, 12], [9.5, 12]]), row(12, 15, 18), col(21, 7, 17)],
  },
  {
    slug: "lifecycle", category: "agents", subcategory: "lifecycle",
    name: "Lifecycle", description: "Born, works, rests, gone",
    tags: ["phases", "cycle", "states"], family: "orbit",
    aliases: [], keywords: ["phases", "from start to end", "states of life"],
    shapes: [...cycle(), disc(12, 9.5, 1), disc(9, 14, 1), disc(15, 14, 1)],
  },

  /* ── Marks made by machines ───────────────────────────────────────────────────── */

  {
    slug: "signature-crypto", category: "security", subcategory: "encryption",
    name: "Cryptographic signature", description: "Math that says it was them",
    tags: ["signed", "verify", "hash"], family: "figure",
    aliases: [], keywords: ["digital signature", "signed hash", "verify author"],
    shapes: [disc(7, 12, 4), poly([[5, 10], [9, 14]]), row(12, 11, 21), col(15, 12, 15), col(19, 12, 16)],
  },
  {
    slug: "provenance-chain", category: "security", subcategory: "ai-security",
    name: "Provenance chain", description: "Every hand it passed through, linked",
    tags: ["custody", "linked", "history"], family: "figure",
    aliases: [], keywords: ["chain of custody", "linked history", "c2pa"],
    shapes: [rect(2, 2, 7, 7, 2), poly([[11, 11], [13, 13]]), rect(15, 15, 7, 7, 2)],
  },
  {
    slug: "regularise", category: "ai", subcategory: "training",
    name: "Regularise", description: "Held back from memorising",
    tags: ["dropout", "penalty", "smooth"], family: "chart",
    aliases: ["regularize"], keywords: ["dropout", "weight decay", "keep it smooth"],
    shapes: [poly([[3, 15], [8, 10], [13, 15], [18, 10]]), row(6, 3, 21)],
  },

  /* ── The catalog's tail ───────────────────────────────────────────────────────── */

  {
    slug: "chunking", category: "rag", subcategory: "chunking",
    name: "Chunking", description: "The whole, made into pieces that fit",
    tags: ["split", "pieces", "size"], family: "figure",
    aliases: [], keywords: ["split into chunks", "pieces", "fit the window"],
    shapes: [rect(2, 4, 20, 6, 3), rect(2, 14, 9, 6, 3), rect(13, 14, 9, 6, 3)],
  },
  {
    slug: "constraint-db", category: "data", subcategory: "quality",
    name: "Constraint", description: "What the database refuses to store",
    tags: ["not-null", "unique", "rule"], family: "figure",
    aliases: [], keywords: ["not null", "unique", "foreign key rule"],
    shapes: [rect(2, 4, 20, 7, 2), rect(2, 14, 20, 7, 2), col(12, 11, 14), disc(12, 7.5, 1)],
  },
  {
    slug: "firewall-cloud", category: "security", subcategory: "policy",
    name: "Cloud firewall", description: "The wall, rented",
    tags: ["waf", "managed", "edge"], family: "cloud",
    aliases: ["waf"], keywords: ["waf", "managed firewall", "edge rules"],
    shapes: [cloudBody(3), row(18, 4, 20), row(21, 4, 12), row(21, 15, 20)],
  },
  {
    slug: "mapping", category: "data", subcategory: "transform",
    name: "Mapping", description: "Each of these to one of those",
    tags: ["pairs", "translate", "onto"], family: "figure",
    aliases: [], keywords: ["one to one", "pairs", "translate keys"],
    shapes: [disc(5, 6, 1), disc(5, 12, 1), disc(5, 18, 1), row(6, 8, 18), row(12, 8, 15), row(18, 8, 18)],
  },
  {
    slug: "materialise", category: "data", subcategory: "transform",
    name: "Materialise", description: "The query's answer, made a table",
    tags: ["view", "cached", "solid"], family: "figure",
    aliases: ["materialize"], keywords: ["materialised view", "made solid", "precomputed"],
    shapes: [poly([[3, 4], [9, 4], [9, 10], [3, 10]]), poly([[12, 7], [15, 7]]), rect(2, 13, 20, 8, 2), row(17, 6, 18)],
  },
  {
    slug: "metric-card", category: "analytics", subcategory: "dashboard",
    name: "Metric card", description: "One number, framed",
    tags: ["tile", "kpi", "single"], family: "window",
    aliases: [], keywords: ["stat tile", "one number", "framed metric"],
    shapes: [rect(2, 6, 20, 12, 2), col(7, 10, 14), col(11, 9, 14), col(15, 11, 14)],
  },
  {
    slug: "metric-point", category: "analytics", subcategory: "metric",
    name: "Metric point", description: "One reading, at one moment",
    tags: ["sample", "datum", "dot"], family: "chart",
    aliases: [], keywords: ["data point", "one reading", "sample at time"],
    shapes: [col(4, 3, 21), row(21, 4, 22), disc(13, 11, 2), col(13, 14, 18)],
  },
  {
    slug: "mmr", category: "rag", subcategory: "ranking",
    name: "MMR", description: "Relevant, but not all the same",
    tags: ["diversity", "rerank", "spread"], family: "figure",
    aliases: [], keywords: ["maximal marginal relevance", "diverse results"],
    shapes: [row(6, 3, 21), row(11, 3, 17), poly([[8, 9], [12, 13]]), row(16, 3, 19)],
  },
  {
    slug: "panel", category: "interface", subcategory: "layout",
    name: "Panel", description: "One region with a job",
    tags: ["pane", "region", "side"], family: "window",
    aliases: ["pane"], keywords: ["side panel", "region", "pane"],
    shapes: [rect(2, 4, 20, 16, 2), col(15, 4, 20), row(9, 15, 22), row(13, 15, 22)],
  },
  {
    slug: "pose", category: "ai", subcategory: "multimodal",
    name: "Pose", description: "Where the body's joints are",
    tags: ["skeleton", "keypoints", "body"], family: "figure",
    aliases: [], keywords: ["pose estimation", "keypoints", "skeleton"],
    shapes: [disc(12, 4, 2), col(12, 6, 14), poly([[12, 8], [7, 13]]), poly([[12, 8], [17, 13]]), poly([[12, 14], [7, 19]]), poly([[12, 14], [17, 19]])],
  },
  {
    slug: "ranking", category: "rag", subcategory: "ranking",
    name: "Ranking", description: "Best first, worst last",
    tags: ["order", "sorted", "best"], family: "figure",
    aliases: [], keywords: ["ordered by score", "best first"],
    shapes: [disc(4, 6, 1), row(6, 7, 21), disc(4, 12, 1), row(12, 7, 17), disc(4, 18, 1), row(18, 7, 13)],
  },
  {
    slug: "resource", category: "mcp", subcategory: "resource",
    name: "Resource", description: "A thing with an address",
    tags: ["uri", "addressable", "thing"], family: "figure",
    aliases: [], keywords: ["uri", "addressable", "named thing"],
    shapes: [rect(4, 4, 16, 16, 2), disc(9, 12, 1), row(12, 12, 17)],
  },
  {
    slug: "rest", category: "devtools", subcategory: "api",
    name: "REST", description: "Verbs against addresses",
    tags: ["http", "crud", "api"], family: "figure",
    aliases: [], keywords: ["get post put delete", "http api", "crud"],
    shapes: [rect(2, 4, 20, 6, 3), disc(6, 7, 1), row(7, 10, 18), rect(2, 14, 20, 6, 3), disc(6, 17, 1), row(17, 10, 15)],
  },
  {
    slug: "review", category: "devtools", subcategory: "version-control",
    name: "Review", description: "Another pair of eyes before it lands",
    tags: ["approve", "look", "pr"], family: "page",
    aliases: [], keywords: ["code review", "another look", "approve pr"],
    // Page plus check is `document-check`. A review is the comments AND the verdict.
    shapes: [page(), row(9, 8, 16), row(12, 8, 13), ...check(SMALL, 17)],
  },
  {
    slug: "rule", category: "automation", subcategory: "condition",
    name: "Rule", description: "When this, then that — always",
    tags: ["if-then", "policy", "always"], family: "figure",
    aliases: [], keywords: ["if then", "always applies", "condition action"],
    shapes: [rect(2, 4, 8, 7, 2), row(7.5, 11, 14), rect(14, 13, 8, 7, 2)],
  },
  {
    slug: "segment", category: "analytics", subcategory: "segment",
    name: "Segment", description: "The part of the whole you mean",
    tags: ["slice", "cohort", "part"], family: "chart",
    aliases: [], keywords: ["cohort", "slice of users", "part of whole"],
    shapes: [disc(12, 12, 9), poly([[12, 12], [12, 3]]), poly([[12, 12], [18, 6]])],
  },
  {
    slug: "sync-source", category: "data", subcategory: "pipeline",
    name: "Sync source", description: "The side the truth comes from",
    tags: ["origin", "master", "from"], family: "figure",
    aliases: [], keywords: ["source of truth", "sync from", "origin side"],
    shapes: [rect(2, 6, 8, 12, 2), disc(6, 10, 1), row(12, 12, 20), poly([[17, 9], [20, 12], [17, 15]])],
  },
  {
    slug: "top-result", category: "rag", subcategory: "ranking",
    name: "Top result", description: "The one that won",
    tags: ["first", "best", "hit"], family: "figure",
    aliases: [], keywords: ["best match", "first hit", "winner"],
    shapes: [rect(2, 3, 20, 7, 2), disc(6, 6.5, 1), row(6.5, 9, 18), row(14, 2, 22), row(18, 4, 16)],
  },
  {
    slug: "trace-span", category: "analytics", subcategory: "llm-observability",
    name: "Trace span", description: "This much of the time was this call",
    tags: ["duration", "bar", "timing"], family: "chart",
    aliases: [], keywords: ["span bar", "duration", "this call took"],
    shapes: [col(4, 3, 21), rect(7, 5.5, 13, 3, 1.5), rect(10, 11.5, 12, 3, 1.5), rect(7, 17.5, 7, 3, 1.5)],
  },
  {
    slug: "transport", category: "mcp", subcategory: "transport",
    name: "Transport", description: "However the messages travel",
    tags: ["channel", "wire", "carries"], family: "figure",
    aliases: [], keywords: ["message channel", "wire", "how it travels"],
    shapes: [row(7.5, 2, 22), row(16.5, 2, 22), disc(8, 12, 2), disc(16, 12, 2)],
  },
  {
    slug: "upscale", category: "interface", subcategory: "media",
    name: "Upscale", description: "The same picture, more of it",
    tags: ["enlarge", "enhance", "grow"], family: "figure",
    aliases: [], keywords: ["enlarge", "super resolution", "enhance"],
    shapes: [rect(2, 10, 10, 10, 2), poly([[14, 10], [20, 4]]), poly([[15, 4], [20, 4], [20, 9]])],
  },
];
