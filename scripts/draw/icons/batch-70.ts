/**
 * Batch 70 — round 19 of the 1k plan: how a model is wired, agents that step
 * and sync, everything a chat bubble can carry, keys checked and revoked, and
 * four more ways to chart a number.
 *
 * Unattended round. shadow-model stayed out (overlapping diamonds cannot keep
 * a stroke gap), mouse stayed out (a vertical capsule is not a legal rect).
 * Every name checked free before drawing.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_70: Icon[] = [
  /* ── ai: how a model is wired ─────────────────────────────────────────────────── */

  {
    slug: "stop-reason", category: "ai", subcategory: "inference",
    name: "Stop reason", description: "Text ending in a square stop mark — why the model stopped generating",
    tags: ["stop", "finish", "reason"], family: "text",
    aliases: [], keywords: ["stop reason", "finish reason", "end of generation"],
    shapes: [row(6, 3, 21), row(11, 3, 21), row(16, 3, 12), poly([[15, 14], [19, 14], [19, 18], [15, 18]], true)],
  },
  {
    slug: "eval-harness", category: "ai", subcategory: "training",
    name: "Eval harness", description: "A play button and a check inside one frame — the harness that runs evaluations and grades them",
    tags: ["eval", "run", "grade"], family: "window",
    aliases: [], keywords: ["evaluation harness", "eval runner", "benchmark harness"],
    shapes: [rect(3, 3, 18, 18, 2), poly([[8, 8], [8, 14], [11, 11]], true), poly([[12.5, 15.5], [14.5, 17.5], [18, 14]])],
  },
  {
    slug: "decoder-only", category: "ai", subcategory: "model",
    name: "Decoder-only", description: "A model core with an arrow leaving it — a decoder-only model that only generates",
    tags: ["decoder", "generate", "architecture"], family: "lattice",
    aliases: [], keywords: ["decoder-only model", "autoregressive model", "gpt architecture"],
    shapes: [poly([[8, 8], [12, 12], [8, 16], [4, 12]], true), row(12, 15, 21), poly([[18.5, 9.5], [21, 12], [18.5, 14.5]])],
  },
  {
    slug: "encoder-only", category: "ai", subcategory: "model",
    name: "Encoder-only", description: "An arrow entering a model core — an encoder-only model that reads and represents",
    tags: ["encoder", "represent", "architecture"], family: "lattice",
    aliases: [], keywords: ["encoder-only model", "bert architecture", "representation model"],
    shapes: [row(12, 3, 9), poly([[6.5, 9.5], [9, 12], [6.5, 14.5]]), poly([[16, 8], [20, 12], [16, 16], [12, 12]], true)],
  },
  {
    slug: "multi-head", category: "ai", subcategory: "model",
    name: "Multi-head", description: "Three heads rising from one model core — multi-head attention",
    tags: ["attention", "heads", "parallel"], family: "lattice",
    aliases: [], keywords: ["multi-head attention", "attention heads", "transformer"],
    shapes: [col(7, 3, 8), col(12, 3, 8), col(17, 3, 8), poly([[12, 11], [16, 15], [12, 19], [8, 15]], true)],
  },
  {
    slug: "needle-haystack", category: "ai", subcategory: "inference",
    name: "Needle in a haystack", description: "One point hidden among many lines — the needle-in-a-haystack test of long-context recall",
    tags: ["recall", "long-context", "test"], family: "text",
    aliases: [], keywords: ["needle in a haystack", "long context recall", "retrieval test"],
    shapes: [row(4, 3, 21), row(8, 3, 21), disc(12, 12, 1), row(16, 3, 21), row(20, 3, 21)],
  },
  {
    slug: "knowledge-cutoff", category: "ai", subcategory: "inference",
    name: "Knowledge cutoff", description: "A timeline that stops at a bar, with nothing known beyond it — a model's knowledge cutoff",
    tags: ["cutoff", "date", "training"], family: "arrow",
    aliases: [], keywords: ["knowledge cutoff", "training data cutoff", "cutoff date"],
    shapes: [row(12, 2, 12), col(15, 7, 17), poly([[18, 9.5], [21, 12.5]]), poly([[21, 9.5], [18, 12.5]])],
  },
  {
    slug: "fallback-model", category: "ai", subcategory: "model",
    name: "Fallback model", description: "A model core with a smaller one hanging beneath it — the fallback used when the first is unavailable",
    tags: ["fallback", "backup", "resilience"], family: "lattice",
    aliases: [], keywords: ["fallback model", "backup model", "model failover"],
    shapes: [poly([[12, 2.5], [16.5, 7], [12, 11.5], [7.5, 7]], true), col(12, 11.5, 16), poly([[12, 16], [14.5, 18.5], [12, 21], [9.5, 18.5]], true)],
  },
  {
    slug: "vision-encoder", category: "ai", subcategory: "model",
    name: "Vision encoder", description: "A picture beside a model core — the vision encoder that turns pixels into tokens",
    tags: ["vision", "encoder", "image"], family: "lattice",
    aliases: [], keywords: ["vision encoder", "image encoder", "vision tower"],
    shapes: [rect(2, 4, 10, 16, 2), poly([[5, 15], [7, 13], [9, 15]]), poly([[18.5, 9], [21.5, 12], [18.5, 15], [15.5, 12]], true)],
  },
  {
    slug: "translate-speech", category: "ai", subcategory: "inference",
    name: "Speech translation", description: "Sound waves passing through an arrow into new sound waves — speech translated in real time",
    tags: ["translate", "speech", "realtime"], family: "figure",
    aliases: [], keywords: ["speech translation", "real-time interpretation", "speech to speech"],
    shapes: [arc(8, 12, 3, 135, 225), arc(8, 12, 6, 135, 225), poly([[11.5, 9.5], [14, 12], [11.5, 14.5]]), arc(16, 12, 3, -45, 45), arc(16, 12, 6, -45, 45)],
  },
  {
    slug: "image-variation", category: "ai", subcategory: "inference",
    name: "Image variation", description: "A picture with alternative takes beneath it — variations generated from one image",
    tags: ["variation", "alternatives", "image"], family: "window",
    aliases: [], keywords: ["image variations", "generate alternatives", "remix image"],
    shapes: [rect(3, 3, 18, 12, 2), poly([[6, 11], [10, 7], [13, 10], [17, 6]]), disc(9, 19, 1), disc(15, 19, 1)],
  },
  {
    slug: "style-transfer", category: "ai", subcategory: "inference",
    name: "Style transfer", description: "A picture with a brushstroke sweeping across its lower half — one image painted in another's style",
    tags: ["style", "paint", "image"], family: "window",
    aliases: [], keywords: ["style transfer", "neural style", "restyle image"],
    shapes: [rect(3, 3, 18, 18, 2), poly([[7, 10], [10, 7], [12, 9], [15, 6]]), poly([[6, 16], [8, 14], [10, 16], [12, 14], [14, 16], [16, 14], [18, 16]])],
  },
  {
    slug: "nerf", category: "ai", subcategory: "inference",
    name: "Radiance field", description: "Rays converging on a point and leaving as one — a neural radiance field rendering a view",
    tags: ["3d", "rays", "render"], family: "figure",
    aliases: [], keywords: ["nerf", "neural radiance field", "novel view synthesis"],
    shapes: [poly([[3, 4], [8, 9]]), poly([[3, 20], [8, 15]]), disc(12, 12, 2), row(12, 17, 21)],
  },
  {
    slug: "confidence-score", category: "ai", subcategory: "inference",
    name: "Confidence score", description: "A check beside a set of score bars — how confident the model is in its answer",
    tags: ["confidence", "score", "certainty"], family: "chart",
    aliases: [], keywords: ["confidence score", "answer confidence", "certainty estimate"],
    shapes: [poly([[2, 14], [5, 17], [10, 12]]), col(14, 12, 18), col(17.5, 8, 18), col(21, 14, 18)],
  },
  {
    slug: "cheap-model", category: "ai", subcategory: "model",
    name: "Cheap model", description: "A small model core beside a coin — the inexpensive model you route easy requests to",
    tags: ["cost", "cheap", "routing"], family: "lattice",
    aliases: [], keywords: ["cheap model", "low-cost inference", "economy tier"],
    shapes: [poly([[6.5, 8.5], [10, 12], [6.5, 15.5], [3, 12]], true), disc(17.5, 12, 4.5), col(17.5, 10.5, 13.5)],
  },

  /* ── agents: step, sync, remember ─────────────────────────────────────────────── */

  {
    slug: "agent-outbox", category: "agents", subcategory: "communication",
    name: "Agent outbox", description: "An agent beside a tray with an arrow rising from it — the messages an agent has sent",
    tags: ["outbox", "sent", "tray"], family: "ring",
    aliases: [], keywords: ["agent outbox", "sent messages", "outgoing"],
    shapes: [arc(6, 7, 4, 295, 245), poly([[12, 15], [12, 21], [22, 21], [22, 15]]), col(17, 8, 13), poly([[14.5, 10.5], [17, 8], [19.5, 10.5]])],
  },
  {
    slug: "agent-user", category: "agents", subcategory: "communication",
    name: "Agent and user", description: "An agent beside a person — the human an agent works with and answers to",
    tags: ["user", "person", "human"], family: "ring",
    aliases: [], keywords: ["agent and user", "human in the loop", "user interaction"],
    shapes: [arc(7, 7, 4, 295, 245), disc(16.5, 12, 2), arc(16.5, 21, 4, 180, 360)],
  },
  {
    slug: "agent-step", category: "agents", subcategory: "execution",
    name: "Agent step", description: "An agent with a chevron ahead of it — advance an agent by a single step",
    tags: ["step", "next", "advance"], family: "ring",
    aliases: [], keywords: ["step agent", "single step", "next action"],
    shapes: [arc(7, 12, 4, 295, 245), poly([[14, 7], [19, 12], [14, 17]])],
  },
  {
    slug: "agent-back", category: "agents", subcategory: "execution",
    name: "Agent back", description: "A chevron pointing back from an agent — rewind an agent to its previous step",
    tags: ["back", "previous", "rewind"], family: "ring",
    aliases: [], keywords: ["agent back", "previous step", "step backwards"],
    shapes: [poly([[10, 7], [5, 12], [10, 17]]), arc(17, 12, 4, 295, 245)],
  },
  {
    slug: "agent-bookmark", category: "agents", subcategory: "memory",
    name: "Agent bookmark", description: "An agent beside a bookmark — a place an agent marked to return to",
    tags: ["bookmark", "save", "return"], family: "ring",
    aliases: [], keywords: ["agent bookmark", "saved place", "marked for later"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[13, 11], [21, 11], [21, 21], [17, 17], [13, 21]], true)],
  },
  {
    slug: "agent-goal", category: "agents", subcategory: "planning",
    name: "Agent goal", description: "An agent beside a target — the goal an agent is working toward",
    tags: ["goal", "target", "objective"], family: "ring",
    aliases: [], keywords: ["agent goal", "objective", "target outcome"],
    shapes: [arc(7, 7, 4, 295, 245), disc(16.5, 15.5, 4), disc(16.5, 15.5, 1)],
  },
  {
    slug: "agent-trend", category: "agents", subcategory: "reflection",
    name: "Agent trend", description: "An agent beside a rising line — how an agent's results trend over time",
    tags: ["trend", "metrics", "improve"], family: "ring",
    aliases: [], keywords: ["agent metrics", "performance trend", "agent analytics"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[12, 20], [15, 17], [17, 19], [21, 15]])],
  },
  {
    slug: "agent-filter", category: "agents", subcategory: "tool-use",
    name: "Agent filter", description: "An agent beside a funnel — an agent that filters and triages what comes in",
    tags: ["filter", "triage", "funnel"], family: "ring",
    aliases: [], keywords: ["filter agent", "triage agent", "screening"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[13, 11], [22, 11], [19, 14], [19, 21], [16, 21], [16, 14]], true)],
  },
  {
    slug: "agent-sync", category: "agents", subcategory: "communication",
    name: "Agent sync", description: "An agent beside two arrows going both ways — agents syncing state with each other",
    tags: ["sync", "exchange", "state"], family: "ring",
    aliases: [], keywords: ["agent sync", "state exchange", "two-way sync"],
    shapes: [arc(7, 7, 4, 295, 245), row(12, 13, 21), poly([[18.5, 9.5], [21, 12], [18.5, 14.5]]), row(19, 15, 21), poly([[17.5, 16.5], [15, 19], [17.5, 21.5]])],
  },
  {
    slug: "agent-power", category: "agents", subcategory: "lifecycle",
    name: "Agent power", description: "An agent beside a power symbol — switch an agent on or off in one press",
    tags: ["power", "on", "off"], family: "ring",
    aliases: [], keywords: ["agent power", "turn agent on", "switch off agent"],
    shapes: [arc(7, 7, 4, 295, 245), arc(16.5, 16, 4.5, -45, 225), col(16.5, 10, 15)],
  },
  {
    slug: "memory-consolidate", category: "agents", subcategory: "memory",
    name: "Memory consolidate", description: "Several notes folding into one compact memory — consolidating what an agent has learned",
    tags: ["memory", "consolidate", "compact"], family: "text",
    aliases: [], keywords: ["memory consolidation", "compact memories", "summarise memory"],
    shapes: [row(7, 2, 8), row(12, 2, 8), row(17, 2, 8), poly([[10, 9.5], [12.5, 12], [10, 14.5]]), rect(15.5, 10, 6.5, 4, 2)],
  },
  {
    slug: "memory-search", category: "agents", subcategory: "memory",
    name: "Memory search", description: "A magnifying glass over stored notes — searching an agent's memory",
    tags: ["memory", "search", "recall"], family: "text",
    aliases: [], keywords: ["memory search", "recall", "memory retrieval"],
    shapes: [row(6, 2, 9), row(11, 2, 9), row(16, 2, 9), disc(16, 10, 4), poly([[19, 13], [21.5, 15.5]])],
  },

  /* ── interface: everything a chat bubble can carry ────────────────────────────── */

  {
    slug: "chat-pin", category: "interface", subcategory: "communication",
    name: "Chat pin", description: "A speech bubble with a pin inside — a pinned message in a conversation",
    tags: ["pin", "chat", "message"], family: "bubble",
    aliases: [], keywords: ["pinned message", "pin chat", "pin conversation"],
    shapes: [rect(3, 3, 18, 14, 2), poly([[7, 17], [7, 20], [10, 17]]), disc(12, 8, 2), col(12, 10, 14)],
  },
  {
    slug: "chat-heart", category: "interface", subcategory: "communication",
    name: "Chat heart", description: "A speech bubble with a heart inside — a reaction on a message",
    tags: ["heart", "reaction", "like"], family: "bubble",
    aliases: [], keywords: ["message reaction", "heart reaction", "like a message"],
    shapes: [rect(3, 3, 18, 14, 2), poly([[7, 17], [7, 20], [10, 17]]), raw("M8 9A2 2 0 0 1 12 9A2 2 0 0 1 16 9L12 13Z", "a heart is one line, not three strokes with visible seams", true)],
  },
  {
    slug: "chat-forward", category: "interface", subcategory: "communication",
    name: "Chat forward", description: "A speech bubble with an arrow pointing onward — forward a message to someone else",
    tags: ["forward", "share", "message"], family: "bubble",
    aliases: [], keywords: ["forward message", "share message", "send onward"],
    shapes: [rect(3, 3, 18, 14, 2), poly([[7, 17], [7, 20], [10, 17]]), row(10, 7, 15.5), poly([[13, 7.5], [15.5, 10], [13, 12.5]])],
  },
  {
    slug: "chat-reply", category: "interface", subcategory: "communication",
    name: "Chat reply", description: "A speech bubble with an arrow pointing back — reply to a message",
    tags: ["reply", "respond", "message"], family: "bubble",
    aliases: [], keywords: ["reply to message", "respond", "message reply"],
    shapes: [rect(3, 3, 18, 14, 2), poly([[7, 17], [7, 20], [10, 17]]), row(10, 8.5, 17), poly([[11, 7.5], [8.5, 10], [11, 12.5]])],
  },
  {
    slug: "chat-image", category: "interface", subcategory: "communication",
    name: "Chat image", description: "A speech bubble holding a picture — an image sent in a conversation",
    tags: ["image", "photo", "message"], family: "bubble",
    aliases: [], keywords: ["image message", "send photo", "picture in chat"],
    shapes: [rect(3, 3, 18, 14, 2), poly([[7, 17], [7, 20], [10, 17]]), poly([[7, 13], [10, 10], [12, 12], [15, 9]])],
  },
  {
    slug: "chat-code", category: "interface", subcategory: "communication",
    name: "Chat code", description: "A speech bubble holding angle brackets — a code block sent in a conversation",
    tags: ["code", "snippet", "message"], family: "bubble",
    aliases: [], keywords: ["code message", "code block in chat", "share snippet"],
    shapes: [rect(3, 3, 18, 14, 2), poly([[7, 17], [7, 20], [10, 17]]), poly([[9.5, 7], [7, 9.5], [9.5, 12]]), poly([[14.5, 7], [17, 9.5], [14.5, 12]])],
  },
  {
    slug: "compose", category: "interface", subcategory: "communication",
    name: "Compose", description: "A speech bubble with a plus inside — start a new message or conversation",
    tags: ["new", "message", "write"], family: "bubble",
    aliases: [], keywords: ["compose message", "new conversation", "new chat"],
    shapes: [rect(3, 3, 18, 14, 2), poly([[7, 17], [7, 20], [10, 17]]), row(10, 9, 15), col(12, 7, 13)],
  },
  {
    slug: "quick-reply", category: "interface", subcategory: "communication",
    name: "Quick reply", description: "A speech bubble with a lightning bolt inside — a canned quick reply sent in one tap",
    tags: ["quick", "canned", "reply"], family: "bubble",
    aliases: [], keywords: ["quick reply", "canned response", "instant reply"],
    shapes: [rect(3, 3, 18, 14, 2), poly([[7, 17], [7, 20], [10, 17]]), poly([[13, 6], [10, 9], [13, 9], [10, 12]])],
  },
  {
    slug: "selection-box", category: "interface", subcategory: "action",
    name: "Selection box", description: "A box with a handle at each corner — the selection around an object on a canvas",
    tags: ["select", "handles", "canvas"], family: "object",
    aliases: [], keywords: ["selection box", "selection handles", "selected object"],
    shapes: [rect(6, 6, 12, 12, 2), disc(3, 3, 1), disc(21, 3, 1), disc(3, 21, 1), disc(21, 21, 1)],
  },
  {
    slug: "drop-shadow", category: "interface", subcategory: "action",
    name: "Drop shadow", description: "A square with its shadow offset behind it — the drop shadow effect",
    tags: ["shadow", "effect", "depth"], family: "object",
    aliases: [], keywords: ["drop shadow", "shadow effect", "elevation"],
    shapes: [rect(3, 3, 13, 13, 2), poly([[7, 19], [19, 19], [19, 7]])],
  },
  {
    slug: "webcam", category: "interface", subcategory: "media",
    name: "Webcam", description: "A camera lens on a small stand — the webcam used for calls and capture",
    tags: ["camera", "video", "call"], family: "device",
    aliases: [], keywords: ["webcam", "video call camera", "camera on"],
    shapes: [disc(12, 10, 5), disc(12, 10, 2), col(12, 15, 19), row(19, 8, 16)],
  },
  {
    slug: "smartwatch", category: "interface", subcategory: "time",
    name: "Smartwatch", description: "A watch face between its two straps — a smartwatch or wearable",
    tags: ["watch", "wearable", "device"], family: "device",
    aliases: [], keywords: ["smartwatch", "wearable", "watch app"],
    shapes: [rect(7, 6, 10, 12, 2), row(3, 9, 15), row(21, 9, 15)],
  },

  /* ── devtools, analytics, security, devops, cloud ─────────────────────────────── */

  {
    slug: "runner", category: "devtools", subcategory: "testing",
    name: "Runner", description: "A play button inside a box — the runner that executes a job or a test suite",
    tags: ["run", "job", "execute"], family: "window",
    aliases: [], keywords: ["job runner", "test runner", "ci runner"],
    shapes: [rect(3, 3, 18, 18, 2), poly([[10, 8], [10, 16], [14, 12]], true)],
  },
  {
    slug: "barrel-file", category: "devtools", subcategory: "package",
    name: "Barrel file", description: "Several imports feeding into one file — the barrel file that re-exports a folder",
    tags: ["export", "index", "module"], family: "page",
    aliases: [], keywords: ["barrel file", "index re-export", "module barrel"],
    shapes: [page(), row(9, 2, 6), row(12, 2, 6), row(15, 2, 6)],
  },
  {
    slug: "chart-dumbbell", category: "analytics", subcategory: "chart",
    name: "Dumbbell chart", description: "Pairs of points joined by a bar — a dumbbell chart comparing two values per row",
    tags: ["chart", "compare", "range"], family: "chart",
    aliases: [], keywords: ["dumbbell chart", "before and after", "range comparison"],
    shapes: [disc(5, 8, 2), disc(15, 8, 2), row(8, 7, 13), disc(9, 16, 2), disc(19, 16, 2), row(16, 11, 17)],
  },
  {
    slug: "chart-pyramid", category: "analytics", subcategory: "chart",
    name: "Pyramid chart", description: "Bars widening toward the base — a pyramid chart of tiers or population bands",
    tags: ["chart", "tiers", "pyramid"], family: "chart",
    aliases: [], keywords: ["pyramid chart", "tiered chart", "population pyramid"],
    shapes: [row(5, 8, 16), row(10, 6, 18), row(15, 4, 20), row(20, 2, 22)],
  },
  {
    slug: "chart-radial", category: "analytics", subcategory: "chart",
    name: "Radial chart", description: "Arcs of different lengths around one centre — a radial bar chart",
    tags: ["chart", "radial", "arcs"], family: "chart",
    aliases: [], keywords: ["radial bar chart", "circular progress chart", "radial gauge"],
    shapes: [arc(12, 12, 4, -90, 90), arc(12, 12, 7, -90, 180), arc(12, 12, 10, -90, 225)],
  },
  {
    slug: "chart-combo", category: "analytics", subcategory: "chart",
    name: "Combo chart", description: "Bars with a line running above them — a combo chart of two measures",
    tags: ["chart", "bars", "line"], family: "chart",
    aliases: [], keywords: ["combo chart", "bar and line chart", "dual measure"],
    shapes: [col(5, 13, 19), col(11, 12, 19), col(17, 15, 19), row(19, 3, 21), poly([[4, 9], [8, 5], [12, 9], [16, 5], [20, 9]])],
  },
  {
    slug: "key-verified", category: "security", subcategory: "auth",
    name: "Key verified", description: "A key with a check beside it — a credential that has been verified",
    tags: ["key", "verified", "valid"], family: "key",
    aliases: [], keywords: ["verified key", "valid credential", "key check"],
    shapes: [disc(8, 10, 4), col(8, 14, 21), row(18, 8, 11), poly([[14.5, 13.5], [17, 16], [21.5, 11.5]])],
  },
  {
    slug: "key-revoked", category: "security", subcategory: "auth",
    name: "Key revoked", description: "A key with an X beside it — a credential that has been revoked",
    tags: ["key", "revoked", "invalid"], family: "key",
    aliases: [], keywords: ["revoked key", "revoke credential", "invalid key"],
    shapes: [disc(8, 10, 4), col(8, 14, 21), row(18, 8, 11), poly([[15.5, 9.5], [20.5, 14.5]]), poly([[20.5, 9.5], [15.5, 14.5]])],
  },
  {
    slug: "privilege-escalation", category: "security", subcategory: "auth",
    name: "Privilege escalation", description: "A key with an arrow climbing beside it — privileges escalating beyond what was granted",
    tags: ["privilege", "escalate", "attack"], family: "key",
    aliases: [], keywords: ["privilege escalation", "elevated access", "escalation attack"],
    shapes: [disc(8, 10, 4), col(8, 14, 21), row(18, 8, 11), poly([[14, 15], [19, 10]]), poly([[15.5, 10], [19, 10], [19, 13.5]])],
  },
  {
    slug: "chaos-experiment", category: "devops", subcategory: "incident",
    name: "Chaos experiment", description: "A flask with lightning inside — a chaos experiment that injects failure on purpose",
    tags: ["chaos", "failure", "resilience"], family: "object",
    aliases: [], keywords: ["chaos engineering", "chaos experiment", "fault injection"],
    shapes: [poly([[10, 3], [14, 3], [14, 9], [20, 15], [20, 21], [4, 21], [4, 15], [10, 9]], true), poly([[12, 12], [9, 15], [12, 15], [9, 18]])],
  },
  {
    slug: "api-quota", category: "cloud", subcategory: "cost",
    name: "API quota", description: "Bars held between brackets — the quota an API key may consume",
    tags: ["quota", "limit", "usage"], family: "bracket",
    aliases: [], keywords: ["api quota", "usage limit", "quota remaining"],
    shapes: [poly([[7, 3], [3, 3], [3, 21], [7, 21]]), poly([[17, 3], [21, 3], [21, 21], [17, 21]]), col(9, 10, 16), col(12, 7, 16), col(15, 12, 16)],
  },
];
