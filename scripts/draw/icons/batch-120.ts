/**
 * R33 · Travel: lodging & booking — where a traveller sleeps, what the room comes with,
 * and what a booking does before they arrive.
 *
 * The bodies are the building and the bed. The hotel is a block with its windows and a
 * door; what kind of place it is sits in the windows. The bed is a headboard, a mattress
 * and a pillow, and what the room offers sits above it. Around them stand things: the key
 * card, the tent, the caravan, the door hanger, the safe, the fridge, the counter bell,
 * the pool, the towel of the spa, the dumbbell, the breakfast cup.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { SMALL, add, alert, check, clockMark, heartMark, off, remove, searchMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "travel", subcategory: "lodging", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The hotel: a block with a door in it. The windows sit in x 5..19, y 5..15; content 6 tall at cy 9. */
const HOTEL = () => [rect(3, 2, 18, 20, 2), poly([[10, 22], [10, 17], [14, 17], [14, 22]])];
/** The bed: the frame, its mattress line and a pillow. The bed is y 8..18. */
const BED = () => [poly([[2, 18], [2, 11], [22, 11], [22, 18]]), row(14.5, 2, 22), poly([[5, 11], [5, 8], [10, 8], [10, 11]])];
/** The key card: a clipped corner and the chip the door reads. Marks at cy 14. */
const KEYCARD = () => [raw("M6 3H17L21 7V19A2 2 0 0 1 19 21H6A2 2 0 0 1 4 19V5A2 2 0 0 1 6 3Z", "a key card: one corner clipped, so the reader takes it the right way round", true), poly([[7, 6], [11, 6], [11, 9], [7, 9]], true)];
/** The calendar the booking is made in: a window with its rail and two pegs. Marks at cy 15.5. */
const CAL = () => [rect(3, 5, 18, 16, 2), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5)];
/** The pool: three waves in a basin. */
const POOL = () => [poly([[2, 7], [2, 15], [22, 15], [22, 7]]), poly([[4, 11], [6.5, 8.5], [9, 11], [11.5, 8.5], [14, 11], [16.5, 8.5], [19, 11]]), row(18, 2, 22)];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** The right-pointing arrow: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The left-pointing arrow: a shaft and a 45° head that ends it at x0. */
const ARROW_L = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]])];

export const BATCH_120: Icon[] = [
  /* ── the place ──────────────────────────────────────────────────────────────── */
  c("hotel", "Hotel", "A block with its windows and a door — the place with a reception",
    ["hotel", "stay", "accommodation"], ["accommodation"], ["hotel", "stay", "accommodation", "book a hotel"],
    "hotel", [...HOTEL(), row(7, 6, 18), row(11, 6, 18)]),
  c("hotel-star", "Hotel rating", "The hotel with a stone over its door — how many stars it holds",
    ["stars", "rating", "class"], [], ["hotel rating", "star rating", "five star hotel", "hotel class"],
    "hotel", [...HOTEL(), STONE(12, 7.5), row(11, 7, 17)]),
  c("motel", "Motel", "A low block with a car in front of it — the room you drive to",
    ["motel", "roadside", "drive"], [], ["motel", "roadside motel", "drive up room", "motor inn"],
    "hotel", [poly([[2, 15], [2, 5], [22, 5], [22, 15]]), row(9, 2, 22), poly([[4, 21], [4, 17.5], [8, 17.5], [8, 21]]), poly([[14, 21], [14, 17.5], [18, 17.5], [18, 21]])]),
  c("hostel", "Hostel", "The hotel with bunks in its window — a bed in a shared room",
    ["hostel", "bunk", "shared"], [], ["hostel", "bunk bed", "shared room", "backpacker"],
    "hotel", [...HOTEL(), poly([[6, 6], [6, 9.5], [11, 9.5], [11, 6]]), poly([[13, 6], [13, 9.5], [18, 9.5], [18, 6]]), row(13, 6, 18)]),
  c("resort", "Resort", "A palm over a low building — the place you fly to and stay in",
    ["resort", "holiday", "beach"], [], ["resort", "beach resort", "holiday resort", "all inclusive hotel"],
    "figure", [col(7, 9, 18), arc(3.5, 9, 3.5, 270, 90), arc(10.5, 9, 3.5, 90, 270), poly([[13, 18], [13, 11], [22, 11], [22, 18]]), row(18, 2, 22)]),
  c("villa", "Villa", "A house with a pool beside it — the whole place to yourself",
    ["villa", "house", "private"], [], ["villa", "private house", "holiday home", "whole house"],
    "figure", [poly([[2, 11], [8, 5], [14, 11]]), poly([[4, 11], [4, 19], [12, 19], [12, 11]]), poly([[15, 14], [17, 12], [19, 14], [21, 12]]), poly([[15, 19], [17, 17], [19, 19], [21, 17]])]),
  c("holiday-apartment", "Holiday apartment", "One flat in a block, marked out from the rest",
    ["apartment", "flat", "self-catering"], ["flat"], ["holiday apartment", "flat", "self catering", "apartment rental"],
    "hotel", [rect(3, 3, 18, 18, 2), row(12, 3, 21), col(12, 3, 12), poly([[14, 15], [19, 15], [19, 19], [14, 19]], true)]),
  c("cabin", "Cabin", "A log cabin with its chimney",
    ["cabin", "lodge", "wood"], ["lodge"], ["cabin", "log cabin", "lodge", "chalet"],
    "figure", [poly([[3, 11], [12, 2], [21, 11]]), poly([[6, 11], [6, 21], [18, 21], [18, 11]]), row(16, 6, 18), poly([[16, 6], [16, 3], [19, 3], [19, 6]])]),
  c("campsite", "Campsite", "Two tents side by side",
    ["camp", "camping", "pitch"], ["camping"], ["campsite", "camping", "camp ground", "pitch a tent"],
    "tent", [poly([[2, 14], [7, 9], [12, 14]], true), poly([[12, 14], [17, 9], [22, 14]], true), col(7, 11, 14), col(17, 11, 14), row(17, 2, 22)]),
  c("tent", "Tent", "One tent with its door open",
    ["tent", "camp", "shelter"], [], ["tent", "camping tent", "shelter", "pitch"],
    "tent", [poly([[2, 16], [12, 6], [22, 16]], true), poly([[12, 11], [7, 16]]), poly([[12, 11], [17, 16]]), row(19, 4, 20)]),
  c("caravan", "Caravan", "A caravan on its wheel, with its window and hitch",
    ["caravan", "trailer", "rv"], ["trailer"], ["caravan", "trailer", "rv", "motorhome"],
    "vehicle", [poly([[3, 15], [3, 5], [19, 5], [19, 15]], true), poly([[6, 8], [11, 8], [11, 12], [6, 12]], true), disc(8, 17.5, 2), row(10, 19, 22)]),
  c("glamping", "Glamping", "The tent with a stone over it — canvas with a bed in it",
    ["glamping", "luxury", "canvas"], [], ["glamping", "luxury camping", "safari tent", "yurt"],
    "tent", [poly([[2, 16], [12, 6], [22, 16]], true), STONE(12, 12.5), row(19, 4, 20)]),

  /* ── the room ───────────────────────────────────────────────────────────────── */
  c("double-bed", "Double bed", "A bed with two pillows on it",
    ["bed", "double", "room"], ["bed"], ["double bed", "bed", "double room", "queen bed"],
    "bed", [poly([[2, 18], [2, 11], [22, 11], [22, 18]]), row(14.5, 2, 22), poly([[4, 11], [4, 8], [9, 8], [9, 11]]), poly([[13, 11], [13, 8], [18, 8], [18, 11]])]),
  c("twin-beds", "Twin beds", "Two single beds side by side",
    ["beds", "twin", "single"], [], ["twin beds", "two singles", "twin room", "separate beds"],
    "bed", [poly([[2, 18], [2, 11], [10, 11], [10, 18]]), row(14, 2, 10), poly([[3, 11], [3, 8.5], [6.5, 8.5], [6.5, 11]]), poly([[14, 18], [14, 11], [22, 11], [22, 18]]), row(14, 14, 22), poly([[15, 11], [15, 8.5], [18.5, 8.5], [18.5, 11]])]),
  c("family-room", "Family room", "The bed with a small one beside it",
    ["family", "children", "room"], [], ["family room", "room for four", "children's bed", "family suite"],
    "bed", [poly([[2, 18], [2, 10], [12, 10], [12, 18]]), row(13.5, 2, 12), poly([[4, 10], [4, 7], [8, 7], [8, 10]]), poly([[15, 18], [15, 13], [22, 13], [22, 18]]), row(15.5, 15, 22)]),
  c("accessible-room", "Accessible room", "The wheelchair on the door of a room",
    ["accessible", "wheelchair", "step-free"], ["wheelchair-access"], ["accessible room", "wheelchair access", "step free", "disabled access"],
    "figure", [disc(9, 4.5, 2), poly([[9, 7], [9, 14], [16, 14]]), disc(11, 17, 5), poly([[16, 14], [19, 17]])]),
  c("pet-friendly", "Pets welcome", "A paw on the door — the dog may come in",
    ["pets", "dog", "welcome"], ["pets-allowed"], ["pet friendly", "pets allowed", "dog friendly", "bring your pet"],
    "figure", [disc(6, 9, 2), disc(11, 6, 2), disc(16.5, 8, 2), raw("M7 16A5 5 0 0 1 17 16A4 4 0 0 1 12 20A4 4 0 0 1 7 16Z", "the pad: one arc over the toes and a rounded heel", true)]),
  c("balcony", "Balcony", "The railing along the edge of the floor outside",
    ["balcony", "terrace", "outside"], ["terrace"], ["balcony", "terrace", "private balcony", "outdoor space"],
    "figure", [row(6, 2, 22), col(6, 6, 17), col(12, 6, 17), col(18, 6, 17), row(17, 2, 22)]),
  c("sea-view", "Sea view", "The window with the sea in it",
    ["view", "sea", "ocean"], ["ocean-view"], ["sea view", "ocean view", "view of the water", "sea facing"],
    "window", [rect(3, 3, 18, 18, 2), poly([[5, 11], [8, 8], [11, 11], [14, 8], [17, 11]]), poly([[7, 17], [10, 14], [13, 17], [16, 14]])]),
  c("city-view", "City view", "The window with the skyline in it",
    ["view", "city", "skyline"], [], ["city view", "skyline view", "city facing", "urban view"],
    "figure", [poly([[3, 21], [3, 10], [10, 10], [10, 21]]), poly([[12, 21], [12, 4], [19, 4], [19, 21]]), row(14, 3, 10), row(9, 12, 19), row(21, 2, 22)]),
  c("free-wifi", "Free wi-fi", "The waves of a signal over a bed",
    ["wifi", "internet", "free"], ["wifi"], ["free wifi", "wi-fi", "internet included", "wireless"],
    "fan", [arc(12, 17, 4.5, 200, 340), arc(12, 17, 9, 200, 340), disc(12, 18, 1)]),
  c("free-parking", "Free parking", "The parking letter with a car under it",
    ["parking", "free", "car"], [], ["free parking", "parking included", "car park", "guest parking"],
    "sign", [col(8, 2, 13), poly([[8, 2], [12, 2], [15.5, 5.5], [15.5, 8], [12, 11.5], [8, 11.5]]), poly([[3, 21], [3, 18], [6.5, 18], [9, 15.5], [15, 15.5], [17.5, 18], [21, 18], [21, 21]], true)]),

  /* ── the key and the door ───────────────────────────────────────────────────── */
  c("room-key", "Room key", "A key on its fob, the number stamped on it",
    ["key", "room", "fob"], [], ["room key", "hotel key", "key fob", "door key"],
    "figure", [disc(7, 10, 3.5), col(7, 13.5, 21), row(18, 7, 11), poly([[12, 5], [21, 5], [21, 11], [12, 11]], true), row(8, 14, 19)]),
  c("key-card", "Key card", "The card with the notch a door reads",
    ["card", "keycard", "door"], ["keycard"], ["key card", "keycard", "room card", "door card"],
    "card", KEYCARD()),
  c("do-not-disturb", "Do not disturb", "The hanger on the door handle",
    ["disturb", "privacy", "hanger"], ["dnd"], ["do not disturb", "dnd", "door hanger", "privacy sign"],
    "figure", [raw("M9.5 3A2.5 2.5 0 0 1 14.5 3V5.5A2.5 2.5 0 0 1 9.5 5.5Z", "the hole the hanger takes the door handle by", true), poly([[7, 8], [17, 8], [17, 21], [7, 21]], true), row(12, 9.5, 14.5), row(16, 9.5, 14.5)]),
  c("housekeeping", "Housekeeping", "The trolley with the towels on it",
    ["cleaning", "trolley", "service"], ["cleaning"], ["housekeeping", "room cleaning", "maid service", "cleaning trolley"],
    "figure", [poly([[4, 6], [4, 18], [20, 18], [20, 6]], true), row(12, 4, 20), disc(7, 20.5, 1), disc(17, 20.5, 1), row(3, 6, 12)]),
  c("room-service", "Room service", "A domed dish carried on the hand",
    ["service", "food", "tray"], [], ["room service", "food to the room", "in-room dining", "tray service"],
    "figure", [row(16, 2, 22), arc(12, 16, 8, 180, 360), col(12, 5.5, 8), row(20, 8, 16)]),
  c("wake-up-call", "Wake-up call", "The alarm bell ringing beside the bed",
    ["alarm", "morning", "call"], ["alarm-call"], ["wake up call", "morning call", "alarm", "wake me at"],
    "figure", [disc(12, 13, 8), col(12, 9, 13), row(13, 12, 16), poly([[5, 5], [8, 8]]), poly([[19, 5], [16, 8]])]),
  c("minibar", "Minibar", "The little fridge with a bottle in it",
    ["fridge", "drinks", "bar"], [], ["minibar", "mini fridge", "room bar", "drinks in the room"],
    "machine", [rect(5, 2, 14, 20, 2), row(9, 5, 19), poly([[9.5, 13.5], [9.5, 18.5], [14.5, 18.5], [14.5, 13.5], [12, 11]], true)]),
  c("safe-box", "Room safe", "The safe with its dial",
    ["safe", "valuables", "lock"], ["safe"], ["room safe", "hotel safe", "safe box", "valuables"],
    "machine", [rect(3, 4, 18, 16, 2), disc(11, 12, 4), poly([[11, 12], [14, 9]]), col(18, 10, 14)]),

  /* ── the desk ───────────────────────────────────────────────────────────────── */
  c("reception-desk", "Reception", "The counter with a bell on it",
    ["reception", "desk", "front"], ["front-desk"], ["reception", "front desk", "check in desk", "hotel lobby"],
    "figure", [row(13, 2, 22), poly([[4, 13], [4, 20], [20, 20], [20, 13]]), arc(12, 10, 4, 180, 360), col(12, 5.5, 8)]),
  c("concierge", "Concierge", "A person with crossed keys on the chest",
    ["concierge", "staff", "help"], [], ["concierge", "hotel staff", "guest services", "ask the desk"],
    "person", [disc(12, 6, 3), arc(12, 21, 9, 180, 360), poly([[8, 20], [16, 12]]), poly([[16, 20], [8, 12]])]),
  c("bellhop", "Bellhop", "The luggage trolley the porter pushes",
    ["porter", "luggage", "trolley"], ["porter"], ["bellhop", "porter", "luggage trolley", "bell boy"],
    "figure", [col(3, 3, 21), row(3, 3, 9), poly([[7, 18], [7, 9], [20, 9], [20, 18]], true), row(13.5, 7, 20), disc(9, 20.5, 1), disc(18, 20.5, 1)]),
  c("hotel-check-in", "Check in", "The key card with an arrow into it — the room taken",
    ["check-in", "arrive", "in"], [], ["hotel check in", "check in", "arrive", "get the room"],
    "card", [...KEYCARD(), ...ARROW_R(15, 7, 15)]),
  c("hotel-check-out", "Check out", "The key card with an arrow out of it — the room given back",
    ["check-out", "leave", "out"], [], ["hotel check out", "check out", "leave the room", "hand back the key"],
    "card", [...KEYCARD(), ...ARROW_L(15, 8, 16)]),
  c("early-checkin", "Early check-in", "The key card with a clock on it, hands before the hour",
    ["early", "check-in", "time"], [], ["early check in", "check in early", "before three", "early arrival"],
    "card", [...KEYCARD(), disc(13.5, 14.5, 3.5), col(13.5, 11.5, 14.5), row(14.5, 10.5, 13.5)]),
  c("late-checkout", "Late check-out", "The key card with a clock on it, hands after the hour",
    ["late", "check-out", "time"], [], ["late check out", "check out late", "after eleven", "late departure"],
    "card", [...KEYCARD(), disc(13.5, 14.5, 3.5), col(13.5, 11.5, 14.5), row(14.5, 13.5, 16.5)]),

  /* ── the booking ────────────────────────────────────────────────────────────── */
  c("booking-confirm", "Booking confirmed", "The calendar with a check on it — the room is held",
    ["confirmed", "booked", "held"], [], ["booking confirmed", "reservation confirmed", "room booked", "confirmed stay"],
    "window", [...CAL(), ...check(SMALL, 15.5)]),
  c("booking-cancel", "Booking cancelled", "The calendar with a cross on it — the room let go",
    ["cancelled", "dropped", "void"], [], ["booking cancelled", "cancel reservation", "room cancelled", "cancelled stay"],
    "window", [...CAL(), ...off(SMALL, 15.5)]),
  c("booking-modify", "Change booking", "The calendar with a pen stroke on it — the dates changed",
    ["change", "amend", "edit"], [], ["change booking", "amend reservation", "modify dates", "edit booking"],
    "window", [...CAL(), poly([[8, 18], [15, 11]])]),
  c("booking-pending", "Booking pending", "The calendar with an hourglass on it — asked for, not yet held",
    ["pending", "waiting", "request"], [], ["booking pending", "awaiting confirmation", "request sent", "pending reservation"],
    "window", [...CAL(), poly([[9.5, 13], [14.5, 13], [9.5, 18], [14.5, 18]], true)]),
  c("free-cancellation", "Free cancellation", "The calendar with a cross on it and no fee to pay — cancel for nothing",
    ["free", "cancel", "refundable"], ["refundable"], ["free cancellation", "refundable", "cancel for free", "no fee"],
    "window", [...CAL(), poly([[7, 13], [11, 17]]), poly([[11, 13], [7, 17]])]),
  c("non-refundable", "Non-refundable", "The calendar with a barred note on it — the money stays paid",
    ["non-refundable", "final", "no-refund"], [], ["non refundable", "no refund", "final sale", "money not returned"],
    "window", [...CAL(), poly([[7, 12.5], [17, 12.5], [17, 18.5], [7, 18.5]], true), poly([[8, 17.5], [14, 11.5]])]),
  c("price-per-night", "Price per night", "The calendar with a coin on it — what one night costs",
    ["price", "night", "rate"], ["nightly-rate"], ["price per night", "nightly rate", "cost per night", "room rate"],
    "window", [...CAL(), disc(12, 15.5, 3), col(12, 13.5, 17.5)]),

  /* ── what is included ───────────────────────────────────────────────────────── */
  c("breakfast-included", "Breakfast included", "A cup and a plate — the first meal is in the price",
    ["breakfast", "included", "meal"], ["breakfast"], ["breakfast included", "breakfast", "morning meal", "b&b"],
    "figure", [poly([[6, 8], [6, 15], [14, 15], [14, 8]], true), arc(14, 11.5, 2.5, 270, 90), row(18, 4, 20), poly([[8, 3], [8, 6]]), poly([[12, 3], [12, 6]])]),
  c("half-board", "Half board", "Two dishes of the day, one struck through",
    ["half-board", "meals", "dinner"], [], ["half board", "two meals", "dinner included", "breakfast and dinner"],
    "figure", [arc(12, 15, 8, 180, 360), row(15, 2, 22), col(12, 7, 15), row(19, 6, 18)]),
  c("all-inclusive", "All inclusive", "The dish with a check over it — everything is in the price",
    ["all-inclusive", "everything", "included"], [], ["all inclusive", "everything included", "full board", "all in"],
    "figure", [arc(12, 16, 8, 180, 360), row(16, 2, 22), poly([[8, 9], [11, 12], [16, 7]])]),
  c("pool", "Swimming pool", "Waves in a basin",
    ["pool", "swim", "water"], ["swimming-pool"], ["swimming pool", "pool", "swim", "hotel pool"],
    "pool", POOL()),
  c("spa", "Spa", "Three stones balanced, one on the next — the quiet of the place",
    ["spa", "wellness", "massage"], ["wellness"], ["spa", "wellness", "massage", "hotel spa"],
    "figure", [disc(12, 17, 4), disc(12, 10, 3), disc(12, 5, 2), row(21.5, 4, 20)]),
  c("hotel-gym", "Gym", "A dumbbell",
    ["gym", "fitness", "weights"], ["fitness"], ["hotel gym", "fitness room", "dumbbell", "work out"],
    "figure", [row(12, 8, 16), poly([[5, 7], [5, 17], [8, 17], [8, 7]], true), poly([[16, 7], [16, 17], [19, 17], [19, 7]], true), col(2.5, 10, 14), col(21.5, 10, 14)]),
];
