/**
 * IconMind for Figma — two jobs, one plugin.
 *
 * *Insert* puts a single icon on the canvas at the variant, weight and size chosen.
 * *Build library* turns an empty file into the library itself: every icon as a component
 * set whose variants are the six cells the set actually ships, one page per category,
 * each set carrying its description and a link to its page. That is how the community
 * file is made — by the compiler's own output, not by hand.
 *
 * The network lives in the UI (a Figma plugin's main thread cannot fetch), so the UI
 * loads the data and posts it here in batches; this file only makes nodes. Each batch is
 * acknowledged before the next is sent, which keeps a 13,626-component build from
 * queueing the whole set into memory at once.
 */
figma.showUI(__html__, { width: 460, height: 600, themeColors: true });
figma.skipInvisibleInstanceChildren = true;

const CAP = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const COLS = 20;
const STEP = 56;

/** Pages are made once per build and reused across batches. */
let pages = new Map();
let placed = new Map();
let built = 0;

async function pageFor(categorySlug, categoryName) {
  if (pages.has(categorySlug)) return pages.get(categorySlug);
  const page = figma.createPage();
  page.name = categoryName;
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    const title = figma.createText();
    title.fontName = { family: "Inter", style: "Semi Bold" };
    title.characters = `${categoryName} — IconMind`;
    title.fontSize = 24;
    title.x = 0;
    title.y = -64;
    page.appendChild(title);
  } catch (e) {
    // A file without Inter is not a reason to stop building a library.
  }
  pages.set(categorySlug, page);
  placed.set(categorySlug, 0);
  return page;
}

function svgOf(body, size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body.replace(/currentColor/g, "#000000")}</svg>`;
}

/** One icon → one component (single cell) or one component set (several cells). */
async function buildIcon(item, cells) {
  const page = await pageFor(item.c, item.cn);
  const n = placed.get(item.c);
  const x = (n % COLS) * STEP;
  const y = Math.floor(n / COLS) * STEP;
  placed.set(item.c, n + 1);

  const made = [];
  for (const cell of cells) {
    const body = item.cells[cell.id];
    if (!body) continue;
    const frame = figma.createNodeFromSvg(svgOf(body, 24));
    frame.name = cells.length > 1 ? `Variant=${CAP(cell.variant)}, Weight=${CAP(cell.weight)}` : `${item.c}/${item.s}`;
    const comp = figma.createComponentFromNode(frame);
    made.push(comp);
  }
  if (!made.length) return;

  let node;
  if (made.length === 1) {
    node = made[0];
    page.appendChild(node);
  } else {
    node = figma.combineAsVariants(made, page);
    node.name = `${item.c}/${item.s}`;
    node.layoutMode = "HORIZONTAL";
    node.itemSpacing = 8;
    node.paddingLeft = node.paddingRight = node.paddingTop = node.paddingBottom = 8;
    node.primaryAxisSizingMode = "AUTO";
    node.counterAxisSizingMode = "AUTO";
  }
  node.x = x;
  node.y = y;
  node.description = `${item.n} — ${item.d}`;
  try { node.documentationLinks = [{ uri: `https://iconmind.dev/icons/${item.s}/` }]; } catch (e) { /* older API */ }
  built++;
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "insert") {
    const node = figma.createNodeFromSvg(msg.svg);
    node.name = msg.name;
    node.resize(msg.size, msg.size);
    const c = figma.viewport.center;
    node.x = Math.round(c.x - msg.size / 2);
    node.y = Math.round(c.y - msg.size / 2);
    figma.currentPage.appendChild(node);
    figma.currentPage.selection = [node];
    figma.notify(`Inserted ${msg.name}`);
    return;
  }

  if (msg.type === "build-start") {
    pages = new Map();
    placed = new Map();
    built = 0;
    figma.notify("Building the library — this file will fill with pages as it goes.");
    figma.ui.postMessage({ type: "ready-for-chunk" });
    return;
  }

  if (msg.type === "build-chunk") {
    for (const item of msg.items) await buildIcon(item, msg.cells);
    figma.ui.postMessage({ type: "ready-for-chunk", built });
    return;
  }

  if (msg.type === "build-end") {
    const first = pages.values().next().value;
    if (first) await figma.setCurrentPageAsync(first);
    figma.notify(`Library built — ${built} icons across ${pages.size} pages.`, { timeout: 6000 });
    figma.ui.postMessage({ type: "build-done", built, pages: pages.size });
    return;
  }

  if (msg.type === "close") figma.closePlugin();
};
