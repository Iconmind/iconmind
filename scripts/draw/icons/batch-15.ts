/**
 * Batch 15 — networks, permissions and a few objects the set was missing.
 *
 * `camera` can exist now, which is a small piece of history. `model` was a rounded box with
 * a circle in the middle for one batch, and it read as a camera at every size, so it became
 * a chamfered box with a diamond instead. The drawing it was mistaken for was then free for
 * the concept it actually belonged to.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_15: Icon[] = [
  /* ── Networks ─────────────────────────────────────────────────────────────────── */

  {
    slug: "load-balancer", category: "cloud", subcategory: "network",
    name: "Load balancer", description: "A load balancer — one address spreading traffic across many machines",
    tags: ["distribute", "spread", "traffic"], family: "chain",
    aliases: ["lb"], keywords: ["nginx", "round robin", "traffic", "distribute", "ingress"],
    // One line in, three out. Two out would read as a fork or a choice; three is plainly a
    // spread, because nobody balances between two and calls it balancing.
    shapes: [
      row(12, 2, 8), col(8, 6, 18),
      row(6, 8, 21), row(12, 8, 21), row(18, 8, 21),
    ],
  },
  {
    slug: "network", category: "cloud", subcategory: "network",
    name: "Network", description: "A network — machines connected so they can reach each other, nodes in a topology",
    tags: ["nodes", "topology", "mesh"], family: "chain",
    aliases: ["topology"], keywords: ["vpc", "subnet", "mesh", "peers", "topology"],
    // Three nodes, all connected to all. `dag` converges and `supervisor` hangs down; a
    // network is the arrangement where no node is the top one.
    shapes: [
      disc(12, 8, 2), disc(5, 15, 2), disc(19, 15, 2),
      poly([[10, 10], [7, 13]]), poly([[14, 10], [17, 13]]), row(15, 7.5, 16.5),
    ],
  },

  /* ── Who is allowed ───────────────────────────────────────────────────────────── */

  {
    slug: "permission", category: "security", subcategory: "auth",
    name: "Permission", description: "Permission — you are allowed to do this, access granted by a policy",
    tags: ["allowed", "granted", "access"], family: "lock",
    aliases: ["access"], keywords: ["grant", "scope", "acl", "allowed", "rbac"],
    // A lock with a tick where its keyhole would be. `auth` asks who you are; a permission
    // is the answer coming back yes.
    shapes: [rect(6, 10, 12, 10, 2), arc(12, 10, 4, 180, 360), poly([[9, 15], [11, 17], [15, 13]])],
  },
  {
    slug: "role", category: "security", subcategory: "auth",
    name: "Role", description: "A role — what this person or account is here to do, a badge that carries permissions",
    tags: ["group", "badge", "rbac"], family: "figure",
    aliases: [], keywords: ["rbac", "group", "title", "badge", "assignment"],
    // The figure with a card beside it. `user-add`'s badge is a mark and this one is an
    // object, because a role is a thing somebody holds rather than something done to them.
    shapes: [disc(9, 8, 3), arc(9, 21, 6, 180, 360), rect(15, 9, 7, 7, 2)],
  },

  /* ── Developer tools ──────────────────────────────────────────────────────────── */

  {
    slug: "diff", category: "devtools", subcategory: "version-control",
    name: "Diff", description: "A diff — what changed between two versions, shown as a patch to compare",
    tags: ["change", "compare", "patch"], family: "rails",
    aliases: ["compare"], keywords: ["patch", "changes", "added removed", "review", "delta"],
    // A plus on one side of the gutter and a minus on the other. The gutter is the whole
    // convention: without it the two marks are arithmetic.
    shapes: [col(12, 3, 21), col(7, 6, 12), row(9, 4, 10), row(15, 14, 20)],
  },
  {
    slug: "repository", category: "devtools", subcategory: "version-control",
    name: "Repository", description: "A repository — where the source code lives, together with its history",
    tags: ["repo", "book", "source"], family: "window",
    aliases: ["repo"], keywords: ["git", "github", "source", "project", "monorepo"],
    // A book with a marker in it. `knowledge-base` is the same book without the marker,
    // because a knowledge base is read and a repository is worked in.
    shapes: [
      frame(4, 3, 16, 18, 3, { gap: 3 }), col(8, 3, 21),
      poly([[12, 3], [12, 10], [14.5, 7.5], [17, 10], [17, 3]]),
    ],
  },
  {
    slug: "extension", category: "devtools", subcategory: "package",
    name: "Extension", description: "An extension — a plugin or add-on bolted on to something else to give it more",
    tags: ["plugin", "addon", "puzzle"], family: "window",
    aliases: ["plugin"], keywords: ["addon", "puzzle", "integration", "module", "hook"],
    // A square with a tab on one side. The tab is a half-circle sitting on the wall rather
    // than a shape beside it: an extension is part of the thing, not next to it.
    shapes: [rect(3, 4, 15, 16, 2), arc(18, 12, 3, 270, 90)],
  },
  {
    slug: "runbook", category: "devops", subcategory: "incident",
    name: "Runbook", description: "A runbook — the written procedure for what to do when a system breaks",
    tags: ["procedure", "steps", "playbook"], family: "page",
    aliases: ["playbook"], keywords: ["procedure", "on-call", "sop", "checklist", "recovery"],
    // A page with the mark for "go" on it. `plan` is a page with a line ticked, which is
    // work already under way; a runbook is a page you start from.
    shapes: [page(), disc(9, 9, 1), row(9, 11, 15), disc(9, 13, 1), row(13, 11, 15), poly([[10, 16], [12, 18], [10, 20]])],
  },

  /* ── Objects the set was missing ──────────────────────────────────────────────── */

  {
    slug: "camera", category: "interface", subcategory: "media",
    name: "Camera", description: "A camera — take a picture, capture an image through the lens",
    tags: ["photo", "capture", "lens"], family: "window",
    aliases: [], keywords: ["capture", "snapshot", "lens", "shoot", "selfie", "photo"],
    shapes: [frame(2, 7, 20, 13, 3, { gap: 4 }), disc(12, 13.5, 3.5)],
  },
  {
    slug: "headphones", category: "interface", subcategory: "media",
    name: "Headphones", description: "Headphones — listen to audio in private, sound for one person",
    tags: ["audio", "listen", "sound"], family: "figure",
    aliases: [], keywords: ["listen", "audio out", "podcast", "music", "monitor"],
    shapes: [arc(12, 12, 8, 180, 360), rect(3, 12, 4, 7, 2), rect(17, 12, 4, 7, 2)],
  },
  {
    slug: "columns", category: "interface", subcategory: "layout",
    name: "Columns", description: "Columns — content laid out side by side in split panes across the page",
    tags: ["split", "panes", "layout"], family: "window",
    aliases: [], keywords: ["split view", "panes", "two-up", "side by side", "layout"],
    // The dividers start where the silhouette's own break ends, so the gap at the top and
    // the columns under it are one idea rather than two marks that happen to line up.
    shapes: [frame(2, 4, 20, 16, 3, { gap: 6 }), col(9, 4, 20), col(15, 4, 20)],
  },
];
