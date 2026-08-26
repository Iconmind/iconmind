/**
 * Batch 36 — things that grow, things that are walled off, and a shield being attacked.
 *
 * `scale-up` and `scale-down` are the same box with the arrow reversed, and `provision` is
 * that box with a plus in it. Three drawings, one body, so the three cannot drift.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { cycle, machine, page, shield } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_36: Icon[] = [
  /* ── The same box, three things happening to it ───────────────────────────────── */

  {
    slug: "scale-up", category: "cloud", subcategory: "compute",
    name: "Scale up", description: "Give it more",
    tags: ["grow", "bigger", "more"], family: "window",
    aliases: [], keywords: ["scale out", "add capacity", "bigger instance", "grow", "more replicas"],
    shapes: [rect(2, 4, 20, 16, 2), poly([[7, 17], [17, 7]]), poly([[13, 7], [17, 7], [17, 11]])],
  },
  {
    slug: "scale-down", category: "cloud", subcategory: "compute",
    name: "Scale down", description: "Give it less",
    tags: ["shrink", "smaller", "less"], family: "window",
    aliases: [], keywords: ["scale in", "reduce capacity", "smaller instance", "shrink", "fewer"],
    shapes: [rect(2, 4, 20, 16, 2), poly([[17, 7], [7, 17]]), poly([[7, 13], [7, 17], [11, 17]])],
  },
  {
    slug: "provision", category: "cloud", subcategory: "compute",
    name: "Provision", description: "Make the thing exist",
    tags: ["create", "spin-up", "allocate"], family: "window",
    aliases: [], keywords: ["spin up", "terraform", "allocate", "create resource", "bootstrap"],
    shapes: [rect(2, 4, 20, 16, 2), col(12, 8, 16), row(12, 8, 16)],
  },

  /* ── Walled off ───────────────────────────────────────────────────────────────── */

  {
    slug: "sandbox", category: "security", subcategory: "policy",
    name: "Sandbox", description: "Somewhere it cannot reach out of",
    tags: ["isolated", "contained", "safe"], family: "window",
    aliases: [], keywords: ["isolation", "jail", "contained", "untrusted code", "vm boundary"],
    shapes: [rect(2, 2, 20, 20, 2), rect(7, 7, 10, 10, 2)],
  },
  {
    slug: "quarantine", category: "security", subcategory: "threat",
    name: "Quarantine", description: "Held where it can do no harm",
    tags: ["isolate", "held", "flagged"], family: "window",
    aliases: [], keywords: ["isolated", "held", "malware quarantine", "flagged", "detained"],
    shapes: [
      // A cross inside an r=3 disc fills the disc. The box is the thing doing the holding
      // anyway, so the disc was never carrying the meaning.
      rect(2, 2, 20, 20, 2), poly([[9, 9], [15, 15]]), poly([[15, 9], [9, 15]]),
    ],
  },
  {
    slug: "purge", category: "data", subcategory: "storage",
    name: "Purge", description: "All of it, gone",
    tags: ["wipe", "delete-all", "empty"], family: "figure",
    aliases: [], keywords: ["wipe", "delete everything", "truncate", "empty the store", "erase"],
    shapes: [
      rect(5, 7, 14, 14, 2), row(4, 3, 21),
      poly([[9, 11], [15, 17]]), poly([[15, 11], [9, 17]]),
    ],
  },

  /* ── Prompts, kept and chained ────────────────────────────────────────────────── */

  {
    slug: "prompt-chain", category: "ai", subcategory: "prompt",
    name: "Prompt chain", description: "One prompt feeding the next",
    tags: ["sequence", "steps", "linked"], family: "figure",
    aliases: [], keywords: ["chained prompts", "multi-step", "sequential", "pipeline of prompts"],
    shapes: [rect(2, 3, 10, 8, 2), rect(12, 13, 10, 8, 2), poly([[10, 11], [14, 15]])],
  },
  {
    slug: "prompt-library", category: "ai", subcategory: "prompt",
    name: "Prompt library", description: "The ones worth keeping",
    tags: ["saved", "shelf", "collection"], family: "window",
    aliases: [], keywords: ["saved prompts", "templates", "collection", "reusable", "shelf"],
    shapes: [rect(2, 4, 20, 16, 2), col(8, 4, 17), col(13, 4, 17), col(18, 4, 17), row(17, 2, 22)],
  },
  {
    slug: "scratchpad", category: "agents", subcategory: "reflection",
    name: "Scratchpad", description: "Working-out the answer does not include",
    tags: ["working", "rough", "notes"], family: "window",
    aliases: [], keywords: ["working out", "chain of thought", "rough notes", "hidden reasoning"],
    // A zigzag in a box is a chart. Working that gets struck through is not.
    shapes: [rect(2, 4, 20, 16, 2), row(9, 6, 14), row(13, 9, 17), row(17, 6, 12)],
  },

  /* ── Machines that think, and machines that decline ───────────────────────────── */

  {
    slug: "reasoning-model", category: "ai", subcategory: "model",
    name: "Reasoning model", description: "One that works through it in steps",
    tags: ["thinking", "steps", "deliberate"], family: "machine",
    aliases: [], keywords: ["chain of thought", "o1", "thinking model", "deliberate", "steps"],
    shapes: [machine(), poly([[8, 15], [11, 15], [11, 12], [14, 12], [14, 9], [17, 9]])],
  },
  {
    slug: "refusal", category: "ai", subcategory: "safety",
    name: "Refusal", description: "It will not do that",
    tags: ["declined", "no", "blocked"], family: "machine",
    aliases: [], keywords: ["declined", "will not answer", "policy refusal", "blocked", "no"],
    shapes: [machine(), row(12, 8, 16)],
  },
  {
    slug: "router-agent", category: "agents", subcategory: "multi-agent",
    name: "Router agent", description: "The one that decides who gets it",
    tags: ["dispatch", "choose", "route"], family: "figure",
    aliases: [], keywords: ["dispatcher", "route to agent", "triage", "choose handler", "delegate"],
    shapes: [disc(6, 12, 3), row(12, 9, 14), poly([[14, 12], [19, 7]]), poly([[14, 12], [19, 17]])],
  },

  /* ── Attacking your own thing ─────────────────────────────────────────────────── */

  {
    slug: "red-team", category: "security", subcategory: "ai-security",
    name: "Red team", description: "Attacking it before somebody else does",
    tags: ["attack", "probe", "adversarial"], family: "shield",
    aliases: [], keywords: ["adversarial testing", "pen test", "probe", "jailbreak attempt"],
    shapes: [shield(), poly([[4, 20], [16, 8]]), poly([[12, 8], [16, 8], [16, 12]])],
  },
  {
    slug: "rbac", category: "security", subcategory: "auth",
    name: "Role-based access", description: "What this kind of person may do",
    tags: ["roles", "grants", "who"], family: "figure",
    aliases: [], keywords: ["roles", "permissions", "grants", "least privilege", "iam"],
    shapes: [shield(), disc(12, 8, 2), arc(12, 14, 3, 180, 360)],
  },

  /* ── Version control, and checking it still works ─────────────────────────────── */

  {
    slug: "rebase", category: "devtools", subcategory: "version-control",
    name: "Rebase", description: "The branch, replayed somewhere else",
    tags: ["replay", "move", "history"], family: "figure",
    aliases: [], keywords: ["git rebase", "replay commits", "linear history", "move branch"],
    shapes: [col(5, 4, 20), poly([[5, 14], [11, 8], [19, 8]]), poly([[16, 5], [19, 8], [16, 11]])],
  },
  {
    slug: "refactor", category: "devtools", subcategory: "code",
    name: "Refactor", description: "Same behaviour, different shape",
    tags: ["reshape", "tidy", "restructure"], family: "figure",
    aliases: [], keywords: ["restructure", "tidy up", "extract method", "no behaviour change"],
    shapes: [rect(6, 6, 12, 12, 2), poly([[3, 9], [3, 3], [9, 3]]), poly([[21, 15], [21, 21], [15, 21]])],
  },
  {
    slug: "regression-test", category: "devtools", subcategory: "testing",
    name: "Regression test", description: "Proof the old thing still works",
    tags: ["still-passes", "guard", "suite"], family: "page",
    aliases: [], keywords: ["did not break", "suite", "guard", "snapshot test", "still passes"],
    shapes: [page(), poly([[8, 10], [10, 12], [15, 7]]), poly([[8, 17], [10, 19], [15, 14]])],
  },
  {
    slug: "replay", category: "devtools", subcategory: "debug",
    name: "Replay", description: "Run it again from what was recorded",
    tags: ["rerun", "record", "again"], family: "orbit",
    aliases: [], keywords: ["rerun", "time travel", "from the log", "reproduce", "playback"],
    shapes: [...cycle(), poly([[10, 9], [13, 12], [10, 15]], true)],
  },

  /* ── Shapes, shelves and shipped things ───────────────────────────────────────── */

  {
    slug: "schema", category: "data", subcategory: "quality",
    name: "Schema", description: "The shape the data has to have",
    tags: ["structure", "tables", "types"], family: "figure",
    aliases: [], keywords: ["table shape", "columns", "types", "ddl", "structure"],
    shapes: [rect(2, 3, 20, 7, 2), poly([[12, 10], [12, 13]]), rect(2, 13, 20, 7, 2)],
  },
  {
    slug: "rack", category: "cloud", subcategory: "compute",
    name: "Rack", description: "Machines stacked in a cabinet",
    tags: ["cabinet", "datacentre", "shelf"], family: "window",
    aliases: [], keywords: ["server rack", "datacentre", "1u", "cabinet", "on premise"],
    shapes: [
      rect(2, 2, 20, 20, 2), row(9, 2, 22), row(16, 2, 22),
      disc(7, 5.5, 1), disc(7, 12.5, 1), disc(7, 19, 1),
    ],
  },
  {
    slug: "sdk", category: "devtools", subcategory: "package",
    name: "SDK", description: "The tools that come in the box",
    tags: ["kit", "library", "bundle"], family: "window",
    aliases: [], keywords: ["client library", "toolkit", "bindings", "package", "developer kit"],
    shapes: [rect(2, 5, 20, 14, 2), col(8, 9, 15), col(12, 9, 15), col(16, 9, 15)],
  },
  {
    slug: "quota", category: "cloud", subcategory: "cost",
    name: "Quota", description: "The most you are allowed",
    tags: ["limit", "ceiling", "cap"], family: "meter",
    aliases: [], keywords: ["hard limit", "cap", "allowance", "service limit", "ceiling"],
    shapes: [rect(2, 9, 16, 6, 3), col(21, 5, 19)],
  },
  {
    slug: "rollout", category: "devops", subcategory: "release",
    name: "Rollout", description: "To a few, then to more, then to all",
    tags: ["gradual", "staged", "ramp"], family: "chart",
    aliases: [], keywords: ["staged rollout", "ramp", "percentage", "progressive delivery"],
    shapes: [row(7, 3, 9), row(12, 3, 15), row(17, 3, 21)],
  },
  {
    slug: "scorecard", category: "analytics", subcategory: "dashboard",
    name: "Scorecard", description: "How each thing did, on one card",
    tags: ["results", "graded", "summary"], family: "window",
    aliases: [], keywords: ["results", "graded", "summary", "report card", "checks"],
    shapes: [
      rect(2, 4, 20, 16, 2), row(9, 5, 13), poly([[15, 9], [17, 11], [20, 8]]),
      row(15, 5, 13), poly([[15, 15], [17, 17], [20, 14]]),
    ],
  },
];
