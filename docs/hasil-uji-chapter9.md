# Laporan Hasil Pengujian Chapter 9 — Membangun Antarmuka dengan Vue

- **Penguji**: Sabila Mardhatillah (NIM: 23367048)
- **Mata Kuliah**: Pengembangan Web (DGT1.62.7009)
- **Tanggal Uji**: 5 November 2026
- **Versi Node.js**: v22.18.0 (atau versi yang aktif di terminalmu)

---

## 1. Hasil Pengujian Skenario (Langkah 12)

| Skenario | Ekspektasi | Hasil Aktual | Status |
| :--- | :--- | :--- | :--- |
| **Halaman baru, mode pembeli** | 3 kartu; 15 unit; 2 penyedia | 3 kartu; 15 unit; 2 penyedia | Lolos |
| **Pencarian "LAPAU"** | 2 kartu penawaran Lapau Uni Rina | 2 kartu penawaran Lapau Uni Rina | Lolos |
| **Pencarian "tidak-ada-produk"** | Daftar kosong & pesan empty state | Tampil empty state "Belum ada makanan yang cocok" | Lolos |
| **Reset filter & pilih kategori "roti"** | 1 kartu Paket Roti Sore | 1 kartu Paket Roti Sore | Lolos |
| **Pilih Paket Roti Sore** | Ringkasan mendapat fokus; stok tetap 6 | Ringkasan Pilihan tampil & mendapat fokus; stok tetap | Lolos |
| **Mode penyedia & submit form kosong** | 3 kartu Rina; 2 tersedia; Kesalahan mendapat fokus | Form menolak submit, pesan kesalahan fokus | Lolos |
| **Isi harga normal 20000 & penawaran 30000** | Kesalahan harga, daftar tidak bertambah | Pesan kesalahan "Harga penawaran tidak boleh melebihi..." | Lolos |
| **Form valid (Paket Gratis, harga penawaran 0)** | Data Rina bertambah; isian kosong | Penawaran bertambah ke daftar Rina, form reset | Lolos |
| **Kembali ke pembeli & reset filter** | 4 kartu; 17 unit; 2 penyedia | 4 kartu; 17 unit; 2 penyedia | Lolos |
| **Refresh browser** | Kembali ke 3 kartu; 15 unit; 2 penyedia | Data baru hilang (kembali ke fixture di memori) | Lolos |
| **Tampilan Responsif (375px, 768px, 1280px)** | Tanpa scroll horizontal, layout menyesuaikan | Responsif di semua breakpoint | Lolos |

---

## 2. Ringkasan Aliran Data (Props & Emits)

1. **Props (Aliran Turun)**:
   - `App.vue` mengirimkan `penawaran`, `waktuSekarang`, dan `bolehPilih` ke `KartuPenawaran.vue`.
   - `App.vue` mengirimkan `pencarian`, `kategori`, dan `daftarKategori` ke `FilterPenawaran.vue`.

2. **Emits (Event Naik)**:
   - `FilterPenawaran.vue` memicu event `@ubah-pencarian` dan `@ubah-kategori` untuk memperbarui state di `App.vue`.
   - `FormPenawaran.vue` memicu event `@simpan` membawa data penawaran yang sudah lolos validasi.
   - `KartuPenawaran.vue` memicu event `@pilih` membawa `id` penawaran saat tombol diklik.

---

## 3. Hasil Build & Preview (Langkah 13)

- **Build**: Berhasil dikompilasi menggunakan perintah `npm run build` tanpa error.
- **Preview**: Berhasil dijalankan menggunakan `npm run preview` pada alamat `http://127.0.0.1:4173/`.