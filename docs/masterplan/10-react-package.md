# 10 — React Package

> `@iconmind/react` · React 19 · ESM · TypeScript 5.9 ([CANON C2](./CANON.md#c2-toolchain-pinned)).
> Komponen **di-generate** dari SVG saat build, tidak di-commit ([05 §5.1](./05-repository-architecture.md#51-keputusan-arsitektur)).

---

## 10.1 Tujuan Desain

| Tujuan | Ukuran keberhasilan |
|--------|---------------------|
| Tree shaking sempurna | Impor 3 icon → bundle hanya berisi 3 icon (< 1.5 KB) |
| Zero runtime dependency | Hanya `react` sebagai peer |
| SSR & RSC aman | Bekerja sebagai Server Component tanpa `"use client"` |
| Type safe | Autocomplete nama icon, props ter-tipe penuh |
| API dapat ditebak | Kalau tahu satu icon, tahu semuanya |

## 10.2 API

```tsx
import { AgentMemory, McpServer, VectorDatabase } from "@iconmind/react";

<AgentMemory />                                   // 24px, currentColor, stroke 2
<McpServer size={32} />
<VectorDatabase color="#6366f1" strokeWidth={1.5} />
<AgentMemory className="text-blue-500" />
<AgentMemory aria-label="Agent memory" />         // jadi role="img"
<AgentMemory onClick={handleClick} data-testid="x" />
```

```ts
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  /** Lebar & tinggi dalam px atau satuan CSS. Default 24. */
  size?: number | string;
  /** Warna stroke. Default "currentColor". */
  color?: string;
  /** Ketebalan stroke. Default 2. */
  strokeWidth?: number | string;
  /** Pertahankan ketebalan visual saat ukuran berubah. Default false. */
  absoluteStrokeWidth?: boolean;
}
```

**`absoluteStrokeWidth`** menjawab masalah nyata: pada `size={48}`, stroke 2 ikut berskala menjadi terlihat 4px. Dengan flag ini, stroke dihitung `2 × 24 / size` sehingga ketebalan tampak tetap. Perilakunya sengaja dibuat sama dengan Lucide — pengguna yang bermigrasi tidak perlu belajar konsep baru.

## 10.3 Bentuk Komponen yang Di-generate

```tsx
// packages/react/src/generated/agent-memory.tsx  (dihasilkan, git-ignored)
import { createIcon } from "../create-icon";

export const AgentMemory = createIcon("AgentMemory", [
  ["path", { d: "M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" }],
  ["circle", { cx: "12", cy: "12", r: "3" }],
]);

export const AgentState = AgentMemory;   // alias (deprecated, dari metadata)
```

Bentuk array-tuple dipilih ketimbang JSX literal karena menghasilkan output bundler yang lebih kecil dan seragam, dan karena satu implementasi `createIcon` menangani semua props — 1000 komponen tidak berarti 1000 salinan logika props.

```tsx
// packages/react/src/create-icon.tsx
import { createElement, forwardRef, type SVGProps } from "react";

type IconNode = [tag: string, attrs: Record<string, string>][];

export const createIcon = (name: string, nodes: IconNode) => {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = "currentColor", strokeWidth = 2,
       absoluteStrokeWidth = false, children, ...rest }, ref) => {

      const labelled = rest["aria-label"] != null || rest["aria-labelledby"] != null;

      return createElement("svg", {
        ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: size, height: size, viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: absoluteStrokeWidth
          ? (Number(strokeWidth) * 24) / Number(size)
          : strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        focusable: "false",
        ...(labelled ? { role: "img" } : { "aria-hidden": "true" }),
        ...rest,
      }, ...nodes.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs })),
         ...(Array.isArray(children) ? children : children ? [children] : []));
    },
  );
  Icon.displayName = name;
  return Icon;
};
```

Perhatikan `...rest` diletakkan **setelah** atribut default: konsumen boleh menimpa apa pun, termasuk `viewBox`. Perilaku aksesibilitas mengikuti [03 §3.8](./03-design-system.md#38-aturan-aksesibilitas).

## 10.4 Konfigurasi Package

```jsonc
// packages/react/package.json
{
  "name": "@iconmind/react",
  "version": "0.0.0",
  "type": "module",
  "sideEffects": false,
  "license": "MIT",
  "repository": { "type": "git", "url": "git+https://github.com/iconmind/iconmind.git",
                  "directory": "packages/react" },
  "exports": {
    ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
    "./icons/*": { "types": "./dist/icons/*.d.ts", "default": "./dist/icons/*.js" },
    "./package.json": "./package.json"
  },
  "files": ["dist"],
  "peerDependencies": { "react": ">=18" },
  "publishConfig": { "access": "public", "provenance": true }
}
```

Tiga hal yang menentukan tree shaking berhasil atau tidak:

1. **`"sideEffects": false`** — tanpa ini, bundler harus menganggap setiap modul mungkin punya efek samping dan tidak berani membuang apa pun.
2. **ESM saja** (`"type": "module"`, tanpa CJS). Menyediakan CJS berarti menyediakan jalur yang tidak bisa di-tree-shake dengan baik, dan sebagian bundler akan memilihnya. React 19 + Node 24 sudah nyaman dengan ESM murni.
3. **Barrel file berupa `export * from` murni**, tanpa side effect, tanpa `export default`.

`provenance: true` memberi atestasi rantai pasok di npm — gratis, dan penting untuk package yang mengharapkan kepercayaan. Provenance hanya terbit kalau tiga syarat terpenuhi sekaligus: field `repository` cocok dengan repo GitHub tempat publikasi berjalan, repo-nya publik, dan workflow punya `id-token: write` ([14 §14.4](./14-ci-cd.md#144-releaseyml--publikasi-npm)). Kalau salah satu hilang, npm menerbitkan package tanpa atestasi **tanpa memberi error** — jadi periksa lencana provenance di halaman npm setelah rilis pertama.

## 10.5 Build

```ts
// packages/react/tsup.config.ts
import { defineConfig } from "tsup";
import { readdirSync } from "node:fs";

const icons = readdirSync("src/generated").filter(f => f.endsWith(".tsx"));

export default defineConfig({
  entry: ["src/index.ts", ...icons.map(f => `src/generated/${f}`)],
  format: ["esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  external: ["react"],
  outDir: "dist",
});
```

Setiap icon adalah entry point tersendiri sehingga `@iconmind/react/icons/agent-memory` bisa diimpor langsung — berguna untuk bundler lama dan untuk `React.lazy`.

## 10.6 Anggaran Ukuran

| Skenario | Target |
|----------|--------|
| 1 icon | < 600 B gzip |
| 10 icon | < 2 KB gzip |
| 50 icon | < 8 KB gzip |
| Seluruh package (1000 icon, ekstrem) | < 180 KB gzip |
| Runtime `createIcon` | < 400 B gzip |

Diverifikasi otomatis di `nightly.yml` dengan `size-limit` ([14](./14-ci-cd.md)). Kalau impor 3 icon pernah menarik lebih dari 2 KB, ada yang rusak pada konfigurasi tree shaking, dan itu harus diperlakukan sebagai bug prioritas tinggi.

## 10.7 SSR dan React Server Components

Komponen icon **tidak** memakai `"use client"`. Tidak ada hooks, tidak ada state, tidak ada API browser — sepenuhnya bisa dirender di server.

```tsx
// app/page.tsx — Server Component, tanpa JS terkirim ke klien
import { McpServer } from "@iconmind/react";
export default function Page() { return <McpServer size={32} />; }
```

Konsekuensinya: memakai IconMind di Next.js App Router menambahkan **nol byte JavaScript klien** selama icon dirender di server. Ini keunggulan yang layak disebut eksplisit di dokumentasi.

Hidrasi aman karena keluaran bersifat deterministik — tidak ada `Math.random()`, tidak ada `useId()`, tidak ada `Date`.

## 10.8 Dynamic Import

Untuk kasus di mana nama icon baru diketahui saat runtime (misalnya dari data):

```tsx
import { lazy, Suspense } from "react";

const load = (slug: string) =>
  lazy(async () => {
    const mod = await import(`@iconmind/react/icons/${slug}`);
    return { default: Object.values(mod)[0] as React.ComponentType };
  });
```

Didokumentasikan **beserta peringatannya**: dynamic import dengan template literal memaksa bundler memasukkan semua kemungkinan icon ke dalam bundle. Untuk himpunan terbatas, peta eksplisit jauh lebih baik:

```tsx
const ICONS = { "agent-memory": AgentMemory, "mcp-server": McpServer } as const;
```

Menyebutkan jebakan ini di dokumentasi mencegah laporan "bundle saya 200 KB" yang sebenarnya bukan bug.

## 10.9 Type Safety

```ts
export type IconName = "agent-memory" | "mcp-server" | /* … */;
export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

// Peta lengkap — opt-in, karena mengimpor ini mematikan tree shaking
// dan itu dinyatakan jelas di dokumentasi.
import { icons } from "@iconmind/react/all";
```

`icons` sengaja diletakkan di entry point terpisah `/all`. Kalau ia ada di barrel utama, satu impor tak sengaja akan menarik seluruh library, dan pengguna akan menyalahkan tree shaking kami.

## 10.10 Pengujian

| Uji | Alat | Cakupan |
|-----|------|---------|
| Render | Vitest + Testing Library | Semua props menghasilkan atribut yang benar |
| A11y | `jest-axe` | Default `aria-hidden`, berlabel jadi `role="img"` |
| SSR | `renderToString` | Tidak ada error, keluaran deterministik |
| Tree shaking | `size-limit` | Anggaran [§10.6](#106-anggaran-ukuran) |
| Tipe | `tsc --noEmit` + `expect-type` | Props menolak nilai salah |
| Snapshot | Vitest | Perubahan tak sengaja pada icon lama terdeteksi |

Uji dijalankan pada sampel icon, bukan seluruh 1000 — kecuali uji snapshot dan size-limit yang memang harus menyeluruh.

## 10.11 Kompatibilitas

| Lingkungan | Status |
|------------|--------|
| React 18 / 19 | ✅ (peer `>=18`) |
| Next.js App & Pages Router | ✅ |
| Vite, Remix, Astro (`@astrojs/react`) | ✅ |
| Bundler CJS-only lawas | ❌ — didokumentasikan, sarankan sprite SVG ([06 §6.7](./06-svg-engine.md#67-generator-lain)) |
| React Native | ❌ Tahun 1 — butuh `react-native-svg`, dicatat sebagai kandidat Tahun 2 ([01 §1.9](./01-product-vision.md#19-long-term-vision-tahun-23)) |

Menyatakan yang **tidak** didukung sama pentingnya dengan menyatakan yang didukung; itu mencegah issue yang tidak bisa diselesaikan.
