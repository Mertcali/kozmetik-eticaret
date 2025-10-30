# Netlify Deployment Rehberi

## 🚀 Netlify'a Deploy Etme Adımları

### Yöntem 1: Netlify Dashboard Üzerinden (Önerilen)

1. **Netlify'a Giriş Yapın**
   - https://app.netlify.com adresine gidin
   - GitHub hesabınızla giriş yapın

2. **Yeni Site Ekleyin**
   - "Add new site" > "Import an existing project" tıklayın
   - GitHub'dan projenizi seçin

3. **Build Ayarları**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Environment Variables (Opsiyonel)**
   - Site settings > Build & deploy > Environment
   - Gerekirse API key'leri ekleyin

5. **Deploy**
   - "Deploy site" butonuna tıklayın
   - Build logs'u takip edin

### Yöntem 2: Netlify CLI ile

1. **Netlify CLI Kurulumu**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   # İlk kez deploy
   netlify deploy --prod

   # Mevcut siteye deploy
   netlify deploy --prod --dir=.next
   ```

## 🔧 Önemli Dosyalar

- `netlify.toml` - Netlify yapılandırması
- `next.config.js` - Next.js yapılandırması (output: 'standalone')
- `package.json` - @netlify/plugin-nextjs eklendi

## ⚠️ Sorun Giderme

### 404 Hatası Alıyorsanız

1. **netlify.toml dosyasını kontrol edin**
   - Dosyanın proje root'unda olduğundan emin olun

2. **Build loglarını kontrol edin**
   - Netlify dashboard > Site > Deploys > Build log

3. **Node.js versiyonunu belirtin**
   netlify.toml'e ekleyin:
   ```toml
   [build.environment]
     NODE_VERSION = "18"
   ```

4. **Cache temizleyin**
   - Netlify dashboard > Site settings > Build & deploy
   - "Clear cache and retry deploy"

### Build Hatası Alıyorsanız

1. **Yerel olarak build test edin**
   ```bash
   npm run build
   npm start
   ```

2. **Dependencies kontrol edin**
   ```bash
   npm install
   ```

3. **TypeScript/ESLint hatalarını geçici olarak ignore edin**
   - `next.config.js` dosyasında zaten ayarlandı

## 🎯 Deploy Sonrası

1. **Custom Domain Ekleme**
   - Site settings > Domain management
   - "Add custom domain"

2. **HTTPS Kontrol**
   - Otomatik olarak Let's Encrypt SSL eklenir
   - 24 saat içinde aktif olur

3. **Performance Kontrol**
   - https://pagespeed.web.dev/ ile test edin

## 📦 Güncelleme Sonrası Deploy

Kod değişikliklerinden sonra:

```bash
git add .
git commit -m "Update message"
git push
```

Netlify otomatik olarak yeni deployment başlatır.

## 🌐 Netlify Next.js Plugin

Projede `@netlify/plugin-nextjs` kullanılıyor. Bu plugin:
- ✅ Next.js App Router'ı destekler
- ✅ Server-side rendering yapar
- ✅ Dynamic routes'ları handle eder
- ✅ Image optimization sağlar
- ✅ API routes'ları functions'a çevirir

## 📞 Destek

Sorun yaşarsanız:
- Netlify Docs: https://docs.netlify.com/
- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js/
- GitHub Issues: https://github.com/netlify/netlify-plugin-nextjs
