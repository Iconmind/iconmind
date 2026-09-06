/**
 * R25 · Commerce: merchant & marketplace — the other side of the counter: the seller,
 * the listing, the stock, the till, and the rules the shop sells under.
 *
 * Three bodies this round brings. The till is a drawer with a register standing on it;
 * what the day's money does sits in the drawer. The listing is a card with a picture at
 * the top, and under the picture what the listing says. The stack is three crates, for
 * stock as it sits. The rest ride on bodies the domain already has: storefront, cart,
 * basket, product box, payment card, receipt, banknote, clipboard, tray, truck, bubble.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { banknote, clipboard, tray } from "../bodies.ts";
import {
  SMALL, add, alert, check, clockMark, coinMark, funnelMark, listMark, lockMark, off, pause, shieldMark, trendMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "commerce", subcategory: "merchant", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The storefront awning alone. */
const AWNING = () =>
  raw("M2 5H22M2 5A2.5 2.5 0 0 0 7 5A2.5 2.5 0 0 0 12 5A2.5 2.5 0 0 0 17 5A2.5 2.5 0 0 0 22 5", "an awning: a rail with four scallops hanging from it");
/** The storefront: the awning on walls and a floor. Marks at cy 15. */
const STORE = () => [AWNING(), poly([[4, 8], [4, 22], [20, 22], [20, 8]])];
/** The cart: a box on two wheels. Marks at cy 10.5. */
const CART = () => [rect(3, 3.5, 18, 14, 2), disc(7.5, 19.5, 1), disc(16.5, 19.5, 1)];
/** The basket: a box with a handle arched over its rim. Marks at cy 15. */
const BASKET = () => [rect(3, 8, 18, 14, 2), arc(12, 8, 5, 180, 360)];
/** The product: a parcel with a lid line and tape. Marks at cy 15. */
const BOX = () => [rect(3, 4, 18, 18, 2), row(8, 4, 20), col(12, 4, 8)];
/** The payment card: a card with its band across the top. Marks at cy 14. */
const CARD = () => [rect(2, 3, 20, 18, 2), row(7, 3, 21)];
/** A price tag on the diagonal, string hole in its corner. Marks at (12, 12). */
const TAG = () => [poly([[4, 12], [12, 4], [20, 4], [20, 12], [12, 20]], true), disc(17, 7, 1)];
/** A ticket: a card with a half-round notch bitten out of each side. Marks at cy 12. */
const TICKET = () => raw(
  "M4 5H20A2 2 0 0 1 22 7V10A2 2 0 0 0 22 14V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V14A2 2 0 0 0 2 10V7A2 2 0 0 1 4 5Z",
  "a ticket: a rounded card with a notch in each side", true);
/** A receipt: the tape bills are printed on. Marks at cy 10. */
const RECEIPT = () =>
  raw("M6 2H18A2 2 0 0 1 20 4V19L18 17L16 19L14 17L12 19L10 17L8 19L6 17L4 19V4A2 2 0 0 1 6 2Z",
    "a receipt: a rounded head and a foot torn along a zigzag", true);
/** The delivery truck. Its cargo box is x 3..14, y 6..16. */
const TRUCK = () => [
  raw("M4 5H13A2 2 0 0 1 15 7V10H18.5L21 12.5V15A2 2 0 0 1 19 17H4A2 2 0 0 1 2 15V7A2 2 0 0 1 4 5Z", "truck body and cab drawn as one outline", true),
  disc(7, 19, 2), disc(17, 19, 2),
];
/** The speech bubble. The hollow is x 3..21, y 5..16; marks at cy 10.5. */
const BUBBLE = () => [frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]])];
/** A warehouse: a gabled roof over a wide floor. Marks at cy 14. */
const WAREHOUSE = () => poly([[2, 20], [2, 10], [5, 7], [19, 7], [22, 10], [22, 20]]);
/** A person: the head, and shoulders wide enough to carry a mark on the chest at cy 17. */
const PERSON = () => [disc(12, 6, 3), arc(12, 21, 9, 180, 360)];
/** The till: a drawer with the register's display standing on its left and the paper coming up on its right. The drawer's hollow is x 3..21, y 9..21; marks at cy 15. */
const TILL = () => [rect(2, 8, 20, 14, 2), poly([[4, 8], [4, 3], [14, 3], [14, 8]]), col(18, 4, 8)];
/** The listing: a card with hills at the top, the picture every listing leads with. Under it is x 4..20, y 10..21; marks at cy 15.5. */
const LISTING = () => [rect(3, 2, 18, 20, 2), poly([[6, 9], [9, 6], [12, 9], [14, 7], [16, 9]])];
/** The stack: three crates, two below and one on top. */
const STACK = () => raw("M4 20V12H20V20ZM12 12V20M8 12V4H16V12", "three crates that share their walls, drawn as one path", false);
/** A jar: a body rounded at the foot, a lid narrower than the body. The hollow is x 7..17, y 10..21; marks at cy 15.5. */
const JAR = () => [raw("M6 9H18V19A3 3 0 0 1 15 22H9A3 3 0 0 1 6 19Z", "a jar: square shoulders, a rounded foot", true), poly([[8, 9], [8, 4], [16, 4], [16, 9]])];
/** A book: a cover with the spine's line down it. The page is x 9..19, y 4..20. */
const BOOK = () => [rect(4, 3, 16, 18, 2), col(8, 3, 21)];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** The right-pointing arrow: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The left-pointing arrow: a shaft and a 45° head that ends it at x0. */
const ARROW_L = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]])];
/** A percent sign: a point, a 45° stroke, a point — 6 wide and 6 tall, centred on (12, cy). */
const PERCENT = (cy: number) => [disc(9.5, cy - 2.5, 1), poly([[9, cy + 3], [15, cy - 3]]), disc(14.5, cy + 2.5, 1)];

export const BATCH_112: Icon[] = [
  /* ── the seller and the shop ─────────────────────────────────────────────────── */
  c("seller-profile", "Seller profile", "A person with a coin on the chest — the one who sells here",
    ["seller", "vendor", "profile"], [], ["seller profile", "vendor profile", "seller page", "about the seller"],
    "person", [...PERSON(), ...coinMark(SMALL, 17)]),
  c("seller-rating", "Seller rating", "A person with a stone on the chest — how buyers have rated the seller",
    ["seller", "rating", "reputation"], [], ["seller rating", "vendor rating", "seller score", "seller reputation"],
    "person", [...PERSON(), STONE(12, 17)]),
  c("marketplace", "Marketplace", "A storefront with a wall down its middle — many sellers under one awning",
    ["market", "sellers", "platform"], [], ["marketplace", "online marketplace", "multi-vendor", "market"],
    "store", [...STORE(), col(12, 12, 22)]),
  c("storefront-builder", "Storefront builder", "The storefront with a plus in it — a shop being put together",
    ["builder", "setup", "create"], [], ["storefront builder", "build a store", "shop builder", "create store"],
    "store", [...STORE(), ...add(SMALL, 15)]),
  c("shop-conversion", "Shop conversion", "The storefront with a percent in it — how many visitors bought",
    ["conversion", "rate", "sales"], [], ["shop conversion", "conversion rate", "store conversion", "visitors to buyers"],
    "store", [...STORE(), ...PERCENT(15)]),
  c("supplier", "Supplier", "The storefront with an arrow coming in — where the shop's goods come from",
    ["supplier", "vendor", "source"], [], ["supplier", "wholesaler", "goods supplier", "supply source"],
    "store", [...STORE(), ...ARROW_L(15, 8, 16)]),
  c("store-policy", "Store policy", "The storefront with a shield in it — the rules the shop stands by",
    ["policy", "rules", "terms"], [], ["store policy", "shop policy", "store rules", "seller policy"],
    "store", [...STORE(), ...shieldMark(SMALL, 15)]),
  c("merchant-account", "Merchant account", "The storefront with a person in it — the account the shop signs in with",
    ["account", "login", "seller"], [], ["merchant account", "seller account", "shop account", "vendor login"],
    "store", [...STORE(), disc(12, 13, 2), row(18.5, 8, 16)]),

  /* ── the listing ────────────────────────────────────────────────────────────── */
  c("product-listing", "Product listing", "The listing with two lines under the picture — a thing put up for sale",
    ["listing", "product", "page"], [], ["product listing", "listing", "product page", "item for sale"],
    "listing", [...LISTING(), row(13, 7, 17), row(17, 7, 17)]),
  c("listing-edit", "Edit listing", "The listing with a pencil stroke — the listing changed",
    ["listing", "edit", "update"], [], ["edit listing", "update listing", "change listing", "listing editor"],
    "listing", [...LISTING(), poly([[9, 18.5], [15, 12.5]])]),
  c("listing-photo", "Listing photo", "The listing with a frame under the picture — the photos a listing shows",
    ["listing", "photo", "image"], [], ["listing photo", "product photo", "listing image", "product images"],
    "listing", [...LISTING(), rect(7, 12.5, 10, 6.5, 2)]),
  c("listing-draft", "Listing draft", "The listing with a broken line — half written, not yet up",
    ["listing", "draft", "unpublished"], [], ["listing draft", "draft listing", "unpublished listing", "save draft"],
    "listing", [...LISTING(), row(15.5, 7, 10), row(15.5, 14, 17)]),
  c("listing-live", "Listing live", "The listing with a check — up, and for sale",
    ["listing", "live", "published"], [], ["listing live", "publish listing", "listing active", "listing online"],
    "listing", [...LISTING(), ...check(SMALL, 15.5)]),
  c("listing-paused", "Listing paused", "The listing with a pause — taken down for a while",
    ["listing", "paused", "hidden"], [], ["listing paused", "pause listing", "hide listing", "listing inactive"],
    "listing", [...LISTING(), ...pause(SMALL, 15.5)]),
  c("sku", "SKU", "The listing with a barcode under the picture — the code the stock is counted by",
    ["code", "stock", "identifier"], ["stock-keeping-unit"], ["sku", "stock keeping unit", "product code", "item code"],
    "listing", [...LISTING(), col(9, 13, 18), col(12, 13, 18), col(15, 13, 18)]),
  c("batch-number", "Batch number", "The listing with a hash under the picture — the lot this one came from",
    ["batch", "lot", "number"], ["lot-number"], ["batch number", "lot number", "production batch", "batch code"],
    "listing", [...LISTING(), col(10, 12.5, 18.5), col(14, 12.5, 18.5), row(15.5, 7.5, 16.5)]),
  c("product-expiry", "Product expiry", "The listing with a clock under the picture — the date it goes off",
    ["expiry", "date", "shelf-life"], [], ["product expiry", "expiry date", "best before", "shelf life"],
    "listing", [...LISTING(), ...clockMark(SMALL, 15.5)]),
  c("product-catalogue", "Product catalogue", "A book with lines on its page — every product the shop sells, in one place",
    ["catalogue", "book", "products"], ["product-catalog"], ["product catalogue", "product catalog", "catalogue", "product book"],
    "book", [...BOOK(), row(9, 11, 16), row(13, 11, 16)]),
  c("catalogue-import", "Catalogue import", "A book with an arrow into its page — products brought in from a file",
    ["catalogue", "import", "upload"], ["catalog-import"], ["catalogue import", "import products", "bulk upload", "csv import"],
    "book", [...BOOK(), ...ARROW_L(12, 11, 16)]),

  /* ── the stock ──────────────────────────────────────────────────────────────── */
  c("inventory-count", "Inventory count", "Three crates stacked — the stock, as it sits and is counted",
    ["inventory", "stock", "count"], ["inventory", "stock-count"], ["inventory count", "stock count", "inventory", "stocktake"],
    "crate", [STACK()]),
  c("inventory-sync", "Inventory sync", "A warehouse with an arrow pointing both ways — the count kept the same in every place stock sits",
    ["inventory", "sync", "stock"], [], ["inventory sync", "stock sync", "sync inventory", "inventory update"],
    "figure", [WAREHOUSE(), row(14, 8, 16), poly([[10.5, 11.5], [8, 14], [10.5, 16.5]]), poly([[13.5, 11.5], [16, 14], [13.5, 16.5]])]),
  c("reorder-point", "Reorder point", "The basket with a line low in it and a chevron falling to it — the level at which more is ordered",
    ["reorder", "level", "threshold"], [], ["reorder point", "reorder level", "restock threshold", "minimum stock"],
    "basket", [...BASKET(), poly([[9.5, 12], [12, 14.5], [14.5, 12]]), row(18, 7, 17)]),
  c("purchase-order", "Purchase order", "A clipboard with a coin on it — the order the shop places, and pays for",
    ["purchase", "order", "procurement"], [], ["purchase order", "po", "procurement order", "supplier order"],
    "clipboard", [...clipboard(), ...coinMark(SMALL, 13.5)]),
  c("dropship", "Dropship", "The delivery truck with two chevrons in its cargo — straight from the maker, never through the shop",
    ["dropship", "fulfilment", "supplier"], ["drop-shipping"], ["dropship", "drop shipping", "dropshipping", "supplier ships direct"],
    "truck", [...TRUCK(), poly([[5.5, 8.5], [8, 11], [5.5, 13.5]]), poly([[9.5, 8.5], [12, 11], [9.5, 13.5]])]),
  c("fulfilment-centre", "Fulfilment centre", "A warehouse with an arrow leaving it — where orders are picked and sent",
    ["fulfilment", "warehouse", "logistics"], ["fulfillment-center"], ["fulfilment centre", "fulfillment center", "3pl", "order fulfilment"],
    "figure", [WAREHOUSE(), ...ARROW_R(14, 8, 16)]),
  c("order-fulfil", "Fulfil order", "A tray with a check over it — the order picked, packed and away",
    ["order", "fulfil", "complete"], ["order-fulfill"], ["fulfil order", "fulfill order", "order fulfilled", "complete order"],
    "tray", [tray(), ...check(SMALL, 9)]),
  c("order-ship", "Ship order", "The delivery truck with a check in its cargo — the order on its way",
    ["order", "shipped", "sent"], [], ["ship order", "order shipped", "mark as shipped", "order sent"],
    "truck", [...TRUCK(), poly([[6, 11], [8, 13], [11.5, 9.5]])]),
  c("order-packed", "Order packed", "The product box with a padlock in it — packed and closed",
    ["order", "packed", "ready"], [], ["order packed", "packed", "ready to ship", "packing complete"],
    "box", [...BOX(), ...lockMark(SMALL, 15)]),
  c("shipping-zone", "Shipping zone", "The delivery truck with a pin in its cargo — where it will and won't go",
    ["zone", "region", "delivery"], [], ["shipping zone", "delivery zone", "shipping region", "delivery area"],
    "truck", [...TRUCK(), disc(8.5, 9, 2), poly([[6, 11.5], [8.5, 14], [11, 11.5]])]),

  /* ── the money ──────────────────────────────────────────────────────────────── */
  c("sales-report", "Sales report", "A receipt with a trend line on it — what sold, and how it went",
    ["sales", "report", "chart"], [], ["sales report", "sales summary", "sales chart", "sales figures"],
    "receipt", [RECEIPT(), ...trendMark(SMALL, 10)]),
  c("revenue-today", "Revenue today", "The till with a coin in the drawer — what has come in so far today",
    ["revenue", "today", "income"], [], ["revenue today", "today's sales", "daily revenue", "income today"],
    "till", [...TILL(), ...coinMark(SMALL, 15)]),
  c("pos-terminal", "POS terminal", "The till with a card in the drawer — the point of sale",
    ["pos", "terminal", "checkout"], ["point-of-sale"], ["pos terminal", "point of sale", "card terminal", "pos system"],
    "till", [...TILL(), poly([[8, 12.5], [16, 12.5], [16, 17.5], [8, 17.5]], true)]),
  c("pos-receipt", "POS receipt", "The till with two printed lines — the slip the till prints",
    ["pos", "receipt", "print"], [], ["pos receipt", "print receipt", "till receipt", "sales slip"],
    "till", [...TILL(), row(13, 7, 17), row(17, 7, 17)]),
  c("cash-drawer", "Cash drawer", "The till with the drawer's line and its handle — pulled open for the change",
    ["cash", "drawer", "till"], [], ["cash drawer", "open drawer", "till drawer", "cash till"],
    "till", [...TILL(), row(14, 5, 19), row(17.5, 10, 14)]),
  c("till-count", "Till count", "The till with a tally in the drawer — the cash counted",
    ["count", "cash", "reconcile"], [], ["till count", "count the till", "cash count", "till reconciliation"],
    "till", [...TILL(), col(9, 12, 18), col(12, 12, 18), col(15, 12, 18)]),
  c("end-of-day", "End of day", "The till with a check in the drawer — closed and balanced for the day",
    ["close", "day", "settle"], ["close-of-day"], ["end of day", "close of day", "daily close", "eod"],
    "till", [...TILL(), ...check(SMALL, 15)]),
  c("shift-sales", "Shift sales", "The till with a clock in the drawer — what one shift took",
    ["shift", "sales", "period"], [], ["shift sales", "sales per shift", "shift total", "shift report"],
    "till", [...TILL(), ...clockMark(SMALL, 15)]),
  c("tip-jar", "Tip jar", "A jar with a coin in it — what the customer leaves on top",
    ["tip", "gratuity", "jar"], ["tips"], ["tip jar", "tips", "gratuity", "leave a tip"],
    "jar", [...JAR(), ...coinMark(SMALL, 15.5)]),
  c("payout", "Payout", "A banknote with an arrow leaving it — the seller's money sent to the seller",
    ["payout", "transfer", "withdraw"], [], ["payout", "seller payout", "withdraw earnings", "payment to seller"],
    "banknote", [...banknote(), ...ARROW_R(12, 8, 16)]),
  c("refund-approve", "Approve refund", "A receipt with money going back and a check — the refund, agreed",
    ["refund", "approve", "accept"], [], ["approve refund", "refund approved", "accept refund", "issue refund"],
    "receipt", [RECEIPT(), ...ARROW_L(10, 6.5, 11), poly([[13, 10.5], [15, 12.5], [17.5, 10]])]),
  c("refund-deny", "Deny refund", "A receipt with money going back and a cross — the refund, turned down",
    ["refund", "deny", "reject"], [], ["deny refund", "refund denied", "reject refund", "refund refused"],
    "receipt", [RECEIPT(), ...ARROW_L(10, 6.5, 11), poly([[13.5, 8], [17.5, 12]]), poly([[17.5, 8], [13.5, 12]])]),
  c("tax-rule", "Tax rule", "A banknote with a percent on it — the tax the shop must add",
    ["tax", "rate", "vat"], [], ["tax rule", "tax rate", "vat rule", "sales tax"],
    "banknote", [...banknote(), ...PERCENT(12)]),
  c("price-rule", "Price rule", "A price tag with a funnel on it — the rule that decides what a price becomes",
    ["price", "rule", "automation"], [], ["price rule", "pricing rule", "automatic pricing", "price condition"],
    "label", [...TAG(), ...funnelMark(SMALL, 12)]),

  /* ── the buyer, answered ────────────────────────────────────────────────────── */
  c("abandoned-cart", "Abandoned cart", "The cart with an exclamation in it — filled, then left",
    ["abandoned", "left", "unfinished"], [], ["abandoned cart", "cart abandonment", "left in cart", "unfinished checkout"],
    "cart", [...CART(), ...alert(SMALL, 10.5)]),
  c("cart-recovery", "Cart recovery", "The cart with an arrow coming back — the shopper brought back to what they left",
    ["recovery", "return", "remind"], [], ["cart recovery", "recover cart", "abandoned cart email", "cart reminder"],
    "cart", [...CART(), ...ARROW_L(10.5, 8, 16)]),
  c("review-reply", "Reply to review", "A speech bubble with an arrow back — the seller answering",
    ["review", "reply", "respond"], [], ["reply to review", "review response", "seller reply", "answer review"],
    "window", [...BUBBLE(), ...ARROW_L(10.5, 8, 16)]),
  c("dispute", "Dispute", "A speech bubble with a not-equals in it — a buyer and a seller who disagree",
    ["dispute", "complaint", "claim"], [], ["dispute", "open dispute", "buyer dispute", "complaint"],
    "window", [...BUBBLE(), row(9, 9, 15), row(12, 9, 15), poly([[9.5, 14], [14.5, 9]])]),
  c("dispute-chargeback", "Chargeback", "The payment card with an exclamation under the band — the bank pulling the money back",
    ["chargeback", "reversal", "bank"], [], ["chargeback", "payment reversal", "disputed charge", "card dispute"],
    "card", [...CARD(), ...alert(SMALL, 14)]),
  c("return-policy", "Return policy", "A clipboard with an arrow coming back — what the shop takes back, and when",
    ["returns", "policy", "rules"], [], ["return policy", "returns policy", "refund policy", "return rules"],
    "clipboard", [...clipboard(), ...ARROW_L(13.5, 8.5, 15)]),
  c("terms-of-sale", "Terms of sale", "A ticket with the small print on it — the conditions a sale is made under",
    ["terms", "conditions", "legal"], [], ["terms of sale", "terms and conditions", "sale conditions", "purchase terms"],
    "ticket", [TICKET(), ...listMark(SMALL, 12)]),
];
