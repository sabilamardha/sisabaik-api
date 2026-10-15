# SisaBaik API

SisaBaik API adalah layanan REST API backend berbasis Node.js, Express, dan PostgreSQL yang dirancang untuk mengelola penawaran makanan sisa serta memproses transaksi pemesanan secara aman dari *race condition* (konkurensi stok).

## Persyaratan Sistem

- **Node.js**: v20+
- **PostgreSQL**: v16+

## Instalasi & Konfigurasi

1. **Salin berkas variabel lingkungan:**
   ```bash
   cp .env.example .env