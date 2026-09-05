/**
 * R24 · Commerce: promotion & loyalty — the deal, the badge that says a shopper is worth
 * keeping, and the things a shop gives away to make them come back.
 *
 * Three bodies this round brings. The rosette is a medal on two tails; what a shopper has
 * earned sits on the medal. The gift is a box with a bow of two loops tied on its lid.
 * The wallet is a pocket with a card slot set into its right side, ahead of the finance
 * domain that will own it. The price tag from R21 carries the sale, the payment card the
 * loyalty scheme, the ticket the coupon, and the cart, basket and product box the rest.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { banner, window_ } from "../bodies.ts";
import {
  SMALL, add, alert, boltMark, check, clockMark, diamondMark, heartMark, off, pinMark, squareMark, trendMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "commerce", subcategory: "promotion", name, description,
  tags, aliases, keywords, family, shapes,
});

/** A price tag on the diagonal, string hole in its corner. Marks at (12, 12). */
const TAG = () => [poly([[4, 12], [12, 4], [20, 4], [20, 12], [12, 20]], true), disc(17, 7, 1)];
/** The payment card: a card with its band across the top. Marks at cy 14. */
const CARD = () => [rect(2, 3, 20, 18, 2), row(7, 3, 21)];
/** The cart: a box on two wheels. Marks at cy 10.5. */
const CART = () => [rect(3, 3.5, 18, 14, 2), disc(7.5, 19.5, 1), disc(16.5, 19.5, 1)];
/** The basket: a box with a handle arched over its rim. Marks at cy 15. */
const BASKET = () => [rect(3, 8, 18, 14, 2), arc(12, 8, 5, 180, 360)];
/** The product: a parcel with a lid line and tape. Marks at cy 15. */
const BOX = () => [rect(3, 4, 18, 18, 2), row(8, 4, 20), col(12, 4, 8)];
/** A ticket: a card with a half-round notch bitten out of each side. Marks at cy 12. */
const TICKET = () => raw(
  "M4 5H20A2 2 0 0 1 22 7V10A2 2 0 0 0 22 14V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V14A2 2 0 0 0 2 10V7A2 2 0 0 1 4 5Z",
  "a ticket: a rounded card with a notch in each side", true);
/** The delivery truck. Its cargo box is x 3..14, y 6..16. */
const TRUCK = () => [
  raw("M4 5H13A2 2 0 0 1 15 7V10H18.5L21 12.5V15A2 2 0 0 1 19 17H4A2 2 0 0 1 2 15V7A2 2 0 0 1 4 5Z", "truck body and cab drawn as one outline", true),
  disc(7, 19, 2), disc(17, 19, 2),
];
/** The rosette: a medal on two swallow-tails. Marks sit on the medal, at cy 8.5. */
const ROSETTE = () => raw(
  "M12 2A6.5 6.5 0 1 1 12 15A6.5 6.5 0 1 1 12 2ZM9.5 14.5V22L12 19.5L14.5 22V14.5",
  "a medal and the two tails it hangs from, drawn as one path so the tails may meet the rim", false);
/** The gift: a box with a bow of two loops tied on its lid. The hollow is x 4..20, y 10..20; marks at cy 15. */
const GIFT = () => [
  rect(3, 9, 18, 12, 2),
  raw("M9 9A2 2 0 1 1 12 9A2 2 0 1 1 15 9", "a bow: two loops, each an arc that leaves the lid and comes back to it"),
];
/** The wallet: a pocket with a card slot set into its right side. Content stays left of x 12. */
const WALLET = () => [rect(2, 4, 20, 16, 2), poly([[22, 9.5], [15, 9.5], [15, 14.5], [22, 14.5]])];
/** The cake: two tiers stepped, a candle on the top one. */
const CAKE = () => [raw("M3 21V14H7V8H17V14H21V21Z", "a two-tier cake, drawn as one outline so the tiers share their steps", true), col(12, 3, 8)];
/** The hourglass: two bulbs pinched at the waist, a plate top and bottom. */
const HOURGLASS = () => [
  row(3, 6, 18), row(21, 6, 18),
  poly([[7, 3], [7, 7], [12, 12], [17, 7], [17, 3]]),
  poly([[7, 21], [7, 17], [12, 12], [17, 17], [17, 21]]),
];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** An hourglass small enough to sit on a tag or in a box, 5 wide and 5 tall, centred on (12, cy). */
const SAND = (cy: number) => poly([[9.5, cy - 2.5], [14.5, cy - 2.5], [9.5, cy + 2.5], [14.5, cy + 2.5]], true);
/** The arrow that leaves at 45°, from (x0, y0) up and right to (x1, y1), with its head at the end. */
const ARROW_OUT = (x0: number, y0: number, x1: number, y1: number) =>
  [poly([[x0, y0], [x1, y1]]), poly([[x1 - 3.5, y1], [x1, y1], [x1, y1 + 3.5]])];

export const BATCH_111: Icon[] = [
  /* ── the sale, on the price tag ─────────────────────────────────────────────── */
  c("sale-tag", "Sale tag", "A price tag with a stone on it — the tag that says the price has changed",
    ["sale", "offer", "deal"], [], ["sale tag", "on sale", "sale label", "special offer"],
    "label", [...TAG(), STONE(12, 12)]),
  c("flash-sale", "Flash sale", "A price tag with a bolt on it — a sale that lasts an hour, not a week",
    ["sale", "flash", "limited"], [], ["flash sale", "lightning deal", "hourly sale", "quick sale"],
    "label", [...TAG(), ...boltMark(SMALL, 12)]),
  c("clearance", "Clearance", "A price tag with two chevrons dropping — marked down, then down again",
    ["sale", "markdown", "last"], [], ["clearance sale", "clearance price", "final markdown", "end of line"],
    "label", [...TAG(), poly([[9.5, 9], [12, 11.5], [14.5, 9]]), poly([[9.5, 13], [12, 15.5], [14.5, 13]])]),
  c("buy-one-get-one", "Buy one get one", "The basket with two boxes in it — one paid for, both taken home",
    ["bogo", "offer", "deal"], ["bogo"], ["buy one get one", "bogo deal", "two for one", "2 for 1"],
    "basket", [...BASKET(), poly([[7, 13], [10.5, 13], [10.5, 17], [7, 17]], true), poly([[13.5, 13], [17, 13], [17, 17], [13.5, 17]], true)]),
  c("bundle-deal", "Bundle deal", "A price tag with a plus on it — more than one thing under one price",
    ["bundle", "offer", "deal"], [], ["bundle deal", "bundle price", "combo deal", "package deal"],
    "label", [...TAG(), ...add(SMALL, 12)]),
  c("seasonal-sale", "Seasonal sale", "A price tag with a leaf on it — the sale that comes round with the season",
    ["sale", "season", "holiday"], [], ["seasonal sale", "holiday sale", "summer sale", "winter sale"],
    "label", [...TAG(), raw("M9 15A4.5 4.5 0 0 1 15 9A4.5 4.5 0 0 1 9 15Z", "a leaf: two arcs sharing a chord, set on the diagonal", true)]),
  c("price-match", "Price match", "A price tag with two equal lines — the same price as anywhere else",
    ["match", "guarantee", "equal"], [], ["price match", "price guarantee", "match the price", "price promise"],
    "label", [...TAG(), row(10.5, 9, 15), row(13.5, 9, 15)]),
  c("price-alert", "Price alert", "A price tag with an exclamation on it — told when the price moves",
    ["alert", "watch", "notify"], [], ["price alert", "price watch", "price notification", "price tracker"],
    "label", [...TAG(), ...alert(SMALL, 12)]),
  c("deal-of-day", "Deal of the day", "A price tag with a clock on it — today's price, and only today's",
    ["deal", "daily", "today"], ["daily-deal"], ["deal of the day", "daily deal", "today's deal", "24 hour deal"],
    "label", [...TAG(), ...clockMark(SMALL, 12)]),
  c("limited-stock", "Limited stock", "A price tag with an hourglass on it — a few left, and going",
    ["scarce", "few", "hurry"], [], ["limited stock", "only a few left", "low availability", "while stocks last"],
    "label", [...TAG(), SAND(12)]),
  c("sold-out", "Sold out", "A price tag with a cross on it — none left at any price",
    ["gone", "unavailable", "empty"], [], ["sold out", "out of stock", "no longer available", "all gone"],
    "label", [...TAG(), ...off(SMALL, 12)]),
  c("partner-offer", "Partner offer", "A price tag with two rings linked on it — a deal made with another brand",
    ["partner", "brand", "offer"], [], ["partner offer", "co-branded deal", "partner discount", "affiliate offer"],
    "label", [...TAG(), disc(10.5, 12, 2), disc(13.5, 12, 2)]),
  c("cross-sell", "Cross-sell", "A price tag with an arrow leading on — another thing offered alongside",
    ["related", "addon", "suggest"], [], ["cross sell", "frequently bought together", "related offer", "add-on offer"],
    "label", [...TAG(), row(12, 9, 15), poly([[12.5, 9.5], [15, 12], [12.5, 14.5]])]),
  c("up-sell", "Upsell", "A price tag with an arrow rising — the bigger version, offered instead",
    ["upgrade", "premium", "suggest"], ["upsell"], ["upsell", "upgrade offer", "premium version", "better option"],
    "label", [...TAG(), col(12, 9, 15), poly([[9.5, 11.5], [12, 9], [14.5, 11.5]])]),
  c("price-history", "Price history", "A price tag with a trend line on it — where the price has been",
    ["history", "trend", "chart"], [], ["price history", "price trend", "price over time", "price chart"],
    "label", [...TAG(), ...trendMark(SMALL, 12)]),

  /* ── the badge, on the rosette ──────────────────────────────────────────────── */
  c("vip-badge", "VIP badge", "The rosette with a gem on it — the shopper the shop treats best",
    ["vip", "premium", "status"], [], ["vip badge", "vip customer", "premium member", "vip status"],
    "award", [ROSETTE(), ...diamondMark(SMALL, 8.5)]),
  c("top-rated", "Top rated", "The rosette with a one on it — the best reviewed there is",
    ["rated", "best", "first"], [], ["top rated", "best rated", "number one", "highest rated"],
    "award", [ROSETTE(), col(12, 5.5, 11.5), poly([[10, 7.5], [12, 5.5]])]),
  c("staff-pick", "Staff pick", "The rosette with a check on it — chosen by the people who work here",
    ["pick", "chosen", "curated"], [], ["staff pick", "editor's choice", "our pick", "curated choice"],
    "award", [ROSETTE(), ...check(SMALL, 8.5)]),
  c("badge-unlock", "Badge unlock", "The rosette with a keyhole on it — a badge earned and opened",
    ["unlock", "achievement", "earned"], [], ["badge unlocked", "achievement unlocked", "earn badge", "new badge"],
    "award", [ROSETTE(), disc(12, 7, 2), col(12, 9, 12)]),
  c("milestone-reward", "Milestone reward", "The rosette with a pin on it — a reward for reaching a mark on the way",
    ["milestone", "goal", "achievement"], [], ["milestone reward", "milestone bonus", "goal reached", "achievement reward"],
    "award", [ROSETTE(), ...pinMark(SMALL, 8.5)]),
  c("tiered-reward", "Tiered reward", "The rosette with three bars rising — the higher the tier, the more it gives",
    ["tier", "level", "ladder"], [], ["tiered reward", "reward tiers", "reward levels", "tier bonus"],
    "award", [ROSETTE(), col(9, 8, 11), col(12, 6.5, 11), col(15, 5, 11)]),
  c("anniversary-reward", "Anniversary reward", "The rosette with a heart on it — a year together, marked",
    ["anniversary", "yearly", "gift"], [], ["anniversary reward", "anniversary gift", "member anniversary", "one year reward"],
    "award", [ROSETTE(), ...heartMark(SMALL, 8.5)]),
  c("reward-expiry", "Reward expiry", "The rosette with a clock on it — a reward that will not keep",
    ["expiry", "deadline", "expire"], [], ["reward expiry", "points expire", "reward expiring", "use by"],
    "award", [ROSETTE(), ...clockMark(SMALL, 8.5)]),
  c("birthday-reward", "Birthday reward", "A two-tier cake with a candle on top — a treat on the shopper's birthday",
    ["birthday", "cake", "gift"], ["cake"], ["birthday reward", "birthday gift", "birthday treat", "birthday cake"],
    "cake", CAKE()),

  /* ── the scheme, on the payment card ────────────────────────────────────────── */
  c("loyalty-card", "Loyalty card", "The payment card with a heart under the band — the card a regular carries",
    ["loyalty", "member", "reward"], [], ["loyalty card", "member card", "rewards card", "club card"],
    "card", [...CARD(), ...heartMark(SMALL, 14)]),
  c("stamp-card", "Stamp card", "The payment card with a stamp and a check — one collected, one to go",
    ["stamp", "loyalty", "collect"], [], ["stamp card", "punch card", "collect stamps", "coffee card"],
    "card", [...CARD(), disc(8.5, 14, 2), poly([[13.5, 14], [15.5, 16], [19, 12.5]])]),
  c("points-balance", "Points balance", "The payment card with a stone on a line — the points, and what they add up to",
    ["loyalty", "balance", "total"], [], ["points balance", "reward balance", "my points", "points total"],
    "card", [...CARD(), STONE(12, 13), row(17.5, 8, 16)]),
  c("member-price", "Member price", "The payment card with a percent under the band — the price a member pays",
    ["member", "price", "exclusive"], [], ["member price", "members only price", "member discount", "exclusive price"],
    "card", [...CARD(), disc(9.5, 11.5, 1), poly([[9, 17], [15, 11]]), disc(14.5, 16.5, 1)]),
  c("scratch-card", "Scratch card", "The payment card with a zigzag scratched across it — the prize under the foil",
    ["scratch", "prize", "instant"], [], ["scratch card", "scratch and win", "instant win", "scratch off"],
    "card", [...CARD(), poly([[6, 15], [8.5, 12.5], [11, 15], [13.5, 12.5], [16, 15], [18.5, 12.5]])]),
  c("cashback-wallet", "Cashback wallet", "A wallet with an arrow coming back into it — the share of the price returned",
    ["cashback", "refund", "money"], [], ["cashback wallet", "cashback balance", "money back", "cashback earned"],
    "wallet", [...WALLET(), row(12, 5, 10.5), poly([[7.5, 9.5], [5, 12], [7.5, 14.5]])]),

  /* ── the coupon, on the ticket ──────────────────────────────────────────────── */
  c("coupon-book", "Coupon book", "A ticket with two perforations — coupons in a strip, torn off one at a time",
    ["coupon", "book", "strip"], [], ["coupon book", "coupon strip", "coupon booklet", "book of vouchers"],
    "ticket", [TICKET(), col(8, 7, 17), col(16, 7, 17)]),
  c("copy-code", "Copy code", "A ticket with the code held in brackets — selected, ready to paste at checkout",
    ["copy", "code", "clipboard"], [], ["copy code", "copy coupon", "copy promo code", "code copied"],
    "ticket", [TICKET(), poly([[9.5, 9], [7, 9], [7, 15], [9.5, 15]]), poly([[14.5, 9], [17, 9], [17, 15], [14.5, 15]]), disc(12, 12, 1)]),
  c("early-access", "Early access", "A ticket with a bolt on it — in before the doors open",
    ["early", "access", "preview"], [], ["early access", "presale access", "members first", "early bird"],
    "ticket", [TICKET(), ...boltMark(SMALL, 12)]),

  /* ── the giveaway ───────────────────────────────────────────────────────────── */
  c("free-gift", "Free gift", "A box with a bow on its lid and a ribbon down it — given, not sold",
    ["gift", "free", "present"], ["gift", "present"], ["free gift", "gift box", "present", "gift with purchase"],
    "gift", [...GIFT(), col(12, 9, 21)]),
  c("gift-registry", "Gift registry", "The gift box with two lines in it — the list of what to give",
    ["gift", "registry", "wishlist"], [], ["gift registry", "wedding registry", "gift list", "baby registry"],
    "gift", [...GIFT(), row(13, 7, 17), row(17, 7, 17)]),
  c("sample-product", "Sample product", "The product box with a smaller box in it — a little of it, to try",
    ["sample", "trial", "free"], [], ["free sample", "product sample", "sample size", "try before you buy"],
    "box", [...BOX(), ...squareMark(SMALL, 15)]),
  c("trial-box", "Trial box", "The product box with an hourglass in it — yours for a while, then decide",
    ["trial", "try", "period"], [], ["trial box", "free trial box", "try at home", "trial kit"],
    "box", [...BOX(), SAND(15)]),
  c("subscription-box", "Subscription box", "The product box with an arrow each way in it — sent again every month",
    ["subscription", "monthly", "recurring"], [], ["subscription box", "monthly box", "recurring delivery", "box subscription"],
    "box", [...BOX(), row(12.5, 8, 16), poly([[14, 10.5], [16, 12.5], [14, 14.5]]), row(17, 8, 16), poly([[10, 15], [8, 17], [10, 19]])]),
  c("free-shipping", "Free shipping", "The delivery truck with a stone in its cargo — the ride costs nothing",
    ["shipping", "free", "delivery"], [], ["free shipping", "free delivery", "shipping included", "no delivery fee"],
    "truck", [...TRUCK(), STONE(8.5, 11)]),
  c("refer-friend", "Refer a friend", "Two people with an arrow from one to the other — a friend brought in",
    ["referral", "invite", "friend"], [], ["refer a friend", "invite a friend", "referral", "friend invite"],
    "person", [disc(6, 5.5, 3), arc(6, 19.5, 4, 180, 360), disc(18, 5.5, 3), arc(18, 19.5, 4, 180, 360),
      row(11.5, 9.5, 13.5), poly([[11.5, 9.5], [13.5, 11.5], [11.5, 13.5]])]),
  c("share-cart", "Share cart", "The cart with an arrow leaving at 45° — the cart sent to someone else",
    ["share", "send", "link"], [], ["share cart", "send cart", "shared basket", "cart link"],
    "cart", [...CART(), ...ARROW_OUT(9, 13.5, 15, 7.5)]),
  c("wishlist-share", "Share wishlist", "The basket with an arrow leaving at 45° — the wishlist shown to others",
    ["share", "wishlist", "send"], [], ["share wishlist", "wishlist link", "send wishlist", "public wishlist"],
    "basket", [...BASKET(), ...ARROW_OUT(9, 18, 15, 12)]),
  c("bundle-save", "Bundle and save", "The cart with a percent in it — a price cut for buying the set",
    ["bundle", "save", "discount"], [], ["bundle and save", "save on bundle", "bundle discount", "buy together"],
    "cart", [...CART(), disc(9.5, 8, 1), poly([[9, 13], [15, 7]]), disc(14.5, 12, 1)]),

  /* ── the shelf the shop pushes ──────────────────────────────────────────────── */
  c("recommended-product", "Recommended product", "The product box with a stone in it — the one the shop suggests",
    ["recommend", "suggest", "pick"], [], ["recommended product", "recommended for you", "suggested product", "you may like"],
    "box", [...BOX(), STONE(12, 15)]),
  c("trending-product", "Trending product", "The product box with a trend line in it — selling more each day",
    ["trending", "popular", "hot"], [], ["trending product", "trending now", "popular product", "hot item"],
    "box", [...BOX(), ...trendMark(SMALL, 15)]),
  c("recently-viewed", "Recently viewed", "The product box with an eye in it — looked at, not bought yet",
    ["recent", "viewed", "history"], [], ["recently viewed", "browsing history", "viewed items", "seen recently"],
    "box", [...BOX(), arc(12, 15.5, 5, 200, 340), disc(12, 15.5, 2)]),
  c("promo-banner", "Promo banner", "A flag with a stone on it — the offer put up where everyone sees it",
    ["banner", "campaign", "announce"], [], ["promo banner", "promotion banner", "campaign banner", "hero banner"],
    "flag", [...banner(), STONE(12, 10)]),
  c("newsletter-signup", "Newsletter signup", "A window with an envelope in it — the form that asks for an address",
    ["newsletter", "email", "subscribe"], [], ["newsletter signup", "subscribe to newsletter", "email signup", "join mailing list"],
    "window", [window_(), poly([[7.5, 10], [16.5, 10], [16.5, 16], [7.5, 16]], true), poly([[7.5, 10], [12, 14.5], [16.5, 10]])]),
  c("countdown-sale", "Countdown sale", "An hourglass — the sale that ends when the sand does",
    ["countdown", "timer", "ends"], ["hourglass"], ["countdown sale", "sale ends in", "hourglass", "time left"],
    "hourglass", HOURGLASS()),
  c("spin-wheel", "Spin the wheel", "A wheel with a pointer over it — a prize, left to luck",
    ["wheel", "prize", "luck"], ["prize-wheel"], ["spin the wheel", "prize wheel", "wheel of fortune", "lucky spin"],
    "wheel", [disc(12, 13, 8), col(12, 5, 21), row(13, 4, 20), poly([[9, 2], [15, 2], [12, 5]], true)]),
];
