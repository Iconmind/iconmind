/**
 * Batch 82 — round 6 of the parity plan: arrows.
 *
 * The shaft and the five-wide head of arrow-up, turned and paired: diagonals, two-way
 * arrows, arrows to and from a line, arrows to and from a dot, and the big filled arrow.
 * arrow-up-right already existed as arrow-external; the lettered sort arrows (a-z, 0-1)
 * are letters and are not drawn — sort and sort-desc carry those names.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { col, disc, poly, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const arrow = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], shapes: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "arrow", name, description, tags, family: "arrow", aliases, keywords, shapes,
});

export const BATCH_82: Icon[] = [
  arrow("arrow-up-left", "Arrow up left", "An arrow pointing to the top left corner — go back and up, towards the start of things",
    ["diagonal", "corner", "northwest"], [], ["diagonal arrow", "up left", "northwest", "back to start"],
    [poly([[20, 20], [4, 4]]), poly([[4, 14], [4, 4], [14, 4]])]),
  arrow("arrow-down-right", "Arrow down right", "An arrow pointing to the bottom right corner — onward and down, towards the end of things",
    ["diagonal", "corner", "southeast"], [], ["diagonal arrow", "down right", "southeast", "onward"],
    [poly([[4, 4], [20, 20]]), poly([[10, 20], [20, 20], [20, 10]])]),
  arrow("arrow-down-left", "Arrow down left", "An arrow pointing to the bottom left corner — back and down, an incoming reply",
    ["diagonal", "corner", "southwest"], [], ["diagonal arrow", "down left", "southwest", "incoming"],
    [poly([[20, 4], [4, 20]]), poly([[4, 10], [4, 20], [14, 20]])]),
  arrow("arrow-left-right", "Arrow left right", "One arrow with a head at each end, pointing left and right — swap, resize or go either way",
    ["swap", "horizontal", "both"], ["move-horizontal"], ["horizontal arrow", "swap", "resize width", "both ways"],
    [row(12, 4, 20), poly([[8, 8], [4, 12], [8, 16]]), poly([[16, 8], [20, 12], [16, 16]])]),
  arrow("arrow-up-down", "Arrow up down", "One arrow with a head at each end, pointing up and down — sort, resize or go either way",
    ["sort", "vertical", "both"], ["move-vertical"], ["vertical arrow", "sort both ways", "resize height", "up and down"],
    [col(12, 4, 20), poly([[8, 8], [12, 4], [16, 8]]), poly([[8, 16], [12, 20], [16, 16]])]),
  arrow("arrow-right-left", "Arrow right left", "Two arrows one above the other, one pointing right and one left — an exchange, traffic both ways",
    ["exchange", "transfer", "two-way"], [], ["exchange", "two way transfer", "swap horizontally", "bidirectional"],
    [row(9, 4, 20), poly([[16, 5], [20, 9], [16, 13]]), row(15, 4, 20), poly([[8, 11], [4, 15], [8, 19]])]),
  arrow("arrow-down-up", "Arrow down up", "Two arrows side by side, one pointing down and one up — a vertical exchange, sort either way",
    ["exchange", "sort", "two-way"], [], ["vertical exchange", "sort toggle", "swap vertically", "up down arrows"],
    [col(8, 4, 20), poly([[4, 16], [8, 20], [12, 16]]), col(16, 4, 20), poly([[12, 8], [16, 4], [20, 8]])]),
  arrow("arrow-up-to-line", "Arrow up to line", "An arrow pointing up at a line — jump to the top, move something up as far as it goes",
    ["top", "first", "limit"], [], ["to top", "jump to start", "move to top", "scroll to top"],
    [row(4, 7, 17), col(12, 8, 20), poly([[8, 12], [12, 8], [16, 12]])]),
  arrow("arrow-down-to-line", "Arrow down to line", "An arrow pointing down at a line — jump to the bottom, move something down as far as it goes",
    ["bottom", "last", "limit"], [], ["to bottom", "jump to end", "move to bottom", "scroll to bottom"],
    [row(20, 7, 17), col(12, 4, 16), poly([[8, 12], [12, 16], [16, 12]])]),
  arrow("arrow-left-to-line", "Arrow left to line", "An arrow pointing left at a line — go to the very start, first page, first item",
    ["start", "first", "beginning"], [], ["to start", "first page", "go to beginning", "leftmost"],
    [col(4, 7, 17), row(12, 8, 20), poly([[12, 8], [8, 12], [12, 16]])]),
  arrow("arrow-right-to-line", "Arrow right to line", "An arrow pointing right at a line — go to the very end, last page, last item",
    ["end", "last", "finish"], [], ["to end", "last page", "go to end", "rightmost"],
    [col(20, 7, 17), row(12, 4, 16), poly([[12, 8], [16, 12], [12, 16]])]),
  arrow("arrow-up-from-line", "Arrow up from line", "An arrow rising from a line — lift off, take something up from where it sat",
    ["lift", "rise", "up"], ["move-up"], ["up from line", "lift", "raise", "take up"],
    [row(20, 7, 17), col(12, 4, 16), poly([[8, 8], [12, 4], [16, 8]])]),
  arrow("arrow-down-from-line", "Arrow down from line", "An arrow dropping from a line — let it down, take something down from where it sat",
    ["drop", "lower", "down"], ["move-down"], ["down from line", "drop", "lower", "take down"],
    [row(4, 7, 17), col(12, 8, 20), poly([[8, 16], [12, 20], [16, 16]])]),
  arrow("arrow-left-from-line", "Arrow left from line", "An arrow leaving a line to the left — pull out, take something away from the edge",
    ["pull", "out", "left"], ["move-left"], ["left from line", "pull out", "leave", "exit left"],
    [col(20, 7, 17), row(12, 4, 16), poly([[8, 8], [4, 12], [8, 16]])]),
  arrow("arrow-right-from-line", "Arrow right from line", "An arrow leaving a line to the right — push out, send something away from the edge",
    ["push", "out", "right"], ["move-right"], ["right from line", "push out", "depart", "exit right"],
    [col(4, 7, 17), row(12, 8, 20), poly([[16, 8], [20, 12], [16, 16]])]),
  arrow("arrow-up-from-dot", "Arrow up from dot", "An arrow rising from a dot — start from here and go up, a point of origin",
    ["origin", "start", "from-here"], [], ["from here up", "origin point", "start upward"],
    [disc(12, 18.5, 2), col(12, 4, 14), poly([[8, 8], [12, 4], [16, 8]])]),
  arrow("arrow-down-to-dot", "Arrow down to dot", "An arrow dropping onto a dot — land here, come down to a point",
    ["target", "land", "to-here"], [], ["down to point", "land here", "arrive"],
    [col(12, 4, 14), poly([[8, 10], [12, 14], [16, 10]]), disc(12, 18.5, 2)]),
  arrow("arrow-big-up", "Arrow big up", "A large outlined arrow pointing up — a bold direction, the emphatic up",
    ["large", "bold", "up"], ["arrow-big-up-dash"], ["big arrow up", "large up arrow", "bold up"],
    [poly([[12, 3], [21, 12], [16, 12], [16, 21], [8, 21], [8, 12], [3, 12]], true)]),
  arrow("arrow-big-down", "Arrow big down", "A large outlined arrow pointing down — a bold direction, the emphatic down",
    ["large", "bold", "down"], ["arrow-big-down-dash"], ["big arrow down", "large down arrow", "bold down"],
    [poly([[12, 21], [3, 12], [8, 12], [8, 3], [16, 3], [16, 12], [21, 12]], true)]),
  arrow("arrow-big-left", "Arrow big left", "A large outlined arrow pointing left — a bold direction, the emphatic back",
    ["large", "bold", "left"], ["arrow-big-left-dash"], ["big arrow left", "large left arrow", "bold back"],
    [poly([[3, 12], [12, 3], [12, 8], [21, 8], [21, 16], [12, 16], [12, 21]], true)]),
  arrow("arrow-big-right", "Arrow big right", "A large outlined arrow pointing right — a bold direction, the emphatic forward",
    ["large", "bold", "right"], ["arrow-big-right-dash"], ["big arrow right", "large right arrow", "bold forward"],
    [poly([[21, 12], [12, 21], [12, 16], [3, 16], [3, 8], [12, 8], [12, 3]], true)]),
];
