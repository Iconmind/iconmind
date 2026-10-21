#!/bin/sh
# Vercel's build command, run from apps/web (see apps/web/vercel.json). It lives here
# because vercel.json caps `buildCommand` at 256 characters.
#
# Vercel clones shallow and without tags. The generator reads which release added and
# last changed each icon from git tags, and without them every icon said "Added" in the
# current version and the sitemap had no lastmod for 5,287 pages. So the history and
# the tags come first; if the fetch fails the build still runs, with the old fallback.
set -e
cd ../..
git fetch --quiet --unshallow --tags https://github.com/Iconmind/iconmind.git 2>/dev/null \
  || git fetch --quiet --tags https://github.com/Iconmind/iconmind.git \
  || echo "git fetch failed: building without release tags"
echo "release tags: $(git tag | wc -l | tr -d ' ')"
pnpm icons:generate
pnpm --filter web run build
node scripts/generate/zips.mjs
