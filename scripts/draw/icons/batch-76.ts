/**
 * Batch 76 — round 25 of the 1k plan, the last fifty. The pairing grammar
 * closes the set: lenses, bookmarks, hearts, shields, tags, play buttons,
 * bolts, targets, funnels, pins, keys, coins, flags, locks and lists, each
 * given the one mark it was still missing; and the last marks placed inside
 * brackets, bubbles and windows.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { arc, area, col, disc, poly, raw, rect, row } from "../forms.ts";
import { banner, bookmark, brackets, funnel, key, padlock, runCard, shield, trophy } from "../bodies.ts";
import { alert, BIG, bookmarkMark, flagMark, funnelMark, heartMark, idleMark, keyMark, playMark, remove, SMALL, squareMark, trendMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const HEART = "a heart is one line, not three strokes with visible seams";
const BR_R = poly([[17, 3], [21, 3], [21, 21], [17, 21]]);
const BUBBLE = [rect(3, 3, 18, 15, 2), poly([[7, 18], [7, 21], [10, 18]])];
const WINDOW = [rect(3, 3, 18, 18, 2), row(8, 3, 21)];
const LENS_LS = [disc(8.5, 10, 4.5), poly([[5.5, 13], [3, 15.5]])];
const HEART_L = raw("M3 9A2.5 2.5 0 0 1 7 9A2.5 2.5 0 0 1 11 9L7 13Z", HEART, true);
const BOLT_L = poly([[10, 6], [5, 11], [9, 11], [4, 16]]);
const COIN_L = [disc(6.5, 12, 4.5), col(6.5, 10.5, 13.5)];
const ROWS_L = [row(6, 3, 14), row(11, 3, 14), row(16, 3, 14)];
const ROWS_LS = [row(6, 3, 12), row(11, 3, 12), row(16, 3, 12)];
const ARROW_R = [row(12, 16, 22), poly([[19.5, 9.5], [22, 12], [19.5, 14.5]])];
const ARROW_R15 = [row(12, 15, 22), poly([[19.5, 9.5], [22, 12], [19.5, 14.5]])];
const ALERT_R = [col(18, 7, 12), disc(18, 15, 1)];
const MINUS_R = row(12, 16, 22);
const LINE_R = poly([[15, 19], [17.5, 16.5], [19.5, 18.5], [22, 16]]);
const UP_R15 = [poly([[15, 13], [18.5, 9.5], [22, 13]]), poly([[15, 17.5], [18.5, 14], [22, 17.5]])];

export const BATCH_76: Icon[] = [
  /* ── interface: the search, the bookmark, the heart ───────────────────────────── */

  {
    slug: "search-run", category: "interface", subcategory: "action",
    name: "Search run", description: "A magnifying glass beside a play button — run a saved search now",
    tags: ["search", "run", "execute"], family: "object",
    aliases: [], keywords: ["run search", "execute query", "search now"],
    shapes: [...LENS_LS, poly([[16, 8], [16, 16], [20, 12]], true)],
  },
  {
    slug: "stop-search", category: "interface", subcategory: "action",
    name: "Stop search", description: "A magnifying glass beside a stop square — cancel a search in progress",
    tags: ["search", "stop", "cancel"], family: "object",
    aliases: [], keywords: ["stop search", "cancel search", "abort query"],
    shapes: [...LENS_LS, poly([[16, 9], [22, 9], [22, 15], [16, 15]], true)],
  },
  {
    slug: "narrow-search", category: "interface", subcategory: "action",
    name: "Narrow search", description: "A magnifying glass with a minus beside it — narrow the search down",
    tags: ["search", "narrow", "refine"], family: "object",
    aliases: [], keywords: ["narrow search", "refine query", "fewer results"],
    shapes: [...LENS_LS, MINUS_R],
  },
  {
    slug: "search-next", category: "interface", subcategory: "action",
    name: "Search next", description: "A magnifying glass with an arrow beside it — jump to the next match",
    tags: ["search", "next", "match"], family: "object",
    aliases: [], keywords: ["next match", "find next", "search forward"],
    shapes: [...LENS_LS, ...ARROW_R],
  },
  {
    slug: "search-filter", category: "interface", subcategory: "action",
    name: "Search filter", description: "A magnifying glass beside a funnel — filter the results of a search",
    tags: ["search", "filter", "refine"], family: "object",
    aliases: [], keywords: ["search filter", "filter results", "faceted search"],
    shapes: [disc(8, 10, 4), poly([[5, 13], [3, 15]]), poly([[15, 8], [22, 8], [20, 10], [20, 18], [17, 18], [17, 10]], true)],
  },
  {
    slug: "bookmark-removed", category: "interface", subcategory: "file",
    name: "Bookmark removed", description: "A bookmark with a minus inside — a bookmark taken away and removed",
    tags: ["bookmark", "removed", "delete"], family: "ribbon",
    aliases: [], keywords: ["remove bookmark", "delete bookmark", "unbookmark"],
    shapes: [bookmark(), ...remove(SMALL, 10)],
  },
  {
    slug: "stale-bookmark", category: "interface", subcategory: "file",
    name: "Stale bookmark", description: "A bookmark with a Z inside — a bookmark to a page that has since changed",
    tags: ["bookmark", "stale", "old"], family: "ribbon",
    aliases: [], keywords: ["stale bookmark", "outdated bookmark", "dead link"],
    shapes: [bookmark(), ...idleMark(SMALL, 9)],
  },
  {
    slug: "bookmark-alert", category: "interface", subcategory: "file",
    name: "Bookmark alert", description: "A bookmark with an alert inside — a saved item that needs attention",
    tags: ["bookmark", "alert", "warning"], family: "ribbon",
    aliases: [], keywords: ["bookmark alert", "saved item warning", "bookmark issue"],
    shapes: [bookmark(), ...alert(SMALL, 9)],
  },
  {
    slug: "unlike", category: "interface", subcategory: "identity",
    name: "Unlike", description: "A heart with an X beside it — take a like back and un-favourite",
    tags: ["unlike", "heart", "remove"], family: "heart",
    aliases: ["heart-off"], keywords: ["unlike", "remove like", "un-favourite"],
    shapes: [raw("M2 9A2.5 2.5 0 0 1 7 9A2.5 2.5 0 0 1 12 9L7 14Z", HEART, true), poly([[15, 9], [22, 16]]), poly([[22, 9], [15, 16]])],
  },
  {
    slug: "favorite-alert", category: "interface", subcategory: "identity",
    name: "Favourite alert", description: "A heart beside an alert mark — news about something you favourited",
    tags: ["favourite", "alert", "update"], family: "heart",
    aliases: [], keywords: ["favourite alert", "watched item update", "favourite changed"],
    shapes: [HEART_L, ...ALERT_R],
  },
  {
    slug: "share-favorite", category: "interface", subcategory: "identity",
    name: "Share favourite", description: "A heart with an arrow beside it — share something you love with someone else",
    tags: ["share", "favourite", "send"], family: "heart",
    aliases: [], keywords: ["share favourite", "send a like", "recommend"],
    shapes: [raw("M2 9A2.5 2.5 0 0 1 7 9A2.5 2.5 0 0 1 12 9L7 14Z", HEART, true), row(12, 15, 22), poly([[18, 8], [22, 12], [18, 16]])],
  },

  /* ── security: shields, keys and locks ────────────────────────────────────────── */

  {
    slug: "scan-stopped", category: "security", subcategory: "ai-security",
    name: "Scan stopped", description: "A shield with a stop square inside — a security scan halted before it finished",
    tags: ["scan", "stopped", "halt"], family: "shield",
    aliases: [], keywords: ["scan stopped", "halt scan", "scan cancelled"],
    shapes: [shield(), ...squareMark(SMALL, 11)],
  },
  {
    slug: "shield-upgrade", category: "security", subcategory: "ai-security",
    name: "Shield upgrade", description: "A shield, a double chevron rising inside — protection raised to a higher level",
    tags: ["shield", "upgrade", "level"], family: "shield",
    aliases: [], keywords: ["upgrade protection", "raise security level", "stronger shield"],
    shapes: [shield(), poly([[10, 10.5], [12, 8.5], [14, 10.5]]), poly([[10, 13.5], [12, 11.5], [14, 13.5]])],
  },
  {
    slug: "remove-policy", category: "security", subcategory: "auth",
    name: "Remove policy", description: "A policy sheet with a minus — take a policy away from the set",
    tags: ["policy", "remove", "delete"], family: "page",
    aliases: [], keywords: ["remove policy", "delete rule", "policy removed"],
    shapes: [rect(4, 3, 16, 18, 2), row(8, 7, 17), ...remove(SMALL, 14.5)],
  },
  {
    slug: "geo-key", category: "security", subcategory: "auth",
    name: "Geo key", description: "A location pin with a key in its head — a credential that only works from one place",
    tags: ["key", "location", "restricted"], family: "pin",
    aliases: [], keywords: ["geo-restricted key", "location-bound credential", "regional key"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...keyMark(SMALL, 10)],
  },
  {
    slug: "key-run", category: "security", subcategory: "auth",
    name: "Key run", description: "An upright key, a play triangle in its bow — a run started with a specific credential",
    tags: ["key", "run", "credential"], family: "key",
    aliases: [], keywords: ["run with key", "credentialed run", "key-scoped job"],
    shapes: [...key(), ...playMark(SMALL, 8.5)],
  },
  {
    slug: "key-upgrade", category: "security", subcategory: "auth",
    name: "Key upgrade", description: "An upright key, a double chevron rising in its bow — a credential promoted to a higher scope",
    tags: ["key", "upgrade", "scope"], family: "key",
    aliases: [], keywords: ["upgrade key", "promote credential", "wider scope"],
    shapes: [...key(), poly([[10, 8.5], [12, 6.5], [14, 8.5]]), poly([[10, 11.5], [12, 9.5], [14, 11.5]])],
  },
  {
    slug: "remove-lock", category: "security", subcategory: "auth",
    name: "Remove lock", description: "A padlock with a minus on its body — take a lock off and release it",
    tags: ["lock", "remove", "unlock"], family: "lock",
    aliases: [], keywords: ["remove lock", "unlock permanently", "lock removed"],
    shapes: [...padlock(), ...remove(SMALL, 15.5)],
  },

  /* ── interface: labels and pins ───────────────────────────────────────────────── */

  {
    slug: "stale-label", category: "interface", subcategory: "action",
    name: "Stale label", description: "A label with a Z inside — a tag nobody has used in a long time, gone stale",
    tags: ["label", "stale", "unused"], family: "object",
    aliases: [], keywords: ["stale label", "unused tag", "old label"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...idleMark(SMALL, 13.5)],
  },
  {
    slug: "tag-trend", category: "interface", subcategory: "action",
    name: "Tag trend", description: "A label with a rising line inside — a tag used more and more over time",
    tags: ["label", "trend", "popular"], family: "object",
    aliases: [], keywords: ["tag trend", "trending label", "tag usage"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...trendMark(SMALL, 13.5)],
  },
  {
    slug: "move-label", category: "interface", subcategory: "action",
    name: "Move label", description: "A label with an arrow inside — move a tag to another group",
    tags: ["label", "move", "reorganise"], family: "object",
    aliases: [], keywords: ["move label", "reassign tag", "relocate label"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), row(13.5, 9, 15), poly([[12.5, 11], [15, 13.5], [12.5, 16]])],
  },
  {
    slug: "location-trend", category: "interface", subcategory: "identity",
    name: "Location trend", description: "A location pin beside a rising line — activity growing in one place",
    tags: ["location", "trend", "growth"], family: "pin",
    aliases: [], keywords: ["location trend", "regional growth", "activity by place"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...trendMark(SMALL, 10)],
  },
  {
    slug: "move-pin", category: "interface", subcategory: "identity",
    name: "Move pin", description: "A location pin with an arrow in its head — move a pin to a new spot",
    tags: ["pin", "move", "relocate"], family: "pin",
    aliases: [], keywords: ["move pin", "relocate marker", "drag location"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), row(10, 9, 15), poly([[12.5, 7.5], [15, 10], [12.5, 12.5]])],
  },
  {
    slug: "goal-location", category: "interface", subcategory: "identity",
    name: "Goal location", description: "A location pin with a flag inside — the place you are trying to reach",
    tags: ["location", "goal", "target"], family: "pin",
    aliases: [], keywords: ["goal location", "target place", "destination goal"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...flagMark(SMALL, 10)],
  },
  {
    slug: "dormant-location", category: "interface", subcategory: "identity",
    name: "Dormant location", description: "A location pin beside a Z — a place with no recent activity, gone quiet",
    tags: ["location", "dormant", "quiet"], family: "pin",
    aliases: [], keywords: ["dormant location", "inactive place", "quiet region"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...idleMark(SMALL, 10)],
  },

  /* ── devtools & automation: runs and events ───────────────────────────────────── */

  {
    slug: "run-faster", category: "devtools", subcategory: "testing",
    name: "Run faster", description: "A run card, a double chevron under its play — speed a run up, faster execution",
    tags: ["run", "faster", "speed"], family: "window",
    aliases: [], keywords: ["run faster", "speed up job", "fast mode"],
    shapes: [...runCard(), poly([[9.5, 13.5], [12, 16], [9.5, 18.5]]), poly([[12.5, 13.5], [15, 16], [12.5, 18.5]])],
  },
  {
    slug: "run-next", category: "devtools", subcategory: "testing",
    name: "Run next", description: "A run card with an arrow under its play — start the next run in the queue",
    tags: ["run", "next", "queue"], family: "window",
    aliases: [], keywords: ["run next", "next job", "advance queue"],
    shapes: [...runCard(), row(16, 9, 15), poly([[12.5, 13.5], [15, 16], [12.5, 18.5]])],
  },
  {
    slug: "favorite-run", category: "devtools", subcategory: "testing",
    name: "Favourite run", description: "A run card with a heart under its play — a run configuration you keep coming back to",
    tags: ["run", "favourite", "heart"], family: "window",
    aliases: [], keywords: ["favourite run", "starred job", "pinned run"],
    shapes: [...runCard(), ...heartMark(SMALL, 16)],
  },
  {
    slug: "event-escalate", category: "automation", subcategory: "action",
    name: "Event escalate", description: "A lightning bolt beside a double chevron rising — an event escalated to a higher tier",
    tags: ["event", "escalate", "priority"], family: "bolt",
    aliases: [], keywords: ["escalate event", "raise priority", "event tier up"],
    shapes: [BOLT_L, ...UP_R15],
  },
  {
    slug: "event-list", category: "automation", subcategory: "trigger",
    name: "Event list", description: "A lightning bolt beside a list — the events that have fired, in order",
    tags: ["event", "list", "log"], family: "bolt",
    aliases: [], keywords: ["event list", "fired events", "trigger log"],
    shapes: [BOLT_L, row(8, 14, 22), row(12, 14, 22), row(16, 14, 22)],
  },

  /* ── analytics & cloud: goals, milestones and money ──────────────────────────── */

  {
    slug: "goal-forward", category: "analytics", subcategory: "metric",
    name: "Goal forward", description: "A trophy with a chevron in its bowl — carry a goal forward into the next period",
    tags: ["goal", "forward", "carry"], family: "trophy",
    aliases: [], keywords: ["carry goal forward", "roll over goal", "next period goal"],
    shapes: [...trophy(), poly([[11, 6], [14, 9], [11, 12]])],
  },
  {
    slug: "milestone-filter", category: "analytics", subcategory: "segment",
    name: "Milestone filter", description: "A flag flown big, a funnel on its banner — the users who reached a milestone",
    tags: ["milestone", "filter", "segment"], family: "flag",
    aliases: [], keywords: ["milestone filter", "segment by milestone", "reached milestone"],
    shapes: [...banner(), ...funnelMark(SMALL, 10)],
  },
  {
    slug: "filter-trend", category: "interface", subcategory: "action",
    name: "Filter trend", description: "A funnel with a rising line below its stem — how the filtered slice trends",
    tags: ["filter", "trend", "slice"], family: "funnel",
    aliases: [], keywords: ["filtered trend", "trend of a segment", "slice over time"],
    shapes: [funnel(), ...trendMark(SMALL, 18)],
  },
  {
    slug: "send-money", category: "cloud", subcategory: "cost",
    name: "Send money", description: "A coin with an arrow beside it — send a payment to someone else",
    tags: ["payment", "send", "transfer"], family: "object",
    aliases: [], keywords: ["send money", "make a payment", "transfer funds"],
    shapes: [...COIN_L, ...ARROW_R15],
  },
  {
    slug: "favorite-milestone", category: "analytics", subcategory: "metric",
    name: "Favourite milestone", description: "A flag beside a heart — the milestone that meant the most to the team",
    tags: ["milestone", "favourite", "heart"], family: "figure",
    aliases: [], keywords: ["favourite milestone", "starred milestone", "memorable milestone"],
    shapes: [col(6, 3, 21), poly([[6, 4], [18, 4], [18, 14], [6, 14]]), ...heartMark(SMALL, 8)],
  },
  {
    slug: "milestone-up", category: "analytics", subcategory: "metric",
    name: "Milestone up", description: "A flag flown big, a double chevron rising on its banner — a milestone raised",
    tags: ["milestone", "raise", "up"], family: "flag",
    aliases: [], keywords: ["raise milestone", "stretch milestone", "milestone increased"],
    shapes: [...banner(), poly([[10, 9.5], [12, 7.5], [14, 9.5]]), poly([[10, 12.5], [12, 10.5], [14, 12.5]])],
  },

  /* ── interface: lists ─────────────────────────────────────────────────────────── */

  {
    slug: "list-trend", category: "interface", subcategory: "file",
    name: "List trend", description: "A list beside a rising line — a list growing longer and longer over time",
    tags: ["list", "trend", "growth"], family: "text",
    aliases: [], keywords: ["list trend", "growing list", "items over time"],
    shapes: [...ROWS_LS, LINE_R],
  },
  {
    slug: "list-collapse", category: "interface", subcategory: "file",
    name: "List collapse", description: "A list beside two chevrons closing — collapse a list to its heading",
    tags: ["list", "collapse", "fold"], family: "text",
    aliases: ["list-chevrons-down-up"], keywords: ["collapse list", "fold list", "hide items"],
    shapes: [...ROWS_L, poly([[17, 7], [19.5, 9.5], [22, 7]]), poly([[17, 17], [19.5, 14.5], [22, 17]])],
  },
  {
    slug: "list-alert", category: "interface", subcategory: "file",
    name: "List alert", description: "A list beside an alert mark — a list with an item that needs attention",
    tags: ["list", "alert", "warning"], family: "text",
    aliases: [], keywords: ["list alert", "list warning", "item needs attention"],
    shapes: [...ROWS_L, ...ALERT_R],
  },

  /* ── devtools: the last marks inside brackets ─────────────────────────────────── */

  {
    slug: "page-idle", category: "interface", subcategory: "layout",
    name: "Page idle", description: "A window with a Z inside — a page nobody has visited in a while, gone quiet",
    tags: ["idle", "page", "quiet"], family: "window",
    aliases: [], keywords: ["idle page", "stale page", "unvisited page"],
    shapes: [rect(3, 2.5, 18, 19, 2), row(7, 3, 21), poly([[8.5, 10.5], [15.5, 10.5], [8.5, 17.5], [15.5, 17.5]])],
  },
  {
    slug: "protected-favorites", category: "interface", subcategory: "identity",
    name: "Protected favourites", description: "A heart beside a shield — favourites kept safe from being changed or shared",
    tags: ["favourites", "protected", "shield"], family: "shield",
    aliases: [], keywords: ["protected favourites", "guarded favourites", "favourites safety"],
    shapes: [shield(), ...heartMark(BIG, 10)],
  },
  {
    slug: "idle-block", category: "devtools", subcategory: "code",
    name: "Idle block", description: "A Z held between brackets — a block of code that never runs, unreached and dormant",
    tags: ["idle", "unused", "code"], family: "bracket",
    aliases: [], keywords: ["idle block", "unreached code", "dormant block"],
    shapes: [...brackets(), ...idleMark(SMALL, 12)],
  },
  {
    slug: "scoped-trend", category: "devtools", subcategory: "code",
    name: "Scoped trend", description: "A rising line held between brackets — a metric measured inside one scope",
    tags: ["scope", "trend", "metric"], family: "bracket",
    aliases: [], keywords: ["scoped metric", "trend within scope", "block-level trend"],
    shapes: [...brackets(), ...trendMark(SMALL, 12)],
  },

  /* ── interface: the last marks inside bubbles and windows ─────────────────────── */

  {
    slug: "chat-trend", category: "interface", subcategory: "communication",
    name: "Chat trend", description: "A speech bubble with a rising line inside — a conversation growing busier",
    tags: ["chat", "trend", "activity"], family: "bubble",
    aliases: [], keywords: ["chat trend", "conversation activity", "message volume"],
    shapes: [...BUBBLE, poly([[6, 14], [9.5, 10.5], [12, 13], [17, 8]])],
  },
  {
    slug: "play-message", category: "interface", subcategory: "communication",
    name: "Play message", description: "A speech bubble with a play button inside — play a recorded message",
    tags: ["play", "message", "audio"], family: "bubble",
    aliases: [], keywords: ["play message", "listen to message", "play voice note"],
    shapes: [...BUBBLE, poly([[9.5, 7], [9.5, 14], [13, 10.5]], true)],
  },
  {
    slug: "message-thread", category: "interface", subcategory: "communication",
    name: "Message thread", description: "A speech bubble with an indented line inside — a threaded reply",
    tags: ["thread", "reply", "message"], family: "bubble",
    aliases: ["message-square-text"], keywords: ["message thread", "threaded reply", "conversation thread"],
    shapes: [...BUBBLE, row(8, 7, 17), row(12, 10, 17)],
  },
  {
    slug: "tagged-page", category: "interface", subcategory: "layout",
    name: "Tagged page", description: "A window with a label inside — a page filed under a tag or category",
    tags: ["page", "tag", "label"], family: "window",
    aliases: [], keywords: ["tagged page", "labelled page", "page category"],
    shapes: [rect(3, 2.5, 18, 19, 2), row(7, 3, 21), poly([[7, 11], [13, 11], [16, 14], [13, 17], [7, 17]], true)],
  },
  {
    slug: "bookmarked-page", category: "interface", subcategory: "layout",
    name: "Bookmarked page", description: "A window with a bookmark inside — a page saved to come back to",
    tags: ["page", "bookmark", "saved"], family: "window",
    aliases: [], keywords: ["bookmarked page", "saved page", "page bookmark"],
    shapes: [rect(2, 2, 20, 20, 2), row(6, 2, 22), poly([[8, 10], [16, 10], [16, 17], [12, 13], [8, 17]], true)],
  },
  {
    slug: "analytics-page", category: "interface", subcategory: "layout",
    name: "Analytics page", description: "A window with a rising line inside — the analytics page of an app",
    tags: ["analytics", "page", "chart"], family: "window",
    aliases: [], keywords: ["analytics page", "stats screen", "metrics view"],
    shapes: [...WINDOW, poly([[6, 17], [9, 14], [11, 16], [14, 13], [16, 15], [18, 13]])],
  },
  {
    slug: "page-scroll", category: "interface", subcategory: "layout",
    name: "Page scroll", description: "A window with a double chevron pointing down — scroll further down the page",
    tags: ["scroll", "page", "down"], family: "window",
    aliases: [], keywords: ["scroll down", "page scroll", "more below"],
    shapes: [...WINDOW, poly([[9.5, 11], [12, 13.5], [14.5, 11]]), poly([[9.5, 15.5], [12, 18], [14.5, 15.5]])],
  },
];
