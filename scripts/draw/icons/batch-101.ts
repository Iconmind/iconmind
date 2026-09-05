/**
 * R14 · Privacy, consent & data protection — what may be seen, what must be hidden, and
 * what a person can ask for.
 *
 * What is seen or hidden sits in the eye — the lids `eye-off` draws, with the mark where
 * the pupil would be; the mask is a bar across it. Personal data on file is the folder.
 * What is written down for the regulator is the clipboard. What a person can ask for
 * rides on the chest of the bust. What moves is the cloud; what is locked is the padlock.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { alarm, clipboard, cloud, folder, machine, machineWide, padlock, ring, shield, tray, window_ } from "../bodies.ts";
import {
  SMALL, clockMark, diamondMark, flagMark, funnelMark, heartMark, keyMark, listMark, lockMark,
  off, pinMark, remove, searchMark, squareMark, tagMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "security", subcategory: "compliance", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The eye: the two lids `eye-off` draws. The opening is x 4..20, y 7..17; what sits in it stays under 4 tall. */
const EYE = () => [arc(12, 19.5, 12.5, 216.87, 323.13), arc(12, 4.5, 12.5, 36.87, 143.13)];
/** A person: the head, and shoulders wide enough to carry a mark on the chest at cy 17. */
const PERSON = () => [disc(12, 6, 3), arc(12, 21, 9, 180, 360)];
/** A ticket: a card with a half-round notch bitten out of each side. Marks at cy 12. */
const TICKET = () => raw(
  "M4 5H20A2 2 0 0 1 22 7V10A2 2 0 0 0 22 14V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V14A2 2 0 0 0 2 10V7A2 2 0 0 1 4 5Z",
  "a ticket: a rounded card with a notch in each side", true);
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The set's bolt, 2.5 wide, with its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);

export const BATCH_101: Icon[] = [
  /* ── Seen and hidden ──────────────────────────────────────────────────────────── */
  c("pii-detect", "PII detection", "An eye zeroing in on its pupil — personal data spotted in a stream of text",
    ["pii", "detect", "privacy"], [], ["pii detection", "detect personal data", "pii scanner", "find pii"],
    "eye", [...EYE(), disc(12, 12, 2), row(12, 7, 10), row(12, 14, 17)]),
  c("pii-mask", "PII mask", "An eye with a bar across it — personal data hidden before anyone reads it",
    ["pii", "mask", "privacy"], [], ["pii mask", "mask personal data", "data masking", "hide pii"],
    "eye", [...EYE(), row(12, 7, 17)]),
  c("tracking-opt-out", "Tracking opt-out", "An eye with a small cross where the pupil was — the user asked not to be followed",
    ["tracking", "opt-out", "privacy"], [], ["tracking opt-out", "do not track", "opt out of tracking", "global privacy control"],
    "eye", [...EYE(), ...off(SMALL, 12)]),
  c("sensitive-category", "Sensitive category", "An eye with a hazard diamond in it — data of a kind the law treats with extra care",
    ["sensitive", "category", "privacy"], [], ["sensitive category", "special category data", "article 9", "sensitive personal data"],
    "eye", [...EYE(), ...diamondMark(SMALL, 12)]),
  c("health-data", "Health data", "An eye with a heart in it — records about someone's body and care",
    ["health", "data", "privacy"], [], ["health data", "medical records", "phi", "hipaa data"],
    "eye", [...EYE(), ...heartMark(SMALL, 12)]),
  c("biometric-data", "Biometric data", "A ticket with ridges on it — a face, a fingerprint, a voice, kept as data",
    ["biometric", "data", "privacy"], [], ["biometric data", "fingerprint data", "face data", "biometric template"],
    "ticket", [TICKET(), arc(12, 14, 3, 180, 0), arc(12, 14, 6, 180, 0)]),
  c("privacy-notice", "Privacy notice", "An eye with two lines across it — what people are told about being seen",
    ["notice", "policy", "privacy"], [], ["privacy notice", "privacy policy", "privacy statement", "what we collect"],
    "eye", [...EYE(), row(10, 8, 16), row(14, 8, 16)]),

  /* ── Data on file ─────────────────────────────────────────────────────────────── */
  c("encryption-at-rest", "Encryption at rest", "A folder with a lock in it — data unreadable where it sits",
    ["encryption", "rest", "storage"], [], ["encryption at rest", "encrypted storage", "disk encryption", "encrypted database"],
    "folder", [folder(), ...lockMark(SMALL, 13.5)]),
  c("right-to-access", "Right to access", "A folder with a lens in it — a person asking to see what is held about them",
    ["gdpr", "access", "rights"], [], ["right to access", "subject access request", "dsar", "what do you hold on me"],
    "folder", [folder(), ...searchMark(SMALL, 13.5)]),
  c("right-to-erasure", "Right to erasure", "A folder with a cross in it — a person asking to be forgotten",
    ["gdpr", "erasure", "rights"], [], ["right to erasure", "right to be forgotten", "delete my data", "erasure request"],
    "folder", [folder(), poly([[9.5, 11], [14.5, 16]]), poly([[14.5, 11], [9.5, 16]])]),
  c("right-to-portability", "Right to portability", "A folder with an arrow leaving it — a person taking their data somewhere else",
    ["gdpr", "portability", "rights"], [], ["right to portability", "data portability", "take my data", "machine-readable export"],
    "folder", [folder(), ...ARROW_R(13.5, 8, 16)]),
  c("purpose-limitation", "Purpose limitation", "A folder with a funnel in it — data used only for what it was collected for",
    ["gdpr", "purpose", "principle"], [], ["purpose limitation", "collected for a purpose", "no secondary use", "purpose specification"],
    "folder", [folder(), ...funnelMark(SMALL, 13.5)]),
  c("data-minimisation", "Data minimisation", "A folder with a minus in it — no more collected than the purpose needs",
    ["gdpr", "minimisation", "principle"], [], ["data minimisation", "collect less", "only what is needed", "minimise data"],
    "folder", [folder(), ...remove(SMALL, 13.5)]),
  c("retention-clock", "Retention clock", "A folder with a clock in it — how long a record is kept before it goes",
    ["retention", "schedule", "privacy"], [], ["retention clock", "retention period", "retention schedule", "delete after"],
    "folder", [folder(), ...clockMark(SMALL, 13.5)]),
  c("purpose-tag", "Purpose tag", "A folder with a tag in it — the reason a record was collected, written on it",
    ["purpose", "tag", "privacy"], [], ["purpose tag", "processing purpose", "purpose label", "why collected"],
    "folder", [folder(), ...tagMark(SMALL, 13.5)]),
  c("tokenise-data", "Tokenise data", "A folder with a value and the stand-in that replaces it — the real thing kept elsewhere",
    ["tokenise", "data", "privacy"], [], ["tokenise data", "tokenization", "surrogate value", "token vault"],
    "folder", [folder(), row(10, 8, 16), rect(7.5, 13, 9, 4, 2)]),

  /* ── Locked and moved ─────────────────────────────────────────────────────────── */
  c("encryption-in-transit", "Encryption in transit", "A cloud with a lock in it — data unreadable while it travels",
    ["encryption", "transit", "network"], [], ["encryption in transit", "tls", "encrypted connection", "https"],
    "cloud", [cloud(), ...lockMark(SMALL)]),
  c("cross-border-transfer", "Cross-border transfer", "A cloud with an arrow through it — personal data sent to another country",
    ["transfer", "border", "gdpr"], [], ["cross-border transfer", "international transfer", "data transfer", "third country"],
    "cloud", [cloud(), ...ARROW_R(12, 7, 16)]),
  c("vault-field", "Vault field", "A padlock with a field in it — one value kept in the vault, a pointer left behind",
    ["vault", "field", "privacy"], [], ["vault field", "field-level vault", "vaulted value", "store sensitive field"],
    "lock", [...padlock(), rect(8, 13.5, 8, 4, 2)]),
  c("key-escrow", "Key escrow", "A key set down in a tray — a copy held by someone trusted, for when it is needed",
    ["key", "escrow", "encryption"], [], ["key escrow", "escrowed key", "key recovery", "held key"],
    "tray", [tray(), ...keyMark(SMALL, 9)]),
  c("privacy-request-queue", "Privacy request queue", "Requests stacked over a tray — the rights requests waiting to be answered",
    ["request", "queue", "privacy"], [], ["privacy request queue", "dsar queue", "rights requests", "request backlog"],
    "tray", [tray(), row(6, 8, 16), row(9.5, 8, 16)]),
  c("secure-delete", "Secure delete", "A bin with a cross in it — data gone in a way it cannot come back from",
    ["delete", "secure", "privacy"], [], ["secure delete", "shred", "crypto-shred", "unrecoverable deletion"],
    "window", [rect(6, 8, 12, 12, 2), row(5, 3, 21), poly([[9, 11], [15, 17]]), poly([[15, 11], [9, 17]])]),

  /* ── On the screen ────────────────────────────────────────────────────────────── */
  c("redact-field", "Redact field", "A window with a field blacked out over a line — one value hidden on the form",
    ["redact", "field", "privacy"], [], ["redact field", "redacted field", "hide field", "masked field"],
    "window", [window_(), rect(6, 9, 12, 4, 2), row(16, 6, 18)]),
  c("age-gate", "Age gate", "A window with a head stopped at a bar — no further until the age is known",
    ["age", "gate", "consent"], [], ["age gate", "age verification", "over 18", "age check"],
    "window", [window_(), disc(12, 10.5, 2), row(15, 7, 17)]),
  c("data-map", "Data map", "A window with a route drawn across it — where personal data goes, from collection on",
    ["map", "data-flow", "privacy"], [], ["data map", "data mapping", "data flow map", "data inventory"],
    "window", [window_(), poly([[6, 15], [10, 15], [13, 12], [18, 12]]), disc(7, 10, 1)]),
  c("cookie-banner", "Cookie banner", "A window with a bar across the bottom — the strip that asks before cookies are set",
    ["cookie", "banner", "consent"], [], ["cookie banner", "cookie consent", "cookie notice", "accept cookies"],
    "window", [window_(), rect(5, 14, 14, 4, 2)]),
  c("consent-banner-config", "Consent banner config", "A window with two sliders above the bar — which cookies the banner offers, set up",
    ["cookie", "banner", "config"], [], ["consent banner config", "cookie categories", "consent management", "cmp settings"],
    "window", [window_(), rect(5, 14, 14, 4, 2), col(9, 7.5, 10.5), col(15, 7.5, 10.5)]),
  c("audit-trail-privacy", "Privacy audit trail", "A window with a trail of points across it — who touched personal data, and when",
    ["audit", "trail", "privacy"], [], ["privacy audit trail", "access log", "who accessed", "data access history"],
    "window", [window_(), disc(7, 15, 1), disc(12, 12, 1), disc(17, 9, 1)]),

  /* ── What a person asks for ───────────────────────────────────────────────────── */
  c("data-subject-request", "Data subject request", "A person with a written request on the chest — a rights request, as the law lets them make it",
    ["gdpr", "request", "rights"], [], ["data subject request", "dsr", "rights request", "privacy request"],
    "person", [...PERSON(), ...listMark(SMALL, 17)]),
  c("data-export-user", "Export user data", "A person with an arrow rising on the chest — everything held about them, handed over",
    ["export", "user", "privacy"], [], ["export user data", "download my data", "data takeout", "user data export"],
    "person", [...PERSON(), col(12, 14, 20), poly([[9.5, 16.5], [12, 14], [14.5, 16.5]])]),
  c("data-import-user", "Import user data", "A person with an arrow dropping on the chest — their data brought in from somewhere else",
    ["import", "user", "privacy"], [], ["import user data", "bring my data", "user data import", "migrate account"],
    "person", [...PERSON(), col(12, 14, 20), poly([[9.5, 17.5], [12, 20], [14.5, 17.5]])]),
  c("data-controller", "Data controller", "A person with a flag on the chest — the one who decides why and how data is used",
    ["gdpr", "controller", "role"], [], ["data controller", "controller", "decides purpose", "responsible party"],
    "person", [...PERSON(), ...flagMark(SMALL, 17)]),

  /* ── Written for the regulator ────────────────────────────────────────────────── */
  c("consent-withdraw", "Withdraw consent", "A clipboard with a minus on it — permission given, then taken back",
    ["consent", "withdraw", "privacy"], [], ["withdraw consent", "revoke consent", "consent withdrawal", "opt out"],
    "clipboard", [...clipboard(), ...remove(SMALL, 13.5)]),
  c("lawful-basis", "Lawful basis", "A clipboard with a pillar on a base — the legal ground the processing stands on",
    ["gdpr", "basis", "legal"], [], ["lawful basis", "legal basis", "article 6", "legitimate interest"],
    "clipboard", [...clipboard(), col(12, 10, 14), row(16.5, 8, 16)]),
  c("processing-record", "Record of processing", "A clipboard with a ruled register — every processing activity, written down",
    ["gdpr", "record", "register"], [], ["record of processing", "ropa", "processing register", "article 30"],
    "clipboard", [...clipboard(), col(9, 10, 17), row(11, 11, 15), row(14, 11, 15)]),
  c("standard-clauses", "Standard clauses", "A clipboard with a standard block on it — the contract wording a transfer rests on",
    ["transfer", "clauses", "contract"], [], ["standard contractual clauses", "scc", "model clauses", "transfer contract"],
    "clipboard", [...clipboard(), ...squareMark(SMALL, 13.5)]),
  c("adequacy-decision", "Adequacy decision", "A clipboard with a seal on it — a country ruled safe enough to send data to",
    ["transfer", "adequacy", "gdpr"], [], ["adequacy decision", "adequate country", "data privacy framework", "transfer without sccs"],
    "clipboard", [...clipboard(), disc(12, 13.5, 3)]),
  c("processor-agreement", "Processor agreement", "A clipboard with a signature on it — the contract a processor signs before it touches data",
    ["processor", "agreement", "contract"], [], ["processor agreement", "dpa", "data processing agreement", "article 28"],
    "clipboard", [...clipboard(), poly([[8.5, 15], [11, 12.5], [13.5, 15], [16, 12.5]])]),
  c("transfer-impact", "Transfer impact assessment", "A clipboard with an arrow on it — where the data goes, weighed before it goes",
    ["transfer", "assessment", "gdpr"], [], ["transfer impact assessment", "tia", "third country risk", "transfer risk"],
    "clipboard", [...clipboard(), ...ARROW_R(13.5, 9, 15.5)]),
  c("dpia", "DPIA", "A clipboard with a hazard diamond on it — the risk to people, assessed before the processing starts",
    ["gdpr", "assessment", "risk"], [], ["dpia", "data protection impact assessment", "privacy impact assessment", "pia"],
    "clipboard", [...clipboard(), ...diamondMark(SMALL, 13.5)]),

  /* ── Who does the work ────────────────────────────────────────────────────────── */
  c("data-processor", "Data processor", "A machine frame with an arrow through it — the one who handles data on the controller's instructions",
    ["gdpr", "processor", "role"], [], ["data processor", "processor", "on behalf of controller", "service provider"],
    "machine", [machine(), ...ARROW_R(12, 7, 16)]),
  c("sub-processor", "Sub-processor", "A machine frame with a line and one beneath it — a processor the processor uses",
    ["gdpr", "sub-processor", "role"], [], ["sub-processor", "subprocessor", "downstream processor", "sub-processor list"],
    "machine", [machine(), row(10, 8, 16), poly([[10, 13], [10, 16], [16, 16]])]),
  c("k-anonymity", "K-anonymity", "The wide machine with three identical figures on one line — no record that stands out from the group",
    ["anonymity", "k", "privacy"], [], ["k-anonymity", "anonymisation", "indistinguishable records", "generalisation"],
    "machine", [machineWide(), col(8, 8, 14), col(12, 8, 14), col(16, 8, 14), row(17, 6, 18)]),
  c("differential-privacy", "Differential privacy", "Axes with a line jittered by noise — answers that hold, without giving any one person away",
    ["privacy", "noise", "statistics"], [], ["differential privacy", "add noise", "epsilon", "privacy budget"],
    "axes", [col(4, 4, 20), row(20, 4, 20), poly([[7, 15], [9, 13], [11, 15], [13, 13], [15, 15], [17, 13], [19, 15]])]),

  /* ── Guarded, sold, notified ──────────────────────────────────────────────────── */
  c("privacy-by-design", "Privacy by design", "A shield with a set stone in it — protection built in from the first sketch",
    ["privacy", "design", "principle"], [], ["privacy by design", "privacy by default", "built in", "article 25"],
    "shield", [shield(), ...diamondMark(SMALL, 11)]),
  c("child-safety", "Child safety", "A shield with a small person in it — the youngest users, given the most care",
    ["child", "safety", "privacy"], [], ["child safety", "children's data", "coppa", "age-appropriate design"],
    "shield", [shield(), disc(12, 8.5, 2), row(13.5, 9, 15)]),
  c("location-privacy", "Location privacy", "A shield with a pin in it — where someone is, kept to themselves",
    ["location", "privacy", "data"], [], ["location privacy", "location data", "geolocation consent", "hide location"],
    "shield", [shield(), ...pinMark(SMALL, 11)]),
  c("do-not-sell", "Do not sell", "A ticket with its price line struck out — the user said their data is not for sale",
    ["ccpa", "sell", "opt-out"], [], ["do not sell", "do not sell my personal information", "ccpa opt-out", "no sale"],
    "ticket", [TICKET(), row(12, 8, 16), poly([[9, 15], [15, 9]])]),
  c("breach-notification", "Breach notification", "The alarm bell with a bolt in it — people told, in time, that their data got out",
    ["breach", "notification", "gdpr"], [], ["breach notification", "72 hours", "notify the regulator", "data breach notice"],
    "bell", [...alarm(), BOLT(13.5, 8.5)]),
  c("data-residency-eu", "EU data residency", "A ring of four points — data that stays inside the union",
    ["residency", "eu", "region"], [], ["eu data residency", "data stays in eu", "european region", "residency requirement"],
    "orbit", [ring(), disc(12, 7.5, 1), disc(16.5, 12, 1), disc(12, 16.5, 1), disc(7.5, 12, 1)]),
];
