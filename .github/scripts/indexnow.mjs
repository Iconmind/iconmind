// Tells Bing, and every other engine on IndexNow, which pages changed, right after a
// production deploy. ChatGPT search and Copilot answer from Bing's index, and without a
// ping Bing finds a page whenever its crawler next gets round to the sitemap.
//
// It submits the sitemap URLs whose lastmod is the newest one, which are the pages the
// latest release touched. With ALL=1 it submits every URL: the first run, or a change
// to the site itself rather than to the icons, which moves no lastmod.
//
// `node indexnow.mjs newest` only prints that newest lastmod, so the workflow can skip
// a date it has already sent: a release deploys three times (push, version bump,
// lockfile) and IndexNow asks not to resubmit pages that have not changed.
const SITE = "https://iconmind.dev";
// Public by design: IndexNow proves ownership by fetching it from the site.
const KEY = "3e34b1ed2c53cfe2f177da024ab06f24";

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<url>\s*<loc>\s*([^<\s]+)\s*<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)]
  .map((m) => ({ loc: m[1], lastmod: m[2] }));
const newest = urls.map((u) => u.lastmod).filter(Boolean).sort().at(-1);

if (process.argv[2] === "newest") {
  console.log(newest);
  process.exit(0);
}

const list = process.env.ALL === "1" ? urls.map((u) => u.loc) : urls.filter((u) => u.lastmod === newest).map((u) => u.loc);
console.log(`${urls.length} URLs in the sitemap, newest lastmod ${newest}, submitting ${list.length}`);

// 10,000 URLs per request is the protocol's limit.
for (let i = 0; i < list.length; i += 10_000) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: list.slice(i, i + 10_000),
    }),
  });
  console.log(`URLs ${i + 1}–${Math.min(i + 10_000, list.length)}: HTTP ${res.status} ${await res.text()}`);
  if (res.status >= 400) process.exit(1);
}
