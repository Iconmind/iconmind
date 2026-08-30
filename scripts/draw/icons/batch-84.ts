/**
 * Batch 84 — round 8 of the parity plan: git, clipboard and monitor.
 *
 * Git is the chain family — nodes of radius 2 on 45° and 90° lines, as git-merge and
 * branch-git draw them. The clipboard takes its mark below the clip, the monitor
 * on the screen above the stand; both at SMALL, both three units clear of the walls.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { arc, col, disc, frame, poly, rect, row } from "../forms.ts";
import { SMALL, add, check, off, pause, remove } from "../marks.ts";
import type { Icon } from "../build.ts";

const git = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], shapes: Icon["shapes"]): Icon => ({
  slug, category: "devtools", subcategory: "version-control", name, description, tags, family: "chain", aliases, keywords, shapes,
});
const CLIP = [rect(4, 5, 16, 16, 2), rect(8, 2, 8, 7, 2)];
const clip = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "file", name, description, tags, family: "window", aliases, keywords,
  shapes: [...CLIP, ...marks],
});
const SCREEN = [frame(2, 4, 20, 13, 3, { gap: 4 }), col(12, 17, 20), row(20, 7, 17)];
const mon = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "media", name, description, tags, family: "window", aliases, keywords,
  shapes: [...SCREEN, ...marks],
});
const BRANCH = [disc(7, 6, 2), col(7, 8.5, 15.5), disc(7, 18, 2), row(12, 7, 14.5), disc(17, 12, 2)];
const PR = [disc(6, 5, 2), col(6, 7.5, 16.5), disc(6, 19, 2), disc(18, 19, 2)];

export const BATCH_84: Icon[] = [
  // ── git ─────────────────────────────────────────────────────────────────────────
  git("git-branch-add", "Git branch add", "A line of commits with a plus beside it — create a new branch to work on",
    ["create", "new", "checkout"], ["git-branch-plus"], ["new branch", "create branch", "checkout -b"],
    [disc(7, 6, 2), col(7, 8.5, 15.5), disc(7, 18, 2), col(17, 9, 15), row(12, 14, 20)]),
  git("git-branch-remove", "Git branch remove", "A branch with a minus beside it — delete a branch that is done with",
    ["delete", "prune", "cleanup"], ["git-branch-minus"], ["delete branch", "prune branches", "remove branch"],
    [...BRANCH, row(6.5, 16.5, 21.5)]),
  git("git-commit-vertical", "Git commit vertical", "A commit on a vertical line — one change in the history, drawn top to bottom",
    ["history", "change", "vertical"], [], ["commit", "vertical history", "commit node"],
    [col(12, 3, 8.5), disc(12, 12, 3.5), col(12, 15.5, 21)]),
  git("git-compare", "Git compare", "Two commits with arrows between them — compare two branches or two points in history",
    ["diff", "branches", "between"], ["git-compare-arrows"], ["compare branches", "compare commits", "diff between branches"],
    [disc(6, 6, 2), disc(18, 18, 2), poly([[6, 8.5], [6, 14], [11.5, 14]]), poly([[9.5, 12], [11.5, 14], [9.5, 16]]), poly([[18, 15.5], [18, 10], [12.5, 10]]), poly([[14.5, 8], [12.5, 10], [14.5, 12]])]),
  git("git-fork", "Git fork", "One commit splitting into two — a fork, the history going two ways from here",
    ["split", "diverge", "copy"], [], ["fork repository", "diverge", "split history"],
    [disc(12, 5, 2), disc(6, 19, 2), disc(18, 19, 2), col(12, 7.5, 11), poly([[12, 11], [6.5, 16.5]]), poly([[12, 11], [17.5, 16.5]])]),
  git("git-merge-conflict", "Git merge conflict", "Two branches meeting at a cross instead of a commit — a merge that does not go through by itself",
    ["conflict", "clash", "resolve"], [], ["merge conflict", "resolve conflict", "conflicting changes"],
    [disc(6, 5, 2), disc(18, 5, 2), poly([[6, 7.5], [6, 12], [10.5, 16.5]]), poly([[18, 7.5], [18, 12], [13.5, 16.5]]), poly([[9.5, 16.5], [14.5, 21.5]]), poly([[14.5, 16.5], [9.5, 21.5]])]),
  git("git-pull-request", "Git pull request", "A branch offered back to the line it came from — a pull request, changes proposed for review",
    ["review", "propose", "pr"], ["git-pull-request-arrow"], ["pull request", "merge request", "propose changes", "open pr"],
    [...PR, poly([[18, 16.5], [18, 9], [12, 9], [9, 6]])]),
  git("git-pull-request-closed", "Git pull request closed", "A pull request ending in a cross — closed without merging, the changes turned away",
    ["closed", "rejected", "declined"], [], ["closed pull request", "rejected pr", "declined merge request"],
    [disc(6, 5, 2), col(6, 7.5, 16.5), disc(6, 19, 2), poly([[15.5, 16.5], [20.5, 21.5]]), poly([[20.5, 16.5], [15.5, 21.5]]), poly([[18, 14], [18, 9], [12, 9], [9, 6]])]),
  git("git-pull-request-draft", "Git pull request draft", "A pull request whose line is still dashed — a draft, not yet ready for review",
    ["draft", "wip", "unfinished"], [], ["draft pull request", "wip pr", "not ready for review"],
    [...PR, col(18, 12.5, 16.5), col(18, 7, 10)]),
  git("git-pull-request-create", "Git pull request create", "A pull request with a plus above it — open a new pull request from this branch",
    ["open", "new", "propose"], ["git-pull-request-create-arrow"], ["create pull request", "open pr", "new merge request"],
    [...PR, col(18, 4, 9), row(6.5, 15.5, 20.5)]),

  // ── clipboard ───────────────────────────────────────────────────────────────────
  clip("clipboard-check", "Clipboard check", "A clipboard with a check on it — the list is done, every item signed off",
    ["done", "approved", "complete"], [], ["clipboard check", "task complete", "approved list"], check(SMALL, 15)),
  clip("clipboard-copy", "Clipboard copy", "A clipboard with a second sheet on it — copy, put a duplicate on the clipboard",
    ["copy", "duplicate", "sheet"], [], ["copy to clipboard", "duplicate", "copy sheet"],
    [poly([[10, 12], [16, 12], [16, 18], [10, 18]], true)]),
  clip("clipboard-list", "Clipboard list", "A clipboard with lines on it — a list on a board, the items to work through",
    ["list", "items", "checklist"], [], ["clipboard list", "task board", "items to do"],
    [row(13, 8, 16), row(17, 8, 16)]),
  clip("clipboard-remove", "Clipboard remove", "A clipboard with a minus on it — take an item off the board",
    ["delete", "drop", "clear"], ["clipboard-minus", "clipboard-x"], ["remove from clipboard", "delete item", "clear board"], remove(SMALL, 15)),
  clip("clipboard-edit", "Clipboard edit", "A clipboard with a pencil on it — change what is written on the board",
    ["pencil", "write", "modify"], ["clipboard-pen", "clipboard-pen-line"], ["edit clipboard", "write on board", "edit list"],
    [poly([[9, 18], [9, 15.5], [13.5, 11], [16, 13.5], [11.5, 18]], true)]),
  clip("clipboard-clock", "Clipboard clock", "A clipboard with a clock on it — a board with a deadline, items due by a time",
    ["deadline", "due", "schedule"], [], ["clipboard deadline", "scheduled tasks", "due items"],
    [disc(12, 15, 3), poly([[12, 12.5], [12, 15], [14.5, 15]])]),
  clip("clipboard-signature", "Clipboard signature", "A clipboard with a signature on it — a form signed off, agreement given",
    ["signed", "form", "agreement"], [], ["signed form", "clipboard signature", "sign off"],
    [arc(11, 15, 3, 0, 180), poly([[14, 15], [17, 12]])]),
  clip("clipboard-type", "Clipboard type", "A clipboard with a T on it — typed text on the board, a form to fill in",
    ["text", "form", "typography"], [], ["clipboard text", "typed form", "text on board"],
    [row(12, 9, 15), col(12, 12, 18)]),

  // ── monitor ─────────────────────────────────────────────────────────────────────
  mon("monitor-check", "Monitor check", "A screen with a check on it — the display is fine, the machine reports healthy",
    ["healthy", "ok", "verified"], [], ["monitor ok", "screen check", "healthy display"], check(SMALL, 10.5)),
  mon("monitor-off", "Monitor off", "A screen with a cross on it — the display is off or the machine is unreachable",
    ["offline", "disabled", "unreachable"], [], ["monitor off", "screen disabled", "display offline"], off(SMALL, 10.5)),
  mon("monitor-play", "Monitor play", "A screen with a play button on it — playback on the display, a screen showing video",
    ["playback", "video", "present"], [], ["screen play", "monitor playback", "present video"],
    [poly([[10, 7.5], [10, 13.5], [13, 10.5]], true)]),
  mon("monitor-pause", "Monitor pause", "A screen with a pause mark on it — playback held, the display paused",
    ["paused", "hold", "playback"], [], ["screen pause", "monitor paused", "hold playback"], pause(SMALL, 10.5)),
  mon("monitor-stop", "Monitor stop", "A screen with a stop mark on it — playback stopped, the display halted",
    ["stopped", "halt", "playback"], [], ["screen stop", "monitor stopped", "halt playback"],
    [poly([[9.5, 8], [14.5, 8], [14.5, 13], [9.5, 13]], true)]),
  mon("monitor-up", "Monitor up", "A screen with an arrow pointing up on it — send from this machine, upload from the desktop",
    ["upload", "send", "desktop"], [], ["upload from desktop", "monitor upload", "send from screen"],
    [col(12, 7.5, 13.5), poly([[9.5, 10], [12, 7.5], [14.5, 10]])]),
  mon("monitor-down", "Monitor down", "A screen with an arrow pointing down on it — fetch to this machine, download to the desktop",
    ["download", "fetch", "desktop"], [], ["download to desktop", "monitor download", "fetch to screen"],
    [col(12, 7.5, 13.5), poly([[9.5, 11], [12, 13.5], [14.5, 11]])]),
  mon("monitor-config", "Monitor config", "A screen with sliders on it — display settings, the machine's configuration",
    ["settings", "display", "sliders"], ["monitor-cog"], ["display settings", "monitor config", "screen settings"],
    [row(9, 8, 16), col(13.5, 7, 11), row(12.5, 8, 16)]),
  mon("monitor-dot", "Monitor dot", "A screen with a dot on it — a machine with a status, online or with something waiting",
    ["status", "online", "indicator"], [], ["monitor status", "screen indicator", "machine online"],
    [disc(12, 10.5, 2)]),
];
