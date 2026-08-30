/**
 * Batch 50 — the first batch of the growth plan (new-icons.md), and the first drawn
 * under the audit as a gate, not a lesson.
 *
 * Every slug here was verified absent — and its metaphor checked against what exists —
 * before anything was drawn: `speculative-decode` cannot borrow fast-forward's chevrons
 * without its check, `teacher-student` was CUT when the validator showed `distil` already owns the
 * metaphor, `interrupt` gets the bolt because no zap/flash/lightning ever claimed it.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { machine } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_50: Icon[] = [
  /* ── How models are trained now ───────────────────────────────────────────────── */

  {
    slug: "dpo", category: "ai", subcategory: "training",
    name: "DPO", description: "DPO — direct preference optimisation, training a model on which of two answers people preferred",
    tags: ["preference", "chosen", "rejected"], family: "capsule",
    aliases: ["preference-pair"], keywords: ["direct preference optimization", "chosen", "rejected", "pairwise", "alignment"],
    // The whole method in one picture: two candidate answers, one kept, one not.
    shapes: [
      rect(2, 3, 12, 7, 3.5), poly([[17, 6.5], [19, 8.5], [21.5, 6]]),
      rect(2, 14, 12, 7, 3.5), poly([[17.5, 15], [21.5, 19]]), poly([[21.5, 15], [17.5, 19]]),
    ],
  },
  {
    slug: "rlhf", category: "ai", subcategory: "training",
    name: "RLHF", description: "RLHF — reinforcement learning from human feedback, a person inside the training loop",
    tags: ["feedback", "human", "loop"], family: "figure",
    aliases: [], keywords: ["human feedback", "reinforcement learning", "alignment", "rater", "reward signal"],
    // The figure orbited by the loop's two arcs — the person is the loop's centre,
    // which is the entire claim the acronym makes.
    shapes: [
      disc(12, 8, 3), arc(12, 19, 5.5, 180, 360),
      arc(12, 12, 10, 120, 240), arc(12, 12, 10, 300, 60),
    ],
  },
  {
    slug: "reward-model", category: "ai", subcategory: "evaluation",
    name: "Reward model", description: "A reward model — the model that scores another model's answers as a judge",
    tags: ["score", "value", "judge"], family: "machine",
    aliases: [], keywords: ["reward", "scoring model", "value head", "preference model", "rm"],
    // The machine with the score rising in its hollow. A diamond was drawn first —
    // and was `vector-database` minus one line. The arrow is the reward signal going up.
    shapes: [machine(), col(12, 10, 16), poly([[9, 11], [12, 8], [15, 11]])],
  },
  {
    slug: "speculative-decode", category: "ai", subcategory: "inference",
    name: "Speculative decoding", description: "Speculative decoding — a small draft model races ahead and the big model verifies its tokens",
    tags: ["draft", "fast", "verify"], family: "chevron",
    aliases: [], keywords: ["speculative decoding", "draft model", "verify", "latency", "assisted generation"],
    // Fast-forward's two chevrons would be someone else's icon; the check is what makes
    // it this one — sprinted ahead, then confirmed.
    shapes: [
      poly([[3, 6], [9, 12], [3, 18]]), poly([[10, 6], [16, 12], [10, 18]]),
      poly([[16, 17], [18, 19], [22, 15]]),
    ],
  },
  {
    slug: "best-of-n", category: "ai", subcategory: "evaluation",
    name: "Best of N", description: "Best of N — generate several candidates and keep the winner as the answer",
    tags: ["sampling", "candidates", "pick"], family: "rails",
    aliases: [], keywords: ["best of n", "rerank samples", "candidates", "pick the best", "rejection sampling"],
    shapes: [
      row(5, 3, 13), row(12, 3, 13), row(19, 3, 13),
      poly([[16, 12], [18, 14], [22, 10]]),
    ],
  },
  {
    slug: "logprobs", category: "ai", subcategory: "inference",
    name: "Logprobs", description: "Logprobs — how sure the model was about each token, log probabilities per token",
    tags: ["probability", "confidence", "per-token"], family: "rails",
    aliases: [], keywords: ["log probabilities", "token probability", "confidence", "sampling", "logits"],
    // Certainty hangs off the sequence rail, one drop per position, none the same.
    shapes: [row(4, 3, 21), col(7, 7, 17), col(12, 7, 21), col(17, 7, 19)],
  },

  /* ── Agents at the controls ───────────────────────────────────────────────────── */

  {
    slug: "computer-use", category: "agents", subcategory: "tool-use",
    name: "Computer use", description: "Computer use — an agent driving the screen itself, clicking and typing like a person",
    tags: ["screen", "control", "click"], family: "window",
    aliases: [], keywords: ["computer use", "screen control", "gui agent", "operate", "desktop"],
    // A click happening inside a screen: the dot is the press, the arc its ripple.
    shapes: [frame(3, 4, 18, 16, 3, { gap: 0 }), disc(10, 13, 2), arc(10, 13, 5.5, 270, 0)],
  },
  {
    slug: "type-action", category: "agents", subcategory: "tool-use",
    name: "Type", description: "Type — the caret and what it has written so far, keyboard input by an agent",
    tags: ["keyboard", "input", "caret"], family: "rails",
    aliases: [], keywords: ["type", "keyboard input", "text entry", "caret", "fill field"],
    shapes: [col(4, 6, 18), row(9, 8, 16), row(15, 8, 20)],
  },
  {
    slug: "browser-agent", category: "agents", subcategory: "tool-use",
    name: "Browser agent", description: "A browser agent — an agent living inside the browser, navigating and automating the web",
    tags: ["web", "navigate", "automate"], family: "window",
    aliases: [], keywords: ["browser automation", "web agent", "navigate", "scrape", "playwright"],
    // The browser's chrome line is what makes the box a browser; the ring below it is
    // who is driving.
    shapes: [rect(2, 3, 20, 18, 2), row(8, 2, 22), arc(12, 14.5, 3.5, 295, 245)],
  },
  {
    slug: "voice-agent", category: "agents", subcategory: "communication",
    name: "Voice agent", description: "A voice agent — an agent you talk to out loud, speech in and speech out",
    tags: ["speech", "audio", "levels"], family: "orbit",
    aliases: [], keywords: ["voice", "speech", "realtime audio", "talk", "call agent"],
    shapes: [arc(7, 12, 5, 295, 245), col(15, 9, 15), col(18, 5, 19), col(21, 10, 14)],
  },
  {
    slug: "interrupt", category: "agents", subcategory: "execution",
    name: "Interrupt", description: "Interrupt — cut in right now, barge in and stop what the agent is doing",
    tags: ["stop", "barge-in", "cancel"], family: "bolt",
    aliases: ["zap"], keywords: ["interrupt", "barge in", "cancel generation", "stop it", "break in"],
    // The bolt, drawn at the set's angles. No zap ever claimed it, and an interrupt is
    // exactly a bolt: sudden, diagonal, and it does not wait.
    shapes: [poly([[18, 2], [8, 12], [13, 12], [5, 20]])],
  },
  {
    slug: "capability-card", category: "agents", subcategory: "communication",
    name: "Capability card", description: "A capability card — the card an agent shows to advertise what it can do, as in A2A",
    tags: ["a2a", "advertise", "skills"], family: "page",
    aliases: [], keywords: ["agent card", "a2a", "capability discovery", "what it can do", "manifest"],
    // A card with a plug on it: the capability, published.
    shapes: [
      rect(4, 2, 16, 20, 2),
      rect(8, 11.5, 8, 5, 2.5), col(10, 8, 11.5), col(14, 8, 11.5),
    ],
  },
  {
    slug: "handback", category: "agents", subcategory: "communication",
    name: "Handback", description: "Handback — the agent gives control back to a person to take over",
    tags: ["return", "human", "control"], family: "orbit",
    aliases: [], keywords: ["hand back", "return control", "human takeover", "escalate", "defer"],
    // `agent-handoff`'s diagonal, but the far end is a person: the ring passes it up,
    // the figure receives.
    shapes: [
      arc(6, 18, 3, 295, 245), poly([[8.5, 15.5], [11, 13]]),
      poly([[10.5, 11], [13, 11], [13, 13.5]]),
      disc(19, 4, 2), arc(19, 10, 3, 180, 360),
    ],
  },

  /* ── The protocol asks, the set defends ───────────────────────────────────────── */

  {
    slug: "elicitation", category: "mcp", subcategory: "prompt",
    name: "Elicitation", description: "Elicitation — the server stops mid-flow to ask the user for input",
    tags: ["ask", "mid-flow", "input"], family: "bubble",
    aliases: [], keywords: ["elicitation", "ask user", "server question", "form request", "mid-session"],
    // `message`'s bubble with a question in it — the shape of being asked.
    shapes: [
      frame(2, 3, 20, 14, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]]),
      arc(12, 9, 2.5, 180, 90), disc(12, 14, 1),
    ],
  },
  {
    slug: "jailbreak", category: "security", subcategory: "ai-security",
    name: "Jailbreak", description: "A jailbreak — out through the broken bar, a prompt that bypasses the guardrails",
    tags: ["escape", "bypass", "guardrail"], family: "figure",
    aliases: [], keywords: ["jailbreak", "guardrail bypass", "prompt attack", "escape", "unsafe output"],
    // Three bars, one snapped short, and the arrow leaves through exactly that gap.
    shapes: [
      col(5, 3, 21), col(11, 3, 21), col(17, 3, 9),
      row(15, 14, 19), poly([[17, 12], [20, 15], [17, 18]]),
    ],
  },
  {
    slug: "pii-redact", category: "security", subcategory: "ai-security",
    name: "PII redaction", description: "PII redaction — the personal part blacked out so privacy is kept",
    tags: ["privacy", "mask", "remove"], family: "rails",
    aliases: ["redaction"], keywords: ["pii", "redact", "mask personal data", "anonymise", "scrub"],
    // Text with one span replaced by the redaction bar — the bar is a closed capsule,
    // so duotone tints exactly the part that was removed.
    shapes: [row(5, 3, 21), rect(3, 9, 12, 4, 2), row(11, 18, 21), row(17, 3, 13)],
  },
];
