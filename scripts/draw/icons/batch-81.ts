/**
 * Batch 81 — round 5 of the parity plan: lists, text, grids and tables.
 *
 * Lists and text are the rails family — rows at 6, 12 and 18 with the mark on the right
 * where list-alert put it, or a glyph on the left. Grids and tables are the window frame
 * with its dividers, and a mark in the one cell the dividers leave free.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { col, disc, frame, poly, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const ROWS_L = [row(6, 3, 14), row(11, 3, 14), row(16, 3, 14)];
const FRAME = () => frame(2, 4, 20, 16, 3, { gap: 4 });
const GRID = () => [frame(2, 2, 20, 20, 3, { gap: 4 }), row(12, 2, 22), col(12, 2, 22)];

const rails = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], shapes: Icon["shapes"], family = "rails"): Icon => ({
  slug, category: "interface", subcategory: "layout", name, description, tags, family, aliases, keywords, shapes,
});
const win = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], shapes: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "layout", name, description, tags, family: "window", aliases, keywords, shapes,
});

export const BATCH_81: Icon[] = [
  // ── list ────────────────────────────────────────────────────────────────────────
  rails("list-check", "List check", "Three lines with a check beside them — a list that has been gone through and approved",
    ["approved", "done", "reviewed"], [], ["approved list", "checked list", "reviewed items"],
    [...ROWS_L, poly([[16, 12], [18.5, 14.5], [22, 11]])], "text"),
  rails("list-checks", "List checks", "Three lines each with a check in front — every item ticked off, a completed checklist",
    ["checklist", "complete", "ticked"], [], ["checklist", "all done", "completed tasks", "ticked list"],
    [poly([[3, 7], [5, 9], [8, 6]]), row(7, 11, 21), poly([[3, 12], [5, 14], [8, 11]]), row(12, 11, 21), poly([[3, 17], [5, 19], [8, 16]]), row(17, 11, 21)]),
  rails("list-todo", "List todo", "Two lines each with an empty box in front — a to-do list, the things still to be done",
    ["tasks", "checkboxes", "pending"], [], ["todo list", "task list", "checkboxes", "open tasks"],
    [poly([[3, 5], [8, 5], [8, 10], [3, 10]], true), row(7.5, 11, 21), poly([[3, 14], [8, 14], [8, 19], [3, 19]], true), row(16.5, 11, 21)]),
  rails("list-tree", "List tree", "Lines branching off a trunk — a tree of items, children indented under their parent",
    ["hierarchy", "nested", "outline"], [], ["tree view", "nested list", "outline", "hierarchy"],
    [col(5, 3, 17), row(10, 5, 11), row(10, 14, 21), row(17, 5, 11), row(17, 14, 21)]),
  rails("list-filter", "List filter", "Three lines with a funnel beside them — filter the list down to the items that match",
    ["funnel", "narrow", "match"], ["list-filter-plus"], ["filter list", "narrow results", "filtered items"],
    [...ROWS_L, poly([[15, 9], [22, 9], [20, 11], [20, 19], [17, 19], [17, 11]], true)], "text"),
  rails("list-add", "List add", "Three lines with a plus beside them — add an item to the list",
    ["insert", "new", "append"], ["list-plus"], ["add to list", "new item", "append item"],
    [...ROWS_L, col(18.5, 9, 15), row(12, 15.5, 21.5)], "text"),
  rails("list-remove", "List remove", "Three lines with a minus beside them — take an item off the list",
    ["delete", "drop", "clear"], ["list-minus", "list-x"], ["remove from list", "delete item", "drop item"],
    [...ROWS_L, row(12, 15.5, 21.5)], "text"),
  rails("list-indent-increase", "List indent increase", "Lines with the middle one pushed in and a chevron pointing right — indent, nest it one level deeper",
    ["indent", "nest", "deeper"], [], ["indent", "increase indent", "nest item"],
    [row(6, 3, 21), row(12, 10, 21), row(18, 3, 21), poly([[3, 9.5], [5.5, 12], [3, 14.5]])]),
  rails("list-indent-decrease", "List indent decrease", "Lines with the middle one pushed in and a chevron pointing left — outdent, lift it one level up",
    ["outdent", "unnest", "shallower"], [], ["outdent", "decrease indent", "unnest item"],
    [row(6, 3, 21), row(12, 10, 21), row(18, 3, 21), poly([[5.5, 9.5], [3, 12], [5.5, 14.5]])]),
  rails("list-video", "List video", "Three lines with a play button beside them — a playlist, videos queued up in order",
    ["playlist", "queue", "watch"], ["list-music"], ["playlist", "video list", "watch queue", "play queue"],
    [...ROWS_L, poly([[16, 8], [16, 16], [20, 12]], true)], "text"),

  // ── text ────────────────────────────────────────────────────────────────────────
  rails("text-wrap", "Text wrap", "Lines with the last one turning back under the one above — wrap text onto the next line",
    ["wrap", "line-break", "flow"], [], ["wrap text", "line wrap", "word wrap"],
    [row(6, 3, 21), row(12, 3, 17), poly([[17, 12], [17, 15], [10, 15]]), poly([[12.5, 12.5], [10, 15], [12.5, 17.5]])]),
  rails("text-quote", "Text quote", "Quotation marks above two lines — a quotation, somebody else's words set apart",
    ["quotation", "cite", "blockquote"], [], ["blockquote", "quotation", "quoted text", "citation"],
    [poly([[3, 5], [3, 8], [5.5, 8]]), poly([[7, 5], [7, 8], [9.5, 8]]), row(13, 3, 21), row(18, 3, 15)]),
  rails("text-select", "Text select", "Two lines inside corner brackets — a text selection, the words picked out to act on",
    ["selection", "highlight", "range"], ["text-selection"], ["select text", "text selection", "highlight text"],
    [poly([[3, 7], [3, 4], [6, 4]]), poly([[18, 4], [21, 4], [21, 7]]), poly([[21, 17], [21, 20], [18, 20]]), poly([[6, 20], [3, 20], [3, 17]]), row(9, 6, 18), row(15, 6, 18)]),
  rails("text-cursor-input", "Text cursor input", "A text field with the cursor in it — an input, a box waiting to be typed into",
    ["input", "field", "typing"], [], ["text input", "input field", "type here", "text box"],
    [rect(2, 7, 20, 10, 2), col(8, 10, 14), row(10, 6.5, 9.5), row(14, 6.5, 9.5)]),
  rails("text-search", "Text search", "Lines with a magnifying glass over them — search within the text, find a word on the page",
    ["find", "lookup", "match"], [], ["find in text", "search text", "find on page", "text lookup"],
    [row(6, 3, 21), row(12, 3, 11), row(18, 3, 11), disc(16.5, 15, 3), poly([[18.5, 17], [21, 19.5]])]),
  rails("heading", "Heading", "A capital H — a heading, the title that sits above the paragraphs",
    ["title", "h1", "typography"], ["heading-1", "heading-2", "heading-3"], ["heading", "title text", "h1", "section heading"],
    [col(6, 4, 20), col(18, 4, 20), row(12, 6, 18)]),

  // ── grid ────────────────────────────────────────────────────────────────────────
  win("grid-2x2-check", "Grid 2×2 check", "A four-cell grid with a check in one cell — a layout chosen, a grid item confirmed",
    ["cells", "chosen", "confirmed"], [], ["grid check", "selected cell", "confirmed layout"],
    [...GRID(), poly([[14, 16], [16, 18], [19.5, 14.5]])]),
  win("grid-2x2-add", "Grid 2×2 add", "A four-cell grid with a plus in one cell — add a cell, put another item on the grid",
    ["cells", "new", "insert"], ["grid-2x2-plus"], ["add to grid", "new cell", "insert grid item"],
    [...GRID(), col(17, 14, 20), row(17, 14, 20)]),
  win("grid-2x2-remove", "Grid 2×2 remove", "A four-cell grid with a minus in one cell — take an item off the grid",
    ["cells", "delete", "drop"], ["grid-2x2-x"], ["remove from grid", "delete cell", "drop grid item"],
    [...GRID(), row(17, 14, 20)]),

  // ── table ───────────────────────────────────────────────────────────────────────
  win("table-properties", "Table properties", "A table with a header column — properties listed down the left, their values beside",
    ["properties", "key-value", "attributes"], [], ["properties table", "key value table", "attribute list"],
    [FRAME(), col(9, 4, 20), row(9, 9, 22), row(15, 9, 22)]),
  win("table-columns-split", "Table columns split", "A table divided down the middle with arrows pushing apart — split a column in two",
    ["split", "columns", "divide"], ["table-cells-split"], ["split column", "divide columns", "split cells"],
    [FRAME(), col(12, 4, 20), poly([[9, 9.5], [6.5, 12], [9, 14.5]]), poly([[15, 9.5], [17.5, 12], [15, 14.5]])]),
  win("table-rows-split", "Table rows split", "A table divided across the middle with arrows pushing apart — split a row in two",
    ["split", "rows", "divide"], [], ["split row", "divide rows", "split horizontally"],
    [FRAME(), row(12, 2, 22), poly([[9.5, 9], [12, 6.5], [14.5, 9]]), poly([[9.5, 15], [12, 17.5], [14.5, 15]])]),
  win("table-cells-merge", "Table cells merge", "A table with arrows pointing into the middle — merge cells into one",
    ["merge", "join", "combine"], [], ["merge cells", "join cells", "combine columns"],
    [FRAME(), poly([[6.5, 9.5], [9, 12], [6.5, 14.5]]), poly([[17.5, 9.5], [15, 12], [17.5, 14.5]])]),
];
