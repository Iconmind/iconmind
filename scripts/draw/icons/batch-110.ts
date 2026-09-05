/**
 * R23 · Commerce: shipping & delivery — the parcel from the packing bench to the doorstep,
 * and every place it can get stuck on the way.
 *
 * The parcel is the taped box the product stands in; what is true of a parcel sits under
 * its lid. What is moving sits in the cargo of the delivery truck. What arrives at a home
 * sits by the door the set already draws. Freight brings its own bodies — a container, a
 * hull with a container on it, a plane — and the warehouse keeps the roof it already had.
 */
import { arc, area, col, disc, poly, raw, rect, row } from "../forms.ts";
import { tray, window_ } from "../bodies.ts";
import {
  SMALL, check, clockMark, coinMark, listMark, pinMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "commerce", subcategory: "shipping", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The parcel: a box with a lid line and the tape down to it. Under the lid is x 4..20, y 9..21; marks at cy 15. */
const BOX = () => [rect(3, 4, 18, 18, 2), row(8, 4, 20), col(12, 4, 8)];
/** The delivery truck. Its cargo box is x 3..14, y 6..16, so what rides in it is drawn free, not as a locked mark. */
const TRUCK = () => [
  raw("M4 5H13A2 2 0 0 1 15 7V10H18.5L21 12.5V15A2 2 0 0 1 19 17H4A2 2 0 0 1 2 15V7A2 2 0 0 1 4 5Z", "truck body and cab drawn as one outline", true),
  disc(7, 19, 2), disc(17, 19, 2),
];
/** The door `logout` walks out of, with a parcel on its step. */
const DOORSTEP = () => [poly([[9, 3], [3, 3], [3, 21], [9, 21]]), rect(12, 12, 8, 8, 2)];
/** The storefront: a scalloped awning on walls and a floor. Marks at cy 15. */
const STORE = () => [
  raw("M2 5H22M2 5A2.5 2.5 0 0 0 7 5A2.5 2.5 0 0 0 12 5A2.5 2.5 0 0 0 17 5A2.5 2.5 0 0 0 22 5", "an awning: a rail with four scallops hanging from it"),
  poly([[4, 8], [4, 22], [20, 22], [20, 8]]),
];
/** The warehouse roof the set draws. Under it is x 4..20, y 9..19. */
const WAREHOUSE = () => poly([[2, 20], [2, 10], [5, 7], [19, 7], [22, 10], [22, 20]]);
/** A price tag on the diagonal, string hole in its corner. Marks at (12, 12). */
const TAG = () => [poly([[4, 12], [12, 4], [20, 4], [20, 12], [12, 20]], true), disc(17, 7, 1)];
/** The pin `location` is drawn from. What is at the place sits in its head, around (12, 10). */
const PIN = () => area("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits");
/** A person: the head, and shoulders wide enough to carry something at the chest. */
const PERSON = () => [disc(12, 6, 3), arc(12, 21, 9, 180, 360)];
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The left-pointing arrow: a shaft and a 45° head that ends it at x0. */
const ARROW_L = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x0 + 2.5, y - 2.5], [x0, y], [x0 + 2.5, y + 2.5]])];
/** The set's bolt, 2.5 wide, with its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);

export const BATCH_110: Icon[] = [
  /* ── The parcel ───────────────────────────────────────────────────────────────── */
  c("parcel", "Parcel", "A box with its lid taped down — the thing that gets shipped",
    ["parcel", "package", "box"], [], ["parcel", "package", "shipment", "box"],
    "box", [...BOX()]),
  c("parcel-track", "Track parcel", "The parcel with a pin under the lid — where it is right now",
    ["parcel", "track", "location"], [], ["track parcel", "parcel tracking", "where is my order", "track shipment"],
    "box", [...BOX(), ...pinMark(SMALL, 15)]),
  c("tracking-number", "Tracking number", "The parcel with a hash under the lid — the number that follows it",
    ["parcel", "tracking", "number"], [], ["tracking number", "tracking id", "consignment number", "waybill"],
    "box", [...BOX(), col(10, 12, 18), col(14, 12, 18), row(15, 8, 16)]),
  c("shipping-label", "Shipping label", "The parcel with an address written under the lid — where it is going",
    ["parcel", "label", "address"], [], ["shipping label", "address label", "print label", "mailing label"],
    "box", [...BOX(), row(13, 8, 16), row(17, 8, 13)]),
  c("packing-slip", "Packing slip", "The parcel with a list under the lid — what should be inside",
    ["parcel", "packing", "list"], [], ["packing slip", "packing list", "contents list", "delivery note"],
    "box", [...BOX(), ...listMark(SMALL, 15)]),
  c("pick-list", "Pick list", "The parcel with a ticked list under the lid — what to fetch from the shelves for it",
    ["warehouse", "pick", "list"], [], ["pick list", "picking list", "order picking", "items to pick"],
    "box", [...BOX(), disc(9, 13, 1), row(13, 11, 16), row(17, 11, 16)]),
  c("package-scan", "Package scan", "The parcel with bars under the lid — read at every hand it passes through",
    ["parcel", "scan", "barcode"], [], ["package scan", "scan parcel", "barcode scan", "scan event"],
    "box", [...BOX(), col(9, 12, 18), col(12, 12, 18), col(15, 12, 18)]),
  c("delivered", "Delivered", "The parcel with a check under the lid — it arrived",
    ["delivery", "delivered", "status"], [], ["delivered", "delivery complete", "parcel delivered", "arrived"],
    "box", [...BOX(), ...check(SMALL, 15)]),
  c("delivery-window", "Delivery window", "The parcel with a bracketed span under the lid — the hours it may arrive in",
    ["delivery", "window", "time"], [], ["delivery window", "delivery time slot", "between 9 and 12", "arrival window"],
    "box", [...BOX(), poly([[10.5, 12], [8, 12], [8, 18], [10.5, 18]]), poly([[13.5, 12], [16, 12], [16, 18], [13.5, 18]]), row(15, 10.5, 13.5)]),
  c("signature-required", "Signature required", "The parcel with a pen stroke under the lid — someone has to sign for it",
    ["delivery", "signature", "proof"], [], ["signature required", "sign for delivery", "proof of delivery", "signed for"],
    "box", [...BOX(), poly([[9, 18], [15, 12]])]),
  c("fragile", "Fragile", "The parcel with a glass under the lid — handle with care",
    ["parcel", "fragile", "care"], [], ["fragile", "handle with care", "breakable", "this side up"],
    "box", [...BOX(), poly([[9.5, 12], [12, 14.5], [14.5, 12]]), col(12, 14.5, 18)]),
  c("this-way-up", "This way up", "The parcel with two chevrons rising — keep it the right way round",
    ["parcel", "orientation", "care"], [], ["this way up", "keep upright", "arrows up", "orientation label"],
    "box", [...BOX(), poly([[9.5, 14], [12, 11.5], [14.5, 14]]), poly([[9.5, 18], [12, 15.5], [14.5, 18]])]),
  c("box-sealed", "Box sealed", "The parcel with tape crossed under the lid — shut, and shown to be shut",
    ["parcel", "sealed", "tape"], [], ["box sealed", "sealed package", "tamper evident", "taped shut"],
    "box", [...BOX(), poly([[9, 12], [15, 18]]), poly([[15, 12], [9, 18]])]),
  c("box-open", "Box open", "A box with its flaps folded out — opened, or not yet closed",
    ["parcel", "open", "unbox"], [], ["box open", "open box", "unboxing", "opened package"],
    "box", [rect(3, 9, 18, 13, 2), poly([[4, 9], [4, 5], [8, 5]]), poly([[20, 9], [20, 5], [16, 5]])]),
  c("dispatch", "Dispatch", "The parcel with an arrow leaving under the lid — handed to the carrier",
    ["delivery", "dispatch", "sent"], [], ["dispatch", "dispatched", "shipped", "handed to carrier"],
    "box", [...BOX(), ...ARROW_R(15, 8, 16)]),
  c("return-received", "Return received", "The parcel with an arrow coming back under the lid — the return is in",
    ["return", "received", "status"], [], ["return received", "return accepted", "we got your return", "return processed"],
    "box", [...BOX(), ...ARROW_L(15, 8, 16)]),
  c("import-duty", "Import duty", "The parcel with a coin under the lid — the charge for crossing a border",
    ["customs", "duty", "tax"], [], ["import duty", "customs duty", "import tax", "duties and taxes"],
    "box", [...BOX(), ...coinMark(SMALL, 15)]),
  c("damaged-item", "Damaged item", "The parcel with a crack under the lid — it arrived, but broken",
    ["delivery", "damaged", "claim"], [], ["damaged item", "damaged in transit", "broken on arrival", "damage claim"],
    "box", [...BOX(), poly([[10, 11], [12.5, 13.5], [10.5, 15.5], [13, 18]])]),
  c("lost-parcel", "Lost parcel", "The parcel with a question mark under the lid — nobody knows where it is",
    ["delivery", "lost", "claim"], [], ["lost parcel", "lost in transit", "missing package", "where is it"],
    "box", [...BOX(), arc(12, 13, 2.5, 180, 90), disc(12, 18, 1)]),
  c("reroute-parcel", "Reroute parcel", "The parcel with a path that turns off — sent somewhere else on the way",
    ["delivery", "reroute", "redirect"], [], ["reroute parcel", "redirect delivery", "change delivery address", "divert package"],
    "box", [...BOX(), poly([[8, 17], [11, 17], [14, 14]]), poly([[11.5, 14], [14, 14], [14, 16.5]])]),
  c("parcel-weight", "Parcel weight", "The parcel with a weight under the lid — how heavy it is, for the price",
    ["parcel", "weight", "price"], [], ["parcel weight", "package weight", "weigh parcel", "billable weight"],
    "box", [...BOX(), arc(12, 17, 4, 180, 360), row(17, 8, 16)]),
  c("parcel-size", "Parcel size", "The parcel with two sides measured — how big it is, for the price",
    ["parcel", "size", "dimensions"], [], ["parcel size", "package dimensions", "length width height", "volumetric"],
    "box", [...BOX(), col(9, 12, 18), row(18, 9, 15)]),

  /* ── In the truck ─────────────────────────────────────────────────────────────── */
  c("delivery-van", "Delivery van", "The truck with a parcel in its cargo — the last mile, on four wheels",
    ["delivery", "van", "vehicle"], [], ["delivery van", "courier van", "delivery vehicle", "van"],
    "truck", [...TRUCK(), poly([[6, 9], [6, 13], [10, 13], [10, 9]], true)]),
  c("out-for-delivery", "Out for delivery", "The truck with an arrow in its cargo — on the road to you",
    ["delivery", "status", "transit"], [], ["out for delivery", "on its way", "with the driver", "arriving today"],
    "truck", [...TRUCK(), ...ARROW_R(11, 5, 11)]),
  c("delivery-failed", "Delivery failed", "The truck with a cross in its cargo — it could not be handed over",
    ["delivery", "failed", "status"], [], ["delivery failed", "failed delivery", "could not deliver", "delivery exception"],
    "truck", [...TRUCK(), poly([[6.5, 9], [10.5, 13]]), poly([[10.5, 9], [6.5, 13]])]),
  c("delivery-attempt", "Delivery attempt", "The truck with an exclamation mark in its cargo — the driver came, nobody was in",
    ["delivery", "attempt", "status"], [], ["delivery attempt", "attempted delivery", "we missed you", "redelivery"],
    "truck", [...TRUCK(), col(8.5, 8, 12), disc(8.5, 14.5, 1)]),
  c("same-day-delivery", "Same-day delivery", "The truck with a bolt in its cargo — ordered this morning, here tonight",
    ["delivery", "same-day", "speed"], [], ["same-day delivery", "same day", "today delivery", "rapid delivery"],
    "truck", [...TRUCK(), BOLT(10, 8)]),
  c("next-day-delivery", "Next-day delivery", "The truck with a clock in its cargo — here tomorrow",
    ["delivery", "next-day", "speed"], [], ["next-day delivery", "next day", "overnight delivery", "tomorrow"],
    "truck", [...TRUCK(), disc(8.5, 11, 3), col(8.5, 8.5, 11), row(11, 8.5, 11)]),

  /* ── At the door ──────────────────────────────────────────────────────────────── */
  c("doorstep-delivery", "Doorstep delivery", "A door with a parcel on its step — brought to the home",
    ["delivery", "doorstep", "home"], [], ["doorstep delivery", "home delivery", "delivered to door", "left on the step"],
    "door", [...DOORSTEP()]),
  c("leave-at-door", "Leave at door", "A door with a parcel on its step and a check on the parcel — no need to be in",
    ["delivery", "safe-place", "home"], [], ["leave at door", "safe place", "leave with neighbour", "no signature"],
    "door", [...DOORSTEP(), poly([[13.5, 16], [15.5, 18], [18.5, 15]])]),
  c("delivery-eta", "Delivery ETA", "A door with a clock beside it — when it reaches the step",
    ["delivery", "eta", "time"], [], ["delivery eta", "estimated delivery", "arriving at", "delivery time"],
    "door", [poly([[8, 4], [3, 4], [3, 20], [8, 20]]), disc(16, 12, 4), col(16, 9, 12), row(12, 16, 19)]),

  /* ── At the shop, the depot, the warehouse ────────────────────────────────────── */
  c("click-and-collect", "Click and collect", "The storefront with an arrow dropping in — ordered online, picked up in person",
    ["pickup", "collect", "shop"], [], ["click and collect", "buy online pick up in store", "in-store pickup", "collect in store"],
    "store", [...STORE(), col(12, 11, 17.5), poly([[9.5, 15], [12, 17.5], [14.5, 15]])]),
  c("return-drop-off", "Return drop-off", "The storefront with a parcel in it — the return handed in at a counter",
    ["return", "drop-off", "shop"], [], ["return drop-off", "drop off return", "return in store", "return point"],
    "store", [...STORE(), rect(8.5, 12, 7, 7, 2)]),
  c("pickup-point", "Pickup point", "A map pin with a parcel in it — a place a parcel waits to be collected",
    ["pickup", "point", "location"], [], ["pickup point", "collection point", "parcel shop", "pickup location"],
    "pin", [PIN(), poly([[10, 8], [14, 8], [14, 12], [10, 12]], true)]),
  c("locker-pickup", "Locker pickup", "Two tall doors with a handle each — a parcel waiting behind one of them",
    ["pickup", "locker", "collect"], [], ["locker pickup", "parcel locker", "collection locker", "smart locker"],
    "window", [rect(4, 3, 16, 18, 2), col(12, 5, 19), disc(9, 12, 1), disc(15, 12, 1)]),
  c("warehouse-shelf", "Warehouse shelf", "The warehouse roof over two shelves — where stock waits to be picked",
    ["warehouse", "shelf", "stock"], [], ["warehouse shelf", "racking", "storage rack", "warehouse storage"],
    "figure", [WAREHOUSE(), row(13, 5, 19), row(17, 5, 19)]),
  c("warehouse-pick", "Warehouse pick", "The warehouse roof over a check — the item found and taken off the shelf",
    ["warehouse", "pick", "fulfil"], [], ["warehouse pick", "order picking", "picked", "pick and pack"],
    "figure", [WAREHOUSE(), poly([[9, 14], [11, 16], [15, 12]])]),
  c("hold-at-depot", "Hold at depot", "The warehouse roof over a pause — kept at the depot until someone collects it",
    ["delivery", "hold", "depot"], [], ["hold at depot", "hold for pickup", "held at facility", "collect from depot"],
    "figure", [WAREHOUSE(), col(9.5, 11, 17), col(14.5, 11, 17)]),
  c("pack-station", "Pack station", "A taped parcel set down in a tray — where orders are boxed up",
    ["warehouse", "pack", "station"], [], ["pack station", "packing bench", "packing station", "pack and ship"],
    "tray", [tray(), rect(8.5, 4, 7, 7, 2), col(12, 4, 8)]),
  c("pallet", "Pallet", "A crate on two rails — goods moved by the forklift-load",
    ["freight", "pallet", "bulk"], [], ["pallet", "palletised", "skid", "bulk shipment"],
    "figure", [rect(5, 4, 14, 9, 2), row(16, 3, 21), row(20, 3, 21), col(12, 16, 20)]),

  /* ── Freight ──────────────────────────────────────────────────────────────────── */
  c("freight", "Freight", "A shipping container with its corrugations — cargo by the box-load",
    ["freight", "container", "cargo"], [], ["freight", "shipping container", "cargo", "container freight"],
    "container", [rect(2, 8, 20, 10, 2), col(7, 10, 16), col(12, 10, 16), col(17, 10, 16)]),
  c("container-ship", "Container ship", "A hull with a container on it — cargo by sea",
    ["freight", "ship", "sea"], [], ["container ship", "sea freight", "cargo ship", "ocean shipping"],
    "vehicle", [poly([[2, 14], [6, 18], [18, 18], [22, 14]]), rect(7, 7.5, 10, 6.5, 2)]),
  c("air-freight", "Air freight", "A plane — cargo by air",
    ["freight", "plane", "air"], [], ["air freight", "air cargo", "fly it", "express air"],
    "vehicle", [row(12, 3, 21), poly([[13, 12], [7, 6]]), poly([[13, 12], [7, 18]]), poly([[5, 12], [3, 10]]), poly([[5, 12], [3, 14]])]),
  c("customs", "Customs", "A form with a stamp on it — the border's say on what comes in",
    ["customs", "border", "import"], [], ["customs", "customs declaration", "customs clearance", "border control"],
    "window", [window_(), row(9, 6, 18), disc(12, 14.5, 3)]),
  c("courier", "Courier", "A person with a taped parcel held at the chest — the one who brings it",
    ["delivery", "courier", "person"], [], ["courier", "delivery driver", "delivery person", "carrier"],
    "person", [...PERSON(), poly([[8, 13], [8, 19], [16, 19], [16, 13]], true), col(12, 13, 19)]),
  c("delivery-scooter", "Delivery scooter", "A scooter on two wheels — the last mile on two",
    ["delivery", "scooter", "vehicle"], [], ["delivery scooter", "moped delivery", "food delivery bike", "two-wheel delivery"],
    "vehicle", [disc(6, 16, 2), disc(18, 16, 2), poly([[8, 16], [12, 12], [17, 12], [17, 8]]), row(8, 15, 19)]),

  /* ── Where and when ───────────────────────────────────────────────────────────── */
  c("delivery-slot", "Delivery slot", "A calendar with a clock in it — the day and hour chosen for the drop",
    ["delivery", "slot", "schedule"], [], ["delivery slot", "choose delivery time", "scheduled delivery", "delivery date"],
    "window", [window_(), row(9, 6, 18), ...clockMark(SMALL, 14.5)]),
  c("delivery-map", "Delivery map", "A window with a pin over a road — the drop on the map",
    ["delivery", "map", "route"], [], ["delivery map", "driver map", "delivery route", "live tracking map"],
    "window", [window_(), ...pinMark(SMALL, 11), row(17, 6, 18)]),
  c("return-label", "Return label", "A price tag with an arrow pointing back — the label that sends it home",
    ["return", "label", "print"], [], ["return label", "prepaid return", "print return label", "returns label"],
    "label", [...TAG(), ...ARROW_L(12, 8, 16)]),
  c("shipping-cost", "Shipping cost", "A price tag with a coin on it — what the delivery adds",
    ["shipping", "cost", "price"], [], ["shipping cost", "delivery fee", "postage", "shipping charge"],
    "label", [...TAG(), ...coinMark(SMALL, 12)]),
];
