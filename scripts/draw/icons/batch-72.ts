/**
 * Batch 72 — round 21 of the 1k plan: two motifs side by side. A coin, a
 * clock, a key, a pin, a flag, a funnel, a target, a bookmark or a heart on
 * the left; the mark that qualifies it on the right.
 *
 * Unattended round. The grammar is deliberate: every icon here is "X with Y",
 * drawn from the same sub-shapes so the set keeps one voice. Every name checked
 * free before drawing.
 */
import { arc, col, disc, poly, raw, rect, row, area } from "../forms.ts";
import { BIG, boltMark, bookmarkMark, check, clockMark, diamondMark, funnelMark, heartMark, keyMark, off, pinMark, playMark, SMALL, tagMark, trendMark } from "../marks.ts";
import { banner, brackets, clipboard, dial, funnel, key, machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

const HEART = "a heart is one line, not three strokes with visible seams";
const BUBBLE = [rect(3, 3, 18, 15, 2), poly([[7, 18], [7, 21], [10, 18]])];

export const BATCH_72: Icon[] = [
  /* ── cloud: a coin with a mark ────────────────────────────────────────────────── */

  {
    slug: "escrow", category: "cloud", subcategory: "cost",
    name: "Escrow", description: "A coin beside a padlock — money held in escrow until both sides deliver",
    tags: ["escrow", "hold", "payment"], family: "object",
    aliases: [], keywords: ["escrow", "held funds", "conditional payment"],
    shapes: [disc(7, 12, 4.5), col(7, 10.5, 13.5), rect(14, 9, 8, 7.5, 2), arc(18, 9, 2, 180, 360)],
  },
  {
    slug: "insured", category: "cloud", subcategory: "cost",
    name: "Insured", description: "A coin beside a shield — a payment or balance that is protected",
    tags: ["protected", "insurance", "money"], family: "object",
    aliases: [], keywords: ["insured", "payment protection", "covered balance"],
    shapes: [disc(6.5, 12, 4.5), col(6.5, 10.5, 13.5), poly([[14, 7], [22, 7], [22, 12.5], [18, 16.5], [14, 12.5]], true)],
  },
  {
    slug: "revenue", category: "cloud", subcategory: "cost",
    name: "Revenue", description: "A coin beside a rising line — revenue growing over time, month after month",
    tags: ["revenue", "growth", "money"], family: "object",
    aliases: [], keywords: ["revenue", "income growth", "monthly recurring revenue"],
    shapes: [disc(7, 12, 4.5), col(7, 10.5, 13.5), poly([[14, 17], [16.5, 14.5], [18.5, 16.5], [22, 13]])],
  },
  {
    slug: "paywall", category: "cloud", subcategory: "cost",
    name: "Paywall", description: "A coin beside a key — content or features unlocked by paying",
    tags: ["paywall", "premium", "unlock"], family: "object",
    aliases: [], keywords: ["paywall", "premium content", "pay to unlock"],
    shapes: [disc(6.5, 12, 4.5), col(6.5, 10.5, 13.5), disc(17, 9, 3), col(17, 12, 20), row(17, 17, 19.5)],
  },
  {
    slug: "donate", category: "cloud", subcategory: "cost",
    name: "Donate", description: "A coin beside a heart — a donation or a tip given in support of someone",
    tags: ["donate", "tip", "give"], family: "object",
    aliases: [], keywords: ["donate", "tip jar", "support with money"],
    shapes: [disc(6.5, 12, 4.5), col(6.5, 10.5, 13.5), raw("M14 9A2.5 2.5 0 0 1 18 9A2.5 2.5 0 0 1 22 9L18 13Z", HEART, true)],
  },
  {
    slug: "discount", category: "cloud", subcategory: "cost",
    name: "Discount", description: "A coin with a minus beside it — a discount taken off the price",
    tags: ["discount", "reduce", "price"], family: "object",
    aliases: [], keywords: ["discount", "price reduction", "promo"],
    shapes: [disc(8, 12, 5), col(8, 10.5, 13.5), row(12, 16, 22)],
  },
  {
    slug: "geo-filter", category: "cloud", subcategory: "network",
    name: "Geo filter", description: "A location pin with a funnel in its head — traffic filtered by where it comes from",
    tags: ["geo", "filter", "region"], family: "pin",
    aliases: [], keywords: ["geo filter", "region filter", "geo blocking"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...funnelMark(SMALL, 10)],
  },

  /* ── interface: a clock with a mark ───────────────────────────────────────────── */

  {
    slug: "deadline-missed", category: "interface", subcategory: "time",
    name: "Deadline missed", description: "A timer dial with an X on its face — a deadline that passed without being met",
    tags: ["deadline", "late", "missed"], family: "orbit",
    aliases: [], keywords: ["deadline missed", "overdue", "past due"],
    shapes: [...dial(), ...off(BIG, 14)],
  },
  {
    slug: "instant", category: "interface", subcategory: "time",
    name: "Instant", description: "A timer dial with a bolt on its face — something that happens right away",
    tags: ["instant", "immediate", "fast"], family: "orbit",
    aliases: [], keywords: ["instant", "immediate", "real time"],
    shapes: [...dial(), ...boltMark(BIG, 14)],
  },
  {
    slug: "timezone", category: "interface", subcategory: "time",
    name: "Timezone", description: "A timer dial with a pin on its face — the local time somewhere else",
    tags: ["timezone", "local", "clock"], family: "orbit",
    aliases: [], keywords: ["timezone", "local time", "time in another place"],
    shapes: [...dial(), ...pinMark(BIG, 14)],
  },
  {
    slug: "time-shift", category: "interface", subcategory: "time",
    name: "Time shift", description: "A timer dial, a bar and an arrow on its face — shift a schedule to later",
    tags: ["shift", "reschedule", "forward"], family: "orbit",
    aliases: ["clock-arrow-right"], keywords: ["time shift", "reschedule", "move forward"],
    shapes: [...dial(), col(9, 11, 17), row(14, 9, 15), poly([[12.5, 11.5], [15, 14], [12.5, 16.5]])],
  },

  /* ── ai: a model core with a mark ─────────────────────────────────────────────── */

  {
    slug: "model-latency", category: "ai", subcategory: "inference",
    name: "Model latency", description: "A model core with a clock inside — how long a model takes to answer",
    tags: ["latency", "speed", "time"], family: "machine",
    aliases: [], keywords: ["model latency", "time to first token", "response time"],
    shapes: [machine(), ...clockMark()],
  },
  {
    slug: "model-trend", category: "ai", subcategory: "training",
    name: "Model trend", description: "A model core beside a rising line — a model's quality trending over versions",
    tags: ["trend", "quality", "versions"], family: "machine",
    aliases: [], keywords: ["model trend", "quality over time", "model progress"],
    shapes: [machine(), ...trendMark()],
  },
  {
    slug: "model-scope", category: "ai", subcategory: "model",
    name: "Model scope", description: "A model core held between brackets — the scope a model is allowed to work in",
    tags: ["scope", "bounds", "limits"], family: "bracket",
    aliases: [], keywords: ["model scope", "model boundaries", "allowed scope"],
    shapes: [...brackets(), ...diamondMark(SMALL, 12)],
  },
  {
    slug: "model-bookmark", category: "ai", subcategory: "model",
    name: "Model bookmark", description: "A bookmark beside a model core — a model saved to come back to",
    tags: ["bookmark", "saved", "model"], family: "machine",
    aliases: [], keywords: ["bookmark model", "saved model", "model shortlist"],
    shapes: [machine(), ...bookmarkMark()],
  },
  {
    slug: "region-model", category: "ai", subcategory: "model",
    name: "Region model", description: "A location pin beside a model core — the model served in a given region",
    tags: ["region", "deploy", "locality"], family: "pin",
    aliases: [], keywords: ["regional model", "model region", "data residency model"],
    shapes: [disc(7, 8, 3), col(7, 11, 15), poly([[17, 8], [21, 12], [17, 16], [13, 12]], true)],
  },
  {
    slug: "model-filter", category: "ai", subcategory: "inference",
    name: "Model filter", description: "A funnel beside a model core — requests filtered before they reach a model",
    tags: ["filter", "route", "requests"], family: "machine",
    aliases: [], keywords: ["model filter", "request filtering", "pre-model routing"],
    shapes: [machine(), ...funnelMark()],
  },

  /* ── security: a key with a mark ──────────────────────────────────────────────── */

  {
    slug: "token-expiry", category: "security", subcategory: "auth",
    name: "Token expiry", description: "A key with a clock in its head — a credential that expires after a while",
    tags: ["expiry", "token", "ttl"], family: "key",
    aliases: [], keywords: ["token expiry", "credential ttl", "expiring key"],
    shapes: [...key(), disc(12, 8.5, 3),
      // clockMark's hands as one polyline - the fob head already spends four elements
      poly([[12, 5.5], [12, 8.5], [14.5, 8.5]])],
  },
  {
    slug: "geofence", category: "security", subcategory: "auth",
    name: "Geofence", description: "A location pin beside a shield — access allowed only inside a geographic boundary",
    tags: ["geofence", "location", "boundary"], family: "pin",
    aliases: [], keywords: ["geofence", "location-based access", "geo restriction"],
    shapes: [disc(7, 8, 3), col(7, 11, 15), poly([[13, 11], [22, 11], [22, 16.5], [17.5, 21], [13, 16.5]], true)],
  },
  {
    slug: "policy-list", category: "security", subcategory: "auth",
    name: "Policy list", description: "A shield beside a list — the policies and rules that apply to this resource",
    tags: ["policy", "rules", "list"], family: "shield",
    aliases: [], keywords: ["policy list", "security policies", "rule set"],
    shapes: [poly([[3, 5], [12, 5], [12, 11], [7.5, 15.5], [3, 11]], true), row(9, 15, 22), row(13, 15, 22), row(17, 15, 22)],
  },
  {
    slug: "threat-event", category: "security", subcategory: "ai-security",
    name: "Threat event", description: "A shield beside a lightning bolt — a security event that hit the guardrails",
    tags: ["threat", "event", "alert"], family: "shield",
    aliases: [], keywords: ["threat event", "security incident", "attack detected"],
    shapes: [poly([[3, 5], [12, 5], [12, 11], [7.5, 15.5], [3, 11]], true), poly([[21, 7], [17, 11], [20, 11], [16, 15]])],
  },
  {
    slug: "secret-block", category: "security", subcategory: "auth",
    name: "Secret block", description: "A key held between brackets — a secret kept inside a code block",
    tags: ["secret", "code", "key"], family: "bracket",
    aliases: [], keywords: ["secret in code", "embedded credential", "secret block"],
    shapes: [...brackets(), ...keyMark(SMALL, 12)],
  },
  {
    slug: "key-usage", category: "security", subcategory: "auth",
    name: "Key usage", description: "An upright key, a rising line in its bow — how much a credential is being used",
    tags: ["usage", "key", "metrics"], family: "key",
    aliases: [], keywords: ["api key usage", "credential usage", "key metrics"],
    shapes: [...key(), ...trendMark(SMALL, 8.5)],
  },
  {
    slug: "key-list", category: "security", subcategory: "auth",
    name: "Key list", description: "An upright key, list rows in its bow — the credentials issued to an account",
    tags: ["keys", "list", "credentials"], family: "key",
    aliases: [], keywords: ["key list", "api keys", "credential inventory"],
    shapes: [...key(), row(7, 9, 15), row(10, 9, 15)],
  },

  /* ── interface: kept, saved, flagged ──────────────────────────────────────────── */

  {
    slug: "favorite-place", category: "interface", subcategory: "identity",
    name: "Favourite place", description: "A location pin beside a heart — a place saved as a favourite",
    tags: ["favourite", "place", "pin"], family: "pin",
    aliases: [], keywords: ["favourite place", "saved location", "loved spot"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...heartMark(SMALL, 10)],
  },
  {
    slug: "wishlist", category: "interface", subcategory: "file",
    name: "Wishlist", description: "A clipboard with a heart on it — the things someone wants, saved for later",
    tags: ["wishlist", "wants", "saved"], family: "clipboard",
    aliases: [], keywords: ["wishlist", "saved for later", "favourites list"],
    shapes: [...clipboard(), ...heartMark(SMALL, 13.5)],
  },
  {
    slug: "bookmark-list", category: "interface", subcategory: "file",
    name: "Bookmark list", description: "A clipboard with a bookmark on it — the bookmarks kept as a list",
    tags: ["bookmarks", "reading", "saved"], family: "clipboard",
    aliases: [], keywords: ["bookmark list", "reading list", "saved articles"],
    shapes: [...clipboard(), ...bookmarkMark(SMALL, 13.5)],
  },
  {
    slug: "flagged-message", category: "interface", subcategory: "communication",
    name: "Flagged message", description: "A speech bubble with a flag inside — a message flagged for attention",
    tags: ["flag", "message", "attention"], family: "bubble",
    aliases: [], keywords: ["flagged message", "flag for follow-up", "reported message"],
    shapes: [...BUBBLE, col(8, 6, 15), poly([[8, 6], [15, 6], [13, 8], [15, 10], [8, 10]])],
  },
  {
    slug: "saved-message", category: "interface", subcategory: "communication",
    name: "Saved message", description: "A speech bubble with a bookmark inside — a message saved for later",
    tags: ["saved", "bookmark", "message"], family: "bubble",
    aliases: [], keywords: ["saved message", "bookmark message", "keep message"],
    shapes: [...BUBBLE, poly([[9, 6], [15, 6], [15, 14], [12, 11], [9, 14]], true)],
  },
  {
    slug: "moderated-message", category: "interface", subcategory: "communication",
    name: "Moderated message", description: "A speech bubble with a shield inside — a message checked by moderation",
    tags: ["moderation", "shield", "message"], family: "bubble",
    aliases: [], keywords: ["moderated message", "content moderation", "safe message"],
    shapes: [...BUBBLE, poly([[8, 6], [16, 6], [16, 10.5], [12, 14.5], [8, 10.5]], true)],
  },
  {
    slug: "map-view", category: "interface", subcategory: "media",
    name: "Map view", description: "A window with a location pin inside — the map view of an app",
    tags: ["map", "view", "location"], family: "window",
    aliases: [], keywords: ["map view", "map mode", "location view"],
    shapes: [rect(3, 3, 18, 18, 2), row(8, 3, 21), disc(12, 13, 2), col(12, 15, 18)],
  },
  {
    slug: "page-search", category: "interface", subcategory: "action",
    name: "Page search", description: "A window with a magnifying glass inside — find text on the current page",
    tags: ["search", "find", "page"], family: "window",
    aliases: [], keywords: ["find on page", "page search", "search within"],
    shapes: [rect(3, 2.5, 18, 19, 2), row(7, 3, 21), disc(11, 13.5, 3), poly([[13, 15.5], [15.5, 18]])],
  },
  {
    slug: "tagged-list", category: "interface", subcategory: "file",
    name: "Tagged list", description: "A clipboard with a label on it — a list where every item carries a tag",
    tags: ["tag", "list", "group"], family: "clipboard",
    aliases: [], keywords: ["tagged items", "items by tag", "label view"],
    shapes: [...clipboard(), ...tagMark(SMALL, 13.5)],
  },

  /* ── devtools: a block with a verdict ─────────────────────────────────────────── */

  {
    slug: "assert-pass", category: "devtools", subcategory: "testing",
    name: "Assert pass", description: "A check held between brackets — an assertion in the code that held true",
    tags: ["assert", "pass", "test"], family: "bracket",
    aliases: [], keywords: ["assertion passed", "assert ok", "test assertion"],
    shapes: [...brackets(), ...check(SMALL, 12)],
  },
  {
    slug: "assert-fail", category: "devtools", subcategory: "testing",
    name: "Assert fail", description: "An X held between brackets — an assertion in the code that failed its check",
    tags: ["assert", "fail", "test"], family: "bracket",
    aliases: [], keywords: ["assertion failed", "assert error", "failing test"],
    shapes: [...brackets(), ...off(SMALL, 12)],
  },
  {
    slug: "run-block", category: "devtools", subcategory: "code",
    name: "Run block", description: "A play button held between brackets — run this block of code",
    tags: ["run", "block", "execute"], family: "bracket",
    aliases: [], keywords: ["run code block", "execute cell", "run selection"],
    shapes: [...brackets(), ...playMark(SMALL, 12)],
  },
  {
    slug: "macro", category: "devtools", subcategory: "editor",
    name: "Macro", description: "A lightning bolt held between brackets — a macro that expands into code",
    tags: ["macro", "expand", "code"], family: "bracket",
    aliases: [], keywords: ["macro", "code macro", "recorded actions"],
    shapes: [...brackets(), ...boltMark(SMALL, 12)],
  },
  {
    slug: "live-view", category: "devtools", subcategory: "editor",
    name: "Live view", description: "A window with a lightning bolt inside — a live-updating preview",
    tags: ["live", "preview", "realtime"], family: "window",
    aliases: [], keywords: ["live preview", "live view", "instant reload"],
    shapes: [rect(3, 2.5, 18, 19, 2), row(7, 3, 21), poly([[13.5, 10.5], [10, 14], [13, 14], [9.5, 17.5]])],
  },

  /* ── automation: an event with a verdict ──────────────────────────────────────── */

  {
    slug: "event-filter", category: "automation", subcategory: "trigger",
    name: "Event filter", description: "A funnel with a bolt below its stem — only matching events pass through",
    tags: ["filter", "event", "trigger"], family: "funnel",
    aliases: [], keywords: ["event filter", "filtered trigger", "event matching"],
    shapes: [funnel(), ...boltMark(SMALL, 18)],
  },
  {
    slug: "event-check", category: "automation", subcategory: "condition",
    name: "Event check", description: "A lightning bolt beside a check — an event that was handled and acknowledged",
    tags: ["event", "handled", "check"], family: "bolt",
    aliases: [], keywords: ["event handled", "event acknowledged", "trigger succeeded"],
    shapes: [poly([[10, 6], [5, 11], [9, 11], [4, 16]]), poly([[13, 14], [15.5, 16.5], [20, 12]])],
  },
  {
    slug: "event-failed", category: "automation", subcategory: "condition",
    name: "Event failed", description: "A lightning bolt beside an X — an event whose handler failed",
    tags: ["event", "failed", "error"], family: "bolt",
    aliases: [], keywords: ["event failed", "handler error", "trigger failed"],
    shapes: [poly([[10, 6], [5, 11], [9, 11], [4, 16]]), poly([[14, 10], [19, 15]]), poly([[19, 10], [14, 15]])],
  },
  {
    slug: "checkpoint-failed", category: "automation", subcategory: "action",
    name: "Checkpoint failed", description: "A flag with an X beside it — a checkpoint that could not be saved",
    tags: ["checkpoint", "failed", "flag"], family: "flag",
    aliases: [], keywords: ["checkpoint failed", "save failed", "milestone missed"],
    shapes: [col(6, 3, 21), poly([[6, 3], [15, 3], [12, 6], [15, 9], [6, 9]]), poly([[16, 13], [21, 18]]), poly([[21, 13], [16, 18]])],
  },
  {
    slug: "event-spike", category: "automation", subcategory: "trigger",
    name: "Event spike", description: "A lightning bolt beside a bump in a line — a sudden burst of events",
    tags: ["spike", "burst", "events"], family: "bolt",
    aliases: [], keywords: ["event spike", "burst of events", "traffic surge"],
    shapes: [poly([[10, 6], [5, 11], [9, 11], [4, 16]]), poly([[12, 18], [15, 18], [18, 15], [21, 18]])],
  },

  /* ── analytics: goals and lists ───────────────────────────────────────────────── */

  {
    slug: "goal-progress", category: "analytics", subcategory: "metric",
    name: "Goal progress", description: "A target beside a rising line — progress climbing steadily toward a goal",
    tags: ["goal", "progress", "trend"], family: "object",
    aliases: [], keywords: ["goal progress", "toward target", "okr progress"],
    shapes: [disc(8, 12, 5), disc(8, 12, 1), poly([[15, 17], [17.5, 14.5], [19.5, 16.5], [22, 14]])],
  },
  {
    slug: "goal-list", category: "analytics", subcategory: "metric",
    name: "Goal list", description: "A target beside a list — the goals and objectives currently being tracked",
    tags: ["goals", "list", "okr"], family: "object",
    aliases: [], keywords: ["goal list", "objectives", "okr list"],
    shapes: [disc(8, 12, 5), disc(8, 12, 2), row(7, 16, 22), row(12, 16, 22), row(17, 16, 22)],
  },
  {
    slug: "checkpoint-list", category: "analytics", subcategory: "dashboard",
    name: "Checkpoint list", description: "A flag flown big, list rows on its banner — every checkpoint saved so far",
    tags: ["checkpoints", "list", "history"], family: "flag",
    aliases: [], keywords: ["checkpoint list", "saved checkpoints", "milestone history"],
    shapes: [...banner(), row(8.5, 9, 15), row(11.5, 9, 15)],
  },
  {
    slug: "filtered-list", category: "analytics", subcategory: "segment",
    name: "Filtered list", description: "A funnel with rows below its stem — the rows that passed through the filter",
    tags: ["filter", "list", "results"], family: "funnel",
    aliases: [], keywords: ["filtered list", "filter results", "narrowed rows"],
    shapes: [funnel(), row(16.5, 9, 15), row(19.5, 9, 15)],
  },
  {
    slug: "trend-milestone", category: "analytics", subcategory: "chart",
    name: "Trend milestone", description: "A flag flown big, a rising line on its banner — a milestone on the climb",
    tags: ["milestone", "trend", "chart"], family: "flag",
    aliases: [], keywords: ["trend milestone", "annotated chart", "marked point"],
    shapes: [...banner(), ...trendMark(SMALL, 10)],
  },

  /* ── agents: memory in and out ────────────────────────────────────────────────── */

  {
    slug: "memory-save", category: "agents", subcategory: "memory",
    name: "Memory save", description: "An arrow writing into stored notes — an agent saving something to memory",
    tags: ["memory", "write", "store"], family: "text",
    aliases: [], keywords: ["save to memory", "write memory", "remember"],
    shapes: [row(11, 2, 7), poly([[5, 9], [7, 11], [5, 13]]), row(6, 10, 21), row(11, 10, 21), row(16, 10, 21)],
  },
  {
    slug: "memory-load", category: "agents", subcategory: "memory",
    name: "Memory load", description: "An arrow leaving stored notes — an agent loading something from memory",
    tags: ["memory", "read", "recall"], family: "text",
    aliases: [], keywords: ["load from memory", "read memory", "recall"],
    shapes: [row(6, 3, 14), row(11, 3, 14), row(16, 3, 14), row(11, 17, 22), poly([[19.5, 8.5], [22, 11], [19.5, 13.5]])],
  },
];
