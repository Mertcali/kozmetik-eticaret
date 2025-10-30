# Güzellik Dünyası - Modern Kozmetik E-Ticaret

Modern, sofistike ve kullanıcı dostu bir kozmetik e-ticaret web sitesi.

## Özellikler

### 🎨 Modern UI/UX
- ✨ **Scroll Animasyonları**: Framer Motion ile akıcı scroll animasyonları
- 💎 **Glassmorphism**: Modern cam efektli UI elementleri
- 🌈 **Gradient Efektleri**: Çarpıcı pembe-mor gradient geçişleri
- 🎭 **Hover Animasyonları**: İnteraktif ve dinamik hover efektleri
- 📱 **Responsive**: Tüm cihazlarda mükemmel görünüm
- 🎯 **Modern Tipografi**: Playfair Display ve Inter font aileleri

### 🛍️ E-Ticaret Özellikleri
- 🛒 Sepet yönetimi (ekleme, çıkarma, miktar güncelleme)
- 💝 Favori ürünler (kalp ikonu)
- 📦 Ürün listeleme ve detay sayfaları
- 🗂️ Kategori bazlı ürün filtreleme
- 🔔 Toast bildirimleri
- 🔍 Arama özelliği

### 🎯 Teknik Özellikler
- ⚡ Next.js 14 App Router
- 🎬 Framer Motion animasyonlar
- 🎨 TailwindCSS ile modern styling
- 📊 TypeScript tip güvenliği
- 🌊 Smooth scroll davranışı
- 🎭 Glassmorphism ve backdrop blur efektleri

## Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18
- **Animasyonlar**: Framer Motion
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Fonts**: Playfair Display, Inter
- **Language**: TypeScript

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Ana sayfa
│   ├── urunler/           # Tüm ürünler sayfası
│   ├── urun/[id]/         # Ürün detay sayfası
│   ├── kategori/[id]/     # Kategori sayfası
│   └── sepet/             # Sepet sayfası
├── components/            # React componentleri
│   ├── ui/               # UI componentleri (button, toast)
│   ├── Navbar.tsx        # Navigation bar
│   └── ProductCard.tsx   # Ürün kartı
├── contexts/             # React Context API
│   └── CartContext.tsx   # Sepet yönetimi
├── data/                 # Mock data
│   └── products.ts       # Ürün ve kategori verileri
├── types/                # TypeScript type tanımları
└── lib/                  # Utility fonksiyonlar
```

## Kategoriler

- 🧴 Cilt Bakımı
- 💄 Makyaj
- 🌸 Parfüm
- 💆 Saç Bakımı

## Not

Ödeme sistemi entegrasyonu henüz tamamlanmamıştır. "Satın Al" butonuna tıklandığında bilgilendirme mesajı gösterilir.

## Deployment

### Netlify'a Deploy (Önerilen)

Bu proje Netlify için optimize edilmiştir. Deploy için:

**Otomatik Deployment:**
1. GitHub'a push yapın
2. Netlify GitHub repoyu bağlayın
3. Build ayarları otomatik tanınır
4. Deploy!

**Manuel Deployment:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Gerekli Dosyalar:**
- ✅ `netlify.toml` - Netlify yapılandırması
- ✅ `next.config.js` - Next.js yapılandırması
- ✅ `@netlify/plugin-nextjs` - Otomatik yüklenir

Detaylı bilgi için `DEPLOYMENT.md` dosyasına bakın.

### Diğer Platformlar

**Vercel:**
```bash
npm run build
vercel
```

**Lokal Production Build:**
```bash
npm run build
npm start
```
