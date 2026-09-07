/**
 * R34 · Travel: navigation & maps — finding the way, and the paper and screens it is
 * found on.
 *
 * Three bodies here. The map is a sheet folded into three panels, and what is on the map
 * sits in the middle panel. The compass is a ring with a needle. The signpost is a post
 * with a finger board pointing one way. Around them: the pin from the interface set, the
 * road that turns, the mountain, the globe and the flag.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { SMALL, add, alert, check, clockMark, off, searchMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "travel", subcategory: "navigation", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The map: a sheet with two folds down it, three panels wide. Marks sit in the middle panel, at cy 12. */
const MAP = () => [rect(2, 4, 20, 16, 2), col(6, 4, 20), col(18, 4, 20)];
/** The compass: a ring with the needle across it. */
const COMPASS = () => [disc(12, 12, 9), poly([[12, 6], [18, 12], [12, 18], [6, 12]], true)];
/** The signpost: a post with a board pointing right. */
const SIGNPOST = () => [col(6, 3, 21), poly([[6, 5], [16, 5], [19.5, 8.5], [16, 12], [6, 12]])];
/** The pin the interface set drops on a place. Content sits in its head, at cy 10. */
const PIN = () => raw("M4 10A8 8 0 0 1 20 10L12 18Z", "the teardrop `location` is drawn from; the mark sits where its ring sits", true);
/** A mountain with a smaller peak beside it. */
const PEAKS = () => poly([[2, 19], [8, 13], [11, 16], [16, 11], [21, 16]]);
/** The globe: a ring with a meridian and the equator. */
const GLOBE = () => [disc(12, 12, 9), row(12, 3, 21), arc(12, 12, 9, 90, 270)];
/** A set stone, 4 wide, centred on (x, y). */
const STONE = (x: number, y: number) => poly([[x, y - 2], [x + 2, y], [x, y + 2], [x - 2, y]], true);

export const BATCH_121: Icon[] = [
  /* ── the map ────────────────────────────────────────────────────────────────── */
  c("map", "Map", "A sheet folded into three panels — the paper the way is on",
    ["map", "paper", "chart"], [], ["map", "paper map", "road map", "street map"],
    "map", MAP()),
  c("map-fold", "Fold the map", "The map with an arrow closing it — folded away",
    ["fold", "close", "put-away"], [], ["fold the map", "close map", "put the map away", "collapse map"],
    "map", [...MAP(), poly([[9.5, 10], [12, 7.5], [14.5, 10]]), col(12, 7.5, 16.5), poly([[9.5, 14], [12, 16.5], [14.5, 14]])]),
  c("map-layer", "Map layers", "Two sheets over one another — the map, and what is drawn on top of it",
    ["layers", "overlay", "stack"], [], ["map layers", "overlay", "layer control", "map style layers"],
    "map", [poly([[12, 2], [19, 9], [12, 16], [5, 9]], true), poly([[6, 13], [12, 19], [18, 13]]), poly([[8, 17], [12, 21], [16, 17]])]),
  c("map-scale", "Map scale", "The bar that says how far a centimetre is",
    ["scale", "distance", "bar"], [], ["map scale", "scale bar", "distance scale", "how far"],
    "figure", [row(11, 3, 21), col(3, 11, 17), col(9, 11, 15), col(15, 11, 15), col(21, 11, 17)]),
  c("map-fence", "Geofence", "The map with a ring drawn on it — the area that is watched",
    ["geofence", "area", "boundary"], [], ["geofence", "map fence", "watched area", "boundary alert"],
    "map", [...MAP(), disc(12, 12, 4)]),
  c("offline-map", "Offline map", "The map with an arrow into it — kept on the phone for later",
    ["offline", "download", "saved"], [], ["offline map", "download map", "saved map", "map without signal"],
    "map", [...MAP(), col(12, 7, 14), poly([[9.5, 11.5], [12, 14], [14.5, 11.5]]), row(16.5, 9, 15)]),
  c("satellite-view", "Satellite view", "The map with a satellite over it — the picture from above",
    ["satellite", "aerial", "imagery"], ["aerial-view"], ["satellite view", "aerial view", "satellite imagery", "from above"],
    "map", [...MAP(), disc(12, 12, 3), poly([[6, 6], [9, 9]]), poly([[18, 6], [15, 9]])]),
  c("street-view", "Street view", "The map with a person on it — the view from the pavement",
    ["street", "ground", "person"], [], ["street view", "ground view", "look around", "pavement view"],
    "map", [...MAP(), disc(12, 9.5, 2), arc(12, 18, 4.5, 180, 360)]),
  c("world-map", "World map", "The globe with the meridians on it",
    ["world", "globe", "international"], [], ["world map", "globe", "world view", "international map"],
    "orbit", [disc(12, 12, 9), row(12, 3, 21), poly([[6, 5], [10, 5], [10, 9], [6, 9]], true), poly([[14, 15], [18, 15], [18, 19], [14, 19]], true)]),
  c("globe-spin", "Spin the globe", "The globe with an arrow round it — turned to the other side",
    ["spin", "rotate", "world"], [], ["spin the globe", "rotate world", "turn the globe", "other side"],
    "orbit", [disc(12, 12, 8), arc(12, 12, 8, 90, 270), poly([[12, 2], [14.5, 4.5], [12, 7]])]),
  c("time-zone-map", "Time zones", "The globe with a clock on it — what the hour is over there",
    ["timezone", "hours", "world"], [], ["time zones", "world clock", "local time there", "utc offset"],
    "orbit", [disc(12, 12, 9), col(12, 3, 21), disc(16, 15, 4), col(16, 12, 15), row(15, 16, 18.5)]),

  /* ── the compass and the north ──────────────────────────────────────────────── */
  c("compass", "Compass", "A ring with the needle across it",
    ["compass", "bearing", "direction"], [], ["compass", "bearing", "which way is north", "direction"],
    "orbit", COMPASS()),
  c("compass-rose", "Compass rose", "The four points drawn on the map",
    ["rose", "points", "cardinal"], [], ["compass rose", "cardinal points", "north south east west", "map rose"],
    "figure", [poly([[12, 3], [21, 12], [12, 21], [3, 12]], true), col(12, 3, 21), row(12, 3, 21)]),
  c("north-arrow", "North", "The arrow that always points the same way, with its N",
    ["north", "arrow", "orientation"], [], ["north arrow", "north", "map orientation", "which way up"],
    "figure", [poly([[12, 2], [22, 12], [12, 22], [2, 12]], true), row(12, 2, 22)]),
  c("coordinates", "Coordinates", "The crosshair on the grid — the exact pair of numbers",
    ["coordinates", "grid", "exact"], ["lat-long"], ["coordinates", "lat long", "grid reference", "exact position"],
    "figure", [disc(12, 12, 5), col(12, 2, 22), row(12, 2, 22)]),
  c("latitude", "Latitude", "The globe with a line round its middle",
    ["latitude", "parallel", "north-south"], [], ["latitude", "parallel", "how far north", "lat"],
    "orbit", [disc(12, 12, 9), row(12, 3, 21), row(7, 6, 18), row(17, 6, 18)]),
  c("longitude", "Longitude", "The globe with a line from pole to pole",
    ["longitude", "meridian", "east-west"], [], ["longitude", "meridian", "how far east", "lon"],
    "orbit", [disc(12, 12, 9), col(12, 3, 21), col(7.5, 5.5, 18.5), col(16.5, 5.5, 18.5)]),

  /* ── the route ──────────────────────────────────────────────────────────────── */
  c("travel-route", "Route", "A line from one pin to another, bending on the way",
    ["route", "path", "journey"], [], ["route", "journey", "the way there", "planned route"],
    "figure", [disc(5, 5, 3), disc(19, 19, 3), poly([[5, 9], [5, 13], [12, 13], [12, 19], [15, 19]])]),
  c("route-alt", "Alternative route", "Two ways to the same place, one dashed",
    ["alternative", "other", "compare"], [], ["alternative route", "other way", "second route", "avoid traffic"],
    "figure", [disc(5, 5, 3), disc(19, 19, 3), poly([[5, 9], [5, 16], [16, 16], [16, 19]]), poly([[9, 5], [12.5, 5]]), poly([[15.5, 5], [19, 5], [19, 8]]), poly([[19, 11], [19, 15]])]),
  c("route-planner", "Plan a route", "The map with a route drawn across it",
    ["planner", "plan", "draw"], [], ["route planner", "plan a route", "draw a route", "trip planner"],
    "map", [...MAP(), poly([[6, 16], [10, 16], [10, 9], [17, 9]])]),
  c("waypoint", "Waypoint", "A point on the line, with the line going on past it",
    ["waypoint", "stop", "via"], ["via-point"], ["waypoint", "via point", "stop on the way", "intermediate point"],
    "figure", [col(12, 2, 5), col(12, 7.5, 10), disc(12, 14, 4), disc(12, 14, 1), col(12, 18, 22)]),
  c("route-marker", "Route marker", "The marker that says which way the path goes",
    ["marker", "blaze", "sign"], [], ["route marker", "trail blaze", "way marker", "path sign"],
    "figure", [poly([[6, 3], [18, 3], [18, 12], [12, 18], [6, 12]], true), poly([[9.5, 8], [12, 10.5], [14.5, 8]])]),
  c("distance-to", "Distance", "Two pins with the measure between them",
    ["distance", "how-far", "measure"], [], ["distance", "how far", "distance to", "kilometres away"],
    "figure", [disc(5, 6, 3), disc(19, 6, 3), row(16, 2, 22), col(3, 13.5, 18.5), col(21, 13.5, 18.5)]),
  c("eta-arrival", "Arrival time", "The pin with a clock in it — when you will be there",
    ["eta", "arrival", "time"], ["eta"], ["arrival time", "eta", "when will i arrive", "time to destination"],
    "pin", [PIN(), ...clockMark(SMALL, 10)]),
  c("elevation", "Elevation", "The climb drawn as a line over the ground",
    ["elevation", "climb", "profile"], ["elevation-profile"], ["elevation", "climb profile", "how steep", "height gain"],
    "axes", [col(4, 3, 19), row(19, 4, 21), poly([[6, 16], [10, 12], [13, 15], [18, 10]])]),
  c("altitude", "Altitude", "The peak with the height marked beside it",
    ["altitude", "height", "metres"], ["height"], ["altitude", "height above sea", "metres up", "how high"],
    "figure", [poly([[3, 18], [10, 11], [17, 18]]), col(19, 3, 18), poly([[16.5, 5.5], [19, 3], [21.5, 5.5]]), row(18, 2, 22)]),
  c("terrain", "Terrain", "Hills and a valley — the shape of the ground",
    ["terrain", "relief", "ground"], ["relief"], ["terrain", "relief", "ground shape", "topography"],
    "figure", [poly([[2, 12], [8, 6], [11, 9], [16, 4], [21, 9]]), poly([[2, 19], [8, 13], [11, 16], [16, 11], [21, 16]])]),

  /* ── the turns ──────────────────────────────────────────────────────────────── */
  c("turn-left", "Turn left", "The road that goes up and turns left",
    ["left", "turn", "direction"], [], ["turn left", "left turn", "go left", "next left"],
    "arrow", [poly([[16, 21], [16, 9], [7, 9]]), poly([[10, 6], [7, 9], [10, 12]])]),
  c("turn-right", "Turn right", "The road that goes up and turns right",
    ["right", "turn", "direction"], [], ["turn right", "right turn", "go right", "next right"],
    "arrow", [poly([[8, 21], [8, 9], [17, 9]]), poly([[14, 6], [17, 9], [14, 12]])]),
  c("straight-ahead", "Straight on", "The road that carries straight on",
    ["straight", "ahead", "continue"], [], ["straight ahead", "carry on", "continue", "go straight"],
    "arrow", [col(12, 4, 21), poly([[8, 8], [12, 4], [16, 8]])]),
  c("keep-left", "Keep left", "The road that forks, the left one taken",
    ["fork", "left", "bear"], [], ["keep left", "bear left", "fork left", "take the left"],
    "arrow", [poly([[12, 22], [12, 13], [5, 6]]), poly([[5, 10.5], [5, 6], [9.5, 6]]), poly([[14, 11], [19, 6]])]),
  c("keep-right", "Keep right", "The road that forks, the right one taken",
    ["fork", "right", "bear"], [], ["keep right", "bear right", "fork right", "take the right"],
    "arrow", [poly([[12, 22], [12, 13], [19, 6]]), poly([[19, 10.5], [19, 6], [14.5, 6]]), poly([[10, 11], [5, 6]])]),
  c("exit-ramp", "Exit", "The road that leaves the main one at a slip",
    ["exit", "slip", "off-ramp"], ["off-ramp"], ["exit ramp", "slip road", "take the exit", "off ramp"],
    "arrow", [col(6, 2, 21), poly([[6, 10], [13, 10], [19, 16]]), poly([[15.5, 16], [19, 16], [19, 12.5]])]),

  /* ── the fix ────────────────────────────────────────────────────────────────── */
  c("gps-fix", "GPS fix", "The crosshair closed on a point — the position is known",
    ["gps", "fix", "locked"], [], ["gps fix", "position locked", "signal acquired", "gps lock"],
    "figure", [disc(12, 12, 5), disc(12, 12, 2), col(12, 2, 7), col(12, 17, 22), row(12, 2, 7), row(12, 17, 22)]),
  c("gps-lost", "GPS lost", "The crosshair broken — the position is not known",
    ["gps", "lost", "no-signal"], [], ["gps lost", "no signal", "position unknown", "gps error"],
    "figure", [disc(12, 12, 5), col(12, 2, 7), col(12, 17, 22), row(12, 2, 7), row(12, 17, 22), poly([[5, 19], [19, 5]])]),
  c("current-location", "Where I am", "The dot with the ring pulsing round it",
    ["location", "here", "me"], ["my-location"], ["current location", "where i am", "my position", "locate me"],
    "figure", [disc(12, 14, 3), arc(12, 14, 7, 200, 340), arc(12, 14, 10, 200, 340)]),
  c("drop-pin", "Drop a pin", "The pin standing over its shadow — dropped on the place",
    ["pin", "drop", "mark"], [], ["drop a pin", "mark this place", "add pin", "pin here"],
    "pin", [PIN(), row(21, 8, 16)]),
  c("pin-start", "Start point", "The pin with a play in it — the journey begins here",
    ["start", "from", "origin"], ["origin"], ["start point", "from here", "origin", "journey starts"],
    "pin", [PIN(), poly([[10, 7], [13, 10], [10, 13]], true)]),
  c("pin-end", "End point", "The pin with a square in it — the journey ends here",
    ["end", "to", "destination"], [], ["end point", "destination", "journey ends", "arrive here"],
    "pin", [PIN(), poly([[9.5, 7.5], [14.5, 7.5], [14.5, 12.5], [9.5, 12.5]], true)]),

  /* ── what is out there ──────────────────────────────────────────────────────── */
  c("landmark", "Landmark", "A monument on its plinth — the thing you navigate by",
    ["landmark", "monument", "sight"], ["monument"], ["landmark", "monument", "famous sight", "navigate by"],
    "figure", [poly([[8, 17], [8, 7], [12, 3], [16, 7], [16, 17]]), row(17, 4, 20), row(20, 2, 22)]),
  c("point-of-interest", "Point of interest", "The pin with a stone in it — worth stopping for",
    ["poi", "interest", "sight"], ["poi"], ["point of interest", "poi", "worth seeing", "attraction"],
    "pin", [PIN(), STONE(12, 10)]),
  c("viewpoint", "Viewpoint", "The eye over the peaks — the place you stop to look",
    ["view", "vista", "lookout"], ["lookout"], ["viewpoint", "vista", "lookout", "scenic point"],
    "figure", [arc(12, 8, 6, 200, 340), disc(12, 8, 2), poly([[2, 20], [8, 14], [11, 17], [16, 12], [21, 17]])]),
  c("trailhead", "Trailhead", "The post where the path leaves the road",
    ["trailhead", "start", "path"], [], ["trailhead", "path starts here", "trail start", "walk from here"],
    "figure", [...SIGNPOST(), row(21, 2, 22)]),
  c("hiking-trail", "Hiking trail", "A boot print on the path",
    ["hiking", "walk", "trail"], ["hiking"], ["hiking trail", "walking trail", "hike", "footpath"],
    "figure", [raw("M8 4A4 4 0 0 1 16 4V13A4 4 0 0 1 8 13Z", "the sole: straight sides into rounded ends", true), disc(9, 18, 2), disc(14, 19, 2)]),
  c("footpath", "Footpath", "Two footprints, one ahead of the other — the way on foot",
    ["path", "walk", "pedestrian"], ["walkway"], ["footpath", "walkway", "pedestrian path", "on foot"],
    "figure", [raw("M6.5 7A2.5 2.5 0 0 1 11.5 7V11A2.5 2.5 0 0 1 6.5 11Z", "a sole: straight sides into rounded ends", true), disc(9, 4, 2), raw("M12.5 14A2.5 2.5 0 0 1 17.5 14V18A2.5 2.5 0 0 1 12.5 18Z", "the next sole, a step along", true), disc(15, 11, 2)]),
  c("cycle-path", "Cycle path", "A wheel over the path — the way kept for bicycles",
    ["cycle", "bike", "path"], ["bike-path"], ["cycle path", "bike path", "cycle route", "bike lane"],
    "figure", [disc(6, 12, 3.5), disc(18, 12, 3.5), poly([[6, 12], [9, 9], [15, 9], [18, 12]]), col(9, 5, 9), row(19, 2, 22)]),
  c("border-crossing", "Border crossing", "An arrow crossing the dashed line between two countries",
    ["border", "frontier", "crossing"], ["frontier"], ["border crossing", "frontier", "cross the border", "customs post"],
    "figure", [col(12, 2, 7), col(12, 10, 14), col(12, 17, 22), row(12, 4, 19), poly([[16, 9], [19, 12], [16, 15]])]),
  c("country-flag", "Country", "A flag on its pole — which country you are in",
    ["flag", "country", "nation"], [], ["country flag", "flag", "nation", "which country"],
    "figure", [col(5, 2, 22), poly([[5, 4], [19, 4], [19, 13], [5, 13]]), row(8.5, 5, 19)]),
  c("travel-guide", "Travel guide", "The book with a pin on its cover",
    ["guide", "book", "advice"], ["guidebook"], ["travel guide", "guidebook", "where to go", "travel book"],
    "book", [rect(4, 2, 16, 20, 2), col(8, 2, 22), raw("M11 11A3 3 0 0 1 17 11L14 14Z", "a small pin: the teardrop the set draws", true)]),
  c("phrasebook", "Phrasebook", "The book with two speech marks on its cover",
    ["phrases", "language", "translate"], ["language-guide"], ["phrasebook", "language guide", "useful phrases", "translation book"],
    "book", [rect(4, 2, 16, 20, 2), col(8, 2, 22), poly([[11, 7], [11, 11], [14.5, 11], [14.5, 7]], true), poly([[11, 14], [11, 18], [14.5, 18], [14.5, 14]], true)]),
];
