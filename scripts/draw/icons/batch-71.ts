/**
 * Batch 71 — round 20 of the 1k plan: a model core with something beside it,
 * agents that branch and report, the last moods of the chat bubble, files by
 * their kind, and money as a coin with a mark.
 *
 * Unattended round. The machine frame is retired as a base for small marks
 * (its ink swamps any mark and every pair reads as twins); the diamond core
 * carries that job from here on. Every name checked free before drawing.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { page } from "../bodies.ts";
import type { Icon } from "../build.ts";

const HEART = "a heart is one line, not three strokes with visible seams";

export const BATCH_71: Icon[] = [
  /* ── ai: a model core with something beside it ───────────────────────────────── */

  {
    slug: "model-run", category: "ai", subcategory: "inference",
    name: "Model run", description: "A model core beside a play button — run an inference with this model",
    tags: ["run", "inference", "execute"], family: "lattice",
    aliases: [], keywords: ["run model", "model inference", "execute model"],
    shapes: [poly([[8, 8], [12, 12], [8, 16], [4, 12]], true), poly([[15, 8], [15, 16], [19, 12]], true)],
  },
  {
    slug: "model-fast", category: "ai", subcategory: "model",
    name: "Model fast", description: "A model core beside a lightning bolt — the low-latency mode of a model",
    tags: ["fast", "latency", "speed"], family: "lattice",
    aliases: [], keywords: ["fast model", "low latency mode", "speed tier"],
    shapes: [poly([[7, 8], [11, 12], [7, 16], [3, 12]], true), poly([[20, 6], [15, 11], [19, 11], [14, 16]])],
  },
  {
    slug: "model-lock", category: "ai", subcategory: "model",
    name: "Model lock", description: "A model core beside a padlock — a model locked to approved use",
    tags: ["lock", "restricted", "access"], family: "lattice",
    aliases: [], keywords: ["locked model", "restricted model", "model access control"],
    shapes: [poly([[6, 6.5], [9.5, 10], [6, 13.5], [2.5, 10]], true), rect(12, 13, 10, 8, 2), arc(17, 13, 3, 180, 360)],
  },
  {
    slug: "model-key", category: "ai", subcategory: "model",
    name: "Model key", description: "A model core beside a key — the API key that unlocks a model",
    tags: ["key", "api", "access"], family: "lattice",
    aliases: [], keywords: ["model api key", "model access key", "unlock model"],
    shapes: [poly([[6, 8], [10, 12], [6, 16], [2, 12]], true), disc(16, 9, 3), col(16, 12, 20), row(17, 16, 18.5)],
  },
  {
    slug: "model-guard", category: "ai", subcategory: "model",
    name: "Model guard", description: "A model core beside a shield — the guardrails wrapped around a model",
    tags: ["guard", "shield", "safety"], family: "lattice",
    aliases: [], keywords: ["model guardrails", "guarded model", "model safety layer"],
    shapes: [poly([[6, 6.5], [9.5, 10], [6, 13.5], [2.5, 10]], true), poly([[13, 11], [22, 11], [22, 16.5], [17.5, 21], [13, 16.5]], true)],
  },
  {
    slug: "model-heart", category: "ai", subcategory: "model",
    name: "Model heart", description: "A model core beside a heart — a favourite model you keep coming back to",
    tags: ["favourite", "heart", "preferred"], family: "lattice",
    aliases: [], keywords: ["favourite model", "preferred model", "starred model"],
    shapes: [poly([[6.5, 6.5], [11, 11], [6.5, 15.5], [2, 11]], true), raw("M13 8A2.5 2.5 0 0 1 17 8A2.5 2.5 0 0 1 21 8L17 12Z", HEART, true)],
  },
  {
    slug: "model-checkpoint", category: "ai", subcategory: "training",
    name: "Model checkpoint", description: "A model core beside a flag — a checkpoint saved during training",
    tags: ["checkpoint", "flag", "save"], family: "lattice",
    aliases: [], keywords: ["model checkpoint", "training checkpoint", "saved weights"],
    shapes: [poly([[6, 9.5], [9.5, 13], [6, 16.5], [2.5, 13]], true), col(13, 4, 21), poly([[13, 4], [21, 4], [18, 7], [21, 10], [13, 10]])],
  },
  {
    slug: "model-search", category: "ai", subcategory: "model",
    name: "Model search", description: "A model core beside a magnifying glass — search for a model in a catalogue",
    tags: ["search", "find", "catalogue"], family: "lattice",
    aliases: [], keywords: ["model search", "find a model", "model catalogue"],
    shapes: [poly([[6, 10.5], [9.5, 14], [6, 17.5], [2.5, 14]], true), disc(16, 10, 4), poly([[19, 13], [21.5, 15.5]])],
  },
  {
    slug: "model-voice", category: "ai", subcategory: "inference",
    name: "Model voice", description: "A model core with sound waves leaving it — a model that speaks",
    tags: ["voice", "speech", "audio"], family: "lattice",
    aliases: [], keywords: ["voice model", "speaking model", "audio output"],
    shapes: [poly([[8, 8], [12, 12], [8, 16], [4, 12]], true), arc(15, 12, 3, -45, 45), arc(15, 12, 6, -45, 45)],
  },
  {
    slug: "model-text", category: "ai", subcategory: "inference",
    name: "Model text", description: "A model core beside lines of text — the text a model produces",
    tags: ["text", "output", "generate"], family: "lattice",
    aliases: [], keywords: ["text model", "model output", "generated text"],
    shapes: [poly([[7, 8], [11, 12], [7, 16], [3, 12]], true), row(7, 14, 21), row(12, 14, 21), row(17, 14, 21)],
  },
  {
    slug: "playground", category: "ai", subcategory: "inference",
    name: "Playground", description: "A window with a model core inside — the playground where you try a model by hand",
    tags: ["try", "experiment", "sandbox"], family: "window",
    aliases: [], keywords: ["model playground", "try a model", "prompt playground"],
    shapes: [rect(3, 2.5, 18, 19, 2), row(7, 3, 21), poly([[12, 10.5], [16, 14.5], [12, 18.5], [8, 14.5]], true)],
  },

  /* ── agents: branch and report ───────────────────────────────────────────────── */

  {
    slug: "agent-graph", category: "agents", subcategory: "multi-agent",
    name: "Agent graph", description: "An agent beside a small graph of nodes — the graph of agents and how they connect",
    tags: ["graph", "nodes", "topology"], family: "ring",
    aliases: [], keywords: ["agent graph", "agent topology", "connected agents"],
    shapes: [arc(6, 6, 4, 295, 245), disc(13, 14, 1), disc(21, 14, 1), disc(17, 18, 1), poly([[14, 15], [16, 17]]), poly([[20, 15], [18, 17]])],
  },
  {
    slug: "agent-halt", category: "agents", subcategory: "lifecycle",
    name: "Agent halt", description: "An agent beside a stop square — halt an agent where it stands",
    tags: ["stop", "halt", "abort"], family: "ring",
    aliases: [], keywords: ["halt agent", "stop agent", "abort run"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[13, 13], [21, 13], [21, 21], [13, 21]], true)],
  },
  {
    slug: "agent-report", category: "agents", subcategory: "reflection",
    name: "Agent report", description: "An agent beside a pie chart — the report an agent files on its work",
    tags: ["report", "chart", "summary"], family: "ring",
    aliases: [], keywords: ["agent report", "run summary", "agent analytics"],
    shapes: [arc(7, 7, 4, 295, 245), disc(16.5, 16, 4.5), col(16.5, 11.5, 16), row(16, 16.5, 21)],
  },
  {
    slug: "agent-video", category: "agents", subcategory: "tool-use",
    name: "Agent video", description: "An agent beside a video player — an agent that watches and understands video",
    tags: ["video", "watch", "media"], family: "ring",
    aliases: [], keywords: ["video agent", "video understanding", "media agent"],
    shapes: [arc(7, 7, 4, 295, 245), rect(12.5, 11.5, 9.5, 10.5, 2), poly([[15.5, 14.5], [15.5, 18.5], [17.5, 16.5]], true)],
  },
  {
    slug: "agent-image", category: "agents", subcategory: "tool-use",
    name: "Agent image", description: "An agent beside a picture — a vision agent that looks at and understands images",
    tags: ["image", "vision", "picture"], family: "ring",
    aliases: [], keywords: ["vision agent", "image agent", "look at pictures"],
    shapes: [arc(6.5, 6.5, 4, 295, 245), rect(12, 12, 10, 10, 2), poly([[15, 18], [17, 16], [19, 18]])],
  },
  {
    slug: "agent-branch", category: "agents", subcategory: "planning",
    name: "Agent branch", description: "An agent beside a forking line — an agent branching into a parallel path",
    tags: ["branch", "fork", "parallel"], family: "ring",
    aliases: [], keywords: ["agent branch", "fork the run", "parallel path"],
    shapes: [arc(7, 7, 4, 295, 245), col(13, 11, 21), poly([[13, 15], [17, 11], [21, 11]])],
  },
  {
    slug: "agent-merge", category: "agents", subcategory: "planning",
    name: "Agent merge", description: "An agent beside two lines joining — parallel agent paths merging back into one",
    tags: ["merge", "join", "combine"], family: "ring",
    aliases: [], keywords: ["agent merge", "join paths", "combine results"],
    shapes: [arc(7, 7, 4, 295, 245), col(21, 11, 21), poly([[21, 15], [17, 11], [13, 11]])],
  },
  {
    slug: "semantic-memory", category: "agents", subcategory: "memory",
    name: "Semantic memory", description: "Notes beside a model core — the facts and concepts an agent keeps as memory",
    tags: ["memory", "facts", "knowledge"], family: "text",
    aliases: [], keywords: ["semantic memory", "factual memory", "knowledge store"],
    shapes: [row(6, 2, 9), row(11, 2, 9), row(16, 2, 9), poly([[17, 7], [21, 11], [17, 15], [13, 11]], true)],
  },
  {
    slug: "procedural-memory", category: "agents", subcategory: "memory",
    name: "Procedural memory", description: "Notes beside a play button — the procedures an agent remembers how to run",
    tags: ["memory", "procedure", "skill"], family: "text",
    aliases: [], keywords: ["procedural memory", "learned procedures", "skill memory"],
    shapes: [row(6, 2, 9), row(11, 2, 9), row(16, 2, 9), poly([[14, 6], [14, 16], [19, 11]], true)],
  },
  {
    slug: "episodic-memory", category: "agents", subcategory: "memory",
    name: "Episodic memory", description: "Notes beside a clock — what an agent remembers happening, and when",
    tags: ["memory", "episode", "time"], family: "text",
    aliases: [], keywords: ["episodic memory", "event memory", "what happened when"],
    shapes: [row(6, 2, 8), row(11, 2, 8), row(16, 2, 8), disc(16.5, 11, 5.5), poly([[16.5, 8.5], [16.5, 11], [19, 11]])],
  },

  /* ── interface: the last moods of the bubble ──────────────────────────────────── */

  {
    slug: "milestone-flag", category: "interface", subcategory: "time",
    name: "Milestone flag", description: "A flag with a check beside it — a milestone reached on a timeline",
    tags: ["milestone", "flag", "done"], family: "flag",
    aliases: [], keywords: ["milestone reached", "project milestone", "flag done"],
    shapes: [col(6, 3, 21), poly([[6, 3], [15, 3], [12, 6], [15, 9], [6, 9]]), poly([[13, 15], [16, 18], [21, 13]])],
  },
  {
    slug: "reminder-snooze", category: "interface", subcategory: "time",
    name: "Reminder snooze", description: "A clock with a Z beside it — snooze a reminder until later in the day",
    tags: ["snooze", "later", "reminder"], family: "clock",
    aliases: [], keywords: ["snooze reminder", "remind me later", "postpone"],
    shapes: [disc(9, 12, 6), poly([[9, 9], [9, 12], [11.5, 12]]), poly([[18, 10], [22, 10], [18, 14], [22, 14]])],
  },
  {
    slug: "navbar", category: "interface", subcategory: "layout",
    name: "Navbar", description: "A bar of destinations above the page content — the navigation bar",
    tags: ["navigation", "bar", "header"], family: "window",
    aliases: [], keywords: ["navbar", "navigation bar", "top nav"],
    shapes: [rect(2, 3, 20, 8, 2), disc(6, 7, 1), disc(12, 7, 1), disc(18, 7, 1), row(15, 4, 20), row(19, 4, 20)],
  },
  {
    slug: "zoom-selection", category: "interface", subcategory: "action",
    name: "Zoom to selection", description: "A magnifying glass over a selected box — zoom the view to fit the selection",
    tags: ["zoom", "fit", "selection"], family: "object",
    aliases: [], keywords: ["zoom to selection", "zoom to fit", "focus selection"],
    shapes: [disc(11, 11, 8), rect(7.5, 7.5, 7, 7, 2), poly([[16.5, 16.5], [21, 21]])],
  },
  {
    slug: "pin-off", category: "interface", subcategory: "action",
    name: "Unpin", description: "A pin struck through — unpin an item so it no longer stays on top",
    tags: ["unpin", "release", "pin"], family: "object",
    aliases: [], keywords: ["unpin", "remove pin", "unstick"],
    shapes: [disc(10, 7, 3), col(10, 10, 17), poly([[5, 21], [19, 7]])],
  },
  {
    slug: "chat-lock", category: "interface", subcategory: "communication",
    name: "Chat lock", description: "A speech bubble with a padlock inside — an end-to-end encrypted conversation",
    tags: ["encrypted", "private", "lock"], family: "bubble",
    aliases: ["message-square-lock"], keywords: ["encrypted chat", "private conversation", "secure messaging"],
    shapes: [rect(3, 3, 18, 15.5, 2), poly([[7, 18.5], [7, 21.5], [10, 18.5]]), rect(8, 9, 8, 6.5, 2), arc(12, 9, 2, 180, 360)],
  },
  {
    slug: "chat-tag", category: "interface", subcategory: "communication",
    name: "Chat tag", description: "A speech bubble with a label inside — a tagged or labelled conversation",
    tags: ["tag", "label", "conversation"], family: "bubble",
    aliases: [], keywords: ["tag conversation", "label chat", "chat category"],
    shapes: [rect(3, 3, 18, 15, 2), poly([[7, 18], [7, 21], [10, 18]]), poly([[8, 8], [13, 8], [16, 11], [13, 14], [8, 14]], true)],
  },
  {
    slug: "chat-bot", category: "interface", subcategory: "communication",
    name: "Chat bot", description: "A speech bubble with an agent inside — a message from the assistant",
    tags: ["bot", "assistant", "message"], family: "bubble",
    aliases: [], keywords: ["bot message", "assistant reply", "chatbot"],
    shapes: [rect(3, 3, 18, 15, 2), poly([[7, 18], [7, 21], [10, 18]]), arc(12, 10.5, 4, 295, 245)],
  },
  {
    slug: "chat-check", category: "interface", subcategory: "communication",
    name: "Chat check", description: "A speech bubble with a check inside — a message delivered, read or resolved",
    tags: ["delivered", "read", "resolved"], family: "bubble",
    aliases: ["message-square-check"], keywords: ["message delivered", "read receipt", "resolved conversation"],
    shapes: [rect(3, 3, 18, 15, 2), poly([[7, 18], [7, 21], [10, 18]]), poly([[8, 10], [11, 13], [16, 8]])],
  },
  {
    slug: "chat-cancel", category: "interface", subcategory: "communication",
    name: "Chat cancel", description: "A speech bubble with an X inside — a message unsent or a conversation closed",
    tags: ["cancel", "unsend", "close"], family: "bubble",
    aliases: ["message-square-x"], keywords: ["unsend message", "cancel message", "close conversation"],
    shapes: [rect(3, 3, 18, 15, 2), poly([[7, 18], [7, 21], [10, 18]]), poly([[9.5, 8], [14.5, 13]]), poly([[14.5, 8], [9.5, 13]])],
  },
  {
    slug: "embed", category: "devtools", subcategory: "editor",
    name: "Embed", description: "A window with angle brackets inside — the embed code for a widget or player",
    tags: ["embed", "iframe", "widget"], family: "window",
    aliases: [], keywords: ["embed code", "iframe embed", "embeddable widget"],
    shapes: [rect(3, 3, 18, 18, 2), row(8, 3, 21), poly([[9.5, 12], [7, 14.5], [9.5, 17]]), poly([[14.5, 12], [17, 14.5], [14.5, 17]])],
  },
  {
    slug: "test-file", category: "devtools", subcategory: "testing",
    name: "Test file", description: "A page with a play button on it — a test file ready to run in the suite",
    tags: ["test", "spec", "file"], family: "page",
    aliases: [], keywords: ["test file", "spec file", "run tests"],
    shapes: [page(), poly([[10, 10], [10, 16], [13, 13]], true)],
  },
  {
    slug: "diff-file", category: "devtools", subcategory: "version-control",
    name: "Diff file", description: "A page marked with a plus and a minus — a diff or patch file",
    tags: ["diff", "patch", "file"], family: "page",
    aliases: ["file-diff"], keywords: ["diff file", "patch file", "unified diff"],
    shapes: [page(), row(9, 9, 15), col(12, 6.5, 11.5), row(16, 9, 15)],
  },
  {
    slug: "chart-timeline", category: "analytics", subcategory: "chart",
    name: "Timeline chart", description: "Events placed above and below one line — a timeline chart of what happened when",
    tags: ["timeline", "events", "chart"], family: "chart",
    aliases: [], keywords: ["timeline chart", "event timeline", "chronology"],
    shapes: [row(12, 2, 22), disc(6, 7, 2), disc(12, 17, 2), disc(18, 7, 2)],
  },
  {
    slug: "goal-met", category: "analytics", subcategory: "metric",
    name: "Goal met", description: "A target with a check beside it — a goal that was reached and confirmed",
    tags: ["goal", "reached", "target"], family: "object",
    aliases: [], keywords: ["goal met", "target reached", "objective achieved"],
    shapes: [disc(9, 12, 5), disc(9, 12, 1), poly([[17, 13], [19, 15], [22, 12]])],
  },
  {
    slug: "goal-missed", category: "analytics", subcategory: "metric",
    name: "Goal missed", description: "A target with an X beside it — a goal that was missed and marked as such",
    tags: ["goal", "missed", "target"], family: "object",
    aliases: [], keywords: ["goal missed", "target missed", "objective failed"],
    shapes: [disc(9, 12, 5), disc(9, 12, 1), poly([[17, 9.5], [22, 14.5]]), poly([[22, 9.5], [17, 14.5]])],
  },
  {
    slug: "key-tag", category: "security", subcategory: "auth",
    name: "Key tag", description: "A key with a label beside it — a named credential you can tell apart from the rest",
    tags: ["key", "label", "named"], family: "key",
    aliases: [], keywords: ["labelled key", "named credential", "key name"],
    shapes: [disc(7, 9, 4), col(7, 13, 21), row(18, 7, 10), poly([[14, 13], [19, 13], [22, 16], [19, 19], [14, 19]], true)],
  },
  {
    slug: "key-shield", category: "security", subcategory: "auth",
    name: "Key shield", description: "A key with a shield beside it — a credential kept under protection",
    tags: ["key", "protected", "shield"], family: "key",
    aliases: [], keywords: ["protected key", "guarded credential", "key security"],
    shapes: [disc(7, 9, 4), col(7, 13, 21), row(18, 7, 10), poly([[14, 12], [22, 12], [22, 17], [18, 21], [14, 17]], true)],
  },
  {
    slug: "window-lock", category: "security", subcategory: "auth",
    name: "Window lock", description: "A window with a padlock inside — a page that requires sign-in",
    tags: ["locked", "sign-in", "page"], family: "window",
    aliases: [], keywords: ["locked page", "sign-in required", "protected route"],
    shapes: [rect(3, 2.5, 18, 19, 2), row(7, 3, 21), rect(8, 12, 8, 6.5, 2), arc(12, 12, 2, 180, 360)],
  },

  /* ── cloud: money as a coin with a mark ───────────────────────────────────────── */

  {
    slug: "on-time", category: "interface", subcategory: "time",
    name: "On time", description: "A clock with a check beside it — something that happened on schedule",
    tags: ["schedule", "punctual", "check"], family: "clock",
    aliases: [], keywords: ["on time", "on schedule", "deadline met"],
    shapes: [disc(8.5, 12, 5.5), poly([[8.5, 9], [8.5, 12], [11, 12]]), poly([[17, 13], [19, 15], [22, 12]])],
  },
  {
    slug: "credits", category: "cloud", subcategory: "cost",
    name: "Credits", description: "A coin beside a statement of lines — the credits left on an account",
    tags: ["credits", "balance", "account"], family: "object",
    aliases: [], keywords: ["account credits", "remaining balance", "prepaid credits"],
    shapes: [disc(8, 12, 5), col(8, 10.5, 13.5), row(8, 16, 22), row(12, 16, 22), row(16, 16, 22)],
  },
  {
    slug: "model-halt", category: "ai", subcategory: "model",
    name: "Model halt", description: "A model core beside a stop square — halt a model mid-generation",
    tags: ["stop", "halt", "cancel"], family: "lattice",
    aliases: [], keywords: ["stop generation", "halt model", "cancel inference"],
    shapes: [poly([[7, 8], [11, 12], [7, 16], [3, 12]], true), poly([[14, 8], [22, 8], [22, 16], [14, 16]], true)],
  },
  {
    slug: "price-tag", category: "cloud", subcategory: "cost",
    name: "Price tag", description: "A coin beside a label — the price attached to a plan or a request",
    tags: ["price", "tag", "cost"], family: "object",
    aliases: [], keywords: ["price tag", "pricing", "cost label"],
    shapes: [disc(6.5, 11, 4.5), col(6.5, 9.5, 12.5), poly([[14, 13], [19, 13], [22, 16], [19, 19], [14, 19]], true)],
  },
  {
    slug: "refund", category: "cloud", subcategory: "cost",
    name: "Refund", description: "A coin with a double chevron pointing back at it — money refunded",
    tags: ["refund", "return", "money"], family: "object",
    aliases: [], keywords: ["refund", "money back", "credit note"],
    shapes: [disc(8, 12, 5), col(8, 10.5, 13.5), poly([[18, 9.5], [15.5, 12], [18, 14.5]]), poly([[21.5, 9.5], [19, 12], [21.5, 14.5]])],
  },
  {
    slug: "paid", category: "cloud", subcategory: "cost",
    name: "Paid", description: "A coin with a check beside it — a payment that went through successfully",
    tags: ["paid", "success", "payment"], family: "object",
    aliases: [], keywords: ["paid", "payment successful", "invoice paid"],
    shapes: [disc(8, 12, 5), col(8, 10.5, 13.5), poly([[16, 13], [18.5, 15.5], [22, 12]])],
  },
  {
    slug: "payment-failed", category: "cloud", subcategory: "cost",
    name: "Payment failed", description: "A coin with an X beside it — a payment that did not go through",
    tags: ["failed", "declined", "payment"], family: "object",
    aliases: [], keywords: ["payment failed", "card declined", "billing error"],
    shapes: [disc(8, 12, 5), col(8, 10.5, 13.5), poly([[16.5, 9.5], [21.5, 14.5]]), poly([[21.5, 9.5], [16.5, 14.5]])],
  },
  {
    slug: "top-up", category: "cloud", subcategory: "cost",
    name: "Top up", description: "A coin with a plus beside it — add credit or funds to an account balance",
    tags: ["credit", "add", "balance"], family: "object",
    aliases: [], keywords: ["top up", "add credits", "add funds"],
    shapes: [disc(8, 12, 5), col(8, 10.5, 13.5), row(12, 16, 22), col(19, 9, 15)],
  },
  {
    slug: "pay-per-use", category: "cloud", subcategory: "cost",
    name: "Pay per use", description: "A coin with a lightning bolt beside it — billing by the request",
    tags: ["usage", "billing", "metered"], family: "object",
    aliases: [], keywords: ["pay per use", "usage-based billing", "metered pricing"],
    shapes: [disc(8, 12, 5), col(8, 10.5, 13.5), poly([[21, 7], [17, 11], [20, 11], [16, 15]])],
  },
  {
    slug: "cost-alert", category: "cloud", subcategory: "cost",
    name: "Spend alert", description: "A coin with an alert mark beside it — spending has crossed a threshold",
    tags: ["alert", "budget", "threshold"], family: "object",
    aliases: [], keywords: ["spend alert", "budget warning", "cost threshold"],
    shapes: [disc(8, 12, 5), col(8, 10.5, 13.5), col(18, 6, 11), disc(18, 14, 1)],
  },
];
