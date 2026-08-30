/**
 * Batch 09 — arrows, and the second wave of families.
 *
 * Four arrows and three chevrons that had to exist before anything else could point. They
 * are one drawing turned four ways, and they are written out four times rather than rotated
 * at build time: a rotation would put the shaft's anchors on the same half-unit grid but
 * its cap on the other side of a pixel boundary at 16px, and the whole reason for the grid
 * is that it survives that size.
 *
 * Then the families the mark system makes nearly free. `folder-add` is `folder()` with
 * `plus` in its hollow; `document-off` is `page()` with the cross. The page takes the small
 * mark and the folder takes the big one, because a page is twelve units wide inside and a
 * folder is sixteen — the hollow decides, not the concept.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { bookmark, folder, page, window_ } from "../bodies.ts";
import { SMALL, add, check, off } from "../marks.ts";
import type { Icon } from "../build.ts";

/** The rings and the header rule that make a window a calendar. */
const calendarParts = () => [window_(), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5)];

export const BATCH_09: Icon[] = [
  /* ── Pointing ─────────────────────────────────────────────────────────────────── */

  {
    slug: "arrow-up", category: "interface", subcategory: "arrow",
    name: "Arrow up", description: "An arrow pointing up — move upward, go north, increase a value or scroll to the top",
    tags: ["up", "north", "increase"], family: "arrow",
    aliases: [], keywords: ["north", "increase", "rise", "top", "ascend"],
    shapes: [col(12, 4, 20), poly([[7, 9], [12, 4], [17, 9]])],
  },
  {
    slug: "arrow-down", category: "interface", subcategory: "arrow",
    name: "Arrow down", description: "An arrow pointing down — move downward, go south, decrease a value or scroll to the bottom",
    tags: ["down", "south", "decrease"], family: "arrow",
    aliases: [], keywords: ["south", "decrease", "fall", "bottom", "descend"],
    shapes: [col(12, 4, 20), poly([[7, 15], [12, 20], [17, 15]])],
  },
  {
    slug: "arrow-left", category: "interface", subcategory: "arrow",
    name: "Arrow left", description: "An arrow pointing left — go back, move west or return to the previous screen",
    tags: ["left", "back", "west"], family: "mark",
    aliases: ["back"], keywords: ["west", "previous", "return", "backward"],
    shapes: [row(12, 4, 20), poly([[9, 7], [4, 12], [9, 17]])],
  },
  {
    slug: "arrow-right", category: "interface", subcategory: "arrow",
    name: "Arrow right", description: "An arrow pointing right — carry on, move east or continue to the next screen",
    tags: ["right", "forward", "east"], family: "mark",
    aliases: ["arrow"], keywords: ["east", "next", "continue", "onward", "forward"],
    shapes: [row(12, 4, 20), poly([[15, 7], [20, 12], [15, 17]])],
  },
  {
    slug: "chevron-up", category: "interface", subcategory: "arrow",
    name: "Chevron up", description: "An up-pointing chevron — collapse what is below, show less or go up a level",
    tags: ["collapse", "up", "less"], family: "chevron",
    aliases: [], keywords: ["close", "less", "fold", "scroll up", "collapse"],
    shapes: [poly([[5, 15], [12, 8], [19, 15]])],
  },
  {
    slug: "chevron-left", category: "interface", subcategory: "arrow",
    name: "Chevron left", description: "A left-pointing chevron — go back to the previous item or close what is open here",
    tags: ["back", "previous", "left"], family: "chevron",
    aliases: [], keywords: ["previous", "return", "caret", "disclosure"],
    shapes: [poly([[15, 5], [8, 12], [15, 19]])],
  },

  {
    slug: "external-link", category: "interface", subcategory: "action",
    name: "External link", description: "An external link — this opens somewhere else, in a new tab or outside the app",
    tags: ["outside", "new-tab", "away"], family: "window",
    aliases: ["open-in-new"], keywords: ["new tab", "outbound", "leave", "away", "target blank"],
    // The box is open at the corner the arrow leaves through. Closed, the arrow would be
    // crossing a wall rather than going out of a door.
    shapes: [
      poly([[10, 6], [4, 6], [4, 20], [18, 20], [18, 14]]),
      poly([[12, 12], [20, 4]]),
      poly([[14, 4], [20, 4], [20, 10]]),
    ],
  },

  {
    slug: "maximize", category: "interface", subcategory: "layout",
    name: "Maximize", description: "Maximize — make a window or panel expand to fill the whole space or go fullscreen",
    tags: ["expand", "fullscreen", "grow"], family: "bracket",
    aliases: ["fullscreen"], keywords: ["expand", "enlarge", "full screen", "grow"],
    // Four corners pointing out. A frame with arrows in it would be a window with arrows in
    // it; four corners are the space itself, being pushed at.
    shapes: [
      poly([[3, 9], [3, 3], [9, 3]]), poly([[15, 3], [21, 3], [21, 9]]),
      poly([[21, 15], [21, 21], [15, 21]]), poly([[9, 21], [3, 21], [3, 15]]),
    ],
  },
  {
    slug: "minimize", category: "interface", subcategory: "layout",
    name: "Minimize", description: "Minimize — shrink a window or panel and give the space back to what is behind it",
    tags: ["shrink", "restore", "collapse"], family: "bracket",
    aliases: [], keywords: ["shrink", "exit fullscreen", "collapse", "reduce", "restore"],
    shapes: [
      // Four corners, four elbows, all pointing at the centre. The top-right one was
      // drawn with its elbow on the outer edge — three corners collapsing inward and one
      // pointing out, which is what made the icon read as scattered crop marks.
      poly([[9, 3], [9, 9], [3, 9]]), poly([[15, 3], [15, 9], [21, 9]]),
      poly([[21, 15], [15, 15], [15, 21]]), poly([[9, 21], [9, 15], [3, 15]]),
    ],
  },

  /* ── Objects a family hangs off ───────────────────────────────────────────────── */

  {
    slug: "clipboard", category: "interface", subcategory: "file",
    name: "Clipboard", description: "A clipboard — what you copied, waiting to be pasted somewhere else",
    tags: ["paste", "copy", "board"], family: "window",
    aliases: [], keywords: ["copy", "buffer", "board", "clip"],
    shapes: [rect(4, 5, 16, 16, 2), rect(8, 2, 8, 7, 2)],
  },
  {
    slug: "credit-card", category: "interface", subcategory: "action",
    name: "Credit card", description: "A credit card — how a purchase, a subscription or a bill gets paid for",
    tags: ["payment", "billing", "card"], family: "window",
    aliases: ["payment"], keywords: ["billing", "checkout", "stripe", "pay", "card"],
    shapes: [rect(2, 6, 20, 13, 2), row(11, 2, 22), row(15, 5, 10)],
  },
  {
    slug: "phone", category: "interface", subcategory: "communication",
    name: "Phone", description: "A phone — the mobile device in your pocket, a call or the mobile version of an app",
    tags: ["mobile", "device", "call"], family: "window",
    aliases: ["mobile"], keywords: ["device", "cell", "handset", "responsive", "call"],
    shapes: [rect(7, 2, 10, 20, 2), row(5, 10, 14), row(19, 10, 14)],
  },
  {
    slug: "monitor", category: "interface", subcategory: "media",
    name: "Monitor", description: "A monitor — the big desktop screen or display an app is shown on",
    tags: ["screen", "display", "desktop"], family: "window",
    aliases: ["screen"], keywords: ["display", "desktop", "resolution", "output"],
    shapes: [frame(2, 4, 20, 13, 3, { gap: 4 }), col(12, 17, 20), row(20, 7, 17)],
  },
  {
    slug: "heart", category: "interface", subcategory: "action",
    name: "Heart", description: "A heart — liked, loved, kept as a favourite to come back to later",
    tags: ["like", "favourite", "love"], family: "figure",
    aliases: ["like"], keywords: ["favourite", "favorite", "love", "save", "star"],
    // Two arcs and a V, and the V is at the set's own angle. Every other heart is two
    // cubics; this one is two circles and two straight runs, and it still reads at sixteen.
    shapes: [arc(8, 9, 4, 180, 0), arc(16, 9, 4, 180, 0), poly([[4, 9], [12, 17], [20, 9]])],
  },

  /* ── The folder family ────────────────────────────────────────────────────────── */

  // The small mark, one unit below the canvas centre. The folder's tab steps down to
  // (12,7), and the big mark's upright starts at 8 — one unit of clear air, which at the
  // bold weight is none at all, because each stroke reaches an eighth past its own line.

  {
    slug: "folder-add", category: "interface", subcategory: "file",
    name: "Folder add", description: "Folder add — create a new folder or directory to keep files together",
    tags: ["new", "create", "directory"], family: "folder",
    aliases: ["new-folder"], keywords: ["new directory", "create", "mkdir"],
    shapes: [folder(), ...add(SMALL, 13)],
  },
  {
    slug: "folder-check", category: "interface", subcategory: "file",
    name: "Folder check", description: "Folder check — this folder is in order, synced, verified or done",
    tags: ["synced", "verified", "done"], family: "folder",
    aliases: [], keywords: ["synced", "backed up", "verified", "complete"],
    shapes: [folder(), ...check(SMALL, 13)],
  },
  {
    slug: "folder-off", category: "interface", subcategory: "file",
    name: "Folder off", description: "Folder off — this folder is missing, disabled or excluded from view",
    tags: ["missing", "disabled", "excluded"], family: "folder",
    aliases: [], keywords: ["missing", "ignored", "excluded", "unavailable"],
    shapes: [folder(), ...off(SMALL, 13)],
  },

  /* ── The document family ──────────────────────────────────────────────────────── */

  {
    slug: "document-add", category: "interface", subcategory: "file",
    name: "Document add", description: "Document add — start a new file or page from scratch, a blank document",
    tags: ["new", "create", "file"], family: "page",
    aliases: ["new-file"], keywords: ["new document", "create", "blank", "compose"],
    // The small mark, not the big one. A page is twelve units wide inside where a folder is
    // sixteen — the hollow decides which mark fits, and it is not a property of the concept.
    shapes: [page(), ...add(SMALL)],
  },
  {
    slug: "document-check", category: "interface", subcategory: "file",
    name: "Document check", description: "Document check — this file has been dealt with, approved or signed off",
    tags: ["approved", "signed", "done"], family: "page",
    aliases: [], keywords: ["approved", "signed", "reviewed", "complete"],
    shapes: [page(), ...check(SMALL)],
  },
  {
    slug: "document-off", category: "interface", subcategory: "file",
    name: "Document off", description: "Document off — this file is gone, unreadable, corrupt or excluded",
    tags: ["missing", "corrupt", "excluded"], family: "page",
    aliases: [], keywords: ["missing", "deleted", "corrupt", "unreadable"],
    shapes: [page(), ...off(SMALL)],
  },

  /* ── The calendar family ──────────────────────────────────────────────────────── */

  {
    slug: "calendar-add", category: "interface", subcategory: "time",
    name: "Calendar add", description: "Calendar add — put a new event, meeting or deadline into the diary",
    tags: ["schedule", "event", "new"], family: "window",
    aliases: [], keywords: ["new event", "book", "appointment", "add date", "schedule"],
    // The mark sits below the header rule rather than on the canvas centre. A calendar's
    // hollow starts where its header ends, which is three units lower than the canvas's.
    shapes: [...calendarParts(), ...add(SMALL, 15)],
  },
  {
    slug: "calendar-check", category: "interface", subcategory: "time",
    name: "Calendar check", description: "Calendar check — that day is settled, booked and confirmed in the diary",
    tags: ["booked", "confirmed", "done"], family: "window",
    aliases: [], keywords: ["confirmed", "booked", "attended", "rsvp"],
    shapes: [...calendarParts(), ...check(SMALL, 15)],
  },
  {
    slug: "calendar-off", category: "interface", subcategory: "time",
    name: "Calendar off", description: "Calendar off — the event is cancelled or the date is blocked and unavailable",
    tags: ["cancelled", "unavailable", "blocked"], family: "window",
    aliases: [], keywords: ["cancelled", "declined", "blocked", "unavailable"],
    shapes: [...calendarParts(), ...off(SMALL, 15)],
  },

  {
    slug: "bookmark-add", category: "interface", subcategory: "action",
    name: "Bookmark add", description: "Bookmark add — keep this one, save it as a new favourite to find again",
    tags: ["save", "new", "favourite"], family: "ribbon",
    aliases: [], keywords: ["save for later", "add to list", "pin", "collect"],
    // Two units above the canvas centre, because the ribbon's notch cuts into the middle
    // from below and a mark there sits on the point of it.
    shapes: [bookmark(), ...add(SMALL, 10)],
  },
];
