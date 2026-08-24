# 04 — AI Generation Workflow

> Aturan desain yang dirujuk sepanjang dokumen ini ada di [03](./03-design-system.md). Sumber daftar icon: [02b](./02b-icon-catalog.md).

---

## 4.1 Premis

AI tidak menggantikan desainer icon. AI **memindahkan bottleneck**: dari *menggambar* ke *menilai*.

Konsekuensi praktisnya:
- Menghasilkan 40 kandidat SVG butuh ~10 menit.
- Menilai 40 kandidat dengan benar butuh ~90 menit.
- **Kapasitas realistis solo founder: 8–12 icon lolos per hari kerja.**

Itulah angka yang mendasari roadmap di [16](./16-roadmap.md). Rencana yang mengasumsikan 50 icon/hari akan gagal, bukan karena AI-nya kurang cepat, tapi karena mata manusia tidak bisa menilai secepat itu.

**Kejujuran soal keterbatasan AI**: model bahasa menghasilkan SVG dari koordinat, tanpa benar-benar "melihat" hasilnya. Model bagus dalam bentuk geometris sederhana dan komposisi konvensional; buruk dalam kurva halus, keseimbangan optis, dan metafora baru. Workflow ini dirancang mengelilingi kenyataan tersebut: AI mengerjakan bagian yang mekanis, manusia mengerjakan bagian yang tidak bisa dinilai tanpa mata.

## 4.2 Pipeline

```
  ┌────────┐   ┌──────────┐   ┌────────┐   ┌─────────┐
  │  IDEA  │──▶│ TAXONOMY │──▶│ PROMPT │──▶│ GENERATE│
  └────────┘   └──────────┘   └────────┘   └─────────┘
   issue,        domain +       template      8 kandidat
   backlog,      subcat +       terisi        per icon
   0-hasil       metafora
                                                  │
  ┌────────┐   ┌──────────┐   ┌────────┐   ┌──────▼──┐
  │PUBLISH │◀──│ OPTIMIZE │◀──│VALIDATE│◀──│ REVIEW  │
  └────────┘   └──────────┘   └────────┘   └─────────┘
   changeset     SVGO 4        aturan 03      mata
   + release     + normalize   otomatis       manusia
```

**Tahap 1–3 murah dan bisa di-batch. Tahap 4 mahal. Tahap 5–7 gratis (otomatis).**
Maka: batch besar di depan, dan **jangan pernah** kirim kandidat ke review sebelum lolos validasi otomatis. Membiarkan mata memeriksa hal yang bisa dicek mesin adalah pemborosan sumber daya paling langka yang kita punya.

## 4.3 Tahap 1 — Idea

Sumber ide, diurutkan berdasarkan kualitas sinyal:

| Sumber | Kualitas | Cara mengambil |
|--------|----------|----------------|
| Query nol-hasil di situs | ★★★★★ | Log pencarian anonim ([09](./09-search-system.md)) |
| GitHub issue request dengan ≥3 👍 | ★★★★★ | Label `icon-request` |
| Set yang tidak lengkap | ★★★★☆ | Script cek varian modifier yang hilang |
| Katalog [02b](./02b-icon-catalog.md) | ★★★☆☆ | Ambil batch phase berjalan |
| Brainstorm AI atas dokumentasi domain | ★★☆☆☆ | Sumber terakhir, banyak duplikat |

Query nol-hasil adalah sinyal terbaik karena terekam otomatis tanpa pengguna perlu berbuat apa pun.

## 4.4 Tahap 2 — Taxonomy

Sebelum satu prompt pun ditulis, setiap icon harus punya **spec** ini:

```yaml
slug: agent-memory
domain: agents
subcategory: memory
concept: "Ingatan yang dimiliki agent"
metaphor: "Bentuk agent + elemen penyimpanan"
must_have: ["indikator entitas agent", "indikator penyimpanan"]
must_not: ["otak literal", "chip komputer", "wajah robot"]
neighbors: ["memory-short-term", "memory-long-term", "scratchpad"]
reference: "Silinder database di 03 §3.6"
```

**Field `must_not` adalah field terpenting.** Tanpa itu, AI akan default ke klise (otak, robot berwajah, sirkuit) dan setiap batch akan berisi variasi klise yang sama.

**Field `neighbors` mencegah tabrakan.** Kalau `agent-memory` dan `memory-long-term` digambar mirip, keduanya jadi tidak berguna. Spec harus menyatakan apa yang membedakan.

## 4.5 Tahap 3 — Prompt Template

### Template A — Generasi Batch (paling sering dipakai)

```
Kamu menggambar icon untuk IconMind, icon set open source bergaya
outline stroke. Keluaran HANYA SVG, tanpa penjelasan.

ATURAN MENGIKAT (pelanggaran = kandidat ditolak):
- viewBox="0 0 24 24", width/height 24
- fill="none", stroke="currentColor", stroke-width="2"
- stroke-linecap="round", stroke-linejoin="round"
- Semua bentuk di dalam area 2..22 (padding 2px di semua sisi)
- Semua koordinat kelipatan 0.5
- Elemen yang diizinkan: path, circle, rect, line, polyline, polygon, ellipse
- DILARANG: style, class, id, transform, warna literal, text, filter,
  mask, clipPath, group tanpa alasan, stroke-dasharray
- Maksimum 12 elemen anak
- Jarak antar stroke sejajar minimal 2px
- Elemen terkecil minimal 2px
- Diagonal hanya 45° atau 30°/60°
- Radius sudut: 2 untuk bentuk ≥16px, 1 untuk bentuk <16px

ICON: {slug}
KONSEP: {concept}
METAFORA: {metaphor}
HARUS ADA: {must_have}
DILARANG ADA: {must_not}
TETANGGA (harus terlihat berbeda dari ini): {neighbors}

Hasilkan {n} varian berbeda. Setiap varian harus memakai pendekatan
komposisi yang benar-benar berbeda, bukan versi geser dari varian lain.
Bungkus tiap varian dalam blok kode terpisah dengan komentar
<!-- variant-N: penjelasan satu baris pendekatannya -->
```

`n = 8` adalah titik hasil terbaik. Di bawah 5, kemungkinan tidak ada yang bagus. Di atas 10, varian mulai berulang dan waktu review membengkak.

### Template B — Perbaikan Terarah

Dipakai ketika satu kandidat sudah 80% benar.

```
SVG berikut hampir benar tapi punya masalah spesifik ini:
{daftar masalah, satu per baris, konkret}

Perbaiki HANYA masalah tersebut. Jangan mendesain ulang.
Pertahankan komposisi keseluruhan dan semua koordinat yang tidak
berkaitan dengan masalah di atas.

{svg}
```

Aturan penting: **maksimal 2 putaran perbaikan.** Kalau setelah dua kali masih belum benar, buang dan mulai dari prompt baru. Perbaikan berulang menghasilkan SVG yang makin kacau koordinatnya.

### Template C — Konsistensi Keluarga

Dipakai untuk membuat varian modifier dan anggota sub-kategori.

```
Ini adalah icon dasar "{base_slug}" yang sudah disetujui:
{svg_base}

Buat "{new_slug}" yang jelas satu keluarga dengan icon di atas.
Pertahankan bentuk dasar persis sama, koordinat identik.
Perubahan yang diizinkan hanya: {perubahan_spesifik}

Untuk modifier badge: pusat di (18, 18), radius efektif 4px, dan
potong bentuk utama agar ada ruang bersih 1px di sekitar badge.
```

Template C adalah **pengungkit produktivitas terbesar** dalam sistem ini — sekitar 40% dari 621 concept di [02b](./02b-icon-catalog.md) adalah varian yang bisa diturunkan dari icon dasar yang sudah disetujui.

### Template D — Kritik Sebelum Review Manusia

Dipakai sebagai penyaring: AI menilai keluaran AI.

```
Nilai kandidat SVG icon ini terhadap kriteria berikut.
Untuk setiap kriteria beri PASS atau FAIL plus satu kalimat alasan.
Bersikaplah keras — default-nya FAIL kalau ragu.

1. Apakah artinya bisa ditebak tanpa label?
2. Apakah masih terbaca kalau dirender 16px?
3. Apakah ada stroke sejajar berjarak kurang dari 2px?
4. Apakah ada elemen lebih kecil dari 2px?
5. Apakah ada diagonal di luar 45°/30°/60°?
6. Apakah komposisinya seimbang di dalam area 2..22?
7. Apakah memakai klise (otak, robot berwajah, sirkuit, bola lampu)?
8. Apakah jumlah elemen bisa dikurangi tanpa kehilangan makna?

{svg}
```

Template D biasanya membuang 3–5 dari 8 kandidat sebelum manusia melihatnya. Ini menghemat waktu review 40–60%, dan itu adalah penghematan pada sumber daya yang paling langka.

## 4.6 Tahap 4 — Human Review Checklist

Dijalankan pada kandidat yang lolos Template D **dan** validator otomatis.

**Fase A — Makna** (buang cepat)
- [ ] Bisa saya tebak artinya tanpa label?
- [ ] Metaforanya benar untuk domainnya, bukan sekadar "terlihat teknologi"?
- [ ] Berbeda cukup jelas dari `neighbors` yang tercantum di spec?
- [ ] Bebas dari klise di `must_not`?

**Fase B — Bentuk**
- [ ] Berat optisnya menyatu dengan 20 icon di sekitarnya? (uji picing, [03 §3.9](./03-design-system.md#39-uji-kualitas-wajib))
- [ ] Seimbang secara optis di dalam area 2..22, bukan sekadar seimbang matematis?
- [ ] Metafora bersamanya konsisten dengan tabel di [03 §3.6](./03-design-system.md#36-konsistensi-optis-yang-tidak-bisa-dicek-mesin)?
- [ ] Bisakah satu elemen dihapus tanpa kehilangan makna? (kalau bisa, hapus)

**Fase C — Skala**
- [ ] Terbaca di 16px?
- [ ] Terbaca di 48px tanpa terlihat kosong atau kaku?
- [ ] Tetap seimbang saat diinversi (putih di atas hitam)?

**Fase D — Sistem**
- [ ] Slug mengikuti [02 §2.5](./02-icon-taxonomy.md#25-prinsip-penamaan-icon)?
- [ ] Bukan duplikat dari icon yang sudah ada? (dicek mesin, tapi lihat juga hasilnya)
- [ ] Tags dan aliases sudah diisi ([07](./07-metadata-system.md))?
- [ ] Kalau ini bagian keluarga, semua saudaranya masih konsisten?

**Aturan keputusan**: FAIL di Fase A → buang, jangan diperbaiki. FAIL di Fase B/C → Template B, maksimal 2 putaran. FAIL di Fase D → perbaiki metadata, bukan gambarnya.

## 4.7 Tahap 5 — Validation

Otomatis, dijalankan lokal via `pnpm icons:validate` dan di CI. Aturan lengkap ada di [06 §6.2](./06-svg-engine.md#62-validator). Kalau gagal, kandidat tidak pernah sampai ke mata manusia.

## 4.8 Tahap 6 — Optimization

Otomatis, `pnpm icons:optimize`. Detail di [06 §6.3](./06-svg-engine.md#63-optimizer).
Prinsip yang membedakan optimizer kami dari SVGO polos: **normalisasi ke bentuk kanonik**, bukan sekadar mengecilkan ukuran. Dua icon yang identik secara visual harus menghasilkan byte yang identik — itu prasyarat deteksi duplikat yang bisa dipercaya.

## 4.9 Tahap 7 — Publish

1. Tambah file `<slug>.svg` + `<slug>.json` ke `packages/icons/icons/<domain>/`.
2. `pnpm changeset` → pilih `minor` untuk icon baru, `patch` untuk perbaikan icon lama.
3. PR → CI hijau → merge.
4. Release otomatis oleh `release.yml` ([14](./14-ci-cd.md)).

**Kebijakan versi**: icon baru = `minor`. Perubahan gambar pada icon yang sudah rilis = `minor` + catatan changelog (mengubah tampilan yang sudah dipakai orang bukan `patch`). Penghapusan atau rename = `major`, dan hanya boleh dengan alias deprecated yang bertahan minimal satu major.

## 4.10 Ritme Produksi Harian

Yang terbukti bisa dijalankan satu orang:

| Waktu | Kegiatan | Keluaran |
|-------|----------|----------|
| 30 mnt | Tulis spec untuk 12 icon (tahap 2) | 12 spec |
| 20 mnt | Generate batch, 8 kandidat masing-masing | ~96 kandidat |
| 15 mnt | Jalankan Template D + validator | ~35 kandidat tersisa |
| 90 mnt | Review manusia (tahap 4) | 8–12 lolos |
| 20 mnt | Perbaikan Template B untuk yang nyaris lolos | +1–3 lolos |
| 15 mnt | Metadata, changeset, PR | 1 PR |

**Total ~3 jam → 9–15 icon.** Lima hari kerja seminggu → 45–75 icon/bulan. Sesuai dengan target 100 icon di bulan ke-3 ([16](./16-roadmap.md)) dengan ruang gagal yang wajar.

## 4.11 Standar Kualitas — Tingkat Penerimaan yang Diharapkan

| Tahap | Masuk | Keluar | Tingkat lolos |
|-------|-------|--------|---------------|
| Generate | 1 spec | 8 kandidat | — |
| Validator otomatis | 8 | ~6 | 75% |
| Template D (kritik AI) | 6 | ~3 | 50% |
| Review manusia | 3 | ~1 | 33% |
| **Ujung ke ujung** | **8 kandidat** | **~1 icon** | **~12%** |

Angka ini penting untuk ekspektasi: **membuang 7 dari 8 kandidat adalah operasi normal**, bukan tanda ada yang salah. Kalau tingkat lolos naik jauh di atas 20%, kemungkinan besar standar review sedang mengendur.

## 4.12 Menjaga Konsistensi Seiring Waktu

Musuh terbesar set icon berumur panjang adalah **pergeseran gaya** — icon bulan ke-10 tidak lagi terlihat seperti icon bulan pertama.

Empat penangkalnya:

1. **Style anchor set.** Pilih 20 icon terbaik dari Phase 1, bekukan sebagai `packages/icons/__anchors__`. Setiap batch review baru dibandingkan langsung terhadap anchor ini, bukan terhadap batch kemarin.
2. **Audit kuartalan.** Setiap 3 bulan, render seluruh set jadi satu grid PNG dan pindai secara visual. Yang menyimpang di-refactor.
3. **Snapshot visual di CI.** Playwright memotret grid ikon; perubahan tak terduga pada icon lama muncul sebagai diff ([14](./14-ci-cd.md)).
4. **Contoh dalam prompt.** Template A boleh menyertakan 2–3 SVG anchor dari sub-kategori yang sama sebagai referensi gaya. Ini mahal di token tapi sangat efektif untuk keluarga icon.

## 4.13 Etika dan Orisinalitas

- **Jangan pernah** menyuruh AI meniru icon set tertentu ("buat seperti Lucide"). Kesamaan grid dan stroke adalah konvensi teknis; peniruan bentuk adalah pelanggaran.
- Metafora umum (silinder = database, gembok = keamanan) adalah bahasa bersama industri dan bebas dipakai. Bentuk spesifik yang khas dari satu set tidak.
- Kontributor wajib menyatakan karya orisinal di PR template ([15](./15-open-source-strategy.md)).
- Kalau ada kemiripan yang dilaporkan, kebijakannya: **gambar ulang lebih dulu, berdebat belakangan.** Reputasi jauh lebih mahal daripada satu icon.
