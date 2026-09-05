/**
 * R11 · Testing & quality — what a test is, what it needs, how it ran, and what the code
 * looks like once it is read closely.
 *
 * A kind of test is the flask `experiment` draws, with what is being tested in the bulb.
 * A load profile is a line on the axes. A double — stub, fake, spy, mock — is the machine
 * that stands in for a service. Test data lands in a tray. What is written on a board is the
 * clipboard; what runs is the run card; what is read in code is the bracket pair.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { brackets, clipboard, machine, runCard, tray, window_ } from "../bodies.ts";
import {
  SMALL, check, clockMark, listMark, shieldMark, squareMark, targetMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "devtools", subcategory: "testing", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The flask `experiment` draws. The bulb is x 5..19, y 11..18; short rows sit at y 13 and 16. */
const FLASK = () => poly([[9, 3], [9, 10], [4, 15], [4, 19], [20, 19], [20, 15], [15, 10], [15, 3]], true);
/** The set's axes: the L a chart stands in. The plot is x 6..20, y 5..18. */
const AXES = () => [col(4, 4, 20), row(20, 4, 20)];
/** An eye: a brow arched over a pupil, centred on (12, cy). */
const EYE = (cy: number) => [arc(12, cy, 5, 200, 340), disc(12, cy, 2)];
/** A wisp: two waves, 45° runs. */
const WISP = (y: number) => poly([[8, y + 2.5], [10.5, y], [13, y + 2.5], [15.5, y]]);

export const BATCH_98: Icon[] = [
  /* ── Kinds of test ────────────────────────────────────────────────────────────── */
  c("unit-test", "Unit test", "The flask with one point in it — one small piece tested on its own",
    ["test", "unit", "kind"], [], ["unit test", "unit testing", "test one function", "isolated test"],
    "figure", [FLASK(), disc(12, 15, 2)]),
  c("integration-test", "Integration test", "The flask with two points tied together — pieces tested as they work with each other",
    ["test", "integration", "kind"], [], ["integration test", "integration testing", "components together", "wired up"],
    "figure", [FLASK(), disc(9, 15, 1), disc(15, 15, 1), row(15, 10, 14)]),
  c("end-to-end-test", "End-to-end test", "The flask with a line from wall to wall — the whole path tested as a user would take it",
    ["test", "e2e", "kind"], [], ["end-to-end test", "e2e", "e2e testing", "full flow"],
    "figure", [FLASK(), row(15, 7, 17)]),
  c("contract-test", "Contract test", "The flask with an equals sign — two sides checked against the same agreement",
    ["test", "contract", "kind"], [], ["contract test", "consumer-driven contract", "pact", "api contract"],
    "figure", [FLASK(), row(13, 9, 15), row(16, 9, 15)]),
  c("smoke-suite", "Smoke suite", "The flask with a wisp in it — the handful of tests that say whether anything works at all",
    ["test", "smoke", "suite"], [], ["smoke suite", "smoke tests", "sanity suite", "does it boot"],
    "figure", [FLASK(), WISP(14)]),
  c("chaos-test", "Chaos test", "The flask with a bolt in it — something broken on purpose to see what happens",
    ["test", "chaos", "resilience"], [], ["chaos test", "chaos engineering", "break it on purpose", "resilience test"],
    "figure", [FLASK(), poly([[13, 11.5], [10.5, 14], [13, 14], [10.5, 16.5]])]),
  c("fault-injection", "Fault injection", "The flask with an arrow dropping down its neck — a failure fed in by hand",
    ["test", "fault", "inject"], [], ["fault injection", "inject failure", "error injection", "latency injection"],
    "figure", [FLASK(), col(12, 11.5, 15.5), poly([[9.5, 13], [12, 15.5], [14.5, 13]])]),
  c("assertion-fail", "Assertion failed", "The flask with a cross in it — the check that came out wrong",
    ["test", "assert", "fail"], [], ["assertion failed", "assert fails", "expected but got", "red test"],
    "figure", [FLASK(), poly([[10, 13], [14, 17]]), poly([[14, 13], [10, 17]])]),
  c("snapshot-test", "Snapshot test", "A window with a lens in it — output captured once and compared against ever after",
    ["test", "snapshot", "compare"], [], ["snapshot test", "snapshot testing", "golden file", "approval test"],
    "window", [window_(), ...targetMark(SMALL, 13)]),
  c("visual-diff", "Visual diff", "A window split in two with a point each side — two renderings compared pixel by pixel",
    ["test", "visual", "diff"], [], ["visual diff", "visual regression", "screenshot diff", "pixel diff"],
    "window", [window_(), col(12, 8, 18), disc(8, 13, 1), disc(16, 13, 1)]),
  c("accessibility-test", "Accessibility test", "A person with arms out — checked for everyone who will use it",
    ["test", "accessibility", "a11y"], [], ["accessibility test", "a11y", "axe", "wcag check"],
    "person", [disc(12, 6, 2), row(10.5, 6, 18), col(12, 10.5, 15), poly([[9, 18], [12, 15], [15, 18]])]),

  /* ── Load profiles ────────────────────────────────────────────────────────────── */
  c("load-test", "Load test", "Axes with a line that ramps up, holds, and ramps down — expected traffic, applied on purpose",
    ["test", "load", "performance"], [], ["load test", "load testing", "k6", "expected load"],
    "axes", [...AXES(), poly([[7, 17], [10, 14], [16, 14], [19, 17]])]),
  c("stress-test", "Stress test", "Axes with a line that climbs off the chart — load pushed past what the system is for",
    ["test", "stress", "performance"], [], ["stress test", "stress testing", "find the breaking point", "overload"],
    "axes", [...AXES(), poly([[7, 17], [10, 17], [19, 8]])]),
  c("soak-test", "Soak test", "Axes with a line that rises and then holds a long while — steady load kept up for hours",
    ["test", "soak", "performance"], [], ["soak test", "endurance test", "long-running load", "memory leak hunt"],
    "axes", [...AXES(), poly([[7, 17], [9, 15], [19, 15]])]),
  c("spike-test", "Spike test", "Axes with one sharp spike — a sudden burst, then nothing",
    ["test", "spike", "performance"], [], ["spike test", "burst test", "sudden traffic", "flash crowd"],
    "axes", [...AXES(), poly([[6, 17], [8.5, 17], [13, 12.5], [17.5, 17]])]),

  /* ── Doubles ──────────────────────────────────────────────────────────────────── */
  c("stub-service", "Stub", "A machine frame with a short bar in it — a stand-in that answers with a fixed value",
    ["test", "double", "stub"], [], ["stub", "stub service", "canned response", "test stub"],
    "machine", [machine(), row(12, 9, 15)]),
  c("fake-service", "Fake", "A machine frame with a box in it — a working stand-in, simpler than the real thing",
    ["test", "double", "fake"], [], ["fake", "fake service", "in-memory implementation", "test fake"],
    "machine", [machine(), ...squareMark(SMALL, 12)]),
  c("spy-call", "Spy", "A machine frame with an eye in it — the real thing, with every call recorded",
    ["test", "double", "spy"], [], ["spy", "test spy", "record calls", "was called with"],
    "machine", [machine(), ...EYE(12)]),
  c("mock-server", "Mock", "A machine frame with quotation marks in it — a stand-in that expects to be called a certain way",
    ["test", "double", "mock"], [], ["mock", "mock server", "mock expectations", "verify calls"],
    "machine", [machine(), col(10, 8.5, 11.5), col(14, 8.5, 11.5)]),

  /* ── Test data ────────────────────────────────────────────────────────────────── */
  c("fixture-data", "Fixture", "A slab laid in a tray — the data a test starts from, prepared ahead",
    ["test", "data", "fixture"], [], ["fixture", "test fixture", "seed data", "setup data"],
    "tray", [tray(), rect(6, 5, 12, 6.5, 2)]),
  c("factory-data", "Factory", "A works with a chimney over a tray — test data made to order, one record at a time",
    ["test", "data", "factory"], [], ["factory", "test factory", "factory bot", "generate records"],
    "tray", [tray(), rect(6, 7, 12, 6.5, 2), col(16, 3.5, 7)]),
  c("test-data-builder", "Test data builder", "One block set down in a tray — test data assembled a field at a time",
    ["test", "data", "builder"], [], ["test data builder", "builder pattern", "with defaults", "object mother"],
    "tray", [tray(), rect(8.5, 5, 7, 7, 2)]),

  /* ── On the board ─────────────────────────────────────────────────────────────── */
  c("arrange-act-assert", "Arrange, act, assert", "A clipboard with three lines — set it up, do the thing, check the result",
    ["test", "pattern", "structure"], [], ["arrange act assert", "aaa", "test structure", "three parts"],
    "clipboard", [...clipboard(), ...listMark(SMALL, 13.5)]),
  c("given-when-then", "Given, when, then", "A clipboard with a staircase on it — a test told as a story, step by step",
    ["test", "pattern", "bdd"], [], ["given when then", "gherkin", "bdd", "cucumber"],
    "clipboard", [...clipboard(), poly([[8.5, 10.5], [11, 10.5], [11, 13.5], [13.5, 13.5], [13.5, 16.5], [16, 16.5]])]),
  c("test-pyramid", "Test pyramid", "A clipboard with rows narrowing upward — many unit tests, fewer above",
    ["test", "pyramid", "strategy"], [], ["test pyramid", "testing pyramid", "unit integration e2e", "test strategy"],
    "clipboard", [...clipboard(), row(16.5, 7, 17), row(13.5, 9, 15), row(10.5, 10.5, 13.5)]),
  c("test-report", "Test report", "A clipboard with a check on it — what ran, what passed, what did not",
    ["test", "report", "result"], [], ["test report", "junit report", "test results", "test summary"],
    "clipboard", [...clipboard(), ...check(SMALL, 13.5)]),
  c("test-history", "Test history", "A clipboard with a clock on it — how a test has done over its last runs",
    ["test", "history", "runs"], [], ["test history", "past runs", "pass rate over time", "test analytics"],
    "clipboard", [...clipboard(), ...clockMark(SMALL, 13.5)]),
  c("test-owner", "Test owner", "A clipboard with a person on it — whose name is on this test when it breaks",
    ["test", "owner", "team"], [], ["test owner", "code owner", "who owns this test", "ownership"],
    "clipboard", [...clipboard(), disc(12, 11.5, 2), arc(12, 18, 3.5, 180, 360)]),
  c("dependency-audit", "Dependency audit", "A clipboard with a shield on it — every package checked against known problems",
    ["quality", "dependency", "audit"], [], ["dependency audit", "npm audit", "vulnerable packages", "sbom check"],
    "clipboard", [...clipboard(), ...shieldMark(SMALL, 13.5)]),

  /* ── How it ran ───────────────────────────────────────────────────────────────── */
  c("test-retry", "Test retry", "The run card with an arrow looping back — a failed test given another go",
    ["test", "retry", "run"], [], ["test retry", "rerun failed", "retry flaky", "second attempt"],
    "window", [...runCard(), poly([[9, 18.5], [9, 13.5], [15, 13.5], [15, 18.5]]), poly([[12.5, 16], [15, 18.5], [17.5, 16]])]),
  c("test-quarantine", "Test quarantine", "The run card with a box in it — a flaky test set aside so it cannot block the rest",
    ["test", "quarantine", "flaky"], [], ["test quarantine", "quarantined test", "isolate flaky", "muted test"],
    "window", [...runCard(), ...squareMark(SMALL, 16)]),
  c("test-order", "Test order", "The run card with three lines — tests run in a fixed sequence",
    ["test", "order", "sequence"], [], ["test order", "ordered tests", "sequence", "run in order"],
    "window", [...runCard(), ...listMark(SMALL, 16)]),
  c("test-parallel", "Parallel tests", "The run card with three bars side by side — tests run at the same time",
    ["test", "parallel", "run"], [], ["parallel tests", "run in parallel", "workers", "concurrent tests"],
    "window", [...runCard(), col(9, 13, 19), col(12, 13, 19), col(15, 13, 19)]),
  c("test-timeout-q", "Test timeout", "The run card with an hourglass — a test stopped for taking too long",
    ["test", "timeout", "run"], [], ["test timeout", "timed out", "slow test", "time limit"],
    "window", [...runCard(), poly([[10, 14], [14, 14], [10, 18], [14, 18]], true)]),
  c("test-skip", "Skip test", "The run card with a skip mark — a test passed over without running",
    ["test", "skip", "run"], [], ["skip test", "skipped", "xit", "pending test"],
    "window", [...runCard(), poly([[9.5, 13.5], [12, 16], [9.5, 18.5]]), col(14.5, 13.5, 18.5)]),
  c("test-focus", "Focus test", "The run card with a target — only this test, for now",
    ["test", "focus", "run"], [], ["focus test", "only", "fit", "run one test"],
    "window", [...runCard(), ...targetMark(SMALL, 16)]),

  /* ── Reading the code ─────────────────────────────────────────────────────────── */
  c("coverage-line", "Line coverage", "A bracket pair with a line and a check under it — this line ran",
    ["coverage", "line", "test"], [], ["line coverage", "statement coverage", "covered lines", "lcov"],
    "bracket", [...brackets(), row(10, 8, 16), poly([[9, 14], [11, 16], [15, 12]])]),
  c("coverage-branch", "Branch coverage", "A bracket pair with a fork in it — both sides of every if, run",
    ["coverage", "branch", "test"], [], ["branch coverage", "condition coverage", "both branches", "decision coverage"],
    "bracket", [...brackets(), poly([[12, 7], [12, 11], [8, 15]]), poly([[12, 11], [16, 15]])]),
  c("coverage-gap", "Coverage gap", "A bracket pair with a line and a cross under it — the part no test reaches",
    ["coverage", "gap", "test"], [], ["coverage gap", "uncovered lines", "untested code", "missing coverage"],
    "bracket", [...brackets(), row(9, 8, 16), poly([[10.5, 12.5], [13.5, 15.5]]), poly([[13.5, 12.5], [10.5, 15.5]])]),
  c("coverage-trend", "Coverage trend", "A bracket pair with three bars climbing — coverage over time",
    ["coverage", "trend", "test"], [], ["coverage trend", "coverage over time", "coverage history", "coverage chart"],
    "bracket", [...brackets(), col(9, 13, 16), col(12, 11, 16), col(15, 9, 16)]),
  c("mutation-score", "Mutation score", "A bracket pair with a target in it — how many planted bugs the tests caught",
    ["test", "mutation", "score"], [], ["mutation score", "mutation testing", "killed mutants", "stryker"],
    "bracket", [...brackets(), ...targetMark(SMALL, 12)]),
  c("code-smell", "Code smell", "A bracket pair with a wisp in it — code that works but tells you something is off",
    ["quality", "smell", "refactor"], [], ["code smell", "smelly code", "needs refactor", "anti-pattern"],
    "bracket", [...brackets(), WISP(10.5)]),
  c("cyclomatic-complexity", "Cyclomatic complexity", "A bracket pair with a decision diamond and a path out — how many ways through a function",
    ["quality", "complexity", "metric"], [], ["cyclomatic complexity", "complexity score", "too many branches", "mccabe"],
    "bracket", [...brackets(), poly([[12, 7], [15, 10], [12, 13], [9, 10]], true), col(12, 13, 17)]),
  c("duplication-check", "Duplication check", "A bracket pair with the same line twice, one shifted — code copied where it should have been shared",
    ["quality", "duplication", "dry"], [], ["duplication check", "duplicate code", "copy paste detector", "dry"],
    "bracket", [...brackets(), row(10, 8, 14), row(14, 10, 16)]),
  c("lint-rule", "Lint rule", "A bracket pair with a line and a squiggle under it — the rule that underlines it",
    ["quality", "lint", "rule"], [], ["lint rule", "eslint rule", "linter", "style rule"],
    "bracket", [...brackets(), row(9, 8, 16), WISP(12.5)]),
  c("format-check", "Format check", "A bracket pair with lines set in from the margin — code laid out the way the formatter wants",
    ["quality", "format", "style"], [], ["format check", "prettier check", "formatting", "gofmt"],
    "bracket", [...brackets(), row(9, 9, 15), row(12, 10.5, 15), row(15, 9, 15)]),
  c("static-analysis", "Static analysis", "A bracket pair with an eye in it — code read for bugs without being run",
    ["quality", "static", "analysis"], [], ["static analysis", "sast", "code scanning", "analyzer"],
    "bracket", [...brackets(), ...EYE(12)]),
  c("dead-code-check", "Dead code check", "A bracket pair with a line struck through — code nothing calls any more",
    ["quality", "dead-code", "unused"], [], ["dead code", "unused code", "unreachable", "knip"],
    "bracket", [...brackets(), row(12, 9, 15), poly([[9, 15], [15, 9]])]),
  c("review-comment", "Review comment", "A bracket pair with a speech bubble in it — a note left on a line of code",
    ["quality", "review", "comment"], [], ["review comment", "code review comment", "inline comment", "suggestion"],
    "bracket", [...brackets(), poly([[9, 9], [15, 9], [15, 13], [11.5, 13], [9, 15.5]], true)]),
  c("baseline-approve", "Approve baseline", "A bracket pair with a check and a line drawn under it — the current state accepted as the new normal",
    ["quality", "baseline", "approve"], [], ["approve baseline", "accept snapshot", "update baseline", "new golden"],
    "bracket", [...brackets(), poly([[9, 11], [11, 13], [15, 9]]), row(16, 9, 15)]),
];
