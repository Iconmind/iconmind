/**
 * R38 · Weather: temperature & wind — how warm it is, how hard it blows, and what the air
 * carries.
 *
 * Two bodies. The thermometer is a tube with a bulb at its foot, and how hot it is shows
 * in the column. The wind is a set of level lines with a curl at one end. Beside them: the
 * gauge for pressure and quality, the fan, the heater, the hat, the scarf and the gloves.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { SMALL, alert, check } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "weather", subcategory: "temperature", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The thermometer: a tube with the bulb at its foot. The column runs from y 19 up. */
const THERM = () => [raw("M9.5 15V6A2.5 2.5 0 0 1 14.5 6V15A4.5 4.5 0 1 1 9.5 15Z", "a thermometer: a tube rounded at the top over one round bulb", true), disc(12, 17.5, 2)];
/** The wind: three level lines, the top one curling back. */
const WIND = () => [raw("M3 7H15A3 3 0 1 0 12 4", "a wind line that curls back on itself"), row(12, 3, 18), raw("M3 17H14A3 3 0 1 1 11 20", "the lower line, curling the other way")];
/** The gauge: a half dial with a needle. */
const GAUGE = (dx: number, dy: number) => [arc(12, 16, 9, 180, 360), row(16, 3, 21), poly([[12, 16], [12 + dx, 16 + dy]])];
/** The sun, small, for the icons that pair heat with light. */
const SUN = (cx: number, cy: number, r: number) => [disc(cx, cy, r), row(cy, cx - r - 3, cx - r - 0.5), row(cy, cx + r + 0.5, cx + r + 3)];
/** A drop, the point above one round belly. */
const DROP = (x: number, y: number) => raw(`M${x} ${y - 3}L${x + 2.5} ${y - 0.5}A2.5 2.5 0 0 1 ${x - 2.5} ${y - 0.5}Z`, "a drop: a point above one round belly", true);
/** A flake: two bars crossing at their middle. */
const FLAKE = (x: number, y: number, r: number) => [raw(`M${x} ${y - r}V${y + r}M${x - r} ${y + r}L${x + r} ${y - r}`, "a flake: two bars crossing at their middle")];

export const BATCH_125: Icon[] = [
  /* ── the thermometer ────────────────────────────────────────────────────────── */
  c("thermometer", "Thermometer", "The tube with its bulb, the column halfway up",
    ["thermometer", "temperature", "degrees"], [], ["thermometer", "temperature", "degrees", "how warm"],
    "thermometer", [...THERM(), col(12, 11, 15)]),
  c("temperature-hot", "Hot", "The thermometer with the column near the top",
    ["hot", "warm", "high"], [], ["hot", "high temperature", "warm", "heat"],
    "thermometer", [...THERM(), col(12, 7, 15)]),
  c("temperature-cold", "Cold", "The thermometer with the column low",
    ["cold", "chilly", "low"], [], ["cold", "low temperature", "chilly", "freezing"],
    "thermometer", [...THERM(), col(12, 12.5, 15)]),
  c("temperature-mild", "Mild", "The thermometer with the column at the middle",
    ["mild", "moderate", "middle"], [], ["mild", "moderate temperature", "pleasant", "average"],
    "thermometer", [...THERM(), col(12, 10, 15), row(10, 15, 18)]),
  c("temperature-range", "Temperature range", "The thermometer with a mark at the top and the bottom of the day",
    ["range", "high-low", "spread"], [], ["temperature range", "high and low", "spread", "min max"],
    "thermometer", [...THERM(), col(12, 8, 15), row(8, 15, 19), row(13, 15, 19)]),
  c("day-high", "Day's high", "The thermometer with an arrow rising beside it",
    ["high", "maximum", "day"], ["max-temp"], ["day's high", "maximum temperature", "high for the day", "hottest"],
    "thermometer", [...THERM(), col(12, 8, 15), col(19, 7, 13), poly([[16.5, 9.5], [19, 7], [21.5, 9.5]]), row(20, 3, 6)]),
  c("day-low", "Day's low", "The thermometer with an arrow falling beside it",
    ["low", "minimum", "day"], ["min-temp"], ["day's low", "minimum temperature", "low for the day", "coldest"],
    "thermometer", [...THERM(), col(12, 12, 15), col(19, 7, 13), poly([[16.5, 10.5], [19, 13], [21.5, 10.5]]), row(6, 3, 6)]),
  c("feels-like", "Feels like", "The thermometer with a person beside it — what the air feels like on the skin",
    ["feels", "apparent", "skin"], ["apparent-temperature"], ["feels like", "apparent temperature", "real feel", "how it feels"],
    "thermometer", [...THERM(), col(12, 9, 15), disc(19, 6, 2), arc(19, 14, 3, 180, 360), row(20, 3, 7)]),
  c("degree-celsius", "Celsius", "The degree ring with the C beside it",
    ["celsius", "degrees", "metric"], ["celsius"], ["celsius", "degrees c", "centigrade", "metric temperature"],
    "figure", [disc(7, 7, 3), arc(16, 14, 6, 40, 320)]),
  c("degree-fahrenheit", "Fahrenheit", "The degree ring with the F beside it",
    ["fahrenheit", "degrees", "imperial"], ["fahrenheit"], ["fahrenheit", "degrees f", "imperial temperature", "us degrees"],
    "figure", [disc(7, 7, 3), col(13, 8, 20), row(8, 13, 20), row(14, 13, 18)]),
  c("heatwave", "Heatwave", "The sun over lines that shimmer",
    ["heatwave", "hot", "spell"], [], ["heatwave", "hot spell", "extreme heat", "heat"],
    "figure", [...SUN(12, 8, 4), raw("M4 16H12A3 3 0 1 1 9 19", "a shimmer line curling back"), row(21, 4, 20)]),
  c("cold-snap", "Cold snap", "The flake over lines that still",
    ["cold", "snap", "spell"], [], ["cold snap", "cold spell", "sudden cold", "freeze"],
    "figure", [...FLAKE(12, 8, 4), row(16, 4, 20), row(21, 6, 18)]),
  c("wind-chill", "Wind chill", "The flake with wind lines through it",
    ["chill", "wind", "colder"], [], ["wind chill", "feels colder", "chill factor", "wind cold"],
    "figure", [...FLAKE(8, 8, 4), raw("M4 16H15A3 3 0 1 1 12 19", "a wind line curling back"), row(20, 4, 18)]),
  c("frost-warning", "Frost warning", "The triangle with a flake in it",
    ["frost", "warning", "cold"], [], ["frost warning", "frost alert", "ground frost tonight", "cold warning"],
    "figure", [raw("M12 3.5L21.5 20H2.5Z", "the warning triangle: sides at 60°, the shape a road sign takes", true), ...FLAKE(12, 14, 3.5)]),
  c("heat-warning", "Heat warning", "The triangle with the sun in it",
    ["heat", "warning", "hot"], [], ["heat warning", "heat alert", "extreme heat warning", "hot weather warning"],
    "figure", [raw("M12 3.5L21.5 20H2.5Z", "the warning triangle: sides at 60°, the shape a road sign takes", true), disc(12, 14, 3.5)]),
  c("ice-warning", "Ice warning", "The triangle with ice crystals in it",
    ["ice", "warning", "slippery"], [], ["ice warning", "icy conditions", "slippery warning", "freeze warning"],
    "figure", [raw("M12 3.5L21.5 20H2.5Z", "the warning triangle: sides at 60°, the shape a road sign takes", true), ...FLAKE(9, 14, 2.5), ...FLAKE(15, 16, 2.5)]),

  /* ── the air ────────────────────────────────────────────────────────────────── */
  c("humidity", "Humidity", "A drop with a percent beside it",
    ["humidity", "damp", "percent"], ["moisture"], ["humidity", "moisture", "damp air", "relative humidity"],
    "figure", [DROP(8, 10), disc(15.5, 14.5, 1), poly([[15, 19], [21, 13]]), disc(20.5, 18.5, 1)]),
  c("humidity-high", "High humidity", "Two drops together",
    ["humidity", "high", "muggy"], [], ["high humidity", "muggy", "close air", "sticky"],
    "figure", [DROP(8, 10), DROP(15, 14), DROP(11, 19)]),
  c("humidity-low", "Low humidity", "One small drop with a line under it",
    ["humidity", "low", "dry"], [], ["low humidity", "dry air", "arid", "little moisture"],
    "figure", [DROP(12, 9), row(14, 5, 19), row(19, 8, 16)]),
  c("dew-point", "Dew point", "A drop on a leaf line — where the air gives up its water",
    ["dew", "point", "condense"], [], ["dew point", "dew", "condensation point", "when dew forms"],
    "figure", [DROP(12, 9), arc(12, 14, 8, 0, 180), row(19, 3, 21)]),
  c("air-pressure", "Air pressure", "The dial with its needle straight up",
    ["pressure", "barometer", "millibars"], ["barometer"], ["air pressure", "barometer", "millibars", "atmospheric pressure"],
    "gauge", GAUGE(0, -6)),
  c("pressure-rising", "Pressure rising", "The dial with its needle swinging to the right",
    ["pressure", "rising", "fine"], [], ["pressure rising", "barometer up", "settled weather coming", "high pressure"],
    "gauge", [arc(12, 16, 9, 180, 360), row(16, 3, 21), poly([[12, 16], [17, 11]]), poly([[13.5, 11], [17, 11], [17, 14.5]])]),
  c("pressure-falling", "Pressure falling", "The dial with its needle swinging to the left",
    ["pressure", "falling", "unsettled"], [], ["pressure falling", "barometer down", "storm coming", "low pressure"],
    "gauge", [arc(12, 16, 9, 180, 360), row(16, 3, 21), poly([[12, 16], [7, 11]]), poly([[10.5, 11], [7, 11], [7, 14.5]])]),
  c("air-quality", "Air quality", "The dial with a leaf on it",
    ["air", "quality", "index"], ["aqi"], ["air quality", "aqi", "how clean the air is", "air index"],
    "gauge", [arc(12, 16, 9, 180, 360), row(16, 3, 21), raw("M9 13A5 5 0 0 1 16 8A5 5 0 0 1 9 13Z", "a leaf: two arcs sharing a chord", true)]),
  c("air-quality-good", "Air quality good", "The dial with a check on it",
    ["air", "good", "clean"], [], ["air quality good", "clean air", "safe to breathe", "good aqi"],
    "gauge", [arc(12, 16, 9, 180, 360), row(16, 3, 21), poly([[8, 11], [11, 14], [16, 9]])]),
  c("air-quality-poor", "Air quality poor", "The dial with an exclamation on it",
    ["air", "poor", "unhealthy"], [], ["air quality poor", "unhealthy air", "bad aqi", "stay inside"],
    "gauge", [arc(12, 16, 9, 180, 360), row(16, 3, 21), col(12, 8, 12), disc(12, 14, 1)]),
  c("pollen", "Pollen", "The flower head with grains around it",
    ["pollen", "allergy", "hay-fever"], ["hay-fever"], ["pollen", "hay fever", "allergy count", "pollen count"],
    "figure", [disc(12, 12, 4), disc(5, 7, 1), disc(19, 7, 1), disc(5, 17, 1), disc(19, 17, 1), disc(12, 4, 1)]),
  c("pollen-high", "Pollen high", "The flower head with many grains",
    ["pollen", "high", "allergy"], [], ["pollen high", "high pollen count", "bad for hay fever", "allergy alert"],
    "figure", [disc(12, 13, 4.5), disc(5, 8, 1), disc(12, 4, 1), disc(19, 8, 1), disc(6, 19, 1), disc(18, 19, 1)]),
  c("pollution", "Pollution", "The chimney with what it puts in the air",
    ["pollution", "smog", "emissions"], [], ["pollution", "emissions", "dirty air", "smog"],
    "figure", [poly([[5, 21], [5, 12], [10, 12], [10, 21]], true), poly([[14, 21], [14, 15], [19, 15], [19, 21]], true), arc(7.5, 9, 3, 90, 270), arc(7.5, 5, 3, 270, 90)]),
  c("ozone", "Ozone", "Three rings joined — the layer that shields",
    ["ozone", "layer", "uv"], [], ["ozone", "ozone layer", "o3", "uv shield"],
    "figure", [disc(7, 12, 4), disc(17, 12, 4), row(12, 10, 14)]),

  /* ── the wind ───────────────────────────────────────────────────────────────── */
  c("wind", "Wind", "Three lines, one curling back",
    ["wind", "breeze", "air"], [], ["wind", "windy", "breeze", "moving air"],
    "wind", WIND()),
  c("wind-light", "Light wind", "Two short lines",
    ["light", "wind", "calm"], [], ["light wind", "gentle breeze", "calm", "little wind"],
    "wind", [row(8, 3, 19), row(15, 5, 21)]),
  c("wind-strong", "Strong wind", "Four lines, two curling",
    ["strong", "wind", "hard"], [], ["strong wind", "high wind", "blowing hard", "gusty"],
    "wind", [raw("M3 6H15A3 3 0 1 0 12 3", "the top line curling back"), row(11, 3, 20), row(15, 3, 17), raw("M3 20H15A3 3 0 1 1 12 17", "the lower line curling the other way")]),
  c("wind-gust", "Gust", "Short lines with a longer one through them",
    ["gust", "sudden", "blow"], [], ["gust", "wind gust", "sudden wind", "squall"],
    "wind", [row(7, 6, 16), row(12, 3, 21), row(17, 8, 18)]),
  c("breeze", "Breeze", "Two lines curling gently",
    ["breeze", "gentle", "light"], [], ["breeze", "gentle wind", "light air", "soft wind"],
    "wind", [raw("M2 8H15A3.5 3.5 0 1 0 11.5 4.5", "a line curling back"), raw("M2 17H14A3.5 3.5 0 1 0 10.5 20.5", "a second line curling the other way")]),
  c("gale", "Gale", "Lines driven hard, with a bolt of spray",
    ["gale", "storm", "force"], [], ["gale", "gale force", "severe wind", "storm force"],
    "wind", [row(6, 3, 19), row(11, 3, 21), row(16, 3, 19), poly([[16, 19], [13, 22]]), poly([[21, 19], [18, 22]])]),
  c("wind-direction", "Wind direction", "The arrow the wind comes from, on its ring",
    ["direction", "bearing", "from"], [], ["wind direction", "which way the wind blows", "bearing", "wind from"],
    "figure", [disc(12, 12, 9), poly([[12, 5], [19, 12], [12, 19], [5, 12]], true)]),
  c("wind-vane", "Weather vane", "The vane on its post with the cross of the points",
    ["vane", "weathercock", "points"], ["weathervane"], ["weather vane", "weathercock", "wind vane", "cardinal points"],
    "figure", [col(12, 9, 21), row(21, 6, 18), poly([[6, 6], [9, 3], [12, 3], [12, 9], [9, 9]], true), row(12, 8, 16)]),
  c("windsock", "Windsock", "The sock filled and flying from its pole",
    ["windsock", "airfield", "cone"], [], ["windsock", "wind sock", "airfield wind", "wind cone"],
    "figure", [col(3, 3, 21), poly([[6, 6], [12, 6], [18, 12], [12, 18], [6, 18]], true), col(12, 6, 18)]),
  c("beaufort", "Beaufort scale", "The steps of the wind scale",
    ["beaufort", "scale", "force"], ["wind-scale"], ["beaufort scale", "wind force", "wind scale", "force number"],
    "chart", [row(20, 2, 22), poly([[3, 20], [3, 15], [8, 15], [8, 20]]), poly([[10.5, 20], [10.5, 11], [15.5, 11], [15.5, 20]]), poly([[18, 20], [18, 6], [21, 6], [21, 20]])]),
  c("wind-warning", "Wind warning", "The triangle with wind lines in it",
    ["wind", "warning", "danger"], [], ["wind warning", "high wind warning", "gale warning", "wind alert"],
    "figure", [raw("M12 3.5L21.5 20H2.5Z", "the warning triangle: sides at 60°, the shape a road sign takes", true), row(13, 7, 17), row(17, 5, 19)]),
  c("wind-umbrella", "Umbrella blown out", "The canopy turned inside out by the wind",
    ["umbrella", "blown", "inside-out"], [], ["umbrella blown out", "inside out umbrella", "windy", "broken umbrella"],
    "canopy", [arc(12, 8, 9, 0, 180), row(8, 3, 21), col(12, 8, 18), arc(10, 18, 2, 0, 180)]),

  /* ── living with it ────────────────────────────────────────────────────────── */
  c("sunburn-risk", "Sunburn risk", "The sun over an arm — cover up",
    ["sunburn", "burn", "skin"], [], ["sunburn risk", "burn time", "cover up", "skin warning"],
    "figure", [...SUN(12, 7, 3.5), arc(12, 20, 7, 180, 360), row(20, 5, 19)]),
  c("hydration-alert", "Drink water", "The glass with the water line in it",
    ["hydration", "water", "drink"], ["drink-water"], ["drink water", "hydration", "stay hydrated", "water reminder"],
    "figure", [poly([[8, 8], [8, 20], [16, 20], [16, 8]], true), poly([[10, 8], [10, 4], [14, 4], [14, 8]]), row(12, 8, 16)]),
  c("cooling-fan", "Fan", "The blades turning on their hub",
    ["fan", "cool", "blades"], [], ["fan", "cooling fan", "electric fan", "keep cool"],
    "machine", [disc(12, 12, 9), disc(12, 12, 2), poly([[12, 5], [15, 8], [12, 11]], true), poly([[19, 12], [16, 15], [13, 12]], true), poly([[12, 19], [9, 16], [12, 13]], true), poly([[5, 12], [8, 9], [11, 12]], true)]),
  c("heater", "Heater", "The radiator with its bars and the heat rising",
    ["heater", "radiator", "warm"], ["radiator"], ["heater", "radiator", "heating", "keep warm"],
    "machine", [rect(4, 10, 16, 11, 2), col(9, 10, 21), col(15, 10, 21), arc(8, 5, 2.5, 90, 270), arc(16, 5, 2.5, 270, 90)]),
  c("shade", "Shade", "The sun with a parasol between it and the ground",
    ["shade", "shadow", "cover"], [], ["shade", "in the shade", "shadow", "out of the sun"],
    "figure", [poly([[4, 11], [12, 3], [20, 11]]), row(11, 3, 21), col(12, 11, 20), row(20, 6, 18)]),
  c("sunhat", "Sun hat", "The brim with the crown over it",
    ["hat", "sun", "brim"], [], ["sun hat", "hat", "wide brim", "cover your head"],
    "figure", [row(15, 2, 22), arc(12, 15, 6, 180, 360), row(19, 6, 18)]),
  c("scarf", "Scarf", "The scarf knotted, its ends hanging",
    ["scarf", "warm", "neck"], [], ["scarf", "neck warmer", "wrap up", "winter scarf"],
    "figure", [arc(12, 8, 5, 180, 360), poly([[7, 8], [7, 18], [11, 18], [11, 8]]), poly([[14, 11], [14, 21], [18, 21], [18, 11]])]),
  c("gloves", "Gloves", "The mitten with its thumb",
    ["gloves", "mittens", "hands"], ["mittens"], ["gloves", "mittens", "warm hands", "winter gloves"],
    "figure", [raw("M6 21V10A3 3 0 0 1 12 10V21Z", "a mitten: straight sides into one rounded top", true), raw("M15 21V13A2.5 2.5 0 0 1 20 13V21Z", "the second mitten", true), row(17, 6, 12), row(18, 15, 20)]),
];
