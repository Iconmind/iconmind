/**
 * Batch 74 — round 23 of the 1k plan: the pairing grammar, third pass. Pins,
 * funnels, tags, coins, clocks, keys, flags, targets, bolts and play buttons,
 * each qualified by the mark that changes what it means.
 *
 * Unattended round. A small clock cannot sit on the right (its hands need a
 * radius the space does not allow), so clocks always stand on the left. Every
 * name checked free before drawing.
 */
import { arc, area, col, disc, poly, raw, rect, row } from "../forms.ts";
import { SMALL, alert, bookmarkMark, heartMark, lockMark, tagMark } from "../marks.ts";
import {  } from "../bodies.ts";
import type { Icon } from "../build.ts";

const HEART = "a heart is one line, not three strokes with visible seams";
const COIN_L = [disc(6.5, 12, 4.5), col(6.5, 10.5, 13.5)];
const CLOCK_L = [disc(7.5, 12, 5.5), poly([[7.5, 9], [7.5, 12], [10, 12]])];
const KEY_L = [disc(7, 9, 4), col(7, 13, 21), row(18, 7, 10)];
const PIN_L = [disc(7, 10, 3), col(7, 13, 17)];
const FLAG_L = [col(4, 3, 21), poly([[4, 3], [13, 3], [10, 6], [13, 9], [4, 9]])];
const FUNNEL_L = poly([[3, 5], [14, 5], [10, 9], [10, 17], [7, 17], [7, 9]], true);
const TARGET_L = [disc(8, 12, 5), disc(8, 12, 2)];
const TAG_L = poly([[3, 6], [7, 6], [11, 10], [7, 14], [3, 14]], true);
const BOLT_L = poly([[10, 6], [5, 11], [9, 11], [4, 16]]);
const PLAY_L = poly([[3, 5], [3, 19], [10, 12]], true);
const LOCK_R = [rect(14, 9, 8, 7.5, 2), arc(18, 9, 2, 180, 360)];
const X_R = [poly([[16, 9.5], [21, 14.5]]), poly([[21, 9.5], [16, 14.5]])];
const Z_R = poly([[15, 9.5], [20, 9.5], [15, 14.5], [20, 14.5]]);
const SQUARE_R = poly([[15, 9], [21, 9], [21, 15], [15, 15]], true);
const PLAY_R = poly([[15, 8], [15, 16], [19, 12]], true);
const TAG_R = poly([[14, 13], [19, 13], [22, 16], [19, 19], [14, 19]], true);
const FLAG_R = [col(14, 5, 21), poly([[14, 5], [22, 5], [19, 8], [22, 11], [14, 11]])];
const BOOKMARK_R = poly([[14, 7], [21, 7], [21, 17], [17.5, 13.5], [14, 17]], true);
const FUNNEL_R = poly([[15, 9], [22, 9], [20, 11], [20, 19], [17, 19], [17, 11]], true);
const BOLT_R = poly([[21, 7], [17, 11], [20, 11], [16, 15]]);
const LINE_R = poly([[13, 19], [16, 16], [18, 18], [22, 14]]);

export const BATCH_74: Icon[] = [
  /* ── interface: places, filters and labels ────────────────────────────────────── */

  {
    slug: "navigate", category: "interface", subcategory: "identity",
    name: "Navigate", description: "A location pin beside a play button — start navigating to a place",
    tags: ["navigate", "directions", "go"], family: "pin",
    aliases: ["navigation"], keywords: ["navigate", "start directions", "go to place"],
    shapes: [...PIN_L, PLAY_R],
  },
  {
    slug: "saved-location", category: "interface", subcategory: "identity",
    name: "Saved location", description: "A location pin beside a bookmark — a place saved for later on the map",
    tags: ["saved", "location", "bookmark"], family: "pin",
    aliases: ["map-pinned"], keywords: ["saved location", "bookmark place", "saved places"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...bookmarkMark(SMALL, 10.5)],
  },
  {
    slug: "private-location", category: "interface", subcategory: "identity",
    name: "Private location", description: "A location pin beside a padlock — a place shared with no one",
    tags: ["private", "location", "lock"], family: "pin",
    aliases: [], keywords: ["private location", "hidden place", "location privacy"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...lockMark(SMALL, 10)],
  },
  {
    slug: "place-label", category: "interface", subcategory: "identity",
    name: "Place label", description: "A location pin beside a label — a place with a name of its own",
    tags: ["place", "label", "name"], family: "pin",
    aliases: [], keywords: ["place label", "named location", "custom place name"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...tagMark(SMALL, 10)],
  },
  {
    slug: "saved-filter", category: "interface", subcategory: "action",
    name: "Saved filter", description: "A funnel beside a bookmark — a filter saved so it can be reused later",
    tags: ["filter", "saved", "view"], family: "funnel",
    aliases: [], keywords: ["saved filter", "saved view", "reusable filter"],
    shapes: [FUNNEL_L, poly([[16, 8], [22, 8], [22, 16], [19, 13], [16, 16]], true)],
  },
  {
    slug: "favorites-filter", category: "interface", subcategory: "action",
    name: "Favourites filter", description: "A funnel beside a heart — show only the favourites and hide the rest",
    tags: ["filter", "favourites", "heart"], family: "funnel",
    aliases: [], keywords: ["favourites only", "filter favourites", "show starred"],
    shapes: [FUNNEL_L, raw("M16 10A2 2 0 0 1 19 10A2 2 0 0 1 22 10L19 13Z", HEART, true)],
  },
  {
    slug: "remove-filter", category: "interface", subcategory: "action",
    name: "Remove filter", description: "A funnel with a minus beside it — take one filter away from the set",
    tags: ["filter", "remove", "minus"], family: "funnel",
    aliases: [], keywords: ["remove filter", "drop a filter", "filter minus"],
    shapes: [FUNNEL_L, row(12, 16, 22)],
  },
  {
    slug: "filter-alert", category: "interface", subcategory: "action",
    name: "Filter alert", description: "A funnel beside an alert mark — a filter that hides something important",
    tags: ["filter", "alert", "warning"], family: "funnel",
    aliases: [], keywords: ["filter warning", "hidden by filter", "filter alert"],
    shapes: [FUNNEL_L, col(18, 7, 12), disc(18, 15, 1)],
  },
  {
    slug: "private-favorites", category: "interface", subcategory: "identity",
    name: "Private favourites", description: "A heart beside a padlock — favourites that nobody else is able to see",
    tags: ["favourites", "private", "lock"], family: "lock",
    aliases: [], keywords: ["private favourites", "hidden likes", "favourites privacy"],
    shapes: [rect(5, 10, 14, 11, 2), arc(12, 10, 4, 180, 360), ...heartMark(SMALL, 14)],
  },
  {
    slug: "label-approved", category: "interface", subcategory: "action",
    name: "Label approved", description: "A label with a check beside it — a tag that has been approved",
    tags: ["label", "approved", "check"], family: "tag",
    aliases: [], keywords: ["approved label", "verified tag", "label check"],
    shapes: [TAG_L, poly([[15, 13], [17.5, 15.5], [22, 11]])],
  },
  {
    slug: "label-removed", category: "interface", subcategory: "action",
    name: "Label removed", description: "A label with an X beside it — a tag taken off an item and removed",
    tags: ["label", "removed", "untag"], family: "tag",
    aliases: [], keywords: ["remove label", "untag", "label removed"],
    shapes: [TAG_L, ...X_R],
  },
  {
    slug: "locked-label", category: "interface", subcategory: "action",
    name: "Locked label", description: "A label beside a padlock — a tag that only administrators may change",
    tags: ["label", "locked", "admin"], family: "tag",
    aliases: [], keywords: ["locked label", "protected tag", "admin-only label"],
    shapes: [TAG_L, ...LOCK_R],
  },

  /* ── cloud: a coin with a fate ────────────────────────────────────────────────── */

  {
    slug: "cost-filter", category: "cloud", subcategory: "cost",
    name: "Cost filter", description: "A coin beside a funnel — filter spending by service, project or tag",
    tags: ["cost", "filter", "spend"], family: "object",
    aliases: [], keywords: ["cost filter", "filter spending", "spend by service"],
    shapes: [...COIN_L, FUNNEL_R],
  },
  {
    slug: "pay-to-run", category: "cloud", subcategory: "cost",
    name: "Pay to run", description: "A coin beside a play button — a run that costs money to start",
    tags: ["pay", "run", "cost"], family: "object",
    aliases: [], keywords: ["pay to run", "paid execution", "billable job"],
    shapes: [...COIN_L, PLAY_R],
  },
  {
    slug: "payment-stopped", category: "cloud", subcategory: "cost",
    name: "Payment stopped", description: "A coin beside a stop square — payments halted until further notice",
    tags: ["payment", "stopped", "halt"], family: "object",
    aliases: [], keywords: ["payment stopped", "billing paused", "stop payments"],
    shapes: [...COIN_L, SQUARE_R],
  },
  {
    slug: "dormant-account", category: "cloud", subcategory: "cost",
    name: "Dormant account", description: "A coin beside a Z — an account that has gone quiet with no recent activity",
    tags: ["dormant", "inactive", "account"], family: "object",
    aliases: [], keywords: ["dormant account", "inactive billing", "sleeping account"],
    shapes: [...COIN_L, Z_R],
  },
  {
    slug: "price-increase", category: "cloud", subcategory: "cost",
    name: "Price increase", description: "A coin beside a double chevron rising — a price going up at the next renewal",
    tags: ["price", "increase", "up"], family: "object",
    aliases: [], keywords: ["price increase", "price hike", "cost going up"],
    shapes: [...COIN_L, poly([[15, 13], [18.5, 9.5], [22, 13]]), poly([[15, 17.5], [18.5, 14], [22, 17.5]])],
  },

  /* ── interface: a clock with a fate ───────────────────────────────────────────── */

  {
    slug: "time-label", category: "interface", subcategory: "time",
    name: "Time label", description: "A clock beside a label — a moment in time given a name of its own",
    tags: ["time", "label", "name"], family: "clock",
    aliases: [], keywords: ["time label", "named moment", "timestamp label"],
    shapes: [...CLOCK_L, poly([[16, 13], [20, 13], [22, 15], [20, 17], [16, 17]], true)],
  },
  {
    slug: "deadline-soon", category: "interface", subcategory: "time",
    name: "Deadline soon", description: "A clock beside a double chevron rising — a deadline closing in",
    tags: ["deadline", "soon", "urgent"], family: "clock",
    aliases: [], keywords: ["deadline soon", "due soon", "time running out"],
    shapes: [...CLOCK_L, poly([[16, 13], [19, 10], [22, 13]]), poly([[16, 17.5], [19, 14.5], [22, 17.5]])],
  },
  {
    slug: "timer-pause", category: "interface", subcategory: "time",
    name: "Timer pause", description: "A clock beside a pause mark — pause the timer without resetting it",
    tags: ["timer", "pause", "hold"], family: "clock",
    aliases: [], keywords: ["pause timer", "hold countdown", "timer paused"],
    shapes: [...CLOCK_L, col(17, 9, 15), col(20.5, 9, 15)],
  },
  {
    slug: "locked-list", category: "security", subcategory: "auth",
    name: "Locked list", description: "A padlock beside a list — a list only some people may see or change",
    tags: ["locked", "list", "restricted"], family: "lock",
    aliases: [], keywords: ["locked list", "restricted list", "protected records"],
    shapes: [rect(2, 11, 10, 8, 2), arc(7, 11, 3, 180, 360), row(8, 15, 22), row(12, 15, 22), row(16, 15, 22)],
  },
  {
    slug: "key-checkpoint", category: "security", subcategory: "auth",
    name: "Key checkpoint", description: "A key beside a flag — the point at which a credential is checked",
    tags: ["key", "checkpoint", "verify"], family: "key",
    aliases: [], keywords: ["credential checkpoint", "key verification point", "auth checkpoint"],
    shapes: [...KEY_L, ...FLAG_R],
  },
  {
    slug: "key-filter", category: "security", subcategory: "auth",
    name: "Key filter", description: "A key beside a funnel — filter records by which credential was used",
    tags: ["key", "filter", "audit"], family: "key",
    aliases: [], keywords: ["filter by key", "credential filter", "key audit"],
    shapes: [...KEY_L, FUNNEL_R],
  },
  {
    slug: "saved-key", category: "security", subcategory: "auth",
    name: "Saved key", description: "A key beside a bookmark — a credential kept for reuse in future runs",
    tags: ["key", "saved", "reuse"], family: "key",
    aliases: [], keywords: ["saved key", "stored credential", "remembered key"],
    shapes: [...KEY_L, BOOKMARK_R],
  },
  {
    slug: "key-event", category: "security", subcategory: "auth",
    name: "Key event", description: "A key beside a lightning bolt — a credential used, created or revoked",
    tags: ["key", "event", "audit"], family: "key",
    aliases: [], keywords: ["key event", "credential activity", "key audit event"],
    shapes: [...KEY_L, BOLT_R],
  },
  {
    slug: "key-blocked", category: "security", subcategory: "auth",
    name: "Key blocked", description: "A key beside a stop square — a credential blocked from any further use",
    tags: ["key", "blocked", "deny"], family: "key",
    aliases: [], keywords: ["blocked key", "denied credential", "key suspended"],
    shapes: [...KEY_L, SQUARE_R],
  },
  {
    slug: "protected-checkpoint", category: "security", subcategory: "auth",
    name: "Protected checkpoint", description: "A flag beside a shield — a checkpoint that cannot be tampered with",
    tags: ["checkpoint", "protected", "shield"], family: "flag",
    aliases: [], keywords: ["protected checkpoint", "tamper-proof save", "guarded milestone"],
    shapes: [...FLAG_L, poly([[16, 11], [22, 11], [22, 16], [19, 19], [16, 16]], true)],
  },
  {
    slug: "policy-label", category: "security", subcategory: "auth",
    name: "Policy label", description: "A label beside a shield — a tag that carries a security policy with it",
    tags: ["policy", "label", "tag"], family: "tag",
    aliases: [], keywords: ["policy label", "policy tag", "tag-based policy"],
    shapes: [TAG_L, poly([[16, 9], [22, 9], [22, 14.5], [19, 17.5], [16, 14.5]], true)],
  },
  {
    slug: "locked-trigger", category: "security", subcategory: "auth",
    name: "Locked trigger", description: "A lightning bolt beside a padlock — a trigger only the right people can fire",
    tags: ["trigger", "locked", "permission"], family: "bolt",
    aliases: [], keywords: ["locked trigger", "protected event", "permissioned trigger"],
    shapes: [BOLT_L, ...LOCK_R],
  },

  /* ── ai: checkpoints in training ──────────────────────────────────────────────── */

  {
    slug: "resume-checkpoint", category: "ai", subcategory: "training",
    name: "Resume checkpoint", description: "A flag beside a play button — resume training from a checkpoint",
    tags: ["resume", "checkpoint", "training"], family: "flag",
    aliases: [], keywords: ["resume from checkpoint", "continue training", "restart run"],
    shapes: [...FLAG_L, poly([[16, 8], [16, 16], [20, 12]], true)],
  },
  {
    slug: "stale-checkpoint", category: "ai", subcategory: "training",
    name: "Stale checkpoint", description: "A flag beside a Z — a checkpoint too old to be useful any more",
    tags: ["stale", "checkpoint", "old"], family: "flag",
    aliases: [], keywords: ["stale checkpoint", "outdated save", "old checkpoint"],
    shapes: [...FLAG_L, poly([[16, 10], [21, 10], [16, 15], [21, 15]])],
  },
  {
    slug: "add-checkpoint", category: "ai", subcategory: "training",
    name: "Add checkpoint", description: "A flag with a plus beside it — save a new checkpoint right now, before going on",
    tags: ["checkpoint", "add", "save"], family: "flag",
    aliases: [], keywords: ["add checkpoint", "save checkpoint", "new checkpoint"],
    shapes: [...FLAG_L, row(14, 16, 22), col(19, 11, 17)],
  },
  {
    slug: "find-checkpoint", category: "ai", subcategory: "training",
    name: "Find checkpoint", description: "A flag beside a magnifying glass — find the checkpoint you need",
    tags: ["checkpoint", "find", "search"], family: "flag",
    aliases: [], keywords: ["find checkpoint", "search checkpoints", "locate save"],
    shapes: [...FLAG_L, disc(18.5, 13.5, 3.5), poly([[16, 16], [14, 18]])],
  },

  /* ── analytics: goals qualified ───────────────────────────────────────────────── */

  {
    slug: "goal-trigger", category: "analytics", subcategory: "metric",
    name: "Goal trigger", description: "A target beside a lightning bolt — an action fired when a goal is hit",
    tags: ["goal", "trigger", "event"], family: "object",
    aliases: [], keywords: ["goal trigger", "goal reached event", "conversion event"],
    shapes: [...TARGET_L, BOLT_R],
  },
  {
    slug: "goal-label", category: "analytics", subcategory: "metric",
    name: "Goal label", description: "A target beside a label — a goal with a name attached so it can be found",
    tags: ["goal", "label", "name"], family: "object",
    aliases: [], keywords: ["goal label", "named goal", "goal tag"],
    shapes: [...TARGET_L, poly([[16, 13], [20, 13], [22, 15], [20, 17], [16, 17]], true)],
  },
  {
    slug: "favorite-goal", category: "analytics", subcategory: "metric",
    name: "Favourite goal", description: "A target beside a heart — the goal that matters most, marked as a favourite",
    tags: ["goal", "favourite", "heart"], family: "object",
    aliases: [], keywords: ["favourite goal", "priority goal", "north star goal"],
    shapes: [...TARGET_L, raw("M16 10A2 2 0 0 1 19 10A2 2 0 0 1 22 10L19 13Z", HEART, true)],
  },
  {
    slug: "paused-goal", category: "analytics", subcategory: "metric",
    name: "Paused goal", description: "A target beside a Z — a goal put on hold for now, paused until later",
    tags: ["goal", "paused", "hold"], family: "object",
    aliases: [], keywords: ["paused goal", "goal on hold", "deferred objective"],
    shapes: [...TARGET_L, poly([[16, 9.5], [21, 9.5], [16, 14.5], [21, 14.5]])],
  },
  {
    slug: "saved-goal", category: "analytics", subcategory: "metric",
    name: "Saved goal", description: "A target beside a bookmark — a goal saved to revisit later on",
    tags: ["goal", "saved", "bookmark"], family: "object",
    aliases: [], keywords: ["saved goal", "bookmark goal", "goal shortlist"],
    shapes: [...TARGET_L, poly([[16, 7], [22, 7], [22, 17], [19, 14], [16, 17]], true)],
  },
  {
    slug: "goal-filter", category: "analytics", subcategory: "segment",
    name: "Goal filter", description: "A funnel beside a target — filter to the users who hit a goal",
    tags: ["goal", "filter", "segment"], family: "funnel",
    aliases: [], keywords: ["goal filter", "converted users", "segment by goal"],
    shapes: [FUNNEL_L, disc(18, 13, 4), disc(18, 13, 1)],
  },

  /* ── automation: events qualified ─────────────────────────────────────────────── */

  {
    slug: "event-label", category: "automation", subcategory: "trigger",
    name: "Event label", description: "A lightning bolt beside a label — an event given a name or a type",
    tags: ["event", "label", "name"], family: "bolt",
    aliases: [], keywords: ["event label", "named event", "event type"],
    shapes: [BOLT_L, TAG_R],
  },
  {
    slug: "geo-event", category: "automation", subcategory: "trigger",
    name: "Geo event", description: "A lightning bolt beside a location pin — an event fired by a place",
    tags: ["event", "location", "geofence"], family: "bolt",
    aliases: [], keywords: ["geo event", "location trigger", "geofence event"],
    shapes: [BOLT_L, disc(18, 10, 3), col(18, 13, 17)],
  },
  {
    slug: "event-checkpoint", category: "automation", subcategory: "action",
    name: "Event checkpoint", description: "A lightning bolt beside a flag — a checkpoint written when an event fires",
    tags: ["event", "checkpoint", "flag"], family: "bolt",
    aliases: [], keywords: ["event checkpoint", "checkpoint on trigger", "event marker"],
    shapes: [BOLT_L, ...FLAG_R],
  },
  {
    slug: "event-run", category: "automation", subcategory: "action",
    name: "Event run", description: "A lightning bolt beside a play button — a run started by an event",
    tags: ["event", "run", "start"], family: "bolt",
    aliases: [], keywords: ["event-triggered run", "run on event", "triggered job"],
    shapes: [BOLT_L, PLAY_R],
  },
  {
    slug: "event-idle", category: "automation", subcategory: "condition",
    name: "Event idle", description: "A lightning bolt beside a Z — a trigger that has not fired in a while",
    tags: ["event", "idle", "quiet"], family: "bolt",
    aliases: [], keywords: ["idle trigger", "quiet event", "no recent events"],
    shapes: [BOLT_L, Z_R],
  },

  /* ── devtools: runs qualified ─────────────────────────────────────────────────── */

  {
    slug: "run-label", category: "devtools", subcategory: "testing",
    name: "Run label", description: "A play button beside a label — a run with a name attached to it",
    tags: ["run", "label", "name"], family: "object",
    aliases: [], keywords: ["run label", "named run", "run tag"],
    shapes: [PLAY_L, TAG_R],
  },
  {
    slug: "run-checkpoint", category: "devtools", subcategory: "testing",
    name: "Run checkpoint", description: "A play button beside a flag — a checkpoint saved partway inside a run",
    tags: ["run", "checkpoint", "flag"], family: "object",
    aliases: [], keywords: ["run checkpoint", "mid-run save", "run milestone"],
    shapes: [PLAY_L, ...FLAG_R],
  },
  {
    slug: "safe-run", category: "devtools", subcategory: "testing",
    name: "Safe run", description: "A play button beside a shield — a run kept inside its guardrails from start to end",
    tags: ["run", "safe", "shield"], family: "object",
    aliases: [], keywords: ["safe run", "guarded execution", "protected run"],
    shapes: [PLAY_L, poly([[13, 11], [22, 11], [22, 16.5], [17.5, 21], [13, 16.5]], true)],
  },
  {
    slug: "saved-run", category: "devtools", subcategory: "testing",
    name: "Saved run", description: "A play button beside a bookmark — a run configuration saved to reuse",
    tags: ["run", "saved", "config"], family: "object",
    aliases: [], keywords: ["saved run", "run preset", "reusable run"],
    shapes: [PLAY_L, BOOKMARK_R],
  },
  {
    slug: "run-trend", category: "devtools", subcategory: "testing",
    name: "Run trend", description: "A play button beside a rising line — how runs are trending in duration or count",
    tags: ["run", "trend", "metrics"], family: "object",
    aliases: [], keywords: ["run trend", "run duration trend", "runs over time"],
    shapes: [PLAY_L, LINE_R],
  },
  {
    slug: "run-alert", category: "devtools", subcategory: "testing",
    name: "Run alert", description: "A play button beside an alert mark — a run that needs attention",
    tags: ["run", "alert", "warning"], family: "object",
    aliases: [], keywords: ["run alert", "run warning", "attention needed"],
    shapes: [poly([[4, 5], [4, 19], [11, 12]], true), col(18, 7, 12), disc(18, 15, 1)],
  },
];
