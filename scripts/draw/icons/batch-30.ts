/**
 * Batch 30 — the protocol's remaining verbs, and locks that do different things.
 *
 * The MCP family reaches fourteen here, and every one of them is a body the set already has
 * with its top-left corner cut. `mcp-tool-call`, `mcp-tool-result` and `mcp-tool-error` are
 * the same chamfered plug with three different things happening to it.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { SMALL, add, check, off } from "../marks.ts";
import { cycle, machine, machinePage, page, server, shield } from "../bodies.ts";
import type { Icon } from "../build.ts";

/** The chamfered plug `mcp-tool` is drawn as, so its family cannot drift from it. */
const plug = () => [
  frame(6, 10, 12, 9, 3, { chamfer: 3, gap: 0 }),
  col(9, 5, 10), col(12, 5, 10), col(15, 5, 10),
];

export const BATCH_30: Icon[] = [
  /* ── What a tool call does ────────────────────────────────────────────────────── */

  {
    slug: "mcp-tool-call", category: "mcp", subcategory: "tool",
    name: "MCP tool call", description: "An MCP tool call — the model asking a server to run one of its tools",
    tags: ["invoke", "request", "run"], family: "figure",
    aliases: ["function-call"], keywords: ["invoke", "tools/call", "arguments", "request"],
    // The same full plug as `mcp-tool-result` and `-error`, with the verb in the hollow:
    // a small rightward arrow, the request on its way. An earlier drawing squeezed the
    // plug leftward to fit a big arrow beside it — two prongs, off-centre, read as ears.
    shapes: [
      ...plug(),
      row(15, 9.5, 14.5), poly([[12.5, 13], [14.5, 15], [12.5, 17]]),
    ],
  },
  {
    slug: "mcp-tool-result", category: "mcp", subcategory: "tool",
    name: "MCP tool result", description: "An MCP tool result — what came back from a tool call, the returned output",
    tags: ["response", "output", "returned"], family: "figure",
    aliases: [], keywords: ["response", "content", "returned", "output", "success"],
    shapes: [...plug(), ...check(SMALL, 15)],
  },
  {
    slug: "mcp-tool-error", category: "mcp", subcategory: "tool",
    name: "MCP tool error", description: "An MCP tool error — the tool call failed instead of returning a result",
    tags: ["failure", "failed", "fault"], family: "figure",
    aliases: [], keywords: ["isError", "failure", "exception", "fault", "rejected"],
    shapes: [...plug(), ...off(SMALL, 14.5)],
  },
  {
    slug: "mcp-tool-schema", category: "mcp", subcategory: "tool",
    name: "MCP tool schema", description: "An MCP tool schema — the JSON contract that says what arguments a tool takes",
    tags: ["contract", "shape", "json"], family: "page",
    aliases: [], keywords: ["input schema", "json schema", "arguments", "contract", "types"],
    shapes: [machinePage(), poly([[11, 9], [8, 12], [11, 15]]), poly([[13, 9], [16, 12], [13, 15]])],
  },
  {
    slug: "mcp-tool-list", category: "mcp", subcategory: "tool",
    name: "MCP tool list", description: "MCP tool list — the catalogue of everything this server can do",
    tags: ["catalogue", "available", "index"], family: "window",
    aliases: [], keywords: ["tools/list", "available", "catalog", "capabilities"],
    shapes: [
      frame(3, 4, 18, 16, 3, { chamfer: 3, gap: 4 }),
      row(9, 8, 17), row(13, 8, 17), row(17, 8, 13),
    ],
  },
  {
    slug: "mcp-tool-permission", category: "mcp", subcategory: "tool",
    name: "MCP tool permission", description: "MCP tool permission — whether a tool is allowed to run, a consent gate",
    tags: ["allow", "consent", "gate"], family: "lock",
    aliases: [], keywords: ["consent", "allow", "approve tool", "human gate", "trust"],
    shapes: [frame(6, 10, 12, 10, 3, { chamfer: 3, gap: 0 }), arc(12, 10, 4, 180, 360)],
  },
  {
    slug: "mcp-tool-add", category: "mcp", subcategory: "tool",
    name: "MCP tool add", description: "MCP tool add — expose another capability from a server for the model to call",
    tags: ["new", "expose", "register"], family: "window",
    aliases: [], keywords: ["register tool", "expose", "publish", "new capability"],
    shapes: [...plug(), ...add(SMALL, 14.5)],
  },

  /* ── The protocol's other verbs ───────────────────────────────────────────────── */

  {
    slug: "mcp-sampling", category: "mcp", subcategory: "sampling",
    name: "MCP sampling", description: "MCP sampling — a server asking the model to think, a completion in reverse",
    tags: ["reverse", "completion", "ask"], family: "tower",
    aliases: [], keywords: ["sampling/createMessage", "reverse call", "server asks", "llm"],
    // The arrow points back at the tower rather than away from it. Everywhere else in this
    // family the server answers; sampling is the one call that goes the other way.
    shapes: [...server(), row(11, 8, 14), poly([[11, 8], [8, 11], [11, 14]])],
  },
  {
    slug: "mcp-cancel", category: "mcp", subcategory: "transport",
    name: "MCP cancel", description: "MCP cancel — stop the call that is currently running before it finishes",
    tags: ["abort", "halt", "stop"], family: "tower",
    aliases: [], keywords: ["cancelled", "abort", "notifications/cancelled", "halt"],
    shapes: [...server(), rect(8.5, 7.5, 7, 7, 2)],
  },
  {
    slug: "mcp-notification", category: "mcp", subcategory: "transport",
    name: "MCP notification", description: "An MCP notification — a one-way message that expects no answer",
    tags: ["one-way", "emit", "tell"], family: "tower",
    aliases: [], keywords: ["notification", "one-way", "no response", "emit", "push"],
    shapes: [...server(), row(11, 8, 15), poly([[12, 8], [15, 11], [12, 14]])],
  },
  {
    slug: "mcp-manifest", category: "mcp", subcategory: "registry",
    name: "MCP manifest", description: "An MCP manifest — what a server declares about itself, its metadata and config",
    tags: ["metadata", "declares", "config"], family: "page",
    aliases: [], keywords: ["server info", "metadata", "declaration", "config", "version"],
    shapes: [machinePage(), row(11, 9, 15), row(15, 9, 13), disc(15, 11, 1)],
  },
  {
    slug: "mcp-roots", category: "mcp", subcategory: "resource",
    name: "MCP roots", description: "MCP roots — the directories a server is allowed to look in, its boundary",
    tags: ["scope", "boundary", "allowed"], family: "folder",
    aliases: ["mcp-root"], keywords: ["roots", "workspace", "allowed paths", "scope", "sandbox"],
    shapes: [
      poly([[20, 7], [20, 20], [4, 20], [4, 4], [9, 4], [12, 7], [16, 7]]),
      poly([[9, 13], [12, 16], [15, 13]]),
    ],
  },
  {
    slug: "mcp-inspector", category: "mcp", subcategory: "registry",
    name: "MCP inspector", description: "The MCP inspector — the tool you debug and test a server with",
    tags: ["debug", "inspect", "test"], family: "tower",
    aliases: [], keywords: ["inspector", "debug ui", "test harness", "poke", "devtool"],
    shapes: [...server(), arc(12, 10, 3, 292, 248), poly([[14, 12], [17, 15]])],
  },
  {
    slug: "mcp-completion", category: "mcp", subcategory: "prompt",
    name: "MCP completion", description: "MCP completion — suggested values for an argument, autocomplete hints",
    tags: ["autocomplete", "hint", "values"], family: "window",
    aliases: [], keywords: ["completion/complete", "autocomplete", "suggest", "enum", "values"],
    shapes: [
      frame(3, 3, 18, 9, 3, { chamfer: 3, gap: 3 }), row(16, 6, 18), row(20, 6, 15),
    ],
  },

  /* ── Locks that do different things ───────────────────────────────────────────── */

  {
    slug: "login", category: "security", subcategory: "auth",
    name: "Log in", description: "Log in — come in, sign in with your credentials and arrive at your account",
    tags: ["enter", "sign-in", "arrive"], family: "arrow",
    aliases: ["sign-in"], keywords: ["sign in", "enter", "session start", "authenticate"],
    shapes: [
      poly([[15, 3], [21, 3], [21, 21], [15, 21]]),
      row(12, 3, 13), poly([[10, 9], [13, 12], [10, 15]]),
    ],
  },
  {
    slug: "logout", category: "security", subcategory: "auth",
    name: "Log out", description: "Log out — leave, sign out of your account and end the session",
    tags: ["exit", "sign-out", "go"], family: "arrow",
    aliases: ["sign-out"], keywords: ["sign out", "exit", "end session", "leave"],
    shapes: [
      poly([[9, 3], [3, 3], [3, 21], [9, 21]]),
      row(12, 11, 21), poly([[18, 9], [21, 12], [18, 15]]),
    ],
  },
  {
    slug: "key-rotation", category: "security", subcategory: "secret",
    name: "Key rotation", description: "Key rotation — replace a credential before it gets old, renewing on a cycle",
    tags: ["rotate", "renew", "cycle"], family: "orbit",
    aliases: [], keywords: ["rotate", "renew", "expiry", "roll", "credentials"],
    shapes: [
      ...cycle(),
      disc(9.5, 14, 2), poly([[11, 12.5], [15, 8.5]]), poly([[13, 10.5], [15, 12.5]]),
    ],
  },
  {
    slug: "mfa", category: "security", subcategory: "auth",
    name: "Multi-factor", description: "Multi-factor authentication — two proofs instead of one, a second factor on a device",
    tags: ["2fa", "second", "device"], family: "lock",
    aliases: [], keywords: ["2fa", "two-factor", "otp", "authenticator", "second factor", "totp"],
    shapes: [
      rect(2, 8, 10, 11, 2), arc(7, 8, 3, 180, 360),
      rect(15, 4, 7, 17, 2), row(18, 17, 20),
    ],
  },
  {
    slug: "malware", category: "security", subcategory: "threat",
    name: "Malware", description: "Malware — hostile software that works against you, a virus or a payload",
    tags: ["virus", "hostile", "payload"], family: "page",
    aliases: ["virus"], keywords: ["virus", "trojan", "payload", "infection", "hostile code"],
    // Not a beetle. `debug` is already a beetle, and a beetle on its own says *defect* — the
    // thing that separates malware from a bug is that it arrived as a file somebody sent.
    shapes: [
      disc(12, 12, 4),
      poly([[8.5, 8.5], [4.5, 4.5]]), poly([[15.5, 8.5], [19.5, 4.5]]),
      poly([[8.5, 15.5], [4.5, 19.5]]), poly([[15.5, 15.5], [19.5, 19.5]]),
    ],
  },
  {
    slug: "model-poisoning", category: "security", subcategory: "ai-security",
    name: "Model poisoning", description: "Model poisoning — tainted data slipped into training on purpose",
    tags: ["tainted", "attack", "training"], family: "machine",
    aliases: [], keywords: ["data poisoning", "backdoor", "tainted training", "supply chain"],
    shapes: [
      frame(4, 8, 16, 12, 3, { chamfer: 3, gap: 4 }),
      col(12, 2, 7), poly([[9, 4], [12, 7], [15, 4]]),
      poly([[10, 12], [14, 16]]), poly([[14, 12], [10, 16]]),
    ],
  },
  {
    slug: "llm-firewall", category: "security", subcategory: "ai-security",
    name: "LLM firewall", description: "An LLM firewall — the guard that decides what a model is not allowed to say",
    tags: ["guard", "filter", "output"], family: "shield",
    aliases: [], keywords: ["output filter", "guardrails", "moderation", "block", "policy"],
    shapes: [shield(), row(9, 8, 16), row(13, 8, 16)],
  },

  /* ── Models, moved about ──────────────────────────────────────────────────────── */

  {
    slug: "model-download", category: "ai", subcategory: "model",
    name: "Model download", description: "Model download — fetch the weights and pull a model onto this machine",
    tags: ["fetch", "pull", "weights"], family: "machine",
    aliases: [], keywords: ["pull weights", "huggingface", "fetch model", "local"],
    shapes: [
      frame(4, 4, 16, 12, 3, { chamfer: 3, gap: 4 }),
      col(12, 17, 21), poly([[9, 18], [12, 21], [15, 18]]),
    ],
  },
  {
    slug: "model-swap", category: "ai", subcategory: "model",
    name: "Model swap", description: "Model swap — put a different model behind the same call without changing the caller",
    tags: ["switch", "replace", "route"], family: "machine",
    aliases: [], keywords: ["switch model", "route", "fallback model", "a/b", "replace"],
    shapes: [
      machine(),
      row(10, 8, 15), poly([[13, 8], [15, 10], [13, 12]]),
      row(14, 9, 16), poly([[11, 12], [9, 14], [11, 16]]),
    ],
  },
  {
    slug: "model-weights", category: "ai", subcategory: "model",
    name: "Model weights", description: "Model weights — the parameters that are the model, saved as a checkpoint file",
    tags: ["parameters", "checkpoint", "file"], family: "machine",
    aliases: [], keywords: ["parameters", "safetensors", "checkpoint", "gguf", "billions"],
    shapes: [machine(), row(9, 8, 16), row(12, 8, 13), row(15, 8, 16)],
  },
  {
    slug: "instruct-model", category: "ai", subcategory: "model",
    name: "Instruct model", description: "An instruct model — tuned to follow what you ask, aligned for chat",
    tags: ["chat", "aligned", "tuned"], family: "machine",
    aliases: [], keywords: ["instruction tuned", "rlhf", "chat model", "aligned", "assistant"],
    shapes: [machine(), disc(9, 10, 1), row(10, 12, 17), disc(9, 14, 1), row(14, 12, 17)],
  },
];
