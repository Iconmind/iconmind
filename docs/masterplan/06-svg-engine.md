# 06 — SVG Engine

> Lokasi kode: `scripts/validate/`, `scripts/optimize/`, `scripts/generate/` ([05 §5.2](./05-repository-architecture.md#52-struktur-lengkap)).
> Aturan desain yang divalidasi: [03](./03-design-system.md). Skema metadata: [07](./07-metadata-system.md).

---

## 6.1 Peran Engine

SVG Engine adalah **satu-satunya alasan proyek ini bisa dijalankan satu orang**. Tanpa engine, setiap icon butuh pemeriksaan manual atas 20-an aturan, dan pemeriksaan manual atas 1000 icon tidak akan pernah selesai.

Tiga hal yang wajib dijamin engine:

1. **Tidak ada SVG yang melanggar aturan bisa masuk `main`.**
2. **Dua icon yang identik secara visual menghasilkan byte yang identik.**
3. **Semua artefak turunan (komponen, sprite, metadata, index) selalu konsisten dengan sumbernya.**

Empat pipeline: **Validate → Optimize → Deduplicate → Generate**. Ketiga yang pertama defensif; yang keempat produktif.

## 6.2 Validator

`pnpm icons:validate` · `scripts/validate/run.ts`

Empat kelas aturan. Semuanya *fail hard* — tidak ada warning yang bisa diabaikan, karena warning yang bisa diabaikan pada akhirnya selalu diabaikan.

### Kelas 1 — Structure (`rules/structure.ts`)

| Rule | Cek |
|------|-----|
| `root-is-svg` | Elemen akar adalah `<svg>` |
| `viewbox-exact` | `viewBox="0 0 24 24"` persis |
| `dimensions-24` | `width="24"` dan `height="24"` |
| `allowed-elements` | Hanya `path, circle, rect, line, polyline, polygon, ellipse` |
| `no-style-tag` | Tidak ada `<style>` |
| `no-text` | Tidak ada `<text>`, `<tspan>` |
| `no-image` | Tidak ada `<image>`, tidak ada `data:` URI |
| `no-defs` | Tidak ada `<defs>`, `<filter>`, `<mask>`, `<clipPath>`, `<use>` |
| `no-empty-group` | Tidak ada `<g>` tanpa atribut yang bermakna |
| `max-children` | ≤ 12 elemen anak |
| `max-bytes` | ≤ 1500 byte setelah optimasi |
| `single-root-svg` | Tidak ada SVG bersarang |

### Kelas 2 — Attributes (`rules/attributes.ts`)

| Rule | Cek |
|------|-----|
| `fill-none` | `fill="none"` di root; tidak ada `fill` selain `none` di anak |
| `stroke-current` | `stroke="currentColor"` di root |
| `stroke-width-2` | `stroke-width="2"` di root, tidak di-override anak |
| `linecap-round` | `stroke-linecap="round"` |
| `linejoin-round` | `stroke-linejoin="round"` |
| `no-literal-color` | Tidak ada hex, `rgb()`, `hsl()`, nama warna CSS |
| `no-style-attr` | Tidak ada atribut `style` |
| `no-class-id` | Tidak ada `class` atau `id` |
| `no-transform` | Tidak ada atribut `transform` |
| `no-dasharray` | Tidak ada `stroke-dasharray` / `stroke-dashoffset` |
| `no-editor-junk` | Tidak ada namespace/atribut editor, komentar, `<metadata>` |
| `no-title-desc` | Tidak ada `<title>` / `<desc>` ([03 §3.8](./03-design-system.md#38-aturan-aksesibilitas)) |

### Kelas 3 — Geometry (`rules/geometry.ts`)

Kelas ini yang paling bernilai dan paling jarang dimiliki proyek lain. Semuanya bekerja di atas path yang sudah di-parse dan di-flatten.

| Rule | Cek | Toleransi |
|------|-----|-----------|
| `within-live-area` | Semua titik anchor di dalam kotak **3.0–21.0** (stroke 2px meluber 1px, sehingga tinta berhenti tepat di 2–22) | ±0.05 |
| `grid-snap` | Titik anchor kelipatan 0.5 | ±0.02 |
| `min-element-size` | Untuk bentuk **tertutup** (`rect`, `circle`, `ellipse`, `polygon`): sisi terpendek ≥ 2 | — |
| `stub-segment` | Panjang segmen lurus harus ≤ 0.25 (idiom titik) **atau** ≥ 2. Di antaranya = kutil | — |
| `max-crossings` | Maksimum **2** titik persilangan antar stroke di seluruh icon | — |
| `min-stroke-gap` | Jarak antar segmen sejajar ≥ 2.0; untuk segmen **di dalam** bentuk tertutup ≥ 3.0 | peringatan pada 1.5–2.0, gagal di bawah 1.5 |
| `angle-constraint` | Segmen lurus horizontal, vertikal, atau 45°/30°/60° | ±1.5° |
| `optical-center` | Pusat massa bounding box dalam radius 1.5 dari (12,12) | — |
| `no-degenerate` | Tidak ada titik duplikat berurutan di luar idiom titik | — |
| `path-precision` | Maksimum 2 desimal | — |

`min-stroke-gap` adalah satu-satunya rule dengan zona peringatan, karena beberapa metafora sah (misalnya tumpukan lapisan) memang berjarak sempit. Peringatan muncul di PR sebagai anotasi, tapi tidak memblokir.

**Idiom titik.** Segmen sepanjang nol dengan `stroke-linecap="round"` merender sebagai lingkaran berdiameter 2px — inilah cara baku menggambar titik di icon berbasis stroke, dan `d="M9.5 12h0"` bentuk kanoniknya. Versi pertama rule `min-element-size` melarangnya ("bounding box ≥ 2×2") sehingga menolak icon yang benar; ketahuan pada icon pertama yang divalidasi. Yang sebenarnya perlu dilarang adalah panjang **di antara** keduanya — itu tugas `stub-segment`.

`max-crossings` berasal dari spike validasi token (`spike/design-tokens/FINDINGS.md`): keterbacaan pada 16px ditentukan oleh **jumlah persilangan stroke, bukan jumlah elemen**. Icon 5 elemen tanpa persilangan tetap tajam; icon 4 elemen dengan 4 persilangan menjadi bercak hitam. T-junction (satu stroke berhenti di stroke lain) tidak dihitung sebagai persilangan.

### Kelas 4 — Metadata & Naming (`rules/metadata.ts`, `rules/naming.ts`)

| Rule | Cek |
|------|-----|
| `json-exists` | Setiap `.svg` punya `.json` bersebelahan, dan sebaliknya |
| `schema-valid` | Lolos Zod schema ([07](./07-metadata-system.md)) |
| `slug-matches-filename` | `slug` di JSON == nama file |
| `category-matches-folder` | `category` di JSON == nama folder |
| `slug-format` | `^[a-z0-9]+(-[a-z0-9]+)*$`, panjang 2–40 |
| `slug-unique-global` | Slug unik lintas seluruh domain |
| `alias-no-collision` | Alias tidak bertabrakan dengan slug atau alias lain |
| `tags-min` | ≥ 3 tag |
| `subcategory-known` | Sub-kategori ada di daftar domain terkait ([02 §2.4](./02-icon-taxonomy.md#24-peta-sub-kategori)) |
| `component-name-safe` | PascalCase dari slug bukan reserved word JS/TS |

### Format Keluaran

```
✗ agents/agent-memory.svg
  geometry/min-stroke-gap    jarak 1.2 antara segmen #2 dan #3 (min 2.0)
  attributes/no-transform    atribut transform pada <path> #1

⚠ rag/reranker.svg
  geometry/min-stroke-gap    jarak 1.8 antara segmen #4 dan #5 (peringatan)

✓ 619 lolos · ✗ 1 gagal · ⚠ 1 peringatan
```

Di CI, keluaran yang sama dipancarkan sebagai GitHub annotation sehingga muncul langsung di tab Files Changed pada baris yang tepat.

## 6.3 Optimizer

`pnpm icons:optimize` · `scripts/optimize/run.ts`

Dua fase. SVGO saja tidak cukup karena SVGO mengecilkan ukuran, sedangkan yang kita butuhkan adalah **bentuk kanonik**.

### Fase 1 — SVGO 4

```ts
import type { Config } from "svgo";

/**
 * Deliberately conservative. SVGO's job here is to strip junk, not to be clever:
 * merging paths and converting shapes to paths both make the source unreadable in a
 * diff, and a reviewer who cannot read the diff cannot review the icon.
 */
export const svgoConfig: Config = {
  multipass: true,
  js2svg: { pretty: false, eol: "lf" },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,        // viewBox is mandatory
          mergePaths: false,           // destroys diff readability
          convertShapeToPath: false,   // circle/rect read better than path data
        },
      },
    },
    "removeComments",
    "removeMetadata",
    "removeEditorsNSData",
    "removeDesc",
    "removeTitle",
    "cleanupIds",
    { name: "cleanupNumericValues", params: { floatPrecision: 2 } },
    { name: "convertPathData", params: { floatPrecision: 2, transformPrecision: 3, applyTransforms: true } },
    "convertTransform",
    "removeUselessStrokeAndFill",
    "sortAttrs",
  ],
};
```

### Fase 2 — Normalisasi Kanonik

Ini yang membuat keluaran deterministik:

1. **Flatten semua `transform`** ke koordinat absolut. Setelah fase ini tidak ada `transform` yang tersisa — inilah yang membuat rule `no-transform` bisa ditegakkan.
2. **Pasang ulang atribut root dalam urutan tetap**: `xmlns`, `width`, `height`, `viewBox`, `fill`, `stroke`, `stroke-width`, `stroke-linecap`, `stroke-linejoin`.
3. **Bulatkan semua koordinat ke 2 desimal**, lalu snap ke 0.5 terdekat jika selisihnya < 0.02.
4. **Urutkan elemen anak** secara deterministik: berdasarkan (tipe elemen, y pertama, x pertama).
5. **Normalisasi perintah path**: absolut, spasi tunggal, tanpa koma redundan.
6. **Satu baris**, newline penutup tunggal, tanpa BOM.

Hasilnya: dua orang yang menggambar bentuk identik di Figma dan Illustrator menghasilkan file yang **byte-identik**. Tanpa properti ini, deteksi duplikat hanya menebak-nebak.

Optimizer bersifat **idempoten** — menjalankannya dua kali tidak mengubah apa pun. Ini diuji di CI (`nightly.yml`) dengan menjalankan optimizer pada seluruh set dan memastikan `git diff` kosong.

## 6.4 Linter

Linter berbeda dari validator: **validator memblokir, linter menyarankan.** Dijalankan pada PR, hasilnya jadi komentar, tidak pernah menggagalkan build.

| Saran | Pemicu |
|-------|--------|
| `simplify-path` | Path dengan >8 titik anchor yang bisa disederhanakan tanpa mengubah bentuk >0.3px |
| `prefer-primitive` | Path yang bentuknya persis lingkaran/persegi → sarankan `<circle>`/`<rect>` |
| `suspicious-symmetry` | Bentuk yang hampir simetris (selisih <0.3px) → mungkin salah ketik koordinat |
| `heavy-optical-weight` | Total panjang stroke >40% di atas rata-rata sub-kategorinya |
| `light-optical-weight` | Total panjang stroke >40% di bawah rata-rata sub-kategorinya |
| `unusual-element-count` | Jumlah elemen jauh dari median sub-kategori |
| `element-budget` | Lebih dari 6 elemen — masih sah (batas keras 12), tapi jarang bertahan di 16px |
| `collinear-overlap` | Dua segmen sejajar yang **berimpit** (jarak < 0.25) dengan proyeksi bertindih — strokenya menyatu dan bentuknya hilang |

Dua rule berat optis adalah aproksimasi kasar dari "uji picing" di [03 §3.9](./03-design-system.md#39-uji-kualitas-wajib). Tidak akurat, tapi cukup untuk menandai kandidat yang perlu diperhatikan manusia.

## 6.5 Deteksi Duplikat

`pnpm icons:duplicates` · `scripts/validate/duplicates.ts`

Tiga lapis, dari murah ke mahal:

**Lapis 1 — Hash konten (instan).**
SHA-256 dari SVG yang sudah dinormalisasi. Cocok = duplikat persis. Karena optimizer bersifat kanonik ([§6.3](#63-optimizer)), lapis ini benar-benar bisa dipercaya.

**Lapis 2 — Hash struktural (cepat).**
Normalisasi lebih agresif: buang semua koordinat, sisakan urutan tipe elemen dan jumlah perintah path (`path:M,L,L,Z|circle|circle`). Cocok = kemungkinan icon yang sama digambar sedikit bergeser. Ditandai untuk ditinjau, tidak otomatis gagal.

**Lapis 3 — Peta tinta (lambat, hanya di `nightly.yml`).**
Render 96px dengan `@resvg/resvg-js` → peta cakupan tinta 16×16 → selisih absolut rata-rata per sel, dinormalkan ke 0..1.

| Jarak | Tafsir | Tindakan |
|-------|--------|----------|
| ≤ 0.050 | Hampir pasti duplikat | Gagal, harus diselesaikan |
| ≤ 0.100 | Sangat mirip | Peringatan, tinjau manual |
| ≤ 0.180 | Mirip | Catat sebagai kandidat *related icon* |
| > 0.180 | Berbeda | — |

**Kenapa bukan dHash.** dHash adalah pilihan pertama dan gagal. Pada line art bertumpu-stroke di kanvas 24px, bit gradiennya didominasi siluet terluar: `memory` (persegi rounded berisi tiga palang) mendapat jarak Hamming 4 dari `prompt` (gelembung ucapan) — dua icon yang tidak mirip sama sekali bagi manusia. Membandingkan cakupan tinta sel per sel mempertahankan detail bagian dalam, yang justru bagian yang membedakan icon-icon ini.

Ambang di atas dikalibrasi terhadap 20 anchor icon. Pasangan terdekat yang dihasilkan — `guardrail`↔`agent` (0.087), lalu `model`↔`agent` (0.113) — adalah pasangan yang memang paling mirip menurut mata, jadi peringkatnya bisa dipercaya. Kalibrasi ulang wajib dilakukan pada audit kuartalan ketika jumlah icon berlipat.

Rentang 9–14 tidak dibuang: hasilnya diumpankan ke field `related` di metadata ([07](./07-metadata-system.md)) sehingga halaman detail icon bisa menampilkan "icon serupa" tanpa kurasi manual. **Pemeriksaan kualitas yang sekaligus menghasilkan fitur produk.**

Kompleksitas O(n²) pada 1000 icon = 500 ribu perbandingan Hamming 64-bit — di bawah satu detik. Tidak perlu dioptimasi.

## 6.6 Generator Metadata

`scripts/generate/metadata.ts`

Membaca setiap `<slug>.json`, menggabungkan dengan data turunan dari SVG, menghasilkan satu `packages/icons/dist/metadata.json`.

Field yang **diturunkan otomatis** dan tidak boleh ditulis tangan:

| Field | Sumber |
|-------|--------|
| `componentName` | PascalCase dari slug |
| `contentHash` | SHA-256 lapis 1 |
| `structuralHash` | Hash lapis 2 |
| `elementCount` | Jumlah anak setelah optimasi |
| `byteSize` | Ukuran setelah optimasi |
| `related` | Hasil perceptual hash jarak 9–14 |
| `addedIn` | Versi package saat file pertama muncul di git |
| `updatedIn` | Versi terakhir saat isi SVG berubah |

`addedIn`/`updatedIn` dibaca dari riwayat git, bukan ditulis manusia. Angka yang ditulis tangan pasti akan salah pada icon ke-200.

## 6.7 Generator Lain

| Script | Masukan | Keluaran |
|--------|---------|----------|
| `generate/components.ts` | SVG + metadata | `packages/react/src/generated/*.tsx`, `packages/vue/src/generated/*.ts` |
| `generate/sprite.ts` | SVG | `dist/sprite.svg` berisi `<symbol id="im-<slug>">` |
| `generate/search-index.ts` | metadata | `apps/docs/public/search-index.json` ([09](./09-search-system.md)) |
| `generate/previews.ts` | SVG | PNG grid README + OG image per icon |
| `generate/issues.ts` | [02b](./02b-icon-catalog.md) + file yang ada | GitHub Issue untuk slug yang belum dibuat |
| `generate/new-icon.ts` | domain + slug | Scaffold `.svg` + `.json` |

## 6.8 Performa

Anggaran waktu pada 1000 icon, mesin pengembang biasa:

| Operasi | Target | Catatan |
|---------|--------|---------|
| Validate semua | < 5 dtk | Paralel, tanpa I/O jaringan |
| Validate berubah saja | < 0.5 dtk | Mode watch saat `pnpm dev` |
| Optimize semua | < 20 dtk | SVGO adalah bagian paling lambat |
| Duplikat lapis 1+2 | < 1 dtk | |
| Duplikat lapis 3 | < 60 dtk | Rasterisasi; hanya nightly |
| Generate komponen | < 10 dtk | 2000 file kecil |
| Build package | < 30 dtk | tsup, dengan cache Turborepo |

Kalau validasi lokal pernah melewati 10 detik, kontributor akan berhenti menjalankannya sebelum push — dan seluruh manfaat engine hilang. Kecepatan di sini adalah fitur, bukan kemewahan.
