/**
 * Batch 65 — round 14 of the 1k plan: the token's journey, agents at their
 * desks, the designer's rulers, and the last honest names from four thinning
 * lists.
 *
 * The small categories are nearly spent — what remains there is mostly a
 * picture that already exists — so this round draws fifteen from ai, eighteen
 * from agents and ten from interface, and only seven from devops, analytics,
 * cloud and automation together. Dead on sight: circuit-open/close are
 * circuit-break, bulkhead is feature, primacy-effect is train-loss,
 * memory-consolidate is pooling, review/research-agent are agentic-rag.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

export const BATCH_65: Icon[] = [
  /* ── ai: the token's journey ──────────────────────────────────────────────────── */

  {
    slug: "token-in", category: "ai", subcategory: "inference",
    name: "Token in", description: "One more word, entering",
    tags: ["input", "prompt", "enter"], family: "arrow",
    aliases: ["input-token"], keywords: ["input tokens", "prompt tokens"],
    shapes: [disc(4, 12, 2), poly([[7.5, 9.5], [10, 12], [7.5, 14.5]]), rect(13, 5, 8, 14, 2)],
  },
  {
    slug: "token-out", category: "ai", subcategory: "inference",
    name: "Token out", description: "One more word, leaving",
    tags: ["output", "completion", "exit"], family: "arrow",
    aliases: ["output-token"], keywords: ["output tokens", "completion tokens"],
    shapes: [rect(3, 5, 9, 14, 2), poly([[14.5, 9.5], [17, 12], [14.5, 14.5]]), disc(20, 12, 2)],
  },
  {
    slug: "byte-pair", category: "ai", subcategory: "inference",
    name: "Byte pair", description: "Two pieces that keep appearing together",
    tags: ["bpe", "merge", "pair"], family: "figure",
    aliases: ["bpe"], keywords: ["byte pair encoding", "bpe merge"],
    shapes: [disc(6, 9, 3), disc(18, 9, 3), poly([[6, 14], [6, 17], [18, 17], [18, 14]])],
  },
  {
    slug: "vocabulary", category: "ai", subcategory: "inference",
    name: "Vocabulary", description: "Every piece the model can say",
    tags: ["tokens", "list", "all"], family: "window",
    aliases: ["vocab"], keywords: ["vocabulary", "token vocab"],
    shapes: [rect(3, 4, 18, 16, 2), disc(8, 9, 1), disc(16, 9, 1), disc(8, 15, 1), disc(16, 15, 1)],
  },
  {
    slug: "embedding-compare", category: "ai", subcategory: "inference",
    name: "Embedding compare", description: "How close two meanings sit",
    tags: ["similarity", "cosine", "pair"], family: "figure",
    aliases: ["cosine-similarity"], keywords: ["embedding similarity", "cosine"],
    shapes: [
      poly([[7.5, 5], [10, 7.5], [6, 11.5], [2, 7.5], [4.5, 5]]),
      poly([[19.5, 5], [22, 7.5], [18, 11.5], [14, 7.5], [16.5, 5]]),
      row(16, 8, 16), row(19.5, 8, 16),
    ],
  },
  {
    slug: "embedding-drift", category: "ai", subcategory: "inference",
    name: "Embedding drift", description: "The same word, slowly moving house",
    tags: ["shift", "wander", "vector"], family: "figure",
    aliases: [], keywords: ["embedding drift", "vector drift"],
    shapes: [
      poly([[8.5, 5], [11, 7.5], [7, 11.5], [3, 7.5], [5.5, 5]]),
      poly([[10, 14], [13, 17], [16, 14], [19, 17]]),
    ],
  },
  {
    slug: "pooling", category: "ai", subcategory: "inference",
    name: "Pooling", description: "Many vectors, folded into one",
    tags: ["reduce", "average", "one"], family: "figure",
    aliases: ["mean-pooling"], keywords: ["pooling", "mean pool"],
    shapes: [
      disc(6, 5, 1), disc(12, 5, 1), disc(18, 5, 1),
      poly([[9.5, 8.5], [12, 11], [14.5, 8.5]]),
      disc(12, 16.5, 4),
    ],
  },
  {
    slug: "probability-curve", category: "ai", subcategory: "inference",
    name: "Probability curve", description: "Where the mass of belief sits",
    tags: ["bell", "softmax", "distribution"], family: "chart",
    aliases: ["softmax-curve"], keywords: ["probability distribution", "softmax"],
    shapes: [arc(12, 14, 8, 180, 0), row(18, 3, 21)],
  },
  {
    slug: "activation", category: "ai", subcategory: "training",
    name: "Activation", description: "Nothing, nothing, then everything",
    tags: ["relu", "nonlinear", "fire"], family: "chart",
    aliases: ["relu"], keywords: ["activation function", "relu"],
    shapes: [poly([[3, 3], [3, 21], [21, 21]]), poly([[5, 17], [12, 17], [19, 10]])],
  },
  {
    slug: "transformer-block", category: "ai", subcategory: "model",
    name: "Transformer block", description: "Attention, then the thinking layer, stacked",
    tags: ["layer", "attention", "mlp"], family: "window",
    aliases: [], keywords: ["transformer block", "attention layer"],
    shapes: [rect(3, 3, 18, 18, 2), rect(7, 8, 10, 4, 2), row(15.5, 8, 16)],
  },
  {
    slug: "encoder-decoder", category: "ai", subcategory: "model",
    name: "Encoder-decoder", description: "One side reads; the other writes",
    tags: ["seq2seq", "two", "translate"], family: "window",
    aliases: ["seq2seq"], keywords: ["encoder decoder", "seq2seq"],
    shapes: [
      rect(2, 5, 8, 14, 2), rect(14, 5, 8, 14, 2),
      poly([[10.5, 9.5], [13, 12], [10.5, 14.5]]),
    ],
  },
  {
    slug: "cross-attention", category: "ai", subcategory: "inference",
    name: "Cross-attention", description: "Each side looking at the other",
    tags: ["attend", "across", "pair"], family: "figure",
    aliases: [], keywords: ["cross attention", "encoder attention"],
    shapes: [
      row(5, 3, 21), row(19, 3, 21),
      poly([[9.5, 9.5], [14.5, 14.5]]), poly([[14.5, 9.5], [9.5, 14.5]]),
    ],
  },
  {
    slug: "attention-mask", category: "ai", subcategory: "inference",
    name: "Attention mask", description: "You may not look ahead",
    tags: ["causal", "triangle", "hide"], family: "window",
    aliases: ["causal-mask"], keywords: ["attention mask", "causal masking"],
    shapes: [
      rect(3, 3, 18, 18, 2), poly([[5, 5], [19, 19]]),
      disc(7, 13, 1), disc(7, 17, 1), disc(11, 17, 1),
    ],
  },
  {
    slug: "attention-sink", category: "ai", subcategory: "inference",
    name: "Attention sink", description: "The first token soaks it all up",
    tags: ["first", "absorb", "heavy"], family: "figure",
    aliases: [], keywords: ["attention sink", "first token"],
    shapes: [disc(6.5, 12, 4.5), disc(14, 12, 1), disc(17.5, 12, 1), disc(21, 12, 1)],
  },
  {
    slug: "positional-encoding", category: "ai", subcategory: "inference",
    name: "Positional encoding", description: "Every token knows its seat",
    tags: ["position", "wave", "order"], family: "figure",
    aliases: [], keywords: ["positional encoding", "position embedding"],
    shapes: [
      poly([[3, 16], [7, 12], [11, 16], [15, 12], [19, 16]]),
      disc(7, 7, 1), disc(15, 7, 1),
    ],
  },

  /* ── agents: at their desks ───────────────────────────────────────────────────── */

  {
    slug: "context-handout", category: "agents", subcategory: "communication",
    name: "Context handout", description: "Here is what I know; take it with you",
    tags: ["pass", "share", "page"], family: "orbit",
    aliases: [], keywords: ["context handoff", "share context"],
    shapes: [arc(5.5, 5.5, 3.5, 295, 245), rect(8.5, 8.5, 7, 7, 2), arc(18.5, 18.5, 3.5, 295, 245)],
  },
  {
    slug: "context-inherit", category: "agents", subcategory: "communication",
    name: "Context inherit", description: "Born knowing what the parent knew",
    tags: ["child", "inherit", "page"], family: "orbit",
    aliases: [], keywords: ["inherit context", "child context"],
    shapes: [arc(12, 6, 4, 295, 245), col(12, 10, 13), rect(8.5, 13, 7, 7, 2)],
  },
  {
    slug: "sandbox-escape-alert", category: "agents", subcategory: "execution",
    name: "Sandbox escape", description: "It is outside the box, and the box knows",
    tags: ["escape", "alarm", "breach"], family: "orbit",
    aliases: [], keywords: ["sandbox escape", "containment breach"],
    shapes: [
      rect(3, 9, 10, 12, 2), arc(17.5, 8, 3.5, 295, 245),
      col(17.5, 14, 16.5), disc(17.5, 19.5, 1),
    ],
  },
  {
    slug: "scroll-agent", category: "agents", subcategory: "execution",
    name: "Scroll agent", description: "It reads the way people read — down",
    tags: ["browse", "scroll", "page"], family: "orbit",
    aliases: [], keywords: ["scrolling agent", "browse page"],
    shapes: [
      arc(8, 12, 4, 295, 245),
      col(17, 5, 19), poly([[14.5, 7.5], [17, 5], [19.5, 7.5]]), poly([[14.5, 16.5], [17, 19], [19.5, 16.5]]),
    ],
  },
  {
    slug: "shell-agent", category: "agents", subcategory: "execution",
    name: "Shell agent", description: "Typing where the prompt blinks",
    tags: ["terminal", "command", "run"], family: "orbit",
    aliases: ["terminal-agent"], keywords: ["shell agent", "cli agent"],
    shapes: [arc(7, 8, 4, 295, 245), poly([[13, 12], [16.5, 15.5], [13, 19]]), row(19, 18.5, 21.5)],
  },
  {
    slug: "code-agent", category: "agents", subcategory: "execution",
    name: "Code agent", description: "Writes the code, then reads it back",
    tags: ["code", "write", "brackets"], family: "orbit",
    aliases: ["coding-agent"], keywords: ["code agent", "coding assistant"],
    shapes: [
      arc(12, 6.5, 4, 295, 245),
      poly([[9, 13], [6.5, 15.5], [9, 18]]), poly([[15, 13], [17.5, 15.5], [15, 18]]),
    ],
  },
  {
    slug: "test-agent", category: "agents", subcategory: "execution",
    name: "Test agent", description: "Runs the suite so nobody has to remember",
    tags: ["test", "run", "verify"], family: "orbit",
    aliases: [], keywords: ["testing agent", "qa agent"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[12, 11], [17, 16], [12, 21]], true)],
  },
  {
    slug: "deploy-agent", category: "agents", subcategory: "execution",
    name: "Deploy agent", description: "Ships it, and watches it land",
    tags: ["ship", "release", "up"], family: "orbit",
    aliases: [], keywords: ["deploy agent", "release agent"],
    shapes: [
      arc(8, 14, 5, 295, 245),
      col(18, 8, 19), poly([[15.5, 8.5], [18, 6], [20.5, 8.5]]),
    ],
  },
  {
    slug: "summarize-agent", category: "agents", subcategory: "execution",
    name: "Summarise agent", description: "Long in, short out",
    tags: ["shorten", "digest", "rows"], family: "orbit",
    aliases: ["summary-agent"], keywords: ["summarizer", "digest agent"],
    shapes: [arc(6, 12, 3.5, 295, 245), row(7, 12, 21), row(12, 12, 18), row(17, 12, 15)],
  },
  {
    slug: "email-agent", category: "agents", subcategory: "communication",
    name: "Email agent", description: "Reads the inbox so you can not",
    tags: ["mail", "inbox", "reply"], family: "orbit",
    aliases: [], keywords: ["email agent", "inbox assistant"],
    shapes: [
      arc(6, 6, 3.5, 295, 245),
      rect(10, 11, 11, 8, 2), poly([[12, 12], [15.5, 15.5], [19, 12]]),
    ],
  },
  {
    slug: "triage-agent", category: "agents", subcategory: "execution",
    name: "Triage agent", description: "Sorts the pile before anyone opens it",
    tags: ["sort", "funnel", "priority"], family: "orbit",
    aliases: [], keywords: ["triage agent", "ticket sorting"],
    shapes: [
      arc(6.5, 6.5, 3.5, 295, 245),
      poly([[10, 11], [21, 11], [17, 15], [17, 20], [14, 20], [14, 15]], true),
    ],
  },
  {
    slug: "red-team-agent", category: "agents", subcategory: "execution",
    name: "Red team agent", description: "Paid to break it first",
    tags: ["attack", "probe", "bolt"], family: "orbit",
    aliases: [], keywords: ["red team", "attacker agent"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[18, 10], [13.5, 14.5], [16, 14.5], [11.5, 19]])],
  },
  {
    slug: "blue-team-agent", category: "agents", subcategory: "execution",
    name: "Blue team agent", description: "Paid to keep it standing",
    tags: ["defend", "shield", "guard"], family: "orbit",
    aliases: [], keywords: ["blue team", "defender agent"],
    shapes: [
      arc(7, 7, 4, 295, 245),
      poly([[13, 11], [20, 11], [20, 15], [16.5, 18.5], [13, 15]], true),
    ],
  },
  {
    slug: "leader-elect", category: "agents", subcategory: "multi-agent",
    name: "Leader election", description: "One of them wears the crown, for now",
    tags: ["leader", "crown", "chosen"], family: "orbit",
    aliases: [], keywords: ["leader election", "elected agent"],
    shapes: [poly([[8, 7.5], [10, 5.5], [12, 7.5], [14, 5.5], [16, 7.5]]), arc(12, 14.5, 5.5, 295, 245)],
  },
  {
    slug: "agent-market", category: "agents", subcategory: "multi-agent",
    name: "Agent market", description: "Where agents are bought by the hour",
    tags: ["hire", "coin", "trade"], family: "orbit",
    aliases: ["agent-marketplace"], keywords: ["agent marketplace", "hire agents"],
    shapes: [arc(7, 7, 4, 295, 245), disc(16, 16, 5), disc(16, 16, 2)],
  },
  {
    slug: "subscribe-agent", category: "agents", subcategory: "communication",
    name: "Subscribe agent", description: "Wake me when something changes",
    tags: ["feed", "listen", "updates"], family: "orbit",
    aliases: [], keywords: ["subscribe", "event listener agent"],
    shapes: [arc(7, 7, 4, 295, 245), arc(13, 18, 3, -90, 0), arc(13, 18, 6, -90, 0), disc(13, 18, 1)],
  },
  {
    slug: "vote-quorum", category: "agents", subcategory: "multi-agent",
    name: "Quorum", description: "Enough of them agreed to count",
    tags: ["vote", "enough", "agree"], family: "orbit",
    aliases: ["agent-quorum"], keywords: ["quorum", "majority vote"],
    shapes: [
      arc(6, 6, 3, 295, 245), arc(18, 6, 3, 295, 245), arc(12, 18, 3, 295, 245),
      poly([[9.5, 11], [11.5, 13], [15, 9.5]]),
    ],
  },
  {
    slug: "debate", category: "agents", subcategory: "multi-agent",
    name: "Debate", description: "Two agents, one argument, better answer",
    tags: ["argue", "two", "bolt"], family: "orbit",
    aliases: ["agent-debate"], keywords: ["debate", "adversarial agents"],
    shapes: [
      arc(5, 12, 3.5, 295, 245), arc(19, 12, 3.5, 295, 245),
      poly([[9, 5], [12, 8], [10, 10], [13, 13], [11, 15], [13.5, 17.5]]),
    ],
  },

  /* ── interface: the designer's rulers ─────────────────────────────────────────── */

  {
    slug: "gradient-fill", category: "interface", subcategory: "action",
    name: "Gradient fill", description: "Dense to sparse, left to right",
    tags: ["fade", "fill", "shade"], family: "window",
    aliases: [], keywords: ["gradient", "gradient fill"],
    shapes: [rect(3, 7, 18, 10, 2), disc(6, 12, 1), disc(9, 12, 1), disc(13, 12, 1), disc(18, 12, 1)],
  },
  {
    slug: "layer-lock", category: "interface", subcategory: "layout",
    name: "Lock layer", description: "This one cannot be nudged by accident",
    tags: ["lock", "layer", "fixed"], family: "figure",
    aliases: [], keywords: ["lock layer", "locked object"],
    shapes: [rect(4, 2, 16, 3, 1.5), rect(8.5, 13, 7, 6.5, 2), arc(12, 13, 2.5, 180, 360)],
  },
  {
    slug: "align-left-obj", category: "interface", subcategory: "layout",
    name: "Align left", description: "Every edge to the same line",
    tags: ["align", "edge", "left"], family: "figure",
    aliases: [], keywords: ["align left", "left edge"],
    shapes: [col(3, 3, 21), row(7, 5.5, 15), row(12, 5.5, 19), row(17, 5.5, 12)],
  },
  {
    slug: "snap-grid", category: "interface", subcategory: "layout",
    name: "Snap to grid", description: "Let go, and it lands on the dots",
    tags: ["grid", "snap", "magnet"], family: "figure",
    aliases: [], keywords: ["snap to grid", "grid snapping"],
    shapes: [disc(5, 5, 1), disc(19, 5, 1), disc(5, 19, 1), disc(19, 19, 1), rect(8.5, 8.5, 7, 7, 2)],
  },
  {
    slug: "ruler", category: "interface", subcategory: "layout",
    name: "Ruler", description: "Twelve exactly, not about twelve",
    tags: ["measure", "ticks", "length"], family: "figure",
    aliases: [], keywords: ["ruler", "measure"],
    shapes: [rect(2, 8, 20, 8, 4), col(6, 8, 11.5), col(10, 8, 11.5), col(14, 8, 11.5), col(18, 8, 11.5)],
  },
  {
    slug: "artboard", category: "interface", subcategory: "layout",
    name: "Artboard", description: "The canvas, with its corners marked",
    tags: ["canvas", "frame", "marks"], family: "window",
    aliases: [], keywords: ["artboard", "canvas frame"],
    shapes: [
      rect(7, 7, 10, 10, 2),
      poly([[3, 6], [3, 3], [6, 3]]), poly([[18, 3], [21, 3], [21, 6]]),
      poly([[3, 18], [3, 21], [6, 21]]), poly([[18, 21], [21, 21], [21, 18]]),
    ],
  },
  {
    slug: "canvas-pan", category: "interface", subcategory: "action",
    name: "Pan canvas", description: "Drag the world, not the thing",
    tags: ["move", "drag", "four-way"], family: "arrow",
    aliases: ["pan"], keywords: ["pan", "move canvas"],
    shapes: [
      col(12, 3, 21), row(12, 3, 21),
      poly([[9.5, 5.5], [12, 3], [14.5, 5.5]]), poly([[9.5, 18.5], [12, 21], [14.5, 18.5]]),
      poly([[5.5, 9.5], [3, 12], [5.5, 14.5]]), poly([[18.5, 9.5], [21, 12], [18.5, 14.5]]),
    ],
  },
  {
    slug: "zoom-fit", category: "interface", subcategory: "action",
    name: "Zoom to fit", description: "All of it, exactly on screen",
    tags: ["zoom", "fit", "whole"], family: "window",
    aliases: [], keywords: ["zoom to fit", "fit to screen"],
    shapes: [rect(3, 3, 18, 18, 2), disc(11, 11, 4), poly([[14, 14], [17, 17]])],
  },
  {
    slug: "handle-resize", category: "interface", subcategory: "action",
    name: "Resize handle", description: "Pull the corner; the box follows",
    tags: ["resize", "corner", "drag"], family: "window",
    aliases: [], keywords: ["resize handle", "drag corner"],
    shapes: [rect(3, 3, 13, 13, 2), poly([[16, 16], [20.5, 20.5]]), poly([[16.5, 20.5], [20.5, 20.5], [20.5, 16.5]])],
  },
  {
    slug: "flip-h", category: "interface", subcategory: "action",
    name: "Flip horizontal", description: "Its mirror twin, across the line",
    tags: ["mirror", "flip", "reflect"], family: "figure",
    aliases: [], keywords: ["flip horizontal", "mirror"],
    shapes: [poly([[3, 6], [9, 12], [3, 18]], true), col(12, 4, 20), poly([[21, 6], [15, 12], [21, 18]], true)],
  },

  /* ── the thinning lists ───────────────────────────────────────────────────────── */

  {
    slug: "packet-loss", category: "devops", subcategory: "observability",
    name: "Packet loss", description: "One of them never arrived",
    tags: ["dropped", "network", "gap"], family: "figure",
    aliases: [], keywords: ["packet loss", "dropped packets"],
    shapes: [disc(5, 8, 2), disc(11, 8, 2), disc(19, 8, 2), row(14, 2, 22)],
  },
  {
    slug: "significance-test", category: "analytics", subcategory: "experiment",
    name: "Significance", description: "The difference is real, not luck",
    tags: ["stats", "confirmed", "gap"], family: "chart",
    aliases: ["stat-sig"], keywords: ["statistical significance", "p < 0.05"],
    shapes: [col(7, 8, 19), col(17, 12, 19), row(21.5, 4, 20), poly([[9.5, 4.5], [11.5, 6.5], [15, 3]])],
  },
  {
    slug: "marginal-roi", category: "analytics", subcategory: "metric",
    name: "Marginal ROI", description: "Each extra coin buys a little less",
    tags: ["diminishing", "return", "coin"], family: "chart",
    aliases: ["diminishing-returns"], keywords: ["marginal roi", "diminishing returns"],
    shapes: [col(5, 10, 19), col(11, 13, 19), col(17, 16, 19), row(21.5, 3, 21), disc(12, 5, 3)],
  },
  {
    slug: "trend-break", category: "analytics", subcategory: "chart",
    name: "Trend break", description: "It was rising; then it was not",
    tags: ["snap", "reverse", "line"], family: "chart",
    aliases: [], keywords: ["trend break", "trend reversal"],
    shapes: [poly([[3, 15], [11, 7]]), poly([[13, 9], [19, 15]]), row(19, 3, 21)],
  },
  {
    slug: "durable-object", category: "cloud", subcategory: "storage",
    name: "Durable object", description: "Anchored; it will be here tomorrow",
    tags: ["persist", "anchor", "state"], family: "figure",
    aliases: [], keywords: ["durable object", "persistent state"],
    shapes: [disc(12, 5, 2), col(12, 7, 20), row(10, 8, 16), arc(12, 15, 5, 0, 180)],
  },
  {
    slug: "reserved-discount", category: "cloud", subcategory: "cost",
    name: "Reserved discount", description: "Cheaper, because you promised",
    tags: ["price", "tag", "commit"], family: "figure",
    aliases: [], keywords: ["reserved pricing", "commitment discount"],
    shapes: [disc(8, 10, 5), disc(8, 10, 2), poly([[14, 13], [19, 13], [21.5, 15.5], [19, 18], [14, 18]], true)],
  },
  {
    slug: "message-split", category: "automation", subcategory: "integration",
    name: "Message split", description: "One in, two out, each its own way",
    tags: ["fork", "divide", "route"], family: "arrow",
    aliases: ["splitter-flow"], keywords: ["message splitter", "fan out message"],
    shapes: [
      disc(7, 12, 2),
      poly([[9, 12], [17, 4]]), poly([[14, 4], [17, 4], [17, 7]]),
      poly([[9, 12], [17, 20]]), poly([[14, 20], [17, 20], [17, 17]]),
    ],
  },
];
