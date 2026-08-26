---
"@iconmind/icons": patch
---

The bare entry point is now a few hundred bytes — `version` and `counts` only. The full
metadata database (descriptions, tags, keywords, `getIcon`, `iconsIn`, `categories`)
moved to `@iconmind/icons/metadata`; `metadata.json` and `sprite.svg` subpaths are
unchanged. Importing the database is now a decision, not a side effect of touching the
package.
