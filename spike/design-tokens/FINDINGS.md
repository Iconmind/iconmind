# Spike: Validasi Design Token

**Tanggal**: 2026-08-23 · **Durasi**: ~1 jam · **Status**: selesai

## Pertanyaan

Apakah token di [CANON C4](../../docs/masterplan/CANON.md#c4-design-tokens-mengikat) — grid 24×24, stroke 2, live area 20×20 — cukup untuk konsep AI yang paling sulit digambar? Kalau tidak, lebih baik tahu sekarang daripada setelah 60 icon jadi.

Enam icon diuji (lalu 20 kandidat tambahan di putaran 3–4), dipilih karena paling sulit: `context-window`, `reranker`, `tool-calling`, `mcp-resource`, `chunk-overlap`, `agent-hierarchy`.

## Jawaban

**Token divalidasi. Tidak ada perubahan pada grid, stroke, atau live area.**

Empat dari enam icon lolos uji 16px, uji inversi, dan uji tetangga tanpa mengubah satu token pun. Dua yang gagal, gagal karena **pilihan metafora**, bukan karena tokennya.

## Yang Ditemukan

### 1. Konflik aturan antara doc 03 dan doc 06 — sudah diperbaiki

Doc 03 menyatakan live area 2–22, doc 06 memvalidasi titik anchor pada 1.0–23.0. Keduanya tidak mungkin benar bersamaan: stroke 2px meluber 1px, jadi anchor pada 1.0 menghasilkan tinta yang menyentuh tepi kanvas dan padding-nya hilang.

Yang benar: **tinta 2–22, anchor 3–21.** Sudah diperbaiki di [03 §3.2](../../docs/masterplan/03-design-system.md#32-grid-system) dan rule `within-live-area` di [06 §6.2](../../docs/masterplan/06-svg-engine.md#62-validator).

Ini tidak akan tertangkap checker teks — hanya ketahuan saat benar-benar menempatkan koordinat.

### 2. Yang membunuh uji 16px bukan jumlah elemen, tapi persilangan stroke

Ini kebalikan dari dugaan awal, dan mengubah aturan validator.

| Icon | Elemen | Persilangan | 16px |
|------|--------|-------------|------|
| `context-window` (kurung siku) | 4 | 0 | ✅ tajam |
| `agent-hierarchy` | 5 | 0 | ✅ tajam |
| `mcp-resource` | 5 | 0 | ✅ terbaca |
| `chunk-overlap` v1 | 4 | 4 | ❌ bercak hitam |
| `tool-calling` v1 | 4 | 0 | ⚠️ lemah (jarak antar bagian < 2) |

`agent-hierarchy` punya lima elemen dan tetap tajam. `chunk-overlap` v1 punya empat elemen dan hancur. Pembedanya persilangan.

**Konsekuensi**: rule baru `max-crossings` (maksimum 2), batas `max-children` 12 dibiarkan longgar, dan `min-stroke-gap` dinaikkan ke 3.0 khusus untuk detail **di dalam** bentuk tertutup.

### 3. Rule `min-element-size` salah tulis

Ditulis "bounding box ≥ 2×2". Garis lurus horizontal punya bbox 12×0 dan akan selalu gagal. Diperbaiki menjadi: dimensi terbesar ≥ 2, dan untuk bentuk tertutup sisi terpendek juga ≥ 2.

### 4. Motif kurung siku sangat kuat

`context-window` versi kurung siku `[ · · ]` jauh mengalahkan versi kotak-dengan-kabel: lebih terbaca di 16px **dan** maknanya lebih jelas. Ditambahkan ke tabel metafora baku [03 §3.6](../../docs/masterplan/03-design-system.md#36-konsistensi-optis-yang-tidak-bisa-dicek-mesin) sebagai bentuk untuk *batas / cakupan / jendela*.

### 5. Uji inversi lolos semua

Tidak ada icon yang "menutup" atau berubah jadi blok saat dirender putih di atas hitam. Lihat `review-v2-dark.png`.

### 6. Spike putaran 1–2 melanggar workflow-nya sendiri

[04 §4.5](../../docs/masterplan/04-ai-generation-workflow.md#45-tahap-3--prompt-template) mewajibkan **8 kandidat per icon** dengan pendekatan komposisi yang berbeda-beda; [04 §4.11](../../docs/masterplan/04-ai-generation-workflow.md#411-standar-kualitas--tingkat-penerimaan-yang-diharapkan) menyatakan tingkat lolos ~12%. Putaran 1–2 hanya membuat **satu** kandidat per konsep lalu diiterasi.

Konsekuensinya persis seperti yang diprediksi angka itu: dua konsep tersulit (`tool-calling`, `chunk-overlap`) buntu. Putaran 3 mengulang keduanya dengan n=8 yang benar, dan langsung menghasilkan pemenang untuk `chunk-overlap` pada percobaan ketiga — pendekatan yang tidak akan pernah muncul dari mengiterasi tebakan pertama, karena bentuk dasarnya berbeda sama sekali.

**Pelajaran**: n=1 lalu iterasi hanya bekerja kalau tebakan pertama sudah dekat. Ketika tebakan pertama salah metafora, iterasi memperbaiki hal yang salah. n=8 bukan pemborosan — itu satu-satunya cara keluar dari metafora yang buntu.

### 7. Prediksi yang terkonfirmasi: stroke berimpit saling menghapus

Kandidat `06-venn-persegi` (dua persegi identik yang hanya digeser mendatar) merender sebagai kotak berisi dua garis vertikal — sisi atas dan bawah kedua persegi berimpit dan menyatu, sehingga bentuk "dua persegi" hilang sepenuhnya.

Ditambahkan sebagai rule linter `collinear-overlap` di [06 §6.4](../../docs/masterplan/06-svg-engine.md#64-linter). Aturan praktisnya: **dua bentuk yang sama tidak boleh digeser hanya pada satu sumbu** — harus digeser pada dua sumbu, atau bentuknya dibedakan.

### 8. Kebuntuan `tool-calling` ternyata masalah taksonomi, bukan gambar

Setelah 12 kandidat, `tool-calling` tetap tidak punya solusi bersih. Penyebabnya bukan kemampuan menggambar, melainkan **empat slug yang memperebutkan ruang visual yang sama**: `tool-calling` dan `function-call` (domain `agents`), `mcp-tool-call` (domain `mcp`), dan `tool-registry`.

Dua kandidat terbaik justru memecahkan konsep *tetangganya*, bukan `tool-calling` itu sendiri:

- `02-puzzle-2tab` → bentuk dasar yang sangat kuat untuk **`tool`** dan seluruh keluarga `tool-*` / `mcp-tool-*`. Puzzle **satu** tab (putaran 2) tidak terbaca; **dua** tab langsung terbaca.
- `03-paren-call` → `( · )` sangat kuat untuk **`function-call`**.

Keduanya diterima. `tool-calling` sendiri ditahan sampai batas antara keempat slug itu diputuskan — kalau `tool-calling` dan `function-call` ternyata konsep yang sama, salah satunya harus menjadi **alias**, bukan icon kedua ([07 §7.4](../../docs/masterplan/07-metadata-system.md#74-aturan-field)).

Menggambar duluan sebelum taksonomi jelas hanya menghasilkan dua icon yang saling melemahkan.

## Hasil per Icon

| Icon | Status | Catatan |
|------|--------|---------|
| `context-window` | ✅ **Diterima** | Versi kurung siku. Kandidat anchor. |
| `agent-hierarchy` | ✅ **Diterima** | Kandidat anchor. |
| `mcp-resource` | ✅ **Diterima** | Basis keluarga `mcp-*` — kotak yang sama dengan glyph berbeda. |
| `reranker` | ⚠️ **Diterima bersyarat** | Bentuknya bagus, tapi **bertabrakan dengan `sort`** di domain `interface`. Harus dibedakan sebelum keduanya rilis. |
| `chunk-overlap` | ✅ **Diterima** | Putaran 3, kandidat 03: dua lingkaran bertindih (Venn). Langsung terbaca, 2 elemen. |
| `tool` | ✅ **Diterima** (bonus) | Putaran 3, kandidat 02: puzzle piece dua tab. Basis keluarga `tool-*`. |
| `function-call` | ✅ **Diterima** (bonus) | Putaran 3, kandidat 03: `( · )`. Titik tengahnya sedikit berat di 16px — pertimbangkan `r=1`. |
| `tool-calling` | ⛔ **Ditahan** | Bukan masalah gambar, tapi tumpang tindih taksonomi. Lihat temuan 8. |

Kandidat yang gagal juga informatif: kunci inggris tidak bisa dibangun di bawah batasan sudut 45°/30°/60°; kotak+play terbaca sebagai `run`; steker+soket terbaca sebagai `integration`; panah keluar kotak terbaca sebagai `arrow-external`. Empat tabrakan itu ditemukan sebelum satu pun icon masuk repo.

## Yang Harus Ditindaklanjuti

1. **Rapikan taksonomi `tool-*` lebih dulu**: putuskan batas antara `tool-calling`, `function-call`, `mcp-tool-call`, dan `tool-registry`. Baru gambar. (Temuan 8)
2. `reranker` vs `sort` — tentukan pembeda sebelum salah satu masuk `main`. Ini contoh nyata kenapa field `neighbors` di spec [04 §4.4](../../docs/masterplan/04-ai-generation-workflow.md#44-tahap-2--taxonomy) wajib diisi.
3. Tujuh icon di `accepted/` masuk kandidat 20 anchor set Phase 1.

## Berkas

```
round-1/          n=1 per konsep — cara yang salah, disimpan sebagai bukti
round-2/          iterasi dari putaran 1
round-3/          n=8 sesuai 04 §4.5 — cara yang benar
round-4/          konvergensi tool-calling
accepted/         7 icon yang lolos → kandidat anchor set
render.py         rasterisasi + contact sheet (resvg + Pillow)
review-*.png      contact sheet 16/24/48px, terang & gelap
```

```bash
SRC=accepted OUT=review-accepted python3 render.py
```

Folder ini sekali pakai. Setelah `scripts/validate` dan `scripts/generate/previews.ts` yang sesungguhnya ada ([05](../../docs/masterplan/05-repository-architecture.md)), `render.py` diganti oleh keduanya dan spike ini boleh dihapus.
