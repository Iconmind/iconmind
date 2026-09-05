/**
 * R08 · Observability: metrics, SLOs & alerting — numbers over time, the lines drawn
 * across them, and what rings when a line is crossed.
 *
 * A metric lives on the set's axes: the L that chart-line and chart-bar already stand
 * in. What makes each metric itself is the figure plotted inside the L — a spike, a
 * plateau, a sawtooth, a ceiling with a bar under it — never a mark beside the chart.
 * Alerts live in the bell; dashboards in the window; the push gateway is a tray that
 * things are pushed into.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { tray, window_ } from "../bodies.ts";
import {
  SMALL, clockMark, diamondMark, listMark, off, pause, searchMark, squareMark, tagMark, targetMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "analytics", subcategory: "metric", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The set's axes: the L a chart stands in. The plot is x 6..20, y 5..18; marks sit at cy 11. */
const AXES = () => [col(4, 4, 20), row(20, 4, 20)];
/** A peaked distribution, drawn with the set's 45° runs. */
const HILL = () => poly([[6, 17], [9, 14], [12, 11], [15, 14], [18, 17]]);
/**
 * The alerting bell: a dome on straight shoulders, a skirt that flares at 45°, a wide lip
 * and the clapper hanging under it. Not the interface set's notification bell — that one is a
 * semicircle on a lip, and its every mark is already spoken for. Marks sit at cy 11.
 */
const BELL = () => [
  raw("M6 15V10A6 6 0 0 1 18 10V15L20.5 17.5H3.5L6 15Z", "a bell: dome, shoulders, flared skirt and lip", true),
  arc(12, 18.5, 2, 0, 180),
];
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];

export const BATCH_95: Icon[] = [
  /* ── The golden signals ───────────────────────────────────────────────────────── */
  c("apdex", "Apdex", "Axes with a line stepping down through three tiers — satisfied, tolerating, frustrated",
    ["metric", "apdex", "satisfaction"], [], ["apdex", "apdex score", "user satisfaction", "response tiers"],
    "axes", [...AXES(), poly([[7, 7], [11, 7], [11, 11], [15, 11], [15, 15], [19, 15]])]),
  c("golden-signal", "Golden signal", "Axes with a diamond on them — the four signals worth watching first",
    ["metric", "signal", "sre"], [], ["golden signals", "four golden signals", "latency traffic errors saturation", "sre"],
    "axes", [...AXES(), ...diamondMark(SMALL, 11)]),
  c("saturation-metric", "Saturation", "Axes with a line that climbs and then goes flat — a resource with no room left to give",
    ["metric", "saturation", "capacity"], [], ["saturation", "resource saturation", "plateau", "maxed out"],
    "axes", [...AXES(), poly([[7, 17], [13, 11], [19, 11]])]),
  c("throughput-metric", "Throughput", "Axes with two bands across them — how much passes through in a unit of time",
    ["metric", "throughput", "rate"], [], ["throughput", "requests per second", "rps", "qps"],
    "axes", [...AXES(), rect(7, 6, 12, 4, 2), rect(7, 13, 9, 4, 2)]),
  c("error-rate", "Error rate", "Axes with a low, flat line and one bump in it — the share of requests that failed",
    ["metric", "error", "rate"], [], ["error rate", "failure rate", "5xx rate", "errors per second"],
    "axes", [...AXES(), poly([[7, 17], [10.5, 17], [13.5, 14], [16.5, 17], [19, 17]])]),
  c("availability-metric", "Availability", "Axes with a high, flat line and one notch in it — the share of time a service was up",
    ["metric", "availability", "uptime"], [], ["availability", "nines", "uptime percent", "99.9"],
    "axes", [...AXES(), poly([[7, 7], [12, 7], [14, 9], [16, 7], [19, 7]])]),

  /* ── Kinds of metric ──────────────────────────────────────────────────────────── */
  c("percentile-metric", "Percentile", "Axes with a distribution and one cut through it — the value most requests stay under",
    ["metric", "percentile", "distribution"], [], ["percentile", "p95", "p99", "tail latency"],
    "axes", [...AXES(), HILL(), col(15, 8, 18)]),
  c("quantile", "Quantile", "Axes with a distribution cut twice — the points that split it into equal shares",
    ["metric", "quantile", "distribution"], [], ["quantile", "quartile", "median", "distribution split"],
    "axes", [...AXES(), HILL(), col(9, 8, 18), col(15, 8, 18)]),
  c("histogram-bucket", "Histogram bucket", "Axes with three bars and a point over the middle one — one bucket of a histogram",
    ["metric", "histogram", "bucket"], [], ["histogram bucket", "bucket boundary", "le bucket", "bin"],
    "axes", [...AXES(), col(9, 11, 18), col(13, 8, 18), col(17, 13, 18), disc(13, 5, 1)]),
  c("histogram-quantile", "Histogram quantile", "Axes with three bars and a line drawn across them — a quantile estimated from buckets",
    ["metric", "histogram", "quantile"], [], ["histogram quantile", "histogram_quantile", "estimated percentile", "bucket interpolation"],
    "axes", [...AXES(), col(7, 13, 18), col(11, 8, 18), col(15, 11, 18), row(10, 6, 18)]),
  c("summary-metric", "Summary metric", "Axes with a short list on them — count, sum and quantiles kept together",
    ["metric", "summary", "quantile"], [], ["summary metric", "summary type", "count sum quantile", "client quantiles"],
    "axes", [...AXES(), ...listMark(SMALL, 11)]),
  c("gauge-metric", "Gauge metric", "Axes with a chevron up over a chevron down — a value that can go either way",
    ["metric", "gauge", "value"], [], ["gauge metric", "gauge type", "current value", "up and down"],
    "axes", [...AXES(), poly([[9.5, 9.5], [12, 7], [14.5, 9.5]]), poly([[9.5, 14.5], [12, 17], [14.5, 14.5]])]),
  c("counter-reset", "Counter reset", "Axes with a sawtooth — a counter that climbed, dropped to zero, and climbed again",
    ["metric", "counter", "reset"], [], ["counter reset", "counter restart", "sawtooth", "process restart"],
    "axes", [...AXES(), poly([[7, 17], [12, 12], [12, 17], [17, 12], [17, 17]])]),
  c("cumulative-metric", "Cumulative metric", "Axes with a staircase that only climbs — a total that never goes down",
    ["metric", "cumulative", "total"], [], ["cumulative metric", "monotonic", "running total", "cumulative sum"],
    "axes", [...AXES(), poly([[7, 17], [10, 17], [10, 14], [13, 14], [13, 11], [16, 11], [16, 8], [19, 8]])]),
  c("delta-metric", "Delta metric", "Axes with a delta on them — the change since the last reading, not the total",
    ["metric", "delta", "change"], [], ["delta metric", "delta temporality", "change since last", "increment"],
    "axes", [...AXES(), poly([[8, 16], [12, 12], [16, 16]], true)]),
  c("rate-of-change", "Rate of change", "Axes with a line that goes flat, then climbs, then goes straight up — how fast a value is moving",
    ["metric", "rate", "derivative"], [], ["rate of change", "derivative", "rate()", "per second"],
    "axes", [...AXES(), poly([[7, 17], [12, 17], [16, 13], [16, 7]])]),
  c("unit-metric", "Metric unit", "Axes with a unit square on them — what one of this metric is measured in",
    ["metric", "unit", "measure"], [], ["metric unit", "bytes seconds ratio", "unit of measure", "base unit"],
    "axes", [...AXES(), ...squareMark(SMALL, 11)]),
  c("metric-label", "Metric label", "Axes with a tag on them — the key-value that names one series",
    ["metric", "label", "series"], [], ["metric label", "label set", "series label", "dimension"],
    "axes", [...AXES(), ...tagMark(SMALL, 11)]),
  c("metric-cardinality", "Metric cardinality", "Axes with rays fanning out of one point — how many series one metric has become",
    ["metric", "cardinality", "series"], [], ["metric cardinality", "high cardinality", "series explosion", "label blowup"],
    "axes", [...AXES(), poly([[7, 5], [7, 17], [19, 17]]), poly([[7, 17], [17, 7]])]),
  c("recording-rule", "Recording rule", "Axes with a line that ends in a stored point — a query computed ahead of time and kept",
    ["metric", "rule", "precompute"], [], ["recording rule", "precomputed metric", "materialized query", "rule group"],
    "axes", [...AXES(), poly([[7, 15], [10, 12], [13.5, 12]]), disc(17.5, 12, 2)]),

  /* ── Lines drawn across a metric ──────────────────────────────────────────────── */
  c("baseline-metric", "Baseline", "Axes with a flat line and today's point above it — what normal looks like, and where we are",
    ["metric", "baseline", "normal"], [], ["baseline", "normal range", "expected value", "reference level"],
    "axes", [...AXES(), row(14, 7, 19), disc(13, 9, 2)]),
  c("forecast-metric", "Forecast", "Axes with a line so far and the points it is expected to reach — where a metric is heading",
    ["metric", "forecast", "predict"], [], ["forecast metric", "prediction", "predict_linear", "projection"],
    "axes", [...AXES(), poly([[7, 17], [12, 12]]), disc(14.5, 9.5, 1), disc(17, 7, 1)]),
  c("capacity-plan", "Capacity plan", "Axes with a ceiling and a line climbing toward it — when a resource runs out at this rate",
    ["metric", "capacity", "plan"], [], ["capacity planning", "runway", "time to exhaustion", "growth vs limit"],
    "axes", [...AXES(), row(7, 7, 19), poly([[7, 17], [15, 9]])]),
  c("headroom-metric", "Headroom", "Axes with a ceiling and a bar well under it — the room left before the limit",
    ["metric", "headroom", "capacity"], [], ["headroom", "spare capacity", "room to grow", "utilisation gap"],
    "axes", [...AXES(), row(7, 7, 19), col(13, 11, 18)]),
  c("threshold-line", "Threshold line", "Axes with a line across three bars and one bar over it — the level that counts as too much",
    ["metric", "threshold", "limit"], [], ["threshold line", "limit line", "over threshold", "breach level"],
    "axes", [...AXES(), row(10, 6, 19), col(9, 14, 18), col(13, 12, 18), col(17, 7, 18)]),
  c("target-line", "Target line", "Axes with a line across them and a point sitting on it — the level a metric is meant to hold",
    ["metric", "target", "goal"], [], ["target line", "goal line", "objective", "on target"],
    "axes", [...AXES(), row(10, 6, 19), disc(13, 10, 2)]),
  c("comparison-period", "Comparison period", "Axes with two matching lines, one above the other — this period against the last",
    ["metric", "compare", "period"], [], ["comparison period", "week over week", "previous period", "compare to last"],
    "axes", [...AXES(), poly([[7, 15], [10, 12], [13, 15], [16, 12], [19, 15]]), poly([[7, 10], [10, 7], [13, 10], [16, 7], [19, 10]])]),
  c("annotation-chart", "Chart annotation", "Axes with a line and a marker dropped through it — a moment worth noting on the chart",
    ["metric", "annotation", "event"], [], ["chart annotation", "deploy marker", "event marker", "vertical marker"],
    "axes", [...AXES(), poly([[7, 17], [11, 13], [15, 17], [19, 13]]), col(14, 6, 18)]),
  c("metric-drilldown", "Metric drilldown", "Axes with a lens on them — a metric opened up to see what it is made of",
    ["metric", "drilldown", "explore"], [], ["metric drilldown", "drill into", "break down by", "explore metric"],
    "axes", [...AXES(), ...searchMark(SMALL, 11)]),

  /* ── Storing and shaping ──────────────────────────────────────────────────────── */
  c("aggregation-window", "Aggregation window", "Axes with a bracketed stretch and a bar in it — the span one value is computed over",
    ["metric", "window", "aggregate"], [], ["aggregation window", "range window", "5m window", "lookback"],
    "axes", [...AXES(), poly([[10.5, 7], [8, 7], [8, 17], [10.5, 17]]), poly([[13.5, 7], [16, 7], [16, 17], [13.5, 17]]), row(12, 10.5, 13.5)]),
  c("rollup-metric", "Rollup", "Axes with three small bars and the one tall bar they add up to — fine points rolled into a coarse one",
    ["metric", "rollup", "aggregate"], [], ["rollup", "rolled up", "coarse aggregate", "summarised over time"],
    "axes", [...AXES(), col(8, 14, 18), col(11, 12, 18), col(14, 15, 18), col(18, 7, 18)]),
  c("downsample", "Downsample", "Axes with a jagged run and the straight run that replaces it — fewer points, same shape",
    ["metric", "downsample", "resolution"], [], ["downsample", "downsampling", "lower resolution", "thin points"],
    "axes", [...AXES(), poly([[7, 15], [9, 13], [11, 15], [13, 13]]), poly([[15, 15], [19, 11]])]),
  c("staleness-marker", "Staleness marker", "Axes with a line that stops and a cross where it stopped — a series marked as no longer reporting",
    ["metric", "stale", "series"], [], ["staleness marker", "stale series", "stopped reporting", "no data"],
    "axes", [...AXES(), poly([[7, 17], [11, 13], [14, 13]]), poly([[16.5, 11.5], [19.5, 14.5]]), poly([[19.5, 11.5], [16.5, 14.5]])]),
  c("metric-retention", "Metric retention", "Axes with a clock on them — how long samples are kept",
    ["metric", "retention", "time"], [], ["metric retention", "retention period", "keep samples", "tsdb retention"],
    "axes", [...AXES(), ...clockMark(SMALL, 11)]),
  c("metric-relabel", "Metric relabel", "Axes with a tag struck through — a label rewritten before the series is stored",
    ["metric", "relabel", "label"], [], ["metric relabel", "relabel config", "rewrite label", "drop label"],
    "axes", [...AXES(), ...tagMark(SMALL, 11), poly([[8.5, 14.5], [15.5, 7.5]])]),
  c("scrape-target", "Scrape target", "Axes with a target on them — the endpoint a chart is fed from",
    ["metric", "scrape", "target"], [], ["scrape target", "metrics endpoint", "/metrics", "exporter target"],
    "axes", [...AXES(), ...targetMark(SMALL, 11)]),
  c("scrape-interval", "Scrape interval", "Axes with three evenly spaced ticks — how often a target is read",
    ["metric", "scrape", "interval"], [], ["scrape interval", "every 15s", "polling interval", "sample period"],
    "axes", [...AXES(), col(8, 9, 15), col(12, 9, 15), col(16, 9, 15)]),
  c("remote-write", "Remote write", "Axes with an arrow leaving them — samples sent on to another store",
    ["metric", "remote-write", "send"], [], ["remote write", "remote storage", "forward samples", "prometheus remote_write"],
    "axes", [...AXES(), ...ARROW_R(12, 7, 19)]),
  c("push-gateway", "Push gateway", "An arrow dropping into a tray — a place short-lived jobs push their metrics to",
    ["metric", "push", "gateway"], [], ["push gateway", "pushgateway", "push metrics", "batch job metrics"],
    "tray", [tray(), col(12, 4, 10), poly([[9.5, 7.5], [12, 10], [14.5, 7.5]])]),

  /* ── Alerts ───────────────────────────────────────────────────────────────────── */
  c("alert-rule-group", "Alert rule group", "A bell with a short list in it — alert rules evaluated together",
    ["alert", "rule", "group"], [], ["alert rule group", "rule group", "alerting rules", "evaluation group"],
    "bell", [...BELL(), ...listMark(SMALL, 11)]),
  c("alert-threshold", "Alert threshold", "A bell with a level line and a point rising to meet it — the value that sets it ringing",
    ["alert", "threshold", "trigger"], [], ["alert threshold", "alert condition", "fires above", "trigger level"],
    "bell", [...BELL(), row(9, 8.5, 15.5), poly([[9.5, 15], [12, 12.5], [14.5, 15]])]),
  c("alert-silence", "Alert silence", "A bell with a cross in it — an alert muted for a while",
    ["alert", "silence", "mute"], [], ["alert silence", "silenced", "mute alert", "snooze alert"],
    "bell", [...BELL(), ...off(SMALL, 11)]),
  c("alert-group", "Alert group", "A bell with three points in it — alerts that fire together, sent as one",
    ["alert", "group", "batch"], [], ["alert group", "grouped alerts", "group by", "one notification"],
    "bell", [...BELL(), disc(12, 8.5, 1), disc(9.5, 13, 1), disc(14.5, 13, 1)]),
  c("alert-route", "Alert route", "A bell with an arrow through it — where an alert is sent, decided by its labels",
    ["alert", "route", "notify"], [], ["alert route", "routing tree", "receiver", "notification route"],
    "bell", [...BELL(), ...ARROW_R(11, 8, 15.5)]),
  c("alert-inhibit", "Alert inhibit", "A bell with a pause in it — an alert held back while a bigger one is firing",
    ["alert", "inhibit", "suppress"], [], ["alert inhibit", "inhibition rule", "suppress alert", "held back"],
    "bell", [...BELL(), ...pause(SMALL, 11)]),
  c("alert-dedupe", "Alert dedupe", "A bell with an equals sign in it — the same alert from many sources, sent once",
    ["alert", "dedupe", "duplicate"], [], ["alert dedupe", "deduplication", "same alert", "send once"],
    "bell", [...BELL(), row(9, 9, 15), row(13, 9, 15)]),

  /* ── Dashboards ───────────────────────────────────────────────────────────────── */
  c("dashboard-panel", "Dashboard panel", "A window with one tile in it — a single chart on a dashboard",
    ["dashboard", "panel", "tile"], [], ["dashboard panel", "panel", "chart tile", "widget"],
    "window", [window_(), rect(7, 10, 10, 6.5, 2)]),
  c("dashboard-row", "Dashboard row", "A window with one wide band in it — a row of panels that collapses together",
    ["dashboard", "row", "layout"], [], ["dashboard row", "panel row", "collapsible row", "section"],
    "window", [window_(), rect(6, 10.5, 12, 5, 2.5)]),
  c("dashboard-variable", "Dashboard variable", "A window with a header and a picker under it — one value that every panel reads",
    ["dashboard", "variable", "picker"], [], ["dashboard variable", "template variable", "dropdown", "selector"],
    "window", [window_(), row(10, 7, 17), poly([[9.5, 14], [12, 16.5], [14.5, 14]])]),
  c("dashboard-share", "Dashboard share", "A window with an arrow rising in it — a dashboard handed to someone else",
    ["dashboard", "share", "link"], [], ["dashboard share", "share link", "public dashboard", "snapshot"],
    "window", [window_(), col(12, 10.5, 17), poly([[9.5, 13], [12, 10.5], [14.5, 13]])]),
];
