/**
 * R45 · Health: care & family — the very young, the very old, and everyone looking after
 * someone.
 *
 * The baby has its own head with a curl; the pram, the crib, the bottle and the nappy are
 * drawn as themselves. The care end of the round is hands, a house, a first-aid case, a
 * defibrillator, a braille cell, a guide dog, a ramp and a wristband.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "health", subcategory: "care", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The medical cross, centred on (x, y), arms 2r long. */
const CROSS = (x: number, y: number, r: number) => [col(x, y - r, y + r), row(y, x - r, x + r)];
/** A heart, small enough to sit inside something else. */
const HEART = (x: number, y: number, r: number) => raw(
  `M${x - r} ${y}A${r / 2} ${r / 2} 0 0 1 ${x} ${y}A${r / 2} ${r / 2} 0 0 1 ${x + r} ${y}L${x} ${y + r}Z`,
  "a heart: two lobes over a point", true,
);
/** The house, as the other rounds draw it. */
const HOUSE = () => poly([[3, 20], [3, 12], [12, 3], [21, 12], [21, 20]], true);
/** The calendar page: a rail, two pegs and the sheet under them. */
const CAL = () => [rect(3, 5, 18, 16, 2), row(9, 3, 21), col(8, 2, 5), col(16, 2, 5)];
/** A person: the head and the shoulders under it. */
const PERSON = (x: number, y: number, r: number) => [disc(x, y, r), arc(x, y + r * 3, r * 2.2, 180, 360)];
/** A capsule lying on the diagonal, for the doses. */
const PILL = (x: number, y: number) => raw(
  `M${x - 5} ${y}L${x} ${y - 5}A3.5 3.5 0 0 1 ${x + 5} ${y}L${x} ${y + 5}A3.5 3.5 0 0 1 ${x - 5} ${y}Z`,
  "a capsule: two rounded ends on the diagonal", true,
);
/** A drop of blood. */
const DROP = (x: number, y: number, r: number) => raw(
  `M${x} ${y - r}L${x + r} ${y}A${r} ${r} 0 1 1 ${x - r} ${y}Z`,
  "a drop: a point over a round belly", true,
);

export const BATCH_132: Icon[] = [
  /* ── the very young ─────────────────────────────────────────────────────────── */
  c("baby", "Baby", "The round face with its curl",
    ["baby", "infant", "little"], ["infant"], ["baby", "infant", "a baby", "little one"],
    "baby", [disc(12, 12, 8), raw("M12 4C15 4 15 7 12 7", "a curl of hair on top", false), disc(9, 11, 1), disc(15, 11, 1)]),
  c("newborn", "Newborn", "The baby swaddled",
    ["newborn", "swaddle", "days-old"], [], ["newborn", "just born", "swaddled", "days old"],
    "baby", [disc(12, 6, 4), raw("M5 21A7 7 0 0 1 19 21Z", "the wrap around the body", true), row(16, 6, 18)]),
  c("toddler", "Toddler", "The small one on its own two feet",
    ["toddler", "child", "small"], [], ["toddler", "little child", "toddling", "small child"],
    "figure", [disc(12, 6, 4), poly([[12, 10], [12, 15]]), poly([[7, 12], [17, 12]]), poly([[7, 20], [12, 15], [17, 20]])]),
  c("baby-bottle", "Baby bottle", "The bottle with its teat",
    ["bottle", "feed", "milk"], [], ["baby bottle", "feeding bottle", "milk", "feed"],
    "bottle", [poly([[7, 21], [7, 9], [17, 9], [17, 21]], true), row(13, 7, 17), raw("M10 9V6.5A2 2 0 0 1 14 6.5V9", "the teat on top", false)]),
  c("pram", "Pram", "The hood, the body and the wheels",
    ["pram", "buggy", "wheels"], ["buggy"], ["pram", "buggy", "pushchair", "stroller"],
    "pram", [raw("M4 13A8 8 0 0 1 20 13Z", "the hood over the body", true), poly([[4, 13], [8, 17], [20, 17], [20, 13]]), disc(9, 19, 2), disc(18, 19, 2)]),
  c("crib", "Crib", "The cot with its bars",
    ["crib", "cot", "bars"], ["cot"], ["crib", "cot", "bed for a baby", "bars"],
    "crib", [row(8, 3, 21), row(20, 3, 21), col(3, 6, 20), col(9, 8, 20), col(15, 8, 20), col(21, 6, 20)]),
  c("nappy", "Nappy", "The nappy with its tabs",
    ["nappy", "diaper", "change"], ["diaper"], ["nappy", "diaper", "change a nappy", "tabs"],
    "nappy", [poly([[4, 7], [20, 7], [20, 11], [12, 19], [4, 11]], true), row(11, 4, 20)]),
  c("pregnancy", "Pregnancy", "The figure carrying",
    ["pregnancy", "expecting", "bump"], ["expecting"], ["pregnancy", "pregnant", "expecting", "bump"],
    "figure", [disc(9, 5, 3), col(9, 8, 18), raw("M9 10C15 10 17 12 17 15C17 17 14 18 9 18", "the bump the body carries", false), poly([[9, 18], [6, 21]]), poly([[9, 18], [12, 21]])]),
  c("pregnancy-scan", "Scan", "The screen with the scan on it",
    ["scan", "screen", "ultrasound"], [], ["pregnancy scan", "ultrasound scan", "sonogram", "screen"],
    "screen", [rect(3, 4, 18, 14, 2), poly([[12, 18], [12, 21]]), row(21, 8, 16), raw("M9 13A4 4 0 0 1 15 8C15 12 13 14 9 13Z", "the shape curled on the screen", true)]),
  c("birth", "Birth", "The new life held in two hands",
    ["birth", "born", "hands"], ["born"], ["birth", "born", "delivery", "new baby"],
    "hands", [arc(12, 14, 8, 0, 180), disc(12, 8, 4)]),
  c("child-health", "Child health", "The small one with a cross beside",
    ["child", "care", "young"], [], ["child health", "children's health", "paediatric care", "young"],
    "figure", [disc(8, 6, 3), poly([[8, 9], [8, 14]]), poly([[4, 19], [9, 14], [14, 19]]), ...CROSS(17, 12, 4)]),
  c("growth-chart", "Growth chart", "The height going up year by year",
    ["growth", "height", "chart"], [], ["growth chart", "height chart", "growing", "centiles"],
    "chart", [poly([[3, 3], [3, 21], [21, 21]]), poly([[5, 18], [9, 14], [12, 17], [19, 10]]), row(6, 17, 21)]),
  c("paediatrician", "Paediatrician", "The doctor and the small one",
    ["paediatrician", "doctor", "child"], ["pediatrician"], ["paediatrician", "pediatrician", "children's doctor", "child doctor"],
    "person", [disc(7, 8, 3), arc(7, 17, 4.5, 180, 360), disc(17, 13, 2), arc(17, 18, 3.5, 180, 360), ...CROSS(17, 5, 3)]),

  /* ── doses ──────────────────────────────────────────────────────────────────── */
  c("medication-schedule", "Medication schedule", "The month with the doses on it",
    ["schedule", "month", "doses"], [], ["medication schedule", "when to take it", "dose schedule", "month"],
    "window", [...CAL(), raw("M9 17L12 14A2 2 0 0 1 15 17L12 20A2 2 0 0 1 9 17Z", "a capsule on the sheet", true)]),
  c("pill-organiser", "Pill organiser", "The week laid out in compartments",
    ["organiser", "week", "box"], ["pill-box"], ["pill organiser", "pill box", "dosette", "week of doses"],
    "organiser", [rect(2, 8, 20, 8, 2), col(7, 8, 16), col(12, 8, 16), col(17, 8, 16)]),
  c("dose-reminder", "Dose reminder", "The dose with the hour on it",
    ["dose", "reminder", "hour"], [], ["dose reminder", "time for your dose", "take it now", "reminder"],
    "pill", [PILL(9, 11), disc(17, 17, 4), poly([[17, 14], [17, 17], [20, 17]])]),
  c("dose-taken", "Dose taken", "The dose ticked off",
    ["dose", "taken", "done"], [], ["dose taken", "took it", "dose done", "ticked off"],
    "pill", [PILL(9, 11), poly([[13, 18], [16, 21], [22, 15]])]),
  c("dose-missed", "Dose missed", "The dose gone by",
    ["dose", "missed", "skipped"], [], ["dose missed", "missed a dose", "skipped", "not taken"],
    "pill", [PILL(9, 11), poly([[15, 15], [21, 21]]), poly([[21, 15], [15, 21]])]),
  c("vaccination-schedule", "Vaccination schedule", "The month with the jabs on it",
    ["vaccination", "month", "due"], ["jabs"], ["vaccination schedule", "when jabs are due", "immunisation", "vaccine dates"],
    "window", [...CAL(), poly([[8, 19], [15, 12]]), poly([[13, 11], [16, 14]])]),

  /* ── the very old ───────────────────────────────────────────────────────────── */
  c("elderly", "Elderly", "The figure with a stick",
    ["elderly", "older", "stick"], ["older-person"], ["elderly", "older person", "walking stick", "senior"],
    "figure", [disc(9, 5, 3), poly([[9, 8], [9, 14]]), poly([[4, 20], [9, 15], [14, 20]]), raw("M18 20V9A2 2 0 0 0 14 9", "a stick with a curved handle", false)]),
  c("elderly-care", "Care for the elderly", "A hand under the arm",
    ["elderly", "support", "hand"], [], ["care for the elderly", "elder care", "supported", "a hand to lean on"],
    "figure", [disc(9, 5, 3), poly([[9, 8], [9, 14]]), poly([[4, 20], [9, 15], [14, 20]]), raw("M14 20A5 5 0 0 1 21 13", "a hand held under the arm", false)]),
  c("care-home", "Care home", "The house with a heart in it",
    ["home", "residential", "house"], [], ["care home", "residential care", "nursing home", "house"],
    "figure", [HOUSE(), HEART(12, 13, 5)]),
  c("home-care", "Care at home", "The house with a cross in it",
    ["home", "visit", "house"], [], ["care at home", "home care", "home visit", "district nurse"],
    "figure", [HOUSE(), ...CROSS(12, 14, 4)]),
  c("carer", "Carer", "One arm round another",
    ["carer", "support", "beside"], ["caregiver"], ["carer", "caregiver", "looking after someone", "support"],
    "person", [disc(7, 7, 3), disc(17, 9, 2), raw("M2 21V18A5 5 0 0 1 12 18", "the carer's shoulders", false), raw("M12 21V17A4 4 0 0 1 20 17V21", "the shoulders beside them", false)]),
  c("home-quarantine", "Staying home", "The house with someone inside",
    ["home", "isolate", "stay"], ["isolation"], ["staying home", "isolation", "quarantine", "stay indoors"],
    "figure", [HOUSE(), disc(12, 12, 2), arc(12, 18, 4, 180, 360)]),

  /* ── giving and carrying ────────────────────────────────────────────────────── */
  c("blood-donation", "Blood donation", "The drop given",
    ["blood", "donate", "give"], ["give-blood"], ["blood donation", "give blood", "donate blood", "donor"],
    "drop", [DROP(12, 13, 8), ...CROSS(12, 14, 3)]),
  c("organ-donor", "Organ donor", "The card that says yes",
    ["donor", "card", "organ"], [], ["organ donor", "donor card", "on the register", "organ donation"],
    "card", [rect(2, 5, 20, 14, 2), HEART(8, 11, 4), row(10, 14, 20), row(14, 14, 18)]),
  c("first-aid-kit", "First aid kit", "The case with a cross on it",
    ["kit", "case", "first-aid"], [], ["first aid kit", "first aid", "medical kit", "case"],
    "case", [rect(2, 7, 20, 13, 2), poly([[9, 7], [9, 4], [15, 4], [15, 7]]), ...CROSS(12, 13, 3)]),
  c("defibrillator", "Defibrillator", "The box with the bolt on it",
    ["defibrillator", "shock", "aed"], ["aed"], ["defibrillator", "aed", "shock box", "restart the heart"],
    "case", [rect(3, 4, 18, 16, 2), poly([[14, 7], [10, 11], [13, 11], [9, 15]])]),
  c("cpr", "CPR", "The heart pressed to keep going",
    ["cpr", "compress", "press"], ["resuscitation"], ["cpr", "resuscitation", "chest compressions", "keep it going"],
    "heart", [HEART(12, 14, 7), poly([[8, 6], [12, 10], [16, 6]]), poly([[8, 2], [12, 6], [16, 2]])]),
  c("emergency-contact", "Emergency contact", "The person to call first",
    ["contact", "call", "next-of-kin"], ["next-of-kin"], ["emergency contact", "next of kin", "who to call", "first call"],
    "phone", [raw("M4 5A2 2 0 0 1 8 5V8A2 2 0 0 1 4 8ZM4 8C4 14 10 20 16 20M16 20A2 2 0 0 0 20 20V17A2 2 0 0 0 16 17Z", "a handset: an earpiece, a cord and a mouthpiece", false), disc(17, 6, 2), arc(17, 11, 3.5, 180, 360)]),
  c("medical-id", "Medical ID", "The tag you wear",
    ["id", "band", "wristband"], ["medic-alert"], ["medical id", "medic alert", "wristband", "id band"],
    "tag", [rect(7, 4, 10, 16, 2), disc(12, 7, 1), ...CROSS(12, 14, 3)]),
  c("allergy-bracelet", "Allergy bracelet", "The tag with a warning on it",
    ["allergy", "band", "warning"], [], ["allergy bracelet", "allergy band", "warning band", "medic band"],
    "tag", [rect(7, 4, 10, 16, 2), disc(12, 7, 1), col(12, 11, 15), disc(12, 18, 1)]),

  /* ── access ─────────────────────────────────────────────────────────────────── */
  c("accessible", "Accessible", "The ramp up to the door",
    ["access", "ramp", "step-free"], ["step-free"], ["accessible", "step free", "ramp", "access"],
    "ramp", [poly([[2, 20], [16, 6], [16, 20]], true), col(20, 6, 20), row(6, 16, 20)]),
  c("disability", "Disability", "The figure and the support it uses",
    ["disability", "support", "aid"], [], ["disability", "disabled", "support", "mobility aid"],
    "figure", [disc(9, 5, 3), poly([[9, 8], [9, 15]]), poly([[9, 15], [13, 19]]), col(17, 6, 21), row(6, 14, 20)]),
  c("sign-language", "Sign language", "Two hands mid-sign",
    ["sign", "hands", "signing"], ["bsl"], ["sign language", "signing", "bsl", "hands"],
    "hands", [raw("M4 21V13A2 2 0 0 1 8 13V9A2 2 0 0 1 12 9V15", "one hand, two fingers up", false), raw("M20 21V13A2 2 0 0 0 16 13V9A2 2 0 0 0 12 9", "the other hand, mirrored", false)]),
  c("braille", "Braille", "The cell of six dots",
    ["braille", "dots", "touch"], [], ["braille", "raised dots", "read by touch", "cell"],
    "braille", [disc(8, 6, 2), disc(16, 6, 2), disc(8, 12, 2), disc(16, 12, 2), disc(8, 18, 2), disc(16, 18, 2)]),
  c("guide-dog", "Guide dog", "The dog at your side",
    ["dog", "guide", "harness"], ["assistance-dog"], ["guide dog", "assistance dog", "harness", "working dog"],
    "dog", [poly([[6, 20], [6, 13], [16, 13], [16, 20]]), poly([[16, 13], [16, 7], [21, 7], [21, 11]]), poly([[16, 7], [13, 4]]), poly([[6, 13], [3, 10]])]),
  c("hearing-loop", "Hearing loop", "The ear inside the loop",
    ["hearing", "loop", "induction"], ["induction-loop"], ["hearing loop", "induction loop", "T setting", "hard of hearing"],
    "ear", [rect(3, 3, 18, 18, 2), raw("M10 18V15C8 14 7 12 7 10A5 5 0 0 1 17 10C17 11 16 12 15 12", "an ear inside the square", false)]),
  c("mental-health-first-aid", "Mental health first aid", "The head with a cross beside it",
    ["mind", "first-aid", "help"], [], ["mental health first aid", "mental health support", "first aid for the mind", "help"],
    "head", [raw("M4 21V16A6 6 0 1 1 16 16V21", "a head over its shoulders", false), ...CROSS(19, 6, 3)]),

  /* ── keeping well ───────────────────────────────────────────────────────────── */
  c("hand-wash", "Wash your hands", "The hands under the water",
    ["wash", "hands", "water"], [], ["wash your hands", "hand washing", "soap and water", "hygiene"],
    "hands", [raw("M5 21V15A2 2 0 0 1 9 15V12A2 2 0 0 1 13 12V16", "one hand raised", false), raw("M19 21V15A2 2 0 0 0 15 15", "the other hand beside it", false), poly([[7, 4], [7, 8]]), poly([[12, 3], [12, 7]]), poly([[17, 4], [17, 8]])]),
  c("sanitiser", "Sanitiser", "The pump bottle",
    ["sanitiser", "gel", "pump"], ["sanitizer"], ["sanitiser", "hand gel", "sanitizer", "pump bottle"],
    "bottle", [poly([[6, 21], [6, 10], [16, 10], [16, 21]], true), poly([[11, 10], [11, 4], [16, 4]]), poly([[16, 4], [16, 7]]), row(15, 6, 16)]),
  c("face-mask", "Face mask", "The face with the mask on",
    ["mask", "cover", "wear"], [], ["face mask", "wear a mask", "face covering", "mask on"],
    "face", [disc(12, 9, 6), raw("M4 12H20V15A10 10 0 0 1 4 15Z", "the mask over the mouth and chin", true)]),
  c("symptom-check", "Symptom check", "The list you go down",
    ["symptoms", "check", "list"], [], ["symptom check", "check your symptoms", "symptom list", "triage"],
    "page", [rect(4, 3, 16, 18, 2), poly([[6, 8], [8, 10], [12, 6]]), row(8, 14, 18), poly([[6, 15], [8, 17], [12, 13]]), row(15, 14, 18)]),
  c("temperature-check", "Temperature check", "The reading taken at the door",
    ["temperature", "check", "reading"], [], ["temperature check", "take a temperature", "thermal check", "screening"],
    "figure", [raw("M4 19V14A6 6 0 1 1 16 14V19", "a head over its shoulders", false), poly([[22, 7], [18, 7], [18, 12], [22, 12]]), poly([[18, 9.5], [15, 9.5]])]),
  c("sick-leave", "Sick leave", "The day off with a cross on it",
    ["sick", "leave", "off"], ["off-sick"], ["sick leave", "off sick", "sick day", "day off ill"],
    "window", [...CAL(), ...CROSS(12, 15, 3)]),
  c("doctor-note", "Doctor's note", "The note that signs you off",
    ["note", "signed", "letter"], ["sick-note"], ["doctor's note", "sick note", "signed off", "medical letter"],
    "page", [rect(4, 3, 16, 18, 2), ...CROSS(12, 8, 3), poly([[7, 16], [10, 16]]), poly([[10, 16], [13, 13], [17, 17]])]),
  c("recovery", "Recovery", "The heart coming back up",
    ["recovery", "better", "up"], ["getting-better"], ["recovery", "getting better", "on the mend", "recovering"],
    "heart", [HEART(9, 13, 6), poly([[17, 20], [17, 8]]), poly([[14, 11], [17, 8], [20, 11]])]),
  c("wellness-check", "Wellness check", "The heart listened to",
    ["check", "well", "review"], [], ["wellness check", "health check", "check up", "review"],
    "heart", [HEART(10, 12, 7), poly([[19, 8], [19, 13]]), disc(19, 16, 3)]),
  c("health-goal", "Health goal", "The heart you are aiming at",
    ["goal", "aim", "target"], [], ["health goal", "aim", "target", "what you are working towards"],
    "heart", [disc(12, 12, 9), HEART(12, 10, 5)]),
];
