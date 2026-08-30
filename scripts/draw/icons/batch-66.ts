/**
 * Batch 66 — round 15 of the 1k plan: the generative stack, what a thumb can
 * do to glass, agents with a desk each, and the last true names in devtools and
 * data.
 *
 * Unattended round: dead concepts stayed dead (vae is flip-h without the axis,
 * img2img is encoder-decoder, swimlane is chunk, worker-pool is agent-pool,
 * instrument is type-error, crop is crop). Every name checked free before
 * drawing.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_66: Icon[] = [
  /* ── ai: the generative stack ─────────────────────────────────────────────────── */

  {
    slug: "image-caption", category: "ai", subcategory: "inference",
    name: "Image caption", description: "A picture with the model's description written beneath it — image captioning and alt text",
    tags: ["vision", "caption", "describe"], family: "window",
    aliases: [], keywords: ["image captioning", "describe image", "alt text generation"],
    shapes: [rect(3, 3, 18, 11, 2), poly([[6, 11], [10, 7], [13, 10], [17, 6]]), row(17, 5, 19), row(20.5, 5, 14)],
  },
  {
    slug: "upscale-ai", category: "ai", subcategory: "inference",
    name: "Upscale", description: "A small image expanding toward the corner — AI upscaling and super-resolution enhancement",
    tags: ["enlarge", "resolution", "enhance"], family: "window",
    aliases: ["super-resolution"], keywords: ["ai upscaling", "super resolution", "enhance image"],
    shapes: [rect(2, 2, 20, 20, 2), rect(5, 12.5, 6.5, 6.5, 2), poly([[14, 10], [18, 6]]), poly([[14.5, 6], [18, 6], [18, 9.5]])],
  },
  {
    slug: "txt2img", category: "ai", subcategory: "inference",
    name: "Text to image", description: "Lines of text with an arrow leading to a picture — text-to-image generation from a prompt",
    tags: ["generate", "prompt", "image"], family: "window",
    aliases: ["text-to-image"], keywords: ["text to image", "image generation", "prompt to picture"],
    shapes: [
      row(4, 2, 10), row(8, 2, 10), poly([[4, 12], [8, 16]]), poly([[8, 12.5], [8, 16], [4.5, 16]]),
      rect(11, 11, 11, 11, 2), poly([[14, 19], [16.5, 16.5], [19, 19]]),
    ],
  },
  {
    slug: "diffusion-model", category: "ai", subcategory: "model",
    name: "Diffusion model", description: "The model frame filled with scattered noise — a diffusion model that denoises its way to an image",
    tags: ["noise", "denoise", "generate"], family: "machine",
    aliases: [], keywords: ["diffusion model", "stable diffusion", "latent diffusion"],
    shapes: [machine(), disc(9, 9, 1), disc(14.5, 8.5, 1), disc(10, 15.5, 1), disc(15.5, 14.5, 1)],
  },
  {
    slug: "object-detect", category: "ai", subcategory: "inference",
    name: "Object detection", description: "A labelled bounding box drawn around the thing the model found — object detection in an image",
    tags: ["bounding", "vision", "find"], family: "window",
    aliases: ["bounding-box"], keywords: ["object detection", "bounding box", "computer vision"],
    shapes: [rect(3, 3, 18, 18, 2), row(7, 8, 14), rect(8, 10, 8, 7, 2)],
  },
  {
    slug: "segment-mask", category: "ai", subcategory: "inference",
    name: "Segmentation mask", description: "The exact outline of an object inside the frame, not just its box — image segmentation masks",
    tags: ["mask", "outline", "region"], family: "window",
    aliases: [], keywords: ["image segmentation", "segmentation mask", "segment anything"],
    shapes: [rect(3, 3, 18, 18, 2), poly([[8, 10], [12, 6], [16, 10], [16, 14], [12, 18], [8, 14]], true)],
  },
  {
    slug: "pose-estimate", category: "ai", subcategory: "inference",
    name: "Pose estimation", description: "The stick-figure skeleton a model sees inside a person — human pose estimation and keypoints",
    tags: ["skeleton", "joints", "body"], family: "figure",
    aliases: ["keypoints"], keywords: ["pose estimation", "keypoint detection", "body tracking"],
    shapes: [disc(12, 4, 2), col(12, 6, 15), poly([[7, 14], [12, 9]]), poly([[17, 14], [12, 9]]), poly([[12, 15], [7, 20]]), poly([[12, 15], [17, 20]])],
  },
  {
    slug: "face-detect", category: "ai", subcategory: "inference",
    name: "Face detection", description: "A face between the two corner brackets that found it — face detection and facial recognition",
    tags: ["face", "vision", "frame"], family: "figure",
    aliases: [], keywords: ["face detection", "face recognition", "facial landmarks"],
    shapes: [disc(12, 12, 7), disc(9.5, 11, 1), disc(14.5, 11, 1), poly([[3, 7], [3, 3], [7, 3]]), poly([[21, 17], [21, 21], [17, 21]])],
  },
  {
    slug: "video-frame-ai", category: "ai", subcategory: "inference",
    name: "Video frame", description: "A frame of film between its two rails, ready to play — video understanding one frame at a time",
    tags: ["video", "film", "frame"], family: "window",
    aliases: ["film-frame"], keywords: ["video frame", "film strip", "video model"],
    shapes: [rect(3, 3, 18, 18, 2), col(7, 3, 21), col(17, 3, 21), poly([[10.5, 9], [10.5, 15], [13.5, 12]], true)],
  },
  {
    slug: "speech-synth", category: "ai", subcategory: "inference",
    name: "Speech synthesis", description: "Lines of text turning into sound waves — text-to-speech and voice synthesis",
    tags: ["tts", "voice", "speak"], family: "figure",
    aliases: [], keywords: ["text to speech", "speech synthesis", "voice generation"],
    shapes: [row(10, 3, 8), row(14, 3, 8), arc(14, 12, 3, -45, 45), arc(14, 12, 7, -45, 45)],
  },
  {
    slug: "speech-recognize", category: "ai", subcategory: "inference",
    name: "Speech recognition", description: "Sound waves turning into lines of text — automatic speech recognition and speech-to-text",
    tags: ["asr", "transcribe", "listen"], family: "figure",
    aliases: ["asr"], keywords: ["speech recognition", "speech to text", "asr model"],
    shapes: [arc(10, 12, 3, 135, 225), arc(10, 12, 7, 135, 225), row(10, 16, 21), row(14, 16, 21)],
  },
  {
    slug: "music-gen", category: "ai", subcategory: "inference",
    name: "Music generation", description: "A single musical note for a tune nobody hummed first — AI music and audio generation",
    tags: ["note", "audio", "compose"], family: "figure",
    aliases: [], keywords: ["music generation", "generative audio", "ai composer"],
    shapes: [raw("M16 9L12 5V17A3 3 0 1 1 6 17A3 3 0 1 1 12 17", "a note is one stroke: flag, stem and head must join without seams", false)],
  },
  {
    slug: "visual-grounding", category: "ai", subcategory: "inference",
    name: "Visual grounding", description: "A location pin dropped inside a picture — grounding words to the exact pixels they refer to",
    tags: ["ground", "pin", "vision"], family: "window",
    aliases: [], keywords: ["visual grounding", "referring expression", "point to region"],
    shapes: [rect(3, 3, 18, 18, 2), disc(12, 9, 3), col(12, 12, 16)],
  },
  {
    slug: "physics-sim", category: "ai", subcategory: "inference",
    name: "Physics simulation", description: "A ball above a ramp and a model that knows what happens next — physics and world simulation",
    tags: ["simulate", "gravity", "world"], family: "figure",
    aliases: [], keywords: ["physics simulation", "world model", "simulation engine"],
    shapes: [poly([[4, 20], [20, 4], [20, 20]], true), disc(7, 8, 3)],
  },
  {
    slug: "mesh-gen", category: "ai", subcategory: "inference",
    name: "Mesh generation", description: "A wireframe of joined triangles conjured from a description — 3D mesh and geometry generation",
    tags: ["3d", "wireframe", "geometry"], family: "figure",
    aliases: [], keywords: ["mesh generation", "3d mesh", "text to 3d"],
    shapes: [row(9, 3, 21), row(18, 3, 21), poly([[3, 18], [12, 9], [21, 18]]), col(12, 9, 18)],
  },
  {
    slug: "gaussian-splat", category: "ai", subcategory: "inference",
    name: "Gaussian splat", description: "A scene rendered from soft overlapping dots — 3D Gaussian splatting and radiance fields",
    tags: ["splat", "3d", "render"], family: "figure",
    aliases: ["splatting"], keywords: ["gaussian splatting", "3d scene reconstruction", "radiance field"],
    shapes: [disc(6, 8, 3), disc(15, 6, 2), disc(17, 15, 3), disc(8, 17, 2)],
  },
  {
    slug: "robot-arm", category: "ai", subcategory: "inference",
    name: "Robot arm", description: "A jointed arm with an open gripper — embodied AI, robotics and manipulation policies",
    tags: ["robotics", "arm", "manipulate"], family: "figure",
    aliases: [], keywords: ["robot arm", "robotic manipulation", "embodied ai"],
    shapes: [row(20, 3, 9), col(6, 12, 20), poly([[6, 12], [12, 6], [20, 6], [20, 9.5]]), col(17, 6, 9.5)],
  },
  {
    slug: "partial-answer", category: "ai", subcategory: "inference",
    name: "Partial answer", description: "Text that trails off into an ellipsis — a partial or truncated model answer that stopped early",
    tags: ["truncated", "incomplete", "ellipsis"], family: "text",
    aliases: [], keywords: ["partial answer", "truncated response", "incomplete output"],
    shapes: [row(5, 3, 21), row(10, 3, 21), row(15, 3, 12), disc(7, 20, 1), disc(12, 20, 1), disc(17, 20, 1)],
  },
  {
    slug: "diff-text", category: "ai", subcategory: "inference",
    name: "Text diff", description: "Lines of text marked with plus and minus — a diff of what the model added and removed",
    tags: ["diff", "edit", "compare"], family: "rails",
    aliases: [], keywords: ["text diff", "compare edits", "track changes"],
    shapes: [row(6, 2.5, 5.5), col(4, 4.5, 7.5), row(12, 2.5, 5.5), row(6, 8.5, 21), row(12, 8.5, 21), row(18, 8.5, 21)],
  },
  {
    slug: "outline-gen", category: "ai", subcategory: "inference",
    name: "Outline generation", description: "Headings and nested points stepping inward — an outline generated before the prose is written",
    tags: ["outline", "structure", "headings"], family: "rails",
    aliases: [], keywords: ["outline generation", "document structure", "nested headings"],
    shapes: [row(5, 3, 21), row(10, 7, 21), row(15, 7, 21), row(20, 11, 21)],
  },

  /* ── interface: what a thumb does to glass ────────────────────────────────────── */

  {
    slug: "pinch", category: "interface", subcategory: "action",
    name: "Pinch", description: "Two diagonal arrows closing on the centre — the pinch gesture that zooms out or collapses a view",
    tags: ["gesture", "zoom", "touch"], family: "arrow",
    aliases: ["pinch-in"], keywords: ["pinch gesture", "pinch to zoom", "touch gesture"],
    shapes: [poly([[3, 3], [9, 9]]), poly([[9, 5.5], [9, 9], [5.5, 9]]), poly([[21, 21], [15, 15]]), poly([[15, 18.5], [15, 15], [18.5, 15]])],
  },
  {
    slug: "flip-v", category: "interface", subcategory: "action",
    name: "Flip vertical", description: "Two triangles mirrored across a horizontal axis — flip an object or layer vertically",
    tags: ["mirror", "vertical", "transform"], family: "object",
    aliases: [], keywords: ["flip vertical", "mirror vertically", "transform object"],
    shapes: [poly([[6, 3], [12, 9], [18, 3]], true), row(12, 4, 20), poly([[6, 21], [12, 15], [18, 21]], true)],
  },
  {
    slug: "responsive-mode", category: "interface", subcategory: "layout",
    name: "Responsive mode", description: "A phone beside a desktop screen — preview a layout across responsive device sizes",
    tags: ["device", "preview", "breakpoint"], family: "device",
    aliases: [], keywords: ["responsive design", "device preview", "mobile and desktop"],
    shapes: [rect(2, 4, 8, 16, 2), rect(13, 7, 9, 10, 2)],
  },
  {
    slug: "breadcrumb-collapse", category: "interface", subcategory: "layout",
    name: "Breadcrumb collapse", description: "An ellipsis followed by a chevron — a breadcrumb trail collapsed to its last steps",
    tags: ["breadcrumb", "path", "collapse"], family: "navigation",
    aliases: [], keywords: ["collapsed breadcrumb", "breadcrumb navigation", "path overflow"],
    shapes: [disc(4, 12, 1), disc(9, 12, 1), disc(14, 12, 1), poly([[17, 8], [21, 12], [17, 16]])],
  },
  {
    slug: "infinite-scroll", category: "interface", subcategory: "layout",
    name: "Infinite scroll", description: "Rows of content with a double chevron that keeps going — infinite scrolling and load more",
    tags: ["scroll", "feed", "load"], family: "text",
    aliases: ["load-more"], keywords: ["infinite scroll", "load more", "endless feed"],
    shapes: [row(5, 3, 21), row(10, 3, 21), poly([[9.5, 14], [12, 16.5], [14.5, 14]]), poly([[9.5, 18.5], [12, 21], [14.5, 18.5]])],
  },
  {
    slug: "swipe-action", category: "interface", subcategory: "action",
    name: "Swipe action", description: "A card sliding sideways behind an arrow — swipe actions on a list item or card",
    tags: ["swipe", "gesture", "card"], family: "card",
    aliases: [], keywords: ["swipe action", "swipe to reveal", "swipe gesture"],
    shapes: [rect(3, 7, 11, 10, 2), row(12, 17, 21), poly([[18.5, 9.5], [21, 12], [18.5, 14.5]])],
  },
  {
    slug: "double-tap", category: "interface", subcategory: "action",
    name: "Double tap", description: "A touch point with two rings rippling outward — the double-tap gesture on a touchscreen",
    tags: ["tap", "gesture", "touch"], family: "touch",
    aliases: [], keywords: ["double tap", "tap gesture", "touch interaction"],
    shapes: [disc(12, 12, 2), arc(12, 12, 6, -45, 225), arc(12, 12, 10, -45, 225)],
  },
  {
    slug: "haptic", category: "interface", subcategory: "state",
    name: "Haptic", description: "A phone with vibration waves on both sides — haptic feedback and vibration alerts",
    tags: ["vibrate", "feedback", "phone"], family: "device",
    aliases: ["vibration"], keywords: ["haptic feedback", "vibration", "tactile response"],
    shapes: [rect(8, 3, 8, 18, 2), arc(17, 12, 4, -45, 45), arc(7, 12, 4, 135, 225)],
  },
  {
    slug: "reorder", category: "interface", subcategory: "action",
    name: "Reorder", description: "A list beside an up-and-down arrow — drag rows to reorder or sort them by hand",
    tags: ["sort", "drag", "list"], family: "text",
    aliases: ["drag-sort"], keywords: ["reorder list", "drag and drop sort", "sortable rows"],
    shapes: [row(7, 9, 21), row(12, 9, 21), row(17, 9, 21), col(4, 4, 20), poly([[2, 6], [4, 4], [6, 6]]), poly([[2, 18], [4, 20], [6, 18]])],
  },
  {
    slug: "kanban-column", category: "interface", subcategory: "layout",
    name: "Kanban column", description: "A tall column holding two cards — one lane of a kanban board",
    tags: ["kanban", "board", "column"], family: "card",
    aliases: [], keywords: ["kanban column", "board lane", "task cards"],
    shapes: [rect(5, 2, 14, 20, 2), rect(8.5, 6, 7, 4, 2), rect(8.5, 13, 7, 4, 2)],
  },
  {
    slug: "today-line", category: "interface", subcategory: "time",
    name: "Today line", description: "A calendar with a vertical marker through the current day — the today line on a timeline",
    tags: ["calendar", "today", "marker"], family: "calendar",
    aliases: [], keywords: ["today marker", "current day line", "calendar today"],
    shapes: [rect(3, 4, 18, 16, 2), row(9, 3, 21), col(12, 12, 17)],
  },
  {
    slug: "date-span", category: "interface", subcategory: "time",
    name: "Date span", description: "A calendar with a bar stretching across several days — a date range or multi-day span",
    tags: ["calendar", "range", "span"], family: "calendar",
    aliases: [], keywords: ["date range", "multi-day event", "calendar span"],
    shapes: [rect(3, 4, 18, 16, 2), row(9, 3, 21), rect(6, 12, 12, 5, 2.5)],
  },
  {
    slug: "toast-stack", category: "interface", subcategory: "state",
    name: "Toast stack", description: "Two notification toasts stacked and offset — a queue of transient messages",
    tags: ["toast", "notification", "stack"], family: "card",
    aliases: [], keywords: ["toast notifications", "stacked toasts", "snackbar queue"],
    shapes: [rect(2, 12, 16, 5, 2.5), rect(6, 4, 16, 5, 2.5)],
  },
  {
    slug: "done-all", category: "interface", subcategory: "state",
    name: "Done all", description: "Two check marks side by side — everything done, read or completed",
    tags: ["check", "complete", "all"], family: "mark",
    aliases: [], keywords: ["double check", "all done", "mark all complete"],
    shapes: [poly([[2, 12], [7, 17], [15, 9]]), poly([[9, 12], [14, 17], [22, 9]])],
  },

  /* ── agents: a desk each ──────────────────────────────────────────────────────── */

  {
    slug: "scratch-file", category: "agents", subcategory: "memory",
    name: "Scratch file", description: "A page with a scribble across it — the scratch file an agent thinks in before it answers",
    tags: ["scratch", "notes", "working"], family: "page",
    aliases: [], keywords: ["scratch file", "working notes", "agent scratchpad"],
    shapes: [page(), poly([[9, 14], [11, 12], [13, 14], [15, 12]])],
  },
  {
    slug: "sql-agent", category: "agents", subcategory: "tool-use",
    name: "SQL agent", description: "An agent sitting at a database table — an agent that writes and runs SQL queries",
    tags: ["sql", "database", "query"], family: "ring",
    aliases: [], keywords: ["sql agent", "text to sql", "database agent"],
    shapes: [arc(7, 7, 4, 295, 245), rect(12, 12, 10, 9, 2), row(15.5, 12, 22), col(17, 15.5, 21)],
  },
  {
    slug: "support-agent", category: "agents", subcategory: "tool-use",
    name: "Support agent", description: "An agent beside a speech bubble — a customer support agent that answers people",
    tags: ["support", "chat", "help"], family: "ring",
    aliases: [], keywords: ["support agent", "customer service ai", "help desk bot"],
    shapes: [arc(7, 7, 4, 295, 245), rect(12, 12, 10, 7, 2), poly([[14, 19], [14, 22], [17, 19]])],
  },
  {
    slug: "type-agent", category: "agents", subcategory: "tool-use",
    name: "Typing agent", description: "An agent above a keyboard — a computer-use agent that types into real applications",
    tags: ["keyboard", "type", "computer-use"], family: "ring",
    aliases: [], keywords: ["typing agent", "computer use", "keyboard automation"],
    shapes: [arc(12, 6, 4, 295, 245), rect(3, 13, 18, 8, 2), disc(7, 17, 1), disc(12, 17, 1), disc(17, 17, 1)],
  },
  {
    slug: "agent-review-score", category: "agents", subcategory: "reflection",
    name: "Agent review score", description: "An agent next to a set of score bars — how an agent's work was rated in review",
    tags: ["score", "rating", "review"], family: "ring",
    aliases: [], keywords: ["agent score", "performance review", "agent rating"],
    shapes: [arc(6.5, 12, 4, 295, 245), col(14, 13, 18), col(17.5, 9, 18), col(21, 15, 18)],
  },
  {
    slug: "sandbox-agent", category: "agents", subcategory: "execution",
    name: "Sandbox agent", description: "An agent enclosed in a box — an agent running inside an isolated sandbox",
    tags: ["sandbox", "isolate", "contain"], family: "ring",
    aliases: [], keywords: ["sandboxed agent", "isolated execution", "agent container"],
    shapes: [rect(3, 3, 18, 18, 2), arc(12, 12, 5, 295, 245)],
  },
  {
    slug: "form-fill", category: "agents", subcategory: "tool-use",
    name: "Form fill", description: "A form with its fields completed and ticked — an agent filling out a web form",
    tags: ["form", "fill", "submit"], family: "window",
    aliases: [], keywords: ["form filling", "auto fill", "web form automation"],
    shapes: [rect(3, 3, 18, 18, 2), row(7, 7, 17), row(11, 7, 17), poly([[7, 16], [9, 18], [13, 14]])],
  },
  {
    slug: "approval-gate", category: "agents", subcategory: "lifecycle",
    name: "Approval gate", description: "An agent waiting at a closed door — a gate where a human must approve before it continues",
    tags: ["approve", "gate", "human"], family: "ring",
    aliases: [], keywords: ["approval gate", "human approval", "agent checkpoint"],
    shapes: [rect(2, 3, 8, 18, 2), arc(17.5, 12, 4, 295, 245)],
  },
  {
    slug: "pair-agents", category: "agents", subcategory: "multi-agent",
    name: "Pair agents", description: "Two agents joined corner to corner by a short bridge — a pair working the same task together",
    tags: ["pair", "duo", "collaborate"], family: "ring",
    aliases: [], keywords: ["agent pair", "pair programming agents", "two agents"],
    shapes: [arc(7, 11, 4, 295, 245), arc(17, 13, 4, 295, 245), poly([[11, 11], [13, 13]])],
  },
  {
    slug: "heartbeat-agent", category: "agents", subcategory: "lifecycle",
    name: "Agent heartbeat", description: "An agent above a pulse line — the heartbeat that proves a long-running agent is still alive",
    tags: ["pulse", "alive", "health"], family: "ring",
    aliases: [], keywords: ["agent heartbeat", "liveness check", "agent health"],
    shapes: [arc(7, 7, 4, 295, 245), poly([[10, 18], [13, 18], [15.5, 15.5], [18, 18], [21, 18]])],
  },

  /* ── devtools & data: the last true names ─────────────────────────────────────── */

  {
    slug: "invariant", category: "devtools", subcategory: "testing",
    name: "Invariant", description: "Two equal lines held between brackets — an invariant that must stay true throughout",
    tags: ["assert", "always", "contract"], family: "bracket",
    aliases: [], keywords: ["invariant", "assertion", "design by contract"],
    shapes: [poly([[7, 3], [3, 3], [3, 21], [7, 21]]), poly([[17, 3], [21, 3], [21, 21], [17, 21]]), row(9.5, 8, 16), row(14.5, 8, 16)],
  },
  {
    slug: "precondition", category: "devtools", subcategory: "testing",
    name: "Precondition", description: "A check placed before the block — a precondition that must hold before code runs",
    tags: ["check", "before", "contract"], family: "mark",
    aliases: ["pre-condition"], keywords: ["precondition", "input validation", "contract check"],
    shapes: [poly([[2, 12], [4.5, 14.5], [9, 10]]), rect(12, 5, 10, 14, 2)],
  },
  {
    slug: "postcondition", category: "devtools", subcategory: "testing",
    name: "Postcondition", description: "A check placed after the block — a postcondition that must hold once code has run",
    tags: ["check", "after", "contract"], family: "mark",
    aliases: ["post-condition"], keywords: ["postcondition", "output validation", "contract check"],
    shapes: [rect(2, 5, 10, 14, 2), poly([[15, 12], [17.5, 14.5], [22, 10]])],
  },
  {
    slug: "change-capture", category: "data", subcategory: "streaming",
    name: "Change capture", description: "Table rows with a lightning bolt beside them — change data capture streaming every edit",
    tags: ["cdc", "stream", "change"], family: "text",
    aliases: [], keywords: ["change data capture", "cdc", "database streaming"],
    shapes: [row(5, 3, 21), row(10, 3, 21), row(15, 3, 12), poly([[20, 13], [17, 16], [19.5, 16], [16.5, 19]])],
  },
  {
    slug: "tombstone", category: "data", subcategory: "streaming",
    name: "Tombstone", description: "A row marked with an X among live rows — a tombstone record standing in for a deleted row",
    tags: ["delete", "marker", "record"], family: "rails",
    aliases: ["delete-marker"], keywords: ["tombstone record", "soft delete", "deleted row marker"],
    shapes: [row(6, 3, 21), row(11, 3, 14), poly([[17.5, 9.5], [20.5, 12.5]]), poly([[20.5, 9.5], [17.5, 12.5]]), row(16, 3, 21)],
  },
  {
    slug: "backfill-data", category: "data", subcategory: "streaming",
    name: "Backfill", description: "A chevron dropping into the hole in a row — backfilling the data a pipeline missed",
    tags: ["backfill", "gap", "reprocess"], family: "text",
    aliases: [], keywords: ["data backfill", "fill the gap", "reprocess history"],
    shapes: [row(5, 3, 21), row(10, 3, 7), row(10, 17, 21), poly([[10, 9], [12, 11], [14, 9]]), row(15, 3, 21)],
  },
];
