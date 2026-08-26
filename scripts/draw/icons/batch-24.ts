/**
 * Batch 24 — the first batch drawn entirely under the scales.
 *
 * Every corner here is 3 or 2, every mark circle is 1, 2 or 3, and none of that took any
 * deciding: the constructors refuse anything else, so the choices that used to be made per
 * drawing are now made once. What is left to decide is what the icon should be a picture
 * of, which is the only decision worth a person's attention.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { machinePage, server } from "../bodies.ts";
import { SMALL, alert, off } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_24: Icon[] = [
  /* ── People and things they open ──────────────────────────────────────────────── */

  {
    slug: "users", category: "interface", subcategory: "identity",
    name: "Users", description: "More than one person",
    tags: ["people", "team", "group"], family: "figure",
    aliases: ["people"], keywords: ["team", "members", "group", "accounts", "audience"],
    // The second figure is smaller and set back, which is how two of anything are drawn as
    // a group rather than as a pair. Equal and level they would be `multi-agent`.
    shapes: [
      disc(8, 8, 3), arc(8, 20, 5, 180, 360),
      disc(17, 10, 2), arc(17, 20, 4, 180, 360),
    ],
  },
  {
    slug: "folder-open", category: "interface", subcategory: "file",
    name: "Folder open", description: "You are looking inside it",
    tags: ["open", "expanded", "contents"], family: "folder",
    aliases: [], keywords: ["expanded", "current directory", "contents", "browse"],
    // The front falls away at 45° and the back stays square. `folder`'s tab is still there,
    // behind — a folder that opens has to be recognisably the same folder.
    shapes: [
      poly([[4, 20], [4, 4], [9, 4], [12, 7], [19, 7], [19, 11]]),
      poly([[4, 20], [12, 12], [22, 12], [14, 20]], true),
    ],
  },
  {
    slug: "paste", category: "interface", subcategory: "action",
    name: "Paste", description: "Put the copy here",
    tags: ["clipboard", "insert", "place"], family: "window",
    aliases: [], keywords: ["clipboard", "ctrl-v", "insert", "drop"],
        // `clipboard`'s board and clip with something going into it. Drawn as three overlapping
    // rectangles the pair of them is `copy` — and three rectangles on a 24 grid cannot all
    // keep three units of air between their parallel edges, whichever way they are arranged.
    shapes: [
      rect(4, 5, 16, 16, 2), rect(8, 2, 8, 7, 2),
      col(12, 10, 16), poly([[9, 13], [12, 16], [15, 13]]),
    ],
  },
  {
    slug: "inbox-empty", category: "interface", subcategory: "communication",
    name: "Inbox empty", description: "Nothing waiting",
    tags: ["clear", "done", "none"], family: "window",
    aliases: ["inbox-zero"], keywords: ["inbox zero", "all clear", "nothing new", "caught up"],
    // `inbox`'s shelf, flat. The dip is where a letter drops through; without it there is
    // nowhere for anything to have arrived.
    shapes: [rect(2, 4, 20, 16, 2), row(13, 2, 22)],
  },

  /* ── Arranging ────────────────────────────────────────────────────────────────── */

  {
    slug: "group", category: "interface", subcategory: "layout",
    name: "Group", description: "Treat these as one",
    tags: ["combine", "select", "bind"], family: "bracket",
    aliases: [], keywords: ["combine", "selection", "bind", "container", "merge objects"],
    shapes: [
      poly([[3, 9], [3, 3], [9, 3]]), poly([[15, 3], [21, 3], [21, 9]]),
      poly([[21, 15], [21, 21], [15, 21]]), poly([[9, 21], [3, 21], [3, 15]]),
      rect(6, 8, 4, 8, 2), rect(14, 8, 4, 8, 2),
    ],
  },
  {
    slug: "distribute", category: "interface", subcategory: "layout",
    name: "Distribute", description: "Spread them evenly",
    tags: ["space", "align", "even"], family: "rails",
    aliases: [], keywords: ["even spacing", "align", "arrange", "justify"],
    shapes: [col(3, 4, 20), col(21, 4, 20), rect(6, 8, 4, 8, 2), rect(14, 8, 4, 8, 2)],
  },

  /* ── Time and sound ───────────────────────────────────────────────────────────── */

  {
    slug: "timer", category: "interface", subcategory: "time",
    name: "Timer", description: "Counting down",
    tags: ["countdown", "stopwatch", "elapsed"], family: "orbit",
    aliases: ["stopwatch"], keywords: ["countdown", "stopwatch", "elapsed", "duration", "egg timer"],
    // `clock`'s dial with a crown on top. The crown is what separates a thing that tells the
    // time from a thing you start and stop.
    shapes: [
      arc(12, 14, 8, 295, 245), col(12, 9, 14), row(14, 14, 18),
      col(12, 3, 6), row(3, 9, 15),
    ],
  },
  {
    slug: "volume-down", category: "interface", subcategory: "media",
    name: "Volume down", description: "Quieter",
    tags: ["quiet", "lower", "sound"], family: "figure",
    aliases: [], keywords: ["quieter", "turn down", "low volume", "soft"],
    // One wave where `volume` has two. The count is the level, which is the only way to
    // draw loudness without a number.
    shapes: [
      poly([[8, 9], [3, 9], [3, 15], [8, 15], [13, 20], [13, 4]], true),
      arc(13, 12, 5, -60, 60),
    ],
  },
  {
    slug: "spam", category: "interface", subcategory: "communication",
    name: "Spam", description: "Unwanted, and probably lying",
    tags: ["junk", "unwanted", "phishing"], family: "window",
    aliases: ["junk"], keywords: ["junk", "phishing", "unsolicited", "report", "block sender"],
    shapes: [
      frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]]),
      ...alert(SMALL, 10),
    ],
  },
  {
    slug: "agent-inbox", category: "agents", subcategory: "communication",
    name: "Agent inbox", description: "What is waiting for this agent",
    tags: ["queue", "pending", "received"], family: "window",
    aliases: [], keywords: ["task queue", "pending", "assigned", "waiting", "received"],
    shapes: [
      rect(2, 4, 20, 16, 2),
      poly([[2, 13], [7, 13], [10.5, 16.5], [13.5, 16.5], [17, 13], [22, 13]]),
      arc(12, 9, 3, 295, 245),
    ],
  },

  /* ── The protocol, four more ways ─────────────────────────────────────────────── */

  {
    slug: "mcp-initialize", category: "mcp", subcategory: "transport",
    name: "MCP initialize", description: "The first exchange, before anything else",
    tags: ["start", "handshake", "connect"], family: "tower",
    aliases: ["mcp-handshake"], keywords: ["handshake", "negotiate", "capabilities", "startup"],
    shapes: [...server(), poly([[10, 7], [14, 11], [10, 15]])],
  },
  {
    slug: "mcp-progress", category: "mcp", subcategory: "transport",
    name: "MCP progress", description: "How far through a long call it is",
    tags: ["partial", "streaming", "percent"], family: "machine",
    aliases: [], keywords: ["progress token", "partial result", "long running", "percent"],
    shapes: [frame(2, 7, 20, 10, 3, { chamfer: 3, gap: 3 }), col(12, 7, 17)],
  },
  {
    slug: "mcp-session", category: "mcp", subcategory: "transport",
    name: "MCP session", description: "One conversation, from open to close",
    tags: ["connection", "lifetime", "state"], family: "machine",
    aliases: [], keywords: ["session id", "lifetime", "stateful", "connection", "resume"],
    // A dial inside the chamfered body. A session is a connection with a duration, and the
    // duration is the half of it a plain link does not carry.
    shapes: [
      frame(3, 4, 18, 16, 3, { chamfer: 3, gap: 4 }),
      arc(12, 13, 4, 295, 245), col(12, 10, 13), row(13, 13, 16),
    ],
  },
  {
    slug: "mcp-error", category: "mcp", subcategory: "transport",
    name: "MCP error", description: "The call came back wrong",
    tags: ["failure", "fault", "rejected"], family: "page",
    aliases: [], keywords: ["json-rpc error", "fault", "rejected", "exception", "code"],
    shapes: [machinePage(), ...off(SMALL)],
  },
];
