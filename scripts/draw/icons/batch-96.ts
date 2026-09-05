/**
 * R09 · Incidents & on-call — what breaks, who answers, and what gets written down after.
 *
 * The set's incident is a machine struck by a bolt, so everything that is about an
 * incident's state — its severity, the outage it caused, opening and closing it — sits in
 * that machine. What is measured in time sits in the ring the set's clock stands in. What ends up on paper
 * (policies, reviews, requests) is a page. A page sent to a person rings the alarm bell
 * from R08. The people are a bust with the mark on the chest; the rooms are a panel.
 */
import { arc, col, disc, poly, row } from "../forms.ts";
import { alarm, cycle, machine, page, panel, ring, window_ } from "../bodies.ts";
import {
  SMALL, add, check, clockMark, coinMark, diamondMark, lockMark, off, pause, shieldMark, squareMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "devops", subcategory: "incident", name, description,
  tags, aliases, keywords, family, shapes,
});

/** A person: the head, and shoulders wide enough to carry a mark on the chest at cy 17. */
const PERSON = () => [disc(12, 6, 3), arc(12, 21, 9, 180, 360)];
/** A chevron, apex up, 3 wide. */
const CHEV = (cy: number) => poly([[9, cy + 3], [12, cy], [15, cy + 3]]);
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];

export const BATCH_96: Icon[] = [
  /* ── The incident and its severity ────────────────────────────────────────────── */
  c("sev-one", "Sev 1", "The incident machine with three chevrons on a bar — the highest severity, everyone is paged",
    ["incident", "severity", "sev"], [], ["sev1", "sev 1", "p1", "critical incident"],
    "machine", [machine(), CHEV(5.5), CHEV(9), CHEV(12.5), row(17, 8, 16)]),
  c("sev-two", "Sev 2", "The incident machine with two chevrons on a bar — serious, handled by the team on call",
    ["incident", "severity", "sev"], [], ["sev2", "sev 2", "p2", "major incident"],
    "machine", [machine(), CHEV(7.5), CHEV(11), row(17, 8, 16)]),
  c("sev-three", "Sev 3", "The incident machine with one chevron on a bar — a minor incident, fixed in working hours",
    ["incident", "severity", "sev"], [], ["sev3", "sev 3", "p3", "minor incident"],
    "machine", [machine(), CHEV(11), row(17, 8, 16)]),
  c("incident-severity", "Incident severity", "The incident machine with an exclamation mark — how bad this one is",
    ["incident", "severity", "level"], [], ["incident severity", "severity level", "priority", "how bad"],
    "machine", [machine(), col(12, 7, 13), disc(12, 16.5, 1)]),
  c("severity-raise", "Raise severity", "The incident machine with an arrow rising — an incident judged worse than first thought",
    ["incident", "severity", "raise"], [], ["raise severity", "upgrade severity", "escalate severity", "worse than thought"],
    "machine", [machine(), col(12, 9, 17), poly([[9.5, 11.5], [12, 9], [14.5, 11.5]])]),
  c("severity-lower", "Lower severity", "The incident machine with an arrow dropping — an incident judged less bad than first thought",
    ["incident", "severity", "lower"], [], ["lower severity", "downgrade severity", "de-escalate", "less bad"],
    "machine", [machine(), col(12, 7, 15), poly([[9.5, 12.5], [12, 15], [14.5, 12.5]])]),
  c("incident-open", "Open incident", "The incident machine with a plus — an incident declared and given a number",
    ["incident", "open", "declare"], [], ["open incident", "declare incident", "new incident", "raise incident"],
    "machine", [machine(), ...add(SMALL, 12)]),
  c("incident-close", "Close incident", "The incident machine with a check — an incident resolved and closed",
    ["incident", "close", "resolve"], [], ["close incident", "resolve incident", "incident resolved", "all clear"],
    "machine", [machine(), ...check(SMALL, 12)]),
  c("incident-merge", "Merge incidents", "The incident machine with two lines joining into one — two reports found to be one incident",
    ["incident", "merge", "duplicate"], [], ["merge incidents", "duplicate incident", "same incident", "link incidents"],
    "machine", [machine(), poly([[8, 8], [12, 12], [8, 16]]), row(12, 12, 16)]),
  c("incident-timeline", "Incident timeline", "The incident machine with a line and events either side of it — what happened, in order",
    ["incident", "timeline", "events"], [], ["incident timeline", "sequence of events", "what happened when", "timeline"],
    "machine", [machine(), col(12, 7, 17), disc(8, 10, 1), disc(16, 14, 1)]),
  c("rollback-incident", "Rollback", "The incident machine with an arrow pointing back — the change undone to stop the bleeding",
    ["incident", "rollback", "revert"], [], ["rollback incident", "revert change", "roll back", "undo deploy"],
    "machine", [machine(), row(12, 9, 17), poly([[11.5, 9.5], [9, 12], [11.5, 14.5]])]),
  c("mitigation", "Mitigation", "The incident machine with a shield — the blow softened before the cause is known",
    ["incident", "mitigate", "shield"], [], ["mitigation", "mitigate", "stop the bleeding", "workaround"],
    "machine", [machine(), ...shieldMark(SMALL, 12)]),

  /* ── Outages and impact ───────────────────────────────────────────────────────── */
  c("full-outage", "Full outage", "The incident machine with a cross — the service is down for everyone",
    ["outage", "down", "incident"], [], ["full outage", "major outage", "service down", "hard down"],
    "machine", [machine(), ...off(SMALL, 12)]),
  c("partial-outage", "Partial outage", "The incident machine with one slash — down for some, up for the rest",
    ["outage", "partial", "incident"], [], ["partial outage", "some users affected", "degraded region", "partially down"],
    "machine", [machine(), poly([[8, 16], [16, 8]])]),
  c("degraded-service", "Degraded service", "The incident machine with a line falling in steps — up, but slower or worse than it should be",
    ["outage", "degraded", "incident"], [], ["degraded service", "degraded performance", "slow", "reduced capacity"],
    "machine", [machine(), poly([[8, 9], [11, 12], [13, 10], [16, 13]])]),
  c("dependency-outage", "Dependency outage", "The incident machine with a line cut in the middle — something upstream is down",
    ["outage", "dependency", "upstream"], [], ["dependency outage", "upstream outage", "third party down", "vendor incident"],
    "machine", [machine(), row(12, 7, 10.5), row(12, 13.5, 17)]),
  c("impact-radius", "Impact radius", "The incident machine with ripples around a point — how far the damage spreads",
    ["incident", "impact", "radius"], [], ["impact radius", "blast radius", "scope of impact", "affected systems"],
    "machine", [machine(), disc(12, 12, 1), arc(12, 12, 5, 110, 250), arc(12, 12, 5, 290, 70)]),
  c("customer-impact", "Customer impact", "The incident machine with a person in it — who this incident is being felt by",
    ["incident", "impact", "customer"], [], ["customer impact", "user impact", "affected customers", "who is affected"],
    "machine", [machine(), disc(12, 9, 2), arc(12, 17, 4, 180, 360)]),

  /* ── Time ─────────────────────────────────────────────────────────────────────── */
  c("mttr", "MTTR", "A ring with a bolt and a check in it — how long, on average, from failure to fixed",
    ["incident", "time", "repair"], [], ["mttr", "mean time to recovery", "mean time to repair", "time to restore"],
    "orbit", [ring(), poly([[13.5, 6.5], [9.5, 10.5], [12.5, 10.5], [8.5, 14.5]]), poly([[12, 15], [14, 17], [17.5, 13.5]])]),
  c("mtbf", "MTBF", "A ring with two points and the gap between them — how long, on average, between failures",
    ["incident", "time", "failure"], [], ["mtbf", "mean time between failures", "reliability", "failure interval"],
    "orbit", [ring(), disc(7.5, 12, 2), row(12, 9.5, 14.5), disc(16.5, 12, 2)]),
  c("maintenance-window", "Maintenance window", "A ring with a bracketed span in it — the agreed time for planned work",
    ["time", "maintenance", "window"], [], ["maintenance window", "planned maintenance", "scheduled downtime", "change window"],
    "orbit", [ring(), poly([[10.5, 9], [8, 9], [8, 15], [10.5, 15]]), poly([[13.5, 9], [16, 9], [16, 15], [13.5, 15]]), row(12, 10.5, 13.5)]),
  c("freeze-window", "Freeze window", "A ring with a lock in it — a stretch of time in which nothing ships",
    ["time", "freeze", "change"], [], ["freeze window", "change freeze", "code freeze", "no deploys"],
    "orbit", [ring(), ...lockMark(SMALL, 12)]),
  c("handoff-shift", "Shift handoff", "A ring with an arrow pointing both ways — the on-call duty passed from one person to the next",
    ["oncall", "shift", "handoff"], [], ["shift handoff", "handover", "on-call handoff", "end of shift"],
    "orbit", [ring(), row(12, 8, 16), poly([[10.5, 9.5], [8, 12], [10.5, 14.5]]), poly([[13.5, 9.5], [16, 12], [13.5, 14.5]])]),

  /* ── Pages and alerts that reach a person ─────────────────────────────────────── */
  c("page-ack", "Acknowledge page", "The alarm bell with a point in it — a page seen and taken by someone",
    ["page", "oncall", "acknowledge"], [], ["acknowledge page", "ack", "page acknowledged", "on it"],
    "bell", [...alarm(), disc(12, 11, 2)]),
  c("page-escalate", "Escalate page", "The alarm bell with an arrow rising — a page nobody answered, sent up the chain",
    ["page", "oncall", "escalate"], [], ["escalate page", "page escalation", "next on call", "unanswered page"],
    "bell", [...alarm(), col(12, 8, 14), poly([[9.5, 10.5], [12, 8], [14.5, 10.5]])]),
  c("page-resolve", "Resolve page", "The alarm bell with a check in it — the page's cause is fixed and it stops ringing",
    ["page", "oncall", "resolve"], [], ["resolve page", "page resolved", "resolved alert", "cleared"],
    "bell", [...alarm(), ...check(SMALL, 11)]),
  c("page-snooze", "Snooze page", "The alarm bell with a Z in it — a page put off for a while",
    ["page", "oncall", "snooze"], [], ["snooze page", "snooze alert", "remind me later", "delay page"],
    "bell", [...alarm(), poly([[9.5, 9], [14.5, 9], [9.5, 14], [14.5, 14]])]),
  c("alert-fatigue", "Alert fatigue", "The alarm bell with bars fading in it — so many alerts that none of them lands any more",
    ["alert", "fatigue", "noise"], [], ["alert fatigue", "too many alerts", "ignored alerts", "alert overload"],
    "bell", [...alarm(), col(9, 8, 14), col(12, 9.5, 14), col(15, 11, 14)]),
  c("noisy-alert", "Noisy alert", "The alarm bell with an exclamation mark — an alert that fires often and means little",
    ["alert", "noise", "tuning"], [], ["noisy alert", "alert noise", "false positive", "tune alert"],
    "bell", [...alarm(), col(12, 7.5, 12.5), disc(12, 15, 1)]),
  c("flapping", "Flapping", "The alarm bell with a zigzag in it — an alert that fires, clears, and fires again",
    ["alert", "flapping", "unstable"], [], ["flapping", "flapping alert", "fires and clears", "unstable check"],
    "bell", [...alarm(), poly([[9, 13], [11, 11], [13, 13], [15, 11]])]),

  /* ── People ───────────────────────────────────────────────────────────────────── */
  c("incident-commander", "Incident commander", "A person with a chevron on the chest — the one who runs the response",
    ["incident", "role", "commander"], [], ["incident commander", "ic", "incident lead", "response lead"],
    "person", [...PERSON(), poly([[9.5, 17.5], [12, 15], [14.5, 17.5]])]),
  c("comms-lead", "Comms lead", "A person with lines of text on the chest — the one who tells everyone else what is going on",
    ["incident", "role", "comms"], [], ["comms lead", "communications lead", "incident comms", "status updates"],
    "person", [...PERSON(), row(15, 9.5, 14.5), row(18, 9.5, 14.5)]),
  c("scribe", "Scribe", "A person with a pen stroke on the chest — the one writing down what happens and when",
    ["incident", "role", "scribe"], [], ["scribe", "note taker", "incident notes", "timeline keeper"],
    "person", [...PERSON(), poly([[9, 19], [14.5, 13.5]])]),
  c("oncall-swap", "On-call swap", "A person inside the rotation loop — the on-call rota turned so someone else takes the shift",
    ["oncall", "swap", "shift"], [], ["on-call swap", "swap shifts", "cover my shift", "schedule override"],
    "rotation", [...cycle(), disc(12, 13, 2), row(17, 9, 15)]),

  /* ── Rooms and status ─────────────────────────────────────────────────────────── */
  c("war-room", "War room", "A panel with two lines of talk in it — the channel where the incident is worked",
    ["incident", "room", "channel"], [], ["war room", "incident channel", "bridge call", "incident room"],
    "window", [panel(), row(10, 7, 17), row(14, 7, 13)]),
  c("status-page", "Status page", "A panel with a list whose bullets are lights — where customers see what is up and what is not",
    ["incident", "status", "page"], [], ["status page", "public status", "system status", "statuspage"],
    "window", [panel(), disc(8, 10, 1), row(10, 10.5, 17), disc(8, 14, 1), row(14, 10.5, 14)]),
  c("status-update", "Status update", "A panel with an arrow rising in it — a note posted on how the incident is going",
    ["incident", "status", "update"], [], ["status update", "incident update", "post update", "next update in"],
    "window", [panel(), col(12, 9.5, 15.5), poly([[9.5, 12], [12, 9.5], [14.5, 12]])]),
  c("retro-board", "Retro board", "A window split in two with notes either side — what went well and what did not",
    ["incident", "retro", "board"], [], ["retro board", "retrospective", "went well didn't go well", "sticky notes"],
    "window", [window_(), col(12, 9, 17), disc(8, 11, 1), disc(16, 11, 1), disc(8, 15, 1), disc(16, 15, 1)]),

  /* ── On paper ─────────────────────────────────────────────────────────────────── */
  c("escalation-policy", "Escalation policy", "A page with a staircase on it — who is paged next when nobody answers",
    ["incident", "escalation", "policy"], [], ["escalation policy", "escalation chain", "who gets paged", "on-call tiers"],
    "page", [page(), poly([[7.5, 17], [10.5, 17], [10.5, 14], [13.5, 14], [13.5, 11], [16, 11]])]),
  c("action-item", "Action item", "A page with a box to tick — one thing someone agreed to do",
    ["incident", "action", "todo"], [], ["action item", "follow-up task", "owner and due date", "to do"],
    "page", [page(), ...squareMark(SMALL, 13)]),
  c("root-cause", "Root cause", "A page with a line that branches down into roots — the thing that, fixed, stops it happening again",
    ["incident", "cause", "analysis"], [], ["root cause", "rca", "root cause analysis", "five whys"],
    "page", [page(), col(12, 8, 12), poly([[8.5, 15.5], [12, 12], [15.5, 15.5]])]),
  c("contributing-factor", "Contributing factor", "A page with two lines joining into one — something that helped it happen without being the cause",
    ["incident", "cause", "factor"], [], ["contributing factor", "contributing cause", "made it worse", "conditions"],
    "page", [page(), poly([[8.5, 9], [12, 12.5], [15.5, 9]]), col(12, 12.5, 17)]),
  c("corrective-action", "Corrective action", "A page with an arrow that turns — a change made so this cannot happen the same way again",
    ["incident", "action", "fix"], [], ["corrective action", "preventive action", "remediation", "fix forward"],
    "page", [page(), poly([[9.5, 9], [9.5, 15.5], [15.5, 15.5]]), poly([[13, 13], [15.5, 15.5], [13, 18]])]),
  c("follow-up-review", "Follow-up review", "A page with a clock on it — a check, weeks later, that the actions were done",
    ["incident", "review", "later"], [], ["follow-up review", "30 day review", "action review", "check back"],
    "page", [page(), ...clockMark(SMALL, 13)]),
  c("error-budget-policy", "Error budget policy", "A page with a coin on it — what the team does when the budget is spent",
    ["incident", "budget", "policy"], [], ["error budget policy", "budget exhausted", "feature freeze", "reliability first"],
    "page", [page(), ...coinMark(SMALL, 13)]),
  c("suppression-rule", "Suppression rule", "A page with a pause on it — the alerts held back on purpose, and why",
    ["alert", "suppress", "rule"], [], ["suppression rule", "suppress alerts", "maintenance suppression", "mute rule"],
    "page", [page(), ...pause(SMALL, 13)]),
  c("change-request", "Change request", "A page with a plus on it — a change asked for before it is made",
    ["change", "request", "process"], [], ["change request", "rfc", "change ticket", "cab"],
    "page", [page(), ...add(SMALL, 13)]),
  c("change-approval", "Change approval", "A page with a ring seal on it — a change someone signed off",
    ["change", "approval", "process"], [], ["change approval", "approved change", "sign off", "cab approval"],
    "page", [page(), disc(12, 13, 3)]),
  c("risk-assessment", "Risk assessment", "A page with a hazard diamond on it — what could go wrong, and how badly",
    ["change", "risk", "assess"], [], ["risk assessment", "risk review", "blast radius review", "what could go wrong"],
    "page", [page(), ...diamondMark(SMALL, 13)]),
  c("incident-review", "Incident review", "A page with the incident bolt on it — the incident written up and read together",
    ["incident", "review", "postmortem"], [], ["incident review", "post-incident review", "pir", "blameless review"],
    "page", [page(), poly([[15, 8], [10, 13], [13, 13], [8, 18]])]),
];
