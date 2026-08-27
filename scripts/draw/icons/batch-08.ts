/**
 * Batch 08 — infrastructure, and the shapes that need an ellipse.
 *
 * A cylinder is the one everyday object this set could not draw until now. Seen at an angle
 * its rim is an ellipse, and `arc()` makes circles — an ellipse of 8 by 3 is not a circle at
 * any radius. Three concepts wanted one (`storage-bucket`, `cost`, and `globe` before them),
 * so it goes through `raw()` with the axes written down, which is the whole contract of that
 * escape hatch: a hand-written path has to say what it is.
 */
import { arc, area, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { cycle, machine, page, window_ } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_08: Icon[] = [
  /* ── Running things ───────────────────────────────────────────────────────────── */

  {
    slug: "container", category: "devops", subcategory: "container",
    name: "Container", description: "An app and everything it needs, boxed",
    tags: ["docker", "image", "isolated"], family: "grid",
    aliases: ["docker"], keywords: ["docker", "image", "pod", "oci", "isolation"],
    // A corrugated box. Two small boxes on a floor was the first drawing and it came out as
    // a pair of spectacles — two of anything, side by side and level, reads as a pair rather
    // than as a kind of thing.
    shapes: [rect(3, 7, 18, 12, 2), col(8, 7, 19), col(12, 7, 19), col(16, 7, 19)],
  },

  {
    slug: "vm", category: "cloud", subcategory: "compute",
    name: "Virtual machine", description: "A machine that is really software",
    tags: ["instance", "virtual", "host"], family: "machine",
    aliases: ["instance"], keywords: ["ec2", "hypervisor", "guest", "virtualisation"],
    // A machine inside a machine, which is the definition rather than a metaphor for it.
    shapes: [frame(2, 4, 20, 16, 3, { gap: 4 }), rect(7, 8, 10, 8, 2)],
  },

  {
    slug: "release", category: "devops", subcategory: "release",
    name: "Release", description: "A version, tagged and shipped",
    tags: ["version", "tag", "ship"], family: "figure",
    aliases: ["version"], keywords: ["tag", "semver", "changelog", "ship", "publish"],
    // A luggage tag: the point at the left is where it attaches, and the hole is what it
    // attaches through. Without the hole it is an arrow that has run into a wall.
    shapes: [poly([[4, 12], [10, 6], [20, 6], [20, 18], [10, 18]], true), disc(13, 12, 1)],
  },

  {
    slug: "rollback", category: "devops", subcategory: "release",
    name: "Rollback", description: "Put the previous version back",
    tags: ["revert", "undo", "previous"], family: "machine",
    aliases: [], keywords: ["roll back", "revert", "previous version", "downgrade", "restore"],
    // `deploy`'s machine and `deploy`'s arrow, turned round. The arc-and-head version read
    // as a hook hanging over a box; an arrow going back in is unmistakable, and it makes the
    // pair one decision drawn in two directions.
    shapes: [
      frame(4, 11, 16, 9, 3, { chamfer: 3, gap: 3 }),
      col(12, 3, 8), poly([[9, 5], [12, 8], [15, 5]]),
    ],
  },

  /* ── Watching them ────────────────────────────────────────────────────────────── */

  {
    slug: "log", category: "devops", subcategory: "observability",
    name: "Log", description: "What happened, written down as it happened",
    tags: ["records", "entries", "history"], family: "page",
    aliases: ["logs"], keywords: ["stdout", "entries", "syslog", "journal", "tail"],
    // A page with a margin. The rule down the left is what separates a log from a document:
    // every line has a stamp before it, even when the stamp is not drawn.
    shapes: [page(), col(9, 6, 18), row(9, 11, 16), row(13, 11, 16), row(17, 11, 14)],
  },

  {
    slug: "trace", category: "devops", subcategory: "observability",
    name: "Trace", description: "One request, through every service it touched",
    tags: ["spans", "waterfall", "timing"], family: "rails",
    aliases: ["span"], keywords: ["distributed tracing", "waterfall", "opentelemetry", "latency"],
    // A waterfall: bars that start later and are shorter than the one above. Flush left they
    // would be a paragraph; staggered, each one plainly begins inside the one before it.
    shapes: [rect(3, 5, 10, 3, 1.5), rect(7, 11, 11, 3, 1.5), rect(11, 17, 9, 3, 1.5)],
  },

  {
    slug: "audit", category: "security", subcategory: "compliance",
    name: "Audit", description: "Somebody checked, and wrote down what they found",
    tags: ["review", "inspect", "evidence"], family: "page",
    aliases: [], keywords: ["compliance", "evidence", "review", "soc2", "inspection"],
    // `search`'s lens over a page, overlapping its edge. Sitting wholly inside, the lens is
    // a picture printed on the page rather than something being held over it.
    shapes: [page(), arc(15, 16, 4, 292, 248), poly([[18, 19], [21, 22]])],
  },

  /* ── Guarding them ────────────────────────────────────────────────────────────── */

  {
    slug: "firewall", category: "security", subcategory: "policy",
    name: "Firewall", description: "What traffic is allowed through",
    tags: ["wall", "block", "network"], family: "grid",
    aliases: [], keywords: ["ingress", "egress", "block", "acl", "perimeter", "bricks"],
    // Courses of brick, offset. Aligned, the joints make a grid and the drawing is a table;
    // offset, they are a wall, which is the one thing a firewall has to look like.
    shapes: [
      rect(3, 6, 18, 12, 2), row(12, 3, 21), col(9, 6, 12), col(15, 12, 18),
    ],
  },

  {
    slug: "certificate", category: "security", subcategory: "compliance",
    name: "Certificate", description: "Signed proof that something is what it says",
    tags: ["seal", "signed", "proof"], family: "page",
    aliases: ["cert"], keywords: ["x509", "tls", "signature", "seal", "attestation"],
    // The seal hangs off the bottom edge and touches it. A seal floating clear of the paper
    // is a coin; the whole point of one is that it is fixed to the document.
    shapes: [rect(3, 3, 18, 12, 2), row(7, 6, 18), row(11, 6, 14), disc(12, 18.5, 3)],
  },

  /* ── Version control ──────────────────────────────────────────────────────────── */

  {
    slug: "git-commit", category: "devtools", subcategory: "version-control",
    name: "Commit", description: "One change, recorded",
    tags: ["change", "snapshot", "sha"], family: "chain",
    aliases: ["commit"], keywords: ["sha", "revision", "checkin", "history", "git"],
    // The commit ring sits on a branch line that runs the diagonal — the same glyph,
    // no longer a 20×7 stripe on the equator.
    shapes: [poly([[4, 20], [9, 15]]), disc(12, 12, 3.5), poly([[15, 9], [20, 4]])],
  },

  {
    slug: "git-merge", category: "devtools", subcategory: "version-control",
    name: "Merge", description: "Two lines of work becoming one",
    tags: ["join", "combine", "branch"], family: "chain",
    aliases: ["merge"], keywords: ["git merge", "combine", "integrate", "squash", "rebase"],
    // Both branches come down at the same angle and meet below. `dag` converges too, but its
    // nodes are stages of one thing; here the two arms start level, as equals.
    shapes: [
      disc(6, 5, 2), disc(18, 5, 2), disc(12, 19, 2),
      poly([[6, 7.5], [6, 12], [10.5, 16.5]]),
      poly([[18, 7.5], [18, 12], [13.5, 16.5]]),
    ],
  },

  {
    slug: "pull-request", category: "devtools", subcategory: "version-control",
    name: "Pull request", description: "Asking for your work to be taken",
    tags: ["review", "propose", "merge"], family: "chain",
    aliases: ["pr"], keywords: ["merge request", "review", "diff", "github", "propose"],
    // Two tracks, one of which points up: the request is the arrow, and it is asking rather
    // than arriving — nothing has joined yet.
    shapes: [
      disc(6, 5, 2), col(6, 7.5, 21),
      col(18, 5, 16.5), disc(18, 19, 2),
      poly([[15, 8], [18, 5], [21, 8]]),
    ],
  },

  /* ── Data at rest ─────────────────────────────────────────────────────────────── */

  {
    slug: "storage-bucket", category: "cloud", subcategory: "storage",
    name: "Storage bucket", description: "Somewhere to put files and forget about them",
    tags: ["object", "blob", "bucket"], family: "cylinder",
    aliases: ["bucket"], keywords: ["s3", "blob", "object storage", "gcs", "files"],
    // A cylinder: a rim at the top, sides down, and the front of the base curving back. The
    // back of the base is not drawn, because it is behind the thing.
    shapes: [
      raw(
        "M4 7A8 3 0 0 1 20 7V17A8 3 0 0 1 4 17Z",
        "a cylinder: an elliptical rim of 8 by 3, sides of 10, and the front of the base",
        true,
      ),
      raw("M4 7A8 3 0 0 0 20 7", "the far side of the top rim, which the near side hides"),
    ],
  },

  {
    slug: "cost", category: "cloud", subcategory: "cost",
    name: "Cost", description: "What it is costing you",
    tags: ["spend", "billing", "money"], family: "cylinder",
    aliases: [], keywords: ["spend", "invoice", "budget", "price", "coins", "billing"],
    // Three coins, and the drawing is the stack rather than any one of them. A single coin
    // with a mark on it has to pick a currency; a stack does not.
    // The silhouette closes over the whole stack, so the duotone tint fills the stack and
    // not just the top coin's face — the rims stay open detail.
    shapes: [
      area("M4 7A8 3 0 0 1 20 7V17A8 3 0 0 1 4 17Z", "the stack's outline: top ellipse, sides, bottom bulge"),
      raw("M4 7A8 3 0 0 0 20 7", "the near rim of the top coin"),
      raw("M4 12A8 3 0 0 0 20 12", "the rim between the coins"),
    ],
  },

  {
    slug: "table", category: "data", subcategory: "catalog",
    name: "Table", description: "Rows and columns, with names at the top",
    tags: ["columns", "rows", "grid"], family: "window",
    aliases: [], keywords: ["sql", "spreadsheet", "columns", "schema", "grid"],
    // The header rule runs the full width and the column rules hang from it. Drawn as a
    // full grid the drawing is a window pane; hanging them is what makes it a table.
    shapes: [
      frame(2, 4, 20, 16, 3, { gap: 4 }), row(9, 2, 22), col(9, 9, 20), col(15, 9, 20),
    ],
  },

  {
    slug: "sync", category: "data", subcategory: "pipeline",
    name: "Sync", description: "Both sides ending up the same",
    tags: ["two-way", "mirror", "replicate"], family: "arrow",
    aliases: ["replicate"], keywords: ["two-way", "mirror", "replication", "refresh", "bidirectional"],
    // The square loop with a chevron riding EACH long edge — flow out along the top,
    // flow back along the bottom, both on the path. The old drawing dropped a reversed
    // chevron loose inside `cycle()`'s hollow, where it floated against the loop's own
    // direction. `cycle()` itself cannot host this: its gap is a top-edge affair, and a
    // bottom chevron needs the bottom edge broken too, so the loop is written by hand.
    shapes: [
      raw("M14.5 4.5h3.5a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3h-3.5",
        "the right half of a two-gap loop; frame() can only open its top edge"),
      raw("M9.5 19.5H6a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h3.5",
        "the left half of a two-gap loop; frame() can only open its top edge"),
      poly([[12, 2], [14.5, 4.5], [12, 7]]), poly([[12, 17], [9.5, 19.5], [12, 22]]),
    ],
  },

  /* ── Measuring ────────────────────────────────────────────────────────────────── */

  {
    slug: "chart-pie", category: "analytics", subcategory: "chart",
    name: "Pie chart", description: "Parts of a whole",
    tags: ["share", "proportion", "slice"], family: "orbit",
    aliases: ["pie"], keywords: ["proportion", "share", "donut", "breakdown", "percentage"],
    // The two cuts stop at the circle rather than crossing it, so the slice is a region of
    // the disc rather than a cross drawn on top of one.
    shapes: [disc(12, 12, 9), col(12, 3, 12), row(12, 12, 21)],
  },

  {
    slug: "experiment", category: "analytics", subcategory: "experiment",
    name: "Experiment", description: "Try it and see",
    tags: ["flask", "test", "trial"], family: "figure",
    aliases: ["lab"], keywords: ["trial", "hypothesis", "beta", "lab", "science"],
    // Open at the neck, which is where a flask is open anyway. This is the one shape in the
    // set where the language's break and the object's own opening are the same thing.
    shapes: [
      poly([[9, 3], [9, 10], [4, 15], [4, 19], [20, 19], [20, 15], [15, 10], [15, 3]]),
    ],
  },

  {
    slug: "ab-test", category: "analytics", subcategory: "experiment",
    name: "A/B test", description: "Two versions, and which one wins",
    tags: ["split", "variant", "compare"], family: "chain",
    aliases: ["split-test"], keywords: ["variant", "experiment", "control", "cohort", "split"],
    // One thing splitting into two that end level. `git-merge` is this drawing upside down,
    // and the difference between them is the whole reason both exist.
    shapes: [
      col(12, 3, 10),
      poly([[12, 10], [6, 16]]), poly([[12, 10], [18, 16]]),
      disc(6, 19, 2), disc(18, 19, 2),
    ],
  },
];
