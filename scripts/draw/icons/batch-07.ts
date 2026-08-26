/**
 * Batch 07 — the everyday interface, where the set has to hold its own against Lucide.
 *
 * These are the icons a reader already knows the shape of. A magnifier with a plus in it is
 * zoom-in everywhere, and drawing it differently to be distinctive would only make it worse.
 * What the language does here is quieter: `zoom-in` and `zoom-out` are `search`'s own lens
 * with `plus` and `minus` in it, and `shield-check` is `shield()` with the mark `check` uses
 * — so the set stays one set even where each drawing is the obvious one.
 *
 * Six of these are arcs at angles the grid has nothing to say about — a bell's dome, a
 * speaker's waves, a wifi fan. `arc()` holds its centre to the grid and its endpoints to the
 * live area, and that is the right amount of rule for a curve: an arc endpoint is where the
 * radius and the angle put it, not somewhere an author chose.
 */
import { arc, area, col, disc, frame, poly, rect, row } from "../forms.ts";
import { shield } from "../bodies.ts";
import { SMALL, add, alert, check, off, remove } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_07: Icon[] = [
  /* ── The lens, and what goes in it ────────────────────────────────────────────── */

  {
    slug: "zoom-in", category: "interface", subcategory: "action",
    name: "Zoom in", description: "Look closer",
    tags: ["magnify", "closer", "enlarge"], family: "magnifier",
    aliases: [], keywords: ["magnify", "enlarge", "scale up", "closer"],
    // `search`'s lens with `plus` in it, at the lens's own centre rather than the canvas's.
    // The lens sits up and left so its handle has room, and a mark on the canvas centre
    // pokes out of its right rim — which is exactly what happened in the set before this.
    shapes: [arc(10, 10, 7, 292, 248), poly([[15, 15], [21, 21]]), col(10, 7, 13), row(10, 7, 13)],
  },

  {
    slug: "zoom-out", category: "interface", subcategory: "action",
    name: "Zoom out", description: "Pull back",
    tags: ["shrink", "further", "reduce"], family: "magnifier",
    aliases: [], keywords: ["reduce", "scale down", "further", "shrink"],
    shapes: [arc(10, 10, 7, 292, 248), poly([[15, 15], [21, 21]]), row(10, 7, 13)],
  },

  {
    slug: "eye-off", category: "interface", subcategory: "state",
    name: "Eye off", description: "Hidden",
    tags: ["hide", "invisible", "private"], family: "eye",
    aliases: ["hide"], keywords: ["hidden", "invisible", "conceal", "private", "unwatch"],
    // `observability`'s eye entire, pupil included, with a stroke through it. Without the
    // pupil the two lids and a diagonal come out as a fish — the ichthys, unmistakably, at
    // every size. The pupil is what makes the shape an eye before the slash cancels it.
    shapes: [
      arc(12, 19.5, 12.5, 216.87, 323.13),
      arc(12, 4.5, 12.5, 36.87, 143.13),
      disc(12, 12, 2),
      poly([[4, 20], [20, 4]]),
    ],
  },

  /* ── Shields, from the mark system ────────────────────────────────────────────── */

  {
    slug: "shield-check", category: "security", subcategory: "policy",
    name: "Shield check", description: "It passed the policy",
    tags: ["safe", "verified", "compliant"], family: "shield",
    aliases: ["verified"], keywords: ["compliant", "approved", "secure", "passed", "audit"],
    // The mark sits one unit above the canvas centre. A shield's diagonals close in below
    // the middle, so its widest clear span is not where the canvas's is.
    shapes: [shield(), ...check(SMALL, 11)],
  },

  {
    slug: "shield-alert", category: "security", subcategory: "threat",
    name: "Shield alert", description: "The policy caught something",
    tags: ["risk", "violation", "warning"], family: "shield",
    aliases: [], keywords: ["violation", "risk", "breach", "flagged", "threat"],
    shapes: [shield(), ...alert(SMALL, 11)],
  },

  {
    slug: "shield-off", category: "security", subcategory: "policy",
    name: "Shield off", description: "Protection is disabled",
    tags: ["unprotected", "disabled", "exposed"], family: "shield",
    aliases: [], keywords: ["unprotected", "disabled", "bypass", "exposed", "insecure"],
    shapes: [shield(), ...off(SMALL, 11)],
  },

  {
    slug: "unlock", category: "security", subcategory: "auth",
    name: "Unlock", description: "It is open",
    tags: ["open", "granted", "access"], family: "lock",
    aliases: [], keywords: ["open", "access granted", "decrypt", "unlocked", "permit"],
    // The shackle swings up and to the right and ends in the air. Drawn as a closed shackle
    // shifted off centre it is a padlock somebody drew badly; ending in mid-air is what
    // makes it open.
    shapes: [rect(5, 9, 14, 11, 2), arc(12, 9, 5, 180, 315), disc(12, 14.5, 1)],
  },

  /* ── State, at a glance ───────────────────────────────────────────────────────── */

  {
    slug: "power", category: "interface", subcategory: "state",
    name: "Power", description: "On, or off",
    tags: ["on", "off", "toggle"], family: "orbit",
    aliases: ["on-off"], keywords: ["shutdown", "restart", "standby", "switch", "boot"],
    // The one place the set's own language is also everybody else's: a ring broken at the
    // top with a bar through the break. `ring()`'s gap is that gap, unaltered.
    shapes: [arc(12, 12, 10, 295, 245), col(12, 3, 10)],
  },

  {
    slug: "battery", category: "interface", subcategory: "state",
    name: "Battery", description: "How much is left",
    tags: ["charge", "power", "level"], family: "window",
    aliases: ["charge"], keywords: ["level", "energy", "remaining", "low battery"],
    // The terminal sits three units off the body's wall — which at the regular weight is a
    // visible unit of white, and at bold is the minimum two strokes may come to each other.
    // Closer, the pair reads as one lumpy rectangle and the rule refuses it outright.
    shapes: [rect(2, 7, 15, 10, 2), col(20, 10, 14), rect(5, 10, 7, 4, 2)],
  },

  {
    slug: "wifi", category: "interface", subcategory: "state",
    name: "Wi-Fi", description: "Connected, wirelessly",
    tags: ["signal", "wireless", "network"], family: "fan",
    aliases: ["signal"], keywords: ["wireless", "network", "connection", "hotspot", "bars"],
    // Three arcs on one centre, three and a half units apart. At three they merge at the
    // bold weight; at four the outermost runs out of the live area on the way round.
    shapes: [
      arc(12, 18, 11, 215, 325), arc(12, 18, 7.5, 215, 325), arc(12, 18, 4, 215, 325),
      disc(12, 18, 1),
    ],
  },

  {
    slug: "sun", category: "interface", subcategory: "state",
    name: "Sun", description: "Light",
    tags: ["light", "day", "bright"], family: "orbit",
    aliases: ["light-mode"], keywords: ["day", "bright", "theme", "light mode", "brightness"],
    accepted: {
      "lint/element-budget":
        "four rays on the axes is a crosshair; light needs the diagonals as well",
    },
    // Eight rays. Four, on the axes, is a crosshair — the drawing needs the diagonals to
    // stop being a target, and there is no arrangement of four that reads as light. It costs
    // nine elements, which is over the budget and said so in the metadata.
    shapes: [
      disc(12, 12, 4.5),
      col(12, 2, 5.5), col(12, 18.5, 22), row(12, 2, 5.5), row(12, 18.5, 22),
      poly([[5, 5], [7.5, 7.5]]), poly([[19, 5], [16.5, 7.5]]),
      poly([[5, 19], [7.5, 16.5]]), poly([[19, 19], [16.5, 16.5]]),
    ],
  },

  {
    slug: "moon", category: "interface", subcategory: "state",
    name: "Moon", description: "Night, or the dark theme",
    tags: ["night", "dark", "sleep"], family: "orbit",
    aliases: ["dark-mode"], keywords: ["night", "dark mode", "theme", "sleep", "crescent"],
    // A crescent is one shape bounded by two arcs of different radius on the same two
    // points, which no constructor takes. The chord is 18 and both radii clear it.
    shapes: [
      area(
        "M18 3A10 10 0 1 0 18 21A12 12 0 0 1 18 3Z",
        "a crescent: two arcs on the same chord of 18, one of radius 10 the long way round "
        + "and one of radius 12 back, which is the only way to bound a lune",
      ),
    ],
  },

  {
    slug: "globe", category: "interface", subcategory: "layout",
    name: "Globe", description: "Everywhere, or the public internet",
    tags: ["world", "international", "web"], family: "orbit",
    aliases: ["world"], keywords: ["internet", "language", "region", "public", "www"],
    // The meridian is an ellipse, which is the one curve in the set that is not a circle.
    // Drawn with circular arcs it bulges past the sphere it is supposed to be on.
    shapes: [
      disc(12, 12, 9), row(12, 3, 21),
      area("M12 3A6 9 0 0 0 12 21A6 9 0 0 0 12 3Z", "the meridian is an ellipse of 6 by 9"),
    ],
  },

  /* ── Media ────────────────────────────────────────────────────────────────────── */

  {
    slug: "mic", category: "interface", subcategory: "media",
    name: "Microphone", description: "Speak",
    tags: ["voice", "record", "audio"], family: "figure",
    aliases: ["microphone"], keywords: ["voice", "record", "speech", "dictate", "audio input"],
    shapes: [rect(9, 2, 6, 10, 3), arc(12, 10, 5, 0, 180), col(12, 15, 20)],
  },

  {
    slug: "volume", category: "interface", subcategory: "media",
    name: "Volume", description: "How loud",
    tags: ["sound", "audio", "speaker"], family: "figure",
    aliases: ["sound"], keywords: ["speaker", "loud", "mute", "audio", "level"],
    // The cone is one closed run: drawn as a rectangle with a triangle beside it the two
    // tear apart at the seam where the square ends of their bands meet.
    shapes: [
      poly([[8, 9], [3, 9], [3, 15], [8, 15], [13, 20], [13, 4]], true),
      arc(13, 12, 5, -60, 60), arc(13, 12, 8, -60, 60),
    ],
  },

  {
    slug: "video", category: "interface", subcategory: "media",
    name: "Video", description: "Moving pictures",
    tags: ["camera", "film", "record"], family: "window",
    aliases: ["camcorder"], keywords: ["film", "record", "movie", "stream", "meeting"],
    shapes: [
      frame(2, 6, 14, 12, 3, { gap: 3 }),
      poly([[19, 10], [22, 7], [22, 17], [19, 14]], true),
    ],
  },

  {
    slug: "bell", category: "interface", subcategory: "communication",
    name: "Bell", description: "You will be told",
    tags: ["notification", "alert", "ring"], family: "figure",
    aliases: ["notification"], keywords: ["notify", "alarm", "reminder", "subscribe", "ping"],
    shapes: [
      arc(12, 13, 6, 180, 360), col(6, 13, 17), col(18, 13, 17),
      row(17, 4, 20), disc(12, 20, 1),
    ],
  },

  /* ── Getting around ───────────────────────────────────────────────────────────── */

  {
    slug: "location", category: "interface", subcategory: "layout",
    name: "Location", description: "Here, on a map",
    tags: ["pin", "place", "map"], family: "figure",
    aliases: [], keywords: ["map", "place", "marker", "geo", "address", "pin"],
    // One shape, not a circle with a triangle under it. Drawn as two the circle's own lower
    // arc stays visible inside the point and the pin gets a notch where its tip should be.
    // Here the arc stops at the circle's widest points and two runs at 45° close it.
    shapes: [
      area(
        "M4 10A8 8 0 0 1 20 10L12 18Z",
        "a circle open below its widest points, closed by two runs at 45° meeting at the tip",
      ),
      disc(12, 10, 3),
    ],
  },

  {
    slug: "link", category: "interface", subcategory: "action",
    name: "Link", description: "Joined to something else",
    tags: ["chain", "url", "connect"], family: "capsule",
    aliases: ["chain"], keywords: ["url", "href", "hyperlink", "connect", "attach"],
    // Two capsules overlapping by two units. Separated they are two pills; the overlap is
    // the entire drawing, and it has to be big enough to survive the bold weight.
    shapes: [frame(2, 9, 11, 6, 3, { gap: 0 }), frame(11, 9, 11, 6, 3, { gap: 0 })],
  },

  {
    slug: "undo", category: "interface", subcategory: "action",
    name: "Undo", description: "Put it back the way it was",
    tags: ["back", "revert", "history"], family: "orbit",
    aliases: ["revert"], keywords: ["back", "rollback", "history", "ctrl-z", "reverse"],
    shapes: [arc(12, 13, 7, 180, 0), col(19, 13, 18), poly([[2, 10], [5, 13], [8, 10]])],
  },

  {
    slug: "redo", category: "interface", subcategory: "action",
    name: "Redo", description: "Do it again after all",
    tags: ["forward", "repeat", "history"], family: "orbit",
    aliases: [], keywords: ["forward", "again", "history", "ctrl-y", "reapply"],
    shapes: [arc(12, 13, 7, 180, 0), col(5, 13, 18), poly([[16, 10], [19, 13], [22, 10]])],
  },

  /* ── Lists ────────────────────────────────────────────────────────────────────── */

  {
    slug: "menu", category: "interface", subcategory: "layout",
    name: "Menu", description: "Everything else is in here",
    tags: ["hamburger", "nav", "more"], family: "rails",
    aliases: ["hamburger"], keywords: ["nav", "navigation", "drawer", "sidebar", "more"],
    // Flush, and equal. `stream`'s three runs are offset because something is passing;
    // these are still, which is the difference between a menu and a feed.
    shapes: [row(6, 4, 20), row(12, 4, 20), row(18, 4, 20)],
  },

  {
    slug: "list", category: "interface", subcategory: "layout",
    name: "List", description: "Items, one after another",
    tags: ["items", "bullets", "rows"], family: "rails",
    aliases: [], keywords: ["bullets", "items", "rows", "todo", "enumerate"],
    shapes: [
      disc(4, 6, 1), row(6, 8, 20),
      disc(4, 12, 1), row(12, 8, 20),
      disc(4, 18, 1), row(18, 8, 20),
    ],
  },

  {
    slug: "more-horizontal", category: "interface", subcategory: "action",
    name: "More", description: "There are other options",
    tags: ["ellipsis", "overflow", "options"], family: "mark",
    aliases: ["ellipsis"], keywords: ["overflow", "options", "kebab", "dots", "actions"],
    // Seven units apart. A dot of radius 1.5 stroked at the bold weight is five and a half
    // across, so six apart is a smear and seven is three dots.
    shapes: [disc(5, 12, 1), disc(12, 12, 1), disc(19, 12, 1)],
  },
];
