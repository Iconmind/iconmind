/**
 * Batch 63 — round 12 of the 1k plan: the sampler's dials, serving under load,
 * the experiment's referee, the cloud's colder shelves, and messaging's
 * etiquette.
 *
 * Dead on arrival, as ever for one reason: retention-curve is train-loss's
 * exact line, data-parallel is agent-clone, dashboard-pin is schema-pin,
 * attribution-model is race-detect, and a five-point star cannot exist at
 * 0/45/90 — north-star is a diamond with four diagonal rays instead.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { cycle, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_63: Icon[] = [
  /* ── ai: the sampler's dials ──────────────────────────────────────────────────── */

  {
    slug: "temperature-high", category: "ai", subcategory: "inference",
    name: "High temperature", description: "High temperature — let the model gamble a little, more random and creative sampling",
    tags: ["random", "hot", "creative"], family: "figure",
    aliases: [], keywords: ["high temperature", "creative sampling"],
    shapes: [
      rect(9, 3, 6, 12, 3), disc(12, 18, 3), col(12, 6, 14.5),
      row(6, 16.5, 19), row(10, 16.5, 19),
    ],
  },
  {
    slug: "temperature-low", category: "ai", subcategory: "inference",
    name: "Low temperature", description: "Low temperature — say the likeliest thing every time, precise and safe sampling",
    tags: ["precise", "cold", "safe"], family: "figure",
    aliases: [], keywords: ["low temperature", "deterministic sampling"],
    shapes: [
      rect(9, 3, 6, 12, 3), disc(12, 18, 3), col(12, 11, 14.5),
      row(6, 16.5, 19), row(10, 16.5, 19),
    ],
  },
  {
    slug: "kv-evict", category: "ai", subcategory: "inference",
    name: "KV evict", description: "KV evict — the attention cache lets its oldest entries go to make room",
    tags: ["cache", "drop", "memory"], family: "figure",
    aliases: ["cache-evict"], keywords: ["kv eviction", "cache eviction"],
    shapes: [
      poly([[5.5, 4], [3, 4], [3, 20], [5.5, 20]]),
      disc(10.5, 8, 2), disc(10.5, 16, 2),
      row(12, 14.5, 17.5), poly([[17.5, 9.5], [20, 12], [17.5, 14.5]]),
    ],
  },
  {
    slug: "logit-bias", category: "ai", subcategory: "inference",
    name: "Logit bias", description: "Logit bias — a thumb pressed on one token's scale to steer what the model says",
    tags: ["weight", "press", "steer"], family: "chart",
    aliases: [], keywords: ["logit bias", "token bias"],
    shapes: [
      col(6, 6, 19), col(12, 11, 19), col(18, 6, 19),
      row(21.5, 4, 20),
      col(12, 2.5, 5), poly([[9.5, 6], [12, 8.5], [14.5, 6]]),
    ],
  },
  {
    slug: "min-p", category: "ai", subcategory: "inference",
    name: "Min-p", description: "Min-p — tokens below the probability floor do not exist for sampling",
    tags: ["floor", "cutoff", "sample"], family: "chart",
    aliases: [], keywords: ["min-p", "probability floor"],
    shapes: [
      col(7, 5, 17), col(17, 11, 17),
      row(14, 3, 21),
    ],
  },
  {
    slug: "greedy-decode", category: "ai", subcategory: "inference",
    name: "Greedy decode", description: "Greedy decoding — the straight road, the top token at every single step",
    tags: ["argmax", "straight", "deterministic"], family: "arrow",
    aliases: ["argmax-decode"], keywords: ["greedy decoding", "argmax"],
    shapes: [
      row(12, 2, 17.5), poly([[17.5, 9.5], [20, 12], [17.5, 14.5]]),
      poly([[6, 12], [11, 7]]), poly([[10, 12], [15, 17]]),
    ],
  },
  {
    slug: "token-ceiling", category: "ai", subcategory: "inference",
    name: "Token ceiling", description: "A token ceiling — the stack of tokens meets the lid, the maximum output length",
    tags: ["limit", "max", "lid"], family: "figure",
    aliases: ["max-tokens"], keywords: ["max tokens", "token limit ceiling"],
    shapes: [
      row(7, 4, 20),
      disc(12, 11.5, 2),
      disc(6, 17, 2), disc(12, 17, 2), disc(18, 17, 2),
    ],
  },
  {
    slug: "stop-sequence", category: "ai", subcategory: "inference",
    name: "Stop sequence", description: "A stop sequence — the words that end the generation when the model produces them",
    tags: ["halt", "wall", "end"], family: "figure",
    aliases: [], keywords: ["stop sequence", "stop words"],
    shapes: [
      disc(5, 12, 2), disc(11, 12, 2), disc(17, 12, 2),
      col(21, 6, 18),
    ],
  },
  {
    slug: "special-token", category: "ai", subcategory: "inference",
    name: "Special token", description: "A special token — a control marker in the sequence that is not a word",
    tags: ["control", "marker", "different"], family: "figure",
    aliases: ["control-token"], keywords: ["special token", "control token"],
    shapes: [
      disc(4, 12, 2),
      poly([[12, 8], [16, 12], [12, 16], [8, 12]], true),
      disc(20, 12, 2),
    ],
  },
  {
    slug: "detokenize", category: "ai", subcategory: "inference",
    name: "Detokenise", description: "Detokenise — the token pieces assembled back into a sentence",
    tags: ["join", "text", "assemble"], family: "figure",
    aliases: ["detokenization"], keywords: ["detokenize", "join tokens"],
    shapes: [
      disc(5, 7, 2), disc(11, 7, 2), disc(17, 7, 2),
      poly([[9.5, 11.5], [12, 14], [14.5, 11.5]]),
      row(18.5, 4, 20),
    ],
  },

  /* ── devops: serving under load ───────────────────────────────────────────────── */

  {
    slug: "continuous-batch", category: "devops", subcategory: "orchestration",
    name: "Continuous batching", description: "Continuous batching — new requests board the moving train while others are still being served",
    tags: ["stream", "join", "serve"], family: "machine",
    aliases: [], keywords: ["continuous batching", "in-flight batching"],
    shapes: [
      disc(5, 4, 1), disc(9, 6, 1), disc(13, 8, 1),
      frame(2, 12, 20, 9, 3, { chamfer: 3, gap: 4 }), disc(8, 16.5, 3),
    ],
  },
  {
    slug: "tensor-parallel", category: "devops", subcategory: "infrastructure",
    name: "Tensor parallel", description: "Tensor parallelism — one model sliced across several GPUs that compute together",
    tags: ["split", "shard", "gpus"], family: "machine",
    aliases: ["model-parallel"], keywords: ["tensor parallelism", "model sharding"],
    shapes: [
      rect(3, 4, 18, 7, 2), rect(3, 14, 18, 7, 2),
    ],
  },
  {
    slug: "cpu-offload", category: "devops", subcategory: "infrastructure",
    name: "CPU offload", description: "CPU offload — what the card cannot hold spills down into system RAM",
    tags: ["spill", "memory", "down"], family: "machine",
    aliases: ["ram-offload"], keywords: ["cpu offload", "spill to ram"],
    shapes: [
      frame(2, 2, 20, 9, 3, { chamfer: 3, gap: 4 }),
      col(12, 11, 13.5), poly([[9.5, 12.5], [12, 15], [14.5, 12.5]]),
      rect(6, 17.5, 12, 4.5, 2.25),
    ],
  },
  {
    slug: "queue-depth", category: "devops", subcategory: "observability",
    name: "Queue depth", description: "Queue depth — how much work is waiting right now, the backlog height",
    tags: ["backlog", "bars", "waiting"], family: "chart",
    aliases: [], keywords: ["queue depth", "backlog size"],
    shapes: [
      poly([[6.5, 4], [4, 4], [4, 20], [6.5, 20]]),
      col(10, 9, 18), col(14, 6, 18), col(18, 12, 18),
    ],
  },
  {
    slug: "load-shed", category: "devops", subcategory: "observability",
    name: "Load shedding", description: "Load shedding — better to drop some requests than sink the whole service",
    tags: ["overflow", "drop", "protect"], family: "figure",
    aliases: [], keywords: ["load shedding", "drop requests"],
    shapes: [
      poly([[4, 5], [4, 14], [20, 14], [20, 5]]),
      row(8, 7, 17),
      col(17, 17, 19.5), col(13, 18.5, 21),
    ],
  },
  {
    slug: "brownout", category: "devops", subcategory: "observability",
    name: "Brownout", description: "A brownout — still on, just less of it, a service degraded to stay up",
    tags: ["degrade", "reduce", "power"], family: "figure",
    aliases: [], keywords: ["brownout", "graceful degradation"],
    shapes: [
      poly([[13, 3], [8, 8], [11.5, 8], [6.5, 13]]),
      row(17, 9, 15),
    ],
  },
  {
    slug: "static-stability", category: "devops", subcategory: "infrastructure",
    name: "Static stability", description: "Static stability — the weather changes but the system does not, resilient by design",
    tags: ["steady", "calm", "resilient"], family: "window",
    aliases: [], keywords: ["static stability", "steady state"],
    shapes: [
      rect(8, 8, 8, 8, 2),
      row(4, 3, 10.5), poly([[10.5, 2], [12.5, 4], [10.5, 6]]),
      row(20, 13.5, 21), poly([[13.5, 18], [11.5, 20], [13.5, 22]]),
    ],
  },
  {
    slug: "fault-inject", category: "devops", subcategory: "incident",
    name: "Fault injection", description: "Fault injection — break it yourself before the world does, a chaos test",
    tags: ["chaos", "needle", "test"], family: "figure",
    aliases: [], keywords: ["fault injection", "chaos engineering"],
    shapes: [
      rect(3, 12, 10, 9, 2),
      poly([[13, 11], [18, 6]]), poly([[15.5, 3.5], [20.5, 8.5]]),
    ],
  },
  {
    slug: "self-heal", category: "devops", subcategory: "incident",
    name: "Self-heal", description: "Self-heal — cracked at noon and whole again by one, automatic repair",
    tags: ["repair", "auto", "patch"], family: "window",
    aliases: ["auto-heal"], keywords: ["self healing", "auto remediation"],
    shapes: [
      rect(4, 4, 16, 16, 2),
      poly([[11, 4.5], [8.5, 7], [11.5, 10]]),
      rect(12.5, 11, 6.5, 4, 2),
    ],
  },
  {
    slug: "runbook-auto", category: "devops", subcategory: "incident",
    name: "Automated runbook", description: "An automated runbook — the incident page that runs itself at 3am",
    tags: ["auto", "steps", "respond"], family: "page",
    aliases: [], keywords: ["automated runbook", "auto response"],
    shapes: [
      page(),
      poly([[13.5, 8], [9.5, 12], [12.5, 12], [8.5, 16]]),
    ],
  },

  /* ── analytics: the experiment's referee ──────────────────────────────────────── */

  {
    slug: "cohort-ai", category: "analytics", subcategory: "segment",
    name: "Cohort", description: "A cohort — everyone who started the same week, tracked as they age",
    tags: ["group", "aging", "rows"], family: "figure",
    aliases: [], keywords: ["cohort", "cohort analysis"],
    shapes: [
      disc(4, 5, 2), disc(10, 5, 2), disc(16, 5, 2),
      disc(7, 12, 2), disc(13, 12, 2),
      disc(10, 19, 2),
    ],
  },
  {
    slug: "daily-active", category: "analytics", subcategory: "metric",
    name: "Daily active", description: "Daily active users — who actually showed up today, on the calendar",
    tags: ["dau", "calendar", "people"], family: "window",
    aliases: ["dau-metric"], keywords: ["daily active users", "dau"],
    shapes: [
      rect(3, 4, 18, 16, 2), row(9, 3, 21),
      disc(8, 14.5, 2), disc(15, 14.5, 2),
    ],
  },
  {
    slug: "counter-metric", category: "analytics", subcategory: "metric",
    name: "Counter metric", description: "A counter metric — the number that must not fall while the target rises",
    tags: ["balance", "opposite", "watch"], family: "chart",
    aliases: [], keywords: ["counter metric", "guardrail pair"],
    shapes: [
      col(7, 8.5, 17.5), poly([[4.5, 9], [7, 6.5], [9.5, 9]]),
      col(17, 6.5, 15.5), poly([[14.5, 13], [17, 15.5], [19.5, 13]]),
      row(20, 4, 20),
    ],
  },
  {
    slug: "experiment-arm", category: "analytics", subcategory: "experiment",
    name: "Experiment arm", description: "An experiment arm — the branch of users that gets the new thing",
    tags: ["variant", "branch", "test"], family: "chain",
    aliases: ["treatment-arm"], keywords: ["experiment arm", "treatment group"],
    shapes: [
      disc(12, 5, 2),
      poly([[10.5, 6.5], [6, 11]]), poly([[13.5, 6.5], [18, 11]]),
      disc(5, 14, 3), disc(19, 13, 2),
    ],
  },
  {
    slug: "srm-check", category: "analytics", subcategory: "experiment",
    name: "SRM check", description: "An SRM check — the split is not the split you asked for, a sample ratio mismatch alarm",
    tags: ["ratio", "skew", "alarm"], family: "figure",
    aliases: ["sample-ratio-mismatch"], keywords: ["srm", "sample ratio mismatch"],
    shapes: [
      disc(7, 6, 2), disc(7, 12, 2), disc(7, 18, 2),
      col(12, 5, 19),
      disc(17, 12, 2),
    ],
  },
  {
    slug: "sequential-test", category: "analytics", subcategory: "experiment",
    name: "Sequential test", description: "A sequential test — peek early at the results and stop honestly at the checkpoints",
    tags: ["stages", "stop", "checks"], family: "figure",
    aliases: [], keywords: ["sequential testing", "early stopping"],
    shapes: [
      poly([[3, 8], [5, 10], [8, 7]]),
      poly([[10, 8], [12, 10], [15, 7]]),
      poly([[17.5, 7], [21, 10.5]]), poly([[21, 7], [17.5, 10.5]]),
      row(16.5, 3, 21),
    ],
  },
  {
    slug: "confidence-interval", category: "analytics", subcategory: "experiment",
    name: "Confidence interval", description: "A confidence interval — the truth is somewhere on this line, the range of the estimate",
    tags: ["range", "error", "bounds"], family: "chart",
    aliases: [], keywords: ["confidence interval", "error bars"],
    shapes: [
      col(5, 8, 16), row(12, 5, 19), col(19, 8, 16),
      disc(12, 12, 2),
    ],
  },
  {
    slug: "novelty-effect", category: "analytics", subcategory: "experiment",
    name: "Novelty effect", description: "A novelty effect — the spike that was only curiosity before the numbers settle",
    tags: ["spike", "settle", "temporary"], family: "chart",
    aliases: [], keywords: ["novelty effect", "temporary lift"],
    shapes: [
      poly([[3, 3], [3, 21], [21, 21]]),
      poly([[5, 15], [10, 10], [14, 14], [19, 14]]),
    ],
  },
  {
    slug: "annotation-ui", category: "analytics", subcategory: "llm-observability",
    name: "Annotation UI", description: "An annotation UI — the screen where labels get applied to data",
    tags: ["label", "screen", "tag"], family: "window",
    aliases: [], keywords: ["annotation interface", "labeling ui"],
    shapes: [
      row(5, 3, 21), row(10, 3, 21),
      poly([[3, 14], [10, 14], [13, 17], [10, 20], [3, 20]], true),
      col(17, 14, 20),
    ],
  },
  {
    slug: "north-star", category: "analytics", subcategory: "metric",
    name: "North star", description: "A north star metric — the one number everything else in the product serves",
    tags: ["guiding", "primary", "star"], family: "figure",
    aliases: ["north-star-metric"], keywords: ["north star metric", "primary metric"],
    // A five-point star cannot exist at 0/45/90; the diamond with four rays can.
    shapes: [
      poly([[12, 7], [17, 12], [12, 17], [7, 12]], true),
      poly([[4, 4], [7, 7]]), poly([[20, 4], [17, 7]]),
      poly([[4, 20], [7, 17]]), poly([[20, 20], [17, 17]]),
    ],
  },

  /* ── cloud: the colder shelves ────────────────────────────────────────────────── */

  {
    slug: "backup-tier", category: "cloud", subcategory: "storage",
    name: "Backup tier", description: "A backup tier — a copy kept one shelf further from the fire, on cheaper storage",
    tags: ["copy", "down", "shelf"], family: "window",
    aliases: [], keywords: ["backup tier", "secondary storage"],
    shapes: [
      rect(4, 3, 16, 7, 2),
      col(12, 11.5, 14), poly([[9.5, 13], [12, 15.5], [14.5, 13]]),
      rect(4, 17, 16, 4.5, 2.25),
    ],
  },
  {
    slug: "service-endpoint", category: "cloud", subcategory: "network",
    name: "Service endpoint", description: "A service endpoint — the socket in the private wall a service is reached through",
    tags: ["plug", "socket", "private"], family: "figure",
    aliases: [], keywords: ["service endpoint", "private socket"],
    shapes: [
      rect(4, 9, 6.5, 6.5, 2),
      row(10.5, 11.5, 14), row(13.5, 11.5, 14),
      col(17.5, 4, 20),
    ],
  },
  {
    slug: "cache-miss", category: "cloud", subcategory: "network",
    name: "Cache miss", description: "A cache miss — not here, go and ask the origin, the slow path",
    tags: ["lens", "cross", "slow"], family: "figure",
    aliases: [], keywords: ["cache miss", "not cached"],
    shapes: [
      disc(11, 11, 7),
      poly([[8.5, 8.5], [13.5, 13.5]]), poly([[13.5, 8.5], [8.5, 13.5]]),
      poly([[16, 16], [19.5, 19.5]]),
    ],
  },
  {
    slug: "purge-cache", category: "cloud", subcategory: "network",
    name: "Purge cache", description: "Purge cache — everything flushed out on purpose so it is fetched fresh",
    tags: ["clear", "evict", "flush"], family: "window",
    aliases: ["cache-purge"], keywords: ["purge cache", "invalidate all"],
    shapes: [
      rect(3, 8, 12, 12, 2),
      disc(18, 5, 1), disc(21, 9, 1), disc(19, 13, 1),
    ],
  },
  {
    slug: "dead-letter-cloud", category: "cloud", subcategory: "network",
    name: "Dead letter", description: "A dead letter — a message delivered nowhere, kept anyway for inspection",
    tags: ["failed", "envelope", "queue"], family: "window",
    aliases: ["dlq"], keywords: ["dead letter queue", "dlq", "failed messages"],
    shapes: [
      rect(3, 6, 18, 12, 2), poly([[6, 7], [12, 13], [18, 7]]),
      poly([[16, 19], [19, 22]]), poly([[19, 19], [16, 22]]),
    ],
  },
  {
    slug: "cost-anomaly", category: "cloud", subcategory: "cost",
    name: "Cost anomaly", description: "A cost anomaly — the bill did something new last night, a spike to investigate",
    tags: ["spike", "bill", "alert"], family: "figure",
    aliases: [], keywords: ["cost anomaly", "billing spike"],
    shapes: [
      poly([[4, 7], [8, 3], [12, 7], [16, 3], [20, 7]]),
      disc(12, 15, 5), disc(12, 15, 2),
    ],
  },
  {
    slug: "intelligent-tier", category: "cloud", subcategory: "storage",
    name: "Intelligent tiering", description: "Intelligent tiering — data files itself into whichever storage tier is cheapest",
    tags: ["auto", "move", "tiers"], family: "window",
    aliases: [], keywords: ["intelligent tiering", "auto tiering"],
    shapes: [
      rect(3, 8, 18, 8, 2),
      col(9, 2.5, 5), poly([[6.5, 4.5], [9, 2], [11.5, 4.5]]),
      col(15, 19, 21.5), poly([[12.5, 19.5], [15, 22], [17.5, 19.5]]),
    ],
  },
  {
    slug: "queue-priority", category: "automation", subcategory: "schedule",
    name: "Priority queue", description: "A priority queue — the important message boards first ahead of the rest",
    tags: ["first", "queue", "diamond"], family: "figure",
    aliases: [], keywords: ["priority queue", "jump the line"],
    shapes: [
      poly([[5.5, 8.5], [9, 12], [5.5, 15.5], [2, 12]], true),
      disc(14, 12, 2), disc(19.5, 12, 2),
      row(18, 2, 21),
    ],
  },
  {
    slug: "cron-expression", category: "automation", subcategory: "schedule",
    name: "Cron expression", description: "A cron expression — five stars that mean every Monday, a schedule as a string",
    tags: ["schedule", "string", "clock"], family: "figure",
    aliases: [], keywords: ["cron expression", "crontab"],
    shapes: [
      disc(12, 9, 6), col(12, 6, 9), row(9, 12, 15.5),
      col(6, 18, 20.5), col(12, 18, 20.5), col(18, 18, 20.5),
    ],
  },
  {
    slug: "at-least-once", category: "automation", subcategory: "integration",
    name: "At least once", description: "At least once — it will arrive, possibly in duplicate, after retries",
    tags: ["delivery", "retry", "twice"], family: "figure",
    aliases: [], keywords: ["at least once", "delivery guarantee"],
    shapes: [
      disc(6, 12, 3), disc(6, 12, 1),
      poly([[12, 9], [14, 11], [17.5, 7.5]]),
      poly([[14, 14], [16, 16], [19.5, 12.5]]),
    ],
  },

  /* ── automation: messaging's etiquette ────────────────────────────────────────── */

  {
    slug: "outbox", category: "automation", subcategory: "integration",
    name: "Outbox", description: "An outbox — written here first and always sent from here, the transactional outbox pattern",
    tags: ["send", "tray", "up"], family: "tray",
    aliases: ["outbox-pattern"], keywords: ["outbox pattern", "transactional outbox"],
    shapes: [
      poly([[4, 10], [4, 20], [20, 20], [20, 10]]),
      col(12, 4, 9), poly([[9.5, 5.5], [12, 3], [14.5, 5.5]]),
    ],
  },
  {
    slug: "inbox-pattern", category: "automation", subcategory: "integration",
    name: "Inbox", description: "An inbox — everything lands here before it counts, the inbox pattern for reliable receipt",
    tags: ["receive", "tray", "down"], family: "tray",
    aliases: [], keywords: ["inbox pattern", "idempotent consumer"],
    shapes: [
      poly([[4, 10], [4, 20], [20, 20], [20, 10]]),
      col(12, 3, 5.5), poly([[9.5, 5.5], [12, 8], [14.5, 5.5]]),
    ],
  },
  {
    slug: "claim-check", category: "automation", subcategory: "integration",
    name: "Claim check", description: "A claim check — leave the big parcel in storage and pass along the stub",
    tags: ["ticket", "store", "fetch"], family: "figure",
    aliases: [], keywords: ["claim check pattern", "reference message"],
    shapes: [
      poly([[3, 4], [11, 4], [14, 7], [11, 10], [3, 10]], true), disc(7, 7, 2),
      rect(8, 14, 13, 6.5, 2),
    ],
  },
  {
    slug: "compensate", category: "automation", subcategory: "workflow",
    name: "Compensate", description: "Compensate — the undo travelling the road back through a saga",
    tags: ["undo", "reverse", "saga"], family: "arrow",
    aliases: ["compensating-action"], keywords: ["compensation", "undo action"],
    shapes: [
      row(8, 4, 17), poly([[17, 5.5], [19.5, 8], [17, 10.5]]),
      row(16, 7, 20), poly([[7, 13.5], [4.5, 16], [7, 18.5]]),
    ],
  },
  {
    slug: "resequencer", category: "automation", subcategory: "integration",
    name: "Resequencer", description: "A resequencer — messages that arrived jumbled, delivered in order",
    tags: ["order", "sort", "queue"], family: "figure",
    aliases: [], keywords: ["resequencer", "reorder messages"],
    shapes: [
      disc(4, 7, 2), disc(6, 15, 2),
      poly([[10.5, 9.5], [13, 12], [10.5, 14.5]]),
      disc(18, 5, 2), disc(18, 12, 2), disc(18, 19, 2),
    ],
  },
  {
    slug: "form-step", category: "automation", subcategory: "human-loop",
    name: "Form step", description: "A form step — the workflow pauses for a person to fill in the form",
    tags: ["input", "human", "fill"], family: "window",
    aliases: [], keywords: ["form step", "human input step"],
    shapes: [
      rect(4, 3, 16, 18, 2),
      row(8, 7, 17), row(13, 7, 14), col(16.5, 11, 15),
    ],
  },
  {
    slug: "dedupe-window", category: "automation", subcategory: "trigger",
    name: "Dedupe window", description: "A dedupe window — seen it already within the window, so the duplicate is dropped",
    tags: ["duplicate", "window", "drop"], family: "window",
    aliases: [], keywords: ["dedupe window", "duplicate suppression"],
    shapes: [
      rect(3, 8, 18, 8, 2),
      disc(8, 12, 2), disc(15, 12, 2),
      poly([[13, 15], [17, 11]]),
    ],
  },
  {
    slug: "two-phase", category: "automation", subcategory: "workflow",
    name: "Two-phase", description: "Two-phase commit — everyone says ready before anyone says go",
    tags: ["commit", "both", "atomic"], family: "figure",
    aliases: ["two-phase-commit"], keywords: ["two phase commit", "2pc"],
    shapes: [
      poly([[5, 8], [7, 10], [10.5, 6.5]]),
      poly([[5, 16], [7, 18], [10.5, 14.5]]),
      poly([[15.5, 5], [18, 5], [18, 19], [15.5, 19]]),
    ],
  },
  {
    slug: "macro-record", category: "automation", subcategory: "action",
    name: "Record macro", description: "Record macro — do it once while the tool watches, then replay it",
    tags: ["record", "repeat", "capture"], family: "figure",
    aliases: [], keywords: ["record macro", "capture actions"],
    shapes: [
      disc(12, 6, 3),
      row(13, 3, 21), row(18, 9, 21),
    ],
  },
  {
    slug: "queue-worker", category: "automation", subcategory: "integration",
    name: "Queue worker", description: "A queue worker — the box the queue drains into, the consumer of jobs",
    tags: ["consumer", "jobs", "drain"], family: "figure",
    aliases: ["consumer-worker"], keywords: ["queue worker", "consumer", "job runner"],
    // until-loop was drawn first — cycle-plus-check came back at IoU 0.94
    // against ci, whose picture that already is.
    shapes: [
      disc(5, 5, 2), disc(11, 5, 2), disc(17, 5, 2),
      poly([[9.5, 9], [12, 11.5], [14.5, 9]]),
      rect(7, 14.5, 10, 7, 2),
    ],
  },
];
