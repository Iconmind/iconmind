# 03 — Design System

> Nilai token bersifat mengikat dan didefinisikan di [CANON C4](./CANON.md#c4-design-tokens-mengikat). Dokumen ini menjelaskan **kenapa** dan **bagaimana menerapkannya**.
> Setiap aturan di sini yang bisa dicek mesin **harus** punya rule di [06 — SVG Engine](./06-svg-engine.md). Aturan yang tidak bisa dicek mesin masuk ke checklist review manusia di [04](./04-ai-generation-workflow.md).

---

## 3.1 Filosofi

Tiga kalimat yang mengatur segalanya:

1. **Kejelasan mengalahkan keindahan.** Icon dibaca pada 16px di sidebar, bukan dikagumi pada 200px di Dribbble.
2. **Konsistensi mengalahkan ekspresi.** Satu icon yang lebih cantik tapi beda bahasa visual merusak 999 lainnya.
3. **Konvensi mengalahkan kreativitas.** Kalau industri sudah menggambar database sebagai silinder, kita gambar silinder. Kejutan visual adalah kegagalan komunikasi.

## 3.1b Tanda Tangan Rumah: Chamfer 45°

Wadah **memotong sudutnya 45° sepanjang 4 unit**, bukan membulatkannya. Ini satu-satunya hal yang membuat set ini dikenali sebagai IconMind dari jarak jauh, dan hampir tidak ada set icon besar yang memakainya.

```
wadah penuh   M6 2h12l4 4v12l-4 4H6l-4-4V6z      (2..22, chamfer 4)
```

**Chamfer tidak berlaku di mana-mana.** Batasnya penting, karena motif yang dipakai pada setiap icon berhenti menjadi tanda tangan dan berubah jadi pengulangan — persis kegagalan "bentuk luar + tanda kecil" yang sudah pernah terjadi.

| Dipakai chamfer | Tidak |
|-----------------|-------|
| Keluarga pelaku (`agent`, `agent-run`, `multi-agent`) | Wadah biasa → sudut membulat `3` (`memory`, `mcp-server`) |
| Gelembung (`prompt`) | Metafora konvensional tetap utuh: silinder, lingkaran, segi enam, buku |

Aturan yang mengikat: **tanda tangan gaya boleh mengatur wadahnya, tapi tidak boleh menimpa metafora yang membuat icon dikenali.** Versi awal `vector-database` digambar sebagai kotak chamfer dan berhenti terbaca sebagai basis data sama sekali.

## 3.1c Kenapa Live Area Diperlebar

Aturan lama mengunci anchor di 3–21, yang membatasi rentang maksimum di 20 unit. Pengukuran terhadap set pembanding menunjukkan mereka mencapai 22 unit, dan icon kami konsisten 10–26% lebih kecil di dalam bingkai yang sama. Bentuk yang tidak mengisi bingkainya **terbaca ragu-ragu** di sebelah yang mengisi penuh.

Anchor sekarang **2–22**, tinta berhenti di 1–23.

Efek sampingnya diukur juga: setelah skala diperbesar, stroke `2` menghasilkan rata-rata cakupan tinta **28.7%** — praktis sama dengan set mapan (~29%). Percobaan menaikkan stroke ke `2.5` justru mendorong tujuh dari sepuluh icon melewati 34% dan membuatnya jadi bercak di 16px. **Kesan tebal datang dari skala, bukan dari ketebalan garis.**

## 3.2 Grid System

```
┌─────────────────────────┐  24 × 24 canvas
│ ┌─────────────────────┐ │  ← tinta berhenti di sini (2..22)
│ │                     │ │
│ │   20 × 20 live      │ │  ← anchor path berada di 3..21
│ │      area (tinta)   │ │     karena stroke meluber 1px
│ │                     │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

- **Canvas 24×24**, viewBox `0 0 24 24`. Sama dengan Lucide dan Heroicons — supaya bisa dicampur ([01](./01-product-vision.md#14-kenapa-library-yang-ada-tidak-cukup)).
- **Live area 20×20** = area **tinta**, koordinat 2–22. Padding 2px mencegah stroke terpotong saat di-render dan memberi ruang napas optis.
- **Titik anchor karenanya berada di 3–21**, bukan 2–22. Stroke 2px meluber 1px ke tiap sisi sumbu, jadi anchor di x=3 menghasilkan tinta yang berhenti tepat di x=2. Inilah yang dicek rule `within-live-area` ([06 §6.2](./06-svg-engine.md#62-validator)), dan alasan semua bentuk dasar di tabel bawah memakai koordinat 3 dan 21.
- **Titik pusat (12, 12).** Elemen simetris harus benar-benar berpusat di sini.
- **Snap 0.5px.** Semua koordinat kelipatan 0.5. Koordinat seperti `11.37` dilarang kecuali hasil kurva Bezier.
- **Kunci keypoint** di 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22. Bentuk yang menempel ke kelipatan 2 hampir selalu terlihat lebih rapi.

**Bentuk dasar yang direkomendasikan** (pakai ini sebelum menggambar bebas):

| Bentuk | Koordinat | Kapan |
|--------|-----------|-------|
| Persegi besar | `x=3 y=3 w=18 h=18 rx=2` | Container, card, panel |
| Persegi sedang | `x=4 y=4 w=16 h=16 rx=2` | Objek utama dengan aksesori |
| Lingkaran besar | `cx=12 cy=12 r=9` | Objek bulat penuh |
| Lingkaran sedang | `cx=12 cy=12 r=7` | Objek bulat dengan aksesori |
| Titik / dot | `r=1` atau `r=1.5` | Node, indikator, token |
| Garis horizontal | `y=12`, `x` dari 3→21 | Pemisah, aliran |

## 3.3 Stroke

| Properti | Nilai | Alasan |
|----------|-------|--------|
| `stroke-width` | `2` | Sweet spot untuk 24px. 1.5 terlalu tipis di layar low-DPI, 2.5 terlalu berat saat diperkecil ke 16px. |
| `stroke-linecap` | `round` | Ujung membulat, konsisten dengan Lucide. |
| `stroke-linejoin` | `round` | Sambungan membulat. |
| `stroke` | `currentColor` | Mewarisi warna teks. Wajib. |
| `fill` | `none` | Tahun 1 outline-only. |

**Stroke width tidak pernah bervariasi di dalam satu icon.** Tidak ada 2px untuk bentuk utama dan 1px untuk detail. Kalau detail terlalu ramai pada 2px, detailnya yang dihapus, bukan stroke-nya yang ditipiskan.

**Aturan jarak**: dua stroke sejajar minimal berjarak **2px** dari sumbu ke sumbu — kurang dari itu akan menyatu jadi blok hitam pada 16px.

**Elemen terkecil 2px.** Apa pun yang lebih kecil hilang saat diperkecil. Pengecualiannya adalah **titik**: segmen sepanjang nol (`M9.5 12h0`) merender sebagai lingkaran 2px berkat `linecap="round"`, dan itu bentuk kanonik untuk titik. Yang dilarang adalah segmen sepanjang 0.25–2 — terlalu panjang untuk titik, terlalu pendek untuk garis.

## 3.4 Corner Radius

| Konteks | Radius |
|---------|--------|
| Sudut luar bentuk besar (≥16px) | `2` |
| Sudut dalam / bentuk kecil (<16px) | `1` |
| Bentuk sangat kecil (≤6px) | `0.5` atau siku |
| Ujung garis | ditangani `linecap="round"`, bukan radius |

Radius menyesuaikan ukuran bentuk, bukan konstan. Radius 2 pada kotak 6px terlihat seperti kapsul; radius 1 pada kotak 18px terlihat tajam. Prinsipnya: **radius ≈ 1/8 sisi terpendek**, dibulatkan ke 0.5 terdekat, maksimum 2.

## 3.5 Aturan SVG (mengikat)

Wajib:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="..." />
</svg>
```

**Dilarang keras** (semuanya diblokir CI):

| Dilarang | Kenapa |
|----------|--------|
| `<style>`, atribut `style` | Tidak bisa di-override konsumen, bocor ke dokumen |
| `class`, `id` | Bentrok ketika banyak icon di satu halaman |
| Warna literal (`#000`, `black`, `rgb()`) | Merusak pewarnaan `currentColor` |
| `<text>` | Tergantung font, tidak bisa dilokalkan |
| `<image>`, base64 | Bukan vektor |
| `<filter>`, `<mask>`, `<clipPath>` | Mahal untuk di-render, sering pecah di Safari |
| `transform` pada elemen | Harus di-*flatten* ke koordinat path |
| `<g>` tanpa alasan | Nesting yang tidak perlu |
| `stroke-dasharray` | Sering dipakai untuk "meniru" bentuk; hasil tidak konsisten saat di-scale |
| Atribut `data-*`, komentar, metadata editor | Sampah dari Figma/Illustrator |

Diizinkan: `<path>`, `<circle>`, `<rect>`, `<line>`, `<polyline>`, `<polygon>`, `<ellipse>`.

**Batas kompleksitas**: maksimum **12 elemen anak** dan **1500 karakter** per file setelah optimasi. Melewati batas biasanya berarti icon-nya terlalu detail untuk 24px, bukan berarti batasnya kurang.

## 3.6 Konsistensi Optis (yang tidak bisa dicek mesin)

Ini bagian tersulit dan alasan review manusia tidak bisa dihapus.

**Berat optis seragam.** Icon dengan banyak garis terasa lebih "berat" daripada yang punya sedikit garis, meski stroke-width-nya sama. Uji: render 20 icon berdampingan pada 24px, picingkan mata. Kalau ada yang menonjol gelap atau pucat, perbaiki.

**Ukuran optis, bukan ukuran matematis.** Lingkaran terlihat lebih kecil dari persegi berukuran sama. Kompensasi: lingkaran boleh 1–2px lebih besar dari kotak yang seharusnya setara.

**Sudut dibatasi.** Diagonal hanya pada 45° atau 30°/60°. Sudut sembarang seperti 37° terlihat seperti kesalahan.

**Arah konsisten.** Panah "maju" selalu ke kanan. Aliran data selalu kiri→kanan. Waktu selalu kiri→kanan. Hierarki selalu atas→bawah.

**Bentuk luar menyandikan jenis entitas.** Aturan ini muncul dari membandingkan `model` dan `agent` berdampingan di batch 01: keduanya konsep abstrak tanpa bentuk konvensional, dan satu-satunya cara membuatnya jelas berbeda adalah menyepakati arti bentuk luarnya. Sekali disepakati, ratusan icon turunan mendapat jawabannya secara gratis.

| Bentuk luar | Artinya | Contoh |
|-------------|---------|--------|
| **Oktagon chamfer** | Pelaku — punya keadaan, bertindak sendiri | `agent`, `agent-run`, `multi-agent` |
| Segi enam | Komponen — dipanggil, tidak bertindak sendiri | `model`, `llm`, `inference` |
| Persegi rounded (`r=3`) | Wadah atau sistem | `mcp-server`, `mcp-client`, `memory`, `chunk` |
| Silinder | Data tersimpan | `vector-database`, `data-warehouse` |
| Buku | Pengetahuan terkurasi | `knowledge-base` |
| Potongan puzzle | Kemampuan yang dipasang | `mcp-tool` |
| Sepasang kurung | Cakupan atau batas | `context-window` |
| **Gelembung chamfer** | Sesuatu yang dikirim | `prompt`, `mcp-prompt` |
| Perisai | Pembatas keamanan | `guardrail` |
| Pin di tepi wadah | Titik sambung — penanda keluarga MCP | `mcp-server` (kanan = menyediakan), `mcp-client` (kiri = mengonsumsi) |

**Tanda di dalam menyandikan jenis atau keadaan.** Bentuk luar menjawab *"benda apa ini"*; tanda di dalamnya menjawab *"yang mana"*.

| Keluarga | Bentuk polos | Tanda di dalam |
|----------|--------------|----------------|
| Model | `model` — segi enam kosong | `llm` = baris teks, `inference` = aliran menembus |
| Agent | oktagon chamfer + cincin = `agent` | `agent-run` = segitiga putar, `agent-stop` = persegi, `agent-thinking` = tiga titik |
| MCP | persegi rounded + pin | `mcp-server` = pin kanan, `mcp-client` = pin kiri, `mcp-resource` = satu pin + isi |
| Data tersimpan | silinder | `vector-database` = titik vektor |

**Tanda di dalam harus besar.** Ini aturan kuantitatif, bukan selera, dan datang dari pengukuran. Versi pertama `agent-thinking` adalah lingkaran berisi tiga titik 2px; `agent` adalah lingkaran berisi satu titik 2px. Jarak perseptual keduanya **0.011** — praktis tak terbedakan, karena pada peta tinta 16×16 keduanya adalah "lingkaran dengan sedikit tinta di tengah". Setelah titiknya diperbesar jadi 4px dan direntangkan sampai 9 dari 16 satuan lebar, jaraknya naik ke **0.059**.

Aturan praktisnya: **tanda di dalam harus merentang minimal 40% lebar bentuk luarnya, atau tinta totalnya minimal dua kali lipat tanda yang dibandingkan.** Tanda kecil di tengah bentuk besar tidak membedakan apa pun pada 16px, sebesar apa pun bedanya di 48px.

Batasnya nyata: `hallucination` (gelembung + seru) tidak pernah bisa melewati 0.050 terhadap `prompt` (gelembung + kurung sudut) dalam dua putaran. Ketika bentuk luarnya sama dan tandanya sama-sama kecil, satu-satunya jalan keluar adalah mengganti bentuk luarnya — atau menunda icon itu sampai metafora yang lebih baik ditemukan.

`model` sengaja **tidak** punya tanda di dalam: induk keluarga adalah bentuk paling telanjang, dan setiap jenis model spesifik menambahkan sesuatu. `agent` tetap butuh cincin karena oktagon kosong terbaca sebagai wadah, bukan pelaku.

Konsekuensi yang mengikat: **`agent-*` selalu oktagon chamfer, `*-model` selalu segi enam, `mcp-*` selalu wadah membulat berpin.** Kalau sebuah icon baru terasa sulit, pertanyaan pertama bukan "bentuknya apa" melainkan "ini jenis entitas apa" — dan bentuk luarnya sudah ditentukan.

**Metafora konsisten lintas domain.** Ini yang membedakan set icon dari kumpulan icon:

| Konsep | Bentuk baku | Dipakai di |
|--------|-------------|------------|
| Container / sistem | Persegi rounded | semua domain |
| Data tersimpan | Silinder | `data`, `rag`, `cloud` |
| Node / entitas | Lingkaran | `agents`, `rag`, `data` |
| Aliran / hubungan | Garis + panah | `automation`, `data`, `agents` |
| Kecerdasan / model | Bentuk bersudut lembut + node terhubung | `ai`, `agents` |
| Keamanan | Gembok atau perisai | `security` |
| Waktu | Lingkaran + jarum | `interface`, `automation` |
| Peringatan | Segitiga | semua domain |
| Batas / cakupan / jendela | Sepasang kurung siku | `ai`, `rag`, `agents` |
| Modifier `-add` | Plus di kanan bawah | semua domain |
| Modifier `-check` | Centang di kanan bawah | semua domain |
| Modifier `-alert` | Seru di kanan bawah | semua domain |
| Modifier `-off` | Garis miring 45° menyilang | semua domain |
| Titik sambung | **Pin (garis pendek), bukan titik** | Titik berdiameter kecil menyatu jadi bercak pada 16px; pin tidak pernah |

**Posisi baku modifier**: badge di kuadran kanan bawah, pusat di **(18, 18)**, radius efektif 4px, dan bentuk utama dipotong (bukan ditimpa) agar badge punya ruang bersih 1px. Konsistensi posisi ini membuat 100+ icon varian bisa dibuat tanpa keputusan desain baru setiap kali.

## 3.7 Konvensi Penamaan

Format teknis: [CANON C9](./CANON.md#c9-konvensi-penamaan). Aturan pemilihan kata: [02 §2.5](./02-icon-taxonomy.md#25-prinsip-penamaan-icon).

Tambahan yang khusus desain:

- Slug harus mendeskripsikan **apa yang digambar dan artinya**, bukan bentuk geometrisnya. `vector-database` ✅, `cylinder-with-dots` ❌.
- Kalau dua konsep bisa dipakai bergantian (`retriever` vs `retrieval`), keduanya boleh ada **hanya jika gambarnya berbeda**. Kalau gambarnya sama, satu jadi slug utama dan satu jadi **alias** di metadata ([07](./07-metadata-system.md)).

## 3.8 Aturan Aksesibilitas

Icon adalah **konten dekoratif secara default** dan menjadi konten bermakna hanya ketika penulis menyatakannya.

```html
<!-- Default: dekoratif, disembunyikan dari screen reader -->
<svg aria-hidden="true" focusable="false" ...>

<!-- Bermakna: penulis memberi label -->
<svg role="img" aria-label="Agent memory" ...>
```

Aturan implementasi di package React/Vue ([10](./10-react-package.md), [11](./11-vue-package.md)):

1. Tanpa `aria-label` / `aria-labelledby` → otomatis `aria-hidden="true"` + `focusable="false"`.
2. Dengan `aria-label` → otomatis `role="img"`, dan `aria-hidden` **tidak** dipasang.
3. `focusable="false"` selalu ada (bug lama IE/Edge yang membuat SVG bisa di-tab).
4. `<title>` **tidak pernah** ditanam di file SVG. Judul yang di-hardcode tidak bisa dilokalkan dan menimbulkan tooltip yang tidak diminta.

Aturan kontras: icon mewarisi `currentColor`, jadi kontras adalah tanggung jawab konsumen. Yang menjadi tanggung jawab kami: **bentuk harus tetap terbaca dalam monokrom** — tidak boleh ada icon yang maknanya bergantung pada warna.

Target ukuran sentuh: dokumentasikan bahwa icon interaktif butuh target ≥44×44px, dengan icon 24px di tengahnya. Ini masuk `/docs/design-guidelines`.

## 3.9 Uji Kualitas Wajib

Setiap icon lulus lima uji ini sebelum merge:

| # | Uji | Cara | Lolos jika |
|---|-----|------|-----------|
| 1 | **Uji 16px** | Render pada 16px | Masih terbaca, tidak ada bagian menyatu |
| 2 | **Uji picing** | Picingkan mata di antara 20 icon lain | Berat optisnya menyatu, tidak menonjol |
| 3 | **Uji tebak buta** | Tunjukkan ke orang lain tanpa label | Tebakan mendekati arti; kalau tidak, metaforanya salah |
| 4 | **Uji tetangga** | Sandingkan dengan icon satu sub-kategori | Terlihat sekeluarga |
| 5 | **Uji inversi** | Render putih di atas hitam | Tetap seimbang, tidak ada area yang "menutup" |

Uji 1, 2, dan 5 diotomasi jadi snapshot Playwright ([14](./14-ci-cd.md)). Uji 3 dan 4 tetap manusia.

**Apa yang sebenarnya membunuh uji 16px.** Spike validasi token (`spike/design-tokens/FINDINGS.md`) menguji enam icon tersulit dan hasilnya berlawanan dengan dugaan awal: jumlah elemen hampir tidak berpengaruh — icon lima elemen tetap tajam pada 16px selama strokenya tidak saling menyilang. Yang merusak adalah **persilangan stroke** dan **detail di dalam bentuk tertutup yang berjarak kurang dari 3px**. Karena itu batas persilangan ditegakkan sebagai rule `max-crossings` ([06 §6.2](./06-svg-engine.md#62-validator)), sementara batas 12 elemen dibiarkan longgar.

## 3.10 Yang Sengaja Ditunda ke Tahun 2

Dicatat di sini supaya tidak diperdebatkan ulang setiap bulan:

| Fitur | Kenapa ditunda |
|-------|----------------|
| Varian `filled` | Menggandakan beban produksi dan review, sebelum outline-nya sendiri lengkap |
| Varian `duotone` | Butuh sistem dua-warna → mengubah kontrak API komponen |
| Multi weight (1 / 1.5 / 2.5) | Bisa didekati konsumen lewat prop `strokeWidth`; weight sejati butuh redraw per weight |
| Icon 16px dan 48px khusus | Optical sizing sejati = 3× pekerjaan menggambar |
| Animasi | Domain berbeda, sebaiknya package terpisah |

Prop `strokeWidth` **tetap tersedia** sejak hari pertama ([10](./10-react-package.md)) — ini memberi 80% manfaat multi-weight dengan 0% biaya produksi.
