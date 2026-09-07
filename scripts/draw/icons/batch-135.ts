/**
 * R48 · Education: courses & exams — signing up, sitting it, and what you get at the end.
 *
 * The certificate carries a seal, the flashcard a fold, the exam an hourglass. Around them
 * a lectern, a workbench, a scroll, a cube of modules, a winding path, a badge, a rosette
 * and a ballot of answers.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "education", subcategory: "course", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The sheet of work. */
const PAGE = () => rect(4, 3, 16, 18, 2);
/** The card, landscape. */
const CARD = () => rect(2, 5, 20, 14, 2);
/** The calendar page: a rail, two pegs and the sheet under them. */
const CAL = () => [rect(3, 5, 18, 16, 2), row(9, 3, 21), col(8, 2, 5), col(16, 2, 5)];
/** The certificate: a sheet with a seal hanging off the corner. */
const SEAL = (x: number, y: number) => [disc(x, y, 3), poly([[x - 2, y + 2], [x - 2, y + 6], [x, y + 4], [x + 2, y + 6], [x + 2, y + 2]])];
/** The hourglass: two bowls meeting at the waist. */
const GLASS = () => [
  row(3, 6, 18), row(21, 6, 18),
  poly([[6, 3], [6, 6], [12, 12], [18, 6], [18, 3]]),
  poly([[6, 21], [6, 18], [12, 12], [18, 18], [18, 21]]),
];
/** The mortarboard, seen flat on. */
const CAP = (y: number) => poly([[2, y], [6, y - 4], [18, y - 4], [22, y], [18, y + 4], [6, y + 4]], true);

export const BATCH_135: Icon[] = [
  /* ── the course ─────────────────────────────────────────────────────────────── */
  c("course", "Course", "The modules stacked in order",
    ["course", "modules", "programme"], [], ["course", "a course", "programme", "modules"],
    "stack", [poly([[3, 3], [17, 3], [17, 7], [3, 7]], true), poly([[5, 10], [19, 10], [19, 14], [5, 14]], true), poly([[7, 17], [21, 17], [21, 21], [7, 21]], true)]),
  c("course-enrol", "Enrol", "Your name going on the list",
    ["enrol", "sign-up", "join"], ["sign-up"], ["enrol", "sign up", "join the course", "register"],
    "page", [PAGE(), row(8, 7, 17), row(12, 7, 13), poly([[13, 16], [19, 10], [21, 12], [15, 18]], true)]),
  c("course-complete", "Course complete", "The last box ticked",
    ["complete", "finished", "done"], [], ["course complete", "finished the course", "all done", "completed"],
    "page", [PAGE(), row(8, 7, 17), row(12, 7, 17), poly([[7, 16], [10, 19], [17, 12]])]),
  c("course-module", "Module", "One block of the course",
    ["module", "block", "part"], ["unit-block"], ["module", "course module", "one block", "part"],
    "cube", [poly([[4, 9], [15, 9], [15, 20], [4, 20]], true), poly([[4, 9], [9, 4], [20, 4], [15, 9]]), poly([[15, 9], [20, 4], [20, 15], [15, 20]])]),
  c("unit", "Unit", "The block with its number",
    ["unit", "numbered", "block"], [], ["unit", "unit one", "numbered block", "section"],
    "cube", [poly([[4, 9], [15, 9], [15, 20], [4, 20]], true), poly([[4, 9], [9, 4], [20, 4], [15, 9]]), poly([[8, 14], [10, 12], [10, 17]])]),
  c("syllabus", "Syllabus", "The course set out point by point",
    ["syllabus", "scroll", "outline"], [], ["syllabus", "course outline", "what is covered", "scroll"],
    "page", [PAGE(), disc(8, 9, 1), row(9, 11, 17), disc(8, 15, 1), row(15, 11, 17)]),
  c("curriculum", "Curriculum", "What is taught, term by term",
    ["curriculum", "plan", "terms"], [], ["curriculum", "what is taught", "scheme of work", "plan"],
    "grid", [rect(2, 4, 20, 16, 2), row(9, 4, 20), col(9, 6, 18), row(15, 4, 20)]),
  c("learning-path", "Learning path", "The route from one step to the next",
    ["path", "route", "steps"], ["pathway"], ["learning path", "pathway", "route", "next step"],
    "path", [poly([[4, 20], [9, 15], [9, 10], [14, 5]]), disc(4, 20, 2), disc(9, 12.5, 1), disc(15, 4, 2), row(21, 17, 21)]),
  c("skill-badge", "Skill badge", "The badge you get for it",
    ["badge", "skill", "earned"], [], ["skill badge", "badge", "earned", "credential"],
    "badge", [poly([[12, 3], [19, 10], [19, 14], [12, 21], [5, 14], [5, 10]], true), poly([[8, 10], [11, 13], [16, 8]])]),

  /* ── the teaching ───────────────────────────────────────────────────────────── */
  c("video-lesson", "Video lesson", "The lesson on film",
    ["video", "play", "watch"], [], ["video lesson", "watch the video", "play", "recorded lesson"],
    "clapper", [rect(2, 9, 20, 11, 2), poly([[2, 9], [6, 5], [22, 5], [22, 9]]), poly([[9, 9], [13, 5]]), poly([[15, 9], [19, 5]])]),
  c("lecture", "Lecture", "The lectern at the front",
    ["lecture", "lectern", "talk"], [], ["lecture", "lectern", "the talk", "at the front"],
    "lectern", [poly([[5, 8], [8, 5], [19, 5], [19, 8]], true), col(12, 9, 20), row(20, 6, 18)]),
  c("seminar", "Seminar", "Heads round one table",
    ["seminar", "round-table", "discuss"], [], ["seminar", "round table", "discussion", "small group"],
    "person", [disc(6, 7, 3), disc(12, 5, 3), disc(18, 7, 3), row(14, 2, 22), poly([[7, 20], [17, 20]])]),
  c("workshop", "Workshop", "The bench with the tools on it",
    ["workshop", "bench", "hands-on"], ["hands-on"], ["workshop", "hands on", "workbench", "make something"],
    "bench", [row(13, 2, 22), col(5, 13, 21), col(19, 13, 21), poly([[8, 13], [8, 6], [17, 6], [17, 13]]), arc(12.5, 6, 2.5, 180, 360)]),
  c("tutorial", "Tutorial", "The screen with a hand on it",
    ["tutorial", "walkthrough", "show"], ["walkthrough"], ["tutorial", "walkthrough", "show me how", "guide"],
    "screen", [rect(2, 3, 20, 13, 2), raw("M9 21V15A2 2 0 0 1 13 15V11A2 2 0 0 1 17 11V16", "a hand pointing at the screen", false), row(8, 6, 12)]),
  c("study-group", "Study group", "Three of you round one book",
    ["study", "group", "together"], [], ["study group", "revise together", "study together", "group"],
    "person", [disc(5, 8, 3), disc(19, 8, 3), rect(7, 13, 10, 8, 2), col(12, 13, 21), disc(12, 5, 3)]),
  c("study-plan", "Study plan", "The weeks with the work laid out",
    ["study", "plan", "weeks"], [], ["study plan", "revision plan", "plan the weeks", "schedule"],
    "window", [...CAL(), row(13, 6, 14), row(17, 6, 18)]),
  c("study-timer", "Study timer", "The hour set aside for it",
    ["timer", "hour", "session"], [], ["study timer", "set a timer", "study session", "hour"],
    "clock", [disc(12, 13, 8), poly([[12, 8], [12, 13], [16, 13]]), poly([[9, 3], [15, 3]]), poly([[12, 2], [12, 5]])]),
  c("revision", "Revision", "Going over it with a fresh eye",
    ["revision", "revise", "again"], ["revise"], ["revision", "revise", "go over it again", "recap"],
    "page", [PAGE(), row(8, 7, 17), row(12, 7, 13), disc(15, 15, 4), poly([[18, 18], [21, 21]])]),

  /* ── the exam ───────────────────────────────────────────────────────────────── */
  c("exam", "Exam", "The paper you sit",
    ["exam", "paper", "sit"], ["examination"], ["exam", "examination", "sit the paper", "test"],
    "page", [PAGE(), row(8, 7, 17), row(12, 7, 17), row(16, 7, 13), disc(16, 17, 3)]),
  c("exam-hall", "Exam hall", "The desks apart in rows",
    ["hall", "desks", "rows"], [], ["exam hall", "desks in rows", "the hall", "sitting apart"],
    "grid", [poly([[3, 8], [9, 8], [9, 12], [3, 12]], true), poly([[15, 8], [21, 8], [21, 12], [15, 12]], true), poly([[3, 16], [9, 16], [9, 20], [3, 20]], true), poly([[15, 16], [21, 16], [21, 20], [15, 20]], true)]),
  c("exam-timer", "Exam timer", "The sand running through",
    ["timer", "sand", "time-left"], [], ["exam timer", "hourglass", "time left", "sand timer"],
    "hourglass", GLASS()),
  c("quiz", "Quiz", "The card with the question on it",
    ["quiz", "question", "card"], [], ["quiz", "a quiz", "question", "test yourself"],
    "card", [CARD(), raw("M9 10A2.5 2.5 0 0 1 14 10C14 12 11.5 12 11.5 13.5", "the hook of a question mark", false), disc(11.5, 15, 1)]),
  c("quiz-pass", "Passed", "The quiz with a tick on it",
    ["pass", "correct", "right"], ["passed"], ["passed", "got it right", "correct", "pass"],
    "card", [CARD(), poly([[7, 12], [10, 15], [17, 8]])]),
  c("quiz-fail", "Failed", "The quiz with a cross on it",
    ["fail", "wrong", "missed"], [], ["failed", "got it wrong", "incorrect", "fail"],
    "card", [CARD(), poly([[8, 8], [16, 16]]), poly([[16, 8], [8, 16]])]),
  c("multiple-choice", "Multiple choice", "One of the circles filled in",
    ["choice", "options", "pick-one"], [], ["multiple choice", "pick one", "options", "answer"],
    "list", [disc(7, 6, 2), disc(7, 12, 2), disc(7, 18, 2), row(6, 12, 21), row(12, 12, 21), row(18, 12, 18)]),
  c("true-false", "True or false", "One tick, one cross",
    ["true", "false", "either"], [], ["true or false", "yes or no", "either", "two options"],
    "list", [poly([[3, 4], [11, 4], [11, 12], [3, 12]], true), poly([[5, 8], [7, 10], [11, 6]]), poly([[13, 12], [21, 12], [21, 20], [13, 20]], true), poly([[15, 14], [19, 18]]), poly([[19, 14], [15, 18]])]),
  c("essay", "Essay", "The long answer, written out",
    ["essay", "long-answer", "write"], [], ["essay", "long answer", "write it out", "composition"],
    "page", [PAGE(), row(7, 7, 17), row(11, 7, 17), row(15, 7, 17), row(19, 7, 12)]),
  c("open-book", "Open book exam", "The book you may keep open",
    ["open-book", "allowed", "reference"], [], ["open book exam", "book allowed", "reference permitted", "open book"],
    "open-book", [raw("M12 8C10 6 7 5 3 5V17C7 17 10 18 12 20", "the left-hand leaf", false), raw("M12 8C14 6 17 5 21 5V17C17 17 14 18 12 20", "the right-hand leaf", false), poly([[15, 17], [17, 19], [21, 15]])]),
  c("mock-exam", "Mock exam", "The practice paper",
    ["mock", "practice", "trial"], ["practice-exam"], ["mock exam", "practice paper", "trial run", "mock"],
    "page", [poly([[4, 3], [20, 3], [20, 21], [4, 21]], true), row(9, 7, 17), row(13, 7, 13), poly([[13, 15], [19, 21]]), poly([[19, 15], [13, 21]])]),
  c("past-paper", "Past paper", "Last year's questions",
    ["past", "previous", "archive"], ["previous-paper"], ["past paper", "previous exam", "last year's paper", "archive"],
    "stack", [rect(2, 2, 15, 16, 2), poly([[6, 21], [21, 21], [21, 6]]), row(7, 5, 14), row(11, 5, 14), row(15, 5, 10)]),
  c("mark-scheme", "Mark scheme", "What each answer is worth",
    ["marks", "scheme", "worth"], ["marking"], ["mark scheme", "marking", "what it is worth", "points"],
    "page", [PAGE(), poly([[7, 8], [9, 10], [12, 7]]), row(9, 15, 18), poly([[7, 15], [9, 17], [12, 14]]), row(16, 15, 18)]),

  /* ── the result ─────────────────────────────────────────────────────────────── */
  c("score", "Score", "The number you came out with",
    ["score", "result", "number"], ["result"], ["score", "result", "how you did", "the number"],
    "badge", [poly([[12, 3], [19, 10], [19, 14], [12, 21], [5, 14], [5, 10]], true), poly([[10, 11], [12, 9], [12, 16]]), row(16, 9, 15)]),
  c("percentage-score", "Percentage", "The score out of a hundred",
    ["percent", "out-of", "hundred"], [], ["percentage", "percent score", "out of a hundred", "per cent"],
    "percent", [disc(6, 7, 3), disc(18, 17, 3), poly([[5, 19], [19, 5]])]),
  c("pass-mark", "Pass mark", "The line you have to clear",
    ["pass-mark", "threshold", "line"], [], ["pass mark", "threshold", "the line", "minimum"],
    "meter", [rect(2, 11, 20, 8, 2), poly([[15, 4], [15, 11]]), poly([[12, 7], [15, 4], [18, 7]])]),
  c("distinction", "Distinction", "The rosette for the top mark",
    ["distinction", "rosette", "top"], ["merit"], ["distinction", "merit", "top mark", "rosette"],
    "award", [disc(12, 8, 6), poly([[8, 13], [8, 21], [11, 18], [14, 21], [14, 13]]), poly([[9, 8], [11, 10], [15, 6]])]),
  c("course-certificate", "Certificate", "The sheet with the seal on it",
    ["certificate", "seal", "awarded"], [], ["certificate", "awarded", "seal", "certified"],
    "certificate", [rect(2, 3, 20, 13, 2), row(7, 6, 18), row(10, 6, 14), ...SEAL(17, 15)]),
  c("diploma", "Diploma", "The rolled sheet with its ribbon",
    ["diploma", "rolled", "ribbon"], [], ["diploma", "rolled certificate", "ribbon", "awarded"],
    "scroll", [raw("M4 8A3 3 0 0 0 4 14H20A3 3 0 0 0 20 8Z", "the sheet rolled at both ends", true), poly([[10, 14], [10, 20], [12, 18], [14, 20], [14, 14]])]),
  c("degree", "Degree", "The cap over the rolled sheet",
    ["degree", "graduate", "award"], [], ["degree", "graduated", "university degree", "award"],
    "cap", [poly([[2, 8], [6, 4], [18, 4], [22, 8], [18, 12], [6, 12]], true), raw("M5 16A2 2 0 0 0 5 20H19A2 2 0 0 0 19 16Z", "the scroll under the cap", true)]),
  c("transcript", "Transcript", "Every mark, listed and sealed",
    ["transcript", "record", "marks"], ["academic-record"], ["transcript", "academic record", "all the marks", "record"],
    "page", [PAGE(), row(8, 7, 13), row(8, 15, 18), row(13, 7, 13), row(13, 15, 18), disc(16, 18, 2)]),
  c("dean-list", "Dean's list", "The list with a star against it",
    ["dean", "list", "honours"], [], ["dean's list", "honours list", "top students", "listed"],
    "page", [PAGE(), row(8, 11, 17), row(12, 11, 17), row(16, 11, 17), poly([[8, 6], [10, 8], [8, 10], [6, 8]], true)]),
  c("honour-roll", "Honour roll", "The banner with the names on it",
    ["honour", "roll", "names"], ["honor-roll"], ["honour roll", "honor roll", "roll of honour", "named"],
    "banner", [poly([[4, 3], [20, 3], [20, 20], [12, 12], [4, 20]], true), row(7, 7, 17), row(10, 7, 14)]),

  /* ── paying for it ──────────────────────────────────────────────────────────── */
  c("credit-hours", "Credit hours", "The hours the course is worth",
    ["credits", "hours", "worth"], [], ["credit hours", "credits", "hours of study", "worth"],
    "clock", [disc(12, 12, 8), poly([[12, 7], [12, 12], [16, 12]]), poly([[17, 4], [21, 4]]), poly([[19, 2], [19, 6]])]),
  c("scholarship", "Scholarship", "The cap and the money behind it",
    ["scholarship", "funded", "award"], ["bursary"], ["scholarship", "bursary", "funded place", "award"],
    "cap", [poly([[2, 7], [6, 3], [18, 3], [22, 7], [18, 11], [6, 11]], true), rect(4, 14, 16, 7, 2), disc(12, 17.5, 2)]),
  c("tuition", "Tuition fees", "What the course costs",
    ["fees", "cost", "pay"], ["fees"], ["tuition", "course fees", "what it costs", "pay"],
    "note", [rect(2, 7, 20, 11, 2), disc(12, 12.5, 3), poly([[6, 10], [6, 15]]), poly([[18, 10], [18, 15]])]),
  c("student-loan", "Student loan", "The money you pay back",
    ["loan", "borrow", "repay"], [], ["student loan", "borrow to study", "repay", "loan"],
    "note", [rect(2, 5, 20, 11, 2), disc(12, 10.5, 3), poly([[7, 19], [17, 19]]), poly([[10, 16], [7, 19], [10, 22]])]),
  c("enrol-deadline", "Enrolment deadline", "The last day to sign up",
    ["deadline", "last-day", "closes"], ["closing-date"], ["enrolment deadline", "closing date", "last day", "sign up by"],
    "window", [rect(3, 5, 18, 16, 2), row(9, 3, 21), disc(13, 15, 3), poly([[13, 12], [13, 15], [16, 15]])]),
  c("academic-year", "Academic year", "The year the school runs on",
    ["year", "academic", "cycle"], [], ["academic year", "school year", "the year", "cycle"],
    "window", [...CAL(), arc(12, 15, 4, 30, 300), poly([[13, 10], [16, 13], [13, 13]], true)]),
  c("semester", "Semester", "Half the year, blocked out",
    ["semester", "half-year", "block"], ["half-year"], ["semester", "half year", "the block", "term"],
    "window", [...CAL(), poly([[6, 18], [12, 12], [18, 12]])]),
  c("flashcard", "Flashcard", "The card with a corner turned",
    ["flashcard", "card", "recall"], ["cue-card"], ["flashcard", "cue card", "recall", "card"],
    "card", [poly([[3, 6], [16, 6], [21, 11], [21, 18], [3, 18]], true), poly([[16, 6], [16, 11], [21, 11]]), row(14, 6, 14)]),
  c("flashcard-flip", "Flip the card", "The other side of it",
    ["flip", "turn", "other-side"], ["turn-over"], ["flip the card", "turn it over", "other side", "reveal"],
    "card", [rect(2, 2, 14, 10, 2), rect(8, 7, 14, 10, 2), poly([[4, 19], [12, 19]]), poly([[7, 16], [4, 19], [7, 22]])]),
];
