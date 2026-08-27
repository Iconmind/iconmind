/**
 * Batch 28 — the editor, the environment, and things that come in three states.
 *
 * `environment` is three boxes at three sizes, which is the only way this set can say
 * "development, staging, production" without labels. The sizes are the ordering, and the
 * ordering is the whole word.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_28: Icon[] = [
  /* ── Where it runs ────────────────────────────────────────────────────────────── */

  {
    slug: "environment", category: "devops", subcategory: "infrastructure",
    name: "Environment", description: "Development, staging, production",
    tags: ["stage", "tier", "deploy-target"], family: "grid",
    aliases: [], keywords: ["dev", "staging", "prod", "tier", "target"],
        // Three tiers, stacked and of different widths. Side by side they share vertical edges,
    // and two strokes on one line cancel each other out — which the validator says and the
    // render confirms as a single thick rule nobody drew.
    shapes: [poly([[4, 12], [12, 4], [20, 12], [20, 20], [4, 20]], true), col(12, 16, 20)],
  },
  {
    slug: "infrastructure", category: "devops", subcategory: "infrastructure",
    name: "Infrastructure", description: "Everything underneath",
    tags: ["platform", "base", "foundation"], family: "grid",
    aliases: [], keywords: ["platform", "terraform", "provisioning", "foundation", "iac"],
    shapes: [
      rect(4, 3, 7, 7, 2), rect(14, 3, 7, 7, 2), row(14, 2, 22), row(18, 2, 22),
    ],
  },
  {
    slug: "environment-var", category: "devtools", subcategory: "editor",
    name: "Environment variable", description: "A value the process is handed",
    tags: ["config", "secret", "setting"], family: "capsule",
    aliases: ["env-var"], keywords: ["dotenv", "process.env", "config value", "export"],
    shapes: [rect(3, 3, 18, 18, 2), row(10.5, 8, 16), row(13.5, 8, 16)],
  },
  {
    slug: "hotfix", category: "devops", subcategory: "release",
    name: "Hotfix", description: "A repair that could not wait",
    tags: ["patch", "urgent", "quick"], family: "machine",
    aliases: [], keywords: ["patch", "urgent", "emergency", "cherry-pick", "band-aid"],
    // `trigger`'s bolt over a machine, half in and half out. The bolt inside is `incident`,
    // which is the thing going wrong; crossing the wall is somebody arriving to fix it.
    shapes: [
      rect(2, 4, 13, 13, 2), rect(10, 11, 11, 9, 2), col(19, 2, 5.5), disc(19, 8.5, 1),
    ],
  },
  {
    slug: "deploy-rollback", category: "devops", subcategory: "release",
    name: "Deploy rollback", description: "Undo the last release",
    tags: ["revert", "previous", "back"], family: "machine",
    aliases: [], keywords: ["roll back", "previous version", "undo deploy", "recover"],
    shapes: [
      frame(4, 11, 16, 10, 3, { chamfer: 3, gap: 4 }),
      arc(12, 6, 4, 180, 0), poly([[10, 4], [8, 6], [10, 8]]),
    ],
  },
  {
    slug: "error-budget", category: "devops", subcategory: "observability",
    name: "Error budget", description: "How much failure you are allowed",
    tags: ["slo", "allowance", "spent"], family: "capsule",
    aliases: [], keywords: ["slo", "sli", "burn rate", "allowance", "remaining"],
    shapes: [rect(2, 12, 20, 6, 3), col(15, 9, 15), poly([[17, 4], [21, 8]]), poly([[21, 4], [17, 8]])],
  },

  /* ── Cost ─────────────────────────────────────────────────────────────────────── */

  {
    slug: "cost-per-token", category: "ai", subcategory: "token",
    name: "Cost per token", description: "What each one costs you",
    tags: ["rate", "price", "unit"], family: "capsule",
    aliases: [], keywords: ["price per 1k", "unit cost", "rate card", "input output"],
    shapes: [rect(2, 9, 6, 6, 3), row(12, 10, 13), disc(17, 12, 4), col(17, 10, 14)],
  },
  {
    slug: "cost-per-request", category: "analytics", subcategory: "metric",
    name: "Cost per request", description: "What one call works out at",
    tags: ["unit", "rate", "spend"], family: "chain",
    aliases: [], keywords: ["unit economics", "per call", "amortised", "margin"],
    shapes: [disc(6, 6, 3), poly([[8, 8], [14, 14]]), disc(17, 17, 5)],
  },
  {
    slug: "billing", category: "cloud", subcategory: "cost",
    name: "Billing", description: "The invoice",
    tags: ["invoice", "charge", "account"], family: "page",
    aliases: [], keywords: ["invoice", "statement", "charges", "account", "payment"],
    shapes: [page(), row(9, 9, 15), row(13, 9, 13), row(18, 9, 15), disc(16, 18, 1)],
  },

  /* ── Retrieval and data ───────────────────────────────────────────────────────── */

  {
    slug: "extractor", category: "rag", subcategory: "ingestion",
    name: "Extractor", description: "Pulls the useful part out",
    tags: ["parse", "pick", "lift"], family: "page",
    aliases: [], keywords: ["parse", "scrape", "structured output", "pick out", "field"],
    shapes: [
      poly([[13, 2], [6, 2], [6, 21], [14, 21]]), row(8, 9, 13), row(12, 9, 13),
      row(12, 16, 20), poly([[17, 9], [20, 12], [17, 15]]),
    ],
  },
  {
    slug: "document-parse", category: "rag", subcategory: "ingestion",
    name: "Document parse", description: "Reading the shape out of a file",
    tags: ["structure", "read", "convert"], family: "page",
    aliases: [], keywords: ["ocr", "layout", "structured", "convert", "markdown"],
    shapes: [
      poly([[12, 2], [5, 2], [5, 18], [13, 18]]),
      row(14, 15, 19), poly([[16, 11], [19, 14], [16, 17]]),
      rect(14, 2, 8, 7, 2),
    ],
  },
  {
    slug: "freshness", category: "rag", subcategory: "knowledge",
    name: "Freshness", description: "How recently it was checked",
    tags: ["recent", "stale", "age"], family: "page",
    aliases: [], keywords: ["stale", "last updated", "age", "ttl", "re-index"],
    shapes: [
      col(12, 9, 16), poly([[12, 9], [7, 4]]), poly([[12, 9], [17, 4]]), rect(5, 16, 14, 5, 2.5),
    ],
  },
  {
    slug: "index-db", category: "data", subcategory: "catalog",
    name: "Index", description: "The lookup that makes it fast",
    tags: ["btree", "key", "seek"], family: "machine",
    aliases: [], keywords: ["b-tree", "primary key", "seek", "query plan", "lookup"],
    shapes: [machine(), col(9, 8, 16), row(9, 9, 16), row(12, 9, 16), row(15, 9, 16)],
  },
  {
    slug: "foreign-key", category: "data", subcategory: "catalog",
    name: "Foreign key", description: "A column that points at another table",
    tags: ["relation", "reference", "link"], family: "chain",
    aliases: [], keywords: ["relation", "reference", "constraint", "join key", "fk"],
    shapes: [
      rect(2, 5, 8, 14, 2), rect(14, 5, 8, 14, 2), row(12, 10, 14), disc(6, 12, 2),
    ],
  },
  {
    slug: "elt", category: "data", subcategory: "transform",
    name: "ELT", description: "Load it first, change it after",
    tags: ["load", "transform", "warehouse"], family: "machine",
    aliases: [], keywords: ["extract load transform", "dbt", "in-warehouse", "modern stack"],
    // `etl`'s three parts in the other order: the store comes before the machine rather
    // than after it, which is the entire difference between the two words.
    shapes: [
      raw("M2 5A5 2.5 0 0 1 12 5V13A5 2.5 0 0 1 2 13Z",
        "a cylinder: an elliptical rim of 5 by 2.5, sides of 8, and the front of the base", true),
      raw("M2 5A5 2.5 0 0 0 12 5", "the far side of the top rim, which the near side hides"),
      row(12, 13, 16), poly([[16, 9], [19, 12], [16, 15]]),
      rect(15, 15, 7, 7, 2),
    ],
  },

  /* ── Editing ──────────────────────────────────────────────────────────────────── */

  {
    slug: "editor", category: "devtools", subcategory: "editor",
    name: "Editor", description: "Where the code is written",
    tags: ["ide", "workspace", "window"], family: "window",
    aliases: ["ide"], keywords: ["ide", "vscode", "workspace", "buffer", "text editor"],
    shapes: [
      frame(2, 4, 20, 16, 3, { gap: 4 }), col(8, 4, 20),
      row(9, 11, 19), row(13, 11, 16), row(17, 11, 18),
    ],
  },
  {
    slug: "editor-split", category: "devtools", subcategory: "editor",
    name: "Split editor", description: "Two files at once",
    tags: ["panes", "side-by-side", "compare"], family: "window",
    aliases: [], keywords: ["split view", "two panes", "compare", "diff view"],
        // One divider with text either side of it. `columns` is the same frame with two
    // dividers and nothing in it, which is a layout; an editor split has files in it.
    shapes: [
      frame(2, 4, 20, 16, 3, { gap: 4 }), col(12, 4, 20),
      row(9, 5, 10), row(13, 5, 9), row(9, 14, 19), row(13, 14, 18),
    ],
  },
  {
    slug: "format-code", category: "devtools", subcategory: "editor",
    name: "Format", description: "Line it all up",
    tags: ["prettier", "align", "tidy"], family: "rails",
    aliases: ["prettier"], keywords: ["prettier", "gofmt", "indent", "tidy", "lint fix"],
    shapes: [row(5, 3, 21), row(10, 8, 21), row(15, 8, 21), row(20, 3, 21)],
  },
  {
    slug: "function-def", category: "devtools", subcategory: "code",
    name: "Function", description: "A named piece of behaviour",
    tags: ["method", "def", "call"], family: "bracket",
    aliases: ["method"], keywords: ["def", "func", "method", "signature", "callable"],
    shapes: [
      poly([[9, 5], [6, 5], [6, 19], [9, 19]]), poly([[15, 5], [18, 5], [18, 19], [15, 19]]),
      row(12, 10, 14),
    ],
  },
  {
    slug: "class", category: "devtools", subcategory: "code",
    name: "Class", description: "A shape other things are made from",
    tags: ["type", "object", "template"], family: "window",
    aliases: ["type"], keywords: ["object", "struct", "interface", "instance", "oop"],
    shapes: [rect(3, 3, 18, 18, 2), row(9, 3, 21), row(15, 3, 21)],
  },
  {
    slug: "dependency", category: "devtools", subcategory: "package",
    name: "Dependency", description: "Something this needs to work",
    tags: ["requires", "package", "link"], family: "chain",
    aliases: [], keywords: ["requires", "npm install", "transitive", "lock", "upstream"],
    shapes: [
      rect(2, 3, 9, 8, 2), poly([[6.5, 11], [6.5, 16], [13, 16]]),
      rect(13, 12, 9, 8, 2),
    ],
  },
  {
    slug: "heap", category: "devtools", subcategory: "debug",
    name: "Heap", description: "Where the objects live",
    tags: ["memory", "allocation", "objects"], family: "grid",
    aliases: [], keywords: ["allocation", "gc", "retained", "objects", "profiler"],
    shapes: [
      rect(3, 12, 18, 9, 2), disc(8, 16.5, 2), disc(16, 16.5, 2),
      disc(8, 6, 2), disc(16, 6, 2),
    ],
  },
  {
    slug: "graphql", category: "devtools", subcategory: "api",
    name: "GraphQL", description: "Ask for exactly the fields you want",
    tags: ["query", "schema", "graph"], family: "chain",
    aliases: [], keywords: ["query language", "resolver", "schema", "apollo", "fields"],
    shapes: [
      disc(12, 5, 2), disc(5, 12, 2), disc(19, 12, 2), disc(12, 19, 2),
      poly([[10.5, 6.5], [6.5, 10.5]]), poly([[13.5, 6.5], [17.5, 10.5]]),
    ],
  },
];
