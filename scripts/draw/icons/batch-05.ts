/**
 * Batch 05 — finishing the first hundred's worth of concepts, and the everyday shapes.
 *
 * Two things are new here. `cloud` is the first body that needs a hand-written path: a cloud
 * is lobes, and a lobe is an arc whose radius is decided by the chord it has to span, which
 * no constructor in `forms.ts` takes as an argument. It goes through `area()` with its
 * reason attached, which is what that escape hatch is for — and its three radii are checked
 * against their chords rather than guessed.
 *
 * The other is that several concepts were left undrawn. `hallucination`, `serverless` and
 * `storage-bucket` all have obvious pictures that this language cannot make honestly — a
 * bucket tapers at angles the set does not use, and every drawing of a hallucination is a
 * warning sign with something odd about it. They wait until there is a real answer rather
 * than shipping a forced one.
 */
import { arc, area, col, disc, frame, poly, rect, row } from "../forms.ts";
import { cloud, machine, page, panel, ring, window_ } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_05: Icon[] = [
  /* ── Agents, and who tells whom ───────────────────────────────────────────────── */

  {
    slug: "supervisor", category: "agents", subcategory: "multi-agent",
    name: "Supervisor", description: "The agent that directs the others",
    tags: ["orchestrator", "lead", "hierarchy"], family: "orbit",
    aliases: ["orchestrator"], keywords: ["manager", "coordinator", "lead agent", "router"],
    // One above two. `multi-agent` puts its rings side by side because none of them is in
    // charge; the moment one is, the drawing has to have a top.
    shapes: [
      arc(12, 8, 3, 295, 245), arc(5, 15, 3, 295, 245), arc(19, 15, 3, 295, 245),
      poly([[9.5, 10.5], [7.5, 12.5]]), poly([[14.5, 10.5], [16.5, 12.5]]),
    ],
  },

  {
    slug: "planner", category: "agents", subcategory: "planning",
    name: "Planner", description: "The part that works out what to do",
    tags: ["decompose", "strategy", "breakdown"], family: "machine",
    aliases: [], keywords: ["decomposition", "task graph", "strategy", "scheduler"],
    // `subtask`'s tree, inside a machine. The tree on its own is the shape of a plan; put in
    // a body it becomes the thing that makes plans.
    shapes: [machine(), row(9, 8, 17), col(9, 9, 15), row(15, 9, 17)],
  },

  {
    slug: "executor", category: "agents", subcategory: "execution",
    name: "Executor", description: "The part that actually carries the steps out",
    tags: ["run", "worker", "carry-out"], family: "machine",
    aliases: ["worker"], keywords: ["runner", "worker", "step", "invoke", "carry out"],
    // Work going in one side and out the other. `inference` puts a play mark inside a body
    // because the body is what runs; here the body is what the work passes through.
    shapes: [
      frame(2, 5, 14, 14, 3, { chamfer: 3, gap: 3 }),
      row(12, 2, 22), poly([[18, 8], [22, 12], [18, 16]]),
    ],
  },

  {
    slug: "reflection", category: "agents", subcategory: "reflection",
    name: "Reflection", description: "The agent checking its own work",
    tags: ["review", "self-check", "critique"], family: "orbit",
    aliases: ["self-critique"], keywords: ["critique", "self-review", "revise", "introspect"],
    // Two arcs facing each other, and the line they are mirrored across. Without the line
    // they are a pair of parentheses — it takes the axis before the pair reads as one shape
    // and its reflection rather than as punctuation.
    shapes: [
      arc(12, 12, 7, 120, 240), arc(12, 12, 7, 300, 60),
      col(12, 4, 9), col(12, 15, 20),
    ],
  },

  {
    slug: "agent-log", category: "agents", subcategory: "lifecycle",
    name: "Agent log", description: "What the agent did, in order",
    tags: ["history", "trace", "record"], family: "orbit",
    aliases: [], keywords: ["history", "audit", "transcript", "run log", "steps", "trace"],
    // Lines inside the agent's own ring rather than on a page. On a page it would be a
    // document with an extra rule; in the ring it is unmistakably this agent's record.
    shapes: [ring(), row(9, 7, 17), row(12.5, 7, 17), row(16, 7, 15)],
  },

  {
    slug: "multimodal", category: "ai", subcategory: "multimodal",
    name: "Multimodal", description: "A model that handles more than text",
    tags: ["image", "audio", "mixed"], family: "window",
    aliases: [], keywords: ["vision", "audio", "image input", "cross-modal", "vlm"],
    // A picture and some text in the same frame. The point is the pairing, so neither can be
    // the bigger half — they get equal room and the frame holds them together.
    shapes: [panel(), disc(9, 12, 3), row(10, 15, 18), row(14, 15, 18)],
  },

  /* ── The wire ─────────────────────────────────────────────────────────────────── */

  {
    slug: "mcp", category: "mcp", subcategory: "server",
    name: "MCP", description: "The protocol a model talks to tools through",
    tags: ["protocol", "connect", "standard"], family: "machine",
    aliases: [], keywords: ["model context protocol", "anthropic", "tool protocol"],
    // Two machines and the wire between them. A protocol is not a thing you can draw; what
    // you can draw is the fact that there are two ends and an agreement in the middle.
    shapes: [rect(2, 8, 8, 8, 2), row(12, 10, 14), rect(14, 8, 8, 8, 2)],
  },

  {
    slug: "mcp-client", category: "mcp", subcategory: "client",
    name: "MCP client", description: "The side that asks",
    tags: ["consumer", "caller", "host"], family: "machine",
    aliases: [], keywords: ["host", "consumer", "caller", "claude desktop"],
    // The same two ends as `mcp`, with one of them replaced by the reaching. A client is
    // defined by which direction it faces.
    shapes: [rect(2, 8, 10, 8, 2), row(12, 12, 20), poly([[17, 9], [20, 12], [17, 15]])],
  },

  {
    slug: "mcp-connection", category: "mcp", subcategory: "transport",
    name: "MCP connection", description: "A live link between a client and a server",
    tags: ["link", "session", "transport"], family: "chain",
    aliases: [], keywords: ["stdio", "sse", "session", "handshake", "transport"],
    // The wire is broken in the middle, because a connection is the thing that can be
    // absent. An unbroken line is a pipe; a broken one is something being held open.
    shapes: [disc(5, 12, 2), row(12, 8.5, 11), row(12, 13, 15.5), disc(19, 12, 2)],
  },

  /* ── Finding and keeping ──────────────────────────────────────────────────────── */

  {
    slug: "retriever", category: "rag", subcategory: "retrieval",
    name: "Retriever", description: "Fetches the documents that might help",
    tags: ["fetch", "lookup", "pull"], family: "page",
    aliases: ["retrieval"], keywords: ["fetch", "top-k", "recall", "lookup", "context"],
    // A document on its way out. `search` is the looking; this is the part that comes back
    // with something.
    shapes: [rect(2, 6, 8, 12, 2), row(12, 13, 21), poly([[16, 9], [13, 12], [16, 15]])],
  },

  {
    slug: "vector-database", category: "rag", subcategory: "vector",
    name: "Vector database", description: "Stores embeddings and finds the nearest",
    tags: ["store", "index", "similarity"], family: "machine",
    aliases: ["vector-store"], keywords: ["pinecone", "faiss", "index", "ann", "pgvector"],
    // `database`'s machine, holding `embedding`'s diamond instead of records. The row under
    // it is what is left of the record: one line, so the diamond is plainly the contents.
    shapes: [machine(), poly([[12, 7], [15, 10], [12, 13], [9, 10]], true), row(16, 7, 17)],
  },

  {
    slug: "knowledge-base", category: "rag", subcategory: "knowledge",
    name: "Knowledge base", description: "The body of material a system can draw on",
    tags: ["book", "reference", "corpus"], family: "window",
    aliases: ["kb"], keywords: ["docs", "wiki", "reference", "corpus", "manual"],
    // A book: a box with its spine off centre. Centred, the line divides the box into two
    // panes and the drawing becomes a layout.
    shapes: [frame(4, 4, 16, 16, 3, { gap: 4 }), col(8, 4, 20)],
  },

  /* ── Data ─────────────────────────────────────────────────────────────────────── */

  {
    slug: "etl", category: "data", subcategory: "transform",
    name: "ETL", description: "Take it out, change it, put it back",
    tags: ["extract", "transform", "load"], family: "machine",
    aliases: [], keywords: ["extract transform load", "elt", "batch", "ingest"],
    // In, through, out. The two arrows point the same way, because ETL has a direction and
    // a drawing that does not show it could equally be a bidirectional sync.
    shapes: [
      row(12, 2, 6.5), poly([[4.5, 10], [6.5, 12], [4.5, 14]]),
      rect(9, 7, 7, 10, 2),
      row(12, 18.5, 22), poly([[20, 10], [22, 12], [20, 14]]),
    ],
  },

  {
    slug: "data-quality", category: "data", subcategory: "quality",
    name: "Data quality", description: "The records are what they claim to be",
    tags: ["validate", "clean", "check"], family: "rails",
    aliases: [], keywords: ["validation", "profiling", "nulls", "schema check", "clean"],
    // Records and the mark that says they passed. The tick is `check`, unaltered, so
    // "this passed" looks the same wherever it appears in the set.
    shapes: [
      row(6, 3, 14), row(12, 3, 14), row(18, 3, 14),
      poly([[16, 12], [18, 14], [22, 10]]),
    ],
  },

  {
    slug: "build", category: "devops", subcategory: "ci-cd",
    name: "Build", description: "Turning source into the thing that runs",
    tags: ["compile", "assemble", "artifact"], family: "grid",
    aliases: [], keywords: ["ci", "artifact", "bundle", "make", "assemble", "compile"],
    // Three blocks stacked into something. `cluster`'s four sit in a square because they
    // are all the same; these three are arranged, which is the difference between a group
    // and an assembly.
    shapes: [rect(8.5, 2, 7, 7, 2), rect(3, 12, 8, 8, 2), rect(14, 12, 8, 8, 2)],
  },

  {
    slug: "cloud", category: "cloud", subcategory: "compute",
    name: "Cloud", description: "Somebody else's computer, and a lot of them",
    tags: ["hosted", "remote", "platform"], family: "cloud",
    aliases: ["hosted"], keywords: ["aws", "gcp", "azure", "saas", "remote"],
    // Closed, and deliberately. A cloud with a gap in it is a cloud that leaks, and the
    // language's break is a rule about silhouettes with a top — a cloud is all top.
    shapes: [
      cloud(),
    ],
  },

  {
    slug: "prompt-injection", category: "security", subcategory: "ai-security",
    name: "Prompt injection", description: "Instructions smuggled in with the input",
    tags: ["attack", "jailbreak", "exploit"], family: "window",
    aliases: ["jailbreak"], keywords: ["attack", "exploit", "untrusted input", "smuggling"],
    // The bolt starts outside and comes in through the break the body already has. Drawn
    // wholly inside the window it was `incident` with a different corner radius — and at
    // sixteen pixels a corner radius is not a difference. Getting in is the whole idea, so
    // the drawing has to show the outside it got in from.
    shapes: [window_(), poly([[15, 2], [10, 7], [13, 7], [8, 12]])],
  },

  /* ── The everyday shapes ──────────────────────────────────────────────────────── */

  {
    slug: "edit", category: "interface", subcategory: "action",
    name: "Edit", description: "Change it",
    tags: ["pencil", "write", "modify"], family: "mark",
    aliases: ["pencil"], keywords: ["write", "modify", "compose", "rename", "draft"],
    // A pencil at 45°, which is the only angle it can be: the barrel's two long sides have
    // to be parallel and on a house angle, and 45 is the one that fits the diagonal.
    shapes: [poly([[5, 19], [5, 15], [16, 4], [20, 8], [9, 19]], true)],
  },

  {
    slug: "copy", category: "interface", subcategory: "action",
    name: "Copy", description: "Make another one",
    tags: ["duplicate", "clone", "clipboard"], family: "window",
    aliases: [], keywords: ["clipboard", "clone", "paste", "duplicate"],
    // Two of the same rectangle, offset. The overlap is the whole drawing: separated they
    // are two things, and stacked exactly they are one.
    shapes: [rect(3, 3, 13, 13, 2), rect(8, 8, 13, 13, 2)],
  },

  {
    slug: "trash", category: "interface", subcategory: "action",
    name: "Trash", description: "Throw it away",
    tags: ["delete", "bin", "remove"], family: "window",
    aliases: ["delete"], keywords: ["bin", "discard", "remove", "recycle"],
    // The lid is separate and wider than the bin. Drawn as one shape it is a cup; the gap
    // between lid and body is what makes it something that opens.
    shapes: [rect(6, 8, 12, 12, 2), row(5, 3, 21), col(10, 11, 17), col(14, 11, 17)],
  },

  {
    slug: "home", category: "interface", subcategory: "layout",
    name: "Home", description: "Back to the start",
    tags: ["house", "start", "index"], family: "figure",
    aliases: ["house"], keywords: ["start", "index", "dashboard", "main"],
    // Eaves. The roof runs three units past each wall, which is what stops the drawing
    // reading as a triangle sitting on a box.
    shapes: [poly([[3, 11], [12, 2], [21, 11]]), poly([[6, 11], [6, 20], [18, 20], [18, 11]])],
  },

  {
    slug: "image", category: "interface", subcategory: "media",
    name: "Image", description: "A picture",
    tags: ["photo", "picture", "media"], family: "window",
    aliases: ["photo"], keywords: ["picture", "media", "thumbnail", "graphic"],
    // A sun and a horizon inside a frame. Everyone draws this and it is right to: it is the
    // one arrangement that reads as "a picture of something" rather than "a picture".
    shapes: [
      frame(3, 4, 18, 16, 3, { gap: 4 }),
      disc(8, 9, 1),
      poly([[5, 17], [10, 12], [14, 16], [19, 11]]),
    ],
  },

  {
    slug: "mail", category: "interface", subcategory: "communication",
    name: "Mail", description: "A message that waits for you",
    tags: ["email", "envelope", "message"], family: "window",
    aliases: ["email"], keywords: ["envelope", "inbox", "message", "send"],
    // The body is closed and the flap is the open shape. An envelope's whole meaning is
    // that it opens along one edge, so that edge is where the drawing breaks.
    shapes: [rect(2, 5, 20, 14, 2), poly([[4, 6], [12, 14], [20, 6]])],
  },

  {
    slug: "layers", category: "interface", subcategory: "layout",
    name: "Layers", description: "Things stacked on top of each other",
    tags: ["stack", "levels", "z-order"], family: "chevron",
    aliases: ["stack"], keywords: ["z-index", "levels", "overlay", "depth"],
    // Three chevrons, four and a half units apart — which is three and a bit measured
    // perpendicular, the least that survives the bold weight. At four they merge.
    shapes: [
      poly([[4, 4], [12, 12], [20, 4]]),
      poly([[4, 8.5], [12, 16.5], [20, 8.5]]),
      poly([[4, 13], [12, 21], [20, 13]]),
    ],
  },
];
