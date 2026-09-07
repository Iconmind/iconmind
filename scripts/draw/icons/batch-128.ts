/**
 * R41 · Health: medical — the places, the people, the instruments and the medicines.
 *
 * Three bodies. The cross says medical, and what kind of care it is sits beside it. The
 * pill is a capsule split down the middle. The card is the patient's record. Around them
 * stand instruments: a syringe, a stethoscope, a thermometer, a scalpel, crutches, a
 * wheelchair, a tooth.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "health", subcategory: "medical", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The medical cross, centred on (x, y), arms 2r long. */
const CROSS = (x: number, y: number, r: number) => [col(x, y - r, y + r), row(y, x - r, x + r)];
/** The capsule: a pill lying on the diagonal, split across the middle. */
const PILL = () => [raw("M3.5 13.5L13.5 3.5A5 5 0 0 1 20.5 10.5L10.5 20.5A5 5 0 0 1 3.5 13.5Z", "a capsule: two rounded ends on the diagonal", true), poly([[8.5, 8.5], [15.5, 15.5]])];
/** The card a patient carries. Marks sit at cy 13. */
const CARD = () => [rect(2, 4, 20, 15, 2), row(9, 2, 22)];
/** A person: the head and the shoulders under it. */
const PERSON = (x: number, y: number, r: number) => [disc(x, y, r), arc(x, y + r * 3, r * 2.2, 180, 360)];
/** The pulse line an ECG draws. */
const PULSE = (y: number) => poly([[2, y], [7, y], [10, y - 3], [13, y], [16, y - 3], [19, y], [22, y]]);

export const BATCH_128: Icon[] = [
  /* ── the places ─────────────────────────────────────────────────────────────── */
  c("hospital", "Hospital", "The block with a cross over its door",
    ["hospital", "ward", "care"], [], ["hospital", "medical centre", "ward", "infirmary"],
    "figure", [poly([[4, 20], [4, 7], [20, 7], [20, 20]], true), ...CROSS(12, 13, 3)]),
  c("clinic", "Clinic", "The stepped wing with a cross on it",
    ["clinic", "surgery", "practice"], [], ["clinic", "gp surgery", "doctor's practice", "health centre"],
    "figure", [poly([[3, 20], [3, 12], [8, 12], [8, 7], [16, 7], [16, 12], [21, 12], [21, 20]], true), ...CROSS(12, 14, 2.5)]),
  c("pharmacy", "Pharmacy", "The mortar with its pestle",
    ["pharmacy", "chemist", "dispensary"], ["chemist"], ["pharmacy", "chemist", "drugstore", "dispensary"],
    "figure", [raw("M3 11H21A9 9 0 0 1 3 11Z", "the mortar's bowl", true), poly([[8, 3], [15, 10]])]),
  c("emergency-room", "Emergency", "The open doorway with a cross under it",
    ["emergency", "a-and-e", "urgent"], ["a-and-e"], ["emergency room", "a&e", "urgent care", "casualty"],
    "figure", [raw("M4 20V12A8 8 0 0 1 20 12V20", "the doorway that never shuts", false), ...CROSS(12, 13, 3)]),
  c("ambulance", "Ambulance", "The van with a cross on its side",
    ["ambulance", "emergency", "van"], [], ["ambulance", "emergency vehicle", "paramedic van", "999"],
    "truck", [raw("M2 17V8A2 2 0 0 1 4 6H14V10H17.5L21 13.5V17Z", "the ambulance: a box body with the cab cut back", true), disc(7, 19, 2), disc(17, 19, 2), ...CROSS(8, 11, 2)]),
  c("operating-room", "Operating theatre", "The lamp over the table",
    ["theatre", "operating", "surgery"], [], ["operating theatre", "operating room", "surgery room", "theatre"],
    "figure", [arc(12, 8, 6, 180, 360), col(12, 2, 8), rect(3, 13, 18, 6.5, 2), row(21, 6, 18)]),
  c("recovery-ward", "Recovery ward", "The bed with a heart over it",
    ["recovery", "ward", "rest"], [], ["recovery ward", "hospital bed", "recovering", "ward"],
    "bed", [poly([[2, 20], [2, 13], [22, 13], [22, 20]]), row(16.5, 2, 22), raw("M8 6A2 2 0 0 1 12 6A2 2 0 0 1 16 6L12 10Z", "a heart: two lobes over a point", true)]),

  /* ── the people ─────────────────────────────────────────────────────────────── */
  c("doctor", "Doctor", "A person with a cross on the chest",
    ["doctor", "gp", "physician"], ["gp"], ["doctor", "physician", "gp", "medic"],
    "person", [...PERSON(12, 6, 3), ...CROSS(12, 17, 2.5)]),
  c("nurse", "Nurse", "A person with a cap and a cross",
    ["nurse", "care", "staff"], [], ["nurse", "nursing", "care staff", "matron"],
    "person", [...PERSON(12, 8, 3), poly([[8, 6], [8, 3], [16, 3], [16, 6]]), ...CROSS(12, 16, 2)]),
  c("patient", "Patient", "A person in the bed",
    ["patient", "bed", "admitted"], [], ["patient", "in hospital", "admitted", "inpatient"],
    "bed", [disc(7, 9, 3), poly([[2, 20], [2, 14], [22, 14], [22, 20]]), row(17, 2, 22)]),
  c("dentist-chair", "Dentist's chair", "The couch under its lamp",
    ["dentist", "chair", "surgery"], [], ["dentist chair", "dental surgery", "dentist", "dental chair"],
    "figure", [poly([[3, 16], [3, 12], [19, 12], [19, 16]], true), col(11, 16, 21), row(21, 7, 15), disc(19, 5, 3), poly([[19, 8], [19, 12]])]),

  /* ── appointments and records ───────────────────────────────────────────────── */
  c("book-appointment", "Book an appointment", "The calendar with a cross on it",
    ["appointment", "book", "date"], ["appointment"], ["book an appointment", "appointment", "see the doctor", "booking"],
    "window", [rect(3, 5, 18, 16, 2), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5), ...CROSS(12, 15.5, 3)]),
  c("appointment-reminder", "Appointment reminder", "The calendar with a bell on it",
    ["reminder", "alert", "appointment"], [], ["appointment reminder", "remind me", "appointment alert", "notification"],
    "window", [rect(3, 5, 18, 16, 2), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5), arc(12, 17, 4, 180, 360), row(17, 8, 16)]),
  c("prescription", "Prescription", "The sheet with a capsule on it",
    ["prescription", "script", "rx"], ["rx"], ["prescription", "rx", "doctor's note", "script"],
    "slip", [raw("M4 3H18L22 7V19A2 2 0 0 1 20 21H4A2 2 0 0 1 2 19V5A2 2 0 0 1 4 3ZM18 3V7H22", "a slip: a wide sheet with its top-right corner folded over", false), raw("M7 17L11 13A2.5 2.5 0 0 1 14.5 16.5L10.5 20.5A2.5 2.5 0 0 1 7 17Z", "a capsule lying on the diagonal", true)]),
  c("prescription-refill", "Refill prescription", "The sheet with an arrow round it",
    ["refill", "repeat", "again"], ["repeat-prescription"], ["refill prescription", "repeat prescription", "reorder medicine", "refill"],
    "slip", [raw("M4 3H18L22 7V19A2 2 0 0 1 20 21H4A2 2 0 0 1 2 19V5A2 2 0 0 1 4 3ZM18 3V7H22", "a slip: a wide sheet with its top-right corner folded over", false), row(13, 8, 16), poly([[10.5, 10.5], [8, 13], [10.5, 15.5]]), row(17, 8, 16)]),
  c("medical-record", "Medical record", "The folder with a cross on it",
    ["record", "notes", "file"], ["patient-file"], ["medical record", "patient file", "notes", "health record"],
    "folder", [poly([[2, 20], [2, 6], [9, 6], [11, 8], [22, 8], [22, 20]], true), ...CROSS(12, 14, 3)]),
  c("health-card", "Health card", "The card with a cross on it",
    ["card", "insurance", "id"], [], ["health card", "insurance card", "medical card", "nhs card"],
    "card", [...CARD(), ...CROSS(6, 13, 2.5), row(12, 12, 20), row(16, 12, 18)]),
  c("vaccination-record", "Vaccination record", "The card with a check on it",
    ["vaccine", "record", "proof"], [], ["vaccination record", "vaccine passport", "jab record", "proof of vaccination"],
    "card", [...CARD(), poly([[5, 13], [8, 16], [13, 11]]), row(16, 12, 20)]),

  /* ── the medicines ──────────────────────────────────────────────────────────── */
  c("pill", "Pill", "A capsule split across the middle",
    ["pill", "capsule", "medicine"], ["medicine"], ["pill", "capsule", "medicine", "tablet"],
    "pill", PILL()),
  c("capsule", "Capsule", "The capsule standing upright, its halves apart",
    ["capsule", "medicine", "dose"], [], ["capsule", "medicine capsule", "dose", "drug"],
    "pill", [raw("M8 7A4 4 0 0 1 16 7V17A4 4 0 0 1 8 17Z", "a capsule standing on end", true), row(12, 8, 16)]),
  c("tablet-medicine", "Tablet", "The round tablet, scored across",
    ["tablet", "medicine", "round"], [], ["tablet", "round pill", "scored tablet", "medicine"],
    "pill", [disc(12, 12, 8), row(12, 4, 20)]),
  c("pill-bottle", "Pill bottle", "The bottle with its cap and a cross",
    ["bottle", "medicine", "jar"], ["medicine-bottle"], ["pill bottle", "medicine bottle", "pill jar", "prescription bottle"],
    "figure", [poly([[6, 8], [6, 21], [18, 21], [18, 8]], true), poly([[8, 8], [8, 4], [16, 4], [16, 8]]), ...CROSS(12, 14, 2.5)]),
  c("syringe", "Syringe", "The barrel with its plunger and needle",
    ["syringe", "needle", "injection"], ["needle"], ["syringe", "needle", "injection", "jab"],
    "figure", [poly([[6, 15], [14, 7], [17, 10], [9, 18]], true), poly([[15.5, 8.5], [20, 4]]), poly([[7.5, 16.5], [4, 20]]), poly([[2.5, 18.5], [5.5, 21.5]])]),
  c("vaccine", "Vaccine", "The vial with its cap and the dose line",
    ["vaccine", "vial", "dose"], ["vial"], ["vaccine", "vial", "dose", "immunisation"],
    "figure", [poly([[8, 7], [8, 20], [16, 20], [16, 7]], true), poly([[9, 7], [9, 4], [15, 4], [15, 7]]), row(13, 8, 16)]),
  c("injection", "Injection", "The dose pressed down through the needle",
    ["injection", "jab", "shot"], ["jab"], ["injection", "jab", "shot", "give an injection"],
    "figure", [rect(8, 6, 8, 10, 2), row(3, 8, 16), poly([[12, 3], [12, 6]]), poly([[12, 16], [12, 20]]), row(10, 10, 14)]),

  /* ── the tests ──────────────────────────────────────────────────────────────── */
  c("blood-test", "Blood test", "The tube with the drop in it",
    ["blood", "test", "sample"], ["sample"], ["blood test", "sample", "phlebotomy", "blood work"],
    "figure", [poly([[9, 3], [9, 18], [15, 18], [15, 3]]), row(3, 7, 17), raw("M12 9L15 12A4 4 0 0 1 9 12Z", "a drop of blood", true)]),
  c("blood-pressure", "Blood pressure", "The cuff with its gauge",
    ["pressure", "cuff", "bp"], ["bp"], ["blood pressure", "bp", "cuff", "sphygmomanometer"],
    "figure", [rect(2, 6, 12, 10, 2), row(11, 2, 14), disc(18, 15, 4), poly([[18, 12], [18, 15], [21, 15]])]),
  c("blood-sugar", "Blood sugar", "The meter with a drop of blood beside it",
    ["sugar", "glucose", "diabetes"], ["glucose"], ["blood sugar", "glucose", "diabetes", "sugar level"],
    "figure", [rect(2, 7, 11, 12, 2), row(13, 4, 11), raw("M18 5L21.5 8.5A3.5 3.5 0 1 1 14.5 8.5Z", "a drop of blood", true)]),
  c("heart-rate", "Heart rate", "The heart with the beat drawn through it",
    ["heart", "rate", "bpm"], ["bpm"], ["heart rate", "bpm", "pulse rate", "heartbeat"],
    "figure", [raw("M4 10A4 4 0 0 1 12 10A4 4 0 0 1 20 10L12 18Z", "a heart: two lobes over a point", true), poly([[2, 13], [8, 13], [10, 11], [14, 15], [16, 13], [22, 13]])]),
  c("pulse-oximeter", "Pulse oximeter", "The clip on the finger with the reading",
    ["oximeter", "oxygen", "finger"], ["spo2"], ["pulse oximeter", "spo2", "oxygen level", "finger clip"],
    "figure", [poly([[4, 8], [4, 16], [16, 16], [16, 8]], true), row(12, 16, 21), poly([[6, 12], [9, 12], [11, 10], [13, 12], [16, 12]])]),
  c("stethoscope", "Stethoscope", "The tubes over the head and the chest piece",
    ["stethoscope", "listen", "chest"], [], ["stethoscope", "listen to the chest", "doctor's tool", "auscultation"],
    "figure", [raw("M6 4V8A6 6 0 0 0 18 8V4", "the tubes that hang round the neck", false), disc(6, 3, 1), disc(18, 3, 1), poly([[12, 14], [12, 16.5]]), disc(12, 19, 3)]),
  c("medical-thermometer", "Thermometer", "The stick thermometer with its column",
    ["thermometer", "fever", "temperature"], ["fever"], ["medical thermometer", "fever", "take a temperature", "thermometer"],
    "figure", [raw("M7 19A2.5 2.5 0 0 1 7 14L16 5A2.5 2.5 0 0 1 19 8Z", "a stick thermometer lying on the diagonal", true), poly([[10, 15], [15, 10]])]),
  c("ecg", "ECG", "The trace on the paper",
    ["ecg", "ekg", "trace"], ["ekg"], ["ecg", "ekg", "heart trace", "cardiogram"],
    "figure", [rect(2, 5, 20, 14, 2), PULSE(12)]),
  c("x-ray", "X-ray", "The source over the plate",
    ["x-ray", "scan", "bones"], ["radiograph"], ["x-ray", "radiograph", "bone scan", "chest x-ray"],
    "figure", [rect(3, 14, 18, 7, 2), disc(12, 5, 3), poly([[10, 8], [6, 12]]), col(12, 8, 12), poly([[14, 8], [18, 12]])]),
  c("mri-scan", "MRI scan", "The tunnel with the bed going in",
    ["mri", "scan", "tunnel"], ["scanner"], ["mri", "scanner", "mri scan", "imaging"],
    "machine", [rect(3, 5, 18, 14, 2), disc(12, 12, 4), row(21, 6, 18), col(12, 18.5, 21)]),
  c("ultrasound", "Ultrasound", "The probe and the waves it sends",
    ["ultrasound", "scan", "probe"], ["sonogram"], ["ultrasound", "sonogram", "scan", "probe"],
    "figure", [raw("M4 3H10V14A3 3 0 0 1 4 14Z", "the probe with its rounded head", true), arc(13, 10, 4, 270, 90), arc(13, 10, 7, 270, 90)]),
  c("eye-test", "Eye test", "The chart with the letters getting smaller",
    ["eye", "test", "chart"], ["sight-test"], ["eye test", "sight test", "eye chart", "optician"],
    "page", [rect(4, 3, 16, 18, 2), row(7, 8, 16), row(11, 9, 15), row(15, 9.5, 14.5), row(18, 10, 14)]),

  /* ── what helps ─────────────────────────────────────────────────────────────── */
  c("bandage", "Bandage", "The roll of gauze with its tail",
    ["bandage", "dressing", "wound"], ["dressing"], ["bandage", "dressing", "wrap", "wound care"],
    "roll", [disc(10, 12, 7), disc(10, 12, 3), poly([[17, 12], [21, 12], [21, 19]])]),
  c("plaster", "Plaster", "The sticking plaster with its pad",
    ["plaster", "band-aid", "cut"], ["band-aid"], ["plaster", "band aid", "sticking plaster", "small cut"],
    "figure", [raw("M3.5 15.5L15.5 3.5A4 4 0 0 1 20.5 8.5L8.5 20.5A4 4 0 0 1 3.5 15.5Z", "a plaster laid on the diagonal, rounded at both ends", true), disc(10, 14, 1), disc(14, 10, 1)]),
  c("cast", "Plaster cast", "The leg set in plaster",
    ["cast", "broken", "arm"], [], ["plaster cast", "broken arm", "cast", "fracture"],
    "figure", [poly([[8, 4], [16, 4], [16, 17], [20, 17], [20, 21], [8, 21]], true), row(9, 8, 16), row(13, 8, 16)]),
  c("crutches", "Crutches", "Two crutches side by side",
    ["crutches", "walking", "support"], [], ["crutches", "walking aid", "support", "on crutches"],
    "figure", [row(4, 4, 10), col(7, 4, 21), row(10, 4, 10), row(4, 14, 20), col(17, 4, 21), row(10, 14, 20)]),
  c("wheelchair", "Wheelchair", "The chair on its big wheel",
    ["wheelchair", "mobility", "access"], [], ["wheelchair", "mobility", "accessible", "chair"],
    "figure", [disc(9, 16, 6), disc(9, 16, 2), poly([[8, 3], [8, 9], [15, 9], [15, 13], [19, 13]])]),
  c("walking-stick", "Walking stick", "The stick with its curved handle",
    ["stick", "cane", "walking"], ["cane"], ["walking stick", "cane", "walking aid", "stick"],
    "figure", [raw("M8 21V8A4 4 0 0 1 16 8", "a stick with a hooked handle", false), row(21, 5, 11)]),
  c("hearing-aid", "Hearing aid", "The aid behind the ear with its waves",
    ["hearing", "aid", "ear"], [], ["hearing aid", "hearing", "ear aid", "deaf aid"],
    "figure", [raw("M6 20A6 6 0 0 1 6 8A4 4 0 0 1 12 16", "the aid hooked round the ear", false), arc(16, 12, 3, 270, 90), arc(16, 12, 6, 270, 90)]),
  c("eyeglasses", "Glasses", "Two lenses and the bridge",
    ["glasses", "spectacles", "sight"], ["spectacles"], ["glasses", "spectacles", "eyewear", "reading glasses"],
    "figure", [disc(6.5, 13, 4.5), disc(17.5, 13, 4.5), row(13, 10.5, 13.5), poly([[2, 9], [4, 11]]), poly([[22, 9], [20, 11]])]),

  /* ── the mouth ──────────────────────────────────────────────────────────────── */
  c("dental", "Dental care", "The tooth with a check beside it",
    ["dental", "dentist", "teeth"], [], ["dental care", "dentist", "teeth", "oral health"],
    "figure", [raw("M4 6A4 4 0 0 1 9 8A4 4 0 0 1 14 6C16 10 14 19 11.5 19C10 19 10 13 9 13C8 13 8 19 6.5 19C4 19 2 10 4 6Z", "a tooth: a crown over two roots", true), poly([[16, 15], [18, 17], [22, 13]])]),
  c("tooth", "Tooth", "One tooth",
    ["tooth", "teeth", "molar"], ["teeth"], ["tooth", "teeth", "molar", "dental"],
    "figure", [raw("M7 5A4 4 0 0 1 12 7A4 4 0 0 1 17 5C19 9 17 19 14.5 19C13 19 13 13 12 13C11 13 11 19 9.5 19C7 19 5 9 7 5Z", "a tooth: a crown over two roots", true), row(21, 7, 17)]),
  c("toothbrush", "Toothbrush", "The head with its bristles and the handle",
    ["toothbrush", "brush", "clean"], [], ["toothbrush", "brush your teeth", "oral care", "brush"],
    "figure", [poly([[9, 3], [15, 3], [15, 10], [9, 10]], true), col(12, 10, 21), row(6, 9, 15)]),
  c("surgery", "Surgery", "The mask worn over the mouth",
    ["surgery", "operation", "cut"], ["operation"], ["surgery", "operation", "surgical", "procedure"],
    "figure", [raw("M5 8H19V13A7 5 0 0 1 5 13Z", "the mask over the mouth", true), row(11, 7, 17), row(14, 7, 17), arc(5, 11, 3, 90, 270), arc(19, 11, 3, 270, 90)]),
  c("scalpel", "Scalpel", "The blade on its handle",
    ["scalpel", "blade", "cut"], ["blade"], ["scalpel", "surgical blade", "knife", "cut"],
    "figure", [poly([[4, 20], [12, 12], [16, 8], [19, 11], [15, 15], [10, 20]], true), poly([[13, 12], [15, 14]])]),
];
