# IconMind for Figma

Two things in one plugin.

**Insert** — search the whole set inside Figma and drop any icon on the canvas as a
vector, outline or duotone, thin/regular/bold, at 16–48 px.

**Build library** — turn an empty file into the library: every icon becomes a component
set whose variants are the six cells the set ships, one page per category, named
`category/slug` so Figma's asset panel folds them into folders, each carrying its
description and a link to its page. This is how the community file is made — generated
from the same drawings the packages ship, so it cannot drift from them.

Both read `iconmind.dev/library.json` and `iconmind.dev/v/<cell>.json` — the files the
site itself renders from — so the plugin is always the current release and ships nothing
of its own.

## Run it

Figma → Plugins → Development → *Import plugin from manifest…* → this folder's
`manifest.json`.

## Publish the community file

1. New empty Figma file, run the plugin, **Build library** → *All six cells* (13,626
   components in 2,271 sets; it takes a few minutes and reports progress).
2. Publish the file as a library (Assets → Publish), then publish it to the Figma
   Community: name **IconMind**, description from `launch.md`, cover from
   `.github/assets/preview-light.png`, link https://iconmind.dev.
3. Publish the plugin itself: Plugins → Development → the plugin → *Publish*.

Rebuild after a release: run **Build library** in a fresh file and publish an update, or
insert only the new icons by hand — the components are named identically, so Figma
matches them.

## Version

Kept in lockstep with the npm packages and Flutter by the changesets `fixed` group; the
package is private, so it is versioned and never published to npm.
