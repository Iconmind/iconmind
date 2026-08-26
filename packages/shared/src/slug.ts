import { RESERVED_WORDS } from "./constants.ts";

export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const isValidSlug = (s: string) =>
  SLUG_RE.test(s) && s.length >= 2 && s.length <= 40;

/**
 * `agent-memory` → `AgentMemory`. Reserved-word collisions get an `Icon` suffix.
 *
 * The transformation is mechanical on purpose, including over acronyms: `api` becomes
 * `Api`, not `API`, even though the icon's display name is "API". A component name is
 * something people type from memory, and a rule with no exceptions can be applied without
 * looking anything up — `McpHandshake` is guessable from the slug in a way `MCPHandshake`
 * is not. Do not "fix" this to match the display names; they are different surfaces with
 * different jobs.
 */
export const toComponentName = (slug: string) => {
  const name = slug.split("-").map((p) => p[0]!.toUpperCase() + p.slice(1)).join("");
  return RESERVED_WORDS.has(name) ? `${name}Icon` : name;
};
