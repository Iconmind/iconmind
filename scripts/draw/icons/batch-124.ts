/**
 * R37 · Weather: rain & storm — what falls out of the sky, and what it does when there is
 * too much of it.
 *
 * The cloud carries what falls: drops, flakes, hail, a bolt. Beside it stand the things
 * themselves — the umbrella, the snowflake, the flood line, the funnel of a tornado, the
 * mountain that slides, the wave that comes ashore, the volcano.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { cloud } from "../bodies.ts";
import { SMALL, alert, check } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "weather", subcategory: "storm", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The cloud, lifted so what falls has room under it. */
const CLOUD = () => cloud(4);
/** A drop: a point above one round belly, centred on (x, y). */
const DROP = (x: number, y: number) => raw(`M${x} ${y - 3}L${x + 2.5} ${y - 0.5}A2.5 2.5 0 0 1 ${x - 2.5} ${y - 0.5}Z`, "a drop: a point above one round belly", true);
/** A falling streak, 45° down-left, from (x, y). */
const STREAK = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5]]);
/** A flake: three crossed bars, the six-armed star this grid can draw. */
const FLAKE = (x: number, y: number, r: number) => [raw(
  `M${x} ${y - r}V${y + r}M${x - r} ${y + r}L${x + r} ${y - r}`,
  "a flake: two bars crossing at their middle, which is as many crossings as one drawing may hold")];
/** The bolt the set draws, 5 tall, its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);
/** The warning triangle a road sign takes. */
const TRIANGLE = () => raw("M12 3.5L21.5 20H2.5Z", "the warning triangle: sides at 60°, the shape a road sign takes", true);
/** The water line a flood rises to. */
const WATER = (y: number) => poly([[3, y], [5.5, y - 2.5], [8, y], [10.5, y - 2.5], [13, y], [15.5, y - 2.5], [18, y], [20.5, y - 2.5]]);

export const BATCH_124: Icon[] = [
  /* ── rain ───────────────────────────────────────────────────────────────────── */
  c("rain", "Rain", "The cloud with three drops under it",
    ["rain", "wet", "shower"], ["rainy"], ["rain", "rainy", "wet weather", "raining"],
    "cloud", [CLOUD(), DROP(7, 19.5), DROP(12, 20.5), DROP(17, 19.5)]),
  c("light-rain", "Light rain", "The cloud with two drops under it",
    ["light", "rain", "little"], [], ["light rain", "a little rain", "light shower", "spots of rain"],
    "cloud", [CLOUD(), DROP(9, 20), DROP(15, 20)]),
  c("heavy-rain", "Heavy rain", "The cloud with four drops falling hard",
    ["heavy", "rain", "downpour"], ["downpour"], ["heavy rain", "downpour", "pouring", "torrential rain"],
    "cloud", [CLOUD(), DROP(6, 18.5), DROP(10, 21), DROP(14, 18.5), DROP(18, 21)]),
  c("drizzle", "Drizzle", "The cloud with short streaks under it",
    ["drizzle", "fine", "light"], [], ["drizzle", "fine rain", "spitting", "light drizzle"],
    "cloud", [CLOUD(), STREAK(8, 17), STREAK(13, 17), STREAK(18, 17), STREAK(10.5, 19.5), STREAK(15.5, 19.5)]),
  c("shower", "Shower", "The cloud with the sun behind it and drops below",
    ["shower", "passing", "sun"], [], ["shower", "passing shower", "sunny shower", "brief rain"],
    "cloud", [arc(17, 5, 3.5, 180, 360), raw("M4 17A4 4 0 0 1 6 9.5A5 5 0 0 1 15.5 8A5.5 5.5 0 0 1 20 17Z", "the cloud in front of the sun", true), DROP(9, 20.5), DROP(15, 20.5)]),
  c("rain-chance", "Chance of rain", "The cloud with one drop and a percent under it",
    ["chance", "probability", "percent"], [], ["chance of rain", "probability of rain", "how likely", "rain percent"],
    "cloud", [CLOUD(), disc(8.5, 17.5, 1), poly([[8, 21], [14, 15]]), disc(13.5, 20.5, 1)]),
  c("umbrella", "Umbrella", "The scalloped canopy with its stick under it",
    ["umbrella", "cover", "rain"], [], ["umbrella", "brolly", "rain cover", "keep dry"],
    "canopy", [arc(12, 12, 9, 180, 360), row(12, 3, 21), arc(6, 12, 3, 0, 180), arc(12, 12, 3, 0, 180), arc(18, 12, 3, 0, 180), col(12, 15, 21)]),
  c("umbrella-open", "Umbrella up", "The canopy with drops falling on it",
    ["open", "up", "raining"], [], ["umbrella up", "umbrella open", "putting up the umbrella", "in the rain"],
    "canopy", [arc(12, 14, 9, 180, 360), row(14, 3, 21), col(12, 14, 21), poly([[5, 3], [7, 5]]), col(12, 2, 4.5), poly([[19, 3], [17, 5]])]),
  c("raincoat", "Raincoat", "The hooded coat with its two sides",
    ["raincoat", "coat", "hood"], ["waterproof"], ["raincoat", "waterproof", "rain jacket", "hooded coat"],
    "figure", [arc(12, 7, 3.5, 180, 360), poly([[7, 21], [7, 12], [10, 9], [14, 9], [17, 12], [17, 21]], true), poly([[3, 18], [3, 13], [7, 13]]), poly([[21, 18], [21, 13], [17, 13]])]),
  c("puddle", "Puddle", "The water lying on the ground with a drop over it",
    ["puddle", "water", "ground"], [], ["puddle", "standing water", "wet ground", "water on the road"],
    "figure", [DROP(12, 7), raw("M3 15A9 3.5 0 1 0 21 15A9 3.5 0 1 0 3 15Z", "a puddle: a flat ellipse, the water lying on the ground", true)]),

  /* ── storm ──────────────────────────────────────────────────────────────────── */
  c("thunderstorm", "Thunderstorm", "The cloud with a bolt out of it",
    ["thunder", "storm", "lightning"], ["storm"], ["thunderstorm", "storm", "thunder and lightning", "electrical storm"],
    "cloud", [CLOUD(), BOLT(13.5, 16.5)]),
  c("lightning-bolt", "Lightning", "The bolt with a spark under it",
    ["lightning", "bolt", "strike"], ["lightning"], ["lightning", "bolt", "lightning strike", "flash"],
    "figure", [poly([[16, 2], [8, 10], [13, 10], [5, 18]]), poly([[13, 14], [19, 20]]), poly([[19, 14], [13, 20]])]),
  c("thunder", "Thunder", "The cloud with sound coming out of it",
    ["thunder", "sound", "rumble"], [], ["thunder", "rumble", "thunderclap", "sound of the storm"],
    "cloud", [CLOUD(), arc(12, 19, 3, 200, 340), arc(12, 19, 6, 200, 340)]),
  c("storm-warning", "Storm warning", "The triangle with a bolt in it",
    ["storm", "warning", "danger"], [], ["storm warning", "severe storm", "storm alert", "danger"],
    "figure", [TRIANGLE(), BOLT(13.5, 10)]),
  c("hail", "Hail", "The cloud with stones falling",
    ["hail", "stones", "ice"], ["hailstones"], ["hail", "hailstones", "ice pellets", "hail shower"],
    "cloud", [CLOUD(), disc(8, 18, 2), disc(14, 18, 2), disc(11, 21, 1)]),
  c("sleet", "Sleet", "The cloud with a drop and a flake",
    ["sleet", "mix", "wet-snow"], [], ["sleet", "rain and snow", "wet snow", "mixed precipitation"],
    "cloud", [CLOUD(), DROP(8, 20.5), ...FLAKE(16, 18.5, 3)]),
  c("freezing-rain", "Freezing rain", "The cloud with drops turning to ice on the ground",
    ["freezing", "ice", "rain"], [], ["freezing rain", "ice rain", "glaze", "icy rain"],
    "cloud", [CLOUD(), DROP(8, 19), DROP(14, 19), row(22, 4, 20)]),

  /* ── snow and ice ───────────────────────────────────────────────────────────── */
  c("snow", "Snow", "The cloud with three flakes under it",
    ["snow", "flakes", "cold"], ["snowing"], ["snow", "snowing", "snowfall", "flakes"],
    "cloud", [CLOUD(), ...FLAKE(7, 19, 2.5), ...FLAKE(17, 19, 2.5)]),
  c("snowflake", "Snowflake", "One flake, its six arms out",
    ["snowflake", "flake", "crystal"], ["flake"], ["snowflake", "flake", "ice crystal", "snow"],
    "figure", [raw("M12 2V22M4 16L20 8M9 6L12 9L15 6M9 18L12 15L15 18", "a flake: two bars and the barbs at their ends, one path")]),
  c("snowfall", "Snowfall", "Flakes falling past each other",
    ["snowfall", "falling", "steady"], [], ["snowfall", "falling snow", "steady snow", "snow coming down"],
    "figure", [...FLAKE(8, 7, 3.5), ...FLAKE(16, 14, 3.5), row(21, 4, 20)]),
  c("heavy-snow", "Heavy snow", "The cloud with four flakes and a drift under it",
    ["heavy", "snow", "deep"], [], ["heavy snow", "deep snow", "snow warning", "lots of snow"],
    "cloud", [CLOUD(), ...FLAKE(7, 18, 2.5), ...FLAKE(17, 18, 2.5), row(22, 4, 20)]),
  c("blizzard", "Blizzard", "Flakes driven sideways by the wind",
    ["blizzard", "wind", "whiteout"], [], ["blizzard", "whiteout", "driving snow", "snow storm"],
    "figure", [row(6, 3, 14), row(12, 6, 20), row(18, 3, 14), ...FLAKE(18.5, 6, 3), ...FLAKE(18.5, 18, 3)]),
  c("ice", "Ice", "A block of ice with its facets",
    ["ice", "frozen", "block"], ["frozen"], ["ice", "frozen", "ice block", "icy"],
    "figure", [poly([[6, 4], [18, 4], [18, 15], [12, 21], [6, 15]], true), poly([[6, 9], [9, 12], [15, 12], [18, 9]]), col(12, 12, 21)]),
  c("frost", "Frost", "Crystals along a line — the ground gone white",
    ["frost", "crystals", "cold"], [], ["frost", "frosty", "ground frost", "hoar frost"],
    "figure", [row(18, 2, 22), ...FLAKE(7, 11, 3.5), ...FLAKE(17, 11, 3.5), col(12, 9, 18)]),
  c("black-ice", "Black ice", "The road with the warning triangle over it",
    ["black-ice", "road", "slippery"], [], ["black ice", "icy road", "slippery road", "ice warning"],
    "figure", [TRIANGLE(), ...FLAKE(12, 13, 3)]),

  /* ── water rising ───────────────────────────────────────────────────────────── */
  c("flood", "Flood", "The house with the water over its floor",
    ["flood", "water", "rising"], [], ["flood", "flooding", "water rising", "flooded house"],
    "figure", [poly([[5, 11], [12, 4], [19, 11]]), poly([[7, 11], [7, 16], [17, 16], [17, 11]]), WATER(19)]),
  c("flood-warning", "Flood warning", "The triangle with the water line in it",
    ["flood", "warning", "alert"], [], ["flood warning", "flood alert", "water warning", "flood risk"],
    "figure", [TRIANGLE(), poly([[7, 15.5], [9.5, 13], [12, 15.5], [14.5, 13], [17, 15.5]])]),
  c("flash-flood", "Flash flood", "The water with a bolt over it — it came in minutes",
    ["flash", "sudden", "flood"], [], ["flash flood", "sudden flood", "fast water", "flash flooding"],
    "figure", [BOLT(13.5, 4), WATER(15), WATER(20)]),
  c("river-level", "River level", "The water between the banks, with the level marked",
    ["river", "level", "gauge"], [], ["river level", "water level", "river gauge", "how high the river is"],
    "figure", [col(4, 4, 20), col(20, 4, 20), WATER(14), row(8, 5, 9), row(11, 5, 9)]),
  c("dam-overflow", "Dam overflow", "The wall with the water going over it",
    ["dam", "overflow", "spill"], [], ["dam overflow", "spillway", "water over the dam", "dam full"],
    "figure", [poly([[6, 4], [10, 4], [10, 20], [6, 20]], true), poly([[10, 8], [14, 8], [18, 12], [18, 20]]), row(8, 3, 6), row(12, 3, 6)]),
  c("tsunami", "Tsunami", "The wave curling over the shore",
    ["tsunami", "wave", "sea"], ["tidal-wave"], ["tsunami", "tidal wave", "big wave", "sea surge"],
    "figure", [raw("M2 17A10 10 0 0 1 20 11A5 5 0 0 0 12 11", "a wave: the face rising and the crest curling over", false), row(20, 2, 22)]),

  /* ── wind ───────────────────────────────────────────────────────────────────── */
  c("hurricane", "Hurricane", "The spiral with an eye at its centre",
    ["hurricane", "spiral", "eye"], [], ["hurricane", "tropical storm", "spiral storm", "eye of the storm"],
    "figure", [disc(12, 12, 2), arc(12, 12, 6, 180, 360), arc(12, 12, 6, 0, 180), poly([[18, 12], [18, 4], [11, 4]]), poly([[6, 12], [6, 20], [13, 20]])]),
  c("typhoon", "Typhoon", "The same spiral, with the arms longer",
    ["typhoon", "pacific", "storm"], [], ["typhoon", "pacific hurricane", "great storm", "typhoon warning"],
    "figure", [disc(12, 12, 2), arc(12, 12, 7, 0, 180), arc(12, 12, 7, 180, 360), poly([[19, 12], [19, 5]]), poly([[5, 12], [5, 19]])]),
  c("cyclone", "Cyclone", "The spiral drawn as three curved arms",
    ["cyclone", "spiral", "wind"], [], ["cyclone", "cyclonic storm", "spiral wind", "cyclone warning"],
    "figure", [disc(12, 12, 2), arc(9, 12, 5, 90, 270), arc(15, 12, 5, 270, 90), row(5, 2, 9), row(19, 15, 22)]),
  c("tornado", "Tornado", "The funnel narrowing to the ground",
    ["tornado", "funnel", "twister"], ["twister"], ["tornado", "twister", "funnel cloud", "whirlwind"],
    "figure", [row(4, 3, 21), row(8, 5, 19), row(12, 8, 16), row(16, 10, 14), poly([[11, 18], [13, 20]])]),
  c("tornado-warning", "Tornado warning", "The triangle with the funnel in it",
    ["tornado", "warning", "take-cover"], [], ["tornado warning", "take cover", "twister warning", "tornado alert"],
    "figure", [TRIANGLE(), row(11, 7, 17), row(14, 9.5, 14.5), row(17, 11, 13.5)]),
  c("dust-storm", "Dust storm", "The wind carrying dust across the ground",
    ["dust", "wind", "storm"], [], ["dust storm", "dust cloud", "blowing dust", "haboob"],
    "figure", [row(6, 3, 17), poly([[17, 6], [20, 3]]), row(11, 5, 19), poly([[19, 11], [22, 8]]), row(16, 3, 15), disc(10, 20, 1)]),
  c("sandstorm", "Sandstorm", "The wind over the dunes",
    ["sand", "desert", "storm"], [], ["sandstorm", "desert storm", "blowing sand", "sand in the wind"],
    "figure", [row(6, 3, 18), row(10, 5, 21), arc(8, 20, 5, 180, 360), arc(17, 20, 4, 180, 360), row(20, 2, 22)]),
  c("monsoon", "Monsoon", "The cloud with the rain slanting under it",
    ["monsoon", "season", "rain"], [], ["monsoon", "rainy season", "monsoon rain", "wet monsoon"],
    "cloud", [CLOUD(), poly([[9, 17], [6, 20]]), poly([[14, 17], [11, 20]]), poly([[19, 17], [16, 20]])]),

  /* ── seasons and the dry ────────────────────────────────────────────────────── */
  c("wet-season", "Wet season", "The calendar with a drop on it",
    ["wet", "season", "rain"], [], ["wet season", "rainy season", "the rains", "wet months"],
    "window", [rect(3, 5, 18, 16, 2), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5), DROP(12, 17)]),
  c("dry-season", "Dry season", "The calendar with the sun on it",
    ["dry", "season", "sun"], [], ["dry season", "the dry", "no rain months", "dry months"],
    "window", [rect(3, 5, 18, 16, 2), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5), disc(12, 15.5, 3)]),
  c("drought", "Drought", "The ground cracked under the sun",
    ["drought", "dry", "cracked"], [], ["drought", "dry ground", "no water", "cracked earth"],
    "figure", [disc(12, 6, 4), row(13, 2, 22), poly([[6, 13], [10, 17], [6, 21]]), poly([[16, 13], [12, 17], [16, 21]])]),
  c("wildfire", "Wildfire", "The flame over the ground",
    ["fire", "wildfire", "burn"], ["bushfire"], ["wildfire", "bushfire", "forest fire", "fire warning"],
    "figure", [raw("M12 2C14 6 18 8 18 13A6 6 0 1 1 6 13C6 9 9 8 9 5C10 6 12 6 12 2Z", "a flame: the tongue curling up from a round belly", true), row(21, 3, 21)]),
  c("smoke-alert", "Smoke", "Smoke rising in curls",
    ["smoke", "air", "alert"], [], ["smoke", "smoke alert", "smoke in the air", "air quality"],
    "figure", [arc(9, 6, 3, 90, 270), arc(9, 12, 3, 270, 90), arc(9, 18, 3, 90, 270), poly([[15, 18], [15, 13], [20, 13], [20, 18]], true), row(21, 3, 21)]),
  c("volcano", "Volcano", "The mountain with the plume over it",
    ["volcano", "eruption", "lava"], ["eruption"], ["volcano", "eruption", "volcanic", "lava"],
    "figure", [poly([[3, 20], [10, 13], [14, 13], [21, 20]], true), poly([[10, 13], [10, 9], [14, 9], [14, 13]]), poly([[9, 9], [12, 6], [15, 9]])]),
  c("ash-cloud", "Ash cloud", "The cloud over the mountain",
    ["ash", "cloud", "volcanic"], [], ["ash cloud", "volcanic ash", "ash plume", "flight ash warning"],
    "cloud", [raw("M4 12A3.5 3.5 0 0 1 6 5.5A4.5 4.5 0 0 1 14.5 4.5A5 5 0 0 1 18 12Z", "the ash cloud above", true), poly([[5, 21], [12, 14], [19, 21]], true)]),

  /* ── the ground moving ──────────────────────────────────────────────────────── */
  c("avalanche", "Avalanche", "The snow coming off the mountain",
    ["avalanche", "snow", "slide"], [], ["avalanche", "snow slide", "mountain snow", "avalanche risk"],
    "figure", [poly([[3, 16], [11, 8], [14, 11], [19, 16]]), disc(8, 12, 1), disc(12, 14, 1), disc(16, 12, 1), row(20, 2, 22)]),
  c("landslide", "Landslide", "The hillside slipping away",
    ["landslide", "slip", "ground"], ["mudslide"], ["landslide", "mudslide", "land slip", "slope failure"],
    "figure", [poly([[2, 6], [8, 12], [14, 12], [20, 18]]), row(20, 2, 22), disc(11, 16, 1), disc(16, 15, 1)]),
  c("earthquake", "Earthquake", "The ground split, the line jumping",
    ["earthquake", "quake", "seismic"], ["quake"], ["earthquake", "quake", "seismic", "tremor"],
    "figure", [poly([[2, 10], [6, 10], [9, 7], [12, 10], [15, 7], [18, 10], [22, 10]]), poly([[8, 17], [12, 21], [16, 17]]), row(14, 4, 20)]),
  c("evacuation", "Evacuation", "The door with a person going through it",
    ["evacuate", "exit", "leave"], ["evacuate"], ["evacuation", "evacuate", "leave the area", "emergency exit"],
    "figure", [poly([[13, 3], [21, 3], [21, 21], [13, 21]]), disc(7, 6, 3), poly([[7, 9], [7, 14], [4, 17]]), poly([[7, 14], [10, 17]]), poly([[4, 11], [10, 11]])]),
];
