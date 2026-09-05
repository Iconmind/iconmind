/**
 * R15 · FinOps, billing & quotas — what a thing costs, how it is billed, and where the
 * limit is.
 *
 * What is billed is a receipt: the tape torn off at the foot that R07's logs use, with the
 * line items on it. What is priced is the banknote. What is limited is a tank — the open
 * frame access-grant stands in — with the fill and the line it may not pass. What is
 * labelled is the tag; what is subscribed to is the ticket; what spends is the machine.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { alarm, banknote, cycle, machine, padlock, window_ } from "../bodies.ts";
import {
  SMALL, add, clockMark, coinMark, listMark, lockMark, remove, shieldMark, trendMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "cloud", subcategory: "cost", name, description,
  tags, aliases, keywords, family, shapes,
});

/** A receipt: the tape R07's logs are printed on. Lines at y 7/11/15, marks at cy 10. */
const RECEIPT = () =>
  raw("M6 2H18A2 2 0 0 1 20 4V19L18 17L16 19L14 17L12 19L10 17L8 19L6 17L4 19V4A2 2 0 0 1 6 2Z",
    "a receipt: a rounded head and a foot torn along a zigzag", true);
/** A tank: the open frame access-grant stands in. Fill lines run x 7..17. */
const TANK = () => frame(5, 4, 14, 16, 3, { gap: 3 });
/** The tag `tag` draws, hole and all. Its hollow holds a mark at (12, 14). */
const TAG = () => [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), disc(7, 10, 1)];
/** A ticket: a card with a half-round notch bitten out of each side. Marks at cy 12. */
const TICKET = () => raw(
  "M4 5H20A2 2 0 0 1 22 7V10A2 2 0 0 0 22 14V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V14A2 2 0 0 0 2 10V7A2 2 0 0 1 4 5Z",
  "a ticket: a rounded card with a notch in each side", true);
/** The bin `trash` draws: a can under a lid. */
const BIN = () => [rect(6, 8, 12, 12, 2), row(5, 3, 21)];
/** The set's bolt, 2.5 wide, with its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);

export const BATCH_102: Icon[] = [
  /* ── On the receipt ───────────────────────────────────────────────────────────── */
  c("line-item", "Line item", "A receipt with one line that ends in a price — a single thing charged for",
    ["invoice", "item", "billing"], [], ["line item", "invoice line", "charge line", "itemised"],
    "receipt", [RECEIPT(), row(7, 7, 17), row(11, 7, 11), row(11, 14, 17), row(15, 7, 17)]),
  c("usage-record", "Usage record", "A receipt with bulleted entries — each unit of use, written down as it happened",
    ["usage", "record", "billing"], [], ["usage record", "usage event", "metering record", "consumption log"],
    "receipt", [RECEIPT(), disc(8, 7, 1), row(7, 10.5, 17), disc(8, 11, 1), row(11, 10.5, 17)]),
  c("invoice-draft", "Draft invoice", "A receipt with a pencil stroke across it — an invoice not yet sent",
    ["invoice", "draft", "billing"], [], ["draft invoice", "invoice draft", "unsent invoice", "pending invoice"],
    "receipt", [RECEIPT(), poly([[8, 14], [14, 8]])]),
  c("invoice-void", "Void invoice", "A receipt with a cross on it — an invoice cancelled before it was paid",
    ["invoice", "void", "billing"], [], ["void invoice", "cancel invoice", "voided", "invoice cancelled"],
    "receipt", [RECEIPT(), poly([[9, 8], [15, 14]]), poly([[15, 8], [9, 14]])]),
  c("credit-note", "Credit note", "A receipt with a minus on it — money owed back, set against the next bill",
    ["invoice", "credit", "billing"], [], ["credit note", "credit memo", "refund credit", "negative invoice"],
    "receipt", [RECEIPT(), ...remove(SMALL, 10)]),
  c("proration", "Proration", "A receipt with a line and a divider under it — a charge split at the day the plan changed",
    ["billing", "prorate", "partial"], [], ["proration", "prorated charge", "partial period", "mid-cycle change"],
    "receipt", [RECEIPT(), row(9, 7, 17), col(12, 12, 15.5)]),
  c("tax-rate", "Tax rate", "A receipt with a percent sign on it — the share added on top",
    ["tax", "rate", "billing"], [], ["tax rate", "vat", "sales tax", "tax percentage"],
    "receipt", [RECEIPT(), disc(9.5, 8, 1), poly([[8.5, 13.5], [15.5, 6.5]]), disc(14.5, 12, 1)]),
  c("dunning", "Dunning", "A receipt with an exclamation mark — the reminders sent when a bill goes unpaid",
    ["billing", "overdue", "reminder"], [], ["dunning", "payment reminder", "overdue notice", "collections"],
    "receipt", [RECEIPT(), col(12, 6, 11), disc(12, 14, 1)]),
  c("payment-retry", "Payment retry", "A receipt with an arrow looping back — a failed charge tried again",
    ["billing", "retry", "payment"], [], ["payment retry", "retry charge", "smart retry", "failed payment retry"],
    "receipt", [RECEIPT(), poly([[8.5, 13], [8.5, 8], [15.5, 8], [15.5, 13]]), poly([[13, 10.5], [15.5, 13], [18, 10.5]])]),
  c("usage-export", "Usage export", "A receipt with an arrow rising out of it — the usage data handed over as a file",
    ["usage", "export", "billing"], [], ["usage export", "export usage", "billing export", "cost and usage report"],
    "receipt", [RECEIPT(), col(12, 7, 13), poly([[9.5, 9.5], [12, 7], [14.5, 9.5]])]),

  /* ── On the banknote ──────────────────────────────────────────────────────────── */
  c("spot-price", "Spot price", "A banknote with a bolt on it — a price that changes minute to minute",
    ["price", "spot", "market"], [], ["spot price", "spot pricing", "preemptible price", "market price"],
    "banknote", [...banknote(), BOLT(13.5, 9.5)]),
  c("on-demand-price", "On-demand price", "A banknote with a clock on it — pay for the hours you use, no promise made",
    ["price", "on-demand", "hourly"], [], ["on-demand price", "pay as you go", "hourly rate", "list price"],
    "banknote", [...banknote(), ...clockMark(SMALL, 12)]),
  c("commitment-discount", "Commitment discount", "A banknote with a lock on it — a lower price for promising a term",
    ["discount", "commitment", "price"], [], ["commitment discount", "committed use discount", "reserved instance discount", "term discount"],
    "banknote", [...banknote(), ...lockMark(SMALL, 12)]),
  c("volume-discount", "Volume discount", "A banknote with a line stepping down — the more you buy, the less each one costs",
    ["discount", "volume", "price"], [], ["volume discount", "bulk pricing", "price per unit falls", "graduated discount"],
    "banknote", [...banknote(), poly([[8.5, 9.5], [11, 12], [13, 10], [15.5, 12.5]])]),
  c("tiered-pricing", "Tiered pricing", "A banknote with a staircase on it — a different price for each band of use",
    ["price", "tier", "plan"], [], ["tiered pricing", "pricing tiers", "price bands", "tier thresholds"],
    "banknote", [...banknote(), poly([[8, 14.5], [10.5, 14.5], [10.5, 12], [13, 12], [13, 9.5], [15.5, 9.5]])]),
  c("seat-billing", "Seat billing", "A banknote with a head on it — a price per person with access",
    ["billing", "seat", "per-user"], [], ["seat billing", "per-seat pricing", "per user", "licensed seats"],
    "banknote", [...banknote(), disc(12, 10.5, 2), row(15, 9, 15)]),
  c("metered-billing", "Metered billing", "A banknote with a small meter on it — a price per unit, read off the meter",
    ["billing", "metered", "usage"], [], ["metered billing", "usage-based billing", "consumption billing", "pay per unit"],
    "banknote", [...banknote(), arc(12, 13.5, 3.5, 200, 340), poly([[12, 13.5], [14.5, 11]])]),
  c("price-book", "Price book", "A banknote with a list on it — every product and what it costs",
    ["price", "catalogue", "list"], [], ["price book", "price list", "rate card", "pricing catalogue"],
    "banknote", [...banknote(), ...listMark(SMALL, 12)]),
  c("rate-plan", "Rate plan", "A banknote with a grid on it — the set of rates a customer is on",
    ["price", "plan", "rate"], [], ["rate plan", "pricing plan", "plan rates", "billing plan"],
    "banknote", [...banknote(), col(10, 9, 15), col(14, 9, 15), row(12, 8, 16)]),
  c("currency-convert", "Currency conversion", "A banknote with an arrow pointing both ways — one currency swapped for another",
    ["currency", "convert", "billing"], [], ["currency conversion", "exchange rate", "multi-currency", "fx"],
    "banknote", [...banknote(), row(12, 8, 16), poly([[10.5, 9.5], [8, 12], [10.5, 14.5]]), poly([[13.5, 9.5], [16, 12], [13.5, 14.5]])]),
  c("amortised-cost", "Amortised cost", "A banknote with three equal bars on it — one payment spread evenly over its term",
    ["cost", "amortised", "accounting"], [], ["amortised cost", "amortized cost", "spread over term", "straight-line cost"],
    "banknote", [...banknote(), col(9, 10, 14), col(12, 10, 14), col(15, 10, 14)]),
  c("unit-economics", "Unit economics", "A banknote with a one on it — what a single unit earns and costs",
    ["cost", "unit", "economics"], [], ["unit economics", "cost per unit", "margin per unit", "unit cost"],
    "banknote", [...banknote(), poly([[9.5, 11.5], [12, 9], [12, 15]])]),
  c("chargeback", "Chargeback", "A banknote with an arrow pointing back — a cost billed to the team that caused it",
    ["cost", "chargeback", "allocation"], [], ["chargeback", "charge back to team", "internal billing", "cost recovery"],
    "banknote", [...banknote(), row(12, 9, 15), poly([[11.5, 9.5], [9, 12], [11.5, 14.5]])]),
  c("showback", "Showback", "A banknote with an eye on it — a cost shown to the team, without a bill",
    ["cost", "showback", "visibility"], [], ["showback", "cost visibility", "show the bill", "informational charge"],
    "banknote", [...banknote(), arc(12, 12, 5, 200, 340), disc(12, 12, 2)]),
  c("cost-allocation", "Cost allocation", "A banknote with one line splitting into two — a shared cost divided among its users",
    ["cost", "allocation", "split"], [], ["cost allocation", "split shared cost", "allocation rule", "cost distribution"],
    "banknote", [...banknote(), poly([[7.5, 12], [10, 12], [12.5, 9.5], [15, 9.5]]), poly([[10, 12], [12.5, 14.5], [15, 14.5]])]),
  c("commitment-coverage", "Commitment coverage", "A banknote with a shield on it — how much of the spend a commitment covers",
    ["cost", "commitment", "coverage"], [], ["commitment coverage", "reservation coverage", "covered spend", "coverage rate"],
    "banknote", [...banknote(), ...shieldMark(SMALL, 12)]),
  c("idle-cost", "Idle cost", "A banknote with a Z on it — money paid for something that was asleep",
    ["cost", "idle", "waste"], [], ["idle cost", "idle resources", "paying for nothing", "unused spend"],
    "banknote", [...banknote(), poly([[9.5, 9.5], [14.5, 9.5], [9.5, 14.5], [14.5, 14.5]])]),

  /* ── In the tank ──────────────────────────────────────────────────────────────── */
  c("soft-limit", "Soft limit", "A tank with a dashed line above the fill — a level you may pass, and will be told about",
    ["quota", "limit", "soft"], [], ["soft limit", "warning threshold", "soft cap", "alert level"],
    "window", [TANK(), row(10, 8, 10.5), row(10, 13.5, 16), row(15, 7, 17)]),
  c("hard-limit", "Hard limit", "A tank with a solid line and a cross under it — a level nothing gets past",
    ["quota", "limit", "hard"], [], ["hard limit", "hard cap", "enforced limit", "blocked at limit"],
    "window", [TANK(), row(9, 7, 17), poly([[10, 12], [14, 16]]), poly([[14, 12], [10, 16]])]),
  c("overage", "Overage", "A tank with a chevron above the line — use that went past what the plan allows",
    ["quota", "overage", "billing"], [], ["overage", "over the limit", "overage charge", "excess usage"],
    "window", [TANK(), row(13, 7, 17), poly([[9.5, 10], [12, 7.5], [14.5, 10]])]),
  c("quota-request", "Quota request", "A tank with a plus in it — asking for more room",
    ["quota", "request", "limit"], [], ["quota request", "request more quota", "raise limit request", "limit increase request"],
    "window", [TANK(), ...add(SMALL, 12)]),
  c("quota-increase", "Quota increase", "A tank with an arrow rising in it — the line moved up",
    ["quota", "increase", "limit"], [], ["quota increase", "limit raised", "more quota", "higher cap"],
    "window", [TANK(), col(12, 8, 16), poly([[9.5, 10.5], [12, 8], [14.5, 10.5]])]),
  c("utilisation-rate", "Utilisation rate", "A tank with three fill lines — how much of what is paid for is actually used",
    ["cost", "utilisation", "efficiency"], [], ["utilisation rate", "utilization", "how full", "capacity used"],
    "window", [TANK(), row(11, 7, 17), row(14, 7, 17), row(17, 7, 17)]),

  /* ── On the tag and the ticket ────────────────────────────────────────────────── */
  c("cost-tag", "Cost tag", "A tag with a coin on it — the label a cost is grouped by",
    ["cost", "tag", "allocation"], [], ["cost tag", "cost allocation tag", "billing tag", "tag by team"],
    "object", [...TAG(), ...coinMark(SMALL, 14)]),
  c("discount-code", "Discount code", "A tag with a code on it — a string typed in for money off",
    ["discount", "code", "promo"], [], ["discount code", "promo code", "coupon code", "voucher"],
    "object", [...TAG(), col(10, 11, 17), col(14, 11, 17), row(14, 8, 16)]),
  c("subscription-upgrade", "Upgrade subscription", "A ticket with two chevrons rising — moved to a bigger plan",
    ["subscription", "upgrade", "plan"], [], ["upgrade subscription", "upgrade plan", "move up a tier", "higher plan"],
    "ticket", [TICKET(), poly([[9.5, 11], [12, 8.5], [14.5, 11]]), poly([[9.5, 15], [12, 12.5], [14.5, 15]])]),
  c("subscription-downgrade", "Downgrade subscription", "A ticket with two chevrons dropping — moved to a smaller plan",
    ["subscription", "downgrade", "plan"], [], ["downgrade subscription", "downgrade plan", "move down a tier", "lower plan"],
    "ticket", [TICKET(), poly([[9.5, 9], [12, 11.5], [14.5, 9]]), poly([[9.5, 13], [12, 15.5], [14.5, 13]])]),
  c("trial-period", "Trial period", "A ticket with a clock on it — the days before the first charge",
    ["subscription", "trial", "period"], [], ["trial period", "free trial", "trial days", "trial ends"],
    "ticket", [TICKET(), ...clockMark(SMALL, 12)]),
  c("grace-period", "Grace period", "A ticket with an hourglass on it — the days allowed after a payment fails",
    ["subscription", "grace", "period"], [], ["grace period", "grace days", "past due grace", "before suspension"],
    "ticket", [TICKET(), poly([[10, 10], [14, 10], [10, 14], [14, 14]], true)]),

  /* ── What spends ──────────────────────────────────────────────────────────────── */
  c("reserved-capacity", "Reserved capacity", "A machine frame with a block set aside in it — capacity bought ahead and held",
    ["capacity", "reserved", "commitment"], [], ["reserved capacity", "reserved instances", "capacity reservation", "bought ahead"],
    "machine", [machine(), rect(8.5, 8.5, 7, 7, 2)]),
  c("cost-centre", "Cost centre", "A machine frame with a coin in it — the unit a cost is booked to",
    ["cost", "centre", "accounting"], [], ["cost centre", "cost center", "booked to", "department cost"],
    "machine", [machine(), ...coinMark(SMALL, 12)]),
  c("rightsize", "Rightsize", "A machine frame with brackets pulling inward — a machine sized to what it actually does",
    ["cost", "rightsize", "efficiency"], [], ["rightsize", "right-sizing", "downsize instance", "fit to load"],
    "machine", [machine(), poly([[9.5, 9.5], [7, 12], [9.5, 14.5]]), poly([[14.5, 9.5], [17, 12], [14.5, 14.5]])]),
  c("orphan-resource", "Orphan resource", "A machine frame with a wire that stops short of its node — something still billed that nothing uses",
    ["cost", "orphan", "waste"], [], ["orphan resource", "orphaned volume", "unattached resource", "forgotten resource"],
    "machine", [machine(), row(12, 7, 10.5), disc(14, 12, 2)]),

  /* ── Budgets and alarms ───────────────────────────────────────────────────────── */
  c("budget-forecast", "Budget forecast", "Axes with a budget line and a spend line heading for it — when the money runs out at this rate",
    ["budget", "forecast", "spend"], [], ["budget forecast", "forecast vs budget", "projected spend", "burn to budget"],
    "axes", [col(4, 4, 20), row(20, 4, 20), row(8, 7, 19), poly([[7, 17], [12, 12]]), disc(14.5, 9.5, 1)]),
  c("budget-period", "Budget period", "A window with a header and a span marked under it — the months a budget covers",
    ["budget", "period", "calendar"], [], ["budget period", "budget month", "budget quarter", "fiscal period"],
    "window", [window_(), row(9, 6, 18), col(9, 12, 18), col(15, 12, 18)]),
  c("spend-alert-daily", "Daily spend alert", "The alarm bell with a coin in it — rung when a day's spend goes over",
    ["spend", "alert", "daily"], [], ["daily spend alert", "spend threshold", "daily budget alert", "cost alarm"],
    "bell", [...alarm(), ...coinMark(SMALL, 11)]),
  c("anomaly-spend", "Spend anomaly", "The alarm bell with a rising trend in it — spend that jumped when nothing should have changed",
    ["spend", "anomaly", "alert"], [], ["spend anomaly", "cost anomaly alert", "unexpected spend", "spike in cost"],
    "bell", [...alarm(), ...trendMark(SMALL, 11)]),
  c("waste-detect", "Waste detection", "A bin with a coin in it — money found going nowhere",
    ["cost", "waste", "detect"], [], ["waste detection", "cloud waste", "unused spend found", "savings opportunity"],
    "window", [...BIN(), ...coinMark(SMALL, 14)]),
  c("cost-budget-lock", "Budget lock", "A padlock with a coin in it — a budget that cannot be raised without a signature",
    ["budget", "lock", "control"], [], ["budget lock", "locked budget", "spend control", "budget enforcement"],
    "lock", [...padlock(), ...coinMark(SMALL, 15.5)]),
  c("billing-cycle", "Billing cycle", "The rotation loop with a coin in it — the period after which the bill comes round again",
    ["billing", "cycle", "period"], [], ["billing cycle", "billing period", "monthly billing", "renewal"],
    "rotation", [...cycle(), ...coinMark(SMALL, 12)]),
];
