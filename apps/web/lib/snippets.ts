/**
 * One list of install targets, one snippet builder per target — shared by the icon
 * studio (detail page) and the icon drawer (grid popup), so the two can never disagree
 * about what installing an icon looks like.
 */

export interface Look {
  variant: string;
  weightName: string;
  size: number;
  /** null when the colour is `currentColor` — never emitted. */
  hex: string | null;
}

/** Only what differs from the default: the shortest snippet that reproduces the canvas. */
const jsxProps = (l: Look) =>
  [
    l.variant !== "outline" && `variant="${l.variant}"`,
    l.weightName !== "regular" && `weight="${l.weightName}"`,
    l.size !== 24 && `size={${l.size}}`,
    l.hex && `color="${l.hex}"`,
  ].filter((p): p is string => Boolean(p));

const templateProps = (l: Look) =>
  [
    l.variant !== "outline" && `variant="${l.variant}"`,
    l.weightName !== "regular" && `weight="${l.weightName}"`,
    l.size !== 24 && `size={${l.size}}`,
    l.hex && `color="${l.hex}"`,
  ].filter((p): p is string => Boolean(p));

const vueProps = (l: Look) =>
  [
    l.variant !== "outline" && `variant="${l.variant}"`,
    l.weightName !== "regular" && `weight="${l.weightName}"`,
    l.size !== 24 && `:size="${l.size}"`,
    l.hex && `color="${l.hex}"`,
  ].filter((p): p is string => Boolean(p));

const tag = (name: string, props: string[], indent = "  ") =>
  props.length ? `<${name}\n${props.map((p) => indent + p).join("\n")}\n/>` : `<${name} />`;

export interface Framework {
  id: string;
  label: string;
  install: string;
  code: (name: string, slug: string, l: Look) => string;
}

export const FRAMEWORKS: Framework[] = [
  {
    id: "react", label: "React", install: "npm i @iconmind/react",
    code: (n, _s, l) => `import { ${n} } from "@iconmind/react";\n\n${tag(n, jsxProps(l))}`,
  },
  {
    id: "vue", label: "Vue", install: "npm i @iconmind/vue",
    code: (n, _s, l) =>
      `<script setup>\nimport { ${n} } from "@iconmind/vue";\n</script>\n\n<template>\n  ${tag(n, vueProps(l), "    ")}\n</template>`,
  },
  {
    id: "svelte", label: "Svelte", install: "npm i @iconmind/svelte",
    code: (n, _s, l) =>
      `<script>\n  import { ${n} } from "@iconmind/svelte";\n</script>\n\n${tag(n, templateProps(l))}`,
  },
  {
    id: "solid", label: "Solid", install: "npm i @iconmind/solid",
    code: (n, _s, l) => `import { ${n} } from "@iconmind/solid";\n\n${tag(n, jsxProps(l))}`,
  },
  {
    id: "preact", label: "Preact", install: "npm i @iconmind/preact",
    code: (n, _s, l) => `import { ${n} } from "@iconmind/preact";\n\n${tag(n, jsxProps(l))}`,
  },
  {
    id: "react-native", label: "React Native", install: "npm i @iconmind/react-native react-native-svg",
    code: (n, _s, l) => `import { ${n} } from "@iconmind/react-native";\n\n${tag(n, jsxProps(l))}`,
  },
  {
    id: "astro", label: "Astro", install: "npm i @iconmind/astro",
    code: (n, _s, l) =>
      `---\nimport { ${n} } from "@iconmind/astro";\n---\n\n${tag(n, templateProps(l))}`,
  },
  {
    id: "flutter", label: "Flutter", install: "flutter pub add iconmind_flutter",
    code: (_n, s, l) => {
      const props = [
        l.variant !== "outline" && `variant: IconMindVariant.${l.variant}`,
        l.weightName !== "regular" && `weight: IconMindWeight.${l.weightName}`,
        l.size !== 24 && `size: ${l.size}`,
        l.hex && `color: const Color(0xFF${l.hex.slice(1).toUpperCase()})`,
      ].filter((p): p is string => Boolean(p));
      // Derived from the slug exactly the way the Dart generator does it — including
      // the trailing underscore for the four names that collide with Dart keywords.
      const parts = s.split("-");
      let dart = parts[0] + parts.slice(1).map((w) => w[0]!.toUpperCase() + w.slice(1)).join("");
      if (["class", "extension", "null", "sync"].includes(dart)) dart += "_";
      const name = `IconMindIcons.${dart}`;
      return props.length
        ? `IconMind(${name},\n${props.map((p) => `    ${p}`).join(",\n")})`
        : `IconMind(${name})`;
    },
  },
  {
    id: "laravel", label: "Laravel", install: "composer require iconmind/blade-iconmind",
    code: (_n, s, l) => {
      const cell =
        l.variant === "outline" && l.weightName === "regular" ? s :
        l.variant === "duotone" && l.weightName === "regular" ? `${s}-duotone` :
        `${s}-${l.variant}-${l.weightName}`;
      const cls = l.size === 24 ? "w-6 h-6" : `w-[${l.size}px] h-[${l.size}px]`;
      return `<x-im-${cell} class="${cls}"${l.hex ? ` style="color: ${l.hex}"` : ""} />`;
    },
  },
];

export const frameworkOf = (id: string) => FRAMEWORKS.find((f) => f.id === id) ?? FRAMEWORKS[0]!;

const KEY = "im-framework";
export const rememberedFramework = () => {
  try { return localStorage.getItem(KEY) ?? "react"; } catch { return "react"; }
};
export const rememberFramework = (id: string) => {
  try { localStorage.setItem(KEY, id); } catch { /* private mode */ }
};
