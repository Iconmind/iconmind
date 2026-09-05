/**
 * R07 · Observability: traces, logs & profiling — what a request left behind, what a
 * process wrote down, and where the time and memory went.
 *
 * Four bodies, one per kind of evidence. A span is a Gantt bar hung from its timeline:
 * a rail across the top and a stadium beneath it, the qualifier inside the bar. A log is
 * a receipt — a tall tape torn off at the foot — with its lines and its qualifier on the
 * tape. A profile is read off the machine, so it sits in the chamfered frame the set
 * already uses for hardware. A dump lands in a tray. Code that gets instrumented is
 * the bracket pair, and the two maps are nodes on 45° wire.
 */
import { col, disc, poly, raw, rect, row } from "../forms.ts";
import { brackets, machine, page, tray } from "../bodies.ts";
import {
  SMALL, check, clockMark, funnelMark, listMark, lockMark, pinMark, searchMark, squareMark,
  tagMark, trendMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "devops", subcategory: "observability", name, description,
  tags, aliases, keywords, family, shapes,
});

/** A span: the timeline rail, and the bar hung from it. Qualifiers live in the bar, cy 12. */
const SPAN = () => [row(3, 4, 20), rect(2, 6, 20, 12, 6)];
/** A log: a receipt, torn off along the foot. Lines at y 6/10/14, marks at cy 10. */
const RECEIPT = () =>
  raw("M6 2H18A2 2 0 0 1 20 4V19L18 17L16 19L14 17L12 19L10 17L8 19L6 17L4 19V4A2 2 0 0 1 6 2Z",
    "a receipt: a rounded head and a foot torn along a zigzag", true);
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];

export const BATCH_94: Icon[] = [
  /* ── Spans and traces ─────────────────────────────────────────────────────────── */
  c("span-event", "Span event", "A span bar with one point marked on it — something that happened at an instant inside the span",
    ["span", "event", "trace"], [], ["span event", "trace event", "point in span", "annotation"],
    "span", [...SPAN(), disc(12, 12, 2)]),
  c("span-link", "Span link", "A span bar with two points joined — a span that refers to another trace's span",
    ["span", "link", "trace"], [], ["span link", "linked span", "cross trace", "causal link"],
    "span", [...SPAN(), disc(8, 12, 2), disc(16, 12, 2), row(12, 10, 14)]),
  c("baggage", "Baggage", "A span bar carrying a small case — key-values that ride along with every hop of a trace",
    ["span", "trace", "context"], [], ["otel baggage", "trace baggage", "propagated values", "carried context"],
    "span", [...SPAN(), ...squareMark(SMALL, 12)]),
  c("context-propagation", "Context propagation", "A span bar with an arrow running through it — trace context handed on to the next service",
    ["span", "trace", "context"], [], ["context propagation", "trace propagation", "w3c tracecontext", "traceparent"],
    "span", [...SPAN(), ...ARROW_R(12, 6, 16)]),
  c("correlation-id", "Correlation ID", "A span bar with an equals sign — the one id that says two records belong to the same request",
    ["trace", "id", "correlate"], [], ["correlation id", "request id", "same request", "x-request-id"],
    "span", [...SPAN(), row(10, 7, 17), row(14, 7, 17)]),
  c("tail-sampling", "Tail sampling", "A span bar with a funnel at its tail — the keep-or-drop decision made once the trace is complete",
    ["trace", "sampling", "tail"], [], ["tail sampling", "tail-based sampling", "sample after", "decide at end"],
    "span", [...SPAN(), row(12, 6, 10.5), poly([[12, 9], [15, 12], [18, 9]]), col(15, 12, 15)]),
  c("head-sampling", "Head sampling", "A span bar with a funnel at its head — the keep-or-drop decision made before the trace starts",
    ["trace", "sampling", "head"], [], ["head sampling", "head-based sampling", "sample first", "decide at start"],
    "span", [...SPAN(), poly([[6, 9], [9, 12], [12, 9]]), col(9, 12, 15), row(12, 13.5, 18)]),
  c("exemplar", "Exemplar", "A span bar with a pin in it — one real trace picked to stand for a metric's bucket",
    ["trace", "metric", "sample"], [], ["exemplar", "metric exemplar", "trace behind metric", "sample trace"],
    "span", [...SPAN(), ...pinMark(SMALL, 12)]),
  c("trace-waterfall", "Trace waterfall", "A span bar with three staggered bars inside — the spans of one trace laid out in time",
    ["trace", "waterfall", "span"], [], ["trace waterfall", "waterfall view", "span timeline", "gantt"],
    "span", [...SPAN(), row(9, 7, 12), row(12, 9.5, 14.5), row(15, 12, 17)]),
  c("trace-id", "Trace ID", "A span bar with a tag — the id that names the whole trace",
    ["trace", "id", "tag"], [], ["trace id", "traceid", "trace identifier"],
    "span", [...SPAN(), ...tagMark(SMALL, 12)]),
  c("span-id", "Span ID", "A span bar with a hash in it — the id of this one span",
    ["span", "id", "trace"], [], ["span id", "spanid", "span identifier"],
    "span", [...SPAN(), row(12, 7, 17), col(10, 9.5, 14.5), col(14, 9.5, 14.5)]),
  c("parent-span", "Parent span", "A span bar with a wide bar over an indented one — the span this span was started from",
    ["span", "parent", "trace"], [], ["parent span", "parent span id", "enclosing span", "caller span"],
    "span", [...SPAN(), row(9, 7, 17), row(15, 11, 17)]),
  c("root-span", "Root span", "A span bar with a wide bar and a bracket of children under it — the span with no parent",
    ["span", "root", "trace"], [], ["root span", "top span", "entry span", "first span"],
    "span", [...SPAN(), row(9, 7, 17), poly([[8, 15], [8, 12], [16, 12], [16, 15]])]),
  c("span-status", "Span status", "A span bar with a check — whether the span ended ok or in error",
    ["span", "status", "trace"], [], ["span status", "status code", "span ok", "span error"],
    "span", [...SPAN(), ...check(SMALL, 12)]),
  c("span-duration", "Span duration", "A span bar with a clock — how long the span took",
    ["span", "duration", "time"], [], ["span duration", "span latency", "elapsed", "how long"],
    "span", [...SPAN(), ...clockMark(SMALL, 12)]),
  c("span-attribute", "Span attribute", "A span bar with a short list — the key-values attached to a span",
    ["span", "attribute", "trace"], [], ["span attribute", "span tags", "span metadata", "key value"],
    "span", [...SPAN(), ...listMark(SMALL, 12)]),
  c("trace-context", "Trace context", "A span bar holding angle brackets — the headers that carry a trace across a request",
    ["trace", "context", "header"], [], ["trace context", "tracecontext", "traceparent header", "tracestate"],
    "span", [...SPAN(), poly([[9.5, 9.5], [7, 12], [9.5, 14.5]]), poly([[14.5, 9.5], [17, 12], [14.5, 14.5]])]),
  c("request-timeline", "Request timeline", "A span bar with three ticks — the moments of one request in order",
    ["trace", "timeline", "request"], [], ["request timeline", "timing breakdown", "phases", "ticks"],
    "span", [...SPAN(), col(7, 9.5, 14.5), col(12, 9.5, 14.5), col(17, 9.5, 14.5)]),
  c("cold-start-trace", "Cold start trace", "A span bar with a tick and a gap before the work — the time a cold start ate",
    ["trace", "cold-start", "latency"], [], ["cold start trace", "cold start", "init latency", "warmup"],
    "span", [...SPAN(), col(7, 9.5, 14.5), row(12, 11, 18)]),
  c("trace-sampling", "Trace sampling", "A span bar with a funnel — only some traces kept",
    ["trace", "sampling", "funnel"], [], ["trace sampling", "sampling rate", "sampler", "keep some traces"],
    "span", [...SPAN(), ...funnelMark(SMALL, 12)]),

  /* ── Logs ─────────────────────────────────────────────────────────────────────── */
  c("structured-log", "Structured log", "A receipt whose lines are split into key and value — a log written as fields, not prose",
    ["log", "structured", "field"], [], ["structured log", "json log", "key value log", "logfmt"],
    "receipt", [RECEIPT(), row(6, 7, 10), row(6, 12.5, 17), row(10, 7, 10), row(10, 12.5, 17), row(14, 7, 17)]),
  c("log-level", "Log level", "A receipt with three lines that step up in length — debug, info, warn, error",
    ["log", "level", "severity"], [], ["log level", "severity", "verbosity", "debug info warn error"],
    "receipt", [RECEIPT(), row(6, 7, 11), row(10, 7, 14), row(14, 7, 17)]),
  c("log-field", "Log field", "A receipt with one field marked on the middle line — a single key pulled out of a log line",
    ["log", "field", "key"], [], ["log field", "log attribute", "extracted field", "log key"],
    "receipt", [RECEIPT(), row(6, 7, 17), disc(8, 10, 2), row(10, 11.5, 17), row(14, 7, 17)]),
  c("log-rotation", "Log rotation", "A receipt with an up and a down chevron — the current file swapped out for a fresh one",
    ["log", "rotation", "file"], [], ["log rotation", "logrotate", "rotate logs", "roll over"],
    "receipt", [RECEIPT(), poly([[9.5, 7.5], [12, 5], [14.5, 7.5]]), poly([[9.5, 12.5], [12, 15], [14.5, 12.5]])]),
  c("log-retention", "Log retention", "A receipt with a clock — how long logs are kept before they are dropped",
    ["log", "retention", "time"], [], ["log retention", "retention period", "keep logs", "expire logs"],
    "receipt", [RECEIPT(), ...clockMark(SMALL, 10)]),
  c("log-shipper", "Log shipper", "A receipt with an arrow across it — logs forwarded off the host to wherever they are kept",
    ["log", "shipper", "forward"], [], ["log shipper", "log forwarder", "fluentbit", "vector agent"],
    "receipt", [RECEIPT(), ...ARROW_R(10, 7, 15)]),
  c("log-parse", "Log parse", "A receipt with a line and an arrow breaking down from it — a raw line split into its parts",
    ["log", "parse", "field"], [], ["log parse", "log parsing", "grok", "extract fields"],
    "receipt", [RECEIPT(), row(6, 7, 17), col(12, 9, 14.5), poly([[9.5, 12], [12, 14.5], [14.5, 12]])]),
  c("log-index-obs", "Log index", "A receipt with a short list — logs indexed so a query can find them",
    ["log", "index", "search"], [], ["log index", "indexed logs", "log store", "inverted index"],
    "receipt", [RECEIPT(), ...listMark(SMALL, 10)]),
  c("log-query", "Log query", "A receipt with a lens — a search run across logs",
    ["log", "query", "search"], [], ["log query", "log search", "logql", "search logs"],
    "receipt", [RECEIPT(), ...searchMark(SMALL, 10)]),
  c("live-tail", "Live tail", "A receipt whose last line is still being written — logs followed as they arrive",
    ["log", "live", "tail"], [], ["live tail", "tail -f", "follow logs", "streaming logs"],
    "receipt", [RECEIPT(), row(6, 7, 17), row(10, 7, 17), row(14, 7, 10), disc(14, 14, 1)]),
  c("redact-log", "Redact log", "A receipt with a line blacked out — a value masked before the log leaves",
    ["log", "redact", "mask"], [], ["redact log", "log redaction", "mask secrets", "scrub logs"],
    "receipt", [RECEIPT(), row(6, 7, 17), rect(7, 9, 10, 4, 2)]),
  c("sample-log", "Sample log", "A receipt with a point between two lines — one log picked out of many",
    ["log", "sample", "pick"], [], ["sample log", "sampled log", "log sample", "one of many"],
    "receipt", [RECEIPT(), row(6, 7, 17), disc(12, 10, 2), row(14, 7, 17)]),
  c("log-volume", "Log volume", "A receipt with three rising bars — how much log a service writes",
    ["log", "volume", "chart"], [], ["log volume", "log throughput", "ingest volume", "gb per day"],
    "receipt", [RECEIPT(), col(8, 11, 14), col(12, 8, 14), col(16, 5, 14)]),
  c("log-sampling", "Log sampling", "A receipt with a funnel — only some log lines kept",
    ["log", "sampling", "funnel"], [], ["log sampling", "sample logs", "drop logs", "sampling rate"],
    "receipt", [RECEIPT(), ...funnelMark(SMALL, 10)]),

  /* ── Profiles ─────────────────────────────────────────────────────────────────── */
  c("cpu-profile", "CPU profile", "A machine frame with a stack of narrowing bars — where the processor's time went",
    ["profile", "cpu", "flame"], [], ["cpu profile", "cpu profiling", "flame graph", "hot path"],
    "machine", [machine(), row(9, 8, 16), row(12, 9, 15), row(15, 10, 14)]),
  c("memory-profile", "Memory profile", "A machine frame with three bars standing in it — where the memory went",
    ["profile", "memory", "allocation"], [], ["memory profile", "memory profiling", "heap profile", "allocations"],
    "machine", [machine(), col(9, 9, 15), col(12, 9, 15), col(15, 9, 15)]),
  c("continuous-profile", "Continuous profile", "A machine frame with a pulse running through it — profiling that never stops",
    ["profile", "continuous", "always-on"], [], ["continuous profiling", "always-on profiling", "pyroscope", "parca"],
    "machine", [machine(), poly([[7.5, 14.5], [10, 12], [12.5, 14.5], [15, 12], [17.5, 14.5]])]),
  c("profile-diff", "Profile diff", "A machine frame with a plus over a minus — two profiles compared",
    ["profile", "diff", "compare"], [], ["profile diff", "compare profiles", "differential flame graph", "regression"],
    "machine", [machine(), col(12, 8, 12), row(10, 10, 14), row(14, 10, 14)]),
  c("allocation-rate", "Allocation rate", "A machine frame with a rising trend — how fast memory is being allocated",
    ["profile", "allocation", "rate"], [], ["allocation rate", "alloc rate", "bytes per second", "gc pressure"],
    "machine", [machine(), ...trendMark(SMALL, 12)]),
  c("lock-contention", "Lock contention", "A machine frame with a lock — threads waiting on the same mutex",
    ["profile", "lock", "contention"], [], ["lock contention", "mutex contention", "blocked threads", "waiting on lock"],
    "machine", [machine(), ...lockMark(SMALL, 12)]),

  /* ── Dumps and collection ─────────────────────────────────────────────────────── */
  c("heap-dump", "Heap dump", "A pile of objects landing in a tray — the whole heap written out to look at",
    ["dump", "heap", "memory"], [], ["heap dump", "hprof", "memory dump", "heap snapshot file"],
    "tray", [tray(), disc(8.5, 11, 2), disc(15.5, 11, 2), disc(12, 6, 2)]),
  c("goroutine-dump", "Goroutine dump", "A scatter of small points landing in a tray — every goroutine and what it was doing",
    ["dump", "goroutine", "go"], [], ["goroutine dump", "goroutine stack", "go routines", "pprof goroutine"],
    "tray", [tray(), disc(8, 7, 1), disc(12, 7, 1), disc(16, 7, 1), disc(10, 11, 1), disc(14, 11, 1)]),
  c("thread-dump", "Thread dump", "Three threads landing in a tray — every thread's stack at one instant",
    ["dump", "thread", "stack"], [], ["thread dump", "jstack", "thread stacks", "all threads"],
    "tray", [tray(), col(8, 5, 12), col(12, 5, 12), col(16, 5, 12)]),
  c("otel-collector", "OTel collector", "Three streams meeting in one and landing in a tray — telemetry gathered before it goes anywhere",
    ["otel", "collector", "telemetry"], [], ["otel collector", "opentelemetry collector", "telemetry pipeline", "receiver"],
    "tray", [tray(), col(12, 5, 12), poly([[6.5, 6.5], [11, 11]]), poly([[17.5, 6.5], [13, 11]])]),
  c("otel-exporter", "OTel exporter", "An arrow rising out of a tray — telemetry sent on to a backend",
    ["otel", "exporter", "telemetry"], [], ["otel exporter", "opentelemetry exporter", "otlp exporter", "send telemetry"],
    "tray", [tray(), col(12, 4, 12), poly([[9.5, 6.5], [12, 4], [14.5, 6.5]])]),

  /* ── Instrumentation ──────────────────────────────────────────────────────────── */
  c("instrument-code", "Instrument code", "A bracket pair with a span bar laid inside — a span put into the code by hand",
    ["instrument", "code", "trace"], [], ["instrument code", "manual instrumentation", "add span", "add tracing"],
    "bracket", [...brackets(), rect(7, 9, 10, 6, 3)]),
  c("auto-instrument", "Auto instrument", "A bracket pair with two span lines already laid in — instrumentation that arrives without an edit",
    ["instrument", "auto", "agent"], [], ["auto instrumentation", "zero code", "java agent", "otel operator"],
    "bracket", [...brackets(), row(9, 7, 17), row(15, 7, 17)]),
  c("debug-symbol", "Debug symbol", "A page with a tag on it — the names that turn addresses back into code",
    ["debug", "symbol", "code"], [], ["debug symbol", "symbol file", "dwarf", "source map"],
    "page", [page(), ...tagMark(SMALL, 13)]),

  /* ── Maps ─────────────────────────────────────────────────────────────────────── */
  c("service-map", "Service map", "Four nodes joined corner to corner — which services talk to which",
    ["map", "service", "topology"], [], ["service map", "service graph", "topology", "who calls whom"],
    "node", [disc(6, 6, 2), disc(18, 6, 2), disc(6, 18, 2), disc(18, 18, 2),
      poly([[7.5, 7.5], [16.5, 16.5]]), poly([[16.5, 7.5], [7.5, 16.5]])]),
  c("dependency-map", "Dependency map", "Two nodes leading down into one — what a service needs before it can answer",
    ["map", "dependency", "topology"], [], ["dependency map", "upstream downstream", "service dependencies", "call graph"],
    "node", [disc(5, 9, 2), disc(19, 9, 2), disc(12, 16, 2), poly([[6.5, 10.5], [10.5, 14.5]]), poly([[17.5, 10.5], [13.5, 14.5]])]),
];
