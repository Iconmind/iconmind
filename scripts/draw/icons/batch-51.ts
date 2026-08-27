/**
 * Batch 51 — the second batch of the growth plan: testing, data movement, and the
 * operations of serving.
 *
 * Family discipline does the naming here: `trigger-email` rides the trigger family's
 * exact arrow, `approve-step` joins the pipeline-stage family (a check where `-run`
 * has its play and `-fail` its cross), and `index-rebuild` puts its mark inside the
 * rotation family's square loop. `reject-step` was considered and NOT drawn —
 * `pipeline-fail` already is that picture.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { cycle } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_51: Icon[] = [
  /* ── Testing what the tests are worth ─────────────────────────────────────────── */

  {
    slug: "property-test", category: "devtools", subcategory: "testing",
    name: "Property test", description: "Many generated inputs, one property that must hold",
    tags: ["generated", "fuzz", "invariant"], family: "figure",
    aliases: ["fuzzing"], keywords: ["property-based", "quickcheck", "generated inputs", "invariant", "fuzz"],
    // Three inputs funnel toward the one verdict.
    shapes: [
      disc(4, 6, 1), disc(4, 18, 1),
      poly([[7.5, 6], [11, 9.5]]), poly([[7.5, 18], [11, 14.5]]),
      poly([[13, 12], [15, 14], [19, 10]]),
    ],
  },
  {
    slug: "mutation-test", category: "devtools", subcategory: "testing",
    name: "Mutation test", description: "Break the code on purpose; the tests must notice",
    tags: ["mutant", "seeded", "caught"], family: "rails",
    aliases: [], keywords: ["mutation testing", "mutant", "seeded bug", "test quality", "stryker"],
    // The original line, the line with a mutation dropped into it, and the check that
    // proves the suite caught it.
    shapes: [
      row(5, 3, 21),
      row(12, 3, 10), disc(14, 12, 1), row(12, 18, 21),
      poly([[9, 17], [11, 19], [15, 15]]),
    ],
  },
  {
    slug: "gc-pause", category: "devtools", subcategory: "debug",
    name: "GC pause", description: "Everything stops while the collector runs",
    tags: ["stop-the-world", "latency", "memory"], family: "rails",
    aliases: [], keywords: ["garbage collection", "stop the world", "pause time", "gc", "hiccup"],
    // The stream halts at the bars and resumes on the other side.
    shapes: [row(12, 2, 8), col(11, 7, 17), col(14, 7, 17), row(12, 17, 22)],
  },
  {
    slug: "multi-cursor", category: "devtools", subcategory: "editor",
    name: "Multi-cursor", description: "Two carets, one keystroke",
    tags: ["carets", "edit", "simultaneous"], family: "rails",
    aliases: [], keywords: ["multiple cursors", "multi caret", "column edit", "simultaneous edit"],
    shapes: [
      row(5, 3, 21),
      row(12, 3, 9), col(12, 9, 15),
      row(19, 3, 13), col(16, 16, 22),
    ],
  },

  /* ── Grounding, kept fresh ────────────────────────────────────────────────────── */

  {
    slug: "citation-check", category: "rag", subcategory: "grounding",
    name: "Citation check", description: "The quote actually says what it is cited for",
    tags: ["verify", "source", "quote"], family: "figure",
    aliases: [], keywords: ["citation", "verify quote", "grounded", "source check", "attribution"],
    // The quotation marks, and the sweep of a check under them.
    shapes: [col(4, 3, 7), col(8, 3, 7), poly([[4, 14], [9, 19], [20, 8]])],
  },
  {
    slug: "index-rebuild", category: "rag", subcategory: "vector",
    name: "Index rebuild", description: "The index, being made again",
    tags: ["reindex", "refresh", "batch"], family: "window",
    aliases: ["reindex"], keywords: ["rebuild index", "reindex", "refresh embeddings", "backfill"],
    // The rotation family's loop with the index's rows in its hollow.
    shapes: [...cycle(), row(11, 7, 17), row(15, 7, 17)],
  },

  /* ── Data on the move ─────────────────────────────────────────────────────────── */

  {
    slug: "cdc", category: "data", subcategory: "streaming",
    name: "CDC", description: "Every change, streamed out as it happens",
    tags: ["changes", "stream", "capture"], family: "figure",
    aliases: ["change-data-capture"], keywords: ["change data capture", "debezium", "binlog", "stream changes", "replication"],
    // The store on the left, its changes leaving as a dashed arrow.
    shapes: [
      rect(2, 5, 8, 14, 2), row(9, 2, 10), row(14, 2, 10),
      poly([[13, 12], [15.5, 12]]), poly([[18, 12], [20.5, 12]]),
      poly([[19, 9], [22, 12], [19, 15]]),
    ],
  },
  {
    slug: "schema-evolve", category: "data", subcategory: "transform",
    name: "Schema evolution", description: "The table grows a column without breaking",
    tags: ["migrate", "add-column", "compatible"], family: "figure",
    aliases: [], keywords: ["schema evolution", "add column", "migration", "backwards compatible"],
    shapes: [
      rect(3, 3, 10, 18, 2), row(8, 3, 13), row(13, 3, 13),
      col(19, 9, 15), row(12, 16, 22),
    ],
  },
  {
    slug: "quality-gate", category: "data", subcategory: "quality",
    name: "Quality gate", description: "Data does not pass until it checks out",
    tags: ["gate", "checks", "block"], family: "figure",
    aliases: [], keywords: ["quality gate", "data checks", "expectations", "block bad data"],
    // Two posts and the check between them: through the gate, verified.
    shapes: [col(4, 3, 21), col(20, 3, 21), poly([[8, 12], [11, 15], [17, 9]])],
  },

  /* ── Serving, warmed and shadowed ─────────────────────────────────────────────── */

  {
    slug: "shadow-deploy", category: "devops", subcategory: "release",
    name: "Shadow deploy", description: "The new version runs beside the old, unseen",
    tags: ["mirror", "dark", "traffic"], family: "figure",
    aliases: ["dark-launch"], keywords: ["shadow traffic", "dark launch", "mirror requests", "silent deploy"],
    // The live box, and the corner of its shadow twin — present, but not all there.
    shapes: [rect(3, 8, 13, 13, 2), poly([[12, 3], [21, 3], [21, 12]])],
  },
  {
    slug: "warm-start", category: "devops", subcategory: "infrastructure",
    name: "Warm start", description: "Already warm when the request lands",
    tags: ["prewarmed", "ready", "fast"], family: "figure",
    aliases: ["prewarm"], keywords: ["warm pool", "prewarmed", "no cold start", "ready instance"],
    // Heat standing over the instance.
    shapes: [rect(4, 10, 16, 10, 2), col(8, 3, 7), col(12, 3, 7), col(16, 3, 7)],
  },
  {
    slug: "node-pool", category: "devops", subcategory: "orchestration",
    name: "Node pool", description: "Interchangeable machines, one tray",
    tags: ["group", "workers", "scale"], family: "figure",
    aliases: [], keywords: ["node pool", "worker group", "autoscaling group", "fleet"],
    shapes: [
      disc(5, 9, 2), disc(12, 9, 2), disc(19, 9, 2),
      poly([[4, 15], [4, 19], [20, 19], [20, 15]]),
    ],
  },

  /* ── Steps that wait for people, and what sets them off ───────────────────────── */

  {
    slug: "approve-step", category: "automation", subcategory: "human-loop",
    name: "Approval step", description: "The stage that waits for a yes",
    tags: ["review", "gate", "human"], family: "figure",
    aliases: [], keywords: ["approval", "human in the loop", "sign off", "manual gate"],
    // The pipeline-stage family: `-run` holds a play, `-fail` a cross — this one holds
    // the check a person gives it. The stage, line and arrow are byte-identical.
    shapes: [
      rect(2, 6, 12, 12, 2), poly([[5, 12], [7, 14], [10.5, 10.5]]),
      row(12, 14, 18), poly([[18, 9], [21, 12], [18, 15]]),
    ],
  },
  {
    slug: "trigger-email", category: "automation", subcategory: "trigger",
    name: "Email trigger", description: "A mail arrives, the workflow starts",
    tags: ["inbound", "mail", "start"], family: "figure",
    aliases: [], keywords: ["email trigger", "inbound mail", "on receive", "mailbox automation"],
    // The trigger family's arrow, fired by an envelope.
    shapes: [
      rect(2, 8, 11, 9, 2), poly([[4, 9], [7.5, 12.5], [11, 9]]),
      row(12, 16, 20), poly([[17, 9], [20, 12], [17, 15]]),
    ],
  },

  /* ── The tail, measured ───────────────────────────────────────────────────────── */

  {
    slug: "latency-p99", category: "analytics", subcategory: "llm-observability",
    name: "p99 latency", description: "Not the average — the one in a hundred that hurts",
    tags: ["tail", "percentile", "slow"], family: "chart",
    aliases: ["tail-latency"], keywords: ["p99", "percentile", "tail latency", "slow requests", "sla"],
    // The distribution falls away, and then the tail spike stands alone.
    shapes: [row(20, 3, 21), col(5, 11, 20), col(9, 14, 20), col(13, 16, 20), col(19, 4, 20)],
  },

  /* ── Private ways in ──────────────────────────────────────────────────────────── */

  {
    slug: "private-endpoint", category: "cloud", subcategory: "network",
    name: "Private endpoint", description: "The route ends at a lock, not the internet",
    tags: ["vpc", "private", "no-egress"], family: "lock",
    aliases: [], keywords: ["private link", "vpc endpoint", "no public ip", "internal only"],
    // `endpoint`'s diagonal route, terminating in a padlock instead of an open node.
    shapes: [poly([[3, 3], [10, 10]]), rect(13, 12, 8, 7, 2), arc(17, 12, 3, 180, 360)],
  },
  {
    slug: "mfa-push", category: "security", subcategory: "auth",
    name: "MFA push", description: "Approve it on the phone in your hand",
    tags: ["phone", "approve", "second-factor"], family: "figure",
    aliases: [], keywords: ["push notification", "mfa", "approve login", "authenticator", "2fa"],
    shapes: [rect(4, 2, 9, 20, 2), disc(8.5, 18, 1), poly([[16, 11], [18, 13], [21, 10]])],
  },
];
