# SisaBaik — Platform Penyelamatan Makanan Sisa

SisaBaik adalah platform berbasis web *full-stack* yang menghubungkan usaha penyedia makanan yang memiliki stok berlebih yang masih layak konsumsi dengan konsumen yang membutuhkan[cite: 1, 12]. Platform ini bertujuan mengurangi sampah makanan (*food waste*) sekaligus memulihkan nilai ekonomi stok usaha[cite: 1, 33].

---

## Architecture & Tech Stack

- **Frontend**: Vue 3 (Composition API `<script setup>`), Vite, Tailwind CSS / Custom CSS Token, SVG Assets[cite: 1, 3, 4, 34]
- **Backend**: Node.js, Express.js REST API
- **Database**: PostgreSQL[cite: 3, 8]
- **Authentikasi & Otentikasi**: JWT (JSON Web Token), Role-Based Access Control (RBAC)[cite: 3, 9]

---

## Persyaratan Sistem

- **Node.js**: `^22.18.0` atau `>=24.12.0`[cite: 9, 10]
- **npm**: v10+
- **PostgreSQL**: v16+
- **Git**: Versi terbaru

---

## Panduan Instalasi & Pengoperasian

Repositori ini menggunakan struktur *monorepo* sederhana di mana Backend berada di folder utama (*root*) dan Frontend berada di dalam subfolder `frontend/`[cite: 8, 9, 10].

### 1. Pengaturan Backend (REST API)

1. **Masuk ke root repositori:**
   ```bash
   cd sisabaik-api