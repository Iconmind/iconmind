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
import { add, alert, BIG, boltMark, bookmarkMark, check, clockMark, coinMark, flagMark, funnelMark, heartMark, idleMark, lockMark, off, pause, playMark, remove, searchMark, shieldMark, SMALL, squareMark, tagMark, trendMark } from "../marks.ts";
import { banknote, banner, bookmark, dial, eventCard, funnel, key, padlock, runCard, trophy } from "../bodies.ts";
import type { Icon } from "../build.ts";

const LOCK_R = [rect(14, 9, 8, 7.5, 2), arc(18, 9, 2, 180, 360)];
const Z_R = poly([[15, 9.5], [20, 9.5], [15, 14.5], [20, 14.5]]);
const SQUARE_R = poly([[15, 9], [21, 9], [21, 15], [15, 15]], true);
const PLAY_R = poly([[15, 8], [15, 16], [19, 12]], true);
const TAG_R = poly([[14, 13], [19, 13], [22, 16], [19, 19], [14, 19]], true);
const FLAG_R = [col(14, 5, 21), poly([[14, 5], [22, 5], [19, 8], [22, 11], [14, 11]])];
const BOOKMARK_R = poly([[14, 7], [21, 7], [21, 17], [17.5, 13.5], [14, 17]], true);
const FUNNEL_R = poly([[15, 9], [22, 9], [20, 11], [20, 19], [17, 19], [17, 11]], true);
const LINE_R = poly([[13, 19], [16, 16], [18, 18], [22, 14]]);

export const BATCH_74: Icon[] = [
  /* ── interface: places, filters and labels ────────────────────────────────────── */

  {
    slug: "navigate", category: "interface", subcategory: "identity",
    name: "Navigate", description: "A location pin with a play in its head — start navigating to a place",
    tags: ["navigate", "directions", "go"], family: "pin",
    aliases: ["navigation"], keywords: ["navigate", "start directions", "go to place"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...playMark(SMALL, 10)],
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
    name: "Saved filter", description: "A bookmark with a funnel inside — a filter saved so it can be reused later",
    tags: ["filter", "saved", "view"], family: "ribbon",
    aliases: [], keywords: ["saved filter", "saved view", "reusable filter"],
    shapes: [bookmark(), ...funnelMark(SMALL, 9)],
  },
  {
    slug: "favorites-filter", category: "interface", subcategory: "action",
    name: "Favourites filter", description: "A funnel with a heart below its stem — only the favourites come through",
    tags: ["filter", "favourites", "heart"], family: "funnel",
    aliases: [], keywords: ["favourites only", "filter favourites", "show starred"],
    shapes: [funnel(), ...heartMark(SMALL, 18)],
  },
  {
    slug: "remove-filter", category: "interface", subcategory: "action",
    name: "Remove filter", description: "A funnel with a minus below its stem — take one filter away from the set",
    tags: ["filter", "remove", "minus"], family: "funnel",
    aliases: [], keywords: ["remove filter", "drop a filter", "filter minus"],
    shapes: [funnel(), ...remove(SMALL, 18)],
  },
  {
    slug: "filter-alert", category: "interface", subcategory: "action",
    name: "Filter alert", description: "A funnel with an alert below its stem — a filter that hides something important",
    tags: ["filter", "alert", "warning"], family: "funnel",
    aliases: [], keywords: ["filter warning", "hidden by filter", "filter alert"],
    shapes: [funnel(), ...alert(SMALL, 18)],
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
    name: "Label approved", description: "A label with a check inside — a tag that has been approved",
    tags: ["label", "approved", "check"], family: "object",
    aliases: [], keywords: ["approved label", "verified tag", "label check"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...check(SMALL, 13.5)],
  },
  {
    slug: "label-removed", category: "interface", subcategory: "action",
    name: "Label removed", description: "A label with an X inside — a tag taken off an item and removed",
    tags: ["label", "removed", "untag"], family: "object",
    aliases: [], keywords: ["remove label", "untag", "label removed"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...off(SMALL, 13.5)],
  },
  {
    slug: "locked-label", category: "interface", subcategory: "action",
    name: "Locked label", description: "A label with a padlock inside — a tag that only administrators may change",
    tags: ["label", "locked", "admin"], family: "object",
    aliases: [], keywords: ["locked label", "protected tag", "admin-only label"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...lockMark(SMALL, 13.5)],
  },

  /* ── cloud: a coin with a fate ────────────────────────────────────────────────── */

  {
    slug: "cost-filter", category: "cloud", subcategory: "cost",
    name: "Cost filter", description: "A banknote with a funnel on it — filter spending by service, project or tag",
    tags: ["cost", "filter", "spend"], family: "banknote",
    aliases: [], keywords: ["cost filter", "filter spending", "spend by service"],
    shapes: [...banknote(), ...funnelMark(SMALL, 12)],
  },
  {
    slug: "pay-to-run", category: "cloud", subcategory: "cost",
    name: "Pay to run", description: "A banknote with a play on it — a run that costs money to start",
    tags: ["pay", "run", "cost"], family: "banknote",
    aliases: [], keywords: ["pay to run", "paid execution", "billable job"],
    shapes: [...banknote(), ...playMark(SMALL, 12)],
  },
  {
    slug: "payment-stopped", category: "cloud", subcategory: "cost",
    name: "Payment stopped", description: "A banknote with a stop square on it — payments halted until further notice",
    tags: ["payment", "stopped", "halt"], family: "banknote",
    aliases: [], keywords: ["payment stopped", "billing paused", "stop payments"],
    shapes: [...banknote(), ...squareMark(SMALL, 12)],
  },
  {
    slug: "dormant-account", category: "cloud", subcategory: "cost",
    name: "Dormant account", description: "A banknote with a Z on it — an account gone quiet with no recent activity",
    tags: ["dormant", "inactive", "account"], family: "banknote",
    aliases: [], keywords: ["dormant account", "inactive billing", "sleeping account"],
    shapes: [...banknote(), ...idleMark(SMALL, 12)],
  },
  {
    slug: "price-increase", category: "cloud", subcategory: "cost",
    name: "Price increase", description: "A banknote, a double chevron rising on it — a price going up at the next renewal",
    tags: ["price", "increase", "up"], family: "banknote",
    aliases: [], keywords: ["price increase", "price hike", "cost going up"],
    shapes: [...banknote(), poly([[10, 11.5], [12, 9.5], [14, 11.5]]), poly([[10, 14.5], [12, 12.5], [14, 14.5]])],
  },

  /* ── interface: a clock with a fate ───────────────────────────────────────────── */

  {
    slug: "time-label", category: "interface", subcategory: "time",
    name: "Time label", description: "A label with a clock inside — a moment in time given a name of its own",
    tags: ["time", "label", "name"], family: "object",
    aliases: [], keywords: ["time label", "named moment", "timestamp label"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...clockMark(SMALL, 13.5)],
  },
  {
    slug: "deadline-soon", category: "interface", subcategory: "time",
    name: "Deadline soon", description: "A timer dial, a double chevron rising on its face — a deadline closing in",
    tags: ["deadline", "soon", "urgent"], family: "orbit",
    aliases: [], keywords: ["deadline soon", "due soon", "time running out"],
    shapes: [...dial(), poly([[9, 13.5], [12, 10.5], [15, 13.5]]), poly([[9, 17.5], [12, 14.5], [15, 17.5]])],
  },
  {
    slug: "timer-pause", category: "interface", subcategory: "time",
    name: "Timer pause", description: "A timer dial with a pause on its face — pause the timer without resetting it",
    tags: ["timer", "pause", "hold"], family: "orbit",
    aliases: [], keywords: ["pause timer", "hold countdown", "timer paused"],
    shapes: [...dial(), ...pause(BIG, 14)],
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
    name: "Key checkpoint", description: "An upright key, a flag in its bow — the point at which a credential is checked",
    tags: ["key", "checkpoint", "verify"], family: "key",
    aliases: [], keywords: ["credential checkpoint", "key verification point", "auth checkpoint"],
    shapes: [...key(), ...flagMark(SMALL, 8.5)],
  },
  {
    slug: "key-filter", category: "security", subcategory: "auth",
    name: "Key filter", description: "An upright key, a funnel in its bow — filter records by which credential was used",
    tags: ["key", "filter", "audit"], family: "key",
    aliases: [], keywords: ["filter by key", "credential filter", "key audit"],
    shapes: [...key(), ...funnelMark(SMALL, 8.5)],
  },
  {
    slug: "saved-key", category: "security", subcategory: "auth",
    name: "Saved key", description: "An upright key, a bookmark in its bow — a credential kept for reuse in future runs",
    tags: ["key", "saved", "reuse"], family: "key",
    aliases: [], keywords: ["saved key", "stored credential", "remembered key"],
    shapes: [...key(), ...bookmarkMark(SMALL, 8.5)],
  },
  {
    slug: "key-event", category: "security", subcategory: "auth",
    name: "Key event", description: "An upright key, a bolt in its bow — a credential used, created or revoked",
    tags: ["key", "event", "audit"], family: "key",
    aliases: [], keywords: ["key event", "credential activity", "key audit event"],
    shapes: [...key(), ...boltMark(SMALL, 8.5)],
  },
  {
    slug: "key-blocked", category: "security", subcategory: "auth",
    name: "Key blocked", description: "An upright key, a stop square in its bow — a credential blocked from any further use",
    tags: ["key", "blocked", "deny"], family: "key",
    aliases: [], keywords: ["blocked key", "denied credential", "key suspended"],
    shapes: [...key(), ...squareMark(SMALL, 8.5)],
  },
  {
    slug: "protected-checkpoint", category: "security", subcategory: "auth",
    name: "Protected checkpoint", description: "A flag flown big, a shield on its banner — a checkpoint that cannot be tampered with",
    tags: ["checkpoint", "protected", "shield"], family: "flag",
    aliases: [], keywords: ["protected checkpoint", "tamper-proof save", "guarded milestone"],
    shapes: [...banner(), ...shieldMark(SMALL, 10)],
  },
  {
    slug: "policy-label", category: "security", subcategory: "auth",
    name: "Policy label", description: "A label with a shield inside — a tag that carries a security policy with it",
    tags: ["policy", "label", "tag"], family: "object",
    aliases: [], keywords: ["policy label", "policy tag", "tag-based policy"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...shieldMark(SMALL, 13.5)],
  },
  {
    slug: "locked-trigger", category: "security", subcategory: "auth",
    name: "Locked trigger", description: "A padlock with a bolt on its body — a trigger only the right people can fire",
    tags: ["trigger", "locked", "permission"], family: "lock",
    aliases: [], keywords: ["locked trigger", "protected event", "permissioned trigger"],
    shapes: [...padlock(), ...boltMark(SMALL, 15.5)],
  },

  /* ── ai: checkpoints in training ──────────────────────────────────────────────── */

  {
    slug: "resume-checkpoint", category: "ai", subcategory: "training",
    name: "Resume checkpoint", description: "A flag flown big, a play on its banner — resume training from a checkpoint",
    tags: ["resume", "checkpoint", "training"], family: "flag",
    aliases: [], keywords: ["resume from checkpoint", "continue training", "restart run"],
    shapes: [...banner(), ...playMark(SMALL, 10)],
  },
  {
    slug: "stale-checkpoint", category: "ai", subcategory: "training",
    name: "Stale checkpoint", description: "A flag flown big, a Z on its banner — a checkpoint too old to be useful any more",
    tags: ["stale", "checkpoint", "old"], family: "flag",
    aliases: [], keywords: ["stale checkpoint", "outdated save", "old checkpoint"],
    shapes: [...banner(), ...idleMark(SMALL, 10)],
  },
  {
    slug: "add-checkpoint", category: "ai", subcategory: "training",
    name: "Add checkpoint", description: "A flag flown big, a plus on its banner — save a new checkpoint right now",
    tags: ["checkpoint", "add", "save"], family: "flag",
    aliases: [], keywords: ["add checkpoint", "save checkpoint", "new checkpoint"],
    shapes: [...banner(), ...add(SMALL, 10)],
  },
  {
    slug: "find-checkpoint", category: "ai", subcategory: "training",
    name: "Find checkpoint", description: "A flag flown big, a lens on its banner — find the checkpoint you need",
    tags: ["checkpoint", "find", "search"], family: "flag",
    aliases: [], keywords: ["find checkpoint", "search checkpoints", "locate save"],
    shapes: [...banner(), ...searchMark(SMALL, 10)],
  },

  /* ── analytics: goals qualified ───────────────────────────────────────────────── */

  {
    slug: "goal-trigger", category: "analytics", subcategory: "metric",
    name: "Goal trigger", description: "A trophy with a bolt in its bowl — an action fired when a goal is hit",
    tags: ["goal", "trigger", "event"], family: "trophy",
    aliases: [], keywords: ["goal trigger", "goal reached event", "conversion event"],
    shapes: [...trophy(), ...boltMark(SMALL, 9)],
  },
  {
    slug: "goal-label", category: "analytics", subcategory: "metric",
    name: "Goal label", description: "A trophy with a label in its bowl — a goal named so it can be found",
    tags: ["goal", "label", "name"], family: "trophy",
    aliases: [], keywords: ["goal label", "named goal", "goal tag"],
    shapes: [...trophy(), ...tagMark(SMALL, 9)],
  },
  {
    slug: "favorite-goal", category: "analytics", subcategory: "metric",
    name: "Favourite goal", description: "A trophy with a heart in its bowl — the goal that matters most",
    tags: ["goal", "favourite", "heart"], family: "trophy",
    aliases: [], keywords: ["favourite goal", "priority goal", "north star goal"],
    shapes: [...trophy(), ...heartMark(SMALL, 9)],
  },
  {
    slug: "paused-goal", category: "analytics", subcategory: "metric",
    name: "Paused goal", description: "A trophy with a Z in its bowl — a goal put on hold for now, paused until later",
    tags: ["goal", "paused", "hold"], family: "trophy",
    aliases: [], keywords: ["paused goal", "goal on hold", "deferred objective"],
    shapes: [...trophy(), ...idleMark(SMALL, 9)],
  },
  {
    slug: "saved-goal", category: "analytics", subcategory: "metric",
    name: "Saved goal", description: "A trophy with a bookmark in its bowl — a goal saved to revisit later on",
    tags: ["goal", "saved", "bookmark"], family: "trophy",
    aliases: [], keywords: ["saved goal", "bookmark goal", "goal shortlist"],
    shapes: [...trophy(), ...bookmarkMark(SMALL, 9)],
  },
  {
    slug: "goal-filter", category: "analytics", subcategory: "segment",
    name: "Goal filter", description: "A trophy with a funnel in its bowl — filter to the users who hit a goal",
    tags: ["goal", "filter", "segment"], family: "trophy",
    aliases: [], keywords: ["goal filter", "converted users", "segment by goal"],
    shapes: [...trophy(), ...funnelMark(SMALL, 9)],
  },

  /* ── automation: events qualified ─────────────────────────────────────────────── */

  {
    slug: "event-label", category: "automation", subcategory: "trigger",
    name: "Event label", description: "A label with a bolt inside — an event given a name or a type",
    tags: ["event", "label", "name"], family: "object",
    aliases: [], keywords: ["event label", "named event", "event type"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...boltMark(SMALL, 13.5)],
  },
  {
    slug: "geo-event", category: "automation", subcategory: "trigger",
    name: "Geo event", description: "A location pin with a bolt in its head — an event fired by a place",
    tags: ["event", "location", "geofence"], family: "pin",
    aliases: [], keywords: ["geo event", "location trigger", "geofence event"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...boltMark(SMALL, 10)],
  },
  {
    slug: "event-checkpoint", category: "automation", subcategory: "action",
    name: "Event checkpoint", description: "A flag flown big, a bolt on its banner — a checkpoint written when an event fires",
    tags: ["event", "checkpoint", "flag"], family: "flag",
    aliases: [], keywords: ["event checkpoint", "checkpoint on trigger", "event marker"],
    shapes: [...banner(), ...boltMark(SMALL, 10)],
  },
  {
    slug: "event-run", category: "automation", subcategory: "action",
    name: "Event run", description: "A run card with a bolt under its play — a run started by an event",
    tags: ["event", "run", "start"], family: "window",
    aliases: [], keywords: ["event-triggered run", "run on event", "triggered job"],
    shapes: [...runCard(), ...boltMark(SMALL, 16)],
  },
  {
    slug: "event-idle", category: "automation", subcategory: "condition",
    name: "Event idle", description: "An event card with a Z under its bolt — a trigger that has not fired in a while",
    tags: ["event", "idle", "quiet"], family: "window",
    aliases: [], keywords: ["idle trigger", "quiet event", "no recent events"],
    shapes: [...eventCard(), ...idleMark(SMALL, 16)],
  },

  /* ── devtools: runs qualified ─────────────────────────────────────────────────── */

  {
    slug: "run-label", category: "devtools", subcategory: "testing",
    name: "Run label", description: "A label with a play inside — a run with a name attached to it",
    tags: ["run", "label", "name"], family: "object",
    aliases: [], keywords: ["run label", "named run", "run tag"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...playMark(SMALL, 13.5)],
  },
  {
    slug: "run-checkpoint", category: "devtools", subcategory: "testing",
    name: "Run checkpoint", description: "A run card with a flag under its play — a checkpoint saved partway inside a run",
    tags: ["run", "checkpoint", "flag"], family: "window",
    aliases: [], keywords: ["run checkpoint", "mid-run save", "run milestone"],
    shapes: [...runCard(), ...flagMark(SMALL, 16)],
  },
  {
    slug: "safe-run", category: "devtools", subcategory: "testing",
    name: "Safe run", description: "A run card with a shield under its play — a run kept inside its guardrails",
    tags: ["run", "safe", "shield"], family: "window",
    aliases: [], keywords: ["safe run", "guarded execution", "protected run"],
    shapes: [...runCard(), ...shieldMark(SMALL, 16)],
  },
  {
    slug: "saved-run", category: "devtools", subcategory: "testing",
    name: "Saved run", description: "A bookmark with a play inside — a run configuration saved to reuse",
    tags: ["run", "saved", "config"], family: "ribbon",
    aliases: [], keywords: ["saved run", "run preset", "reusable run"],
    shapes: [bookmark(), ...playMark(SMALL, 9)],
  },
  {
    slug: "run-trend", category: "devtools", subcategory: "testing",
    name: "Run trend", description: "A run card with a rising line under its play — how runs are trending",
    tags: ["run", "trend", "metrics"], family: "window",
    aliases: [], keywords: ["run trend", "run duration trend", "runs over time"],
    shapes: [...runCard(), ...trendMark(SMALL, 16)],
  },
  {
    slug: "run-alert", category: "devtools", subcategory: "testing",
    name: "Run alert", description: "A play button beside an alert mark — a run that needs attention",
    tags: ["run", "alert", "warning"], family: "object",
    aliases: [], keywords: ["run alert", "run warning", "attention needed"],
    shapes: [poly([[4, 5], [4, 19], [11, 12]], true), col(18, 7, 12), disc(18, 15, 1)],
  },
];
