/**
 * Batch 80 — round 4 of the parity plan: panels, layouts and alignment.
 *
 * Panels are the window frame sidebar and panel-top already use, with a divider and a
 * chevron that says which way the panel goes. Layouts are the same frame split
 * differently. Alignment icons are a line and two boxes, the line where the items
 * line up — the vertical ones are the horizontal ones turned a quarter.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { col, frame, poly, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const FRAME = () => frame(2, 4, 20, 16, 3, { gap: 4 });
const LEFT = col(9, 4, 20), RIGHT = col(15, 4, 20), TOP = row(9, 2, 22), BOTTOM = row(15, 2, 22);

const win = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "layout", name, description, tags, family: "window", aliases, keywords,
  shapes: [FRAME(), ...marks],
});
const align = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], shapes: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "layout", name, description, tags, family: "align", aliases, keywords, shapes,
});

export const BATCH_80: Icon[] = [
  // ── panel ───────────────────────────────────────────────────────────────────────
  win("panel-right", "Panel right", "A window with a panel down its right side — an inspector, a detail pane beside the content",
    ["inspector", "sidebar", "pane"], [], ["right sidebar", "inspector panel", "detail pane"], [RIGHT]),
  win("panel-left-open", "Panel left open", "A window with its left panel and a chevron pointing into the content — open the sidebar",
    ["sidebar", "expand", "show"], [], ["open sidebar", "expand left panel", "show navigation"],
    [LEFT, poly([[13, 9.5], [15.5, 12], [13, 14.5]])]),
  win("panel-left-close", "Panel left close", "A window with its left panel and a chevron pointing back at it — collapse the sidebar",
    ["sidebar", "collapse", "hide"], [], ["close sidebar", "collapse left panel", "hide navigation"],
    [LEFT, poly([[15.5, 9.5], [13, 12], [15.5, 14.5]])]),
  win("panel-right-open", "Panel right open", "A window with its right panel and a chevron pointing into the content — open the inspector",
    ["inspector", "expand", "show"], [], ["open right panel", "show inspector", "expand details"],
    [RIGHT, poly([[11, 9.5], [8.5, 12], [11, 14.5]])]),
  win("panel-right-close", "Panel right close", "A window with its right panel and a chevron pointing back at it — collapse the inspector",
    ["inspector", "collapse", "hide"], [], ["close right panel", "hide inspector", "collapse details"],
    [RIGHT, poly([[8.5, 9.5], [11, 12], [8.5, 14.5]])]),
  win("panel-top-open", "Panel top open", "A window with a bar across the top and a chevron pointing down — open the top panel",
    ["header", "expand", "show"], [], ["open top panel", "expand header", "show toolbar"],
    [TOP, poly([[9.5, 13], [12, 15.5], [14.5, 13]])]),
  win("panel-top-close", "Panel top close", "A window with a bar across the top and a chevron pointing up at it — collapse the top panel",
    ["header", "collapse", "hide"], [], ["close top panel", "collapse header", "hide toolbar"],
    [TOP, poly([[9.5, 16], [12, 13.5], [14.5, 16]])]),
  win("panel-bottom-open", "Panel bottom open", "A window with a bar across the bottom and a chevron pointing up — open the bottom panel",
    ["drawer", "expand", "show"], [], ["open bottom panel", "expand drawer", "show console"],
    [BOTTOM, poly([[9.5, 11], [12, 8.5], [14.5, 11]])]),
  win("panel-bottom-close", "Panel bottom close", "A window with a bar across the bottom and a chevron pointing down at it — collapse the bottom panel",
    ["drawer", "collapse", "hide"], [], ["close bottom panel", "collapse drawer", "hide console"],
    [BOTTOM, poly([[9.5, 8.5], [12, 11], [14.5, 8.5]])]),
  win("panel-left-dashed", "Panel left dashed", "A window with a dashed line down its left side — where a sidebar would go, not yet there",
    ["placeholder", "optional", "sidebar"], [], ["sidebar placeholder", "optional left panel", "dashed sidebar"],
    [col(9, 5, 8), col(9, 10.5, 13.5), col(9, 16, 19)]),
  win("panel-right-dashed", "Panel right dashed", "A window with a dashed line down its right side — where an inspector would go, not yet there",
    ["placeholder", "optional", "inspector"], [], ["inspector placeholder", "optional right panel", "dashed right pane"],
    [col(15, 5, 8), col(15, 10.5, 13.5), col(15, 16, 19)]),
  win("panel-top-dashed", "Panel top dashed", "A window with a dashed line across the top — where a header would go, not yet there",
    ["placeholder", "optional", "header"], [], ["header placeholder", "optional top panel", "dashed toolbar"],
    [row(9, 3.5, 6.5), row(9, 10.5, 13.5), row(9, 17.5, 20.5)]),
  win("panel-bottom-dashed", "Panel bottom dashed", "A window with a dashed line across the bottom — where a drawer would go, not yet there",
    ["placeholder", "optional", "drawer"], [], ["drawer placeholder", "optional bottom panel", "dashed console"],
    [row(15, 3.5, 6.5), row(15, 10.5, 13.5), row(15, 17.5, 20.5)]),

  // ── layout ──────────────────────────────────────────────────────────────────────
  win("layout-dashboard", "Layout dashboard", "A window split into unequal tiles — a dashboard, widgets of different sizes side by side",
    ["widgets", "tiles", "overview"], [], ["dashboard layout", "widget grid", "overview page"],
    [col(12, 4, 20), row(10, 2, 12), row(14, 12, 22)]),
  win("layout-freeform", "Layout freeform", "A window with boxes of different sizes inside — a freeform canvas, things placed where you like",
    ["canvas", "boxes", "free"], [], ["freeform layout", "canvas layout", "free placement"],
    [poly([[5, 7], [10, 7], [10, 11], [5, 11]], true), poly([[13, 7], [19, 7], [19, 17], [13, 17]], true), poly([[5, 14], [10, 14], [10, 17], [5, 17]], true)]),

  // ── align ───────────────────────────────────────────────────────────────────────
  align("align-start-horizontal", "Align start horizontal", "Two boxes hanging from a line above them — align objects to the top edge",
    ["top", "objects", "edge"], [], ["align top", "align objects top", "top edge"],
    [row(4, 3, 21), poly([[7, 7], [11, 7], [11, 17], [7, 17]], true), poly([[14, 7], [18, 7], [18, 13], [14, 13]], true)]),
  align("align-end-horizontal", "Align end horizontal", "Two boxes standing on a line below them — align objects to the bottom edge",
    ["bottom", "objects", "edge"], [], ["align bottom", "align objects bottom", "bottom edge"],
    [row(20, 3, 21), poly([[7, 7], [11, 7], [11, 17], [7, 17]], true), poly([[14, 11], [18, 11], [18, 17], [14, 17]], true)]),
  align("align-center-horizontal", "Align center horizontal", "Two boxes centred on a line through their middles — align objects to a shared centre line",
    ["middle", "objects", "centre"], [], ["align middle", "align centres horizontally", "vertical centre"],
    [row(12, 3, 5.5), row(12, 18.5, 21), poly([[7, 8], [11, 8], [11, 16], [7, 16]], true), poly([[14, 9.5], [18, 9.5], [18, 14.5], [14, 14.5]], true)]),
  align("align-start-vertical", "Align start vertical", "Two boxes set against a line to their left — align objects to the left edge",
    ["left", "objects", "edge"], [], ["align left edge", "align objects left", "left edge"],
    [col(4, 3, 21), poly([[7, 7], [17, 7], [17, 11], [7, 11]], true), poly([[7, 14], [13, 14], [13, 18], [7, 18]], true)]),
  align("align-end-vertical", "Align end vertical", "Two boxes set against a line to their right — align objects to the right edge",
    ["right", "objects", "edge"], [], ["align right edge", "align objects right", "right edge"],
    [col(20, 3, 21), poly([[7, 7], [17, 7], [17, 11], [7, 11]], true), poly([[11, 14], [17, 14], [17, 18], [11, 18]], true)]),
  align("align-center-vertical", "Align center vertical", "Two boxes centred on a line through their middles — align objects to a shared vertical centre",
    ["centre", "objects", "middle"], [], ["align centre vertically", "horizontal centre", "centre objects"],
    [col(12, 3, 5.5), col(12, 18.5, 21), poly([[8, 7], [16, 7], [16, 11], [8, 11]], true), poly([[9.5, 14], [14.5, 14], [14.5, 18], [9.5, 18]], true)]),
  align("align-horizontal-space-between", "Align horizontal space between", "Two boxes pushed to the lines at either side — spread objects to the edges with the space between",
    ["spread", "edges", "spacing"], ["align-horizontal-distribute-center", "align-horizontal-justify-center"], ["space between horizontally", "spread objects", "distribute horizontally"],
    [col(3, 3, 21), poly([[6, 7], [10, 7], [10, 17], [6, 17]], true), poly([[14, 7], [18, 7], [18, 17], [14, 17]], true), col(21, 3, 21)]),
  align("align-vertical-space-between", "Align vertical space between", "Two boxes pushed to the lines above and below — spread objects to the edges with the space between",
    ["spread", "edges", "spacing"], ["align-vertical-distribute-center", "align-vertical-justify-center"], ["space between vertically", "spread objects vertically", "distribute vertically"],
    [row(3, 3, 21), poly([[7, 6], [17, 6], [17, 10], [7, 10]], true), poly([[7, 14], [17, 14], [17, 18], [7, 18]], true), row(21, 3, 21)]),
];
