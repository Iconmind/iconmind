/**
 * Batch 57 — round 6 of the 1k plan: what guards the model, and the iron it
 * runs on.
 *
 * Swaps as ever, one reason: output-filter IS content-filter, nsfw-filter and
 * toxicity-score are toxicity again, pii-detect would be the fourth pii icon,
 * content-policy is policy, gpu-chip is gpu and gpu-rack is gpu-cluster, and
 * tensor-core/nvlink/infiniband/topology-aware have no distinct 24px silhouette
 * to give. The next concepts in each list took their seats. The box-with-a-mark
 * trio (cordon/taint/spot-node) is one body with the set's marks — slash, alert,
 * bolt — exactly how the mark families work.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { machine, shield } from "../bodies.ts";
import { alert } from "../marks.ts";
import type { Icon } from "../build.ts";

export const BATCH_57: Icon[] = [
  /* ── security: what guards the model ──────────────────────────────────────────── */

  {
    slug: "prompt-shield", category: "security", subcategory: "ai-security",
    name: "Prompt shield", description: "A prompt shield — the prompt goes into the model guarded against injection",
    tags: ["guard", "input", "protect"], family: "shield",
    aliases: [], keywords: ["prompt shield", "input guard", "prompt protection"],
    // The shield with `prompt`'s caret and line inside — the thing being
    // protected, named.
    shapes: [shield(), col(9, 8.5, 12.5), row(12.5, 11.5, 15.5)],
  },
  {
    slug: "input-sanitize", category: "security", subcategory: "ai-security",
    name: "Sanitise input", description: "Sanitise input — scrub what comes in before the model sees it",
    tags: ["clean", "inbound", "filter"], family: "machine",
    aliases: [], keywords: ["input sanitization", "clean input", "strip injection"],
    // `output-sanitize`'s machine with the funnel turned around — this one scrubs
    // what flows in, not what flows out.
    shapes: [machine(), poly([[9, 15], [12, 12], [12, 9]]), poly([[15, 15], [12, 12]])],
  },
  {
    slug: "policy-allow", category: "security", subcategory: "ai-security",
    name: "Policy allow", description: "Policy allow — the rules read yes, the request may go ahead as asked",
    tags: ["ruleset", "permit", "green"], family: "page",
    aliases: ["allowlist-policy"], keywords: ["allow policy", "permitted", "allowlist"],
    shapes: [
      rect(4, 3, 16, 18, 2), row(8, 7, 17),
      poly([[8, 15.5], [10, 17.5], [16, 11.5]]),
    ],
  },
  {
    slug: "policy-block", category: "security", subcategory: "ai-security",
    name: "Policy block", description: "Policy block — the rules read no, the request is stopped before it runs",
    tags: ["ruleset", "deny", "stop"], family: "page",
    aliases: ["denylist-policy"], keywords: ["block policy", "denied", "denylist"],
    shapes: [
      rect(4, 3, 16, 18, 2), row(8, 7, 17), row(12, 7, 17),
      poly([[10, 15], [14, 19]]), poly([[14, 15], [10, 19]]),
    ],
  },
  {
    slug: "harm-category", category: "security", subcategory: "ai-security",
    name: "Harm category", description: "A harm category — which kind of bad this content is, a class in the safety taxonomy",
    tags: ["taxonomy", "class", "flag"], family: "window",
    aliases: [], keywords: ["harm taxonomy", "category", "moderation class"],
    // The taxonomy as a grid of four, and the quadrant that lit up.
    shapes: [
      rect(3, 3, 7, 7, 2), rect(14, 3, 7, 7, 2),
      rect(3, 14, 7, 7, 2), rect(14, 14, 7, 7, 2),
      disc(17.5, 6.5, 2),
    ],
  },
  {
    slug: "data-exfil", category: "security", subcategory: "ai-security",
    name: "Data exfiltration", description: "Data exfiltration — data that left through the wall, a leak or a breach",
    tags: ["leak", "escape", "breach"], family: "arrow",
    aliases: ["exfiltration"], keywords: ["data exfiltration", "leak", "data left"],
    // The arrow does not use the door: it goes through the box's wall.
    shapes: [
      rect(3, 4, 13, 16, 2),
      row(12, 10, 17), poly([[17.5, 9.5], [20, 12], [17.5, 14.5]]),
    ],
  },
  {
    slug: "canary-token", category: "security", subcategory: "ai-security",
    name: "Canary token", description: "A canary token — a decoy credential that raises the alarm the moment it is touched",
    tags: ["tripline", "decoy", "alarm"], family: "figure",
    aliases: [], keywords: ["canary token", "honeytoken", "decoy credential"],
    // `label`'s tag, and the sound it makes leaving its tip.
    shapes: [
      poly([[3, 9], [12, 9], [16, 13], [12, 17], [3, 17]], true), disc(7, 13, 2),
      arc(16, 13, 3, -45, 45), arc(16, 13, 6, -45, 45),
    ],
  },
  {
    slug: "weight-leak", category: "security", subcategory: "ai-security",
    name: "Weight leak", description: "A weight leak — the model's weights dripping out of the building, theft or exposure",
    tags: ["theft", "exposure", "drip"], family: "machine",
    aliases: ["model-leak"], keywords: ["weight leak", "model theft", "exfiltrated weights"],
    // The machine, shortened, and what should have stayed inside falling out.
    shapes: [
      frame(4, 3, 16, 10, 3, { chamfer: 3, gap: 4 }),
      col(8, 16, 18.5), col(12, 18.5, 21), col(16, 16, 18.5),
    ],
  },
  {
    slug: "kill-switch", category: "security", subcategory: "ai-security",
    name: "Kill switch", description: "A kill switch — the one emergency control that ends it right now",
    tags: ["emergency", "off", "stop"], family: "window",
    aliases: [], keywords: ["kill switch", "emergency stop", "shutdown"],
    // `toggle` thrown hard left, with the cross on the knob — off, and meant
    // to stay that way.
    shapes: [
      rect(2, 7, 20, 10, 5), disc(7, 12, 3),
      poly([[6, 11], [8, 13]]), poly([[8, 11], [6, 13]]),
    ],
  },
  {
    slug: "tripwire", category: "security", subcategory: "ai-security",
    name: "Tripwire", description: "A tripwire — cross the line and it is known, a detection that fires",
    tags: ["alarm", "line", "detect"], family: "figure",
    aliases: [], keywords: ["tripwire", "trap", "intrusion detection"],
    // Two posts, the wire between them, and the alarm above it.
    shapes: [
      col(4, 10, 20), col(20, 10, 20), row(13, 4, 20),
      col(12, 3.5, 6), disc(12, 8.5, 1),
    ],
  },

  /* ── devops: the iron it runs on ──────────────────────────────────────────────── */

  {
    slug: "gpu-queue", category: "devops", subcategory: "infrastructure",
    name: "GPU queue", description: "A GPU queue — jobs waiting their turn for a scarce card to become free",
    tags: ["waiting", "jobs", "scarce"], family: "machine",
    aliases: [], keywords: ["gpu queue", "waiting for gpu", "job queue"],
    // Three jobs above `gpu`'s chamfered card and its fan.
    shapes: [
      disc(6, 5, 2), disc(12, 5, 2), disc(18, 5, 2),
      frame(2, 12, 20, 9, 3, { chamfer: 3, gap: 4 }), disc(8, 16.5, 3),
    ],
  },
  {
    slug: "gpu-util", category: "devops", subcategory: "infrastructure",
    name: "GPU utilisation", description: "GPU utilisation — how much of the card is actually working, its load",
    tags: ["usage", "load", "meter"], family: "machine",
    aliases: [], keywords: ["gpu utilization", "usage", "load", "efficiency"],
    // The card with its fill bar — the used part, drawn; the idle part, air.
    shapes: [
      frame(2, 7, 20, 10, 3, { chamfer: 3, gap: 4 }),
      rect(5, 10, 8, 4, 2),
    ],
  },
  {
    slug: "vram", category: "devops", subcategory: "infrastructure",
    name: "VRAM", description: "VRAM — the memory on the graphics card that a model has to fit in to run",
    tags: ["memory", "banks", "fit"], family: "machine",
    aliases: [], keywords: ["vram", "gpu memory", "memory banks", "fit in memory"],
    // The card with its memory lanes.
    shapes: [
      frame(2, 6, 20, 12, 3, { chamfer: 3, gap: 4 }),
      col(7, 9, 15), col(12, 9, 15), col(17, 9, 15),
    ],
  },
  {
    slug: "vram-full", category: "devops", subcategory: "infrastructure",
    name: "VRAM full", description: "VRAM full — the model does not fit, out of memory on the card",
    tags: ["oom", "memory", "alert"], family: "machine",
    aliases: ["gpu-oom"], keywords: ["vram full", "out of memory", "oom", "doesn't fit"],
    // `vram` shortened, and the alarm above the card.
    shapes: [
      frame(2, 11, 20, 9, 3, { chamfer: 3, gap: 4 }),
      col(7, 14, 17), col(12, 14, 17), col(17, 14, 17),
      col(12, 2, 4.5), disc(12, 7.5, 1),
    ],
  },
  {
    slug: "bin-pack", category: "devops", subcategory: "infrastructure",
    name: "Bin pack", description: "Bin packing — every job placed into the fewest machines, efficient scheduling",
    tags: ["placement", "tetris", "efficient"], family: "window",
    aliases: [], keywords: ["bin packing", "placement", "scheduling", "utilization"],
    // The open bin, and two blocks of different heights already packed toward
    // its corner — a closed box could not hold the bold-weight gaps.
    shapes: [
      poly([[3, 3], [3, 21], [21, 21]]),
      rect(6, 11.5, 6.5, 6.5, 2), rect(15.5, 14, 6.5, 4, 2),
    ],
  },
  {
    slug: "preempt", category: "devops", subcategory: "infrastructure",
    name: "Preempt", description: "Preempt — something more important took the slot and evicted the job",
    tags: ["evict", "kick", "priority"], family: "arrow",
    aliases: ["preemption"], keywords: ["preempted", "evicted job", "spot reclaim"],
    // The node, and the job already out of it, mid-air.
    shapes: [
      rect(3, 9, 12, 12, 2),
      poly([[13, 9], [15.5, 6.5]]),
      rect(15, 2.5, 6.5, 4, 2),
    ],
  },
  {
    slug: "node-drain", category: "devops", subcategory: "infrastructure",
    name: "Node drain", description: "Node drain — everything leaves the node in good order before maintenance",
    tags: ["evict", "maintain", "empty"], family: "arrow",
    aliases: [], keywords: ["drain node", "evict pods", "maintenance"],
    // The node, and its work streaming out the side.
    shapes: [
      rect(3, 4, 12, 16, 2),
      row(8, 10, 17), poly([[15, 6], [17, 8], [15, 10]]),
      row(16, 10, 17), poly([[15, 14], [17, 16], [15, 18]]),
    ],
  },
  {
    slug: "cordon", category: "devops", subcategory: "infrastructure",
    name: "Cordon", description: "Cordon — the node keeps running what it has but takes nothing new",
    tags: ["closed", "no-entry", "hold"], family: "window",
    aliases: [], keywords: ["cordon node", "unschedulable", "no new pods"],
    // The node with the slash — `agent-blocked`'s mark on a box.
    shapes: [rect(4, 4, 16, 16, 2), poly([[6.5, 17.5], [17.5, 6.5]])],
  },
  {
    slug: "taint", category: "devops", subcategory: "infrastructure",
    name: "Taint", description: "A taint — a mark that says stay away unless you can tolerate it",
    tags: ["hazard", "repel", "mark"], family: "window",
    aliases: [], keywords: ["taint node", "toleration", "keep away"],
    // The node carrying the alert mark — hazard, declared.
    shapes: [rect(4, 4, 16, 16, 2), ...alert()],
  },
  {
    slug: "spot-node", category: "devops", subcategory: "infrastructure",
    name: "Spot node", description: "A spot node — cheap until the provider takes it back, interruptible compute",
    tags: ["spot", "interruptible", "cheap"], family: "window",
    aliases: ["spot-instance"], keywords: ["spot instance", "interruptible", "preemptible"],
    // The node carrying `interrupt`'s bolt — the price of the discount.
    shapes: [
      rect(4, 4, 16, 16, 2),
      poly([[14, 7.5], [10, 11.5], [13, 11.5], [9, 15.5]]),
    ],
  },
];
