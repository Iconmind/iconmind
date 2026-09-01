/**
 * Batch 67 — round 16 of the 1k plan: how a model thinks twice, the parts of a
 * screen that have names, agents with tools in hand, and the last honest
 * names in devtools and data.
 *
 * Unattended round. Concepts whose only honest drawing already ships stayed
 * out (focus-ring is strict-mode, marquee floats, avatar-group crosses four
 * times). Every name checked free before drawing.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { dial, page, ring } from "../bodies.ts";
import { add, BIG, lockMark, searchMark } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_67: Icon[] = [
  /* ── ai: thinking twice ───────────────────────────────────────────────────────── */

  {
    slug: "think-longer", category: "ai", subcategory: "inference",
    name: "Think longer", description: "A timer dial with thinking dots on its face — give the model more time to answer",
    tags: ["reasoning", "time", "budget"], family: "orbit",
    aliases: [], keywords: ["extended thinking", "thinking budget", "reasoning effort"],
    shapes: [...dial(), disc(8, 14, 1), disc(12, 14, 1), disc(16, 14, 1)],
  },
  {
    slug: "self-reflect", category: "ai", subcategory: "inference",
    name: "Self-reflect", description: "An agent above its own reflection — a model reviewing its answer before it commits",
    tags: ["reflection", "critique", "review"], family: "ring",
    aliases: [], keywords: ["self reflection", "self critique", "reflexion"],
    shapes: [arc(12, 6, 4, 295, 245), row(13, 5, 19), arc(12, 19, 3, 115, 65)],
  },
  {
    slug: "contradiction", category: "ai", subcategory: "inference",
    name: "Contradiction", description: "Two arrows meeting head-on — statements that cannot both be true, flagged as a contradiction",
    tags: ["conflict", "inconsistent", "clash"], family: "arrow",
    aliases: [], keywords: ["contradiction detection", "inconsistent claims", "conflicting statements"],
    shapes: [row(12, 2, 10), poly([[6, 8], [10, 12], [6, 16]]), row(12, 14, 22), poly([[18, 8], [14, 12], [18, 16]])],
  },
  {
    slug: "paraphrase", category: "ai", subcategory: "inference",
    name: "Paraphrase", description: "Two lines of text exchanging places — rewriting a passage in different words",
    tags: ["rewrite", "reword", "text"], family: "text",
    aliases: [], keywords: ["paraphrase", "rewrite text", "reword"],
    shapes: [row(6, 3, 21), row(18, 3, 21), col(8, 9, 15), poly([[5.5, 12.5], [8, 15], [10.5, 12.5]]), col(16, 9, 15), poly([[13.5, 11.5], [16, 9], [18.5, 11.5]])],
  },
  {
    slug: "tiny-model", category: "ai", subcategory: "model",
    name: "Tiny model", description: "The model frame, drawn small — a compact model that fits on a phone or at the edge",
    tags: ["small", "compact", "edge"], family: "window",
    aliases: [], keywords: ["small language model", "tiny model", "on-device model"],
    shapes: [frame(5, 5, 14, 14, 3, { chamfer: 3, gap: 3 })],
  },
  {
    slug: "outpaint", category: "ai", subcategory: "inference",
    name: "Outpaint", description: "A picture with an open frame extending past its edge — outpainting beyond the original canvas",
    tags: ["extend", "canvas", "generate"], family: "window",
    aliases: [], keywords: ["outpainting", "extend image", "generative expand"],
    shapes: [rect(2, 7, 12, 10, 2), poly([[5, 14], [7.5, 11.5], [10, 14]]), poly([[17, 7], [21, 7], [21, 17], [17, 17]])],
  },
  {
    slug: "negative-prompt", category: "ai", subcategory: "inference",
    name: "Negative prompt", description: "A speech bubble holding a minus — the negative prompt that tells a model what to leave out",
    tags: ["exclude", "prompt", "minus"], family: "bubble",
    aliases: [], keywords: ["negative prompt", "exclude from generation", "prompt constraint"],
    shapes: [rect(3, 4, 18, 12, 2), poly([[7, 16], [7, 19], [10, 16]]), row(10, 8, 16)],
  },
  {
    slug: "latent", category: "ai", subcategory: "model",
    name: "Latent", description: "Two triangles meeting at a narrow waist — the compressed latent space between encoder and decoder",
    tags: ["hidden", "space", "bottleneck"], family: "figure",
    aliases: [], keywords: ["latent space", "latent variable", "hidden representation"],
    shapes: [poly([[3, 4.5], [10.5, 12], [3, 19.5]], true), poly([[21, 4.5], [13.5, 12], [21, 19.5]], true)],
  },
  {
    slug: "ocr-ai", category: "ai", subcategory: "inference",
    name: "OCR", description: "A scan line sweeping across a page of text — optical character recognition that reads documents",
    tags: ["scan", "read", "document"], family: "page",
    aliases: [], keywords: ["ocr", "optical character recognition", "document scanning"],
    shapes: [page(), row(7, 9, 15), row(12, 3, 21), row(17, 9, 15)],
  },
  {
    slug: "ensemble", category: "ai", subcategory: "model",
    name: "Ensemble", description: "Three model cores arranged together — an ensemble whose answers are combined",
    tags: ["combine", "models", "vote"], family: "lattice",
    aliases: [], keywords: ["model ensemble", "ensemble learning", "combined models"],
    shapes: [poly([[12, 3], [15, 6], [12, 9], [9, 6]], true), poly([[7, 13], [10, 16], [7, 19], [4, 16]], true), poly([[17, 13], [20, 16], [17, 19], [14, 16]], true)],
  },
  {
    slug: "cascade", category: "ai", subcategory: "model",
    name: "Cascade", description: "Model cores stepping down a diagonal — a cascade that escalates from cheap models to strong ones",
    tags: ["escalate", "tiers", "fallback"], family: "chain",
    aliases: [], keywords: ["model cascade", "tiered inference", "escalation"],
    shapes: [poly([[5, 2.5], [7.5, 5], [5, 7.5], [2.5, 5]], true), poly([[12, 9.5], [14.5, 12], [12, 14.5], [9.5, 12]], true), poly([[19, 16.5], [21.5, 19], [19, 21.5], [16.5, 19]], true)],
  },
  {
    slug: "cite-sources", category: "ai", subcategory: "inference",
    name: "Cite sources", description: "Text with a superscript reference mark — an answer that cites where its claims came from",
    tags: ["citation", "reference", "source"], family: "text",
    aliases: [], keywords: ["cite sources", "citations", "referenced answer"],
    shapes: [row(8, 3, 14), disc(19, 7, 2), row(13, 3, 21), row(18, 3, 21)],
  },
  {
    slug: "transcribe-live", category: "ai", subcategory: "inference",
    name: "Live transcription", description: "Lines of text above a live waveform — speech transcribed as it is spoken",
    tags: ["transcribe", "realtime", "speech"], family: "text",
    aliases: [], keywords: ["live transcription", "real-time captions", "streaming speech to text"],
    shapes: [row(5, 3, 21), row(10, 3, 21), poly([[3, 17], [7, 17], [9.5, 14.5], [12, 17], [14.5, 14.5], [17, 17], [21, 17]])],
  },
  {
    slug: "voice-clone", category: "ai", subcategory: "inference",
    name: "Voice clone", description: "Two identical sets of sound waves — a voice cloned from a short sample",
    tags: ["voice", "clone", "audio"], family: "figure",
    aliases: [], keywords: ["voice cloning", "speaker cloning", "synthetic voice"],
    shapes: [arc(8, 12, 3, 135, 225), arc(8, 12, 6, 135, 225), arc(16, 12, 3, -45, 45), arc(16, 12, 6, -45, 45)],
  },
  {
    slug: "reasoning-trace", category: "ai", subcategory: "inference",
    name: "Reasoning trace", description: "Lines of thought stepping down and to the right — the visible trace of a model's reasoning",
    tags: ["trace", "steps", "thought"], family: "text",
    aliases: [], keywords: ["reasoning trace", "chain of thought", "thinking steps"],
    shapes: [row(5, 3, 10), row(10, 7, 14), row(15, 11, 18), row(20, 15, 22)],
  },

  /* ── interface: the parts of a screen that have names ─────────────────────────── */

  {
    slug: "swatch", category: "interface", subcategory: "media",
    name: "Swatch", description: "A card with a colour block and its name beneath — a swatch from a palette",
    tags: ["colour", "palette", "sample"], family: "card",
    aliases: [], keywords: ["colour swatch", "palette sample", "design token"],
    shapes: [rect(4, 2, 16, 20, 2), rect(7, 5, 10, 7, 2), row(15, 7, 17), row(18.5, 7, 14)],
  },
  {
    slug: "group-objects", category: "interface", subcategory: "action",
    name: "Group objects", description: "Two objects inside one set of selection corners — grouping layers so they move together",
    tags: ["group", "select", "layers"], family: "object",
    aliases: [], keywords: ["group objects", "group layers", "grouped selection"],
    shapes: [rect(2, 8, 8, 8, 2), rect(14, 8, 8, 8, 2), poly([[2, 4.5], [2, 2], [4.5, 2]]), poly([[19.5, 2], [22, 2], [22, 4.5]]), poly([[2, 19.5], [2, 22], [4.5, 22]]), poly([[19.5, 22], [22, 22], [22, 19.5]])],
  },
  {
    slug: "pull-refresh", category: "interface", subcategory: "action",
    name: "Pull to refresh", description: "A double chevron above a list — pull the top of a feed down to refresh it",
    tags: ["refresh", "pull", "gesture"], family: "text",
    aliases: [], keywords: ["pull to refresh", "refresh gesture", "reload feed"],
    shapes: [poly([[9.5, 3], [12, 5.5], [14.5, 3]]), poly([[9.5, 7.5], [12, 10], [14.5, 7.5]]), row(14, 3, 21), row(19, 3, 21)],
  },
  {
    slug: "dependency-arrow", category: "interface", subcategory: "layout",
    name: "Dependency arrow", description: "An elbow connector from one task bar to the next — a dependency between items on a timeline",
    tags: ["dependency", "gantt", "link"], family: "card",
    aliases: [], keywords: ["task dependency", "gantt link", "blocked by"],
    shapes: [rect(2, 3, 9, 4, 2), poly([[6.5, 7], [6.5, 12], [17.5, 12], [17.5, 17]]), rect(13, 17, 9, 4, 2)],
  },
  {
    slug: "pin-item", category: "interface", subcategory: "action",
    name: "Pin item", description: "A pin beside one row of a list — pin an item so it stays at the top",
    tags: ["pin", "sticky", "list"], family: "text",
    aliases: [], keywords: ["pin item", "pinned message", "keep on top"],
    shapes: [row(5, 3, 21), row(12, 3, 12), disc(18, 10, 2), col(18, 12, 15), row(19, 3, 21)],
  },
  {
    slug: "underline-wavy", category: "interface", subcategory: "state",
    name: "Wavy underline", description: "Text with a wavy line beneath it — the squiggle that marks a spelling or lint problem",
    tags: ["squiggle", "spellcheck", "lint"], family: "text",
    aliases: [], keywords: ["wavy underline", "spellcheck squiggle", "error underline"],
    shapes: [row(4, 3, 21), row(9, 3, 21), poly([[3, 16], [5.5, 13.5], [8, 16], [10.5, 13.5], [13, 16], [15.5, 13.5], [18, 16], [20.5, 13.5]])],
  },
  {
    slug: "tooltip", category: "interface", subcategory: "communication",
    name: "Tooltip", description: "A small bubble pointing down at a target — the tooltip that appears on hover",
    tags: ["hover", "hint", "bubble"], family: "bubble",
    aliases: [], keywords: ["tooltip", "hover hint", "popover label"],
    shapes: [rect(3, 4, 18, 10, 2), row(9, 7, 17), poly([[9.5, 14], [12, 16.5], [14.5, 14]]), disc(12, 20.5, 1)],
  },
  {
    slug: "modal", category: "interface", subcategory: "layout",
    name: "Modal", description: "A dialog card floating over the page behind it — a modal that must be dismissed first",
    tags: ["dialog", "overlay", "window"], family: "window",
    aliases: [], keywords: ["modal dialog", "overlay window", "popup"],
    shapes: [rect(2, 2, 20, 20, 2), rect(6, 7, 12, 10, 2), row(11, 9, 15)],
  },
  {
    slug: "carousel", category: "interface", subcategory: "media",
    name: "Carousel", description: "A slide between two chevrons with page dots beneath — a carousel of images or cards",
    tags: ["slider", "slides", "gallery"], family: "card",
    aliases: [], keywords: ["carousel", "image slider", "slideshow"],
    shapes: [rect(7, 3, 10, 13, 2), poly([[4, 7], [2, 9], [4, 11]]), poly([[20, 7], [22, 9], [20, 11]]), disc(7, 20, 1), disc(12, 20, 1), disc(17, 20, 1)],
  },
  {
    slug: "accordion", category: "interface", subcategory: "layout",
    name: "Accordion", description: "Three headings with chevrons, one of them open — an accordion of collapsible sections",
    tags: ["collapse", "expand", "sections"], family: "text",
    aliases: [], keywords: ["accordion", "collapsible sections", "expandable list"],
    shapes: [row(5, 3, 14), poly([[17, 3.5], [19, 5.5], [21, 3.5]]), row(12, 3, 14), poly([[17, 13.5], [19, 11.5], [21, 13.5]]), row(19, 3, 14), poly([[17, 17.5], [19, 19.5], [21, 17.5]])],
  },
  {
    slug: "tree-view", category: "interface", subcategory: "layout",
    name: "Tree view", description: "A root with two children hanging from guide lines — a tree view of nested items",
    tags: ["tree", "nested", "hierarchy"], family: "text",
    aliases: [], keywords: ["tree view", "nested list", "file tree"],
    shapes: [row(4, 4, 21), col(4, 4, 18), row(11, 4, 8), row(11, 11, 21), row(18, 4, 8), row(18, 11, 21)],
  },
  {
    slug: "badge-count", category: "interface", subcategory: "state",
    name: "Badge count", description: "A card with a small badge at its corner — the unread count on an icon",
    tags: ["badge", "unread", "notification"], family: "card",
    aliases: [], keywords: ["notification badge", "unread count", "badge indicator"],
    shapes: [rect(2, 7, 12, 13, 2), disc(19, 6, 2)],
  },
  {
    slug: "bottom-nav", category: "interface", subcategory: "layout",
    name: "Bottom navigation", description: "A screen with a bar of three destinations along its foot — mobile bottom navigation",
    tags: ["navigation", "tabs", "mobile"], family: "window",
    aliases: [], keywords: ["bottom navigation", "tab bar", "mobile nav"],
    shapes: [rect(3, 3, 18, 18, 2), row(13, 3, 21), disc(7, 17, 1), disc(12, 17, 1), disc(17, 17, 1)],
  },
  {
    slug: "cursor", category: "interface", subcategory: "action",
    name: "Cursor", description: "The mouse pointer arrow — the cursor that clicks, drags and hovers",
    tags: ["pointer", "mouse", "click"], family: "object",
    aliases: ["mouse-pointer"], keywords: ["mouse cursor", "pointer arrow", "click"],
    shapes: [poly([[7, 3], [7, 18.5], [10, 15.5], [13.5, 19], [16, 16.5], [12.5, 13], [17, 13]], true)],
  },
  {
    slug: "tag", category: "interface", subcategory: "identity",
    name: "Tag", description: "A label tag with a hole for its string — tagging and labelling items",
    tags: ["label", "tag", "category"], family: "object",
    aliases: [], keywords: ["tag", "label", "price tag"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), disc(7, 10, 1)],
  },

  /* ── agents: tools in hand ─────────────────────────────────────────────────────── */

  {
    slug: "file-agent", category: "agents", subcategory: "tool-use",
    name: "File agent", description: "An agent beside a document — an agent that reads, writes and organises files",
    tags: ["file", "document", "read"], family: "ring",
    aliases: [], keywords: ["file agent", "document agent", "file operations"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[19, 12], [13, 12], [13, 21], [22, 21], [22, 15]])],
  },
  {
    slug: "leash-short", category: "agents", subcategory: "lifecycle",
    name: "Short leash", description: "An agent tethered close to its post — tight limits on what it may do unsupervised",
    tags: ["limit", "tether", "autonomy"], family: "ring",
    aliases: [], keywords: ["short leash", "restricted autonomy", "tight guardrails"],
    shapes: [arc(9, 12, 5, 295, 245), row(12, 14, 17), col(17, 5, 19)],
  },
  {
    slug: "leash-long", category: "agents", subcategory: "lifecycle",
    name: "Long leash", description: "An agent on a long tether from its post — wide latitude to act before checking in",
    tags: ["latitude", "tether", "autonomy"], family: "ring",
    aliases: [], keywords: ["long leash", "high autonomy", "loose guardrails"],
    shapes: [arc(6, 12, 4, 295, 245), row(12, 10, 20), col(20, 5, 19)],
  },
  {
    slug: "desktop-agent", category: "agents", subcategory: "tool-use",
    name: "Desktop agent", description: "An agent inside a monitor on its stand — an agent that operates a desktop computer",
    tags: ["desktop", "computer-use", "screen"], family: "ring",
    aliases: [], keywords: ["desktop agent", "computer use", "screen automation"],
    shapes: [rect(3, 3, 18, 13, 2), arc(12, 9.5, 3.5, 295, 245), col(12, 16, 20), row(20, 8, 16)],
  },
  {
    slug: "web-navigator", category: "agents", subcategory: "tool-use",
    name: "Web navigator", description: "An agent inside a browser window — an agent that browses and navigates the web",
    tags: ["browser", "navigate", "web"], family: "ring",
    aliases: [], keywords: ["browser agent", "web navigation", "browsing agent"],
    shapes: [rect(2, 2, 20, 20, 2), row(7, 2, 22), arc(12, 14.5, 3, 295, 245)],
  },
  {
    slug: "agent-search", category: "agents", subcategory: "tool-use",
    name: "Agent search", description: "An agent with a magnifying glass — an agent that searches and researches on your behalf",
    tags: ["search", "research", "find"], family: "orbit",
    aliases: [], keywords: ["research agent", "search agent", "deep research"],
    shapes: [ring(), ...searchMark()],
  },
  {
    slug: "agent-lock", category: "agents", subcategory: "lifecycle",
    name: "Agent lock", description: "An agent beside a padlock — an agent locked to its permissions and scope",
    tags: ["lock", "permission", "scope"], family: "orbit",
    aliases: [], keywords: ["locked agent", "agent permissions", "scoped access"],
    shapes: [ring(), ...lockMark()],
  },
  {
    slug: "agent-terminal", category: "agents", subcategory: "tool-use",
    name: "Agent terminal", description: "An agent beside a terminal prompt — an agent that runs shell commands",
    tags: ["terminal", "shell", "command"], family: "ring",
    aliases: [], keywords: ["terminal agent", "shell agent", "command line agent"],
    shapes: [arc(7, 7, 4, 295, 245), rect(11, 11, 11, 11, 2), poly([[14, 14], [16, 16], [14, 18]])],
  },
  {
    slug: "agent-email", category: "agents", subcategory: "tool-use",
    name: "Agent email", description: "An agent beside an envelope — an agent that reads and sends email",
    tags: ["email", "inbox", "send"], family: "ring",
    aliases: [], keywords: ["email agent", "inbox agent", "mail automation"],
    shapes: [arc(7, 7, 4, 295, 245), rect(12, 12, 10, 9, 2), poly([[14, 12], [17, 15], [20, 12]])],
  },
  {
    slug: "agent-code", category: "agents", subcategory: "tool-use",
    name: "Agent code", description: "An agent beside a pair of angle brackets — a coding agent that writes and edits source",
    tags: ["code", "developer", "write"], family: "ring",
    aliases: [], keywords: ["coding agent", "code generation agent", "ai developer"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[14, 13], [11.5, 15.5], [14, 18]]), poly([[19, 13], [21.5, 15.5], [19, 18]])],
  },

  /* ── devtools, data, analytics: the last honest names ─────────────────────────── */

  {
    slug: "call-stack", category: "devtools", subcategory: "debug",
    name: "Call stack", description: "Frames stacked from widest to narrowest — the call stack a debugger walks",
    tags: ["stack", "frames", "debug"], family: "card",
    aliases: [], keywords: ["call stack", "stack frames", "stack trace"],
    shapes: [rect(3, 3, 18, 4, 2), rect(3, 10, 14, 4, 2), rect(3, 17, 10, 4, 2)],
  },
  {
    slug: "generative-test", category: "devtools", subcategory: "testing",
    name: "Generative test", description: "A die showing three — property-based tests that roll random inputs",
    tags: ["property", "random", "fuzz"], family: "window",
    aliases: [], keywords: ["property-based testing", "generative testing", "fuzzing"],
    shapes: [rect(3, 3, 18, 18, 2), disc(8, 8, 1), disc(12, 12, 1), disc(16, 16, 1)],
  },
  {
    slug: "mutant-kill", category: "devtools", subcategory: "testing",
    name: "Mutant kill", description: "A crossed-out mutant — a mutation the test suite caught and killed",
    tags: ["mutation", "test", "kill"], family: "lattice",
    aliases: [], keywords: ["mutation testing", "killed mutant", "test strength"],
    shapes: [poly([[12, 4], [20, 12], [12, 20], [4, 12]], true), poly([[10.5, 10.5], [13.5, 13.5]]), poly([[10.5, 13.5], [13.5, 10.5]])],
  },
  {
    slug: "cherry-pick", category: "devtools", subcategory: "version-control",
    name: "Cherry-pick", description: "One commit lifted straight out of a row of commits — cherry-picking a single change",
    tags: ["git", "commit", "pick"], family: "node",
    aliases: [], keywords: ["git cherry-pick", "pick a commit", "selective merge"],
    shapes: [disc(5, 17, 2), disc(12, 17, 2), disc(19, 17, 2), disc(12, 5, 2), col(12, 7, 15)],
  },
  {
    slug: "dotfile", category: "devtools", subcategory: "package",
    name: "Dotfile", description: "A page with a single dot on it — the hidden dotfile that configures a tool",
    tags: ["config", "hidden", "file"], family: "page",
    aliases: [], keywords: ["dotfile", "hidden config", "rc file"],
    shapes: [page(), disc(12, 14, 2)],
  },
  {
    slug: "null-fill", category: "data", subcategory: "quality",
    name: "Null fill", description: "A dot filling the gap in a row — replacing missing values with a default",
    tags: ["missing", "impute", "default"], family: "text",
    aliases: [], keywords: ["null fill", "fill missing values", "imputation"],
    shapes: [row(5, 3, 21), row(10, 3, 7), disc(12, 10, 2), row(10, 17, 21), row(15, 3, 21)],
  },
  {
    slug: "winsorize", category: "data", subcategory: "quality",
    name: "Winsorize", description: "A clip line cutting across the tallest bar — capping extreme values at a threshold",
    tags: ["clip", "outlier", "cap"], family: "chart",
    aliases: [], keywords: ["winsorize", "clip outliers", "cap values"],
    shapes: [col(6, 11, 18), col(12, 6, 18), col(18, 12, 18), row(8, 3, 21), row(18, 3, 21)],
  },
  {
    slug: "z-order", category: "data", subcategory: "catalog",
    name: "Z-order", description: "A Z traced through the grid — z-order clustering that keeps nearby rows together",
    tags: ["cluster", "layout", "locality"], family: "glyph",
    aliases: [], keywords: ["z-order", "z-ordering", "data clustering"],
    shapes: [poly([[4, 5], [20, 5], [6, 19], [22, 19]])],
  },
  {
    slug: "volume-anomaly", category: "data", subcategory: "quality",
    name: "Volume anomaly", description: "One bar spiking far above its neighbours — a sudden anomaly in data volume",
    tags: ["spike", "volume", "alert"], family: "chart",
    aliases: [], keywords: ["volume anomaly", "traffic spike", "row count alert"],
    shapes: [col(4, 14, 19), col(8, 11, 19), col(12, 3, 19), col(16, 12, 19), col(20, 15, 19), row(19, 2, 22)],
  },
  {
    slug: "candlestick", category: "analytics", subcategory: "chart",
    name: "Candlestick", description: "Two candles with their wicks — a candlestick chart of open, high, low and close",
    tags: ["chart", "finance", "ohlc"], family: "chart",
    aliases: [], keywords: ["candlestick chart", "ohlc", "price chart"],
    shapes: [col(5.5, 3, 8), rect(2, 8, 7, 8, 2), col(5.5, 16, 21), col(16.5, 2, 5), rect(13, 5, 7, 10, 2), col(16.5, 15, 20)],
  },
];
