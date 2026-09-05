/**
 * When each version shipped — the dates behind `lastmod`.
 *
 * The generator knows which version added or last changed an icon (`addedIn`,
 * `updatedIn`, read from git tags at build). Vercel's clone has no tags, and the
 * changelog carries no dates, so the dates themselves live here: one line per release,
 * added on release day. A sitemap `lastmod` that is honest beats one that is missing;
 * one that changes on every build is the one Google learns to ignore.
 */
export const RELEASE_DATES: Record<string, string> = {
  "0.1.0": "2026-08-20",
  "0.3.0": "2026-08-26",
  "0.3.1": "2026-08-27", "0.3.2": "2026-08-27", "0.3.3": "2026-08-27",
  "0.3.4": "2026-08-27", "0.3.5": "2026-08-27", "0.3.6": "2026-08-27",
  "0.4.0": "2026-08-30", "0.4.1": "2026-08-30",
  "0.5.0": "2026-08-30",
  "0.6.0": "2026-08-31", "0.6.3": "2026-09-01",
  "0.6.4": "2026-09-05",
};

export const releaseDate = (version: string | undefined) =>
  version ? RELEASE_DATES[version] : undefined;

/** The most recent date in the table — what list pages last changed. */
export const latestReleaseDate = Object.values(RELEASE_DATES).sort().at(-1)!;
