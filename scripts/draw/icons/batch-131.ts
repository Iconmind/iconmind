/**
 * R44 · Health: mind & wellbeing — attention, mood, sleep, and the people who help.
 *
 * The head in profile carries what is going on inside it. Mood gets a square face so it
 * never collides with the round smiley the interface already has. Around them: a hammock,
 * a lotus flower, stacked stones, a couch, a handset, a plug, a thumbs up, an ear.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "health", subcategory: "mind", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The head in profile, drawn small enough to leave room for a mark beside it. */
const HEAD_SM = () => raw("M5 21V18C3.5 16.5 3 14 3 11.5A6 6 0 0 1 15 10.5C15 12 16.5 12.5 16.5 13.5C16.5 14.5 15.5 14.5 15 14.5V17A1.5 1.5 0 0 1 13.5 18.5H11V21", "a head in profile: the brow, the nose and the chin", false);
/** The head and neck, seen from the front. What is on the mind sits inside it. */
const HEAD = () => raw("M6 21V17C4 15 3 12 3 9A7 7 0 0 1 17 8C17 10 19 11 19 12C19 13 18 13 17 13V16A2 2 0 0 1 15 18H12V21", "a head in profile: the brow, the nose and the chin", false);
/** Two eyes, wide apart. The interface already owns both the round smiley and the square
 * one, so a mood here is a pair of eyes and a mouth with no frame at all. */
const FACE = () => [disc(6, 7, 2), disc(18, 7, 2)];
/** The crescent, as the sky round draws it. */
const MOON = () => raw("M15 3A9 9 0 1 0 15 21A7 7 0 0 1 15 3Z", "a crescent: the long way round one circle and back on a smaller one", true);
/** A heart, small enough to sit inside something else. */
const HEART = (x: number, y: number, r: number) => raw(
  `M${x - r} ${y}A${r / 2} ${r / 2} 0 0 1 ${x} ${y}A${r / 2} ${r / 2} 0 0 1 ${x + r} ${y}L${x} ${y + r}Z`,
  "a heart: two lobes over a point", true,
);
/** The calendar page: a rail, two pegs and the sheet under them. */
const CAL = () => [rect(3, 5, 18, 16, 2), row(9, 3, 21), col(8, 2, 5), col(16, 2, 5)];
/** The handset, curved at both ends. */
const PHONE = () => raw("M4 5A2 2 0 0 1 8 5V8A2 2 0 0 1 4 8ZM4 8C4 14 10 20 16 20M16 20A2 2 0 0 0 20 20V17A2 2 0 0 0 16 17Z", "a handset: an earpiece, a cord and a mouthpiece", false);

export const BATCH_131: Icon[] = [
  /* ── attention ──────────────────────────────────────────────────────────────── */
  c("mindfulness", "Mindfulness", "The head with one still point in it",
    ["attention", "present", "still"], [], ["mindfulness", "mindful", "be present", "attention"],
    "head", [HEAD(), disc(10, 9, 3)]),
  c("meditation", "Meditation", "The figure sitting with its hands in its lap",
    ["meditate", "sit", "quiet"], ["meditate"], ["meditation", "meditate", "sitting practice", "quiet"],
    "lotus", [disc(12, 5, 3), poly([[4, 19], [12, 11], [20, 19]], true), row(16, 7, 17)]),
  c("breathing", "Breathing", "The breath moving out and back",
    ["breath", "in", "out"], [], ["breathing", "breath", "breathe", "breath work"],
    "breath", [disc(12, 12, 4), arc(12, 12, 8, 300, 60), arc(12, 12, 8, 120, 240)]),
  c("breathe-in", "Breathe in", "The breath drawn inward",
    ["breath", "inhale", "draw"], ["inhale"], ["breathe in", "inhale", "take a breath", "in"],
    "breath", [disc(12, 12, 5), poly([[2, 12], [7, 12]]), poly([[5, 10], [7, 12], [5, 14]]), poly([[22, 12], [17, 12]]), poly([[19, 10], [17, 12], [19, 14]])]),
  c("breathe-out", "Breathe out", "The breath let go",
    ["breath", "exhale", "let go"], ["exhale"], ["breathe out", "exhale", "let the breath go", "out"],
    "breath", [disc(12, 12, 5), poly([[2, 12], [7, 12]]), poly([[4, 10], [2, 12], [4, 14]]), poly([[22, 12], [17, 12]]), poly([[20, 10], [22, 12], [20, 14]])]),
  c("focus-session", "Focus session", "The timer everyone sets by a tomato",
    ["focus", "timer", "session"], ["pomodoro"], ["focus session", "pomodoro", "deep work", "focus timer"],
    "tomato", [disc(12, 14, 7), poly([[9, 4], [12, 7], [15, 4]]), poly([[12, 7], [12, 4]])]),
  c("break-reminder", "Break reminder", "The cup that says stop for a minute",
    ["break", "pause", "cup"], [], ["break reminder", "take a break", "time for a break", "pause"],
    "cup", [poly([[4, 9], [4, 18], [15, 18], [15, 9]]), arc(15, 12, 3, 270, 90), arc(7, 6, 3, 270, 90), arc(12, 6, 3, 270, 90)]),
  c("digital-detox", "Digital detox", "The phone put away",
    ["detox", "phone", "away"], [], ["digital detox", "phone off", "screen break", "unplugged"],
    "phone", [rect(7, 3, 10, 18, 2), poly([[4, 20], [20, 4]])]),
  c("screen-time", "Screen time", "The screen and the hours on it",
    ["screen", "hours", "device"], [], ["screen time", "hours on screen", "device time", "usage"],
    "screen", [rect(3, 4, 18, 12, 2), poly([[12, 16], [12, 20]]), row(20, 8, 16), poly([[12, 8], [12, 11], [15, 11]])]),
  c("unplug", "Unplug", "The plug out of the wall",
    ["unplug", "plug", "off"], [], ["unplug", "pull the plug", "switch off", "disconnect"],
    "plug", [col(9, 3, 7), col(15, 3, 7), poly([[6, 7], [18, 7], [18, 12], [12, 18], [6, 12]], true), poly([[12, 18], [12, 21]])]),

  /* ── mood ───────────────────────────────────────────────────────────────────── */
  c("mood", "Mood", "The mouth that cannot decide",
    ["mood", "feeling", "face"], ["feeling"], ["mood", "how you feel", "feeling", "mood check"],
    "face", [...FACE(), poly([[4, 17], [8, 13], [13, 18], [17, 14]])]),
  c("mood-happy", "Good mood", "The mouth turned up",
    ["happy", "good", "up"], [], ["good mood", "happy", "feeling good", "cheerful"],
    "face", [...FACE(), arc(12, 12, 8, 0, 180)]),
  c("mood-sad", "Low mood", "The mouth turned down",
    ["sad", "low", "down"], ["low-mood"], ["low mood", "sad", "feeling low", "down"],
    "face", [...FACE(), arc(12, 20, 8, 180, 360)]),
  c("mood-neutral", "Flat mood", "The mouth straight across",
    ["neutral", "flat", "even"], [], ["flat mood", "neutral", "so-so", "even"],
    "face", [...FACE(), row(17, 4, 20)]),
  c("contentment", "Contentment", "The eyes closed and the mouth up",
    ["content", "ease", "settled"], [], ["contentment", "content", "at ease", "settled"],
    "face", [row(7, 4, 8), row(7, 16, 20), arc(12, 12, 8, 0, 180)]),
  c("laugh", "Laughing", "The mouth wide open",
    ["laugh", "joy", "open"], [], ["laughing", "laugh", "a good laugh", "joy"],
    "face", [...FACE(), raw("M4 12H20A8 8 0 0 1 4 12Z", "the mouth open wide", true)]),
  c("cry", "Crying", "The mouth down and a tear falling",
    ["cry", "tear", "upset"], ["tears"], ["crying", "cry", "in tears", "upset"],
    "face", [...FACE(), arc(12, 20, 8, 180, 360), raw("M6 11L8 13A2 2 0 1 1 4 13Z", "a tear falling from the eye", true)]),
  c("mood-track", "Mood tracking", "The month with the mood marked on it",
    ["mood", "track", "month"], [], ["mood tracking", "track your mood", "mood log", "month"],
    "window", [...CAL(), arc(12, 14, 4, 0, 180)]),
  c("mood-journal", "Mood journal", "The page you write the day into",
    ["journal", "write", "page"], ["diary"], ["mood journal", "diary", "journalling", "write it down"],
    "page", [rect(4, 3, 16, 18, 2), row(8, 8, 16), row(12, 8, 16), arc(12, 16, 3, 0, 180)]),

  /* ── pressure ───────────────────────────────────────────────────────────────── */
  c("stress", "Stress", "The head with a bolt through it",
    ["stress", "pressure", "strain"], [], ["stress", "stressed", "under pressure", "strain"],
    "head", [HEAD(), poly([[12, 5], [8, 9], [11, 9], [7, 13]])]),
  c("stress-level", "Stress level", "The meter filling across",
    ["level", "meter", "amount"], [], ["stress level", "how stressed", "meter", "level"],
    "meter", [row(15, 2, 22), raw("M12 8L16 12H8Z", "the pointer standing on the scale", true), col(6, 15, 18), col(12, 15, 18), col(18, 15, 18)]),
  c("anxiety", "Anxiety", "The head with the thought going round",
    ["anxiety", "worry", "loop"], ["worry"], ["anxiety", "anxious", "worry", "racing thoughts"],
    "head", [HEAD(), poly([[7, 6], [10, 9], [7, 12], [10, 15]])]),
  c("burnout", "Burnout", "The candle down to its stub",
    ["burnout", "spent", "candle"], [], ["burnout", "burnt out", "spent", "running on empty"],
    "candle", [poly([[8, 20], [8, 15], [16, 15], [16, 20]], true), poly([[12, 15], [12, 12]]), raw("M12 5C13 7.5 15 8.5 15 11A3 3 0 1 1 9 11C9 9 10.5 8.5 10.5 7.5C11 8 12 8 12 5Z", "a flame: the tongue curling up from a round belly", true)]),
  c("energy-level", "Energy level", "The cell and how much is left in it",
    ["energy", "left", "cell"], [], ["energy level", "how much energy", "reserves", "energy"],
    "meter", [poly([[7, 4], [17, 4], [17, 21], [7, 21]], true), row(9, 7, 17), row(15, 7, 17)]),
  c("motivation", "Motivation", "The thumb up",
    ["motivation", "drive", "thumbs-up"], ["drive"], ["motivation", "motivated", "drive", "thumbs up"],
    "hand", [poly([[7, 12], [3, 12], [3, 20], [7, 20]]), poly([[7, 12], [10, 12], [13, 9], [13, 5], [15.5, 5], [15.5, 10], [19, 10], [19, 20], [7, 20]], true)]),

  /* ── sleep ──────────────────────────────────────────────────────────────────── */
  c("sleep", "Sleep", "The night with a star out",
    ["sleep", "night", "rest"], [], ["sleep", "asleep", "night", "rest"],
    "moon", [MOON(), poly([[19, 3], [21, 5], [19, 7], [17, 5]], true)]),
  c("bedtime", "Bedtime", "The pillow with the night over it",
    ["bedtime", "pillow", "night"], [], ["bedtime", "time for bed", "turn in", "lights out"],
    "pillow", [raw("M3 18A3 3 0 0 1 3 12H21A3 3 0 0 1 21 18Z", "a pillow, plumped at both ends", true), raw("M14 2A5 5 0 1 0 14 12A4 4 0 0 1 14 2Z", "a crescent over the pillow", true)]),
  c("wake-time", "Wake time", "The pillow with the morning over it",
    ["wake", "morning", "up"], [], ["wake time", "waking up", "morning", "get up"],
    "pillow", [raw("M3 20A3 3 0 0 1 3 14H21A3 3 0 0 1 21 20Z", "a pillow, plumped at both ends", true), arc(12, 10, 5, 180, 360), row(10, 4, 20), poly([[12, 2], [12, 5]])]),
  c("nap", "Nap", "The hammock slung between two posts",
    ["nap", "hammock", "doze"], [], ["nap", "a nap", "doze", "forty winks"],
    "hammock", [col(4, 4, 20), col(20, 4, 20), raw("M4 7C4 19 20 19 20 7", "the hammock sagging between the posts", false)]),
  c("dream", "Dream", "The thought floating off",
    ["dream", "thought", "float"], [], ["dream", "dreaming", "a dream", "daydream"],
    "cloud", [raw("M7 16A4 4 0 0 1 8 8A5 5 0 0 1 17 9A4 4 0 0 1 17 16Z", "a cloud of thought", true), disc(7, 19, 2), disc(3, 21, 1)]),
  c("insomnia", "Insomnia", "The night that will not let go",
    ["insomnia", "awake", "night"], ["sleepless"], ["insomnia", "cannot sleep", "sleepless", "awake at night"],
    "moon", [MOON(), col(20, 5, 12), disc(20, 15, 1)]),

  /* ── habits and goals ───────────────────────────────────────────────────────── */
  c("habit", "Habit", "The days you keep doing it",
    ["habit", "routine", "daily"], ["routine"], ["habit", "daily habit", "routine", "keep it up"],
    "window", [...CAL(), disc(9, 15, 1), disc(15, 15, 1)]),
  c("habit-streak", "Streak", "The run of days, still alight",
    ["streak", "run", "days"], [], ["streak", "habit streak", "run of days", "keep the streak"],
    "window", [...CAL(), raw("M12 11C13 13.5 15 14.5 15 17A3 3 0 1 1 9 17C9 15 10.5 14.5 10.5 13.5C11 14 12 14 12 11Z", "a flame: the tongue curling up from a round belly", true)]),
  c("habit-check", "Habit done", "The day ticked off",
    ["done", "tick", "kept"], [], ["habit done", "ticked off", "did it today", "complete"],
    "window", [...CAL(), poly([[8, 15], [11, 18], [17, 12]])]),
  c("wellbeing-goal", "Wellbeing goal", "The heart you are aiming at",
    ["goal", "aim", "heart"], [], ["wellbeing goal", "health goal", "aim", "what you want"],
    "heart", [HEART(11, 12, 6), poly([[20, 7], [20, 14]]), poly([[20, 3], [16, 7], [20, 7]], true)]),
  c("self-care", "Self care", "The plant you keep watering",
    ["self-care", "tend", "plant"], [], ["self care", "look after yourself", "tend to yourself", "care"],
    "plant", [poly([[8, 13], [16, 13], [16, 21], [8, 21]], true), row(16, 6, 18), poly([[12, 13], [12, 8]]), raw("M12 8C12 4 9 2 5 2C5 6 8 8 12 8Z", "a leaf on the left", true), raw("M12 8C12 5 15 3 19 3C19 6 16 8 12 8Z", "a leaf on the right", true)]),
  c("relax", "Relax", "The flower open on the water",
    ["relax", "unwind", "flower"], ["unwind"], ["relax", "unwind", "wind down", "take it easy"],
    "flower", [raw("M12 6C15 9 15 13 12 16C9 13 9 9 12 6Z", "the middle petal", true), raw("M12 16C8 16 5 13 5 10C9 10 12 13 12 16Z", "the petal on the left", true), raw("M12 16C16 16 19 13 19 10C15 10 12 13 12 16Z", "the petal on the right", true), row(20, 4, 20)]),
  c("spa-day", "Spa day", "The stones stacked and still",
    ["spa", "stones", "still"], [], ["spa day", "spa", "stones", "a still hour"],
    "stones", [raw("M6 5A2 2 0 0 0 6 9H18A2 2 0 0 0 18 5Z", "the top stone", true), raw("M4 12A2.5 2.5 0 0 0 4 17H20A2.5 2.5 0 0 0 20 12Z", "the stone under it", true), row(20, 3, 21)]),
  c("nature-walk", "Walk outside", "The tree and the path up to it",
    ["walk", "outside", "tree"], ["outdoors"], ["walk outside", "nature walk", "outdoors", "a walk"],
    "tree", [poly([[12, 3], [19, 10], [5, 10]], true), poly([[12, 8], [20, 16], [4, 16]], true), col(12, 16, 20), disc(3, 20, 1), disc(8, 20, 1)]),
  c("sunlight-break", "Get some light", "The door open and the light coming in",
    ["light", "window", "sun"], ["daylight"], ["get some light", "daylight", "sunlight", "step outside"],
    "door", [poly([[5, 21], [5, 4], [13, 4], [13, 21]]), disc(11, 13, 1), poly([[16, 8], [21, 8]]), poly([[16, 12], [21, 12]]), poly([[16, 16], [21, 16]])]),

  /* ── the people who help ────────────────────────────────────────────────────── */
  c("therapy", "Therapy", "The couch you talk from",
    ["therapy", "couch", "session"], [], ["therapy", "therapy session", "counselling", "the couch"],
    "couch", [poly([[2, 17], [2, 8], [6, 8], [6, 12], [18, 12], [18, 8], [22, 8], [22, 17]], true), col(5, 17, 20), col(19, 17, 20)]),
  c("counsellor", "Counsellor", "Someone to talk it through with",
    ["counsellor", "listen", "talk"], ["counselor"], ["counsellor", "counselor", "someone to talk to", "support"],
    "person", [disc(7, 9, 3), arc(7, 18, 4.5, 180, 360), raw("M13 4H21A1 1 0 0 1 22 5V11A1 1 0 0 1 21 12H16L13 15V12A1 1 0 0 1 12 11V5A1 1 0 0 1 13 4Z", "a speech bubble beside them", true)]),
  c("support-group", "Support group", "Three of you in the same room",
    ["group", "together", "room"], [], ["support group", "group", "together", "peer support"],
    "person", [disc(6, 9, 3), disc(12, 6, 3), disc(18, 9, 3), arc(12, 21, 9, 180, 360)]),
  c("helpline", "Helpline", "The line that always answers",
    ["helpline", "call", "line"], [], ["helpline", "call for help", "support line", "phone"],
    "phone", [PHONE(), HEART(17, 6, 4)]),
  c("crisis-line", "Crisis line", "The number for the worst night",
    ["crisis", "urgent", "call"], [], ["crisis line", "urgent help", "emergency line", "call now"],
    "phone", [PHONE(), col(19, 3, 8), disc(19, 11, 1)]),
  c("talk", "Talking", "The words going out",
    ["talk", "speak", "say"], ["speak"], ["talking", "talk", "speak up", "say it"],
    "head", [HEAD_SM(), arc(18, 12, 2, 270, 90), arc(18, 12, 4, 270, 90)]),
  c("listen", "Listening", "The ear turned towards you",
    ["listen", "ear", "hear"], ["hear"], ["listening", "listen", "hear", "an ear"],
    "ear", [raw("M8 21V17C6 16 5 13 5 10A6 6 0 0 1 17 10C17 12 15 13 14 13C13 13 12 12 12 11", "an ear: the whorl and the lobe under it", false)]),
  c("hug", "Hug", "Two people, arms round each other",
    ["hug", "close", "hold"], [], ["hug", "a hug", "held", "comfort"],
    "person", [disc(6.5, 7, 3), disc(17.5, 7, 3), raw("M2 20V17A4.5 4.5 0 0 1 11 17V20", "one pair of shoulders", false), raw("M13 20V17A4.5 4.5 0 0 1 22 17V20", "the other pair, close beside it", false)]),
  c("gratitude", "Gratitude", "The heart held in an open hand",
    ["gratitude", "thanks", "give"], ["thanks"], ["gratitude", "grateful", "thank you", "thanks"],
    "heart", [arc(12, 13, 8, 0, 180), HEART(12, 7, 6)]),
  c("calm", "Calm", "The leaf lying on still water",
    ["calm", "still", "settle"], ["still"], ["calm", "calm down", "still", "settled"],
    "water", [row(15, 2, 22), row(19, 6, 18), raw("M12 4C17 4 20 7 20 12C15 12 12 9 12 4Z", "a leaf resting on the surface", true)]),
];
