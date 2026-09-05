/**
 * R22 · Commerce: checkout & payment — from the cart to the paid order, and everything the
 * shopper is asked for on the way.
 *
 * The payment card is the one new body: a card with its band across the top, and what the
 * payment is doing drawn under the band. An order lives on the receipt; a promise — coupon,
 * voucher, code — on the ticket; a price on the tag; what the shop itself holds, in the
 * storefront; what is still in the cart, in the cart.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { tray, window_ } from "../bodies.ts";
import {
  BIG, SMALL, add, check, clockMark, coinMark, lockMark, off, pinMark, squareMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "commerce", subcategory: "checkout", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The payment card: a card with its band across the top. Under the band is x 3..21, y 8..20; marks at cy 14. */
const CARD = () => [rect(2, 3, 20, 18, 2), row(7, 3, 21)];
/** The cart: a box on two wheels. Marks at cy 10.5. */
const CART = () => [rect(3, 3.5, 18, 14, 2), disc(7.5, 19.5, 1), disc(16.5, 19.5, 1)];
/** The storefront: a scalloped awning on walls and a floor. Marks at cy 15. */
const STORE = () => [
  raw("M2 5H22M2 5A2.5 2.5 0 0 0 7 5A2.5 2.5 0 0 0 12 5A2.5 2.5 0 0 0 17 5A2.5 2.5 0 0 0 22 5", "an awning: a rail with four scallops hanging from it"),
  poly([[4, 8], [4, 22], [20, 22], [20, 8]]),
];
/** A price tag on the diagonal, string hole in its corner. Marks at (12, 12). */
const TAG = () => [poly([[4, 12], [12, 4], [20, 4], [20, 12], [12, 20]], true), disc(17, 7, 1)];
/** A ticket: a card with a half-round notch bitten out of each side. Marks at cy 12. */
const TICKET = () => raw(
  "M4 5H20A2 2 0 0 1 22 7V10A2 2 0 0 0 22 14V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V14A2 2 0 0 0 2 10V7A2 2 0 0 1 4 5Z",
  "a ticket: a rounded card with a notch in each side", true);
/** A receipt: the tape bills are printed on. Lines at y 7/11/15, marks at cy 10. */
const RECEIPT = () =>
  raw("M6 2H18A2 2 0 0 1 20 4V19L18 17L16 19L14 17L12 19L10 17L8 19L6 17L4 19V4A2 2 0 0 1 6 2Z",
    "a receipt: a rounded head and a foot torn along a zigzag", true);
/** The delivery truck supply-chain draws. Its cargo box is x 3..14, y 6..16. */
const TRUCK = () => [
  raw("M4 5H13A2 2 0 0 1 15 7V10H18.5L21 12.5V15A2 2 0 0 1 19 17H4A2 2 0 0 1 2 15V7A2 2 0 0 1 4 5Z", "truck body and cab drawn as one outline", true),
  disc(7, 19, 2), disc(17, 19, 2),
];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The left-pointing arrow: a shaft and a 45° head that ends it at x0. */
const ARROW_L = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]])];
/** The set's bolt, 2.5 wide, with its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);

export const BATCH_109: Icon[] = [
  /* ── The card ─────────────────────────────────────────────────────────────────── */
  c("payment-card", "Payment card", "A card with its band and the number line — the card a shopper pays with",
    ["card", "pay", "method"], [], ["payment card", "credit card payment", "debit card", "card on file"],
    "card", [...CARD(), row(18, 5, 10)]),
  c("card-add", "Add card", "The payment card with a plus under the band — a new card saved to the account",
    ["card", "add", "method"], [], ["add card", "add payment method", "save card", "new card"],
    "card", [...CARD(), ...add(SMALL, 14)]),
  c("card-expired", "Card expired", "The payment card with an hourglass under the band — past the date on its front",
    ["card", "expired", "method"], [], ["card expired", "expired card", "update card", "expiry date"],
    "card", [...CARD(), poly([[10, 12], [14, 12], [10, 16], [14, 16]], true)]),
  c("card-declined", "Card declined", "The payment card with a cross under the band — the bank said no",
    ["card", "declined", "failed"], [], ["card declined", "payment declined", "declined transaction", "try another card"],
    "card", [...CARD(), ...off(SMALL, 14)]),
  c("contactless-pay", "Contactless payment", "The payment card with waves under the band — paid by holding it near the reader",
    ["card", "contactless", "nfc"], [], ["contactless payment", "tap card", "nfc payment", "contactless"],
    "card", [...CARD(), arc(12, 16, 2, 200, 340), arc(12, 16, 4, 200, 340)]),
  c("tap-to-pay", "Tap to pay", "The payment card with a fingertip and its ripple — paid with the phone, one touch",
    ["card", "tap", "mobile"], [], ["tap to pay", "phone payment", "mobile wallet tap", "pay with phone"],
    "card", [...CARD(), disc(12, 15, 2), arc(12, 15, 4, 200, 340)]),
  c("wallet-pay", "Wallet payment", "The payment card with a box under the band — paid from a digital wallet",
    ["card", "wallet", "method"], [], ["wallet payment", "digital wallet", "pay with wallet", "e-wallet"],
    "card", [...CARD(), ...squareMark(SMALL, 14)]),
  c("bank-transfer", "Bank transfer", "The payment card with an arrow under the band — money sent from one account to another",
    ["card", "transfer", "bank"], [], ["bank transfer", "pay by transfer", "account to account", "wire"],
    "card", [...CARD(), ...ARROW_R(14, 8, 16)]),
  c("refund-request", "Refund request", "The payment card with an arrow pointing back — money asked for in return",
    ["refund", "request", "return"], [], ["refund request", "request a refund", "money back", "refund"],
    "card", [...CARD(), ...ARROW_L(14, 8, 16)]),
  c("instalment-plan", "Instalment plan", "The payment card with three bars under the band — the price paid in parts",
    ["card", "instalment", "plan"], [], ["instalment plan", "installments", "pay in parts", "monthly instalments"],
    "card", [...CARD(), col(9, 11, 17), col(12, 11, 17), col(15, 11, 17)]),
  c("buy-now-pay-later", "Buy now, pay later", "The payment card with a clock under the band — the goods now, the money later",
    ["card", "pay-later", "credit"], [], ["buy now pay later", "bnpl", "pay later", "deferred payment"],
    "card", [...CARD(), ...clockMark(SMALL, 14)]),
  c("split-payment", "Split payment", "The payment card with a divider and a share each side — one bill, paid by two",
    ["card", "split", "share"], [], ["split payment", "split the bill", "pay separately", "shared payment"],
    "card", [...CARD(), col(12, 11, 17), disc(8.5, 14, 1), disc(15.5, 14, 1)]),
  c("payment-pending", "Payment pending", "The payment card with a pause under the band — sent, not yet settled",
    ["card", "pending", "status"], [], ["payment pending", "awaiting payment", "processing payment", "pending"],
    "card", [...CARD(), col(9.5, 11, 17), col(14.5, 11, 17)]),
  c("payment-success", "Payment success", "The payment card with a check under the band — the money went through",
    ["card", "success", "status"], [], ["payment success", "payment complete", "paid successfully", "transaction approved"],
    "card", [...CARD(), ...check(SMALL, 14)]),
  c("secure-checkout", "Secure checkout", "The payment card with a lock under the band — the details go nowhere else",
    ["card", "secure", "checkout"], [], ["secure checkout", "secure payment", "encrypted checkout", "safe payment"],
    "card", [...CARD(), ...lockMark(SMALL, 14)]),
  c("guest-checkout", "Guest checkout", "The payment card with a person under the band — paid without an account",
    ["checkout", "guest", "account"], [], ["guest checkout", "checkout as guest", "no account", "continue as guest"],
    "card", [...CARD(), disc(12, 12, 2), row(17, 9, 15)]),
  c("one-click-buy", "One-click buy", "The payment card with a bolt under the band — the saved card, charged in one go",
    ["card", "one-click", "buy"], [], ["one-click buy", "one click purchase", "saved card checkout", "express pay"],
    "card", [...CARD(), BOLT(13.5, 11.5)]),
  c("currency-select", "Select currency", "The payment card with chevrons up and down — which money to pay in",
    ["card", "currency", "select"], [], ["select currency", "currency picker", "pay in local currency", "currency switch"],
    "card", [...CARD(), poly([[9.5, 12.5], [12, 10], [14.5, 12.5]]), poly([[9.5, 15.5], [12, 18], [14.5, 15.5]])]),
  c("loyalty-points", "Loyalty points", "The payment card with two stones under the band — the points a shopper has",
    ["loyalty", "points", "reward"], [], ["loyalty points", "reward points", "points balance", "earn points"],
    "card", [...CARD(), STONE(8.5, 14), STONE(15.5, 14)]),
  c("points-earn", "Earn points", "The payment card with an arrow rising — points added for this purchase",
    ["loyalty", "earn", "reward"], [], ["earn points", "points earned", "collect points", "points added"],
    "card", [...CARD(), col(12, 11, 17), poly([[9.5, 13.5], [12, 11], [14.5, 13.5]])]),
  c("points-redeem", "Redeem points", "The payment card with an arrow dropping — points spent instead of money",
    ["loyalty", "redeem", "reward"], [], ["redeem points", "spend points", "use points", "points redeemed"],
    "card", [...CARD(), col(12, 11, 17), poly([[9.5, 14.5], [12, 17], [14.5, 14.5]])]),
  c("membership-tier", "Membership tier", "The payment card with a staircase under the band — silver, gold, and up",
    ["loyalty", "tier", "member"], [], ["membership tier", "loyalty tier", "gold member", "tier status"],
    "card", [...CARD(), poly([[8, 17], [10.5, 17], [10.5, 14.5], [13, 14.5], [13, 12], [15.5, 12]])]),
  c("cashback", "Cashback", "The payment card with a coin under the band — a share of the price, given back",
    ["loyalty", "cashback", "reward"], [], ["cashback", "cash back", "money back reward", "cashback offer"],
    "card", [...CARD(), ...coinMark(SMALL, 14)]),
  c("referral-bonus", "Referral bonus", "The payment card with two heads over a line — a reward for bringing a friend",
    ["loyalty", "referral", "reward"], [], ["referral bonus", "refer a friend", "referral reward", "invite bonus"],
    "card", [...CARD(), disc(9, 13, 2), disc(15, 13, 2), row(17.5, 7, 17)]),

  /* ── The order, on the receipt ────────────────────────────────────────────────── */
  c("order-total", "Order total", "A receipt with a line and an amount at its end — what the whole order comes to",
    ["order", "total", "amount"], [], ["order total", "grand total", "amount due", "total price"],
    "receipt", [RECEIPT(), row(6, 7, 17), row(10, 7, 13), disc(15.5, 10, 1)]),
  c("order-summary", "Order summary", "A receipt with three full lines — the order, item by item",
    ["order", "summary", "items"], [], ["order summary", "order details", "review order", "items ordered"],
    "receipt", [RECEIPT(), row(7, 7, 17), row(11, 7, 17), row(15, 7, 17)]),
  c("order-confirm", "Order confirmed", "A receipt with a line and a check — the order taken, and told so",
    ["order", "confirm", "status"], [], ["order confirmed", "order placed", "confirmation", "thank you for your order"],
    "receipt", [RECEIPT(), row(6, 7, 17), poly([[9, 12], [11, 14], [15, 10]])]),
  c("order-number", "Order number", "A receipt with a hash on it — the number that names one order",
    ["order", "number", "reference"], [], ["order number", "order id", "order reference", "#order"],
    "receipt", [RECEIPT(), col(10, 7, 13), col(14, 7, 13), row(10, 8, 16)]),
  c("order-cancel", "Cancel order", "A receipt with a line and a cross — the order stopped before it shipped",
    ["order", "cancel", "status"], [], ["cancel order", "order cancelled", "cancellation", "stop order"],
    "receipt", [RECEIPT(), row(6, 7, 17), poly([[10, 10], [14, 14]]), poly([[14, 10], [10, 14]])]),
  c("order-return", "Return order", "A receipt with an arrow pointing back — the goods sent back",
    ["order", "return", "goods"], [], ["return order", "return item", "returns", "send back"],
    "receipt", [RECEIPT(), ...ARROW_L(10, 8, 16)]),
  c("exchange-item", "Exchange item", "A receipt with an arrow pointing both ways — one item swapped for another",
    ["order", "exchange", "swap"], [], ["exchange item", "swap item", "exchange", "replace item"],
    "receipt", [RECEIPT(), row(10, 8, 16), poly([[10.5, 7.5], [8, 10], [10.5, 12.5]]), poly([[13.5, 7.5], [16, 10], [13.5, 12.5]])]),
  c("tax-included", "Tax included", "A receipt with a percent over the total line — the tax already in the price",
    ["tax", "included", "price"], [], ["tax included", "inclusive of tax", "vat included", "tax inclusive"],
    "receipt", [RECEIPT(), disc(9.5, 7.5, 1), poly([[8.5, 13], [15.5, 6]]), disc(14.5, 11.5, 1), row(15, 7, 17)]),
  c("receipt-email", "Email receipt", "A receipt with an envelope on it — the receipt sent to the shopper's inbox",
    ["receipt", "email", "send"], [], ["email receipt", "send receipt", "e-receipt", "receipt by email"],
    "receipt", [RECEIPT(), row(8, 7, 17), poly([[7, 8], [12, 13], [17, 8]])]),
  c("invoice-download", "Download invoice", "A receipt with an arrow dropping — the invoice saved as a file",
    ["invoice", "download", "file"], [], ["download invoice", "invoice pdf", "save invoice", "get invoice"],
    "receipt", [RECEIPT(), col(12, 7, 13), poly([[9.5, 10.5], [12, 13], [14.5, 10.5]])]),

  /* ── Promises, on the ticket and the tag ──────────────────────────────────────── */
  c("coupon-apply", "Apply coupon", "A ticket with an arrow dropping into it — the coupon put against the order",
    ["coupon", "apply", "discount"], [], ["apply coupon", "use coupon", "coupon applied", "enter coupon"],
    "ticket", [TICKET(), col(12, 8.5, 14.5), poly([[9.5, 12], [12, 14.5], [14.5, 12]])]),
  c("promo-code", "Promo code", "A ticket with a point on a dotted line — the code typed in for the deal",
    ["promo", "code", "discount"], [], ["promo code", "promotion code", "enter code", "discount code field"],
    "ticket", [TICKET(), row(12, 7, 9.5), disc(12, 12, 2), row(12, 14.5, 17)]),
  c("voucher", "Voucher", "A ticket with a perforation down it — torn off and handed over",
    ["voucher", "coupon", "discount"], [], ["voucher", "gift voucher", "tear-off voucher", "voucher code"],
    "ticket", [TICKET(), col(12, 7, 10), col(12, 14, 17)]),
  c("discount-percent", "Discount percent", "A price tag with a percent on it — this much off",
    ["discount", "percent", "sale"], [], ["discount percent", "percent off", "20% off", "percentage discount"],
    "label", [...TAG(), disc(9.5, 9.5, 1), poly([[8.5, 15.5], [15.5, 8.5]]), disc(14.5, 14.5, 1)]),
  c("local-price", "Local price", "A price tag with a pin on it — the price where the shopper is",
    ["price", "local", "currency"], [], ["local price", "price in your currency", "regional pricing", "localised price"],
    "label", [...TAG(), ...pinMark(SMALL, 12)]),
  c("vat-number", "VAT number", "A price tag with a hash on it — the tax number the invoice carries",
    ["tax", "vat", "number"], [], ["vat number", "tax id", "vat registration", "tax number"],
    "label", [...TAG(), col(10, 9, 15), col(14, 9, 15), row(12, 8, 16)]),

  /* ── In the shop, the cart and the van ────────────────────────────────────────── */
  c("place-order", "Place order", "The storefront with an arrow going in — the order handed to the shop",
    ["order", "place", "submit"], [], ["place order", "submit order", "confirm purchase", "order now"],
    "store", [...STORE(), ...ARROW_R(15, 8, 16)]),
  c("store-credit", "Store credit", "The storefront with a coin in it — money that spends only here",
    ["credit", "store", "balance"], [], ["store credit", "shop credit", "credit balance", "account credit"],
    "store", [...STORE(), ...coinMark(SMALL, 14)]),
  c("checkout-step", "Checkout step", "The cart with two points tied together — one step of the checkout, and the next",
    ["checkout", "step", "flow"], [], ["checkout step", "checkout flow", "step 1 of 3", "checkout progress"],
    "cart", [...CART(), disc(8.5, 10.5, 2), row(10.5, 10.5, 13.5), disc(15.5, 10.5, 2)]),
  c("order-history", "Order history", "The cart with a clock in it — the orders that came before",
    ["order", "history", "past"], [], ["order history", "past orders", "my orders", "previous purchases"],
    "cart", [...CART(), ...clockMark(SMALL, 10.5)]),
  c("order-failed", "Order failed", "The cart with a cross in it — the order that did not go through",
    ["order", "failed", "status"], [], ["order failed", "checkout failed", "order error", "could not place order"],
    "cart", [...CART(), ...off(SMALL, 10.5)]),
  c("shipping-option", "Shipping option", "The delivery truck with a check in its cargo — the delivery the shopper chose",
    ["shipping", "option", "delivery"], [], ["shipping option", "delivery option", "choose shipping", "shipping method"],
    "truck", [...TRUCK(), poly([[6, 11], [8, 13], [12, 9]])]),
  c("cash-on-delivery", "Cash on delivery", "The delivery truck with a coin in its cargo — paid at the door",
    ["shipping", "cash", "delivery"], [], ["cash on delivery", "cod", "pay on delivery", "pay at the door"],
    "truck", [...TRUCK(), disc(8.5, 11, 2), col(8.5, 9.5, 12.5)]),
  c("tip-add", "Add tip", "A plus dropped into a tray — something extra for the person who served",
    ["tip", "add", "gratuity"], [], ["add tip", "leave a tip", "gratuity", "tip amount"],
    "tray", [tray(), ...add(BIG, 9)]),
  c("address-form", "Address form", "A window with a pin in it — where the order should go, typed in",
    ["address", "form", "delivery"], [], ["address form", "delivery address", "enter address", "shipping address"],
    "window", [window_(), ...pinMark(SMALL, 13)]),
  c("billing-address", "Billing address", "A window with a coin in it — the address the card is registered to",
    ["address", "billing", "card"], [], ["billing address", "card address", "invoice address", "billing details"],
    "window", [window_(), ...coinMark(SMALL, 13)]),
];
