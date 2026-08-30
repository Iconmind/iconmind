/**
 * Batch 31 — things attached to other things, and quantities with a ceiling.
 *
 * First batch drawn under `geometry/optical-centre`, so the pre-check now answers the two
 * questions that used to need a build: does it fill the set's box, and does it sit where the
 * set sits.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { SMALL, check } from "../marks.ts";
import { machinePage, page, ring } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_31: Icon[] = [
  /* ── What an agent is made of ─────────────────────────────────────────────────── */

  {
    slug: "agent-core", category: "agents", subcategory: "agent-core",
    name: "Agent core", description: "The agent core — the model at the centre of an agent, its engine",
    tags: ["kernel", "engine", "inner"], family: "orbit",
    aliases: [], keywords: ["kernel", "engine", "brain", "inner loop", "runtime"],
    shapes: [ring(), rect(8, 8, 8, 8, 2)],
  },
  {
    slug: "arbiter", category: "agents", subcategory: "multi-agent",
    name: "Arbiter", description: "An arbiter — the judge that decides the outcome when agents disagree",
    tags: ["judge", "decide", "resolve"], family: "figure",
    aliases: ["judge"], keywords: ["judge", "referee", "tie break", "resolve", "decide"],
    shapes: [disc(6, 7, 3), disc(6, 17, 3), poly([[10, 7], [15, 12], [10, 17]]), disc(19, 12, 2)],
  },
  {
    slug: "approval-step", category: "automation", subcategory: "human-loop",
    name: "Approval step", description: "An approval step — a step in a flow that waits for a person to sign off",
    tags: ["gate", "sign-off", "wait"], family: "step",
    aliases: [], keywords: ["sign off", "human gate", "manual approval", "wait for review"],
    shapes: [rect(3, 7, 18, 10, 2), ...check(SMALL, 12)],
  },
  {
    slug: "assertion", category: "devtools", subcategory: "testing",
    name: "Assertion", description: "An assertion — the claim a test makes and expects to hold on every run",
    tags: ["expect", "holds", "claim"], family: "figure",
    aliases: ["expect"], keywords: ["expect", "assert", "should", "invariant", "claim"],
    // A check on its own is `check`. The line under it is what makes this a claim about
    // something rather than a tick against it.
    shapes: [poly([[7, 10], [10, 13], [17, 6]]), row(18, 4, 20)],
  },

  /* ── Things carried by other things ───────────────────────────────────────────── */

  {
    slug: "attachment-image", category: "interface", subcategory: "file",
    name: "Image attachment", description: "An image attachment — a picture sent along with the message as a file",
    tags: ["photo", "upload", "file"], family: "page",
    aliases: [], keywords: ["photo", "picture", "png", "upload image", "vision input"],
    shapes: [page(), disc(9, 10, 1), poly([[7, 16], [11, 12], [17, 18]])],
  },
  {
    slug: "attachment-video", category: "interface", subcategory: "file",
    name: "Video attachment", description: "A video attachment — a clip sent along with the message as a file",
    tags: ["clip", "upload", "file"], family: "page",
    aliases: [], keywords: ["clip", "mp4", "upload video", "movie", "footage"],
    shapes: [page(), poly([[10, 8], [15, 13], [10, 18]], true)],
  },
  {
    slug: "attribution", category: "rag", subcategory: "grounding",
    name: "Attribution", description: "Attribution — which source a sentence came from, credit given to the origin",
    tags: ["credit", "quote", "source"], family: "figure",
    aliases: ["credit"], keywords: ["quote", "cite", "provenance", "source", "credit"],
    // Two chevrons over a line are a rewind button, whatever they were meant to be. A line
    // of text with the source marked beside it is not mistakable for a transport control.
    shapes: [row(6, 3, 21), row(10, 3, 15), disc(17, 16, 3)],
  },
  {
    slug: "citation-link", category: "rag", subcategory: "grounding",
    name: "Citation link", description: "A citation link — a claim joined to the source it rests on, so it can be checked",
    tags: ["trace", "source", "joined"], family: "figure",
    aliases: [], keywords: ["footnote", "reference", "backlink", "provenance", "trace"],
    shapes: [rect(2, 12, 9, 8, 2), rect(13, 4, 9, 8, 2), poly([[11, 14], [13, 12]])],
  },
  {
    slug: "container-file", category: "devops", subcategory: "container",
    name: "Container file", description: "A container file — the Dockerfile recipe that says how to build the image",
    tags: ["dockerfile", "recipe", "build"], family: "page",
    aliases: ["dockerfile"], keywords: ["dockerfile", "containerfile", "image recipe", "build"],
    shapes: [machinePage(), disc(10, 11, 1), row(11, 13, 16), disc(10, 15, 1), row(15, 13, 16)],
  },

  /* ── Quantities with a ceiling ────────────────────────────────────────────────── */

  {
    slug: "budget", category: "analytics", subcategory: "metric",
    name: "Budget", description: "A budget — what is spent against what is allowed, the cap on cost",
    tags: ["limit", "spend", "cap"], family: "meter",
    aliases: [], keywords: ["spend limit", "cap", "allowance", "quota", "burn"],
    shapes: [rect(2, 7, 20, 10, 2), row(12, 5, 13), col(13, 9, 15)],
  },
  {
    slug: "autoscale", category: "cloud", subcategory: "compute",
    name: "Autoscale", description: "Autoscale — more instances when there is more to do, fewer when there is less",
    tags: ["scale", "elastic", "grow"], family: "machine",
    aliases: [], keywords: ["elastic", "scale out", "replicas", "hpa", "grow"],
    shapes: [
      rect(3, 3, 11, 7, 2), rect(3, 13, 11, 7, 2),
      col(19, 7, 17), poly([[16, 10], [19, 7], [22, 10]]),
    ],
  },
  {
    slug: "config-drift", category: "devops", subcategory: "infrastructure",
    name: "Config drift", description: "Config drift — two environments that no longer match because settings diverged",
    tags: ["diverge", "mismatch", "stale"], family: "meter",
    aliases: [], keywords: ["diverged", "out of sync", "mismatch", "untracked change"],
    // The same two controls at different settings. `parameters` is the same instrument with
    // its dots in line; the whole meaning here is that they are not.
    shapes: [row(8, 3, 21), disc(8, 8, 2), row(16, 3, 21), disc(16, 16, 2)],
  },
  {
    slug: "chart-sankey", category: "analytics", subcategory: "chart",
    name: "Sankey chart", description: "A Sankey chart — where the flow went, split and merged as widths",
    tags: ["flow", "diagram", "split"], family: "chart",
    aliases: [], keywords: ["flow diagram", "alluvial", "where it went", "split", "volume"],
    shapes: [
      poly([[4, 6], [10, 6], [14, 10], [20, 10]]),
      poly([[4, 18], [10, 18], [14, 14], [20, 14]]),
    ],
  },

  /* ── Cutting text up, and putting it back ─────────────────────────────────────── */

  {
    slug: "chunk-add", category: "rag", subcategory: "chunking",
    name: "Add chunk", description: "Add chunk — one more piece of a document inserted into the index",
    tags: ["insert", "new", "piece"], family: "figure",
    aliases: [], keywords: ["insert chunk", "upsert", "new passage", "index one"],
    shapes: [
      rect(2, 4, 11, 16, 2), row(9, 4, 11), row(14, 4, 11),
      col(18, 8, 16), row(12, 14, 22),
    ],
  },
  {
    slug: "chunk-strategy", category: "rag", subcategory: "chunking",
    name: "Chunk strategy", description: "A chunk strategy — where to cut a document, how big and which way",
    tags: ["split", "policy", "size"], family: "figure",
    aliases: [], keywords: ["splitting", "recursive", "sentence split", "overlap", "policy"],
    shapes: [rect(2, 6, 20, 12, 2), col(9, 6, 18), poly([[13, 9], [16, 12], [13, 15]])],
  },
  {
    slug: "cache-build", category: "devops", subcategory: "infrastructure",
    name: "Cache build", description: "Cache build — warm the cache and fill it before anyone asks for anything",
    tags: ["warm", "prefill", "prime"], family: "tray",
    aliases: ["cache-warm"], keywords: ["warm cache", "prime", "prefill", "precompute"],
    shapes: [
      rect(3, 13, 18, 8, 2), col(7, 4, 10), col(12, 2, 5.5), poly([[10, 6.5], [12, 8.5], [14, 6.5]]), col(17, 4, 10),
    ],
  },

  /* ── Reading and comparing ────────────────────────────────────────────────────── */

  {
    slug: "code-block", category: "devtools", subcategory: "editor",
    name: "Code block", description: "A code block — code set apart from the prose as a fenced snippet",
    tags: ["snippet", "fenced", "sample"], family: "window",
    aliases: ["snippet"], keywords: ["snippet", "fenced", "pre", "sample", "listing"],
    shapes: [rect(2, 5, 20, 14, 2), poly([[9, 9], [6, 12], [9, 15]]), poly([[15, 9], [18, 12], [15, 15]])],
  },
  {
    slug: "comparison", category: "analytics", subcategory: "chart",
    name: "Comparison", description: "A comparison — this one against that one, side by side to see the difference",
    tags: ["versus", "against", "two"], family: "chart",
    aliases: ["versus"], keywords: ["vs", "a/b", "side by side", "against", "benchmark"],
    shapes: [rect(2, 4, 8, 16, 2), rect(14, 8, 8, 12, 2)],
  },
  {
    slug: "compliance-report", category: "security", subcategory: "compliance",
    name: "Compliance report", description: "A compliance report — the document that attests you passed the audit",
    tags: ["audit", "attest", "passed"], family: "page",
    aliases: [], keywords: ["soc2", "audit report", "attestation", "evidence", "passed"],
    shapes: [
      rect(2, 2, 11, 20, 2), row(6, 5, 10), row(10, 5, 10), row(14, 5, 8),
      poly([[16, 9], [22, 9], [22, 13], [19, 16], [16, 13]], true),
    ],
  },
  {
    slug: "consent", category: "security", subcategory: "compliance",
    name: "Consent", description: "Consent — somebody agreed on the record, an opt-in signed and kept",
    tags: ["agree", "opt-in", "signed"], family: "page",
    aliases: ["opt-in"], keywords: ["opt in", "agreed", "gdpr", "signature", "permission given"],
    shapes: [page(), ...check(SMALL, 11), row(17, 8, 16)],
  },
  {
    slug: "consumer", category: "data", subcategory: "streaming",
    name: "Consumer", description: "A consumer — the subscriber that takes messages off the queue",
    tags: ["subscriber", "reader", "sink"], family: "figure",
    aliases: ["subscriber"], keywords: ["subscriber", "worker", "sink", "poll", "reads from"],
    shapes: [arc(8, 12, 6, 45, 315), disc(19, 12, 2)],
  },
  {
    slug: "catalog", category: "interface", subcategory: "layout",
    name: "Catalogue", description: "A catalogue — everything there is to pick from, an index to browse",
    tags: ["browse", "index", "listing"], family: "window",
    aliases: [], keywords: ["browse", "gallery", "directory", "listing", "index"],
    shapes: [rect(3, 2, 16, 4, 2), rect(2, 9, 6.5, 13, 2), rect(11.5, 9, 6.5, 13, 2)],
  },

  /* ── Two systems, joined ──────────────────────────────────────────────────────── */

  {
    slug: "api-bridge", category: "devtools", subcategory: "api",
    name: "API bridge", description: "An API bridge — an adapter that lets one system reach into another",
    tags: ["adapter", "span", "between"], family: "figure",
    aliases: [], keywords: ["adapter", "shim", "proxy", "translate", "between systems"],
    shapes: [col(4, 6, 18), col(20, 6, 18), row(12, 4, 20), poly([[10, 10], [12, 12], [10, 14]])],
  },
  {
    slug: "audio-gen", category: "ai", subcategory: "multimodal",
    name: "Audio generation", description: "Audio generation — sound a model made, speech or music synthesised from scratch",
    tags: ["tts", "synth", "new"], family: "figure",
    aliases: [], keywords: ["tts", "speech synthesis", "music gen", "voice", "sound"],
    shapes: [
      col(4, 9, 15), col(8, 5, 19), col(12, 9, 15), col(18, 8, 14), row(11, 15, 21),
    ],
  },
];
