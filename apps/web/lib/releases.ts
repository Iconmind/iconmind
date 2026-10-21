import { execFileSync } from "node:child_process";

/**
 * When each version shipped — the dates behind `lastmod`.
 *
 * The generator knows which version added or last changed an icon (`addedIn`,
 * `updatedIn`, read from git tags at build). The changelog carries no dates, so the
 * dates come from the same tags, which scripts/vercel-build.sh fetches because Vercel's
 * clone has none. A sitemap `lastmod` that is honest beats one that is missing; one that
 * changes on every build is the one Google learns to ignore.
 *
 * The table below was the only source until 0.7.1, 0.8.0 and 0.8.1 shipped without
 * their line and every icon they touched lost its lastmod. Every push to main is a
 * release now, so a line by hand cannot keep up. The table stays for a build with no
 * git, and where both have a date it wins.
 */
const WRITTEN: Record<string, string> = {
  "0.1.0": "2026-08-20",
  "0.3.0": "2026-08-26",
  "0.3.1": "2026-08-27", "0.3.2": "2026-08-27", "0.3.3": "2026-08-27",
  "0.3.4": "2026-08-27", "0.3.5": "2026-08-27", "0.3.6": "2026-08-27",
  "0.4.0": "2026-08-30", "0.4.1": "2026-08-30",
  "0.5.0": "2026-08-30",
  "0.6.0": "2026-08-31", "0.6.3": "2026-09-01",
  "0.6.4": "2026-09-05",
  "0.7.0": "2026-09-06",
};

function tagged(): Record<string, string> {
  try {
    const refs = execFileSync(
      "git", ["for-each-ref", "--sort=creatordate", "--format=%(refname:short) %(creatordate:short)", "refs/tags"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    const dates: Record<string, string> = {};
    for (const line of refs.split("\n")) {
      const m = /^(?:v|@iconmind\/icons@)(\d+\.\d+\.\d+) (\d{4}-\d{2}-\d{2})$/.exec(line);
      if (m && !dates[m[1]!]) dates[m[1]!] = m[2]!;
    }
    return dates;
  } catch {
    return {};
  }
}

export const RELEASE_DATES: Record<string, string> = { ...tagged(), ...WRITTEN };

export const releaseDate = (version: string | undefined) =>
  version ? RELEASE_DATES[version] : undefined;

/** The most recent release date — what list pages last changed. */
export const latestReleaseDate = Object.values(RELEASE_DATES).sort().at(-1)!;
