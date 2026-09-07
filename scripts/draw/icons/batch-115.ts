/**
 * R28 · Finance: investing — the market, what is bought on it, and what it does to the
 * money over time.
 *
 * This round leans on things you can point at. The candle is a single bar of a price
 * chart, its wicks above and below, and what a trader does to a holding sits in it. The
 * rest have silhouettes of their own: a briefcase for the portfolio, an eight-sided coin
 * for crypto, gold ingots, a gauge for risk, a rocket for the launch, an ear of wheat
 * for yield, a newspaper, a robot's head, an armchair, the sun on the horizon, a peak
 * with a flag, and the scales. The slip, basket, house and clipboard carry the rest.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { clipboard } from "../bodies.ts";
import { SMALL, add, bookmarkMark, boltMark, check, keyMark, listMark, remove, trendMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "finance", subcategory: "investing", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The candle: one bar of a price chart with its wicks. The body is x 6..18, y 5.5..17; marks at cy 11. */
const CANDLE = () => [col(12, 2, 4.5), rect(5, 4.5, 14, 13.5, 2), col(12, 18, 21)];
/** The slip: a wide sheet with a folded corner. Marks at cy 12. */
const SLIP = () => raw("M4 5H18L22 9V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V7A2 2 0 0 1 4 5ZM18 5V9H22", "a slip: a wide sheet with its top-right corner folded over", false);
/** The basket: a box with a handle arched over its rim. Marks at cy 15. */
const BASKET = () => [rect(3, 8, 18, 14, 2), arc(12, 8, 5, 180, 360)];
/** The house `home` draws, its walls one deeper. Between the walls is x 7..17, y 12..20. */
const HOUSE = () => [poly([[3, 11], [12, 2], [21, 11]]), poly([[6, 11], [6, 21], [18, 21], [18, 11]])];
/** A person: the head, and shoulders wide enough to carry a mark on the chest at cy 17. */
const PERSON = () => [disc(12, 6, 3), arc(12, 21, 9, 180, 360)];
/** The eight-sided coin: an octagon with 45° corners. Marks at cy 12. */
const OCTAGON = () => poly([[8, 3], [16, 3], [21, 8], [21, 16], [16, 21], [8, 21], [3, 16], [3, 8]], true);
/** The money bag: a tied neck over a round belly. The belly is centred near (12, 13.5), 7 across; marks at cy 15. */
const BAG = () => raw("M9.5 4H14.5V6.5L18 10A7 7 0 1 1 6 10L9.5 6.5Z", "a money bag: a tied neck, shoulders at 45°, and one round belly, one path", true);
/** The gauge: a half-round dial closed along its base; the needle turns about (12, 16). */
const GAUGE = () => [arc(12, 16, 9, 180, 360), row(16, 3, 21)];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** A percent sign: a point, a 45° stroke, a point — 6 wide and 6 tall, centred on (12, cy). */
const PERCENT = (cy: number) => [disc(9.5, cy - 2.5, 1), poly([[9, cy + 3], [15, cy - 3]]), disc(14.5, cy + 2.5, 1)];
/** An hourglass 5 wide and 5 tall, centred on (12, cy). */
const SAND = (cy: number) => poly([[9.5, cy - 2.5], [14.5, cy - 2.5], [9.5, cy + 2.5], [14.5, cy + 2.5]], true);
/** An arrow pointing both ways along y, from x0 to x1. */
const ARROW_LR = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]]), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];

export const BATCH_115: Icon[] = [
  /* ── the holding, on the candle ─────────────────────────────────────────────── */
  c("stock", "Stock", "One candle of a price chart, its wicks above and below — a share in a company",
    ["share", "equity", "market"], ["equity"], ["stock", "share", "equity", "stocks and shares"],
    "chart", CANDLE()),
  c("stock-buy", "Buy stock", "The candle with a plus in it — a share bought",
    ["buy", "purchase", "long"], [], ["buy stock", "buy shares", "purchase stock", "go long"],
    "chart", [...CANDLE(), ...add(SMALL, 11)]),
  c("stock-sell", "Sell stock", "The candle with a minus in it — a share sold",
    ["sell", "dispose", "exit"], [], ["sell stock", "sell shares", "exit position", "dispose shares"],
    "chart", [...CANDLE(), ...remove(SMALL, 11)]),
  c("share-price", "Share price", "The candle with a coin in it — what one share costs now",
    ["price", "quote", "value"], ["stock-price"], ["share price", "stock price", "quote", "current price"],
    "chart", [...CANDLE(), disc(12, 11, 3), col(12, 9, 13)]),
  c("watchlist", "Watchlist", "The candle with a bookmark in it — a share kept an eye on",
    ["watch", "follow", "track"], [], ["watchlist", "watch list", "follow stock", "track share"],
    "chart", [...CANDLE(), ...bookmarkMark(SMALL, 11)]),
  c("return-rate", "Rate of return", "The candle with a percent in it — what the holding made, as a share of what it cost",
    ["return", "rate", "performance"], ["roi"], ["rate of return", "return on investment", "roi", "performance"],
    "chart", [...CANDLE(), ...PERCENT(11)]),
  c("limit-order", "Limit order", "The candle with a chevron rising to a line — buy, but not above this",
    ["order", "limit", "price"], [], ["limit order", "buy limit", "limit price", "set limit"],
    "chart", [...CANDLE(), row(8, 8, 16), poly([[9.5, 13.5], [12, 11], [14.5, 13.5]])]),
  c("stop-loss", "Stop loss", "The candle with a chevron falling to a line — sell if it drops this far",
    ["stop", "loss", "protect"], [], ["stop loss", "stop order", "sell stop", "protect position"],
    "chart", [...CANDLE(), poly([[9.5, 8.5], [12, 11], [14.5, 8.5]]), row(14, 8, 16)]),
  c("take-profit", "Take profit", "The candle with a check in it — the gain locked in",
    ["profit", "target", "sell"], [], ["take profit", "profit target", "lock in gains", "sell at target"],
    "chart", [...CANDLE(), ...check(SMALL, 11)]),
  c("candle-chart", "Candle chart", "Three candles climbing — the price, session by session",
    ["chart", "candles", "ohlc"], [], ["candle chart", "candlestick chart", "ohlc chart", "price chart"],
    "chart", [raw("M5 10.5V13M3 13H7V18H3ZM5 18V20.5M12 6.5V9M10 9H14V14H10ZM12 14V16.5M19 2.5V5M17 5H21V10H17ZM19 10V12.5",
      "three candles, each a box with a wick above and below, drawn as one path", false)]),

  /* ── the price and the coin ─────────────────────────────────────────────────── */
  c("price-up", "Price up", "A coin with an arrow rising over it — worth more than it was",
    ["up", "rise", "gain"], [], ["price up", "price rising", "value up", "gaining"],
    "coin", [disc(12, 17, 4), col(12, 3.5, 10), poly([[9.5, 6], [12, 3.5], [14.5, 6]])]),
  c("price-down", "Price down", "A coin with an arrow falling under it — worth less than it was",
    ["down", "fall", "loss"], [], ["price down", "price falling", "value down", "losing"],
    "coin", [disc(12, 7, 4), col(12, 14, 20.5), poly([[9.5, 18], [12, 20.5], [14.5, 18]])]),
  c("dividend", "Dividend", "A coin with two smaller coins under it — the share of profit paid out",
    ["dividend", "payout", "income"], [], ["dividend", "dividend payment", "payout", "dividend yield"],
    "coin", [disc(12, 8, 5), disc(7, 18, 3), disc(17, 18, 3)]),
  c("capital-gain", "Capital gain", "A money bag with an arrow rising in it — sold for more than it cost",
    ["gain", "profit", "sold"], [], ["capital gain", "profit on sale", "gain", "appreciation"],
    "bag", [BAG(), col(12, 12, 18), poly([[9.5, 14.5], [12, 12], [14.5, 14.5]])]),
  c("capital-loss", "Capital loss", "A money bag with an arrow falling in it — sold for less than it cost",
    ["loss", "sold", "down"], [], ["capital loss", "loss on sale", "loss", "depreciation"],
    "bag", [BAG(), col(12, 12, 18), poly([[9.5, 15.5], [12, 18], [14.5, 15.5]])]),
  c("exchange-rate", "Exchange rate", "A coin over an arrow pointing both ways — one currency for another",
    ["exchange", "currency", "rate"], ["fx-rate"], ["exchange rate", "fx rate", "currency rate", "conversion rate"],
    "coin", [disc(12, 8, 5), ...ARROW_LR(18, 4, 20)]),
  c("stock-split", "Stock split", "A coin cut into two halves — one share made into two",
    ["split", "shares", "divide"], [], ["stock split", "share split", "split shares", "2 for 1 split"],
    "coin", [raw("M9 6A6 6 0 0 0 9 18V6ZM15 6A6 6 0 0 1 15 18V6Z", "two half-coins, each an arc closed by its flat side", false)]),
  c("compound-interest", "Compound interest", "A coin with a percent in it — interest earning interest",
    ["compound", "interest", "growth"], [], ["compound interest", "compounding", "interest on interest", "growth"],
    "coin", [disc(12, 12, 9), poly([[8, 16], [16, 8]]), disc(9, 9, 2), disc(15, 15, 2)]),
  c("crypto-coin", "Crypto coin", "An eight-sided coin with a bolt in it — a coin that lives on a network",
    ["crypto", "bitcoin", "token"], ["cryptocurrency"], ["crypto coin", "cryptocurrency", "bitcoin", "token"],
    "octagon", [OCTAGON(), ...boltMark(SMALL, 12)]),
  c("crypto-wallet", "Crypto wallet", "An eight-sided coin with a key in it — you hold the keys, you hold the coin",
    ["crypto", "wallet", "keys"], [], ["crypto wallet", "bitcoin wallet", "private keys", "cold wallet"],
    "octagon", [OCTAGON(), ...keyMark(SMALL, 12)]),
  c("gold-price", "Gold price", "A bar of gold with a line rising over it — what the metal fetches",
    ["gold", "metal", "price"], [], ["gold price", "price of gold", "gold rate", "precious metal"],
    "ingot", [poly([[2, 18.5], [7, 13.5], [17, 13.5], [22, 18.5]], true), poly([[5, 9.5], [9, 5.5], [12, 8.5], [18.5, 2]])]),
  c("commodity", "Commodity", "Two bars of gold, one on the other — a thing traded by weight",
    ["commodity", "gold", "raw"], [], ["commodity", "commodities", "gold bars", "raw materials"],
    "ingot", [poly([[2, 19], [7, 14], [17, 14], [22, 19]], true), poly([[5, 11], [9.5, 6.5], [14.5, 6.5], [19, 11]], true)]),

  /* ── the paper ──────────────────────────────────────────────────────────────── */
  c("bond", "Bond", "A slip with a seal on it — a loan to a company or a state, with interest promised",
    ["bond", "fixed", "income"], [], ["bond", "government bond", "corporate bond", "fixed income"],
    "slip", [SLIP(), STONE(12, 12)]),
  c("share-certificate", "Share certificate", "A slip with two lines and a seal — proof of the shares held",
    ["certificate", "ownership", "proof"], [], ["share certificate", "stock certificate", "proof of ownership", "shareholding"],
    "slip", [SLIP(), row(9, 6, 15), row(12, 6, 12), STONE(16, 13)]),
  c("earnings-report", "Earnings report", "A slip with a trend line on it — what the company made this quarter",
    ["earnings", "report", "quarterly"], [], ["earnings report", "quarterly earnings", "company results", "earnings call"],
    "slip", [SLIP(), ...trendMark(SMALL, 12)]),
  c("pension", "Pension", "A slip with an hourglass on it — the money that waits for later",
    ["pension", "retirement", "later"], [], ["pension", "pension fund", "retirement savings", "pension pot"],
    "slip", [SLIP(), SAND(12)]),
  c("tax-loss", "Tax loss", "A slip with a minus on it — a loss written down to set against tax",
    ["tax", "loss", "offset"], ["tax-loss-harvesting"], ["tax loss", "tax loss harvesting", "offset losses", "loss carry forward"],
    "slip", [SLIP(), ...remove(SMALL, 12)]),
  c("trade-order", "Trade order", "A clipboard with an arrow each way on it — the order sheet, to buy or to sell",
    ["order", "trade", "execute"], [], ["trade order", "place order", "order ticket", "execute trade"],
    "clipboard", [...clipboard(), ...ARROW_LR(13.5, 8, 16)]),
  c("market-news", "Market news", "A newspaper: a picture, a headline and the columns",
    ["news", "press", "headlines"], [], ["market news", "financial news", "newspaper", "headlines"],
    "paper", [rect(2, 4, 20, 16, 2), poly([[5, 8], [10, 8], [10, 13], [5, 13]], true), row(8, 13, 19), row(11, 13, 19), row(16.5, 5, 19)]),
  c("ticker", "Ticker", "A strip of tape coming off its reel, the price line running along it",
    ["ticker", "tape", "quotes"], ["ticker-tape"], ["ticker", "ticker tape", "stock ticker", "live quotes"],
    "tape", [rect(2, 8, 13, 8, 2), disc(18.5, 12, 3.5), poly([[5, 13.5], [7.5, 11], [10, 13.5], [12.5, 11]])]),

  /* ── the basket ─────────────────────────────────────────────────────────────── */
  c("fund", "Fund", "The basket with two coins in it — money pooled and managed",
    ["fund", "pooled", "managed"], ["mutual-fund"], ["fund", "mutual fund", "investment fund", "pooled fund"],
    "basket", [...BASKET(), disc(8.5, 15, 2), disc(15.5, 15, 2)]),
  c("index-fund", "Index fund", "The basket with a list in it — the whole index, bought at once",
    ["index", "passive", "tracker"], ["tracker-fund"], ["index fund", "tracker fund", "passive fund", "index tracker"],
    "basket", [...BASKET(), ...listMark(SMALL, 15)]),
  c("etf", "ETF", "The basket with an arrow each way — a fund bought and sold like a share",
    ["etf", "traded", "fund"], ["exchange-traded-fund"], ["etf", "exchange traded fund", "traded fund", "etf portfolio"],
    "basket", [...BASKET(), ...ARROW_LR(15, 8, 16)]),

  /* ── things you can point at ────────────────────────────────────────────────── */
  c("portfolio", "Portfolio", "A briefcase with its latch line — everything held, carried together",
    ["holdings", "collection", "assets"], [], ["portfolio", "investment portfolio", "holdings", "my investments"],
    "briefcase", [rect(3, 9, 18, 11, 2), poly([[9, 9], [9, 5], [15, 5], [15, 9]]), row(13, 3, 21)]),
  c("investor-profile", "Investor profile", "A head over a briefcase — the person who holds it",
    ["investor", "profile", "person"], [], ["investor profile", "investor", "shareholder", "investor type"],
    "briefcase", [disc(12, 5, 3), rect(3, 11, 18, 10, 2), row(15, 3, 21)]),
  c("broker", "Broker", "A person with an arrow each way on the chest — the one in the middle who passes the trade",
    ["broker", "intermediary", "trade"], ["brokerage"], ["broker", "stockbroker", "brokerage", "trading platform"],
    "person", [...PERSON(), ...ARROW_LR(17, 8.5, 15.5)]),
  c("ipo", "IPO", "A rocket — a company's launch onto the market",
    ["ipo", "launch", "listing"], [], ["ipo", "initial public offering", "stock market launch", "rocket"],
    "rocket", [raw("M9 15V8A3 3 0 0 1 15 8V15ZM9 11L6 14V17H9M15 11L18 14V17H15M12 15V20", "a rocket: a round nose on a straight body, two fins and the exhaust, one path", false)]),
  c("yield", "Yield", "An ear of wheat — what the investment brings in, season after season",
    ["yield", "income", "harvest"], [], ["yield", "investment yield", "dividend yield", "wheat"],
    "wheat", [raw("M12 21V3M12 7L7 2M12 7L17 2M12 11L7 6M12 11L17 6M12 15L7 10M12 15L17 10", "an ear of wheat: a stalk and three pairs of grains, one path", false)]),
  c("risk-level", "Risk level", "A gauge with its needle straight up — how much could be lost",
    ["risk", "gauge", "measure"], [], ["risk level", "risk meter", "risk gauge", "risk score"],
    "gauge", [...GAUGE(), col(12, 9, 16)]),
  c("risk-low", "Low risk", "The gauge with its needle to the left — little could be lost",
    ["risk", "low", "safe"], [], ["low risk", "conservative", "safe investment", "low volatility"],
    "gauge", [...GAUGE(), poly([[12, 16], [7, 11]])]),
  c("risk-high", "High risk", "The gauge with its needle to the right — a lot could be lost",
    ["risk", "high", "volatile"], [], ["high risk", "aggressive", "volatile investment", "high volatility"],
    "gauge", [...GAUGE(), poly([[12, 16], [17, 11]])]),
  c("market-open", "Market open", "The sun rising over the horizon — the market's day begun",
    ["open", "trading", "hours"], [], ["market open", "trading open", "market hours", "opening bell"],
    "horizon", [arc(12, 17, 6, 180, 360), row(17, 3, 21), col(12, 6, 8.5), poly([[4.5, 9.5], [6.5, 11.5]]), poly([[19.5, 9.5], [17.5, 11.5]])]),
  c("market-closed", "Market closed", "The moon over the horizon — the market shut for the night",
    ["closed", "after-hours", "shut"], [], ["market closed", "trading closed", "after hours", "closing bell"],
    "horizon", [row(18, 3, 21), raw("M12 3A6.5 6.5 0 1 0 18.5 12.5A5.5 5.5 0 0 1 12 3Z", "a crescent: the long way round one circle, the short way back on a smaller one", true)]),
  c("retirement-plan", "Retirement plan", "An armchair — the years the plan pays for",
    ["retirement", "pension", "future"], [], ["retirement plan", "retirement savings", "armchair", "retire"],
    "chair", [rect(3, 10, 18, 8, 2), poly([[6, 10], [6, 4], [18, 4], [18, 10]]), col(6, 18, 21), col(18, 18, 21)]),
  c("robo-advisor", "Robo-advisor", "A robot's head — the algorithm that picks for you",
    ["robot", "automated", "advice"], [], ["robo advisor", "robo-advisor", "automated investing", "algorithmic advice"],
    "robot", [rect(4, 7, 16, 12, 2), disc(9, 12.5, 1), disc(15, 12.5, 1), col(12, 3, 7), row(16, 9, 15)]),
  c("investment-goal", "Investment goal", "A peak with a flag on it — the amount aimed at",
    ["goal", "target", "aim"], [], ["investment goal", "financial goal", "target amount", "savings target"],
    "figure", [poly([[2, 21], [7, 16], [11, 20], [18, 13], [22, 17]]), col(18, 5, 13), poly([[18, 6], [22, 6], [22, 9.5], [18, 9.5]])]),
  c("rebalance", "Rebalance", "A pair of scales with a weight in each pan — brought back to balance",
    ["rebalance", "adjust", "balance"], [], ["rebalance portfolio", "rebalancing", "adjust allocation", "restore balance"],
    "figure", [raw("M3 7H21M3 7A3 3 0 0 0 9 7M15 7A3 3 0 0 0 21 7", "the beam of the scales and the two pans hung from its ends, one path"), col(12, 7, 19), row(19, 8, 16), disc(6, 8.5, 1), disc(18, 8.5, 1)]),
  c("diversify", "Diversify", "A pie cut into three — the money spread so no one slice can sink it",
    ["diversify", "spread", "mix"], ["diversification"], ["diversify", "diversification", "spread risk", "asset mix"],
    "chart", [disc(12, 12, 9), col(12, 3, 12), row(12, 3, 21)]),
  c("asset-allocation", "Asset allocation", "A pie cut into four — how the money is split between kinds",
    ["allocation", "split", "assets"], [], ["asset allocation", "allocation", "asset split", "portfolio mix"],
    "chart", [disc(12, 12, 9), col(12, 3, 21), row(12, 3, 21)]),
  c("property-invest", "Property investment", "A house with a rising line in it — bricks that earn",
    ["property", "real-estate", "rental"], ["real-estate"], ["property investment", "real estate", "buy to let", "rental property"],
    "figure", [...HOUSE(), ...trendMark(SMALL, 16)]),
];
