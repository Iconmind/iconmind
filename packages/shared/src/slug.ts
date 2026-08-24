import { RESERVED_WORDS } from "./constants.ts";

export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const isValidSlug = (s: string) =>
  SLUG_RE.test(s) && s.length >= 2 && s.length <= 40;

/** `agent-memory` → `AgentMemory`. Reserved-word collisions get an `Icon` suffix. */
export const toComponentName = (slug: string) => {
  const name = slug.split("-").map((p) => p[0]!.toUpperCase() + p.slice(1)).join("");
  return RESERVED_WORDS.has(name) ? `${name}Icon` : name;
};
