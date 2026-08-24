# 16 — Roadmap

> Semua target angka mengikuti [CANON C6](./CANON.md#c6-angka-target-dipakai-di-doc-01-16-17). Distribusi icon per domain: [02 §2.6](./02-icon-taxonomy.md#26-roadmap-coverage-per-domain). Daftar icon per phase: [02b](./02b-icon-catalog.md).

---

> **Lapisan operasional** — tanggal absolut, daftar tugas, dan status yang diturunkan dari repo — ada di [18 — Timeline Eksekusi](./18-timeline.md). Dokumen ini lapisan strategisnya: target, risiko, dan metrik.

## 16.1 Bentuk Rencana

Empat phase, **13 minggu** masing-masing (52 minggu = 12 bulan). Aturan yang mengatur urutannya:

> **Kedalaman sebelum keluasan. Bukti sebelum surface area.**

Artinya: 100 icon yang sangat konsisten di domain `ai`/`agents`/`mcp`/`rag` lebih bernilai daripada 400 icon rata-rata yang tersebar di 12 domain. Dan satu package React yang benar-benar dipakai orang lebih meyakinkan daripada lima package yang belum ada penggunanya.

Konsekuensi yang paling terasa: **MCP server, Vue, dan Figma sengaja tidak ada di Phase 1**, meskipun ketiganya menarik. Semuanya menunggu sampai ada icon yang cukup untuk membuatnya berguna.

```
Phase 1 ─── Phase 2 ─── Phase 3 ─── Phase 4
Fondasi      Launch      Ekosistem   Skala
100 icon     300 icon    500 icon    1000 icon
M0–M3        M4–M6       M7–M9       M10–M12
             ▲
             └─ peluncuran publik
```

Peluncuran publik ada di **awal Phase 2**, bukan Phase 1. Alasannya di [17](./17-launch-strategy.md): satu kesempatan peluncuran, dan peluncuran dengan 100 icon tanpa bukti pemakaian akan terbakar sia-sia.

---

## 16.2 Phase 1 — Fondasi (Bulan 0–3)

**Tujuan**: sistem yang bekerja, bukan produk yang terkenal. Nol promosi.

### Deliverables

| # | Deliverable | Definisi selesai |
|---|-------------|------------------|
| 1 | Monorepo lengkap | `pnpm install && pnpm build` bersih dari klon baru ([05](./05-repository-architecture.md)) |
| 2 | SVG Engine | Validate, optimize, dedup lapis 1–2 jalan ([06](./06-svg-engine.md)) |
| 3 | Design system tertulis | [03](./03-design-system.md) final, 20 anchor icon dibekukan |
| 4 | **100 icon** | Lolos seluruh validasi + review manusia |
| 5 | `@iconmind/icons` | Terbit di npm |
| 6 | `@iconmind/react` | Terbit di npm, tree shaking terverifikasi ([10](./10-react-package.md)) |
| 7 | Website v1 | Home, Browse, Detail, Docs, Search ([08](./08-website.md)) |
| 8 | Search | Prefix + fuzzy jalan ([09](./09-search-system.md)) |
| 9 | CI/CD | 5 workflow jalan, preview PR aktif ([14](./14-ci-cd.md)) |
| 10 | Dokumen komunitas | README, CONTRIBUTING, CoC, issue template ([15](./15-open-source-strategy.md)) |

### Milestone

| Minggu | Milestone |
|--------|-----------|
| 1–2 | Repo, toolchain, CI dasar |
| 3–4 | Design system final + 20 anchor icon |
| 5–6 | SVG Engine lengkap, preview PR jalan |
| 7–9 | Produksi icon: 100 icon ([04 §4.10](./04-ai-generation-workflow.md#410-ritme-produksi-harian)) |
| 10–11 | Package React + website |
| 12–13 | Rilis `v0.1.0` senyap, pemakaian sendiri di proyek nyata |

### Risiko

| Risiko | Dampak | Kemungkinan | Mitigasi |
|--------|--------|-------------|----------|
| Design system diubah setelah 60 icon dibuat | Tinggi | Sedang | Bekukan setelah 20 anchor; perubahan setelah itu butuh alasan tertulis |
| Kualitas AI di bawah harapan | Tinggi | Sedang | Anggaran 8 kandidat/icon sudah memperhitungkan tingkat lolos ~12% ([04 §4.11](./04-ai-generation-workflow.md#411-standar-kualitas--tingkat-penerimaan-yang-diharapkan)) |
| Waktu habis di tooling, bukan icon | Sedang | **Tinggi** | Batas keras: 4 minggu untuk seluruh tooling. Lewat itu, pakai yang ada dan lanjut menggambar |
| Ruang lingkup melebar (Vue/MCP/Figma lebih awal) | Sedang | Tinggi | Ditulis eksplisit di sini: tidak ada di Phase 1 |

Risiko ketiga adalah yang paling nyata untuk founder teknis: tooling terasa produktif dan tidak pernah selesai. Batas empat minggu itu mengikat.

### Metrik Sukses

| Metrik | Target |
|--------|--------|
| Icon shipped | 100 |
| Konsistensi (audit picing lolos) | 100% |
| Waktu validate lokal | < 5 dtk |
| Waktu produksi per icon | < 20 mnt |
| GitHub stars | 500 (organik, tanpa promosi) |
| Proyek sendiri yang memakainya | ≥ 1 |

---

## 16.3 Phase 2 — Launch (Bulan 4–6)

**Tujuan**: peluncuran publik dan pengguna nyata pertama.

### Deliverables

| # | Deliverable | Definisi selesai |
|---|-------------|------------------|
| 1 | **300 icon kumulatif** | +200 dari Phase 1 |
| 2 | `@iconmind/vue` | Terbit, paritas penuh dengan React ([11](./11-vue-package.md)) |
| 3 | `@iconmind/mcp` | Terbit, jalan di Claude Desktop & Claude Code ([13](./13-mcp-server.md)) |
| 4 | File Figma Community | Terbit ([12](./12-figma-strategy.md)) |
| 5 | Website v2 | Categories, Roadmap, Changelog, ⌘K |
| 6 | Dokumentasi lengkap | 10 halaman docs |
| 7 | **Peluncuran publik** | GitHub, PH, HN, Reddit, X, Figma ([17](./17-launch-strategy.md)) |
| 8 | CODEOWNERS + category owner pertama | ≥1 orang selain founder bisa approve |

### Milestone

| Minggu | Milestone |
|--------|-----------|
| 14–17 | Produksi icon ke 250 |
| 18 | Package Vue + MCP server |
| 19 | File Figma + persiapan aset peluncuran |
| 20 | Website v2 + docs lengkap |
| 21 | **Peluncuran** (Selasa/Rabu, lihat [17](./17-launch-strategy.md)) |
| 22–26 | Tanggapi gelombang masukan, 300 icon, rilis `v1.0.0` |

### Risiko

| Risiko | Dampak | Kemungkinan | Mitigasi |
|--------|--------|-------------|----------|
| Peluncuran sepi | Tinggi | Sedang | Enam kanal terpisah; kegagalan satu kanal tidak fatal ([17](./17-launch-strategy.md)) |
| Gelombang issue melebihi kapasitas | Sedang | Sedang | Kosongkan minggu 21–22 dari produksi icon; hanya tanggapi |
| Kritik "kenapa tidak kontribusi ke Lucide saja" | Sedang | **Tinggi** | Jawaban sudah disiapkan: scope creep. Ditulis di FAQ dan komentar peluncuran ([01 §1.4](./01-product-vision.md#14-kenapa-library-yang-ada-tidak-cukup)) |
| Icon Phase 1 terlihat tidak konsisten di bawah sorotan | Tinggi | Rendah | Audit menyeluruh di minggu 20 sebelum peluncuran |

### Metrik Sukses

| Metrik | Target |
|--------|--------|
| Icon shipped | 300 |
| GitHub stars | 2.000 |
| npm downloads/minggu | 1.000 |
| Kontributor unik | 12 |
| Figma duplicates | 500 |
| Instalasi MCP server | 100 |
| Icon request masuk | 50 |

---

## 16.4 Phase 3 — Ekosistem (Bulan 7–9)

**Tujuan**: berubah dari "proyek satu orang" menjadi "proyek yang punya komunitas".

### Deliverables

| # | Deliverable | Definisi selesai |
|---|-------------|------------------|
| 1 | **500 icon kumulatif** | ≥15% berasal dari kontributor eksternal |
| 2 | Halaman Showcase | ≥10 proyek nyata ([08 §8.11](./08-website.md#811-showcase--showcase)) |
| 3 | Maintainer kedua | Punya akses merge penuh ([15 §15.7](./15-open-source-strategy.md#157-governance-dan-bus-factor)) |
| 4 | Search v2 | Sintaks filter, saran nol-hasil, analitik jalan |
| 5 | MCP server v2 | `get_icon_code`, kedua prompt, dipakai nyata |
| 6 | Integrasi ekosistem | Terdaftar di direktori icon, awesome-list, registry MCP |
| 7 | GitHub Sponsors | Aktif |
| 8 | Audit konsistensi kuartalan | Seluruh set ditinjau ulang ([04 §4.12](./04-ai-generation-workflow.md#412-menjaga-konsistensi-seiring-waktu)) |

### Milestone

| Minggu | Milestone |
|--------|-----------|
| 27–30 | 400 icon, onboarding category owner |
| 31–32 | Search v2 + MCP v2 |
| 33–34 | Showcase, integrasi ekosistem, Sponsors |
| 35–39 | 500 icon, audit kuartalan, rilis `v1.5.0` |

### Risiko

| Risiko | Dampak | Kemungkinan | Mitigasi |
|--------|--------|-------------|----------|
| Momentum pasca-peluncuran habis | Tinggi | **Tinggi** | Ritme rilis 2 minggu; konten visual tiap rilis ([15 §15.8](./15-open-source-strategy.md#158-manajemen-komunitas)) |
| Kualitas turun karena PR eksternal | Tinggi | Sedang | CI gate + review manusia tidak dilonggarkan, apa pun tekanannya |
| Kelelahan maintainer | Tinggi | **Tinggi** | Kurangi target icon sebelum mengurangi waktu tanggap; delegasikan ke category owner |
| Library besar menambah kategori AI | Tinggi | Rendah | Perdalam MCP/RAG — bagian yang paling lambat ditiru ([01 §1.5](./01-product-vision.md#15-ai-era-opportunity)) |

Dua risiko dengan kemungkinan tinggi di phase ini keduanya tentang stamina, bukan teknis. Itu pola normal untuk proyek open source bulan ke-7.

### Metrik Sukses

| Metrik | Target |
|--------|--------|
| Icon shipped | 500 |
| GitHub stars | 4.000 |
| npm downloads/minggu | 5.000 |
| Kontributor unik | 30 |
| Icon dari kontributor eksternal | ≥ 75 |
| Figma duplicates | 2.000 |
| Proyek di showcase | 10 |
| Waktu tanggap PR median | < 48 jam |

---

## 16.5 Phase 4 — Skala (Bulan 10–12)

**Tujuan**: menjadi jawaban baku ketika seseorang bertanya "icon untuk produk AI, pakai apa?"

### Deliverables

| # | Deliverable | Definisi selesai |
|---|-------------|------------------|
| 1 | **1000 icon kumulatif** | Termasuk backlog request komunitas |
| 2 | Plugin Figma | Terbit ([12 §12.9](./12-figma-strategy.md#129-plugin-figma-opsional-phase-4)) |
| 3 | Cakupan platform | Svelte **atau** Solid (satu, dipilih dari permintaan nyata) |
| 4 | Website v3 | Perbandingan, halaman kategori kaya konten, SEO matang |
| 5 | Discord | Dibuka — sekarang ada cukup orang untuk mengisinya |
| 6 | ADR | `docs/decisions/` berisi keputusan besar |
| 7 | Rencana Tahun 2 | Diputuskan berdasarkan data pemakaian, bukan tebakan |

### Milestone

| Minggu | Milestone |
|--------|-----------|
| 40–43 | 700 icon, plugin Figma |
| 44–46 | Package platform ketiga, website v3 |
| 47–49 | 900 icon, Discord, ADR |
| 50–52 | 1000 icon, rilis `v2.0.0`, retrospektif tahunan |

### Risiko

| Risiko | Dampak | Kemungkinan | Mitigasi |
|--------|--------|-------------|----------|
| Pergeseran gaya antara icon awal dan akhir | Tinggi | **Tinggi** | Anchor set + audit kuartalan ke-3 dan ke-4 |
| 1000 icon terasa berlebihan tanpa navigasi baik | Sedang | Sedang | Search v2 + halaman kategori kaya konten |
| Menyebar terlalu tipis ke banyak platform | Sedang | Sedang | Hanya satu platform baru, dipilih dari data permintaan |
| Icon berkualitas rendah menumpuk di ekor daftar | Sedang | Sedang | Audit kuartalan berwenang **menghapus** icon lewat jalur deprecation |

Risiko pertama adalah yang paling mungkin benar-benar terjadi. Icon nomor 900 digambar oleh orang yang seleranya sudah berubah selama sembilan bulan — anchor set adalah satu-satunya penangkal yang bekerja.

### Metrik Sukses

| Metrik | Target |
|--------|--------|
| Icon shipped | 1.000 |
| GitHub stars | 8.000 |
| npm downloads/minggu | 15.000 |
| Kontributor unik | 60 |
| Figma duplicates | 6.000 |
| Instalasi MCP server | 2.000 |
| Bus factor | ≥ 2 |

---

## 16.6 Ringkasan Kuartalan

| | P1 (M0–3) | P2 (M4–6) | P3 (M7–9) | P4 (M10–12) |
|---|---|---|---|---|
| **Fokus** | Fondasi | Peluncuran | Komunitas | Skala |
| **Icon** | 100 | 300 | 500 | 1.000 |
| **Package** | icons, react | +vue, +mcp | — | +1 platform |
| **Stars** | 500 | 2.000 | 4.000 | 8.000 |
| **Downloads/mgg** | 200 | 1.000 | 5.000 | 15.000 |
| **Kontributor** | 3 | 12 | 30 | 60 |
| **Figma dup.** | — | 500 | 2.000 | 6.000 |
| **Risiko utama** | Ruang lingkup melebar | Peluncuran sepi | Momentum habis | Pergeseran gaya |

## 16.7 Apa yang Membuat Rencana Ini Gagal

Empat mode kegagalan yang paling mungkin, ditulis supaya bisa dikenali lebih awal:

1. **Tooling tak berujung.** Enam bulan membangun engine sempurna, 40 icon jadi. *Tanda awal*: minggu ke-5 masih menambah rule validator. *Tindakan*: berhenti, gambar icon.
2. **Peluncuran terlalu cepat.** Meluncur di Phase 1 dengan 100 icon, mendapat perhatian sekali, tidak ada yang kembali. *Tanda awal*: dorongan untuk memposting sebelum ada bukti pemakaian. *Tindakan*: tunggu Phase 2.
3. **Kualitas dikorbankan demi jumlah.** Mengejar 1000 dengan melonggarkan review di bulan ke-9. *Tanda awal*: tingkat lolos review naik di atas 20%. *Tindakan*: turunkan target jumlah, bukan standar.
4. **Kelelahan diam-diam.** Berhenti tanpa mengumumkan; komunitas menyimpulkan proyek mati. *Tanda awal*: waktu tanggap PR melewati satu minggu. *Tindakan*: umumkan penurunan ritme secara terbuka; itu jauh lebih baik daripada senyap.

Rencana yang tidak menyebutkan cara ia bisa gagal adalah rencana yang belum diuji.
