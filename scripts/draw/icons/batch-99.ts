/**
 * R12 · Application security — how an application gets attacked, what gives way, and what
 * stands in the way.
 *
 * The break is a gap in a closed body: an open padlock, its shackle lifted clear, holds
 * everything that is about access giving way. An attack on the application sits in the
 * application — the panel for what happens in a browser, the wide machine for what happens
 * on the server, the page for what is in a file. What defends is the shield. Where a thing
 * already has its own body in the set (the database, the folder, the tray, the truck), the
 * attack is drawn into that.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { clipboard, folder, machineWide, page, panel, shield, tray, window_ } from "../bodies.ts";
import {
  SMALL, clockMark, coinMark, funnelMark, keyMark, listMark, lockMark, pinMark, shieldMark, squareMark, tagMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "security", subcategory: "threat", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The padlock with its shackle lifted clear — the closed body, broken open. Marks sit at cy 15.5. */
const OPENLOCK = () => [rect(5, 9.5, 14, 12, 2), arc(12, 7, 4, 180, 360)];
/** The database cylinder the set draws. */
const CYL = () => raw("M4 6A8 3 0 0 1 20 6V18A8 3 0 0 1 4 18Z", "a cylinder: an elliptical rim, two sides, the far rim closing it", true);
/** The delivery truck supply-chain draws. Its cargo box is x 3..14, y 6..16. */
const TRUCK = () => [
  raw("M4 5H13A2 2 0 0 1 15 7V10H18.5L21 12.5V15A2 2 0 0 1 19 17H4A2 2 0 0 1 2 15V7A2 2 0 0 1 4 5Z", "truck body and cab drawn as one outline", true),
  disc(7, 19, 2), disc(17, 19, 2),
];
/** A person: the head, and shoulders wide enough to carry a mark on the chest at cy 17. */
const PERSON = () => [disc(12, 6, 3), arc(12, 21, 9, 180, 360)];
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The set's bolt, 3.5 wide, with its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);

export const BATCH_99: Icon[] = [
  /* ── Access giving way ────────────────────────────────────────────────────────── */
  c("auth-bypass", "Auth bypass", "An open lock with an arrow walking through it — the login step skipped altogether",
    ["auth", "bypass", "attack"], [], ["auth bypass", "authentication bypass", "skip login", "broken authentication"],
    "lock", [...OPENLOCK(), ...ARROW_R(15.5, 8, 16)]),
  c("broken-access", "Broken access control", "An open lock with someone inside it — a user reaching what was not theirs to reach",
    ["access", "authorisation", "attack"], [], ["broken access control", "authorization flaw", "privilege escalation", "owasp a01"],
    "lock", [...OPENLOCK(), disc(12, 13.5, 2), row(18.5, 9, 15)]),
  c("idor", "IDOR", "An open lock with a hash in it — an object reached by guessing its id",
    ["access", "idor", "attack"], [], ["idor", "insecure direct object reference", "guessable id", "object reference"],
    "lock", [...OPENLOCK(), col(10, 13, 18), col(14, 13, 18), row(15.5, 8, 16)]),
  c("session-fixation", "Session fixation", "An open lock with a pin in it — a session id planted before the user ever logged in",
    ["session", "fixation", "attack"], [], ["session fixation", "fixed session id", "session attack", "set session before login"],
    "lock", [...OPENLOCK(), ...pinMark(SMALL, 15.5)]),
  c("mass-assignment", "Mass assignment", "An open lock with a list in it — every field in the request written straight to the model",
    ["input", "assignment", "attack"], [], ["mass assignment", "over-posting", "auto-binding", "unsafe binding"],
    "lock", [...OPENLOCK(), ...listMark(SMALL, 15.5)]),
  c("open-cors", "Open CORS", "An open lock with an arrow pointing both ways — any origin allowed to read the response",
    ["cors", "origin", "attack"], [], ["open cors", "wildcard origin", "access-control-allow-origin *", "permissive cors"],
    "lock", [...OPENLOCK(), row(15.5, 7, 17), poly([[9.5, 13], [7, 15.5], [9.5, 18]]), poly([[14.5, 13], [17, 15.5], [14.5, 18]])]),
  c("weak-crypto", "Weak crypto", "An open lock with a cross in it — a cipher or hash that no longer holds",
    ["crypto", "weak", "attack"], [], ["weak crypto", "md5", "weak cipher", "broken algorithm"],
    "lock", [...OPENLOCK(), poly([[9.5, 13], [14.5, 18]]), poly([[14.5, 13], [9.5, 18]])]),
  c("insecure-random", "Insecure random", "An open lock with a wobbling line in it — randomness an attacker can predict",
    ["random", "entropy", "attack"], [], ["insecure random", "predictable random", "weak prng", "math.random"],
    "lock", [...OPENLOCK(), poly([[8, 17], [10.5, 14.5], [13, 17], [15.5, 14.5]])]),
  c("credential-leak", "Credential leak", "An open lock with the key still in it — a password or token that got out",
    ["credential", "leak", "attack"], [], ["credential leak", "leaked password", "leaked token", "exposed credentials"],
    "lock", [...OPENLOCK(), ...keyMark(SMALL, 15.5)]),
  c("timing-attack", "Timing attack", "An open lock with a clock in it — a secret read from how long a check takes",
    ["timing", "attack", "clock"], [], ["timing attack", "constant time", "timing side channel", "compare timing"],
    "lock", [...OPENLOCK(), ...clockMark(SMALL, 15.5)]),
  c("side-channel", "Side channel", "An open lock with a signal in it — a secret read from power, cache or sound",
    ["side-channel", "attack", "hardware"], [], ["side channel", "cache timing", "spectre", "power analysis"],
    "lock", [...OPENLOCK(), arc(12, 17.5, 5, 200, 340), arc(12, 17.5, 2, 200, 340), disc(12, 17.5, 1)]),

  /* ── In the browser ───────────────────────────────────────────────────────────── */
  c("xss", "XSS", "A panel with a tag and something planted in it — script slipped into a page others will load",
    ["xss", "injection", "attack"], [], ["xss", "cross-site scripting", "script injection", "stored xss"],
    "window", [panel(), poly([[9, 9.5], [6.5, 12], [9, 14.5]]), poly([[15, 9.5], [17.5, 12], [15, 14.5]]), disc(12, 12, 1)]),
  c("csrf-token", "CSRF token", "A panel with a coin in it — the token a form carries to prove it came from this site",
    ["csrf", "token", "defence"], [], ["csrf token", "anti-forgery token", "synchronizer token", "form token"],
    "window", [panel(), ...coinMark(SMALL, 12)]),
  c("clickjacking", "Clickjacking", "A panel with a cursor in it — a click landing on something the user could not see",
    ["clickjacking", "frame", "attack"], [], ["clickjacking", "ui redress", "x-frame-options", "frame busting"],
    "window", [panel(), poly([[9, 8], [9, 15], [11, 13], [14, 13]], true)]),
  c("open-redirect", "Open redirect", "A panel with a path that turns off somewhere else — a link that sends users where it likes",
    ["redirect", "url", "attack"], [], ["open redirect", "unvalidated redirect", "redirect parameter", "phishing redirect"],
    "window", [panel(), poly([[6, 15], [11, 15], [15, 11]]), poly([[11.5, 11], [15, 11], [15, 14.5]])]),
  c("header-injection", "Header injection", "A panel with a header line and a bolt under it — a line break smuggled into a header",
    ["header", "injection", "attack"], [], ["header injection", "crlf injection", "response splitting", "http header injection"],
    "window", [panel(), row(9, 6, 18), BOLT(13.5, 11)]),
  c("security-header", "Security header", "A panel with a header line and a check under it — the headers a response carries to protect the page",
    ["header", "response", "defence"], [], ["security header", "hsts", "x-content-type-options", "secure headers"],
    "window", [panel(), row(9, 6, 18), poly([[9, 14], [11, 16], [15, 12]])]),
  c("exploit-poc", "Exploit PoC", "A panel with a prompt and a bolt — the proof that a flaw can actually be used",
    ["exploit", "poc", "attack"], [], ["exploit poc", "proof of concept", "working exploit", "reproduce vulnerability"],
    "window", [panel(), poly([[6.5, 9.5], [9, 12], [6.5, 14.5]]), BOLT(15, 9)]),

  /* ── On the server ────────────────────────────────────────────────────────────── */
  c("injection-flaw", "Injection flaw", "The wide machine with an arrow pushed into a box — input treated as an instruction",
    ["injection", "input", "attack"], [], ["injection flaw", "injection", "command injection", "owasp a03"],
    "machine", [machineWide(), ...ARROW_R(12, 5, 9), ...squareMark(SMALL, 12)]),
  c("ssrf", "SSRF", "The wide machine with an arrow that loops back into it — the server made to fetch something for the attacker",
    ["ssrf", "request", "attack"], [], ["ssrf", "server-side request forgery", "internal request", "metadata endpoint"],
    "machine", [machineWide(), poly([[8.5, 14.5], [8.5, 9.5], [15.5, 9.5], [15.5, 14.5]]), poly([[13, 12], [15.5, 14.5], [18, 12]])]),
  c("race-condition-sec", "Race condition", "The wide machine with two arrows racing — two requests arriving so close that a check is skipped",
    ["race", "concurrency", "attack"], [], ["race condition", "toctou", "double spend", "concurrent requests"],
    "machine", [machineWide(), ...ARROW_R(9.5, 5, 15), ...ARROW_R(14.5, 5, 12)]),
  c("dependency-confusion", "Dependency confusion", "The wide machine with two packages and a cross between them — the public one picked over the private one",
    ["dependency", "supply-chain", "attack"], [], ["dependency confusion", "namespace confusion", "public package shadowing", "substitution attack"],
    "machine", [machineWide(), disc(7.5, 12, 2), disc(16.5, 12, 2), poly([[10, 10], [14, 14]]), poly([[14, 10], [10, 14]])]),
  c("attack-surface", "Attack surface", "The wide machine with two arrows landing on a surface — everything an attacker can touch",
    ["surface", "exposure", "attack"], [], ["attack surface", "exposed surface", "entry points", "surface reduction"],
    "machine", [machineWide(), row(15, 6, 18), col(8, 7, 11), poly([[5.5, 8.5], [8, 11], [10.5, 8.5]]), col(16, 7, 11), poly([[13.5, 8.5], [16, 11], [18.5, 8.5]])]),

  /* ── In a file ────────────────────────────────────────────────────────────────── */
  c("hardcoded-secret", "Hardcoded secret", "A page with a key on it — a credential written straight into the source",
    ["secret", "source", "attack"], [], ["hardcoded secret", "secret in code", "committed password", "api key in repo"],
    "page", [page(), ...keyMark(SMALL, 13)]),
  c("xxe", "XXE", "A page with a tag and a bar in it — an XML entity that reads files it should not",
    ["xml", "injection", "attack"], [], ["xxe", "xml external entity", "entity expansion", "xml injection"],
    "page", [page(), poly([[10, 9.5], [7.5, 12], [10, 14.5]]), poly([[14, 9.5], [16.5, 12], [14, 14.5]]), col(12, 9.5, 14.5)]),
  c("typosquat", "Typosquat", "A page with a line that ends in a wrong character — a package named one letter off the real one",
    ["package", "typosquat", "attack"], [], ["typosquat", "typosquatting", "lookalike package", "misspelled dependency"],
    "page", [page(), row(9, 8, 16), row(13, 8, 11.5), poly([[13, 11.5], [16, 14.5]]), poly([[16, 11.5], [13, 14.5]])]),
  c("threat-model", "Threat model", "A page with a decision diamond and a path out — what could go wrong, worked out before it does",
    ["threat", "model", "defence"], [], ["threat model", "threat modelling", "data flow diagram", "what could go wrong"],
    "page", [page(), poly([[12, 8], [15, 11], [12, 14], [9, 11]], true), col(12, 14, 18)]),
  c("subresource-integrity", "Subresource integrity", "A page with a hash on it — a script only loaded if its hash matches",
    ["integrity", "hash", "defence"], [], ["subresource integrity", "sri", "integrity attribute", "script hash"],
    "page", [page(), col(10, 9, 15), col(14, 9, 15), row(12, 8, 16)]),

  /* ── Into the thing that already has a body ───────────────────────────────────── */
  c("sql-injection", "SQL injection", "The database cylinder with a bolt in it — a query with an attacker's text in it",
    ["sql", "injection", "attack"], [], ["sql injection", "sqli", "or 1=1", "parameterise queries"],
    "cylinder", [CYL(), BOLT(14, 8.5)]),
  c("path-traversal", "Path traversal", "A folder with two chevrons climbing out of it — a path that walks up past where it should",
    ["path", "traversal", "attack"], [], ["path traversal", "directory traversal", "dot dot slash", "../"],
    "folder", [folder(), poly([[9.5, 12.5], [12, 10], [14.5, 12.5]]), poly([[9.5, 16.5], [12, 14], [14.5, 16.5]])]),
  c("deserialisation-flaw", "Deserialisation flaw", "A bolt landing in a tray — data unpacked into an object that does something on arrival",
    ["deserialisation", "input", "attack"], [], ["deserialisation flaw", "insecure deserialization", "gadget chain", "pickle"],
    "tray", [tray(), poly([[15, 4], [10.5, 8.5], [13.5, 8.5], [9, 13]])]),
  c("supply-chain-attack", "Supply chain attack", "The delivery truck with a bolt in its cargo — something planted before it reached you",
    ["supply-chain", "attack", "package"], [], ["supply chain attack", "compromised dependency", "malicious package", "build compromise"],
    "truck", [...TRUCK(), BOLT(10.5, 7.5)]),
  c("sandbox-escape", "Sandbox escape", "A box inside a box with an arrow climbing out of the inner one — code reaching past its walls",
    ["sandbox", "escape", "attack"], [], ["sandbox escape", "container escape", "break out", "isolation bypass"],
    "window", [rect(2, 2, 20, 20, 2), rect(7, 9, 10, 9, 2), col(12, 5.5, 13), poly([[9.5, 8], [12, 5.5], [14.5, 8]])]),
  c("stride-model", "STRIDE", "A window ruled into columns — threats sorted by kind",
    ["threat", "model", "defence"], [], ["stride", "stride model", "spoofing tampering repudiation", "threat categories"],
    "window", [window_(), col(9.5, 8, 18), col(14.5, 8, 18)]),
  c("owasp", "OWASP list", "A clipboard with a bulleted list — the flaws that come up most",
    ["owasp", "list", "defence"], [], ["owasp", "owasp top 10", "top ten", "common vulnerabilities"],
    "clipboard", [...clipboard(), disc(9, 11, 1), row(11, 11, 15), disc(9, 15, 1), row(15, 11, 15)]),
  c("content-security-policy", "Content security policy", "A window with a shield in it — the page told exactly what it may load",
    ["csp", "browser", "defence"], [], ["content security policy", "csp", "csp header", "script-src"],
    "window", [window_(), ...shieldMark(SMALL, 13)]),

  /* ── Inside the running application ──────────────────────────────────────────── */
  c("input-validation", "Input validation", "The wide machine with a funnel in it — input checked before the server takes it",
    ["input", "validation", "defence"], [], ["input validation", "validate input", "allowlist", "sanitise input"],
    "machine", [machineWide(), ...funnelMark(SMALL, 12)]),
  c("rasp", "RASP", "The wide machine with a shield in it — protection that runs inside the application itself",
    ["rasp", "runtime", "defence"], [], ["rasp", "runtime application self-protection", "in-app protection", "runtime defence"],
    "machine", [machineWide(), ...shieldMark(SMALL, 12)]),

  /* ── What stands in the way ───────────────────────────────────────────────────── */
  c("defence-in-depth", "Defence in depth", "A shield with a shield inside it — more than one layer between the attacker and the data",
    ["defence", "layers", "depth"], [], ["defence in depth", "defense in depth", "layered security", "multiple controls"],
    "shield", [shield(), ...shieldMark(SMALL, 11)]),
  c("fail-secure", "Fail secure", "A shield with a lock in it — when something breaks, it breaks closed",
    ["fail", "secure", "defence"], [], ["fail secure", "fail closed", "deny by default", "safe failure"],
    "shield", [shield(), ...lockMark(SMALL, 11)]),
  c("security-review-gate", "Security review gate", "A shield with a bar across it — nothing ships until security has looked",
    ["review", "gate", "defence"], [], ["security review gate", "security sign-off", "appsec review", "release gate"],
    "shield", [shield(), col(12, 7.5, 14.5)]),
  c("patch-window", "Patch window", "A shield with a bracketed span in it — the time allowed to fix a known flaw",
    ["patch", "sla", "defence"], [], ["patch window", "remediation sla", "time to patch", "fix within days"],
    "shield", [shield(), poly([[10.5, 8], [8, 8], [8, 14], [10.5, 14]]), poly([[13.5, 8], [16, 8], [16, 14], [13.5, 14]]), row(11, 10.5, 13.5)]),
  c("output-encoding", "Output encoding", "A shield with angle brackets in it — text made safe before the page shows it",
    ["output", "encoding", "defence"], [], ["output encoding", "html escaping", "escape output", "contextual encoding"],
    "shield", [shield(), poly([[9.5, 8.5], [7, 11], [9.5, 13.5]]), poly([[14.5, 8.5], [17, 11], [14.5, 13.5]])]),
  c("parameterised-query", "Parameterised query", "A shield with a value threaded on a line — the value bound in, never pasted into the query",
    ["sql", "query", "defence"], [], ["parameterised query", "prepared statement", "bind parameters", "no string concatenation"],
    "shield", [shield(), row(11, 8, 16), disc(12, 11, 2)]),
  c("waf-rule", "WAF rule", "A shield with bricks in it — a rule the firewall applies to every request",
    ["waf", "rule", "defence"], [], ["waf rule", "web application firewall", "block rule", "request filter"],
    "shield", [shield(), row(9, 8, 16), row(13, 8, 16), col(12, 9, 13)]),
  c("pentest", "Pentest", "A shield with an arrow aimed into it — an attack run on purpose, by people you asked",
    ["pentest", "assessment", "defence"], [], ["pentest", "penetration test", "security assessment", "ethical hacking"],
    "shield", [shield(), ...ARROW_R(11, 7, 15)]),
  c("bug-bounty", "Bug bounty", "A shield with a coin in it — a reward for the flaw reported the right way",
    ["bounty", "program", "defence"], [], ["bug bounty", "bounty program", "hackerone", "reward for bugs"],
    "shield", [shield(), ...coinMark(SMALL, 11)]),
  c("responsible-disclosure", "Responsible disclosure", "A shield with an arrow that turns and is handed on — a flaw told to the people who can fix it, first",
    ["disclosure", "report", "defence"], [], ["responsible disclosure", "coordinated disclosure", "security.txt", "report a vulnerability"],
    "shield", [shield(), poly([[9, 8], [9, 13.5], [14.5, 13.5]]), poly([[12, 11], [14.5, 13.5], [12, 16]])]),
  c("cve-advisory", "CVE advisory", "A shield with a tag in it — a published flaw, with its number",
    ["cve", "advisory", "defence"], [], ["cve advisory", "security advisory", "cve id", "ghsa"],
    "shield", [shield(), ...tagMark(SMALL, 11)]),
  c("security-champion", "Security champion", "A person with a shield on the chest — the one on the team who carries security",
    ["champion", "team", "defence"], [], ["security champion", "appsec champion", "security advocate", "team security lead"],
    "person", [...PERSON(), ...shieldMark(SMALL, 17)]),
];
