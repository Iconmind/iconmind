/**
 * Batch 18 — the cut corner becomes a claim.
 *
 * Everything MCP owns now has its top-left corner cut. `mcp-server` is a chamfered tower,
 * `mcp-resource` is a chamfered page, `mcp-tool` is a chamfered plug — and each of them
 * differs from the plain version of itself by exactly that corner. A resource is a file a
 * server hands over rather than a file somebody wrote, and the chamfer is the whole of what
 * says so.
 *
 * That is the machine register earning its keep for the second time. It started as a way to
 * tell a terminal from a text field; it turns out to be a way to say which system a thing
 * belongs to, without a badge and without a colour.
 */
import { arc, body, col, frame, poly, rect, row } from "../forms.ts";
import { cloud, machinePage } from "../bodies.ts";
import { SMALL, add, alert, check, off } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_18: Icon[] = [
  /* ── The cloud's family ───────────────────────────────────────────────────────── */

  {
    slug: "cloud-add", category: "cloud", subcategory: "compute",
    name: "Cloud add", description: "Cloud add — connect a new cloud account or provision a new cloud resource",
    tags: ["new", "connect", "provision"], family: "cloud",
    aliases: [], keywords: ["provision", "connect account", "new resource", "spin up"],
    // The small mark, centred on the canvas rather than on the cloud. A cloud's widest
    // clear span is not where its bounding box's centre is — the lobes rise above it and
    // the base is flat — but the middle of the canvas happens to sit inside both.
    shapes: [cloud(), ...add(SMALL)],
  },
  {
    slug: "cloud-check", category: "cloud", subcategory: "compute",
    name: "Cloud check", description: "Cloud check — the cloud side is healthy, connected and in sync",
    tags: ["healthy", "connected", "synced"], family: "cloud",
    aliases: [], keywords: ["synced", "connected", "healthy", "reachable"],
    shapes: [cloud(), ...check(SMALL)],
  },
  {
    slug: "cloud-alert", category: "cloud", subcategory: "compute",
    name: "Cloud alert", description: "Cloud alert — something is wrong up in the cloud, an error or a degraded service",
    tags: ["error", "degraded", "attention"], family: "cloud",
    aliases: [], keywords: ["outage", "degraded", "quota", "error", "incident"],
    shapes: [cloud(), ...alert(SMALL)],
  },
  {
    slug: "cloud-off", category: "cloud", subcategory: "compute",
    name: "Cloud off", description: "Cloud off — disconnected from the cloud, working offline or locally",
    tags: ["offline", "disconnected", "local"], family: "cloud",
    aliases: ["offline", "cloud-x"], keywords: ["offline", "disconnected", "local only", "no sync"],
    shapes: [cloud(), ...off(SMALL)],
  },

  /* ── What a server hands over ─────────────────────────────────────────────────── */

  {
    slug: "mcp-resource", category: "mcp", subcategory: "resource",
    name: "MCP resource", description: "An MCP resource — a file, record or piece of data a server offers to a model",
    tags: ["data", "file", "provided"], family: "page",
    aliases: [], keywords: ["uri", "context", "attachment", "provided data", "read-only"],
    shapes: [machinePage(), row(12, 9, 15), row(16, 9, 15)],
  },
  {
    slug: "mcp-resource-add", category: "mcp", subcategory: "resource",
    name: "MCP resource add", description: "MCP resource add — expose another resource so a model can read it",
    tags: ["new", "expose", "register"], family: "page",
    aliases: [], keywords: ["expose", "register", "publish", "new uri"],
    shapes: [machinePage(), ...add(SMALL)],
  },
  {
    slug: "mcp-resource-read", category: "mcp", subcategory: "resource",
    name: "MCP resource read", description: "MCP resource read — fetch the contents of a resource the server is offering",
    tags: ["fetch", "load", "get"], family: "page",
    aliases: [], keywords: ["fetch", "get", "load", "retrieve", "subscribe"],
    // The chevron reads as "go", which is what `inference` and `runbook` use it for. Here
    // the thing going is the data, out of the page and into the model.
    shapes: [machinePage(), poly([[10, 9], [14, 13], [10, 17]])],
  },
  {
    slug: "mcp-resource-list", category: "mcp", subcategory: "resource",
    name: "MCP resource list", description: "MCP resource list — the catalogue of everything this server offers to read",
    tags: ["catalogue", "index", "available"], family: "page",
    aliases: [], keywords: ["catalog", "available", "enumerate", "index", "manifest"],
    // Two of the same page, offset. `document-split` uses the same move for two halves that
    // were one; here they are two of many, which is what an offset stack has always meant.
    shapes: [
      body(poly([[13, 2], [10, 2], [7, 5], [7, 17], [17, 17], [17, 7]])),
      body(poly([[16, 7], [13, 7], [10, 10], [10, 22], [20, 22], [20, 12]])),
    ],
  },

  /* ── What a server can do ─────────────────────────────────────────────────────── */

  {
    slug: "mcp-tool", category: "mcp", subcategory: "tool",
    name: "MCP tool", description: "An MCP tool — a function a server lets a model call to act in the world",
    tags: ["capability", "function", "plug"], family: "figure",
    aliases: [], keywords: ["function", "capability", "invoke", "action", "handler"],
    // Three prongs where `tool-calling` has two, and the corner is cut. The prong count is
    // not decoration: two is a plug and three is a plug of a particular kind, which is the
    // difference between a model reaching out and a server offering something specific.
    shapes: [
      frame(6, 10, 12, 9, 3, { chamfer: 3, gap: 0 }),
      col(9, 5, 10), col(12, 5, 10), col(15, 5, 10),
    ],
  },
  {
    slug: "mcp-prompt", category: "mcp", subcategory: "prompt",
    name: "MCP prompt", description: "An MCP prompt — a canned prompt template a server provides ready to use",
    tags: ["template", "provided", "canned"], family: "window",
    aliases: [], keywords: ["slash command", "template", "canned", "provided prompt"],
    shapes: [frame(3, 6, 18, 12, 3, { chamfer: 5, gap: 5 }), col(9, 10, 14), row(12, 12, 17)],
  },

  /* ── Searching by meaning ─────────────────────────────────────────────────────── */

  {
    slug: "vector-search", category: "rag", subcategory: "retrieval",
    name: "Vector search", description: "Vector search — find the nearest points in embedding space, a k-nearest-neighbour lookup",
    tags: ["nearest", "knn", "distance"], family: "magnifier",
    aliases: ["knn"], keywords: ["nearest neighbour", "ann", "cosine", "index", "faiss"],
    // `search`'s lens with `vector`'s arrow inside it. `semantic-search` puts `embedding`'s
    // diamond there instead: one is looking by direction, the other by meaning, and the
    // lens is identical in both so the pair reads as two ways of doing one thing.
    shapes: [
      arc(10, 10, 7, 292, 248), poly([[15, 15], [21, 21]]),
      poly([[7, 13], [13, 7]]), poly([[10, 7], [13, 7], [13, 10]]),
    ],
  },

  /* ── Two more ─────────────────────────────────────────────────────────────────── */

  {
    slug: "null-check", category: "data", subcategory: "quality",
    name: "Null check", description: "A null check — is anything missing, empty or blank in this record?",
    tags: ["empty", "missing", "blank"], family: "window",
    aliases: [], keywords: ["null", "nan", "missing values", "blank", "empty cell"],
    // A cell with a stroke through it. The stroke crosses the cell's own walls, which is
    // the one place in this set where a mark is allowed to leave the body it is marking.
    shapes: [rect(4, 7, 16, 10, 2), poly([[4, 18], [18, 4]])],
  },
  {
    slug: "draft", category: "interface", subcategory: "file",
    name: "Draft", description: "A draft — started but not finished, unsent and still a work in progress",
    tags: ["unfinished", "wip", "unsent"], family: "page",
    aliases: [], keywords: ["unsent", "work in progress", "unpublished", "scratch"],
    // The outline stops before it gets round. `document` breaks at the fold, which is where
    // a page opens; this one breaks where the drawing ran out, which is what a draft is.
    shapes: [poly([[13, 3], [6, 3], [6, 21], [14, 21]]), row(9, 9, 15), row(13, 9, 13)],
  },
];
