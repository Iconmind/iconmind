/**
 * R42 · Health: fitness — the moving body, the kit it moves with, and what it tracks.
 *
 * The people are drawn limb by limb so a runner leans and a walker stands upright. The kit
 * has its own silhouettes: a dumbbell, a barbell, a kettlebell, a treadmill, a rower, a
 * rope, a shoe, a bottle, a glass, a trophy, a balance board. What a workout leaves behind
 * is a watch face, a pair of rings and a gauge.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "health", subcategory: "fitness", name, description,
  tags, aliases, keywords, family, shapes,
});

/** A small dumbbell that still reads at 16px: two round weights on a short bar. */
const MINI = (cx: number, cy: number) => [disc(cx - 4, cy, 2), disc(cx + 4, cy, 2), row(cy, cx - 2, cx + 2)];
/** The bar with a weight at each end. */
const DUMBBELL = () => [row(12, 6, 18), col(6, 7, 17), col(18, 7, 17), col(3, 9, 15), col(21, 9, 15)];
/** The long bar with two plates a side. */
const BARBELL = () => [row(12, 6, 18), col(6, 4, 20), col(18, 4, 20), col(9, 7, 17), col(15, 7, 17)];
/** The bell with its handle over the top. */
const KETTLEBELL = () => [raw("M7 7A8 8 0 1 0 17 7Z", "the bell hanging under its handle", true), arc(12, 6.5, 4.5, 180, 360)];
/** The watch face and the strap above and below it. */
const WATCH = (x: number, y: number, w: number, h: number) => [
  rect(x, y, w, h, 2), poly([[x + 3, y], [x + 3, 3], [x + w - 3, 3], [x + w - 3, y]]),
  poly([[x + 3, y + h], [x + 3, 21], [x + w - 3, 21], [x + w - 3, y + h]]),
];
/** The bottle: shoulders, a short neck and a cap. */
const BOTTLE = () => [poly([[7, 21], [7, 8], [9.5, 5.5], [9.5, 3], [14.5, 3], [14.5, 5.5], [17, 8], [17, 21]], true)];
/** A trainer seen from the side. */
const SHOE = () => [poly([[3, 19], [3, 15], [8, 15], [12, 11], [16, 11], [20, 15], [20, 19]], true)];
/** The flame, as the weather rounds draw it. */
const FLAME = () => raw("M12 2C14 6 18 8 18 13A6 6 0 1 1 6 13C6 9 9 8 9 5C10 6 12 6 12 2Z", "a flame: the tongue curling up from a round belly", true);
/** The half-dial with its needle. */
const GAUGE = (dx: number, dy: number) => [arc(12, 16, 9, 180, 360), row(16, 3, 21), poly([[12, 16], [12 + dx, 16 + dy]])];
/** The crescent, as the sky round draws it. */
const MOON = () => raw("M15 3A9 9 0 1 0 15 21A7 7 0 0 1 15 3Z", "a crescent: the long way round one circle and back on a smaller one", true);
/** The bed, as the ward rounds draw it. */
const BED = () => [poly([[2, 20], [2, 13], [22, 13], [22, 20]]), row(16.5, 2, 22)];
/** The heart, small enough to sit beside something else. */
const HEART = (x: number, y: number, r: number) => raw(
  `M${x - r} ${y}A${r / 2} ${r / 2} 0 0 1 ${x} ${y}A${r / 2} ${r / 2} 0 0 1 ${x + r} ${y}L${x} ${y + r}Z`,
  "a heart: two lobes over a point", true,
);

export const BATCH_129: Icon[] = [
  /* ── the body moving ────────────────────────────────────────────────────────── */
  c("running", "Running", "The figure mid-stride",
    ["run", "jog", "sprint"], [], ["running", "run", "jog", "go for a run"],
    "runner", [disc(16, 5, 3), poly([[17, 9], [12, 14]]), poly([[17, 9], [21, 13]]), poly([[14.5, 11.5], [10, 11.5]]), poly([[12, 14], [16, 18], [16, 21]]), poly([[12, 14], [8, 18], [4, 18]])]),
  c("walking", "Walking", "The figure upright, one step at a time",
    ["walk", "step", "stroll"], ["walk"], ["walking", "walk", "on foot", "go for a walk"],
    "walker", [disc(12, 5, 3), poly([[12, 8], [12, 14]]), poly([[9, 13], [12, 10], [15, 13]]), poly([[8, 18], [12, 14], [16, 18]]), poly([[8, 18], [5, 18]]), poly([[16, 18], [19, 18]])]),
  c("cycling", "Cycling", "The studio bike with its flywheel",
    ["bike", "cycle", "pedal"], [], ["cycling", "ride a bike", "cycle", "bike ride"],
    "spin-bike", [row(17, 3, 21), disc(18, 12, 4), poly([[9, 17], [9, 5]]), row(5, 5, 12), poly([[9, 9], [15, 9]])]),
  c("swimming", "Swimming", "The swimmer with an arm over the water",
    ["swim", "pool", "stroke"], ["swim"], ["swimming", "swim", "front crawl", "pool"],
    "swimmer", [disc(6, 8, 3), poly([[9, 10], [13, 6]]), poly([[9, 11], [17, 11]]), poly([[2, 18], [5, 18], [8, 15], [11, 18], [14, 15], [17, 18], [22, 18]])]),
  c("yoga", "Yoga", "The figure sitting cross-legged",
    ["yoga", "pose", "sit"], [], ["yoga", "yoga pose", "cross-legged", "practice"],
    "lotus", [disc(12, 5, 3), poly([[4, 19], [12, 11], [20, 19]], true)]),
  c("stretch", "Stretch", "The figure reaching wide",
    ["stretch", "reach", "limber"], [], ["stretch", "stretching", "reach up", "limber up"],
    "star-figure", [disc(12, 5, 3), poly([[12, 8], [12, 15]]), poly([[7, 5], [12, 10], [17, 5]]), poly([[8, 19], [12, 15], [16, 19]])]),
  c("push-up", "Press-up", "The body held over the floor on straight arms",
    ["press-up", "arms", "floor"], ["press-up"], ["press up", "push up", "press-ups", "arm exercise"],
    "figure", [disc(4, 8, 2), poly([[6, 9], [18, 9]]), col(8, 9, 16), col(18, 9, 16), row(18, 2, 22)]),
  c("sit-up", "Sit-up", "The body folding up from the floor",
    ["sit-up", "core", "crunch"], ["crunch"], ["sit up", "sit-ups", "crunch", "core exercise"],
    "figure", [disc(5, 7, 3), poly([[8, 10], [13, 15]]), poly([[13, 15], [17, 11], [21, 15]]), row(18, 2, 22)]),
  c("squat", "Squat", "The knees bent under the weight",
    ["squat", "legs", "bend"], [], ["squat", "squats", "leg exercise", "bend the knees"],
    "figure", [disc(8, 5, 3), poly([[8, 8], [8, 13], [14, 13], [14, 21]]), row(21, 3, 21)]),
  c("plank", "Plank", "The body straight on its forearms",
    ["plank", "core", "hold"], [], ["plank", "hold a plank", "core hold", "forearms"],
    "figure", [disc(4, 7, 2), poly([[6, 8], [10, 12], [20, 12]]), col(10, 12, 15), row(15, 6, 12), row(18, 2, 22)]),

  /* ── the kit ────────────────────────────────────────────────────────────────── */
  c("dumbbell", "Dumbbell", "One bar with a weight at each end",
    ["dumbbell", "weight", "lift"], [], ["dumbbell", "hand weight", "lift", "free weight"],
    "dumbbell", DUMBBELL()),
  c("weights", "Weights", "A plate standing on the floor",
    ["plate", "iron", "load"], [], ["weights", "weight plate", "free weights", "iron"],
    "plate", [disc(12, 11, 8), disc(12, 11, 3), row(21, 5, 19)]),
  c("barbell", "Barbell", "The long bar loaded either side",
    ["barbell", "bar", "load"], [], ["barbell", "loaded bar", "bench press", "olympic bar"],
    "barbell", BARBELL()),
  c("kettlebell", "Kettlebell", "The bell hanging from its handle",
    ["kettlebell", "bell", "swing"], [], ["kettlebell", "kettlebell swing", "bell weight", "swing"],
    "kettlebell", KETTLEBELL()),
  c("treadmill", "Treadmill", "The belt with the console over it",
    ["treadmill", "belt", "machine"], [], ["treadmill", "running machine", "belt", "indoor run"],
    "treadmill", [poly([[2, 19], [15, 19], [15, 15], [2, 15]], true), poly([[15, 17], [19, 17], [19, 8]]), poly([[16, 8], [22, 8], [22, 4], [16, 4]], true)]),
  c("rowing-machine", "Rowing machine", "The rail, the seat and the handle",
    ["rower", "rail", "machine"], ["rower"], ["rowing machine", "rower", "erg", "indoor rowing"],
    "rower", [row(15, 3, 21), row(12, 9, 15), poly([[12, 12], [12, 15]]), col(5, 7, 11), poly([[5, 9], [9, 9]])]),
  c("jump-rope", "Skipping rope", "The rope swung under the feet",
    ["rope", "skip", "jump"], ["skipping-rope"], ["skipping rope", "jump rope", "skip", "rope work"],
    "rope", [arc(12, 10, 9, 0, 180), poly([[21, 10], [18, 7]]), poly([[3, 10], [6, 7]])]),
  c("gym", "Gym", "The building with the weights in it",
    ["gym", "room", "club"], [], ["gym", "leisure centre", "weights room", "health club"],
    "figure", [poly([[3, 20], [3, 12], [12, 3], [21, 12], [21, 20]], true), ...MINI(12, 15)]),
  c("personal-trainer", "Personal trainer", "A person beside the weight",
    ["trainer", "coach", "session"], [], ["personal trainer", "coach", "PT session", "trainer"],
    "person", [disc(6, 7, 3), arc(6.5, 15, 4.5, 180, 360), disc(12, 18, 2), disc(20, 18, 2), row(18, 14, 18)]),
  c("balance-training", "Balance training", "The figure holding still on the board",
    ["balance", "board", "wobble"], [], ["balance training", "wobble board", "balance board", "stability"],
    "board", [disc(12, 5, 3), poly([[12, 8], [12, 13]]), row(13, 3, 21), disc(12, 17, 4)]),
  c("muscle", "Muscle", "The arm flexed",
    ["muscle", "arm", "flex"], ["biceps"], ["muscle", "biceps", "flex", "arm muscle"],
    "muscle", [raw("M4 21V16C4 12 8 9 12 11C13 11.5 14 12.5 14 14V9C14 6 17 4 19 6C21 8 21 12 20 15C19 18 17 21 13 21Z", "the arm flexed: the bicep bunched under a raised fist", true)]),
  c("strength", "Strength", "The weight going up",
    ["strong", "lift", "power"], [], ["strength", "get stronger", "lifting", "power"],
    "dumbbell", [...MINI(12, 17), poly([[12, 12], [12, 4]]), poly([[9, 7], [12, 4], [15, 7]])]),
  c("personal-best", "Personal best", "The cup you take home",
    ["best", "record", "cup"], ["pb"], ["personal best", "PB", "record", "best time"],
    "trophy", [poly([[8, 3], [16, 3], [16, 9], [12, 13], [8, 9]], true), poly([[12, 13], [12, 20]]), row(20, 7, 17), arc(8, 6, 2.5, 90, 270), arc(16, 6, 2.5, 270, 90)]),

  /* ── the plan ───────────────────────────────────────────────────────────────── */
  c("workout-plan", "Workout plan", "The sheet with the session on it",
    ["plan", "session", "sheet"], [], ["workout plan", "training plan", "session plan", "programme"],
    "page", [rect(4, 3, 16, 18, 2), ...MINI(12, 9), row(15, 8, 16), row(18, 8, 13)]),
  c("workout-log", "Workout log", "The sheet with the session ticked off",
    ["log", "record", "done"], ["training-log"], ["workout log", "training log", "session log", "logged"],
    "page", [rect(4, 3, 16, 18, 2), row(8, 8, 16), row(11, 8, 16), poly([[8, 16], [10, 18], [16, 12]])]),
  c("rest-day", "Rest day", "The day left blank on purpose",
    ["rest", "day", "off"], ["day-off"], ["rest day", "day off", "recovery day", "no training"],
    "window", [rect(3, 5, 18, 16, 2), row(9, 3, 21), col(8, 2, 5), col(16, 2, 5), col(10, 13, 17), col(14, 13, 17)]),
  c("warm-up", "Warm-up", "The heat going up before the work",
    ["warm", "prepare", "before"], [], ["warm up", "warm-up", "before training", "get warm"],
    "figure", [raw("M9 3C10.5 6 13.5 7.5 13.5 11A4.5 4.5 0 1 1 4.5 11C4.5 8 7 7.5 7 5.5C7.5 6 9 6 9 3Z", "a flame: the tongue curling up from a round belly", true), poly([[19, 20], [19, 8]]), poly([[16, 11], [19, 8], [22, 11]])]),
  c("cool-down", "Cool-down", "The heat coming off after the work",
    ["cool", "settle", "after"], [], ["cool down", "cool-down", "after training", "settle"],
    "drop", [raw("M8 4L12 8A5.5 5.5 0 1 1 4 8Z", "a drop: a point over a round belly", true), poly([[19, 6], [19, 18]]), poly([[16, 15], [19, 18], [22, 15]])]),
  c("stand-reminder", "Stand reminder", "The nudge to get up",
    ["stand", "up", "nudge"], [], ["stand reminder", "time to stand", "get up", "stand up"],
    "figure", [disc(8, 5, 3), poly([[8, 8], [8, 14]]), poly([[4, 18], [8, 14], [12, 18]]), poly([[17, 19], [17, 9]]), poly([[14, 12], [17, 9], [20, 12]])]),
  c("stretch-reminder", "Stretch reminder", "The nudge to loosen up",
    ["stretch", "loosen", "nudge"], [], ["stretch reminder", "time to stretch", "loosen up", "move"],
    "figure", [disc(7, 5, 3), poly([[7, 8], [7, 13], [11, 17], [11, 21]]), poly([[7, 13], [13, 13]]), arc(16, 12, 3, 270, 90), arc(16, 12, 6, 270, 90)]),
  c("flexibility", "Flexibility", "The figure open in a wide stretch",
    ["bend", "fold", "supple"], [], ["flexibility", "supple", "bend forward", "range of motion"],
    "star-figure", [disc(12, 5, 3), poly([[12, 8], [12, 13]]), poly([[6, 10], [18, 10]]), poly([[6, 19], [12, 13], [18, 19]])]),
  c("endurance", "Endurance", "The long climb with the flag at the top",
    ["stamina", "distance", "climb"], ["stamina"], ["endurance", "stamina", "long effort", "go the distance"],
    "ridge", [poly([[2, 20], [8, 14], [11, 17], [15, 13], [22, 20]]), poly([[15, 13], [15, 5]]), poly([[15, 5], [19, 5], [19, 9], [15, 9]])]),

  /* ── what it counts ─────────────────────────────────────────────────────────── */
  c("step-count", "Step count", "The shoe with the road behind it",
    ["step", "shoe", "count"], ["steps"], ["step count", "steps", "step tracker", "steps today"],
    "shoe", [...SHOE(), poly([[3, 6], [8, 6]]), poly([[3, 9], [6, 9]])]),
  c("step-goal", "Step goal", "The shoe with the flag it is heading for",
    ["step", "goal", "target"], [], ["step goal", "step target", "daily steps", "goal"],
    "shoe", [...SHOE(), poly([[6, 8], [6, 2]]), poly([[6, 2], [11, 2], [11, 6], [6, 6]])]),
  c("run-distance", "Distance run", "The path climbing to the marker",
    ["distance", "road", "marker"], ["mileage"], ["distance run", "mileage", "how far", "kilometres"],
    "road", [poly([[2, 21], [7, 16], [7, 12], [12, 7], [16, 7]]), poly([[16, 3], [20, 3], [20, 7], [16, 7]])]),
  c("pace", "Pace", "The shoe with the speed on it",
    ["pace", "speed", "dial"], ["speed"], ["pace", "speed", "minutes per kilometre", "how fast"],
    "shoe", [...SHOE(), poly([[13, 2], [9, 6], [12, 6], [8, 10]])]),
  c("cadence", "Cadence", "The crank going round with its pedal",
    ["cadence", "rhythm", "tempo"], ["tempo"], ["cadence", "steps per minute", "rhythm", "tempo"],
    "crank", [disc(12, 13, 7), poly([[12, 13], [17, 8]]), poly([[15, 4], [20, 9]])]),
  c("calories-burned", "Calories burned", "The flame the work leaves",
    ["calories", "burn", "energy"], ["kcal"], ["calories burned", "kcal", "energy burned", "burn"],
    "figure", [FLAME()]),
  c("heart-zone", "Heart zone", "The heart against the zones above it",
    ["heart", "zone", "effort"], ["hr-zone"], ["heart zone", "heart rate zone", "training zone", "effort"],
    "figure", [HEART(8, 9, 6), col(17, 14, 20), col(20, 10, 20)]),
  c("vo2-max", "VO2 max", "The lungs at full stretch",
    ["oxygen", "lungs", "capacity"], ["aerobic-capacity"], ["vo2 max", "aerobic capacity", "oxygen uptake", "lung capacity"],
    "lungs", [raw("M12 3V8M12 8C8 8 5 11 5 15C5 18 6 20 9 20C11 20 12 19 12 16C12 19 13 20 15 20C18 20 19 18 19 15C19 11 16 8 12 8Z", "the windpipe over both lungs, notched between them", false)]),
  c("sports-watch", "Sports watch", "The watch with its face lit",
    ["watch", "wrist", "face"], [], ["sports watch", "running watch", "gps watch", "wrist"],
    "watch", [...WATCH(6, 7, 12, 10), row(12, 9, 15)]),
  c("fitness-tracker", "Tracker band", "The band with its small screen",
    ["tracker", "band", "wear"], ["activity-band"], ["fitness tracker", "activity band", "wearable", "tracker"],
    "watch", [...WATCH(7, 8, 10, 8), col(12, 10, 14)]),
  c("activity-ring", "Activity ring", "One ring closing round another",
    ["ring", "close", "day"], [], ["activity ring", "close the rings", "daily rings", "move ring"],
    "ring", [arc(12, 12, 9, 90, 360), arc(12, 12, 5.5, 90, 360)]),
  c("active-minutes", "Active minutes", "The ring with the work inside it",
    ["active", "minutes", "move"], [], ["active minutes", "move minutes", "minutes moved", "activity"],
    "ring", [arc(12, 12, 9, 90, 360), ...MINI(12, 12)]),
  c("sleep-track", "Sleep tracking", "The bed with the night over it",
    ["sleep", "night", "bed"], [], ["sleep tracking", "track sleep", "sleep log", "night"],
    "bed", [...BED(), raw("M13 4A4 4 0 1 0 13 12A3 3 0 0 1 13 4Z", "a crescent over the bed", true)]),
  c("sleep-score", "Sleep score", "The night graded",
    ["sleep", "score", "grade"], [], ["sleep score", "sleep quality", "how you slept", "grade"],
    "moon", [MOON(), col(19, 14, 20), col(22, 10, 20)]),
  c("recovery-score", "Recovery score", "The dial reading back up",
    ["recovery", "ready", "dial"], [], ["recovery score", "readiness", "recovered", "ready to train"],
    "gauge", [arc(12, 16, 9, 180, 360), row(16, 3, 21), poly([[12, 16], [12, 8]]), poly([[9, 11], [12, 8], [15, 11]])]),
  c("hydration-track", "Hydration", "The bottle with the level in it",
    ["water", "drink", "level"], [], ["hydration", "drink water", "water intake", "stay hydrated"],
    "bottle", [...BOTTLE(), row(14, 7, 17)]),
  c("water-glass", "Glass of water", "One glass, filled part way",
    ["glass", "water", "drink"], [], ["glass of water", "water glass", "a drink", "sip"],
    "glass", [poly([[7, 4], [17, 4], [17, 17], [14, 20], [10, 20], [7, 17]], true), row(11, 7, 17)]),
  c("protein", "Protein", "The shaker with its measure",
    ["protein", "shaker", "measure"], ["shake"], ["protein", "protein shake", "shaker", "measure"],
    "bottle", [poly([[7, 21], [7, 8], [9, 6], [15, 6], [17, 8], [17, 21]], true), row(10, 7, 17), row(15, 7, 17)]),
];
