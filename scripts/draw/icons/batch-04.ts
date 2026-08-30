/**
 * Batch 04 — states, machines and the things that guard them.
 *
 * The agent lifecycle starts here, and it is the first real test of what the language was
 * for: `agent-run`, `agent-stop` and `agent-thinking` are one body with three different
 * things in its middle. Nothing about the ring changes between them, so nothing can drift
 * between them — which is the whole argument for putting the hollow in the body rather than
 * hanging a badge off its corner.
 *
 * `shield()` joins the vocabulary because two concepts wanted it. Bodies earn their place by
 * being used twice; promoting one on first use is how a vocabulary fills with things nobody
 * needs.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { core, machine, panel, ring, shield, window_ } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_04: Icon[] = [
  /* ── One body, three states ───────────────────────────────────────────────────── */

  {
    slug: "agent-run", category: "agents", subcategory: "lifecycle",
    name: "Agent run", description: "Run an agent — start an AI agent on its task and let it work through its loop",
    tags: ["start", "execute", "play"], family: "orbit",
    aliases: ["agent-start"], keywords: ["run", "execute", "launch", "invoke"],
    // `agent` with the play mark where its core was. The ring is untouched, so the three
    // lifecycle icons cannot drift apart in size, weight or where their gap falls.
    shapes: [ring(), poly([[10, 7], [15, 12], [10, 17]])],
  },

  {
    slug: "agent-stop", category: "agents", subcategory: "lifecycle",
    name: "Agent stop", description: "Stop an agent — halt a running AI agent before it takes another step",
    tags: ["halt", "cancel", "end"], family: "orbit",
    aliases: [], keywords: ["halt", "terminate", "kill", "abort", "end"],
    // A square, not an X. An X in the middle means the thing is broken; a square is the
    // sign that has meant "stop" on every transport control since the tape recorder.
    shapes: [ring(), rect(8.5, 8.5, 7, 7, 2)],
  },

  {
    slug: "agent-thinking", category: "agents", subcategory: "lifecycle",
    name: "Agent thinking", description: "An agent thinking — the AI is busy reasoning, planning or working on the task",
    tags: ["working", "busy", "reasoning"], family: "orbit",
    aliases: [], keywords: ["busy", "processing", "ellipsis", "waiting", "reasoning"],
    // Bars rather than dots, and the middle one taller. Dots at this spacing merge at the
    // bold weight — a dot of radius 1 stroked at 2.5 is 4.5 across, and three of them 5
    // apart become one smear. Level, the three bars are a pause button; uneven, they are
    // something moving.
    shapes: [ring(), disc(8, 12, 1), disc(12, 12, 1), disc(16, 12, 1)],
  },

  {
    slug: "tool-calling", category: "agents", subcategory: "tool-use",
    name: "Tool calling", description: "Tool calling — an agent reaching outside itself to run a function, an API or a tool",
    tags: ["plug", "invoke", "external"], family: "figure",
    aliases: ["tool-use"], keywords: ["function calling", "plug", "connector", "invoke"],
    // A plug. Every other drawing for this is a wrench, and a wrench says "maintenance" —
    // what actually happens is that the model reaches out and connects to something.
    shapes: [rect(6, 11, 12, 9, 2), col(9, 4, 11), col(15, 4, 11)],
  },

  {
    slug: "human-approval", category: "agents", subcategory: "communication",
    name: "Human approval", description: "Human approval — a gate where a person has to say yes before an agent continues",
    tags: ["review", "consent", "gate"], family: "figure",
    aliases: ["user-check", "user-check-2", "user-round-check"], keywords: ["review", "sign-off", "consent", "manual"],
    // The figure from `user`, moved left to make room for the mark from `check`. Two
    // existing drawings, unaltered, side by side — which is what a compound icon should be.
    shapes: [disc(9, 8, 3), arc(9, 21, 6, 180, 360), poly([[15, 12], [17, 14], [21, 10]])],
  },

  {
    slug: "subtask", category: "agents", subcategory: "planning",
    name: "Subtask", description: "A subtask — a piece of work nested inside a bigger task an agent or a team is doing",
    tags: ["child", "nested", "step"], family: "rails",
    aliases: [], keywords: ["child task", "nested", "indent", "breakdown"],
    // A parent and two children hanging off one stem. With a single child the drawing is
    // two runs and a corner, which is a bracket — it takes a second branch before the stem
    // reads as a stem.
    shapes: [row(6, 3, 21), poly([[6, 10], [6, 16], [11, 16]]), row(16, 14, 21)],
  },

  /* ── Running things ───────────────────────────────────────────────────────────── */

  {
    slug: "deploy", category: "devops", subcategory: "ci-cd",
    name: "Deploy", description: "Deploy — ship a build to the place where people will actually use it",
    tags: ["ship", "release", "publish"], family: "machine",
    aliases: ["ship"], keywords: ["release", "publish", "rollout", "production"],
    // The arrow leaves the machine rather than entering it, and it leaves through the gap
    // the body already has. `upload` is the same arrow over a tray, where the tray is what
    // the thing came out of; here it is what the thing came out of and stays.
    shapes: [
      frame(4, 11, 16, 9, 3, { gap: 3 }),
      col(12, 3, 8), poly([[9, 6], [12, 3], [15, 6]]),
    ],
  },

  {
    slug: "cluster", category: "devops", subcategory: "orchestration",
    name: "Cluster", description: "A cluster — many machines or nodes behaving as one system, a fleet under one control plane",
    tags: ["nodes", "group", "fleet"], family: "grid",
    aliases: ["nodes"], keywords: ["kubernetes", "fleet", "swarm", "replicas", "pool"],
    // Four, not three. Three reads as a diagram of relationships; four in a square reads as
    // "more of the same", which is what a cluster is.
    shapes: [rect(4, 4, 7, 7, 2), rect(14, 4, 7, 7, 2), rect(4, 14, 7, 7, 2), rect(14, 14, 7, 7, 2)],
  },

  {
    slug: "observability", category: "devops", subcategory: "observability",
    name: "Observability", description: "Observability — being able to see what a system is doing through logs, metrics and traces",
    tags: ["watch", "monitor", "eye"], family: "eye",
    aliases: ["observe", "monitoring"], keywords: ["telemetry", "tracing", "logs", "metrics", "watch"],
    // Two arcs on the same two corners, so the lids meet exactly rather than nearly. Both
    // centres sit on the grid and the corners land on 2 and 22 — the eye is as wide as the
    // live area allows, because a narrow eye reads as a closed one.
    shapes: [
      arc(12, 19.5, 12.5, 216.87, 323.13),
      arc(12, 4.5, 12.5, 36.87, 143.13),
      core(3),
    ],
  },

  {
    slug: "incident", category: "devops", subcategory: "incident",
    name: "Incident", description: "An incident — something is wrong in production and someone has to respond",
    tags: ["outage", "alert", "failure"], family: "machine",
    aliases: ["outage"], keywords: ["pager", "sev", "on-call", "failure", "postmortem"],
    // A machine that has been struck. The first drawing was `warning`'s bar and dot inside
    // the machine — which turned out to be `model-alert` exactly, byte for byte, because
    // that is what the mark system makes it. An incident is not a model with a flag on it;
    // it is something that happened to a system, so the drawing is the thing that happened.
    shapes: [machine(), poly([[15, 7], [10, 12], [13, 12], [8, 17]])],
  },

  {
    slug: "gpu", category: "cloud", subcategory: "compute",
    name: "GPU", description: "A GPU — the graphics card or accelerator where the heavy matrix maths of AI actually runs",
    tags: ["graphics", "accelerator", "card"], family: "machine",
    aliases: ["accelerator"], keywords: ["cuda", "nvidia", "vram", "tensor", "training"],
    // A card, not a chip: wide, with a fan at one end and fins at the other. `cpu` is
    // square and surrounded by pins, and the two have to be told apart at sixteen pixels.
    shapes: [
      frame(2, 6, 20, 12, 3, { chamfer: 3, gap: 4 }),
      disc(8, 12, 3), col(15, 9, 15), col(18, 9, 15),
    ],
  },

  /* ── Guarding things ──────────────────────────────────────────────────────────── */

  {
    slug: "auth", category: "security", subcategory: "auth",
    name: "Authentication", description: "Authentication — proving who you are with a login, a key or an identity provider",
    tags: ["login", "lock", "identity"], family: "lock",
    aliases: [], keywords: ["sign in", "oauth", "credentials", "padlock", "session"],
    // The body is closed, and that is the point: an open padlock is a different icon and
    // means the opposite. This is the one register where the set's gap would lie.
    shapes: [rect(10, 9, 12, 11, 2), arc(16, 9, 4, 180, 360), disc(4, 14, 2), row(14, 6.5, 13)],
  },

  {
    slug: "secret", category: "security", subcategory: "secret",
    name: "Secret", description: "A secret — a credential, token or key that only the system should ever know",
    tags: ["key", "credential", "token"], family: "key",
    aliases: ["credential"], keywords: ["api key", "password", "vault", "env var"],
    // A key on the diagonal, so the teeth are perpendicular to the shaft and both are on
    // the set's angles. Horizontal, the teeth would have to be vertical stubs of about two
    // units, which vanish at the bold weight.
    shapes: [
      disc(6.5, 17.5, 3.5), poly([[9.5, 14.5], [18, 6]]),
      poly([[14, 10], [16.5, 12.5]]), poly([[17.5, 6.5], [20, 9]]),
    ],
  },

  {
    slug: "encryption", category: "security", subcategory: "encryption",
    name: "Encryption", description: "Encryption — data made unreadable to anyone who does not hold the key",
    tags: ["cipher", "protect", "shield"], family: "shield",
    aliases: ["cipher"], keywords: ["aes", "tls", "at rest", "in transit", "keyhole"],
    // A shield with a keyhole. The shield alone means "protected"; the keyhole says the
    // protection is a lock rather than a wall, which is the difference encryption makes.
    shapes: [shield(), disc(12, 11, 2)],
  },

  /* ── Things you look at ───────────────────────────────────────────────────────── */

  {
    slug: "dashboard", category: "analytics", subcategory: "dashboard",
    name: "Dashboard", description: "A dashboard — everything worth watching laid out as panels on one screen",
    tags: ["panels", "overview", "layout"], family: "window",
    aliases: ["overview"], keywords: ["panels", "widgets", "grafana", "monitoring", "tiles"],
    // Three regions, not four. Four equal panes is a grid; unequal panes read as a layout
    // somebody arranged, which is what a dashboard is.
    shapes: [window_(), row(11, 3, 21), col(12, 11, 21)],
  },

  {
    slug: "api", category: "devtools", subcategory: "api",
    name: "API", description: "An API — the interface one program offers another, its endpoints and its contract",
    tags: ["interface", "endpoint", "contract"], family: "window",
    aliases: [], keywords: ["rest", "graphql", "sdk", "contract", "http", "endpoint"],
    // `code`'s two chevrons, inside a panel. The chevrons alone are source; put behind a
    // surface they become the part of it another program is allowed to touch.
    shapes: [panel(), poly([[10, 9], [7, 12], [10, 15]]), poly([[14, 9], [17, 12], [14, 15]])],
  },

  {
    slug: "condition", category: "automation", subcategory: "condition",
    name: "Condition", description: "A condition — the point in a flow where the path splits depending on a test",
    tags: ["branch", "if", "decision"], family: "lattice",
    aliases: ["decision"], keywords: ["if", "branch", "switch", "rule", "gate"],
    // A diamond with two ways out. Closed, because a decision that is still open is not a
    // decision — this is one of the few places the language's gap would say the wrong thing.
    shapes: [
      poly([[12, 4], [18, 10], [12, 16], [6, 10]], true),
      row(10, 18, 21), row(10, 3, 6),
    ],
  },

  {
    slug: "dag", category: "data", subcategory: "orchestration",
    name: "DAG", description: "A DAG — tasks connected by dependencies in a directed graph with no way back",
    tags: ["graph", "dependencies", "acyclic"], family: "chain",
    aliases: [], keywords: ["airflow", "dependency graph", "topology", "acyclic"],
    // Two inputs joining and carrying on. A DAG's defining property is that the arrows only
    // go one way, so the drawing converges rather than making a loop.
    shapes: [
      disc(6, 6, 2), disc(6, 18, 2),
      poly([[8, 8], [12, 12]]), poly([[8, 16], [12, 12]]),
      row(12, 12, 15.5), disc(18, 12, 2),
    ],
  },

  /* ── Finding things ───────────────────────────────────────────────────────────── */

  {
    slug: "semantic-search", category: "rag", subcategory: "retrieval",
    name: "Semantic search", description: "Semantic search — find things by what they mean, using vectors and similarity rather than keywords",
    tags: ["meaning", "vector", "similarity"], family: "magnifier",
    aliases: [], keywords: ["knn", "similarity", "nearest neighbour", "ann", "meaning"],
    // `search`'s lens with `embedding`'s diamond inside it. Two drawings the set already
    // has, and the compound means exactly what the two of them mean together.
    shapes: [
      poly([[15, 15], [21, 21]]),
      poly([[10, 7], [13, 10], [10, 13], [7, 10]], true),
      arc(10, 10, 7, 292, 248),
    ],
  },

  {
    slug: "reranker", category: "rag", subcategory: "ranking",
    name: "Reranker", description: "A reranker — a model that puts retrieved results back in the order of true relevance",
    tags: ["rank", "sort", "relevance"], family: "rails",
    aliases: ["rerank"], keywords: ["cross-encoder", "relevance", "sort", "order", "score"],
    // Runs of equal length, and an arrow beside them. Runs of decreasing length would say
    // "sorted by size"; what a reranker changes is the order, not the contents.
    shapes: [
      row(6, 3, 16), row(12, 3, 16), row(18, 3, 16),
      col(20, 6, 18), poly([[18, 16], [20, 18], [22, 16]]),
    ],
  },
];
