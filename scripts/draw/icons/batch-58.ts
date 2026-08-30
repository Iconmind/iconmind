/**
 * Batch 58 — round 7 of the 1k plan: how models are judged, and how clouds
 * survive.
 *
 * Swaps: eval-batch/run/case are eval-suite and test-run again, llm-judge-score
 * collapses into pairwise-compare, edge-pop is edge-node, anycast and global-lb
 * have no honest 24px silhouette apart from broadcast and load-balancer, and
 * rto/rpo are acronyms about time nobody can draw apart. The next names in each
 * list took the seats.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { cycle } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_58: Icon[] = [
  /* ── analytics: judging and paying for models ─────────────────────────────────── */

  {
    slug: "rubric", category: "analytics", subcategory: "llm-observability",
    name: "Rubric", description: "A rubric — the grading criteria written down before anything is scored",
    tags: ["criteria", "checklist", "grading"], family: "figure",
    aliases: [], keywords: ["rubric", "grading criteria", "checklist", "scoring guide"],
    shapes: [
      poly([[3, 7], [5, 9], [8, 6]]), row(7.5, 11, 21),
      poly([[3, 15], [5, 17], [8, 14]]), row(15.5, 11, 21),
    ],
  },
  {
    slug: "pairwise-compare", category: "analytics", subcategory: "llm-observability",
    name: "Pairwise compare", description: "Pairwise comparison — two answers side by side and one verdict on which is better",
    tags: ["versus", "prefer", "judge"], family: "window",
    aliases: ["a-b-judge"], keywords: ["pairwise comparison", "preference", "a vs b"],
    // A and B side by side, and the check under the one that won.
    shapes: [
      rect(2, 5, 8, 10, 2), rect(14, 5, 8, 10, 2),
      poly([[3, 18], [5, 20], [8.5, 16.5]]),
    ],
  },
  {
    slug: "elo", category: "analytics", subcategory: "llm-observability",
    name: "Elo", description: "Elo rating — one rating rises by exactly what the other loses when they meet",
    tags: ["rating", "exchange", "rank"], family: "arrow",
    aliases: ["elo-rating"], keywords: ["elo", "rating exchange", "arena", "head to head"],
    // Two players trading places: the riser and the faller, joined by nothing
    // but the rule.
    shapes: [
      disc(6, 16, 3), col(6, 4, 13), poly([[3.5, 6.5], [6, 4], [8.5, 6.5]]),
      disc(18, 8, 3), col(18, 11, 20), poly([[15.5, 17.5], [18, 20], [20.5, 17.5]]),
    ],
  },
  {
    slug: "win-rate", category: "analytics", subcategory: "llm-observability",
    name: "Win rate", description: "Win rate — how much of the pie says yes, the share of comparisons won",
    tags: ["share", "pie", "ratio"], family: "chart",
    aliases: [], keywords: ["win rate", "share", "victory ratio"],
    // `chart-pie` came back at IoU 1.00 — the pie alone is taken. The check in
    // the majority slice is what makes it a verdict.
    shapes: [
      disc(12, 12, 9), col(12, 3, 12), row(12, 12, 21),
      poly([[5, 14], [7, 16], [10.5, 12.5]]),
    ],
  },
  {
    slug: "score-distribution", category: "analytics", subcategory: "llm-observability",
    name: "Score distribution", description: "Score distribution — where the scores actually landed, the spread across a histogram",
    tags: ["histogram", "bell", "spread"], family: "chart",
    aliases: [], keywords: ["score distribution", "histogram", "spread of scores"],
    // The bell, drawn in bars on their baseline.
    shapes: [
      col(4, 13, 17), col(8, 9, 17), col(12, 5, 17), col(16, 9, 17), col(20, 13, 17),
      row(19.5, 3, 21),
    ],
  },
  {
    slug: "percentile-rank", category: "analytics", subcategory: "llm-observability",
    name: "Percentile rank", description: "Percentile rank — better than this much of everyone else on the scale",
    tags: ["position", "scale", "marker"], family: "chart",
    aliases: [], keywords: ["percentile", "rank position", "where you stand"],
    // The scale with its ticks, and the pin standing where you landed.
    shapes: [
      row(16, 3, 21), col(6, 14.5, 17.5), col(11, 14.5, 17.5),
      disc(17, 5, 2), col(17, 7, 16),
    ],
  },
  {
    slug: "forecast-spend", category: "analytics", subcategory: "metric",
    name: "Forecast spend", description: "Forecast spend — where the bill is headed if the trend continues",
    tags: ["projection", "trend", "cost"], family: "chart",
    aliases: [], keywords: ["spend forecast", "cost projection", "trend up"],
    // The spend line leaving the chart — the forecast is the part past the data.
    shapes: [
      poly([[3, 3], [3, 21], [21, 21]]),
      poly([[6, 18], [12, 12], [19, 5]]),
      poly([[15.5, 5], [19, 5], [19, 8.5]]),
    ],
  },
  {
    slug: "cost-per-call", category: "analytics", subcategory: "metric",
    name: "Cost per call", description: "Cost per call — what each request quietly costs when it hits the API",
    tags: ["unit", "price", "request"], family: "figure",
    aliases: [], keywords: ["cost per call", "unit cost", "per request price"],
    // The coin above, and the calls it is charged against below.
    shapes: [
      disc(12, 7, 5), disc(12, 7, 2),
      row(16, 4, 17), poly([[15.5, 14], [17.5, 16], [15.5, 18]]),
      row(20, 4, 13),
    ],
  },
  {
    slug: "spend-alert", category: "analytics", subcategory: "metric",
    name: "Spend alert", description: "A spend alert — the bill crossed the line you drew, a budget warning",
    tags: ["budget", "warning", "money"], family: "figure",
    aliases: [], keywords: ["spend alert", "budget warning", "cost alarm"],
    // The coin, and the alarm beside it.
    shapes: [
      disc(9, 12, 6), disc(9, 12, 2),
      col(19, 6.5, 11.5), disc(19, 14.5, 1),
    ],
  },
  {
    slug: "budget-burn", category: "analytics", subcategory: "metric",
    name: "Budget burn", description: "Budget burn — the remaining budget shrinking every time anyone looks",
    tags: ["deplete", "shrink", "down"], family: "chart",
    aliases: ["burn-rate"], keywords: ["budget burn", "burn rate", "depleting"],
    // Each row shorter than the last, and the arrow saying where it ends.
    shapes: [
      row(6, 3, 21), row(11, 3, 17), row(16, 3, 13),
      poly([[17, 16], [21, 20]]), poly([[21, 17], [21, 20], [18, 20]]),
    ],
  },

  /* ── cloud: how clouds survive ────────────────────────────────────────────────── */

  {
    slug: "region-pair", category: "cloud", subcategory: "network",
    name: "Region pair", description: "A region pair — two homes for the same service for geographic redundancy",
    tags: ["geo", "redundancy", "link"], family: "orbit",
    aliases: [], keywords: ["region pair", "multi region", "geo redundancy"],
    // Two of `region`'s globes, small — latitude and meridian each, or a single
    // chord reads as a minus. The pair is read the way `active-active` reads:
    // by being two of the same.
    shapes: [
      disc(6.5, 6.5, 4), row(6.5, 3, 10), col(6.5, 3, 10),
      disc(17.5, 17.5, 4), row(17.5, 14, 21), col(17.5, 14, 21),
    ],
  },
  {
    slug: "zone-spread", category: "cloud", subcategory: "network",
    name: "Zone spread", description: "Zone spread — not all the eggs in one rack, workloads scattered across zones",
    tags: ["zones", "scatter", "resilience"], family: "window",
    aliases: [], keywords: ["availability zones", "spread", "anti-affinity"],
    // `region`'s globe, and the replicas keeping their distance inside it.
    shapes: [
      disc(12, 12, 9),
      disc(8.5, 8.5, 2), disc(16, 10, 2), disc(10.5, 16, 2),
    ],
  },
  {
    slug: "failover-region", category: "cloud", subcategory: "network",
    name: "Failover region", description: "A failover region — the standby that answers when the home region does not",
    tags: ["standby", "switch", "disaster"], family: "orbit",
    aliases: [], keywords: ["failover", "dr region", "standby region"],
    // The struck-out home, and the standby already carrying the line.
    shapes: [
      disc(6.5, 6.5, 4), poly([[4, 9], [9, 4]]),
      disc(17.5, 17.5, 4), row(17.5, 14, 21), col(17.5, 14, 21),
      poly([[9.5, 9.5], [14, 14]]),
    ],
  },
  {
    slug: "active-active", category: "cloud", subcategory: "network",
    name: "Active-active", description: "Active-active — both sites serving all the time, live in parallel",
    tags: ["dual", "live", "both"], family: "orbit",
    aliases: [], keywords: ["active active", "dual live", "both serving"],
    // Two nodes, both with the core lit.
    shapes: [
      disc(6.5, 12, 4), disc(6.5, 12, 1),
      disc(17.5, 12, 4), disc(17.5, 12, 1),
    ],
  },
  {
    slug: "active-passive", category: "cloud", subcategory: "network",
    name: "Active-passive", description: "Active-passive — one site serves while the other waits its turn as a spare",
    tags: ["standby", "primary", "spare"], family: "orbit",
    aliases: [], keywords: ["active passive", "hot standby", "primary secondary"],
    // The same pair with one core dark — `agent-idle`'s grammar, spoken by nodes.
    shapes: [
      disc(6.5, 12, 4), disc(6.5, 12, 1),
      disc(17.5, 12, 4),
    ],
  },
  {
    slug: "pilot-light", category: "cloud", subcategory: "network",
    name: "Pilot light", description: "Pilot light — almost everything off in the standby region, just a spark kept alive",
    tags: ["minimal", "standby", "spark"], family: "window",
    aliases: [], keywords: ["pilot light", "minimal standby", "dr tier"],
    // The big dark room, and the one small thing kept burning in its corner.
    shapes: [
      rect(3, 3, 18, 18, 2),
      disc(7.5, 16.5, 2), col(7.5, 10.5, 13), poly([[10, 14], [12, 12]]),
    ],
  },
  {
    slug: "warm-standby", category: "cloud", subcategory: "network",
    name: "Warm standby", description: "Warm standby — half awake so the wake-up is short when failover comes",
    tags: ["half", "ready", "spare"], family: "ring",
    aliases: [], keywords: ["warm standby", "half ready", "scaled down copy"],
    // The node holding its breath — paused, not off. A half-lit core was drawn
    // first and read as the copyright sign.
    shapes: [disc(12, 12, 8), col(10.5, 9.5, 14.5), col(13.5, 9.5, 14.5)],
  },
  {
    slug: "object-lock", category: "cloud", subcategory: "storage",
    name: "Object lock", description: "Object lock — written once and nobody can unwrite it, immutable WORM retention",
    tags: ["immutable", "worm", "retention"], family: "window",
    aliases: ["worm-storage"], keywords: ["object lock", "immutable", "worm", "retention"],
    // The stored thing above, and the padlock that makes it permanent.
    shapes: [
      rect(3, 3, 18, 8, 2),
      rect(8.5, 14.5, 7, 6.5, 2), arc(12, 14.5, 2.5, 180, 360),
    ],
  },
  {
    slug: "lifecycle-rule", category: "cloud", subcategory: "storage",
    name: "Lifecycle rule", description: "A lifecycle rule — data moving down the storage tiers on a schedule until it is archived",
    tags: ["tiers", "archive", "rotate"], family: "rotation",
    aliases: [], keywords: ["lifecycle rule", "storage tiers", "archive policy"],
    // Tiers narrowing on the way down, and the arrow that moves data along —
    // the loop-with-rows drawing was IoU 0.93 against index-rebuild.
    shapes: [
      rect(3, 3, 14, 4, 2), rect(3, 10, 10, 4, 2), rect(3, 17, 6.5, 4, 2),
      col(19, 5, 15), poly([[16.5, 12.5], [19, 15], [21.5, 12.5]]),
    ],
  },
  {
    slug: "egress-fee", category: "cloud", subcategory: "cost",
    name: "Egress fee", description: "An egress fee — leaving the cloud is the expensive direction, a charge on data transfer out",
    tags: ["cost", "exit", "transfer"], family: "arrow",
    aliases: [], keywords: ["egress fee", "data transfer cost", "leaving charge"],
    // The way out leads straight into the coin.
    shapes: [rect(3, 4, 10, 16, 2), row(12, 8, 16), disc(19, 12, 3)],
  },
];
