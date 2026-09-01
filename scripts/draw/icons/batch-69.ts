/**
 * Batch 69 — round 18 of the 1k plan: what a model frame can hold, agents
 * with a badge and a budget, the chat bubble's many moods, keys that grant
 * and restrict, and two ways to reshape a table.
 *
 * Unattended round. no-training stayed out (it is model-off), voice-mode
 * stayed out (it is microphone), agent-typing stayed out (agent-thinking
 * already carries the dots). Every name checked free before drawing.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { dial, key, machine, ring } from "../bodies.ts";
import { SMALL, add, coinMark, diamondMark, flagMark, pinMark, remove } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_69: Icon[] = [
  /* ── ai: what a model frame can hold ──────────────────────────────────────────── */

  {
    slug: "code-interpreter", category: "ai", subcategory: "inference",
    name: "Code interpreter", description: "A play button between angle brackets — the sandbox where a model runs the code it writes",
    tags: ["run", "sandbox", "code"], family: "bracket",
    aliases: [], keywords: ["code interpreter", "code execution tool", "run generated code"],
    shapes: [poly([[7, 7], [2, 12], [7, 17]]), poly([[10, 9], [10, 15], [13, 12]], true), poly([[17, 7], [22, 12], [17, 17]])],
  },
  {
    slug: "grokking", category: "ai", subcategory: "training",
    name: "Grokking", description: "A curve that stays flat and then suddenly climbs — the moment a model finally generalises",
    tags: ["generalise", "sudden", "training"], family: "chart",
    aliases: [], keywords: ["grokking", "delayed generalisation", "phase change in training"],
    shapes: [poly([[3, 3], [3, 21], [21, 21]]), poly([[6, 18], [14, 18], [18, 14], [18, 6]])],
  },
  {
    slug: "tab-complete", category: "ai", subcategory: "inference",
    name: "Tab complete", description: "Text with a tab arrow at the end of the last line — accept an inline suggestion with Tab",
    tags: ["autocomplete", "suggest", "tab"], family: "text",
    aliases: [], keywords: ["tab to accept", "inline completion", "autocomplete suggestion"],
    shapes: [row(6, 3, 21), row(11, 3, 21), row(16, 3, 12), row(16, 15, 19), poly([[16.5, 13.5], [19, 16], [16.5, 18.5]]), col(22, 13.5, 18.5)],
  },
  {
    slug: "reasoning-budget", category: "ai", subcategory: "inference",
    name: "Reasoning budget", description: "A coin held between brackets — the token budget a model may spend on thinking",
    tags: ["budget", "tokens", "thinking"], family: "bracket",
    aliases: [], keywords: ["reasoning budget", "thinking tokens", "effort budget"],
    shapes: [poly([[7, 3], [3, 3], [3, 21], [7, 21]]), poly([[17, 3], [21, 3], [21, 21], [17, 21]]), disc(12, 12, 4.5), col(12, 10.5, 13.5)],
  },
  {
    slug: "model-alias", category: "ai", subcategory: "model",
    name: "Model alias", description: "A model frame with a label tag inside — an alias like latest that points at a version",
    tags: ["alias", "label", "pointer"], family: "machine",
    aliases: [], keywords: ["model alias", "model label", "latest pointer"],
    shapes: [machine(), poly([[8, 10], [13, 10], [16, 13], [13, 16], [8, 16]], true)],
  },
  {
    slug: "edge-model", category: "ai", subcategory: "model",
    name: "Edge model", description: "A model core tucked into the corner of a frame — a model that runs at the edge, near the user",
    tags: ["edge", "on-device", "local"], family: "window",
    aliases: [], keywords: ["edge model", "on-device inference", "edge ai"],
    shapes: [rect(3, 3, 18, 18, 2), poly([[15, 6], [18, 9], [15, 12], [12, 9]], true)],
  },
  {
    slug: "frontier-model", category: "ai", subcategory: "model",
    name: "Frontier model", description: "A model core beneath a mountain peak — the most capable model at the frontier",
    tags: ["frontier", "flagship", "capable"], family: "lattice",
    aliases: [], keywords: ["frontier model", "flagship model", "state of the art"],
    shapes: [poly([[12, 11], [16, 15], [12, 19], [8, 15]], true), poly([[8, 8], [12, 4], [16, 8]])],
  },
  {
    slug: "tokens-used", category: "ai", subcategory: "inference",
    name: "Tokens used", description: "A pill holding three tokens — the count of tokens a request consumed",
    tags: ["tokens", "usage", "count"], family: "chip",
    aliases: [], keywords: ["token usage", "tokens consumed", "usage meter"],
    shapes: [rect(2, 7.5, 20, 9, 2), disc(7, 12, 1), disc(12, 12, 1), disc(17, 12, 1)],
  },

  /* ── agents: a badge and a budget ─────────────────────────────────────────────── */

  {
    slug: "agent-cost", category: "agents", subcategory: "lifecycle",
    name: "Agent cost", description: "An agent beside a coin — what a single run of this agent costs to operate",
    tags: ["cost", "spend", "billing"], family: "orbit",
    aliases: [], keywords: ["agent cost", "agent spend", "cost per run"],
    shapes: [ring(), ...coinMark()],
  },
  {
    slug: "agent-context", category: "agents", subcategory: "memory",
    name: "Agent context", description: "An agent beside a pair of brackets — the context window an agent carries into each step",
    tags: ["context", "window", "memory"], family: "ring",
    aliases: [], keywords: ["agent context", "context window", "working memory"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[14.5, 12], [12, 12], [12, 21], [14.5, 21]]), poly([[19.5, 12], [22, 12], [22, 21], [19.5, 21]])],
  },
  {
    slug: "agent-model", category: "agents", subcategory: "agent-core",
    name: "Agent model", description: "An agent beside a model core — the underlying model an agent runs on",
    tags: ["model", "backend", "llm"], family: "orbit",
    aliases: [], keywords: ["agent model", "underlying model", "model selection"],
    shapes: [ring(), ...diamondMark()],
  },
  {
    slug: "agent-pin", category: "agents", subcategory: "tool-use",
    name: "Agent pin", description: "An agent beside a location pin — an agent that works with places and maps",
    tags: ["location", "map", "place"], family: "orbit",
    aliases: [], keywords: ["location agent", "map agent", "geo agent"],
    shapes: [ring(), ...pinMark()],
  },
  {
    slug: "agent-trigger", category: "agents", subcategory: "execution",
    name: "Agent trigger", description: "An agent beside a lightning bolt — the event that fires an agent into action",
    tags: ["trigger", "event", "fire"], family: "ring",
    aliases: [], keywords: ["agent trigger", "event-driven agent", "fire an agent"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[19, 11], [14, 16], [18, 16], [13, 21]])],
  },
  {
    slug: "agent-active", category: "agents", subcategory: "agent-core",
    name: "Agent active", description: "An agent with a point lit at its centre — an agent that is awake and running",
    tags: ["active", "running", "live"], family: "orbit",
    aliases: [], keywords: ["active agent", "running agent", "live agent"],
    shapes: [ring(), disc(12, 12, 3)],
  },
  {
    slug: "agent-heart", category: "agents", subcategory: "agent-core",
    name: "Agent heart", description: "An agent with a small heart at its centre — an agent people have come to care about",
    tags: ["favourite", "care", "heart"], family: "orbit",
    aliases: [], keywords: ["favourite agent", "agent heart", "loved agent"],
    shapes: [ring(), raw("M8 10A2 2 0 0 1 12 10A2 2 0 0 1 16 10L12 14Z", "a heart is one line, not three strokes with visible seams", true)],
  },
  {
    slug: "agent-checkpoint", category: "agents", subcategory: "lifecycle",
    name: "Agent checkpoint", description: "An agent beside a flag on its pole — a checkpoint an agent can be restored to",
    tags: ["checkpoint", "flag", "restore"], family: "orbit",
    aliases: [], keywords: ["agent checkpoint", "save point", "restore agent state"],
    shapes: [ring(), ...flagMark()],
  },
  {
    slug: "agent-queue", category: "agents", subcategory: "execution",
    name: "Agent queue", description: "An agent beside two queued items — the backlog of work waiting for an agent",
    tags: ["queue", "backlog", "tasks"], family: "ring",
    aliases: [], keywords: ["agent queue", "task backlog", "queued work"],
    shapes: [arc(7, 7, 4, 295, 245), rect(13, 11, 9, 4, 2), rect(13, 18, 9, 4, 2)],
  },
  {
    slug: "agent-unread", category: "agents", subcategory: "communication",
    name: "Agent badge", description: "An agent with a badge at its shoulder — an agent with something new to show you",
    tags: ["badge", "notification", "new"], family: "ring",
    aliases: [], keywords: ["agent notification", "agent badge", "unread from agent"],
    shapes: [arc(11, 13, 7, 295, 245), disc(20, 5, 2)],
  },

  /* ── interface: the chat bubble's many moods ──────────────────────────────────── */

  {
    slug: "magnet-snap", category: "interface", subcategory: "action",
    name: "Magnet snap", description: "A horseshoe magnet — snapping objects to guides and each other",
    tags: ["snap", "magnet", "align"], family: "object",
    aliases: [], keywords: ["snap to grid", "magnetic snapping", "smart snap"],
    shapes: [arc(12, 14, 6, 0, 180), col(6, 3, 14), col(18, 3, 14), arc(12, 14, 2, 0, 180), col(10, 3, 14), col(14, 3, 14)],
  },
  {
    slug: "listbox", category: "interface", subcategory: "action",
    name: "Listbox", description: "A box of options with one of them selected — a listbox control",
    tags: ["list", "select", "options"], family: "window",
    aliases: [], keywords: ["listbox", "select list", "option list"],
    shapes: [rect(2, 2, 20, 20, 2), row(8, 6, 18), rect(5, 12, 14, 4, 2)],
  },
  {
    slug: "snackbar", category: "interface", subcategory: "state",
    name: "Snackbar", description: "A pill resting at the foot of a screen — a snackbar message with an action",
    tags: ["toast", "message", "bottom"], family: "window",
    aliases: [], keywords: ["snackbar", "bottom toast", "brief message"],
    shapes: [rect(2, 2, 20, 20, 2), rect(5, 13, 14, 5, 2.5)],
  },
  {
    slug: "banner", category: "interface", subcategory: "state",
    name: "Banner", description: "A pill across the head of a screen — a banner announcement or warning",
    tags: ["announce", "top", "notice"], family: "window",
    aliases: [], keywords: ["banner", "announcement bar", "top notice"],
    shapes: [rect(2, 2, 20, 20, 2), rect(5, 5, 14, 5, 2.5)],
  },
  {
    slug: "status-bar-ui", category: "interface", subcategory: "layout",
    name: "Status bar", description: "A phone with its notch and content beneath — the status bar area of a mobile screen",
    tags: ["mobile", "notch", "status"], family: "device",
    aliases: [], keywords: ["status bar", "phone notch", "safe area top"],
    shapes: [rect(6, 2, 12, 20, 2), row(5, 10, 14), row(10, 9, 15), row(14, 9, 15)],
  },
  {
    slug: "typing-indicator", category: "interface", subcategory: "communication",
    name: "Typing indicator", description: "A speech bubble with three dots — someone is typing a reply and it is on its way",
    tags: ["typing", "chat", "dots"], family: "bubble",
    aliases: [], keywords: ["typing indicator", "is typing", "chat dots"],
    shapes: [rect(3, 5, 18, 12, 2), poly([[7, 17], [7, 20], [10, 17]]), disc(8, 11, 1), disc(12, 11, 1), disc(16, 11, 1)],
  },
  {
    slug: "quote-reply", category: "interface", subcategory: "communication",
    name: "Quote reply", description: "A speech bubble with a quote bar inside — replying to a specific message",
    tags: ["quote", "reply", "chat"], family: "bubble",
    aliases: [], keywords: ["quote reply", "reply to message", "quoted text"],
    shapes: [rect(3, 4, 18, 12, 2), poly([[7, 16], [7, 19], [10, 16]]), col(7, 7, 13), row(9, 10, 17), row(12, 10, 17)],
  },
  {
    slug: "voice-message", category: "interface", subcategory: "communication",
    name: "Voice message", description: "A speech bubble holding a waveform — a recorded voice message",
    tags: ["voice", "audio", "chat"], family: "bubble",
    aliases: [], keywords: ["voice message", "audio message", "voice note"],
    shapes: [rect(3, 5, 18, 12, 2), poly([[7, 17], [7, 20], [10, 17]]), poly([[6, 11], [8, 9], [10, 11], [12, 9], [14, 11], [16, 9], [18, 11]])],
  },
  {
    slug: "text-columns", category: "interface", subcategory: "layout",
    name: "Text columns", description: "Lines of text set in two columns — a multi-column text layout for long reads",
    tags: ["columns", "text", "layout"], family: "text",
    aliases: [], keywords: ["text columns", "two-column layout", "column text"],
    shapes: [row(8, 3, 9), row(16, 3, 9), col(12, 4, 20), row(8, 15, 21), row(16, 15, 21)],
  },
  {
    slug: "mask-layer", category: "interface", subcategory: "action",
    name: "Mask layer", description: "A circle clipping the corner of a square — a layer used as a mask",
    tags: ["mask", "clip", "layer"], family: "object",
    aliases: [], keywords: ["mask layer", "clipping mask", "layer mask"],
    shapes: [rect(3, 3, 13, 13, 2), disc(15, 15, 6)],
  },
  {
    slug: "chat-mute", category: "interface", subcategory: "communication",
    name: "Chat mute", description: "A speech bubble with a slash inside — a conversation muted so it no longer notifies",
    tags: ["mute", "silence", "chat"], family: "bubble",
    aliases: ["message-circle-off"], keywords: ["mute chat", "silence conversation", "notifications off"],
    shapes: [rect(3, 4, 18, 12, 2), poly([[7, 16], [7, 19], [10, 16]]), poly([[8, 13], [13, 8]])],
  },
  {
    slug: "sticky-header", category: "interface", subcategory: "layout",
    name: "Sticky header", description: "A window whose header stays put above the content — a sticky header",
    tags: ["header", "sticky", "scroll"], family: "window",
    aliases: [], keywords: ["sticky header", "fixed header", "pinned toolbar"],
    shapes: [rect(2, 2, 20, 20, 2), row(7, 2, 22), row(12, 6, 18), row(17, 6, 18)],
  },
  {
    slug: "type-check", category: "devtools", subcategory: "code",
    name: "Type check", description: "A letter T with a check beside it — static type checking that passed",
    tags: ["types", "check", "static"], family: "glyph",
    aliases: [], keywords: ["type check", "typecheck passed", "static typing"],
    shapes: [row(5, 4, 16), col(10, 5, 15), poly([[14, 15], [17, 18], [22, 13]])],
  },
  {
    slug: "rtl", category: "devtools", subcategory: "editor",
    name: "Right to left", description: "Lines of text with an arrow pointing left — right-to-left text direction",
    tags: ["direction", "text", "i18n"], family: "text",
    aliases: [], keywords: ["right to left", "rtl text", "bidirectional text"],
    shapes: [row(6, 3, 21), row(11, 3, 21), row(17, 6, 21), poly([[8.5, 14.5], [6, 17], [8.5, 19.5]])],
  },
  {
    slug: "ltr", category: "devtools", subcategory: "editor",
    name: "Left to right", description: "Lines of text with an arrow pointing right — left-to-right text direction",
    tags: ["direction", "text", "i18n"], family: "text",
    aliases: [], keywords: ["left to right", "ltr text", "text direction"],
    shapes: [row(6, 3, 21), row(11, 3, 21), row(17, 3, 18), poly([[15.5, 14.5], [18, 17], [15.5, 19.5]])],
  },
  {
    slug: "window-function", category: "data", subcategory: "catalog",
    name: "Window function", description: "A bracket spanning two of four rows — a window function over neighbouring rows",
    tags: ["window", "sql", "rows"], family: "text",
    aliases: [], keywords: ["window function", "sql over clause", "sliding window rows"],
    shapes: [row(4, 3, 15.5), row(10, 3, 15.5), row(16, 3, 15.5), row(22, 3, 15.5), poly([[18.5, 7], [21, 7], [21, 19], [18.5, 19]])],
  },
  {
    slug: "pivot", category: "data", subcategory: "quality",
    name: "Pivot", description: "Rows turning into columns — pivoting a table from long to wide",
    tags: ["reshape", "wide", "table"], family: "text",
    aliases: [], keywords: ["pivot table", "long to wide", "reshape data"],
    shapes: [row(4, 3, 21), row(8, 3, 21), poly([[9.5, 11], [12, 13.5], [14.5, 11]]), col(6, 16.5, 22), col(12, 16.5, 22), col(18, 16.5, 22)],
  },
  {
    slug: "unpivot", category: "data", subcategory: "quality",
    name: "Unpivot", description: "Columns turning into rows — unpivoting a table from wide to long",
    tags: ["reshape", "long", "table"], family: "text",
    aliases: [], keywords: ["unpivot", "wide to long", "melt table"],
    shapes: [col(6, 2, 7.5), col(12, 2, 7.5), col(18, 2, 7.5), poly([[9.5, 10.5], [12, 13], [14.5, 10.5]]), row(16, 3, 21), row(20, 3, 21)],
  },
  {
    slug: "stacked-bar", category: "analytics", subcategory: "chart",
    name: "Stacked bar", description: "Bars built from stacked segments on a baseline — a stacked bar chart",
    tags: ["chart", "stacked", "segments"], family: "chart",
    aliases: [], keywords: ["stacked bar chart", "segmented bars", "composition chart"],
    shapes: [col(8, 4, 11), col(8, 14, 20), col(16, 8, 11), col(16, 14, 20), row(20, 3, 21)],
  },
  {
    slug: "lollipop-chart", category: "analytics", subcategory: "chart",
    name: "Lollipop chart", description: "Dots on stems rising from a baseline — a lollipop chart of categorical values",
    tags: ["chart", "dots", "stems"], family: "chart",
    aliases: [], keywords: ["lollipop chart", "dot and stem chart", "categorical values"],
    shapes: [disc(8, 7, 2), col(8, 9, 20), disc(16, 11, 2), col(16, 13, 20), row(20, 3, 21)],
  },

  /* ── security & automation: keys that grant and restrict ──────────────────────── */

  {
    slug: "least-privilege", category: "security", subcategory: "auth",
    name: "Least privilege", description: "An upright key, a minus in its bow — grant only the access a task needs",
    tags: ["access", "minimal", "permission"], family: "key",
    aliases: [], keywords: ["least privilege", "minimal permissions", "restricted access"],
    shapes: [...key(), ...remove(SMALL, 8.5)],
  },
  {
    slug: "grant", category: "security", subcategory: "auth",
    name: "Grant", description: "An upright key, a plus in its bow — grant a permission or a new scope",
    tags: ["access", "allow", "permission"], family: "key",
    aliases: [], keywords: ["grant access", "grant permission", "add scope"],
    shapes: [...key(), ...add(SMALL, 8.5)],
  },
  {
    slug: "id-card", category: "security", subcategory: "auth",
    name: "ID card", description: "A card with a person and their details — an identity card or service account",
    tags: ["identity", "card", "account"], family: "card",
    aliases: [], keywords: ["id card", "identity badge", "service account"],
    shapes: [rect(2, 5, 20, 14, 2), arc(8, 12, 3, 295, 245), row(10, 14, 19), row(14, 14, 19)],
  },
  {
    slug: "hazard", category: "security", subcategory: "ai-security",
    name: "Hazard", description: "An alert mark inside a diamond — a dangerous capability flagged before release",
    tags: ["danger", "warning", "risk"], family: "lattice",
    aliases: [], keywords: ["hazard", "dangerous capability", "risk warning"],
    shapes: [poly([[12, 2.5], [21.5, 12], [12, 21.5], [2.5, 12]], true), col(12, 7, 11.5), disc(12, 15.5, 1)],
  },
  {
    slug: "quantized-model", category: "ai", subcategory: "model",
    name: "Quantized model", description: "A model frame with a staircase inside — a model quantized to fewer bits so it runs smaller and faster",
    tags: ["quantize", "compress", "bits"], family: "machine",
    aliases: [], keywords: ["quantized model", "int8 model", "model compression"],
    shapes: [machine(), poly([[7, 16], [10, 16], [10, 13], [13, 13], [13, 10], [16, 10]])],
  },
  {
    slug: "context-scratch", category: "ai", subcategory: "inference",
    name: "Context scratch", description: "A scribble held between brackets — scratch space inside the context window for working notes",
    tags: ["scratch", "context", "notes"], family: "bracket",
    aliases: [], keywords: ["context scratchpad", "working notes", "scratch tokens"],
    shapes: [poly([[7, 3], [3, 3], [3, 21], [7, 21]]), poly([[17, 3], [21, 3], [21, 21], [17, 21]]), poly([[8, 13], [10, 11], [12, 13], [14, 11], [16, 13]])],
  },
  {
    slug: "uncertainty", category: "ai", subcategory: "inference",
    name: "Uncertainty", description: "A point floating above a wavering line — the uncertainty a model should admit in its answer",
    tags: ["doubt", "confidence", "unsure"], family: "figure",
    aliases: [], keywords: ["model uncertainty", "epistemic uncertainty", "confidence estimate"],
    shapes: [disc(12, 8, 2), poly([[3, 16], [6, 13], [9, 16], [12, 13], [15, 16], [18, 13], [21, 16]])],
  },
  {
    slug: "spacer", category: "interface", subcategory: "layout",
    name: "Spacer", description: "Two edges with a double arrow between them — the spacer that sets the gap in a layout",
    tags: ["gap", "spacing", "layout"], family: "arrow",
    aliases: [], keywords: ["spacer", "layout gap", "spacing control"],
    shapes: [row(4, 3, 21), row(20, 3, 21), col(12, 8, 16), poly([[9.5, 10.5], [12, 8], [14.5, 10.5]]), poly([[9.5, 13.5], [12, 16], [14.5, 13.5]])],
  },
  {
    slug: "time-picker", category: "interface", subcategory: "time",
    name: "Time picker", description: "A timer dial with steppers on its face — a time picker control",
    tags: ["clock", "select", "time"], family: "orbit",
    aliases: [], keywords: ["time picker", "select a time", "clock input"],
    shapes: [...dial(), poly([[9.5, 12], [12, 9.5], [14.5, 12]]), poly([[9.5, 16], [12, 18.5], [14.5, 16]])],
  },
  {
    slug: "resize-handle", category: "interface", subcategory: "action",
    name: "Resize handle", description: "Three diagonal grip lines in a corner — the handle you drag to resize a panel",
    tags: ["resize", "grip", "corner"], family: "object",
    aliases: [], keywords: ["resize handle", "drag to resize", "corner grip"],
    shapes: [poly([[21.5, 5.5], [5.5, 21.5]]), poly([[21.5, 12.5], [12.5, 21.5]]), poly([[21.5, 18.5], [18.5, 21.5]])],
  },
  {
    slug: "scoped-token", category: "security", subcategory: "auth",
    name: "Scoped token", description: "A token pill held between brackets — an access token limited to one scope",
    tags: ["token", "scope", "access"], family: "bracket",
    aliases: [], keywords: ["scoped token", "limited access token", "token scope"],
    shapes: [poly([[7, 3], [3, 3], [3, 21], [7, 21]]), poly([[17, 3], [21, 3], [21, 21], [17, 21]]), rect(8, 10, 8, 4, 2)],
  },
  {
    slug: "jitter", category: "automation", subcategory: "schedule",
    name: "Jitter", description: "A line that wobbles unevenly above a baseline — random jitter added to a schedule",
    tags: ["random", "delay", "retry"], family: "chart",
    aliases: [], keywords: ["jitter", "randomised delay", "retry jitter"],
    shapes: [poly([[3, 15], [8, 10], [10, 12], [14, 8], [17, 11], [21, 7]]), row(18, 3, 21)],
  },
];
