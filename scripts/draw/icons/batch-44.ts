/**
 * Batch 44 — webhooks in and out, sessions counted, and text told how to behave.
 *
 * `webhook-in`/`webhook-out` are one socket with the arrow reversed, the way
 * `request`/`response` did it. `rotate-cw`/`rotate-ccw` are one arc mirrored.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { cycle, cloud as cloudBody, machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_44: Icon[] = [
  /* ── Webhooks, both ways ──────────────────────────────────────────────────────── */

  {
    slug: "webhook-in", category: "automation", subcategory: "integration",
    name: "Incoming webhook", description: "An incoming webhook — someone else's event arriving here, a callback we listen for",
    tags: ["receive", "callback", "listen"], family: "figure",
    aliases: [], keywords: ["incoming", "receive event", "callback url", "listener"],
    shapes: [arc(16, 12, 6, 240, 120), disc(16, 12, 2), row(12, 2, 10), poly([[7, 9], [10, 12], [7, 15]])],
  },
  {
    slug: "webhook-out", category: "automation", subcategory: "integration",
    name: "Outgoing webhook", description: "An outgoing webhook — our event sent to someone else's endpoint as a push",
    tags: ["send", "notify", "push"], family: "figure",
    aliases: [], keywords: ["outgoing", "push event", "notify external", "post to url"],
    shapes: [arc(8, 12, 6, 300, 60), disc(8, 12, 2), row(12, 14, 22), poly([[19, 9], [22, 12], [19, 15]])],
  },
  {
    slug: "websocket", category: "devtools", subcategory: "api",
    name: "WebSocket", description: "A WebSocket — a connection opened once and kept open both ways, live",
    tags: ["duplex", "live", "socket"], family: "figure",
    aliases: [], keywords: ["ws", "duplex", "persistent connection", "live channel"],
    shapes: [
      rect(2, 6, 7, 12, 2), rect(15, 6, 7, 12, 2),
      row(10, 9, 15), row(14, 9, 15),
    ],
  },
  {
    slug: "trigger-event", category: "automation", subcategory: "trigger",
    name: "Event trigger", description: "An event trigger — something happened somewhere, so this flow starts",
    tags: ["on-event", "fire", "start"], family: "figure",
    aliases: [], keywords: ["on event", "fired by", "reactive", "when x happens"],
    shapes: [disc(8, 12, 2), arc(8, 12, 5, 315, 45), arc(8, 12, 8, 315, 45), row(12, 16, 20), poly([[17, 9], [20, 12], [17, 15]])],
  },

  /* ── Sessions counted, usage capped ───────────────────────────────────────────── */

  {
    slug: "session-count", category: "analytics", subcategory: "metric",
    name: "Session count", description: "Session count — how many people are signed in and active right now",
    tags: ["concurrent", "active", "online"], family: "figure",
    aliases: [], keywords: ["active sessions", "concurrent users", "online now"],
    shapes: [disc(7, 8, 3), arc(7, 19, 5, 180, 360), disc(17, 8, 3), arc(17, 19, 5, 180, 360)],
  },
  {
    slug: "usage-quota", category: "cloud", subcategory: "cost",
    name: "Usage quota", description: "A usage quota — this much used against that much allowed, with what remains",
    tags: ["meter", "cap", "remaining"], family: "meter",
    aliases: [], keywords: ["used of allowed", "quota bar", "remaining", "cap"],
    shapes: [row(4, 3, 21), rect(5, 9, 14, 11, 2), row(15, 8, 16)],
  },
  {
    slug: "spend", category: "analytics", subcategory: "metric",
    name: "Spend", description: "Spend — money going out, the outflow and the burn over a period",
    tags: ["cost", "outflow", "burn"], family: "figure",
    aliases: [], keywords: ["burn", "outflow", "spending", "cost per month"],
    shapes: [disc(9, 12, 7), col(9, 8, 16), row(12, 6, 12), row(12, 18, 22), poly([[19, 9], [22, 12], [19, 15]])],
  },
  {
    slug: "savings-plan", category: "cloud", subcategory: "cost",
    name: "Savings plan", description: "A savings plan — cheaper compute for promising to stay, a reserved commitment with a discount",
    tags: ["reserved", "discount", "commit"], family: "figure",
    aliases: ["reserved"], keywords: ["reserved instances", "committed use", "discount"],
    shapes: [rect(2, 6, 20, 12, 2), disc(8, 12, 3), poly([[13, 15], [15, 17], [20, 12]])],
  },

  /* ── Text told how to behave ──────────────────────────────────────────────────── */

  {
    slug: "underline", category: "interface", subcategory: "action",
    name: "Underline", description: "Underline — a line drawn under the words, a text style for emphasis",
    tags: ["format", "text", "style"], family: "figure",
    aliases: [], keywords: ["format", "text style", "underscore", "emphasis"],
    shapes: [rect(5, 5, 14, 8, 2), row(17, 3, 21)],
  },
  {
    slug: "strikethrough", category: "interface", subcategory: "action",
    name: "Strikethrough", description: "Strikethrough — the text is still there but crossed out, marked as removed",
    tags: ["format", "removed", "style"], family: "figure",
    aliases: [], keywords: ["crossed out", "deleted text", "format", "struck"],
    // A stroke S under a strike is a snake. The word is a block; the line goes through it.
    shapes: [rect(5, 8, 14, 8, 2), row(12, 2, 22)],
  },
  {
    slug: "spacing", category: "interface", subcategory: "layout",
    name: "Spacing", description: "Spacing — the distance between things, gaps and margins in a layout",
    tags: ["gap", "margin", "distance"], family: "figure",
    aliases: [], keywords: ["gap", "margin", "padding", "distance between"],
    shapes: [col(4, 4, 20), col(20, 4, 20), row(12, 7, 17), poly([[9, 10], [7, 12], [9, 14]]), poly([[15, 10], [17, 12], [15, 14]])],
  },
  {
    slug: "instruction", category: "ai", subcategory: "prompt",
    name: "Instruction", description: "An instruction — what you told the model to do, a directive in the prompt",
    tags: ["directive", "order", "tell"], family: "page",
    aliases: [], keywords: ["directive", "told to", "do this", "command to model"],
    shapes: [page(), disc(9, 10, 1), row(10, 11, 16), disc(9, 14, 1), row(14, 11, 16)],
  },

  /* ── Turning things ───────────────────────────────────────────────────────────── */

  {
    slug: "rotate-cw", category: "interface", subcategory: "action",
    name: "Rotate clockwise", description: "Rotate clockwise — a quarter turn to the right around the centre",
    tags: ["turn", "right", "spin"], family: "rotation",
    aliases: [], keywords: ["turn right", "quarter turn", "clockwise", "rotate image"],
    shapes: [...cycle(), disc(12, 12.5, 1)],
  },
  {
    slug: "rotate-ccw", category: "interface", subcategory: "action",
    name: "Rotate anticlockwise", description: "Rotate anticlockwise — a quarter turn to the left around the centre",
    tags: ["turn", "left", "spin"], family: "rotation",
    aliases: [], keywords: ["turn left", "quarter turn", "counterclockwise", "undo rotate"],
    shapes: [...cycle("ccw"), disc(12, 12.5, 1)],
  },
  {
    slug: "refresh", category: "interface", subcategory: "action",
    name: "Refresh", description: "Refresh — ask again and show the latest answer, reload the view",
    tags: ["reload", "again", "update"], family: "rotation",
    aliases: ["reload"], keywords: ["reload", "fetch again", "update view", "f5"],
    shapes: [...cycle()],
  },
  {
    slug: "reflect", category: "agents", subcategory: "reflection",
    name: "Reflect", description: "Reflect — look back at what was just done and review it before going on",
    tags: ["review", "own-work", "mirror"], family: "figure",
    aliases: [], keywords: ["self review", "look back", "mirror", "critique own"],
    shapes: [col(12, 3, 21), poly([[8, 8], [4, 12], [8, 16]]), poly([[16, 8], [20, 12], [16, 16]])],
  },

  /* ── Things kept and counted ──────────────────────────────────────────────────── */

  {
    slug: "retention", category: "analytics", subcategory: "segment",
    name: "Retention", description: "Retention — who is still here later, the share of a cohort that stayed",
    tags: ["stayed", "kept", "cohort"], family: "chart",
    aliases: [], keywords: ["still here", "cohort retention", "kept users", "churn inverse"],
    shapes: [col(4, 4, 20), col(9, 8, 20), col(14, 11, 20), col(19, 13, 20), row(20, 2, 22)],
  },
  {
    slug: "retention-policy", category: "data", subcategory: "quality",
    name: "Retention policy", description: "A retention policy — how long data is kept before it is deleted, a TTL",
    tags: ["expiry", "delete-after", "ttl"], family: "figure",
    aliases: [], keywords: ["keep for", "delete after", "ttl", "expiry rule"],
    shapes: [rect(2, 5, 14, 14, 2), row(9, 4, 14), disc(19, 17, 3), col(19, 14.5, 17), row(17, 19, 21.5)],
  },
  {
    slug: "snapshot-volume", category: "cloud", subcategory: "storage",
    name: "Volume snapshot", description: "A volume snapshot — the disk as it was at one point in time, a backup copy",
    tags: ["backup", "point-in-time", "copy"], family: "figure",
    aliases: [], keywords: ["disk snapshot", "point in time", "restore point"],
    shapes: [rect(3, 3, 16, 10, 2), row(16, 6, 18), row(19, 9, 21)],
  },
  {
    slug: "warm-pool", category: "cloud", subcategory: "compute",
    name: "Warm pool", description: "A warm pool — instances started early and kept on standby so nobody waits",
    tags: ["ready", "standby", "pre-warmed"], family: "figure",
    aliases: [], keywords: ["pre warmed", "standby instances", "ready to go", "no cold start"],
    shapes: [rect(2, 10, 8, 10, 2), rect(13, 10, 8, 10, 2), col(8, 3, 6.5), col(12, 2, 5.5), col(16, 3, 6.5)],
  },

  /* ── The rest of the row ──────────────────────────────────────────────────────── */

  {
    slug: "vpc", category: "cloud", subcategory: "network",
    name: "VPC", description: "A VPC — your own private corner of the provider's network, walled off",
    tags: ["private", "network", "walled"], family: "cloud",
    aliases: [], keywords: ["virtual private cloud", "own network", "walled garden"],
    // A box against the cloud's floor cannot keep its distance. A fence below it can:
    // the cloud's ground, staked out.
    shapes: [cloudBody(3), col(6, 18, 21), col(12, 18, 21), col(18, 18, 21)],
  },
  {
    slug: "vpn", category: "security", subcategory: "encryption",
    name: "VPN", description: "A VPN — a private, encrypted tunnel through public ground to a trusted network",
    tags: ["tunnel", "encrypted", "through"], family: "figure",
    aliases: [], keywords: ["tunnel", "encrypted path", "private route", "wireguard"],
    // A tunnel is an arch with a lock where the road would be.
    shapes: [arc(12, 17, 9, 180, 0), disc(12, 11, 2), col(12, 13, 16), row(20, 3, 21)],
  },
  {
    slug: "vote", category: "agents", subcategory: "multi-agent",
    name: "Vote", description: "A vote — each one says, and the majority wins the choice among the agents",
    tags: ["ballot", "majority", "choose"], family: "tray",
    aliases: ["ballot"], keywords: ["majority", "ballot", "consensus vote", "tally"],
    // The box and, going into it, the ballot: a sheet with the tick already on it. It used to
    // be an arrow into the tray, which is stash, line for line.
    shapes: [rect(2, 12, 20, 8, 2), rect(8, 3, 8, 12, 2), poly([[9.5, 8], [11.5, 10], [14.5, 7]])],
  },
  {
    slug: "watch-var", category: "devtools", subcategory: "debug",
    name: "Watch variable", description: "Watch variable — a value kept in sight and tracked while debugging",
    tags: ["inspect", "track", "debug"], family: "figure",
    aliases: ["watch-variable"], keywords: ["watch expression", "track value", "debugger watch"],
    shapes: [
      poly([[4, 9], [9, 4], [15, 4], [20, 9]]), poly([[4, 9], [9, 14], [15, 14], [20, 9]]),
      disc(12, 9, 1), row(19, 7, 17),
    ],
  },
];
