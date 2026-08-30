/**
 * Batch 85 — round 9 of the parity plan: mail, database, bell, shield and cloud.
 *
 * Five bodies the set already draws, each given the marks its Lucide counterpart has.
 * The envelope is shortened to fifteen wide so its mark stands beside it; the bell
 * wears its badge at the shoulder; the database keeps one platter so the mark has a
 * shelf; the shield and the cloud take theirs at the slot their siblings use.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { cloud, machine, shield } from "../bodies.ts";
import { SMALL, add, check, remove } from "../marks.ts";
import type { Icon } from "../build.ts";

const ENV = [rect(2, 6, 13, 12, 2), poly([[4, 7], [8.5, 11.5], [13, 7]])];
const mail = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "communication", name, description, tags, family: "window", aliases, keywords,
  shapes: [...ENV, ...marks],
});
const DB = [machine(), row(10.5, 7, 17)];
const db = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "data", subcategory: "storage", name, description, tags, family: "machine", aliases, keywords,
  shapes: [...DB, ...marks],
});
// bell without its clapper: with the badge on, seven elements would be one too many.
const BELL = [arc(12, 13, 6, 180, 360), col(6, 13, 17), col(18, 13, 17), row(17, 4, 20)];
const bell = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "communication", name, description, tags, family: "figure", aliases, keywords,
  shapes: [...BELL, ...marks],
});
const sh = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "security", subcategory: "policy", name, description, tags, family: "shield", aliases, keywords,
  shapes: [shield(), ...marks],
});
const cl = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "cloud", subcategory: "compute", name, description, tags, family: "cloud", aliases, keywords,
  shapes: [cloud(), ...marks],
});

export const BATCH_85: Icon[] = [
  // ── mail ────────────────────────────────────────────────────────────────────────
  {
    slug: "mail-open", category: "interface", subcategory: "communication",
    name: "Mail open", description: "An envelope with its flap lifted — an opened message, mail that has been read",
    tags: ["read", "opened", "envelope"], family: "window",
    aliases: [], keywords: ["open envelope", "read mail", "opened message"],
    shapes: [poly([[4, 11], [12, 3], [20, 11]]), poly([[4, 11], [4, 21], [20, 21], [20, 11]]), poly([[6, 12], [12, 18], [18, 12]])],
  },
  mail("mail-check", "Mail check", "An envelope with a check beside it — mail delivered, or an address confirmed",
    ["delivered", "verified", "confirmed"], [], ["mail delivered", "email verified", "confirmed address"],
    [poly([[16, 12], [18, 14], [21.5, 10.5]])]),
  mail("mail-add", "Mail add", "An envelope with a plus beside it — compose a new message, add an address",
    ["compose", "new", "write"], ["mail-plus"], ["new email", "compose mail", "add address"],
    [col(19, 9, 15), row(12, 16, 22)]),
  mail("mail-remove", "Mail remove", "An envelope with a minus beside it — delete a message, remove an address",
    ["delete", "unsubscribe", "drop"], ["mail-minus", "mail-x"], ["delete email", "remove address", "unsubscribe"],
    [row(12, 16, 22)]),
  mail("mail-alert", "Mail alert", "An envelope with an exclamation mark beside it — mail that failed, or a message that needs attention",
    ["warning", "failed", "attention"], ["mail-warning"], ["mail warning", "email failed", "urgent mail"],
    [col(19, 7, 12), disc(19, 15, 1)]),
  mail("mail-clock", "Mail clock", "An envelope with a clock beside it — a scheduled send, or mail waiting in the queue",
    ["scheduled", "queued", "later"], [], ["schedule send", "queued mail", "send later"],
    [disc(19, 12, 3), poly([[19, 9.5], [19, 12], [21.5, 12]])]),
  mail("mail-question", "Mail question", "An envelope with a question mark beside it — mail of unknown origin, or a query sent in",
    ["unknown", "query", "ask"], ["mail-question-mark"], ["unknown sender", "mail query", "ask by mail"],
    [arc(19, 10.5, 2.5, 180, 90), disc(19, 15.5, 1)]),
  mail("mail-badge", "Mail badge", "An envelope with a dot at its corner — unread mail, a message waiting",
    ["unread", "new", "waiting"], [], ["unread mail", "new message badge", "mail waiting"],
    [disc(19.5, 7, 2)]),

  // ── database ────────────────────────────────────────────────────────────────────
  db("database-add", "Database add", "A database with a plus on it — add a record, or stand up another store",
    ["insert", "record", "new"], ["database-plus"], ["insert record", "add to database", "new database"], add(SMALL, 15.5)),
  db("database-remove", "Database remove", "A database with a minus on it — delete a record, or drop the store",
    ["delete", "drop", "record"], ["database-minus", "database-x"], ["delete record", "drop database", "remove data"], remove(SMALL, 15.5)),
  db("database-check", "Database check", "A database with a check on it — the store is healthy, the data verified",
    ["healthy", "verified", "consistent"], [], ["database healthy", "data verified", "integrity check"], check(SMALL, 15.5)),
  db("database-search", "Database search", "A database with a magnifying glass on it — query the store, look a record up",
    ["query", "lookup", "find"], [], ["query database", "search records", "look up data"],
    [disc(11.5, 15.5, 3), poly([[13.5, 17.5], [16, 20]])]),
  db("database-backup", "Database backup", "A database with an arrow pointing back on it — a backup, a copy of the data kept aside",
    ["backup", "copy", "restore"], [], ["database backup", "back up data", "snapshot store"],
    [row(15.5, 9, 15), poly([[11.5, 13], [9, 15.5], [11.5, 18]])]),
  db("database-zap", "Database zap", "A database with a bolt on it — a store that is fast, or one hit by a spike",
    ["fast", "spike", "performance"], [], ["fast database", "query spike", "database performance"],
    [poly([[13, 12.5], [10, 15.5], [13, 15.5], [10, 18.5]])]),
  db("database-arrow-up", "Database arrow up", "A database with an arrow pointing up on it — export from the store, push the data out",
    ["export", "push", "upload"], [], ["export database", "push data", "upload records"],
    [col(12, 12.5, 18.5), poly([[9.5, 15], [12, 12.5], [14.5, 15]])]),
  db("database-arrow-down", "Database arrow down", "A database with an arrow pointing down on it — import into the store, pull the data in",
    ["import", "pull", "load"], [], ["import database", "load data", "pull records"],
    [col(12, 12.5, 18.5), poly([[9.5, 16], [12, 18.5], [14.5, 16]])]),

  // ── bell ────────────────────────────────────────────────────────────────────────
  bell("bell-ring", "Bell ring", "A bell with motion lines beside it — ringing now, a notification going off",
    ["ringing", "alarm", "active"], [], ["bell ringing", "notification sound", "alarm going off"],
    [poly([[3, 10], [5, 8]]), poly([[21, 10], [19, 8]])]),
  bell("bell-off", "Bell off", "A bell with a cross at its shoulder — notifications muted, the bell silenced",
    ["muted", "silenced", "disabled"], [], ["mute notifications", "bell muted", "silence alerts"],
    [poly([[18.5, 3.5], [21.5, 6.5]]), poly([[21.5, 3.5], [18.5, 6.5]])]),
  bell("bell-dot", "Bell dot", "A bell with a dot at its shoulder — an unread notification waiting",
    ["unread", "badge", "waiting"], [], ["notification badge", "unread alert", "bell with dot"],
    [disc(20, 6, 2)]),
  bell("bell-add", "Bell add", "A bell with a plus at its shoulder — subscribe, turn notifications on for this",
    ["subscribe", "enable", "follow"], ["bell-plus"], ["enable notifications", "subscribe alerts", "add reminder"],
    [col(19.5, 3.5, 8.5), row(6, 17, 22)]),
  bell("bell-remove", "Bell remove", "A bell with a minus at its shoulder — unsubscribe, turn notifications off for this",
    ["unsubscribe", "disable", "unfollow"], ["bell-minus"], ["disable notifications", "unsubscribe alerts", "remove reminder"],
    [row(6, 17, 22)]),
  bell("bell-check", "Bell check", "A bell with a check at its shoulder — notifications on and working, alerts confirmed",
    ["enabled", "confirmed", "active"], [], ["notifications enabled", "alerts confirmed", "bell check"],
    [poly([[17, 6], [19, 8], [22, 5]])]),

  // ── shield ──────────────────────────────────────────────────────────────────────
  sh("shield", "Shield", "A plain shield — protection, security, the thing that stands between a system and harm",
    ["protection", "guard", "defence"], [], ["shield", "security", "protection", "guard"], []),
  sh("shield-remove", "Shield remove", "A shield with a minus on it — reduce protection, take a rule off the policy",
    ["reduce", "relax", "minus"], ["shield-minus"], ["reduce protection", "remove rule", "relax policy"], remove(SMALL, 11)),
  sh("shield-half", "Shield half", "A shield split down the middle — partial protection, half of the policy in force",
    ["partial", "split", "half"], [], ["partial protection", "half shield", "mixed policy"],
    [col(12, 8, 18.5)]),
  sh("shield-keyhole", "Shield keyhole", "A shield with a keyhole on it — protection that opens to the right key",
    ["keyhole", "access", "locked"], [], ["shield keyhole", "keyed access", "locked protection"],
    [disc(12, 10, 2), col(12, 12, 15.5)]),
  sh("shield-lock", "Shield lock", "A shield with a padlock on it — locked down, protection that is not to be lifted",
    ["locked", "hardened", "secured"], [], ["locked shield", "hardened security", "locked down"],
    [poly([[9, 11], [15, 11], [15, 16], [9, 16]], true), arc(12, 11, 2, 180, 360)]),
  sh("shield-ban", "Shield ban", "A shield with a slash on it — protection refused, a block put in place",
    ["blocked", "refused", "denied"], [], ["shield ban", "blocked", "protection denied"],
    [poly([[9, 15], [15, 9]])]),
  sh("shield-question", "Shield question", "A shield with a question mark on it — protection unknown, a policy not yet decided",
    ["unknown", "unverified", "undecided"], ["shield-question-mark"], ["unknown protection", "unverified security", "policy question"],
    [arc(12, 10, 2.5, 180, 90), disc(12, 15, 1)]),
  sh("shield-user", "Shield user", "A shield with a person on it — a protected account, someone under guard",
    ["account", "protected", "person"], [], ["protected user", "account security", "user guard"],
    [disc(12, 9.5, 2), arc(12, 16, 4, 180, 360)]),
  sh("shield-config", "Shield config", "A shield with sliders on it — security settings, the protection tuned by hand",
    ["settings", "tune", "sliders"], ["shield-cog", "shield-cog-corner"], ["security settings", "configure protection", "policy settings"],
    [row(9.5, 9, 15), col(13.5, 7.5, 11.5), row(13.5, 9, 15), col(10.5, 11.5, 15.5)]),
  sh("shield-ellipsis", "Shield ellipsis", "A shield with three dots on it — protection in progress, a check still running",
    ["pending", "checking", "progress"], [], ["security check running", "pending protection", "shield pending"],
    [disc(8.5, 11, 1), disc(12, 11, 1), disc(15.5, 11, 1)]),

  // ── cloud ───────────────────────────────────────────────────────────────────────
  {
    slug: "cloud-sync", category: "cloud", subcategory: "compute",
    name: "Cloud sync", description: "A cloud with a sync loop under it — keep this copy and the cloud copy the same",
    tags: ["sync", "mirror", "refresh"], family: "cloud",
    aliases: [], keywords: ["cloud sync", "sync to cloud", "keep in sync"],
    shapes: [cloud(5.5),
      raw("M13.5 15.5h2.5a1.5 1.5 0 0 1 1.5 1.5v2.5a1.5 1.5 0 0 1 -1.5 1.5h-2.5", "the right half of a two-gap loop; frame() can only open its top edge"),
      raw("M10.5 21h-2.5a1.5 1.5 0 0 1 -1.5 -1.5v-2.5a1.5 1.5 0 0 1 1.5 -1.5h2.5", "the left half of the same loop")],
  },
  cl("cloud-backup", "Cloud backup", "A cloud with an arrow pointing back on it — a backup kept in the cloud, ready to restore",
    ["backup", "restore", "copy"], [], ["cloud backup", "backup to cloud", "restore from cloud"],
    [row(13, 8, 15), poly([[10.5, 10.5], [8, 13], [10.5, 15.5]])]),
  cl("cloud-config", "Cloud config", "A cloud with sliders on it — cloud settings, the account and region configured",
    ["settings", "sliders", "account"], ["cloud-cog"], ["cloud settings", "configure cloud", "cloud account"],
    [row(10, 9, 15), col(13.5, 8, 12), row(14, 9, 15), col(10.5, 12, 16)]),
];
