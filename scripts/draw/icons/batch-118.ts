/**
 * R31 · Travel: vehicles & road — what a person travels in, what fuels it, and the road
 * it travels on.
 *
 * Almost every icon here is a thing you can point at. Six vehicles are drawn as
 * silhouettes of their own: the car (a bonnet, a cabin, two wheels), the bus, the train
 * carriage, the bicycle, the motorbike and the tow truck. The fuel pump and the charger
 * stand beside them, the road sign is a disc on a post, the traffic light a box of three
 * lamps, and the road itself is two kerbs with a dashed line down the middle.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { SMALL, add, alert, boltMark, check, clockMark, off, pinMark, searchMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "travel", subcategory: "vehicle", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The car, from the side: a bonnet each end, a cabin between them, two wheels under it. The interior is x 2..22, y 8.5..16; content 5 tall at cy 12.5. */
const CAR = () => [
  raw("M2 16V8.5H6L9.5 5H14.5L18 8.5H22V16Z",
    "a car: the sills, the wings that rise at 45° to the cabin, drawn as one outline", true),
  disc(7, 18, 2), disc(17, 18, 2),
];
/** The bus: a tall box with its window band and two wheels. Under the band is x 4..20, y 9..18; content at cy 13.5. */
const BUS = () => [rect(3, 2, 18, 16, 2), row(8, 3, 21), disc(7, 20, 2), disc(17, 20, 2)];
/** The train carriage: a body rounded at the roof, its window band, and the rail under it. Under the band is x 5..19, y 10..19; content at cy 14.5. */
const TRAIN = () => [
  raw("M4 19V9A5 5 0 0 1 20 9V19Z", "a carriage: straight sides into one rounded roof", true),
  row(9, 4, 20), row(22, 3, 21),
];
/** The bicycle: two wheels and the frame between them. */
const BIKE = () => [disc(6, 15, 4), disc(18, 15, 4), poly([[6, 15], [10, 11], [14, 11], [18, 15]]), col(10, 7, 11), row(7, 7.5, 12.5)];
/** The motorbike: a small front wheel, a big rear one, the tank and the bars. */
const MOTORBIKE = () => [disc(5.5, 14.5, 3.5), disc(18.5, 14.5, 3.5), poly([[5.5, 14.5], [9, 11], [15, 11], [18.5, 14.5]]), poly([[9.5, 11], [12.5, 8], [16.5, 8]])];
/** The fuel pump: the pump body with its display, and the hose over its shoulder. */
const PUMP = () => [
  poly([[2.5, 21], [2.5, 5], [5.5, 2], [12.5, 2], [15.5, 5], [15.5, 21]], true),
  rect(6, 5, 6.5, 6.5, 2),
  poly([[15, 8], [18, 8], [21, 11], [21, 17]]),
];
/** The road sign: a disc on a post, the sign every rule of the road is written on. Content sits within 4 of (12, 9). */
const SIGN = () => [disc(12, 9, 7), col(12, 16, 22)];
/** The traffic light: a case of three lamps on its post. */
const LIGHT = () => [rect(6, 2, 12, 16, 2), col(12, 18, 22)];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);
/** The road: two kerbs with a dashed line down the middle. */
const ROAD = () => [col(4, 2, 22), col(20, 2, 22), col(12, 3, 7), col(12, 10.5, 13.5), col(12, 17, 21)];
/** A percent sign 6 wide and 6 tall, centred on (12, cy). */
const PERCENT = (cy: number) => [disc(9.5, cy - 2.5, 1), poly([[9, cy + 3], [15, cy - 3]]), disc(14.5, cy + 2.5, 1)];

export const BATCH_118: Icon[] = [
  /* ── the car ────────────────────────────────────────────────────────────────── */
  c("car", "Car", "A car from the side, on two wheels — the one most journeys are made in",
    ["vehicle", "drive", "auto"], ["automobile"], ["car", "automobile", "motor car", "drive"],
    "car", CAR()),
  c("car-front", "Car, front on", "A car head on: the windscreen, the lights and the grille",
    ["vehicle", "front", "head-on"], [], ["car front", "front of car", "car head on", "car facing you"],
    "car", [raw("M2 19V13L8 7H16L22 13V19Z", "a car head on: the roof narrower than the sills, the pillars at 45°", true), row(13, 2, 22), disc(6, 16, 1), disc(18, 16, 1)]),
  c("car-side", "Car, side on", "A car from the side with its doors marked — the profile of the thing",
    ["vehicle", "side", "profile"], [], ["car side", "side of car", "car profile", "car doors"],
    "car", [...CAR(), col(12, 5, 16)]),
  c("electric-car", "Electric car", "The car with a bolt in it — it runs on a battery",
    ["electric", "ev", "battery"], ["ev"], ["electric car", "ev", "battery car", "electric vehicle"],
    "car", [...CAR(), ...boltMark(SMALL, 12.5)]),
  c("hybrid-car", "Hybrid car", "The car with a bolt and a drop in it — two ways of driving the same wheels",
    ["hybrid", "petrol", "electric"], [], ["hybrid car", "hybrid vehicle", "petrol electric", "phev"],
    "car", [...CAR(), poly([[11, 10], [8.5, 12.5], [11, 12.5], [8.5, 15]]), poly([[15.5, 10], [13, 12.5], [18, 12.5]], true)]),
  c("taxi", "Taxi", "The car with its roof sign — the one you hail",
    ["taxi", "cab", "hail"], ["cab"], ["taxi", "cab", "taxicab", "hail a cab"],
    "car", [...CAR(), poly([[9.5, 5], [9.5, 2], [14.5, 2], [14.5, 5]])]),
  c("ride-share", "Ride share", "The car with two heads in it — a ride taken together",
    ["rideshare", "pool", "share"], ["carpool"], ["ride share", "carpool", "shared ride", "lift"],
    "car", [...CAR(), disc(9.5, 12.5, 2), disc(14.5, 12.5, 2)]),
  c("car-rental", "Car rental", "The car with a clock in it — someone else's car, by the day",
    ["rental", "hire", "key"], ["car-hire"], ["car rental", "car hire", "rent a car", "hire car"],
    "car", [...CAR(), ...clockMark(SMALL, 12.5)]),
  c("car-wash", "Car wash", "The car with water raining down on it — washed",
    ["wash", "clean", "water"], [], ["car wash", "wash the car", "clean car", "valet"],
    "car", [...CAR(), poly([[4, 2], [6, 4]]), poly([[9.5, 2], [11.5, 4]]), poly([[15, 2], [17, 4]])]),
  c("car-breakdown", "Breakdown", "The car with an exclamation in it — it has stopped, and not by choice",
    ["breakdown", "fault", "stranded"], [], ["car breakdown", "broken down", "car fault", "stranded"],
    "car", [...CAR(), ...alert(SMALL, 12.5)]),
  c("car-dashboard", "Dashboard", "The dials in front of the driver: a gauge, a warning and the road ahead",
    ["dashboard", "dials", "instruments"], [], ["car dashboard", "instrument cluster", "dials", "driver display"],
    "figure", [arc(12, 17, 9, 180, 360), row(17, 3, 21), col(12, 10, 17), disc(7, 13, 1), disc(17, 13, 1)]),
  c("seatbelt", "Seatbelt", "A person with the strap across the chest — the first thing you do",
    ["belt", "safety", "buckle"], [], ["seatbelt", "seat belt", "buckle up", "belt on"],
    "person", [disc(12, 6, 3), arc(12, 21, 9, 180, 360), poly([[7, 20], [16, 11]])]),
  c("child-seat", "Child seat", "A small seat with its high back and a belt — the one that straps in",
    ["child", "baby", "seat"], ["baby-seat"], ["child seat", "car seat", "baby seat", "child restraint"],
    "figure", [poly([[6, 21], [6, 6], [9, 3], [16, 3], [16, 15], [19, 15], [19, 21]]), row(15, 6, 16)]),

  /* ── the bus, the train, the two wheels ─────────────────────────────────────── */
  c("bus", "Bus", "A bus: the window band above, two wheels below",
    ["bus", "public", "transport"], [], ["bus", "city bus", "public transport", "bus stop"],
    "bus", BUS()),
  c("coach", "Coach", "The bus with a luggage line down its side — the one that goes between cities",
    ["coach", "long-distance", "intercity"], [], ["coach", "long distance bus", "intercity coach", "touring coach"],
    "bus", [...BUS(), row(14, 3, 21)]),
  c("tram", "Tram", "The bus body on a rail, with its pole to the wire above",
    ["tram", "streetcar", "rail"], ["streetcar"], ["tram", "streetcar", "trolley", "light rail"],
    "bus", [rect(3, 5, 18, 14, 2), row(10, 3, 21), poly([[12, 5], [12, 2], [19, 2]]), row(22, 3, 21)]),
  c("train", "Train", "A carriage with a rounded roof, standing on the rail",
    ["train", "rail", "railway"], ["railway"], ["train", "railway", "rail travel", "locomotive"],
    "train", TRAIN()),
  c("high-speed-train", "High-speed train", "The carriage with its nose drawn back — the fast one",
    ["fast", "express", "rail"], ["bullet-train"], ["high speed train", "bullet train", "express train", "fast rail"],
    "train", [raw("M2 18V12L9 5H18A2 2 0 0 1 20 7V18Z", "a nose swept back at 45°, the roof rounded where the cab ends", true), row(12, 9, 20), row(21, 3, 21)]),
  c("metro", "Metro", "The carriage with a tunnel arched over it — the train that runs underground",
    ["metro", "subway", "underground"], ["subway"], ["metro", "subway", "underground", "tube"],
    "train", [arc(12, 12, 10, 180, 360), rect(6, 9, 12, 10, 2), row(14, 6, 18)]),
  c("bicycle", "Bicycle", "Two wheels, the frame and the handlebars",
    ["bike", "cycle", "pedal"], ["bike"], ["bicycle", "bike", "cycling", "push bike"],
    "bike", BIKE()),
  c("e-bike", "Electric bike", "The bicycle with a battery on its frame — pedals with help",
    ["ebike", "electric", "assist"], ["electric-bike"], ["e-bike", "electric bike", "pedal assist", "ebike"],
    "bike", [...BIKE(), poly([[10, 14], [15, 14], [15, 17], [10, 17]], true)]),
  c("motorbike", "Motorbike", "A motorbike: the tank, the bars and two wheels",
    ["motorcycle", "bike", "engine"], ["motorcycle"], ["motorbike", "motorcycle", "moto", "biker"],
    "bike", MOTORBIKE()),
  c("scooter", "Scooter", "The small wheels and the step-through frame of a scooter",
    ["scooter", "moped", "step-through"], ["moped"], ["scooter", "moped", "vespa", "city scooter"],
    "bike", [disc(6, 15, 3), disc(18, 15, 3), poly([[6, 15], [9, 12], [15, 12], [15, 7]]), row(7, 13, 18)]),

  /* ── the fuel and the charge ────────────────────────────────────────────────── */
  c("fuel-pump", "Fuel pump", "The pump on the forecourt, hose over its shoulder",
    ["fuel", "petrol", "diesel"], ["petrol-pump", "gas-pump"], ["fuel pump", "petrol station", "gas pump", "filling station"],
    "pump", PUMP()),
  c("fuel-level", "Fuel level", "A gauge with its needle low — how much is left in the tank",
    ["fuel", "gauge", "tank"], ["fuel-gauge"], ["fuel level", "fuel gauge", "tank level", "petrol left"],
    "gauge", [arc(12, 15, 8, 180, 360), row(15, 4, 20), poly([[12, 15], [7.5, 10.5]]), row(19, 8, 16)]),
  c("ev-charger", "EV charger", "The charging post with its cable and a bolt on the face",
    ["charger", "electric", "plug"], ["charging-point"], ["ev charger", "charging point", "electric charger", "charge station"],
    "pump", [poly([[4, 21], [4, 5], [7, 2], [13, 2], [16, 5], [16, 21]], true), poly([[13, 6], [10.5, 8.5], [13, 8.5], [10.5, 11]]), poly([[16, 9], [19, 9], [21, 11], [21, 17]])]),
  c("charge-level", "Charge level", "A battery filled part of the way, with its terminal",
    ["battery", "charge", "level"], ["battery-level"], ["charge level", "battery level", "state of charge", "battery percent"],
    "battery", [rect(2, 6, 16, 12, 2), col(21, 10, 14), poly([[5, 10], [11, 10], [11, 14], [5, 14]], true)]),
  c("tyre", "Tyre", "A tyre: the tread outside, the wheel inside",
    ["tyre", "wheel", "rubber"], ["tire"], ["tyre", "tire", "wheel", "car tyre"],
    "wheel", [disc(12, 12, 10), disc(12, 12, 5)]),
  c("tyre-pressure", "Tyre pressure", "The tyre with a dial beside it — how hard it is blown up",
    ["pressure", "tyre", "gauge"], ["tire-pressure"], ["tyre pressure", "tire pressure", "check pressure", "tpms"],
    "wheel", [disc(9, 15, 6.5), disc(9, 15, 2), disc(18, 7, 4), poly([[18, 7], [20.5, 4.5]])]),
  c("engine", "Engine", "The block with its cylinders on top — what turns the fuel into road",
    ["engine", "motor", "block"], ["motor"], ["engine", "motor", "engine block", "under the bonnet"],
    "figure", [rect(2, 11, 20, 9, 2), poly([[6, 11], [6, 6], [10, 6], [10, 11]]), poly([[13, 11], [13, 4], [17, 4], [17, 11]])]),
  c("oil-change", "Oil change", "A drop falling into the pan below it — the oil, changed",
    ["oil", "service", "drop"], [], ["oil change", "engine oil", "oil service", "top up oil"],
    "figure", [raw("M12 2.5L16.5 7A6.5 6.5 0 1 1 7.5 7Z", "a drop: a point above one round belly, the two arcs meeting at the point", true), row(21, 5, 19)]),

  /* ── the road ───────────────────────────────────────────────────────────────── */
  c("motorway", "Motorway", "The road: two kerbs and the line between them",
    ["motorway", "highway", "road"], ["highway", "road"], ["motorway", "highway", "freeway", "the road"],
    "road", ROAD()),
  c("traffic-jam", "Traffic jam", "The road with two cars nose to tail — neither of them moving",
    ["traffic", "jam", "queue"], ["congestion"], ["traffic jam", "congestion", "queue", "gridlock"],
    "road", [col(3.5, 2, 22), col(20.5, 2, 22), poly([[7.5, 5.5], [10, 3], [14, 3], [16.5, 5.5], [16.5, 8], [7.5, 8]], true), poly([[7.5, 15.5], [10, 13], [14, 13], [16.5, 15.5], [16.5, 18], [7.5, 18]], true)]),
  c("lane-change", "Lane change", "The road with an arrow crossing from one lane to the other",
    ["lane", "change", "merge"], [], ["lane change", "change lane", "merge lane", "switch lane"],
    "road", [col(4, 2, 22), col(20, 2, 22), poly([[9, 19], [9, 12], [15, 6]]), poly([[11.5, 6], [15, 6], [15, 9.5]])]),
  c("overtake", "Overtake", "The road with one arrow passing another",
    ["overtake", "pass", "faster"], ["pass"], ["overtake", "overtaking", "pass a car", "passing lane"],
    "road", [col(3, 2, 22), col(21, 2, 22), col(9, 8, 20), poly([[6.5, 10.5], [9, 8], [11.5, 10.5]]), col(15, 4, 16), poly([[12.5, 6.5], [15, 4], [17.5, 6.5]])]),
  c("u-turn", "U-turn", "An arrow that goes up, turns, and comes back down",
    ["turn", "back", "reverse"], ["turn-back"], ["u-turn", "turn back", "make a u turn", "reverse direction"],
    "arrow", [raw("M6 20V11A6 6 0 0 1 18 11V20", "a shaft up, a half turn, and a shaft down"), poly([[15, 17], [18, 20], [21, 17]])]),
  c("roundabout", "Roundabout", "A ring with three roads meeting it",
    ["roundabout", "circle", "junction"], ["traffic-circle"], ["roundabout", "traffic circle", "rotary", "island"],
    "figure", [disc(12, 11, 6), col(12, 17, 22), row(11, 2, 6), row(11, 18, 22)]),
  c("junction", "Junction", "Two roads crossing",
    ["junction", "crossroads", "intersection"], ["crossroads"], ["junction", "crossroads", "intersection", "roads meet"],
    "road", [poly([[8, 2], [8, 8], [2, 8]]), poly([[16, 2], [16, 8], [22, 8]]), poly([[8, 22], [8, 16], [2, 16]]), poly([[16, 22], [16, 16], [22, 16]]), col(12, 9.5, 14.5)]),
  c("detour", "Detour", "The route turns away from a road marked shut — the way round",
    ["detour", "diversion", "around"], ["diversion"], ["detour", "diversion", "alternative route", "go around"],
    "arrow", [row(16, 2, 12), col(12, 7, 16), poly([[9.5, 9.5], [12, 7], [14.5, 9.5]]), poly([[16, 13], [20, 17]]), poly([[20, 13], [16, 17]])]),

  /* ── the sign, the light, the toll ──────────────────────────────────────────── */
  c("speed-limit", "Speed limit", "The round sign with a figure on it — as fast as you may go",
    ["speed", "limit", "sign"], [], ["speed limit", "speed sign", "mph limit", "km/h limit"],
    "sign", [...SIGN(), col(12, 6, 12), poly([[9.5, 8.5], [12, 6]])]),
  c("road-closed", "Road closed", "The round sign with a bar across it — no way through",
    ["closed", "blocked", "no-entry"], ["no-entry"], ["road closed", "no entry", "road blocked", "closed to traffic"],
    "sign", [...SIGN(), row(9, 7, 17)]),
  c("roadworks", "Roadworks", "The round sign with a shovel on it — men at work",
    ["works", "repairs", "construction"], ["construction"], ["roadworks", "road works", "construction ahead", "men at work"],
    "sign", [...SIGN(), col(12, 4.5, 9), poly([[9.5, 9], [9.5, 12.5], [14.5, 12.5], [14.5, 9]], true)]),
  c("speed-camera", "Speed camera", "A camera on its post, watching the road",
    ["camera", "enforcement", "speed"], [], ["speed camera", "traffic camera", "speed trap", "enforcement camera"],
    "figure", [rect(4, 5, 14, 9, 2), poly([[18, 7], [21, 7], [21, 12], [18, 12]]), col(11, 14, 21), row(21, 6, 16)]),
  c("traffic-light", "Traffic light", "Three lamps in a case on a post",
    ["signal", "lights", "stop"], ["stoplight"], ["traffic light", "traffic signal", "stoplight", "red light"],
    "light", [...LIGHT(), disc(12, 6, 2), disc(12, 10, 2), disc(12, 14, 2)]),
  c("toll-booth", "Toll booth", "A booth with the barrier across the road",
    ["toll", "barrier", "charge"], ["toll-gate"], ["toll booth", "toll gate", "road toll", "toll charge"],
    "figure", [poly([[3, 21], [3, 8], [6, 5], [9, 8], [9, 21]], true), row(12, 9, 22), col(20, 12, 21), row(21, 17, 22)]),
  c("car-park", "Car park", "The parking letter on its sign",
    ["parking", "park", "space"], ["parking"], ["car park", "parking", "parking lot", "park here"],
    "sign", [rect(3, 3, 18, 18, 2), col(9, 7, 17), poly([[9, 7], [13, 7], [15.5, 9.5], [15.5, 12], [13, 14.5], [9, 14.5]])]),
  c("parking-meter", "Parking meter", "The meter on its post, a coin slot in its face",
    ["meter", "pay", "coin"], [], ["parking meter", "pay and display", "parking payment", "meter"],
    "figure", [rect(5, 2, 14, 12, 2), col(12, 14, 22), row(22, 7, 17), row(8, 9, 15)]),
  c("parking-ticket", "Parking ticket", "A ticket with the hour on it and the lines the machine printed",
    ["ticket", "permit", "paid"], ["parking-permit"], ["parking ticket", "parking permit", "pay and display ticket", "parking receipt"],
    "ticket", [raw("M4 5H20A2 2 0 0 1 22 7V10A2 2 0 0 0 22 14V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V14A2 2 0 0 0 2 10V7A2 2 0 0 1 4 5Z", "a ticket: a rounded card with a notch in each side", true), disc(8.5, 12, 3), col(8.5, 9, 12), row(9, 13.5, 18.5), row(12, 13.5, 18.5), row(15, 13.5, 18.5)]),

  /* ── help on the road ───────────────────────────────────────────────────────── */
  c("tow-truck", "Tow truck", "A truck with its boom out and a hook on the end",
    ["tow", "recovery", "breakdown"], ["recovery-truck"], ["tow truck", "recovery truck", "towing", "car recovery"],
    "truck", [raw("M2 17V8A2 2 0 0 1 4 6H9V17Z", "the cab: a rounded corner where the windscreen meets the roof", true), poly([[9, 10], [13, 10], [19, 4]]), arc(19, 6.5, 2.5, 0, 180), poly([[9, 13], [22, 13], [22, 17], [9, 17]]), disc(6, 19, 2), disc(18, 19, 2)]),
  c("roadside-assist", "Roadside assistance", "The car with a cross in it — help sent to where it stopped",
    ["assistance", "repair", "help"], ["breakdown-cover"], ["roadside assistance", "breakdown cover", "roadside repair", "call for help"],
    "car", [...CAR(), ...add(SMALL, 12.5)]),
];
