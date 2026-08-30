// IconMind in the editor: complete the names, preview the drawing.
//
// Two providers, both driven by the bundled icons.json (regenerated per release):
//  - completions inside `import { … } from "@iconmind/<pkg>"` and after `IconMindIcons.`
//    (Flutter) — every icon, with its description and a preview in the detail;
//  - hovers on an IconMind component name or `IconMindIcons.<name>` — the icon drawn
//    as an inline SVG, the slug, and a link to its page.
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

let DATA = null;
function load(ctx) {
  if (!DATA) DATA = JSON.parse(fs.readFileSync(path.join(ctx.extensionPath, "icons.json"), "utf8"));
  return DATA;
}
const svgOf = (icon, color = "#888") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon.body}</svg>`;
const dataUri = (icon) => "data:image/svg+xml;base64," + Buffer.from(svgOf(icon)).toString("base64");
const preview = (icon) => {
  const md = new vscode.MarkdownString(`![${icon.name}](${dataUri(icon)})\n\n**${icon.name}** · \`${icon.slug}\`\n\n${icon.d}\n\n[iconmind.dev/icons/${icon.slug}](https://iconmind.dev/icons/${icon.slug}/)`);
  md.supportHtml = false; md.isTrusted = true; return md;
};

const JS_LANGS = ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue", "svelte", "astro"];

function activate(ctx) {
  const data = load(ctx);
  const byName = new Map(data.icons.map((i) => [i.name, i]));
  const byDart = new Map(data.icons.map((i) => [i.dart, i]));

  // Completions: `import { Ag| } from "@iconmind/react"` — the line has to mention the package.
  ctx.subscriptions.push(vscode.languages.registerCompletionItemProvider(JS_LANGS, {
    provideCompletionItems(doc, pos) {
      const line = doc.lineAt(pos.line).text;
      if (!/@iconmind\//.test(line) && !/@iconmind\//.test(doc.getText(new vscode.Range(Math.max(0, pos.line - 3), 0, pos.line + 1, 0)))) return;
      return data.icons.map((i) => {
        const it = new vscode.CompletionItem(i.name, vscode.CompletionItemKind.Class);
        it.detail = i.slug; it.documentation = preview(i); it.filterText = `${i.name} ${i.slug} ${i.tags}`;
        return it;
      });
    },
  }));
  // Flutter: `IconMindIcons.` lists every icon in Dart naming.
  ctx.subscriptions.push(vscode.languages.registerCompletionItemProvider("dart", {
    provideCompletionItems(doc, pos) {
      const before = doc.lineAt(pos.line).text.slice(0, pos.character);
      if (!/IconMindIcons\.\w*$/.test(before)) return;
      return data.icons.map((i) => {
        const it = new vscode.CompletionItem(i.dart, vscode.CompletionItemKind.Constant);
        it.detail = i.slug; it.documentation = preview(i); it.filterText = `${i.dart} ${i.slug} ${i.tags}`;
        return it;
      });
    },
  }, "."));
  // Hovers: the drawing, wherever the name appears.
  ctx.subscriptions.push(vscode.languages.registerHoverProvider([...JS_LANGS, "dart"], {
    provideHover(doc, pos) {
      const range = doc.getWordRangeAtPosition(pos, /[A-Za-z][A-Za-z0-9]*/);
      if (!range) return;
      const word = doc.getText(range);
      const icon = doc.languageId === "dart" ? byDart.get(word) : byName.get(word);
      if (!icon) return;
      if (doc.languageId !== "dart" && !/@iconmind\//.test(doc.getText())) return;
      return new vscode.Hover(preview(icon), range);
    },
  }));
}
module.exports = { activate, deactivate() {} };
