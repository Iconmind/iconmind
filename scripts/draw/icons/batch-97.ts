/**
 * R10 · CI/CD & release engineering — what a pipeline does to a change on its way out.
 *
 * The pipeline is a pipe: two flanges standing up, two walls between them, drawn as one
 * path so the joins are joins. A stage, a gate, a job, a person waiting to approve — all of
 * it sits inside the pipe. A build is the brick build-pass already stands on, with the
 * base under it. An agent is the machine frame. A release is the tag `release` draws; what
 * gets written about it is a page. Flags fly on the banner.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { banner, machine, page, window_ } from "../bodies.ts";
import {
  SMALL, add, check, clockMark, lockMark, off, searchMark, squareMark, tagMark, trendMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "devops", subcategory: "ci-cd", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The pipeline: flanges at x 4 and 20, walls at y 6 and 18, one path. Marks sit at cy 12. */
const PIPE = () => raw("M4 3V21M4 6H20M4 18H20M20 3V21", "a pipe: two flanges and the two walls between them");
/** The build: build-pass's brick on its base. Marks sit at cy 10. */
const BRICK = () => [rect(4, 4, 16, 12, 2), row(19, 7, 17)];
/** The release: the tag `release` draws, open at the point. Its hollow is x 10..19. */
const RELEASE = () => poly([[4, 12], [10, 6], [20, 6], [20, 18], [10, 18]], true);
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];

export const BATCH_97: Icon[] = [
  /* ── Inside the pipeline ──────────────────────────────────────────────────────── */
  c("pipeline-stage", "Pipeline stage", "The pipe with one block in it — a named step the change passes through",
    ["pipeline", "stage", "step"], [], ["pipeline stage", "stage", "build test deploy", "step"],
    "pipe", [PIPE(), ...squareMark(SMALL, 12)]),
  c("pipeline-gate", "Pipeline gate", "The pipe with a bar across it — a condition the change must meet to go on",
    ["pipeline", "gate", "condition"], [], ["pipeline gate", "quality gate", "promotion gate", "must pass"],
    "pipe", [PIPE(), col(12, 7.5, 16.5)]),
  c("manual-approval", "Manual approval", "The pipe with a person standing in it — a step that waits for someone to say go",
    ["pipeline", "approval", "manual"], [], ["manual approval", "approval step", "wait for approval", "human gate"],
    "pipe", [PIPE(), disc(12, 9.5, 2), arc(12, 16.5, 4, 180, 360)]),
  c("parallel-job", "Parallel jobs", "The pipe with two lanes running side by side — jobs that run at the same time",
    ["pipeline", "job", "parallel"], [], ["parallel jobs", "concurrent jobs", "run in parallel", "matrix jobs"],
    "pipe", [PIPE(), row(10, 8, 16), row(14, 8, 16)]),
  c("sequential-job", "Sequential jobs", "The pipe with three points in a row — jobs that wait for the one before",
    ["pipeline", "job", "sequential"], [], ["sequential jobs", "one after another", "serial jobs", "needs"],
    "pipe", [PIPE(), disc(8, 12, 1), disc(12, 12, 1), disc(16, 12, 1)]),
  c("job-dependency", "Job dependency", "The pipe with a point and an arrow leading from it — a job that cannot start until another ends",
    ["pipeline", "job", "dependency"], [], ["job dependency", "needs", "depends on", "upstream job"],
    "pipe", [PIPE(), disc(8, 12, 2), ...ARROW_R(12, 10, 16)]),
  c("fan-out-job", "Fan out", "The pipe with one line splitting into two — a job whose end starts several",
    ["pipeline", "job", "fan-out"], [], ["fan out", "split jobs", "one to many", "spawn jobs"],
    "pipe", [PIPE(), poly([[7, 12], [10, 12], [13, 9], [16, 9]]), poly([[10, 12], [13, 15], [16, 15]])]),
  c("fan-in-job", "Fan in", "The pipe with two lines joining into one — a job that waits for several to end",
    ["pipeline", "job", "fan-in"], [], ["fan in", "join jobs", "many to one", "wait for all"],
    "pipe", [PIPE(), poly([[8, 9], [11, 9], [14, 12], [17, 12]]), poly([[8, 15], [11, 15], [14, 12]])]),
  c("merge-queue", "Merge queue", "The pipe with three bars queued in it — changes merged one at a time, in order",
    ["pipeline", "merge", "queue"], [], ["merge queue", "merge train", "queued merges", "serialised merges"],
    "pipe", [PIPE(), col(8, 9, 15), col(12, 9, 15), col(16, 9, 15)]),
  c("pipeline-retry", "Retry pipeline", "The pipe with an arrow looping back in it — the run started over",
    ["pipeline", "retry", "rerun"], [], ["retry pipeline", "rerun", "re-run failed jobs", "retry job"],
    "pipe", [PIPE(), poly([[8.5, 14.5], [8.5, 9.5], [15.5, 9.5], [15.5, 14.5]]), poly([[13, 12], [15.5, 14.5], [18, 12]])]),
  c("stage-skip", "Skip stage", "The pipe with a skip mark in it — a stage jumped over on purpose",
    ["pipeline", "stage", "skip"], [], ["skip stage", "skipped job", "skip ci", "bypass stage"],
    "pipe", [PIPE(), poly([[9, 9], [12, 12], [9, 15]]), col(15, 9, 15)]),
  c("release-train", "Release train", "The pipe with a clock in it — releases that leave on a schedule, with whatever is ready",
    ["release", "train", "schedule"], [], ["release train", "scheduled release", "leaves on time", "release cadence"],
    "pipe", [PIPE(), ...clockMark(SMALL, 12)]),
  c("progressive-delivery", "Progressive delivery", "The pipe with bars rising in it — a change let out to more users a step at a time",
    ["deploy", "progressive", "rollout"], [], ["progressive delivery", "gradual rollout", "ramp up", "percentage rollout"],
    "pipe", [PIPE(), col(8, 12, 15), col(12, 10, 15), col(16, 8, 15)]),
  c("traffic-split", "Traffic split", "The pipe with a wide flow and a narrow one — most traffic one way, a little the other",
    ["deploy", "traffic", "split"], [], ["traffic split", "weighted routing", "90/10", "traffic shifting"],
    "pipe", [PIPE(), row(10, 8, 16), row(14, 8, 12)]),
  c("environment-promote", "Promote environment", "The pipe with an arrow rising in it — the same build moved up to the next environment",
    ["deploy", "promote", "environment"], [], ["promote environment", "dev to staging", "staging to prod", "promote build"],
    "pipe", [PIPE(), col(12, 9, 16), poly([[9.5, 11.5], [12, 9], [14.5, 11.5]])]),
  c("artifact-promote", "Promote artifact", "The pipe with a chevron lifting a bar — an artifact marked as good enough for the next stage",
    ["artifact", "promote", "pipeline"], [], ["promote artifact", "artifact promotion", "mark as release", "lift artifact"],
    "pipe", [PIPE(), poly([[9.5, 11.5], [12, 9], [14.5, 11.5]]), row(15, 9, 15)]),
  c("deploy-window", "Deploy window", "The pipe with a bracketed span in it — the hours in which a deploy is allowed",
    ["deploy", "window", "time"], [], ["deploy window", "deployment window", "allowed hours", "release window"],
    "pipe", [PIPE(), poly([[10.5, 9], [8, 9], [8, 15], [10.5, 15]]), poly([[13.5, 9], [16, 9], [16, 15], [13.5, 15]]), row(12, 10.5, 13.5)]),
  c("deploy-freeze", "Deploy freeze", "The pipe with a lock in it — no deploys until the freeze is lifted",
    ["deploy", "freeze", "lock"], [], ["deploy freeze", "deployment freeze", "code freeze", "no deploys"],
    "pipe", [PIPE(), ...lockMark(SMALL, 12)]),
  c("release-freeze-lift", "Lift freeze", "The pipe with a lock whose shackle is lifted — the freeze over, deploys allowed again",
    ["deploy", "freeze", "unlock"], [], ["lift freeze", "unfreeze", "freeze lifted", "deploys resumed"],
    "pipe", [PIPE(), poly([[9, 12], [15, 12], [15, 15], [9, 15]], true), arc(12, 10, 1.5, 180, 360)]),
  c("smoke-test", "Smoke test", "The pipe with a wisp in it — the quick check that the thing runs at all",
    ["test", "smoke", "deploy"], [], ["smoke test", "sanity check", "does it start", "quick check"],
    "pipe", [PIPE(), poly([[8, 14], [10.5, 11.5], [13, 14], [15.5, 11.5]])]),
  c("post-deploy-check", "Post-deploy check", "The pipe with a lens in it — a look at the service after the deploy lands",
    ["deploy", "check", "verify"], [], ["post-deploy check", "post deploy verification", "deploy verification", "health after deploy"],
    "pipe", [PIPE(), ...searchMark(SMALL, 12)]),
  c("rollback-auto", "Auto rollback", "The pipe with an arrow pointing back — the deploy undone by the pipeline itself when checks fail",
    ["deploy", "rollback", "auto"], [], ["auto rollback", "automatic rollback", "rollback on failure", "revert deploy"],
    "pipe", [PIPE(), row(12, 9, 17), poly([[11.5, 9.5], [9, 12], [11.5, 14.5]])]),
  c("deploy-approve", "Approve deploy", "The pipe with a check in it — a deploy given the go",
    ["deploy", "approve", "gate"], [], ["approve deploy", "deployment approved", "approve release", "go"],
    "pipe", [PIPE(), ...check(SMALL, 12)]),
  c("deploy-reject", "Reject deploy", "The pipe with a cross in it — a deploy turned back at the gate",
    ["deploy", "reject", "gate"], [], ["reject deploy", "deployment rejected", "no go", "blocked deploy"],
    "pipe", [PIPE(), ...off(SMALL, 12)]),

  /* ── Builds ───────────────────────────────────────────────────────────────────── */
  c("build-matrix", "Build matrix", "The build brick with a grid of points — one build per combination of versions",
    ["build", "matrix", "ci"], [], ["build matrix", "matrix strategy", "test matrix", "combinations"],
    "window", [...BRICK(), disc(9.5, 8, 1), disc(14.5, 8, 1), disc(9.5, 12, 1), disc(14.5, 12, 1)]),
  c("build-artifact", "Build artifact", "The build brick with a box in it — what a build leaves behind to be shipped",
    ["build", "artifact", "output"], [], ["build artifact", "build output", "binary", "bundle"],
    "window", [...BRICK(), ...squareMark(SMALL, 10)]),
  c("build-number", "Build number", "The build brick with a hash in it — the number that names one build",
    ["build", "number", "id"], [], ["build number", "build id", "run number", "#123"],
    "window", [...BRICK(), col(10, 7, 13), col(14, 7, 13), row(10, 8, 16)]),
  c("build-badge", "Build badge", "The build brick with a pill in it — the badge a readme shows for the last build",
    ["build", "badge", "status"], [], ["build badge", "status badge", "passing badge", "shields"],
    "window", [...BRICK(), rect(7, 8, 10, 4, 2)]),
  c("nightly-build", "Nightly build", "The build brick with a Z in it — the build that runs while everyone sleeps",
    ["build", "nightly", "schedule"], [], ["nightly build", "nightly", "overnight build", "daily build"],
    "window", [...BRICK(), poly([[9.5, 7.5], [14.5, 7.5], [9.5, 12.5], [14.5, 12.5]])]),
  c("scheduled-build", "Scheduled build", "The build brick with a clock in it — a build that runs on a timer, not a push",
    ["build", "schedule", "cron"], [], ["scheduled build", "cron build", "timed build", "schedule trigger"],
    "window", [...BRICK(), ...clockMark(SMALL, 10)]),
  c("incremental-build", "Incremental build", "The build brick with a plus in it — only what changed is built again",
    ["build", "incremental", "cache"], [], ["incremental build", "build only changed", "partial rebuild", "fast build"],
    "window", [...BRICK(), ...add(SMALL, 10)]),
  c("build-time-trend", "Build time trend", "The build brick with a rising trend in it — how long builds take, over time",
    ["build", "time", "trend"], [], ["build time trend", "build duration", "slow builds", "ci time"],
    "window", [...BRICK(), ...trendMark(SMALL, 10)]),
  c("flaky-job", "Flaky job", "The build brick with a zigzag in it — a job that passes and fails without a change",
    ["build", "flaky", "job"], [], ["flaky job", "flaky build", "intermittent failure", "retry until green"],
    "window", [...BRICK(), poly([[8, 12], [10.5, 9.5], [13, 12], [15.5, 9.5]])]),
  c("build-log", "Build log", "The build brick with lines in it — what the build printed while it ran",
    ["build", "log", "output"], [], ["build log", "ci log", "console output", "job log"],
    "window", [...BRICK(), row(8, 8, 16), row(11, 8, 14)]),
  c("cache-restore", "Cache restore", "The build brick with an arrow dropping into it — saved work pulled back in before the build",
    ["build", "cache", "restore"], [], ["cache restore", "restore cache", "cache hit", "reuse dependencies"],
    "window", [...BRICK(), col(12, 7, 13), poly([[9.5, 10.5], [12, 13], [14.5, 10.5]])]),
  c("cache-save", "Cache save", "The build brick with an arrow rising out of it — work saved for the next build",
    ["build", "cache", "save"], [], ["cache save", "save cache", "upload cache", "cache key"],
    "window", [...BRICK(), col(12, 7, 13), poly([[9.5, 9.5], [12, 7], [14.5, 9.5]])]),
  c("remote-cache", "Remote cache", "The build brick with a signal in it — a cache reached over the network and shared",
    ["build", "cache", "remote"], [], ["remote cache", "shared cache", "distributed cache", "cache server"],
    "window", [...BRICK(), arc(12, 13, 6, 200, 340), arc(12, 13, 3, 200, 340), disc(12, 13, 1)]),
  c("workspace-share", "Shared workspace", "The build brick with two points tied together — files handed from one job to the next",
    ["build", "workspace", "share"], [], ["shared workspace", "workspace", "pass files between jobs", "persist workspace"],
    "window", [...BRICK(), disc(8.5, 10, 1), disc(15.5, 10, 1), row(10, 9.5, 14.5)]),

  /* ── Agents ───────────────────────────────────────────────────────────────────── */
  c("build-agent", "Build agent", "A machine frame with a hammer in it — the machine that runs the build",
    ["build", "agent", "runner"], [], ["build agent", "ci agent", "build machine", "self-hosted runner"],
    "machine", [machine(), row(8, 9, 15), col(12, 8, 16)]),
  c("runner-pool", "Runner pool", "A machine frame with three points in it — the runners a job can be handed to",
    ["build", "runner", "pool"], [], ["runner pool", "agent pool", "runner group", "shared runners"],
    "machine", [machine(), disc(12, 9.5, 1), disc(9.5, 14, 1), disc(14.5, 14, 1)]),

  /* ── Releases ─────────────────────────────────────────────────────────────────── */
  c("signed-release", "Signed release", "The release tag with a check in it — a release whose signature has been verified",
    ["release", "signed", "verify"], [], ["signed release", "release signature", "verified release", "gpg signed"],
    "figure", [RELEASE(), poly([[11, 12], [13, 14], [17, 10]])]),
  c("release-candidate", "Release candidate", "The release tag with a diamond in it — the build that may become the release",
    ["release", "candidate", "rc"], [], ["release candidate", "rc", "rc1", "pre-release"],
    "figure", [RELEASE(), poly([[14, 9.5], [16.5, 12], [14, 14.5], [11.5, 12]], true)]),
  c("semantic-version", "Semantic version", "The release tag with three bars in it — major, minor and patch",
    ["release", "version", "semver"], [], ["semantic version", "semver", "major minor patch", "1.2.3"],
    "figure", [RELEASE(), col(11, 9.5, 14.5), col(14, 9.5, 14.5), col(17, 9.5, 14.5)]),
  c("release-note", "Release note", "A page with a tag and a line under it — what changed, written for the people who use it",
    ["release", "note", "changelog"], [], ["release note", "release notes", "what's new", "changes in this version"],
    "page", [page(), ...tagMark(SMALL, 10), row(17, 8, 16)]),
  c("changelog-generate", "Generate changelog", "A page with a prompt and a line — the changelog written by a command from the commits",
    ["release", "changelog", "generate"], [], ["generate changelog", "conventional commits", "auto changelog", "release please"],
    "page", [page(), poly([[8, 9], [10.5, 11.5], [8, 14]]), row(14, 12, 16)]),
  c("flag-rollout", "Flag rollout", "A flag with bars rising on it — a feature turned on for more people a step at a time",
    ["flag", "rollout", "feature"], [], ["flag rollout", "feature flag rollout", "percentage rollout", "gradual enable"],
    "flag", [...banner(), col(8, 10, 13), col(11, 8, 13), col(14, 6, 13)]),
  c("artifact-retention", "Artifact retention", "The artifact crate with an hourglass in it — how long a build's output is kept",
    ["artifact", "retention", "time"], [], ["artifact retention", "keep artifacts", "expire artifacts", "retention days"],
    "window", [frame(4, 6, 16, 14, 3, { gap: 4 }), row(10, 4, 20), poly([[10, 13], [14, 13], [10, 17], [14, 17]], true)]),

  /* ── The repository ───────────────────────────────────────────────────────────── */
  c("trunk-based", "Trunk-based", "One trunk with two short branches folding back into it — everyone commits to main",
    ["git", "trunk", "branch"], [], ["trunk-based development", "commit to main", "short-lived branches", "tbd"],
    "chain", [col(12, 3, 21), poly([[7.5, 6.5], [12, 11]]), poly([[16.5, 12.5], [12, 17]])]),
  c("monorepo-graph", "Monorepo graph", "A window showing one project over two it depends on — how the packages in a repo relate",
    ["repo", "monorepo", "graph"], [], ["monorepo graph", "project graph", "dependency graph", "nx graph"],
    "window", [window_(), disc(12, 9, 1), poly([[11, 10], [8.5, 12.5]]), poly([[13, 10], [15.5, 12.5]]), disc(8, 14, 1), disc(16, 14, 1)]),
  c("affected-projects", "Affected projects", "A window showing the graph with one node grown — the projects a change actually touches",
    ["repo", "monorepo", "affected"], [], ["affected projects", "affected", "only build what changed", "changed packages"],
    "window", [window_(), disc(12, 9, 1), poly([[11, 10], [8.5, 12.5]]), poly([[13, 10], [15.5, 12.5]]), disc(8, 14, 1), disc(16, 14.5, 2)]),
];
