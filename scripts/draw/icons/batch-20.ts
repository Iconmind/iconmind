/**
 * Batch 20 — steps and verdicts, and what a signal looks like before and after.
 *
 * `evaluate-step` and `rejection` are the same node and the same run, ending in a tick or a
 * cross. `denoise` and `debounce` both show a messy input on the left and a clean one on the
 * right with an arrow between. Neither pair needed inventing: the set already had the node,
 * the tick, the cross and the arrow, and putting them together is the work.
 */
import { arc, area, col, disc, frame, poly, rect, row } from "../forms.ts";
import { page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_20: Icon[] = [
  /* ── A step, and how it ended ─────────────────────────────────────────────────── */

  {
    slug: "evaluate-step", category: "agents", subcategory: "execution",
    name: "Evaluate step", description: "Evaluate step — check whether the last step worked before taking the next",
    tags: ["verify", "assess", "judge"], family: "chain",
    aliases: ["verify-step"], keywords: ["verify", "assert", "judge", "gate", "validate"],
    shapes: [disc(5, 5, 3), poly([[9.5, 9.5], [12.5, 12.5]]), poly([[13, 17], [15.5, 19.5], [20, 15]])],
  },
  {
    slug: "rejection", category: "agents", subcategory: "reflection",
    name: "Rejection", description: "Rejection — that step or sample did not pass and was discarded",
    tags: ["refuse", "fail", "discard"], family: "chain",
    aliases: [], keywords: ["refused", "failed", "discard", "retry", "invalid"],
    // The same node and the same run as `evaluate-step`, ending the other way. The two only
    // read as opposites because everything except the last mark is identical.
    shapes: [
      disc(5, 5, 3), poly([[9.5, 9.5], [12, 12]]),
      poly([[15, 15], [20, 20]]), poly([[20, 15], [15, 20]]),
    ],
  },

  /* ── Signals, cleaned up ──────────────────────────────────────────────────────── */

  {
    slug: "denoise", category: "ai", subcategory: "multimodal",
    name: "Denoise", description: "Denoise — take the noise out of a signal, smoothing and cleaning it",
    tags: ["clean", "smooth", "filter"], family: "arrow",
    aliases: [], keywords: ["clean up", "smooth", "restore", "upscale", "artifacts"],
    // Before above, after below: the noisy zigzag on top, a chevron pressing down, and
    // the clean flat line at the bottom. The left-to-right version was a 22×7 stripe.
    shapes: [
      poly([[3, 6], [7, 2], [11, 6], [15, 2], [19, 6]]),
      poly([[9, 11], [12, 14], [15, 11]]),
      row(20, 4, 20),
    ],
  },
  {
    slug: "debounce", category: "automation", subcategory: "trigger",
    name: "Debounce", description: "Debounce — many rapid firings collapsed into one once things settle",
    tags: ["throttle", "collapse", "settle"], family: "rails",
    aliases: ["throttle"], keywords: ["throttle", "coalesce", "settle", "rate limit", "burst"],
    // Three close together on the left, one on the right, and the right one taller. The
    // height is what says the survivor carries all of them.
    shapes: [
      col(3, 9, 15), col(6, 9, 15), col(9, 9, 15),
      row(12, 12, 15), poly([[15, 10], [17, 12], [15, 14]]),
      col(20, 7, 17),
    ],
  },
  {
    slug: "threshold", category: "analytics", subcategory: "metric",
    name: "Threshold", description: "A threshold — the line a value must not cross before something happens",
    tags: ["limit", "level", "breach"], family: "axes",
    aliases: [], keywords: ["alert level", "sla", "breach", "ceiling", "trigger point"],
    // The level sits where the line only reaches it at the end. Crossing twice needs three
    // crossings of the path itself to draw, which is above what the set allows — and one
    // breach at the far right reads as a threshold better than a line weaving over a rule.
    shapes: [row(11, 3, 21), poly([[4, 18], [10, 12], [14, 16], [20, 10]])],
  },

  /* ── Training ─────────────────────────────────────────────────────────────────── */

  {
    slug: "pretrain", category: "ai", subcategory: "training",
    name: "Pre-training", description: "Pre-training — the first and biggest pass over everything, building the base model",
    tags: ["base", "corpus", "initial"], family: "machine",
    aliases: [], keywords: ["base model", "foundation", "from scratch", "corpus", "unsupervised"],
    // `model-deploy`'s machine and arrow, going in instead of out. Deploying sends the
    // model away; pre-training is everything else arriving. Both use the same frame and the
    // same shaft, three units clear of it, so the pair cannot drift.
    shapes: [
      frame(4, 11, 16, 10, 3, { chamfer: 4, gap: 4 }),
      col(12, 2, 8), poly([[9, 5], [12, 8], [15, 5]]),
    ],
  },
  {
    slug: "ablation", category: "ai", subcategory: "evaluation",
    name: "Ablation", description: "An ablation — take one part of a system out and see what breaks",
    tags: ["remove", "isolate", "test"], family: "grid",
    aliases: [], keywords: ["ablation study", "leave one out", "isolate", "component test"],
    // Three of `cluster`'s four blocks and a cross where the fourth was. The cross is in the
    // block's own place, so what is missing is as legible as what is there.
    shapes: [
      rect(4, 4, 7, 7, 2), rect(14, 4, 7, 7, 2), rect(4, 14, 7, 7, 2),
      poly([[15, 15], [20, 20]]), poly([[20, 15], [15, 20]]),
    ],
  },
  {
    slug: "token-usage", category: "ai", subcategory: "token",
    name: "Token usage", description: "Token usage — how many tokens have been spent, the meter on consumption",
    tags: ["consumption", "count", "meter"], family: "capsule",
    aliases: [], keywords: ["consumption", "quota used", "meter", "spend", "billing"],
    // A capsule with a line across it: how much of the allowance is gone. Drawn as bars on
    // an axis under a pill it came out a Greek temple — a wide flat top on columns is a
    // portico before it is anything else.
    shapes: [rect(2, 4, 20, 6, 3), rect(2, 14, 12, 6, 3)],
  },

  /* ── Talking ──────────────────────────────────────────────────────────────────── */

  {
    slug: "agent-message", category: "agents", subcategory: "communication",
    name: "Agent message", description: "An agent message — something an agent said, its reply in a bubble",
    tags: ["output", "reply", "bubble"], family: "window",
    aliases: [], keywords: ["chat", "response", "utterance", "turn", "reply"],
    // `message`'s bubble with `agent`'s ring inside it. Whose message it is, said with two
    // drawings the set already has and no third one.
    shapes: [
      frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]]),
      arc(12, 10, 3, 295, 245),
    ],
  },
  {
    slug: "broadcast", category: "agents", subcategory: "communication",
    name: "Broadcast", description: "Broadcast — tell everyone at once, publish to all subscribers in one go",
    tags: ["announce", "publish", "fan-out"], family: "fan",
    aliases: ["announce"], keywords: ["publish", "pubsub", "fan out", "notify all", "emit"],
    // Waves on both sides, where `wifi`'s fan opens one way. A signal that goes in every
    // direction is a broadcast; one that goes in a direction is a link.
    shapes: [
      col(12, 12, 21), row(21, 7, 17),
      arc(12, 10, 4, 200, 340), arc(12, 10, 7, 200, 340),
    ],
  },

  /* ── Three more ───────────────────────────────────────────────────────────────── */

  {
    slug: "egress", category: "cloud", subcategory: "network",
    name: "Egress", description: "Egress — traffic leaving a network, the outbound direction that is often billed",
    tags: ["outbound", "exit", "out"], family: "rails",
    aliases: ["outbound"], keywords: ["outbound", "leaving", "exit", "data transfer", "billing"],
    // One wall, and the arrow already past it. `gateway` draws the door it goes through and
    // `intrusion` draws the wall it goes through; egress is simply the fact of leaving.
    shapes: [col(6, 3, 21), row(12, 8, 20), poly([[17, 9], [20, 12], [17, 15]])],
  },
  {
    slug: "crawler", category: "rag", subcategory: "ingestion",
    name: "Crawler", description: "A crawler — the spider that goes and fetches web pages one link at a time",
    tags: ["fetch", "spider", "web"], family: "magnifier",
    aliases: ["spider"], keywords: ["scrape", "spider", "fetch pages", "sitemap", "index web"],
    // `search`'s handle on `globe`'s sphere instead of a lens. With only the equator the
    // circle read as a lens with a bar through it — which is `zoom-out` — so the meridian
    // comes too, and it is the same ellipse `globe` uses.
    shapes: [
      disc(10, 10, 7), row(10, 3, 17),
      area("M10 3A4.5 7 0 0 0 10 17A4.5 7 0 0 0 10 3Z", "the meridian is an ellipse of 4.5 by 7"),
      poly([[15, 15], [21, 21]]),
    ],
  },
  {
    slug: "lockfile", category: "devtools", subcategory: "package",
    name: "Lockfile", description: "A lockfile — the exact versions of every dependency, pinned and resolved",
    tags: ["pinned", "exact", "resolved"], family: "page",
    aliases: [], keywords: ["package-lock", "yarn.lock", "pinned", "resolved", "reproducible"],
        // A keyhole, not a padlock. A page is twelve units wide inside and a lock body needs
    // seven plus three of air on each side — the object does not fit, so the mark for it
    // does the work instead.
    shapes: [page(), disc(12, 12, 2), poly([[12, 14], [12, 17]])],
  },
];
