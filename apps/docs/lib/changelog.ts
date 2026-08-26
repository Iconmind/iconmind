import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export interface Release { version: string; body: string[] }

const FILE = join(process.cwd(), "..", "..", "packages", "icons", "CHANGELOG.md");

/**
 * Reads the changelog Changesets writes at release time.
 *
 * There are no releases yet, and the page says so rather than showing an empty shell —
 * a changelog that pretends to have entries is worse than one that admits it is waiting.
 */
export function releases(): Release[] {
  if (!existsSync(FILE)) return [];
  const out: Release[] = [];
  let current: Release | null = null;
  for (const line of readFileSync(FILE, "utf8").split("\n")) {
    const m = /^##\s+(\d+\.\d+\.\d+.*)$/.exec(line.trim());
    if (m) { current = { version: m[1]!, body: [] }; out.push(current); continue; }
    if (current && line.trim()) current.body.push(line.trim());
  }
  return out;
}
