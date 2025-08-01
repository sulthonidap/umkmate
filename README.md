# TemanEkspor - AI Export Opportunities Platform

Aplikasi web yang menggunakan AI untuk membantu UMKM Indonesia menemukan peluang ekspor ke pasar global.

## 🚀 Fitur Utama

- **AI-Powered Analysis**: Analisis peluang ekspor menggunakan Gemini AI
- **Market Insights**: Tren pasar dan permintaan global
- **Export Destinations**: Rekomendasi negara tujuan ekspor
- **Regulations Guide**: Peraturan dan standar per negara
- **Product Suggestions**: Saran produk dari AI berdasarkan input
- **Real-time Analysis**: Analisis real-time untuk setiap produk

## 🛠️ Teknologi

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd umkm-mate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup API Key**
   - Dapatkan API key gratis dari [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Buat file `.env` di root project:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

4. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

## 🔧 Setup API Key

### Langkah 1: Dapatkan API Key
1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan Google account
3. Klik "Create API Key"
4. Copy API key yang diberikan

### Langkah 2: Konfigurasi Environment
1. Buat file `.env` di root project
2. Tambahkan API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### Langkah 3: Restart Server
```bash
npm run dev
```

## 🎯 Cara Penggunaan

1. **Masukkan Produk**: Ketik nama produk lokal Anda di search bar
2. **AI Suggestions**: Dapatkan saran produk dari AI saat mengetik
3. **Analisis**: Klik "Explore" untuk menganalisis peluang ekspor
4. **Hasil**: Lihat rekomendasi negara, tren pasar, dan regulasi
5. **Coba Lagi**: Analisis produk lain untuk perbandingan

## 📊 Fitur AI

### Export Destinations
- Rekomendasi 3 negara terbaik untuk ekspor
- Analisis tingkat permintaan dan pertumbuhan
- Estimasi ukuran pasar dan hambatan masuk
- Alasan rekomendasi dari AI

### Market Trends
- Tren impor global dalam 3 periode terakhir
- Pertumbuhan permintaan per kuartal
- Deskripsi tren yang sedang terjadi

### Regulations & Standards
- Peraturan spesifik per negara
- Dokumen yang diperlukan
- Estimasi waktu dan biaya
- Catatan tambahan dari AI

### Product Suggestions
- Saran produk berdasarkan input user
- Produk komplementer dan variasi
- Fokus pada produk tradisional Indonesia

## 🔒 Keamanan

- API key disimpan di environment variables
- File `.env` sudah di-ignore di `.gitignore`
- Tidak ada hardcoded credentials

## 🚀 Deployment

### Vercel
1. Push ke GitHub
2. Connect repository di Vercel
3. Tambahkan environment variable `VITE_GEMINI_API_KEY`
4. Deploy

### Netlify
1. Push ke GitHub
2. Connect repository di Netlify
3. Tambahkan environment variable `VITE_GEMINI_API_KEY`
4. Deploy

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API Key | Yes |

## 🎨 Customization

### Colors
Edit `tailwind.config.js` untuk mengubah warna tema:
```javascript
colors: {
  mint: { /* mint color palette */ },
  sky: { /* sky color palette */ }
}
```

### AI Prompts
Edit `src/services/aiService.ts` untuk mengubah prompt AI sesuai kebutuhan.

## 🤝 Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail.

## 🆘 Troubleshooting

### API Key Error
- Pastikan API key valid dan aktif
- Cek environment variable sudah benar
- Restart development server

### AI Analysis Failed
- Cek koneksi internet
- Pastikan API key memiliki quota
- Coba produk yang berbeda

### Build Error
- Pastikan semua dependencies terinstall
- Cek Node.js version (min v16)
- Clear cache: `npm run build --force`

## 📞 Support

Untuk bantuan teknis atau pertanyaan, silakan buat issue di repository ini. 