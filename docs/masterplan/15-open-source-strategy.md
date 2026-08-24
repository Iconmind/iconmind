# 15 — Open Source Strategy

> Lisensi: MIT untuk kode dan aset ([CANON C1](./CANON.md#c1-identitas)). Tiga tingkat kontribusi: [01 §1.7](./01-product-vision.md#17-strategi-pertumbuhan-komunitas).

---

## 15.1 Pemilihan Lisensi

**MIT, satu file `LICENSE`, berlaku untuk kode maupun icon.**

| Alternatif | Kenapa tidak dipilih |
|------------|----------------------|
| Dual MIT + CC-BY-4.0 | Terdengar rapi, tapi memaksa setiap pengguna memutuskan bagian mana yang mana. Terlihat "ada syaratnya" bahkan ketika tidak. |
| CC-BY-4.0 saja | Butuh atribusi. Perusahaan menghindarinya untuk aset UI. |
| Apache-2.0 | Punya klausul paten yang bagus, tapi lebih panjang dan lebih asing bagi kontributor icon. |
| ISC | Setara MIT secara praktis, tapi kurang dikenal. |

Yang paling penting: **friksi nol untuk pemakaian komersial, tanpa kewajiban atribusi.** Setiap syarat tambahan adalah alasan bagi tim legal untuk memilih library lain, dan keputusan itu terjadi tanpa kami pernah tahu.

Dinyatakan eksplisit di README dan `/docs/faq`:

> Gratis untuk pemakaian komersial. Tanpa atribusi. Tanpa syarat. Selamanya.

**Kepemilikan hak cipta**: kontributor mempertahankan hak cipta atas karyanya dan melisensikannya di bawah MIT lewat kontribusi (inbound=outbound). **Tidak ada CLA.** CLA adalah friksi besar untuk kontributor kasual dan hanya berguna kalau berencana mengubah lisensi di kemudian hari — yang justru tidak kami inginkan.

## 15.2 File Wajib Repo

| File | Isi |
|------|-----|
| `README.md` | Landing page **berbahasa Inggris**. Grid preview, install, contoh, tautan. Di bawah 3 layar. |
| `LICENSE` | MIT |
| `CONTRIBUTING.md` | Tiga jalur kontribusi, setup, checklist |
| `CODE_OF_CONDUCT.md` | Contributor Covenant 2.1 |
| `SECURITY.md` | Cara melapor kerentanan (email privat, bukan issue) |
| `CHANGELOG.md` | Dihasilkan Changesets |
| `.github/CODEOWNERS` | Pemilik per direktori — dasar untuk category owner |
| `.github/FUNDING.yml` | GitHub Sponsors |
| `.github/ISSUE_TEMPLATE/*` | Form terstruktur, bukan kotak teks kosong |
| `.github/PULL_REQUEST_TEMPLATE.md` | Checklist yang selaras dengan CI |

## 15.3 Panduan Kontributor

`CONTRIBUTING.md` disusun mengikuti tiga tingkat friksi ([01 §1.7](./01-product-vision.md#17-strategi-pertumbuhan-komunitas)) dan **dimulai dari yang paling mudah**. Kesalahan umum dokumen kontribusi adalah membuka dengan instruksi setup lingkungan — yang langsung mengusir 90% calon kontributor yang sebenarnya hanya ingin meminta satu icon.

**Bagian 1 — Minta icon (tanpa perlu coding)**
Tautan langsung ke issue form. Empat field: nama konsep, deskripsi satu kalimat, di mana akan dipakai, referensi visual opsional.

**Bagian 2 — Kirim icon**
```bash
git clone https://github.com/iconmind/iconmind.git
cd iconmind && pnpm install
pnpm icons:new agents agent-memory     # buat scaffold
# gambar icon-nya, isi metadata
pnpm icons:validate && pnpm icons:optimize
pnpm dev                                # lihat hasilnya
pnpm changeset                          # pilih minor
```
Disertai ringkasan aturan desain ([03](./03-design-system.md)) dan tautan ke halaman `/docs/design-guidelines` yang menampilkan aturan yang sama secara visual.

**Bagian 3 — Kontribusi kode**
Setup, struktur monorepo, cara menjalankan test, arsitektur singkat.

## 15.4 Issue Template

**`icon-request.yml`** — form paling penting di repo:

Ditulis dalam bahasa Inggris seperti seluruh permukaan kontributor ([CANON C11](./CANON.md#c11-kebijakan-bahasa)):

```yaml
name: Request an icon
description: Suggest a new icon
title: "[Icon] "
labels: ["icon-request"]
body:
  - type: input
    id: name
    attributes:
      label: Concept name
      placeholder: "agent memory"
    validations: { required: true }
  - type: textarea
    id: meaning
    attributes:
      label: What does it mean?
      description: One sentence. The concept, not the drawing.
    validations: { required: true }
  - type: input
    id: usecase
    attributes:
      label: Where would you use it?
      placeholder: "Status panel in an agent dashboard"
    validations: { required: true }
  - type: dropdown
    id: category
    attributes:
      label: Category
      options: [ai, agents, mcp, rag, data, devops, cloud, security,
                automation, analytics, devtools, interface, not sure]
  - type: textarea
    id: reference
    attributes:
      label: Visual reference (optional)
```

Field *"Where would you use it"* ada karena permintaan yang punya kasus pakai nyata hampir selalu menjadi icon yang lebih baik daripada permintaan yang hanya melengkapi daftar.

Issue dengan ≥3 👍 otomatis diberi label `priority` oleh workflow kecil, dan masuk ke urutan prioritas [02 §2.7](./02-icon-taxonomy.md#27-aturan-prioritas).

## 15.5 Aturan Pull Request

| Aturan | Nilai |
|--------|-------|
| Satu PR = satu icon atau satu keluarga icon | Memudahkan review dan revert |
| Nama branch | `icon/<slug>`, `feat/<topik>`, `fix/<topik>` ([CANON C9](./CANON.md#c9-konvensi-penamaan)) |
| Judul commit | Conventional Commits — `feat(agents): add agent-memory` |
| Changeset | Wajib untuk perubahan apa pun di `packages/**` |
| CI hijau | Wajib sebelum review manusia dimulai |
| Draft PR | Dianjurkan untuk pekerjaan yang belum selesai |
| Merge | Squash, judul commit = judul PR |

**Checklist PR template** sengaja dibuat pendek dan hanya berisi hal yang **tidak** bisa dicek CI:

```markdown
- [ ] This icon does not already exist (checked on iconmind.dev)
- [ ] Original work, not derived from another licensed icon set
- [ ] Viewed at 16px and still readable
- [ ] Compared against the other icons in the same subcategory
- [ ] Metadata filled in: English description and at least 3 tags
- [ ] `pnpm changeset` has been run
```

Checklist yang mengulang apa yang sudah divalidasi CI hanya mengajari orang mencentang tanpa membaca.

## 15.6 Proses Review

**Waktu tanggap yang dijanjikan** — dan ini janji yang paling menentukan apakah kontributor kedua akan datang:

| Jenis | Tanggapan pertama | Keputusan |
|-------|-------------------|-----------|
| Icon request | 48 jam | 1 minggu |
| PR icon | 48 jam | 1 minggu |
| PR kode | 72 jam | 2 minggu |
| Laporan bug | 24 jam | tergantung |
| Laporan keamanan | 24 jam | 7 hari |

**Urutan review icon:**
1. Baca komentar preview otomatis ([14 §14.3](./14-ci-cd.md#143-icon-checkyml--gerbang-kualitas-icon)) — sudah menjawab semua pertanyaan mekanis.
2. Lihat gambar "dalam konteks". Menyatu dengan tetangganya?
3. Lihat 16px. Terbaca?
4. Jalankan checklist Fase A–D ([04 §4.6](./04-ai-generation-workflow.md#46-tahap-4--human-review-checklist)).
5. Putuskan.

Target waktu review per icon: **di bawah 3 menit.** Kalau lebih lama, biasanya berarti icon-nya bermasalah atau tooling-nya kurang.

**Bahasa umpan balik.** Ditulis dalam bahasa Inggris, dan setiap penolakan harus punya tiga bagian: apa yang salah, aturan mana yang dilanggar, dan tawaran langkah berikutnya.

> Thanks for this! The base shape is right. Two things to fix before it can be merged:
>
> 1. The two inner lines are less than 2px apart, so they merge at 16px (`min-stroke-gap`, see the design guidelines).
> 2. It reads too close to `scratchpad` — we need a clearer distinction.
>
> If you want to keep going, I'd drop it to two lines and move the badge to the bottom right. If you're out of time, that's completely fine — just say so and I'll take it from here. You'll still be credited.

Kalimat terakhir penting: kontributor yang kehabisan waktu tidak boleh merasa PR-nya sia-sia.

**Kapan menutup PR:** hanya setelah dua kali follow-up tanpa respons dalam 30 hari, dengan komentar penutup yang ramah dan mengundang membuka ulang.

## 15.7 Governance dan Bus Factor

Repo yang bergantung pada satu orang akan mati ketika orang itu sibuk. Tiga langkah, dijadwalkan:

**Phase 2 — CODEOWNERS per direktori.** Kontributor dengan 10+ PR icon di-merge diundang menjadi *category owner* untuk satu domain: bisa me-review dan meng-approve PR icon di domainnya.

**Phase 3 — Maintainer kedua.** Satu orang dengan akses merge penuh. Kriteria: konsisten selama 3 bulan, penilaian desainnya selaras, dan komunikasinya baik dengan kontributor baru.

**Phase 4 — Keputusan didokumentasikan.** Setiap keputusan yang tidak jelas (kenapa icon X ditolak, kenapa taksonomi tidak diubah) ditulis sebagai ADR pendek di `docs/decisions/`. Ini yang membuat orang lain bisa membuat keputusan yang konsisten tanpa bertanya.

Model governance: **BDFL yang menua menjadi meritokrasi.** Di awal, keputusan desain butuh satu selera yang konsisten — desain oleh komite menghasilkan icon set yang tidak punya karakter. Seiring waktu, wewenang didelegasikan ke orang yang sudah membuktikan seleranya selaras.

## 15.8 Manajemen Komunitas

**Kanal, dan kenapa masing-masing dipilih:**

| Kanal | Peran | Kenapa |
|-------|-------|--------|
| GitHub Issues | Request, bug | Terlacak, bisa dicari, permanen |
| GitHub Discussions | Tanya jawab, ide | Menjaga Issues tetap bersih dan bisa ditindaklanjuti |
| X/Twitter | Pengumuman, icon baru | Tempat komunitas dev/design berada |
| Discord | **Tidak, sampai Phase 4** | Chat butuh kehadiran harian. Solo maintainer yang membuka Discord terlalu dini akan menciptakan ruang sepi yang justru merugikan citra proyek. |

**Ritme yang menjaga proyek terlihat hidup:**
- Rilis minor tiap 2 minggu, seberapa pun kecilnya.
- Satu post "icon baru minggu ini" di X, dengan gambar.
- Tanggapi setiap issue dan PR dalam 48 jam, bahkan hanya dengan "terima kasih, saya lihat akhir pekan ini".
- Update `good first issue` tiap minggu; jaga selalu ≥10 tersedia.

**Mengenali kontribusi**, karena ini yang membuat orang kembali:
- Field `contributors` di metadata icon ([07](./07-metadata-system.md)) → tampil di halaman detail icon.
- Bagian kontributor di README (all-contributors bot).
- Sebut nama di catatan rilis.
- Sebut di post X ketika icon mereka dirilis.

Halaman detail icon yang menampilkan "digambar oleh @nama" adalah bentuk pengakuan yang jauh lebih bermakna daripada avatar di README, karena ia melekat pada karyanya, permanen, dan bisa dibagikan orang itu sendiri.

## 15.9 Menangani Situasi Sulit

| Situasi | Penanganan |
|---------|------------|
| PR dengan icon berkualitas rendah dari kontributor antusias | Umpan balik konkret, tawarkan pasangan icon yang lebih mudah. Jangan merge karena kasihan — satu icon buruk merusak seluruh set. |
| Seseorang menyalin dari icon set berlisensi | Tutup segera, jelaskan tanpa menuduh, minta gambar ulang. |
| Permintaan fitur di luar cakupan | Tunjuk ke daftar anti-goals di [01 §1.9](./01-product-vision.md#19-long-term-vision-tahun-23). Ini alasan daftar itu ditulis. |
| Perdebatan taksonomi berlarut | Putuskan, dokumentasikan sebagai ADR, lanjutkan. Taksonomi yang cukup baik dan stabil mengalahkan yang sempurna dan selalu berubah. |
| Fork yang bersaing | Itu hak mereka di bawah MIT. Fokus ke kualitas, bukan ke fork. |
| Maintainer kelelahan | Turunkan ritme rilis secara terbuka. Repo yang jujur soal kapasitasnya lebih dipercaya daripada yang tiba-tiba senyap. |

## 15.10 Keberlanjutan

Mulai Phase 3, ketika ada bukti pemakaian nyata:

- **GitHub Sponsors** — satu baris di README dan footer situs. Tidak lebih.
- **Tier sponsor perusahaan** — logo di halaman `/sponsors` dan README. Tidak ada pengaruh atas roadmap; dinyatakan eksplisit.

**Yang tidak akan pernah dilakukan**, dan dinyatakan di FAQ supaya orang berani bergantung pada proyek ini:

- Tier icon berbayar
- Lisensi berbayar untuk komersial
- Telemetry atau iklan
- Menahan icon di balik sponsorship

Janji ini adalah aset. Setiap library yang pernah melanggarnya kehilangan komunitasnya, dan komunitas mengingat lebih lama daripada yang diperkirakan siapa pun.
