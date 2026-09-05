/**
 * R18 · AI: safety, alignment & evaluation — what a model must not do, how well it does
 * what it should, and who decides.
 *
 * The judge is a scale, not a gavel: the balance `bias` draws, with a weight in the pan
 * that tells which way it went. What is scored is written on the clipboard. What the
 * model says is the speech bubble. What is measured is a line on the axes. What is
 * broken into is the open padlock; what is tested is the flask; what is labelled is
 * the tag.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { alarm, clipboard, cycle, folder, machine, machineWide, shield, tray } from "../bodies.ts";
import {
  SMALL, check, coinMark, diamondMark, flagMark, searchMark, shieldMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "ai", subcategory: "safety", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The balance `bias` draws: beam, two pans, post and foot. A weight sits in a pan at (6|18, 8.5). */
const SCALE = () => [row(7, 3, 21), arc(6, 7, 3, 0, 180), arc(18, 7, 3, 0, 180), col(12, 7, 19), row(19, 8, 16)];
/** The speech bubble `message` draws. The hollow is x 3..21, y 5..16; marks at cy 10.5. */
const BUBBLE = () => [frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]])];
/** The padlock with its shackle lifted clear. Marks sit at cy 15.5. */
const OPENLOCK = () => [rect(5, 9.5, 14, 12, 2), arc(12, 7, 4, 180, 360)];
/** Two rails: what guardrails are. The lane between is x 7..17. */
const RAILS = () => [col(5, 4, 20), col(19, 4, 20)];
/** The flask `experiment` draws. The bulb is x 5..19, y 11..18. */
const FLASK = () => poly([[9, 3], [9, 10], [4, 15], [4, 19], [20, 19], [20, 15], [15, 10], [15, 3]], true);
/** The tag `tag` draws, hole and all. Its hollow holds a mark at (12, 14). */
const TAG = () => [poly([[3, 6], [13, 6], [21, 14], [13, 22], [3, 22]], true), disc(7, 10, 1)];
/** A receipt: the tape logs and bills are printed on. Marks at cy 10. */
const RECEIPT = () =>
  raw("M6 2H18A2 2 0 0 1 20 4V19L18 17L16 19L14 17L12 19L10 17L8 19L6 17L4 19V4A2 2 0 0 1 6 2Z",
    "a receipt: a rounded head and a foot torn along a zigzag", true);
/** The eye: the two lids `eye-off` draws. The opening is x 4..20, y 7..17. */
const EYE = () => [arc(12, 19.5, 12.5, 216.87, 323.13), arc(12, 4.5, 12.5, 36.87, 143.13)];
/** The set's axes. The plot is x 6..20, y 5..18. */
const AXES = () => [col(4, 4, 20), row(20, 4, 20)];
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The set's bolt, 2.5 wide, with its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);

export const BATCH_105: Icon[] = [
  /* ── Broken into ──────────────────────────────────────────────────────────────── */
  c("jailbreak-attempt", "Jailbreak attempt", "An open lock with a bolt in it — a prompt written to get past what the model refuses",
    ["jailbreak", "attack", "prompt"], [], ["jailbreak attempt", "jailbreak prompt", "bypass safety", "dan prompt"],
    "lock", [...OPENLOCK(), BOLT(13.5, 13)]),
  c("specification-gaming", "Specification gaming", "An open lock with a check in it — the test passed by a door nobody meant to leave open",
    ["alignment", "gaming", "reward"], [], ["specification gaming", "spec gaming", "letter not spirit", "loophole"],
    "lock", [...OPENLOCK(), ...check(SMALL, 15.5)]),
  c("prompt-injection-block", "Prompt injection blocked", "The wide machine with a bolt stopped at a line — an instruction smuggled in, and not obeyed",
    ["injection", "block", "defence"], [], ["prompt injection blocked", "injection defence", "instruction hierarchy", "blocked injection"],
    "machine", [machineWide(), BOLT(13.5, 8), row(15, 8, 16)]),
  c("adversarial-input", "Adversarial input", "The wide machine with an arrow that turns into a bolt — input built to make the model fail",
    ["adversarial", "input", "attack"], [], ["adversarial input", "adversarial prompt", "adversarial example", "crafted input"],
    "machine", [machineWide(), ...ARROW_R(12, 5, 9), BOLT(15.5, 9.5)]),

  /* ── Between the rails ────────────────────────────────────────────────────────── */
  c("guardrail-input", "Input guardrail", "Two rails with an arrow entering between them — what comes in, checked before the model sees it",
    ["guardrail", "input", "filter"], [], ["input guardrail", "input filter", "pre-check", "input moderation"],
    "rails", [...RAILS(), ...ARROW_R(12, 7, 13), disc(16, 12, 1)]),
  c("guardrail-output", "Output guardrail", "Two rails with an arrow leaving between them — what goes out, checked before the user sees it",
    ["guardrail", "output", "filter"], [], ["output guardrail", "output filter", "post-check", "response moderation"],
    "rails", [...RAILS(), disc(8, 12, 1), ...ARROW_R(12, 10.5, 17)]),

  /* ── What the model says ──────────────────────────────────────────────────────── */
  c("refusal-response", "Refusal", "A speech bubble with a flat line in it — the model declining to answer",
    ["refusal", "response", "safety"], [], ["refusal response", "model refuses", "declined request", "i can't help with that"],
    "window", [...BUBBLE(), row(10.5, 8, 16)]),
  c("safe-completion", "Safe completion", "A speech bubble with a shield in it — an answer given, kept within the lines",
    ["completion", "safe", "response"], [], ["safe completion", "safe response", "helpful and harmless", "guarded answer"],
    "window", [...BUBBLE(), ...shieldMark(SMALL, 10.5)]),
  c("toxicity-score", "Toxicity score", "A speech bubble with a hazard diamond in it — how harmful what was said is",
    ["toxicity", "score", "moderation"], [], ["toxicity score", "toxicity classifier", "harmful content score", "perspective api"],
    "window", [...BUBBLE(), ...diamondMark(SMALL, 10.5)]),
  c("abstain-answer", "Abstain", "A speech bubble with a shrug in it — the model saying it does not know",
    ["abstain", "response", "uncertainty"], [], ["abstain", "i don't know", "decline to answer", "abstention"],
    "window", [...BUBBLE(), poly([[9, 13], [12, 10], [15, 13]])]),
  c("uncertainty-flag", "Uncertainty flag", "A speech bubble with a question mark in it — an answer the model marks as unsure",
    ["uncertainty", "flag", "confidence"], [], ["uncertainty flag", "low confidence", "unsure answer", "flag uncertain"],
    "window", [...BUBBLE(), arc(12, 9, 2.5, 180, 90), disc(12, 14, 1)]),
  c("groundedness-score", "Groundedness score", "A speech bubble with a post standing on the ground — how much of the answer rests on the sources",
    ["groundedness", "score", "rag"], [], ["groundedness score", "grounded answer", "attribution score", "faithfulness"],
    "window", [...BUBBLE(), row(13.5, 8, 16), col(12, 7.5, 12)]),
  c("consistency-check", "Consistency check", "A speech bubble with an equals sign — the same question asked twice, answered the same",
    ["consistency", "check", "evaluation"], [], ["consistency check", "self-consistency", "same answer twice", "stable output"],
    "window", [...BUBBLE(), row(8.5, 9, 15), row(12.5, 9, 15)]),
  c("canary-prompt", "Canary prompt", "A speech bubble with a flag in it — a prompt planted so its answer shows up where it should not",
    ["canary", "prompt", "leak"], [], ["canary prompt", "canary string", "leak detection prompt", "planted prompt"],
    "window", [...BUBBLE(), ...flagMark(SMALL, 10.5)]),

  /* ── On the scale ─────────────────────────────────────────────────────────────── */
  c("judge-model", "Judge model", "A scale come down on one side — a model that weighs two answers and picks one",
    ["judge", "model", "evaluation"], [], ["judge model", "llm as judge", "model grader", "pairwise judge"],
    "figure", [...SCALE(), disc(18, 8.5, 1)]),
  c("human-preference", "Human preference", "A scale tipped by one weight — the answer a person liked better",
    ["preference", "human", "rlhf"], [], ["human preference", "preference data", "chosen vs rejected", "rlhf label"],
    "figure", [...SCALE(), disc(6, 8.5, 1)]),

  /* ── On the clipboard ─────────────────────────────────────────────────────────── */
  c("judge-rubric", "Judge rubric", "A clipboard with a small scale on it — what the judge is told to weigh",
    ["judge", "rubric", "criteria"], [], ["judge rubric", "grading rubric", "judge instructions", "scoring criteria"],
    "clipboard", [...clipboard(), row(10.5, 8, 16), col(12, 12, 16.5), arc(9, 11.5, 2, 0, 180), arc(15, 11.5, 2, 0, 180)]),
  c("bias-audit", "Bias audit", "A clipboard with two groups' bars under one line — whether the model treats them the same",
    ["bias", "audit", "fairness"], [], ["bias audit", "fairness audit", "disparity check", "bias evaluation"],
    "clipboard", [...clipboard(), row(11, 8, 16), col(9, 13.5, 17), col(15, 13.5, 17)]),
  c("chain-verify", "Chain verification", "A clipboard with two checks in a row — each step of the reasoning checked in turn",
    ["verify", "chain", "reasoning"], [], ["chain verification", "step verification", "verify reasoning", "process reward"],
    "clipboard", [...clipboard(), poly([[8, 11], [10, 13], [13, 10]]), poly([[8, 15], [10, 17], [13, 14]])]),
  c("rubric-score", "Rubric score", "A clipboard with criteria and a mark against each — a score built up line by line",
    ["rubric", "score", "grading"], [], ["rubric score", "rubric grading", "criteria scores", "per-criterion"],
    "clipboard", [...clipboard(), row(11, 9, 13), disc(15.5, 11, 1), row(15, 9, 13), disc(15.5, 15, 1)]),
  c("annotation-task", "Annotation task", "A clipboard with an item, its label and a tick — one thing labelled by a person",
    ["annotation", "task", "label"], [], ["annotation task", "labelling task", "human annotation", "data labelling"],
    "clipboard", [...clipboard(), disc(9, 11, 1), row(11, 11, 15), poly([[8.5, 15], [10.5, 17], [14.5, 13]])]),
  c("inter-annotator", "Inter-annotator agreement", "A clipboard with two lines that match — how often two labellers say the same",
    ["annotation", "agreement", "kappa"], [], ["inter-annotator agreement", "cohen's kappa", "annotator agreement", "label agreement"],
    "clipboard", [...clipboard(), row(11, 8, 16), row(15, 8, 16)]),
  c("benchmark-suite", "Benchmark suite", "A clipboard with bars on it — the set of tests a model's score comes from",
    ["benchmark", "suite", "evaluation"], [], ["benchmark suite", "eval benchmarks", "standard benchmarks", "mmlu"],
    "clipboard", [...clipboard(), col(9, 11, 16), col(12, 9, 16), col(15, 13, 16)]),
  c("eval-slice", "Eval slice", "A clipboard with brackets on it — one part of the eval, looked at on its own",
    ["evaluation", "slice", "subset"], [], ["eval slice", "evaluation subset", "slice of eval", "subgroup eval"],
    "clipboard", [...clipboard(), poly([[10.5, 10], [8, 10], [8, 17], [10.5, 17]]), poly([[13.5, 10], [16, 10], [16, 17], [13.5, 17]])]),
  c("failure-taxonomy", "Failure taxonomy", "A clipboard with a tree on it — the ways a model fails, sorted into kinds",
    ["failure", "taxonomy", "analysis"], [], ["failure taxonomy", "error categories", "failure modes", "failure classes"],
    "clipboard", [...clipboard(), disc(12, 10.5, 1), poly([[11, 11.5], [8.5, 14]]), poly([[13, 11.5], [15.5, 14]])]),
  c("error-analysis", "Error analysis", "A clipboard with a lens on it — the wrong answers, looked at one by one",
    ["error", "analysis", "evaluation"], [], ["error analysis", "look at failures", "inspect errors", "qualitative analysis"],
    "clipboard", [...clipboard(), ...searchMark(SMALL, 13.5)]),
  c("eval-report", "Eval report", "A clipboard with a line and a check under it — the results, written up",
    ["evaluation", "report", "results"], [], ["eval report", "evaluation report", "model report card", "results summary"],
    "clipboard", [...clipboard(), row(10.5, 9, 15), poly([[9, 15], [11, 17], [15, 13]])]),

  /* ── On the axes ──────────────────────────────────────────────────────────────── */
  c("fairness-metric", "Fairness metric", "Axes with two bars the same height — one number for whether groups are treated alike",
    ["fairness", "metric", "bias"], [], ["fairness metric", "equalised odds", "fairness score", "group fairness"],
    "axes", [...AXES(), col(9, 10, 18), col(15, 10, 18)]),
  c("demographic-parity", "Demographic parity", "Axes with three bars the same height — the same rate for every group",
    ["fairness", "parity", "bias"], [], ["demographic parity", "statistical parity", "equal rates", "parity check"],
    "axes", [...AXES(), col(8, 11, 18), col(12, 11, 18), col(16, 11, 18)]),
  c("calibration-curve", "Calibration curve", "Axes with the diagonal and points either side of it — whether confidence matches accuracy",
    ["calibration", "curve", "confidence"], [], ["calibration curve", "reliability diagram", "expected calibration error", "calibration plot"],
    "axes", [...AXES(), poly([[7, 17], [17, 7]]), disc(9, 10, 1), disc(15, 14, 1)]),
  c("confidence-threshold", "Confidence threshold", "Axes with a line and points above and below it — answers kept only when the model is sure enough",
    ["confidence", "threshold", "filter"], [], ["confidence threshold", "min confidence", "confidence cutoff", "selective prediction"],
    "axes", [...AXES(), row(10, 6, 19), disc(9, 14, 1), disc(13, 7, 1), disc(17, 15, 1)]),
  c("slice-analysis", "Slice analysis", "Axes split by a line with a point each side — the score, broken down by group",
    ["evaluation", "slice", "analysis"], [], ["slice analysis", "per-group performance", "subgroup analysis", "disaggregated metrics"],
    "axes", [...AXES(), col(12, 6, 18), disc(8, 14, 1), disc(16, 10, 1)]),
  c("alignment-tax", "Alignment tax", "Axes with a line that steps down — what a model gives up in capability to stay safe",
    ["alignment", "tax", "tradeoff"], [], ["alignment tax", "safety tax", "capability tradeoff", "cost of alignment"],
    "axes", [...AXES(), poly([[7, 10], [11, 10], [14, 13], [19, 13]])]),
  c("refusal-rate", "Refusal rate", "Axes with three short bars — how often the model declines",
    ["refusal", "rate", "metric"], [], ["refusal rate", "over-refusal", "decline rate", "refusal metric"],
    "axes", [...AXES(), col(8, 15, 18), col(12, 15, 18), col(16, 15, 18)]),

  /* ── Elsewhere ────────────────────────────────────────────────────────────────── */
  c("hallucination-detect", "Hallucination detection", "An eye seeing a wisp — a claim the sources never made, caught",
    ["hallucination", "detect", "factuality"], [], ["hallucination detection", "detect hallucination", "unsupported claim", "confabulation"],
    "eye", [...EYE(), poly([[8, 13.5], [10.5, 11], [13, 13.5], [15.5, 11]])]),
  c("factuality-test", "Factuality test", "The flask with a check in it — the model's claims put to the test",
    ["factuality", "test", "evaluation"], [], ["factuality test", "fact check eval", "truthfulness", "truthfulqa"],
    "figure", [FLASK(), poly([[9, 15], [11, 17], [15, 13]])]),
  c("contamination-check", "Contamination check", "The flask with a drop that should not be there — test data found in the training set",
    ["contamination", "check", "benchmark"], [], ["contamination check", "data contamination", "test set leakage", "benchmark contamination"],
    "figure", [FLASK(), row(13, 9, 15), disc(12, 16, 1)]),
  c("leakage-check", "Leakage check", "The flask with something seeping below the line — labels that crept into the inputs",
    ["leakage", "check", "training"], [], ["leakage check", "label leakage", "target leakage", "train-test leakage"],
    "figure", [FLASK(), row(12.5, 9, 15), poly([[9.5, 14.5], [12, 17], [14.5, 14.5]])]),
  c("label-quality", "Label quality", "A tag with a set stone on it — how good the labels are",
    ["label", "quality", "annotation"], [], ["label quality", "annotation quality", "noisy labels", "label accuracy"],
    "object", [...TAG(), ...diamondMark(SMALL, 14)]),
  c("safety-category", "Safety category", "A tag with a shield on it — the kind of harm a piece of content is filed under",
    ["safety", "category", "moderation"], [], ["safety category", "harm category", "content category", "moderation class"],
    "object", [...TAG(), ...shieldMark(SMALL, 14)]),
  c("severity-label", "Severity label", "A tag with two chevrons on it — how bad, on a scale",
    ["severity", "label", "moderation"], [], ["severity label", "severity level", "harm severity", "severity tier"],
    "object", [...TAG(), poly([[9.5, 13.5], [12, 11], [14.5, 13.5]]), poly([[9.5, 17.5], [12, 15], [14.5, 17.5]])]),
  c("gold-set", "Gold set", "A coin landing in a tray — the examples whose answers are known to be right",
    ["gold", "dataset", "evaluation"], [], ["gold set", "gold standard", "ground truth set", "golden examples"],
    "tray", [tray(), ...coinMark(SMALL, 8.5)]),
  c("human-review-queue", "Human review queue", "A head waiting over a tray — outputs lined up for a person to look at",
    ["review", "queue", "human"], [], ["human review queue", "review queue", "escalated for review", "manual review"],
    "tray", [tray(), disc(12, 7, 2), row(11, 9, 15)]),
  c("eval-trace", "Eval trace", "A receipt with a check on it — the log of a run, with its verdict",
    ["evaluation", "trace", "log"], [], ["eval trace", "evaluation log", "run trace", "scored trace"],
    "receipt", [RECEIPT(), ...check(SMALL, 10)]),
  c("eval-cost", "Eval cost", "A receipt with a coin on it — what an evaluation run costs to make",
    ["evaluation", "cost", "budget"], [], ["eval cost", "evaluation cost", "cost per eval", "judge cost"],
    "receipt", [RECEIPT(), ...coinMark(SMALL, 10)]),
  c("eval-dataset", "Eval dataset", "A folder with bars in it — the examples a score is measured on",
    ["evaluation", "dataset", "examples"], [], ["eval dataset", "evaluation set", "test set", "held-out data"],
    "folder", [folder(), col(9, 11, 17), col(12, 9, 17), col(15, 12, 17)]),
  c("reward-hacking", "Reward hacking", "A machine frame with the reward arrow struck through — a high score reached by cheating",
    ["reward", "hacking", "alignment"], [], ["reward hacking", "reward exploitation", "gaming the reward", "goodhart"],
    "machine", [machine(), col(12, 10, 16), poly([[9, 11], [12, 8], [15, 11]]), poly([[8, 16], [16, 8]])]),
  c("oversight-loop", "Oversight loop", "The rotation loop with an eye in it — a person looking, every time round",
    ["oversight", "loop", "human"], [], ["oversight loop", "human oversight", "monitoring loop", "supervised operation"],
    "rotation", [...cycle(), arc(12, 13, 4, 200, 340), disc(12, 13, 2)]),
  c("escalation-human", "Escalate to human", "The alarm bell with a head in it — the case handed to a person",
    ["escalation", "human", "handoff"], [], ["escalate to human", "human handoff", "human in the loop", "hand to agent"],
    "bell", [...alarm(), disc(12, 10, 2), row(14.5, 9, 15)]),
  c("policy-violation", "Policy violation", "A shield with a bar broken in two — a rule the output crossed",
    ["policy", "violation", "moderation"], [], ["policy violation", "content policy violation", "rule broken", "violates usage policy"],
    "shield", [shield(), col(12, 7, 10), col(12, 12.5, 15.5)]),
];
