/**
 * R35 · Travel: trip & luggage — what goes in the bag, what the trip is for, and what
 * comes back from it.
 *
 * The suitcase and the backpack carry the luggage icons; the itinerary is a page with the
 * days ruled on it; the rest are things: sunglasses, a bottle of sunscreen, a travel
 * adapter, a neck pillow, a postcard, a camera, a SIM card, a passport stamp.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { SMALL, add, alert, check, clockMark, heartMark, off, searchMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "travel", subcategory: "trip", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The suitcase: a case with its handle. Inside is x 4..20, y 8..20; marks at cy 14. */
const CASE = () => [rect(3, 6, 18, 15, 2), poly([[9, 6], [9, 3], [15, 3], [15, 6]])];
/** The backpack: a body with a rounded lid and two straps. */
const PACK = () => [raw("M6 21V9A6 6 0 0 1 18 9V21Z", "a pack: straight sides into one rounded lid", true), row(13, 6, 18), col(9, 2, 4.5), col(15, 2, 4.5)];
/** The itinerary: a page with the days ruled on it. Lines at y 8, 12, 16. */
const PAGE = () => [rect(4, 2, 16, 20, 2), col(9, 2, 22)];
/** The postcard: a card with the stamp in its corner. */
const CARD = () => [rect(2, 5, 20, 14, 2), poly([[15, 8], [19, 8], [19, 12], [15, 12]], true)];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** The right-pointing arrow: a shaft and a 45° head. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The left-pointing arrow: a shaft and a 45° head at x0. */
const ARROW_L = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]])];
/** An arrow pointing both ways along y. */
const ARROW_LR = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]]), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The sun: a disc with four rays at 45°. */
const SUN = (cx: number, cy: number, r: number) =>
  [disc(cx, cy, r), poly([[cx - r - 3, cy - r - 3], [cx - r - 1, cy - r - 1]]), poly([[cx + r + 3, cy - r - 3], [cx + r + 1, cy - r - 1]]),
   poly([[cx - r - 3, cy + r + 3], [cx - r - 1, cy + r + 1]]), poly([[cx + r + 3, cy + r + 3], [cx + r + 1, cy + r + 1]])];

export const BATCH_122: Icon[] = [
  /* ── the bags ───────────────────────────────────────────────────────────────── */
  c("suitcase", "Suitcase", "A case with its handle up",
    ["luggage", "case", "bag"], ["luggage"], ["suitcase", "luggage", "travel case", "packed bag"],
    "case", CASE()),
  c("backpack", "Backpack", "A pack with its lid and two straps",
    ["rucksack", "pack", "bag"], ["rucksack"], ["backpack", "rucksack", "day pack", "hiking bag"],
    "pack", PACK()),
  c("duffel", "Duffel bag", "A soft bag with a strap over it",
    ["duffel", "holdall", "sports"], ["holdall"], ["duffel bag", "holdall", "gym bag", "soft bag"],
    "figure", [raw("M4 9H20A3 3 0 0 1 20 19H4A3 3 0 0 1 4 9Z", "a soft bag: a long body rounded at both ends", true), arc(12, 9, 4, 180, 360), row(14, 4, 20)]),
  c("luggage-tag", "Luggage tag", "The tag tied to the handle",
    ["tag", "label", "name"], [], ["luggage tag", "bag tag", "name label", "baggage tag"],
    "label", [poly([[6, 4], [16, 4], [20, 8], [16, 12], [6, 12]], true), disc(9, 8, 1), row(16, 4, 18), row(20, 4, 14)]),
  c("luggage-lock", "Luggage lock", "The little padlock on the zip",
    ["lock", "padlock", "secure"], [], ["luggage lock", "bag lock", "tsa lock", "secure your bag"],
    "figure", [rect(5, 10, 14, 10, 2), arc(12, 10, 4.5, 180, 360), disc(12, 15, 1)]),
  c("luggage-scale", "Luggage scale", "The bag hanging from the scale",
    ["scale", "weight", "kilos"], [], ["luggage scale", "bag weight", "weigh the bag", "kilos"],
    "figure", [row(4, 6, 18), col(12, 4, 8), rect(6, 8, 12, 12, 2), row(14, 9, 15)]),
  c("packing-list", "Packing list", "The list with the things ticked off",
    ["packing", "list", "checklist"], [], ["packing list", "what to pack", "checklist", "packed"],
    "page", [...PAGE(), poly([[11, 7], [13, 9], [16, 6]]), row(12, 11, 18), poly([[11, 16], [13, 18], [16, 15]])]),
  c("lost-luggage", "Lost luggage", "The case with a question over it — it did not arrive",
    ["lost", "missing", "delayed"], [], ["lost luggage", "missing bag", "delayed baggage", "lost bag"],
    "case", [...CASE(), col(12, 12, 15), disc(12, 18, 1), arc(12, 10.5, 2.5, 180, 360)]),

  /* ── what goes in it ────────────────────────────────────────────────────────── */
  c("travel-adapter", "Travel adapter", "The plug that fits the other country's socket",
    ["adapter", "plug", "socket"], ["plug-adapter"], ["travel adapter", "plug adapter", "socket adapter", "world plug"],
    "figure", [rect(4, 5, 16, 12, 2), disc(10, 11, 1), disc(14, 11, 1), col(12, 2, 5), row(20, 8, 16)]),
  c("travel-charger", "Charger", "The charger with its lead coiled",
    ["charger", "power", "usb"], [], ["travel charger", "power adapter", "usb charger", "charge on the road"],
    "figure", [rect(5, 3, 14, 11, 2), col(9, 3, 6), col(15, 3, 6), poly([[12, 14], [12, 18], [17, 18], [17, 21]])]),
  c("travel-pillow", "Travel pillow", "The pillow that goes round the neck",
    ["pillow", "neck", "sleep"], ["neck-pillow"], ["travel pillow", "neck pillow", "sleep on the plane", "u pillow"],
    "figure", [raw("M4 10A8 8 0 1 0 20 10A4 4 0 0 1 16 10A4 4 0 0 0 8 10A4 4 0 0 1 4 10Z", "a horseshoe: the ring open at the front, with rounded ends", true)]),
  c("sunglasses", "Sunglasses", "Two lenses and the bridge between them",
    ["sunglasses", "shades", "sun"], ["shades"], ["sunglasses", "shades", "sun glasses", "eyewear"],
    "figure", [raw("M3 9H10V14A3.5 3.5 0 0 1 3 14Z", "the left lens: a squared top and a rounded bottom", true), raw("M14 9H21V14A3.5 3.5 0 0 1 14 14Z", "the right lens, the same shape", true), row(9, 10, 14)]),
  c("sunscreen", "Sunscreen", "The bottle with the sun on it",
    ["sunscreen", "spf", "cream"], ["sun-cream"], ["sunscreen", "sun cream", "spf", "sun protection"],
    "figure", [poly([[7, 21], [7, 8], [17, 8], [17, 21]], true), poly([[10, 8], [10, 4], [14, 4], [14, 8]]), disc(12, 15, 3)]),
  c("travel-first-aid", "First aid kit", "The little case with a cross on it",
    ["first-aid", "medical", "kit"], ["first-aid"], ["first aid kit", "medical kit", "travel medicine", "emergency kit"],
    "case", [rect(3, 7, 18, 13, 2), poly([[9, 7], [9, 4], [15, 4], [15, 7]]), col(12, 11, 17), row(14, 9, 15)]),
  c("travel-sim", "Travel SIM", "The SIM card with its clipped corner",
    ["sim", "card", "data"], ["sim-card"], ["travel sim", "sim card", "local sim", "data abroad"],
    "card", [poly([[6, 3], [16, 3], [19, 6], [19, 21], [6, 21]], true), poly([[9, 10], [16, 10], [16, 17], [9, 17]], true)]),
  c("roaming", "Roaming", "The phone with the signal arcs beside it",
    ["roaming", "network", "abroad"], [], ["roaming", "data roaming", "network abroad", "mobile abroad"],
    "figure", [rect(4, 3, 10, 18, 2), arc(16, 12, 3, 270, 90), arc(16, 12, 7, 270, 90)]),
  c("souvenir", "Souvenir", "The little gift bought to take home",
    ["souvenir", "gift", "memento"], ["memento"], ["souvenir", "memento", "gift from the trip", "keepsake"],
    "figure", [rect(4, 9, 16, 12, 2), row(13, 4, 20), poly([[9, 9], [9, 5], [15, 5], [15, 9]]), STONE(12, 17)]),
  c("postcard", "Postcard", "The card with a stamp in its corner and two lines of address",
    ["postcard", "card", "write"], [], ["postcard", "send a postcard", "greetings card", "write home"],
    "card", [...CARD(), row(11, 5, 13), row(15, 5, 13)]),

  /* ── the plan ───────────────────────────────────────────────────────────────── */
  c("itinerary", "Itinerary", "The page with the days ruled down it",
    ["itinerary", "plan", "days"], ["schedule"], ["itinerary", "trip plan", "day by day", "travel schedule"],
    "page", [...PAGE(), row(7, 11, 18), row(12, 11, 18), row(17, 11, 18)]),
  c("trip-plan", "Trip plan", "The page with a route drawn on it",
    ["plan", "route", "prepare"], [], ["trip plan", "plan a trip", "travel plan", "route plan"],
    "page", [...PAGE(), poly([[12, 18], [12, 12], [17, 12], [17, 6]]), disc(12, 18, 1), disc(17, 6, 1)]),
  c("trip-day", "Day of the trip", "The page with one day marked",
    ["day", "date", "schedule"], [], ["trip day", "day one", "day of the trip", "daily plan"],
    "page", [...PAGE(), row(7, 11, 18), disc(14.5, 13, 3), row(18, 11, 18)]),
  c("trip-share", "Share the trip", "The page with an arrow leaving it",
    ["share", "send", "invite"], [], ["share trip", "send itinerary", "invite to trip", "share plan"],
    "page", [...PAGE(), ...ARROW_R(12, 11, 18)]),
  c("travel-budget", "Travel budget", "The page with a coin on it — what the trip may cost",
    ["budget", "cost", "money"], [], ["travel budget", "trip cost", "holiday budget", "money for the trip"],
    "page", [...PAGE(), disc(14.5, 12, 3), col(14.5, 10, 14)]),
  c("travel-money", "Travel money", "A note with a coin over it — cash for the trip",
    ["money", "cash", "notes"], [], ["travel money", "holiday cash", "spending money", "foreign currency"],
    "banknote", [rect(2, 8, 20, 11, 2), col(5.5, 11.5, 15.5), col(18.5, 11.5, 15.5), disc(12, 13.5, 3), col(12, 11.5, 15.5)]),
  c("currency-exchange", "Currency exchange", "Two coins with an arrow each way between them",
    ["exchange", "currency", "convert"], ["fx"], ["currency exchange", "change money", "bureau de change", "convert currency"],
    "coin", [disc(7, 8, 4.5), col(7, 5.5, 10.5), disc(17, 8, 4.5), col(17, 5.5, 10.5), row(18, 4, 20), poly([[6.5, 15.5], [4, 18], [6.5, 20.5]]), poly([[17.5, 15.5], [20, 18], [17.5, 20.5]])]),
  c("translate-travel", "Translate", "Two speech marks, one in each alphabet",
    ["translate", "language", "words"], ["translate"], ["translate", "language", "say it in", "translation"],
    "figure", [poly([[2, 5], [10, 5], [10, 13], [2, 13]], true), poly([[5, 13], [5, 16], [8, 13]]), poly([[14, 9], [22, 9], [22, 17], [14, 17]], true), poly([[17, 17], [17, 20], [20, 17]])]),

  /* ── the kinds of trip ──────────────────────────────────────────────────────── */
  c("day-trip", "Day trip", "The sun over a road — out and back in a day",
    ["day", "short", "outing"], ["excursion"], ["day trip", "excursion", "out for the day", "short trip"],
    "figure", [disc(12, 11, 4.5), col(12, 2, 5), poly([[4, 5], [7, 8]]), poly([[20, 5], [17, 8]]), row(18, 2, 22)]),
  c("road-trip", "Road trip", "The road running to the horizon",
    ["road", "drive", "journey"], [], ["road trip", "drive", "long drive", "open road"],
    "road", [poly([[3, 20], [9, 14], [9, 5]]), poly([[21, 20], [15, 14], [15, 5]]), col(12, 9, 12), col(12, 16, 19)]),
  c("beach-trip", "Beach trip", "The parasol on the sand",
    ["beach", "sea", "sun"], [], ["beach trip", "beach holiday", "seaside", "sun and sand"],
    "figure", [arc(12, 12, 9, 180, 360), row(12, 3, 21), col(12, 12, 20), row(20, 4, 20)]),
  c("ski-trip", "Ski trip", "Two skis over the piste below",
    ["ski", "snow", "winter"], ["skiing"], ["ski trip", "skiing", "winter holiday", "on the slopes"],
    "figure", [poly([[2, 19], [8, 13], [11, 16], [16, 11], [21, 16]]), poly([[6, 8], [12, 2]]), poly([[9, 8], [15, 2]]), row(21, 2, 22)]),
  c("city-break", "City break", "Two towers and a short stay",
    ["city", "short", "urban"], [], ["city break", "weekend away", "urban trip", "short city stay"],
    "figure", [poly([[4, 21], [4, 8], [10, 8], [10, 21]]), poly([[13, 21], [13, 4], [19, 4], [19, 21]]), row(12, 4, 10), row(9, 13, 19), row(21, 2, 22)]),
  c("business-trip", "Business trip", "The briefcase with a plane over it",
    ["business", "work", "corporate"], [], ["business trip", "work travel", "corporate travel", "on business"],
    "briefcase", [rect(3, 12, 18, 9, 2), poly([[9, 12], [9, 9.5], [15, 9.5], [15, 12]]), poly([[11, 2], [13.5, 4.5], [19, 4.5], [16.5, 7], [11, 7]], true)]),
  c("honeymoon", "Honeymoon", "Two hearts on the way",
    ["honeymoon", "romance", "couple"], [], ["honeymoon", "romantic trip", "couple's holiday", "just married"],
    "figure", [raw("M3 9A3 3 0 0 1 9 9A3 3 0 0 1 15 9L9 15Z", "a heart: two lobes over a point", true), raw("M12 14A2 2 0 0 1 16 14A2 2 0 0 1 20 14L16 18Z", "the smaller heart beside it", true)]),
  c("family-holiday", "Family holiday", "Three heads, one small",
    ["family", "children", "together"], [], ["family holiday", "family trip", "with the children", "family travel"],
    "person", [disc(6.5, 8, 3), arc(6.5, 20, 4.5, 180, 360), disc(15, 6, 3), arc(15, 19, 5, 180, 360), disc(19.5, 12, 2), arc(19.5, 20, 2.5, 180, 360)]),
  c("solo-travel", "Solo travel", "One person with a pack",
    ["solo", "alone", "independent"], [], ["solo travel", "travelling alone", "independent travel", "one person"],
    "person", [disc(10, 6, 3), arc(10, 21, 8, 180, 360), poly([[16, 9], [20, 9], [20, 16], [16, 16]], true)]),
  c("backpacking", "Backpacking", "The pack with a bedroll under it",
    ["backpacking", "hostel", "long"], [], ["backpacking", "backpacker", "travelling rough", "long trip"],
    "pack", [raw("M6 16V8A6 6 0 0 1 18 8V16Z", "a pack: straight sides into one rounded lid", true), row(12, 6, 18), rect(3, 19, 18, 3, 1.5)]),
  c("group-tour", "Group tour", "Three heads together behind a flag",
    ["group", "tour", "together"], [], ["group tour", "guided group", "tour group", "travel together"],
    "person", [disc(7, 9, 3), disc(12.5, 9, 3), disc(18, 9, 3), arc(7, 19, 4, 180, 360), arc(12.5, 19, 4, 180, 360), arc(18, 19, 4, 180, 360)]),
  c("tour-guide", "Tour guide", "A person with a raised umbrella",
    ["guide", "tour", "leader"], [], ["tour guide", "guided tour", "group leader", "follow the guide"],
    "person", [disc(9, 7, 3), arc(9, 21, 7, 180, 360), arc(18, 8, 4, 180, 360), col(18, 8, 16)]),
  c("sightseeing", "Sightseeing", "The camera pointed at the sights",
    ["sightseeing", "camera", "photo"], [], ["sightseeing", "see the sights", "tourist", "take photos"],
    "figure", [rect(2, 7, 20, 13, 2), disc(12, 13.5, 4), poly([[8, 7], [10.5, 4.5], [13.5, 4.5], [16, 7]])]),
  c("photo-spot", "Photo spot", "The pin with a camera in it — the place worth a photograph",
    ["photo", "spot", "instagram"], [], ["photo spot", "best view", "instagram spot", "photo point"],
    "pin", [raw("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from", true), poly([[8, 8], [16, 8], [16, 13], [8, 13]], true), disc(12, 10.5, 1)]),
  c("trip-memory", "Trip memory", "The photo with a heart on it",
    ["memory", "photo", "keepsake"], [], ["trip memory", "holiday photo", "keepsake", "remember the trip"],
    "window", [rect(3, 4, 18, 16, 2), poly([[6, 16], [10, 12], [13, 15], [17, 11]]), ...heartMark(SMALL, 8)]),
  c("travel-review", "Travel review", "The speech bubble with a stone in it — what the traveller said",
    ["review", "rating", "opinion"], [], ["travel review", "trip review", "rating", "what people said"],
    "window", [raw("M4 4H20A2 2 0 0 1 22 6V15A2 2 0 0 1 20 17H13L8 22V17H4A2 2 0 0 1 2 15V6A2 2 0 0 1 4 4Z", "a bubble with its tail at the foot", true), STONE(12, 10.5)]),

  /* ── while away, and coming back ────────────────────────────────────────────── */
  c("jet-lag", "Jet lag", "A clock with a moon in it — the body on the wrong hour",
    ["jet-lag", "tired", "hours"], [], ["jet lag", "time difference tiredness", "body clock", "tired after flying"],
    "figure", [disc(12, 12, 9), raw("M14 6A6 6 0 1 0 14 18A5 5 0 0 1 14 6Z", "a crescent: the long way round one circle, back on a smaller one", true)]),
  c("time-difference", "Time difference", "Two clocks side by side, their hands apart",
    ["timezone", "hours", "difference"], [], ["time difference", "hours ahead", "time zones", "what time is it there"],
    "figure", [disc(6.5, 12, 4.5), col(6.5, 8.5, 12), row(12, 6.5, 9.5), disc(17.5, 12, 4.5), col(17.5, 12, 15.5), row(12, 14.5, 17.5)]),
  c("destination-weather", "Weather there", "The sun behind a cloud — what it is doing at the other end",
    ["weather", "forecast", "there"], [], ["destination weather", "weather forecast", "what's it like there", "holiday weather"],
    "cloud", [disc(8, 7, 4), raw("M9 20A4 4 0 0 1 9 12A5 5 0 0 1 18 12A4 4 0 0 1 18 20Z", "a cloud: three lobes over a flat foot", true)]),
  c("travel-alert", "Travel alert", "The pin with an exclamation in it — something to know before you go",
    ["alert", "warning", "advice"], ["travel-advisory"], ["travel alert", "travel advisory", "safety warning", "before you go"],
    "pin", [raw("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from", true), col(12, 6, 10), disc(12, 12.5, 1)]),
  c("embassy", "Embassy", "The building with a flag on its roof",
    ["embassy", "consulate", "help"], ["consulate"], ["embassy", "consulate", "your country's office", "help abroad"],
    "figure", [poly([[4, 21], [4, 10], [20, 10], [20, 21]]), row(21, 2, 22), col(12, 2, 10), poly([[12, 3], [19, 3], [19, 7], [12, 7]])]),
  c("travel-insurance", "Travel insurance", "The umbrella with a case under it",
    ["insurance", "cover", "protection"], [], ["travel insurance", "trip cover", "holiday insurance", "insured trip"],
    "canopy", [arc(12, 8.5, 7.5, 180, 360), row(8.5, 4.5, 19.5), rect(8, 14, 8, 7, 2), poly([[10, 14], [10, 11.5], [14, 11.5], [14, 14]])]),
  c("home-return", "On the way home", "The house with an arrow coming back to it",
    ["home", "return", "back"], [], ["on the way home", "return home", "heading back", "journey home"],
    "figure", [poly([[3, 12], [10, 5], [17, 12]]), poly([[5, 12], [5, 20], [15, 20], [15, 12]]), ...ARROW_L(16, 16, 22)]),
  c("welcome-home", "Welcome home", "The house with a heart over its door — the trip is over",
    ["home", "welcome", "back"], [], ["welcome home", "home again", "back home", "end of the trip"],
    "figure", [poly([[3, 11], [12, 2], [21, 11]]), poly([[6, 11], [6, 21], [18, 21], [18, 11]]), poly([[10, 21], [10, 15], [14, 15], [14, 21]]), ...heartMark(SMALL, 7)]),
];
