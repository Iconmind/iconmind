/**
 * R21 · Commerce: store & cart — the shop, what is on its shelves, and what leaves in the
 * cart.
 *
 * Four bodies this domain brings. The storefront is a scalloped awning over a box; what happens to the shop sits inside it. The cart is a box on two wheels; what
 * happens to an order sits inside the cart. The basket is a box with a handle arched over
 * its rim, for what a shopper keeps. The product is a box with a lid line, for what is
 * true of one thing for sale. Prices hang on a tag of their own, set on the diagonal with the string hole in its corner; reviews are
 * said in the speech bubble.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { alarm, brackets, funnel } from "../bodies.ts";
import {
  SMALL, add, bookmarkMark, check, clockMark, heartMark, listMark, off, pinMark, remove, squareMark, trendMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "commerce", subcategory: "store", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The storefront: a scalloped awning sitting on walls and a floor. The shop is x 5..19, y 9..21; marks at cy 15. */
const STORE = () => [
  raw("M2 5H22M2 5A2.5 2.5 0 0 0 7 5A2.5 2.5 0 0 0 12 5A2.5 2.5 0 0 0 17 5A2.5 2.5 0 0 0 22 5", "an awning: a rail with four scallops hanging from it"),
  poly([[4, 8], [4, 22], [20, 22], [20, 8]]),
];
/** The cart: a box on two wheels. The box is x 4..20, y 4.5..16.5; marks at cy 10.5. */
const CART = () => [rect(3, 3.5, 18, 14, 2), disc(7.5, 19.5, 1), disc(16.5, 19.5, 1)];
/** The basket: a box with a handle arched over its rim. The hollow is x 4..20, y 9..21; marks at cy 15. */
const BASKET = () => [rect(3, 8, 18, 14, 2), arc(12, 8, 5, 180, 360)];
/** The product: a box with a lid line. Under the lid is x 4..20, y 9..21; marks at cy 15. */
const BOX = () => [rect(3, 4, 18, 18, 2), row(8, 4, 20)];
/** A price tag on the diagonal: a pentagon pointed down-left, the string hole in its top-right corner. Marks sit at (12, 12). */
const TAG = () => [poly([[4, 12], [12, 4], [20, 4], [20, 12], [12, 20]], true), disc(17, 7, 1)];
/** The speech bubble `message` draws. The hollow is x 3..21, y 5..16; marks at cy 10.5. */
const BUBBLE = () => [frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]])];
/** A ticket: a card with a half-round notch bitten out of each side. Marks at cy 12. */
const TICKET = () => raw(
  "M4 5H20A2 2 0 0 1 22 7V10A2 2 0 0 0 22 14V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V14A2 2 0 0 0 2 10V7A2 2 0 0 1 4 5Z",
  "a ticket: a rounded card with a notch in each side", true);
/** A receipt: the tape bills are printed on. Marks at cy 10. */
const RECEIPT = () =>
  raw("M6 2H18A2 2 0 0 1 20 4V19L18 17L16 19L14 17L12 19L10 17L8 19L6 17L4 19V4A2 2 0 0 1 6 2Z",
    "a receipt: a rounded head and a foot torn along a zigzag", true);
/** The lens `vector-search` looks through. Content stays within 5.5 of (10, 10). */
const LENS = () => [arc(10, 10, 7, 292, 248), poly([[15, 15], [21, 21]])];
/** A set stone, 4 wide, centred on (x, y) — the set's star, since a five-point star has no 45° edges. */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The set's bolt, 2.5 wide, with its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);

export const BATCH_108: Icon[] = [
  /* ── The shop ─────────────────────────────────────────────────────────────────── */
  c("storefront", "Storefront", "An awning over a shop with its door — the place itself",
    ["shop", "front", "retail"], [], ["storefront", "shop front", "store", "retail store"],
    "store", [...STORE(), poly([[9.5, 22], [9.5, 15], [14.5, 15], [14.5, 22]])]),
  c("shop-open", "Shop open", "The storefront with a check in it — open for business",
    ["shop", "open", "status"], [], ["shop open", "store open", "we're open", "open now"],
    "store", [...STORE(), ...check(SMALL, 15)]),
  c("shop-closed", "Shop closed", "The storefront with a cross in it — closed for now",
    ["shop", "closed", "status"], [], ["shop closed", "store closed", "closed today", "not open"],
    "store", [...STORE(), ...off(SMALL, 15)]),
  c("shop-hours", "Shop hours", "The storefront with a clock in it — when the doors are open",
    ["shop", "hours", "time"], [], ["shop hours", "opening hours", "store hours", "open times"],
    "store", [...STORE(), ...clockMark(SMALL, 15)]),
  c("store-locator", "Store locator", "The storefront with a pin in it — the nearest branch, on a map",
    ["shop", "locator", "map"], [], ["store locator", "find a store", "nearest shop", "branch finder"],
    "store", [...STORE(), ...pinMark(SMALL, 15)]),
  c("aisle", "Aisle", "The storefront with two shelving runs in it — where things are found in the shop",
    ["shop", "aisle", "layout"], [], ["aisle", "shop aisle", "aisle number", "where in store"],
    "store", [...STORE(), col(9.5, 12, 19), col(14.5, 12, 19)]),
  c("category-browse", "Browse categories", "The storefront with a list in it — the shop's sections, one under another",
    ["shop", "browse", "category"], [], ["browse categories", "shop by category", "departments", "product categories"],
    "store", [...STORE(), ...listMark(SMALL, 15)]),
  c("new-arrival", "New arrival", "The storefront with a chevron rising over a line — just in",
    ["shop", "new", "arrival"], [], ["new arrival", "new in", "just arrived", "latest products"],
    "store", [...STORE(), poly([[9.5, 14], [12, 11.5], [14.5, 14]]), row(17.5, 9, 15)]),
  c("best-seller", "Best seller", "The storefront with a rising trend in it — what sells most",
    ["shop", "best-seller", "popular"], [], ["best seller", "top seller", "most popular", "bestselling"],
    "store", [...STORE(), ...trendMark(SMALL, 15)]),
  c("shelf", "Shelf", "Three shelves with goods standing on them — where stock sits in the shop",
    ["shop", "shelf", "display"], [], ["shelf", "store shelf", "shelving", "on the shelf"],
    "rails", [row(7, 3, 21), row(13, 3, 21), row(19, 3, 21), disc(7.5, 10, 2), disc(16.5, 16, 2)]),
  c("checkout-counter", "Checkout counter", "A counter on two legs with a till on it — where the shop takes the money",
    ["shop", "counter", "till"], [], ["checkout counter", "till", "point of sale", "cashier desk"],
    "figure", [row(13, 3, 21), col(5, 13, 21), col(19, 13, 21), rect(8.5, 3.5, 7, 6.5, 2)]),
  c("cash-register", "Cash register", "A display over a drawer with a coin in it — the machine that rings up a sale",
    ["shop", "register", "till"], [], ["cash register", "till", "cash drawer", "register"],
    "figure", [rect(7, 2.5, 10, 6.5, 2), rect(3, 12, 18, 9, 2), disc(12, 16.5, 2)]),
  c("barcode-scan", "Barcode scan", "A bracket pair with bars between — a product read by its code",
    ["barcode", "scan", "product"], [], ["barcode scan", "scan barcode", "scanner", "read barcode"],
    "bracket", [...brackets(), col(9, 8, 16), col(12, 8, 16), col(15, 8, 16)]),

  /* ── The price ────────────────────────────────────────────────────────────────── */
  c("price-label", "Price label", "A tag with a price written on it — what a thing costs, on the thing",
    ["price", "label", "tag"], [], ["price label", "price tag", "shelf price", "marked price"],
    "label", [...TAG(), row(10.5, 9, 15), row(14.5, 9, 13)]),
  c("price-drop", "Price drop", "A tag with an arrow dropping — cheaper than it was",
    ["price", "drop", "reduced"], [], ["price drop", "reduced price", "price cut", "was now"],
    "label", [...TAG(), col(12, 8.5, 14.5), poly([[9.5, 12], [12, 14.5], [14.5, 12]])]),
  c("price-compare", "Price compare", "A tag with two prices side by side — the same thing, priced twice",
    ["price", "compare", "shop"], [], ["price compare", "compare prices", "price comparison", "cheapest"],
    "label", [...TAG(), col(9.5, 9, 15), col(14.5, 9, 15)]),
  c("sort-price", "Sort by price", "A tag with chevrons up and down — the list ordered by what things cost",
    ["price", "sort", "order"], [], ["sort by price", "price low to high", "price high to low", "order by price"],
    "label", [...TAG(), poly([[9.5, 11], [12, 8.5], [14.5, 11]]), poly([[9.5, 13.5], [12, 16], [14.5, 13.5]])]),

  /* ── The cart ─────────────────────────────────────────────────────────────────── */
  c("cart-add", "Add to cart", "The cart with a plus in it — one more thing on its way to checkout",
    ["cart", "add", "buy"], [], ["add to cart", "add to basket", "add item", "put in cart"],
    "cart", [...CART(), ...add(SMALL, 10.5)]),
  c("cart-remove", "Remove from cart", "The cart with a minus in it — one thing taken back out",
    ["cart", "remove", "buy"], [], ["remove from cart", "remove item", "take out of cart", "delete from cart"],
    "cart", [...CART(), ...remove(SMALL, 10.5)]),
  c("cart-empty", "Empty cart", "The cart with nothing in it — nothing chosen yet",
    ["cart", "empty", "buy"], [], ["empty cart", "cart is empty", "no items", "empty basket"],
    "cart", [...CART()]),
  c("cart-full", "Full cart", "The cart with lines filling it — a cart with plenty in it",
    ["cart", "full", "buy"], [], ["full cart", "items in cart", "cart contents", "cart count"],
    "cart", [...CART(), ...listMark(SMALL, 10.5)]),
  c("cart-checkout", "Cart checkout", "The cart with a check in it — the cart taken to be paid for",
    ["cart", "checkout", "buy"], [], ["cart checkout", "proceed to checkout", "go to checkout", "check out"],
    "cart", [...CART(), ...check(SMALL, 10.5)]),
  c("quick-buy", "Quick buy", "The cart with a bolt in it — bought without the cart page",
    ["cart", "quick", "buy"], [], ["quick buy", "express checkout", "instant buy", "one-tap buy"],
    "cart", [...CART(), BOLT(13.5, 8)]),
  c("buy-now", "Buy now", "The cart with an arrow straight through it — from the product page to paid",
    ["cart", "buy", "now"], [], ["buy now", "buy it now", "purchase now", "direct purchase"],
    "cart", [...CART(), ...ARROW_R(10.5, 8, 16)]),
  c("order-again", "Order again", "The cart with an arrow looping back — the last order, placed once more",
    ["cart", "reorder", "repeat"], [], ["order again", "reorder", "buy again", "repeat order"],
    "cart", [...CART(), poly([[8.5, 13], [8.5, 8], [15.5, 8], [15.5, 13]]), poly([[13, 10.5], [15.5, 13], [18, 10.5]])]),
  c("subscribe-product", "Subscribe to product", "The cart with chevrons up and down — the same order, every so often",
    ["cart", "subscribe", "repeat"], [], ["subscribe to product", "subscribe and save", "recurring order", "auto-delivery"],
    "cart", [...CART(), poly([[9.5, 8.5], [12, 6], [14.5, 8.5]]), poly([[9.5, 12.5], [12, 15], [14.5, 12.5]])]),

  /* ── The basket ───────────────────────────────────────────────────────────────── */
  c("basket", "Basket", "A basket with a handle arched over it — what a shopper carries round the shop",
    ["basket", "shop", "carry"], [], ["basket", "shopping basket", "hand basket", "basket icon"],
    "basket", [...BASKET()]),
  c("basket-add", "Add to basket", "The basket with a plus in it — one more thing carried",
    ["basket", "add", "shop"], [], ["add to basket", "add to bag", "put in basket", "basket add"],
    "basket", [...BASKET(), ...add(SMALL, 15)]),
  c("wishlist-add", "Add to wishlist", "The basket with a bookmark in it — kept on the list, not bought yet",
    ["wishlist", "add", "save"], [], ["add to wishlist", "wishlist", "save item", "want list"],
    "basket", [...BASKET(), ...bookmarkMark(SMALL, 15)]),
  c("wishlist-heart", "Wishlist", "The basket with a heart in it — the things a shopper would like",
    ["wishlist", "heart", "save"], [], ["wishlist heart", "favourite items", "liked products", "wish list"],
    "basket", [...BASKET(), ...heartMark(SMALL, 15)]),
  c("save-for-later", "Save for later", "The basket with a clock in it — kept aside, to buy another day",
    ["basket", "save", "later"], [], ["save for later", "saved items", "buy later", "keep for later"],
    "basket", [...BASKET(), ...clockMark(SMALL, 15)]),

  /* ── The product ──────────────────────────────────────────────────────────────── */
  c("product-variant", "Product variant", "The product box with two points in it — the same thing in more than one version",
    ["product", "variant", "option"], [], ["product variant", "variants", "options", "sku variant"],
    "box", [...BOX(), disc(9.5, 15, 1), disc(14.5, 15, 1)]),
  c("product-size", "Product size", "The product box with an arrow pointing both ways — how big it comes",
    ["product", "size", "option"], [], ["product size", "size options", "size guide", "choose size"],
    "box", [...BOX(), row(15, 8, 16), poly([[10.5, 12.5], [8, 15], [10.5, 17.5]]), poly([[13.5, 12.5], [16, 15], [13.5, 17.5]])]),
  c("product-colour", "Product colour", "The product box with a swatch in it — which colour it comes in",
    ["product", "colour", "option"], [], ["product colour", "product color", "colour options", "swatch"],
    "box", [...BOX(), disc(12, 15, 3)]),
  c("product-bundle", "Product bundle", "The product box with two items packed in it — things sold together",
    ["product", "bundle", "pack"], [], ["product bundle", "bundle", "multipack", "sold together"],
    "box", [...BOX(), col(9.5, 12, 18), col(14.5, 12, 18)]),
  c("gift-wrap", "Gift wrap", "The product box with a ribbon down it — wrapped before it is sent",
    ["gift", "wrap", "present"], [], ["gift wrap", "wrapped gift", "gift wrapping", "present"],
    "box", [...BOX(), col(12, 10, 20)]),
  c("stock-in", "In stock", "The product box with an arrow dropping into it — there is some to sell",
    ["stock", "available", "inventory"], [], ["in stock", "available", "stock in", "ready to ship"],
    "box", [...BOX(), col(12, 10.5, 16.5), poly([[9.5, 14], [12, 16.5], [14.5, 14]])]),
  c("stock-out", "Out of stock", "The product box with a cross in it — none left to sell",
    ["stock", "unavailable", "inventory"], [], ["out of stock", "sold out", "unavailable", "stock out"],
    "box", [...BOX(), ...off(SMALL, 15)]),
  c("stock-low", "Low stock", "The product box with a low line in it — only a few left",
    ["stock", "low", "inventory"], [], ["low stock", "only a few left", "running low", "limited stock"],
    "box", [...BOX(), row(18, 8, 16)]),
  c("back-order", "Back order", "The product box with a clock in it — ordered now, sent when it is back",
    ["stock", "back-order", "wait"], [], ["back order", "backorder", "ships when available", "on back order"],
    "box", [...BOX(), ...clockMark(SMALL, 15)]),
  c("pre-order", "Pre-order", "The product box with an arrow rising in it — reserved before it is released",
    ["stock", "pre-order", "reserve"], [], ["pre-order", "preorder", "reserve now", "coming soon order"],
    "box", [...BOX(), col(12, 10.5, 16.5), poly([[9.5, 13], [12, 10.5], [14.5, 13]])]),

  /* ── Gifts, reviews and the rest ──────────────────────────────────────────────── */
  c("gift-card", "Gift card", "A ticket with a heart on it — money to spend here, given to someone",
    ["gift", "card", "voucher"], [], ["gift card", "gift voucher", "e-gift card", "store gift card"],
    "ticket", [TICKET(), ...heartMark(SMALL, 12)]),
  c("gift-receipt", "Gift receipt", "A receipt with a heart on it — proof of purchase with the price left off",
    ["gift", "receipt", "return"], [], ["gift receipt", "receipt without price", "gift return", "gift proof"],
    "receipt", [RECEIPT(), ...heartMark(SMALL, 10)]),
  c("product-review", "Product review", "A speech bubble with a line and a stone — what a buyer said and how they rated it",
    ["review", "rating", "product"], [], ["product review", "customer review", "reviews", "rating and review"],
    "window", [...BUBBLE(), row(8, 6, 18), STONE(12, 12.5)]),
  c("review-write", "Write a review", "A speech bubble with a pencil stroke in it — a buyer writing what they thought",
    ["review", "write", "product"], [], ["write a review", "leave a review", "rate this product", "add review"],
    "window", [...BUBBLE(), poly([[8, 13], [14, 7]])]),
  c("star-rating", "Star rating", "Three set stones over a line — the set's stars, and the bar they are counted on",
    ["rating", "stars", "review"], [], ["star rating", "rating", "five stars", "stars"],
    "figure", [STONE(6.5, 10), STONE(12, 10), STONE(17.5, 10), row(16, 4, 20)]),
  c("compare-products", "Compare products", "Two boxes with a link between them — two things looked at side by side",
    ["compare", "product", "shop"], [], ["compare products", "product comparison", "side by side", "compare items"],
    "window", [rect(2, 7, 8, 10, 2), rect(14, 7, 8, 10, 2), row(12, 10.5, 13.5)]),
  c("restock-alert", "Restock alert", "The alarm bell with a box in it — told when it is back in stock",
    ["stock", "alert", "notify"], [], ["restock alert", "back in stock alert", "notify me", "stock notification"],
    "bell", [...alarm(), ...squareMark(SMALL, 11)]),
  c("product-search", "Product search", "The lens with a box in it — a product looked for by name",
    ["search", "product", "shop"], [], ["product search", "search products", "find a product", "shop search"],
    "magnifier", [...LENS(), poly([[7, 7], [13, 7], [13, 13], [7, 13]], true)]),
  c("product-filter", "Product filter", "The funnel with a box under it — the products that match, and only those",
    ["filter", "product", "shop"], [], ["product filter", "filter products", "refine results", "faceted search"],
    "funnel", [funnel(), ...squareMark(SMALL, 18)]),
];
