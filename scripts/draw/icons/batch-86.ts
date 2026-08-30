/**
 * Batch 86 — round 10 of the parity plan: charts.
 *
 * The axes chart-bar and chart-line draw — a left axis and a baseline — carrying bars
 * that rise, fall, stack or lie on their side, a gantt, a spline, and the same bars with
 * the axes taken away. chart-column is chart-bar's drawing and chart-no-axes-gantt is
 * span-trace's; both are aliases.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { col, raw, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const AXES = [col(4, 4, 20), row(20, 4, 20)];
const chart = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], shapes: Icon["shapes"], family = "axes"): Icon => ({
  slug, category: "analytics", subcategory: "chart", name, description, tags, family, aliases, keywords, shapes,
});

export const BATCH_86: Icon[] = [
  chart("chart-bar-horizontal", "Chart bar horizontal", "Bars lying on their side against an axis — a horizontal bar chart, categories compared by length",
    ["horizontal", "compare", "categories"], ["chart-bar-big", "bar-chart-horizontal", "bar-chart-horizontal-big"], ["horizontal bar chart", "bar chart", "compare categories"],
    [...AXES, row(7, 4, 16), row(12, 4, 12), row(17, 4, 18)]),
  chart("chart-column-increasing", "Chart column increasing", "Bars rising from left to right — a column chart of something going up",
    ["growth", "rising", "trend"], ["chart-no-axes-column-increasing"], ["rising bars", "growth chart", "increasing columns"],
    [...AXES, col(8, 15, 20), col(13, 11, 20), col(18, 7, 20)]),
  chart("chart-column-decreasing", "Chart column decreasing", "Bars falling from left to right — a column chart of something going down",
    ["decline", "falling", "trend"], ["chart-no-axes-column-decreasing"], ["falling bars", "decline chart", "decreasing columns"],
    [...AXES, col(8, 7, 20), col(13, 11, 20), col(18, 15, 20)]),
  chart("chart-column-stacked", "Chart column stacked", "Bars each split into two parts — a stacked column chart, the whole and its share",
    ["stacked", "share", "parts"], [], ["stacked bar chart", "stacked columns", "parts of a whole"],
    [...AXES, col(9, 12, 20), col(9, 6, 9), col(15, 14, 20), col(15, 8, 11)]),
  chart("chart-bar-increasing", "Chart bar increasing", "Horizontal bars growing longer down the chart — ranked, each one more than the last",
    ["ranked", "growing", "horizontal"], [], ["increasing bars", "ranked bar chart", "growing horizontal bars"],
    [...AXES, row(7, 4, 10), row(12, 4, 14), row(17, 4, 18)]),
  chart("chart-bar-decreasing", "Chart bar decreasing", "Horizontal bars growing shorter down the chart — ranked, the biggest on top",
    ["ranked", "shrinking", "horizontal"], [], ["decreasing bars", "ranked descending", "shrinking horizontal bars"],
    [...AXES, row(7, 4, 18), row(12, 4, 14), row(17, 4, 10)]),
  chart("chart-bar-stacked", "Chart bar stacked", "Horizontal bars each split into two parts — a stacked bar chart on its side",
    ["stacked", "horizontal", "parts"], [], ["stacked horizontal bars", "stacked bar chart", "segmented bars"],
    [...AXES, row(8, 4, 11), row(8, 14, 19), row(14, 4, 9), row(14, 12, 17)]),
  chart("chart-gantt", "Chart gantt", "Bars staggered down a timeline — a gantt chart, tasks laid end to end in time",
    ["timeline", "schedule", "tasks"], ["square-gantt-chart", "square-chart-gantt"], ["gantt chart", "project timeline", "task schedule"],
    [...AXES, row(7, 6, 12), row(12, 10, 17), row(17, 13, 20)]),
  chart("chart-spline", "Chart spline", "A smooth curve over an axis — a spline chart, a trend drawn without corners",
    ["smooth", "curve", "trend"], [], ["spline chart", "smooth line chart", "curved trend"],
    [...AXES, raw("M6 17C9 17 9 8 12 8S15 16 18 6", "a spline is one smooth curve; the straight segments a poly would give are the point it makes against chart-line")]),
  chart("chart-no-axes-column", "Chart no axes column", "Three bars and nothing else — a column chart without its axes, the shape of the numbers alone",
    ["bars", "minimal", "sparkline"], [], ["bars without axes", "minimal bar chart", "column sparkline"],
    [col(6, 10, 20), col(12, 6, 20), col(18, 13, 20)], "rails"),
];
