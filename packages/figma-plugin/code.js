// The main thread: it only knows how to put an SVG on the canvas where the person is looking.
// Everything else — the set, the search, the variant and weight — lives in the UI frame.
figma.showUI(__html__, { width: 420, height: 560, themeColors: true });

figma.ui.onmessage = (msg) => {
  if (msg.type === "insert") {
    const node = figma.createNodeFromSvg(msg.svg);
    node.name = msg.name;
    // A 24-unit drawing at the size asked for, centred in the viewport.
    const size = msg.size || 24;
    node.resize(size, size);
    const c = figma.viewport.center;
    node.x = Math.round(c.x - size / 2);
    node.y = Math.round(c.y - size / 2);
    figma.currentPage.appendChild(node);
    figma.currentPage.selection = [node];
    figma.notify(`Inserted ${msg.name}`);
  }
  if (msg.type === "close") figma.closePlugin();
};
