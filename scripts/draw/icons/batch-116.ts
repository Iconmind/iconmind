/**
 * R29 · Finance: accounting & tax — the books, what goes in them, and what the state
 * takes out.
 *
 * Objects first. The T-account is the accountant's oldest drawing: a bar and a post,
 * debits on the left and credits on the right. The rubber stamp says paid. The ledger
 * is the book from R25, ruled; the money bag from R28 holds the profit, the loss and
 * the tax; the axes from the analytics rounds carry the charts; the budget envelope
 * carries the invoices, since an invoice is a bill put in the post. Bars, a briefcase,
 * the calendar, the slip, the receipt, the basket, the jar and the bank do the rest.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { window_ } from "../bodies.ts";
import { SMALL, add, alert, check, clockMark, flagMark, remove, squareMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "finance", subcategory: "accounting", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The T-account: a bar across the top and a post down the middle; debits left, credits right. */
const T = () => [row(5, 3, 21), col(12, 5, 21)];
/** The rubber stamp: a knob, a stem, the block, and the line it leaves. */
const STAMP = () => [poly([[9, 3], [15, 3], [15, 8], [9, 8]], true), col(12, 8, 12), poly([[4, 12], [20, 12], [20, 17], [4, 17]], true), row(20, 6, 18)];
/** A book: a cover with the spine's line down it. The page is x 9..19, y 4..20; content centred on x 14. */
const BOOK = () => [rect(4, 3, 16, 18, 2), col(8, 3, 21)];
/** The money bag: a tied neck over a round belly. Marks at cy 15. */
const BAG = () => raw("M9.5 4H14.5V6.5L18 10A7 7 0 1 1 6 10L9.5 6.5Z", "a money bag: a tied neck, shoulders at 45°, and one round belly, one path", true);
/** The budget envelope: a pocket with its V, and a note standing in it. Marks at cy 9. */
const ENVELOPE = () => [poly([[2, 11], [2, 21], [22, 21], [22, 11], [12, 21]], true), poly([[5, 14], [5, 3], [19, 3], [19, 14]])];
/** The axes a chart is drawn on. */
const AXES = () => [col(4, 4, 20), row(20, 4, 20)];
/** The slip: a wide sheet with a folded corner. Marks at cy 12, clear of the fold above x 18. */
const SLIP = () => raw("M4 5H18L22 9V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V7A2 2 0 0 1 4 5ZM18 5V9H22", "a slip: a wide sheet with its top-right corner folded over", false);
/** The calendar: a window with its rail and two pegs. Content 5 tall at cy 15.5. */
const CAL = () => [window_(), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5)];
/** A receipt: the tape bills are printed on. Marks at cy 10. */
const RECEIPT = () =>
  raw("M6 2H18A2 2 0 0 1 20 4V19L18 17L16 19L14 17L12 19L10 17L8 19L6 17L4 19V4A2 2 0 0 1 6 2Z",
    "a receipt: a rounded head and a foot torn along a zigzag", true);
/** The basket: a box with a handle arched over its rim. Marks at cy 15. */
const BASKET = () => [rect(3, 8, 18, 14, 2), arc(12, 8, 5, 180, 360)];
/** A jar: a body rounded at the foot, a lid narrower than the body. Marks at cy 15.5. */
const JAR = () => [raw("M6 9H18V19A3 3 0 0 1 15 22H9A3 3 0 0 1 6 19Z", "a jar: square shoulders, a rounded foot", true), poly([[8, 9], [8, 4], [16, 4], [16, 9]])];
/** The bank: a pediment on a beam carried by two columns over a floor. Marks at cy 15. */
const BANK = () => raw("M2 21H22M5 21V9M19 21V9M2 9H22M5 9L10.5 3.5H13.5L19 9", "a portico: floor, two columns, the beam across them and the pediment on the beam, one path", false);
/** The product: a parcel with a lid line and tape. Marks at cy 15. */
const BOX = () => [rect(3, 4, 18, 18, 2), row(8, 4, 20), col(12, 4, 8)];
/** A briefcase: the case and its handle. Content at cy 14.5. */
const CASE = () => [rect(3, 9, 18, 11, 2), poly([[9, 9], [9, 5], [15, 5], [15, 9]])];
/** A person: the head, and shoulders wide enough to carry a mark on the chest at cy 17. */
const PERSON = () => [disc(12, 6, 3), arc(12, 21, 9, 180, 360)];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** A percent sign 6 wide and 6 tall, centred on (12, cy). */
const PERCENT = (cy: number) => [disc(9.5, cy - 2.5, 1), poly([[9, cy + 3], [15, cy - 3]]), disc(14.5, cy + 2.5, 1)];
/** A hash of two columns and a row, 6 wide, centred on (12, cy). */
const HASH = (cy: number) => [col(10, cy - 3, cy + 3), col(14, cy - 3, cy + 3), row(cy, 8, 16)];
/** An hourglass 5 wide and 5 tall, centred on (12, cy). */
const SAND = (cy: number) => poly([[9.5, cy - 2.5], [14.5, cy - 2.5], [9.5, cy + 2.5], [14.5, cy + 2.5]], true);
/** The right-pointing arrow: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The left-pointing arrow: a shaft and a 45° head that ends it at x0. */
const ARROW_L = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]])];

export const BATCH_116: Icon[] = [
  /* ── the T-account ──────────────────────────────────────────────────────────── */
  c("debit", "Debit", "The T-account with an entry on its left — what came in",
    ["entry", "left", "bookkeeping"], [], ["debit", "debit entry", "dr", "left side"],
    "t-account", [...T(), disc(7.5, 12, 2)]),
  c("credit-entry", "Credit entry", "The T-account with an entry on its right — where it came from",
    ["entry", "right", "bookkeeping"], [], ["credit entry", "credit", "cr", "right side"],
    "t-account", [...T(), disc(16.5, 12, 2)]),
  c("double-entry", "Double entry", "The T-account with an entry on each side — every amount written twice",
    ["entries", "pairs", "bookkeeping"], [], ["double entry", "double-entry bookkeeping", "two entries", "balanced entry"],
    "t-account", [...T(), row(10, 5, 9.5), row(14, 14.5, 19)]),
  c("trial-balance", "Trial balance", "The T-account with a weight on each side — the two columns adding up the same",
    ["balance", "check", "totals"], [], ["trial balance", "balance the books", "ledger totals", "unadjusted balance"],
    "t-account", [...T(), disc(7.5, 12, 2), disc(16.5, 12, 2)]),

  /* ── the book ───────────────────────────────────────────────────────────────── */
  c("ledger", "Ledger", "The book ruled into columns — every account, line by line",
    ["book", "accounts", "records"], ["general-ledger"], ["ledger", "general ledger", "account book", "books"],
    "book", [...BOOK(), col(14, 6, 18), row(12, 10, 18)]),
  c("journal-entry", "Journal entry", "The book with a pencil stroke on its page — a transaction written in",
    ["journal", "entry", "record"], [], ["journal entry", "post entry", "book entry", "record transaction"],
    "book", [...BOOK(), poly([[11, 17], [17, 11]])]),
  c("chart-of-accounts", "Chart of accounts", "The book with a tree of headings — every account, and how they nest",
    ["accounts", "structure", "list"], [], ["chart of accounts", "account list", "account structure", "coa"],
    "book", [...BOOK(), col(11, 7, 17), row(10, 11, 16), row(13.5, 11, 16), row(17, 11, 16)]),
  c("month-close", "Month close", "The book with a check on its page — the month's books done",
    ["close", "month", "period"], [], ["month close", "month-end close", "close the month", "period close"],
    "book", [...BOOK(), poly([[11, 12], [13, 14], [17, 10]])]),
  c("quarter-close", "Quarter close", "The book with a padlock on its page — the quarter shut, nothing more written",
    ["close", "quarter", "lock"], [], ["quarter close", "quarter-end close", "close the quarter", "lock period"],
    "book", [...BOOK(), poly([[11, 14], [17, 14], [17, 17], [11, 17]], true), arc(14, 14, 1.5, 180, 360)]),
  c("audit-books", "Audit the books", "The book with a lens on its page — someone else reading every line",
    ["audit", "inspect", "review"], [], ["audit the books", "financial audit", "audit accounts", "books audited"],
    "book", [...BOOK(), disc(13, 11, 2), poly([[14.5, 12.5], [17, 15]])]),
  c("tax-return", "Tax return", "The book with a percent on its page — the year's tax worked out and sent",
    ["tax", "return", "filing"], ["tax-filing"], ["tax return", "file taxes", "tax filing", "annual return"],
    "book", [...BOOK(), disc(11.5, 9.5, 1), poly([[11, 15], [17, 9]]), disc(16.5, 14.5, 1)]),
  c("tax-code", "Tax code", "The book with a hash on its page — the code the tax office knows you by",
    ["tax", "code", "identifier"], [], ["tax code", "tax id", "tax number", "tax identifier"],
    "book", [...BOOK(), col(12, 9, 15), col(16, 9, 15), row(12, 10, 18)]),

  /* ── the statements, on the slip ────────────────────────────────────────────── */
  c("balance-sheet", "Balance sheet", "A sheet with two columns of the same height — what is owned, and whom it is owed to",
    ["statement", "assets", "liabilities"], [], ["balance sheet", "statement of position", "assets and liabilities", "financial position"],
    "slip", [SLIP(), col(9.5, 8.5, 15.5), col(14.5, 8.5, 15.5)]),
  c("income-statement", "Income statement", "A sheet with an arrow rising on it — what came in, what it cost, what was left",
    ["statement", "income", "profit"], ["profit-and-loss"], ["income statement", "profit and loss", "p&l", "statement of income"],
    "slip", [SLIP(), col(12, 9, 15), poly([[9.5, 11.5], [12, 9], [14.5, 11.5]])]),
  c("cash-flow-statement", "Cash flow statement", "A sheet with a line running up and down — where the cash went, month by month",
    ["statement", "cash", "flow"], [], ["cash flow statement", "statement of cash flows", "cash movements", "cash report"],
    "slip", [SLIP(), poly([[6, 14], [8.5, 11.5], [11, 14], [13.5, 11.5], [16, 14]])]),
  c("accrual", "Accrual", "A sheet with a coin on it — money counted when it is earned, not when it lands",
    ["accrual", "earned", "timing"], [], ["accrual", "accrued income", "accrual accounting", "accrued expense"],
    "slip", [SLIP(), disc(12, 12, 3), col(12, 10, 14)]),
  c("reconcile", "Reconcile", "A sheet with an equals on it — the two records made to agree",
    ["reconcile", "match", "agree"], ["reconciliation"], ["reconcile", "reconciliation", "match records", "agree the books"],
    "slip", [SLIP(), row(10, 8, 16), row(14, 8, 16)]),
  c("bank-reconcile", "Bank reconciliation", "The bank with an equals between its columns — the statement and the books made to agree",
    ["bank", "reconcile", "statement"], [], ["bank reconciliation", "reconcile bank", "match bank statement", "bank rec"],
    "bank", [BANK(), row(13.5, 8, 16), row(16.5, 8, 16)]),

  /* ── the bag ────────────────────────────────────────────────────────────────── */
  c("profit", "Profit", "The money bag with a plus in it — more came in than went out",
    ["profit", "gain", "surplus"], [], ["profit", "net profit", "surplus", "earnings"],
    "bag", [BAG(), ...add(SMALL, 15)]),
  c("net-loss", "Net loss", "The money bag with a minus in it — more went out than came in",
    ["loss", "deficit", "shortfall"], [], ["net loss", "loss", "deficit", "shortfall"],
    "bag", [BAG(), ...remove(SMALL, 15)]),
  c("expense-claim", "Expense claim", "The money bag with an arrow coming back — money spent for the company, asked for",
    ["claim", "reimburse", "expenses"], ["reimbursement"], ["expense claim", "reimbursement", "claim expenses", "expense report"],
    "bag", [BAG(), ...ARROW_L(15, 8, 16)]),
  c("tax-due", "Tax due", "The money bag with a clock in it — the day the tax must leave it",
    ["tax", "due", "deadline"], [], ["tax due", "tax deadline", "tax payment due", "pay tax by"],
    "bag", [BAG(), ...clockMark(SMALL, 15)]),
  c("withholding", "Withholding", "The money bag with a percent in it — the share held back before it is paid",
    ["tax", "withheld", "deduction"], ["withholding-tax"], ["withholding", "withholding tax", "tax withheld", "deducted at source"],
    "bag", [BAG(), ...PERCENT(15)]),
  c("cost-code", "Cost code", "The money bag with a hash in it — which pot a cost is booked to",
    ["code", "category", "allocation"], [], ["cost code", "cost centre", "expense code", "gl code"],
    "bag", [BAG(), ...HASH(15)]),

  /* ── the chart ──────────────────────────────────────────────────────────────── */
  c("break-even", "Break-even", "A chart with two lines crossing — where what comes in first covers what goes out",
    ["break-even", "threshold", "cover"], [], ["break even", "break-even point", "cover costs", "breakeven analysis"],
    "axes", [...AXES(), poly([[7, 17], [17, 7]]), poly([[7, 9], [15, 17]])]),
  c("depreciation", "Depreciation", "A chart with a line stepping down — worth a little less each year",
    ["depreciation", "asset", "decline"], [], ["depreciation", "asset depreciation", "write down", "declining value"],
    "axes", [...AXES(), poly([[6, 6], [9, 6], [9, 9.5], [12, 9.5], [12, 13], [15, 13], [15, 16.5], [18, 16.5]])]),
  c("amortisation", "Amortisation", "A chart with a line falling straight — a cost spread evenly over the years",
    ["amortisation", "spread", "schedule"], ["amortization"], ["amortisation", "amortization", "amortisation schedule", "spread cost"],
    "axes", [...AXES(), poly([[7, 7], [18, 18]])]),
  c("variance", "Variance", "A chart with a line straying from the flat one — the plan, and what actually happened",
    ["variance", "difference", "plan"], [], ["variance", "budget variance", "plan vs actual difference", "deviation"],
    "axes", [...AXES(), row(12, 7, 19), poly([[7, 17], [19, 5]])]),
  c("forecast-cash", "Cash forecast", "A chart with a line that carries on in dashes — the cash to come, as a guess",
    ["forecast", "projection", "cash"], [], ["cash forecast", "cash flow forecast", "projection", "projected cash"],
    "axes", [...AXES(), poly([[7, 17], [11, 13]]), poly([[13, 11], [15, 9]]), poly([[17, 7], [19, 5]])]),
  c("budget-vs-actual", "Budget vs actual", "Two bars on a baseline, a line over the shorter one — what was planned, and what was spent",
    ["budget", "actual", "compare"], [], ["budget vs actual", "plan vs actual", "budget comparison", "spend against budget"],
    "chart", [row(20, 3, 21), poly([[5, 20], [5, 8], [10, 8], [10, 20]]), poly([[14, 20], [14, 14], [19, 14], [19, 20]]), row(8, 13, 20)]),
  c("margin", "Margin", "A coin with a quarter cut away — the share of the price that is kept",
    ["margin", "share", "profit"], [], ["margin", "profit margin", "gross margin", "margin percent"],
    "chart", [arc(12, 12, 9, 0, 270), row(12, 12, 21), col(12, 3, 12)]),
  c("markup", "Markup", "A bar with a thinner bar laid on it — what is added to the cost to make the price",
    ["markup", "added", "price"], [], ["markup", "price markup", "cost plus", "markup percent"],
    "bar", [rect(3, 12, 18, 8, 2), rect(3, 5, 18, 4, 2)]),

  /* ── the calendar and the period ────────────────────────────────────────────── */
  c("fiscal-year", "Fiscal year", "The calendar with a stone on it — the company's own year",
    ["fiscal", "year", "period"], ["financial-year"], ["fiscal year", "financial year", "accounting year", "fy"],
    "window", [...CAL(), STONE(12, 15.5)]),
  c("tax-year", "Tax year", "The calendar with a percent on it — the year the tax office counts by",
    ["tax", "year", "period"], [], ["tax year", "tax period", "assessment year", "tax calendar"],
    "window", [...CAL(), disc(9.5, 13.5, 1), poly([[9.5, 17.5], [14.5, 12.5]]), disc(14.5, 16.5, 1)]),
  c("deferred", "Deferred", "The calendar with an arrow moving on — money counted in a later period",
    ["deferred", "later", "postpone"], [], ["deferred", "deferred revenue", "deferred expense", "prepayment"],
    "window", [...CAL(), ...ARROW_R(15.5, 7, 17)]),

  /* ── the invoice, in the post ───────────────────────────────────────────────── */
  c("invoice-issue", "Issue invoice", "The envelope with an arrow leaving its note — the bill sent out",
    ["invoice", "send", "issue"], [], ["issue invoice", "send invoice", "raise invoice", "bill a customer"],
    "envelope", [...ENVELOPE(), ...ARROW_R(9, 8, 16)]),
  c("invoice-paid", "Invoice paid", "The envelope with a check on its note — the bill sent out, and settled",
    ["invoice", "paid", "settled"], [], ["invoice paid", "paid invoice", "invoice settled", "payment received"],
    "envelope", [...ENVELOPE(), ...check(SMALL, 9)]),
  c("invoice-overdue", "Invoice overdue", "The envelope with an hourglass on its note — the bill sent out, its time run out",
    ["invoice", "overdue", "late"], [], ["invoice overdue", "overdue invoice", "late payment", "unpaid invoice"],
    "envelope", [...ENVELOPE(), SAND(9)]),
  c("invoice-reminder", "Invoice reminder", "The envelope with a flag on its note — the bill sent out, and sent again",
    ["invoice", "reminder", "chase"], [], ["invoice reminder", "payment reminder", "chase invoice", "dunning"],
    "envelope", [...ENVELOPE(), ...flagMark(SMALL, 9)]),
  c("credit-memo", "Credit memo", "The envelope with a minus on its note — money owed back, in writing",
    ["credit", "memo", "refund"], [], ["credit memo", "credit note", "refund note", "credit issued"],
    "envelope", [...ENVELOPE(), ...remove(SMALL, 9)]),

  /* ── the receipt, the basket, the jar ───────────────────────────────────────── */
  c("purchase-invoice", "Purchase invoice", "A receipt with a box on it — the bill for what was bought in",
    ["purchase", "supplier", "bill"], ["supplier-invoice"], ["purchase invoice", "supplier invoice", "bill received", "accounts payable"],
    "receipt", [RECEIPT(), ...squareMark(SMALL, 10)]),
  c("receipt-match", "Receipt match", "A receipt with two rings linked on it — matched to the payment it belongs to",
    ["match", "reconcile", "receipt"], [], ["receipt match", "match receipt", "receipt reconciliation", "match to transaction"],
    "receipt", [RECEIPT(), disc(10.5, 10, 2), disc(13.5, 10, 2)]),
  c("vat-return", "VAT return", "The basket with a percent in it — the tax on what was sold, worked out",
    ["vat", "return", "sales-tax"], ["sales-tax-return"], ["vat return", "sales tax return", "gst return", "file vat"],
    "basket", [...BASKET(), ...PERCENT(15)]),
  c("cost-of-goods", "Cost of goods", "The product box with a percent in it — what it cost to make what was sold",
    ["cogs", "cost", "goods"], ["cogs"], ["cost of goods", "cogs", "cost of sales", "production cost"],
    "box", [...BOX(), ...PERCENT(15)]),
  c("pension-contribution", "Pension contribution", "A jar with an arrow dropping in — money put by for later, this month's share",
    ["pension", "contribution", "savings"], [], ["pension contribution", "pension payment", "retirement contribution", "pay into pension"],
    "jar", [...JAR(), col(12, 12, 18), poly([[9.5, 15.5], [12, 18], [14.5, 15.5]])]),

  /* ── the case, the stamp, the people ────────────────────────────────────────── */
  c("payroll", "Payroll", "A briefcase with a coin in it — the wages, carried to everyone",
    ["payroll", "wages", "salaries"], [], ["payroll", "wages", "salaries", "pay staff"],
    "briefcase", [...CASE(), disc(12, 14.5, 3), col(12, 12.5, 16.5)]),
  c("payroll-run", "Payroll run", "A briefcase with an arrow leaving it — the wages sent out",
    ["payroll", "run", "process"], [], ["payroll run", "run payroll", "process payroll", "pay day"],
    "briefcase", [...CASE(), ...ARROW_R(14.5, 8, 16)]),
  c("tax-paid", "Tax paid", "A rubber stamp and the line it leaves — paid, and marked so",
    ["tax", "paid", "stamp"], ["stamp"], ["tax paid", "paid stamp", "rubber stamp", "marked paid"],
    "stamp", STAMP()),
  c("bookkeeper", "Bookkeeper", "A person with a pen stroke on the chest — the one who writes it all down",
    ["bookkeeper", "records", "person"], [], ["bookkeeper", "bookkeeping", "record keeper", "clerk"],
    "person", [...PERSON(), poly([[9, 20], [15, 14]])]),
  c("accountant", "Accountant", "A person with a percent on the chest — the one who makes the numbers agree",
    ["accountant", "numbers", "person"], [], ["accountant", "cpa", "chartered accountant", "finance professional"],
    "person", [...PERSON(), disc(9.5, 14.5, 1), poly([[9, 20], [15, 14]]), disc(14.5, 19.5, 1)]),
];
