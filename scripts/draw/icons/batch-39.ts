/**
 * Batch 39 — the three service letters, four kinds of trigger, and lines that go up or down.
 *
 * `sli`, `slo` and `sla` are one meter read three ways: the needle, the mark the needle is
 * held to, and the page that says what happens if it is not. The `trigger-*` four share one
 * grammar — the thing that fires on the left, the arrow it fires on the right.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_39: Icon[] = [
  /* ── The three service letters ────────────────────────────────────────────────── */

  {
    slug: "sli", category: "devops", subcategory: "observability",
    name: "SLI", description: "An SLI — the service level indicator you actually measure, such as latency or error rate",
    tags: ["indicator", "measured", "metric"], family: "meter",
    aliases: [], keywords: ["service level indicator", "measured", "latency p99", "error rate"],
    shapes: [arc(12, 17, 9, 200, 340), poly([[12, 17], [17, 12]]), disc(12, 17, 1)],
  },
  {
    slug: "slo", category: "devops", subcategory: "observability",
    name: "SLO", description: "An SLO — the service level objective you hold yourself to, the target for an indicator",
    tags: ["objective", "target", "line"], family: "meter",
    aliases: [], keywords: ["service level objective", "target", "error budget", "99.9"],
    shapes: [arc(12, 17, 9, 200, 340), poly([[12, 17], [17, 12]]), disc(12, 17, 1), poly([[17, 3], [19, 5], [22, 2]])],
  },
  {
    slug: "sla", category: "devops", subcategory: "observability",
    name: "SLA", description: "An SLA — the service level agreement, a promise with a signature on it",
    tags: ["agreement", "contract", "promise"], family: "page",
    aliases: [], keywords: ["service level agreement", "contract", "uptime promise", "penalty"],
    shapes: [page(), arc(12, 15, 4, 200, 340), poly([[12, 15], [14.5, 12.5]]), row(18, 8, 16)],
  },
  {
    slug: "uptime", category: "devops", subcategory: "observability",
    name: "Uptime", description: "Uptime — how long a service has stayed up and available without an outage",
    tags: ["available", "steady", "alive"], family: "chart",
    aliases: [], keywords: ["availability", "nines", "steady", "no downtime", "alive"],
    shapes: [row(11, 2, 22), row(17, 2, 11), row(17, 15, 22), poly([[16, 6], [18, 8], [22, 4]])],
  },

  /* ── Four kinds of trigger ────────────────────────────────────────────────────── */

  {
    slug: "trigger-manual", category: "automation", subcategory: "trigger",
    name: "Manual trigger", description: "A manual trigger — somebody pressed the button to start it by hand",
    tags: ["button", "by-hand", "start"], family: "figure",
    aliases: [], keywords: ["run now", "button", "by hand", "kick off", "manual start"],
    shapes: [rect(2, 8, 12, 8, 2), disc(8, 12, 1), row(12, 16, 20), poly([[17, 9], [20, 12], [17, 15]])],
  },
  {
    slug: "trigger-schedule", category: "automation", subcategory: "trigger",
    name: "Scheduled trigger", description: "A scheduled trigger — the clock pressed it, on a cron or a timer",
    tags: ["cron", "timed", "recurring"], family: "figure",
    aliases: [], keywords: ["cron", "on a timer", "recurring", "nightly", "every hour"],
    shapes: [disc(8, 12, 6), poly([[8, 9], [8, 12], [11, 12]]), row(12, 16, 20), poly([[17, 9], [20, 12], [17, 15]])],
  },
  {
    slug: "trigger-webhook", category: "automation", subcategory: "trigger",
    name: "Webhook trigger", description: "A webhook trigger — something outside pushed an event in to start it",
    tags: ["event", "incoming", "push"], family: "figure",
    aliases: [], keywords: ["incoming event", "callback", "push", "external", "http trigger"],
    shapes: [arc(8, 12, 6, 240, 120), disc(8, 12, 2), row(12, 16, 20), poly([[17, 9], [20, 12], [17, 15]])],
  },
  {
    slug: "trigger-file", category: "automation", subcategory: "trigger",
    name: "File trigger", description: "A file trigger — a file arriving or being uploaded started it",
    tags: ["watch", "upload", "arrival"], family: "figure",
    aliases: [], keywords: ["file watcher", "on upload", "new file", "landing", "drop folder"],
    shapes: [
      poly([[12, 8], [12, 20], [3, 20], [3, 4], [8, 4]], true),
      row(12, 16, 20), poly([[17, 9], [20, 12], [17, 15]]),
    ],
  },

  /* ── Lines that go up or down ─────────────────────────────────────────────────── */

  {
    slug: "trend-up", category: "analytics", subcategory: "metric",
    name: "Trend up", description: "Trend up — the number is rising over time, growth and gains on the chart",
    tags: ["rising", "growth", "gain"], family: "chart",
    aliases: [], keywords: ["rising", "growth", "up and to the right", "gain", "improving"],
    shapes: [poly([[3, 17], [9, 11], [13, 15], [21, 7]]), poly([[17, 7], [21, 7], [21, 11]])],
  },
  {
    slug: "trend-down", category: "analytics", subcategory: "metric",
    name: "Trend down", description: "Trend down — the number is falling over time, decline and losses",
    tags: ["falling", "decline", "loss"], family: "chart",
    aliases: [], keywords: ["falling", "decline", "down and to the right", "loss", "worsening"],
    shapes: [poly([[3, 7], [9, 13], [13, 9], [21, 17]]), poly([[17, 17], [21, 17], [21, 13]])],
  },
  {
    slug: "underfit", category: "ai", subcategory: "training",
    name: "Underfit", description: "Underfit — a line too simple for the shape it is chasing, high bias that misses the pattern",
    tags: ["bias", "too-simple", "misses"], family: "chart",
    aliases: [], keywords: ["underfitting", "high bias", "too simple", "misses the pattern"],
    // `overfit`'s wiggle with the wiggle and the line swapped in importance: here the
    // data wobbles and the model is the flat line that ignores it.
    shapes: [row(8, 3, 21), poly([[3, 17], [6, 14], [9, 17], [12, 14], [15, 17], [18, 14], [21, 17]])],
  },
  {
    slug: "staleness", category: "data", subcategory: "quality",
    name: "Staleness", description: "Staleness — how long since this was last true, the age of outdated data",
    tags: ["old", "outdated", "aging"], family: "figure",
    aliases: [], keywords: ["out of date", "last updated", "aging data", "expired", "old"],
    shapes: [disc(10, 12, 6), poly([[10, 9], [10, 12], [13, 12]]), row(20, 14, 21), row(16, 16, 21)],
  },

  /* ── Sync, sort, share ────────────────────────────────────────────────────────── */

  {
    slug: "sync-two-way", category: "data", subcategory: "pipeline",
    name: "Two-way sync", description: "Two-way sync — each side gets what the other has, a mirror in both directions",
    tags: ["both", "mirror", "exchange"], family: "figure",
    aliases: [], keywords: ["bidirectional", "mirror", "exchange", "both ways", "reconcile"],
    shapes: [
      row(9, 4, 18), poly([[15, 6], [18, 9], [15, 12]]),
      row(15, 6, 20), poly([[9, 12], [6, 15], [9, 18]]),
    ],
  },
  {
    slug: "sort", category: "interface", subcategory: "action",
    name: "Sort", description: "Sort — put items in order, arrange or rank them by a chosen key",
    tags: ["order", "arrange", "rank"], family: "rails",
    aliases: ["arrow-down-narrow-wide", "arrow-up-narrow-wide", "arrow-down-a-z", "arrow-down-0-1"], keywords: ["order", "arrange", "rank", "a to z", "by size"],
    shapes: [row(6, 3, 21), row(12, 3, 15), row(18, 3, 9)],
  },
  {
    slug: "share", category: "interface", subcategory: "communication",
    name: "Share", description: "Share — give others a way to reach it, publish a link they can open",
    tags: ["link", "publish", "out"], family: "figure",
    aliases: [], keywords: ["share link", "publish", "give access", "send out", "social"],
    shapes: [disc(8, 12, 2), disc(16, 4, 2), disc(16, 20, 2), poly([[9.5, 10.5], [14.5, 5.5]]), poly([[9.5, 13.5], [14.5, 18.5]])],
  },
  {
    slug: "stash", category: "devtools", subcategory: "version-control",
    name: "Stash", description: "Stash — put changes aside for now and pick them up again later",
    tags: ["shelve", "later", "hold"], family: "tray",
    aliases: ["shelve"], keywords: ["git stash", "set aside", "shelve", "temporary", "pick up later"],
    shapes: [rect(2, 12, 20, 8, 2), col(12, 2, 8), poly([[9, 5], [12, 8], [15, 5]]), row(16, 6, 18)],
  },

  /* ── Tokens, tools and what they cost ─────────────────────────────────────────── */

  {
    slug: "token-count", category: "ai", subcategory: "token",
    name: "Token count", description: "Token count — how many tokens a piece of text became, its length in units",
    tags: ["length", "usage", "number"], family: "figure",
    aliases: [], keywords: ["token length", "context used", "how many tokens", "count"],
    shapes: [
      rect(2, 8, 6, 6, 3), rect(10, 8, 6, 6, 3), rect(18, 8, 4, 7, 2),
      row(18, 3, 13),
    ],
  },
  {
    slug: "tool", category: "agents", subcategory: "tool-use",
    name: "Tool", description: "A tool — something an agent can pick up and use, a capability",
    tags: ["capability", "use", "spanner"], family: "figure",
    aliases: [], keywords: ["capability", "function", "spanner", "use a tool", "equipment"],
    shapes: [rect(6, 11, 12, 9, 2), col(9, 4, 11), col(12, 4, 11), col(15, 4, 11)],
  },
  {
    slug: "timeout", category: "devtools", subcategory: "api",
    name: "Timeout", description: "A timeout — it took too long, so the request was stopped at the deadline",
    tags: ["expired", "deadline", "cut-off"], family: "figure",
    aliases: [], keywords: ["deadline exceeded", "expired", "took too long", "gave up", "504"],
    shapes: [
      disc(10, 12, 6), poly([[10, 9], [10, 12], [13, 12]]),
      poly([[17, 8], [21, 12]]), poly([[21, 8], [17, 12]]),
    ],
  },
  {
    slug: "usage", category: "analytics", subcategory: "metric",
    name: "Usage", description: "Usage — how much of a resource is being used, the meter on consumption",
    tags: ["consumption", "meter", "load"], family: "meter",
    aliases: ["consumption"], keywords: ["consumption", "utilisation", "how much", "load", "meter"],
    shapes: [frame(3, 3, 18, 18, 3, { gap: 0 }), row(13, 5.5, 18.5), row(16.5, 5.5, 18.5)],
  },

  /* ── Words made structure ─────────────────────────────────────────────────────── */

  {
    slug: "transcribe-ingest", category: "rag", subcategory: "ingestion",
    name: "Transcribe", description: "Transcribe — speech written down as text on the way into the pipeline",
    tags: ["speech", "text", "convert"], family: "figure",
    aliases: [], keywords: ["speech to text", "whisper", "dictation", "written down"],
    shapes: [
      col(4, 9, 15), col(8, 6, 18), col(12, 9, 15),
      row(9, 16, 21), row(13, 16, 19), row(17, 16, 21),
    ],
  },
  {
    slug: "topic", category: "rag", subcategory: "knowledge",
    name: "Topic", description: "A topic — what a cluster of documents is about, its theme or subject",
    tags: ["theme", "cluster", "subject"], family: "figure",
    aliases: ["theme-topic"], keywords: ["theme", "subject", "cluster label", "about", "grouping"],
    shapes: [disc(12, 10, 4), disc(5, 18, 1), disc(12, 19, 1), disc(19, 18, 1)],
  },
  {
    slug: "tree-of-thought", category: "ai", subcategory: "inference",
    name: "Tree of thought", description: "Tree of thought — several lines of reasoning explored as branches, with the best one kept",
    tags: ["branch", "explore", "choose"], family: "figure",
    aliases: [], keywords: ["branching reasoning", "explore paths", "backtrack", "search tree"],
    shapes: [
      disc(5, 12, 2), poly([[7, 10], [12, 5], [17, 5]]), poly([[7, 12], [17, 12]]),
      poly([[7, 14], [12, 19], [17, 19]]), poly([[17, 12], [21, 12]]), poly([[19, 10], [21, 12], [19, 14]]),
    ],
  },
];
