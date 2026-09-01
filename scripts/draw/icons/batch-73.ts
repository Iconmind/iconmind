/**
 * Batch 73 — round 22 of the 1k plan: the same grammar as round 21, one motif
 * qualified by another — clocks, keys, pins, funnels, targets, lenses and
 * flags on the left, the mark that changes their meaning on the right.
 *
 * Unattended round. Three-dot "pending" marks stayed out: three bold dots
 * need ten units of width and no left body leaves that much. Every name
 * checked free before drawing.
 */
import { arc, area, col, disc, openDisc, poly, raw, rect, row } from "../forms.ts";
import { add, alert, BIG, bookmarkMark, check, coinMark, funnelMark, heartMark, idleMark, keyMark, lockMark, off, pinMark, playMark, remove, searchMark, shieldMark, SMALL, tagMark, targetMark, trendMark } from "../marks.ts";
import { banner, dial, funnel, key, machine, shield, trophy } from "../bodies.ts";
import type { Icon } from "../build.ts";

const HEART = "a heart is one line, not three strokes with visible seams";
const BR_L = poly([[7, 3], [3, 3], [3, 21], [7, 21]]);
const BR_R = poly([[17, 3], [21, 3], [21, 21], [17, 21]]);
const BUBBLE = [rect(3, 3, 18, 15, 2), poly([[7, 18], [7, 21], [10, 18]])];
const PLAY_L = poly([[3, 5], [3, 19], [10, 12]], true);
const BOLT_L = poly([[10, 6], [5, 11], [9, 11], [4, 16]]);
const LOCK_R = [rect(14, 9, 8, 7.5, 2), arc(18, 9, 2, 180, 360)];
const ROWS_R = (x: number) => [row(8, x, 22), row(12, x, 22), row(16, x, 22)];

export const BATCH_73: Icon[] = [
  /* ── cloud: a coin with a purpose ─────────────────────────────────────────────── */

  {
    slug: "revenue-goal", category: "cloud", subcategory: "cost",
    name: "Revenue goal", description: "A coin beside a target — the revenue figure a team is aiming for",
    tags: ["revenue", "goal", "target"], family: "object",
    aliases: [], keywords: ["revenue goal", "sales target", "arr target"],
    shapes: [disc(6.5, 12, 4.5), col(6.5, 10.5, 13.5), disc(18, 13, 4), disc(18, 13, 1)],
  },
  {
    slug: "cost-explorer", category: "cloud", subcategory: "cost",
    name: "Cost explorer", description: "A coin beside a magnifying glass — explore where the money goes",
    tags: ["cost", "explore", "analyse"], family: "object",
    aliases: [], keywords: ["cost explorer", "spend analysis", "cost breakdown"],
    shapes: [disc(6.5, 12, 4.5), col(6.5, 10.5, 13.5), disc(17.5, 10, 3.5), poly([[20, 12.5], [22, 14.5]])],
  },
  {
    slug: "saved-payment", category: "cloud", subcategory: "cost",
    name: "Saved payment", description: "A coin beside a bookmark — a payment method kept on file for next time",
    tags: ["payment", "saved", "card"], family: "object",
    aliases: [], keywords: ["saved payment method", "card on file", "stored payment"],
    shapes: [disc(6.5, 12, 4.5), col(6.5, 10.5, 13.5), poly([[14, 7], [21, 7], [21, 17], [17.5, 13.5], [14, 17]], true)],
  },
  {
    slug: "local-pricing", category: "cloud", subcategory: "cost",
    name: "Local pricing", description: "A location pin with a coin in its head — prices that depend on where you are",
    tags: ["pricing", "local", "region"], family: "pin",
    aliases: [], keywords: ["local pricing", "regional price", "purchasing power parity"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...coinMark(SMALL, 10)],
  },

  /* ── interface & devops: a clock with a purpose ───────────────────────────────── */

  {
    slug: "time-filter", category: "interface", subcategory: "time",
    name: "Time filter", description: "A timer dial with a funnel on its face — filter results to a window of time",
    tags: ["filter", "time", "range"], family: "orbit",
    aliases: [], keywords: ["time filter", "date range filter", "filter by time"],
    shapes: [...dial(), ...funnelMark(BIG, 14)],
  },
  {
    slug: "read-later", category: "interface", subcategory: "time",
    name: "Read later", description: "A timer dial with a bookmark on its face — saved to read when there is time",
    tags: ["later", "bookmark", "save"], family: "orbit",
    aliases: [], keywords: ["read later", "save for later", "reading queue"],
    shapes: [...dial(), ...bookmarkMark(BIG, 14)],
  },
  {
    slug: "agenda", category: "interface", subcategory: "time",
    name: "Agenda", description: "A timer dial with list rows on its face — the agenda for the day in order",
    tags: ["agenda", "schedule", "list"], family: "orbit",
    aliases: [], keywords: ["agenda", "daily schedule", "upcoming"],
    shapes: [...dial(), row(12.5, 9, 15), row(15.5, 9, 15)],
  },
  {
    slug: "latency-trend", category: "devops", subcategory: "observability",
    name: "Latency trend", description: "A timer dial with a rising line on its face — how response time is trending",
    tags: ["latency", "trend", "performance"], family: "orbit",
    aliases: [], keywords: ["latency trend", "response time over time", "p99 trend"],
    shapes: [...dial(), ...trendMark(BIG, 14)],
  },
  {
    slug: "scheduled-run", category: "automation", subcategory: "schedule",
    name: "Scheduled run", description: "A timer dial with a play on its face — a run that starts on a schedule",
    tags: ["schedule", "run", "cron"], family: "orbit",
    aliases: [], keywords: ["scheduled run", "cron job", "timed execution"],
    shapes: [...dial(), ...playMark(BIG, 14)],
  },

  /* ── security: keys, shields and scopes ───────────────────────────────────────── */

  {
    slug: "time-lock", category: "security", subcategory: "auth",
    name: "Time lock", description: "A timer dial with a shield on its face — access that only opens during a window",
    tags: ["time", "access", "window"], family: "orbit",
    aliases: [], keywords: ["time-locked access", "time-bound permission", "access window"],
    shapes: [...dial(), ...shieldMark(BIG, 14)],
  },
  {
    slug: "key-lookup", category: "security", subcategory: "auth",
    name: "Key lookup", description: "A magnifying glass with a key inside — look up which credential this is",
    tags: ["key", "lookup", "find"], family: "magnifier",
    aliases: [], keywords: ["key lookup", "find credential", "identify key"],
    shapes: [disc(12, 11, 7), poly([[17, 16], [21, 20]]), ...keyMark(SMALL, 11)],
  },
  {
    slug: "dormant-key", category: "security", subcategory: "auth",
    name: "Dormant key", description: "An upright key, a Z in its bow — a credential that has not been used in a long time",
    tags: ["dormant", "unused", "key"], family: "key",
    aliases: [], keywords: ["dormant key", "unused credential", "stale key"],
    shapes: [...key(), ...idleMark(SMALL, 8.5)],
  },
  {
    slug: "key-vault", category: "security", subcategory: "auth",
    name: "Key vault", description: "The vault door with a key inside — credentials kept locked away",
    tags: ["vault", "secrets", "key"], family: "window",
    aliases: [], keywords: ["key vault", "secrets vault", "credential store"],
    shapes: [rect(3, 4, 18, 16, 2), ...keyMark()],
  },
  {
    slug: "key-alert", category: "security", subcategory: "auth",
    name: "Key alert", description: "An upright key, an alert in its bow — a credential that needs attention",
    tags: ["alert", "key", "leak"], family: "key",
    aliases: [], keywords: ["key alert", "leaked credential", "key warning"],
    shapes: [...key(), ...alert(SMALL, 8.5)],
  },
  {
    slug: "threat-hunt", category: "security", subcategory: "ai-security",
    name: "Threat hunt", description: "A shield beside a magnifying glass — searching for threats before they strike",
    tags: ["threat", "hunt", "search"], family: "shield",
    aliases: [], keywords: ["threat hunting", "security search", "proactive detection"],
    shapes: [poly([[3, 5], [11, 5], [11, 11], [7, 15], [3, 11]], true), disc(17.5, 10, 3.5), poly([[20, 12.5], [22, 14.5]])],
  },
  {
    slug: "security-trend", category: "security", subcategory: "ai-security",
    name: "Security trend", description: "A shield with a rising line inside — how the security posture is trending",
    tags: ["posture", "trend", "risk"], family: "shield",
    aliases: [], keywords: ["security trend", "posture over time", "risk trend"],
    shapes: [shield(), ...trendMark(SMALL, 11)],
  },
  {
    slug: "policy-scope", category: "security", subcategory: "auth",
    name: "Policy scope", description: "A shield held between brackets — the scope a policy applies to",
    tags: ["policy", "scope", "bounds"], family: "bracket",
    aliases: [], keywords: ["policy scope", "scoped policy", "policy boundary"],
    shapes: [BR_L, BR_R, poly([[8.5, 7], [15.5, 7], [15.5, 12], [12, 15.5], [8.5, 12]], true)],
  },
  {
    slug: "safety-filter", category: "security", subcategory: "ai-security",
    name: "Safety filter", description: "A shield with a funnel inside — the filter that stops unsafe content",
    tags: ["safety", "filter", "moderation"], family: "shield",
    aliases: [], keywords: ["safety filter", "content safety", "harm filter"],
    shapes: [shield(), ...funnelMark(SMALL, 11)],
  },

  /* ── interface: places ────────────────────────────────────────────────────────── */

  {
    slug: "verified-location", category: "interface", subcategory: "identity",
    name: "Verified location", description: "A location pin with a check beside it — a place that has been verified",
    tags: ["location", "verified", "pin"], family: "pin",
    aliases: ["map-pin-check"], keywords: ["verified location", "confirmed place", "location check"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...check(BIG, 12)],
  },
  {
    slug: "place-search", category: "interface", subcategory: "identity",
    name: "Place search", description: "A location pin beside a magnifying glass — search for a place",
    tags: ["place", "search", "map"], family: "pin",
    aliases: ["map-pin-search"], keywords: ["place search", "find a location", "search nearby"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...searchMark(SMALL, 10)],
  },
  {
    slug: "address", category: "interface", subcategory: "identity",
    name: "Address", description: "A location pin with address lines in its head — a postal address written out",
    tags: ["address", "location", "text"], family: "pin",
    aliases: [], keywords: ["address", "postal address", "location details"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), row(8.5, 9, 15), row(11.5, 9, 15)],
  },
  {
    slug: "location-alert", category: "interface", subcategory: "identity",
    name: "Location alert", description: "A location pin beside an alert mark — something to know about this place",
    tags: ["location", "alert", "warning"], family: "pin",
    aliases: ["map-pin-alert"], keywords: ["location alert", "place warning", "geo alert"],
    shapes: [disc(6, 8, 3), col(6, 11, 17), col(18, 6, 13), disc(18, 16, 1)],
  },
  {
    slug: "destination", category: "interface", subcategory: "identity",
    name: "Destination", description: "A location pin, an arrow arriving in its head — where the journey ends",
    tags: ["destination", "flag", "route"], family: "pin",
    aliases: [], keywords: ["destination", "end of route", "arrival point"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), col(12, 7, 12), poly([[9.5, 9.5], [12, 12], [14.5, 9.5]])],
  },

  /* ── ai: a model core qualified ───────────────────────────────────────────────── */

  {
    slug: "model-fail", category: "ai", subcategory: "model",
    name: "Model fail", description: "A model core with an X inside — a model call that failed and returned an error",
    tags: ["fail", "error", "model"], family: "machine",
    aliases: [], keywords: ["model failure", "inference error", "model call failed"],
    shapes: [machine(), ...off()],
  },
  {
    slug: "model-tag", category: "ai", subcategory: "model",
    name: "Model tag", description: "A model core beside a label — a tag that groups models by family or purpose",
    tags: ["tag", "label", "model"], family: "machine",
    aliases: [], keywords: ["model tag", "model label", "tagged models"],
    shapes: [machine(), ...tagMark()],
  },
  {
    slug: "frozen-checkpoint", category: "ai", subcategory: "training",
    name: "Frozen checkpoint", description: "A flag flown big, a padlock on its banner — a checkpoint frozen so it cannot change",
    tags: ["frozen", "checkpoint", "lock"], family: "flag",
    aliases: [], keywords: ["frozen checkpoint", "locked weights", "immutable checkpoint"],
    shapes: [...banner(), ...lockMark(SMALL, 10)],
  },
  {
    slug: "model-goal", category: "ai", subcategory: "training",
    name: "Model goal", description: "A model core beside a target — the objective a model is trained toward",
    tags: ["goal", "objective", "target"], family: "machine",
    aliases: [], keywords: ["training objective", "model goal", "optimisation target"],
    shapes: [machine(), ...targetMark(SMALL)],
  },
  {
    slug: "pin-model", category: "ai", subcategory: "model",
    name: "Pin model", description: "A model core beside a pin — pin a deployment to one exact model version",
    tags: ["pin", "version", "freeze"], family: "machine",
    aliases: [], keywords: ["pin model version", "model pinning", "fixed model"],
    shapes: [machine(), ...pinMark()],
  },

  /* ── analytics: goals ─────────────────────────────────────────────────────────── */

  {
    slug: "milestone-goal", category: "analytics", subcategory: "metric",
    name: "Milestone goal", description: "A flag flown big, an arrow arriving on its banner — the goal a milestone stands for",
    tags: ["milestone", "goal", "target"], family: "flag",
    aliases: [], keywords: ["milestone goal", "milestone target", "project objective"],
    shapes: [...banner(), col(12, 7, 12), poly([[9.5, 9.5], [12, 12], [14.5, 9.5]])],
  },
  {
    slug: "add-goal", category: "analytics", subcategory: "metric",
    name: "Add goal", description: "A trophy with a plus in its bowl — set a new goal or objective to track",
    tags: ["goal", "add", "new"], family: "trophy",
    aliases: [], keywords: ["add goal", "new objective", "set a target"],
    shapes: [...trophy(), ...add(SMALL, 9)],
  },
  {
    slug: "goal-at-risk", category: "analytics", subcategory: "metric",
    name: "Goal at risk", description: "A trophy with an alert in its bowl — a goal unlikely to be met",
    tags: ["goal", "risk", "alert"], family: "trophy",
    aliases: [], keywords: ["goal at risk", "off track", "objective warning"],
    shapes: [...trophy(), ...alert(SMALL, 9)],
  },
  {
    slug: "satisfaction-trend", category: "analytics", subcategory: "metric",
    name: "Satisfaction trend", description: "A heart beside a rising line — how satisfied people are over time",
    tags: ["satisfaction", "trend", "csat"], family: "heart",
    aliases: [], keywords: ["satisfaction trend", "csat over time", "nps trend"],
    shapes: [raw("M3 9A2.5 2.5 0 0 1 7 9A2.5 2.5 0 0 1 11 9L7 13Z", HEART, true), poly([[13, 19], [16, 16], [18, 18], [22, 14]])],
  },

  /* ── interface: filters and searches ──────────────────────────────────────────── */

  {
    slug: "filter-applied", category: "interface", subcategory: "action",
    name: "Filter applied", description: "A funnel with a check below its stem — a filter that is in effect",
    tags: ["filter", "applied", "active"], family: "funnel",
    aliases: [], keywords: ["filter applied", "active filter", "filter on"],
    shapes: [funnel(), ...check(SMALL, 18)],
  },
  {
    slug: "filter-cleared", category: "interface", subcategory: "action",
    name: "Filter cleared", description: "A funnel with an X below its stem — all filters removed and the list restored",
    tags: ["filter", "clear", "reset"], family: "funnel",
    aliases: [], keywords: ["clear filters", "reset filter", "remove filter"],
    shapes: [funnel(), ...off(SMALL, 18)],
  },
  {
    slug: "filter-by-label", category: "interface", subcategory: "action",
    name: "Filter by label", description: "A label with a funnel inside — narrow the list down to items with one tag",
    tags: ["filter", "label", "tag"], family: "object",
    aliases: [], keywords: ["filter by tag", "filter by label", "tag filter"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...funnelMark(SMALL, 13.5)],
  },
  {
    slug: "no-results", category: "interface", subcategory: "state",
    name: "No results", description: "A magnifying glass with an X beside it — a search that found nothing",
    tags: ["search", "empty", "none"], family: "object",
    aliases: [], keywords: ["no results", "nothing found", "empty search"],
    shapes: [disc(9, 10, 5), poly([[5.5, 13.5], [2.5, 16.5]]), poly([[17, 12], [22, 17]]), poly([[22, 12], [17, 17]])],
  },
  {
    slug: "favorites-search", category: "interface", subcategory: "action",
    name: "Favourites search", description: "A magnifying glass beside a heart — search within favourites",
    tags: ["search", "favourites", "heart"], family: "magnifier",
    aliases: [], keywords: ["search favourites", "find in saved", "favourites filter"],
    shapes: [disc(12, 10, 6.5), poly([[16.5, 14.5], [21, 19]]), ...heartMark(SMALL, 9)],
  },
  {
    slug: "tag-search", category: "interface", subcategory: "action",
    name: "Tag search", description: "A label beside a magnifying glass — search for items by their tag",
    tags: ["tag", "search", "label"], family: "tag",
    aliases: [], keywords: ["tag search", "search by label", "find tag"],
    shapes: [poly([[3, 6], [8, 6], [12, 10], [8, 14], [3, 14]], true), disc(18.5, 10, 3.5), poly([[16, 12.5], [14, 14.5]])],
  },

  /* ── devtools & automation: runs and events ───────────────────────────────────── */

  {
    slug: "locked-run", category: "devtools", subcategory: "testing",
    name: "Locked run", description: "A play button beside a padlock — a run that cannot be started without permission",
    tags: ["run", "locked", "permission"], family: "object",
    aliases: [], keywords: ["locked run", "protected job", "permission to run"],
    shapes: [PLAY_L, ...LOCK_R],
  },
  {
    slug: "run-history", category: "devtools", subcategory: "testing",
    name: "Run history", description: "A play button beside a list — every run so far, most recent first",
    tags: ["run", "history", "list"], family: "object",
    aliases: [], keywords: ["run history", "past runs", "job history"],
    shapes: [PLAY_L, ...ROWS_R(14)],
  },
  {
    slug: "locked-block", category: "devtools", subcategory: "code",
    name: "Locked block", description: "A padlock held between brackets — a block of code that cannot be edited",
    tags: ["locked", "code", "readonly"], family: "bracket",
    aliases: [], keywords: ["locked code", "read-only block", "protected code"],
    shapes: [BR_L, BR_R, rect(8, 11, 8, 6.5, 2), arc(12, 11, 2, 180, 360)],
  },
  {
    slug: "search-scope", category: "devtools", subcategory: "editor",
    name: "Search scope", description: "A magnifying glass held between brackets — search within a scope",
    tags: ["search", "scope", "code"], family: "bracket",
    aliases: [], keywords: ["scoped search", "search in selection", "search scope"],
    shapes: [BR_L, BR_R, disc(11.5, 11, 3.5), poly([[14, 13.5], [16.5, 16]])],
  },
  {
    slug: "event-search", category: "automation", subcategory: "trigger",
    name: "Event search", description: "A lightning bolt beside a magnifying glass — search the event stream",
    tags: ["event", "search", "log"], family: "bolt",
    aliases: [], keywords: ["event search", "search events", "find trigger"],
    shapes: [BOLT_L, disc(17, 10, 4), poly([[20, 13], [22, 15]])],
  },
  {
    slug: "event-stopped", category: "automation", subcategory: "condition",
    name: "Event stopped", description: "A lightning bolt beside a stop square — an event stopped from propagating",
    tags: ["event", "stop", "propagation"], family: "bolt",
    aliases: [], keywords: ["stop propagation", "event stopped", "halt trigger"],
    shapes: [BOLT_L, poly([[15, 9], [21, 9], [21, 15], [15, 15]], true)],
  },

  /* ── interface: bubbles and pages ─────────────────────────────────────────────── */

  {
    slug: "payment-message", category: "interface", subcategory: "communication",
    name: "Payment message", description: "A speech bubble with a coin inside — a payment sent in a conversation",
    tags: ["payment", "message", "coin"], family: "bubble",
    aliases: [], keywords: ["payment message", "send money in chat", "payment request"],
    shapes: [...BUBBLE, disc(12, 10.5, 4.5), col(12, 9, 12)],
  },
  {
    slug: "message-search", category: "interface", subcategory: "communication",
    name: "Message search", description: "A speech bubble with a magnifying glass inside — search a conversation",
    tags: ["search", "message", "find"], family: "bubble",
    aliases: [], keywords: ["search messages", "find in conversation", "chat search"],
    shapes: [...BUBBLE, disc(11, 10, 3.5), poly([[13.5, 12.5], [15.5, 14.5]])],
  },
  {
    slug: "chat-snooze", category: "interface", subcategory: "communication",
    name: "Chat snooze", description: "A speech bubble with a Z inside — a conversation snoozed until later",
    tags: ["snooze", "later", "chat"], family: "bubble",
    aliases: [], keywords: ["snooze conversation", "mute until later", "chat snooze"],
    shapes: [...BUBBLE, poly([[9, 8], [15, 8], [9, 14], [15, 14]])],
  },
  {
    slug: "login-page", category: "interface", subcategory: "layout",
    name: "Login page", description: "A window with a key inside — the sign-in page where you enter your credentials",
    tags: ["login", "sign-in", "page"], family: "window",
    aliases: [], keywords: ["login page", "sign in", "auth screen"],
    shapes: [rect(2, 2, 20, 20, 2), row(6, 2, 22), disc(12, 12, 3), col(12, 15, 19)],
  },
  {
    slug: "page-error", category: "interface", subcategory: "layout",
    name: "Page error", description: "A window with an X inside — a page that failed to load or returned an error",
    tags: ["error", "page", "failed"], family: "window",
    aliases: [], keywords: ["page error", "failed to load", "error screen"],
    shapes: [rect(3, 3, 18, 18, 2), row(8, 3, 21), poly([[9.5, 11.5], [14.5, 16.5]]), poly([[14.5, 11.5], [9.5, 16.5]])],
  },
  {
    slug: "protected-page", category: "interface", subcategory: "layout",
    name: "Protected page", description: "A window with a shield inside — a page behind protection that needs permission",
    tags: ["protected", "page", "shield"], family: "window",
    aliases: [], keywords: ["protected page", "guarded route", "secure page"],
    shapes: [rect(3, 2.5, 18, 19, 2), row(7, 3, 21), poly([[8, 10], [16, 10], [16, 14], [12, 18], [8, 14]], true)],
  },
];
