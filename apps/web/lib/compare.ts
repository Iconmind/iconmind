/**
 * The comparison pages — honest tables against the sets people already know.
 *
 * Somebody searching "lucide alternative" or "icons like heroicons for AI" is choosing,
 * and a page that only praises itself does not help them choose. Every row is a fact
 * either set would agree with; the differences are stated, not sold. Counts for the
 * other sets are the ones published on their sites on the date given, and are marked
 * approximate because they move.
 */
export interface CompareSection {
  heading: string;
  body: string[];
  /** An optional table under the prose, for numbers that read badly in a sentence. */
  table?: { head: [string, string, string]; rows: [string, string, string][] };
  code?: string;
}

export interface Compare {
  slug: string;
  name: string;
  url: string;
  lead: string;
  /** Who should pick which, before any detail. */
  answer: string[];
  rows: [label: string, iconmind: string, other: string][];
  sections: CompareSection[];
  verdict: string[];
  faq: [q: string, a: string][];
}

const OURS = {
  count: "2,287 (0.6.0)",
  ai: "664 icons for LLMs, agents, MCP, RAG — a third of the set",
  variants: "outline and duotone, each in thin / regular / bold (6 drawings per icon)",
  frameworks: "React, Vue, Svelte, Solid, Preact, React Native, Astro, Laravel Blade, Flutter — one source, one release",
  mcp: "yes — `npx @iconmind/mcp` searches the set and returns paste-ready code",
  license: "MIT — commercial use, no attribution",
  grid: "24 px, 2 px stroke, every cell machine-validated",
};

export const COMPARISONS: Compare[] = [
  {
    slug: "lucide",
    name: "Lucide",
    url: "https://lucide.dev",
    lead: "Lucide is the generalist set most React apps start with. IconMind draws the same grid and stroke, then adds the vocabulary an AI product needs.",
    answer: [
      "Use Lucide if your product is an ordinary web application and you want the set with the longest track record, the widest framework support and a community that has already answered your question on GitHub. It is excellent, it is free, and nothing on this page is an argument against it.",
      "Use IconMind if a meaningful part of your interface is about models, agents, retrieval or infrastructure, and you keep running out of nouns. Lucide has 2,048 icons and almost none of them are a context window, a reranker, a tool call or an MCP resource. IconMind has 664 drawings for that vocabulary, on the same 24 px grid and the same 2 px stroke, so the two sets sit on one screen without clashing.",
      "Using both is a legitimate answer and a common one. Start with Lucide, add IconMind for the AI surface, and a reader cannot tell which icon came from where.",
    ],
    sections: [
      {
        heading: "Coverage: where each set runs out",
        body: [
          "Lucide covers the interface. Files, folders, arrows, media controls, weather, shapes, commerce, a good spread of everyday objects. It descends from Feather and inherits Feather's restraint, which is why so many products look at home in it straight away.",
          "It runs out at the domain layer. Search it for the words an AI product puts on screen and you meet the same four fallbacks: a sparkle for anything generative, a robot for anything autonomous, a cylinder for anything stored, a bolt for anything fast. A dashboard for an agent framework ends up using one picture to mean five things, and the reader learns nothing from any of them.",
          "IconMind runs out in the other direction. There is no tooth, no chair, no croissant, no zodiac sign, and there will not be. What it has instead is 664 drawings for the vocabulary that entered software after 2023, and about 1,600 more for the ordinary families around them so that a screen with an agent on it can also have a file picker.",
          "That second half is the part people miss when they hear the pitch. Files, folders, people, chat, calendars, panels, lists, text controls, arrows, git, mail, charts and devices are all drawn in the same hand as the agent icons, for the same reason a typeface ships punctuation.",
        ],
        table: {
          head: ["What you need to draw", "Lucide", "IconMind"],
          rows: [
            ["An agent acting on its own", "bot", "agent, agent-run, agent-thinking, agent-idle, agent-blocked, agent-handoff"],
            ["A model", "brain, cpu", "model, model-message, tiny-model, model-alert, audio-model, lora-merge"],
            ["Context and tokens", "nothing", "context-window, context-budget, context-overflow, token, token-count"],
            ["Tool use", "wrench", "tool, tool-calling, tool-result, tool-error, tool-permission, tool-registry"],
            ["MCP", "nothing", "59 icons: servers, clients, resources, prompts, transports, sampling"],
            ["Retrieval", "search", "retriever, reranker, chunk, chunk-overlap, embedding, vector-database, grounding"],
            ["Ordinary interface", "the whole set", "about 1,600 icons on the same grid"],
          ],
        },
      },
      {
        heading: "Bundle size, measured rather than claimed",
        body: [
          "Both sets tree-shake and both are honest about it. The numbers below are what the npm registry reported on 31 August 2026, and they describe what an install writes to disk rather than what a browser downloads.",
          "What a browser downloads is much smaller, and much closer between the two. One IconMind icon is 619 bytes gzipped including the shared factory, and three are 820, so the second and third icons cost about 100 bytes each. Those are size-limit tests in CI rather than marketing numbers: the build fails when they stop being true. Lucide is in the same territory per icon.",
          "The gap in install size comes from IconMind shipping six drawings per icon instead of one. You pay it once, on install, and never again at runtime.",
          "The practical rule is identical for both: import named icons rather than the barrel and let the bundler drop the rest. Where a bundler cannot tree-shake a barrel, IconMind also publishes a path per icon, which sidesteps the question entirely. That matters most in React Native and in a few older CommonJS setups.",
        ],
        table: {
          head: ["Package", "Unpacked on disk", "Files"],
          rows: [
            ["lucide-react 1.37.0", "30.2 MB", "4,136"],
            ["@iconmind/react 0.6.0", "5.6 MB", "6,867"],
            ["@tabler/icons-react 3.46.0", "63.0 MB", "12,386"],
            ["@heroicons/react 2.2.0", "3.5 MB", "5,183"],
          ],
        },
      },
      {
        heading: "Variants and weights",
        body: [
          "Lucide ships one style and exposes strokeWidth as a prop. Set it to 1.5 and the icon thins out, set it to 3 and the counters close up. For a set of that size it is the right trade, and for most interfaces it is enough.",
          "IconMind ships six drawings per icon: outline and duotone, each at thin, regular and bold. A weight is a separate drawing rather than a multiplier, because the rules that keep an icon legible change as the stroke grows. A gap that reads at 1.5 px merges at 2.5 px, so the bold cell moves its strokes apart instead of fattening them in place.",
          "Duotone is derived, never drawn by hand. Every closed body takes a twenty percent tint behind the strokes, and an icon made only of open marks gets a halo of the same paths three units wider. That rule is why the whole set answers a variant switch rather than the subset somebody remembered to redraw.",
        ],
        code: "<Agent />                                  // outline, regular\n<Agent variant=\"duotone\" weight=\"bold\" />  // a different drawing, not a thicker one\n<Agent size={32} className=\"text-violet-500\" />",
      },
      {
        heading: "Frameworks, and what ships with each",
        body: [
          "Lucide covers React, Vue, Svelte, Solid, Preact, Angular, React Native and Flutter, plus a plain SVG package and a font. Angular is the one IconMind has no answer for yet.",
          "IconMind covers React, Vue, Svelte, Solid, Preact, React Native, Astro, Laravel Blade and Flutter, plus plain SVG, a sprite sheet, an Iconify collection and an MCP server. Every package is generated from the same declarations in a single release, so a component name means the same drawing everywhere.",
          "The MCP server has no equivalent in any other set. Point a coding assistant at it and the assistant searches the real icon list before writing an import, which is how a diff stops containing components that do not exist. For assistants without tool access the site serves llms.txt with every valid name and the naming rules.",
        ],
      },
      {
        heading: "Licences, in plain terms",
        body: [
          "Lucide is ISC. IconMind is MIT. Both let you ship commercial software, modify the drawings and redistribute them, and both ask that the copyright notice travels with copies of the source.",
          "For an application developer the difference is close to nothing. It matters a little if you redistribute the icon files inside another library, where the licence text has to come along. Neither set requires attribution in your interface, and neither has a seat count, a tier or a per-project fee.",
          "IconMind adds one commitment on top: there will be no paid tier over the drawings. Sponsorship and commissioned icons are how the project is funded.",
        ],
      },
      {
        heading: "Using both, and moving between them",
        body: [
          "The two sets share a grid, a stroke width and round caps. That is not a coincidence: IconMind matched Lucide deliberately so a product could adopt it a screen at a time. At 16, 20 and 24 px a Lucide arrow and an IconMind arrow read as one set.",
          "About a hundred Lucide names resolve inside IconMind as aliases, so searching for the name you already know finds the drawing. file-plus finds document-add, message-square-check finds chat-check, panel-left finds sidebar, cloud-download finds download-cloud, clock-check finds on-time. The site search, the MCP server and llms.txt all understand both spellings.",
          "A gradual migration usually looks like this. Keep Lucide where it already works. Add IconMind on the screens that talk about models, agents or retrieval. Replace an overlapping icon only when you are in that file for another reason. There is no build step to change and no stylesheet to reconcile.",
        ],
        code: "import { Search, Settings } from \"lucide-react\";             // keep what works\nimport { AgentRun, VectorDatabase } from \"@iconmind/react\";  // add the vocabulary\n\n<Search className=\"size-5\" />\n<AgentRun className=\"size-5\" />                              // same grid, same stroke",
      },
      {
        heading: "What IconMind refuses that Lucide ships",
        body: [
          "An icon font. Lucide has one. IconMind will not, because a font flattens duotone and the three weights into a single filled glyph. The sprite sheet covers the case where you want no build step.",
          "Angular components. Lucide has them and IconMind does not. Until that changes, the sprite or the Iconify collection is the workable route in an Angular application.",
          "Everyday objects. Lucide draws a tooth, a chair and a coffee cup. IconMind decided against that whole category rather than half-covering it, along with brand logos, weather and cryptocurrency coins. Each refusal is listed with its reason on the refusals page, including the ones the compiler rejected outright.",
        ],
      },
      {
        heading: "Labels, focus and screen readers",
        body: [
          "Both sets treat an icon as decoration until you say otherwise, which is the right default: a button that already says Delete does not need its icon announced a second time.",
          "Lucide adds aria-hidden when the icon has no children and no accessibility prop of its own, and it puts a lucide class on every SVG so you can target them in CSS. IconMind adds aria-hidden and focusable false, and switches to role img the moment you pass aria-label or aria-labelledby, so a labelled icon is announced and an unlabelled one is skipped.",
          "The practical rule is the same on both: label the control, not the icon. Where an icon really is the only content, as in an icon-only button, give it an aria-label and let the role switch handle the rest.",
          "One thing Lucide has that IconMind does not is a context provider for defaults. Wrap a tree and every icon inside it inherits a size, colour, stroke width and class. Here you set those per icon or wrap your own component, which is one more file to write.",
        ],
        code: "<Trash2 />                                  // decorative, aria-hidden\n<Trash2 aria-label=\"Delete file\" />          // role=\"img\", announced",
      },
      {
        heading: "How these numbers were measured",
        body: [
          "Package sizes come from the npm registry on 31 August 2026, taken from the published tarballs rather than from a size badge: lucide-react 1.37.0 unpacks to 30.2 MB across 4,136 files, @iconmind/react 0.6.0 to 5.6 MB across 6,867. Both figures are what lands in node_modules, not what reaches a browser.",
          "The browser numbers come from the size-limit suite that runs in CI, measured on 31 August 2026 against a production esbuild bundle with React treated as external: one icon 619 bytes gzipped, three icons 820, and the shared factory on its own 465. Carrying all six cells with each icon rather than splitting them across six import paths costs roughly 39 bytes gzipped, because a duotone cell compresses to almost nothing next to the outline it repeats.",
          "The icon counts are the packages themselves: lucide-react 1.37.0 ships 2,048 icon modules, counted in the published tarball; IconMind has 2,287 icons and 13,722 cells, of which 664 icons are the AI, agent, MCP and RAG families. Anything in the tables that is not a measurement is a plain fact about the packages, and every command used to produce these numbers is in the repository.",
        ],
      },
    ],
    rows: [
      ["Icons", OURS.count, "2,048 (v1.37.0, Aug 2026)"],
      ["AI and agent vocabulary", OURS.ai, "a handful (bot, brain, sparkles)"],
      ["Variants and weights", OURS.variants, "one style; stroke width as a prop"],
      ["Frameworks", OURS.frameworks, "React, Vue, Svelte, Solid, Preact, Angular, React Native, Flutter"],
      ["MCP server for assistants", OURS.mcp, "no"],
      ["Grid and stroke", OURS.grid, "24 px, 2 px stroke"],
      ["Licence", OURS.license, "ISC — attribution required in derivative work"],
      ["Brand logos", "none, on purpose", "none, on purpose"],
    ],
    verdict: [
      "If you are drawing arrows and folders, both sets do the job and Lucide has the longer track record. If your product has agents, models, tokens, tool calls or a vector database on screen, Lucide has no icon for them and IconMind has hundreds, drawn to the same grid, so the two can sit side by side while you migrate.",
      "The names are compatible on purpose: a hundred-odd Lucide names resolve here as aliases (`file-plus`, `message-square-check`, `panel-left`), so a search for the name you know finds the drawing.",
    ],
    faq: [
      ["Can I use IconMind and Lucide together?", "Yes. Both are 24 px, 2 px stroke, round caps and joins. Mixing them on one screen is not visible at UI sizes."],
      ["Does IconMind have every Lucide icon?", "No. It has the interface families a product needs — files, folders, people, chat, calendar, panels, lists, arrows, git, mail, charts — and not zodiac signs, food or vehicles. Lucide names for icons that exist here resolve as aliases."],
      ["Which is more permissive?", "IconMind is MIT: no attribution, commercial use, no seat count. Lucide is ISC, which is functionally similar; check the notice requirements for your use."],
      ["Is IconMind a Lucide fork?", "No. The grid and the stroke match on purpose so the two can share a screen, but every drawing is compiled from its own declaration in this repository. Read any icon's source and run the compiler yourself."],
      ["Does IconMind work with Tailwind?", "Yes. The components take className, so size-5 and text-zinc-500 behave exactly as they do with Lucide. There is also an Iconify collection if you prefer the Tailwind icon plugin."],
      ["What about Angular?", "Lucide has Angular components and IconMind does not yet. Use the sprite sheet or the Iconify collection in an Angular app."],
    ],
  },
  {
    slug: "tabler",
    name: "Tabler Icons",
    url: "https://tabler.io/icons",
    lead: "Tabler is the biggest of the stroke sets. IconMind is under half the size and covers what Tabler does not: the software being built in 2026.",
    answer: [
      "Use Tabler if breadth is the requirement. 5,130 outline icons and 1,054 filled, MIT licensed, drawn on the same 24 px grid, and if you need a tractor, a stethoscope or a brand mark, Tabler has one and IconMind never will.",
      "Use IconMind if the screens that matter are about models, agents, retrieval or infrastructure. Tabler covers that ground with a few dozen icons: a robot, a brain, sparkles, a couple of AI-labelled shapes. IconMind covers it with 664, drawn as families that share a body so a reader can tell an agent from a model from a tool at a glance.",
      "The sets do not fight. Same grid, same stroke, same round terminals. Plenty of products would sensibly run Tabler for breadth and IconMind for the domain.",
    ],
    sections: [
      {
        heading: "Breadth against depth",
        body: [
          "Tabler is one of the largest hand-maintained icon sets in open source, and its size is the point. A form builder, an admin panel, a hospital dashboard and a farm management app can all be drawn from it without inventing anything. That is a genuine achievement and it took years.",
          "The cost of breadth is that no single domain gets deep treatment. Tabler's AI icons are the ones a general set reaches for: robot, brain, sparkles, a chip. They are fine as decoration and they fall apart as vocabulary, because a screen that shows an agent, a model, a tool call and a retrieval step needs four different pictures that a reader can learn.",
          "IconMind made the opposite trade. It is a little under half the size of Tabler's outline set and spends 664 of its icons on one domain, with a grammar behind them: an open ring is an agent, a chamfered frame is a machine or an MCP server, a two-pronged plug is a tool, a page with a fold is a document. Learn four bodies and you can guess the next icon in a family before you see it.",
        ],
        table: {
          head: ["", "Tabler", "IconMind"],
          rows: [
            ["Icons", "5,130 outline, 1,054 filled", "2,287 outline (all with duotone)"],
            ["Drawings per icon", "2 (outline, filled)", "6 (outline and duotone at three weights)"],
            ["AI and agent vocabulary", "a few dozen general shapes", "664 icons in named families"],
            ["Brand logos", "yes", "no, and not planned"],
            ["Unpacked React package", "63.0 MB across 12,386 files", "5.6 MB across 6,867 files"],
            ["Licence", "MIT", "MIT"],
          ],
        },
      },
      {
        heading: "Filled against duotone",
        body: [
          "Tabler's second style is filled: the same silhouette with the interior solid. It reads well at small sizes and it is the convention most sets follow, Heroicons included.",
          "IconMind tried a filled variant and dropped it. A solid silhouette throws away the interior detail that makes these icons distinguishable, and this set leans on interior marks more than most: an agent with a check inside, a machine with a chamfer, a server with a status light. Filled versions of those are nearly the same shape.",
          "Duotone solves the same problem differently. The body takes a twenty percent tint and the strokes stay where they are, so the icon gains weight on a screen without losing what is inside it. And because the tint is derived by rule rather than drawn by hand, every icon has one.",
        ],
      },
      {
        heading: "Weights that are drawings",
        body: [
          "Both sets expose stroke width, and in Tabler that is a prop applied to a single drawing. Turn it up and the counters close; turn it down and the icon goes faint. It works within a narrow range, which is what most interfaces need.",
          "IconMind treats a weight as a separate cell with its own geometry. The thin cell is 1.5 px, regular is 2 px, bold is 2.5 px, and each is validated on its own: minimum gaps grow with the stroke, so a bold icon moves strokes apart rather than letting them merge. There is an absoluteStrokeWidth prop as well, for the case where an icon has to hold its line weight while its box grows.",
        ],
        code: "<VectorDatabase weight=\"thin\" />    // 1.5 px, its own drawing\n<VectorDatabase />                  // 2 px\n<VectorDatabase weight=\"bold\" />    // 2.5 px, gaps widened to survive it",
      },
      {
        heading: "Packages and tooling",
        body: [
          "Tabler ships React, Vue, Svelte, Solid, Preact, React Native, Flutter, a webfont and PNG exports. IconMind ships React, Vue, Svelte, Solid, Preact, React Native, Astro, Laravel Blade, Flutter, plain SVG, a sprite sheet, an Iconify collection and an MCP server.",
          "Two differences worth knowing. Tabler has a webfont and IconMind does not, deliberately, because a font cannot carry duotone or three real weights. IconMind has an MCP server and Tabler does not: a coding assistant can search the real set before it writes an import, instead of inventing a component name that does not exist.",
          "Both sets can be used without any package at all. Tabler publishes raw SVG; IconMind publishes raw SVG, a sprite of symbols, and every cell as a file on disk under a predictable path.",
        ],
      },
      {
        heading: "How each set is kept consistent",
        body: [
          "Tabler is reviewed by people, at scale, with a contribution guide and a long-running maintainer team. That is how most icon sets work and it is why Tabler holds together across six thousand drawings.",
          "IconMind is compiled. Each icon is a declaration, and a validator refuses geometry it cannot draw correctly: anchors off the half-unit grid, angles that are not 0, 45 or 90 degrees, strokes that vanish at bold, icons that do not fill the same optical box as the rest. A nightly job then rasterises all 13,722 cells and fails if any two icons render alike.",
          "Neither approach is better in the abstract. The compiler catches drift that eyes miss at this scale, and it also refuses drawings a human would have shipped: Bluetooth is not in the set because its rune needs three stroke crossings where the rule allows two.",
        ],
      },
      {
        heading: "Finding the icon you want",
        body: [
          "Tabler's search is name-first with a tag layer on top, and at six thousand components the names carry a lot of weight. It works well when you know roughly what the thing is called and less well when you are searching for a concept.",
          "IconMind indexes four fields per icon: the name, a description written for the search box rather than for a designer, a list of tags, and a list of aliases for the words people actually type. Search for llm and you land on model; search for vector db and you land on vector-database; search for handoff and you get the agent family.",
          "There is also an MCP server, which matters more than it sounds. When an assistant writes an import for an icon set it does not have indexed, it guesses a plausible component name and is often wrong. Pointed at the MCP server it searches the real metadata first, so the import compiles.",
        ],
      },
      {
        heading: "What switching actually costs",
        body: [
          "Most of the work is naming. Both sets use kebab-case slugs and PascalCase components, and a large share of the interface icons map one to one: arrow-left, check, trash, settings, search. Those are a find and replace.",
          "The rest is a judgement call per icon, and it is worth doing by hand because the sets do not agree on everything. Tabler's brand icons have no equivalent here and never will. Some Tabler icons are more literal than the IconMind equivalent, and a few IconMind icons split into families where Tabler has one drawing.",
          "The pragmatic path is not to switch at all. Add IconMind for the domain screens, leave Tabler where it already works, and set the weight to regular so the two sit at the same 2 px. Nothing about either package objects to the other being installed.",
        ],
        code: "import { IconSettings, IconTrash } from \"@tabler/icons-react\";\nimport { AgentRun, VectorDatabase } from \"@iconmind/react\";\n\n// same grid, same 2 px, same round caps",
      },
      {
        heading: "Asking for an icon",
        body: [
          "Tabler takes requests as issues and additions as pull requests, which is how a set reaches six thousand components: many hands, one review queue. If the icon you need is missing, someone can draw it and it lands in a release.",
          "IconMind adds icons in rounds instead. A round picks a theme, the icons are declared as geometry, and the round either passes every gate or goes back. That is slower and it means you cannot get one icon added on request, but it is also why the set has no drawing that was waved through on a deadline.",
          "That has a cost worth stating: an icon here cannot be nudged by eye. If a drawing needs a curve that is not on the grid or an angle that is not 0, 45 or 90 degrees, it does not get made. A few icons that would be easy to draw by hand are missing for exactly that reason, and the refusals are published with the reasoning instead of being left as silent gaps.",
        ],
      },
      {
        heading: "When Tabler is the better choice",
        body: [
          "If the product is a general admin tool, an internal dashboard, a booking system or anything that has to name a lot of physical things, Tabler will cover it and IconMind will not. A large part of what Tabler draws is outside this set's scope by design.",
          "If you need brand marks, Tabler has them and IconMind refuses them, because logos carry trademark terms that a blanket MIT licence cannot honestly cover.",
          "If a webfont is the delivery mechanism your stack expects, Tabler ships one. IconMind does not and will not, because a font cannot carry a duotone tint or three separately drawn weights.",
        ],
      },
      {
        heading: "How these numbers were measured",
        body: [
          "The package sizes were read from the npm registry on 31 August 2026, from the published tarballs: @tabler/icons-react 3.46.0 unpacks to 63.0 MB across 12,386 files, @iconmind/react 0.6.0 to 5.6 MB across 6,867 files. That is disk in node_modules. Neither number is what a browser downloads, because both packages ship per-icon modules and tree-shake to what you import.",
          "The icon counts come from the same tarballs rather than from either project's marketing: @tabler/icons-react 3.46.0 exports 6,184 components, 5,130 outline and 1,054 filled. IconMind has 2,287 icons and 13,722 cells across two variants and three weights, 664 of them in the AI, agent, MCP and RAG families.",
          "On breadth those numbers speak for themselves: Tabler draws more than twice as many things as this set does, and it will keep doing so. The tables are written to say that plainly rather than to work around it.",
        ],
      },
    ],
    rows: [
      ["Icons", OURS.count, "6,184 components (v3.46.0)"],
      ["AI and agent vocabulary", OURS.ai, "a few dozen (robot, brain, sparkles, ai)"],
      ["Variants and weights", OURS.variants, "outline and filled; stroke width as a prop"],
      ["Frameworks", OURS.frameworks, "React, Vue, Svelte, Solid, Preact, React Native, Flutter, PNG, webfont"],
      ["MCP server for assistants", OURS.mcp, "no"],
      ["Grid and stroke", OURS.grid, "24 px, 2 px stroke"],
      ["Licence", OURS.license, "MIT"],
    ],
    verdict: [
      "Tabler is the better general-purpose set and this page is not going to argue otherwise. Five thousand outline icons and a thousand filled, all MIT, drawn on the same grid at the same stroke, is a resource most products can build an entire interface from.",
      "What it does not have is a vocabulary for models, agents, retrieval and infrastructure, because no general set does. That is the gap IconMind was drawn for, and 664 of its icons live in it.",
    ],
    faq: [
      ["Can I use Tabler and IconMind together?", "Yes, and for most teams that is the sensible answer. Both are 24 px with a 2 px stroke and round terminals, so the regular weight sits beside Tabler without adjustment. Use Tabler for breadth and IconMind for the domain screens."],
      ["Why is the IconMind package so much smaller than Tabler's?", "Fewer icons and no per-icon runtime. Tabler's React package unpacks to 63.0 MB across 12,386 files; IconMind unpacks to 5.6 MB across 6,867. Neither number reaches the browser: both tree-shake to the icons you import."],
      ["Does IconMind have brand or logo icons like Tabler?", "No, and it will not. Trademarks come with usage terms that a blanket MIT licence cannot honestly cover, so brand marks are one of the categories this set refuses outright."],
      ["What happens to icon names if I migrate?", "Most interface icons map one to one on their slug, so a find and replace covers the bulk of it. The rest needs a look per icon, because some Tabler icons have no equivalent here and some IconMind entries split into a family where Tabler has a single drawing."],
    ],
  },
  {
    slug: "heroicons",
    name: "Heroicons",
    url: "https://heroicons.com",
    lead: "Heroicons is Tailwind's set: three hundred icons, immaculately drawn. IconMind is for the product that needs the other two thousand.",
    answer: [
      "Use Heroicons if you are building with Tailwind and 300 icons is enough. It is drawn by the Tailwind team, it is beautifully consistent, and its optical sizes are better than anything IconMind offers at 16 and 20 px.",
      "Use IconMind when 300 icons stops being enough, which for an AI product happens early. There is no context window, no reranker, no tool call and no MCP server in Heroicons, and there are 664 of them here.",
      "If you already use Heroicons, the thin weight is the one to pair with it: 1.5 px, the same as the Heroicons outline style.",
    ],
    sections: [
      {
        heading: "Three hundred icons, chosen carefully",
        body: [
          "Heroicons is small on purpose. Every icon in it is one somebody needed while building Tailwind UI, which is why the set feels so coherent and why it has almost no filler. For a marketing site, a settings page or a checkout flow it is often complete.",
          "The limit shows up the moment a product has a domain. There is no icon for a model, a token, an embedding, a retrieval step or a policy, so teams draw their own and the seams appear immediately: a hand-drawn agent beside a Heroicons user is obvious at 24 px.",
          "IconMind is 2,287 icons and its interface families are deliberately close to what Heroicons covers, so the two overlap cleanly. The difference is the 664 icons behind them.",
        ],
        table: {
          head: ["", "Heroicons", "IconMind"],
          rows: [
            ["Icons", "about 300", "2,287"],
            ["Styles", "outline 24, solid 24, mini 20, micro 16", "outline and duotone at thin, regular, bold"],
            ["Stroke", "1.5 px outline", "1.5, 2 and 2.5 px, each its own drawing"],
            ["Frameworks", "React, Vue", "React, Vue, Svelte, Solid, Preact, React Native, Astro, Blade, Flutter"],
            ["AI vocabulary", "sparkles, cpu-chip", "664 icons across ai, agents, rag and mcp"],
            ["Licence", "MIT", "MIT"],
          ],
        },
      },
      {
        heading: "Optical sizes: what Heroicons does better",
        body: [
          "Heroicons ships four styles, and two of them are optical sizes rather than weights: mini at 20 px and micro at 16 px are solid-only and redrawn for those boxes, with the detail simplified rather than shrunk. In a dense table or a compact toolbar they are visibly better than scaling a 24 px icon down.",
          "IconMind does not do this. Every icon is drawn once on a 24 px grid and validated to stay legible when rendered at 16, which is a weaker guarantee than a purpose-drawn 16 px cell. The audit measures ink coverage and short-side length precisely because of that, and icons that fail it get redrawn, but a rule is not the same as a separate drawing.",
          "If your interface is mostly 16 and 20 px chrome, this is a real argument for Heroicons, and an honest one to make on a page like this.",
        ],
      },
      {
        heading: "Matching the two on one screen",
        body: [
          "Heroicons outline is 1.5 px on a 24 px grid. IconMind's thin weight is 1.5 px on a 24 px grid. Set the weight and the two sets sit together without anyone noticing the join.",
          "Both take className, so Tailwind sizing and colour work identically. Neither needs a wrapper component, and neither ships CSS.",
        ],
        code: "import { UserIcon } from \"@heroicons/react/24/outline\";\nimport { AgentRun } from \"@iconmind/react\";\n\n<UserIcon className=\"size-5 text-zinc-500\" />\n<AgentRun weight=\"thin\" className=\"size-5 text-zinc-500\" />",
      },
      {
        heading: "Beyond React and Vue",
        body: [
          "Heroicons publishes React and Vue packages, plus raw SVG that anyone can copy. That covers a large share of the Tailwind audience and nothing more is promised.",
          "IconMind publishes nine framework packages from one source, along with a sprite sheet, an Iconify collection and an MCP server for coding assistants. If your stack is Svelte, Solid, Astro, Laravel or Flutter, this is the practical difference between the two.",
        ],
      },
      {
        heading: "Solid against duotone",
        body: [
          "Heroicons' solid style is the same shape with the interior filled, and at 20 and 16 px it is the right call: below a certain size a stroke drawing has more line than area and starts to shimmer. The mini and micro styles are solid for exactly that reason.",
          "IconMind's second variant is duotone rather than solid. The strokes stay, and the body behind them takes a twenty percent tint of the same colour. The icon gains presence without giving up the interior detail, which matters here because the families are told apart by what is inside them: a ring with a check, a chamfered frame, a server with a status light.",
          "Every duotone cell is derived from the outline drawing by rule, so there is no drift between the two and no icon that has one but not the other. All 2,287 exist in both, at all three weights, which is where the 13,722 figure comes from.",
        ],
        table: {
          head: ["", "Heroicons", "IconMind"],
          rows: [
            ["Second variant", "solid fill", "duotone: strokes plus a 20% body"],
            ["Sizes", "24, 20 and 16, drawn separately", "one 24 px drawing, validated for 16"],
            ["Weights", "one per style", "1.5, 2 and 2.5 px, drawn separately"],
            ["Cells in total", "about 1,200", "13,722"],
          ],
        },
      },
      {
        heading: "Adding a domain to a Heroicons app",
        body: [
          "The usual pattern is not a migration. Heroicons keeps the chrome it already draws well, and IconMind fills the screens Heroicons was never going to cover: the model list, the agent run view, the retrieval trace, the eval report.",
          "Two settings make the join invisible. Use the thin weight, which is 1.5 px like Heroicons outline, and keep both at the same rendered size. Both take className, both inherit currentColor, and neither ships any CSS of its own.",
          "If you do want a full switch, start with the icons Heroicons has and IconMind also has, which is most of the interface set, then work through the rest by hand. There are around 300 icons to consider, so it is an afternoon rather than a project.",
        ],
        code: "import { UserIcon, Cog6ToothIcon } from \"@heroicons/react/24/outline\";\nimport { AgentRun, Reranker } from \"@iconmind/react\";\n\nfunction Toolbar() {\n  return (\n    <div className=\"flex items-center gap-3 text-zinc-500\">\n      <UserIcon className=\"size-5\" />\n      <Cog6ToothIcon className=\"size-5\" />\n      <AgentRun weight=\"thin\" className=\"size-5\" />\n      <Reranker weight=\"thin\" className=\"size-5\" />\n    </div>\n  );\n}",
      },
      {
        heading: "What actually ships to the browser",
        body: [
          "Neither set has a bundle-size problem in a modern build. Both publish per-icon modules with sideEffects false, so an app that imports twelve icons ships twelve icons and the rest never leaves node_modules.",
          "The measurable difference is on disk during install. The Heroicons React package unpacks to 3.5 MB across 5,183 files; IconMind unpacks to 5.6 MB across 6,867 files for seven and a half times as many icons, because a cell is a small file and there is no per-icon runtime.",
          "One IconMind import is 619 bytes gzipped including the shared factory, and three are 820, so each icon after the first costs about 100 bytes. The one thing to avoid on the client is the metadata module, which is 1.7 MB and meant for build scripts and the MCP server; use metadata.json at build time instead.",
        ],
        table: {
          head: ["", "Heroicons", "IconMind"],
          rows: [
            ["React package unpacked", "3.5 MB, 5,183 files", "5.6 MB, 6,867 files"],
            ["Icons in the package", "about 300", "2,287"],
            ["Per-icon modules", "yes", "yes"],
            ["Tree-shaking", "sideEffects false", "sideEffects false"],
          ],
        },
      },
      {
        heading: "Labels and titles",
        body: [
          "Heroicons sets aria-hidden on every icon and gives you a title and titleId pair. Pass both and the component renders a title element inside the SVG and wires aria-labelledby to it, which is the most explicit way to name an icon and one of the nicer details in that package.",
          "IconMind takes the shorter route. Icons are aria-hidden with focusable false by default, and passing aria-label or aria-labelledby switches the element to role img so it is announced. There is no title prop, which is a real difference if your team standardised on that pattern.",
          "Either way the guidance is the same: name the control rather than the icon, and reserve a label for the case where the icon is the only content in the button.",
        ],
        code: "<UserIcon title=\"Account\" titleId=\"acct\" />   // Heroicons\n<AgentRun aria-label=\"Agent run\" />           // IconMind, role=\"img\"",
      },
      {
        heading: "Where each set says no",
        body: [
          "Heroicons stays small by declining almost everything, which is why it works. Requests for domain icons are usually answered by pointing at other sets, and that is the correct answer for a set with that scope.",
          "IconMind declines a different list: brand logos, cryptocurrency, weather, food, animals, a filled variant, an icon font. It also refuses drawings its own compiler cannot make correctly, and those refusals are published with their reasons rather than quietly dropped.",
        ],
      },
      {
        heading: "Different jobs, different scopes",
        body: [
          "Heroicons exists to dress the components Tailwind ships. Its scope is deliberately the smallest set that does that job, and it is maintained by people whose main work is elsewhere. That is a strength: nothing in it is filler, and it changes slowly.",
          "IconMind exists for a domain that did not have a vocabulary. Two thirds of it is ordinary interface work because those screens still need arrows and folders, and the remaining 664 icons are the reason the set exists at all.",
        ],
      },
      {
        heading: "How these numbers were measured",
        body: [
          "Package sizes were taken from the npm registry on 31 August 2026, from the published tarballs rather than a badge: @heroicons/react 2.2.0 unpacks to 3.5 MB across 5,183 files, @iconmind/react 0.6.0 to 5.6 MB across 6,867 files. Both are disk in node_modules, not bytes in a browser.",
          "The styles and defaults described here were read from the packages themselves. The Heroicons outline components render at a 1.5 px stroke with currentColor and aria-hidden set, which is where the claim that the thin weight matches them comes from.",
          "The IconMind figures are the set: 2,287 icons, 13,722 cells, 664 of them in the AI, agent, MCP and RAG families, and 619 bytes gzipped for the first icon you import, measured by the size-limit suite that runs in CI.",
        ],
      },
    ],
    rows: [
      ["Icons", OURS.count, "≈300 (v2)"],
      ["AI and agent vocabulary", OURS.ai, "sparkles, cpu-chip"],
      ["Variants and weights", OURS.variants, "outline, solid, mini, micro"],
      ["Frameworks", OURS.frameworks, "React, Vue"],
      ["MCP server for assistants", OURS.mcp, "no"],
      ["Grid and stroke", OURS.grid, "24 px outline (1.5 px stroke), 20 px solid"],
      ["Licence", OURS.license, "MIT"],
    ],
    verdict: [
      "Heroicons is a small set that does its job unusually well, and its optical sizes at 20 and 16 px are genuinely better than anything IconMind offers in that range.",
      "It runs out at about 300 icons and it has no vocabulary for models, agents, retrieval or infrastructure. If that is the product you are building, the choice is between drawing those icons yourself and taking 664 that were drawn as families.",
      "Heroicons outline is 1.5 px, and IconMind's thin weight is 1.5 px, so the two sets can share a toolbar without anyone noticing the join.",
    ],
    faq: [
      ["Does IconMind work with Tailwind?", "Yes. The components take `className`, so `className=\"size-5 text-zinc-500\"` works as it does with Heroicons. A sprite `<use>` works in plain HTML."],
      ["Which IconMind weight matches Heroicons outline?", "Thin (1.5 px)."],
      ["Does IconMind have 20 px and 16 px optical sizes?", "No. Every icon is drawn once at 24 px and validated to stay legible at 16, which is a weaker guarantee than a purpose-drawn cell. If your interface is mostly 16 and 20 px chrome, that is a real argument for Heroicons."],
      ["Is there a solid variant?", "No. The second variant is duotone: the strokes stay and the body takes a 20% tint, so the interior detail that tells the families apart survives. A solid silhouette would flatten most of this set."],
      ["Can I replace Heroicons entirely?", "You can, and at around 300 icons the review is an afternoon rather than a project. Most of the interface set maps across; the exceptions are worth checking by hand rather than scripting."],
      ["Which frameworks does each set publish?", "Heroicons publishes React and Vue plus raw SVG. IconMind publishes React, Vue, Svelte, Solid, Preact, React Native, Astro, Laravel Blade and Flutter, plus a sprite sheet, an Iconify collection and an MCP server."],
    ],
  },
  {
    slug: "svgrepo",
    name: "SVG Repo",
    url: "https://www.svgrepo.com",
    lead: "SVG Repo is a search engine over half a million icons from hundreds of sets. IconMind is one set, drawn as one set.",
    answer: [
      "Use SVG Repo when you need one icon of one specific thing and you need it today. Half a million vectors, a search box, download and go. No set of 2,287 icons will ever beat that on coverage, and pretending otherwise would be silly.",
      "Use IconMind when the icons are part of a product rather than a one-off. A search engine gives you a drawing; a set gives you a system: one licence, one grid, one stroke language, packages for nine frameworks, and a guarantee that the icon you add next year will match the one you added today.",
      "The honest split is per-icon versus per-product. Many teams do both, and there is nothing wrong with that as long as the borrowed icon is not sitting in the middle of a toolbar built from something else.",
    ],
    sections: [
      {
        heading: "A search engine, not a set",
        body: [
          "SVG Repo aggregates. Its collections come from hundreds of sources with hundreds of authors, which is why it can answer almost any query and why the results for a single query rarely look like each other. Search for server and you get a flat illustration, a thin outline, a filled glyph and a 3D render on the same screen.",
          "That is fine when the icon lands on a slide, a blog post or an empty state. It is a problem in a toolbar, because the eye reads inconsistency before it reads meaning. Two icons drawn by two people at two stroke weights look like a bug even when both are good drawings.",
          "IconMind is one set with one grid. Every icon is 24 by 24, every anchor sits on a half unit, every angle is 0, 45 or 90 degrees, and every stroke terminal is round. That constraint is what makes 2,287 icons look like they were drawn in one sitting.",
        ],
        table: {
          head: ["", "SVG Repo", "IconMind"],
          rows: [
            ["Icons", "around 500,000", "2,287"],
            ["Authors", "hundreds of sources", "one set, one grammar"],
            ["Licence", "varies per icon: CC0, MIT, CC BY, other", "MIT for everything"],
            ["Packages", "none", "nine frameworks plus sprite and Iconify"],
            ["Delivery", "download one file at a time", "install, import, tree-shake"],
            ["Updates", "per-collection, unversioned", "semver across all packages at once"],
          ],
        },
      },
      {
        heading: "Licences you have to read",
        body: [
          "SVG Repo labels each icon with the licence of the collection it came from. Much of it is CC0 or MIT and needs nothing from you. Some of it is CC BY and requires attribution wherever the icon appears, which for a shipped application means a credits screen and a record of which icon came from where.",
          "That bookkeeping is manageable for one icon and unpleasant for two hundred. It is also the part teams skip, and skipping it is a licence violation rather than a style preference.",
          "IconMind is MIT for the entire set, including every duotone cell, the sprite sheet and the generated components. One line in a licence file covers all of it, and it does not change when the set grows.",
        ],
      },
      {
        heading: "Attribution in practice",
        body: [
          "CC BY is not a difficult licence, but it does ask for something specific: credit the author, name the licence, and link both, wherever the work appears. For a blog post that is a caption. For an application it means a credits screen and a record of which icon came from which collection, kept up to date as icons change.",
          "The usual failure is not malice. Someone downloads twelve icons in an afternoon, the tabs close, and six months later nobody can say which of them needed credit. At that point the only honest fix is to find them all again.",
          "If you are going to mix sources, keep a short file in the repository next to the icons: file name, source URL, licence, author. It takes a minute per icon and it is the difference between an audit that takes an hour and one that takes a week.",
          "IconMind avoids the question rather than answering it. Every cell is MIT, no attribution is required, and that stays true as the set grows.",
        ],
      },
      {
        heading: "What a package buys you",
        body: [
          "Downloading SVGs means owning them. They land in a folder, someone writes a wrapper to give them a size and a colour, and from then on updating means downloading again and diffing by hand. Nothing is versioned, so there is no way to tell what changed between the icons you shipped in March and the ones you shipped in June.",
          "A package removes that work. Import the icon, pass a weight, pass a class, and the bundler drops everything you did not use. Upgrading is one number in a manifest, and the changelog says what moved.",
          "You can still have the files if you want them. Every IconMind cell exists as a plain SVG on disk and in the published sprite, so a design tool or a build script can read them directly without touching a framework.",
        ],
        code: "npm i @iconmind/react\n\nimport { VectorDatabase } from \"@iconmind/react\";\n<VectorDatabase weight=\"bold\" className=\"size-6\" />",
      },
      {
        heading: "Coverage in the domain that matters",
        body: [
          "Search SVG Repo for an agent and you get a person in a suit, an insurance mascot and a few robots. Search for retrieval, reranker, context window or tool call and the results stop being about software at all. The vocabulary of AI products is younger than most of the collections in the index.",
          "IconMind spends 664 of its 2,287 icons there, arranged as families rather than singles: agent, agent run, agent handoff, agent memory; model, model training, model eval, model registry; retrieval, chunking, embedding, reranker, vector database. Those are the screens the set exists for.",
          "Where SVG Repo wins outright is everything else. Anything decorative, illustrative, brand-related or physical is better served by an index of half a million drawings than by a set that deliberately refuses whole categories.",
        ],
      },
      {
        heading: "How to use both without it showing",
        body: [
          "Keep the interface consistent and let the illustrations be borrowed. Navigation, toolbars, tables, form controls and empty-state chrome should come from one set. A hero illustration, a marketing spot or a one-off graphic can come from anywhere, because nothing sits next to it at 20 px.",
          "If a borrowed icon has to sit in the interface, match it: 24 by 24 box, 2 px stroke, round caps and joins, and no fill. That is enough for most icons to pass unnoticed.",
          "And check the licence before it ships, not after. The field is on the SVG Repo page for every icon, and it is the one piece of this that cannot be fixed later.",
        ],
      },
      {
        heading: "Search that knows the vocabulary",
        body: [
          "A general index searches the words attached to a drawing by whoever uploaded it. That is why searching an aggregator for a technical term returns either nothing or something from an unrelated field.",
          "IconMind indexes four fields per icon: name, a description written for the search box, tags, and aliases for the words people actually type. Search llm and get model, search vector db and get vector-database, search handoff and get the agent family. Each of the 669 tag pages is also a page on the site, so the search works from Google as well as from the search box.",
          "For assistants there is an MCP server. Given a description it searches the real metadata and returns slugs that exist, which is the difference between an import that compiles and a plausible guess that does not.",
        ],
      },
      {
        heading: "Formats, and what you get without a build step",
        body: [
          "SVG Repo will hand you an SVG and, for many icons, a PNG. That covers the case where the icon is going into a document or a slide.",
          "IconMind renders in the browser from the same source: SVG, PNG at 16 through 512, WebP, JPEG, and a multi-resolution ICO for favicons, with the colour you picked applied before the render. Nothing is pre-baked except the PNG previews search engines index, so the file you download matches what is on screen.",
          "There are also whole-set downloads: every cell as a file, the sprite sheet, and per-variant zips, all under one MIT licence with no per-file bookkeeping.",
        ],
        table: {
          head: ["", "SVG Repo", "IconMind"],
          rows: [
            ["Per-icon formats", "SVG, PNG for many icons", "SVG, PNG 16–512, WebP, JPEG, ICO"],
            ["Colour before download", "no", "yes, applied to the rendered file"],
            ["Whole-set download", "no", "yes, per variant, MIT"],
            ["Sprite sheet", "no", "yes, symbols by slug"],
            ["Copy to clipboard", "SVG source", "SVG source, JSX, or a PNG bitmap"],
          ],
        },
      },
      {
        heading: "Consistency you can check",
        body: [
          "An aggregator cannot promise consistency because it does not own the drawings. A set can, and the honest way to make that promise is to let people verify it.",
          "Every IconMind icon is a declaration compiled by a validator that refuses geometry it cannot draw correctly: anchors off the half-unit grid, angles that are not 0, 45 or 90 degrees, strokes that would merge at the bold weight, icons that do not fill the same optical box as their neighbours. A nightly job rasterises all 13,722 cells and fails the build if any two render alike.",
          "The commands are in the repository and take a few minutes on a laptop. That is the practical difference between a set and a folder of downloads: you can run the check yourself rather than trusting a screenshot.",
        ],
        code: "pnpm icons:build       # draw every icon from its declaration\npnpm icons:validate    # grid, angles, gaps, optical size\npnpm icons:duplicates  # rasterise 13,722 cells, compare them all",
      },
      {
        heading: "When SVG Repo is the better choice",
        body: [
          "For a one-off, it wins and it is not close. A stethoscope, a tractor, a national flag, a brand mark, a piece of decorative art: half a million drawings will have something and 2,287 will not.",
          "For anything illustrative, it wins too. IconMind is a 24 px interface set and its rules stop it from ever producing an illustration.",
          "For a shipped interface, the calculation flips. Coherence, one licence, versioned packages and a set that grows in the same hand are worth more than coverage you will not use, and that is the whole argument for a set over an index.",
        ],
      },
      {
        heading: "How these numbers were measured",
        body: [
          "The SVG Repo figures are its own published counts as of 31 August 2026, and the licence description comes from the per-icon fields on the site, which name the source collection and its terms.",
          "The IconMind figures are the set itself: 2,287 icons, 13,722 cells across two variants and three weights, 664 icons in the AI, agent, MCP and RAG families, and one MIT licence covering all of it. Package sizes come from the npm registry on the same date, read from the published tarball: 5.6 MB unpacked across 6,867 files.",
          "The consistency claims are the ones worth checking rather than believing. The validator, the duplicate scan and the audit all run from the repository in a few minutes on a laptop, and they either pass or they name the icon that failed.",
        ],
      },
    ],
    rows: [
      ["Icons", OURS.count + ", one style", "≈500,000 across many sets and licences"],
      ["Consistency", "one grid, one stroke, one validator across all of it", "varies icon to icon — each result is from a different set"],
      ["AI and agent vocabulary", OURS.ai, "whatever any set uploaded; no family, no shared style"],
      ["Variants and weights", OURS.variants, "as uploaded; PNG export"],
      ["Frameworks", OURS.frameworks, "SVG and PNG download; no packages"],
      ["MCP server for assistants", OURS.mcp, "no"],
      ["Licence", OURS.license, "per icon — check each one"],
      ["Downloads", "SVG, PNG 16–512, WebP, ICO, JPEG, the whole set as a zip", "SVG, PNG"],
    ],
    verdict: [
      "SVG Repo is a search engine with half a million results and IconMind is a set with 2,287. On coverage there is no contest, and on coherence there is no contest in the other direction.",
      "The question worth asking is whether the icon is going into a product or into a document. A product wants one licence, one grid, versioned packages and a set that grows in the same hand. A document just wants the picture.",
    ],
    faq: [
      ["Is IconMind free for commercial use?", "Yes. The whole set is MIT, including every duotone cell, the sprite sheet and the generated framework packages. No attribution, no per-icon licence to check."],
      ["Why use a package instead of downloading SVGs?", "Because downloaded files are unversioned and unmaintained the moment they land in your repository. A package tree-shakes to what you import, upgrades with one number, and tells you in a changelog what moved."],
      ["Can I still get the raw files?", "Yes. Every cell exists as a plain SVG, there is a sprite of symbols keyed by slug, and the site offers per-variant zips. Nothing here requires a framework."],
      ["What about licences on SVG Repo?", "They vary per icon and per source collection: much of it is CC0 or MIT, some is CC BY and needs attribution wherever the icon appears. The field is on every icon page, and it is the part that cannot be fixed after you ship."],
      ["Which is better for an AI product?", "IconMind, and not by a small margin. Search an aggregator for reranker, context window or tool call and the results stop being about software; 664 icons here were drawn for exactly those screens."],
    ],
  },
];

export const compareOf = (slug: string) => COMPARISONS.find((c) => c.slug === slug);
