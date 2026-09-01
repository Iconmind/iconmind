/**
 * Batch 53 — round 2 of the 1k plan: the operations of running agents.
 *
 * Family discipline: the agent is a ring, and a small agent is the open arc the
 * set already uses (`agent-delegate`, `agent-swarm`, `agent-hierarchy`). Planned
 * `agent-skill`/`agent-skill-add` were swapped for `agent-clone`/`agent-priority`:
 * `capability-card` already draws "a skill an agent has", and the same picture
 * twice is an alias, not a second icon.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { ring } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_53: Icon[] = [
  /* ── Where agents come from, and how many there are ────────────────────────────── */

  {
    slug: "agent-spawn", category: "agents", subcategory: "multi-agent",
    name: "Agent spawn", description: "Agent spawn — one agent starts another at runtime, a child of the first",
    tags: ["create", "child", "runtime"], family: "orbit",
    aliases: [], keywords: ["spawn", "start agent", "child process", "fork agent"],
    // Parent above, child below, joined by a stem that enters the child through
    // its opening — `agent-hierarchy`'s connection with no rail: one begat one.
    shapes: [
      arc(12, 7, 4.5, 295, 245), col(12, 11.5, 14.5),
      arc(12, 18, 3.5, 295, 245),
    ],
  },
  {
    slug: "agent-clone", category: "agents", subcategory: "multi-agent",
    name: "Agent clone", description: "Agent clone — the same agent twice, an identical copy running in parallel",
    tags: ["copy", "duplicate", "identical"], family: "orbit",
    aliases: [], keywords: ["clone agent", "duplicate", "replica", "same config"],
    // The same agent twice, level on the same footing — nothing distinguishes
    // them, which is the point.
    shapes: [
      arc(6.5, 12, 4, 295, 245), arc(17.5, 12, 4, 295, 245),
      row(19.5, 4, 20),
    ],
  },
  {
    slug: "agent-pool", category: "agents", subcategory: "multi-agent",
    name: "Agent pool", description: "An agent pool — ready agents waiting to be handed work, spare capacity",
    tags: ["ready", "workers", "capacity"], family: "orbit",
    aliases: [], keywords: ["worker pool", "pool of agents", "warm agents", "capacity"],
    // Two agents above the tray that holds them. The tray is open at the top,
    // because a pool is a thing agents leave.
    shapes: [
      arc(7.5, 7.5, 3, 295, 245), arc(16.5, 7.5, 3, 295, 245),
      poly([[3, 14], [3, 19], [21, 19], [21, 14]]),
    ],
  },
  {
    slug: "agent-quota", category: "agents", subcategory: "multi-agent",
    name: "Agent quota", description: "An agent quota — this many agents and no more, a cap on seats",
    tags: ["limit", "cap", "seats"], family: "orbit",
    aliases: [], keywords: ["max agents", "concurrency cap", "seats", "limit"],
    // `quota`'s limit line, with agents where its capsule was: two in, and the
    // wall where the third would go.
    shapes: [
      arc(5, 12, 3, 295, 245), arc(14, 12, 3, 295, 245),
      col(20, 7, 17),
    ],
  },

  /* ── What an agent is, is allowed, and is worth ────────────────────────────────── */

  {
    slug: "agent-badge", category: "agents", subcategory: "agent-core",
    name: "Agent badge", description: "An agent badge — who this agent is, a verified credential of identity",
    tags: ["identity", "credential", "verified"], family: "orbit",
    aliases: [], keywords: ["identity", "credential", "verified agent", "attestation"],
    // The agent's ring with a shield for a core — credentials where the self sits.
    shapes: [ring(), poly([[8, 7], [16, 7], [16, 12], [12, 16], [8, 12]], true)],
  },
  {
    slug: "agent-lease", category: "agents", subcategory: "agent-core",
    name: "Agent lease", description: "An agent lease — yours for a while, then given back when the lease expires",
    tags: ["temporary", "borrowed", "expiry"], family: "agent",
    aliases: [], keywords: ["lease", "ttl", "borrowed agent", "time-boxed"],
    // The agent above the hourglass it runs on. Clock hands in the ring were
    // drawn first — the twins gate returned IoU 0.98 against `clock`, because a
    // ring with hands is not "like" a clock, it is one.
    shapes: [
      arc(12, 6.5, 4.5, 295, 245),
      poly([[9, 14], [15, 14], [9, 20], [15, 20]], true),
    ],
  },
  {
    slug: "agent-persona", category: "agents", subcategory: "agent-core",
    name: "Agent persona", description: "An agent persona — the character and role an agent presents to the user",
    tags: ["character", "role", "face"], family: "orbit",
    aliases: [], keywords: ["persona", "character", "role play", "presented self"],
    // Two selves inside one ring, overlapping — the agent, and the one it is
    // being right now.
    shapes: [ring(), disc(9.5, 12, 3), disc(14.5, 12, 3)],
  },
  {
    slug: "agent-rank", category: "agents", subcategory: "agent-core",
    name: "Agent rank", description: "Agent rank — where an agent stands among the others, its grade or level",
    tags: ["grade", "level", "stripes"], family: "orbit",
    aliases: [], keywords: ["ranking", "grade", "tier", "leaderboard agent"],
    // Rank the way a sleeve says it: the agent above its stripes.
    shapes: [
      arc(12, 6.5, 3.5, 295, 245),
      poly([[7, 17.5], [12, 12.5], [17, 17.5]]),
      poly([[7, 22], [12, 17], [17, 22]]),
    ],
  },
  {
    slug: "agent-priority", category: "agents", subcategory: "agent-core",
    name: "Agent priority", description: "Agent priority — this agent goes first, raised ahead of the queue",
    tags: ["first", "urgent", "raise"], family: "orbit",
    aliases: [], keywords: ["priority", "precedence", "urgent agent", "queue jump"],
    // The chevron above the agent's open top — raised, ahead of the rest.
    shapes: [poly([[7, 7], [12, 2], [17, 7]]), arc(12, 14, 5, 295, 245)],
  },
  {
    slug: "agent-toolbelt", category: "agents", subcategory: "tool-use",
    name: "Agent toolbelt", description: "An agent toolbelt — the kit of tools an agent carries everywhere",
    tags: ["equipment", "carried", "kit"], family: "orbit",
    aliases: [], keywords: ["toolbelt", "equipped tools", "kit", "loadout"],
    // The agent and the plug reaching up to it — its kit, worn the way
    // `capability-card` wears its plug.
    shapes: [
      arc(12, 6, 4, 295, 245),
      rect(7.5, 15, 9, 6.5, 2), col(10, 12, 15), col(14, 12, 15),
    ],
  },
];
