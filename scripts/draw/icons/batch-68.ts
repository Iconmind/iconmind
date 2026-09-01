/**
 * Batch 68 — round 17 of the 1k plan: sound and noise, the curves a training
 * run draws, the furniture of a screen, agents holding keys and shields, and
 * two circuits.
 *
 * Unattended round. agent-retry and agent-resume stayed out (an arrow head
 * cannot sit inside a ring that small; agent-run already ships the play
 * triangle). Every name checked free before drawing.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { page, ring } from "../bodies.ts";
import { keyMark, shieldMark, tagMark } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_68: Icon[] = [
  /* ── ai: sound, noise and the curves of a training run ────────────────────────── */

  {
    slug: "audio-denoise", category: "ai", subcategory: "inference",
    name: "Audio denoise", description: "A jagged waveform settling into a flat line — removing noise from an audio recording",
    tags: ["audio", "noise", "clean"], family: "figure",
    aliases: [], keywords: ["audio denoising", "noise removal", "clean audio"],
    shapes: [poly([[3, 7], [6, 4], [9, 7], [12, 4], [15, 7], [18, 4], [21, 7]]), poly([[9.5, 10.5], [12, 13], [14.5, 10.5]]), row(17, 3, 21)],
  },
  {
    slug: "sound-effect", category: "ai", subcategory: "inference",
    name: "Sound effect", description: "A lightning bolt with sound waves beside it — generated sound effects and foley",
    tags: ["sfx", "audio", "generate"], family: "figure",
    aliases: [], keywords: ["sound effect generation", "generated sfx", "text to audio"],
    shapes: [poly([[11, 5], [6, 10], [10, 10], [5, 15]]), arc(14, 13, 3, -45, 45), arc(14, 13, 6, -45, 45)],
  },
  {
    slug: "text-to-video", category: "ai", subcategory: "inference",
    name: "Text to video", description: "Lines of text pointing at a strip of film — text-to-video generation from a prompt",
    tags: ["video", "generate", "prompt"], family: "window",
    aliases: [], keywords: ["text to video", "video generation", "prompt to video"],
    shapes: [row(4, 2, 10), row(8, 2, 10), poly([[4, 11.5], [7, 14.5], [4, 17.5]]), rect(11, 11, 11, 11, 2), col(14, 11, 22), col(19, 11, 22)],
  },
  {
    slug: "seed", category: "ai", subcategory: "inference",
    name: "Seed", description: "A seed sending up a sprout with two leaves — the random seed a generation grows from",
    tags: ["random", "reproducible", "sprout"], family: "figure",
    aliases: [], keywords: ["random seed", "generation seed", "reproducible output"],
    shapes: [disc(12, 18, 3), col(12, 5, 15), poly([[12, 8], [8, 4]]), poly([[12, 11], [16, 7]])],
  },
  {
    slug: "texture-gen", category: "ai", subcategory: "inference",
    name: "Texture generation", description: "A square filled with diagonal hatching — a tileable texture generated for a surface",
    tags: ["texture", "material", "3d"], family: "window",
    aliases: [], keywords: ["texture generation", "material synthesis", "pbr texture"],
    shapes: [rect(3, 3, 18, 18, 2), poly([[6, 12], [12, 6]]), poly([[6, 18], [18, 6]]), poly([[12, 18], [18, 12]])],
  },
  {
    slug: "sample-consensus", category: "ai", subcategory: "inference",
    name: "Sample consensus", description: "Several sampled answers and one check for the answer they agree on — self-consistency voting",
    tags: ["vote", "samples", "agree"], family: "text",
    aliases: [], keywords: ["self-consistency", "majority vote", "sampled answers"],
    shapes: [row(6, 2, 12), row(11, 2, 12), row(16, 2, 12), poly([[15, 12], [17.5, 14.5], [22, 10]])],
  },
  {
    slug: "fast-thinking", category: "ai", subcategory: "inference",
    name: "Fast thinking", description: "A lightning bolt inside a ring — the quick, intuitive answer given without deliberation",
    tags: ["quick", "intuitive", "system-1"], family: "ring",
    aliases: [], keywords: ["fast thinking", "system 1", "quick answer"],
    shapes: [disc(12, 12, 9), poly([[14, 7], [9, 12], [13, 12], [10, 15]])],
  },
  {
    slug: "model-archive", category: "ai", subcategory: "model",
    name: "Model archive", description: "A model core above an open storage tray — a retired model archived for the record",
    tags: ["archive", "retire", "store"], family: "lattice",
    aliases: [], keywords: ["model archive", "retired model", "model storage"],
    shapes: [poly([[12, 3], [17, 8], [12, 13], [7, 8]], true), poly([[3, 15], [3, 21], [21, 21], [21, 15]])],
  },
  {
    slug: "calibration", category: "ai", subcategory: "training",
    name: "Calibration", description: "Points scattered close to the identity line — how well a model's confidence matches its accuracy",
    tags: ["confidence", "accuracy", "reliability"], family: "chart",
    aliases: [], keywords: ["model calibration", "reliability diagram", "confidence calibration"],
    shapes: [poly([[3, 3], [3, 21], [21, 21]]), poly([[6, 18], [18, 6]]), disc(9, 9, 1), disc(15, 15, 1)],
  },
  {
    slug: "roc-curve", category: "ai", subcategory: "training",
    name: "ROC curve", description: "A curve bowing above the chance diagonal — the ROC curve of a classifier",
    tags: ["classifier", "auc", "curve"], family: "chart",
    aliases: [], keywords: ["roc curve", "auc", "true positive rate"],
    shapes: [poly([[3, 3], [3, 21], [21, 21]]), poly([[6, 18], [6, 12], [12, 6], [18, 6]]), poly([[6, 18], [18, 6]])],
  },
  {
    slug: "precision-recall", category: "ai", subcategory: "training",
    name: "Precision-recall", description: "A curve that holds high then falls away — the precision-recall trade-off of a classifier",
    tags: ["precision", "recall", "curve"], family: "chart",
    aliases: [], keywords: ["precision recall curve", "pr curve", "classifier trade-off"],
    shapes: [poly([[3, 3], [3, 21], [21, 21]]), poly([[6, 6], [12, 6], [18, 12], [18, 18]])],
  },
  {
    slug: "draft-model", category: "ai", subcategory: "model",
    name: "Draft model", description: "A small model core beside a large one — the draft model that proposes tokens for the big model to verify",
    tags: ["speculative", "draft", "verify"], family: "lattice",
    aliases: [], keywords: ["draft model", "speculative decoding", "assisted generation"],
    shapes: [poly([[5, 9.5], [7.5, 12], [5, 14.5], [2.5, 12]], true), poly([[16.5, 6.5], [22, 12], [16.5, 17.5], [11, 12]], true)],
  },
  {
    slug: "lip-sync", category: "ai", subcategory: "inference",
    name: "Lip sync", description: "A mouth with sound waves beside it — matching lip movement to generated or dubbed speech",
    tags: ["mouth", "speech", "video"], family: "figure",
    aliases: [], keywords: ["lip sync", "talking head", "dubbing"],
    shapes: [arc(9, 10, 5.5, 0, 180), arc(17, 10, 3, -45, 45), arc(17, 10, 5, -45, 45)],
  },
  {
    slug: "noise-schedule", category: "ai", subcategory: "training",
    name: "Noise schedule", description: "Dots shrinking step by step along a diagonal — the noise schedule of a diffusion process",
    tags: ["diffusion", "schedule", "steps"], family: "figure",
    aliases: [], keywords: ["noise schedule", "diffusion steps", "denoising schedule"],
    shapes: [disc(5, 5, 3), disc(12, 9.5, 2), disc(17, 13.5, 1), disc(21, 17.5, 1)],
  },
  {
    slug: "point-cloud", category: "ai", subcategory: "inference",
    name: "Point cloud", description: "Six points hanging in space — a 3D point cloud from a scanner or depth model",
    tags: ["3d", "lidar", "points"], family: "figure",
    aliases: [], keywords: ["point cloud", "lidar scan", "3d points"],
    shapes: [disc(5, 7, 1), disc(12, 4, 1), disc(19, 7, 1), disc(5, 17, 1), disc(12, 20, 1), disc(19, 17, 1)],
  },
  {
    slug: "speaker-diarize", category: "ai", subcategory: "inference",
    name: "Speaker diarization", description: "Two speakers above one shared waveform — telling apart who said what in a recording",
    tags: ["speakers", "audio", "who"], family: "ring",
    aliases: [], keywords: ["speaker diarization", "who spoke when", "speaker separation"],
    shapes: [arc(6.5, 7, 4, 295, 245), arc(17.5, 7, 4, 295, 245), poly([[3, 17], [6, 14], [9, 17], [12, 14], [15, 17], [18, 14], [21, 17]])],
  },

  /* ── interface: the furniture of a screen ─────────────────────────────────────── */

  {
    slug: "chip-input", category: "interface", subcategory: "action",
    name: "Chip input", description: "A text field holding a chip and the cursor after it — an input that turns entries into chips",
    tags: ["chip", "input", "tags"], family: "field",
    aliases: [], keywords: ["chip input", "tag input", "token field"],
    shapes: [rect(2, 7, 20, 10, 2), rect(5, 10, 7, 4, 2), row(12, 15, 19)],
  },
  {
    slug: "callout", category: "interface", subcategory: "communication",
    name: "Callout", description: "A box with a pointer on its side and lines of text inside — a callout that annotates something",
    tags: ["annotation", "note", "pointer"], family: "bubble",
    aliases: [], keywords: ["callout", "annotation box", "side note"],
    shapes: [rect(7, 4, 15, 16, 2), poly([[7, 9], [4, 12], [7, 15]]), row(9, 10, 19), row(13, 10, 19)],
  },
  {
    slug: "bottom-sheet", category: "interface", subcategory: "layout",
    name: "Bottom sheet", description: "A panel rising from the foot of the screen with a drag handle — a mobile bottom sheet",
    tags: ["sheet", "panel", "mobile"], family: "window",
    aliases: [], keywords: ["bottom sheet", "slide-up panel", "drawer"],
    shapes: [rect(3, 3, 18, 18, 2), row(11, 3, 21), row(14.5, 9, 15)],
  },
  {
    slug: "masonry", category: "interface", subcategory: "layout",
    name: "Masonry", description: "Tiles of different heights packed into two columns — a masonry grid layout",
    tags: ["grid", "tiles", "layout"], family: "card",
    aliases: [], keywords: ["masonry layout", "pinterest grid", "packed tiles"],
    shapes: [rect(2, 2, 8.5, 8, 2), rect(13.5, 2, 8.5, 12, 2), rect(2, 13, 8.5, 9, 2), rect(13.5, 17, 8.5, 5, 2.5)],
  },
  {
    slug: "crosshair", category: "interface", subcategory: "action",
    name: "Crosshair", description: "A ring with four ticks and a centre point — the crosshair cursor for precise picking",
    tags: ["target", "precise", "cursor"], family: "node",
    aliases: [], keywords: ["crosshair", "precision cursor", "targeting"],
    shapes: [disc(12, 12, 4), col(12, 2, 5), col(12, 19, 22), row(12, 2, 5), row(12, 19, 22), disc(12, 12, 1)],
  },
  {
    slug: "floating-action", category: "interface", subcategory: "layout",
    name: "Floating action", description: "A round button floating in the corner of a screen — the floating action button",
    tags: ["fab", "button", "primary"], family: "window",
    aliases: [], keywords: ["floating action button", "fab", "primary action"],
    shapes: [rect(3, 3, 18, 18, 2), disc(15, 15, 3)],
  },
  {
    slug: "popover", category: "interface", subcategory: "communication",
    name: "Popover", description: "A panel with a pointer on top and content inside — a popover anchored to a control",
    tags: ["popup", "anchored", "panel"], family: "bubble",
    aliases: [], keywords: ["popover", "anchored popup", "dropdown panel"],
    shapes: [rect(3, 8, 18, 12, 2), poly([[9.5, 8], [12, 5.5], [14.5, 8]]), row(12, 7, 17), row(16, 7, 14)],
  },
  {
    slug: "combobox", category: "interface", subcategory: "action",
    name: "Combobox", description: "A text field with a chevron and the options listed beneath — a combobox you can type into",
    tags: ["select", "autocomplete", "field"], family: "field",
    aliases: [], keywords: ["combobox", "autocomplete select", "searchable dropdown"],
    shapes: [rect(3, 3, 19, 8, 2), row(7, 6, 12), poly([[15, 6], [17, 8], [19, 6]]), row(15, 4, 19), row(20, 4, 19)],
  },
  {
    slug: "date-picker", category: "interface", subcategory: "time",
    name: "Date picker", description: "A calendar with one day selected — the date picker control for choosing a date",
    tags: ["calendar", "select", "date"], family: "window",
    aliases: [], keywords: ["date picker", "calendar picker", "select a date"],
    shapes: [rect(3, 3, 18, 18, 2), row(8, 3, 21), disc(12, 15, 3)],
  },
  {
    slug: "scrollbar", category: "interface", subcategory: "layout",
    name: "Scrollbar", description: "Content with a thumb riding along its right edge — the scrollbar of a long view",
    tags: ["scroll", "thumb", "overflow"], family: "window",
    aliases: [], keywords: ["scrollbar", "scroll thumb", "overflow scroll"],
    shapes: [rect(2, 2, 20, 20, 2), row(8, 5, 15), row(13, 5, 15), col(19, 5, 12)],
  },
  {
    slug: "component-instance", category: "interface", subcategory: "layout",
    name: "Component instance", description: "A diamond inside a frame — an instance of a design component placed on the canvas",
    tags: ["component", "instance", "design"], family: "window",
    aliases: [], keywords: ["component instance", "design system", "symbol instance"],
    shapes: [rect(3, 3, 18, 18, 2), poly([[12, 7], [17, 12], [12, 17], [7, 12]], true)],
  },
  {
    slug: "text-color", category: "interface", subcategory: "action",
    name: "Text colour", description: "A letter T with a colour bar beneath it — set the colour of selected text",
    tags: ["colour", "text", "format"], family: "glyph",
    aliases: [], keywords: ["text colour", "font colour", "format text"],
    shapes: [row(5, 5, 19), col(12, 5, 15), row(20, 5, 19)],
  },
  {
    slug: "kanban-card", category: "interface", subcategory: "layout",
    name: "Kanban card", description: "A card with a title, a line of detail and an assignee — one task on a kanban board",
    tags: ["card", "task", "board"], family: "card",
    aliases: [], keywords: ["kanban card", "task card", "board item"],
    shapes: [rect(3, 3, 18, 18, 2), row(8, 6, 18), row(12, 6, 14), disc(17, 17, 1)],
  },
  {
    slug: "dock-left", category: "interface", subcategory: "layout",
    name: "Dock left", description: "A window with an arrow pointing at its left panel — dock a view to the left edge",
    tags: ["dock", "panel", "left"], family: "window",
    aliases: [], keywords: ["dock left", "snap to left", "left panel"],
    shapes: [rect(3, 3, 18, 18, 2), col(9, 3, 21), poly([[16, 9.5], [13.5, 12], [16, 14.5]])],
  },
  {
    slug: "dock-right", category: "interface", subcategory: "layout",
    name: "Dock right", description: "A window with an arrow pointing at its right panel — dock a view to the right edge",
    tags: ["dock", "panel", "right"], family: "window",
    aliases: [], keywords: ["dock right", "snap to right", "right panel"],
    shapes: [rect(3, 3, 18, 18, 2), col(15, 3, 21), poly([[8, 9.5], [10.5, 12], [8, 14.5]])],
  },

  /* ── agents: keys and shields ─────────────────────────────────────────────────── */

  {
    slug: "agent-key", category: "agents", subcategory: "lifecycle",
    name: "Agent key", description: "An agent beside a key — the credential an agent is issued to act on your behalf",
    tags: ["credential", "key", "access"], family: "orbit",
    aliases: [], keywords: ["agent credential", "agent api key", "delegated access"],
    shapes: [ring(), ...keyMark()],
  },
  {
    slug: "agent-escalate", category: "agents", subcategory: "communication",
    name: "Agent escalate", description: "An agent sending an arrow up and away — escalating a case to a person or a stronger agent",
    tags: ["escalate", "handoff", "up"], family: "ring",
    aliases: [], keywords: ["escalation", "escalate to human", "hand off upward"],
    shapes: [arc(7, 17, 4, 295, 245), poly([[12, 12], [19, 5]]), poly([[14.5, 5], [19, 5], [19, 9.5]])],
  },
  {
    slug: "agent-voice", category: "agents", subcategory: "communication",
    name: "Agent voice", description: "An agent with sound waves leaving it — a voice agent that speaks its replies",
    tags: ["voice", "speak", "audio"], family: "ring",
    aliases: [], keywords: ["voice agent", "speaking assistant", "spoken reply"],
    shapes: [arc(7, 12, 4, 295, 245), arc(15, 12, 3, -45, 45), arc(15, 12, 6, -45, 45)],
  },
  {
    slug: "agent-listen", category: "agents", subcategory: "communication",
    name: "Agent listen", description: "Sound waves arriving at an agent — an agent listening for speech or events",
    tags: ["listen", "hear", "audio"], family: "ring",
    aliases: [], keywords: ["listening agent", "voice input", "always listening"],
    shapes: [arc(9, 12, 3, 135, 225), arc(9, 12, 6, 135, 225), arc(17, 12, 4, 295, 245)],
  },
  {
    slug: "agent-sleep", category: "agents", subcategory: "lifecycle",
    name: "Agent sleep", description: "An agent with a Z beside it — an idle agent put to sleep until it is needed",
    tags: ["idle", "sleep", "pause"], family: "ring",
    aliases: [], keywords: ["sleeping agent", "idle agent", "dormant"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[13, 12], [21, 12], [13, 20], [21, 20]])],
  },
  {
    slug: "agent-upgrade", category: "agents", subcategory: "lifecycle",
    name: "Agent upgrade", description: "An agent with a double chevron rising beside it — upgrading an agent to a newer model or version",
    tags: ["upgrade", "version", "improve"], family: "ring",
    aliases: [], keywords: ["agent upgrade", "model upgrade", "new version"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[12, 16], [16.5, 11.5], [21, 16]]), poly([[12, 20.5], [16.5, 16], [21, 20.5]])],
  },
  {
    slug: "agent-folder", category: "agents", subcategory: "tool-use",
    name: "Agent folder", description: "An agent beside a folder — an agent with a workspace of files to manage",
    tags: ["folder", "workspace", "files"], family: "ring",
    aliases: [], keywords: ["agent workspace", "folder agent", "file management"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[12, 12], [12, 21], [22, 21], [22, 14], [17, 14], [15, 12]], true)],
  },
  {
    slug: "agent-shield", category: "agents", subcategory: "lifecycle",
    name: "Agent shield", description: "An agent beside a shield — the guardrails that protect an agent and the people it serves",
    tags: ["shield", "guardrail", "protect"], family: "orbit",
    aliases: [], keywords: ["agent guardrails", "protected agent", "agent safety"],
    shapes: [ring(), ...shieldMark()],
  },
  {
    slug: "agent-tag", category: "agents", subcategory: "lifecycle",
    name: "Agent tag", description: "An agent beside a label tag — tagging agents by team, role or environment",
    tags: ["tag", "label", "group"], family: "orbit",
    aliases: [], keywords: ["agent tag", "agent label", "agent metadata"],
    shapes: [ring(), ...tagMark()],
  },
  {
    slug: "agent-phone", category: "agents", subcategory: "tool-use",
    name: "Agent phone", description: "An agent beside a phone — an agent that places and answers calls",
    tags: ["phone", "call", "mobile"], family: "ring",
    aliases: [], keywords: ["phone agent", "voice call agent", "call automation"],
    shapes: [arc(7, 7, 4, 295, 245), rect(14, 11, 7, 11, 2), row(14, 16, 19)],
  },

  /* ── devtools, data, analytics, devops, security ─────────────────────────────── */

  {
    slug: "bundler", category: "devtools", subcategory: "package",
    name: "Bundler", description: "Several inputs feeding into one box — a bundler that packs modules into one artifact",
    tags: ["bundle", "build", "modules"], family: "window",
    aliases: [], keywords: ["bundler", "module bundling", "build tool"],
    shapes: [row(8, 2, 11), row(12, 2, 11), row(16, 2, 11), rect(11, 4, 11, 16, 2)],
  },
  {
    slug: "git-bisect", category: "devtools", subcategory: "version-control",
    name: "Git bisect", description: "A marker over the middle of a chain of commits — bisecting history to find the bad commit",
    tags: ["git", "bisect", "search"], family: "node",
    aliases: [], keywords: ["git bisect", "find bad commit", "binary search history"],
    shapes: [disc(5, 14, 1), disc(12, 14, 1), disc(19, 14, 1), row(14, 6, 11), row(14, 13, 18), col(12, 6, 10)],
  },
  {
    slug: "treemap", category: "data", subcategory: "catalog",
    name: "Treemap", description: "A frame divided into uneven tiles — a treemap sized by how much each part holds",
    tags: ["chart", "tiles", "hierarchy"], family: "window",
    aliases: [], keywords: ["treemap", "nested tiles", "size by value"],
    shapes: [rect(3, 3, 18, 18, 2), col(10, 3, 21), row(9, 10, 21), row(15, 3, 10)],
  },
  {
    slug: "groupby", category: "data", subcategory: "quality",
    name: "Group by", description: "A bracket gathering three rows together — grouping rows by a shared key",
    tags: ["group", "aggregate", "rows"], family: "text",
    aliases: [], keywords: ["group by", "grouped rows", "aggregate by key"],
    shapes: [poly([[6, 4], [3, 4], [3, 20], [6, 20]]), row(7, 9, 21), row(12, 9, 21), row(17, 9, 21)],
  },
  {
    slug: "data-contract-break", category: "data", subcategory: "quality",
    name: "Data contract break", description: "A document split by a crack — a data contract broken by an upstream change",
    tags: ["contract", "break", "schema"], family: "page",
    aliases: [], keywords: ["data contract violation", "breaking schema change", "contract break"],
    shapes: [page(), poly([[9, 10], [12, 13], [10, 15], [13, 18]])],
  },
  {
    slug: "retention-curve", category: "analytics", subcategory: "chart",
    name: "Retention curve", description: "A curve that drops and then holds steady — the retention curve of returning users",
    tags: ["retention", "cohort", "curve"], family: "chart",
    aliases: [], keywords: ["retention curve", "user retention", "cohort retention"],
    shapes: [poly([[3, 3], [3, 21], [21, 21]]), poly([[6, 5], [12, 11], [19, 11]])],
  },
  {
    slug: "circuit-open", category: "devops", subcategory: "incident",
    name: "Circuit open", description: "A switch blade lifted away from its contact — a circuit breaker tripped open",
    tags: ["breaker", "open", "fail"], family: "figure",
    aliases: [], keywords: ["circuit breaker open", "tripped breaker", "fail fast"],
    shapes: [disc(6, 12, 2), disc(18, 12, 2), col(6, 5, 10), col(18, 14, 19), poly([[8, 12], [14, 6]])],
  },
  {
    slug: "circuit-close", category: "devops", subcategory: "incident",
    name: "Circuit closed", description: "A switch blade bridging both contacts — a circuit breaker closed and passing traffic",
    tags: ["breaker", "closed", "healthy"], family: "figure",
    aliases: [], keywords: ["circuit breaker closed", "breaker reset", "traffic flowing"],
    shapes: [disc(6, 12, 2), disc(18, 12, 2), col(6, 5, 10), col(18, 14, 19), row(12, 8, 16)],
  },
  {
    slug: "signature-media", category: "security", subcategory: "ai-security",
    name: "Signed media", description: "A picture with a signature beneath it — media signed to prove where it came from",
    tags: ["provenance", "sign", "authentic"], family: "window",
    aliases: [], keywords: ["signed media", "content provenance", "media authenticity"],
    shapes: [rect(3, 3, 18, 11, 2), poly([[6, 11], [10, 7], [13, 10], [17, 6]]), poly([[3, 20], [6, 17], [9, 20], [12, 17], [15, 20], [18, 17], [21, 20]])],
  },
];
