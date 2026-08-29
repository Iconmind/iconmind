/**
 * Batch 61 — round 10 of the 1k plan: adapters and experts, agents under
 * budgets, evaluation's fine print, the cloud's plumbing, and flow control's
 * waiting room.
 *
 * Swaps: adapter-swap is model-swap, cycle-guard is loop-detect, deadline-agent
 * is deadline, quantize-8bit/dequantize are quantize-4bit's own picture,
 * queue-worker is task-queue-agent, jitter is backoff-exponential — the next
 * names in each list took the seats, checked free before drawing.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { cycle, shield } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_61: Icon[] = [
  /* ── ai: adapters and experts ─────────────────────────────────────────────────── */

  {
    slug: "rank-adapter", category: "ai", subcategory: "training",
    name: "Rank adapter", description: "The small thing bolted onto the big frozen thing",
    tags: ["lora", "adapter", "small"], family: "machine",
    aliases: ["lora-adapter"], keywords: ["lora", "low rank adapter", "peft"],
    // The frozen block, and the little module that does all the learning.
    shapes: [
      rect(3, 3, 11, 18, 2),
      rect(17, 8.5, 4, 7, 2), poly([[14, 12], [17, 12]]),
    ],
  },
  {
    slug: "lora-merge", category: "ai", subcategory: "training",
    name: "LoRA merge", description: "The adapter folds back into the weights",
    tags: ["merge", "fold", "bake"], family: "machine",
    aliases: [], keywords: ["merge lora", "fold adapter", "bake weights"],
    shapes: [
      rect(3, 4, 11, 16, 2),
      rect(17.5, 8.5, 4, 7, 2), row(12, 14.5, 17), poly([[16, 10], [14, 12], [16, 14]]),
    ],
  },
  {
    slug: "quantize-4bit", category: "ai", subcategory: "model",
    name: "Quantize", description: "The smooth line, told to pick a step",
    tags: ["compress", "steps", "bits"], family: "chart",
    aliases: ["quantization-4bit", "quantize-8bit"], keywords: ["quantization", "4-bit", "int8", "gguf"],
    // What was a slope becomes a staircase — that is the whole operation.
    shapes: [
      poly([[3, 9], [9, 3]]),
      poly([[3, 21], [8, 21], [8, 16], [13, 16], [13, 11], [18, 11], [18, 6], [21, 6]]),
    ],
  },
  {
    slug: "weight-prune", category: "ai", subcategory: "model",
    name: "Weight prune", description: "The connection nobody will miss, cut",
    tags: ["sparse", "cut", "trim"], family: "chain",
    aliases: [], keywords: ["pruning", "prune weights", "sparsify"],
    // `dep-graph`'s connected nodes with one edge snipped through.
    shapes: [
      disc(5, 7.5, 3), disc(19, 7.5, 3), disc(12, 14.5, 3),
      poly([[7.5, 10], [10, 12.5]]), poly([[16.5, 10], [14, 12.5]]),
      poly([[14.5, 9], [17.5, 12]]),
    ],
  },
  {
    slug: "sparsity", category: "ai", subcategory: "model",
    name: "Sparsity", description: "Mostly zeros, on purpose",
    tags: ["zeros", "empty", "matrix"], family: "window",
    aliases: ["sparse-matrix"], keywords: ["sparsity", "sparse", "mostly zeros"],
    shapes: [
      rect(3, 3, 18, 18, 2),
      disc(8, 8, 1), disc(15.5, 6.5, 1), disc(10.5, 16, 1),
    ],
  },
  {
    slug: "expert-router", category: "ai", subcategory: "inference",
    name: "Expert router", description: "This token goes to that specialist",
    tags: ["moe", "route", "pick"], family: "machine",
    aliases: ["moe-router"], keywords: ["mixture of experts", "router", "gating"],
    shapes: [
      poly([[12, 2], [15, 5], [12, 8], [9, 5]], true),
      poly([[10.5, 9], [7.5, 12]]), poly([[13.5, 9], [16.5, 12]]),
      rect(2.5, 13, 8, 7, 2), rect(13.5, 13, 8, 7, 2),
    ],
  },
  {
    slug: "context-length", category: "ai", subcategory: "inference",
    name: "Context length", description: "How much fits between the brackets",
    tags: ["window", "capacity", "tokens"], family: "figure",
    aliases: [], keywords: ["context length", "window size", "token capacity"],
    shapes: [
      poly([[5.5, 4], [3, 4], [3, 20], [5.5, 20]]),
      poly([[18.5, 4], [21, 4], [21, 20], [18.5, 20]]),
      row(12, 7, 17),
    ],
  },
  {
    slug: "context-extend", category: "ai", subcategory: "inference",
    name: "Context extend", description: "The brackets pushed further apart",
    tags: ["longer", "grow", "window"], family: "figure",
    aliases: ["long-context"], keywords: ["extend context", "long context", "128k"],
    // `context-length` with the right bracket already moving.
    shapes: [
      poly([[5.5, 4], [3, 4], [3, 20], [5.5, 20]]),
      row(12, 7, 14), poly([[13.5, 9.5], [16, 12], [13.5, 14.5]]),
      poly([[18.5, 4], [21, 4], [21, 20], [18.5, 20]]),
    ],
  },
  {
    slug: "logit-lens", category: "ai", subcategory: "inference",
    name: "Logit lens", description: "What it is thinking, one layer early",
    tags: ["inspect", "probs", "peek"], family: "figure",
    aliases: [], keywords: ["logit lens", "probe layer", "interpretability"],
    shapes: [
      col(5, 13, 18), col(9, 9, 18), col(13, 11, 18),
      disc(17, 7, 4), poly([[20, 10], [22, 12]]),
    ],
  },
  {
    slug: "draft-verify", category: "ai", subcategory: "inference",
    name: "Draft and verify", description: "The small model guesses; the big one signs off",
    tags: ["speculative", "fast", "check"], family: "machine",
    aliases: ["speculative-decoding"], keywords: ["speculative decoding", "draft model", "verify"],
    shapes: [
      rect(3, 5, 8, 8, 2),
      poly([[12, 15], [15, 18], [21, 12]]),
    ],
  },

  /* ── agents: under budgets ────────────────────────────────────────────────────── */

  {
    slug: "task-steal", category: "agents", subcategory: "execution",
    name: "Task steal", description: "Idle hands take from the busy pile",
    tags: ["balance", "take", "queue"], family: "orbit",
    aliases: ["work-stealing"], keywords: ["work stealing", "task stealing", "rebalance"],
    // The task, mid-move between one agent's pile and the other.
    shapes: [
      arc(6, 6, 3.5, 295, 245), arc(18, 18, 3.5, 295, 245),
      rect(8, 10, 8, 4, 2), poly([[13, 15], [15, 17]]),
    ],
  },
  {
    slug: "goal-milestone", category: "agents", subcategory: "planning",
    name: "Goal milestone", description: "The flag planted partway to the middle",
    tags: ["progress", "flag", "target"], family: "figure",
    aliases: [], keywords: ["milestone", "waypoint", "progress marker"],
    shapes: [
      disc(12, 15, 6), disc(12, 15, 2),
      col(12, 2, 9), poly([[12, 2.5], [17, 2.5], [17, 6], [12, 6]]),
    ],
  },
  {
    slug: "spend-cap", category: "agents", subcategory: "execution",
    name: "Spend cap", description: "The money stops here",
    tags: ["budget", "ceiling", "limit"], family: "figure",
    aliases: ["budget-cap"], keywords: ["spend cap", "budget limit", "cost ceiling"],
    // The coin under the lid it cannot pass.
    shapes: [row(4, 4, 20), disc(12, 14, 6), disc(12, 14, 2)],
  },
  {
    slug: "stuck-agent", category: "agents", subcategory: "execution",
    name: "Stuck agent", description: "Still trying; not moving",
    tags: ["blocked", "wall", "stalled"], family: "orbit",
    aliases: [], keywords: ["stuck", "stalled agent", "blocked progress"],
    // `agent-quota`'s wall, met head-on.
    shapes: [arc(9, 12, 5.5, 295, 245), col(19.5, 4, 20)],
  },
  {
    slug: "approval-grant", category: "agents", subcategory: "execution",
    name: "Approval granted", description: "The gate opens",
    tags: ["yes", "gate", "human"], family: "figure",
    aliases: [], keywords: ["approval granted", "human yes", "gate open"],
    shapes: [
      rect(3, 3, 10, 18, 2),
      poly([[14, 10], [17, 13], [21.5, 8.5]]),
    ],
  },
  {
    slug: "approval-deny", category: "agents", subcategory: "execution",
    name: "Approval denied", description: "The gate stays shut",
    tags: ["no", "gate", "human"], family: "figure",
    aliases: [], keywords: ["approval denied", "human no", "gate shut"],
    shapes: [
      rect(3, 3, 10, 18, 2),
      poly([[15.5, 9.5], [20.5, 14.5]]), poly([[20.5, 9.5], [15.5, 14.5]]),
    ],
  },
  {
    slug: "autonomy-level", category: "agents", subcategory: "agent-core",
    name: "Autonomy level", description: "How long the leash is today",
    tags: ["slider", "freedom", "dial"], family: "figure",
    aliases: [], keywords: ["autonomy level", "permission level", "leash"],
    shapes: [
      col(6, 5, 8), col(12, 5, 8), col(18, 5, 8),
      row(15, 3, 21), rect(10, 13, 4, 4, 2),
    ],
  },
  {
    slug: "guarded-action", category: "agents", subcategory: "execution",
    name: "Guarded action", description: "It acts — inside the shield",
    tags: ["safe", "run", "protected"], family: "shield",
    aliases: [], keywords: ["guarded action", "safe execution", "protected run"],
    shapes: [shield(), poly([[10, 8], [14, 12], [10, 16]], true)],
  },
  {
    slug: "memory-pin", category: "agents", subcategory: "memory",
    name: "Memory pin", description: "This one is not allowed to fade",
    tags: ["keep", "pin", "remember"], family: "figure",
    aliases: [], keywords: ["pin memory", "keep note", "never forget"],
    shapes: [
      disc(12, 6, 3), col(12, 9, 13),
      row(17, 4, 20), row(21, 4, 15),
    ],
  },
  {
    slug: "liveness", category: "agents", subcategory: "lifecycle",
    name: "Liveness", description: "Alive, and proving it on schedule",
    tags: ["heartbeat", "alive", "pulse"], family: "orbit",
    aliases: ["agent-heartbeat"], keywords: ["liveness", "heartbeat", "still alive"],
    shapes: [
      poly([[5, 6], [8, 6], [10, 4], [14, 8], [16, 6], [19, 6]]),
      arc(12, 15, 5.5, 295, 245),
    ],
  },

  /* ── analytics: evaluation's fine print ───────────────────────────────────────── */

  {
    slug: "leaderboard-internal", category: "analytics", subcategory: "llm-observability",
    name: "Leaderboard", description: "Who is on top, today",
    tags: ["podium", "rank", "top"], family: "chart",
    aliases: ["podium"], keywords: ["leaderboard", "ranking", "podium"],
    shapes: [
      col(5, 11, 19), col(12, 5, 19), col(19, 14, 19),
      row(21.5, 3, 21),
    ],
  },
  {
    slug: "regression-eval", category: "analytics", subcategory: "llm-observability",
    name: "Regression", description: "Better, better, worse",
    tags: ["dip", "worse", "alert"], family: "chart",
    aliases: ["eval-regression"], keywords: ["regression", "quality dip", "got worse"],
    shapes: [
      poly([[3, 3], [3, 21], [21, 21]]),
      poly([[5, 16], [11, 10], [15, 10], [19, 14]]),
    ],
  },
  {
    slug: "rater", category: "analytics", subcategory: "llm-observability",
    name: "Rater", description: "A person, reading carefully, scoring",
    tags: ["human", "review", "score"], family: "figure",
    aliases: ["human-rater"], keywords: ["human rater", "annotator", "review scores"],
    shapes: [
      disc(7, 5, 2), arc(7, 13, 4, 180, 360),
      row(7, 14, 21), row(12, 14, 21), row(17, 14, 19),
    ],
  },
  {
    slug: "token-price", category: "analytics", subcategory: "metric",
    name: "Token price", description: "What the words cost, each",
    tags: ["cost", "tokens", "coin"], family: "figure",
    aliases: [], keywords: ["token price", "per token cost", "pricing"],
    shapes: [
      disc(5, 6, 2), disc(11, 6, 2), disc(17, 6, 2),
      disc(12, 16, 5), disc(12, 16, 2),
    ],
  },
  {
    slug: "holdout-group", category: "analytics", subcategory: "experiment",
    name: "Holdout group", description: "The users the experiment never touches",
    tags: ["control", "fence", "apart"], family: "figure",
    aliases: ["control-group"], keywords: ["holdout group", "control group", "untouched"],
    shapes: [
      disc(5, 12, 2), disc(11, 12, 2),
      col(15.5, 4, 20), disc(19.5, 12, 2),
    ],
  },
  {
    slug: "uplift", category: "analytics", subcategory: "experiment",
    name: "Uplift", description: "The difference the change actually made",
    tags: ["delta", "gain", "bars"], family: "chart",
    aliases: [], keywords: ["uplift", "treatment effect", "delta"],
    shapes: [
      col(7, 12, 19), col(15, 6, 19), row(21.5, 4, 20),
      poly([[9, 10.5], [12, 7.5]]),
    ],
  },
  {
    slug: "seasonal-cycle", category: "analytics", subcategory: "chart",
    name: "Seasonal cycle", description: "It always comes back around",
    tags: ["wave", "repeat", "period"], family: "chart",
    aliases: ["seasonality-wave"], keywords: ["seasonality", "periodic", "wave"],
    shapes: [arc(7, 12, 4, 180, 360), arc(15, 12, 4, 0, 180)],
  },
  {
    slug: "funnel-leak", category: "analytics", subcategory: "chart",
    name: "Funnel leak", description: "Where they quietly fall out",
    tags: ["drop", "loss", "funnel"], family: "figure",
    aliases: [], keywords: ["funnel leak", "drop-off", "conversion loss"],
    shapes: [
      poly([[3, 3], [21, 3], [14, 10], [14, 16], [10, 16], [10, 10]], true),
      col(17.5, 12, 14.5), col(19.5, 16, 18.5),
    ],
  },
  {
    slug: "changepoint", category: "analytics", subcategory: "chart",
    name: "Changepoint", description: "The exact moment it stopped being the old normal",
    tags: ["shift", "kink", "moment"], family: "chart",
    aliases: [], keywords: ["changepoint", "structural break", "shift"],
    shapes: [
      poly([[4, 10], [12, 10], [19, 17]]),
      col(12, 5, 7.5),
    ],
  },
  {
    slug: "anomaly-band", category: "analytics", subcategory: "chart",
    name: "Anomaly band", description: "The corridor, and the dot outside it",
    tags: ["outlier", "bounds", "escape"], family: "chart",
    aliases: [], keywords: ["anomaly band", "confidence band", "out of bounds"],
    shapes: [row(7, 3, 21), row(13, 3, 21), disc(16, 18.5, 2)],
  },

  /* ── cloud: the plumbing ──────────────────────────────────────────────────────── */

  {
    slug: "glacier-tier", category: "cloud", subcategory: "storage",
    name: "Glacier tier", description: "Cold, cheap, and slow to wake",
    tags: ["cold", "archive", "icicles"], family: "window",
    aliases: ["cold-tier"], keywords: ["glacier", "cold storage", "archive tier"],
    shapes: [
      rect(3, 4, 18, 8, 2),
      col(7, 15, 18.5), col(12, 15, 21), col(17, 15, 18.5),
    ],
  },
  {
    slug: "ingress-free", category: "cloud", subcategory: "cost",
    name: "Ingress free", description: "Coming in costs nothing",
    tags: ["free", "in", "transfer"], family: "arrow",
    aliases: [], keywords: ["free ingress", "data in", "no charge in"],
    // `egress-fee`'s door, walked the other way — and no coin anywhere.
    shapes: [
      rect(11, 4, 10, 16, 2),
      row(12, 3, 8.5), poly([[6, 9.5], [8.5, 12], [6, 14.5]]),
    ],
  },
  {
    slug: "vpc-peering", category: "cloud", subcategory: "network",
    name: "VPC peering", description: "Two private networks, one quiet corridor",
    tags: ["private", "link", "pair"], family: "window",
    aliases: [], keywords: ["vpc peering", "private link", "network pair"],
    shapes: [
      rect(2, 7, 8, 10, 2), rect(14, 7, 8, 10, 2),
      row(10, 10.5, 13.5), row(14, 10.5, 13.5),
    ],
  },
  {
    slug: "transit-gateway", category: "cloud", subcategory: "network",
    name: "Transit gateway", description: "Every network's traffic, through one hub",
    tags: ["hub", "spokes", "router"], family: "figure",
    aliases: [], keywords: ["transit gateway", "hub and spoke", "network hub"],
    shapes: [
      poly([[12, 8.5], [15.5, 12], [12, 15.5], [8.5, 12]], true),
      row(12, 3, 7), row(12, 17, 21), col(12, 3, 7), col(12, 17, 21),
    ],
  },
  {
    slug: "health-probe", category: "cloud", subcategory: "network",
    name: "Health probe", description: "Poked on schedule, and it answered",
    tags: ["check", "pulse", "alive"], family: "figure",
    aliases: ["healthcheck-probe"], keywords: ["health probe", "healthcheck", "liveness check"],
    shapes: [
      poly([[3, 8], [7.5, 8], [9.5, 6], [13.5, 10], [15.5, 8], [21, 8]]),
      poly([[9, 15], [11, 17], [15, 13]]),
    ],
  },
  {
    slug: "origin-shield", category: "cloud", subcategory: "network",
    name: "Origin shield", description: "One more wall before anyone reaches home",
    tags: ["cdn", "protect", "origin"], family: "shield",
    aliases: [], keywords: ["origin shield", "cdn shield", "protect origin"],
    shapes: [shield(), disc(12, 11, 3.5), row(11, 9, 15)],
  },
  {
    slug: "event-bus", category: "cloud", subcategory: "network",
    name: "Event bus", description: "One rail; everyone taps it",
    tags: ["bus", "events", "taps"], family: "figure",
    aliases: [], keywords: ["event bus", "pub sub rail", "eventbridge"],
    shapes: [
      row(12, 2, 22),
      col(6, 5, 9.5), col(12, 14.5, 19), col(18, 5, 9.5),
    ],
  },
  {
    slug: "rightsizing", category: "cloud", subcategory: "cost",
    name: "Rightsizing", description: "Paid-for and needed, finally the same size",
    tags: ["fit", "shrink", "cost"], family: "window",
    aliases: [], keywords: ["rightsizing", "fit instance", "downsize"],
    shapes: [
      rect(6, 6, 12, 12, 2),
      poly([[2.5, 9.5], [5, 12], [2.5, 14.5]]), poly([[21.5, 9.5], [19, 12], [21.5, 14.5]]),
    ],
  },
  {
    slug: "nat-gw", category: "cloud", subcategory: "network",
    name: "NAT gateway", description: "Everyone leaves wearing the same address",
    tags: ["translate", "address", "gateway"], family: "figure",
    aliases: ["nat-gateway"], keywords: ["nat", "address translation", "gateway"],
    shapes: [disc(4, 12, 2), rect(9, 6, 6.5, 12, 2), disc(20, 12, 2)],
  },
  {
    slug: "cache-hit", category: "cloud", subcategory: "network",
    name: "Cache hit", description: "Found it without asking anyone",
    tags: ["fast", "found", "bolt"], family: "figure",
    aliases: [], keywords: ["cache hit", "served from cache", "fast path"],
    shapes: [
      disc(11, 11, 7),
      poly([[13, 6.5], [9.5, 10], [12, 10], [8.5, 13.5]]),
      poly([[16, 16], [19.5, 19.5]]),
    ],
  },

  /* ── automation: the waiting room ─────────────────────────────────────────────── */

  {
    slug: "while-loop", category: "automation", subcategory: "condition",
    name: "While", description: "Round again, as long as it holds",
    tags: ["loop", "condition", "repeat"], family: "rotation",
    aliases: [], keywords: ["while loop", "conditional loop"],
    shapes: [...cycle("cw"), poly([[12, 9], [15, 12], [12, 15], [9, 12]], true)],
  },
  {
    slug: "break-loop", category: "automation", subcategory: "condition",
    name: "Break", description: "Out of the loop, mid-turn",
    tags: ["exit", "stop", "loop"], family: "rotation",
    aliases: ["loop-break"], keywords: ["break", "exit loop"],
    shapes: [...cycle("cw"), poly([[9, 15], [15, 9]])],
  },
  {
    slug: "continue-loop", category: "automation", subcategory: "condition",
    name: "Continue", description: "Skip the rest; take the next turn",
    tags: ["skip", "next", "loop"], family: "rotation",
    aliases: ["loop-continue"], keywords: ["continue", "next iteration"],
    shapes: [
      ...cycle("cw"),
      poly([[8, 9], [11, 12], [8, 15]]), poly([[13, 9], [16, 12], [13, 15]]),
    ],
  },
  {
    slug: "wait-until", category: "automation", subcategory: "schedule",
    name: "Wait until", description: "Held here till the clock says go",
    tags: ["pause", "then", "time"], family: "figure",
    aliases: [], keywords: ["wait until", "delay until", "scheduled resume"],
    shapes: [
      col(5, 4, 20), col(9, 4, 20),
      row(12, 12.5, 17), poly([[16.5, 9.5], [19, 12], [16.5, 14.5]]),
    ],
  },
  {
    slug: "wait-event", category: "automation", subcategory: "trigger",
    name: "Wait for event", description: "Held here till something happens",
    tags: ["pause", "signal", "listen"], family: "figure",
    aliases: [], keywords: ["wait for event", "on signal", "listener"],
    shapes: [
      col(5, 4, 20), col(9, 4, 20),
      poly([[19, 6], [14.5, 10.5], [17, 10.5], [12.5, 15]]),
    ],
  },
  {
    slug: "mutex-flow", category: "automation", subcategory: "condition",
    name: "Mutex", description: "One at a time, by lock",
    tags: ["lock", "exclusive", "one"], family: "figure",
    aliases: ["mutex"], keywords: ["mutex", "mutual exclusion", "one at a time"],
    shapes: [
      rect(8.5, 10, 7, 6.5, 2), arc(12, 10, 2.5, 180, 360),
      disc(4, 13, 2), disc(20, 13, 2),
    ],
  },
  {
    slug: "delay-queue", category: "automation", subcategory: "schedule",
    name: "Delay queue", description: "Delivered — but not yet",
    tags: ["later", "hold", "queue"], family: "figure",
    aliases: [], keywords: ["delay queue", "delayed delivery", "hold messages"],
    shapes: [
      disc(5, 6, 2), disc(11, 6, 2), disc(17, 6, 2),
      disc(12, 16, 5), col(12, 13.5, 16), row(16, 12, 15.5),
    ],
  },
  {
    slug: "idempotency-key", category: "automation", subcategory: "integration",
    name: "Idempotency key", description: "Send it twice; it happens once",
    tags: ["safe", "repeat", "key"], family: "figure",
    aliases: [], keywords: ["idempotency key", "safe retry", "dedupe requests"],
    shapes: [
      disc(6, 9, 2), row(10, 8, 15), col(12.5, 10, 13),
      row(10, 17, 21), row(16, 17, 21),
    ],
  },
  {
    slug: "exactly-once", category: "automation", subcategory: "integration",
    name: "Exactly once", description: "Not zero, not twice",
    tags: ["delivery", "once", "certain"], family: "figure",
    aliases: [], keywords: ["exactly once", "delivery guarantee"],
    shapes: [
      disc(8, 12, 4), disc(8, 12, 1),
      poly([[14, 12.5], [17, 15.5], [21.5, 11]]),
    ],
  },
  {
    slug: "saga", category: "automation", subcategory: "workflow",
    name: "Saga", description: "Every step knows how to take itself back",
    tags: ["compensate", "undo", "steps"], family: "chain",
    aliases: [], keywords: ["saga pattern", "compensation", "distributed transaction"],
    // Two steps forward on the top road, and the way back drawn underneath.
    shapes: [
      rect(3, 6, 7, 4.5, 2.25), rect(14, 6, 7, 4.5, 2.25),
      row(17, 6, 18),
      poly([[8.5, 14.5], [6, 17], [8.5, 19.5]]),
    ],
  },
];
