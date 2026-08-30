/**
 * Batch 45 — the everyday nouns: server, shell, script, window, widget, warehouse.
 *
 * These are the words the taxonomy leans on hardest, drawn last on purpose: by now the
 * vocabulary decides them. A server is the tower `mcp-server` already speaks, a shell is
 * `command` inside a frame, a warehouse is the tray with more trays.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { SMALL, check } from "../marks.ts";
import { machine, page, server as serverBody } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_45: Icon[] = [
  /* ── The everyday nouns ───────────────────────────────────────────────────────── */

  {
    slug: "server", category: "cloud", subcategory: "compute",
    name: "Server", description: "A server — the machine that answers requests, the backend host",
    tags: ["host", "backend", "tower"], family: "tower",
    aliases: ["host"], keywords: ["backend", "host", "rack unit", "answers requests"],
    shapes: [rect(4, 2, 16, 8.5, 2), disc(8, 6, 1), rect(4, 13.5, 16, 8.5, 2), disc(8, 18, 1)],
  },
  {
    slug: "shell", category: "devtools", subcategory: "terminal",
    name: "Shell", description: "A shell — where you talk to the machine, a bash prompt or a terminal",
    tags: ["terminal", "bash", "prompt"], family: "window",
    aliases: ["bash"], keywords: ["terminal", "bash", "zsh", "command line", "console"],
    // The bare prompt, no box: `terminal` owns the boxed one, and three icons were
    // wearing it. A shell IS the prompt.
    shapes: [poly([[4, 5], [11, 12], [4, 19]]), row(19, 14, 21)],
  },
  {
    slug: "script", category: "devtools", subcategory: "terminal",
    name: "Script", description: "A script — commands saved to a file so they can run again later",
    tags: ["file", "batch", "saved"], family: "page",
    aliases: [], keywords: ["shell script", "batch file", "saved commands", "sh"],
    shapes: [page(), poly([[9, 9], [12, 12], [9, 15]]), row(17, 8, 14)],
  },
  {
    slug: "window", category: "interface", subcategory: "layout",
    name: "Window", description: "A window — one app's frame on the screen, a pane you can move and resize",
    tags: ["frame", "app", "pane"], family: "window",
    aliases: [], keywords: ["app window", "frame", "titlebar", "pane"],
    shapes: [rect(2, 4, 20, 16, 2), row(8, 2, 22), disc(5.5, 6, 1)],
  },
  {
    slug: "widget", category: "interface", subcategory: "layout",
    name: "Widget", description: "A widget — a small tile or card that shows one thing on a dashboard",
    tags: ["tile", "card", "mini"], family: "window",
    aliases: [], keywords: ["dashboard widget", "tile", "small card", "at a glance"],
    shapes: [rect(2, 2, 12, 12, 2), rect(17, 2, 5, 5, 2.5), rect(17, 9, 5, 5, 2.5), rect(2, 17, 12, 5, 2.5), rect(17, 17, 5, 5, 2.5)],
  },
  {
    slug: "warehouse", category: "data", subcategory: "storage",
    name: "Warehouse", description: "A warehouse — everything shelved in columnar storage and ready to query",
    tags: ["analytics", "columnar", "store"], family: "figure",
    aliases: [], keywords: ["data warehouse", "columnar", "bigquery", "snowflake style"],
    shapes: [poly([[2, 20], [2, 10], [5, 7], [19, 7], [22, 10], [22, 20]]), rect(6, 12, 5, 8, 2.5), rect(14, 12, 5, 8, 2.5)],
  },
  {
    slug: "workspace", category: "interface", subcategory: "layout",
    name: "Workspace", description: "A workspace — your desk as you left it, an environment arranged and remembered",
    tags: ["environment", "setup", "arranged"], family: "window",
    aliases: [], keywords: ["environment", "project space", "arranged", "your setup"],
    shapes: [rect(2, 4, 20, 16, 2), col(9, 4, 20), row(11, 9, 22), disc(5.5, 8, 1), disc(5.5, 12, 1)],
  },

  /* ── Code, versioned and tagged ───────────────────────────────────────────────── */

  {
    slug: "version-control", category: "devtools", subcategory: "version-control",
    name: "Version control", description: "Version control — every change kept as history, git commits you can go back to",
    tags: ["git", "history", "commits"], family: "figure",
    aliases: [], keywords: ["git", "history", "commits", "kept changes"],
    shapes: [disc(6, 6, 2), disc(6, 18, 2), disc(18, 12, 2), col(6, 8, 16), poly([[8, 6], [12, 6], [16, 10]])],
  },
  {
    slug: "tag-git", category: "devtools", subcategory: "version-control",
    name: "Git tag", description: "A git tag — a commit with a name on it, a pinned version label",
    tags: ["label", "version", "pin"], family: "figure",
    aliases: [], keywords: ["git tag", "named commit", "version label"],
    shapes: [disc(6, 12, 2), row(12, 8, 13), poly([[13, 8], [18, 8], [22, 12], [18, 16], [13, 16]], true)],
  },
  {
    slug: "version-bump", category: "devtools", subcategory: "package",
    name: "Version bump", description: "Version bump — one number up in semver, a raised release version",
    tags: ["increment", "semver", "raise"], family: "figure",
    aliases: [], keywords: ["bump version", "increment", "semver", "1.2 to 1.3"],
    // A baseline under boxes that sit on it is collinear ink — the boxes cancel it. The two
    // heights carry the meaning; the arrow in the taller one says which way it went.
    shapes: [rect(2, 10, 7, 9, 2), rect(13, 4, 7, 15, 2), col(16.5, 8, 15), poly([[14.5, 10], [16.5, 8], [18.5, 10]])],
  },
  {
    slug: "mock", category: "devtools", subcategory: "testing",
    name: "Mock", description: "A mock — a fake that stands in for the real dependency in a test",
    tags: ["fake", "stub", "double"], family: "window",
    aliases: ["stub"], keywords: ["fake", "stub", "test double", "stands in"],
    shapes: [rect(2, 4, 9, 16, 2), row(9, 4, 11), poly([[15, 6], [22, 6]]), poly([[15, 12], [22, 12]]), poly([[15, 18], [22, 18]])],
  },
  {
    slug: "test-run", category: "devtools", subcategory: "testing",
    name: "Test run", description: "A test run — the suite is going, tests in progress with results coming in",
    tags: ["running", "suite", "progress"], family: "page",
    aliases: [], keywords: ["running tests", "suite in progress", "watch tests"],
    shapes: [page(), poly([[9, 9], [12, 12], [9, 15]], true), row(18, 8, 16)],
  },

  /* ── Data shaped and shipped ──────────────────────────────────────────────────── */

  {
    slug: "transform", category: "data", subcategory: "transform",
    name: "Transform", description: "Transform — data goes in one shape and comes out another, converted and reshaped",
    tags: ["convert", "reshape", "change"], family: "figure",
    aliases: [], keywords: ["convert", "reshape", "map", "one form to another"],
    shapes: [rect(2, 4, 8, 8, 2), row(12, 8, 16), poly([[13, 9], [16, 12], [13, 15]]), disc(17, 16, 4)],
  },
  {
    slug: "upsert", category: "data", subcategory: "transform",
    name: "Upsert", description: "Upsert — update the row if it exists, insert it if it is new",
    tags: ["merge", "insert", "update"], family: "figure",
    aliases: [], keywords: ["insert or update", "merge row", "idempotent write"],
    shapes: [
      row(14, 3, 21), row(18, 3, 21),
      col(9, 3, 8), poly([[6, 6], [9, 9], [12, 6]]),
      col(17, 3, 7), row(5, 15, 19),
    ],
  },
  {
    slug: "stream-job", category: "data", subcategory: "streaming",
    name: "Stream job", description: "A stream job — always running and never done, continuous processing of live data",
    tags: ["continuous", "flink", "live"], family: "figure",
    aliases: [], keywords: ["streaming job", "continuous", "always on", "flink spark"],
    shapes: [rect(6, 4, 12, 9, 2), poly([[9.5, 6.5], [11.5, 8.5], [9.5, 10.5]]), row(16, 3, 9), row(16, 12, 15), row(16, 18, 21), row(20, 6, 12)],
  },
  {
    slug: "training-data", category: "ai", subcategory: "training",
    name: "Training data", description: "Training data — the labelled examples and corpus a model learned from",
    tags: ["corpus", "examples", "labelled"], family: "figure",
    aliases: [], keywords: ["dataset", "corpus", "examples", "learned from"],
    shapes: [rect(2, 3, 20, 7, 2), row(6.5, 5, 19), rect(2, 13, 9, 8, 2), poly([[13.5, 17], [16, 19.5], [20.5, 15]])],
  },

  /* ── Watching the call go through ─────────────────────────────────────────────── */

  {
    slug: "trace-request", category: "analytics", subcategory: "llm-observability",
    name: "Request trace", description: "A request trace — one call followed all the way along its path",
    tags: ["follow", "path", "journey"], family: "figure",
    aliases: [], keywords: ["follow the call", "distributed trace", "one request"],
    shapes: [disc(4, 5, 2), poly([[6, 7], [12, 13]]), disc(14, 15, 2), poly([[16, 15], [20, 15]]), disc(20, 19, 1)],
  },
  {
    slug: "top-p", category: "ai", subcategory: "inference",
    name: "Top-p", description: "Top-p — nucleus sampling that keeps just enough choices to cover the odds",
    tags: ["nucleus", "sampling", "cutoff"], family: "chart",
    aliases: ["nucleus-sampling"], keywords: ["nucleus sampling", "probability mass", "cutoff"],
    shapes: [col(5, 8, 20), col(10, 11, 20), col(15, 14, 20), poly([[3, 12], [12, 12]]), col(20, 17, 20)],
  },
  {
    slug: "toggle", category: "interface", subcategory: "action",
    name: "Toggle", description: "A toggle — on or off, a switch that flips a boolean setting either way",
    tags: ["switch", "boolean", "flip"], family: "figure",
    aliases: ["switch-ui"], keywords: ["switch", "on off", "boolean", "flip"],
    shapes: [rect(2, 7, 20, 10, 5), disc(17, 12, 3)],
  },
  {
    slug: "token-auth", category: "security", subcategory: "auth",
    name: "Token auth", description: "Token auth — the bearer string in a header that vouches for you",
    tags: ["bearer", "header", "key"], family: "figure",
    aliases: ["bearer-token"], keywords: ["bearer", "api token", "authorization header"],
    shapes: [rect(2, 8, 13, 8, 4), disc(6, 12, 1), disc(10, 12, 1), row(12, 17, 21), col(18, 12, 15), col(21, 12, 14.5)],
  },

  /* ── People and their journeys ────────────────────────────────────────────────── */

  {
    slug: "user-journey", category: "analytics", subcategory: "segment",
    name: "User journey", description: "A user journey — every step a person took through the product, their path",
    tags: ["path", "steps", "flow"], family: "figure",
    aliases: [], keywords: ["user path", "steps taken", "funnel journey"],
    shapes: [disc(4, 19, 2), poly([[6, 17], [10, 13]]), disc(12, 11, 2), poly([[14, 9], [18, 5]]), disc(20, 4, 1)],
  },
  {
    slug: "user-prompt", category: "ai", subcategory: "prompt",
    name: "User prompt", description: "A user prompt — what the person actually asked, the human turn in a chat",
    tags: ["question", "input", "human"], family: "figure",
    aliases: [], keywords: ["user message", "question", "human turn", "asked"],
    shapes: [disc(7, 8, 3), arc(7, 19, 5, 180, 360), rect(13.5, 8, 8.5, 6, 3), row(17, 13.5, 22)],
  },
  {
    slug: "wait-approval", category: "automation", subcategory: "human-loop",
    name: "Waiting for approval", description: "Waiting for approval — stopped at a gate until somebody says yes",
    tags: ["pending", "blocked", "gate"], family: "figure",
    aliases: [], keywords: ["pending approval", "blocked on human", "sign off wait"],
    shapes: [disc(9, 12, 6), poly([[9, 9], [9, 12], [11.5, 12]]), col(18, 8, 12), disc(18, 16, 1)],
  },
  {
    slug: "worker-agent", category: "agents", subcategory: "multi-agent",
    name: "Worker agent", description: "A worker agent — the one that actually does the task, the executor",
    tags: ["executor", "doer", "labour"], family: "figure",
    aliases: [], keywords: ["executor", "does the work", "task runner", "labourer"],
    // A tool on the chest merges with the chest. The worker carries the work instead.
    shapes: [disc(12, 6, 3), arc(12, 16, 5, 180, 360), rect(8, 19, 8, 3, 1.5)],
  },
];
