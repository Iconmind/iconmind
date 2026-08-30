/**
 * Batch 79 — round 3 of the parity plan: chat, calendar and time.
 *
 * The bubble, the calendar and the clock-at-left each take the marks their existing
 * members left untaken. Several Lucide names turned out to be icons the set already had
 * (clock-check is on-time, clock-arrow-right is time-shift, alarm-clock is alarm,
 * message-circle-question is elicitation) — those became aliases instead of drawings.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { window_ } from "../bodies.ts";
import { SMALL, remove } from "../marks.ts";
import type { Icon } from "../build.ts";

const HEART = "a heart is one line, not three strokes with visible seams";
const BUBBLE = [rect(3, 3, 18, 15, 2), poly([[7, 18], [7, 21], [10, 18]])];
const calendarParts = () => [window_(), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5)];
const CLOCK_L = [disc(7.5, 12, 5.5), poly([[7.5, 9], [7.5, 12], [10, 12]])];

const chat = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "communication", name, description, tags, family: "bubble", aliases, keywords,
  shapes: [...BUBBLE, ...marks],
});
const cal = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "time", name, description, tags, family: "window", aliases, keywords,
  shapes: [...calendarParts(), ...marks],
});
const time = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "time", name, description, tags, family: "clock", aliases, keywords,
  shapes: [...CLOCK_L, ...marks],
});

export const BATCH_79: Icon[] = [
  // ── chat ────────────────────────────────────────────────────────────────────────
  chat("chat-add", "Chat add", "A speech bubble with a plus inside — start a new conversation, open another thread",
    ["new", "compose", "start"], ["message-square-plus", "message-circle-plus"], ["new chat", "new message", "start conversation", "compose"],
    [col(12, 7.5, 13.5), row(10.5, 9, 15)]),
  chat("chat-remove", "Chat remove", "A speech bubble with a minus inside — remove this conversation, drop the thread",
    ["delete", "drop", "minus"], ["message-square-minus", "message-circle-minus"], ["delete chat", "remove conversation", "drop thread"],
    [row(10.5, 9, 15)]),
  chat("chat-quote", "Chat quote", "A speech bubble with quotation marks inside — a quoted message, words repeated back",
    ["quotation", "cite", "repeat"], ["message-square-quote"], ["quoted message", "quote reply", "citation chat"],
    [poly([[8.5, 8], [8.5, 11], [11, 11]]), poly([[13.5, 8], [13.5, 11], [16, 11]])]),
  chat("chat-alert", "Chat alert", "A speech bubble with an exclamation mark inside — a message that needs attention now",
    ["warning", "urgent", "attention"], ["message-square-warning", "message-circle-warning"], ["chat warning", "urgent message", "message alert"],
    [col(12, 7.5, 10.5), disc(12, 13.5, 1)]),
  chat("chat-more", "Chat more", "A speech bubble with three dots inside — someone is typing, or more of the thread to come",
    ["typing", "ellipsis", "pending"], ["message-square-more", "message-circle-more"], ["typing indicator", "more messages", "chat ellipsis"],
    [disc(8, 10.5, 1), disc(12, 10.5, 1), disc(16, 10.5, 1)]),
  chat("chat-diff", "Chat diff", "A speech bubble with a plus and a minus inside — what changed between two versions of a message",
    ["changes", "compare", "edited"], ["message-square-diff"], ["message diff", "edited message", "compare messages"],
    [col(9, 8, 12), row(10, 7, 11), row(10, 13, 17)]),
  chat("chat-dot", "Chat dot", "A speech bubble with a dot inside — an unread message, a conversation with something new",
    ["unread", "new", "badge"], ["message-square-dot"], ["unread chat", "new message dot", "unread indicator"],
    [disc(12, 10.5, 2)]),

  // ── calendar ────────────────────────────────────────────────────────────────────
  cal("calendar-days", "Calendar days", "A calendar with a row of dates on it — the month view, days laid out to pick from",
    ["month", "dates", "view"], [], ["month view", "calendar dates", "date grid"],
    [disc(9, 15.5, 1), disc(15, 15.5, 1)]),
  cal("calendar-remove", "Calendar remove", "A calendar with a minus on it — take an event off the calendar, clear a date",
    ["minus", "cancel", "clear"], ["calendar-minus", "calendar-minus-2"], ["remove event", "clear date", "cancel booking"],
    remove(SMALL, 15)),
  cal("calendar-clock", "Calendar clock", "A calendar with a clock on it — a date with a time attached, a scheduled moment",
    ["schedule", "appointment", "datetime"], [], ["date and time", "scheduled event", "appointment time", "datetime picker"],
    [disc(12, 15.5, 3), poly([[12, 13], [12, 15.5], [14.5, 15.5]])]),
  cal("calendar-search", "Calendar search", "A calendar with a magnifying glass on it — find a date or an event in the calendar",
    ["find", "lookup", "events"], [], ["search calendar", "find event", "look up date"],
    [disc(11.5, 15, 3), poly([[13.5, 17], [16, 19.5]])]),
  cal("calendar-sync", "Calendar sync", "A calendar with a sync loop on it — keep this calendar in step with another",
    ["subscribe", "mirror", "refresh"], [], ["sync calendar", "calendar subscription", "refresh events"],
    [raw("M13.5 13.5h2.5a1 1 0 0 1 1 1v2.5a1 1 0 0 1 -1 1h-2.5", "the right half of a two-gap loop; frame() can only open its top edge"),
     raw("M10.5 18h-2.5a1 1 0 0 1 -1 -1v-2.5a1 1 0 0 1 1 -1h2.5", "the left half of the same loop")]),
  cal("calendar-heart", "Calendar heart", "A calendar with a heart on it — a favourite date, an anniversary or a day to remember",
    ["anniversary", "favourite", "remember"], [], ["anniversary", "favourite date", "special day"],
    [raw("M8.5 14A1.75 1.75 0 0 1 12 14A1.75 1.75 0 0 1 15.5 14L12 17.5Z", HEART, true)]),
  cal("calendar-up", "Calendar up", "A calendar with an arrow pointing up on it — move an event earlier, or export the calendar",
    ["earlier", "export", "upload"], ["calendar-arrow-up"], ["move earlier", "export calendar", "upload events"],
    [col(12, 12.5, 19), poly([[9.5, 15], [12, 12.5], [14.5, 15]])]),
  cal("calendar-down", "Calendar down", "A calendar with an arrow pointing down on it — move an event later, or import a calendar",
    ["later", "import", "download"], ["calendar-arrow-down"], ["move later", "import calendar", "download events"],
    [col(12, 12.5, 19), poly([[9.5, 16.5], [12, 19], [14.5, 16.5]])]),
  // ── time ────────────────────────────────────────────────────────────────────────
  time("time-add", "Time add", "A clock with a plus beside it — add time, extend a deadline or book another slot",
    ["extend", "more", "slot"], ["clock-plus"], ["add time", "extend deadline", "extra time", "book slot"],
    [col(18.5, 9, 15), row(12, 15.5, 21.5)]),
  time("time-arrow-up", "Time arrow up", "A clock with an arrow pointing up beside it — bring it forward, move the time earlier",
    ["earlier", "forward", "sooner"], ["clock-arrow-up"], ["move earlier", "bring forward", "sooner"],
    [col(18.5, 8, 16), poly([[16, 10.5], [18.5, 8], [21, 10.5]])]),
  time("time-arrow-down", "Time arrow down", "A clock with an arrow pointing down beside it — push it back, move the time later",
    ["later", "postpone", "delay"], ["clock-arrow-down"], ["move later", "postpone", "push back", "delay"],
    [col(18.5, 8, 16), poly([[16, 13.5], [18.5, 16], [21, 13.5]])]),
  time("time-arrow-left", "Time arrow left", "A clock with an arrow pointing left beside it — go back in time, rewind to an earlier point",
    ["rewind", "back", "history"], ["clock-arrow-left"], ["go back in time", "rewind", "time travel", "history"],
    [row(12, 15.5, 21.5), poly([[18, 9.5], [15.5, 12], [18, 14.5]])]),
];
