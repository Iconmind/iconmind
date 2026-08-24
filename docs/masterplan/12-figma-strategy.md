# 12 — Figma Strategy

> Package internal: `packages/figma` ([CANON C3](./CANON.md#c3-package-yang-di-publish)). Tidak dipublikasikan ke npm.

---

## 12.1 Kenapa Figma Penting

Figma adalah **kanal distribusi kedua terbesar untuk icon set, dan satu-satunya yang menjangkau orang yang tidak menulis kode.** Desainer memilih icon di Figma; developer kemudian memakai yang sudah dipilih. Kalau IconMind tidak ada di Figma, kami kehilangan keputusan yang terjadi sebelum kode ditulis.

Figma Community juga punya sifat yang jarang: **penemuan organik yang tidak habis.** Sebuah file dengan 5000 duplicate akan terus muncul di hasil pencarian Figma selama bertahun-tahun tanpa promosi tambahan.

Target: 6000 duplicate pada bulan ke-12 ([CANON C6](./CANON.md#c6-angka-target-dipakai-di-doc-01-16-17)).

## 12.2 Prinsip

1. **File Figma di-generate, bukan digambar ulang.** Sumbernya tetap SVG di repo. Menggambar ulang di Figma akan menciptakan sumber kebenaran kedua yang pasti melenceng.
2. **Satu file untuk semuanya.** Bukan satu file per kategori. Desainer ingin memasang satu library, bukan dua belas.
3. **Nama layer = slug + kategori.** Pencarian Figma bekerja di atas nama layer, jadi nama harus persis sama dengan yang dicari orang.
4. **Setiap icon adalah Component**, bukan group. Hanya Component yang bisa dipakai lintas file lewat library.

## 12.3 Struktur File

```
IconMind — AI Icon Library
│
├─ 📄 Cover                    thumbnail Community
├─ 📄 Getting Started          cara pakai, lisensi, tautan
├─ 📄 Changelog                apa yang berubah tiap versi
│
├─ 📄 AI & LLM                 ← satu page per domain
├─ 📄 Agents
├─ 📄 MCP
├─ 📄 RAG & Search
├─ 📄 Data Engineering
├─ 📄 DevOps
├─ 📄 Cloud
├─ 📄 Security
├─ 📄 Automation
├─ 📄 Analytics
├─ 📄 Developer Tools
├─ 📄 Interface
│
└─ 📄 All Icons                semua icon dalam satu grid
```

Dua belas page domain mengikuti urutan baku [CANON C5](./CANON.md#c5-taksonomi--12-domain-urutan-baku). Page "All Icons" ada karena sebagian desainer lebih suka satu grid besar yang bisa di-`Ctrl+F`.

**Di dalam setiap page domain**, icon dikelompokkan per sub-kategori dengan section berlabel:

```
┌─ AI & LLM ────────────────────────────────────┐
│                                                │
│  model  (14)                                   │
│  ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢                  │
│                                                │
│  inference  (7)                                │
│  ▢ ▢ ▢ ▢ ▢ ▢ ▢                                │
└────────────────────────────────────────────────┘
```

Grid: 8 kolom, jarak 48px, tiap frame icon 24×24 di dalam frame 48×48 (padding memudahkan seleksi).

## 12.4 Konvensi Penamaan

Nama component: **`category/slug`** ([CANON C9](./CANON.md#c9-konvensi-penamaan)).

```
agents/agent-memory
mcp/mcp-server
rag/vector-database
```

Slash membuat Figma otomatis mengelompokkan component di panel Assets menjadi struktur folder. Satu konvensi, dua manfaat.

**Deskripsi component** diisi dari field `description` di metadata, **ditambah tag** — karena pencarian Figma juga membaca deskripsi:

```
Memory an agent writes to and reads back
agent, memory, state, recall, context, storage
```

Karena diambil langsung dari metadata, deskripsi ini otomatis berbahasa Inggris ([CANON C11](./CANON.md#c11-kebijakan-bahasa)).

Ini membuat pencarian Figma untuk "recall" menemukan `agent-memory`, sama seperti di situs.

## 12.5 Component Properties

Setiap component punya properti yang bisa diubah desainer tanpa detach:

| Properti | Tipe | Nilai |
|----------|------|-------|
| `Size` | Variant | 16, 24, 32, 48 |
| `Stroke` | Variant | 1, 1.5, 2, 2.5 |

Warna **tidak** dijadikan properti. Desainer mengubah stroke color langsung, dan itu cara kerja Figma yang paling alami. Menambahkan variant warna akan meledakkan jumlah variant tanpa manfaat.

Jumlah variant per icon: 4 × 4 = 16. Pada 1000 icon = 16.000 variant — melewati batas praktis Figma.

**Keputusan**: variant `Size` dan `Stroke` hanya diterapkan pada page **Interface** dan **AI & LLM** (domain yang paling sering dipakai), sementara domain lain memakai component tunggal 24px/stroke 2. Desainer yang butuh ukuran lain cukup mengubah frame — Figma menskalakan vektor dengan benar. Ini kompromi sadar antara kelengkapan dan performa file.

## 12.6 Generator

`packages/figma/src/build-figma-file.ts` menghasilkan file `.fig` melalui REST API Figma + plugin pendamping.

```
metadata.json + *.svg
        │
        ▼
build-figma-file.ts
        │  hitung layout grid per sub-kategori
        │  susun payload node
        ▼
Figma plugin (dijalankan sekali di file target)
        │  createNodeFromSvg() per icon
        │  createComponent(), set nama + deskripsi
        │  susun ke section per sub-kategori
        ▼
File Figma siap publish
```

Kenapa plugin dan bukan REST API murni: **API Figma tidak bisa membuat node**, hanya membaca. Pembuatan node hanya mungkin dari dalam plugin. Ini keterbatasan platform, bukan pilihan desain.

Plugin dijalankan manual saat rilis besar (tiap 4–8 minggu), bukan tiap merge. Proses semi-otomatis ini dapat diterima karena frekuensinya rendah — mengotomasi penuh akan butuh headless Figma yang tidak sepadan biayanya.

## 12.7 Alur Publikasi

**Rilis pertama** (Phase 2, ~300 icon):
1. Jalankan generator ke file kerja privat.
2. Periksa manual: grid rapi, tidak ada icon hilang, nama benar.
3. Buat Cover 1920×960 — grid icon dengan latar bersih, nama dan tagline.
4. Isi page *Getting Started*: cara duplicate, lisensi MIT, tautan situs & GitHub.
5. Publish ke Community dengan deskripsi kaya kata kunci.
6. Publish sebagai Library agar bisa dipakai lintas file oleh tim.

**Rilis berikutnya**:
1. Jalankan generator pada file yang sama (plugin memperbarui component yang ada berdasarkan nama, menambah yang baru).
2. Perbarui page Changelog.
3. Publish ulang.

Memperbarui berdasarkan nama, bukan menghapus-dan-membuat-ulang, sangat penting: instance yang sudah dipakai desainer di file mereka tetap tertaut.

## 12.8 Deskripsi Figma Community

Judul: `IconMind — AI, Agents, MCP & RAG Icons`

Isi deskripsi (kata kunci yang benar-benar dicari orang di Figma):

> Open source icon library untuk produk AI. Icon untuk LLM, agents, MCP servers, RAG pipelines, vector databases, prompts, embeddings, guardrails, automation, DevOps, cloud, security, dan developer tools.
>
> · Semua icon 24×24, stroke 2px, gaya outline konsisten
> · Component tertata per kategori
> · Lisensi MIT — gratis untuk komersial, tanpa atribusi
> · Tersedia juga untuk React, Vue, dan MCP: iconmind.dev

Tag Figma: `icons`, `ai`, `llm`, `agents`, `mcp`, `rag`, `saas`, `developer`, `open source`, `design system`, `outline icons`.

## 12.9 Plugin Figma (Opsional, Phase 4)

Plugin pencarian yang menyisipkan icon langsung tanpa duplicate file:

| Fitur | Perilaku |
|-------|----------|
| Search | Index yang sama dengan situs ([09](./09-search-system.md)) |
| Insert | Sisipkan sebagai vektor di posisi seleksi |
| Ukuran & stroke | Kontrol sebelum menyisipkan |
| Selalu terbaru | Ambil dari CDN, bukan dari file yang di-duplicate |

**Nilai strategisnya**: plugin memberi kami kanal pembaruan langsung. File yang sudah di-duplicate tidak pernah ikut ter-update; pengguna plugin selalu mendapat set terbaru.

Ditempatkan di Phase 4 karena membutuhkan icon set yang sudah matang. Plugin dengan 100 icon tidak akan bertahan di ingatan siapa pun.

## 12.10 Yang Tidak Dikerjakan

| Tidak | Kenapa |
|-------|--------|
| File Figma per kategori | Fragmentasi; desainer ingin satu library |
| Variant warna | Meledakkan jumlah variant, tidak sesuai cara kerja Figma |
| Sketch / Adobe XD | Pangsa pasar kecil, biaya perawatan tidak sepadan |
| Menggambar ulang di Figma | Melanggar prinsip sumber kebenaran tunggal ([§12.2](#122-prinsip)) |
| Auto-publish tiap merge | API Figma tidak mendukungnya tanpa campur tangan manual |
