/**
 * Batch 38 — tests at two scales, a token you cannot read, and things that hang off other things.
 *
 * `test-unit` and `test-e2e` differ in exactly the thing the names differ in: one box, or a
 * chain of them. `subagent` and `subgoal` do the same job for agents — the small thing hangs
 * off the big one, and the drawing says which is which.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { machine } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_38: Icon[] = [
  /* ── Tests, at two scales ─────────────────────────────────────────────────────── */

  {
    slug: "test-unit", category: "devtools", subcategory: "testing",
    name: "Unit test", description: "A unit test — one small piece of code checked on its own, in isolation",
    tags: ["small", "isolated", "passes"], family: "window",
    aliases: ["testing"], keywords: ["unit test", "isolated", "one function", "fast test", "green"],
    shapes: [rect(6, 4, 12, 16, 2), poly([[9, 12], [11, 14], [15, 10]])],
  },
  {
    slug: "test-e2e", category: "devtools", subcategory: "testing",
    name: "End-to-end test", description: "An end-to-end test — the whole user journey checked from start to finish",
    tags: ["journey", "full", "integration"], family: "figure",
    aliases: [], keywords: ["e2e", "integration", "user journey", "full path", "playwright"],
    shapes: [
      rect(2, 6, 7, 8, 2), row(10, 9, 13), rect(13, 6, 7, 8, 2),
      poly([[15, 16], [17, 18], [21, 14]]),
    ],
  },

  /* ── Things that hang off other things ────────────────────────────────────────── */

  {
    slug: "subagent", category: "agents", subcategory: "multi-agent",
    name: "Subagent", description: "A subagent — an agent spawned to work for another agent on a piece of the task",
    tags: ["child", "spawned", "under"], family: "figure",
    aliases: [], keywords: ["child agent", "spawned", "worker agent", "delegated to", "nested"],
    shapes: [disc(8, 7, 3), disc(16, 15, 3), poly([[10, 9], [14, 13]])],
  },
  {
    slug: "subgoal", category: "agents", subcategory: "planning",
    name: "Subgoal", description: "A subgoal — a smaller target on the way to the big one an agent is chasing",
    tags: ["step", "milestone", "under"], family: "figure",
    aliases: [], keywords: ["sub task", "intermediate", "on the way to", "decomposed goal"],
    shapes: [rect(2, 2, 10, 8, 2), poly([[7, 10], [7, 15], [13, 15]]), rect(13, 12, 9, 8, 2)],
  },
  {
    slug: "task-node", category: "automation", subcategory: "workflow",
    name: "Task node", description: "A task node — one piece of work in a graph, with what comes before and after",
    tags: ["step", "unit", "job"], family: "figure",
    aliases: [], keywords: ["job", "work item", "node", "step", "unit of work"],
    shapes: [rect(6, 8, 12, 8, 2), row(12, 2, 6), row(12, 18, 22)],
  },
  {
    slug: "task-graph", category: "automation", subcategory: "workflow",
    name: "Task graph", description: "A task graph — which tasks have to happen before which, a DAG of dependencies",
    tags: ["dependencies", "dag", "order"], family: "figure",
    aliases: [], keywords: ["dependencies", "dag", "prerequisites", "ordering", "fan in"],
    shapes: [
      disc(5, 6, 2), disc(5, 18, 2), disc(13, 12, 2),
      poly([[7, 8], [11, 12]]), poly([[7, 16], [11, 12]]), row(12, 15, 21),
    ],
  },
  {
    slug: "subnet", category: "cloud", subcategory: "network",
    name: "Subnet", description: "A subnet — a fenced-off slice of a network with its own address range",
    tags: ["cidr", "range", "slice"], family: "window",
    aliases: [], keywords: ["cidr", "address range", "vpc subnet", "private range", "slice"],
    shapes: [rect(2, 2, 20, 20, 2), disc(7, 7, 1), rect(10, 10, 8, 8, 2)],
  },
  {
    slug: "splitter", category: "data", subcategory: "transform",
    name: "Splitter", description: "A splitter — one stream fanned out into two so both branches receive it",
    tags: ["fan-out", "divide", "branch"], family: "figure",
    aliases: [], keywords: ["fan out", "tee", "divide stream", "branch", "demux"],
    shapes: [row(12, 2, 10), poly([[10, 12], [14, 8], [21, 8]]), poly([[10, 12], [14, 16], [21, 16]])],
  },

  /* ── What the model gives back ────────────────────────────────────────────────── */

  {
    slug: "structured-output", category: "ai", subcategory: "inference",
    name: "Structured output", description: "Structured output — an answer returned in the JSON schema or type you asked for",
    tags: ["json", "schema", "typed"], family: "machine",
    aliases: [], keywords: ["json mode", "function calling", "typed output", "schema", "parseable"],
    shapes: [
      machine(),
      poly([[10, 8.5], [8, 10.5], [8, 13.5], [10, 15.5]]), poly([[14, 8.5], [16, 10.5], [16, 13.5], [14, 15.5]]),
    ],
  },
  {
    slug: "small-language-model", category: "ai", subcategory: "model",
    name: "Small language model", description: "A small language model — compact enough to run on a device or at the edge",
    tags: ["slm", "compact", "on-device"], family: "machine",
    aliases: ["slm"], keywords: ["slm", "on device", "phi", "compact model", "edge inference"],
    // The point is the room around it, so the room has to be drawn.
    shapes: [rect(2, 2, 20, 20, 2), frame(6, 6, 11, 11, 3, { chamfer: 3, gap: 0 })],
  },
  {
    slug: "toxicity", category: "ai", subcategory: "safety",
    name: "Toxicity", description: "Toxicity — harmful or abusive content that should not have been said, flagged",
    tags: ["harmful", "abuse", "flagged"], family: "figure",
    aliases: [], keywords: ["harmful content", "abuse", "hate speech", "moderation", "flagged"],
    shapes: [
      rect(2, 4, 20, 12, 2), poly([[7, 16], [7, 21], [12, 16]]),
      poly([[9, 7], [15, 13]]), poly([[15, 7], [9, 13]]),
    ],
  },
  {
    slug: "text-to-speech", category: "ai", subcategory: "multimodal",
    name: "Text to speech", description: "Text to speech — written words turned into a spoken voice by a model",
    tags: ["tts", "voice", "read"], family: "figure",
    aliases: ["tts"], keywords: ["tts", "voice", "read aloud", "synthesis", "narration"],
    shapes: [row(9, 2, 10), row(13, 2, 8), arc(14, 12, 3, 300, 60), arc(14, 12, 6, 300, 60)],
  },
  {
    slug: "top-k", category: "rag", subcategory: "ranking",
    name: "Top-k", description: "Top-k — keep the k best candidates and drop the rest before sampling",
    tags: ["cut-off", "best", "limit"], family: "figure",
    aliases: [], keywords: ["top k", "cut off", "how many results", "best n", "shortlist"],
    shapes: [row(6, 3, 21), row(10, 3, 18), poly([[3, 13], [21, 13]]), row(17, 3, 15), row(21, 3, 12)],
  },

  /* ── Shapes of data, and how they map ─────────────────────────────────────────── */

  {
    slug: "schema-map", category: "data", subcategory: "transform",
    name: "Schema map", description: "A schema map — this field over there is that field over here, a translation between shapes",
    tags: ["mapping", "fields", "translate"], family: "figure",
    aliases: [], keywords: ["field mapping", "translate schema", "etl mapping", "crosswalk"],
    shapes: [rect(2, 4, 7, 16, 2), rect(15, 4, 7, 16, 2), poly([[9, 9], [15, 15]])],
  },
  {
    slug: "template", category: "interface", subcategory: "layout",
    name: "Template", description: "A template — the shape of a document with the words left out, a form to fill in",
    tags: ["blank", "boilerplate", "form"], family: "window",
    aliases: [], keywords: ["boilerplate", "starter", "blank", "placeholder", "form"],
    shapes: [rect(2, 4, 20, 16, 2), row(9, 6, 18), rect(6, 12, 12, 5, 2.5)],
  },
  {
    slug: "segmentation", category: "analytics", subcategory: "segment",
    name: "Segmentation", description: "Segmentation — one population cut into groups or cohorts that behave alike",
    tags: ["groups", "split", "cohorts"], family: "chart",
    aliases: [], keywords: ["cohorts", "buckets", "split audience", "groups", "breakdown"],
    shapes: [rect(2, 8, 20, 8, 2), col(8, 8, 16), col(13, 8, 16)],
  },
  {
    slug: "seasonality", category: "analytics", subcategory: "metric",
    name: "Seasonality", description: "Seasonality — the same pattern coming round again on a cycle",
    tags: ["cycle", "periodic", "repeats"], family: "chart",
    aliases: [], keywords: ["periodic", "cycle", "weekly pattern", "recurring", "wave"],
    shapes: [arc(7, 12, 4, 180, 0), arc(15, 12, 4, 180, 0), row(16, 3, 21)],
  },
  {
    slug: "significance", category: "analytics", subcategory: "experiment",
    name: "Significance", description: "Statistical significance — a result far enough out that it is unlikely to be luck",
    tags: ["p-value", "threshold", "confident"], family: "chart",
    aliases: [], keywords: ["p value", "statistically significant", "confidence", "tail", "threshold"],
    // Bars drawn in stroke read as letters at this size, however they are arranged. The
    // distribution and the line past its tail never touch, so nothing can merge.
    // The population below the line, and the one result past it. `anomaly` is the same
    // grammar with no line — the line is what makes this a *test* rather than a surprise.
    shapes: [row(10, 3, 21), disc(6, 16, 1), disc(11, 17, 1), disc(16, 15, 1), disc(18, 5, 2)],
  },
  {
    slug: "schedule-report", category: "analytics", subcategory: "dashboard",
    name: "Scheduled report", description: "A scheduled report — the digest that arrives on its own, recurring",
    tags: ["recurring", "digest", "sent"], family: "window",
    aliases: [], keywords: ["digest", "weekly report", "recurring", "emailed", "automatic"],
    shapes: [rect(2, 8, 20, 12, 2), col(8, 3, 8), col(16, 3, 8), row(11, 5, 17), row(15, 5, 13)],
  },

  /* ── Running, sending, subscribing ────────────────────────────────────────────── */

  {
    slug: "script-run", category: "devtools", subcategory: "terminal",
    name: "Run script", description: "Run script — execute a script and start it going from the first line",
    tags: ["execute", "invoke", "start"], family: "figure",
    aliases: [], keywords: ["execute", "npm run", "invoke", "start script", "shell"],
    shapes: [rect(2, 4, 14, 16, 2), row(9, 5, 13), row(13, 5, 11), poly([[17, 9], [20, 12], [17, 15]])],
  },
  {
    slug: "send-back", category: "interface", subcategory: "communication",
    name: "Send back", description: "Send back — return it to whoever sent it, bounce or reject the item",
    tags: ["return", "bounce", "reject"], family: "figure",
    aliases: ["return"], keywords: ["return", "bounce", "send to sender", "reject", "back"],
    shapes: [
      // `send`'s ring with the arrow coming back down-left: the reply.
      disc(12, 12, 9), poly([[15.5, 8.5], [11, 13]]),
      poly([[13.5, 15], [9, 15], [9, 10.5]]),
    ],
  },
  {
    slug: "subscribe", category: "interface", subcategory: "communication",
    name: "Subscribe", description: "Subscribe — follow a feed and be told when there is more to read",
    tags: ["follow", "feed", "updates"], family: "figure",
    aliases: [], keywords: ["follow", "rss", "feed", "notify me", "watch"],
    shapes: [disc(5, 19, 1), arc(5, 19, 7, 270, 0), arc(5, 19, 13, 270, 0)],
  },
  {
    slug: "session-token", category: "security", subcategory: "auth",
    name: "Session token", description: "A session token — the opaque bearer or cookie that proves it is still you",
    tags: ["cookie", "bearer", "opaque"], family: "figure",
    aliases: [], keywords: ["bearer token", "cookie", "jwt", "session id", "opaque string"],
    shapes: [rect(2, 8, 20, 8, 4), col(9, 8, 16), disc(15, 12, 1)],
  },
  {
    slug: "tls", category: "security", subcategory: "encryption",
    name: "TLS", description: "TLS — the wire with a lock on it, encrypted transport behind HTTPS",
    tags: ["https", "encrypted", "transport"], family: "lock",
    aliases: ["https"], keywords: ["https", "ssl", "encrypted transport", "certificate", "in transit"],
    shapes: [row(12, 2, 8), rect(8, 9, 8, 8, 2), arc(12, 9, 3, 180, 360), row(12, 16, 22)],
  },
];
