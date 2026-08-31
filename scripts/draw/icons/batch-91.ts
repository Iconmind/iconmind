/**
 * Batch 91 — round 4 of the second thousand: API design and integration.
 *
 * The parts of an API that are decided rather than deployed: which verb, which parameter,
 * what comes back, what happens when it is called twice. The set already has the nouns —
 * `api`, `endpoint`, `request`, `response`, `openapi`, `graphql`, `grpc`, `sdk`, `client`,
 * `webhook-in`, `webhook-out` — so three planned entries were dropped as their own
 * duplicates (openapi-spec, grpc-service, client-library) and api-lint, api-diff and
 * sunset-header took their places.
 *
 * Motifs: the bracket pair is a contract, the card is a message, a capsule is a parameter,
 * and the verbs are drawn as arrows through a frame rather than as lettering. Composition
 * fills the frame; ink centroid under 2.0.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const api = (slug: string, subcategory: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[], family: string, shapes: Icon["shapes"]): Icon =>
  ({ slug, category: "devtools", subcategory, name, description, tags, family, aliases, keywords, shapes });

/** The bracket pair the contract family is built from. */
const braces = (): Icon["shapes"] =>
  [poly([[7, 4], [3, 4], [3, 20], [7, 20]]), poly([[17, 4], [21, 4], [21, 20], [17, 20]])];

/** A message card with its header band. */
const message = (): Icon["shapes"] => [rect(2, 4, 20, 15, 2), row(9, 2, 22)];

export const BATCH_91: Icon[] = [
  /* ── The contract ─────────────────────────────────────────────────────────────── */

  api("api-contract", "api", "API contract", "An API contract — what the caller may send and what it will get back, agreed in advance",
    ["agreement", "shape", "promise"], [], ["api contract", "interface contract", "schema agreement", "consumer contract"], "bracket",
    [...braces(), disc(12, 12, 3)]),

  api("api-version", "api", "API version", "An API version — which shape of the interface this call is speaking to",
    ["v1", "revision", "shape"], [], ["api version", "versioned api", "v1 v2", "api revision"], "card",
    [...message(), row(13, 5, 13), row(16, 5, 10)]),

  api("api-deprecate", "api", "Deprecated API", "A deprecated API — still answering, but on notice",
    ["sunset", "old", "notice"], [], ["deprecated api", "deprecation", "obsolete endpoint", "phase out"], "card",
    [rect(2, 5, 20, 14, 2), poly([[6, 16], [18, 8]])]),

  api("sunset-header", "api", "Sunset header", "A sunset header — the date the endpoint says it will stop answering",
    ["date", "end", "warning"], [], ["sunset header", "deprecation header", "end of life api", "retirement date"], "card",
    [rect(2, 3, 20, 10, 2), row(8, 5, 19), arc(12, 20, 6, 180, 360), row(20, 3, 21), col(12, 14, 17)]),

  api("api-lint", "api", "API lint", "An API lint — the rules an interface has to keep, checked before it ships",
    ["rules", "style", "check"], [], ["api lint", "spectral", "style rules", "api governance"], "card",
    [...message(), poly([[6, 13], [8, 15], [12, 11]]), poly([[6, 17], [8, 19], [12, 15]])]),

  api("api-diff", "api", "API diff", "An API diff — what changed between two versions, and whether it breaks anyone",
    ["change", "compare", "breaking"], [], ["api diff", "breaking change", "schema diff", "version compare"], "window",
    [rect(2, 4, 9, 16, 2), rect(13, 4, 9, 16, 2), row(9, 4, 9), row(9, 15, 20), row(14, 4, 7), row(14, 15, 18)]),

  api("graphql-schema", "api", "GraphQL schema", "A GraphQL schema — every type and the edges between them, which is the whole API",
    ["types", "graph", "sdl"], ["sdl"], ["graphql schema", "sdl", "type graph", "graphql types"], "lattice",
    [disc(12, 5, 2), disc(5, 17, 2), disc(19, 17, 2), poly([[10.5, 6.5], [6.5, 15.5]]), poly([[13.5, 6.5], [17.5, 15.5]]), row(17, 7, 17)]),

  /* ── Verbs ────────────────────────────────────────────────────────────────────── */

  api("http-get", "api", "GET", "GET — ask for something and change nothing by asking",
    ["read", "fetch", "safe"], [], ["http get", "get request", "read request", "fetch"], "window",
    [rect(2, 5, 20, 14, 2), poly([[15, 8], [18, 11], [15, 14]]), row(11, 6, 18), row(16, 6, 12)]),

  api("http-post", "api", "POST", "POST — hand something over and let the server decide where it lands",
    ["create", "send", "new"], [], ["http post", "post request", "create resource", "submit"], "window",
    [rect(2, 5, 20, 14, 2), col(12, 8, 16), row(12, 8, 16), row(19.5, 6, 18)]),

  api("http-put", "api", "PUT", "PUT — replace what is there with exactly this",
    ["replace", "whole", "idempotent"], [], ["http put", "put request", "replace resource", "full update"], "window",
    [rect(2, 5, 20, 14, 2), poly([[9, 12], [12, 9], [15, 12]]), col(12, 9, 16), row(19.5, 6, 18)]),

  api("http-patch", "api", "PATCH", "PATCH — change the parts named and leave the rest alone",
    ["partial", "some", "update"], [], ["http patch", "patch request", "partial update", "merge patch"], "window",
    [rect(2, 5, 20, 14, 2), row(10, 6, 18), row(14, 6, 12), row(19.5, 6, 18)]),

  api("http-delete", "api", "DELETE", "DELETE — ask for it to be gone",
    ["remove", "gone", "destroy"], [], ["http delete", "delete request", "remove resource", "destroy"], "window",
    [rect(2, 5, 20, 14, 2), poly([[9, 9], [15, 15]]), poly([[15, 9], [9, 15]]), row(19.5, 6, 18)]),

  /* ── What is in the call ──────────────────────────────────────────────────────── */

  api("request-body", "api", "Request body", "A request body — the payload carried up with the call",
    ["payload", "up", "json"], [], ["request body", "post body", "payload", "request json"], "card",
    [...message(), row(13, 5, 17), row(16, 5, 12), poly([[19, 15], [19, 12]])]),

  api("response-body", "api", "Response body", "A response body — what came back, before anything is done with it",
    ["payload", "down", "returned"], [], ["response body", "returned json", "api response", "payload back"], "card",
    [rect(2, 5, 20, 15, 2), row(11, 2, 22), row(14, 5, 17), row(17, 5, 12), poly([[19, 6], [19, 9]])]),

  api("header-request", "api", "Request header", "A request header — the metadata sent alongside, which decides how the body is read",
    ["metadata", "key-value", "alongside"], [], ["request header", "http header", "content type header", "custom header"], "card",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), row(6.5, 5, 12), row(13, 5, 19), row(17, 5, 14)]),

  api("query-param", "api", "Query parameter", "A query parameter — the part after the question mark that narrows the answer",
    ["filter", "querystring", "after-?"], [], ["query parameter", "query string", "url param", "search param"], "rails",
    [row(12, 2, 9), disc(11.5, 12, 1), rect(13, 8, 9, 8, 2), row(11, 15, 20), row(14, 15, 18)]),

  api("path-param", "api", "Path parameter", "A path parameter — the part of the URL that names which one",
    ["url", "segment", "which-one"], [], ["path parameter", "url segment", "route param", "resource id"], "rails",
    [row(12, 2, 22), col(8, 9, 15), col(16, 9, 15), disc(12, 12, 2)]),

  api("media-type", "api", "Media type", "A media type — what the bytes are, so the other end knows how to read them",
    ["mime", "content-type", "format"], ["mime-type"], ["media type", "mime type", "content type", "application json"], "card",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), row(6.5, 5, 13), poly([[8, 13], [5.5, 15.5], [8, 18]]), poly([[16, 13], [18.5, 15.5], [16, 18]])]),

  api("content-negotiation", "api", "Content negotiation", "Content negotiation — the caller says what it can read and the server picks",
    ["accept", "choose", "format"], [], ["content negotiation", "accept header", "format selection", "vary"], "chain",
    [rect(2, 4, 20, 7, 2), rect(2, 13, 20, 7, 2), poly([[8, 7.5], [11, 7.5]]), poly([[13, 16.5], [16, 16.5]]), poly([[11, 5.5], [13, 7.5], [11, 9.5]])]),

  api("field-mask", "api", "Field mask", "A field mask — the caller naming which fields it wants back and no others",
    ["select", "fields", "narrow"], [], ["field mask", "sparse fieldsets", "select fields", "partial fields"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), row(13, 5, 19), poly([[5, 16], [7, 18], [11, 14]]), row(17, 14, 19)]),

  api("partial-response", "api", "Partial response", "A partial response — a slice of the whole, because the whole was not asked for",
    ["slice", "range", "some"], [], ["partial response", "206 partial content", "range request", "partial payload"], "window",
    [rect(2, 4, 20, 16, 2), col(12, 4, 20), row(9, 3, 11), row(13, 3, 11), row(17, 3, 11)]),

  /* ── Caching and conditions ───────────────────────────────────────────────────── */

  api("etag", "api", "ETag", "An ETag — a short stamp for a version of the answer, so it can be asked after cheaply",
    ["stamp", "version", "hash"], [], ["etag", "entity tag", "resource version", "cache validator"], "tag",
    [poly([[12, 3], [21, 3], [21, 12], [12, 21], [3, 12]], true), disc(17, 7, 1)]),

  api("conditional-request", "api", "Conditional request", "A conditional request — send it back only if it has changed since last time",
    ["if-none-match", "cheap", "304"], [], ["conditional request", "if none match", "if modified since", "304 not modified"], "chain",
    [rect(2, 4, 20, 7, 2), rect(2, 13, 20, 7, 2), poly([[9, 7.5], [11, 9.5], [15, 5.5]]), row(16.5, 6, 18)]),

  api("rate-headers", "api", "Rate limit headers", "Rate limit headers — how many calls are left, and when the count resets",
    ["remaining", "reset", "budget"], [], ["rate limit headers", "x ratelimit remaining", "quota headers", "reset after"], "meter",
    [rect(2, 5, 20, 6, 3), rect(2, 5, 12, 6, 3), row(15, 3, 21), row(19, 3, 15)]),

  api("retry-after", "api", "Retry-After", "Retry-After — the server saying how long to wait before asking again",
    ["wait", "backoff", "seconds"], [], ["retry after", "backoff header", "429 retry", "wait before retry"], "clock",
    [disc(12, 9, 6), col(12, 5, 9), row(9, 9, 13), row(19, 4, 20), poly([[17, 17], [19, 19], [17, 21]])]),

  /* ── Doing it more than once ──────────────────────────────────────────────────── */

  api("idempotent-post", "api", "Idempotent POST", "An idempotent POST — sent twice by accident, but the thing is only created once",
    ["once", "key", "safe-retry"], [], ["idempotent post", "idempotency key", "exactly once", "safe retry"], "cycle",
    [rect(2, 13, 20, 8, 2), poly([[6, 4], [18, 4], [18, 9]]), poly([[18, 9], [15, 6]]), poly([[8, 17], [11, 20], [16, 15]])]),

  api("request-id-api", "api", "Request id", "A request id — one call given a name so both sides can talk about it later",
    ["correlation", "trace", "name"], ["correlation-id"], ["request id", "correlation id", "trace id header", "x request id"], "card",
    [...message(), disc(6, 14, 1), row(14, 9, 19), row(17.5, 9, 15)]),

  api("request-signing", "api", "Request signing", "Request signing — the caller proving the message is theirs and unaltered",
    ["sign", "prove", "integrity"], [], ["request signing", "signed request", "aws sigv4", "message signature"], "card",
    [rect(2, 3, 20, 12, 2), row(8, 5, 19), poly([[5, 20], [9, 16], [13, 20], [17, 16], [21, 20]])]),

  api("hmac-signature", "api", "HMAC signature", "An HMAC signature — a shared secret turned into a stamp only both ends can make",
    ["shared-secret", "stamp", "verify"], [], ["hmac", "hmac signature", "shared secret", "message authentication"], "key",
    [disc(5, 12, 3), row(12, 8, 20), col(15, 12, 16), rect(2, 3, 20, 4, 2)]),

  /* ── Getting in ───────────────────────────────────────────────────────────────── */

  api("api-key-rotate", "api", "API key rotation", "API key rotation — the new key issued and the old one retired without a gap",
    ["replace", "renew", "cycle"], [], ["api key rotation", "rotate key", "key renewal", "credential rotation"], "cycle",
    [disc(5, 15, 3), row(15, 8, 20), col(17, 15, 19), poly([[5, 8], [17, 8], [17, 4]]), poly([[17, 4], [14, 6.5]])]),

  api("client-credentials", "api", "Client credentials", "Client credentials — a machine getting a token with no person involved",
    ["machine", "no-user", "grant"], [], ["client credentials", "machine to machine", "service account token", "oauth grant"], "machine",
    [rect(3, 3, 18, 10, 2), row(8, 6, 18), disc(6, 18, 3), row(18, 9, 21)]),

  api("device-code", "api", "Device code", "A device code — a screen with no keyboard, and a code typed somewhere else",
    ["tv", "pair", "code"], [], ["device code", "device flow", "pairing code", "no keyboard login"], "device",
    [rect(2, 3, 20, 13, 2), row(11, 6, 18), col(12, 16, 19), row(19, 7, 17)]),

  api("refresh-token-api", "api", "Refresh token", "A refresh token — the long-lived one kept so a short-lived one can be reissued",
    ["renew", "long-lived", "reissue"], [], ["refresh token", "token refresh", "reissue access token", "long lived token"], "cycle",
    [rect(2, 9, 20, 6, 3), poly([[6, 5], [18, 5], [18, 8]]), poly([[18, 8], [15.5, 5.5]]), poly([[18, 19], [6, 19], [6, 16]]), poly([[6, 16], [8.5, 18.5]])]),

  /* ── Volume ───────────────────────────────────────────────────────────────────── */

  api("batch-request", "api", "Batch request", "A batch request — many calls posted together and answered together",
    ["many", "together", "one-call"], [], ["batch request", "batched api", "multi request", "bulk call"], "rails",
    [rect(2, 3, 9, 6, 3), rect(2, 11, 9, 6, 3), rect(13, 3, 9, 6, 3), rect(13, 11, 9, 6, 3), row(20, 4, 20)]),

  api("bulk-endpoint", "api", "Bulk endpoint", "A bulk endpoint — one call that writes a great many rows",
    ["many-rows", "load", "one-call"], [], ["bulk endpoint", "bulk api", "mass insert", "bulk load api"], "funnel",
    [row(4, 2, 10), row(8, 2, 10), row(12, 2, 10), row(16, 2, 10), poly([[10, 3], [16, 9], [16, 15], [10, 21]]), row(12, 16, 22)]),

  api("long-running-operation", "api", "Long-running operation", "A long-running operation — the call returns a handle, and the work goes on",
    ["async", "handle", "later"], ["lro"], ["long running operation", "async api", "operation handle", "202 accepted"], "clock",
    [rect(2, 4, 20, 7, 2), row(7.5, 5, 19), disc(12, 17, 4.5), col(12, 13.5, 17), row(17, 12, 16)]),

  api("operation-poll", "api", "Operation poll", "Operation polling — asking again and again whether the work is done yet",
    ["ask-again", "status", "until-done"], [], ["operation polling", "poll status", "check until done", "async poll"], "cycle",
    [arc(12, 12, 8, 120, 60), poly([[15, 3], [18.5, 5], [15, 7]]), disc(12, 12, 1), row(12, 8, 16)]),

  api("api-usage", "api", "API usage", "API usage — how much of the allowance has been spent so far",
    ["consumed", "meter", "so-far"], [], ["api usage", "usage meter", "calls used", "consumption"], "meter",
    [rect(2, 8, 20, 8, 2), rect(2, 8, 13, 8, 2), row(4, 3, 21), row(20, 3, 21)]),

  api("api-analytics", "api", "API analytics", "API analytics — which endpoints are called, by whom, and how well they answer",
    ["traffic", "chart", "per-endpoint"], [], ["api analytics", "endpoint metrics", "api traffic", "usage analytics"], "chart",
    [col(4, 3, 21), row(21, 4, 21), rect(7, 12, 4, 9, 2), rect(13, 7, 4, 14, 2), rect(19, 15, 3, 6, 1.5)]),

  /* ── Trying it out ────────────────────────────────────────────────────────────── */

  api("api-mock", "api", "Mock API", "A mock API — an endpoint that answers with an example so the caller can be built first",
    ["fake", "example", "stand-in"], [], ["mock api", "stub endpoint", "fake server", "example response"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), poly([[6, 13], [9, 16], [6, 19]]), row(16, 11, 19), disc(5.5, 6.5, 1)]),

  api("api-playground", "api", "API playground", "A playground — the request on one side, the live answer on the other",
    ["try", "explore", "live"], [], ["api playground", "try it out", "api explorer", "interactive docs"], "window",
    [rect(2, 4, 20, 16, 2), col(12, 4, 20), row(9, 4, 10), row(13, 4, 9), poly([[14, 12], [16, 14], [20, 10]])]),

  api("api-console", "api", "API console", "An API console — the calls typed by hand while something is being worked out",
    ["terminal", "by-hand", "call"], [], ["api console", "http client", "curl console", "request runner"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), poly([[6, 13], [9, 16], [6, 19]]), row(19, 11, 18)]),

  api("sandbox-api", "api", "Sandbox API", "A sandbox — the same interface, with nothing real behind it",
    ["test", "safe", "no-real-data"], [], ["sandbox api", "test environment api", "staging api", "safe to call"], "window",
    [rect(2, 6, 20, 14, 2), row(11, 2, 22), poly([[7, 6], [12, 2], [17, 6]]), disc(12, 16, 1)]),

  api("sdk-generate", "api", "Generate SDK", "Generating an SDK — the client library written from the description of the API",
    ["codegen", "client", "from-spec"], [], ["sdk generation", "client generation", "codegen", "generate client"], "page",
    [poly([[13, 3], [6, 3], [6, 13], [18, 13], [18, 8]], true), col(12, 14, 18), poly([[9, 17], [12, 20], [15, 17]]), row(21, 6, 18)]),

  /* ── Webhooks ─────────────────────────────────────────────────────────────────── */

  api("webhook-delivery", "api", "Webhook delivery", "A webhook delivery — one attempt to hand an event to a listener, and how it went",
    ["attempt", "sent", "receipt"], [], ["webhook delivery", "delivery attempt", "event delivered", "hook receipt"], "card",
    [rect(2, 3, 20, 10, 2), row(8, 5, 19), poly([[6, 18], [9, 21], [14, 16]]), row(21, 16, 21)]),

  api("webhook-retry", "api", "Webhook retry", "A webhook retry — the listener did not answer, so it is sent again later",
    ["again", "backoff", "failed"], [], ["webhook retry", "redeliver", "retry delivery", "failed webhook"], "cycle",
    [rect(2, 3, 20, 9, 2), row(7.5, 5, 19), poly([[6, 16], [18, 16], [18, 20]]), poly([[18, 20], [15.5, 17.5]]), poly([[6, 16], [8.5, 18.5]])]),

  api("webhook-secret", "api", "Webhook secret", "A webhook secret — the shared value that proves the event really came from there",
    ["shared", "verify", "signature"], [], ["webhook secret", "signing secret", "verify webhook", "hook signature"], "lock",
    [rect(2, 3, 20, 9, 2), row(7.5, 5, 19), rect(7, 16, 10, 6, 3), arc(12, 16, 3, 180, 360)]),

  api("event-payload", "api", "Event payload", "An event payload — what the event says happened, in the shape listeners expect",
    ["body", "event", "json"], [], ["event payload", "event body", "webhook payload", "event schema"], "card",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), disc(5.5, 6.5, 1), row(13, 5, 17), row(17, 5, 12)]),

  /* ── Paging ───────────────────────────────────────────────────────────────────── */

  api("pagination-offset", "api", "Offset pagination", "Offset pagination — page three of the answer, counted from the start",
    ["page", "skip", "count"], [], ["offset pagination", "limit offset", "page number", "skip take"], "rails",
    [rect(2, 4, 6, 6, 2), rect(9, 4, 6, 6, 2), rect(16, 4, 6, 6, 2), row(14, 2, 22), poly([[13, 18], [16, 21], [13, 24 - 6]])]),

  api("pagination-cursor", "api", "Cursor pagination", "Cursor pagination — carry on from this exact row, whatever has been added since",
    ["cursor", "after", "stable"], [], ["cursor pagination", "keyset pagination", "after cursor", "seek pagination"], "rails",
    [rect(2, 4, 20, 6, 3), rect(2, 13, 20, 6, 3), disc(17, 7, 1), poly([[6, 16], [9, 16]]), poly([[9, 14], [11, 16], [9, 18]])]),
];
