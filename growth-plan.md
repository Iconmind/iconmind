# Growth plan — from 2 stars to a set people reach for

Written 2026-08-30, the day 0.5.0 shipped. Not pushed until the user says so.

## Where we stand

| signal | now | what it says |
|---|---|---|
| Icons · packages | 2,271 icons · 9 npm packages, Flutter, Blade, MCP server | product is ahead of distribution |
| npm downloads / week | ~900–1,260 per package, nearly identical across all nine | mirrors and bots, not people — real use would skew to react |
| GitHub | 2 stars · 0 topics · 0 forks | nobody has found the repo |
| pub.dev | 1 like · 140/160 points · 0 downloads in 30 days | listed, unseen |
| Site | 2,838 indexed-ready URLs, strong on-page SEO, Search Console not yet connected | Google can index it; no one has told Google it exists |
| Images | one site-wide og:image, no `<img>` of the icon, no image sitemap, no PNG | invisible in Google Images — SVGRepo's whole channel |

The bottleneck is not the set. It is that the set lives nowhere people already look for
icons. Every item below puts it in one of those places.

## The thesis

Three audiences, each with a channel we are absent from:

1. **Developers** pick icons inside their tools — Iconify's collection (Figma plugin, VS
   Code, unplugin-icons, Tailwind, Nuxt, Astro all read it), framework directories, awesome
   lists, npm search. Lucide and Tabler are large because they are *there*, not because
   their arrows are better.
2. **AI assistants** now pick icons for people. An assistant that knows IconMind names
   recommends IconMind. That is llms.txt (done), the MCP server (done, unlisted), MCP
   registries, Cursor rules, starter templates.
3. **Search** — not the generic long tail SVGRepo owns, but the queries only this set
   answers ("agent icon", "MCP icon", "RAG icons", "AI icons for React") — and Google
   Images for those, which today shows nothing of ours.

The differentiator is stated the same way everywhere: *the icons AI-era software needs,
drawn as one set, with the code for eleven frameworks and an MCP server that picks them.*

## Track A — Search and Google Images (I do this; ~1.5 days)

| item | why | done when |
|---|---|---|
| Per-icon PNG previews generated at build (resvg, 2,271 × 512 px, ~2 KB each) | the raw material for everything below | `apps/web/public/p/{slug}.png` exists |
| `og:image` per icon, group and tag page (the PNG, framed) | shares and Discover show the icon, not a generic card | every page's og:image is its own |
| `<img src="/i/{slug}.svg" alt="{name} icon — {description}">` on the icon page, above the studio | Google Images needs an `<img>`; inline SVG in a client component is invisible to it | Images index shows IconMind results for "document search icon" within weeks of Search Console |
| Image sitemap (`sitemap-images.xml`: 2,271 entries with caption + title) and `lastmod` on the main sitemap from release dates | tells Images what to fetch; tells Search what changed | both served, submitted |
| **Download menu** on the icon page, rendered in the browser from the SVG at the variant, weight, colour and size the studio is set to — SVG (as now), **PNG** transparent at 16 / 24 / 32 / 48 / 64 / 128 / 256 / 512, **WebP**, **ICO** favicon (16+32+48 in one file), **Copy PNG** to the clipboard; PDF (Xcode asset catalogs) and JPEG (white ground, last in the menu — some people do type "icon jpg") after those. **Download all**: zip of the SVGs and a zip of the PNGs, on the site and as a GitHub Release asset | "x icon png" and "icon pack download" are the queries SVGRepo lives on; the build-time PNG files are what Images indexes, the menu is what people click | menu live with SVG/PNG/WebP/ICO/Copy PNG; both zips published |
| Comparison pages: `/compare/lucide/`, `/compare/tabler/`, `/compare/heroicons/`, `/compare/svgrepo/` — honest tables (count, AI vocabulary, variants, frameworks, licence, MCP), with `FAQPage` | "lucide alternative", "icons like heroicons" convert; the FAQ earns rich results | four pages indexed |
| Use-case collections: `/collections/ai-chat-ui/`, `agent-dashboard/`, `rag-pipeline/`, `mcp-server/`, `llm-observability/` — curated 20–40 icons with copy and a code snippet | matches how people search ("icons for AI dashboard") and how they buy | five pages, each in the sitemap |
| Search Console (user connects the domain) + submit both sitemaps | the only real measurement | impressions visible |

## Track B — Be where developers pick icons (I prepare; the user's accounts submit)

| item | leverage | owner |
|---|---|---|
| **Iconify collection**: export `@iconmind/icons` to Iconify JSON (`@iconify/tools`), PR to `iconify/icon-sets` | one PR → Figma plugin, VS Code, Tailwind, unplugin-icons, Nuxt/Astro icon modules, icones.js.org; how Lucide got everywhere | me: exporter + PR text; user: the PR from their account |
| **Figma community file**: all 2,271 as components with variants (outline/duotone × 3 weights) | designers discover icons in Figma first; a community file is a permanent front door | me: the SVG pack + a build script; user: import and publish |
| GitHub repo: topics (`icons`, `svg`, `react-icons`, `ai`, `llm`, `mcp`, `agents`, `flutter`, `figma`), social preview image, README GIF of the studio, Discussions on | repo is unfindable today (0 topics); stars are the currency every list checks | me (topics via API), user (social preview upload) |
| Awesome lists: awesome-icons, awesome-react-components, awesome-vue, awesome-svelte, awesome-solid, awesome-flutter, awesome-astro, awesome-laravel, awesome-mcp-servers, awesome-llm-apps | durable backlinks from the pages people actually browse | me: PRs drafted; user: opened from their account |
| Framework directories: astro.build/integrations, reactnative.directory, Svelte Society, Made with Vue, pub.dev tags, Packagist (**blade is still unpublished**) | each is a search engine of its own | user (owner-gated), me (submissions text) |
| shadcn registry item (`npx shadcn add https://iconmind.dev/r/icon.json`) and a Tailwind/`unplugin-icons` recipe in the docs | the copy-paste generation installs things this way | me |
| jsDelivr sprite documented: `https://cdn.jsdelivr.net/npm/@iconmind/icons/dist/sprite.svg` — zero-install `<use href>` | works today, nobody knows | me: docs page |

## Track C — The AI channel (mostly me)

| item | why | owner |
|---|---|---|
| List `@iconmind/mcp` on Smithery, Glama, mcp.so, PulseMCP, Cursor's directory, the official MCP registry | assistants and their users browse these; "icons" is an empty category | me (drafts), user (accounts) |
| A Claude Code / Cursor rule snippet on the docs: "when you need an icon, call the IconMind MCP or import from @iconmind/react — never invent names" | turns every assistant session into a recommendation | me |
| PRs adding IconMind to AI starter templates: Vercel AI SDK chatbot template, assistant-ui, CopilotKit examples, LangChain/LangGraph UI kits, Open WebUI themes | a template dependency compounds — every fork ships our icons | me (PRs), user (approves) |
| Keep llms.txt / llms-full.txt current per release (automatic) | done | — |

## Track D — Launch moments and community (the user posts; I write)

- **Show HN**: "IconMind – 2,271 open-source icons for AI-era software, with an MCP server that picks them" — the MCP angle is the hook HN has not seen.
- **Product Hunt** (same day; assets: 5 gallery images, 30-second studio video).
- **Reddit**: r/FlutterDev (drafted), r/reactjs, r/webdev, r/vuejs, r/sveltejs, r/ClaudeAI + r/cursor (MCP angle), r/LocalLLaMA (agent dashboards).
- **dev.to / Hashnode** article: "Why AI products need their own icon vocabulary — and how we drew 2,271 of them with a compiler that refuses bad geometry" (the forge story is genuinely interesting to engineers).
- **X / LinkedIn**: a 10-second GIF of the studio switching variants and weights; one thread, pinned.
- **Newsletters** (submit, do not wait): JavaScript Weekly, React Status, Frontend Focus, Bytes, TLDR Web Dev, Flutter Weekly, Svelte newsletter, Astro newsletter, Laravel News.
- **Every release is a post.** 1k was a story; the parity layer is a story; the next hundred requested icons are a story. Monthly cadence: ship, then tell.
- **The request loop** runs the roadmap: `search-miss` events (needs Vercel Analytics on a paid plan) + the icon-request issue template → a monthly "you asked for these" drop, credited to the requesters. Contributors: label ten `good first icon` issues with the family and slot spelled out; the plan files already explain the grammar.

## Track E — Hooks that spread on their own (me)

- "Icons by IconMind" optional badge and a one-line credit snippet — no attribution is required, which is itself worth saying on every page.
- A Figma plugin (after the community file): search, insert, switch variant — the file gets found, the plugin gets used daily.
- VS Code extension: IconMind name completion + preview in JSX/Dart — small, and it lives in the editor.
- Raycast extension: search and copy — the audience that ships side projects.

## Sequence

| when | what | needs from the user |
|---|---|---|
| Week 1 | Track A technical package; Iconify exporter + PR text; repo topics/social/GIF; MCP registry drafts; Packagist text; comparison + collection pages | Search Console, Packagist publish, Iconify PR from their account |
| Week 2 | Launch: HN + PH + Reddit + dev.to + X on one day, newsletters submitted the same week | accounts and the posting |
| Week 3–4 | Figma community file; awesome-list and directory submissions; starter-template PRs; VS Code extension | Figma publish, PR approvals |
| Monthly | requested-icons drop → release → post; review Search Console + search-miss; one new integration | Vercel Analytics on a paid plan |

## Targets at 90 days (a way to notice if it is working, not a promise)

Search Console: 50k impressions/month, Images clicks visible. GitHub: 500 stars. npm:
react package downloads clearly above the mirror baseline (2× the others). pub.dev: 50
likes. Iconify: collection live and in icones.js.org. Ten community-requested icons
shipped. If two of these are missed, the channel behind them gets rethought, not
pushed harder.

## What I can start without you

1. Track A end to end (PNG previews, og:image, `<img>`, image sitemap, lastmod, PNG and
   zip downloads, comparison and collection pages).
2. The Iconify exporter and PR text; repo topics via the API; the docs pages (jsDelivr,
   Cursor rule, shadcn item).
3. Every draft: HN title and text, PH tagline and gallery copy, the Reddit posts, the
   dev.to article, newsletter submissions, awesome-list PR bodies, MCP registry listings.

What only you can do: connect Search Console and Vercel Analytics, publish on
Packagist, open the Iconify and awesome-list PRs from your account, publish the Figma
file, and press post on launch day.

## Track F — expansion, and the gate on each step

Written 2026-08-30, after 0.5.0. The order is deliberate: everything here is a *surface*
before it is a *product*, because the set already outruns its audience — 2,271 icons and
no users is a distribution problem, and building more product against it is the classic
way to make that worse. Each step names what has to be true before it starts.

**Versions move together.** The nine npm packages, the Figma plugin and the VS Code
extension are one `fixed` group in changesets; Flutter's `pubspec.yaml` and Blade's tag
are bumped by hand in the same release commit. A new package joins the group at the
current version — never at 0.1.0 — so "which version of IconMind is this?" has one answer
everywhere.

### Now — Figma (no gate; designers pick icons before developers do)

The plugin (`packages/figma-plugin`) does two things: insert one icon, or **build the
library** — every icon as a component set with the six cells as variants, one page per
category, descriptions and links attached. That is how the community file gets made, and
remade after every release, from the same drawings the packages ship.

Sequence: publish the community file → publish the plugin → link both from the docs and
the README. The community file is the single highest-traffic surface an icon set has
outside Google.

### Next — the surfaces that complete the claim

| Step | Gate | Why |
|---|---|---|
| **Web Components** (`@iconmind/wc`) | none — half a day | One `<im-icon name="agent">` for Angular, Rails, Laravel, HTMX, WordPress, plain HTML. Closes the largest gap with one package. |
| **Angular** (`@iconmind/angular`) | after web components | The only major framework without a package; its own directories and awesome-list. |
| **VS Code extension** published | after the Figma file | Built already; publishing needs a Marketplace publisher. |
| **Compose (Android)** and **SwiftUI (iOS)** | a request, or mobile traffic in Search Console | The recipe is proven by Flutter (214 KB, tree-shaken). Maven Central and SwiftPM are two more ecosystems — but two more release surfaces to keep in step, so not before someone asks. |

### Later — the things only this project can do

| Step | Gate | Why |
|---|---|---|
| **Icons on request, drawn to the grid** | 10 requests in the issue tracker | The asset is the compiler, not the set: a request becomes a real icon in a day, in the same voice. This is what makes people tell other people. |
| **Animated icons** (Lottie/Rive from the same paths) | 1,000 npm downloads that are not mirrors | A real differentiator, about a week's work, worthless with no audience. |
| **The compiler itself** (`@iconmind/forge`) | after the compiler article lands | Let anyone build a set with these guarantees. A developer-tool play with its own audience. |
| **Design-system MCP** — icons *and* tokens *and* component snippets | MCP server used by anyone but us | The wedge nobody else has: assistants that write consistent UI, not just pick a glyph. |

### Never (decided, not deferred)

Brand and logo icons (trademark, not ours to license), an icon font (it flattens duotone
and the weights into one glyph), a filled variant (tried, dropped), and paid icons — the
set stays MIT. Sustainability comes from sponsorship, sponsored categories and
brand-fit commissions, never from a paywall on the drawings.
