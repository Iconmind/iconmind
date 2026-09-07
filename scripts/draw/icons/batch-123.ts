/**
 * R36 · Weather: sky — what the sky is doing overhead: sun, cloud, moon, and the light
 * between them.
 *
 * Three bodies. The sun is a disc with rays at the eight points; the cloud is the set's
 * three-lobed cloud, and what the sky adds sits under it or on it; the moon is a crescent
 * cut from one disc by another. The horizon line says where the sky meets the ground.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { cloud } from "../bodies.ts";
import { SMALL, alert, check, clockMark, searchMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "weather", subcategory: "sky", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The sun: a disc with four rays at the corners and four at the points. */
const SUN = () => [
  disc(12, 12, 5.5), poly([[4, 4], [7, 7]]), poly([[20, 4], [17, 7]]), poly([[4, 20], [7, 17]]), poly([[20, 20], [17, 17]]),
];
/** The sun, small and low, for the icons that put something above it. */
const SUN_LOW = () => [disc(12, 15, 4.5), poly([[5, 8], [7.5, 10.5]]), poly([[19, 8], [16.5, 10.5]]), col(12, 5, 8.5)];
/** The cloud the set draws, three lobes over a flat foot. Marks hang under it, at cy 20. */
const CLOUD = () => cloud(2);
/** The moon: a crescent, the long way round one disc and the short way back on a smaller one. */
const MOON = () => raw("M15 3A9 9 0 1 0 15 21A7 7 0 0 1 15 3Z", "a crescent: the long way round one circle and back on a smaller one", true);
/** The horizon: the line the sun rises over. */
const HORIZON = () => row(19, 2, 22);
/** A star: the set's diamond, whose four points read as a star at this size. */
const STAR = (x: number, y: number, r: number) =>
  poly([[x, y - r], [x + r, y], [x, y + r], [x - r, y]], true);
/** A raindrop, the point above one round belly, centred on (x, y). */
const DROP = (x: number, y: number) => raw(`M${x} ${y - 3}L${x + 2.5} ${y - 0.5}A2.5 2.5 0 0 1 ${x - 2.5} ${y - 0.5}Z`, "a drop: a point above one round belly", true);

export const BATCH_123: Icon[] = [
  /* ── the sun ────────────────────────────────────────────────────────────────── */
  c("sunny", "Sunny", "The sun with its rays out — nothing in the way",
    ["sun", "clear", "fine"], [], ["sunny", "sun", "clear sky", "fine weather"],
    "sun", SUN()),
  c("sun-weather", "Sun", "The sun alone",
    ["sun", "daylight", "bright"], [], ["sun", "daylight", "bright", "solar"],
    "sun", [disc(12, 12, 6), poly([[3.5, 3.5], [6, 6]]), poly([[20.5, 3.5], [18, 6]]), poly([[3.5, 20.5], [6, 18]]), poly([[20.5, 20.5], [18, 18]])]),
  c("sun-rise", "Sunrise", "The sun coming up over the horizon, with an arrow rising",
    ["sunrise", "dawn", "morning"], ["sunrise"], ["sunrise", "sun coming up", "morning", "first light"],
    "horizon", [arc(12, 16, 5, 180, 360), HORIZON(), col(12, 5, 9), poly([[9.5, 7.5], [12, 5], [14.5, 7.5]])]),
  c("sun-set", "Sunset", "The sun going down behind the horizon, with an arrow falling",
    ["sunset", "dusk", "evening"], ["sunset"], ["sunset", "sun going down", "evening", "last light"],
    "horizon", [arc(12, 16, 5, 180, 360), HORIZON(), col(12, 5, 9), poly([[9.5, 6.5], [12, 9], [14.5, 6.5]])]),
  c("noon-sun", "Midday sun", "The sun high over a short line — the top of the day",
    ["noon", "midday", "high"], ["midday"], ["midday sun", "noon", "high sun", "middle of the day"],
    "horizon", [disc(12, 8, 5), col(12, 2, 5), poly([[4.5, 4.5], [7, 7]]), poly([[19.5, 4.5], [17, 7]]), HORIZON()]),
  c("golden-hour", "Golden hour", "The low sun with long rays over the horizon",
    ["golden", "warm", "light"], [], ["golden hour", "warm light", "low sun", "magic hour"],
    "horizon", [arc(12, 17, 4.5, 180, 360), HORIZON(), poly([[2, 12], [6, 12]]), poly([[18, 12], [22, 12]]), poly([[5, 6], [8, 9]]), poly([[19, 6], [16, 9]])]),
  c("blue-hour", "Blue hour", "The sun just under the horizon, one star out",
    ["blue", "twilight", "after-sunset"], [], ["blue hour", "just after sunset", "twilight light", "dim light"],
    "horizon", [arc(12, 21, 5, 180, 360), HORIZON(), STAR(7, 8, 3), STAR(17, 12, 2.5)]),
  c("dawn", "Dawn", "The first light coming up, the sky still dark above",
    ["dawn", "daybreak", "early"], ["daybreak"], ["dawn", "daybreak", "first light", "early morning"],
    "horizon", [arc(12, 19, 6, 180, 360), HORIZON(), col(19, 8, 14), poly([[16.5, 10.5], [19, 8], [21.5, 10.5]])]),
  c("dusk", "Dusk", "The last light going down, the sky darkening above",
    ["dusk", "nightfall", "late"], ["nightfall"], ["dusk", "nightfall", "last light", "evening light"],
    "horizon", [arc(12, 19, 6, 180, 360), HORIZON(), col(19, 8, 14), poly([[16.5, 11.5], [19, 14], [21.5, 11.5]])]),
  c("twilight", "Twilight", "The half-lit sky between day and night",
    ["twilight", "between", "half-light"], [], ["twilight", "half light", "between day and night", "gloaming"],
    "horizon", [arc(12, 18, 7, 180, 360), HORIZON(), STAR(6, 7, 2.5), STAR(18, 9, 2.5)]),
  c("daylight-hours", "Daylight hours", "The sun's arc from one horizon to the other",
    ["daylight", "hours", "arc"], ["day-length"], ["daylight hours", "day length", "sun path", "hours of light"],
    "horizon", [arc(12, 19, 9, 180, 360), HORIZON(), disc(12, 10, 3)]),
  c("sun-halo", "Sun halo", "The broken ring of light round the sun",
    ["halo", "ring", "ice"], [], ["sun halo", "ring around the sun", "halo", "ice crystals"],
    "sun", [disc(12, 12, 4.5), arc(12, 12, 9, 200, 340), arc(12, 12, 9, 20, 160)]),
  c("uv-index", "UV index", "The sun with a scale under it",
    ["uv", "index", "scale"], [], ["uv index", "ultraviolet", "sun strength", "uv level"],
    "sun", [disc(12, 8, 4.5), poly([[4.5, 3.5], [7.5, 6.5]]), poly([[19.5, 3.5], [16.5, 6.5]]), row(17, 3, 21), col(9, 17, 21), col(15, 17, 21)]),
  c("uv-high", "UV high", "The sun with the scale full — cover up",
    ["uv", "high", "burn"], [], ["uv high", "high uv", "strong sun", "burn risk"],
    "sun", [disc(12, 8, 4), poly([[4.5, 3.5], [7, 6]]), poly([[19.5, 3.5], [17, 6]]), row(18, 4, 20), col(18, 11, 18), col(14, 14, 18)]),
  c("uv-low", "UV low", "The sun with the scale nearly empty",
    ["uv", "low", "safe"], [], ["uv low", "low uv", "weak sun", "little risk"],
    "sun", [disc(12, 8, 4), poly([[4.5, 3.5], [7, 6]]), poly([[19.5, 3.5], [17, 6]]), row(18, 4, 20), col(6, 11, 18), col(10, 14, 18)]),

  /* ── the cloud ──────────────────────────────────────────────────────────────── */
  c("cloud-weather", "Cloud", "One cloud over the ground",
    ["cloud", "sky", "grey"], [], ["cloud", "cloudy", "one cloud", "overhead"],
    "cloud", [cloud(2), row(21, 4, 20)]),
  c("clouds", "Clouds", "Two clouds, one behind the other",
    ["clouds", "cloudy", "sky"], [], ["clouds", "cloudy", "more cloud", "grey sky"],
    "cloud", [raw("M2 14A3 3 0 0 1 4 8.5A4 4 0 0 1 11.5 7.5A4.5 4.5 0 0 1 15 14Z", "the cloud behind, a size down", true), raw("M9 21A3.5 3.5 0 0 1 11 15A4.5 4.5 0 0 1 19 14A4.5 4.5 0 0 1 22 21Z", "the cloud in front", true)]),
  c("partly-cloudy", "Partly cloudy", "The sun with a cloud across part of it",
    ["partly", "sun", "cloud"], ["sun-cloud"], ["partly cloudy", "sun and cloud", "some cloud", "bright spells"],
    "cloud", [disc(8, 7, 4), poly([[2.5, 2.5], [5, 5]]), poly([[13.5, 2.5], [11, 5]]), raw("M8 21A4 4 0 0 1 10 13.5A5 5 0 0 1 19 12.5A4.5 4.5 0 0 1 22 21Z", "the cloud drawn across the sun", true)]),
  c("mostly-cloudy", "Mostly cloudy", "The cloud with only a corner of sun behind it",
    ["mostly", "cloud", "dull"], [], ["mostly cloudy", "more cloud than sun", "dull", "heavy cloud"],
    "cloud", [arc(16, 6, 4, 180, 360), poly([[10, 3.5], [12, 5.5]]), poly([[22, 3.5], [20, 5.5]]), raw("M4 20A4 4 0 0 1 6 12.5A5 5 0 0 1 15.5 11A5.5 5.5 0 0 1 20 20Z", "the cloud in front of it", true)]),
  c("overcast", "Overcast", "Two clouds filling the sky, no gap between them",
    ["overcast", "grey", "closed"], [], ["overcast", "grey sky", "no sun", "solid cloud"],
    "cloud", [raw("M2 12A3 3 0 0 1 4 6.5A4 4 0 0 1 11.5 5.5A4.5 4.5 0 0 1 15 12Z", "the upper cloud", true), raw("M7 21A3.5 3.5 0 0 1 9 15A4.5 4.5 0 0 1 17 14A4.5 4.5 0 0 1 20 21Z", "the lower cloud", true)]),
  c("sky-cloudy", "Cloudy sky", "The cloud over the horizon",
    ["sky", "cloudy", "horizon"], [], ["cloudy sky", "cloud over the land", "grey day", "sky cover"],
    "cloud", [cloud(3), HORIZON()]),
  c("sky-clear", "Clear sky", "The sun over the horizon, nothing between",
    ["clear", "sky", "fine"], [], ["clear sky", "cloudless", "nothing in the sky", "fine day"],
    "horizon", [disc(12, 9, 4.5), poly([[4.5, 4.5], [7, 7]]), poly([[19.5, 4.5], [17, 7]]), row(9, 2, 5), row(9, 19, 22), HORIZON()]),
  c("cloud-cover", "Cloud cover", "The cloud with the fraction of sky it covers under it",
    ["cover", "fraction", "amount"], [], ["cloud cover", "how much cloud", "octas", "sky cover"],
    "cloud", [cloud(4), row(19, 3, 21), row(22, 3, 11)]),

  /* ── what dims the sky ──────────────────────────────────────────────────────── */
  c("fog", "Fog", "Three level bands with the sky behind them",
    ["fog", "thick", "grey"], [], ["fog", "foggy", "thick fog", "low cloud"],
    "figure", [row(6, 3, 21), row(11, 5, 19), row(16, 3, 21), row(21, 7, 17)]),
  c("mist", "Mist", "Thin bands, broken",
    ["mist", "thin", "damp"], [], ["mist", "misty", "light fog", "damp air"],
    "figure", [row(8, 3, 12), row(8, 15, 21), row(13, 3, 9), row(13, 12, 21), row(18, 5, 14), row(18, 17, 21)]),
  c("haze", "Haze", "The sun dimmed behind flat bands",
    ["haze", "hazy", "dim"], [], ["haze", "hazy", "dimmed sun", "dusty air"],
    "figure", [disc(12, 8, 4.5), row(14, 3, 21), row(18, 5, 19)]),
  c("smog", "Smog", "The sun behind bands, with a chimney under them",
    ["smog", "pollution", "air"], [], ["smog", "air pollution", "bad air", "smoke haze"],
    "figure", [disc(12, 7, 4), row(13, 3, 21), poly([[7, 21], [7, 16], [11, 16], [11, 21]]), poly([[14, 21], [14, 17], [18, 17], [18, 21]])]),
  c("visibility", "Visibility", "The eye with the distance it can see",
    ["visibility", "distance", "see"], [], ["visibility", "how far you can see", "sight distance", "clear view"],
    "figure", [arc(12, 12, 6, 200, 340), disc(12, 12, 2), row(19, 3, 21), col(3, 17, 21), col(21, 17, 21)]),
  c("visibility-low", "Low visibility", "The eye with its view cut short",
    ["visibility", "low", "poor"], [], ["low visibility", "poor visibility", "cannot see far", "reduced sight"],
    "figure", [arc(12, 12, 6, 200, 340), disc(12, 12, 2), row(19, 3, 12), col(3, 17, 21), col(12, 17, 21)]),
  c("horizon", "Horizon", "The line where the sky meets the ground",
    ["horizon", "line", "distance"], [], ["horizon", "skyline", "where sky meets land", "far line"],
    "horizon", [row(13, 2, 22), poly([[5, 13], [9, 9], [13, 13]]), poly([[12, 13], [16, 9], [20, 13]]), row(18, 6, 18)]),

  /* ── the night ──────────────────────────────────────────────────────────────── */
  c("clear-night", "Clear night", "The moon with two stars beside it",
    ["night", "clear", "stars"], [], ["clear night", "starry night", "night sky", "no cloud at night"],
    "moon", [raw("M13 4A8 8 0 1 0 13 20A6.5 6.5 0 0 1 13 4Z", "a crescent: the long way round one circle and back on a smaller one", true), STAR(19, 7, 2.5), STAR(19, 15, 2.5)]),
  c("moon-crescent", "Crescent moon", "The moon as a crescent",
    ["moon", "crescent", "night"], [], ["crescent moon", "moon", "night", "waxing moon"],
    "moon", [MOON()]),
  c("moon-full", "Full moon", "The moon whole, with its two craters",
    ["moon", "full", "round"], [], ["full moon", "whole moon", "round moon", "moonlight"],
    "moon", [disc(12, 12, 9), disc(9, 9, 2), disc(15, 15, 3)]),
  c("moon-phase", "Moon phase", "The full moon and the crescent beside it — where the month has got to",
    ["phase", "half", "waxing"], ["half-moon"], ["moon phase", "half moon", "waxing", "waning"],
    "moon", [disc(7, 12, 5), raw("M18 7A5 5 0 1 0 18 17A4 4 0 0 1 18 7Z", "the crescent beside the full moon", true)]),
  c("night-stars", "Stars", "Three stars in the dark",
    ["stars", "night", "sky"], ["stars"], ["stars", "starry sky", "night stars", "constellation"],
    "figure", [STAR(8, 7, 3.5), STAR(17, 12, 2.5), STAR(11, 17, 3)]),
  c("starry", "Starry sky", "Stars over the horizon",
    ["starry", "night", "clear"], [], ["starry sky", "stars over the land", "clear night sky", "star field"],
    "figure", [STAR(7, 8, 3), STAR(16, 6, 2.5), STAR(12, 13, 2.5), HORIZON()]),
  c("meteor", "Meteor", "A star falling, its trail behind it",
    ["meteor", "shooting-star", "falling"], ["shooting-star"], ["meteor", "shooting star", "falling star", "meteor shower"],
    "figure", [STAR(16, 8, 3.5), poly([[3, 19], [10, 12]]), poly([[7, 21], [12, 16]])]),
  c("aurora", "Aurora", "Curtains of light over the horizon",
    ["aurora", "northern-lights", "curtain"], ["northern-lights"], ["aurora", "northern lights", "aurora borealis", "polar lights"],
    "figure", [poly([[5, 16], [5, 8], [9, 4]]), poly([[10, 16], [10, 8], [14, 4]]), poly([[15, 16], [15, 8], [19, 4]]), HORIZON()]),

  /* ── light bent and broken ──────────────────────────────────────────────────── */
  c("rainbow", "Rainbow", "Three arcs over the ground",
    ["rainbow", "arc", "colour"], [], ["rainbow", "arc of colour", "after the rain", "spectrum"],
    "figure", [arc(12, 17, 9, 180, 360), arc(12, 17, 6.5, 180, 360), arc(12, 17, 4, 180, 360), row(17, 3, 21)]),
  c("double-rainbow", "Double rainbow", "Two rainbows, one over the other",
    ["rainbow", "double", "rare"], [], ["double rainbow", "two rainbows", "secondary bow", "rare rainbow"],
    "figure", [arc(12, 18, 10, 180, 360), arc(12, 18, 8, 180, 360), arc(12, 18, 5, 180, 360), arc(12, 18, 3, 180, 360)]),

  /* ── the forecast ───────────────────────────────────────────────────────────── */
  c("weather-now", "Weather now", "The cloud with a clock under it — what it is doing at this minute",
    ["now", "current", "conditions"], ["current-weather"], ["weather now", "current weather", "right now", "conditions"],
    "cloud", [CLOUD(), disc(12, 18.5, 3), col(12, 15.5, 18.5), row(18.5, 12, 14.5)]),
  c("weather-today", "Today's weather", "The cloud with one bar under it — the day ahead",
    ["today", "day", "forecast"], [], ["today's weather", "weather today", "day forecast", "today"],
    "cloud", [CLOUD(), row(20, 8, 16)]),
  c("weather-tomorrow", "Tomorrow's weather", "The cloud with an arrow under it — the day after this one",
    ["tomorrow", "next", "forecast"], [], ["tomorrow's weather", "weather tomorrow", "next day", "day ahead"],
    "cloud", [CLOUD(), row(19, 7, 15), poly([[14.5, 16.5], [17, 19], [14.5, 21.5]])]),
  c("weather-hourly", "Hourly weather", "The cloud with three ticks under it — hour by hour",
    ["hourly", "hours", "by-hour"], [], ["hourly weather", "hour by hour", "next few hours", "hourly forecast"],
    "cloud", [CLOUD(), col(7, 19, 22), col(12, 19, 22), col(17, 19, 22)]),
  c("weather-week", "Weekly weather", "The cloud with a row of days under it",
    ["week", "days", "outlook"], ["weekly-forecast"], ["weekly weather", "week ahead", "seven day forecast", "outlook"],
    "cloud", [CLOUD(), row(19, 3, 21), col(3, 19, 22), col(9, 19, 22), col(15, 19, 22), col(21, 19, 22)]),
  c("weather-forecast", "Forecast", "The cloud with a trend line under it — what the sky will do",
    ["forecast", "prediction", "ahead"], [], ["forecast", "weather forecast", "what's coming", "prediction"],
    "cloud", [CLOUD(), poly([[5, 21], [9, 17], [13, 21], [19, 15]])]),
  c("weather-alert", "Weather alert", "The cloud with an exclamation under it",
    ["alert", "warning", "notice"], [], ["weather alert", "weather warning", "severe weather notice", "heads up"],
    "cloud", [CLOUD(), col(12, 15.5, 19), disc(12, 21, 1)]),
  c("weather-warning", "Severe weather", "The cloud in a triangle of warning",
    ["severe", "warning", "danger"], [], ["severe weather", "weather warning", "danger", "red warning"],
    "figure", [raw("M12 3.5L21.5 20H2.5Z", "the warning triangle: sides at 60°, the shape a road sign takes", true), poly([[12, 9], [12, 14]]), disc(12, 17.5, 1)]),
  c("weather-radar", "Weather radar", "The sweep of a radar with rain on it",
    ["radar", "sweep", "rain"], [], ["weather radar", "rain radar", "radar sweep", "precipitation map"],
    "orbit", [disc(12, 12, 9), disc(12, 12, 5), poly([[12, 12], [17, 7]]), disc(15, 15, 1)]),
  c("weather-station", "Weather station", "The mast with its cups and a vane",
    ["station", "mast", "measure"], [], ["weather station", "anemometer", "measuring mast", "met station"],
    "figure", [col(12, 6, 21), row(21, 6, 18), row(6, 5, 19), disc(5, 6, 2), disc(19, 6, 2), poly([[12, 12], [18, 12], [18, 16], [12, 16]])]),
];
