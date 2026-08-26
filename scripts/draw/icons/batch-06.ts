/**
 * Batch 06 — the families, and what the language was for.
 *
 * Ten of these twenty-one are one body with a different mark in its hollow. `agent-add` is
 * `agent`'s ring, byte for byte, with a plus where the core was; `model-off` is `model`'s
 * machine with a cross where the diamond was. Nothing about the body changes, so nothing
 * about the body can drift — which is the promise made when the badge in the corner was
 * abandoned, and the first batch where it is actually collected on.
 *
 * The eleven that are not families are the ones whose picture is the whole idea: an
 * hourglass, a staircase, a flag.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { cycle, machine, panel, ring, window_ } from "../bodies.ts";
import { add, alert, check, off, pause, remove } from "../marks.ts";
import type { Icon } from "../build.ts";

const agentFamily = (
  slug: string, name: string, description: string,
  tags: string[], keywords: string[], mark: () => ReturnType<typeof add>,
): Icon => ({
  slug, category: "agents", subcategory: "lifecycle", name, description,
  tags, family: "orbit", keywords,
  shapes: [ring(), ...mark()],
});

const modelFamily = (
  slug: string, name: string, description: string,
  tags: string[], keywords: string[], mark: () => ReturnType<typeof add>,
): Icon => ({
  slug, category: "ai", subcategory: "model", name, description,
  tags, family: "machine", keywords,
  shapes: [machine(), ...mark()],
});

export const BATCH_06: Icon[] = [
  /* ── The agent family: one ring, six middles ──────────────────────────────────── */

  agentFamily("agent-add", "Agent add", "Bring another agent in",
    ["new", "create", "spawn"], ["new agent", "spawn", "create", "register"], add),
  agentFamily("agent-remove", "Agent remove", "Take an agent out",
    ["delete", "detach", "drop"], ["delete agent", "unregister", "detach", "drop"], remove),
  agentFamily("agent-check", "Agent check", "The agent passed its checks",
    ["valid", "healthy", "verified"], ["healthy", "verified", "ready", "passing"], check),
  agentFamily("agent-alert", "Agent alert", "Something is wrong with this agent",
    ["warning", "problem", "attention"], ["error", "failing", "attention", "degraded"], alert),
  agentFamily("agent-off", "Agent off", "The agent is disabled",
    ["disabled", "stopped", "inactive"], ["disable", "inactive", "suspended", "shut down"], off),
  agentFamily("agent-pause", "Agent pause", "The agent is held, not stopped",
    ["hold", "suspend", "wait"], ["suspend", "hold", "resume", "paused"], pause),

  /* ── The model family: one machine, four middles ──────────────────────────────── */

  modelFamily("model-add", "Model add", "Register another model",
    ["new", "register", "import"], ["new model", "register", "import", "pull"], add),
  modelFamily("model-check", "Model check", "The model passed evaluation",
    ["valid", "approved", "verified"], ["validated", "approved", "eval passed", "certified"], check),
  modelFamily("model-alert", "Model alert", "Something is wrong with this model",
    ["warning", "drift", "problem"], ["drift", "degraded", "error", "attention"], alert),
  modelFamily("model-off", "Model off", "The model is disabled",
    ["disabled", "retired", "inactive"], ["disable", "deprecated", "retired", "unavailable"], off),

  /* ── Concepts whose picture is the whole idea ─────────────────────────────────── */

  {
    slug: "latency", category: "ai", subcategory: "inference",
    name: "Latency", description: "How long you wait for the answer",
    tags: ["delay", "wait", "response-time"], family: "gauge",
    aliases: [], keywords: ["response time", "ttft", "p99", "slow", "hourglass", "delay"],
    // An hourglass, drawn as one closed run that pinches at the middle and opens out again.
    // A clock would say "time"; an hourglass says "time you are spending".
    shapes: [poly([[4, 3], [20, 3], [12, 11], [20, 19], [4, 19], [12, 11]], true)],
  },

  {
    slug: "throughput", category: "ai", subcategory: "inference",
    name: "Throughput", description: "How much gets through, per second",
    tags: ["rate", "volume", "capacity"], family: "arrow",
    aliases: ["rate"], keywords: ["tokens per second", "qps", "bandwidth", "capacity"],
    // Two arrows, not one. One arrow is a direction; two of the same arrow are a rate.
    shapes: [
      row(8, 3, 17), poly([[14, 5], [17, 8], [14, 11]]),
      row(16, 3, 17), poly([[14, 13], [17, 16], [14, 19]]),
    ],
  },

  {
    slug: "similarity", category: "ai", subcategory: "embedding",
    name: "Similarity", description: "How close two meanings are",
    tags: ["overlap", "distance", "match"], family: "lattice",
    aliases: [], keywords: ["cosine", "distance", "nearest", "match", "overlap"],
    // Two of `embedding`'s diamond, overlapping. The overlap is the measurement: pulled
    // apart they are two vectors, and stacked exactly they are one.
    shapes: [
      poly([[9, 5], [14, 10], [9, 15], [4, 10]], true),
      poly([[15, 9], [20, 14], [15, 19], [10, 14]], true),
    ],
  },

  {
    slug: "checkpoint", category: "ai", subcategory: "training",
    name: "Checkpoint", description: "The model, saved as it was at this moment",
    tags: ["save", "snapshot", "flag"], family: "figure",
    aliases: ["snapshot"], keywords: ["save state", "resume", "milestone", "weights"],
    // A flag on a pole. The banner is open at the pole because that is where a flag is
    // attached rather than closed, and the pole runs past it at both ends.
    shapes: [col(6, 3, 21), poly([[6, 5], [18, 5], [18, 12], [6, 12]])],
  },

  {
    slug: "retry", category: "ai", subcategory: "inference",
    name: "Retry", description: "Go round and try again",
    tags: ["repeat", "again", "loop"], family: "orbit",
    aliases: [], keywords: ["backoff", "attempt", "refresh", "again", "resilience", "repeat"],
    // Three quarters of a circle with the head at its opening, so the drawing reads as one
    // turn rather than as a ring with a mark on it.
    shapes: [...cycle("ccw")],
  },

  {
    slug: "loss-curve", category: "ai", subcategory: "training",
    name: "Loss curve", description: "The error coming down as training goes on",
    tags: ["training", "error", "convergence"], family: "axes",
    aliases: [], keywords: ["convergence", "gradient descent", "plateau", "error"],
    // Falls steeply and then flattens, which is what a loss curve does and what tells it
    // apart from `chart-line`. The axes are the same axes, deliberately.
    shapes: [
      col(4, 4, 20), row(20, 4, 20),
      poly([[6, 6], [11, 11], [15, 15], [20, 15]]),
    ],
  },

  {
    slug: "quantization", category: "ai", subcategory: "training",
    name: "Quantization", description: "Fewer bits per weight, on purpose",
    tags: ["precision", "compress", "steps"], family: "rails",
    aliases: ["quantize", "quantise"], keywords: ["int8", "int4", "gguf", "precision", "compress"],
    // A staircase. Quantising is turning something continuous into steps, and a staircase is
    // that sentence with no metaphor in between.
    shapes: [
      poly([[4, 18], [8, 18], [8, 14], [12, 14], [12, 10], [16, 10], [16, 6], [20, 6]]),
    ],
  },

  {
    slug: "agent-handoff", category: "agents", subcategory: "communication",
    name: "Agent handoff", description: "One agent passing the work to another",
    tags: ["transfer", "delegate", "pass"], family: "orbit",
    aliases: ["handover"], keywords: ["delegate", "transfer", "route", "escalate"],
    // The exact mirror of `agent-delegate`: there the work goes down to a subordinate,
    // here it goes up and across to a peer. Same rings, same corner-arrow, opposite slope.
    shapes: [
      arc(6, 16, 3.5, 295, 245), poly([[9, 13], [12, 10]]),
      poly([[11.5, 10], [14, 10], [14, 12.5]]), arc(17, 7, 3.5, 295, 245),
    ],
  },

  {
    slug: "prompt-template", category: "ai", subcategory: "prompt",
    name: "Prompt template", description: "A prompt with a hole to fill in",
    tags: ["placeholder", "variable", "reusable"], family: "window",
    aliases: [], keywords: ["variables", "placeholder", "jinja", "f-string", "parameterised"],
    // Fixed text above, and the slot underneath. The slot is a capsule rather than a run,
    // because a run at that length is just another line of the same text.
    shapes: [window_(), row(9, 7, 17), rect(7, 13, 10, 5, 2.5)],
  },

  {
    slug: "context-full", category: "ai", subcategory: "context",
    name: "Context full", description: "There is no room left in the window",
    tags: ["limit", "capacity", "overflow"], family: "bracket",
    aliases: [], keywords: ["overflow", "max tokens", "truncated", "at capacity"],
    // `context-window`'s brackets, packed. The single dot of the empty window becomes three
    // bars filling the span, so the pair reads as the same measurement in two states.
    shapes: [
      poly([[8, 6], [5, 6], [5, 18], [8, 18]]),
      poly([[16, 6], [19, 6], [19, 18], [16, 18]]),
      col(9, 9, 15), col(12, 9, 15), col(15, 9, 15),
    ],
  },

  {
    slug: "context-compress", category: "ai", subcategory: "context",
    name: "Context compress", description: "Fitting more meaning into less room",
    tags: ["summarise", "shrink", "squeeze"], family: "bracket",
    aliases: ["compact"], keywords: ["summarise", "prune", "distil", "shrink", "trim"],
    // The same brackets, with two arrows closing on the middle. Drawn as bare chevrons the
    // two met at the centre and the pair read as a cross — `[X]`, which says the context
    // failed rather than that it was squeezed. Shafts give each one a direction, and the
    // two points stop two units short of each other rather than touching.
    shapes: [
      poly([[8, 6], [5, 6], [5, 18], [8, 18]]),
      poly([[16, 6], [19, 6], [19, 18], [16, 18]]),
      row(12, 6, 11), poly([[9, 10], [11, 12], [9, 14]]),
      row(12, 13, 18), poly([[15, 10], [13, 12], [15, 14]]),
    ],
  },
];
