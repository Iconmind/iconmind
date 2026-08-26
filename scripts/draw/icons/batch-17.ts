/**
 * Batch 17 — the editor's shelf.
 *
 * `flip-horizontal` and `flip-vertical` are the first icons in the set whose subject is the
 * axis rather than the shapes. The two triangles are identical and the dashed line between
 * them is what carries the meaning, which is why the dashes are three separate runs at
 * fixed lengths rather than a stroke-dasharray: this set's cells are geometry, and a dash
 * pattern is an attribute that a consumer can override without knowing they have.
 */
import { arc, col, disc, frame, poly, row } from "../forms.ts";
import { cycle, ring } from "../bodies.ts";
import { BIG, off } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_17: Icon[] = [
  /* ── Mirrors ──────────────────────────────────────────────────────────────────── */

  {
    slug: "flip-horizontal", category: "interface", subcategory: "media",
    name: "Flip horizontal", description: "Mirror it left to right",
    tags: ["mirror", "reflect", "reverse"], family: "lattice",
    aliases: [], keywords: ["mirror", "reflect", "transform", "reverse", "invert"],
    shapes: [
      poly([[9, 5], [2, 12], [9, 19]], true), poly([[15, 5], [22, 12], [15, 19]], true),
      col(12, 3, 7), col(12, 10, 14), col(12, 17, 21),
    ],
  },
  {
    slug: "flip-vertical", category: "interface", subcategory: "media",
    name: "Flip vertical", description: "Mirror it top to bottom",
    tags: ["mirror", "reflect", "reverse"], family: "lattice",
    aliases: [], keywords: ["mirror", "reflect", "transform", "flip", "invert"],
    shapes: [
      poly([[5, 9], [12, 2], [19, 9]], true), poly([[5, 15], [12, 22], [19, 15]], true),
      row(12, 3, 7), row(12, 10, 14), row(12, 17, 21),
    ],
  },

  /* ── Space ────────────────────────────────────────────────────────────────────── */

  {
    slug: "expand", category: "interface", subcategory: "layout",
    name: "Expand", description: "Make it bigger",
    tags: ["grow", "open", "enlarge"], family: "bracket",
    aliases: [], keywords: ["grow", "enlarge", "open", "widen", "scale up"],
    // Two corners with the arrows going out of them. `maximize` is the four corners on
    // their own, which is a frame; two corners with shafts is a movement.
    shapes: [
      poly([[4, 10], [4, 4], [10, 4]]), poly([[4, 4], [10, 10]]),
      poly([[14, 20], [20, 20], [20, 14]]), poly([[20, 20], [14, 14]]),
    ],
  },
  {
    slug: "collapse", category: "interface", subcategory: "layout",
    name: "Collapse", description: "Make it smaller",
    tags: ["shrink", "close", "reduce"], family: "bracket",
    aliases: [], keywords: ["shrink", "reduce", "close", "narrow", "scale down"],
    shapes: [
      poly([[10, 4], [10, 10], [4, 10]]), poly([[10, 10], [4, 4]]),
      poly([[14, 20], [14, 14], [20, 14]]), poly([[14, 14], [20, 20]]),
    ],
  },
  {
    slug: "focus", category: "interface", subcategory: "layout",
    name: "Focus", description: "Pay attention to this",
    tags: ["target", "crop", "attention"], family: "bracket",
    aliases: [], keywords: ["viewfinder", "target", "centre", "autofocus", "spotlight"],
    // `maximize`'s four corners with something in the middle to be focused on. The corners
    // are the same corners, so the two icons are plainly about the same rectangle.
    shapes: [
      poly([[3, 9], [3, 3], [9, 3]]), poly([[15, 3], [21, 3], [21, 9]]),
      poly([[21, 15], [21, 21], [15, 21]]), poly([[9, 21], [3, 21], [3, 15]]),
      disc(12, 12, 2),
    ],
  },
  {
    slug: "corner-radius", category: "interface", subcategory: "layout",
    name: "Corner radius", description: "How round the corner is",
    tags: ["rounding", "corner", "shape"], family: "bracket",
    aliases: [], keywords: ["border radius", "rounding", "corner", "css", "shape"],
    // One corner and the arc that softens it, with the centre of that arc marked. The dot
    // is the whole subject: a radius is a distance from a point, not a curve.
    shapes: [col(4, 10, 20), arc(10, 10, 6, 180, 270), row(4, 10, 20), disc(10, 10, 1)],
  },

  /* ── Panels ───────────────────────────────────────────────────────────────────── */

  {
    slug: "panel-top", category: "interface", subcategory: "layout",
    name: "Panel top", description: "A strip across the top",
    tags: ["header", "toolbar", "band"], family: "window",
    aliases: ["header"], keywords: ["toolbar", "app bar", "banner", "top bar"],
    shapes: [frame(2, 4, 20, 16, 3, { gap: 4 }), row(9, 2, 22)],
  },
  {
    slug: "panel-bottom", category: "interface", subcategory: "layout",
    name: "Panel bottom", description: "A strip across the bottom",
    tags: ["footer", "tray", "band"], family: "window",
    aliases: ["footer"], keywords: ["status bar", "tab bar", "footer", "dock"],
    shapes: [frame(2, 4, 20, 16, 3, { gap: 4 }), row(15, 2, 22)],
  },
  {
    slug: "sidebar", category: "interface", subcategory: "layout",
    name: "Sidebar", description: "A column down one side",
    tags: ["nav", "rail", "drawer"], family: "window",
    aliases: ["drawer"], keywords: ["navigation", "rail", "side panel", "menu column"],
    shapes: [frame(2, 4, 20, 16, 3, { gap: 4 }), col(9, 4, 20)],
  },

  /* ── States ───────────────────────────────────────────────────────────────────── */

  {
    slug: "error", category: "interface", subcategory: "state",
    name: "Error", description: "It failed",
    tags: ["failure", "broken", "stop"], family: "orbit",
    aliases: ["failed"], keywords: ["failure", "exception", "broken", "crash", "fatal"],
    // The disc is closed where `agent-off`'s ring is open. Off is a state somebody chose;
    // an error is a fact, and the language's gap is for things still in play.
    shapes: [disc(12, 12, 9), ...off(BIG)],
  },
  {
    slug: "help", category: "interface", subcategory: "state",
    name: "Help", description: "How does this work?",
    tags: ["question", "support", "docs"], family: "orbit",
    aliases: ["support"], keywords: ["question mark", "faq", "docs", "assistance", "guide"],
    // A question mark drawn as an arc, a run at 45° and a stem — three of the set's own
    // pieces rather than a glyph borrowed from a typeface.
    shapes: [
      ring(), arc(12, 9, 3, 180, 0), poly([[15, 9], [12, 12]]), col(12, 12, 15),
      disc(12, 18, 1),
    ],
  },

  /* ── Two more ─────────────────────────────────────────────────────────────────── */

  {
    slug: "repeat", category: "interface", subcategory: "media",
    name: "Repeat", description: "Go round again",
    tags: ["loop", "again", "cycle"], family: "window",
    aliases: ["loop"], keywords: ["cycle", "again", "replay", "on repeat"],
    // The loop is a closed rounded rectangle with the language's break at the top, and the
    // head points into the break. `retry` is the same idea on a circle, for an attempt
    // rather than a setting.
    shapes: [...cycle(), disc(9.5, 12.5, 1), disc(14.5, 12.5, 1)],
  },
  {
    slug: "audio", category: "interface", subcategory: "media",
    name: "Audio", description: "A sound, as a waveform",
    tags: ["waveform", "sound", "levels"], family: "rails",
    aliases: ["waveform"], keywords: ["sound", "levels", "equaliser", "recording", "track"],
    // Symmetrical about the middle, where `barcode`'s bars are all the same height. Both
    // are five vertical runs; only one of them is a signal.
    shapes: [col(4, 10, 14), col(8, 7, 17), col(12, 4, 20), col(16, 7, 17), col(20, 10, 14)],
  },
];
