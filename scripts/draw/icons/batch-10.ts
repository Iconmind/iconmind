/**
 * Batch 10 — a body built so a family can hang off it.
 *
 * `mcp-server` was two stacked racks. It read well and it had no hollow anywhere in it, so
 * `mcp-server-check` had nowhere to put its mark except across a rack. `server()` replaces
 * it: a tall chamfered tower whose identifying detail — a port and a status light — sits
 * along the foot, leaving the middle clear. That is now a rule rather than an accident. A
 * body that a family will hang off keeps its middle for the family.
 */
import { area, col, disc, poly, raw, rect, row } from "../forms.ts";
import { cloud, page, server } from "../bodies.ts";
import { BIG, add, alert, check, off } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_10: Icon[] = [
  /* ── The server, and its family ───────────────────────────────────────────────── */

  {
    slug: "mcp-server", category: "mcp", subcategory: "server",
    name: "MCP server", description: "An MCP server — the provider that exposes tools, resources and prompts to a model",
    tags: ["server", "host", "provider"], family: "tower",
    keywords: ["model context protocol", "stdio", "tool server", "provider"],
    shapes: [...server()],
  },
  {
    slug: "mcp-server-add", category: "mcp", subcategory: "server",
    name: "MCP server add", description: "MCP server add — connect and register another server so the model can use it",
    tags: ["new", "connect", "register"], family: "tower",
    keywords: ["add server", "install", "register", "connect"],
    shapes: [...server(), ...add(BIG, 11)],
  },
  {
    slug: "mcp-server-check", category: "mcp", subcategory: "server",
    name: "MCP server check", description: "MCP server check — the server answered, is connected and reports healthy",
    tags: ["healthy", "connected", "verified"], family: "tower",
    keywords: ["healthy", "reachable", "handshake ok", "connected"],
    shapes: [...server(), ...check(BIG, 11)],
  },
  {
    slug: "mcp-server-alert", category: "mcp", subcategory: "server",
    name: "MCP server alert", description: "MCP server alert — something is wrong with this server and it needs attention",
    tags: ["error", "failing", "attention"], family: "tower",
    keywords: ["error", "unreachable", "timeout", "degraded"],
    shapes: [...server(), ...alert(BIG, 11)],
  },
  {
    slug: "mcp-server-off", category: "mcp", subcategory: "server",
    name: "MCP server off", description: "MCP server off — the server is disabled, disconnected or stopped",
    tags: ["disabled", "disconnected", "stopped"], family: "tower",
    keywords: ["disconnect", "disabled", "stopped", "unavailable"],
    shapes: [...server(), ...off(BIG, 11)],
  },

  /* ── Cutting things up ────────────────────────────────────────────────────────── */

  {
    slug: "document-split", category: "rag", subcategory: "chunking",
    name: "Document split", description: "Document split — one document cut into pieces, the first step of chunking for retrieval",
    tags: ["divide", "separate", "chunk"], family: "page",
    aliases: [], keywords: ["split", "divide", "segment", "partition", "cut"],
    // Two halves that were one, and one of them has slid. Level with each other they are a
    // pair of square brackets — nothing says paper, and nothing says the two were ever
    // joined. Offset, they are pieces.
    shapes: [
      poly([[10, 3], [4, 3], [4, 19], [10, 19]]),
      poly([[14, 5], [20, 5], [20, 21], [14, 21]]),
    ],
  },
  {
    slug: "chunk-overlap", category: "rag", subcategory: "chunking",
    name: "Chunk overlap", description: "Chunk overlap — the stretch of text two neighbouring chunks both contain so context is not lost",
    tags: ["shared", "stride", "window"], family: "capsule",
    aliases: [], keywords: ["stride", "sliding window", "shared context", "boundary"],
    // Offset both ways. Offset only downward, the two bars are a list; offset sideways as
    // well, the span they share is visible and that span is the whole concept. Three units
    // between them, not two: at two the facing walls merge at the bold weight and the pair
    // becomes one stepped shape.
    shapes: [rect(3, 5, 13, 5, 2.5), rect(8, 13, 13, 5, 2.5)],
  },

  /* ── Cloud ────────────────────────────────────────────────────────────────────── */

  {
    slug: "serverless", category: "cloud", subcategory: "serverless",
    name: "Serverless", description: "Serverless — code that runs as managed functions without a machine you own or maintain",
    tags: ["function", "lambda", "managed"], family: "cloud",
    aliases: ["function"], keywords: ["lambda", "faas", "edge function", "managed", "cloud run"],
    // `cloud`'s own outline with `trigger`'s bolt inside it. The bolt says the thing fires
    // and stops, which is the half of serverless that is not "somebody else's computer".
    shapes: [
      cloud(),
      poly([[14, 10], [10.5, 13.5], [13, 13.5], [9.5, 17]]),
    ],
  },
  {
    slug: "upload-cloud", category: "cloud", subcategory: "storage",
    name: "Upload to cloud", description: "Upload to cloud — send a file up to cloud storage, a sync service or a backup",
    tags: ["send", "sync", "backup"], family: "cloud",
    aliases: [], keywords: ["sync up", "backup", "push", "store remotely"],
    shapes: [
      cloud(4),
      col(12, 17, 21), poly([[9, 20], [12, 17], [15, 20]]),
    ],
  },
  {
    slug: "download-cloud", category: "cloud", subcategory: "storage",
    name: "Download from cloud", description: "Download from cloud — bring a file back down from cloud storage or restore a backup",
    tags: ["fetch", "sync", "restore"], family: "cloud",
    aliases: [], keywords: ["sync down", "restore", "pull", "fetch remotely"],
    shapes: [
      cloud(4),
      col(12, 17, 21), poly([[9, 18], [12, 21], [15, 18]]),
    ],
  },

  /* ── Things that hold other things ────────────────────────────────────────────── */

  {
    slug: "inbox", category: "interface", subcategory: "communication",
    name: "Inbox", description: "An inbox — the tray where new messages, requests and notifications arrive",
    tags: ["received", "tray", "messages"], family: "window",
    aliases: [], keywords: ["received", "messages", "queue", "unread", "tray"],
    // The dip in the shelf is where a letter drops through. A straight shelf would divide
    // the box into two rooms.
    shapes: [
      rect(2, 4, 20, 16, 2),
      poly([[2, 13], [7, 13], [10.5, 16.5], [13.5, 16.5], [17, 13], [22, 13]]),
    ],
  },
  {
    slug: "archive", category: "interface", subcategory: "file",
    name: "Archive", description: "Archive — put something away in a box to keep, not thrown away but out of sight",
    tags: ["store", "box", "keep"], family: "window",
    aliases: [], keywords: ["store", "cold storage", "retain", "box", "stow"],
    shapes: [rect(2, 2, 20, 5, 2.5), rect(4, 10, 16, 10, 2), row(15, 9, 15)],
  },
  {
    slug: "integration", category: "automation", subcategory: "integration",
    name: "Integration", description: "An integration — two systems connected so they know about each other and share data",
    tags: ["connect", "overlap", "join"], family: "orbit",
    aliases: ["connector"], keywords: ["plugin", "sync", "third party", "venn", "connect"],
    // Two circles sharing a region. `similarity` is the same idea on diamonds, where the
    // overlap is being measured; here it is being used.
    shapes: [disc(9, 12, 5.5), disc(15, 12, 5.5)],
  },

  /* ── Looking back ─────────────────────────────────────────────────────────────── */

  {
    slug: "history", category: "interface", subcategory: "time",
    name: "History", description: "History — what happened before, the log of recent actions and past versions",
    tags: ["past", "recent", "log"], family: "orbit",
    aliases: ["recent"], keywords: ["past", "previous", "timeline", "recently", "back in time"],
    // `retry`'s turning arrow with `clock`'s hands inside it. Retry says go round again;
    // with a dial in the middle it says go round backwards, to when.
    shapes: [
      poly([[3, 4], [3, 9], [8, 9]]),
      col(12, 8, 12), row(12, 12, 16),
      raw("M12 3A9 9 0 1 1 3 12", "three quarters of a circle, opening at the top left", false),
    ],
  },
  {
    slug: "report", category: "analytics", subcategory: "dashboard",
    name: "Report", description: "A report — the numbers written up as a summary document with charts",
    tags: ["summary", "document", "chart"], family: "page",
    aliases: [], keywords: ["summary", "export", "pdf", "monthly", "figures"],
    shapes: [page(), col(9, 14, 18), col(12, 11, 18), col(15, 13, 18), row(18, 8, 16)],
  },

  /* ── Order ────────────────────────────────────────────────────────────────────── */

  {
    slug: "sort-asc", category: "interface", subcategory: "action",
    name: "Sort ascending", description: "Sort ascending — order the list from smallest to largest or A to Z",
    tags: ["order", "ascending", "az"], family: "rails",
    aliases: [], keywords: ["ascending", "a-z", "low to high", "order by"],
    shapes: [row(6, 4, 10), row(12, 4, 15), row(18, 4, 20)],
  },
  {
    slug: "sort-desc", category: "interface", subcategory: "action",
    name: "Sort descending", description: "Sort descending — order the list from largest to smallest or Z to A",
    tags: ["order", "descending", "za"], family: "rails",
    aliases: [], keywords: ["descending", "z-a", "high to low", "order by"],
    shapes: [row(6, 4, 20), row(12, 4, 15), row(18, 4, 10)],
  },

  {
    slug: "braces", category: "devtools", subcategory: "code",
    name: "Braces", description: "Braces — a code block or a JSON object, the curly brackets of structured syntax",
    tags: ["json", "block", "syntax"], family: "bracket",
    aliases: ["json"], keywords: ["curly", "object", "scope", "block", "config"],
    // The notch is two runs at 45° meeting, which is how this set makes every corner that
    // is not square. A real brace curves; this one turns, and at sixteen pixels they agree.
    shapes: [
      poly([[11, 3], [8, 3], [8, 10], [6, 12], [8, 14], [8, 21], [11, 21]]),
      poly([[13, 3], [16, 3], [16, 10], [18, 12], [16, 14], [16, 21], [13, 21]]),
    ],
  },
];
