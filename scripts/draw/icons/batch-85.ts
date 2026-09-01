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
import { bell as bellBody, cloud, machine, shield } from "../bodies.ts";
import { add, alert, check, clockMark, remove, SMALL } from "../marks.ts";
import type { Icon } from "../build.ts";

// An opened envelope: the deep pocket and its flap folded up, narrower than the box -
// `home` is the opposite grammar, a wide roof over a narrow walled box. A tucked-in flap
// was tried and costs a third crossing at the rim; the perceptual scan clears this one.
const ENV = [rect(3, 9.5, 18, 12.5, 2), poly([[5, 9.5], [12, 2.5], [19, 9.5]])];
const mail = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "communication", name, description, tags, family: "envelope", aliases, keywords,
  shapes: [...ENV, ...marks],
});
const DB = [machine(), row(10.5, 7, 17)];
const db = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "data", subcategory: "storage", name, description, tags, family: "machine", aliases, keywords,
  shapes: [...DB, ...marks],
});
// bell without its clapper: with the badge on, seven elements would be one too many.
const bell = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "communication", name, description, tags, family: "figure", aliases, keywords,
  shapes: [...bellBody(), ...marks],
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
  mail("mail-check", "Mail check", "An opened envelope with a check in its pocket — mail delivered, an address confirmed",
    ["delivered", "verified", "confirmed"], [], ["mail delivered", "email verified", "confirmed address"],
    [...check(SMALL, 15.5)]),
  mail("mail-add", "Mail add", "An opened envelope with a plus in its pocket — compose a new message",
    ["compose", "new", "write"], ["mail-plus"], ["new email", "compose mail", "add address"],
    [...add(SMALL, 15.5)]),
  mail("mail-remove", "Mail remove", "An opened envelope with a minus in its pocket — delete a message",
    ["delete", "unsubscribe", "drop"], ["mail-minus", "mail-x"], ["delete email", "remove address", "unsubscribe"],
    [...remove(SMALL, 15.5)]),
  mail("mail-alert", "Mail alert", "An opened envelope with an alert in its pocket — mail that needs attention",
    ["warning", "failed", "attention"], ["mail-warning"], ["mail warning", "email failed", "urgent mail"],
    [...alert(SMALL, 15.5)]),
  mail("mail-clock", "Mail clock", "An opened envelope with a clock in its pocket — a scheduled send, mail in the queue",
    ["scheduled", "queued", "later"], [], ["schedule send", "queued mail", "send later"],
    [...clockMark(SMALL, 15.5)]),
  mail("mail-question", "Mail question", "An opened envelope with a question mark in its pocket — mail of unknown origin",
    ["unknown", "query", "ask"], ["mail-question-mark"], ["unknown sender", "mail query", "ask by mail"],
    [arc(12, 14.5, 2.5, 180, 90), disc(12, 19.5, 1)]),
  mail("mail-badge", "Mail badge", "An opened envelope with a dot in its pocket — unread mail, a message waiting",
    ["unread", "new", "waiting"], [], ["unread mail", "new message badge", "mail waiting"],
    [disc(12, 15.5, 2)]),

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
  bell("bell-ring", "Bell ring", "A bell with motion lines at its shoulders — ringing now, a notification going off",
    ["ringing", "alarm", "active"], [], ["bell ringing", "notification sound", "alarm going off"],
    [poly([[3, 9], [5, 7]]), poly([[21, 9], [19, 7]])]),
  bell("bell-off", "Bell off", "A bell struck through — notifications muted, the bell silenced",
    ["muted", "silenced", "disabled"], [], ["mute notifications", "bell muted", "silence alerts"],
    [poly([[6.5, 6.5], [16.5, 16.5]])]),
  bell("bell-dot", "Bell dot", "A bell with a dot inside — an unread notification waiting",
    ["unread", "badge", "waiting"], [], ["notification badge", "unread alert", "bell with dot"],
    [disc(12, 14, 2)]),
  bell("bell-add", "Bell add", "A bell with a plus inside — subscribe, turn notifications on for this",
    ["subscribe", "enable", "follow"], ["bell-plus"], ["enable notifications", "subscribe alerts", "add reminder"],
    [...add(SMALL, 14)]),
  bell("bell-remove", "Bell remove", "A bell with a minus inside — unsubscribe, turn notifications off for this",
    ["unsubscribe", "disable", "unfollow"], ["bell-minus"], ["disable notifications", "unsubscribe alerts", "remove reminder"],
    [...remove(SMALL, 14)]),
  bell("bell-check", "Bell check", "A bell with a check inside — notifications on and working, alerts confirmed",
    ["enabled", "confirmed", "active"], [], ["notifications enabled", "alerts confirmed", "bell check"],
    [...check(SMALL, 14)]),

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
