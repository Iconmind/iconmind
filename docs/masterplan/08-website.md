# 08 — Website

> Peta halaman baku: [CANON C7](./CANON.md#c7-peta-halaman-website-baku). Stack: [CANON C2](./CANON.md#c2-toolchain-pinned). Struktur file: [05 §5.2](./05-repository-architecture.md#52-struktur-lengkap).

---

## 8.1 Prinsip

**Situs ini adalah produk, bukan brosur.** Kebanyakan pengguna tidak akan pernah membaca dokumentasi — mereka datang, mencari, menyalin, pergi. Optimasi diarahkan ke satu jalur itu.

Empat aturan:

1. **Waktu ke salin < 10 detik.** Dari mendarat sampai SVG ada di clipboard.
2. **Semuanya statis.** `output: "export"`, tanpa runtime server, tanpa API route. Konsekuensi dari prinsip zero-backend ([00](./00-index.md#prinsip-non-negotiable)).
3. **Search adalah navigasi utama.** Kategori adalah cadangan untuk yang tidak tahu harus mencari apa.
4. **Setiap halaman icon adalah landing page SEO.** 1000 halaman detail = 1000 pintu masuk dari mesin pencari. Ini kanal akuisisi terbesar dan hampir gratis.

## 8.2 Rendering & Data

Semua halaman di-*prerender* saat build. Sumber data tunggal: `metadata.json` dari `@iconmind/icons` ([07 §7.6](./07-metadata-system.md#76-agregat-metadatajson)).

```ts
// apps/docs/lib/icons.ts — dipanggil hanya di server component
import { metadata } from "@iconmind/icons";
export const allIcons = metadata.icons;
export const allCategories = metadata.categories;
export const getIcon = (slug: string) => allIcons.find(i => i.slug === slug);
```

Jumlah halaman statis pada 1000 icon: 1000 detail + 12 kategori + 10 docs + 7 halaman lain ≈ **1029**. Waktu build Next.js untuk itu: 2–4 menit — masih nyaman. Kalau nanti melewati 10 menit, langkah pertama adalah membatasi prerender ke icon populer dan menjadikan sisanya dinamis-statis, bukan menambah server.

## 8.3 Home — `/`

**Tujuan**: dalam 5 detik pengunjung paham ini apa, untuk siapa, dan gratis.

| Bagian | Isi | Komponen |
|--------|-----|----------|
| Hero | Judul, satu kalimat posisi, hitungan icon langsung dari metadata, dua CTA (*Browse icons* / *Get started*) | `Hero` |
| Search inline | Input yang langsung fokus, hasil live | `SearchCommand` mode inline |
| Grid unggulan | 60 icon rotasi acak (seed harian, bukan `Math.random()` per render — supaya HTML statis stabil) | `IconGrid` |
| Kartu kategori | 12 domain, 4 icon contoh masing-masing | `CategoryNav` |
| Blok install | Tab npm/pnpm/yarn/bun, tombol salin | `CodeBlock` |
| Contoh kode | React & Vue berdampingan | `CodeBlock` |
| Bukti sosial | Star GitHub (statis saat build), jumlah unduhan, logo showcase | `Stats` |

Satu kalimat posisi yang dipakai konsisten di seluruh properti (situs, README, npm, Product Hunt):
> **Open-source icons for AI-era software — LLMs, agents, MCP, RAG, and everything around them.**

Kalimat ini **berbahasa Inggris di semua permukaan publik** ([CANON C11](./CANON.md#c11-kebijakan-bahasa)); terjemahan Indonesia hanya boleh muncul di dokumen internal.

## 8.4 Browse — `/icons`

Halaman yang paling sering dipakai. Semuanya berjalan di klien setelah muat awal.

**Layout**: sidebar kiri (filter) + grid utama + panel detail kanan yang muncul saat icon dipilih. Di mobile: filter jadi sheet bawah, panel detail jadi drawer.

| Elemen | Perilaku |
|--------|----------|
| Search bar | Sticky, fokus otomatis, sinkron ke `?q=` |
| Filter kategori | Multi-pilih, sinkron ke `?category=` |
| Filter sub-kategori | Muncul hanya kalau satu kategori dipilih |
| Kontrol ukuran | 16 / 24 / 32 / 48 px, tersimpan di `localStorage` |
| Kontrol stroke | 1 / 1.5 / 2 / 2.5, live preview |
| Warna | Ikut tema, plus pilihan warna kustom |
| Grid | Virtualized (`@tanstack/react-virtual`) — 1000 node DOM sekaligus terlalu berat |
| Klik icon | Buka panel detail, URL jadi `/icons/[slug]` via `history.pushState` |
| Hover icon | Tampilkan nama + tombol salin cepat |

**Semua state ada di URL.** `?q=agent&category=agents&size=32` bisa dibagikan dan menghasilkan tampilan yang sama. Ini penting untuk berbagi di Discord/Slack — kanal distribusi yang tidak terlihat tapi nyata.

## 8.5 Icon Detail — `/icons/[slug]`

Dua peran: panel di dalam browse, dan halaman penuh yang dapat diindeks mesin pencari.

| Bagian | Isi |
|--------|-----|
| Pratinjau besar | 96px, latar bisa diganti terang/gelap/kustom |
| Kustomizer | Ukuran, stroke, warna — memengaruhi semua snippet di bawahnya |
| Tombol salin | SVG · JSX · Vue · Data URI · unduh `.svg` |
| Snippet kode | React, Vue, HTML `<img>`, sprite `<use>`, CDN |
| Metadata | Kategori, sub-kategori, tags, aliases, ditambahkan di versi |
| Icon terkait | Dari field `related` ([07 §7.4](./07-metadata-system.md#74-aturan-field)) |
| Icon sekategori | 12 tetangga terdekat |
| Tautan kontribusi | "Perbaiki icon ini di GitHub" langsung ke file |

**SEO per halaman**:
- `<title>`: `Agent Memory icon — IconMind`  *(seluruh salinan halaman berbahasa Inggris)*
- Meta description dari field `description` + kategori
- OG image PNG unik per icon (di-generate `scripts/generate/previews.ts`)
- JSON-LD `ImageObject` + `BreadcrumbList`
- Canonical ke `/icons/[slug]`
- Semua alias jadi halaman dengan canonical menunjuk ke slug utama — menangkap trafik nama lama tanpa konten duplikat

## 8.6 Categories — `/categories` dan `/categories/[category]`

`/categories` — 12 kartu, tiap kartu berisi nama domain, deskripsi satu kalimat dari [02 §2.3](./02-icon-taxonomy.md#23-dua-belas-domain), jumlah icon, dan 6 icon pratinjau.

`/categories/[category]` — semua icon domain itu, dikelompokkan per sub-kategori dengan heading, plus prosa pendek yang menjelaskan cakupan domain. Prosa ini bukan hiasan: ini yang membuat halaman punya konten cukup untuk diperingkat oleh mesin pencari untuk kueri seperti *"MCP icons"*.

## 8.7 Search — `/search`

Halaman pencarian penuh yang deep-linkable (`/search?q=vector`). Berbeda dari ⌘K yang bersifat overlay dan cepat, halaman ini menampilkan hasil dengan konteks: kategori tiap hasil, tag yang cocok, dan skor relevansi.

**Ketika nol hasil** — ini momen paling bernilai di seluruh situs:
1. Tampilkan saran "mungkin maksud Anda" dari jarak edit terdekat.
2. Tampilkan icon dari kategori yang paling mendekati.
3. Tombol besar: **"Minta icon ini"** → membuka GitHub Issue dengan judul terisi otomatis.
4. Catat query secara anonim (lihat [§8.12](#812-analitik)).

Mekanisme lengkap: [09](./09-search-system.md).

## 8.8 Docs — `/docs/[...slug]`

Fumadocs + Content Collections, MDX di `apps/docs/content/docs/`.

| Halaman | Isi |
|---------|-----|
| `introduction` | Apa itu, untuk siapa, bagaimana dibanding library lain |
| `installation` | npm/pnpm/yarn/bun × React/Vue/SVG/CDN |
| `react` | Props, tree shaking, SSR, dynamic import, TypeScript |
| `vue` | Props, Nuxt, `<script setup>`, auto-import |
| `svg` | File mentah, sprite, CDN, data URI |
| `figma` | Cara memakai file komunitas |
| `mcp` | Setup MCP server di berbagai klien |
| `design-guidelines` | Ringkasan [03](./03-design-system.md) untuk kontributor |
| `contributing` | Ringkasan [15](./15-open-source-strategy.md) |
| `faq` | Lisensi, komersial, request, atribusi, perbandingan |

Fitur MDX kustom: `<IconPreview slug="agent-memory" />`, `<IconGrid category="mcp" limit={12} />`, `<CodeTabs>`. Dokumentasi yang memperlihatkan icon sungguhan jauh lebih meyakinkan daripada yang menuliskannya.

## 8.9 Changelog — `/changelog`

Di-generate dari `CHANGELOG.md` yang dihasilkan Changesets, **plus** grid visual icon baru per rilis. Grid visual inilah yang membuat halaman ini layak dibagikan; daftar teks tidak.

## 8.10 Roadmap — `/roadmap`

Dirender dari data yang sama dengan [02b](./02b-icon-catalog.md) — bukan ditulis ulang. Menampilkan progres per phase dan per domain (batang progres nyata dari `shipped ÷ target`), daftar yang sedang dikerjakan, dan tautan ke issue request teratas.

Karena sumbernya data, halaman ini tidak akan pernah basi. Roadmap yang ditulis tangan selalu basi dalam dua bulan.

## 8.11 Showcase — `/showcase`

Aktif mulai Phase 3, ketika sudah ada yang memakai. Diisi lewat PR ke satu file `showcase.json` — bukan formulir, bukan basis data. Setiap entri: nama proyek, URL, tangkapan layar, satu kalimat.

## 8.12 Analitik

Yang dilacak, dengan analitik ramah privasi tanpa cookie (Plausible atau Umami, self-host opsional):

| Peristiwa | Kenapa penting |
|-----------|----------------|
| Query pencarian **nol hasil** | Sumber roadmap terbaik ([04 §4.3](./04-ai-generation-workflow.md#43-tahap-1--idea)) |
| Icon paling banyak disalin | Menunjukkan mana yang benar-benar dipakai |
| Format salin yang dipilih | Menentukan urutan tab |
| Halaman docs paling sering dibaca | Menunjukkan di mana orang tersendat |

Tidak ada cookie, tidak ada fingerprint, tidak ada data pribadi. Query pencarian dikumpulkan dalam bentuk agregat.

## 8.13 Performa

| Metrik | Target | Cara |
|--------|--------|------|
| LCP | < 1.2 dtk | Statis, font preload, tanpa gambar hero |
| CLS | < 0.05 | Semua kotak icon berdimensi tetap |
| INP | < 200 ms | Grid virtualized, search di-debounce |
| JS awal | < 90 KB gzip | Server component sebagai default; klien hanya untuk grid & search |
| Index pencarian | < 150 KB gzip | Dimuat setelah interaksi pertama ([09](./09-search-system.md)) |
| Skor Lighthouse | ≥ 95 semua kategori | Diperiksa di CI |

Ikon dirender sebagai SVG inline dari data, bukan `<img>` per icon — 1000 permintaan gambar akan meniadakan semua keuntungan situs statis.

## 8.14 Alur UX

**Alur 1 — Butuh icon spesifik (paling sering)**
`/` → ketik di search → lihat hasil → hover → klik salin. **Target: 8 detik.**

**Alur 2 — Menjelajah tanpa target**
`/icons` → pilih kategori → gulir → klik icon → panel detail → salin. **Target: 30 detik.**

**Alur 3 — Baru pertama kali**
`/` → paham posisinya → `/docs/installation` → salin perintah install → `/icons`. **Target: 2 menit.**

**Alur 4 — Tidak menemukan**
Search → nol hasil → tombol "Minta icon ini" → GitHub Issue terisi. **Target: 20 detik.**
Alur 4 terlihat seperti kegagalan, tapi justru menjadi masukan produk paling berharga — karena itu tombolnya dibuat besar, bukan disembunyikan.

## 8.15 Aksesibilitas Situs

- Navigasi keyboard penuh; grid icon bisa dijelajahi dengan panah, `Enter` menyalin.
- Fokus terlihat jelas di semua elemen interaktif.
- Aksi salin diumumkan lewat `aria-live`.
- Kontras memenuhi WCAG AA di tema terang dan gelap.
- `prefers-reduced-motion` dihormati.
- Halaman icon dan docs tetap terbaca tanpa JavaScript; hanya search dan kustomizer yang butuh JS.
