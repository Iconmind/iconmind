/**
 * R26 · Finance: banking — the bank, the account it keeps, the card it issues, and the
 * pot a saver puts money into.
 *
 * Four bodies this domain brings. The bank is a portico: a pediment on two columns over
 * a floor; what the bank does stands between the columns. The slip is a wide sheet with a folded corner —
 * the cheque, the statement, the number on a page — with its content in the middle.
 * The piggy bank is a round pig with a snout and a slot. The jar is borrowed from
 * the commerce rounds. The payment card from R22 carries the card icons.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { window_ } from "../bodies.ts";
import {
  SMALL, add, alert, boltMark, check, clockMark, coinMark, flagMark, keyMark, listMark, lockMark, off,
  pause, pinMark, playMark, remove, searchMark, trendMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "finance", subcategory: "banking", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The bank: a pediment on a beam carried by two columns over a floor, drawn as one path. Between the columns is x 6..18, y 10..20; marks at cy 15. */
const BANK = () => raw("M2 21H22M5 21V9M19 21V9M2 9H22M5 9L10.5 3.5H13.5L19 9", "a portico: floor, two columns, the beam across them and the pediment on the beam, one path so the corners meet", false);
/** The slip: a wide sheet with a folded corner. The hollow is x 3..21, y 6..18, clear of the fold above x 18; marks at cy 12. */
const SLIP = () => raw("M4 5H18L22 9V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V7A2 2 0 0 1 4 5ZM18 5V9H22", "a slip: a wide sheet with its top-right corner folded over", false);
/** The payment card: a card with its band across the top. Marks at cy 14. */
const CARD = () => [rect(2, 3, 20, 18, 2), row(7, 3, 21)];
/** A jar: a body rounded at the foot, a lid narrower than the body. The hollow is x 7..17, y 10..21; marks at cy 15.5. */
const JAR = () => [raw("M6 9H18V19A3 3 0 0 1 15 22H9A3 3 0 0 1 6 19Z", "a jar: square shoulders, a rounded foot", true), poly([[8, 9], [8, 4], [16, 4], [16, 9]])];
/** The piggy bank: a round body, a snout, two legs and the slot on its back, one path. */
const PIG = () => [raw("M4 12.5A7 7 0 1 1 18 12.5A7 7 0 1 1 4 12.5ZM16 10.5H21V14.5H16M7.5 19V22M14.5 19V22M9.5 3V5.5M15.5 8L17.5 6L19.5 8",
  "a pig: the body is a circle, the snout a box that leaves it, the ear a peak on its brow, the legs and slot short strokes that meet it", false)];
/** The cash machine: a body with a screen in it and the note coming out below. */
const ATM = () => [rect(4, 2, 16, 16, 2), poly([[7, 5], [17, 5], [17, 10], [7, 10]], true), poly([[9, 18], [9, 22], [15, 22], [15, 18]])];
/** A percent sign: a point, a 45° stroke, a point — 6 wide and 6 tall, centred on (12, cy). */
const PERCENT = (cy: number) => [disc(9.5, cy - 2.5, 1), poly([[9, cy + 3], [15, cy - 3]]), disc(14.5, cy + 2.5, 1)];
/** The right-pointing arrow: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The left-pointing arrow: a shaft and a 45° head that ends it at x0. */
const ARROW_L = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]])];
/** An arrow pointing both ways along y, from x0 to x1. */
const ARROW_LR = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]]), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** An arrow rising, its shaft from y0 down to y1, head at y0. */
const ARROW_UP = (y0: number, y1: number) => [col(12, y0, y1), poly([[9.5, y0 + 2.5], [12, y0], [14.5, y0 + 2.5]])];
/** An arrow dropping, its shaft from y0 to y1, head at y1. */
const ARROW_DOWN = (y0: number, y1: number) => [col(12, y0, y1), poly([[9.5, y1 - 2.5], [12, y1], [14.5, y1 - 2.5]])];
/** A hash of two columns and a row, 6 wide, centred on (12, cy). */
const HASH = (cy: number) => [col(10, cy - 3, cy + 3), col(14, cy - 3, cy + 3), row(cy, 8, 16)];
/** An hourglass 5 wide and 5 tall, centred on (12, cy). */
const SAND = (cy: number) => poly([[9.5, cy - 2.5], [14.5, cy - 2.5], [9.5, cy + 2.5], [14.5, cy + 2.5]], true);

export const BATCH_113: Icon[] = [
  /* ── the bank ───────────────────────────────────────────────────────────────── */
  c("bank", "Bank", "A portico with a third column — the building that keeps the money",
    ["bank", "building", "institution"], [], ["bank", "bank building", "financial institution", "banking"],
    "bank", [BANK(), col(12, 9, 21)]),
  c("bank-branch", "Bank branch", "The bank with a pin between its columns — the one near you",
    ["branch", "location", "nearby"], [], ["bank branch", "find a branch", "nearest bank", "branch locator"],
    "bank", [BANK(), ...pinMark(SMALL, 15)]),
  c("atm", "ATM", "A cash machine: a screen in the body and the note coming out below",
    ["cash", "machine", "withdraw"], ["cash-machine"], ["atm", "cash machine", "cashpoint", "atm locator"],
    "machine", ATM()),
  c("cash-withdraw", "Withdraw cash", "The bank with an arrow rising out of it — money taken out",
    ["withdraw", "cash", "out"], ["withdrawal"], ["withdraw cash", "cash withdrawal", "take out money", "withdraw"],
    "bank", [BANK(), ...ARROW_UP(12, 18)]),
  c("cash-deposit", "Deposit cash", "The bank with an arrow dropping into it — money paid in",
    ["deposit", "cash", "in"], [], ["deposit cash", "cash deposit", "pay in", "deposit"],
    "bank", [BANK(), ...ARROW_DOWN(12, 18)]),
  c("account-balance", "Account balance", "The bank with a coin between its columns — what is in the account",
    ["balance", "amount", "funds"], [], ["account balance", "balance", "available funds", "current balance"],
    "bank", [BANK(), ...coinMark(SMALL, 15)]),
  c("account-number", "Account number", "The bank with a hash between its columns — the number the account goes by",
    ["number", "identifier", "account"], [], ["account number", "bank account number", "account id", "acct no"],
    "bank", [BANK(), ...HASH(15)]),
  c("swift-transfer", "SWIFT transfer", "The bank with a bolt between its columns — money sent across borders, fast",
    ["swift", "international", "transfer"], [], ["swift transfer", "international transfer", "swift payment", "bic transfer"],
    "bank", [BANK(), ...boltMark(SMALL, 15)]),
  c("wire-transfer", "Wire transfer", "The bank with an arrow leaving it — money sent bank to bank",
    ["wire", "transfer", "send"], [], ["wire transfer", "bank wire", "send money", "outgoing transfer"],
    "bank", [BANK(), ...ARROW_R(15, 8, 16)]),
  c("direct-debit", "Direct debit", "The bank with an arrow reaching in — the bank taking what is due",
    ["debit", "automatic", "payment"], [], ["direct debit", "auto debit", "automatic payment", "debit mandate"],
    "bank", [BANK(), ...ARROW_L(15, 8, 16)]),
  c("transfer-between", "Transfer between accounts", "The bank with an arrow pointing both ways — money moved from one account to another",
    ["transfer", "internal", "move"], [], ["transfer between accounts", "internal transfer", "move money", "own account transfer"],
    "bank", [BANK(), ...ARROW_LR(15, 8, 16)]),
  c("transfer-scheduled", "Scheduled transfer", "The bank with a clock between its columns — money that will move on the day",
    ["transfer", "scheduled", "future"], [], ["scheduled transfer", "future payment", "schedule payment", "planned transfer"],
    "bank", [BANK(), ...clockMark(SMALL, 15)]),
  c("transfer-pending", "Transfer pending", "The bank with an hourglass between its columns — money on its way, not yet there",
    ["transfer", "pending", "processing"], [], ["transfer pending", "pending payment", "processing transfer", "in transit"],
    "bank", [BANK(), SAND(15)]),
  c("transfer-failed", "Transfer failed", "The bank with a cross between its columns — money that did not move",
    ["transfer", "failed", "error"], [], ["transfer failed", "payment failed", "failed transaction", "transfer error"],
    "bank", [BANK(), ...off(SMALL, 15)]),
  c("transfer-received", "Transfer received", "The bank with a check between its columns — money that arrived",
    ["transfer", "received", "incoming"], [], ["transfer received", "incoming payment", "money received", "payment arrived"],
    "bank", [BANK(), ...check(SMALL, 15)]),
  c("overdraft", "Overdraft", "The bank with a minus between its columns — below zero, and allowed to be",
    ["overdraft", "negative", "credit"], [], ["overdraft", "overdrawn", "overdraft limit", "negative balance"],
    "bank", [BANK(), ...remove(SMALL, 15)]),
  c("interest-earned", "Interest earned", "The bank with a percent between its columns — what the bank pays for keeping your money",
    ["interest", "earned", "rate"], [], ["interest earned", "interest rate", "savings interest", "interest paid"],
    "bank", [BANK(), ...PERCENT(15)]),
  c("savings-account", "Savings account", "The bank with a trend line between its columns — the account that grows",
    ["savings", "account", "grow"], [], ["savings account", "savings", "deposit account", "high interest account"],
    "bank", [BANK(), ...trendMark(SMALL, 15)]),
  c("current-account", "Current account", "The bank with a list between its columns — the everyday account, the one the transactions run through",
    ["current", "checking", "everyday"], ["checking-account"], ["current account", "checking account", "everyday account", "transaction account"],
    "bank", [BANK(), ...listMark(SMALL, 15)]),
  c("business-account", "Business account", "The bank with a briefcase between its columns — the company's account",
    ["business", "company", "account"], [], ["business account", "company account", "business banking", "corporate account"],
    "bank", [BANK(), poly([[9, 14], [15, 14], [15, 18], [9, 18]], true), arc(12, 14, 2, 180, 360)]),
  c("account-open", "Open account", "The bank with a plus between its columns — a new account",
    ["open", "new", "create"], [], ["open account", "new account", "create account", "account opening"],
    "bank", [BANK(), ...add(SMALL, 15)]),
  c("account-close", "Close account", "The bank with a cross between its columns — the account ended",
    ["close", "end", "terminate"], [], ["close account", "account closure", "terminate account", "close bank account"],
    "bank", [BANK(), poly([[9, 12], [15, 18]]), poly([[15, 12], [9, 18]])]),
  c("account-frozen", "Account frozen", "The bank with a padlock between its columns — nothing in, nothing out",
    ["frozen", "locked", "blocked"], [], ["account frozen", "frozen account", "account locked", "account blocked"],
    "bank", [BANK(), ...lockMark(SMALL, 15)]),
  c("bank-alert", "Bank alert", "The bank with an exclamation between its columns — something the bank needs you to see",
    ["alert", "notice", "warning"], [], ["bank alert", "bank notification", "account alert", "banking alert"],
    "bank", [BANK(), ...alert(SMALL, 14.5)]),

  /* ── the slip ───────────────────────────────────────────────────────────────── */
  c("cheque", "Cheque", "A slip with a name line and a signature line — money written by hand",
    ["cheque", "paper", "payment"], ["check-payment"], ["cheque", "check", "bank cheque", "paper cheque"],
    "slip", [SLIP(), row(9, 5, 11), row(15.5, 13, 19)]),
  c("cheque-deposit", "Cheque deposit", "A slip with a name line and an arrow dropping — the cheque paid in",
    ["cheque", "deposit", "scan"], ["check-deposit"], ["cheque deposit", "deposit a check", "mobile cheque deposit", "pay in cheque"],
    "slip", [SLIP(), row(9, 5, 11), col(13, 9, 15), poly([[10.5, 12.5], [13, 15], [15.5, 12.5]])]),
  c("account-statement", "Account statement", "A slip with three lines — every transaction, month by month",
    ["statement", "history", "transactions"], [], ["account statement", "bank statement", "transaction history", "monthly statement"],
    "slip", [SLIP(), row(9, 6, 15), row(12, 6, 15), row(15, 6, 18)]),
  c("sort-code", "Sort code", "A slip with a hash on it — the number that names the branch",
    ["sort", "routing", "branch"], ["routing-number"], ["sort code", "routing number", "bank code", "branch code"],
    "slip", [SLIP(), ...HASH(12)]),
  c("iban", "IBAN", "A slip with a globe on it — the account number the whole world can read",
    ["international", "account", "number"], [], ["iban", "international bank account number", "iban number", "bank identifier"],
    "slip", [SLIP(), disc(12, 12, 4), col(12, 8, 16), row(12, 8, 16)]),
  c("interest-charged", "Interest charged", "A slip with a percent on it — what borrowing costs",
    ["interest", "charged", "cost"], [], ["interest charged", "loan interest", "interest payable", "cost of borrowing"],
    "slip", [SLIP(), ...PERCENT(12)]),
  c("joint-account", "Joint account", "A slip with two rings linked on it — one account, two names",
    ["joint", "shared", "couple"], [], ["joint account", "shared account", "joint bank account", "two account holders"],
    "slip", [SLIP(), disc(10.5, 12, 2), disc(13.5, 12, 2)]),
  c("balance-show", "Show balance", "The payment card with an open eye under the band — the amount, shown",
    ["show", "visible", "reveal"], [], ["show balance", "reveal balance", "unhide balance", "view balance"],
    "card", [...CARD(), arc(12, 15, 5, 200, 340), disc(12, 15, 2)]),
  c("balance-hide", "Hide balance", "The payment card with a closed eye and its lashes — the amount, kept from view",
    ["hide", "private", "mask"], [], ["hide balance", "mask balance", "private balance", "hidden amount"],
    "card", [...CARD(), arc(12, 11, 5, 20, 160), poly([[9, 15], [7, 17]]), col(12, 16, 18.5), poly([[15, 15], [17, 17]])]),

  /* ── the card ───────────────────────────────────────────────────────────────── */
  c("card-freeze", "Freeze card", "The payment card with a pause under the band — no spending until it is thawed",
    ["freeze", "pause", "block"], [], ["freeze card", "card freeze", "lock card temporarily", "pause card"],
    "card", [...CARD(), ...pause(SMALL, 14)]),
  c("card-unfreeze", "Unfreeze card", "The payment card with a play under the band — spending again",
    ["unfreeze", "resume", "activate"], [], ["unfreeze card", "card unfreeze", "resume card", "reactivate card"],
    "card", [...CARD(), ...playMark(SMALL, 14)]),
  c("card-limit", "Card limit", "The payment card with a chevron rising to a line — as far as the card can go",
    ["limit", "ceiling", "maximum"], [], ["card limit", "spending limit", "credit limit", "daily limit"],
    "card", [...CARD(), row(11, 8, 16), poly([[9.5, 16.5], [12, 14], [14.5, 16.5]])]),
  c("card-pin", "Card PIN", "The payment card with a key under the band — the number that unlocks it",
    ["pin", "code", "security"], [], ["card pin", "pin number", "change pin", "view pin"],
    "card", [...CARD(), ...keyMark(SMALL, 14)]),
  c("card-virtual", "Virtual card", "The payment card with a phone under the band — a card with no plastic",
    ["virtual", "digital", "phone"], ["digital-card"], ["virtual card", "digital card", "card on phone", "e-card"],
    "card", [...CARD(), poly([[10, 10], [14, 10], [14, 18], [10, 18]], true)]),
  c("card-physical", "Physical card", "The payment card with its chip — the one in your pocket",
    ["physical", "plastic", "chip"], ["plastic-card"], ["physical card", "plastic card", "chip card", "card with chip"],
    "card", [...CARD(), poly([[5, 11], [10, 11], [10, 15], [5, 15]], true)]),
  c("card-replace", "Replace card", "The payment card with an arrow pointing both ways — the old one swapped for a new one",
    ["replace", "swap", "renew"], [], ["replace card", "card replacement", "new card", "reissue card"],
    "card", [...CARD(), ...ARROW_LR(14, 8, 16)]),
  c("card-lost", "Card lost", "The payment card with a lens under the band — the card that cannot be found",
    ["lost", "missing", "stolen"], ["card-stolen"], ["card lost", "lost card", "report lost card", "stolen card"],
    "card", [...CARD(), ...searchMark(SMALL, 14)]),
  c("contactless-limit", "Contactless limit", "The payment card with the contactless waves under a line — the most a tap can pay",
    ["contactless", "limit", "tap"], [], ["contactless limit", "tap limit", "tap to pay limit", "contactless maximum"],
    "card", [...CARD(), row(11, 8, 16), arc(12, 17.5, 2, 200, 340), arc(12, 17.5, 4, 200, 340)]),
  c("standing-order", "Standing order", "The payment card with an arrow each way under the band — the same payment, every time",
    ["recurring", "regular", "automatic"], [], ["standing order", "recurring payment", "regular payment", "repeat transfer"],
    "card", [...CARD(), row(12, 8, 16), poly([[14, 10], [16, 12], [14, 14]]), row(16.5, 8, 16), poly([[10, 14.5], [8, 16.5], [10, 18.5]])]),

  /* ── the channel ────────────────────────────────────────────────────────────── */
  c("mobile-banking", "Mobile banking", "The bank with a phone between its columns — the bank in your pocket",
    ["mobile", "app", "phone"], [], ["mobile banking", "banking app", "bank on phone", "mobile bank"],
    "bank", [BANK(), poly([[10, 12], [14, 12], [14, 18], [10, 18]], true)]),
  c("online-banking", "Online banking", "A window with a portico in it — the bank in a browser",
    ["online", "web", "internet"], [], ["online banking", "internet banking", "web banking", "bank online"],
    "window", [window_(), poly([[7.5, 11.5], [10.5, 8.5], [13.5, 8.5], [16.5, 11.5]]), row(11.5, 6, 18), col(9, 11.5, 17), col(15, 11.5, 17), row(17, 6, 18)]),

  /* ── the pot ────────────────────────────────────────────────────────────────── */
  c("piggy-bank", "Piggy bank", "A pig with an ear and a slot in its back — where the coins go",
    ["savings", "coins", "pig"], ["piggy"], ["piggy bank", "piggybank", "money box", "save coins"],
    "pig", PIG()),
  c("savings-pot", "Savings pot", "A jar with two coins lying in it — money set aside, and named",
    ["savings", "pot", "aside"], [], ["savings pot", "money pot", "savings space", "set aside"],
    "jar", [...JAR(), row(14, 9, 15), row(17.5, 9, 15)]),
  c("savings-goal", "Savings goal", "A jar with a flag in it — the amount aimed at",
    ["savings", "goal", "target"], [], ["savings goal", "saving target", "goal amount", "save for"],
    "jar", [...JAR(), ...flagMark(SMALL, 15.5)]),
  c("round-up-savings", "Round-up savings", "A jar with an arrow rising in it — the change rounded up, and kept",
    ["round-up", "change", "automatic"], [], ["round up savings", "round ups", "spare change savings", "save the change"],
    "jar", [...JAR(), ...ARROW_UP(12.5, 18.5)]),
  c("low-balance", "Low balance", "A jar with a little at the bottom — nearly empty",
    ["low", "balance", "warning"], [], ["low balance", "balance low", "running low", "insufficient funds"],
    "jar", [...JAR(), row(18.5, 9, 15)]),
];
