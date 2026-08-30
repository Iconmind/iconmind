/**
 * Batch 59 — round 8 of the 1k plan, the first fifty: control flow, the last of
 * the MCP protocol, the training run's dials, agents' tasks, and the controls
 * under a thumb.
 *
 * Sixteen swaps, the usual single reason — the picture already exists:
 * playbook/recipe/if-else are workflow and condition again, agent-mask/avatar
 * are agent-persona, agent-goal/subgoal are goal/subgoal, knob is dial-control,
 * command-bar/omnibox are slash-command and search, plan-revise/replan-step are
 * replan, plan-step-skip is step-over, weight-decay is budget-burn's drawing,
 * and mcp-channel/mcp-pipe/mcp-stream are one transport, not three.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { cycle, page, server } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_59: Icon[] = [
  /* ── automation: control flow ─────────────────────────────────────────────────── */

  {
    slug: "for-each", category: "automation", subcategory: "workflow",
    name: "For each", description: "For each — the same steps run once per item in a list, an iteration loop",
    tags: ["loop", "iterate", "items"], family: "rotation",
    aliases: [], keywords: ["for each", "iterate", "loop over items", "map"],
    // The open ring around the items in their row — the loop, and what it
    // walks. cycle()+dots came back at IoU 0.93 against repeat.
    shapes: [
      arc(12, 12, 9, 295, 245),
      disc(7, 12, 1), disc(12, 12, 1), disc(17, 12, 1),
    ],
  },
  {
    slug: "try-block", category: "automation", subcategory: "workflow",
    name: "Try block", description: "A try block — run the code ready for the worst, guarded so a failure can be caught",
    tags: ["attempt", "guarded", "run"], family: "window",
    aliases: [], keywords: ["try", "attempt", "guarded execution"],
    shapes: [rect(4, 4, 16, 16, 2), poly([[10, 8], [14, 12], [10, 16]], true)],
  },
  {
    slug: "catch-block", category: "automation", subcategory: "workflow",
    name: "Catch block", description: "A catch block — where a failure lands and is handled, the safety net",
    tags: ["handle", "error", "net"], family: "tray",
    aliases: [], keywords: ["catch", "error handler", "exception"],
    // The open tray, and the alarm falling into it — a closed box with the alert
    // would be `taint` verbatim.
    shapes: [
      poly([[4, 10], [4, 20], [20, 20], [20, 10]]),
      col(12, 3, 5.5), disc(12, 8.5, 1),
    ],
  },
  {
    slug: "finally-block", category: "automation", subcategory: "workflow",
    name: "Finally block", description: "A finally block — cleanup that runs no matter how the try went",
    tags: ["cleanup", "always", "after"], family: "window",
    aliases: [], keywords: ["finally", "cleanup", "always runs"],
    // The block, and the check after it — below, because finally comes after
    // whatever happened inside.
    shapes: [rect(4, 3, 16, 13, 2), poly([[8, 18.5], [10, 20.5], [14, 16.5]])],
  },
  {
    slug: "throw-error", category: "automation", subcategory: "workflow",
    name: "Throw", description: "Throw — eject the error out of this block and make it somebody else's problem",
    tags: ["raise", "eject", "error"], family: "window",
    aliases: ["raise-error"], keywords: ["throw", "raise", "exception thrown"],
    // `preempt`'s ejection with the alert as the thing thrown.
    shapes: [
      rect(3, 9, 12, 12, 2), poly([[13, 9], [15.5, 6.5]]),
      col(18.5, 2.5, 5), disc(18.5, 8.5, 1),
    ],
  },
  {
    slug: "rate-window", category: "automation", subcategory: "trigger",
    name: "Rate window", description: "A rate window — only this many events fit in the frame of time",
    tags: ["window", "count", "limit"], family: "window",
    aliases: [], keywords: ["rate window", "sliding rate limit", "events per window"],
    shapes: [
      rect(3, 8, 18, 8, 2),
      col(7, 10.5, 13.5), col(11, 10.5, 13.5), col(15, 10.5, 13.5),
    ],
  },
  {
    slug: "concurrency-limit", category: "automation", subcategory: "trigger",
    name: "Concurrency limit", description: "A concurrency limit — only so many at once, a cap on parallel lanes",
    tags: ["parallel", "cap", "lanes"], family: "figure",
    aliases: [], keywords: ["concurrency limit", "max parallel", "lanes capped"],
    // `agent-quota`'s wall, spoken by lanes of work.
    shapes: [
      row(5, 3, 15), row(12, 3, 15), row(19, 3, 15),
      col(19, 3, 21),
    ],
  },
  {
    slug: "semaphore", category: "automation", subcategory: "condition",
    name: "Semaphore", description: "A semaphore — take a signal light before you enter, a lock with a few slots",
    tags: ["lock", "signal", "slots"], family: "figure",
    aliases: [], keywords: ["semaphore", "concurrency permit", "traffic light"],
    shapes: [
      rect(7.5, 2, 9, 20, 2),
      disc(12, 6, 2), disc(12, 12, 2), disc(12, 18, 2),
    ],
  },
  {
    slug: "backoff-exponential", category: "automation", subcategory: "schedule",
    name: "Exponential backoff", description: "Exponential backoff — retry later, then much later, doubling the wait each time",
    tags: ["retry", "spacing", "wait"], family: "chart",
    aliases: ["backoff"], keywords: ["exponential backoff", "retry spacing", "cooldown"],
    // The same attempt, at widening intervals along the line.
    shapes: [
      col(3, 8, 14), col(6, 8, 14), col(11, 8, 14), col(19, 8, 14),
      row(17, 3, 21),
    ],
  },
  {
    slug: "scatter-gather", category: "automation", subcategory: "workflow",
    name: "Scatter-gather", description: "Scatter-gather — fan the work out in parallel, then everyone reports back and the results merge",
    tags: ["fanout", "merge", "parallel"], family: "arrow",
    aliases: [], keywords: ["scatter gather", "fan out fan in", "parallel then join"],
    // Two stations, and the two routes between them — the paths anchor on the
    // nodes, which is what keeps this from closing into a hexagon at 24px.
    shapes: [
      disc(4, 12, 2), disc(20, 12, 2),
      poly([[5.5, 10.5], [10, 6], [14, 6], [18.5, 10.5]]),
      poly([[5.5, 13.5], [10, 18], [14, 18], [18.5, 13.5]]),
    ],
  },

  /* ── mcp: the last of the protocol ────────────────────────────────────────────── */

  {
    slug: "mcp-batch", category: "mcp", subcategory: "client",
    name: "MCP batch", description: "An MCP batch — several requests bundled in one envelope and sent together",
    tags: ["batch", "bundle", "requests"], family: "machine",
    aliases: [], keywords: ["batch requests", "jsonrpc batch", "bundle"],
    shapes: [...server(), poly([[9.5, 6], [7, 6], [7, 14], [9.5, 14]]), row(8.5, 10, 16), row(11.5, 10, 16)],
  },
  {
    slug: "mcp-timeout", category: "mcp", subcategory: "client",
    name: "MCP timeout", description: "An MCP timeout — the answer did not come before the deadline expired",
    tags: ["deadline", "slow", "expired"], family: "machine",
    aliases: [], keywords: ["timeout", "request expired", "too slow"],
    // The clock hands where the server's work should be.
    shapes: [...server(), col(12, 7, 10.5), row(10.5, 12, 15.5)],
  },
  {
    slug: "mcp-elicit-confirm", category: "mcp", subcategory: "client",
    name: "MCP elicit confirm", description: "MCP elicit confirm — the user says yes to the form the server asked them to fill",
    tags: ["confirm", "consent", "form"], family: "machine",
    aliases: [], keywords: ["elicitation confirm", "user consent", "form accepted"],
    // `elicitation`'s bubble with the answer already in it.
    shapes: [
      frame(2, 3, 20, 14, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]]),
      poly([[9, 9.5], [11, 11.5], [15, 7.5]]),
    ],
  },
  {
    slug: "mcp-version", category: "mcp", subcategory: "transport",
    name: "MCP version", description: "MCP version — the protocol level both sides negotiate and agree to speak",
    tags: ["protocol", "negotiate", "level"], family: "machine",
    aliases: [], keywords: ["protocol version", "negotiation", "compatibility"],
    shapes: [...server(), poly([[9, 12], [12, 9], [15, 12]]), poly([[9, 16], [12, 13], [15, 16]])],
  },
  {
    slug: "mcp-oauth", category: "mcp", subcategory: "server",
    name: "MCP OAuth", description: "MCP OAuth — the server proves who may call it with a token from an authorisation flow",
    tags: ["auth", "key", "token"], family: "machine",
    aliases: ["mcp-auth"], keywords: ["oauth", "authorization", "mcp auth"],
    shapes: [...server(), disc(9, 10, 2), row(10, 11, 16.5), col(15, 10, 12.5)],
  },
  {
    slug: "mcp-scope", category: "mcp", subcategory: "server",
    name: "MCP scope", description: "An MCP scope — allowed to do this much and no more, a narrowed grant of permissions",
    tags: ["permissions", "narrow", "grant"], family: "machine",
    aliases: [], keywords: ["scopes", "granted permissions", "least privilege"],
    // The funnel inside the server — of everything it could do, what it may.
    shapes: [...server(), poly([[8, 6], [12, 10], [12, 14]]), poly([[16, 6], [12, 10]])],
  },
  {
    slug: "mcp-server-dev", category: "mcp", subcategory: "server",
    name: "MCP server dev", description: "MCP server dev — a server still being written and built, not yet published",
    tags: ["develop", "code", "build"], family: "machine",
    aliases: [], keywords: ["build mcp server", "develop", "sdk"],
    shapes: [...server(), poly([[10, 7], [7.5, 9.5], [10, 12]]), poly([[14, 7], [16.5, 9.5], [14, 12]])],
  },
  {
    slug: "mcp-server-test", category: "mcp", subcategory: "server",
    name: "MCP server test", description: "MCP server test — run the server against a pretend client before it goes live",
    tags: ["test", "verify", "run"], family: "machine",
    aliases: [], keywords: ["test mcp server", "inspector run", "verify"],
    shapes: [...server(), poly([[10, 6.5], [14, 10.5], [10, 14.5]], true)],
  },
  {
    slug: "mcp-subscribe", category: "mcp", subcategory: "resource",
    name: "MCP subscribe", description: "MCP subscribe — tell me every time this changes, a feed of updates",
    tags: ["updates", "watch", "feed"], family: "machine",
    aliases: [], keywords: ["resource subscription", "updates", "watch resource"],
    shapes: [...server(), arc(9, 13, 3, -90, 0), arc(9, 13, 6, -90, 0), disc(9, 13, 1)],
  },
  {
    slug: "mcp-ping", category: "mcp", subcategory: "transport",
    name: "MCP ping", description: "MCP ping — still there? A heartbeat that checks the other side is alive",
    tags: ["heartbeat", "alive", "check"], family: "machine",
    aliases: [], keywords: ["ping", "heartbeat", "keepalive"],
    shapes: [...server(), poly([[6.5, 10], [9.5, 10], [11.5, 8], [15.5, 12], [17.5, 10]])],
  },

  /* ── ai: the training run's dials ─────────────────────────────────────────────── */

  {
    slug: "lr-schedule", category: "ai", subcategory: "training",
    name: "LR schedule", description: "An LR schedule — the learning rate stepped down on a plan as training proceeds",
    tags: ["rate", "steps", "decay"], family: "chart",
    aliases: ["learning-rate-schedule"], keywords: ["lr schedule", "step decay", "warmup decay"],
    shapes: [
      poly([[3, 3], [3, 21], [21, 21]]),
      poly([[5, 6], [10, 6], [10, 11], [15, 11], [15, 16], [19, 16]]),
    ],
  },
  {
    slug: "grad-flow", category: "ai", subcategory: "training",
    name: "Gradient flow", description: "Gradient flow — the correction travelling back down through the layers in backprop",
    tags: ["backprop", "layers", "down"], family: "figure",
    aliases: [], keywords: ["gradient flow", "backprop", "through layers"],
    shapes: [
      row(5, 4, 20), poly([[10, 7.5], [12, 9.5], [14, 7.5]]),
      row(12, 4, 20), poly([[10, 14.5], [12, 16.5], [14, 14.5]]),
      row(19, 4, 20),
    ],
  },
  {
    slug: "gradient-clip", category: "ai", subcategory: "training",
    name: "Gradient clip", description: "Gradient clipping — no single update step gets to be bigger than the ceiling",
    tags: ["cap", "ceiling", "limit"], family: "chart",
    aliases: [], keywords: ["gradient clipping", "cap gradient", "max norm"],
    // Three updates and the ceiling — the middle one wanted to be taller.
    shapes: [
      col(6, 10, 19), col(12, 4, 19), col(18, 12, 19),
      row(7, 9, 15), row(21.5, 4, 20),
    ],
  },
  {
    slug: "train-loss", category: "ai", subcategory: "training",
    name: "Training loss", description: "Training loss — down, then flat, the curve every run hopes to draw",
    tags: ["curve", "descent", "converge"], family: "chart",
    aliases: [], keywords: ["training loss", "loss curve down", "convergence"],
    shapes: [
      poly([[3, 3], [3, 21], [21, 21]]),
      poly([[5, 6], [11, 12], [15, 16], [19, 16]]),
    ],
  },
  {
    slug: "overfit-gap", category: "ai", subcategory: "training",
    name: "Overfit gap", description: "The overfit gap — training loss keeps falling while validation turns away",
    tags: ["diverge", "curves", "generalise"], family: "chart",
    aliases: ["train-val-gap"], keywords: ["overfitting gap", "train val divergence"],
    shapes: [
      poly([[4, 14], [9, 9], [20, 9]]),
      poly([[4, 19], [9, 14], [13, 14], [17, 18]]),
    ],
  },
  {
    slug: "underfit-gap", category: "ai", subcategory: "training",
    name: "Underfit", description: "Underfit — both curves stay high, the model has not learned enough yet",
    tags: ["stuck", "high", "capacity"], family: "chart",
    aliases: [], keywords: ["underfitting", "both curves high", "capacity"],
    shapes: [
      poly([[3, 3], [3, 21], [21, 21]]),
      row(8, 6, 19), row(13, 6, 19),
    ],
  },
  {
    slug: "stop-patience", category: "ai", subcategory: "training",
    name: "Patience", description: "Patience — the plateau is on the clock before early stopping ends the run",
    tags: ["early-stop", "wait", "plateau"], family: "figure",
    aliases: ["early-stop-patience"], keywords: ["patience", "early stopping", "plateau timer"],
    shapes: [
      row(12, 3, 10),
      disc(16.5, 12, 4), col(16.5, 9.5, 12), row(12, 16.5, 19),
    ],
  },
  {
    slug: "warmup", category: "ai", subcategory: "training",
    name: "Warmup", description: "Warmup — the learning rate ramps gently up to speed, then holds",
    tags: ["ramp", "start", "ease"], family: "chart",
    aliases: ["lr-warmup"], keywords: ["warmup", "ramp up", "ease in"],
    shapes: [
      poly([[3, 3], [3, 21], [21, 21]]),
      poly([[5, 18], [12, 11], [19, 11]]),
    ],
  },
  {
    slug: "dropout", category: "ai", subcategory: "training",
    name: "Dropout", description: "Dropout — some neurons sit this batch out at random to regularise the model",
    tags: ["regularise", "holes", "random"], family: "rails",
    aliases: [], keywords: ["dropout", "regularization", "dropped units"],
    // Three layers, and the hole where the dropped units were.
    shapes: [
      row(6, 3, 21),
      row(12, 3, 9), row(12, 15, 21),
      row(18, 3, 21),
    ],
  },
  {
    slug: "frozen-layer", category: "ai", subcategory: "training",
    name: "Frozen layer", description: "A frozen layer — this layer keeps its weights fixed during transfer learning",
    tags: ["locked", "fixed", "transfer"], family: "figure",
    aliases: [], keywords: ["frozen layer", "locked weights", "no grad"],
    // Two live layers, and the solid one between them that will not move.
    shapes: [
      row(4, 3, 21), rect(3, 9.5, 18, 5, 2.5), row(20, 3, 21),
    ],
  },

  /* ── agents: tasks and their owners ───────────────────────────────────────────── */

  {
    slug: "goal-drift", category: "agents", subcategory: "planning",
    name: "Goal drift", description: "Goal drift — the agent is still moving, just not at the target any more",
    tags: ["miss", "wander", "aim"], family: "arrow",
    aliases: [], keywords: ["goal drift", "off target", "objective drift"],
    shapes: [
      disc(9, 15, 5), disc(9, 15, 1),
      row(5, 3, 14.5), poly([[14.5, 2.5], [17, 5], [14.5, 7.5]]),
    ],
  },
  {
    slug: "plan-tree", category: "agents", subcategory: "planning",
    name: "Plan tree", description: "A plan tree — one intent branching into steps and sub-steps an agent will take",
    tags: ["branches", "steps", "decompose"], family: "chain",
    aliases: [], keywords: ["plan tree", "decomposition", "task tree"],
    // `agent-hierarchy`'s orthogonal tree with plan-step capsules for nodes.
    shapes: [
      rect(7, 4.5, 10, 4, 2), col(12, 8.5, 12),
      poly([[6, 15.5], [6, 12], [18, 12], [18, 15.5]]),
      rect(2.5, 15.5, 7, 4.5, 2.25), rect(14.5, 15.5, 7, 4.5, 2.25),
    ],
  },
  {
    slug: "task-queue-agent", category: "agents", subcategory: "execution",
    name: "Agent task queue", description: "An agent task queue — what the agent will do next, in order of arrival",
    tags: ["queue", "backlog", "next"], family: "orbit",
    aliases: [], keywords: ["task queue", "agent backlog", "work queue"],
    // `gpu-queue`'s waiting jobs above the agent that will take them.
    shapes: [
      disc(6, 6.5, 2), disc(12, 6.5, 2), disc(18, 6.5, 2),
      arc(12, 15, 5.5, 295, 245),
    ],
  },
  {
    slug: "task-claim", category: "agents", subcategory: "execution",
    name: "Task claim", description: "Task claim — this task is mine now, taken from the queue by one worker",
    tags: ["take", "own", "grab"], family: "orbit",
    aliases: [], keywords: ["claim task", "take ownership", "assign self"],
    shapes: [
      arc(7, 7, 4, 295, 245), poly([[10, 10], [14.5, 14.5]]),
      rect(12, 15, 9, 5, 2.5),
    ],
  },
  {
    slug: "task-yield", category: "agents", subcategory: "execution",
    name: "Task yield", description: "Task yield — a task given back to the queue for someone else to pick up",
    tags: ["release", "return", "unassign"], family: "orbit",
    aliases: [], keywords: ["yield task", "release", "give back"],
    shapes: [
      arc(7, 17, 4, 295, 245), poly([[10, 14], [14.5, 9.5]]),
      rect(12, 4, 9, 5, 2.5),
    ],
  },
  {
    slug: "task-split", category: "agents", subcategory: "execution",
    name: "Task split", description: "Task split — too big for one, so now it is two subtasks handed out",
    tags: ["divide", "subtasks", "fan"], family: "chain",
    aliases: [], keywords: ["split task", "subtasks", "divide work"],
    shapes: [
      rect(3, 3, 18, 5, 2.5),
      col(7, 8, 14), col(17, 8, 14),
      rect(3, 14, 8, 5, 2.5), rect(13, 14, 8, 5, 2.5),
    ],
  },
  {
    slug: "task-merge", category: "agents", subcategory: "execution",
    name: "Task merge", description: "Task merge — two halves joined into one deliverable at the end",
    tags: ["combine", "join", "one"], family: "chain",
    aliases: [], keywords: ["merge tasks", "combine work", "join results"],
    shapes: [
      rect(3, 3, 8, 5, 2.5), rect(13, 3, 8, 5, 2.5),
      col(7, 8, 14), col(17, 8, 14),
      rect(3, 14, 18, 5, 2.5),
    ],
  },
  {
    slug: "turn-limit", category: "agents", subcategory: "execution",
    name: "Turn limit", description: "A turn limit — the conversation has a budget of turns and then it stops",
    tags: ["cap", "turns", "wall"], family: "figure",
    aliases: [], keywords: ["turn limit", "max turns", "conversation cap"],
    // Two turns of talk, and the wall where the next would go — `agent-quota`'s
    // grammar for dialogue.
    shapes: [
      rect(2, 3, 10, 7, 2), rect(7, 13, 10, 7, 2),
      col(20.5, 4, 20),
    ],
  },
  {
    slug: "nudge", category: "agents", subcategory: "execution",
    name: "Nudge", description: "A nudge — a tap rather than an order, a gentle poke to resume the work",
    tags: ["prompt", "poke", "resume"], family: "orbit",
    aliases: [], keywords: ["nudge agent", "poke", "gentle prompt"],
    shapes: [
      arc(14, 12, 5.5, 295, 245),
      row(12, 3, 6), poly([[6, 10], [8, 12], [6, 14]]),
    ],
  },
  {
    slug: "escalate-human", category: "agents", subcategory: "execution",
    name: "Escalate to human", description: "Escalate to human — past what the agent should decide alone, handed up to a person",
    tags: ["handoff", "person", "up"], family: "orbit",
    aliases: [], keywords: ["escalate", "human handoff", "ask a person"],
    // The agent below, the person above, and the line going the one direction
    // escalation goes.
    shapes: [
      arc(6, 17, 3.5, 295, 245), poly([[9, 15], [14, 10]]),
      disc(17, 5, 2), arc(17, 13, 4, 180, 360),
    ],
  },

  /* ── interface: under the thumb ───────────────────────────────────────────────── */

  {
    slug: "stepper-input", category: "interface", subcategory: "action",
    name: "Stepper", description: "A stepper — one less on the left, one more on the right, a numeric control",
    tags: ["number", "increment", "control"], family: "window",
    aliases: [], keywords: ["stepper", "number input", "plus minus"],
    shapes: [
      rect(2, 8, 20, 8, 2),
      row(12, 5, 8), row(12, 16, 19), col(17.5, 10.5, 13.5),
    ],
  },
  {
    slug: "fader", category: "interface", subcategory: "media",
    name: "Fader", description: "A fader — slide it to where it sounds right, a level in a mix",
    tags: ["slider", "level", "mix"], family: "figure",
    aliases: ["slider-vertical"], keywords: ["fader", "vertical slider", "level"],
    shapes: [col(12, 3, 21), rect(8, 9, 8, 4, 2)],
  },
  {
    slug: "joystick", category: "interface", subcategory: "media",
    name: "Joystick", description: "A joystick — the stick that points in every direction, a game controller",
    tags: ["control", "game", "direction"], family: "figure",
    aliases: [], keywords: ["joystick", "game control", "analog stick"],
    shapes: [arc(12, 20, 7, 180, 360), col(12, 6, 13), disc(12, 4, 2)],
  },
  {
    slug: "dpad", category: "interface", subcategory: "media",
    name: "D-pad", description: "A D-pad — four directions under one thumb on a handheld controller",
    tags: ["cross", "directions", "game"], family: "figure",
    aliases: ["directional-pad"], keywords: ["d-pad", "directional pad", "cross control"],
    shapes: [
      poly([[9, 3], [15, 3], [15, 9], [21, 9], [21, 15], [15, 15], [15, 21], [9, 21], [9, 15], [3, 15], [3, 9], [9, 9]], true),
      disc(12, 12, 1),
    ],
  },
  {
    slug: "hotkey", category: "interface", subcategory: "action",
    name: "Hotkey", description: "A hotkey — the key with a power behind it, a keyboard shortcut",
    tags: ["shortcut", "modifier", "key"], family: "window",
    aliases: [], keywords: ["hotkey", "shortcut key", "modifier"],
    shapes: [rect(4, 4, 16, 16, 2), poly([[9, 13.5], [12, 10.5], [15, 13.5]])],
  },
  {
    slug: "key-combo", category: "interface", subcategory: "action",
    name: "Key combo", description: "A key combo — two keys pressed together as one chord to trigger a shortcut",
    tags: ["chord", "shortcut", "together"], family: "window",
    aliases: ["keyboard-chord"], keywords: ["key combo", "chord", "shortcut combo"],
    // The copy idiom pressed into service: two keycaps, struck together.
    shapes: [rect(3, 3, 12, 12, 2), rect(9, 9, 12, 12, 2)],
  },
  {
    slug: "reading-list", category: "interface", subcategory: "action",
    name: "Reading list", description: "A reading list — articles saved for a quieter hour when there is time to read",
    tags: ["bookmark", "later", "queue"], family: "figure",
    aliases: [], keywords: ["reading list", "save for later", "bookmarks"],
    shapes: [
      poly([[4, 6], [10, 6], [10, 16], [7, 13], [4, 16]], true),
      row(9, 13, 20), row(13, 13, 20), row(17, 13, 18),
    ],
  },
  {
    slug: "tab-new", category: "interface", subcategory: "layout",
    name: "New tab", description: "New tab — open another tab next to the rest in the browser bar",
    tags: ["browser", "open", "plus"], family: "window",
    aliases: [], keywords: ["new tab", "open tab", "plus tab"],
    shapes: [
      poly([[2, 19], [2, 9], [4, 7], [10, 7], [12, 9], [12, 19]]),
      row(19, 2, 22),
      row(13, 15, 21), col(18, 10, 16),
    ],
  },
  {
    slug: "tab-close", category: "interface", subcategory: "layout",
    name: "Close tab", description: "Close tab — that tab is finished with, dismissed from the bar",
    tags: ["browser", "dismiss", "x"], family: "window",
    aliases: [], keywords: ["close tab", "dismiss tab"],
    shapes: [
      poly([[2, 19], [2, 9], [4, 7], [10, 7], [12, 9], [12, 19]]),
      row(19, 2, 22),
      poly([[15.5, 10.5], [20.5, 15.5]]), poly([[20.5, 10.5], [15.5, 15.5]]),
    ],
  },
  {
    slug: "split-pane", category: "interface", subcategory: "layout",
    name: "Split pane", description: "A split pane — two views of the same thing side by side in one window",
    tags: ["divide", "panes", "layout"], family: "window",
    aliases: [], keywords: ["split pane", "split view", "two panes"],
    shapes: [
      rect(2, 4, 20, 16, 2), col(12, 4, 20),
      disc(9.5, 12, 1), disc(14.5, 12, 1),
    ],
  },
];
