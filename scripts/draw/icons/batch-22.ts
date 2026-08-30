/**
 * Batch 22 — infrastructure, and two more pairs that differ by one mark.
 *
 * `access-grant` and `access-deny` are `gateway`'s doorway with a tick or a cross in it.
 * `blue-green` and `dedupe` are two rectangles with a tick or a cross on the second. The
 * set has four of these pairs now, and they all work the same way: everything identical
 * except the mark, so the mark is the only thing a reader has to see.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { cycle, page, shield } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_22: Icon[] = [
  /* ── Data at rest and in motion ───────────────────────────────────────────────── */

  {
    slug: "data-lake", category: "data", subcategory: "storage",
    name: "Data lake", description: "A data lake — everything kept raw and unstructured in one place until it is needed",
    tags: ["raw", "unstructured", "pool"], family: "cylinder",
    aliases: ["lakehouse"], keywords: ["raw storage", "parquet", "s3", "unstructured", "pool"],
    // `storage-bucket`'s cylinder with a surface in it. A bucket holds objects; a lake has
    // a level, and the wave is the only part of the drawing that says the contents are not
    // arranged.
    shapes: [
      raw("M4 6A8 3 0 0 1 20 6V18A8 3 0 0 1 4 18Z",
        "a cylinder: an elliptical rim of 8 by 3, sides of 12, and the front of the base", true),
      raw("M4 6A8 3 0 0 0 20 6", "the far side of the top rim, which the near side hides"),
      poly([[6, 13], [9, 10], [12, 13], [15, 10], [18, 13]]),
    ],
  },
  {
    slug: "aggregate", category: "data", subcategory: "transform",
    name: "Aggregate", description: "Aggregate — roll many rows up into one number, a sum, an average or a count",
    tags: ["sum", "roll-up", "combine"], family: "funnel",
    aliases: ["rollup"], keywords: ["sum", "group by", "count", "roll up", "reduce"],
    shapes: [
      poly([[3, 5], [10, 12]]), row(12, 3, 10), poly([[3, 19], [10, 12]]),
      row(12, 10, 18), poly([[15, 9], [18, 12], [15, 15]]),
    ],
  },
  {
    slug: "event-stream", category: "data", subcategory: "streaming",
    name: "Event stream", description: "An event stream — events arriving one after another in an append-only log",
    tags: ["events", "log", "append"], family: "rails",
    aliases: [], keywords: ["kafka", "append-only", "topic", "cdc", "events"],
    // A broken line, not a solid one. `stream`'s three offset runs are a flow; a dashed
    // line is a series of separate things, which is what an event stream is.
    // Dashes falling down the diagonal into an arrowhead: the same append-only flow,
    // no longer a 20×6 stripe.
    shapes: [
      poly([[2.5, 2.5], [5, 5]]), poly([[7.5, 7.5], [10, 10]]), poly([[12.5, 12.5], [15, 15]]),
      poly([[20.5, 17], [20.5, 20.5], [17, 20.5]]),
    ],
  },
  {
    slug: "governance", category: "data", subcategory: "catalog",
    name: "Governance", description: "Data governance — the rules, policies and controls the data has to follow",
    tags: ["policy", "rules", "control"], family: "shield",
    aliases: [], keywords: ["policy", "stewardship", "compliance", "rules", "ownership"],
    shapes: [shield(), row(10, 8, 16), row(14, 8, 14)],
  },

  /* ── Shipping ─────────────────────────────────────────────────────────────────── */

  {
    slug: "ci", category: "devops", subcategory: "ci-cd",
    name: "Continuous integration", description: "Continuous integration — every change built and tested automatically as soon as it lands",
    tags: ["build", "test", "loop"], family: "rotation",
    aliases: [], keywords: ["pipeline", "build", "test", "github actions", "jenkins"],
    // `repeat`'s loop with a tick in it. The loop says it happens every time and the tick
    // says what it is for, which between them is the whole of the phrase.
    shapes: [...cycle(), poly([[9, 13], [11, 15], [15, 11]])],
  },
  {
    slug: "cd", category: "devops", subcategory: "ci-cd",
    name: "Continuous delivery", description: "Continuous delivery — every successful build on its way out to a release",
    tags: ["deliver", "release", "loop"], family: "rotation",
    aliases: [], keywords: ["continuous deployment", "release train", "pipeline", "ship"],
    // The same loop with an arrow leaving instead of a tick. `ci` checks and stops; `cd`
    // checks and keeps going.
    shapes: [...cycle(), col(12, 17, 12), poly([[9, 15], [12, 12], [15, 15]])],
  },
  {
    slug: "canary", category: "devops", subcategory: "release",
    name: "Canary", description: "A canary release — one instance running the new version so problems show up early",
    tags: ["gradual", "sample", "test"], family: "chain",
    aliases: [], keywords: ["canary release", "gradual rollout", "percentage", "sample"],
    // Two of one shape and one of another. Which one is different matters less than that
    // exactly one of them is.
    shapes: [
      disc(5, 5, 2), disc(12, 12, 2),
      poly([[18.5, 15.5], [21.5, 18.5], [18.5, 21.5], [15.5, 18.5]], true),
    ],
  },
  {
    slug: "blue-green", category: "devops", subcategory: "release",
    name: "Blue-green", description: "Blue-green deployment — two identical stacks, one live, swapped over at cutover",
    tags: ["swap", "cutover", "parallel"], family: "window",
    aliases: [], keywords: ["cutover", "swap", "zero downtime", "two environments"],
    shapes: [
      rect(2, 7, 8, 10, 2), rect(13, 7, 8, 10, 2),
      poly([[15, 12], [17, 14], [20, 11]]),
    ],
  },
  {
    slug: "config", category: "devops", subcategory: "infrastructure",
    name: "Config", description: "Config — the settings of a system written down as a file, YAML, JSON or environment",
    tags: ["settings", "yaml", "file"], family: "page",
    aliases: [], keywords: ["yaml", "toml", "env", "dotfile", "settings file"],
    // `settings`' rails on `page()`. Settings on their own are a control panel; on a page
    // they are the thing checked into the repository.
    shapes: [page(), row(10, 9, 15), col(13, 8, 12), row(15, 9, 15), col(11, 13, 17)],
  },

  /* ── Cloud ────────────────────────────────────────────────────────────────────── */

  {
    slug: "dns", category: "cloud", subcategory: "network",
    name: "DNS", description: "DNS — which domain name points where, the records that resolve names to addresses",
    tags: ["name", "resolve", "record"], family: "figure",
    aliases: [], keywords: ["domain", "record", "a record", "cname", "resolve"],
    // A signpost. Everyone draws this as a globe, and a globe already means the internet
    // in this set — what DNS does is point a name at a place.
    shapes: [col(6, 3, 21), rect(8, 4, 13, 4, 2), rect(8, 11, 10, 4, 2)],
  },
  {
    slug: "cdn", category: "cloud", subcategory: "edge",
    name: "CDN", description: "A CDN — copies of your content cached at the edge, close to everyone who asks for it",
    tags: ["edge", "cache", "distributed"], family: "orbit",
    aliases: [], keywords: ["cache", "pop", "edge cache", "distribution", "cloudfront"],
    shapes: [disc(12, 12, 5), disc(4, 6, 2), disc(20, 6, 2), disc(4, 18, 2), disc(20, 18, 2)],
  },
  {
    slug: "private-link", category: "cloud", subcategory: "network",
    name: "Private link", description: "A private link — a connection between services that never leaves the private network",
    tags: ["private", "peering", "secure"], family: "node",
    aliases: [], keywords: ["vpc peering", "private endpoint", "internal", "no internet"],
    shapes: [
      row(12, 2, 8), rect(8.5, 8.5, 7, 7, 2), arc(12, 8.5, 2.5, 180, 360), row(12, 16, 22),
    ],
  },
  {
    slug: "bare-metal", category: "cloud", subcategory: "compute",
    name: "Bare metal", description: "Bare metal — an actual physical server, dedicated rather than a share of one",
    tags: ["physical", "dedicated", "server"], family: "tower",
    aliases: [], keywords: ["dedicated", "physical", "rack", "colocation", "hardware"],
    // `mcp-server`'s tower without the cut corner. The chamfer is the protocol's claim, so
    // the same drawing without it is simply a machine somebody owns.
    shapes: [rect(3, 5, 18, 14, 2), disc(7, 9, 1), disc(17, 9, 1), disc(7, 15, 1), disc(17, 15, 1)],
  },
  {
    slug: "memory-ram", category: "cloud", subcategory: "compute",
    name: "Memory", description: "Memory — the RAM modules that decide how much a machine can hold at once",
    tags: ["ram", "module", "capacity"], family: "machine",
    aliases: ["ram"], keywords: ["ram", "gb", "dimm", "capacity", "working set"],
    shapes: [rect(3, 6, 18, 10, 2), col(7, 16, 20), col(12, 16, 20), col(17, 16, 20)],
  },

  /* ── Who gets in ──────────────────────────────────────────────────────────────── */

  {
    slug: "access-grant", category: "security", subcategory: "auth",
    name: "Access granted", description: "Access granted — you may come through, permission allowed and the door open",
    tags: ["allow", "permit", "open"], family: "window",
    aliases: ["allow"], keywords: ["permit", "authorised", "let in", "approved", "green"],
    shapes: [frame(5, 4, 14, 16, 3, { gap: 3 }), poly([[9, 12], [11, 14], [15, 10]])],
  },
  {
    slug: "access-deny", category: "security", subcategory: "auth",
    name: "Access denied", description: "Access denied — you may not come through, permission refused",
    tags: ["block", "refuse", "closed"], family: "window",
    aliases: ["deny"], keywords: ["forbidden", "403", "blocked", "refused", "unauthorised"],
    shapes: [
      frame(5, 4, 14, 16, 3, { gap: 3 }),
      poly([[9, 10], [15, 16]]), poly([[15, 10], [9, 16]]),
    ],
  },
  {
    slug: "anonymise", category: "security", subcategory: "compliance",
    name: "Anonymise", description: "Anonymise — strip the personal details out so the person cannot be identified",
    tags: ["mask", "pii", "private"], family: "figure",
    aliases: ["pseudonymise", "privacy"], keywords: ["pii", "mask", "gdpr", "redact", "de-identify"],
    // `user`'s figure with a bar across where the face is. `redact` covers a line of text
    // the same way, and the two are meant to be recognised as the same act.
    shapes: [disc(12, 8, 3), arc(12, 21, 6, 180, 360), rect(7, 6.5, 10, 3, 1.5)],
  },
  {
    slug: "identity", category: "security", subcategory: "auth",
    name: "Identity", description: "Identity — who somebody is, their profile and details on an ID card",
    tags: ["profile", "id", "card"], family: "window",
    aliases: ["id"], keywords: ["passport", "profile", "kyc", "credential", "badge"],
    shapes: [
      rect(2, 5, 20, 14, 2), disc(8, 11, 2), arc(8, 17, 4, 180, 360),
      row(11, 14, 20), row(15, 14, 18),
    ],
  },
];
