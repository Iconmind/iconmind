/**
 * R17 · AI: context, memory & state — what a model is holding right now, what it keeps
 * between turns, and what an agent knows to be true.
 *
 * The context is the bracket pair `context-window` draws — narrower than code's, so it
 * reads as a window, with what fills it in between. Memory is the tray: what is put in
 * and taken out again. State is the ring the set's clock stands in. What is written
 * down is the clipboard; what the agent says to itself is the bubble.
 */
import { arc, col, disc, frame, poly, row } from "../forms.ts";
import { clipboard, cycle, ring, tray } from "../bodies.ts";
import {
  BIG, SMALL, clockMark, coinMark, listMark, lockMark, off, pinMark, searchMark, squareMark, tagMark,
} from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "ai", subcategory: "context", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The context window's brackets: posts at x 5 and 19, lips at y 6 and 18. The hollow is x 9..15; marks at cy 12. */
const CTX = () => [poly([[8, 6], [5, 6], [5, 18], [8, 18]]), poly([[16, 6], [19, 6], [19, 18], [16, 18]])];
/** The speech bubble `message` draws. The hollow is x 3..21, y 5..16; marks at cy 10.5. */
const BUBBLE = () => [frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]])];
/** The right-pointing arrow the set draws: a shaft and a 45° head that ends the shaft. */
const ARROW_R = (y: number, x0: number, x1: number) =>
  [row(y, x0, x1), poly([[x1 - 2.5, y - 2.5], [x1, y], [x1 - 2.5, y + 2.5]])];
/** The set's bolt, 2.5 wide, with its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);

export const BATCH_104: Icon[] = [
  /* ── In the context window ────────────────────────────────────────────────────── */
  c("context-cache", "Context cache", "The context window with a block kept in it — tokens the model does not have to read again",
    ["context", "cache", "tokens"], [], ["context cache", "cached context", "kv cache reuse", "cached tokens"],
    "bracket", [...CTX(), ...squareMark(SMALL, 12)]),
  c("context-prefix", "Context prefix", "The context window with a fixed first line and a point for the rest — what every request begins with",
    ["context", "prefix", "prompt"], [], ["context prefix", "system prefix", "fixed prefix", "shared prefix"],
    "bracket", [...CTX(), row(9, 9, 15), disc(12, 14, 1)]),
  c("prefix-cache", "Prefix cache", "The context window with a first line and a bolt under it — the shared prefix, already computed",
    ["context", "prefix", "cache"], [], ["prefix cache", "prefix caching", "cached prefix", "prompt prefix hit"],
    "bracket", [...CTX(), row(9, 9, 15), BOLT(13.5, 11)]),
  c("sliding-attention", "Sliding attention", "The context window with an arrow sliding through it — attention that looks only at the last stretch",
    ["context", "attention", "window"], [], ["sliding window attention", "local attention", "attention window", "sliding attention"],
    "bracket", [...CTX(), ...ARROW_R(12, 9, 15)]),
  c("truncate-context", "Truncate context", "The context window with three lines, the last cut short — what falls off the end",
    ["context", "truncate", "limit"], [], ["truncate context", "context truncation", "cut off", "drop oldest tokens"],
    "bracket", [...CTX(), row(9, 9, 15), row(12, 9, 15), row(15, 9, 12)]),
  c("compress-context", "Compress context", "The context window with chevrons pressing inward — the same content in fewer tokens",
    ["context", "compress", "tokens"], [], ["compress context", "context compression", "token compression", "fewer tokens"],
    "bracket", [...CTX(), poly([[9.5, 8.5], [12, 11], [14.5, 8.5]]), poly([[9.5, 15.5], [12, 13], [14.5, 15.5]])]),
  c("token-budget", "Token budget", "The context window with a coin in it — how many tokens a call is allowed to spend",
    ["context", "tokens", "budget"], [], ["token budget", "max tokens", "token allowance", "spend tokens"],
    "bracket", [...CTX(), ...coinMark(SMALL, 12)]),
  c("context-budget-alert", "Context budget alert", "The context window with an exclamation mark — the budget nearly spent",
    ["context", "budget", "alert"], [], ["context budget alert", "near context limit", "tokens running out", "context warning"],
    "bracket", [...CTX(), col(12, 8, 12), disc(12, 15, 1)]),
  c("turn-window", "Turn window", "The context window with two turns in it — how many exchanges the model can still see",
    ["context", "turns", "window"], [], ["turn window", "last n turns", "conversation window", "recent turns"],
    "bracket", [...CTX(), row(10, 9, 15), row(14, 9, 15)]),
  c("conversation-buffer", "Conversation buffer", "The context window with three lines in it — every turn so far, kept as it was said",
    ["context", "buffer", "conversation"], [], ["conversation buffer", "chat history buffer", "full history", "buffer memory"],
    "bracket", [...CTX(), ...listMark(SMALL, 12)]),
  c("summarise-turn", "Summarise turn", "The context window with a line boiled down to a point — a turn kept as its gist",
    ["context", "summarise", "turn"], [], ["summarise turn", "turn summary", "condense turn", "summary memory"],
    "bracket", [...CTX(), row(9, 9, 15), poly([[9.5, 12], [12, 14.5], [14.5, 12]])]),
  c("context-pin", "Context pin", "The context window with a pin in it — a piece of context that stays no matter what is dropped",
    ["context", "pin", "keep"], [], ["context pin", "pinned context", "always include", "sticky context"],
    "bracket", [...CTX(), ...pinMark(SMALL, 12)]),
  c("prompt-cache-hit", "Prompt cache hit", "The context window with a bolt in it — the prompt found already computed",
    ["prompt", "cache", "hit"], [], ["prompt cache hit", "cache hit", "cached prompt", "prompt reuse"],
    "bracket", [...CTX(), BOLT(13.5, 9.5)]),
  c("prompt-cache-miss", "Prompt cache miss", "The context window with a slash through it — the prompt not in the cache, computed from scratch",
    ["prompt", "cache", "miss"], [], ["prompt cache miss", "cache miss", "uncached prompt", "cold prompt"],
    "bracket", [...CTX(), poly([[9.5, 9.5], [14.5, 14.5]])]),

  /* ── In the memory tray ───────────────────────────────────────────────────────── */
  c("entity-memory", "Entity memory", "A tag landing in a tray — what the agent remembers about each named thing",
    ["memory", "entity", "agent"], [], ["entity memory", "entity store", "remember entities", "named entity memory"],
    "tray", [tray(), ...tagMark(SMALL, 8.5)]),
  c("memory-decay", "Memory decay", "A line fading in steps over a tray — memories that count for less as they age",
    ["memory", "decay", "forget"], [], ["memory decay", "recency weighting", "fading memory", "time decay"],
    "tray", [tray(), poly([[7, 6], [10, 9], [13, 6], [16, 9]])]),
  c("memory-index", "Memory index", "A hash over a tray — the index that finds a memory by what it is about",
    ["memory", "index", "lookup"], [], ["memory index", "memory indexing", "indexed memory", "memory lookup"],
    "tray", [tray(), col(10, 5.5, 11.5), col(14, 5.5, 11.5), row(8.5, 8, 16)]),
  c("memory-retrieve", "Memory retrieval", "A lens over a tray — a memory looked up and brought back",
    ["memory", "retrieve", "recall"], [], ["memory retrieval", "recall memory", "fetch memory", "memory search"],
    "tray", [tray(), ...searchMark(SMALL, 8.5)]),
  c("memory-forget", "Forget memory", "A cross over a tray — a memory the agent is told to drop",
    ["memory", "forget", "delete"], [], ["forget memory", "delete memory", "memory deletion", "unlearn"],
    "tray", [tray(), ...off(BIG, 9)]),
  c("memory-conflict", "Memory conflict", "Two points with a wall between them over a tray — two memories that cannot both be true",
    ["memory", "conflict", "contradiction"], [], ["memory conflict", "contradicting memories", "inconsistent memory", "memory clash"],
    "tray", [tray(), disc(8, 8, 2), disc(16, 8, 2), col(12, 5.5, 10.5)]),
  c("memory-merge", "Memory merge", "Two lines joining into one over a tray — memories about the same thing folded together",
    ["memory", "merge", "consolidate"], [], ["memory merge", "merge memories", "deduplicate memories", "consolidation"],
    "tray", [tray(), poly([[7, 6], [10, 6], [13, 9], [16, 9]]), poly([[7, 12], [10, 12], [13, 9]])]),
  c("hierarchical-memory", "Hierarchical memory", "Rows narrowing upward over a tray — a little kept close, more kept further away",
    ["memory", "hierarchy", "tiers"], [], ["hierarchical memory", "memory hierarchy", "layered memory", "memory pyramid"],
    "tray", [tray(), row(5, 7, 17), row(8.5, 9, 15), row(12, 10.5, 13.5)]),
  c("vector-memory", "Vector memory", "An arrow over a tray — memories stored as vectors and found by nearness",
    ["memory", "vector", "embedding"], [], ["vector memory", "embedding memory", "semantic recall", "vector store memory"],
    "tray", [tray(), poly([[8, 11], [14, 5]]), poly([[11.5, 5], [14, 5], [14, 7.5]])]),
  c("graph-memory", "Graph memory", "Three points joined over a tray — memories kept as things and the links between them",
    ["memory", "graph", "knowledge"], [], ["graph memory", "knowledge graph memory", "linked memories", "memory graph"],
    "tray", [tray(), disc(7.5, 5.5, 1), disc(16.5, 5.5, 1), disc(12, 10, 1), poly([[8.5, 6.5], [11, 9]]), poly([[15.5, 6.5], [13, 9]])]),
  c("memory-namespace", "Memory namespace", "Brackets over a tray — memories kept apart by which agent or user they belong to",
    ["memory", "namespace", "scope"], [], ["memory namespace", "scoped memory", "per-user memory", "memory partition"],
    "tray", [tray(), poly([[9.5, 5], [7, 5], [7, 11], [9.5, 11]]), poly([[14.5, 5], [17, 5], [17, 11], [14.5, 11]])]),
  c("shared-memory", "Shared memory", "Two points tied together over a tray — one memory several agents read",
    ["memory", "shared", "agents"], [], ["shared memory", "common memory", "team memory", "memory shared between agents"],
    "tray", [tray(), disc(8.5, 8, 2), disc(15.5, 8, 2), row(8, 10.5, 13.5)]),
  c("memory-quota", "Memory quota", "A level between two posts over a tray — how much an agent may remember",
    ["memory", "quota", "limit"], [], ["memory quota", "memory limit", "max memories", "memory cap"],
    "tray", [tray(), col(7, 5, 11), col(17, 5, 11), row(8, 9, 15)]),
  c("memory-audit", "Memory audit", "A checklist over a tray — what the agent remembers, gone over by a person",
    ["memory", "audit", "review"], [], ["memory audit", "review memories", "memory inspection", "what does it remember"],
    "tray", [tray(), disc(8, 6, 1), row(6, 10.5, 16), disc(8, 10, 1), row(10, 10.5, 16)]),
  c("stale-memory", "Stale memory", "A clock over a tray — a memory older than the thing it describes",
    ["memory", "stale", "outdated"], [], ["stale memory", "outdated memory", "old memory", "memory freshness"],
    "tray", [tray(), ...clockMark(SMALL, 8.5)]),
  c("memory-tier", "Memory tier", "Bars stepping down over a tray — hot, warm and cold memory",
    ["memory", "tier", "storage"], [], ["memory tier", "memory tiers", "hot warm cold memory", "tiered memory"],
    "tray", [tray(), col(8, 5, 12), col(12, 7, 12), col(16, 9, 12)]),
  c("memory-promote", "Promote memory", "A chevron lifting a bar over a tray — a memory moved to a tier that is kept longer",
    ["memory", "promote", "tier"], [], ["promote memory", "memory promotion", "short-term to long-term", "keep longer"],
    "tray", [tray(), poly([[8.5, 9.5], [12, 6], [15.5, 9.5]]), row(12.5, 8, 16)]),
  c("memory-evict", "Evict memory", "An arrow leaving over a tray — a memory pushed out to make room",
    ["memory", "evict", "capacity"], [], ["evict memory", "memory eviction", "lru memory", "make room"],
    "tray", [tray(), ...ARROW_R(8, 7, 15)]),
  c("fact-store", "Fact store", "A statement with a full stop over a tray — the facts an agent may cite",
    ["memory", "fact", "store"], [], ["fact store", "fact memory", "known facts", "structured facts"],
    "tray", [tray(), row(6, 8, 16), row(10, 8, 12), disc(15, 10, 1)]),
  c("pin-fact", "Pin fact", "A pin over a tray — a fact that stays in memory whatever else is dropped",
    ["memory", "pin", "fact"], [], ["pin fact", "pinned memory", "always remember", "sticky fact"],
    "tray", [tray(), ...pinMark(SMALL, 8.5)]),
  c("context-router", "Context router", "One line splitting into two over a tray — each request given the context it needs",
    ["context", "router", "retrieval"], [], ["context router", "route context", "context selection", "which context"],
    "tray", [tray(), poly([[5.5, 9], [9, 9], [12, 6], [16.5, 6]]), poly([[9, 9], [12, 12], [16.5, 12]])]),

  /* ── In the ring ──────────────────────────────────────────────────────────────── */
  c("session-state", "Session state", "A ring with two lines in it — what is true for this session and no other",
    ["state", "session", "agent"], [], ["session state", "per-session state", "session variables", "conversation state"],
    "orbit", [ring(), row(10, 8, 16), row(14, 8, 16)]),
  c("state-machine-agent", "Agent state machine", "A ring with two states and the step between them — an agent that is always in exactly one",
    ["state", "machine", "agent"], [], ["agent state machine", "state transitions", "finite states", "agent fsm"],
    "orbit", [ring(), disc(9, 9, 2), disc(15, 15, 2), poly([[10.5, 10.5], [13.5, 13.5]])]),
  c("checkpoint-state", "Checkpoint state", "A ring with a peg in it — the state saved so a run can pick up from here",
    ["state", "checkpoint", "save"], [], ["checkpoint state", "save state", "agent checkpoint", "resume point"],
    "orbit", [ring(), col(12, 7, 12), disc(12, 14.5, 2)]),
  c("restore-state", "Restore state", "A ring with an arrow looping back — the state put back to what it was",
    ["state", "restore", "rollback"], [], ["restore state", "rollback state", "load checkpoint", "revert agent state"],
    "orbit", [ring(), poly([[8.5, 14.5], [8.5, 9.5], [15.5, 9.5], [15.5, 14.5]]), poly([[13, 12], [15.5, 14.5], [18, 12]])]),
  c("state-diff", "State diff", "A ring with a plus over a minus — what changed between two states",
    ["state", "diff", "compare"], [], ["state diff", "compare states", "state change", "delta"],
    "orbit", [ring(), col(12, 7.5, 11.5), row(9.5, 10, 14), row(14.5, 10, 14)]),
  c("snapshot-agent", "Agent snapshot", "A ring with an eye in it — a look taken at everything the agent holds, kept as it was",
    ["state", "snapshot", "agent"], [], ["agent snapshot", "state snapshot", "capture state", "freeze state"],
    "orbit", [ring(), arc(12, 12, 5, 200, 340), disc(12, 12, 2)]),
  c("event-sourcing-agent", "Event-sourced agent", "A ring with three events in a row — state that is nothing but the events replayed",
    ["state", "events", "sourcing"], [], ["event sourcing", "event-sourced agent", "replayable state", "event log state"],
    "orbit", [ring(), col(8, 9.5, 14.5), col(12, 9.5, 14.5), col(16, 9.5, 14.5)]),
  c("replay-step", "Replay step", "A ring with a skip mark in it — one recorded step played again",
    ["state", "replay", "step"], [], ["replay step", "step replay", "re-run step", "replay one event"],
    "orbit", [ring(), poly([[9, 9], [12, 12], [9, 15]]), col(15, 9, 15)]),
  c("world-model", "World model", "A ring with a triangle in it — the agent's own picture of how things work",
    ["state", "model", "world"], [], ["world model", "internal model", "environment model", "agent belief of world"],
    "orbit", [ring(), poly([[8, 15], [12, 11], [16, 15]], true)]),
  c("belief-state", "Belief state", "A ring with a head over a line — what the agent currently takes to be true",
    ["state", "belief", "agent"], [], ["belief state", "agent beliefs", "current beliefs", "belief update"],
    "orbit", [ring(), disc(12, 10, 2), row(15, 9, 15)]),

  /* ── Written down ─────────────────────────────────────────────────────────────── */
  c("replay-log", "Replay log", "A clipboard with a play mark on it — the log an agent's run can be replayed from",
    ["state", "replay", "log"], [], ["replay log", "run log", "replay from log", "trace replay"],
    "clipboard", [...clipboard(), poly([[10.5, 10.5], [10.5, 16.5], [13.5, 13.5]], true)]),
  c("scratchpad-note", "Scratchpad note", "A clipboard with a pencil stroke on it — working notes the agent keeps while it thinks",
    ["memory", "scratchpad", "note"], [], ["scratchpad note", "working notes", "scratch memory", "thinking notes"],
    "clipboard", [...clipboard(), poly([[9, 16], [15, 10]])]),
  c("note-to-self", "Note to self", "A speech bubble with a pin in it — something the agent tells itself to remember",
    ["memory", "note", "agent"], [], ["note to self", "self note", "agent reminder", "remember this"],
    "window", [...BUBBLE(), ...pinMark(SMALL, 10.5)]),
  c("rolling-summary", "Rolling summary", "The rotation loop with lines in it — a summary rewritten as the conversation goes on",
    ["memory", "summary", "rolling"], [], ["rolling summary", "running summary", "progressive summary", "summary buffer"],
    "rotation", [...cycle(), ...listMark(SMALL, 12)]),
  c("state-lock", "State lock", "The context window with a lock in it — state no other run may change while this one holds it",
    ["state", "lock", "concurrency"], [], ["state lock", "locked state", "exclusive state", "state mutex"],
    "bracket", [...CTX(), ...lockMark(SMALL, 12)]),
];
