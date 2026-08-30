/**
 * Batch 83 — round 7 of the parity plan: chevrons, corners and the diagonal move.
 *
 * Doubled chevrons and chevrons against a line, the eight corner arrows, and the
 * two-headed diagonal. chevrons-up is priority's drawing and corner-down-left is
 * command's (the return arrow); both are aliases rather than second drawings.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { col, poly } from "../forms.ts";
import type { Icon } from "../build.ts";

const chev = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], shapes: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "arrow", name, description, tags, family: "chevron", aliases, keywords, shapes,
});
const corner = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], shapes: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "arrow", name, description, tags, family: "arrow", aliases, keywords, shapes,
});

export const BATCH_83: Icon[] = [
  chev("chevrons-down", "Chevrons down", "Two chevrons pointing down, one under the other — jump further down, expand all the way",
    ["double", "expand", "further"], [], ["double chevron down", "expand all", "jump down", "page down"],
    [poly([[4, 4], [12, 12], [20, 4]]), poly([[4, 13], [12, 21], [20, 13]])]),
  chev("chevrons-left", "Chevrons left", "Two chevrons pointing left, side by side — go back further, to the first of them",
    ["double", "back", "first"], [], ["double chevron left", "first page", "rewind", "go back further"],
    [poly([[11, 4], [3, 12], [11, 20]]), poly([[20, 4], [12, 12], [20, 20]])]),
  chev("chevrons-right", "Chevrons right", "Two chevrons pointing right, side by side — go forward further, to the last of them",
    ["double", "forward", "last"], [], ["double chevron right", "last page", "fast forward", "go further"],
    [poly([[4, 4], [12, 12], [4, 20]]), poly([[13, 4], [21, 12], [13, 20]])]),
  chev("chevrons-up-down", "Chevrons up down", "A chevron pointing up above one pointing down — a control that sorts or expands either way",
    ["sort", "expand", "select"], [], ["sort control", "expand collapse", "select chevrons", "up down chevrons"],
    [poly([[7, 9], [12, 4], [17, 9]]), poly([[7, 15], [12, 20], [17, 15]])]),
  chev("chevrons-down-up", "Chevrons down up", "A chevron pointing down above one pointing up — collapse, bring the two halves together",
    ["collapse", "shrink", "fold"], [], ["collapse", "fold up", "shrink section", "down up chevrons"],
    [poly([[7, 4], [12, 9], [17, 4]]), poly([[7, 20], [12, 15], [17, 20]])]),
  chev("chevrons-left-right", "Chevrons left right", "Chevrons pointing out to the left and the right — widen, expand sideways",
    ["widen", "expand", "sideways"], [], ["expand horizontally", "widen", "left right chevrons"],
    [poly([[9, 7], [4, 12], [9, 17]]), poly([[15, 7], [20, 12], [15, 17]])]),
  chev("chevrons-right-left", "Chevrons right left", "Chevrons pointing in from the left and the right — narrow, collapse sideways",
    ["narrow", "collapse", "sideways"], [], ["collapse horizontally", "narrow", "right left chevrons"],
    [poly([[4, 7], [9, 12], [4, 17]]), poly([[20, 7], [15, 12], [20, 17]])]),
  chev("chevron-first", "Chevron first", "A chevron pointing left at a line — the very first, the start of the run",
    ["first", "start", "beginning"], [], ["first item", "go to first", "start of list"],
    [col(3, 5, 19), poly([[19, 5], [12, 12], [19, 19]])]),
  chev("chevron-last", "Chevron last", "A chevron pointing right at a line — the very last, the end of the run",
    ["last", "end", "finish"], [], ["last item", "go to last", "end of list"],
    [col(21, 5, 19), poly([[5, 5], [12, 12], [5, 19]])]),
  corner("corner-down-right", "Corner down right", "An arrow that goes down and then turns right — a step down into the next line",
    ["turn", "next", "step"], [], ["down then right", "next line", "step into"],
    [poly([[4, 4], [4, 14], [20, 14]]), poly([[15, 9], [20, 14], [15, 19]])]),
  corner("corner-up-left", "Corner up left", "An arrow that goes up and then turns left — a step back up to the line before",
    ["turn", "back", "up"], [], ["up then left", "previous line", "step back up"],
    [poly([[20, 20], [20, 10], [4, 10]]), poly([[9, 5], [4, 10], [9, 15]])]),
  corner("corner-up-right", "Corner up right", "An arrow that goes up and then turns right — a step up and onward",
    ["turn", "up", "onward"], [], ["up then right", "step up", "redo"],
    [poly([[4, 20], [4, 10], [20, 10]]), poly([[15, 5], [20, 10], [15, 15]])]),
  corner("corner-left-down", "Corner left down", "An arrow that goes left and then turns down — come across and drop",
    ["turn", "drop", "across"], [], ["left then down", "come across and drop", "wrap down"],
    [poly([[20, 4], [10, 4], [10, 20]]), poly([[5, 15], [10, 20], [15, 15]])]),
  corner("corner-left-up", "Corner left up", "An arrow that goes left and then turns up — come across and rise",
    ["turn", "rise", "across"], [], ["left then up", "come across and rise", "wrap up"],
    [poly([[20, 20], [10, 20], [10, 4]]), poly([[5, 9], [10, 4], [15, 9]])]),
  corner("corner-right-down", "Corner right down", "An arrow that goes right and then turns down — move along and drop",
    ["turn", "drop", "along"], [], ["right then down", "move along and drop", "descend"],
    [poly([[4, 4], [14, 4], [14, 20]]), poly([[9, 15], [14, 20], [19, 15]])]),
  corner("corner-right-up", "Corner right up", "An arrow that goes right and then turns up — move along and rise",
    ["turn", "rise", "along"], [], ["right then up", "move along and rise", "ascend"],
    [poly([[4, 20], [14, 20], [14, 4]]), poly([[9, 9], [14, 4], [19, 9]])]),
  corner("move-diagonal", "Move diagonal", "A diagonal arrow with a head at each end — drag a corner, resize in both directions at once",
    ["resize", "drag", "corner"], ["move-diagonal-2"], ["resize diagonally", "drag corner", "diagonal move"],
    [poly([[4, 20], [20, 4]]), poly([[10, 4], [20, 4], [20, 14]]), poly([[4, 10], [4, 20], [14, 20]])]),
];
