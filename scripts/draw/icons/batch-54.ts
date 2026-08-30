/**
 * Batch 54 — round 3 of the 1k plan: the chat composer and its small controls.
 *
 * Family discipline: input boxes quote `field`'s box-and-caret, the attach clip
 * is `attach`'s capsule, dividers-in-a-frame are `registry`'s idiom. Two planned
 * concepts were swapped: `hashtag` cannot exist under the crossing budget (a # is
 * four crossings against a maximum of two), and `pill-toggle` is `toggle` again.
 * `chip-add` and `text-cursor` take their seats.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

export const BATCH_54: Icon[] = [
  /* ── The composer ─────────────────────────────────────────────────────────────── */

  {
    slug: "composer", category: "interface", subcategory: "communication",
    name: "Composer", description: "The composer — the input box where a message is written before it is sent",
    tags: ["input", "write", "send"], family: "window",
    aliases: ["message-input"], keywords: ["chat input", "message box", "type here", "send"],
    // `field`'s box and caret, and `send`'s diagonal arrow waiting in the corner.
    shapes: [
      rect(2, 7, 20, 10, 2), col(6, 10, 14),
      poly([[14.5, 14.5], [18.5, 10.5]]), poly([[15.5, 10.5], [18.5, 10.5], [18.5, 13.5]]),
    ],
  },
  {
    slug: "composer-attach", category: "interface", subcategory: "communication",
    name: "Composer attach", description: "Composer attach — a file clipped to ride along with the message",
    tags: ["file", "clip", "upload"], family: "window",
    aliases: [], keywords: ["attach file", "paperclip", "add attachment", "upload"],
    // The composer, and the attachment riding above it — `attach`'s page, already
    // on its way into the message.
    shapes: [
      rect(2, 11.5, 20, 9, 2), col(6, 14, 18),
      rect(13.5, 2, 6.5, 6.5, 2),
    ],
  },
  {
    slug: "composer-expand", category: "interface", subcategory: "communication",
    name: "Composer expand", description: "Composer expand — more room to write, the input grown to fullscreen",
    tags: ["grow", "fullscreen", "larger"], family: "window",
    aliases: [], keywords: ["expand input", "large editor", "grow composer"],
    // The composer, and the chevron it grows toward.
    shapes: [
      rect(2, 9, 20, 9, 2), col(6, 11.5, 15.5),
      poly([[9, 6], [12, 3], [15, 6]]),
    ],
  },
  {
    slug: "slash-command", category: "interface", subcategory: "action",
    name: "Slash command", description: "A slash command — type / and the list of commands appears ready to pick",
    tags: ["shortcut", "menu", "type"], family: "window",
    aliases: [], keywords: ["slash menu", "command palette", "quick action", "/"],
    // The slash in `field`'s box, caret waiting after it.
    shapes: [
      rect(2, 8, 20, 8, 2),
      poly([[7.5, 13.5], [11, 10]]), col(14.5, 10.5, 13.5),
    ],
  },
  {
    slug: "at-mention", category: "interface", subcategory: "communication",
    name: "At mention", description: "An at-mention — say a name with @ and that person gets notified",
    tags: ["mention", "notify", "name"], family: "figure",
    aliases: ["mention"], keywords: ["@", "mention someone", "ping", "tag a person"],
    // The @ as this grid can spell it: a real lowercase a — bowl, and the stem
    // tangent to its right — inside the outer curl, whose opening lets the stem
    // read as the tail.
    shapes: [
      disc(10.5, 12.5, 3.5), col(14.5, 9, 16),
      arc(12, 12, 9, 25, 335),
    ],
  },

  /* ── Chips, in a family of three ──────────────────────────────────────────────── */

  {
    slug: "chip", category: "interface", subcategory: "action",
    name: "Chip", description: "A chip — a small labelled pill you can pick, a filter or a token",
    tags: ["pill", "filter", "token"], family: "window",
    aliases: ["filter-chip"], keywords: ["chip", "pill", "filter token", "selected value"],
    shapes: [rect(3, 8, 18, 8, 4), disc(7.5, 12, 2), row(12, 11, 17)],
  },
  {
    slug: "chip-add", category: "interface", subcategory: "action",
    name: "Chip add", description: "Chip add — another chip joins the set of filters or tokens in the field",
    tags: ["plus", "filter", "new"], family: "window",
    aliases: [], keywords: ["add filter", "add tag", "new chip"],
    shapes: [
      rect(3, 8, 18, 8, 4), row(12, 6.5, 11),
      row(12, 14, 18), col(16, 10, 14),
    ],
  },
  {
    slug: "chip-remove", category: "interface", subcategory: "action",
    name: "Chip remove", description: "Chip remove — a chip dismissed and taken back out of the set",
    tags: ["dismiss", "clear", "x"], family: "window",
    aliases: [], keywords: ["remove filter", "clear tag", "dismiss chip"],
    shapes: [
      rect(3, 8, 18, 8, 4), row(12, 6.5, 11),
      poly([[14.5, 10.5], [17.5, 13.5]]), poly([[17.5, 10.5], [14.5, 13.5]]),
    ],
  },

  /* ── Two more small controls ──────────────────────────────────────────────────── */

  {
    slug: "segmented", category: "interface", subcategory: "action",
    name: "Segmented", description: "A segmented control — a few choices side by side with one of them pressed",
    tags: ["control", "options", "tabs"], family: "window",
    aliases: ["segmented-control"], keywords: ["segmented control", "option group", "tab bar"],
    // `registry`'s divider idiom sideways: three rooms, and the dot says which
    // one is chosen.
    shapes: [
      rect(2, 8, 20, 8, 2), col(9, 8, 16), col(15, 8, 16),
      disc(5.5, 12, 1),
    ],
  },
  {
    slug: "text-cursor", category: "interface", subcategory: "action",
    name: "Text cursor", description: "A text cursor — the I-beam caret that shows where the words will go",
    tags: ["ibeam", "caret", "editing"], family: "figure",
    aliases: ["ibeam"], keywords: ["text cursor", "i-beam", "caret", "insertion point"],
    shapes: [row(4, 8, 16), col(12, 4, 20), row(20, 8, 16)],
  },
];
