/**
 * R32 · Travel: flight & transit — the airport from kerb to gate, and the other ways a
 * journey is made public: the ferry, the cable car, the platform.
 *
 * The bodies are things: a plane seen from above (a fuselage, two swept wings, a tail),
 * the boarding pass with its torn stub, the suitcase with its handle, the hull of a boat,
 * the departure board on its legs, and the platform with its rail. What a journey does to
 * a flight sits on the plane; what it does to a booking sits on the pass.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { SMALL, add, alert, check, clockMark, off, pinMark, remove, searchMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "travel", subcategory: "transit", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The plane from above: a fuselage, two wings swept back at 45°, the tailplane. Content sits either side of the nose. */
const PLANE = () => raw(
  "M12 2L14.5 4.5V9.5L21 16H14.5V19L17 21.5H7L9.5 19V16H3L9.5 9.5V4.5Z",
  "a plane from above: the nose, two wings swept back at 45° with straight trailing edges, and the tailplane, one outline", true);
/** The boarding pass: a card with the stub torn off down a dotted line. Marks sit at cy 12, clear of the stub. */
const PASS = () => [rect(2, 5, 20, 14, 2), col(17.5, 6.5, 11), col(17.5, 13, 17.5)];
/** The suitcase: a case with its handle. Inside is x 4..20, y 8..20; marks at cy 14. */
const CASE = () => [rect(3, 6, 18, 15, 2), poly([[9, 6], [9, 3], [15, 3], [15, 6]])];
/** The hull: a boat, cut away at 45° at both ends. What it carries stands on it. */
const HULL = () => poly([[2, 15], [22, 15], [17, 20], [7, 20]], true);
/** The departure board: a screen on two legs, its rows of times inside. */
const BOARD = () => [rect(2, 3, 20, 14, 2), poly([[7, 21], [7, 17]]), poly([[17, 21], [17, 17]])];
/** The platform: the edge, its safety line, and the rail below. */
const PLATFORM = () => [row(8, 2, 22), row(11, 4, 20), row(16, 2, 22)];
/** The plane again, a size down, so a ground line fits under it. */
const PLANE_SM = () => raw(
  "M12 3L14 5V9L19.5 14.5H14V17L16 19H8L10 17V14.5H4.5L10 9V5Z",
  "the same plane one size down: nose, wings at 45°, tailplane", true);
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** The right-pointing arrow: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];

export const BATCH_119: Icon[] = [
  /* ── the plane ──────────────────────────────────────────────────────────────── */
  c("takeoff", "Take-off", "A plane climbing away from the ground",
    ["departure", "climb", "leave"], ["departure"], ["take off", "takeoff", "departing flight", "plane climbing"],
    "plane", [PLANE_SM(), row(22, 2, 22), poly([[2, 5], [5, 2]]), poly([[2, 2], [5, 2], [5, 5]])]),
  c("landing", "Landing", "A plane coming down to the ground",
    ["arrival", "descend", "land"], ["arrival"], ["landing", "plane landing", "arriving flight", "descent"],
    "plane", [PLANE_SM(), row(22, 2, 22), poly([[2, 2], [5, 5]]), poly([[2, 5], [5, 5], [5, 2]])]),
  c("flight-boarding", "Flight", "A plane seen from above — the flight itself",
    ["plane", "flight", "aircraft"], ["plane", "flight"], ["plane", "flight", "aircraft", "air travel"],
    "plane", [PLANE()]),
  c("flight-delay", "Flight delayed", "The boarding pass with a clock on it — later than it said",
    ["delay", "late", "waiting"], [], ["flight delayed", "delayed flight", "late departure", "flight delay"],
    "pass", [...PASS(), ...clockMark(SMALL, 12)]),
  c("flight-cancel", "Flight cancelled", "The boarding pass with a cross on it — it is not going",
    ["cancelled", "off", "grounded"], [], ["flight cancelled", "cancelled flight", "flight off", "grounded"],
    "pass", [...PASS(), ...off(SMALL, 12)]),
  c("flight-landed", "Flight landed", "The boarding pass with a check on it — it is down",
    ["landed", "arrived", "down"], [], ["flight landed", "arrived", "on the ground", "landing confirmed"],
    "pass", [...PASS(), ...check(SMALL, 12)]),
  c("connecting-flight", "Connecting flight", "The boarding pass with two chevrons on it — one flight into the next",
    ["connection", "transfer", "onward"], [], ["connecting flight", "connection", "onward flight", "transfer flight"],
    "pass", [...PASS(), poly([[7, 9], [10, 12], [7, 15]]), poly([[12, 9], [15, 12], [12, 15]])]),
  c("layover", "Layover", "The boarding pass with an hourglass on it — the wait between two flights",
    ["layover", "stopover", "wait"], ["stopover"], ["layover", "stopover", "wait between flights", "transit time"],
    "pass", [...PASS(), poly([[9.5, 9.5], [14.5, 9.5], [9.5, 14.5], [14.5, 14.5]], true)]),

  /* ── the airport ────────────────────────────────────────────────────────────── */
  c("airport", "Airport", "The control tower over the apron — where the flights are",
    ["airport", "tower", "airfield"], [], ["airport", "airfield", "air terminal", "airport code"],
    "figure", [poly([[9, 21], [9, 9], [15, 9], [15, 21]]), poly([[6, 9], [10.5, 4.5], [13.5, 4.5], [18, 9]]), row(21, 3, 21)]),
  c("control-tower", "Control tower", "The tower's cab and the mast under it — the eyes over the field",
    ["tower", "atc", "control"], ["atc"], ["control tower", "air traffic control", "atc", "tower"],
    "figure", [rect(5, 3, 14, 7, 2), row(6.5, 6, 18), col(12, 10, 19), row(19, 6, 18), row(22, 3, 21)]),
  c("runway", "Runway", "The strip with its centre line and the numbers at the end",
    ["runway", "strip", "tarmac"], ["airstrip"], ["runway", "airstrip", "tarmac", "landing strip"],
    "road", [col(7, 2, 22), col(17, 2, 22), col(12, 4, 8), col(12, 11, 15), col(12, 18, 21)]),
  c("jet-bridge", "Jet bridge", "The bridge reaching from the gate to the door of the plane",
    ["bridge", "gate", "airbridge"], ["airbridge"], ["jet bridge", "air bridge", "boarding bridge", "gate ramp"],
    "figure", [col(3, 3, 21), poly([[3, 9], [18, 9], [18, 16], [3, 16]]), col(8, 9, 16), col(13, 9, 16), col(21, 6, 19)]),
  c("terminal-gate", "Gate", "The gate number on the board over a doorway",
    ["gate", "number", "departure"], [], ["gate", "departure gate", "gate number", "boarding gate"],
    "figure", [rect(4, 2, 16, 7, 2), poly([[7, 21], [7, 12], [17, 12], [17, 21]]), row(21, 5, 19)]),
  c("boarding-gate", "Boarding gate", "The gate with an arrow going through it — the way onto the plane",
    ["boarding", "through", "gate"], [], ["boarding gate", "go to gate", "gate open", "walk through"],
    "figure", [poly([[4, 21], [4, 4], [8, 4], [8, 21]]), poly([[20, 21], [20, 4], [16, 4], [16, 21]]), ...ARROW_R(12, 10, 14.5)]),
  c("check-in-desk", "Check-in desk", "The desk with a screen on it — where the journey starts",
    ["check-in", "desk", "counter"], ["check-in"], ["check in desk", "check-in", "airline counter", "front desk"],
    "figure", [rect(3, 14, 18, 7, 2), rect(7, 3, 10, 8, 2), row(17.5, 6, 18)]),
  c("departure-board", "Departure board", "The board with its rows of times — everything leaving",
    ["departures", "board", "times"], [], ["departure board", "departures", "flight board", "leaving times"],
    "board", [...BOARD(), row(7, 5, 12), row(11, 5, 15), row(14, 5, 9)]),
  c("arrival-board", "Arrival board", "The board with an arrow coming in — everything landing",
    ["arrivals", "board", "incoming"], [], ["arrival board", "arrivals", "landing times", "incoming flights"],
    "board", [...BOARD(), row(10, 6, 16), poly([[13.5, 7.5], [16, 10], [13.5, 12.5]])]),
  c("timetable", "Timetable", "The board with a clock on it — when everything runs",
    ["timetable", "schedule", "times"], ["schedule"], ["timetable", "schedule", "service times", "when it runs"],
    "board", [...BOARD(), ...clockMark(SMALL, 10)]),

  /* ── the bag ────────────────────────────────────────────────────────────────── */
  c("checked-bag", "Checked bag", "The suitcase with a tag on its handle — the one that goes in the hold",
    ["luggage", "hold", "checked"], ["suitcase"], ["checked bag", "suitcase", "hold luggage", "checked luggage"],
    "case", [...CASE(), row(11, 3, 21)]),
  c("carry-on", "Carry-on", "A smaller case on its wheels — the one that comes with you",
    ["cabin", "hand", "trolley"], ["cabin-bag"], ["carry on", "cabin bag", "hand luggage", "trolley case"],
    "case", [rect(5, 6, 14, 13, 2), poly([[10, 6], [10, 3], [14, 3], [14, 6]]), disc(8, 21, 1), disc(16, 21, 1)]),
  c("baggage-drop", "Bag drop", "The suitcase with an arrow dropping onto it — the bag handed over",
    ["drop", "hand-over", "check"], [], ["bag drop", "baggage drop", "drop your bag", "check your bag"],
    "case", [rect(3, 10, 18, 11, 2), col(12, 2, 8), poly([[9.5, 5.5], [12, 8], [14.5, 5.5]])]),
  c("baggage-claim", "Baggage claim", "The suitcase on the belt going round — where the bags come back",
    ["claim", "belt", "carousel"], ["carousel"], ["baggage claim", "carousel", "luggage belt", "collect bags"],
    "case", [rect(6, 4.5, 12, 9.5, 2), poly([[10, 4.5], [10, 2], [14, 2], [14, 4.5]]), row(17, 2, 22), row(21, 2, 22)]),
  c("overweight-bag", "Overweight bag", "The suitcase with an exclamation on it — heavier than it may be",
    ["overweight", "heavy", "limit"], [], ["overweight bag", "excess baggage", "too heavy", "weight limit"],
    "case", [...CASE(), ...alert(SMALL, 14)]),
  c("legroom", "Legroom", "A seat with the space in front of it marked",
    ["seat", "space", "comfort"], [], ["legroom", "seat pitch", "extra space", "leg space"],
    "figure", [poly([[6, 2], [6, 13], [18, 13]]), row(17, 6, 18), col(9, 17, 20), col(15, 17, 20)]),

  /* ── the pass and the papers ────────────────────────────────────────────────── */
  c("boarding-pass", "Boarding pass", "The pass with its stub torn down the perforation",
    ["pass", "ticket", "stub"], [], ["boarding pass", "flight ticket", "airline ticket", "e-ticket"],
    "pass", [...PASS(), row(9, 5, 13), row(13, 5, 10)]),
  c("seat-select", "Choose a seat", "The pass with a grid of seats on it — pick one",
    ["seat", "choose", "map"], ["seat-map"], ["choose a seat", "seat map", "seat selection", "pick a seat"],
    "pass", [rect(2, 5, 20, 14, 2), poly([[6, 9], [10, 9], [10, 15], [6, 15]], true), poly([[14, 9], [18, 9], [18, 15], [14, 15]], true)]),
  c("window-seat", "Window seat", "A seat with the window beside it",
    ["seat", "window", "view"], [], ["window seat", "seat by the window", "window side", "a view"],
    "figure", [poly([[4, 4], [4, 20], [12, 20], [12, 4]], true), disc(17, 12, 4)]),
  c("aisle-seat", "Aisle seat", "A seat with the gangway beside it",
    ["seat", "aisle", "gangway"], [], ["aisle seat", "seat by the aisle", "gangway seat", "easy exit"],
    "figure", [poly([[4, 4], [4, 20], [12, 20], [12, 4]], true), col(17, 3, 21)]),
  c("passport", "Passport", "The book with the arms on its cover",
    ["passport", "document", "border"], [], ["passport", "travel document", "passport book", "id document"],
    "book", [rect(4, 2, 16, 20, 2), col(8, 2, 22), disc(14, 9, 3), row(15, 11, 19)]),
  c("visa", "Visa", "The passport page with a stamp on it — permission to enter",
    ["visa", "stamp", "permission"], [], ["visa", "entry visa", "visa stamp", "travel permission"],
    "book", [rect(4, 2, 16, 20, 2), col(8, 2, 22), poly([[10, 8], [17, 8], [17, 16], [10, 16]], true), row(12, 12, 15)]),
  c("passport-control", "Passport control", "The passport at a desk with a person behind it — the border checked",
    ["border", "control", "immigration"], ["immigration"], ["passport control", "immigration", "border control", "passport check"],
    "book", [rect(4, 6, 16, 15, 2), col(8, 6, 21), disc(14, 12, 2), arc(14, 21, 4.5, 180, 360)]),
  c("customs-declare", "Declare at customs", "The suitcase with a pen stroke on it — the form filled in at the border",
    ["customs", "declare", "form"], [], ["customs declaration", "declare goods", "nothing to declare", "customs form"],
    "case", [...CASE(), poly([[8, 17], [15, 10]])]),
  c("security-check", "Security check", "The scanner arch with a bag going through it",
    ["security", "scanner", "screening"], ["screening"], ["security check", "airport security", "screening", "scanner"],
    "figure", [poly([[4, 21], [4, 8], [8, 4], [16, 4], [20, 8], [20, 21]]), poly([[9, 13], [15, 13], [15, 19], [9, 19]], true)]),
  c("transit-card", "Transit card", "The travel card you tap at the barrier",
    ["card", "tap", "oyster"], ["travel-card"], ["transit card", "travel card", "oyster card", "tap card"],
    "card", [rect(2, 5, 20, 14, 2), arc(8, 12, 2, 200, 340), arc(8, 12, 4, 200, 340), row(9, 14, 19)]),
  c("ticket-machine", "Ticket machine", "The machine with its screen and the slot the ticket comes out of",
    ["machine", "kiosk", "buy"], ["ticket-kiosk"], ["ticket machine", "ticket kiosk", "buy a ticket", "self service"],
    "machine", [rect(4, 2, 16, 20, 2), rect(7, 5, 10, 7, 2), row(18, 8, 16)]),

  /* ── the crew ───────────────────────────────────────────────────────────────── */
  c("pilot", "Pilot", "A person with wings on the chest — the one flying it",
    ["pilot", "captain", "crew"], ["captain"], ["pilot", "captain", "flight crew", "cockpit crew"],
    "person", [disc(12, 6, 3), arc(12, 21, 9, 180, 360), poly([[7, 17], [12, 17], [17, 17]]), poly([[9.5, 14.5], [12, 17], [14.5, 14.5]])]),
  c("cabin-crew", "Cabin crew", "A person with a tray on the chest — the one who works the aisle",
    ["crew", "steward", "service"], ["flight-attendant"], ["cabin crew", "flight attendant", "steward", "air host"],
    "person", [disc(12, 6, 3), arc(12, 21, 9, 180, 360), row(16, 7, 17), poly([[9, 16], [9, 19], [15, 19], [15, 16]])]),
  c("in-flight-meal", "In-flight meal", "The tray with its dishes — dinner at altitude",
    ["meal", "tray", "food"], ["airline-meal"], ["in-flight meal", "airline food", "meal service", "dinner on board"],
    "figure", [row(15, 2, 22), arc(9, 15, 6.5, 180, 360), poly([[15.5, 15], [15.5, 8], [21, 8], [21, 15]]), row(18, 4, 20)]),

  /* ── the water and the wire ─────────────────────────────────────────────────── */
  c("ferry", "Ferry", "The hull with a deckhouse on it — the boat that carries cars",
    ["ferry", "boat", "crossing"], [], ["ferry", "car ferry", "boat crossing", "ferry terminal"],
    "boat", [HULL(), poly([[7, 15], [7, 9], [17, 9], [17, 15]]), row(6, 9, 15)]),
  c("cruise-ship", "Cruise ship", "The hull with three decks and a funnel",
    ["cruise", "liner", "ship"], ["ocean-liner"], ["cruise ship", "ocean liner", "cruise", "passenger ship"],
    "boat", [HULL(), poly([[5, 15], [5, 11], [19, 11], [19, 15]]), poly([[9, 11], [9, 7], [16, 7], [16, 11]]), poly([[11, 7], [11, 3], [14, 3], [14, 7]])]),
  c("sea-port", "Sea port", "A crane on the quay over the water",
    ["port", "quay", "dock"], ["dock"], ["sea port", "harbour dock", "quay", "port terminal"],
    "figure", [col(5, 4, 19), row(4, 5, 19), poly([[5, 9], [10, 4]]), col(17, 4, 10), poly([[14, 10], [20, 10], [20, 14], [14, 14]], true), row(19, 2, 22)]),
  c("harbour", "Harbour", "An anchor: the ring, the shank, the stock and the crown",
    ["harbour", "marina", "anchor"], ["marina", "anchor"], ["harbour", "harbor", "marina", "anchor"],
    "figure", [disc(12, 4.5, 2), col(12, 6.5, 20), row(8.5, 7, 17), arc(12, 13, 7, 0, 180)]),
  c("helicopter", "Helicopter", "The cabin with its rotor over it and the tail behind",
    ["helicopter", "rotor", "chopper"], ["chopper"], ["helicopter", "chopper", "rotorcraft", "helipad"],
    "figure", [rect(3, 9, 12, 8, 2), row(6, 2, 16), col(9, 6, 9), poly([[15, 11], [21, 11], [21, 6]]), row(20, 5, 13)]),
  c("hot-air-balloon", "Hot-air balloon", "The envelope over its basket",
    ["balloon", "flight", "basket"], ["balloon"], ["hot air balloon", "balloon flight", "ballooning", "balloon ride"],
    "figure", [disc(12, 9, 7), poly([[9.5, 15.5], [12, 18], [14.5, 15.5]]), poly([[9.5, 18], [9.5, 21.5], [14.5, 21.5], [14.5, 18]], true)]),
  c("cable-car", "Cable car", "The cabin hanging from its wire",
    ["cable", "gondola", "aerial"], ["gondola"], ["cable car", "gondola lift", "aerial tramway", "cableway"],
    "figure", [row(4, 2, 22), col(12, 4, 8), rect(5, 8, 14, 10, 2), row(13, 5, 19)]),
  c("ski-lift", "Ski lift", "Two chairs on the wire between the pylons",
    ["lift", "chair", "mountain"], ["chairlift"], ["ski lift", "chairlift", "mountain lift", "ski resort"],
    "figure", [poly([[3, 4], [19, 20]]), col(7, 8, 12), poly([[5, 12], [5, 15], [9, 15], [9, 12]]), col(15, 15, 19), poly([[13, 19], [13, 22], [17, 22], [17, 19]])]),
  c("funicular", "Funicular", "The carriage on the slope, on its rail",
    ["funicular", "incline", "rail"], ["incline-railway"], ["funicular", "incline railway", "cliff railway", "cable railway"],
    "figure", [poly([[2, 21], [21, 2]]), poly([[4, 20], [8, 16], [14, 16], [10, 20]], true), poly([[12, 12], [16, 8], [22, 8], [18, 12]], true)]),
  c("shuttle-bus", "Shuttle bus", "A small bus with an arrow under it — the one that runs to and fro",
    ["shuttle", "bus", "transfer"], [], ["shuttle bus", "airport shuttle", "transfer bus", "hotel shuttle"],
    "bus", [rect(4, 2, 16, 12, 2), row(6, 4, 20), disc(8, 16, 2), disc(16, 16, 2), row(20, 5, 19), poly([[17, 18], [19, 20], [17, 22]])]),
  c("platform", "Platform", "The platform edge, its line and the rail beyond",
    ["platform", "edge", "station"], [], ["platform", "station platform", "platform edge", "track side"],
    "platform", PLATFORM()),
  c("transfer-station", "Transfer station", "The platform with an arrow crossing it — change here",
    ["transfer", "change", "interchange"], ["interchange"], ["transfer station", "interchange", "change here", "connection"],
    "platform", [row(9, 2, 22), row(19, 2, 22), poly([[8, 9], [12, 13], [8, 17]]), poly([[16, 9], [12, 13], [16, 17]])]),
];
