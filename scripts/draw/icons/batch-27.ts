/**
 * Batch 27 — charts that were waiting for a shape, and the rest of the alert family.
 *
 * `chart-gauge`, `boxplot` and `chart-funnel` all have one canonical form and none of them
 * needed inventing. What they needed was to share the axes and the proportions everything
 * else here already uses, which is the whole reason the set has them.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { SMALL, alert } from "../marks.ts";
import { page, ring, shield } from "../bodies.ts";
import type { Icon } from "../build.ts";

const axes = () => [col(4, 4, 20), row(20, 4, 20)];

export const BATCH_27: Icon[] = [
  /* ── Charts ───────────────────────────────────────────────────────────────────── */

  {
    slug: "chart-gauge", category: "analytics", subcategory: "chart",
    name: "Gauge chart", description: "One number against its range",
    tags: ["dial", "needle", "meter"], family: "gauge",
    aliases: [], keywords: ["dial", "speedometer", "meter", "kpi", "score"],
    // `metric`'s dial with the range marked at both ends. The ticks are what make it a
    // chart rather than an instrument — a gauge with no scale is just a needle.
    shapes: [
      arc(12, 16, 9, 180, 0), poly([[12, 16], [17, 11]]),
      poly([[3, 16], [5.5, 16]]), poly([[18.5, 16], [21, 16]]),
    ],
  },
  {
    slug: "boxplot", category: "analytics", subcategory: "chart",
    name: "Box plot", description: "The middle half, and how far the rest reaches",
    tags: ["quartile", "whisker", "spread"], family: "axes",
    aliases: [], keywords: ["quartiles", "whiskers", "median", "iqr", "distribution"],
    shapes: [col(12, 3, 7), rect(5, 7, 14, 10, 2), row(12, 5, 19), col(12, 17, 21)],
  },
  {
    slug: "chart-funnel", category: "analytics", subcategory: "chart",
    name: "Funnel chart", description: "How many survive each stage",
    tags: ["stages", "narrow", "conversion"], family: "funnel",
    aliases: [], keywords: ["conversion", "stages", "drop off", "pipeline", "leads"],
    shapes: [
      rect(2, 4, 20, 4, 2), rect(5, 11, 14, 4, 2), rect(8, 18, 8, 4, 2),
    ],
  },
  {
    slug: "chart-heatmap", category: "analytics", subcategory: "chart",
    name: "Heatmap", description: "Where the values are dense",
    tags: ["grid", "density", "cells"], family: "grid",
    aliases: [], keywords: ["density", "cells", "matrix", "intensity", "calendar heatmap"],
    shapes: [
      rect(4, 4, 7, 7, 2), rect(14, 4, 7, 7, 2), rect(4, 14, 7, 7, 2), rect(14, 14, 7, 7, 2),
      disc(7.5, 7.5, 2), disc(17.5, 17.5, 2),
    ],
  },
  {
    slug: "churn", category: "analytics", subcategory: "segment",
    name: "Churn", description: "The ones who left",
    tags: ["loss", "attrition", "leaving"], family: "figure",
    aliases: ["attrition"], keywords: ["attrition", "cancelled", "lost customers", "retention"],
    shapes: [
      disc(8, 8, 3), arc(8, 20, 5, 180, 360),
      poly([[15, 9], [21, 15]]), poly([[21, 9], [15, 15]]),
    ],
  },
  {
    slug: "cohort", category: "analytics", subcategory: "segment",
    name: "Cohort", description: "A group that started together",
    tags: ["group", "batch", "segment"], family: "grid",
    aliases: [], keywords: ["segment", "signup month", "retention", "group", "bucket"],
    shapes: [
      row(6, 3, 21), disc(6, 12, 2), disc(12, 12, 2), disc(18, 12, 2), row(18, 3, 21),
    ],
  },
  {
    slug: "active-users", category: "analytics", subcategory: "metric",
    name: "Active users", description: "How many are actually here",
    tags: ["dau", "live", "count"], family: "figure",
    aliases: ["dau"], keywords: ["dau", "mau", "concurrent", "online", "engagement"],
    shapes: [
      disc(8, 8, 3), arc(8, 20, 5, 180, 360),
      col(15, 14, 20), col(18, 10, 20), col(21, 6, 20),
    ],
  },

  /* ── Alerts, the rest of the family ───────────────────────────────────────────── */

  {
    slug: "alert", category: "devops", subcategory: "observability",
    name: "Alert", description: "Something fired",
    tags: ["notify", "page", "raised"], family: "figure",
    aliases: [], keywords: ["paged", "fired", "notification", "trigger", "on-call"],
    // `bell` with the exclamation in it rather than a clapper. A bell that rings is a
    // notification; a bell with a mark in it is an alert about something.
    shapes: [
      arc(12, 15, 7, 180, 360), row(15, 5, 19), col(12, 4, 8), disc(12, 19, 1),
    ],
  },
  {
    slug: "alert-rule", category: "devops", subcategory: "observability",
    name: "Alert rule", description: "What has to be true before it fires",
    tags: ["condition", "policy", "threshold"], family: "page",
    aliases: [], keywords: ["condition", "policy", "when", "threshold", "definition"],
        // A page with the condition on it and the mark beside, not in the middle —
    // `document-alert` is already a page with the mark in its hollow, and a rule is the
    // written thing rather than the thing being flagged.
    shapes: [page(), row(9, 9, 15), row(13, 9, 13), col(12, 16, 19), disc(12, 21, 1)],
  },
  {
    slug: "budget-alert", category: "cloud", subcategory: "cost",
    name: "Budget alert", description: "You are close to the limit",
    tags: ["spend", "warning", "cap"], family: "capsule",
    aliases: [], keywords: ["overspend", "cap", "quota", "billing alert", "forecast"],
    shapes: [rect(2, 4, 20, 6, 3), col(12, 13, 18), disc(12, 21, 1)],
  },
  {
    slug: "agent-state", category: "agents", subcategory: "lifecycle",
    name: "Agent state", description: "What it is doing right now",
    tags: ["status", "mode", "phase"], family: "orbit",
    aliases: [], keywords: ["status", "phase", "mode", "lifecycle", "current"],
    // Three marks in the ring, at three sizes. `agent-idle` has one small core and
    // `agent-thinking` has three level bars; state is the axis those two sit on.
    shapes: [ring(), row(12, 7, 12), disc(15.5, 12, 2)],
  },
  {
    slug: "agent-swarm", category: "agents", subcategory: "multi-agent",
    name: "Agent swarm", description: "Many of them, working loosely",
    tags: ["many", "crowd", "distributed"], family: "orbit",
    aliases: [], keywords: ["crowd", "colony", "many agents", "emergent", "distributed"],
    // Five, scattered. `agent-team`'s four sit in a square because a team is arranged;
    // a swarm is not, and the offsets are what say so.
    shapes: [
      arc(6, 6, 3, 295, 245), arc(16, 5, 3, 295, 245), arc(19, 14, 3, 295, 245),
      arc(11, 13, 3, 295, 245), arc(7, 19, 3, 295, 245),
    ],
  },
  {
    slug: "agent-broadcast", category: "agents", subcategory: "communication",
    name: "Agent broadcast", description: "One agent telling all of them",
    tags: ["announce", "all", "fan-out"], family: "orbit",
    aliases: [], keywords: ["announce", "publish", "notify all", "fan out", "emit"],
    shapes: [
      arc(12, 12, 3, 295, 245),
      arc(12, 12, 6.5, -60, 60), arc(12, 12, 6.5, 120, 240),
      arc(12, 12, 10, -60, 60), arc(12, 12, 10, 120, 240),
    ],
  },
  {
    slug: "agent-negotiation", category: "agents", subcategory: "communication",
    name: "Agent negotiation", description: "Two of them working it out",
    tags: ["bargain", "exchange", "agree"], family: "orbit",
    aliases: [], keywords: ["bargain", "trade", "propose", "counter", "settle"],
    // Two agents on `agent-delegate`'s diagonal, and the exchange routed AROUND the
    // middle: proposal out the high side, counter back the low side, nothing in the
    // centre. Anything drawn straight between the rings — a two-headed shaft, two tight
    // lanes — fused into a blob at bold; the empty middle is what keeps this one legible.
    shapes: [
      arc(6, 6, 3, 295, 245),
      poly([[13, 8], [16, 11]]), poly([[16.5, 9], [16.5, 11.5], [14, 11.5]]),
      poly([[11, 16], [8, 13]]), poly([[7.5, 15], [7.5, 12.5], [10, 12.5]]),
      arc(18, 18, 3, 295, 245),
    ],
  },

  /* ── Security ─────────────────────────────────────────────────────────────────── */

  {
    slug: "breach", category: "security", subcategory: "threat",
    name: "Breach", description: "They got in",
    tags: ["compromise", "broken", "leak"], family: "shield",
    aliases: ["threat"], keywords: ["compromise", "incident", "leaked", "penetrated", "exposed"],
    // `shield` with a crack through it. `vulnerability` is the bolt that could get in;
    // a breach is the shield after it did.
    shapes: [shield(), poly([[15, 6], [11, 10], [14, 13], [10, 17]])],
  },
  {
    slug: "biometric", category: "security", subcategory: "auth",
    name: "Biometric", description: "Proving it is you by what you are",
    tags: ["fingerprint", "face", "physical"], family: "fan",
    aliases: ["fingerprint"], keywords: ["fingerprint", "face id", "touch id", "physical", "identity"],
    // Ridges opening downward. Drawn as a fan opening upward from a point it is `wifi`
    // exactly, minus the dot — the direction is the only thing that separates a signal
    // spreading from a fingertip pressed on something.
    shapes: [arc(12, 17, 4, 180, 0), arc(12, 17, 7, 180, 0), arc(12, 17, 10, 180, 0)],
  },
  {
    slug: "certificate-x509", category: "security", subcategory: "encryption",
    name: "X.509 certificate", description: "The certificate a machine presents",
    tags: ["tls", "chain", "signed"], family: "page",
    aliases: [], keywords: ["tls", "ssl", "chain of trust", "ca", "public key"],
    shapes: [
      rect(3, 3, 18, 11, 2), row(7, 6, 18), row(11, 6, 14), disc(12, 18.5, 3),
    ],
  },
  {
    slug: "compliance", category: "security", subcategory: "compliance",
    name: "Compliance", description: "It meets the rules it has to",
    tags: ["standard", "audit", "certified"], family: "shield",
    aliases: [], keywords: ["soc2", "iso", "gdpr", "certified", "regulation"],
    shapes: [rect(4, 5, 16, 16, 2), rect(8.5, 2, 7, 6.5, 2), poly([[8, 13], [11, 16], [17, 10]])],
  },
  {
    slug: "exploit", category: "security", subcategory: "threat",
    name: "Exploit", description: "The particular way in",
    tags: ["attack", "payload", "vector"], family: "arrow",
    aliases: [], keywords: ["payload", "attack vector", "poc", "weaponised", "zero-day"],
    shapes: [
      col(18, 3, 21), poly([[3, 17], [15, 5]]), poly([[11, 5], [15, 5], [15, 9]]),
    ],
  },

  /* ── Devtools ─────────────────────────────────────────────────────────────────── */

  {
    slug: "code-review", category: "devtools", subcategory: "version-control",
    name: "Code review", description: "Somebody read it before it landed",
    tags: ["review", "comment", "approve"], family: "chevron",
    aliases: [], keywords: ["pr review", "comments", "lgtm", "approve", "feedback"],
    shapes: [
      poly([[8, 7], [4, 11], [8, 15]]), poly([[14, 7], [18, 11], [14, 15]]),
      poly([[9, 19], [11, 21], [15, 17]]),
    ],
  },
  {
    slug: "coverage", category: "devtools", subcategory: "testing",
    name: "Coverage", description: "How much of it the tests touch",
    tags: ["tested", "percent", "measured"], family: "window",
    aliases: [], keywords: ["test coverage", "lines covered", "percent", "gaps", "lcov"],
    shapes: [rect(3, 3, 18, 18, 2), row(12, 3, 21), poly([[7, 8], [9, 10], [13, 6]])],
  },
  {
    slug: "clone", category: "devtools", subcategory: "version-control",
    name: "Clone", description: "Take a copy of the whole thing",
    tags: ["copy", "fetch", "duplicate"], family: "window",
    aliases: [], keywords: ["git clone", "checkout", "pull down", "local copy"],
    // Two of the same box, offset, with an arrow between them. `copy` overlaps its pair
    // without one because a copy just exists; a clone was fetched from somewhere.
    shapes: [
      rect(2, 2, 10, 10, 2), rect(13, 13, 9, 9, 2),
      poly([[15, 5], [18, 8]]), poly([[15, 8], [18, 8], [18, 5]]),
    ],
  },
  {
    slug: "breakpoint", category: "devtools", subcategory: "debug",
    name: "Breakpoint", description: "Stop here",
    tags: ["pause", "debug", "halt"], family: "chain",
    aliases: [], keywords: ["debugger", "stop here", "step", "inspect", "red dot"],
    shapes: [disc(6, 12, 3), row(12, 10, 21), poly([[9, 8], [9, 16]])],
  },
];
