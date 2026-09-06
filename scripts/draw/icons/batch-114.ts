/**
 * R27 · Finance: wallet & spending — the money a person carries, what it goes on, and
 * the bills that come for it.
 *
 * Four bodies this round brings. The wallet from R24 — a pocket with a card slot in its
 * right side — carries what a person has to hand; its content sits left of the slot.
 * The budget envelope is a pocket with a note standing in it, the cash-envelope way of
 * setting money aside. The coins are two discs overlapping. The pocket is a patch pocket
 * with a hem. The calendar, banknote, receipt, slip, card, jar and house are
 * borrowed from earlier rounds and keep their families.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { banknote, window_ } from "../bodies.ts";
import {
  SMALL, add, alert, boltMark, bookmarkMark, check, clockMark, coinMark, flagMark, heartMark, listMark,
  pinMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "finance", subcategory: "wallet", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The wallet: a pocket with a card slot set into its right side. Content stays at cx 9, left of x 12. */
const WALLET = () => [rect(2, 4, 20, 16, 2), poly([[22, 9.5], [15, 9.5], [15, 14.5], [22, 14.5]])];
/** The budget envelope: a pocket with its V, and a note standing in it. The note is x 6..18, y 4..13; marks at cy 9. */
const ENVELOPE = () => [poly([[2, 11], [2, 21], [22, 21], [22, 11], [12, 21]], true), poly([[5, 14], [5, 3], [19, 3], [19, 14]])];
/** The calendar `calendar` draws: a window with its rail and two pegs. Under the rail is y 11..20; content 5 tall at cy 15.5. */
const CAL = () => [window_(), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5)];
/** A receipt: the tape bills are printed on. Marks at cy 10. */
const RECEIPT = () =>
  raw("M6 2H18A2 2 0 0 1 20 4V19L18 17L16 19L14 17L12 19L10 17L8 19L6 17L4 19V4A2 2 0 0 1 6 2Z",
    "a receipt: a rounded head and a foot torn along a zigzag", true);
/** The slip: a wide sheet with a folded corner. The hollow is x 3..21, y 6..18, clear of the fold above x 18; marks at cy 12. */
const SLIP = () => raw("M4 5H18L22 9V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V7A2 2 0 0 1 4 5ZM18 5V9H22", "a slip: a wide sheet with its top-right corner folded over", false);
/** The payment card: a card with its band across the top. Marks at cy 14. */
const CARD = () => [rect(2, 3, 20, 18, 2), row(7, 3, 21)];
/** A jar: a body rounded at the foot, a lid narrower than the body. Marks at cy 15.5. */
const JAR = () => [raw("M6 9H18V19A3 3 0 0 1 15 22H9A3 3 0 0 1 6 19Z", "a jar: square shoulders, a rounded foot", true), poly([[8, 9], [8, 4], [16, 4], [16, 9]])];
/** The house `home` draws, its walls one deeper so a coin fits. Between the walls is x 7..17, y 12..20. */
const HOUSE = () => [poly([[3, 11], [12, 2], [21, 11]]), poly([[6, 11], [6, 21], [18, 21], [18, 11]])];
/** The pocket: a patch pocket, straight sides into a round foot, with its hem across the top. Under the hem is x 5..19, y 8..20. */
const POCKET = () => [raw("M4 3V14A8 8 0 0 0 20 14V3Z", "a patch pocket: straight sides that run into one round foot", true), row(7, 4, 20)];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** The left-pointing arrow: a shaft and a 45° head that ends it at x0. */
const ARROW_L = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]])];
/** An arrow pointing both ways along y, from x0 to x1. */
const ARROW_LR = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]]), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];

export const BATCH_114: Icon[] = [
  /* ── the wallet ─────────────────────────────────────────────────────────────── */
  c("wallet", "Wallet", "A pocket with a card slot in its side — where the money you carry lives",
    ["money", "cash", "cards"], ["purse"], ["wallet", "purse", "billfold", "digital wallet"],
    "wallet", [...WALLET()]),
  c("wallet-add", "Add to wallet", "The wallet with a plus in it — money or a card put in",
    ["add", "top-up", "insert"], [], ["add to wallet", "add funds", "add card to wallet", "wallet top up"],
    "wallet", [...WALLET(), col(9, 9.5, 14.5), row(12, 6.5, 11.5)]),
  c("wallet-empty", "Wallet empty", "The wallet with a nought in it — nothing left to spend",
    ["empty", "zero", "broke"], [], ["wallet empty", "no money", "zero balance", "out of funds"],
    "wallet", [...WALLET(), disc(9, 12, 2)]),
  c("spend-category", "Spend category", "The wallet with a pie in it — the spending cut into its kinds",
    ["category", "tag", "classify"], [], ["spend category", "spending category", "expense category", "categorise spend"],
    "wallet", [...WALLET(), disc(8.5, 12, 3), col(8.5, 9, 12), row(12, 8.5, 11.5)]),
  c("expense", "Expense", "The wallet with an arrow leaving it — money that went out",
    ["spend", "outgoing", "cost"], ["spending"], ["expense", "spending", "money out", "outgoing"],
    "wallet", [...WALLET(), row(12, 5, 10), poly([[7.5, 9.5], [10, 12], [7.5, 14.5]])]),
  c("recurring-payment", "Recurring payment", "The wallet with two chevrons in it — the same money leaving, again and again",
    ["recurring", "repeat", "monthly"], [], ["recurring payment", "repeat payment", "monthly payment", "auto pay"],
    "wallet", [...WALLET(), poly([[5, 9.5], [7.5, 12], [5, 14.5]]), poly([[9, 9.5], [11.5, 12], [9, 14.5]])]),
  c("tip-calc", "Tip calculator", "The wallet with a percent in it — the tip worked out",
    ["tip", "percent", "calculate"], ["tip-calculator"], ["tip calculator", "calculate tip", "tip percent", "gratuity calculator"],
    "wallet", [...WALLET(), disc(7, 9.5, 1), poly([[6.5, 14.5], [11.5, 9.5]]), disc(11, 14.5, 1)]),
  c("spend-limit", "Spend limit", "The wallet with a chevron rising to a line — as far as the spending goes",
    ["limit", "cap", "ceiling"], [], ["spend limit", "spending limit", "spending cap", "set a limit"],
    "wallet", [...WALLET(), row(9, 6, 12), poly([[6.5, 14.5], [9, 12], [11.5, 14.5]])]),
  c("debt", "Debt", "The wallet with a minus in it — less than nothing, owed",
    ["owed", "negative", "borrow"], [], ["debt", "money owed", "in debt", "liabilities"],
    "wallet", [...WALLET(), row(12, 6.5, 11.5)]),
  c("debt-payoff", "Debt paid off", "The wallet with a check in it — what was owed, cleared",
    ["paid", "cleared", "settled"], [], ["debt paid off", "pay off debt", "debt free", "debt cleared"],
    "wallet", [...WALLET(), poly([[6, 12], [8, 14], [11.5, 10.5]])]),

  /* ── the money itself ───────────────────────────────────────────────────────── */
  c("cash", "Cash", "A banknote with a coin on it — money in both its kinds",
    ["money", "notes", "coins"], [], ["cash", "money", "notes and coins", "physical money"],
    "banknote", [...banknote(), disc(12, 12, 3), col(12, 10, 14)]),
  c("coins", "Coins", "Two coins, one over the other",
    ["money", "change", "currency"], ["coin"], ["coins", "coin", "loose change", "currency coins"],
    "coin", [disc(9, 13, 5), disc(15, 11, 5)]),
  c("change-coins", "Change", "Three small coins — what comes back after paying",
    ["change", "small", "coins"], ["loose-change"], ["change", "loose change", "small change", "coins back"],
    "coin", [disc(12, 7.5, 3.5), disc(6.5, 17, 4), disc(17.5, 17, 4)]),
  c("banknote-stack", "Banknote stack", "A banknote with another behind it — a bundle of them",
    ["money", "bundle", "stack"], ["money-stack"], ["banknote stack", "stack of money", "bundle of notes", "wad of cash"],
    "banknote", [...banknote(), row(3, 6, 18)]),
  c("income", "Income", "A banknote with an arrow rising — money coming in",
    ["income", "earnings", "in"], ["earnings"], ["income", "earnings", "money in", "revenue"],
    "banknote", [...banknote(), col(12, 9, 15), poly([[9.5, 11.5], [12, 9], [14.5, 11.5]])]),
  c("bonus", "Bonus", "A banknote with a stone on it — money on top of the usual",
    ["bonus", "extra", "reward"], [], ["bonus", "extra pay", "bonus payment", "one-off bonus"],
    "banknote", [...banknote(), STONE(12, 12)]),
  c("side-income", "Side income", "A banknote with a plus on it — money from somewhere else as well",
    ["side", "extra", "freelance"], ["side-hustle"], ["side income", "side hustle", "extra income", "second income"],
    "banknote", [...banknote(), ...add(SMALL, 12)]),
  c("allowance", "Allowance", "A banknote with a heart on it — money given, not earned",
    ["allowance", "given", "family"], [], ["allowance", "pocket money allowance", "stipend", "monthly allowance"],
    "banknote", [...banknote(), ...heartMark(SMALL, 12)]),
  c("pocket-money", "Pocket money", "A patch pocket with a coin in it — a child's own money",
    ["pocket", "child", "coin"], [], ["pocket money", "kids money", "child's allowance", "spending money"],
    "pocket", [...POCKET(), ...coinMark(SMALL, 14)]),

  /* ── the calendar ───────────────────────────────────────────────────────────── */
  c("spend-today", "Spend today", "The calendar with one day marked — what went out today",
    ["today", "daily", "spend"], [], ["spend today", "today's spending", "daily spend", "spent today"],
    "window", [...CAL(), disc(12, 15.5, 2)]),
  c("spend-week", "Spend this week", "The calendar with a week's bar — what went out over seven days",
    ["week", "weekly", "spend"], [], ["spend this week", "weekly spending", "week's spend", "spent this week"],
    "window", [...CAL(), row(15.5, 7, 17)]),
  c("spend-month", "Spend this month", "The calendar with two weeks' bars — what went out over the month",
    ["month", "monthly", "spend"], [], ["spend this month", "monthly spending", "month's spend", "spent this month"],
    "window", [...CAL(), row(13.5, 7, 17), row(17.5, 7, 17)]),
  c("salary", "Salary", "The calendar with a banknote on it — the money that comes on the day",
    ["salary", "pay", "wage"], ["wages", "payday"], ["salary", "wages", "payday", "monthly pay"],
    "window", [...CAL(), poly([[7, 13], [17, 13], [17, 18], [7, 18]], true)]),
  c("subscription-cancel", "Cancel subscription", "The calendar with the day struck out — no more of it",
    ["cancel", "unsubscribe", "stop"], ["unsubscribe"], ["cancel subscription", "unsubscribe", "stop subscription", "end plan"],
    "window", [...CAL(), poly([[9.5, 13], [14.5, 18]]), poly([[14.5, 13], [9.5, 18]])]),

  /* ── the budget envelope ────────────────────────────────────────────────────── */
  c("budget-envelope", "Budget envelope", "An envelope with a note standing in it and a coin on the note — the cash set aside for one thing",
    ["envelope", "cash", "allocate"], ["cash-envelope"], ["budget envelope", "cash envelope", "envelope budgeting", "envelope system"],
    "envelope", [...ENVELOPE(), ...coinMark(SMALL, 9)]),
  c("budget-set", "Set budget", "The budget envelope with a plus on its note — an amount decided",
    ["set", "plan", "allocate"], [], ["set budget", "create budget", "budget amount", "new budget"],
    "envelope", [...ENVELOPE(), ...add(SMALL, 9)]),
  c("budget-exceeded", "Budget exceeded", "The budget envelope with an exclamation on its note — more spent than was set",
    ["exceeded", "over", "warning"], ["over-budget"], ["budget exceeded", "over budget", "overspent", "budget warning"],
    "envelope", [...ENVELOPE(), ...alert(SMALL, 9)]),
  c("budget-remaining", "Budget remaining", "The budget envelope with a line partway up its note — how much of the budget is left",
    ["remaining", "left", "available"], [], ["budget remaining", "remaining budget", "left to spend", "budget left"],
    "envelope", [...ENVELOPE(), row(10, 8, 16)]),

  /* ── the receipt ────────────────────────────────────────────────────────────── */
  c("expense-add", "Add expense", "A receipt with a plus on it — a cost written down",
    ["add", "record", "log"], [], ["add expense", "log expense", "record expense", "new expense"],
    "receipt", [RECEIPT(), ...add(SMALL, 10)]),
  c("expense-category", "Expense category", "A receipt with a folder on it — filed by what kind of cost it was",
    ["category", "tag", "classify"], [], ["expense category", "categorise expense", "expense type", "tag expense"],
    "receipt", [RECEIPT(), poly([[7, 8], [10, 8], [12, 10], [17, 10], [17, 14.5], [7, 14.5]], true)]),
  c("split-bill", "Split bill", "A receipt with a line down it and a point each side — the bill shared",
    ["split", "share", "divide"], [], ["split bill", "split the bill", "share the cost", "go dutch"],
    "receipt", [RECEIPT(), col(12, 6, 14), disc(8.5, 10, 1), disc(15.5, 10, 1)]),
  c("receipt-scan", "Scan receipt", "A receipt with a scan line across it — read in from paper",
    ["scan", "capture", "ocr"], [], ["scan receipt", "receipt scanner", "capture receipt", "photograph receipt"],
    "receipt", [RECEIPT(), row(10, 4, 20)]),
  c("receipt-store", "Store receipt", "A receipt with a bookmark on it — kept for later",
    ["store", "keep", "archive"], [], ["store receipt", "keep receipt", "save receipt", "receipt archive"],
    "receipt", [RECEIPT(), ...bookmarkMark(SMALL, 10)]),
  c("mileage-claim", "Mileage claim", "A receipt with a pin on it — the miles driven, claimed back",
    ["mileage", "travel", "claim"], [], ["mileage claim", "mileage expense", "travel claim", "miles driven"],
    "receipt", [RECEIPT(), ...pinMark(SMALL, 10)]),

  /* ── the bill, on the slip ──────────────────────────────────────────────────── */
  c("bill-due", "Bill due", "A slip with a clock on it — a bill whose day is coming",
    ["bill", "due", "date"], [], ["bill due", "payment due", "due date", "upcoming bill"],
    "slip", [SLIP(), ...clockMark(SMALL, 12)]),
  c("bill-paid", "Bill paid", "A slip with a check on it — a bill settled",
    ["bill", "paid", "settled"], [], ["bill paid", "paid bill", "payment made", "settled"],
    "slip", [SLIP(), ...check(SMALL, 12)]),
  c("bill-overdue", "Bill overdue", "A slip with an exclamation on it — a bill past its day",
    ["bill", "overdue", "late"], [], ["bill overdue", "overdue payment", "late bill", "missed payment"],
    "slip", [SLIP(), ...alert(SMALL, 12)]),
  c("bill-reminder", "Bill reminder", "A slip with a flag on it — a bill flagged so it is not forgotten",
    ["bill", "reminder", "notify"], [], ["bill reminder", "payment reminder", "remind me to pay", "bill alert"],
    "slip", [SLIP(), ...flagMark(SMALL, 12)]),
  c("utility-bill", "Utility bill", "A slip with a bolt on it — the bill for power, water and gas",
    ["utility", "energy", "bill"], ["energy-bill"], ["utility bill", "electricity bill", "energy bill", "gas bill"],
    "slip", [SLIP(), ...boltMark(SMALL, 12)]),
  c("phone-bill", "Phone bill", "A slip with a phone on it — the bill for the line",
    ["phone", "mobile", "bill"], [], ["phone bill", "mobile bill", "telecom bill", "phone plan cost"],
    "slip", [SLIP(), poly([[10, 8], [14, 8], [14, 16], [10, 16]], true)]),
  c("insurance-premium", "Insurance premium", "An umbrella — the cover that is paid for each month",
    ["insurance", "premium", "cover"], [], ["insurance premium", "premium payment", "insurance cost", "umbrella"],
    "umbrella", [arc(12, 12, 9, 180, 360), row(12, 3, 21), col(12, 12, 18), arc(10, 18, 2, 0, 180)]),
  c("payslip", "Payslip", "A slip with a line and an amount at its end — what was earned, and what was kept",
    ["payslip", "pay", "wage"], ["pay-stub"], ["payslip", "pay stub", "wage slip", "salary statement"],
    "slip", [SLIP(), row(9, 6, 15), row(13, 6, 12), disc(16, 13, 1)]),
  c("cash-flow", "Cash flow", "A slip with an arrow rising and an arrow falling — money in and money out",
    ["flow", "in", "out"], [], ["cash flow", "money in and out", "inflow outflow", "cashflow"],
    "slip", [SLIP(), col(9, 8, 16), poly([[6.5, 10.5], [9, 8], [11.5, 10.5]]), col(15, 8, 16), poly([[12.5, 13.5], [15, 16], [17.5, 13.5]])]),
  c("net-worth", "Net worth", "A pair of scales with a coin balanced on the beam — what is owned, weighed against what is owed",
    ["net", "worth", "total"], [], ["net worth", "total assets", "scales", "assets minus debts"],
    "figure", [raw("M3 7H21M3 7A3 3 0 0 0 9 7M15 7A3 3 0 0 0 21 7", "the beam of the scales and the two pans hung from its ends, one path"), col(12, 7, 19), row(19, 8, 16), disc(12, 5, 2)]),
  c("loan", "Loan", "A slip with an arrow each way — money lent, money owed back",
    ["loan", "borrow", "lend"], ["borrow"], ["loan", "borrow money", "personal loan", "lending"],
    "slip", [SLIP(), ...ARROW_LR(12, 8, 16)]),
  c("loan-repay", "Repay loan", "A slip with an arrow going back — the borrowed money returned",
    ["repay", "return", "instalment"], ["repayment"], ["repay loan", "loan repayment", "pay back", "instalment"],
    "slip", [SLIP(), ...ARROW_L(12, 8, 16)]),

  /* ── the home ───────────────────────────────────────────────────────────────── */
  c("mortgage", "Mortgage", "A house with a percent in it — the loan the house is bought with",
    ["mortgage", "house", "loan"], ["home-loan"], ["mortgage", "home loan", "mortgage rate", "house payment"],
    "figure", [...HOUSE(), disc(10, 13.5, 1), poly([[9.5, 17.5], [14.5, 12.5]]), disc(14, 16.5, 1)]),
  c("rent-payment", "Rent payment", "A house with a coin in it — what living there costs each month",
    ["rent", "housing", "payment"], ["rent"], ["rent payment", "pay rent", "monthly rent", "rent due"],
    "figure", [...HOUSE(), disc(12, 15.5, 3), col(12, 13.5, 17.5)]),

  /* ── the cards and the pot ──────────────────────────────────────────────────── */
  c("subscription-list", "Subscription list", "The payment card with a list under the band — everything charged every month",
    ["subscriptions", "list", "recurring"], [], ["subscription list", "my subscriptions", "recurring charges", "manage subscriptions"],
    "card", [...CARD(), ...listMark(SMALL, 14)]),
  c("emergency-fund", "Emergency fund", "A jar with an exclamation in it — the pot for when things go wrong",
    ["emergency", "reserve", "safety"], ["rainy-day-fund"], ["emergency fund", "rainy day fund", "safety net", "reserve savings"],
    "jar", [...JAR(), ...alert(SMALL, 15.5)]),
];
