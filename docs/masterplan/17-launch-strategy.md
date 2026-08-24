# 17 — Launch Strategy

> Waktu: awal Phase 2, sekitar minggu ke-20 ([16 §16.3](./16-roadmap.md#163-phase-2--launch-bulan-46)). Target angka: [CANON C6](./CANON.md#c6-angka-target-dipakai-di-doc-01-16-17).

---

## 17.1 Prinsip

**Peluncuran adalah satu kali. Yang menentukan hasilnya adalah apa yang sudah ada sebelum tombol ditekan, bukan seberapa keras tombolnya ditekan.**

Empat prasyarat yang tidak bisa ditawar:

| Prasyarat | Kenapa mengikat |
|-----------|-----------------|
| ≥250 icon terbit | Di bawah itu, komentar pertama akan berbunyi "menarik, kabari kalau sudah lengkap" — dan tidak ada yang kembali |
| Website cepat dan sudah dipoles | Trafik peluncuran hanya datang sekali; situs yang lambat membuang seluruhnya |
| Package benar-benar berfungsi | Satu tweet "instalnya error" pada jam pertama akan menenggelamkan sisanya |
| Ada bukti pemakaian nyata | Minimal satu proyek yang benar-benar memakainya |

**Enam kanal, dijadwalkan berurutan dalam satu minggu**, bukan sekaligus. Alasannya praktis: satu orang tidak bisa menanggapi komentar di enam tempat sekaligus, dan menanggapi komentar adalah bagian yang paling menentukan hasil.

**Hari**: mulai **Selasa** atau **Rabu**. Senin tenggelam oleh backlog akhir pekan; Kamis–Jumat kehilangan momentum ke akhir pekan.

## 17.2 Jadwal Satu Minggu

| Hari | Kanal | Jam (WIB) | Tujuan |
|------|-------|-----------|--------|
| **H-7** | Persiapan aset | — | Semua materi jadi, tidak ada yang dibuat mendadak |
| **Selasa** | GitHub + X | 20:00 | Fondasi; semua tautan lain mengarah ke sini |
| **Selasa** | Hacker News (Show HN) | 20:30 | Audiens paling teknis, paling awal |
| **Rabu** | Product Hunt | 15:00 | Reset ranking PH jam 00:01 PT |
| **Kamis** | Reddit (r/webdev, r/reactjs) | 21:00 | |
| **Jumat** | Figma Community | 22:00 | |
| **Sabtu** | Reddit (r/LocalLLaMA, r/opensource) | 21:00 | Audiens AI, lebih aktif di akhir pekan |
| **H+7** | Rekap & tindak lanjut | — | Post "minggu pertama", tanggapi semua issue |

Jam dipilih agar berimpit dengan pagi hari di zona waktu AS — di situlah mayoritas audiens HN, PH, dan Reddit berada.

## 17.3 GitHub

Repo adalah tujuan akhir semua kanal lain. Semua yang lain hanya lalu lintas.

**README** — struktur yang sudah terbukti untuk icon library:

```
[Grid preview 32 icon — PNG statis]

# IconMind
Icon open source untuk perangkat lunak era AI —
LLM, agents, MCP, RAG, dan segala yang ada di sekitarnya.

[badge npm] [badge lisensi] [badge icon count] [badge stars]

[Browse icons →]  [Docs →]  [Figma →]

## Install
npm i @iconmind/react

## Pakai
<AgentMemory size={24} />

[GIF: mengetik di search, klik salin, tempel di kode — 8 detik]

## Kategori
[12 kartu kategori dengan icon contoh]

## Kenapa IconMind
[3 kalimat + tabel perbandingan singkat]
```

**Yang paling menentukan**: grid preview di paling atas dan GIF. Icon library tanpa gambar di README adalah kesalahan yang tidak bisa ditebus oleh teks sebagus apa pun.

**Sebelum peluncuran:**
- [ ] Topics: `icons`, `svg`, `react`, `vue`, `ai`, `llm`, `agents`, `mcp`, `rag`, `icon-library`, `design-system`
- [ ] Deskripsi repo = satu kalimat posisi ([08 §8.3](./08-website.md#83-home--))
- [ ] Social preview image 1280×640
- [ ] ≥15 `good first issue` tersedia
- [ ] Release `v1.0.0` dengan catatan rilis bergambar
- [ ] Discussions aktif dengan 3 thread pembuka

## 17.4 Hacker News

Kanal dengan potensi tertinggi dan risiko tertinggi.

**Judul**: `Show HN: IconMind – Open-source icons for AI, agents, MCP and RAG`

Yang tidak boleh ada di judul: kata "revolutionary", emoji, tanda seru, dan angka yang terdengar seperti klaim pemasaran.

**Komentar pertama** (post sendiri, segera setelah submit) — bagian terpenting dari seluruh peluncuran HN:

> I built this because I kept running out of icons while making UI for agents and RAG pipelines. Lucide and Phosphor are excellent for general UI, but they have no vocabulary for *context window*, *reranker*, *tool calling*, or *MCP resource* — and I don't think they should; that's scope creep for a generalist set.
>
> So this complements them rather than replacing them. The 24px grid and 2px stroke deliberately match Lucide so the two can sit side by side without clashing.
>
> Icons are drafted with AI and reviewed by hand — roughly 1 in 8 candidates survives. Every design rule and the validator that enforces it are open source in the repo.
>
> There's also an MCP server, so AI coding assistants can search for and insert icons that actually exist instead of inventing names.
>
> MIT, all of it. I'll be around all day — ask me anything.

Komentar ini ditulis dalam bahasa Inggris seperti seluruh materi peluncuran ([CANON C11](./CANON.md#c11-kebijakan-bahasa)). Empat hal yang dilakukannya: menjelaskan asal-usul yang jujur, mendahului keberatan terbesar ("kenapa tidak kontribusi ke Lucide"), mengakui peran AI secara terbuka (menyembunyikannya jauh lebih berisiko), dan menyebut MCP — bagian yang paling mungkin membuat HN tertarik.

**Aturan selama 6 jam pertama**: balas setiap komentar. Untuk kritik teknis, akui dulu, lalu jawab. Jangan pernah defensif. Komentar bernada "ini cuma AI slop" dijawab dengan menunjukkan validator, checklist review, dan tingkat penolakan 88% — bukan dengan membantah.

**Kalau tidak masuk front page**: itu hasil yang paling umum dan bukan kegagalan. Jangan repost. Lima kanal lain tetap berjalan.

## 17.5 Product Hunt

**Tagline**: `Open-source icons for AI, agents, MCP and RAG`

**Aset**: thumbnail GIF (grid icon beranimasi), 6 galeri (grid icon, halaman browse, contoh kode React, MCP server beraksi, file Figma, tabel perbandingan).

**Komentar maker** — nada berbeda dari HN, lebih ke produk dan lebih hangat, tapi tetap tanpa hiperbola.

**Persiapan**: kabari 20–30 orang secara pribadi sehari sebelumnya. Jangan meminta upvote; minta mereka melihat dan memberi masukan. PH mendeteksi pola voting yang tidak wajar, dan sanksinya tidak sepadan.

**Realistis**: PH bagus untuk audiens desainer dan pembuat produk, tapi konversi ke pemakaian aktual lebih rendah daripada HN untuk developer tool. Perlakukan sebagai kanal jangkauan, bukan kanal adopsi.

## 17.6 Reddit

Aturan yang menentukan segalanya: **setiap subreddit punya norma sendiri, dan post yang sama di semua tempat akan ditolak di semua tempat.**

| Subreddit | Sudut pandang | Catatan |
|-----------|---------------|---------|
| r/webdev | Alat gratis untuk developer | Baca aturan self-promo; sebagian butuh flair |
| r/reactjs | Fokus package React & tree shaking | Sertakan contoh kode nyata |
| r/vuejs | Fokus package Vue & Nuxt | Post setelah Vue terbit |
| r/opensource | Cerita membangun & lisensi MIT | Audiens ramah, konversi rendah |
| r/LocalLLaMA | Icon untuk UI agent/RAG lokal | **Paling relevan**; sangat teknis, sangat peka terhadap promosi |
| r/Figma | File komunitas | Post bersamaan dengan peluncuran Figma |

Pola yang bekerja: **buka dengan masalahnya, bukan dengan produknya.**

> I got tired of using a generic "robot" icon for every agent concept, so I drew 300 icons for the vocabulary people actually use — context window, reranker, tool calling, MCP resource. All MIT.

Jangan pernah post ke lebih dari dua subreddit dalam sehari.

## 17.7 X / Twitter

**Thread peluncuran**, 6–8 post, satu gambar per post:

1. Hook + grid preview → *"An icon library for the things that don't have icons yet."*
2. Masalah → tangkapan layar UI yang memakai icon salah arti
3. Solusi → grid kategori
4. Contoh kode React → tangkapan layar kode
5. MCP server → GIF AI memilih icon
6. Figma → tangkapan layar file
7. Open source, MIT, tautan
8. Ajakan: *"Which icon do you need? Reply here."*

Post terakhir bukan basa-basi — balasannya adalah backlog gratis dan memberi alasan untuk berinteraksi lagi dengan setiap orang yang membalas.

**Setelah peluncuran**, ritme yang menjaga akun hidup: satu post "icon baru minggu ini" (gambar), satu post di balik layar (proses/tooling), satu balasan ke pertanyaan komunitas. Tiga per minggu, konsisten, lebih baik daripada sepuluh lalu senyap.

**Sasaran interaksi**: orang yang membangun produk AI dan menyebut kesulitan UI. Balasan yang membantu di thread orang lain menghasilkan lebih banyak pengguna daripada post sendiri.

## 17.8 Figma Community

Mekanisme dan konten deskripsi ada di [12 §12.8](./12-figma-strategy.md#128-deskripsi-figma-community).

Yang khusus tentang peluncuran: **Figma Community adalah kanal dengan ekor terpanjang.** Post HN mati dalam 48 jam; file Figma terus ditemukan lewat pencarian internal Figma selama bertahun-tahun. Karena itu kualitas cover image dan kepadatan kata kunci di deskripsi jauh lebih berharga di sini daripada momentum hari peluncuran.

Publikasikan pada hari yang sama dengan post r/Figma.

## 17.9 Kanal Berkelanjutan (Setelah Peluncuran)

Peluncuran menghasilkan lonjakan. Ini yang menghasilkan pertumbuhan.

| Kanal | Ritme | Nilai |
|-------|-------|-------|
| **SEO halaman icon** | Pasif | 1000 halaman = 1000 pintu masuk. **Kanal terbesar dalam jangka panjang** ([08 §8.5](./08-website.md#85-icon-detail--iconsslug)) |
| Rilis 2 mingguan | Tiap 2 minggu | Konten visual + sinyal repo hidup |
| Awesome-list & direktori | Sekali, lalu jaga | `awesome-mcp-servers`, direktori icon, registry MCP |
| Balas di komunitas | Harian | Discord/Reddit AI ketika orang bertanya soal icon |
| Showcase | Bergulir | Bukti sosial + backlink dua arah |
| Konten "cara kami membangun" | Bulanan | Post teknis tentang engine/AI workflow menarik audiens berbeda |

Baris pertama layak ditekankan: dalam 12 bulan, pencarian organik hampir pasti akan mengalahkan seluruh kanal peluncuran digabung. Peluncuran membeli waktu; SEO membangun basis.

## 17.10 Materi yang Harus Siap Sebelum H-7

- [ ] PNG grid icon (1200×630) untuk README dan OG
- [ ] GIF demo 8 detik: search → salin → tempel
- [ ] GIF MCP server beraksi
- [ ] 6 gambar galeri Product Hunt
- [ ] Cover Figma 1920×960
- [ ] Tangkapan layar contoh kode React & Vue
- [ ] Tabel perbandingan dengan Lucide/Heroicons/Phosphor
- [ ] Teks siap tempel untuk keenam kanal
- [ ] FAQ untuk keberatan yang bisa diperkirakan ([§17.12](#1712-keberatan-yang-akan-muncul))
- [ ] Satu proyek nyata yang memakainya, bisa ditunjukkan

## 17.11 Metrik Peluncuran

| Metrik | Minimum | Bagus | Sangat baik |
|--------|---------|-------|-------------|
| GitHub stars (minggu 1) | 300 | 1.000 | 3.000 |
| Poin HN | 50 | 200 | 500 |
| Upvote PH | 100 | 300 | 800 |
| npm downloads (minggu 1) | 200 | 800 | 2.500 |
| Figma duplicates (minggu 1) | 50 | 200 | 600 |
| Icon request masuk | 10 | 40 | 100 |

Baris terakhir adalah sinyal paling jujur: orang hanya meminta icon dari library yang benar-benar berniat mereka pakai.

## 17.12 Keberatan yang Akan Muncul

Siapkan jawabannya sebelum peluncuran, bukan saat komentar sudah masuk.

| Keberatan | Jawaban |
|-----------|---------|
| *"Why not just contribute to Lucide?"* | 500+ icon domain-spesifik adalah scope creep untuk icon set generalis. Kami sengaja kompatibel secara visual supaya bisa dipakai berdampingan. |
| *"Ini AI slop."* | Setiap icon melewati validator otomatis dan review manusia; sekitar 88% kandidat dibuang. Aturan dan validatornya open source — silakan periksa. |
| *"Icon AI tidak punya makna yang disepakati."* | Benar, dan itu justru alasan proyek ini ada. Menetapkan kosakata visual adalah pekerjaannya. |
| *"1000 icon terlalu banyak."* | Tree shaking membuat Anda hanya membayar yang dipakai — 3 icon ≈ 1.5 KB. |
| *"Bagaimana kalau proyeknya mati?"* | MIT, tanpa backend, tanpa akun. Icon yang sudah Anda pakai tetap bekerja selamanya. |
| *"Kenapa tidak berbayar?"* | Icon set berbayar tidak pernah menjadi standar. Standar adalah tujuannya. |
| *"Bedanya dengan icon AI di Figma?"* | Itu file statis. Ini punya package, tipe, MCP server, dan proses kontribusi. |

Nada semua jawaban sama: akui bagian yang benar dari keberatannya, lalu jelaskan pilihan yang diambil. Jawaban yang tidak mengakui apa pun terbaca sebagai pemasaran, dan pemasaran adalah hal yang paling cepat ditolak audiens ini.
