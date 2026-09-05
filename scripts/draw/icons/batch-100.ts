/**
 * R13 · Identity, access & sessions — who you are, what you may do, and how long that lasts.
 *
 * A token is a ticket: a card with a notch bitten out of each side, so it reads as a thing
 * handed over at a gate. Every claim, code and grant that rides in a token sits on the
 * ticket. A person is the bust with the mark on the chest. What is locked is the padlock;
 * what is timed is the ring the clock stands in; what is on a device is the phone passkey
 * draws; what is filed is the folder.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { clipboard, folder, key, machineWide, padlock, ring, window_ } from "../bodies.ts";
import {
  SMALL, add, check, coinMark, funnelMark, keyMark, listMark, lockMark, off, pinMark, remove, searchMark,
  squareMark, tagMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "security", subcategory: "auth", name, description,
  tags, aliases, keywords, family, shapes,
});

/** A ticket: a card with a half-round notch bitten out of each side. The hollow is x 4..20, y 6..18; marks at cy 12. */
const TICKET = () => raw(
  "M4 5H20A2 2 0 0 1 22 7V10A2 2 0 0 0 22 14V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17V14A2 2 0 0 0 2 10V7A2 2 0 0 1 4 5Z",
  "a ticket: a rounded card with a notch in each side", true);
/** A person: the head, and shoulders wide enough to carry a mark on the chest at cy 17. */
const PERSON = () => [disc(12, 6, 3), arc(12, 21, 9, 180, 360)];
/** The phone passkey stands in. Marks sit at cy 12. */
const PHONE = () => rect(7, 3, 10, 18, 2);
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** A hash: two posts and a bar, centred on (12, cy). */
const HASH = (cy: number) => [col(10, cy - 3, cy + 3), col(14, cy - 3, cy + 3), row(cy, 8, 16)];

export const BATCH_100: Icon[] = [
  /* ── Tokens and what they carry ───────────────────────────────────────────────── */
  c("jwt-token", "JWT", "A ticket ruled into three parts — header, payload and signature",
    ["token", "jwt", "identity"], [], ["jwt", "json web token", "bearer token", "header payload signature"],
    "ticket", [TICKET(), col(9.5, 9, 15), col(14.5, 9, 15)]),
  c("id-token", "ID token", "A ticket with a person on it — the token that says who just signed in",
    ["token", "identity", "oidc"], [], ["id token", "identity token", "openid token", "who signed in"],
    "ticket", [TICKET(), disc(12, 10, 2), arc(12, 16, 3.5, 180, 360)]),
  c("access-token-scope", "Token scope", "A ticket with a funnel on it — what this token is allowed to reach, and no more",
    ["token", "scope", "access"], [], ["token scope", "access token scope", "scoped token", "least scope"],
    "ticket", [TICKET(), ...funnelMark(SMALL, 12)]),
  c("token-introspect", "Token introspection", "A ticket with a lens on it — the server asked what a token really holds",
    ["token", "introspect", "verify"], [], ["token introspection", "introspect token", "is it still valid", "rfc 7662"],
    "ticket", [TICKET(), ...searchMark(SMALL, 12)]),
  c("token-revoke", "Revoke token", "A ticket with a cross on it — a token that no longer opens anything",
    ["token", "revoke", "invalidate"], [], ["revoke token", "token revocation", "invalidate token", "kill token"],
    "ticket", [TICKET(), ...off(SMALL, 12)]),
  c("token-exchange", "Token exchange", "A ticket with an arrow pointing both ways — one token swapped for another",
    ["token", "exchange", "swap"], [], ["token exchange", "rfc 8693", "swap tokens", "on-behalf-of"],
    "ticket", [TICKET(), row(12, 8, 16), poly([[10.5, 9.5], [8, 12], [10.5, 14.5]]), poly([[13.5, 9.5], [16, 12], [13.5, 14.5]])]),
  c("audience-claim", "Audience claim", "A ticket with two points on it — who a token is meant for",
    ["token", "claim", "audience"], [], ["audience claim", "aud", "intended audience", "token audience"],
    "ticket", [TICKET(), disc(9, 12, 1), disc(15, 12, 1)]),
  c("issuer-claim", "Issuer claim", "A ticket with a seal on it — who minted the token",
    ["token", "claim", "issuer"], [], ["issuer claim", "iss", "token issuer", "trusted issuer"],
    "ticket", [TICKET(), disc(12, 12, 3)]),
  c("subject-claim", "Subject claim", "A ticket with a tag on it — the id of who the token is about",
    ["token", "claim", "subject"], [], ["subject claim", "sub", "token subject", "user id claim"],
    "ticket", [TICKET(), ...tagMark(SMALL, 12)]),
  c("nonce-check", "Nonce check", "A ticket with a check on it — a value used once, and seen to match",
    ["token", "nonce", "replay"], [], ["nonce check", "nonce", "replay protection", "used once"],
    "ticket", [TICKET(), ...check(SMALL, 12)]),
  c("assertion-saml", "SAML assertion", "A ticket with lines of text on it — the signed statement that a user is who they say",
    ["token", "saml", "assertion"], [], ["saml assertion", "assertion", "signed statement", "identity provider response"],
    "ticket", [TICKET(), row(10, 8, 16), row(14, 8, 13)]),
  c("client-secret", "Client secret", "A ticket with a key on it — what an application shows to prove it is itself",
    ["token", "client", "secret"], [], ["client secret", "client credentials", "app secret", "confidential client"],
    "ticket", [TICKET(), ...keyMark(SMALL, 12)]),
  c("refresh-rotation", "Refresh rotation", "A ticket with an arrow looping back — a refresh token replaced each time it is used",
    ["token", "refresh", "rotate"], [], ["refresh token rotation", "rotate refresh token", "one-time refresh", "reuse detection"],
    "ticket", [TICKET(), poly([[8.5, 14.5], [8.5, 9.5], [15.5, 9.5], [15.5, 14.5]]), poly([[13, 12], [15.5, 14.5], [18, 12]])]),
  c("authorisation-code", "Authorisation code", "A ticket with a hash on it — the short code traded for a token",
    ["token", "oauth", "code"], [], ["authorization code", "auth code flow", "code grant", "exchange code for token"],
    "ticket", [TICKET(), ...HASH(12)]),
  c("pkce", "PKCE", "A ticket with a lock on it — the code flow with a proof key, so the code alone is useless",
    ["token", "oauth", "pkce"], [], ["pkce", "proof key for code exchange", "code verifier", "code challenge"],
    "ticket", [TICKET(), ...lockMark(SMALL, 12)]),
  c("implicit-flow", "Implicit flow", "A ticket with an arrow straight through it — the token handed over with no code step",
    ["token", "oauth", "flow"], [], ["implicit flow", "implicit grant", "token in fragment", "legacy oauth flow"],
    "ticket", [TICKET(), ...ARROW_R(12, 7, 16)]),
  c("access-request", "Access request", "A ticket with a plus on it — someone asking to be let in",
    ["access", "request", "approval"], [], ["access request", "request access", "ask for permission", "approval workflow"],
    "ticket", [TICKET(), ...add(SMALL, 12)]),
  c("entitlement", "Entitlement", "A ticket with a coin on it — what a user is owed by virtue of who they are",
    ["access", "entitlement", "grant"], [], ["entitlement", "entitlements", "granted rights", "licence entitlement"],
    "ticket", [TICKET(), ...coinMark(SMALL, 12)]),
  c("segregation-of-duties", "Segregation of duties", "A ticket with a divider and a person on each side — no one person holds both halves",
    ["access", "duties", "control"], [], ["segregation of duties", "separation of duties", "four eyes", "no single person"],
    "ticket", [TICKET(), col(12, 8, 16), disc(8.5, 12, 1), disc(15.5, 12, 1)]),
  c("machine-identity", "Machine identity", "A ticket with a square on it, not a face — an identity that belongs to a workload",
    ["identity", "machine", "workload"], [], ["machine identity", "non-human identity", "workload identity", "service identity"],
    "ticket", [TICKET(), ...squareMark(SMALL, 12)]),
  c("sso-session", "SSO session", "A ticket with two rings tied together — one sign-in that opens several apps",
    ["session", "sso", "login"], [], ["sso session", "single sign-on session", "one login", "shared session"],
    "ticket", [TICKET(), disc(8.5, 12, 2), disc(15.5, 12, 2), row(12, 10.5, 13.5)]),
  c("workload-federation", "Workload federation", "A ticket with one line splitting into two — an outside identity accepted here",
    ["identity", "federation", "workload"], [], ["workload identity federation", "federated identity", "trust external issuer", "oidc federation"],
    "ticket", [TICKET(), poly([[7, 12], [10, 12], [13, 9], [16, 9]]), poly([[10, 12], [13, 15], [16, 15]])]),

  /* ── Keys and devices ─────────────────────────────────────────────────────────── */
  c("magic-link", "Magic link", "A key with a point and a line on it — a sign-in sent as a link to click",
    ["login", "link", "email"], [], ["magic link", "email login link", "passwordless link", "sign-in link"],
    "key", [...key(), disc(9, 8.5, 1), row(8.5, 10.5, 15)]),
  c("recovery-code", "Recovery code", "A padlock with a hash in it — the code kept aside for when the second factor is lost",
    ["login", "recovery", "mfa"], [], ["recovery code", "backup code", "lost authenticator", "one-time recovery"],
    "lock", [...padlock(), ...HASH(15.5)]),
  c("step-up-auth", "Step-up auth", "A key with a staircase on it — a stronger check asked for before a sensitive action",
    ["login", "step-up", "mfa"], [], ["step-up authentication", "re-authenticate", "stronger factor", "sensitive action"],
    "key", [...key(), poly([[8, 11], [10.5, 11], [10.5, 8.5], [13, 8.5], [13, 6], [15.5, 6]])]),
  c("device-trust", "Device trust", "A phone with a check on it — a device known and allowed before the user is",
    ["device", "trust", "posture"], [], ["device trust", "trusted device", "device posture", "managed device"],
    "figure", [PHONE(), ...check(SMALL, 12)]),
  c("device-code-flow", "Device code flow", "A phone with a code on it — sign in on another device by typing what this one shows",
    ["device", "oauth", "code"], [], ["device code flow", "device authorization grant", "enter code on another device", "tv login"],
    "figure", [PHONE(), ...HASH(12)]),

  /* ── People ───────────────────────────────────────────────────────────────────── */
  c("service-principal", "Service principal", "A person with a square where the heart would be — an account that is not a person",
    ["identity", "service", "account"], [], ["service principal", "service account", "app identity", "non-interactive account"],
    "person", [...PERSON(), ...squareMark(SMALL, 17)]),
  c("delegate-access", "Delegate access", "A person with an arrow across the chest — rights handed on to someone else",
    ["access", "delegate", "grant"], [], ["delegate access", "delegated permissions", "act on behalf", "grant to another"],
    "person", [...PERSON(), ...ARROW_R(17, 9, 15.5)]),
  c("role-assignment", "Role assignment", "A person with a tag on the chest — the role a user has been given",
    ["access", "role", "assign"], [], ["role assignment", "assign role", "rbac assignment", "user role"],
    "person", [...PERSON(), ...tagMark(SMALL, 17)]),
  c("user-provisioning", "User provisioning", "A person with a plus on the chest — an account created and given its first access",
    ["identity", "provision", "lifecycle"], [], ["user provisioning", "provision user", "scim create", "onboarding"],
    "person", [...PERSON(), ...add(SMALL, 17)]),
  c("user-deprovision", "User deprovisioning", "A person with a minus on the chest — an account closed and its access taken back",
    ["identity", "deprovision", "lifecycle"], [], ["user deprovisioning", "deprovision user", "offboarding", "remove access"],
    "person", [...PERSON(), ...remove(SMALL, 17)]),
  c("session-revoke", "Revoke session", "A person with a cross on the chest — signed out whether they liked it or not",
    ["session", "revoke", "logout"], [], ["revoke session", "kill session", "force logout", "end session"],
    "person", [...PERSON(), ...off(SMALL, 17)]),
  c("impersonate", "Impersonate", "Two heads overlapping on one pair of shoulders — acting as another user",
    ["identity", "impersonate", "support"], [], ["impersonate", "impersonation", "log in as user", "act as"],
    "figure", [disc(10, 8, 3), disc(14, 8, 3), arc(12, 21, 7, 180, 360)]),
  c("concurrent-session", "Concurrent sessions", "The wide machine with two people signed in — the same account, in two places",
    ["session", "concurrent", "limit"], [], ["concurrent sessions", "multiple sessions", "session limit", "same account twice"],
    "machine", [machineWide(), disc(8, 10, 2), arc(8, 16, 3, 180, 360), disc(16, 10, 2), arc(16, 16, 3, 180, 360)]),

  /* ── Locks, scopes and reviews ────────────────────────────────────────────────── */
  c("permission-set", "Permission set", "A padlock with a list in it — the permissions that travel together",
    ["access", "permission", "set"], [], ["permission set", "permission bundle", "policy set", "grouped permissions"],
    "lock", [...padlock(), ...listMark(SMALL, 15.5)]),
  c("attribute-based", "Attribute-based access", "A padlock with a tag in it — access decided by what is true of the user, not just their role",
    ["access", "attribute", "abac"], [], ["attribute-based access control", "abac", "policy by attribute", "contextual access"],
    "lock", [...padlock(), ...tagMark(SMALL, 15.5)]),
  c("session-fixation-guard", "Session fixation guard", "A padlock with a pin in it — a new session id issued at login, so a planted one is useless",
    ["session", "fixation", "guard"], [], ["session fixation guard", "regenerate session id", "rotate session on login", "fixation protection"],
    "lock", [...padlock(), ...pinMark(SMALL, 15.5)]),
  c("account-lockout", "Account lockout", "A padlock with a person in it — an account shut after too many wrong tries",
    ["login", "lockout", "brute-force"], [], ["account lockout", "locked out", "too many attempts", "brute force protection"],
    "lock", [...padlock(), disc(12, 14, 2), row(18.5, 9, 15)]),
  c("scope-grant", "Scope grant", "A clipboard with a funnel on it — an application allowed this much of a user's account",
    ["access", "scope", "grant"], [], ["scope grant", "granted scopes", "consented scopes", "oauth scopes"],
    "clipboard", [...clipboard(), ...funnelMark(SMALL, 13.5)]),
  c("scope-deny", "Scope deny", "A clipboard with a funnel struck through — a scope the application asked for and did not get",
    ["access", "scope", "deny"], [], ["scope deny", "denied scope", "refused permission", "scope not granted"],
    "clipboard", [...clipboard(), poly([[9, 10.5], [12, 13.5], [15, 10.5]]), col(12, 13.5, 16.5), poly([[8.5, 17], [15.5, 10]])]),
  c("access-review", "Access review", "A clipboard with a key on it — who still has what, gone over on a schedule",
    ["access", "review", "audit"], [], ["access review", "access certification", "recertify access", "quarterly review"],
    "clipboard", [...clipboard(), ...keyMark(SMALL, 13.5)]),
  c("group-membership", "Group membership", "A folder with a person in it — the groups a user is filed under",
    ["identity", "group", "membership"], [], ["group membership", "member of", "security group", "user groups"],
    "folder", [folder(), disc(12, 11, 2), arc(12, 17, 3.5, 180, 360)]),
  c("directory-sync", "Directory sync", "A folder with an arrow looping back — users and groups copied over from the directory",
    ["identity", "directory", "sync"], [], ["directory sync", "scim", "ldap sync", "user sync"],
    "folder", [folder(), poly([[8.5, 16], [8.5, 11], [15.5, 11], [15.5, 16]]), poly([[13, 13.5], [15.5, 16], [18, 13.5]])]),
  c("tenant-isolation", "Tenant isolation", "Two boxes with a wall between them — one customer's data kept from another's",
    ["identity", "tenant", "isolation"], [], ["tenant isolation", "multi-tenant", "tenant boundary", "data separation"],
    "window", [rect(2, 7, 8, 10, 2), rect(14, 7, 8, 10, 2), col(12, 5, 19)]),
  c("consent-screen", "Consent screen", "A window with a title and one button — the page that asks the user to allow it",
    ["login", "consent", "oauth"], [], ["consent screen", "authorize app", "allow access screen", "oauth consent"],
    "window", [window_(), row(9, 6, 18), rect(8.5, 13, 7, 4, 2)]),

  /* ── Time ─────────────────────────────────────────────────────────────────────── */
  c("session-timeout", "Session timeout", "A ring with an hourglass in it — a session that ends when its time runs out",
    ["session", "timeout", "expiry"], [], ["session timeout", "session expiry", "absolute timeout", "max session age"],
    "orbit", [ring(), poly([[10, 10], [14, 10], [10, 14], [14, 14]], true)]),
  c("idle-timeout", "Idle timeout", "A ring with a Z in it — a session that ends when nobody has touched it for a while",
    ["session", "idle", "timeout"], [], ["idle timeout", "inactivity timeout", "auto logout", "session idle"],
    "orbit", [ring(), poly([[9.5, 9.5], [14.5, 9.5], [9.5, 14.5], [14.5, 14.5]])]),
  c("session-cookie", "Session cookie", "A cookie with a bite out of it and its chips — the small thing the browser sends back to say it is still you",
    ["session", "cookie", "browser"], [], ["session cookie", "cookie", "httponly cookie", "secure cookie"],
    "cookie", [raw("M12 4A8 8 0 1 0 20 12A6 6 0 0 1 12 4Z", "a cookie: a circle with a bite taken out of the top right", true), disc(9, 10, 1), disc(11, 15, 1), disc(15, 14, 1)]),
  c("logout-all", "Log out everywhere", "A door with two arrows leaving through it — every session ended at once",
    ["session", "logout", "all"], [], ["log out everywhere", "logout all devices", "sign out all sessions", "global logout"],
    "arrow", [poly([[9, 3], [3, 3], [3, 21], [9, 21]]), ...ARROW_R(9, 10, 20), ...ARROW_R(15, 10, 20)]),
];
