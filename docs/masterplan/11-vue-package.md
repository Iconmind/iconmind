# 11 — Vue Package

> `@iconmind/vue` · Vue 3.5 · ESM · TypeScript 5.9 ([CANON C2](./CANON.md#c2-toolchain-pinned)).
> Paritas API penuh dengan [10 — React Package](./10-react-package.md): nama komponen, nama props, dan default-nya identik.

---

## 11.1 Prinsip Paritas

Satu aturan yang mengatur seluruh dokumen ini: **apa pun yang berbeda dari React harus punya alasan teknis Vue, bukan alasan selera.**

Yang identik: nama komponen (`AgentMemory`), nama props (`size`, `color`, `strokeWidth`, `absoluteStrokeWidth`), nilai default, perilaku aksesibilitas, dan struktur entry point.
Yang berbeda (dan kenapa): pakai `h()` bukan `createElement`, `defineComponent` bukan `forwardRef`, dan `attrs` diteruskan lewat `inheritAttrs` — semuanya konsekuensi runtime Vue, bukan pilihan gaya.

## 11.2 API

```vue
<script setup lang="ts">
import { AgentMemory, McpServer, VectorDatabase } from "@iconmind/vue";
</script>

<template>
  <AgentMemory />
  <McpServer :size="32" />
  <VectorDatabase color="#6366f1" :stroke-width="1.5" />
  <AgentMemory class="text-blue-500" />
  <AgentMemory aria-label="Agent memory" />
  <AgentMemory @click="handleClick" />
</template>
```

```ts
export interface IconProps {
  size?: number | string;            // default 24
  color?: string;                    // default "currentColor"
  strokeWidth?: number | string;     // default 2
  absoluteStrokeWidth?: boolean;     // default false
}
```

Vue menerima `stroke-width` (kebab) di template dan `strokeWidth` (camel) di JSX/render function. Keduanya bekerja tanpa konfigurasi tambahan.

## 11.3 Bentuk Komponen yang Di-generate

```ts
// packages/vue/src/generated/agent-memory.ts  (dihasilkan, git-ignored)
import { createIcon } from "../create-icon";

export const AgentMemory = createIcon("AgentMemory", [
  ["path", { d: "M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" }],
  ["circle", { cx: "12", cy: "12", r: "3" }],
]);

export const AgentState = AgentMemory;   // alias (deprecated, dari metadata)
```

**Array-tuple yang sama persis dengan React.** Ini bukan kebetulan: `scripts/generate/components.ts` menghasilkan kedua target dari satu representasi perantara, sehingga tidak mungkin React dan Vue melenceng.

```ts
// packages/vue/src/create-icon.ts
import { defineComponent, h, type PropType } from "vue";

type IconNode = [tag: string, attrs: Record<string, string>][];

export const createIcon = (name: string, nodes: IconNode) =>
  defineComponent({
    name,
    inheritAttrs: false,
    props: {
      size:                { type: [Number, String] as PropType<number | string>, default: 24 },
      color:               { type: String, default: "currentColor" },
      strokeWidth:         { type: [Number, String] as PropType<number | string>, default: 2 },
      absoluteStrokeWidth: { type: Boolean, default: false },
    },
    setup(props, { attrs, slots }) {
      return () => {
        const labelled = attrs["aria-label"] != null || attrs["aria-labelledby"] != null;
        return h("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: props.size, height: props.size, viewBox: "0 0 24 24",
          fill: "none",
          stroke: props.color,
          "stroke-width": props.absoluteStrokeWidth
            ? (Number(props.strokeWidth) * 24) / Number(props.size)
            : props.strokeWidth,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          focusable: "false",
          ...(labelled ? { role: "img" } : { "aria-hidden": "true" }),
          ...attrs,
        }, [
          ...nodes.map(([tag, a]) => h(tag, a)),
          ...(slots.default ? [slots.default()] : []),
        ]);
      };
    },
  });
```

`inheritAttrs: false` adalah bagian yang mudah salah: tanpa itu, Vue akan menempelkan atribut ke elemen akar **selain** yang kita sebar manual, menghasilkan duplikasi. Dengan `false`, kita mengendalikan urutan penuh — dan menaruh `...attrs` terakhir supaya konsumen bisa menimpa default, sama seperti React.

## 11.4 Konfigurasi Package

```jsonc
// packages/vue/package.json
{
  "name": "@iconmind/vue",
  "version": "0.0.0",
  "type": "module",
  "sideEffects": false,
  "license": "MIT",
  "repository": { "type": "git", "url": "git+https://github.com/iconmind/iconmind.git",
                  "directory": "packages/vue" },
  "exports": {
    ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
    "./icons/*": { "types": "./dist/icons/*.d.ts", "default": "./dist/icons/*.js" },
    "./nuxt": { "types": "./dist/nuxt.d.ts", "default": "./dist/nuxt.js" },
    "./package.json": "./package.json"
  },
  "files": ["dist"],
  "peerDependencies": { "vue": "^3.4.0" },
  "publishConfig": { "access": "public", "provenance": true }
}
```

Konfigurasi tsup identik dengan React kecuali `external: ["vue"]`.

## 11.5 SSR dan Nuxt

Komponen murni fungsi render tanpa state, tanpa lifecycle, tanpa API browser — aman untuk SSR Nuxt 3/4 dan `@vue/server-renderer`. Keluaran deterministik, jadi tidak ada hydration mismatch.

**Modul Nuxt** untuk auto-import:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@iconmind/vue/nuxt"],
});
```

```vue
<template>
  <!-- tanpa import, tree shaking tetap jalan -->
  <AgentMemory :size="32" />
</template>
```

Modul mendaftarkan komponen sebagai lazy global lewat `addComponent` dengan `mode: "all"`, sehingga Nuxt tetap hanya menyertakan yang benar-benar dipakai. Prefiks bisa dikonfigurasi:

```ts
modules: [["@iconmind/vue/nuxt", { prefix: "Im" }]]   // <ImAgentMemory />
```

Prefiks penting bagi proyek yang sudah punya komponen bernama `Search` atau `Settings` — tabrakan nama dengan icon `interface` sangat mungkin terjadi.

## 11.6 Anggaran Ukuran

| Skenario | Target |
|----------|--------|
| 1 icon | < 700 B gzip |
| 10 icon | < 2.5 KB gzip |
| 50 icon | < 9 KB gzip |
| Runtime `createIcon` | < 500 B gzip |

Sedikit lebih besar dari React karena `defineComponent` membawa definisi props runtime. Selisihnya kecil dan tidak sebanding dengan biaya menghilangkannya (props runtime dibutuhkan untuk casting tipe otomatis di template).

## 11.7 Kompatibilitas

| Lingkungan | Status |
|------------|--------|
| Vue 3.4+ | ✅ |
| Nuxt 3 / 4 | ✅ + modul auto-import |
| Vite, Vue CLI 5 | ✅ |
| `<script setup>` | ✅ |
| Options API | ✅ (daftarkan di `components`) |
| Vue 2 | ❌ — sudah EOL, tidak akan didukung |
| Astro (`@astrojs/vue`) | ✅ |

## 11.8 Pengujian

| Uji | Alat | Cakupan |
|-----|------|---------|
| Render | Vitest + `@vue/test-utils` | Props → atribut |
| A11y | `axe-core` | Default `aria-hidden`, berlabel jadi `role="img"` |
| SSR | `@vue/server-renderer` | Keluaran deterministik |
| Nuxt module | `@nuxt/test-utils` | Auto-import & prefiks bekerja |
| Ukuran | `size-limit` | Anggaran [§11.6](#116-anggaran-ukuran) |
| **Paritas React↔Vue** | Vitest kustom | **Keluaran SVG byte-identik** |

Uji terakhir adalah yang paling bernilai. Ia merender icon yang sama di React dan Vue, menormalkan atribut, dan membandingkan. Kalau salah satu implementasi berubah tanpa yang lain, uji ini gagal — inilah jaring pengaman yang membuat janji paritas di [§11.1](#111-prinsip-paritas) bisa dipegang selama bertahun-tahun.
