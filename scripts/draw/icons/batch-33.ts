/**
 * Batch 33 — transports, keys, and the shape of a search index.
 *
 * `hash` was refused here. The glyph is two rows crossing two columns, which is four
 * crossings against a budget of two, and every version that stays under the budget is no
 * longer a hash. It is in the revision queue with the others that want an angle the set
 * does not have.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { machine, page, shield } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_33: Icon[] = [
  /* ── Where people fall out ────────────────────────────────────────────────────── */

  {
    slug: "funnel-step", category: "analytics", subcategory: "segment",
    name: "Funnel step", description: "One stage on the way through",
    tags: ["stage", "narrow", "step"], family: "chart",
    aliases: [], keywords: ["stage", "conversion step", "narrowing", "cohort step"],
    shapes: [row(7, 3, 21), row(12, 6, 18), row(17, 9, 15)],
  },
  {
    slug: "funnel-drop", category: "analytics", subcategory: "segment",
    name: "Funnel drop", description: "Where people leave instead",
    tags: ["churn", "lost", "fell-out"], family: "chart",
    aliases: [], keywords: ["drop off", "abandoned", "lost", "leak", "attrition"],
    shapes: [row(7, 3, 21), row(13, 6, 18), col(19, 13, 19), poly([[16, 16], [19, 19], [22, 16]])],
  },
  {
    slug: "kpi", category: "analytics", subcategory: "dashboard",
    name: "KPI", description: "The one number, and which way it is going",
    tags: ["headline", "target", "trend"], family: "window",
    aliases: [], keywords: ["key metric", "headline number", "north star", "target", "okr"],
    shapes: [rect(2, 4, 20, 16, 2), row(9, 6, 13), poly([[6, 17], [10, 13], [14, 17], [18, 13]])],
  },
  {
    slug: "logits", category: "ai", subcategory: "inference",
    name: "Logits", description: "The raw scores, before they are probabilities",
    tags: ["scores", "raw", "softmax"], family: "chart",
    aliases: [], keywords: ["logprobs", "raw scores", "before softmax", "distribution"],
    shapes: [col(6, 8, 18), col(11, 5, 18), col(16, 11, 18), row(18, 3, 21)],
  },
  {
    slug: "learning-rate", category: "ai", subcategory: "training",
    name: "Learning rate", description: "How big a step to take",
    tags: ["step", "schedule", "decay"], family: "chart",
    aliases: [], keywords: ["step size", "lr schedule", "decay", "warmup", "optimiser"],
    shapes: [poly([[3, 5], [8, 5], [8, 10], [13, 10], [13, 15], [18, 15], [18, 20], [21, 20]])],
  },

  /* ── Keys, and what they open ─────────────────────────────────────────────────── */

  {
    slug: "key", category: "security", subcategory: "secret",
    name: "Key", description: "What opens it",
    tags: ["unlock", "credential", "access"], family: "figure",
    aliases: [], keywords: ["credential", "access", "unlock", "private key", "token"],
    shapes: [disc(7, 12, 4), row(12, 11, 21), col(17, 12, 15), col(20, 12, 15)],
  },
  {
    slug: "key-pair", category: "security", subcategory: "encryption",
    name: "Key pair", description: "One to lock with, one to open with",
    tags: ["public", "private", "asymmetric"], family: "figure",
    aliases: ["keypair"], keywords: ["public private", "asymmetric", "rsa", "signing"],
    shapes: [
      disc(5, 8, 2), row(8, 7, 17), col(15, 8, 11),
      disc(19, 16, 2), row(16, 7, 17), col(9, 13, 16),
    ],
  },
  {
    slug: "gdpr", category: "security", subcategory: "compliance",
    name: "GDPR", description: "A record about a person, and the rules for it",
    tags: ["privacy", "personal", "regulation"], family: "page",
    aliases: [], keywords: ["privacy", "personal data", "regulation", "dsar", "right to erasure"],
    shapes: [page(), disc(12, 10, 2), arc(12, 19, 5, 180, 360)],
  },
  {
    slug: "firewall-rule", category: "security", subcategory: "policy",
    name: "Firewall rule", description: "One line of what may pass",
    tags: ["allow", "deny", "acl"], family: "page",
    aliases: [], keywords: ["acl", "allow list", "deny", "ingress rule", "security group"],
    shapes: [page(), row(9, 7, 17), col(12, 9, 15), row(15, 7, 17)],
  },

  /* ── How a server is reached ──────────────────────────────────────────────────── */

  {
    slug: "grpc", category: "devtools", subcategory: "api",
    name: "gRPC", description: "Two services calling each other in binary",
    tags: ["rpc", "protobuf", "duplex"], family: "figure",
    aliases: [], keywords: ["protobuf", "rpc", "streaming", "duplex", "service mesh"],
    shapes: [
      rect(14, 4, 8, 16, 2),
      row(9, 2, 14), poly([[11, 6], [14, 9], [11, 12]]),
      row(15, 2, 14), poly([[5, 12], [2, 15], [5, 18]]),
    ],
  },
  {
    slug: "graphql-node", category: "devtools", subcategory: "api",
    name: "GraphQL node", description: "One field, and what hangs off it",
    tags: ["field", "query", "graph"], family: "figure",
    aliases: [], keywords: ["field", "resolver", "query node", "selection set", "schema"],
    shapes: [disc(12, 12, 3), col(12, 3, 9), poly([[9.5, 14.5], [5, 19]]), poly([[14.5, 14.5], [19, 19]])],
  },
  {
    slug: "llm-chat", category: "ai", subcategory: "inference",
    name: "LLM chat", description: "The model, talking",
    tags: ["conversation", "reply", "bubble"], family: "machine",
    aliases: [], keywords: ["chat", "conversation", "assistant reply", "turn", "dialogue"],
    shapes: [frame(2, 4, 20, 12, 3, { chamfer: 3, gap: 0 }), poly([[7, 16], [7, 21], [12, 16]])],
  },
  {
    slug: "gpu-cluster", category: "cloud", subcategory: "compute",
    name: "GPU cluster", description: "Many of them, working together",
    tags: ["fleet", "nodes", "training"], family: "figure",
    aliases: [], keywords: ["gpu fleet", "a100", "nodes", "training cluster", "accelerators"],
    shapes: [
      rect(2, 2, 6.5, 6.5, 2), rect(15.5, 2, 6.5, 6.5, 2),
      rect(2, 15.5, 6.5, 6.5, 2), rect(15.5, 15.5, 6.5, 6.5, 2),
      poly([[11, 11], [13, 13]]), poly([[13, 11], [11, 13]]),
    ],
  },

  /* ── The shape of an index ────────────────────────────────────────────────────── */

  {
    slug: "hnsw", category: "rag", subcategory: "vector",
    name: "HNSW", description: "A graph you can search in layers",
    tags: ["index", "graph", "layers"], family: "figure",
    aliases: [], keywords: ["hierarchical", "navigable", "ann index", "graph index", "layers"],
    shapes: [
      disc(12, 5, 2), disc(7, 12, 2), disc(17, 12, 2),
      disc(4, 19, 1), disc(12, 19, 1), disc(20, 19, 1),
    ],
  },
  {
    slug: "knowledge-graph", category: "rag", subcategory: "knowledge",
    name: "Knowledge graph", description: "Facts joined to other facts",
    tags: ["entities", "edges", "triples"], family: "figure",
    aliases: [], keywords: ["entities", "triples", "rdf", "ontology", "relations"],
    shapes: [
      disc(6, 7, 2), disc(18, 7, 2), disc(6, 17, 2), disc(18, 17, 2),
      row(7, 8, 16), col(6, 9, 15),
    ],
  },
  {
    slug: "kv-cache", category: "ai", subcategory: "inference",
    name: "KV cache", description: "What the model already worked out",
    tags: ["reuse", "attention", "fast"], family: "window",
    aliases: [], keywords: ["key value cache", "attention cache", "prefill", "reuse", "speed"],
    shapes: [rect(2, 5, 20, 14, 2), col(10, 5, 19), row(9, 12, 19), row(15, 12, 19)],
  },
  {
    slug: "lineage", category: "data", subcategory: "catalog",
    name: "Lineage", description: "Where this came from, and what came from it",
    tags: ["provenance", "upstream", "trace"], family: "figure",
    aliases: [], keywords: ["provenance", "upstream", "downstream", "impact", "derived from"],
    shapes: [disc(4, 12, 2), poly([[6, 12], [12, 12], [16, 8], [21, 8]]), poly([[12, 12], [16, 16], [21, 16]])],
  },

  /* ── Editing, and the marks left behind ───────────────────────────────────────── */

  {
    slug: "inline-suggestion", category: "devtools", subcategory: "editor",
    name: "Inline suggestion", description: "What it thinks you were about to type",
    tags: ["ghost", "completion", "hint"], family: "figure",
    aliases: ["ghost-text"], keywords: ["copilot", "ghost text", "autocomplete", "accept", "tab"],
    shapes: [
      row(6, 3, 21), row(12, 3, 10),
      row(12, 13, 15.5), row(12, 18.5, 21), row(18, 3, 8),
    ],
  },
  {
    slug: "inpaint", category: "interface", subcategory: "media",
    name: "Inpaint", description: "Redraw just this part",
    tags: ["region", "fill", "patch"], family: "window",
    aliases: [], keywords: ["mask", "region", "fill in", "generative fill", "patch"],
    shapes: [rect(2, 4, 20, 16, 2), rect(7, 8, 10, 8, 2), poly([[10, 14], [13, 11]])],
  },
  {
    slug: "lint-run", category: "devtools", subcategory: "testing",
    name: "Lint", description: "The marks under what needs fixing",
    tags: ["style", "warnings", "check"], family: "page",
    aliases: [], keywords: ["eslint", "style check", "warnings", "squiggle", "static analysis"],
    shapes: [page(), row(9, 8, 16), poly([[8, 14], [10, 16], [12, 14], [14, 16], [16, 14]])],
  },
  {
    slug: "link-off", category: "interface", subcategory: "action",
    name: "Unlink", description: "Broken apart",
    tags: ["broken", "detach", "unjoin"], family: "figure",
    aliases: ["unlink"], keywords: ["broken link", "detach", "disconnect", "404", "unjoin"],
    shapes: [rect(2, 5, 9, 6, 3), rect(13, 13, 9, 6, 3)],
  },
  {
    slug: "layout", category: "interface", subcategory: "layout",
    name: "Layout", description: "Where the parts of the page go",
    tags: ["grid", "arrange", "regions"], family: "window",
    aliases: [], keywords: ["template", "regions", "arrangement", "wireframe", "structure"],
    shapes: [rect(2, 4, 20, 16, 2), col(9, 4, 20), row(12, 9, 22)],
  },
  {
    slug: "install", category: "devtools", subcategory: "package",
    name: "Install", description: "Put it on the machine",
    tags: ["add", "setup", "deploy"], family: "machine",
    aliases: [], keywords: ["npm install", "setup", "add package", "provision", "apt"],
    shapes: [machine(), col(12, 2, 8), poly([[9, 5], [12, 8], [15, 5]])],
  },
  {
    slug: "human-eval", category: "ai", subcategory: "evaluation",
    name: "Human evaluation", description: "A person scoring the answers",
    tags: ["rater", "review", "score"], family: "figure",
    aliases: [], keywords: ["human rater", "annotation", "preference", "review", "labelling"],
    shapes: [disc(7, 8, 3), arc(7, 19, 5, 180, 360), poly([[13, 14], [16, 17], [21, 12]])],
  },
];
