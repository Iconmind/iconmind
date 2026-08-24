# 05 — Repository Architecture

> Versi toolchain & daftar package: [CANON C2](./CANON.md#c2-toolchain-pinned) dan [C3](./CANON.md#c3-package-yang-di-publish).

---

## 5.1 Keputusan Arsitektur

| Keputusan | Pilihan | Alasan |
|-----------|---------|--------|
| Monorepo vs polyrepo | **Monorepo** | Satu perubahan icon harus merambat ke icons + react + vue + docs dalam satu commit atomik. Polyrepo membuat ini butuh 4 PR dan sinkronisasi versi manual. |
| Package manager | **pnpm 10** | Workspace protocol (`workspace:*`), instalasi cepat, penggunaan disk hemat. |
| Task runner | **Turborepo 2** | Cache berbasis konten. `turbo build` kedua kalinya nyaris instan. Konfigurasinya satu file. |
| Codegen komponen | **Build-time** | Komponen React/Vue **tidak** di-commit. Di-generate dari SVG saat build. Satu sumber kebenaran, tidak ada drift. |
| Bundler package | **tsup** | esbuild di bawahnya, konfigurasi minimal, keluaran ESM + tipe. |
| Publikasi | **Changesets** | Versi & changelog otomatis dari PR, jalan mulus dengan monorepo. |

**Keputusan paling penting: komponen di-generate, bukan ditulis.** 621 concept × 2 framework = 1242 file komponen. Menulis atau bahkan meng-commit-nya adalah kesalahan. Yang di-commit hanya SVG + JSON.

## 5.2 Struktur Lengkap

```
iconmind/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── icon-request.yml         # form request icon (Tier 1)
│   │   ├── bug-report.yml
│   │   └── config.yml
│   ├── workflows/
│   │   ├── ci.yml                   # lint, typecheck, test, build
│   │   ├── icon-check.yml           # validasi SVG + preview PR
│   │   ├── release.yml              # changesets → npm
│   │   ├── deploy-docs.yml          # build & deploy website
│   │   └── nightly.yml              # audit duplikat, link, bundle size
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODEOWNERS
│   └── FUNDING.yml
│
├── apps/
│   └── docs/                        # Next.js 16, static export
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx                       # Home
│       │   ├── icons/
│       │   │   ├── page.tsx                   # Browse
│       │   │   └── [slug]/page.tsx            # Icon Detail
│       │   ├── categories/
│       │   │   ├── page.tsx
│       │   │   └── [category]/page.tsx
│       │   ├── search/page.tsx
│       │   ├── docs/[[...slug]]/page.tsx      # Fumadocs
│       │   ├── changelog/page.tsx
│       │   ├── roadmap/page.tsx
│       │   ├── showcase/page.tsx
│       │   ├── sitemap.ts
│       │   ├── robots.ts
│       │   └── opengraph-image.tsx
│       ├── components/
│       │   ├── icon-grid.tsx
│       │   ├── icon-card.tsx
│       │   ├── icon-detail.tsx
│       │   ├── search-command.tsx             # ⌘K
│       │   ├── search-provider.tsx
│       │   ├── category-nav.tsx
│       │   ├── copy-button.tsx
│       │   ├── code-block.tsx
│       │   ├── customizer.tsx                 # size / stroke / warna
│       │   └── ui/                            # shadcn/ui
│       ├── content/
│       │   └── docs/                          # 10 file MDX
│       ├── lib/
│       │   ├── icons.ts                       # load metadata build-time
│       │   ├── search-index.ts
│       │   └── seo.ts
│       ├── public/
│       ├── content-collections.ts
│       ├── source.config.ts                   # Fumadocs
│       ├── next.config.mjs
│       ├── tailwind.config.ts
│       └── package.json
│
├── packages/
│   ├── icons/                       # @iconmind/icons — SUMBER KEBENARAN
│   │   ├── icons/
│   │   │   ├── ai/
│   │   │   │   ├── model.svg
│   │   │   │   ├── model.json
│   │   │   │   ├── llm.svg
│   │   │   │   └── llm.json
│   │   │   ├── agents/
│   │   │   ├── mcp/
│   │   │   ├── rag/
│   │   │   ├── data/
│   │   │   ├── devops/
│   │   │   ├── cloud/
│   │   │   ├── security/
│   │   │   ├── automation/
│   │   │   ├── analytics/
│   │   │   ├── devtools/
│   │   │   └── interface/
│   │   ├── __anchors__/             # 20 icon acuan gaya (04 §4.12)
│   │   ├── dist/                    # hasil build (git-ignored)
│   │   │   ├── metadata.json
│   │   │   ├── sprite.svg
│   │   │   └── index.js
│   │   └── package.json
│   │
│   ├── react/                       # @iconmind/react
│   │   ├── src/
│   │   │   ├── create-icon.tsx      # factory bersama
│   │   │   ├── types.ts
│   │   │   └── generated/           # git-ignored, hasil codegen
│   │   ├── tsup.config.ts
│   │   └── package.json
│   │
│   ├── vue/                         # @iconmind/vue
│   │   ├── src/
│   │   │   ├── create-icon.ts
│   │   │   ├── types.ts
│   │   │   └── generated/           # git-ignored
│   │   ├── tsup.config.ts
│   │   └── package.json
│   │
│   ├── mcp/                         # @iconmind/mcp
│   │   ├── src/
│   │   │   ├── index.ts             # entry stdio
│   │   │   ├── resources.ts
│   │   │   ├── tools.ts
│   │   │   ├── prompts.ts
│   │   │   └── data.ts              # loader metadata
│   │   └── package.json
│   │
│   ├── figma/                       # internal, tidak dipublikasi
│   │   ├── src/
│   │   │   ├── build-figma-file.ts
│   │   │   └── plugin/              # plugin Figma opsional
│   │   └── package.json
│   │
│   └── shared/                      # internal
│       ├── src/
│       │   ├── schema.ts            # Zod schema metadata (07)
│       │   ├── types.ts
│       │   ├── constants.ts         # CANON C4/C5 dalam bentuk kode
│       │   ├── svg-parse.ts
│       │   └── slug.ts
│       └── package.json
│
├── scripts/
│   ├── generate/
│   │   ├── components.ts            # SVG → React + Vue
│   │   ├── metadata.ts              # gabung *.json → metadata.json
│   │   ├── sprite.ts                # sprite <symbol>
│   │   ├── search-index.ts          # index pencarian statis (09)
│   │   ├── previews.ts              # PNG untuk README & OG image
│   │   └── issues.ts                # backlog → GitHub issues
│   ├── optimize/
│   │   ├── run.ts                   # pipeline SVGO + normalisasi
│   │   └── svgo.config.ts
│   ├── validate/
│   │   ├── run.ts                   # semua rule (06 §6.2)
│   │   ├── rules/
│   │   │   ├── structure.ts
│   │   │   ├── geometry.ts
│   │   │   ├── attributes.ts
│   │   │   ├── metadata.ts
│   │   │   └── naming.ts
│   │   └── duplicates.ts            # hash + perceptual (06 §6.5)
│   └── lib/
│       ├── fs.ts
│       └── report.ts                # keluaran konsol + GitHub annotation
│
├── .changeset/
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json
├── .nvmrc                           # 24
├── LICENSE                          # MIT
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── CHANGELOG.md
```

## 5.3 Konfigurasi Root

**`pnpm-workspace.yaml`**
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**`package.json`** (skrip yang benar-benar dipakai sehari-hari)
```json
{
  "name": "iconmind",
  "private": true,
  "packageManager": "pnpm@10.0.0",
  "engines": { "node": ">=24" },
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test",

    "icons:validate": "tsx scripts/validate/run.ts",
    "icons:optimize": "tsx scripts/optimize/run.ts",
    "icons:duplicates": "tsx scripts/validate/duplicates.ts",
    "icons:generate": "tsx scripts/generate/metadata.ts && tsx scripts/generate/components.ts && tsx scripts/generate/sprite.ts",
    "icons:index": "tsx scripts/generate/search-index.ts",
    "icons:preview": "tsx scripts/generate/previews.ts",
    "icons:issues": "tsx scripts/generate/issues.ts",
    "icons:new": "tsx scripts/generate/new-icon.ts",

    "changeset": "changeset",
    "release": "turbo build && changeset publish"
  }
}
```

**`turbo.json`**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "out/**", "src/generated/**"]
    },
    "dev": { "cache": false, "persistent": true },
    "lint": { "dependsOn": ["^build"] },
    "typecheck": { "dependsOn": ["^build"] },
    "test": { "dependsOn": ["^build"], "outputs": ["coverage/**"] }
  }
}
```

## 5.4 Graf Ketergantungan

```
        shared
          │
    ┌─────┼─────┬─────────┬──────────┐
    ▼     ▼     ▼         ▼          ▼
  icons  react  vue   figma(int)  scripts
    │      │     │        │
    └──────┴─────┴────────┴──▶ apps/docs
                             ▶ mcp
```

Aturan mengikat: **`shared` tidak boleh bergantung pada apa pun di dalam repo.** Kalau `shared` mulai mengimpor dari `icons`, terjadi siklus dan cache Turborepo menjadi tidak bisa dipercaya.

## 5.5 Alur Build

```
packages/icons/icons/**/*.svg
        │
        ├─ validate ──────▶ gagal cepat kalau ada rule dilanggar
        │
        ├─ metadata.ts ───▶ packages/icons/dist/metadata.json
        │
        ├─ components.ts ─▶ packages/react/src/generated/*.tsx
        │                 ▶ packages/vue/src/generated/*.ts
        │
        ├─ sprite.ts ─────▶ packages/icons/dist/sprite.svg
        │
        ├─ search-index ──▶ apps/docs/public/search-index.json
        │
        └─ previews.ts ───▶ apps/docs/public/og/*.png, README grid
                │
        tsup ───┴────────▶ dist ESM + .d.ts  ──▶ npm
```

Semua yang di kanan panah **git-ignored**. Yang di-commit hanya `.svg`, `.json`, dan kode sumber.

## 5.6 Menambah Satu Icon — Prosedur Konkret

```bash
pnpm icons:new agents agent-memory      # buat scaffold svg + json
# tempel SVG hasil review ke packages/icons/icons/agents/agent-memory.svg
# isi tags & aliases di agent-memory.json

pnpm icons:validate                     # cek aturan 03/06
pnpm icons:optimize                     # normalisasi + minify
pnpm icons:duplicates                   # pastikan bukan kembaran
pnpm icons:generate                     # regenerasi komponen & metadata
pnpm dev                                # lihat di /icons/agent-memory

pnpm changeset                          # pilih minor
git checkout -b icon/agent-memory && git commit -am "feat(agents): add agent-memory" && git push
```

Enam perintah, satu file SVG, satu file JSON. Kalau prosedur ini pernah butuh lebih dari itu, tooling-nya yang harus diperbaiki.

## 5.7 Yang Sengaja Tidak Ada

| Tidak ada | Kenapa |
|-----------|--------|
| `packages/core` | Nama tanpa makna. Semua util bersama masuk `shared`. |
| Docker / devcontainer | Node 24 + pnpm sudah cukup. Menambah lapisan berarti menambah cara gagal. |
| Test runner terpisah per package | Satu Vitest workspace di root. |
| Storybook | Website itu sendiri sudah menjadi galeri komponen. |
| Lerna / Nx | Turborepo + Changesets sudah menutup kebutuhan, dengan konfigurasi jauh lebih sedikit. |
| Komponen yang di-commit | Sumber drift terbesar. Lihat [§5.1](#51-keputusan-arsitektur). |
