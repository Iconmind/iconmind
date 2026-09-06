/**
 * R30 · Finance: insurance & protection — the cover, the claim against it, and the
 * things people protect: a life, a home, a car, a pet, a phone, an estate.
 *
 * The umbrella is this domain's body: the canopy is the cover, and what happens to a
 * claim sits on the canopy. Under a canopy alone stand the things covered — a heart, a
 * cross, a car, a house, a case, a paw, a phone, a person. The book holds the policy,
 * the money bag what is owed or held, the slip the paperwork, the gauge the score, and
 * a pair of houses the estate.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { window_ } from "../bodies.ts";
import { SMALL, add, alert, heartMark, lockMark, pause, searchMark, shieldMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "finance", subcategory: "insurance", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The umbrella: a canopy on its handle. The canopy's hollow is x 6..18, y 4.5..10, for content 5 tall at cy 7.5. */
const UMBRELLA = () => [arc(12, 12, 9, 180, 360), row(12, 3, 21), col(12, 12, 18), arc(10, 18, 2, 0, 180)];
/** The canopy alone: a dome closed along its base. What it covers stands under it, in x 5..19, y 12.5..21. */
const CANOPY = () => [arc(12, 9.5, 7.5, 180, 360), row(9.5, 4.5, 19.5)];
/** A book: a cover with the spine's line down it. The page is x 9..19; content centred on x 14. */
const BOOK = () => [rect(4, 3, 16, 18, 2), col(8, 3, 21)];
/** The money bag: a tied neck over a round belly. Marks at cy 15. */
const BAG = () => raw("M9.5 4H14.5V6.5L18 10A7 7 0 1 1 6 10L9.5 6.5Z", "a money bag: a tied neck, shoulders at 45°, and one round belly, one path", true);
/** The slip: a wide sheet with a folded corner. Marks at cy 12, clear of the fold above x 18. */
const SLIP = () => raw("M4 5H18L22 9V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V7A2 2 0 0 1 4 5ZM18 5V9H22", "a slip: a wide sheet with its top-right corner folded over", false);
/** The payment card: a card with its band across the top. Marks at cy 14. */
const CARD = () => [rect(2, 3, 20, 18, 2), row(7, 3, 21)];
/** The calendar: a window with its rail and two pegs. Content 5 tall at cy 15.5. */
const CAL = () => [window_(), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5)];
/** The gauge: a half-round dial closed along its base. */
const GAUGE = () => [arc(12, 16, 9, 180, 360), row(16, 3, 21)];
/** A price tag on the diagonal, string hole in its corner. Marks at (12, 12). */
const TAG = () => [poly([[4, 12], [12, 4], [20, 4], [20, 12], [12, 20]], true), disc(17, 7, 1)];
/** The house `home` draws, its walls one deeper. Between the walls is x 7..17, y 12..20. */
const HOUSE = () => [poly([[3, 11], [12, 2], [21, 11]]), poly([[6, 11], [6, 21], [18, 21], [18, 11]])];
/** A jar: a body rounded at the foot, a lid narrower than the body. Marks at cy 15.5. */
const JAR = () => [raw("M6 9H18V19A3 3 0 0 1 15 22H9A3 3 0 0 1 6 19Z", "a jar: square shoulders, a rounded foot", true), poly([[8, 9], [8, 4], [16, 4], [16, 9]])];
/** A person: the head, and shoulders wide enough to carry a mark on the chest at cy 17. */
const PERSON = () => [disc(12, 6, 3), arc(12, 21, 9, 180, 360)];
/** The photo frame `image` draws. The hollow is x 4..20, y 5..19. */
const PHOTO = () => frame(3, 4, 18, 16, 3, { gap: 4 });
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** A hash of two columns and a row, 6 wide, centred on (12, cy). */
const HASH = (cy: number) => [col(10, cy - 3, cy + 3), col(14, cy - 3, cy + 3), row(cy, 8, 16)];
/** Two chevrons pointing right, 5 tall, centred on (12, cy). */
const ONWARD = (cy: number) => [poly([[8, cy - 2.5], [10.5, cy], [8, cy + 2.5]]), poly([[12.5, cy - 2.5], [15, cy], [12.5, cy + 2.5]])];

export const BATCH_117: Icon[] = [
  /* ── the claim, on the umbrella ─────────────────────────────────────────────── */
  c("claim", "Claim", "The umbrella with an exclamation on its canopy — something happened under the cover",
    ["claim", "event", "loss"], ["insurance-claim"], ["claim", "insurance claim", "make a claim", "report a loss"],
    "umbrella", [...UMBRELLA(), col(12, 4, 7), disc(12, 9.5, 1)]),
  c("claim-file", "File a claim", "The umbrella with a pencil stroke on its canopy — the claim written up",
    ["claim", "file", "submit"], [], ["file a claim", "submit claim", "start a claim", "claim form"],
    "umbrella", [...UMBRELLA(), poly([[9.5, 10], [14.5, 5]])]),
  c("claim-approved", "Claim approved", "The umbrella with a check on its canopy — the claim accepted",
    ["claim", "approved", "accepted"], [], ["claim approved", "claim accepted", "claim settled", "approved claim"],
    "umbrella", [...UMBRELLA(), poly([[9.5, 7.5], [11.5, 9.5], [15, 6]])]),
  c("claim-denied", "Claim denied", "The umbrella with a cross on its canopy — the claim turned down",
    ["claim", "denied", "rejected"], [], ["claim denied", "claim rejected", "declined claim", "claim refused"],
    "umbrella", [...UMBRELLA(), poly([[9.5, 5], [14.5, 10]]), poly([[14.5, 5], [9.5, 10]])]),
  c("claim-pending", "Claim pending", "The umbrella with an hourglass on its canopy — the claim still being looked at",
    ["claim", "pending", "review"], [], ["claim pending", "claim under review", "claim in progress", "awaiting decision"],
    "umbrella", [...UMBRELLA(), poly([[10, 5], [14, 5], [10, 9], [14, 9]], true)]),
  c("claim-payout", "Claim payout", "The umbrella with an arrow leaving its canopy — the money paid out on the claim",
    ["claim", "payout", "settlement"], [], ["claim payout", "claim settlement", "insurance payout", "payment on claim"],
    "umbrella", [...UMBRELLA(), row(7.5, 9, 15), poly([[12.5, 5], [15, 7.5], [12.5, 10]])]),
  c("cover-amount", "Cover amount", "The umbrella with a stone on its canopy — the most the cover will pay",
    ["cover", "amount", "sum"], ["sum-insured"], ["cover amount", "sum insured", "coverage amount", "policy limit"],
    "umbrella", [...UMBRELLA(), STONE(12, 7.5)]),
  c("cover-gap", "Cover gap", "The umbrella with a minus on its canopy — what the cover leaves out",
    ["gap", "exclusion", "uncovered"], [], ["cover gap", "coverage gap", "not covered", "exclusion"],
    "umbrella", [...UMBRELLA(), row(7.5, 9.5, 14.5)]),
  c("excess", "Excess", "The umbrella with a point on its canopy — the first part of any loss, paid by you",
    ["excess", "deductible", "self-pay"], ["deductible"], ["excess", "deductible", "insurance excess", "policy excess"],
    "umbrella", [...UMBRELLA(), disc(12, 7.5, 2)]),
  c("insurance-risk", "Insurance risk", "The umbrella with a line rising on its canopy — the chance the cover is called on",
    ["risk", "exposure", "chance"], [], ["insurance risk", "risk exposure", "risk rating", "underwriting risk"],
    "umbrella", [...UMBRELLA(), poly([[9, 10], [11, 8], [13, 10], [15, 8]])]),

  /* ── what is covered, under the canopy ──────────────────────────────────────── */
  c("life-cover", "Life cover", "A heart under a canopy — the people left behind, looked after",
    ["life", "cover", "family"], ["life-insurance"], ["life cover", "life insurance", "life assurance", "death benefit"],
    "canopy", [...CANOPY(), ...heartMark(SMALL, 16)]),
  c("health-cover", "Health cover", "A cross under a canopy — the doctor's bill, paid",
    ["health", "cover", "medical"], ["health-insurance"], ["health cover", "health insurance", "medical insurance", "private health"],
    "canopy", [...CANOPY(), ...add(SMALL, 16)]),
  c("car-cover", "Car cover", "A car under a canopy — the car, covered",
    ["car", "cover", "motor"], ["car-insurance"], ["car cover", "car insurance", "motor insurance", "auto insurance"],
    "canopy", [...CANOPY(), poly([[4.5, 18], [4.5, 15], [7, 12.5], [14.5, 12.5], [17, 15], [19.5, 15], [19.5, 18]]), disc(8, 18.5, 1), disc(16, 18.5, 1)]),
  c("home-cover", "Home cover", "A house under a canopy — the roof, covered",
    ["home", "cover", "property"], ["home-insurance"], ["home cover", "home insurance", "house insurance", "buildings insurance"],
    "canopy", [...CANOPY(), poly([[8, 16.5], [12, 12.5], [16, 16.5]]), poly([[9, 16.5], [9, 21], [15, 21], [15, 16.5]])]),
  c("travel-cover", "Travel cover", "A suitcase under a canopy — the trip, covered",
    ["travel", "cover", "trip"], ["travel-insurance"], ["travel cover", "travel insurance", "trip insurance", "holiday insurance"],
    "canopy", [...CANOPY(), poly([[8, 15.5], [16, 15.5], [16, 20.5], [8, 20.5]], true), poly([[10, 15.5], [10, 12.5], [14, 12.5], [14, 15.5]])]),
  c("pet-cover", "Pet cover", "A paw under a canopy — the pet, covered",
    ["pet", "cover", "animal"], ["pet-insurance"], ["pet cover", "pet insurance", "vet bills", "animal insurance"],
    "canopy", [...CANOPY(), disc(8, 14.5, 1), disc(12, 12.5, 1), disc(16, 14.5, 1), disc(12, 18.5, 2)]),
  c("device-cover", "Device cover", "A phone under a canopy — the phone, covered",
    ["device", "cover", "gadget"], ["phone-insurance"], ["device cover", "phone insurance", "gadget insurance", "device protection"],
    "canopy", [...CANOPY(), poly([[9.5, 12.5], [14.5, 12.5], [14.5, 21], [9.5, 21]], true)]),
  c("beneficiary", "Beneficiary", "A person under a canopy — the one the cover pays",
    ["beneficiary", "recipient", "named"], [], ["beneficiary", "named beneficiary", "who gets paid", "nominee"],
    "canopy", [...CANOPY(), disc(12, 14, 2), row(19, 7, 17)]),

  /* ── the policy, in the book ────────────────────────────────────────────────── */
  c("insurance-policy", "Insurance policy", "The book with a shield on its page — the cover, in writing",
    ["policy", "contract", "cover"], [], ["insurance policy", "policy", "cover contract", "policy terms"],
    "book", [...BOOK(), poly([[11, 9], [17, 9], [17, 12], [14, 15], [11, 12]], true)]),
  c("policy-renew", "Renew policy", "The book with two chevrons on its page — the cover carried on for another year",
    ["policy", "renew", "continue"], [], ["renew policy", "policy renewal", "renew cover", "auto-renew"],
    "book", [...BOOK(), poly([[10.5, 9.5], [13, 12], [10.5, 14.5]]), poly([[14.5, 9.5], [17, 12], [14.5, 14.5]])]),
  c("policy-lapse", "Policy lapse", "The book with an hourglass on its page — the cover run out, unrenewed",
    ["policy", "lapse", "expired"], [], ["policy lapse", "lapsed policy", "cover expired", "policy ended"],
    "book", [...BOOK(), poly([[11.5, 9.5], [16.5, 9.5], [11.5, 14.5], [16.5, 14.5]], true)]),
  c("policy-cancel", "Cancel policy", "The book with a cross on its page — the cover ended by choice",
    ["policy", "cancel", "end"], [], ["cancel policy", "cancel cover", "end policy", "policy cancellation"],
    "book", [...BOOK(), poly([[11, 9], [17, 15]]), poly([[17, 9], [11, 15]])]),
  c("policy-document", "Policy document", "A slip with a shield on it — the paper that says what is covered",
    ["policy", "document", "paper"], [], ["policy document", "policy wording", "insurance certificate", "policy schedule"],
    "slip", [SLIP(), ...shieldMark(SMALL, 12)]),
  c("proof-of-insurance", "Proof of insurance", "The card with a shield under the band — the one kept in the glovebox",
    ["proof", "card", "evidence"], ["insurance-card"], ["proof of insurance", "insurance card", "cover note", "certificate of insurance"],
    "card", [...CARD(), ...shieldMark(SMALL, 14)]),
  c("policy-number", "Policy number", "The card with a hash under the band — the number the insurer knows you by",
    ["policy", "number", "reference"], [], ["policy number", "policy reference", "policy id", "insurance number"],
    "card", [...CARD(), ...HASH(14)]),
  c("annual-premium", "Annual premium", "The calendar with a shield on it — the cover paid for, year by year",
    ["premium", "annual", "payment"], [], ["annual premium", "yearly premium", "premium payment", "insurance cost"],
    "window", [...CAL(), poly([[9.5, 13], [14.5, 13], [14.5, 15.5], [12, 18], [9.5, 15.5]], true)]),
  c("renewal-date", "Renewal date", "The calendar with two chevrons on it — the day the cover rolls on",
    ["renewal", "date", "expiry"], [], ["renewal date", "policy renewal date", "cover expiry", "renew by"],
    "window", [...CAL(), ...ONWARD(15.5)]),
  c("underwriting", "Underwriting", "A slip with a pencil stroke on it — the risk weighed and written up",
    ["underwriting", "assess", "risk"], [], ["underwriting", "underwriter", "risk assessment", "policy underwriting"],
    "slip", [SLIP(), poly([[9, 15], [15, 9]])]),
  c("quote", "Insurance quote", "A price tag with a shield on it — what the cover would cost",
    ["quote", "price", "estimate"], ["insurance-quote"], ["insurance quote", "get a quote", "quote", "premium estimate"],
    "label", [...TAG(), ...shieldMark(SMALL, 12)]),
  c("quote-compare", "Compare quotes", "Two shields side by side — one cover weighed against another",
    ["compare", "quotes", "shop"], [], ["compare quotes", "compare insurance", "quote comparison", "shop around"],
    "shield", [poly([[3, 7], [10, 7], [10, 13], [6.5, 16.5], [3, 13]], true), poly([[14, 7], [21, 7], [21, 13], [17.5, 16.5], [14, 13]], true)]),

  /* ── the people ─────────────────────────────────────────────────────────────── */
  c("insurance-broker", "Insurance broker", "A person with a small umbrella on the chest — the one who sells the cover",
    ["broker", "agent", "seller"], ["insurance-agent"], ["insurance broker", "insurance agent", "broker", "intermediary"],
    "person", [...PERSON(), arc(12, 17.5, 3.5, 180, 360), row(17.5, 8.5, 15.5), col(12, 17.5, 20)]),
  c("adjuster", "Claims adjuster", "A person with a lens on the chest — the one who looks at the damage",
    ["adjuster", "assessor", "inspect"], ["loss-adjuster"], ["claims adjuster", "loss adjuster", "assessor", "claims inspector"],
    "person", [...PERSON(), ...searchMark(SMALL, 17)]),
  c("guarantor", "Guarantor", "A person with a padlock on the chest — the one who stands behind the loan",
    ["guarantor", "surety", "backer"], [], ["guarantor", "co-signer", "surety", "loan guarantor"],
    "person", [...PERSON(), ...lockMark(SMALL, 17)]),

  /* ── the money held ─────────────────────────────────────────────────────────── */
  c("liability", "Liability", "The money bag with an exclamation in it — what you could be made to pay",
    ["liability", "owed", "exposure"], [], ["liability", "legal liability", "liabilities", "exposure"],
    "bag", [BAG(), ...alert(SMALL, 15)]),
  c("no-claims-bonus", "No-claims bonus", "The money bag with a stone in it — the reward for a year without a claim",
    ["bonus", "discount", "no-claims"], ["no-claims-discount"], ["no claims bonus", "no claims discount", "claim-free discount", "ncb"],
    "bag", [BAG(), STONE(12, 15)]),
  c("insurance-fraud", "Insurance fraud", "The money bag with a cross in it — money claimed on a lie",
    ["fraud", "false", "claim"], [], ["insurance fraud", "fraudulent claim", "false claim", "fraud detection"],
    "bag", [BAG(), poly([[9.5, 12.5], [14.5, 17.5]]), poly([[14.5, 12.5], [9.5, 17.5]])]),
  c("credit-limit", "Credit limit", "The money bag with a chevron rising to a line — as much as you may borrow",
    ["credit", "limit", "borrow"], [], ["credit limit", "borrowing limit", "credit line", "maximum credit"],
    "bag", [BAG(), row(12.5, 9, 15), poly([[9.5, 17.5], [12, 15], [14.5, 17.5]])]),
  c("credit-utilisation", "Credit utilisation", "The money bag with a line partway up — how much of the credit is used",
    ["credit", "utilisation", "usage"], ["credit-utilization"], ["credit utilisation", "credit utilization", "credit used", "utilisation ratio"],
    "bag", [BAG(), row(15, 8, 16)]),
  c("escrow-account", "Escrow account", "The money bag with a padlock in it — money held until both sides deliver",
    ["escrow", "held", "third-party"], [], ["escrow account", "escrow", "money in escrow", "held funds"],
    "bag", [BAG(), ...lockMark(SMALL, 15)]),
  c("trust-fund", "Trust fund", "A jar with a padlock in it — money kept for someone else, on their terms",
    ["trust", "fund", "beneficiary"], [], ["trust fund", "trust", "family trust", "held in trust"],
    "jar", [...JAR(), ...lockMark(SMALL, 15.5)]),
  c("collateral", "Collateral", "A house with a padlock in it — the thing pledged against the loan",
    ["collateral", "security", "pledge"], [], ["collateral", "loan security", "secured loan", "pledged asset"],
    "figure", [...HOUSE(), ...lockMark(SMALL, 15)]),

  /* ── the record ─────────────────────────────────────────────────────────────── */
  c("credit-score", "Credit score", "The gauge with a stone on it — the number that says how far you are trusted",
    ["credit", "score", "rating"], ["credit-rating"], ["credit score", "credit rating", "fico score", "creditworthiness"],
    "gauge", [...GAUGE(), STONE(12, 10)]),
  c("credit-report", "Credit report", "A slip with a lens on it — the record of how you have borrowed, read through",
    ["credit", "report", "history"], ["credit-history"], ["credit report", "credit history", "credit file", "credit check"],
    "slip", [SLIP(), ...searchMark(SMALL, 12)]),
  c("credit-freeze", "Credit freeze", "A slip with a pause on it — the credit file shut to new lenders",
    ["credit", "freeze", "lock"], [], ["credit freeze", "freeze credit", "security freeze", "lock credit file"],
    "slip", [SLIP(), ...pause(SMALL, 12)]),
  c("identity-theft", "Identity theft", "An ID card with a person on it and a cross where the name was — someone else using your name",
    ["identity", "theft", "fraud"], [], ["identity theft", "id theft", "stolen identity", "identity fraud"],
    "card", [rect(2, 5, 20, 14, 2), disc(8, 10, 2), row(15, 5, 11), poly([[14, 9], [19, 14]]), poly([[19, 9], [14, 14]])]),
  c("incident-report", "Incident report", "The book with an exclamation on its page — what happened, written down",
    ["incident", "report", "record"], [], ["incident report", "accident report", "report an incident", "loss report"],
    "book", [...BOOK(), col(14, 9, 12), disc(14, 14.5, 1)]),
  c("damage-photo", "Damage photo", "A photo with a crack across it — the damage, shown",
    ["damage", "photo", "evidence"], [], ["damage photo", "photo of damage", "claim evidence", "damage picture"],
    "window", [PHOTO(), poly([[10, 7], [13, 10], [11, 12], [14, 15], [12, 17]])]),

  /* ── what is left behind ────────────────────────────────────────────────────── */
  c("will", "Will", "A slip with a line and a signature — the last word on who gets what",
    ["will", "testament", "legacy"], ["testament"], ["will", "last will", "testament", "make a will"],
    "slip", [SLIP(), row(9, 6, 15), poly([[8, 15], [11, 12], [13, 14], [16, 11]])]),
  c("inheritance", "Inheritance", "A house with a heart in it — what is passed on",
    ["inheritance", "legacy", "passed"], [], ["inheritance", "inherit", "legacy", "bequest"],
    "figure", [...HOUSE(), ...heartMark(SMALL, 16)]),
  c("estate", "Estate", "Two houses side by side — everything a person leaves",
    ["estate", "property", "assets"], [], ["estate", "estate planning", "the estate", "assets left"],
    "figure", [poly([[2, 12], [7, 7], [12, 12]]), poly([[3.5, 12], [3.5, 20], [10.5, 20], [10.5, 12]]), poly([[12, 12], [17, 7], [22, 12]]), poly([[13.5, 12], [13.5, 20], [20.5, 20], [20.5, 12]])]),
];
