/**
 * Batch 11 — media controls, three more family members, and the limits of a shape.
 *
 * `play` is not here, and its absence is the interesting part. A triangle in this set has
 * two runs at 45° meeting, which fixes its proportions exactly — so a play triangle and
 * `action`'s triangle are the same eleven bytes of path data. One of them has to go, and the
 * one that stays is the one that was drawn first for a reason of its own.
 *
 * That is the cost of the angle rule, paid openly. Thirty degrees would give two different
 * triangles and six hundred waivers, which is the trade the set has already refused once.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { folder, page, ring, shield, window_ } from "../bodies.ts";
import { SMALL, add, alert } from "../marks.ts";
import type { Icon } from "../build.ts";

const calendarParts = () => [window_(), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5)];

export const BATCH_11: Icon[] = [
  /* ── Media controls ───────────────────────────────────────────────────────────── */

  {
    slug: "pause", category: "interface", subcategory: "media",
    name: "Pause", description: "Hold it there",
    tags: ["hold", "suspend", "wait"], family: "rails",
    aliases: [], keywords: ["hold", "suspend", "break", "interrupt"],
    shapes: [col(9, 4, 20), col(15, 4, 20)],
  },
  {
    slug: "stop", category: "interface", subcategory: "media",
    name: "Stop", description: "End it now",
    tags: ["end", "halt", "cancel"], family: "window",
    aliases: [], keywords: ["end", "halt", "terminate", "abort", "kill"],
    shapes: [rect(5, 5, 14, 14, 2)],
  },
  {
    slug: "skip-forward", category: "interface", subcategory: "media",
    name: "Skip forward", description: "On to the next one",
    tags: ["next", "forward", "advance"], family: "chevron",
    aliases: [], keywords: ["next track", "advance", "fast forward", "seek"],
    shapes: [poly([[6, 5], [13, 12], [6, 19]]), col(17, 5, 19)],
  },
  {
    slug: "skip-back", category: "interface", subcategory: "media",
    name: "Skip back", description: "Back to the last one",
    tags: ["previous", "back", "rewind"], family: "chevron",
    aliases: [], keywords: ["previous track", "rewind", "seek back", "restart"],
    shapes: [poly([[18, 5], [11, 12], [18, 19]]), col(7, 5, 19)],
  },
  {
    slug: "volume-off", category: "interface", subcategory: "media",
    name: "Volume off", description: "Silenced",
    tags: ["mute", "silent", "quiet"], family: "figure",
    aliases: ["mute"], keywords: ["mute", "silence", "quiet", "no sound"],
    // The cross sits beside the cone rather than across it. Drawn through, it crosses the
    // cone's own edges four times and the whole drawing turns to hatching at sixteen pixels.
    shapes: [
      poly([[8, 9], [3, 9], [3, 15], [8, 15], [13, 20], [13, 4]], true),
      poly([[16, 9], [21, 14]]), poly([[21, 9], [16, 14]]),
    ],
  },
  {
    slug: "keyboard", category: "interface", subcategory: "media",
    name: "Keyboard", description: "Type it",
    tags: ["keys", "input", "typing"], family: "window",
    aliases: [], keywords: ["keys", "shortcut", "input", "typing", "hotkey"],
    // Keys, not lines. Three full-width rules in a box is a card with text on it — what
    // makes a keyboard is that the top row is broken into pieces and the bottom one is not.
    shapes: [
      rect(2, 5, 20, 14, 2),
      row(10, 5, 9), row(10, 10.5, 14.5), row(10, 16, 20), row(15, 8, 16),
    ],
  },

  /* ── The token, measured ──────────────────────────────────────────────────────── */

  {
    slug: "token-limit", category: "ai", subcategory: "token",
    name: "Token limit", description: "The ceiling you are not allowed past",
    tags: ["ceiling", "max", "cap"], family: "capsule",
    aliases: [], keywords: ["max tokens", "cap", "quota", "hard limit", "truncate"],
    // The wall is separate from the thing it stops. Drawn as one shape they would be a
    // container, and a limit is not a container — you can reach it and stop.
    shapes: [rect(3, 9, 13, 6, 3), col(19, 5, 19)],
  },
  {
    slug: "token-cost", category: "ai", subcategory: "token",
    name: "Token cost", description: "What the tokens are worth",
    tags: ["price", "billing", "spend"], family: "capsule",
    aliases: [], keywords: ["price per token", "spend", "billing", "usage", "budget"],
    // Stacked, not side by side. Level with each other a capsule and a circle read as an
    // infinity sign, which is close to the opposite of what a cost icon should say.
    shapes: [rect(4, 3, 16, 5, 2.5), disc(12, 16, 5)],
  },
  {
    slug: "streaming-response", category: "ai", subcategory: "inference",
    name: "Streaming response", description: "The answer arriving as it is written",
    tags: ["stream", "tokens", "live"], family: "machine",
    aliases: [], keywords: ["sse", "token by token", "incremental", "live", "typing"],
    // Two dashes leaving the machine, not three. Three is a queue; two is something still
    // coming, because the reader supplies the rest.
    shapes: [rect(2, 7, 7, 10, 2), row(12, 11, 15), row(12, 17, 21)],
  },

  /* ── Agents ───────────────────────────────────────────────────────────────────── */

  {
    slug: "agent-config", category: "agents", subcategory: "lifecycle",
    name: "Agent config", description: "How this agent is set up",
    tags: ["settings", "options", "tuning"], family: "orbit",
    aliases: [], keywords: ["settings", "options", "parameters", "setup", "profile"],
    // `settings`' rails, inside `agent`'s ring. The pair says whose settings these are,
    // which is the one thing a bare set of sliders cannot say.
    shapes: [ring(), row(10, 8, 16), col(14, 8, 12), row(15, 8, 16), col(10, 13, 17)],
  },
  {
    slug: "agent-team", category: "agents", subcategory: "multi-agent",
    name: "Agent team", description: "A standing group of agents",
    tags: ["group", "crew", "squad"], family: "orbit",
    aliases: ["crew"], keywords: ["squad", "group", "roster", "pool", "fleet"],
    // Four, in a square. `multi-agent` is two working on one problem; a team is a standing
    // arrangement, and four is the smallest number that reads as one.
    shapes: [
      arc(7, 7, 3.5, 295, 245), arc(17, 7, 3.5, 295, 245),
      arc(7, 17, 3.5, 295, 245), arc(17, 17, 3.5, 295, 245),
    ],
  },
  {
    slug: "fallback", category: "agents", subcategory: "execution",
    name: "Fallback", description: "What to do when the first way fails",
    tags: ["backup", "alternate", "recover"], family: "arrow",
    aliases: [], keywords: ["retry path", "alternative", "degraded", "plan b", "recover"],
    // A path that steps down and carries on. Level, it is `arrow-right`; the step is the
    // whole idea, because a fallback is the same journey at a lower altitude.
    shapes: [
      poly([[3, 7], [12, 7], [12, 15], [19, 15]]),
      poly([[16, 12], [19, 15], [16, 18]]),
    ],
  },
  {
    slug: "decompose", category: "agents", subcategory: "planning",
    name: "Decompose", description: "Break the task into smaller ones",
    tags: ["split", "breakdown", "subtasks"], family: "chain",
    aliases: ["breakdown"], keywords: ["split task", "subtasks", "divide", "plan", "fan out"],
    shapes: [
      rect(8, 2, 8, 7, 2), col(12, 9, 19), row(12, 5, 19),
      col(5, 12, 19), col(19, 12, 19),
    ],
  },

  /* ── Data ─────────────────────────────────────────────────────────────────────── */

  {
    slug: "data-warehouse", category: "data", subcategory: "storage",
    name: "Data warehouse", description: "Everything, kept for asking questions of",
    tags: ["store", "olap", "central"], family: "cylinder",
    aliases: [], keywords: ["snowflake", "bigquery", "redshift", "olap", "lakehouse"],
    // `storage-bucket`'s cylinder with a band round its middle. A bucket holds objects and
    // a warehouse holds tables, and the band is the difference between one and many.
    shapes: [
      raw(
        "M4 6A8 3 0 0 1 20 6V18A8 3 0 0 1 4 18Z",
        "a cylinder: an elliptical rim of 8 by 3, sides of 12, and the front of the base",
        true,
      ),
      raw("M4 6A8 3 0 0 0 20 6", "the far side of the top rim, which the near side hides"),
      raw("M4 12A8 3 0 0 0 20 12", "the band across the middle, drawn as the far rim would be"),
    ],
  },

  /* ── Three more family members ────────────────────────────────────────────────── */

  {
    slug: "document-alert", category: "interface", subcategory: "file",
    name: "Document alert", description: "Something is wrong with this one",
    tags: ["invalid", "problem", "attention"], family: "page",
    aliases: [], keywords: ["invalid", "error", "malformed", "needs review"],
    shapes: [page(), ...alert(SMALL)],
  },
  {
    slug: "folder-alert", category: "interface", subcategory: "file",
    name: "Folder alert", description: "Something in here needs looking at",
    tags: ["problem", "warning", "attention"], family: "folder",
    aliases: [], keywords: ["conflict", "warning", "sync error", "needs review"],
    shapes: [folder(), ...alert(SMALL, 13)],
  },
  {
    slug: "calendar-alert", category: "interface", subcategory: "time",
    name: "Calendar alert", description: "There is a clash",
    tags: ["conflict", "reminder", "warning"], family: "window",
    aliases: [], keywords: ["conflict", "double booked", "reminder", "overdue"],
    shapes: [...calendarParts(), ...alert(SMALL, 15)],
  },
  {
    slug: "shield-add", category: "security", subcategory: "policy",
    name: "Shield add", description: "Put a rule in place",
    tags: ["protect", "new-rule", "enable"], family: "shield",
    aliases: [], keywords: ["add policy", "new rule", "enable protection", "harden"],
    shapes: [shield(), ...add(SMALL, 11)],
  },
];
