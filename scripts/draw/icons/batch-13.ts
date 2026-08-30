/**
 * Batch 13 — signals, stores and two more charts.
 *
 * `health-check` is a square wave rather than a heartbeat, and that is the angle rule again.
 * A real pulse trace has a spike at about seventy degrees; drawn at forty-five it is a
 * gentle hill, and drawn at ninety it is a square wave. The square wave is honest about
 * being a signal, where the gentle hill pretends to be a heartbeat and fails.
 */
import { area, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

/** A short cylinder, used where something is being put into or taken out of a store. */
const shortCylinder = () => [
  raw("M4 5A8 3 0 0 1 20 5V10A8 3 0 0 1 4 10Z",
    "a cylinder: an elliptical rim of 8 by 3, sides of 5, and the front of the base", true),
  raw("M4 5A8 3 0 0 0 20 5", "the far side of the top rim, which the near side hides"),
];

export const BATCH_13: Icon[] = [
  /* ── Signals ──────────────────────────────────────────────────────────────────── */

  {
    slug: "health-check", category: "devops", subcategory: "observability",
    name: "Health check", description: "A health check — the probe that asks whether a service is still alive and answering",
    tags: ["heartbeat", "probe", "alive"], family: "rails",
    aliases: ["heartbeat"], keywords: ["liveness", "readiness", "ping", "probe", "uptime"],
    // A square wave. A real pulse trace spikes at about seventy degrees; at forty-five it
    // is a gentle hill that reads as a chart, and this set has no seventy.
    shapes: [
      poly([[3, 12], [8, 12], [8, 6], [12, 6], [12, 18], [16, 18], [16, 12], [21, 12]]),
    ],
  },
  {
    slug: "anomaly", category: "analytics", subcategory: "metric",
    name: "Anomaly", description: "An anomaly — one reading that does not belong, an outlier or a spike in the data",
    tags: ["outlier", "spike", "unexpected"], family: "axes",
    aliases: ["outlier"], keywords: ["spike", "outlier", "deviation", "unexpected", "alert"],
    // Two readings where you expect them and one nowhere near. A single dot above a line
    // with a stem down to it is a map pin; it takes the ordinary readings beside it before
    // the odd one reads as odd.
    shapes: [row(19, 3, 21), disc(7, 15, 1), disc(17, 15, 1), disc(12, 7, 3)],
  },
  {
    slug: "drift", category: "ai", subcategory: "evaluation",
    name: "Drift", description: "Drift — a model and the world slowly coming apart as the data it sees changes",
    tags: ["divergence", "decay", "stale"], family: "arrow",
    aliases: [], keywords: ["data drift", "concept drift", "degradation", "diverge", "stale"],
    // One path becoming two. `ab-test` has nodes at its ends because the branches are
    // choices; drift has none, because nobody chose it.
    shapes: [poly([[3, 12], [12, 12], [18, 6]]), poly([[12, 12], [18, 18]])],
  },

  /* ── Stores ───────────────────────────────────────────────────────────────────── */

  {
    slug: "backup", category: "data", subcategory: "storage",
    name: "Backup", description: "A backup — a copy of the data kept somewhere else in case the original is lost",
    tags: ["copy", "snapshot", "safe"], family: "cylinder",
    aliases: [], keywords: ["snapshot", "dump", "replica", "disaster recovery", "archive"],
    shapes: [...shortCylinder(), col(12, 16, 21), poly([[9, 18], [12, 21], [15, 18]])],
  },
  {
    slug: "restore", category: "data", subcategory: "storage",
    name: "Restore", description: "Restore — put the backup copy back and recover what was lost",
    tags: ["recover", "revert", "load"], family: "cylinder",
    aliases: ["recover"], keywords: ["recovery", "reload", "rollback data", "import", "undelete"],
    shapes: [...shortCylinder(), col(12, 16, 21), poly([[9, 19], [12, 16], [15, 19]])],
  },
  {
    slug: "vault", category: "security", subcategory: "secret",
    name: "Vault", description: "A vault — the locked store where secrets, keys and credentials are kept",
    tags: ["safe", "store", "locked"], family: "window",
    aliases: [], keywords: ["secrets manager", "kms", "safe", "keychain", "hsm"],
    // A door with a dial and a handle. `auth`'s padlock is a thing you carry; a vault is a
    // thing you walk up to, so it is drawn as a wall rather than a fitting.
    shapes: [rect(3, 4, 18, 16, 2), disc(12, 12, 4), row(12, 12, 17)],
  },
  /* ── Grounding ────────────────────────────────────────────────────────────────── */

  {
    slug: "grounding", category: "rag", subcategory: "grounding",
    name: "Grounding", description: "Grounding — an answer tied to a real source so every claim can be traced to evidence",
    tags: ["source", "evidence", "anchored"], family: "page",
    aliases: [], keywords: ["citation", "evidence", "attribution", "provenance", "sourced"],
    // A page standing on a line. The line is the ground: without it the page floats, which
    // is exactly the failure the concept is named after. The two rules inside are not
    // decoration — an outline this size with nothing in it reads as a bracket, and a
    // bracket standing on a line means nothing at all.
    shapes: [
      poly([[14, 2], [5, 2], [5, 17], [19, 17], [19, 7]]),
      row(8, 8, 16), row(12, 8, 16), row(21, 3, 21),
    ],
  },

  /* ── Shipping a model ─────────────────────────────────────────────────────────── */

  {
    slug: "model-deploy", category: "ai", subcategory: "model",
    name: "Model deploy", description: "Model deploy — put a trained model where it will be served and used",
    tags: ["ship", "serve", "release"], family: "machine",
    aliases: [], keywords: ["serve", "endpoint", "production", "rollout", "publish"],
    // `deploy`'s arrow over `model`'s machine, and the machine is shorter to make room.
    // `deploy` itself is the generic: this one says which thing is being shipped.
    shapes: [
      frame(4, 11, 16, 10, 3, { chamfer: 4, gap: 4 }),
      col(12, 2, 8), poly([[9, 5], [12, 2], [15, 5]]),
    ],
  },
  {
    slug: "queue", category: "automation", subcategory: "workflow",
    name: "Queue", description: "A queue — work waiting its turn in line, a backlog of pending jobs or messages",
    tags: ["backlog", "pending", "line"], family: "rails",
    aliases: ["backlog"], keywords: ["pending", "jobs", "buffer", "fifo", "waiting"],
    shapes: [
      rect(2, 3, 13, 4, 2), rect(2, 10.5, 13, 4, 2), rect(2, 18, 13, 4, 2),
      poly([[17, 9], [20, 12], [17, 15]]),
    ],
  },

  /* ── Two more charts ──────────────────────────────────────────────────────────── */

  {
    slug: "chart-area", category: "analytics", subcategory: "chart",
    name: "Area chart", description: "An area chart — how much of something there was over time, with the space beneath the line filled",
    tags: ["volume", "trend", "filled"], family: "axes",
    aliases: [], keywords: ["stacked", "volume", "cumulative", "trend", "graph"],
    // The same axes as `chart-bar` and `chart-line`. Three charts that share their axes read
    // as one family; three that each invent their own read as three drawings.
    //
    // The filled region stops three units short of both axes. Drawn down to them, its own
    // bottom edge lies along the horizontal axis for fourteen units — two strokes on one
    // line, which the validator calls out as cancelling each other, and which renders as a
    // single thick rule nobody drew.
    shapes: [
      col(4, 4, 20), row(20, 4, 20),
      poly([[7, 14], [10, 11], [14, 15], [20, 9], [20, 17], [7, 17]], true),
    ],
  },
  {
    slug: "chart-scatter", category: "analytics", subcategory: "chart",
    name: "Scatter chart", description: "A scatter chart — where the individual points fall, and whether two variables correlate",
    tags: ["points", "correlation", "spread"], family: "axes",
    aliases: [], keywords: ["correlation", "distribution", "plot", "points", "cluster"],
    shapes: [
      col(4, 4, 20), row(20, 4, 20),
      disc(8, 17, 1), disc(13, 11, 1), disc(19, 14, 1),
    ],
  },

  {
    slug: "insight", category: "analytics", subcategory: "metric",
    name: "Insight", description: "An insight — the finding the numbers were hiding, the idea that lights up",
    tags: ["idea", "finding", "bulb"], family: "figure",
    aliases: ["idea"], keywords: ["finding", "discovery", "aha", "recommendation", "lightbulb"],
    // A round glass on a screw base. Drawn as a dome on two straight legs it is `bell`
    // with the clapper taken out — and at sixteen pixels a dome and a circle are the same
    // shape, so the base has to do the telling.
    shapes: [disc(12, 8, 5), row(16, 9, 15), row(19, 10, 14)],
  },
];
