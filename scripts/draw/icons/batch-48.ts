/**
 * Batch 48 — the table taken apart: row, column, cell, field; and things kept apart or
 * layered: overlap, offset, layer.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

/** The bare table every table-part icon starts from. */
const grid = () => [rect(2, 4, 20, 16, 2), row(9.5, 2, 22), row(14.5, 2, 22), col(12, 4, 20)];

export const BATCH_48: Icon[] = [
  /* ── The table taken apart ────────────────────────────────────────────────────── */

  {
    slug: "row", category: "data", subcategory: "storage",
    name: "Row", description: "One record, across",
    tags: ["record", "horizontal", "entry"], family: "window",
    aliases: [], keywords: ["record", "tuple", "one entry", "across"],
    shapes: [rect(2, 4, 20, 16, 2), row(9.5, 2, 22), row(14.5, 2, 22), disc(6, 12, 1)],
  },
  {
    slug: "column", category: "data", subcategory: "storage",
    name: "Column", description: "One attribute, down",
    tags: ["attribute", "vertical", "series"], family: "window",
    aliases: [], keywords: ["attribute", "field down", "series", "vertical slice"],
    shapes: [rect(2, 4, 20, 16, 2), col(9, 4, 20), col(15, 4, 20), disc(12, 8, 1), col(12, 11, 17)],
  },
  {
    slug: "cell", category: "data", subcategory: "storage",
    name: "Cell", description: "One value, exactly here",
    tags: ["value", "coordinate", "single"], family: "window",
    aliases: [], keywords: ["one value", "coordinate", "spreadsheet cell"],
    shapes: [...grid(), disc(7, 12, 1)],
  },
  {
    slug: "field", category: "interface", subcategory: "action",
    name: "Field", description: "The box that takes one answer",
    tags: ["input", "form", "entry"], family: "window",
    aliases: [], keywords: ["input", "form field", "input box", "one answer", "text entry"],
    // A box with a cursor is `prompt`, byte for byte. A form field has its label.
    shapes: [row(4, 2, 10), rect(2, 8, 20, 8, 2), col(6, 10.5, 13.5)],
  },
  {
    slug: "variable", category: "devtools", subcategory: "code",
    name: "Variable", description: "A name with a value in it",
    tags: ["binding", "name", "holds"], family: "figure",
    aliases: [], keywords: ["binding", "let", "holds a value", "name equals"],
    shapes: [rect(2, 7, 9, 10, 2), row(11, 14, 21), row(14, 14, 19)],
  },
  {
    slug: "variant", category: "devtools", subcategory: "testing",
    name: "Variant", description: "The same thing, one difference",
    tags: ["version", "flavour", "alternative"], family: "figure",
    aliases: [], keywords: ["flavour", "alternative", "a and b", "one difference"],
    shapes: [rect(2, 4, 8, 16, 2), rect(14, 4, 8, 16, 2), disc(6, 9, 1), col(18, 7.5, 10.5)],
  },

  /* ── Kept apart, or layered ───────────────────────────────────────────────────── */

  {
    slug: "overlap", category: "interface", subcategory: "layout",
    name: "Overlap", description: "Where both are true at once",
    tags: ["intersect", "shared", "both"], family: "figure",
    aliases: ["intersect"], keywords: ["intersection", "shared region", "both at once"],
    shapes: [rect(2, 2, 13, 13, 2), rect(9, 9, 13, 13, 2)],
  },
  {
    slug: "offset", category: "data", subcategory: "streaming",
    name: "Offset", description: "How far into the stream you are",
    tags: ["position", "cursor", "consumed"], family: "figure",
    aliases: [], keywords: ["kafka offset", "position", "how far read"],
    shapes: [row(12, 2, 22), disc(6, 12, 1), disc(11, 12, 1), col(16, 8, 16), disc(20, 12, 1)],
  },
  {
    slug: "layer", category: "interface", subcategory: "layout",
    name: "Layer", description: "One sheet of the stack",
    tags: ["sheet", "level", "stacked"], family: "figure",
    aliases: [], keywords: ["one level", "sheet", "in the stack"],
    shapes: [poly([[4, 12], [12, 4], [20, 12], [12, 20]], true), row(22, 8, 16)],
  },
  {
    slug: "ungroup", category: "interface", subcategory: "layout",
    name: "Ungroup", description: "Let them be separate again",
    tags: ["split", "apart", "release"], family: "figure",
    aliases: [], keywords: ["break group", "separate", "apart again"],
    shapes: [rect(2, 2, 12, 12, 2), rect(17, 17, 5, 5, 2.5), poly([[16, 16], [13.5, 13.5]])],
  },

  /* ── Memory, long and short ───────────────────────────────────────────────────── */

  {
    slug: "long-term", category: "agents", subcategory: "memory",
    name: "Long-term memory", description: "What survives the session",
    tags: ["persistent", "keeps", "durable"], family: "window",
    aliases: [], keywords: ["persists", "across sessions", "durable memory"],
    shapes: [rect(2, 3, 20, 14, 2), disc(8, 10, 2), row(11, 13, 18), row(20, 2, 22)],
  },

  /* ── Words carried, pictures held ─────────────────────────────────────────────── */

  {
    slug: "emoji", category: "interface", subcategory: "communication",
    name: "Emoji", description: "The feeling, in one glyph",
    tags: ["smiley", "reaction", "face"], family: "orbit",
    aliases: [], keywords: ["smiley", "reaction", "emoticon"],
    shapes: [disc(12, 12, 9), disc(9, 9.5, 1), disc(15, 9.5, 1), arc(12, 13, 4, 45, 135)],
  },
  {
    slug: "image-container", category: "interface", subcategory: "media",
    name: "Image container", description: "The box a picture arrives in",
    tags: ["frame", "placeholder", "media"], family: "window",
    aliases: [], keywords: ["image frame", "placeholder", "media box"],
    shapes: [rect(2, 4, 20, 16, 2), poly([[6, 16], [10, 12], [13, 15], [17, 11]])],
  },
  {
    slug: "media", category: "interface", subcategory: "media",
    name: "Media", description: "Pictures and sound, together",
    tags: ["audio", "video", "files"], family: "window",
    aliases: [], keywords: ["images and audio", "assets", "rich content"],
    shapes: [rect(2, 4, 20, 16, 2), poly([[8, 9], [11, 12], [8, 15]], true), col(16, 9, 15)],
  },
  {
    slug: "communication", category: "agents", subcategory: "communication",
    name: "Communication", description: "Both sides, talking",
    tags: ["messages", "exchange", "talk"], family: "figure",
    aliases: [], keywords: ["messages", "exchange", "back and forth"],
    shapes: [rect(2, 3, 13, 8, 4), poly([[5, 11], [5, 14], [8, 11]]), rect(9, 13, 13, 8, 4), poly([[19, 13], [19, 10], [16, 13]])],
  },

  /* ── Keys and containers ──────────────────────────────────────────────────────── */

  {
    slug: "object", category: "devtools", subcategory: "code",
    name: "Object", description: "Named parts, boxed together",
    tags: ["struct", "record", "braces"], family: "figure",
    aliases: ["struct"], keywords: ["struct", "record", "key values", "braces"],
    shapes: [poly([[9, 4], [7, 6], [7, 10], [5, 12], [7, 14], [7, 18], [9, 20]]), poly([[15, 4], [17, 6], [17, 10], [19, 12], [17, 14], [17, 18], [15, 20]])],
  },
  {
    slug: "blob", category: "data", subcategory: "storage",
    name: "Blob", description: "Bytes with no promised shape",
    tags: ["binary", "opaque", "bytes"], family: "figure",
    aliases: [], keywords: ["binary object", "opaque bytes", "unstructured"],
    shapes: [disc(10, 10, 6), disc(16, 15, 4)],
  },

  /* ── Work at its stations ─────────────────────────────────────────────────────── */

  {
    slug: "ocr-ingest", category: "rag", subcategory: "ingestion",
    name: "OCR ingest", description: "Scanned pages, read into the index",
    tags: ["scan", "extract", "pipeline"], family: "figure",
    aliases: [], keywords: ["scan to index", "extract text", "ocr pipeline"],
    shapes: [
      poly([[3, 7], [3, 4], [6, 4]]), poly([[11, 4], [14, 4], [14, 7]]),
      poly([[3, 17], [3, 20], [6, 20]]), poly([[11, 20], [14, 20], [14, 17]]),
      row(12, 6, 11), poly([[17, 10], [19, 12], [17, 14]]),
    ],
  },
  {
    slug: "output-sanitize", category: "security", subcategory: "ai-security",
    name: "Sanitise output", description: "Scrubbed before anyone sees it",
    tags: ["clean", "filter", "scrub"], family: "machine",
    aliases: [], keywords: ["scrub output", "strip secrets", "clean before showing"],
    shapes: [machine(), row(10, 8, 16), row(14, 8, 12), row(14, 14.5, 17)],
  },
  {
    slug: "producer", category: "data", subcategory: "streaming",
    name: "Producer", description: "What puts messages on the queue",
    tags: ["writer", "source", "emits"], family: "figure",
    aliases: [], keywords: ["writes to queue", "emitter", "source of events"],
    shapes: [rect(12, 8, 10, 8, 2), row(12, 5, 11), poly([[9, 9], [12, 12], [9, 15]]), disc(4, 12, 2)],
  },
  {
    slug: "one-off", category: "automation", subcategory: "schedule",
    name: "One-off", description: "Once, and never again",
    tags: ["single", "adhoc", "once"], family: "figure",
    aliases: ["adhoc"], keywords: ["run once", "ad hoc", "single shot"],
    shapes: [disc(12, 12, 8), col(12, 8, 16)],
  },
];
