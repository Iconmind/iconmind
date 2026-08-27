/**
 * Batch 37 — a call going out and the same call coming back, and three ways to step through code.
 *
 * `request` and `response` are one body with the arrowhead moved to the other end of the same
 * line. `step-into` and `step-over` share the line being stepped along. Pairs drawn as pairs
 * cannot disagree about what the shared part looks like.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { cycle, page, ring, shield } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_37: Icon[] = [
  /* ── Out and back ─────────────────────────────────────────────────────────────── */

  {
    slug: "request", category: "devtools", subcategory: "api",
    name: "Request", description: "The call going out",
    tags: ["call", "ask", "outbound"], family: "figure",
    aliases: [], keywords: ["http request", "call", "outbound", "ask", "invoke"],
    shapes: [rect(15, 4, 7, 16, 2), row(12, 2, 15), poly([[12, 9], [15, 12], [12, 15]])],
  },
  {
    slug: "response", category: "devtools", subcategory: "api",
    name: "Response", description: "What came back",
    tags: ["reply", "returned", "inbound"], family: "figure",
    aliases: [], keywords: ["http response", "reply", "returned", "payload", "inbound"],
    shapes: [rect(15, 4, 7, 16, 2), row(12, 2, 15), poly([[5, 9], [2, 12], [5, 15]])],
  },
  {
    slug: "status-code", category: "devtools", subcategory: "api",
    name: "Status code", description: "The number that says how it went",
    tags: ["200", "404", "result"], family: "window",
    aliases: [], keywords: ["200", "404", "500", "http status", "result code"],
    shapes: [rect(2, 6, 20, 12, 2), col(15, 6, 18), row(12, 5, 12)],
  },
  {
    slug: "send", category: "interface", subcategory: "communication",
    name: "Send", description: "Off it goes",
    tags: ["submit", "post", "away"], family: "figure",
    aliases: [], keywords: ["submit", "post message", "deliver", "paper plane", "go"],
    shapes: [
      rect(2, 6, 13, 12, 2), poly([[2, 6], [8.5, 12.5], [15, 6]]),
      row(12, 17, 21), poly([[18, 9], [21, 12], [18, 15]]),
    ],
  },

  /* ── Stepping through ─────────────────────────────────────────────────────────── */

  {
    slug: "step-into", category: "devtools", subcategory: "debug",
    name: "Step into", description: "Go down into the call",
    tags: ["descend", "enter", "debug"], family: "figure",
    aliases: [], keywords: ["step in", "descend", "enter function", "debugger", "f11"],
    shapes: [row(18, 3, 21), col(12, 4, 14), poly([[9, 11], [12, 14], [15, 11]])],
  },
  {
    slug: "step-over", category: "devtools", subcategory: "debug",
    name: "Step over", description: "Past the call, not through it",
    tags: ["skip", "past", "debug"], family: "figure",
    aliases: [], keywords: ["step over", "skip call", "next line", "debugger", "f10"],
    // The arc lands pointing down, so the head is `step-into`'s chevron at the landing
    // point. The old half-triangle head shared its corner with the arc and fused into it.
    shapes: [row(18, 3, 21), arc(12, 14, 6, 180, 0), poly([[15, 11], [18, 14], [21, 11]])],
  },
  {
    slug: "stack-trace", category: "devtools", subcategory: "debug",
    name: "Stack trace", description: "Which call was inside which",
    tags: ["frames", "crash", "where"], family: "figure",
    aliases: [], keywords: ["call stack", "frames", "traceback", "exception", "where it broke"],
    // Rows that all end at the same place are `align-right`. Frames nest.
    shapes: [poly([[3, 3], [3, 21], [11, 21]]), poly([[9, 7], [9, 17], [15, 17]]), poly([[15, 10], [15, 13], [19, 13]])],
  },
  {
    slug: "span-trace", category: "analytics", subcategory: "llm-observability",
    name: "Span", description: "One piece of work inside a trace",
    tags: ["timing", "trace", "segment"], family: "chart",
    aliases: [], keywords: ["trace span", "waterfall", "opentelemetry", "duration", "child span"],
    shapes: [row(7, 3, 19), row(12, 6, 16), row(17, 9, 21)],
  },

  /* ── Keys, marks and what escapes ─────────────────────────────────────────────── */

  {
    slug: "sso", category: "security", subcategory: "auth",
    name: "Single sign-on", description: "One key, every door",
    tags: ["once", "federated", "shared"], family: "figure",
    aliases: [], keywords: ["saml", "oidc", "federated", "sign in once", "identity provider"],
    shapes: [
      disc(5, 12, 3), poly([[8, 12], [12, 12], [12, 6], [15, 6]]), poly([[12, 12], [12, 18], [15, 18]]),
      rect(15, 2, 7, 8, 2), rect(15, 14, 7, 8, 2),
    ],
  },
  {
    slug: "signature", category: "security", subcategory: "encryption",
    name: "Signature", description: "Proof it was them",
    tags: ["signed", "authentic", "mark"], family: "page",
    aliases: [], keywords: ["signed", "digital signature", "authenticity", "non repudiation"],
    shapes: [page(), arc(11, 11, 3, 0, 180), poly([[14, 11], [17, 8]]), row(18, 8, 16)],
  },
  {
    slug: "secret-leak", category: "security", subcategory: "secret",
    name: "Secret leak", description: "It got out",
    tags: ["exposed", "leaked", "committed"], family: "lock",
    aliases: [], keywords: ["exposed key", "committed secret", "leaked credential", "rotate now"],
    shapes: [
      rect(2, 7, 12, 10, 2), arc(8, 7, 3, 180, 360),
      disc(19, 9, 1), disc(17, 14, 1), disc(19, 19, 1),
    ],
  },
  {
    slug: "scan-security", category: "security", subcategory: "threat",
    name: "Security scan", description: "Looking for what is wrong with it",
    tags: ["sweep", "audit", "cve"], family: "shield",
    aliases: [], keywords: ["vulnerability scan", "cve", "sweep", "sast", "audit"],
    shapes: [shield(), row(12, 4, 20)],
  },

  /* ── Copies, shelves and versions ─────────────────────────────────────────────── */

  {
    slug: "replication-geo", category: "cloud", subcategory: "region",
    name: "Geo-replication", description: "The same data, kept in two places",
    tags: ["regions", "copies", "distance"], family: "orbit",
    aliases: [], keywords: ["cross region", "multi region", "replica", "failover", "far apart"],
    shapes: [
      // Two opposed arrows will not fit in the six units between the stores — they meet in
      // the middle and paint as one blob. Above and below, they have the whole width.
      rect(2, 8, 8, 8, 2), rect(14, 8, 8, 8, 2),
      row(5, 6, 18), poly([[16, 3], [18, 5], [16, 7]]),
      row(19, 6, 18), poly([[8, 17], [6, 19], [8, 21]]),
    ],
  },
  {
    slug: "registry-image", category: "devops", subcategory: "container",
    name: "Image registry", description: "Where the built images sit",
    tags: ["shelf", "images", "store"], family: "figure",
    aliases: [], keywords: ["container registry", "ghcr", "docker hub", "pushed image", "tags"],
    shapes: [row(4, 4, 20), rect(2, 7, 20, 10, 2), col(8, 7, 17), col(15, 7, 17)],
  },
  {
    slug: "release-tag", category: "devops", subcategory: "release",
    name: "Release tag", description: "The name this version answers to",
    tags: ["version", "label", "semver"], family: "figure",
    aliases: ["tag-release"], keywords: ["semver", "v1.2.0", "git tag", "label", "named version"],
    shapes: [poly([[2, 12], [9, 5], [21, 5], [21, 19], [9, 19]], true), disc(7, 12, 1), row(10, 11, 18), row(14, 11, 16)],
  },
  {
    slug: "service-mesh", category: "devops", subcategory: "orchestration",
    name: "Service mesh", description: "Every service talking through the same layer",
    tags: ["sidecar", "istio", "traffic"], family: "figure",
    aliases: [], keywords: ["istio", "linkerd", "sidecar", "mtls", "east-west traffic"],
    shapes: [
      disc(6, 7, 2), disc(18, 7, 2), disc(6, 17, 2), disc(18, 17, 2),
      poly([[8, 9], [16, 17]]), poly([[16, 9], [8, 17]]),
    ],
  },

  /* ── Trying again, and getting it right the second time ───────────────────────── */

  {
    slug: "retry-policy", category: "automation", subcategory: "workflow",
    name: "Retry policy", description: "How many times, and how far apart",
    tags: ["backoff", "attempts", "rule"], family: "orbit",
    aliases: [], keywords: ["backoff", "max attempts", "exponential", "jitter", "give up"],
    shapes: [...cycle(), col(9, 10, 14), col(12, 10, 14), col(15, 10, 14)],
  },
  {
    slug: "replan", category: "agents", subcategory: "planning",
    name: "Replan", description: "That plan is no good; here is another",
    tags: ["rethink", "discard", "again"], family: "figure",
    aliases: [], keywords: ["rethink", "new plan", "abandon", "adjust", "course correct"],
    shapes: [
      rect(2, 4, 8, 16, 2), poly([[3, 17], [9, 11]]),
      rect(14, 4, 8, 16, 2), row(9, 16, 20), row(13, 16, 20),
    ],
  },
  {
    slug: "self-correct", category: "agents", subcategory: "reflection",
    name: "Self-correct", description: "It noticed, and fixed it",
    tags: ["revise", "amend", "retry"], family: "figure",
    aliases: [], keywords: ["revise", "fix own answer", "critique", "second attempt", "amend"],
    shapes: [
      row(7, 4, 14), poly([[4, 10], [10, 4]]),
      row(16, 4, 14), poly([[16, 15], [18, 17], [21, 14]]),
    ],
  },
  {
    slug: "self-consistency", category: "ai", subcategory: "inference",
    name: "Self-consistency", description: "Ask several times, keep what most of them said",
    tags: ["majority", "samples", "agree"], family: "figure",
    aliases: [], keywords: ["majority vote", "sample n", "agreement", "ensemble", "best of"],
    shapes: [row(7, 3, 15), row(12, 3, 15), row(17, 3, 15), poly([[17, 11], [19, 13], [22, 10]])],
  },

  /* ── Cutting and scoring ──────────────────────────────────────────────────────── */

  {
    slug: "semantic-chunk", category: "rag", subcategory: "chunking",
    name: "Semantic chunk", description: "Cut where the meaning changes, not where the page ends",
    tags: ["boundary", "meaning", "split"], family: "figure",
    aliases: [], keywords: ["semantic split", "boundary", "topic shift", "coherent passage"],
    shapes: [
      row(6, 3, 21), row(9, 3, 17), row(12, 3, 9), row(12, 15, 21), row(15, 3, 21), row(18, 3, 15),
    ],
  },
  {
    slug: "softmax", category: "ai", subcategory: "inference",
    name: "Softmax", description: "Scores turned into one that wins",
    tags: ["probability", "peak", "normalise"], family: "chart",
    aliases: [], keywords: ["probabilities", "temperature", "argmax", "distribution", "peak"],
    shapes: [row(20, 3, 21), col(6, 14, 20), col(10, 8, 20), col(14, 3, 20), col(18, 14, 20)],
  },
  {
    slug: "sparkline", category: "analytics", subcategory: "chart",
    name: "Sparkline", description: "The shape of it, small enough to sit in a line",
    tags: ["inline", "trend", "tiny"], family: "chart",
    aliases: [], keywords: ["inline chart", "trend", "micro chart", "in a table", "tiny"],
    shapes: [
      poly([[3, 8], [3, 3], [8, 3]]), poly([[16, 21], [21, 21], [21, 16]]),
      poly([[5, 16], [9, 12], [12, 15], [16, 11], [19, 14]]),
    ],
  },
];
