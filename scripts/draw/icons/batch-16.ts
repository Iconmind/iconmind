/**
 * Batch 16 — the alignment set, and objects with moving parts.
 *
 * `align-left`, `align-center` and `align-right` are three runs whose lengths never change
 * — 18, 11 and 15 — only which edge they are flush against. Written any other way the three
 * would be three drawings that happen to be about text; written this way they are one
 * drawing seen from three sides, and a reader who learns one has learned all of them.
 */
import { arc, area, col, disc, frame, poly, rect, row } from "../forms.ts";
import { ring } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_16: Icon[] = [
  /* ── Alignment: one drawing, three edges ──────────────────────────────────────── */

  {
    slug: "align-left", category: "interface", subcategory: "layout",
    name: "Align left", description: "Align left — text flush against the left edge, ragged on the right",
    tags: ["text", "flush", "ragged"], family: "rails",
    aliases: ["text-align-start"], keywords: ["justify left", "ragged right", "text align", "start"],
    shapes: [row(6, 3, 21), row(12, 3, 14), row(18, 3, 18)],
  },
  {
    slug: "align-center", category: "interface", subcategory: "layout",
    name: "Align center", description: "Align center — text centred on the line, ragged on both sides",
    tags: ["text", "centred", "middle"], family: "rails",
    aliases: ["text-align-center"], keywords: ["justify center", "centre", "text align", "middle"],
    shapes: [row(6, 3, 21), row(12, 6.5, 17.5), row(18, 4.5, 19.5)],
  },
  {
    slug: "align-right", category: "interface", subcategory: "layout",
    name: "Align right", description: "Align right — text flush against the right edge, ragged on the left",
    tags: ["text", "flush", "ragged"], family: "rails",
    aliases: ["text-align-end"], keywords: ["justify right", "ragged left", "text align", "end"],
    shapes: [row(6, 3, 21), row(12, 10, 21), row(18, 6, 21)],
  },

  /* ── Marks ────────────────────────────────────────────────────────────────────── */

  {
    slug: "more-vertical", category: "interface", subcategory: "action",
    name: "More vertical", description: "More vertical — the other options, hidden in a kebab menu of three dots",
    tags: ["ellipsis", "kebab", "menu"], family: "mark",
    aliases: ["kebab"], keywords: ["overflow", "context menu", "dots", "options"],
    shapes: [disc(12, 5, 1), disc(12, 12, 1), disc(12, 19, 1)],
  },
  {
    slug: "info", category: "interface", subcategory: "state",
    name: "Info", description: "Info — something worth knowing, a detail or a note about this",
    tags: ["about", "detail", "note"], family: "orbit",
    aliases: ["about"], keywords: ["details", "help", "note", "tooltip", "learn more"],
    // `warning`'s ring with the mark the other way up. The pair is the convention and it is
    // worth keeping: a dot over a bar means read this, a bar over a dot means stop.
    shapes: [disc(12, 12, 9), disc(12, 7, 1), col(12, 11, 17)],
  },

  /* ── Direction ────────────────────────────────────────────────────────────────── */

  {
    slug: "reply", category: "interface", subcategory: "communication",
    name: "Reply", description: "Reply — answer a message and send a response back to the sender",
    tags: ["respond", "back", "answer"], family: "arrow",
    aliases: ["respond"], keywords: ["answer", "re", "back to sender", "comment"],
    // The turn is what makes it a reply. A plain left arrow is `arrow-left`; this one comes
    // back from somewhere, which is why the shaft has a corner in it.
    shapes: [poly([[8, 4], [3, 9], [8, 14]]), poly([[3, 9], [17, 9], [17, 20]])],
  },
  {
    slug: "forward", category: "interface", subcategory: "communication",
    name: "Forward", description: "Forward — pass a message on to somebody else who should see it",
    tags: ["send-on", "share", "relay"], family: "arrow",
    aliases: [], keywords: ["send on", "relay", "redirect", "fwd"],
    shapes: [poly([[16, 4], [21, 9], [16, 14]]), poly([[21, 9], [7, 9], [7, 20]])],
  },
  {
    slug: "shuffle", category: "interface", subcategory: "media",
    name: "Shuffle", description: "Shuffle — play or arrange things in no particular order, a random mix",
    tags: ["random", "mix", "cross"], family: "arrow",
    aliases: ["random"], keywords: ["random", "mix", "reorder", "randomise"],
    shapes: [
      poly([[3, 7], [9, 7], [18, 16], [21, 16]]), poly([[18, 13], [21, 16], [18, 19]]),
      poly([[3, 17], [9, 17], [18, 8], [21, 8]]), poly([[18, 5], [21, 8], [18, 11]]),
    ],
  },

  /* ── Objects with moving parts ────────────────────────────────────────────────── */

  {
    slug: "print", category: "interface", subcategory: "action",
    name: "Print", description: "Print — put it on paper, send a document to a printer for a hard copy",
    tags: ["paper", "output", "hardcopy"], family: "window",
    aliases: [], keywords: ["hardcopy", "pdf", "output", "printer"],
    shapes: [rect(6, 2, 12, 6, 3), rect(2, 11, 20, 8, 2), row(15, 7, 17)],
  },
  {
    slug: "save", category: "interface", subcategory: "action",
    name: "Save", description: "Save — keep the changes, write them to disk so they are not lost",
    tags: ["store", "disk", "commit"], family: "window",
    aliases: [], keywords: ["write", "persist", "disk", "floppy", "ctrl-s"],
    // The shutter is a U opening onto the top edge, not a rectangle drawn against it. As a
    // rectangle its own top lies along the body's for six units, which renders as one thick
    // rule; as a U the body's edge closes it and nothing is drawn twice.
    shapes: [rect(3, 3, 18, 18, 2), poly([[8, 3], [8, 9], [16, 9], [16, 3]]), row(15, 8, 16)],
  },
  {
    slug: "pin", category: "interface", subcategory: "action",
    name: "Pin", description: "Pin — keep it where it is, fix an item in place so it does not move",
    tags: ["fix", "stick", "keep"], family: "figure",
    aliases: [], keywords: ["stick", "keep on top", "fix", "tack", "always show"],
    // A pushpin seen from the side, not a map marker. `location` is the marker, and the two
    // get confused everywhere — the crossbar and the needle are what tell them apart.
    shapes: [
      row(5, 6, 18), poly([[9, 5], [9, 13], [12, 16], [15, 13], [15, 5]]), col(12, 16, 21),
    ],
  },
  {
    slug: "cut", category: "interface", subcategory: "action",
    name: "Cut", description: "Cut — take it out and hold it on the clipboard to move elsewhere",
    tags: ["scissors", "remove", "clip"], family: "figure",
    aliases: ["scissors"], keywords: ["clip", "trim", "ctrl-x", "snip", "remove"],
    shapes: [
      poly([[6, 4], [17, 15]]), poly([[18, 4], [7, 15]]),
      disc(7, 18, 2), disc(17, 18, 2),
    ],
  },
  {
    slug: "alarm", category: "interface", subcategory: "time",
    name: "Alarm", description: "An alarm — it will go off at a set time to wake you or remind you",
    tags: ["wake", "reminder", "ring"], family: "orbit",
    aliases: ["alarm-clock"], keywords: ["wake", "timer", "reminder", "snooze", "ring"],
    // `clock` with feet. The two hands are at the same coordinates as the clock's, so the
    // pair reads as the same instrument with something added rather than as two clocks.
    shapes: [disc(12, 13, 8), poly([[12, 8], [12, 13], [16, 13]]), poly([[3, 6], [6, 3]]), poly([[21, 6], [18, 3]])],
  },
  {
    slug: "message", category: "interface", subcategory: "communication",
    name: "Message", description: "A message — something somebody said, a chat bubble or a comment",
    tags: ["chat", "bubble", "comment"], family: "window",
    aliases: ["chat"], keywords: ["comment", "bubble", "conversation", "dm", "thread"],
    // The tail is open where it meets the bubble. Closed, its top edge lies along the
    // bubble's bottom for four units — two strokes on one line, which render as one thick
    // rule and which the validator refuses outright.
    shapes: [frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]])],
  },

  /* ── Codes and light ──────────────────────────────────────────────────────────── */

  {
    slug: "qr", category: "interface", subcategory: "media",
    name: "QR code", description: "A QR code — point a camera at the square to open a link or a payload",
    tags: ["scan", "code", "square"], family: "grid",
    aliases: ["qr-code"], keywords: ["scan", "barcode", "link", "camera", "2d code"],
    // Three corners and one mark. A real code has hundreds of cells; three finder squares
    // are what a person recognises, and drawing the cells is drawing noise.
    shapes: [rect(3, 3, 7, 7, 2), rect(14, 3, 7, 7, 2), rect(3, 14, 7, 7, 2), disc(17, 17, 2)],
  },
  {
    slug: "barcode", category: "interface", subcategory: "media",
    name: "Barcode", description: "A barcode — the older striped code that identifies a product when scanned",
    tags: ["scan", "stripes", "product"], family: "rails",
    aliases: [], keywords: ["upc", "ean", "scan", "sku", "stripes"],
    shapes: [col(4, 5, 19), col(7, 5, 19), col(11, 5, 19), col(14, 5, 19), col(18, 5, 19)],
  },
  {
    slug: "contrast", category: "interface", subcategory: "media",
    name: "Contrast", description: "Contrast — light against dark, the theme tone of a display or an image",
    tags: ["theme", "half", "tone"], family: "orbit",
    aliases: [], keywords: ["theme", "invert", "tone", "accessibility", "dark mode"],
    shapes: [
      disc(12, 12, 9),
      area("M12 3A9 9 0 0 1 12 21Z", "half the disc, closed across its own diameter"),
    ],
  },
];
