# ShopHub - Modern E-Commerce Platform

Modern ve responsive bir e-ticaret platformu. Next.js 14, Supabase, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Supabase ile gerçek zamanlı veritabanı
- ✅ Ürün ve kategori yönetimi
- ✅ Sepet işlemleri (LocalStorage ile kalıcı)
- ✅ Ürün arama ve filtreleme
- ✅ Smooth animasyonlar (Framer Motion)
- ✅ TypeScript ile tip güvenliği
- ✅ SEO dostu yapı

## 📦 Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Veritabanı**: Supabase (PostgreSQL)
- **UI**: Tailwind CSS
- **Animasyonlar**: Framer Motion
- **Dil**: TypeScript
- **İkonlar**: Lucide React

## 🛠️ Kurulum

### 1. Projeyi klonlayın

```bash
git clone https://github.com/Mertcali/kozmetik-eticaret.git
cd kozmetik-eticaret
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Supabase Projesini Oluşturun

1. [supabase.com](https://supabase.com) adresine gidin
2. Yeni bir proje oluşturun
3. SQL Editor'de `supabase-schema.sql` dosyasındaki SQL kodunu çalıştırın
4. Project Settings > API kısmından:
   - `Project URL`
   - `anon public` key'i kopyalayın

### 4. Environment Variables

`.env.local` dosyasını düzenleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
kozmetik-eticaret/
├── app/                      # Next.js App Router
│   ├── kategori/[id]/       # Kategori detay sayfası
│   ├── kategoriler/         # Kategoriler listesi
│   ├── sepet/               # Sepet sayfası
│   ├── urun/[id]/           # Ürün detay sayfası
│   ├── urunler/             # Ürünler listesi
│   ├── layout.tsx           # Ana layout
│   └── page.tsx             # Ana sayfa
├── components/              # React componentleri
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── Carousel.tsx
│   └── ui/                  # UI componentleri
├── contexts/                # React Context'ler
│   └── CartContext.tsx
├── lib/                     # Yardımcı fonksiyonlar
│   ├── supabase.ts         # Supabase client
│   ├── api.ts              # API fonksiyonları
│   ├── animations.ts       # Animasyon tanımları
│   └── utils.ts            # Utility fonksiyonlar
├── types/                   # TypeScript type tanımları
│   ├── index.ts
│   └── supabase.ts
└── public/                  # Statik dosyalar
```

## 🗄️ Database Şeması

### Categories (Kategoriler)
- `id` - UUID (Primary Key)
- `name` - VARCHAR(100)
- `slug` - VARCHAR(100) UNIQUE
- `description` - TEXT
- `image_url` - TEXT
- `parent_id` - UUID (Self-referencing)
- `display_order` - INTEGER
- `is_active` - BOOLEAN

### Products (Ürünler)
- `id` - UUID (Primary Key)
- `name` - VARCHAR(255)
- `slug` - VARCHAR(255) UNIQUE
- `description` - TEXT
- `short_description` - TEXT
- `price` - DECIMAL(10,2)
- `compare_at_price` - DECIMAL(10,2)
- `category_id` - UUID (Foreign Key)
- `image_url` - TEXT
- `images` - TEXT[]
- `sku` - VARCHAR(100)
- `stock_quantity` - INTEGER
- `is_featured` - BOOLEAN
- `is_active` - BOOLEAN
- `rating` - DECIMAL(3,2)
- `review_count` - INTEGER
- `view_count` - INTEGER
- `sales_count` - INTEGER

## 🎨 UI Güncellemeleri

Proje, kozmetik temasından genel e-commerce temasına dönüştürülmüştür:

- **Renk Paleti**: Pembe-mor tonlarından → Mavi-indigo-mor tonlarına
- **Site Adı**: "Güzelliğin Dünyası" → "ShopHub"
- **İçerik**: Kozmetik odaklı → Genel ürün çeşitliliği
- **Logo**: Sparkles → Store ikonu

## 📝 API Fonksiyonları

### Kategoriler
- `getCategories()` - Tüm aktif kategorileri getirir
- `getCategoryBySlug(slug)` - Slug'a göre kategori getirir
- `getCategoryById(id)` - ID'ye göre kategori getirir

### Ürünler
- `getProducts()` - Tüm aktif ürünleri getirir
- `getFeaturedProducts()` - Öne çıkan ürünleri getirir
- `getProductBySlug(slug)` - Slug'a göre ürün getirir
- `getProductById(id)` - ID'ye göre ürün getirir
- `getProductsByCategory(categoryId)` - Kategoriye göre ürünleri getirir
- `searchProducts(query)` - Ürün arama
- `getRelatedProducts(productId, categoryId)` - İlgili ürünleri getirir

## 🚀 Production

### Build

```bash
npm run build
```

### Start

```bash
npm start
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👤 Geliştirici

**Mertcali**

- GitHub: [@Mertcali](https://github.com/Mertcali)

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açarak neyi değiştirmek istediğinizi tartışın.
