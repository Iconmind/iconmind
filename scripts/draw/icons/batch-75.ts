/**
 * Batch 75 — round 24 of the 1k plan: the pairing grammar, fourth pass.
 * Locks, lenses, bookmarks, hearts, shields, flags, targets and bolts on the
 * left; a mark on the right; a few marks placed inside brackets, bubbles and
 * windows.
 *
 * Unattended round. The narrow lock (nine wide, shackle radius two) exists so
 * a four-radius target can sit beside it with a full three-unit gap. Every
 * name checked free before drawing.
 */
import { arc, area, col, disc, poly, raw, rect, row } from "../forms.ts";
import { banner, bookmark, dial, funnel, key, machine, padlock, ring, shield } from "../bodies.ts";
import { add, alert, BIG, bookmarkMark, check, flagMark, funnelMark, heartMark, idleMark, lockMark, off, playMark, remove, SMALL, tagMark, trendMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const HEART = "a heart is one line, not three strokes with visible seams";
const BR_L = poly([[7, 3], [3, 3], [3, 21], [7, 21]]);
const BR_R = poly([[17, 3], [21, 3], [21, 21], [17, 21]]);
const BUBBLE = [rect(3, 3, 18, 15, 2), poly([[7, 18], [7, 21], [10, 18]])];
const WINDOW = [rect(3, 3, 18, 18, 2), row(8, 3, 21)];
const WINDOW_T = [rect(3, 2.5, 18, 19, 2), row(7, 3, 21)];
const LOCK_LN = [rect(2, 11, 9, 8, 2), arc(6.5, 11, 2, 180, 360)];
const PLAY_L = poly([[3, 5], [3, 19], [10, 12]], true);
const BOLT_L = poly([[10, 6], [5, 11], [9, 11], [4, 16]]);
const TARGET_L = [disc(8, 12, 5), disc(8, 12, 2)];
const COIN_L = [disc(6.5, 12, 4.5), col(6.5, 10.5, 13.5)];
const ROWS_L = [row(6, 3, 14), row(11, 3, 14), row(16, 3, 14)];
const TARGET_R = [disc(18, 13, 4), disc(18, 13, 1)];
const LENS_R = [disc(17.5, 10, 3.5), poly([[20, 12.5], [22, 14.5]])];
const BOOKMARK_R = poly([[14, 7], [21, 7], [21, 17], [17.5, 13.5], [14, 17]], true);
const TAG_R = poly([[14, 13], [19, 13], [22, 16], [19, 19], [14, 19]], true);
const MINUS_R = row(12, 16, 22);
const PLUS_R = [row(12, 16, 22), col(19, 9, 15)];
const Z_R = poly([[15, 9.5], [20, 9.5], [15, 14.5], [20, 14.5]]);
const CHECK_R = poly([[15, 13], [17.5, 15.5], [22, 11]]);
const UP_R = [poly([[16, 13], [19, 10], [22, 13]]), poly([[16, 17.5], [19, 14.5], [22, 17.5]])];
const FLAG_R = [col(14, 5, 21), poly([[14, 5], [22, 5], [19, 8], [22, 11], [14, 11]])];

export const BATCH_75: Icon[] = [
  /* ── security: locks and shields ──────────────────────────────────────────────── */

  {
    slug: "locked-goal", category: "security", subcategory: "auth",
    name: "Locked goal", description: "A padlock beside a target — a goal that cannot be changed once set",
    tags: ["goal", "locked", "fixed"], family: "lock",
    aliases: [], keywords: ["locked goal", "fixed objective", "immutable target"],
    shapes: [...LOCK_LN, ...TARGET_R],
  },
  {
    slug: "private-search", category: "security", subcategory: "auth",
    name: "Private search", description: "A magnifying glass with a padlock inside — a search nobody else can see",
    tags: ["search", "private", "lock"], family: "magnifier",
    aliases: [], keywords: ["private search", "confidential query", "search privacy"],
    shapes: [disc(12, 10, 6.5), poly([[16.5, 14.5], [21, 19]]), ...lockMark(SMALL, 9)],
  },
  {
    slug: "private-bookmark", category: "security", subcategory: "auth",
    name: "Private bookmark", description: "A bookmark with a padlock inside — a bookmark hidden from everyone but you",
    tags: ["bookmark", "private", "lock"], family: "ribbon",
    aliases: [], keywords: ["private bookmark", "hidden bookmark", "secret save"],
    shapes: [bookmark(), ...lockMark(SMALL, 8.5)],
  },
  {
    slug: "locked-filter", category: "security", subcategory: "auth",
    name: "Locked filter", description: "A padlock with a funnel on its body — a filter that users cannot remove or change",
    tags: ["filter", "locked", "enforced"], family: "lock",
    aliases: [], keywords: ["locked filter", "enforced filter", "mandatory filter"],
    shapes: [...padlock(), ...funnelMark(SMALL, 15.5)],
  },
  {
    slug: "lock-alert", category: "security", subcategory: "auth",
    name: "Lock alert", description: "A padlock with an alert on its body — a lock that needs attention",
    tags: ["lock", "alert", "warning"], family: "lock",
    aliases: [], keywords: ["lock alert", "lock warning", "lock issue"],
    shapes: [...padlock(), ...alert(SMALL, 15.5)],
  },
  {
    slug: "run-scan", category: "security", subcategory: "ai-security",
    name: "Run scan", description: "A shield with a play inside — start a security scan right now",
    tags: ["scan", "run", "sweep"], family: "shield",
    aliases: [], keywords: ["run scan", "start security scan", "trigger scan"],
    shapes: [shield(), ...playMark(SMALL, 11)],
  },
  {
    slug: "protected-goal", category: "security", subcategory: "auth",
    name: "Protected goal", description: "A shield with a flag inside — a goal guarded from interference or tampering",
    tags: ["goal", "protected", "shield"], family: "shield",
    aliases: [], keywords: ["protected goal", "guarded objective", "goal safety"],
    shapes: [shield(), ...flagMark(SMALL, 11)],
  },
  {
    slug: "key-share", category: "security", subcategory: "auth",
    name: "Key share", description: "An upright key, an arrow in its bow — share a credential with someone else",
    tags: ["key", "share", "send"], family: "key",
    aliases: [], keywords: ["share key", "send credential", "key handoff"],
    shapes: [...key(), row(8.5, 9, 15), poly([[12.5, 6], [15, 8.5], [12.5, 11]])],
  },

  /* ── interface: searches, saves and likes ─────────────────────────────────────── */

  {
    slug: "search-trend", category: "interface", subcategory: "action",
    name: "Search trend", description: "A magnifying glass with a rising line inside — what people search for more and more",
    tags: ["search", "trend", "popular"], family: "magnifier",
    aliases: [], keywords: ["search trend", "trending searches", "query volume"],
    shapes: [disc(12, 10, 6.5), poly([[16.5, 14.5], [21, 19]]), ...trendMark(SMALL, 9)],
  },
  {
    slug: "add-search", category: "interface", subcategory: "action",
    name: "Add search", description: "A magnifying glass with a plus inside — save a new search",
    tags: ["search", "add", "save"], family: "magnifier",
    aliases: [], keywords: ["add search", "new saved search", "create search"],
    shapes: [disc(12, 10, 6.5), poly([[16.5, 14.5], [21, 19]]), ...add(SMALL, 9)],
  },
  {
    slug: "search-alert", category: "interface", subcategory: "action",
    name: "Search alert", description: "A magnifying glass with an alert inside — be told when a search finds something new",
    tags: ["search", "alert", "notify"], family: "magnifier",
    aliases: [], keywords: ["search alert", "saved search notification", "new results alert"],
    shapes: [disc(12, 10, 6.5), poly([[16.5, 14.5], [21, 19]]), ...alert(SMALL, 9)],
  },
  {
    slug: "bookmark-label", category: "interface", subcategory: "file",
    name: "Bookmark label", description: "A label with a bookmark inside — a bookmark filed under a tag or a folder",
    tags: ["bookmark", "label", "tag"], family: "object",
    aliases: [], keywords: ["bookmark label", "tagged bookmark", "bookmark folder"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...bookmarkMark(SMALL, 13.5)],
  },
  {
    slug: "bookmark-search", category: "interface", subcategory: "file",
    name: "Bookmark search", description: "A bookmark beside a magnifying glass — search your bookmarks",
    tags: ["bookmark", "search", "find"], family: "bookmark",
    aliases: [], keywords: ["search bookmarks", "find saved", "bookmark search"],
    shapes: [poly([[3, 5], [11, 5], [11, 19], [7, 15], [3, 19]], true), ...LENS_R],
  },
  {
    slug: "saved-policy", category: "interface", subcategory: "file",
    name: "Saved policy", description: "A policy sheet with a bookmark — a policy saved for reuse as a template",
    tags: ["policy", "saved", "shield"], family: "page",
    aliases: [], keywords: ["saved policy", "policy template", "reusable policy"],
    shapes: [rect(4, 3, 16, 18, 2), row(8, 7, 17), ...bookmarkMark(SMALL, 14.5)],
  },
  {
    slug: "liked", category: "interface", subcategory: "identity",
    name: "Liked", description: "A heart in a round button — something you liked, marked as such",
    tags: ["like", "heart", "check"], family: "orbit",
    aliases: [], keywords: ["liked", "marked as liked", "favourite confirmed"],
    shapes: [ring(), ...heartMark()],
  },
  {
    slug: "favorite-label", category: "interface", subcategory: "identity",
    name: "Favourite label", description: "A heart beside a label — favourites grouped together under a name",
    tags: ["favourite", "label", "group"], family: "object",
    aliases: [], keywords: ["favourite label", "favourites group", "collection name"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...heartMark(SMALL, 13.5)],
  },
  {
    slug: "tag-alert", category: "interface", subcategory: "action",
    name: "Tag alert", description: "A label with an alert inside — a tag that needs attention from someone",
    tags: ["tag", "alert", "warning"], family: "object",
    aliases: [], keywords: ["tag alert", "label warning", "tag issue"],
    shapes: [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), ...alert(SMALL, 13.5)],
  },
  {
    slug: "apply-filter", category: "interface", subcategory: "action",
    name: "Apply filter", description: "A funnel, a double chevron pressing below its stem — put the filter into effect",
    tags: ["filter", "apply", "go"], family: "funnel",
    aliases: [], keywords: ["apply filter", "run filter", "filter now"],
    shapes: [funnel(), poly([[10, 16], [12, 18], [14, 16]]), poly([[10, 19], [12, 21], [14, 19]])],
  },
  {
    slug: "add-location", category: "interface", subcategory: "identity",
    name: "Add location", description: "A location pin with a plus beside it — add a new place to the map",
    tags: ["location", "add", "new"], family: "pin",
    aliases: ["map-pin-add"], keywords: ["add location", "new place", "add address"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...add(SMALL, 10)],
  },
  {
    slug: "location-removed", category: "interface", subcategory: "identity",
    name: "Location removed", description: "A location pin with an X beside it — a place taken off the list",
    tags: ["location", "removed", "delete"], family: "pin",
    aliases: ["map-pin-off"], keywords: ["remove location", "delete place", "location removed"],
    shapes: [area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits"), ...off(SMALL, 10)],
  },
  {
    slug: "archived-list", category: "interface", subcategory: "file",
    name: "Archived list", description: "A list beside a Z — a list put to rest in the archive, out of the way",
    tags: ["archive", "list", "inactive"], family: "text",
    aliases: [], keywords: ["archived list", "inactive list", "list archive"],
    shapes: [...ROWS_L, poly([[17, 8.5], [22, 8.5], [17, 13.5], [22, 13.5]])],
  },

  /* ── ai: checkpoints and cores ────────────────────────────────────────────────── */

  {
    slug: "labelled-checkpoint", category: "ai", subcategory: "training",
    name: "Labelled checkpoint", description: "A flag flown big, a label on its banner — a checkpoint named so it can be found",
    tags: ["checkpoint", "label", "name"], family: "flag",
    aliases: [], keywords: ["labelled checkpoint", "named checkpoint", "checkpoint tag"],
    shapes: [...banner(), ...tagMark(SMALL, 10)],
  },
  {
    slug: "next-milestone", category: "ai", subcategory: "training",
    name: "Next milestone", description: "A flag flown big, a double chevron on its banner — on to the next milestone",
    tags: ["milestone", "next", "arrow"], family: "flag",
    aliases: [], keywords: ["next milestone", "advance milestone", "next checkpoint"],
    shapes: [...banner(), poly([[10.5, 7.5], [13, 10], [10.5, 12.5]]), poly([[13.5, 7.5], [16, 10], [13.5, 12.5]])],
  },
  {
    slug: "checkpoint-alert", category: "ai", subcategory: "training",
    name: "Checkpoint alert", description: "A flag flown big, an alert on its banner — a checkpoint that needs attention",
    tags: ["checkpoint", "alert", "warning"], family: "flag",
    aliases: [], keywords: ["checkpoint alert", "checkpoint warning", "save issue"],
    shapes: [...banner(), ...alert(SMALL, 10)],
  },
  {
    slug: "remove-checkpoint", category: "ai", subcategory: "training",
    name: "Remove checkpoint", description: "A flag flown big, a minus on its banner — delete a checkpoint you no longer need",
    tags: ["checkpoint", "remove", "delete"], family: "flag",
    aliases: [], keywords: ["remove checkpoint", "delete checkpoint", "prune saves"],
    shapes: [...banner(), ...remove(SMALL, 10)],
  },
  {
    slug: "model-idle", category: "ai", subcategory: "model",
    name: "Model idle", description: "A model core beside a Z — a model loaded into memory but doing nothing right now",
    tags: ["idle", "waiting", "model"], family: "machine",
    aliases: [], keywords: ["idle model", "model waiting", "warm but idle"],
    shapes: [machine(), ...idleMark()],
  },
  {
    slug: "model-message", category: "ai", subcategory: "inference",
    name: "Model message", description: "A speech bubble with a model core inside — a message written by the model",
    tags: ["message", "model", "reply"], family: "bubble",
    aliases: [], keywords: ["model message", "model reply", "generated message"],
    shapes: [...BUBBLE, poly([[12, 7.5], [15, 10.5], [12, 13.5], [9, 10.5]], true)],
  },

  /* ── devtools: runs and blocks ────────────────────────────────────────────────── */

  {
    slug: "run-idle", category: "devtools", subcategory: "testing",
    name: "Run idle", description: "A play button beside a Z — a runner with nothing to do right now",
    tags: ["run", "idle", "waiting"], family: "object",
    aliases: [], keywords: ["idle runner", "runner waiting", "no jobs"],
    shapes: [PLAY_L, Z_R],
  },
  {
    slug: "add-run", category: "devtools", subcategory: "testing",
    name: "Add run", description: "A play button with a plus beside it — queue another run in the list",
    tags: ["run", "add", "queue"], family: "object",
    aliases: [], keywords: ["add run", "queue run", "new job"],
    shapes: [PLAY_L, ...PLUS_R],
  },
  {
    slug: "run-goal", category: "devtools", subcategory: "testing",
    name: "Run goal", description: "A play button beside a target — what a run is trying to achieve",
    tags: ["run", "goal", "target"], family: "object",
    aliases: [], keywords: ["run goal", "job objective", "run target"],
    shapes: [PLAY_L, ...TARGET_R],
  },
  {
    slug: "filter-run", category: "devtools", subcategory: "testing",
    name: "Filter run", description: "A funnel with a play below its stem — run only what the filter selects",
    tags: ["filter", "run", "subset"], family: "funnel",
    aliases: [], keywords: ["filtered run", "run subset", "run matching tests"],
    shapes: [funnel(), ...playMark(SMALL, 18)],
  },
  {
    slug: "collapse-block", category: "devtools", subcategory: "editor",
    name: "Collapse block", description: "Two chevrons closing inside brackets — fold a block of code out of view",
    tags: ["collapse", "fold", "code"], family: "bracket",
    aliases: [], keywords: ["collapse block", "fold code", "code folding"],
    shapes: [BR_L, BR_R, poly([[9, 7], [12, 10], [15, 7]]), poly([[9, 17], [12, 14], [15, 17]])],
  },
  {
    slug: "labelled-block", category: "devtools", subcategory: "code",
    name: "Labelled block", description: "A label held between brackets — a block of code with a name or a region marker",
    tags: ["label", "block", "code"], family: "bracket",
    aliases: [], keywords: ["labelled block", "named block", "code region"],
    shapes: [BR_L, BR_R, poly([[8.5, 9], [13, 9], [16, 12], [13, 15], [8.5, 15]], true)],
  },
  {
    slug: "block-alert", category: "devtools", subcategory: "code",
    name: "Block alert", description: "An alert mark held between brackets — a block of code that needs attention",
    tags: ["alert", "block", "code"], family: "bracket",
    aliases: [], keywords: ["block alert", "code warning", "flagged block"],
    shapes: [BR_L, BR_R, col(12, 7, 13), disc(12, 16, 1)],
  },

  /* ── automation: events ───────────────────────────────────────────────────────── */

  {
    slug: "saved-event", category: "automation", subcategory: "trigger",
    name: "Saved event", description: "A lightning bolt beside a bookmark — an event kept for later",
    tags: ["event", "saved", "bookmark"], family: "bolt",
    aliases: [], keywords: ["saved event", "bookmark event", "event kept"],
    shapes: [BOLT_L, BOOKMARK_R],
  },
  {
    slug: "event-forward", category: "automation", subcategory: "action",
    name: "Event forward", description: "A lightning bolt with an arrow beside it — an event passed on to the next handler",
    tags: ["event", "forward", "relay"], family: "bolt",
    aliases: [], keywords: ["forward event", "relay event", "pass event on"],
    shapes: [BOLT_L, row(12, 15, 22), poly([[19.5, 9.5], [22, 12], [19.5, 14.5]])],
  },
  {
    slug: "event-alert", category: "automation", subcategory: "condition",
    name: "Event alert", description: "A lightning bolt beside an alert mark — an event that raised a warning",
    tags: ["event", "alert", "warning"], family: "bolt",
    aliases: [], keywords: ["event alert", "event warning", "trigger alert"],
    shapes: [BOLT_L, col(17, 7, 12), disc(17, 15, 1)],
  },
  {
    slug: "remove-trigger", category: "automation", subcategory: "trigger",
    name: "Remove trigger", description: "A lightning bolt with a minus beside it — delete a trigger from the automation",
    tags: ["trigger", "remove", "delete"], family: "bolt",
    aliases: [], keywords: ["remove trigger", "delete trigger", "disable event"],
    shapes: [BOLT_L, row(12, 15, 22)],
  },

  /* ── analytics & cloud ────────────────────────────────────────────────────────── */

  {
    slug: "raise-goal", category: "analytics", subcategory: "metric",
    name: "Raise goal", description: "A target with a double chevron rising beside it — set the goal higher",
    tags: ["goal", "raise", "increase"], family: "object",
    aliases: [], keywords: ["raise goal", "increase target", "stretch goal"],
    shapes: [...TARGET_L, ...UP_R],
  },
  {
    slug: "remove-goal", category: "analytics", subcategory: "metric",
    name: "Remove goal", description: "A target with a minus beside it — drop a goal from the list of objectives",
    tags: ["goal", "remove", "delete"], family: "object",
    aliases: [], keywords: ["remove goal", "delete objective", "drop target"],
    shapes: [...TARGET_L, MINUS_R],
  },
  {
    slug: "paid-milestone", category: "cloud", subcategory: "cost",
    name: "Paid milestone", description: "A coin beside a flag — a milestone that releases a payment when it is reached",
    tags: ["milestone", "payment", "flag"], family: "object",
    aliases: [], keywords: ["paid milestone", "milestone payment", "payment on delivery"],
    shapes: [...COIN_L, ...FLAG_R],
  },
  {
    slug: "favorite-bookmark", category: "interface", subcategory: "file",
    name: "Favourite bookmark", description: "A heart beside a bookmark — a saved item you love and keep coming back to",
    tags: ["favourite", "bookmark", "heart"], family: "ribbon",
    aliases: [], keywords: ["favourite bookmark", "loved bookmark", "starred save"],
    shapes: [bookmark(), ...heartMark(BIG, 10)],
  },
  {
    slug: "time-alert", category: "interface", subcategory: "time",
    name: "Time alert", description: "A timer dial with an alert on its face — a time-based warning that something is due",
    tags: ["time", "alert", "warning"], family: "orbit",
    aliases: ["clock-alert"], keywords: ["time alert", "time warning", "running late"],
    shapes: [...dial(), ...alert(BIG, 14)],
  },

  /* ── interface: bubbles and windows ───────────────────────────────────────────── */

  {
    slug: "secret-message", category: "interface", subcategory: "communication",
    name: "Secret message", description: "A speech bubble with a key inside — a message only its key can open",
    tags: ["secret", "key", "message"], family: "bubble",
    aliases: [], keywords: ["secret message", "encrypted note", "key-protected message"],
    shapes: [...BUBBLE, disc(12, 9, 3), col(12, 12, 15), row(14, 12, 14.5)],
  },
  {
    slug: "filtered-chat", category: "interface", subcategory: "communication",
    name: "Filtered chat", description: "A speech bubble with a funnel inside — a conversation with a filter on",
    tags: ["filter", "chat", "narrow"], family: "bubble",
    aliases: [], keywords: ["filtered conversation", "chat filter", "narrow messages"],
    shapes: [rect(2, 2, 20, 16, 2), poly([[6, 18], [6, 21], [9, 18]]), poly([[7.5, 6], [16.5, 6], [13.5, 9], [13.5, 14], [10.5, 14], [10.5, 9]], true)],
  },
  {
    slug: "landing-page", category: "interface", subcategory: "layout",
    name: "Landing page", description: "A window with a flag inside — the page a visitor lands on first",
    tags: ["landing", "page", "flag"], family: "window",
    aliases: [], keywords: ["landing page", "entry page", "campaign page"],
    shapes: [rect(2, 2, 20, 20, 2), row(6, 2, 22), col(9, 10, 18), poly([[9, 10], [16, 10], [14, 12], [16, 14], [9, 14]])],
  },
  {
    slug: "filtered-view", category: "interface", subcategory: "layout",
    name: "Filtered view", description: "A window with a funnel inside — a view with a filter applied",
    tags: ["filter", "view", "page"], family: "window",
    aliases: [], keywords: ["filtered view", "view with filter", "narrowed page"],
    shapes: [...WINDOW_T, poly([[7, 10], [17, 10], [13.5, 13.5], [13.5, 18.5], [10.5, 18.5], [10.5, 13.5]], true)],
  },
  {
    slug: "favorite-page", category: "interface", subcategory: "layout",
    name: "Favourite page", description: "A window with a heart inside — a page marked as a favourite for quick return",
    tags: ["favourite", "page", "heart"], family: "window",
    aliases: [], keywords: ["favourite page", "starred page", "pinned favourite"],
    shapes: [...WINDOW, raw("M8 13A2 2 0 0 1 12 13A2 2 0 0 1 16 13L12 17Z", HEART, true)],
  },
  {
    slug: "page-verified", category: "interface", subcategory: "layout",
    name: "Page verified", description: "A window with a check inside — a page that passed its checks",
    tags: ["verified", "page", "check"], family: "window",
    aliases: [], keywords: ["page verified", "page ok", "checks passed"],
    shapes: [...WINDOW, poly([[8, 14], [11, 17], [16, 12]])],
  },
  {
    slug: "page-alert", category: "interface", subcategory: "layout",
    name: "Page alert", description: "A window with an alert mark inside — a page with a warning on it",
    tags: ["alert", "page", "warning"], family: "window",
    aliases: [], keywords: ["page alert", "page warning", "site notice"],
    shapes: [...WINDOW_T, col(12, 10, 14.5), disc(12, 17.5, 1)],
  },
];
