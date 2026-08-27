/**
 * Batch 26 — states of a build, and things that hold other things.
 *
 * `build-pass` and `build-fail` are `build`'s three blocks with a tick or a cross beside
 * them. `container-run` and `container-stop` are `container`'s corrugated box with a play
 * or a square. Neither pair needed a new body, which is now the normal way a batch goes.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { cloud, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

/** The corrugated box `container` is drawn as, so its family cannot drift from it. */
const box = () => [rect(3, 7, 18, 12, 2), col(8, 7, 19), col(12, 7, 19), col(16, 7, 19)];

export const BATCH_26: Icon[] = [
  /* ── A build, and how it went ─────────────────────────────────────────────────── */

  {
    slug: "compile", category: "devops", subcategory: "ci-cd",
    name: "Compile", description: "Source turned into something that runs",
    tags: ["build", "transform", "binary"], family: "funnel",
    aliases: [], keywords: ["transpile", "bundle", "binary", "translate", "assemble"],
    shapes: [
      poly([[10, 4], [4, 10], [10, 16]]), row(13, 12, 21),
      poly([[18, 10], [21, 13], [18, 16]]),
    ],
  },
  {
    slug: "artifact", category: "devops", subcategory: "release",
    name: "Artifact", description: "What the build produced",
    tags: ["output", "binary", "bundle"], family: "window",
    aliases: [], keywords: ["build output", "bundle", "jar", "wheel", "tarball"],
    shapes: [frame(4, 6, 16, 14, 3, { gap: 4 }), row(11, 4, 20), col(12, 6, 11), disc(12, 15, 2)],
  },
  {
    slug: "changelog", category: "devops", subcategory: "release",
    name: "Changelog", description: "What changed, version by version",
    tags: ["history", "releases", "notes"], family: "page",
    aliases: ["release-notes"], keywords: ["release notes", "history", "versions", "what's new"],
    shapes: [page(), disc(9, 9, 1), row(9, 12, 16), disc(9, 14, 1), row(14, 12, 16), disc(9, 19, 1)],
  },

  /* ── Containers, running and stopped ──────────────────────────────────────────── */

  {
    slug: "container-run", category: "devops", subcategory: "container",
    name: "Container running", description: "It is up",
    tags: ["running", "live", "up"], family: "grid",
    aliases: [], keywords: ["running", "healthy", "up", "started", "live"],
    shapes: [rect(3, 6, 18, 14, 2), col(6, 6, 20), poly([[11, 9], [15, 13], [11, 17]])],
  },
  {
    slug: "container-stop", category: "devops", subcategory: "container",
    name: "Container stopped", description: "It is not",
    tags: ["stopped", "halted", "down"], family: "grid",
    aliases: [], keywords: ["stopped", "exited", "down", "halted", "terminated"],
    shapes: [rect(3, 6, 18, 14, 2), col(6, 6, 20), rect(10.5, 9.5, 7, 7, 2)],
  },
  {
    slug: "container-image", category: "devops", subcategory: "container",
    name: "Container image", description: "The thing a container is started from",
    tags: ["template", "layers", "immutable"], family: "grid",
    aliases: [], keywords: ["docker image", "layers", "tag", "registry", "immutable"],
    // Layers, stacked. A container is one box; an image is what it was stamped from, and a
    // stamp is legible as a stack of the same thing.
    shapes: [rect(3, 2, 18, 5, 2.5), rect(5, 10, 14, 5, 2.5), rect(7, 18, 10, 4, 2)],
  },
  {
    slug: "downtime", category: "devops", subcategory: "incident",
    name: "Downtime", description: "It is not answering",
    tags: ["outage", "offline", "dead"], family: "rails",
    aliases: [], keywords: ["offline", "unavailable", "dead", "sev1", "unreachable", "outage"],
    // `health-check`'s square wave, stopped. The flat line after the last pulse is the whole
    // reading — a signal that was there and is not.
    shapes: [poly([[3, 12], [7, 12], [7, 6], [11, 6], [11, 18], [15, 18], [15, 12], [21, 12]])],
  },

  /* ── Cloud ────────────────────────────────────────────────────────────────────── */

  {
    slug: "function-cloud", category: "cloud", subcategory: "serverless",
    name: "Cloud function", description: "One piece of code, run on demand",
    tags: ["lambda", "handler", "small"], family: "cloud",
    aliases: [], keywords: ["lambda", "handler", "faas", "trigger", "invoke", "function"],
    shapes: [cloud(), poly([[10, 9], [14, 13], [10, 17]])],
  },
  {
    slug: "block-storage", category: "cloud", subcategory: "storage",
    name: "Block storage", description: "A disk, attached to one machine",
    tags: ["disk", "volume", "attached"], family: "cylinder",
    aliases: [], keywords: ["ebs", "disk", "volume", "attached", "persistent"],
    shapes: [
      raw("M4 6A8 3 0 0 1 20 6V18A8 3 0 0 1 4 18Z",
        "a cylinder: an elliptical rim of 8 by 3, sides of 12, and the front of the base", true),
      raw("M4 6A8 3 0 0 0 20 6", "the far side of the top rim, which the near side hides"),
      row(12, 8, 16),
    ],
  },
  {
    slug: "availability-zone", category: "cloud", subcategory: "region",
    name: "Availability zone", description: "One failure domain inside a region",
    tags: ["zone", "isolated", "az"], family: "orbit",
    aliases: ["az"], keywords: ["az", "failure domain", "datacentre", "isolation", "replica"],
    // `region`'s sphere with one band picked out by a node. A region is the whole; a zone is
    // one part of it that can fail on its own.
    shapes: [rect(2, 4, 20, 16, 2), col(12, 4, 20), disc(7, 12, 2)],
  },
  {
    slug: "hybrid-cloud", category: "cloud", subcategory: "compute",
    name: "Hybrid cloud", description: "Some of it yours, some of it theirs",
    tags: ["mixed", "on-prem", "both"], family: "cloud",
    aliases: [], keywords: ["on-premise", "mixed", "burst", "private and public"],
    shapes: [cloud(4), rect(6, 17, 12, 5, 2.5)],
  },

  /* ── Security ─────────────────────────────────────────────────────────────────── */

  {
    slug: "api-key", category: "security", subcategory: "secret",
    name: "API key", description: "The string that proves it is you",
    tags: ["token", "credential", "string"], family: "key",
    aliases: [], keywords: ["token", "bearer", "secret key", "auth header", "credential"],
    // `secret`'s key with a tag on it. A key on its own is any credential; with a label it
    // is the one an interface hands out and expects back.
    shapes: [
      disc(7, 7, 3), poly([[9, 9], [16, 16]]),
      poly([[13, 13], [15, 11]]), rect(15, 15, 7, 7, 2),
    ],
  },
  {
    slug: "audit-log", category: "security", subcategory: "compliance",
    name: "Audit log", description: "Who did what, kept",
    tags: ["trail", "record", "evidence"], family: "page",
    aliases: [], keywords: ["audit trail", "who did what", "immutable log", "evidence"],
    shapes: [page(), col(9, 6, 18), row(9, 11, 16), row(13, 11, 16), disc(16, 19, 2)],
  },
  {
    slug: "ddos", category: "security", subcategory: "threat",
    name: "DDoS", description: "More traffic than it can take",
    tags: ["flood", "overwhelm", "attack"], family: "arrow",
    aliases: [], keywords: ["flood", "volumetric", "amplification", "overwhelm", "botnet"],
    shapes: [
      row(5, 2, 14), row(9, 2, 14), row(15, 2, 14), row(19, 2, 14),
      col(18, 3, 21),
    ],
  },
  {
    slug: "encrypt", category: "security", subcategory: "encryption",
    name: "Encrypt", description: "Lock it up",
    tags: ["cipher", "lock", "protect"], family: "arrow",
    aliases: [], keywords: ["cipher", "aes", "seal", "protect", "at rest"],
    shapes: [
      row(12, 2, 8), poly([[6, 9], [9, 12], [6, 15]]),
      rect(12, 10, 10, 9, 2), arc(17, 10, 3, 180, 360),
    ],
  },
  {
    slug: "decrypt", category: "security", subcategory: "encryption",
    name: "Decrypt", description: "Open it back up",
    tags: ["reveal", "unlock", "plain"], family: "arrow",
    aliases: [], keywords: ["plaintext", "unseal", "reveal", "open", "decipher"],
    shapes: [
      rect(2, 10, 10, 9, 2), arc(7, 10, 3, 180, 315),
      row(12, 16, 22), poly([[19, 9], [22, 12], [19, 15]]),
    ],
  },

  /* ── Automation ───────────────────────────────────────────────────────────────── */

  {
    slug: "approval", category: "automation", subcategory: "human-loop",
    name: "Approval", description: "Somebody said yes",
    tags: ["sign-off", "consent", "yes"], family: "page",
    aliases: ["sign-off"], keywords: ["consent", "authorise", "yes", "signed", "green light"],
    // A page with a signature on it, not a page with a tick — `plan` is already a page with
    // a line ticked, and an approval is somebody putting their name to it rather than one
    // item being done.
    shapes: [page(), row(9, 9, 15), row(13, 9, 13), poly([[8, 19], [11, 16], [14, 19], [17, 16]])],
  },
  {
    slug: "cron", category: "automation", subcategory: "schedule",
    name: "Cron", description: "At the same time, every time",
    tags: ["schedule", "recurring", "clock"], family: "orbit",
    aliases: ["recurring"], keywords: ["crontab", "scheduled job", "every hour", "recurring"],
    // `history`'s turning arrow with a dial in it, but the arrow points forward. History
    // goes back to when; cron comes round to when, which is the same circle read the other
    // way.
    shapes: [
      raw("M3 12A9 9 0 1 0 12 3", "three quarters of a circle, opening at the top", false),
      poly([[9, 6], [12, 3], [12, 6]]),
      col(12, 9, 12), row(12, 12, 16),
    ],
  },
  {
    slug: "action-email", category: "automation", subcategory: "action",
    name: "Email action", description: "The step that sends a message",
    tags: ["send", "notify", "mail"], family: "window",
    aliases: [], keywords: ["send email", "notify", "smtp", "template", "outbound"],
    shapes: [rect(2, 6, 20, 12, 2), poly([[5, 7], [12, 14], [19, 7]]), col(12, 2, 5)],
  },
  {
    slug: "action-http", category: "automation", subcategory: "action",
    name: "HTTP action", description: "The step that calls something",
    tags: ["request", "call", "webhook"], family: "orbit",
    aliases: ["webhook"], keywords: ["request", "post", "call out", "webhook", "rest"],
    shapes: [rect(2, 6, 11, 12, 2), row(9, 2, 13), row(12, 16, 20), poly([[17, 9], [20, 12], [17, 15]])],
  },
];
