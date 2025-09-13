# 🏗️ İstanbul Vinç Kiralama Sitesi

Modern, SEO-optimized ve görsel açıdan zengin bir vinç kiralama platformu. İstanbul'un tüm ilçe ve mahalleleri için ayrı kategori sayfaları ile kapsamlı hizmet sunar.

## 🚀 Özellikler

### 🎯 Temel Özellikler

- **İlçe/Mahalle Bazlı Kategorizasyon**: İstanbul'un 39 ilçesi ve tüm mahalleleri için ayrı sayfalar
- **Vinç Galerisi**: Her vinç için 3-4 fotoğraflı slider sistemi
- **SEO Optimizasyonu**: Her sayfa için özel meta etiketler, structured data
- **Responsive Tasarım**: Mobil, tablet ve desktop uyumlu
- **Hızlı Performans**: JSON tabanlı veri yönetimi ile hızlı yükleme
- **Modern UI/UX**: Bootstrap 5 ve özel CSS ile şık tasarım

### 🛠️ Teknik Özellikler

- **Backend**: Node.js + Express.js
- **Template Engine**: Pug
- **Veri Yönetimi**: JSON dosyaları (veritabanı gerektirmez)
- **Frontend**: Vanilla JavaScript (TypeScript yok)
- **Styling**: Bootstrap 5 + Custom CSS
- **Image Slider**: Swiper.js
- **SEO**: Meta tags, Open Graph, JSON-LD

## 📁 Proje Yapısı

```
vinc-kiralama/
├── 📂 src/
│   ├── 📂 controllers/
│   │   ├── homeController.js
│   │   ├── categoryController.js
│   │   └── craneController.js
│   ├── 📂 routes/
│   │   ├── index.js
│   │   ├── categories.js
│   │   └── cranes.js
│   ├── 📂 middleware/
│   │   └── seoMiddleware.js
│   └── 📂 utils/
│       ├── slugGenerator.js
│       └── seoHelper.js
├── 📂 data/
│   ├── cranes.json
│   ├── districts.json
│   └── neighborhoods.json
├── 📂 views/
│   ├── 📂 layouts/
│   │   └── main.pug
│   ├── 📂 partials/
│   │   ├── header.pug
│   │   ├── footer.pug
│   │   ├── crane-card.pug
│   │   └── seo-meta.pug
│   ├── 📂 pages/
│   │   ├── home.pug
│   │   ├── district.pug
│   │   ├── neighborhood.pug
│   │   └── crane-detail.pug
│   └── 📂 components/
│       ├── hero-section.pug
│       └── crane-slider.pug
├── 📂 public/
│   ├── 📂 css/
│   │   ├── main.css
│   │   └── components/
│   ├── 📂 js/
│   │   ├── main.js
│   │   ├── slider.js
│   │   └── seo.js
│   ├── 📂 images/
│   │   ├── 📂 cranes/
│   │   ├── 📂 icons/
│   │   └── 📂 backgrounds/
│   └── 📂 fonts/
├── 📄 app.js
├── 📄 package.json
└── 📄 README.md
```

## 🛠️ Kurulum

### Ön Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd vinc-kiralama
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

### 4. Projeyi Görüntüleyin

Tarayıcınızda `http://localhost:3000` adresine gidin.

## 📦 Bağımlılıklar

### Ana Bağımlılıklar

```json
{
  "express": "^4.18.2",
  "pug": "^3.0.2",
  "helmet": "^7.0.0",
  "compression": "^1.7.4",
  "cors": "^2.8.5"
}
```

### Geliştirme Bağımlılıkları

```json
{
  "nodemon": "^3.0.1",
  "concurrently": "^8.2.0"
}
```

### Frontend Kütüphaneleri (CDN)

- Bootstrap 5.3.2
- Swiper.js 10.3.1
- AOS (Animate On Scroll) 2.3.4

## 📊 JSON Veri Yapıları

### cranes.json

```json
{
  "cranes": [
    {
      "id": "crane-001",
      "name": "Liebherr LTM 1100-5.2",
      "type": "Mobil Vinç",
      "capacity": "100 ton",
      "height": "78 m",
      "radius": "70 m",
      "description": "Şehir içi ve dar alanlarda kullanım için ideal mobil vinç.",
      "features": [
        "Yüksek kaldırma kapasitesi",
        "Kompakt tasarım",
        "Modern kontrol sistemi"
      ],
      "images": [
        "https://example.com/crane1-1.jpg",
        "https://example.com/crane1-2.jpg",
        "https://example.com/crane1-3.jpg",
        "https://example.com/crane1-4.jpg"
      ],
      "dailyPrice": "2500",
      "weeklyPrice": "15000",
      "monthlyPrice": "50000",
      "availability": true,
      "tags": ["mobil", "şehir-içi", "100-ton"],
      "seo": {
        "title": "Liebherr LTM 100 Ton Mobil Vinç Kiralama İstanbul",
        "description": "İstanbul'da Liebherr LTM 100 ton mobil vinç kiralama hizmeti. Uygun fiyat, profesyonel operatör.",
        "keywords": ["100 ton vinç", "mobil vinç kiralama", "istanbul vinç"]
      }
    }
  ]
}
```

### districts.json

```json
{
  "districts": [
    {
      "id": "beyoglu",
      "name": "Beyoğlu",
      "slug": "beyoglu-vinc-kiralama",
      "neighborhoods": ["Taksim", "Galata", "Cihangir", "Kasımpaşa"],
      "description": "Beyoğlu ilçesinde profesyonel vinç kiralama hizmeti.",
      "seo": {
        "title": "Beyoğlu Vinç Kiralama - Mobil ve Sabit Vinç Hizmetleri",
        "description": "Beyoğlu'nda vinç kiralama, mobil vinç, sabit vinç hizmetleri. Uygun fiyat, hızlı teslimat.",
        "keywords": ["beyoğlu vinç kiralama", "taksim vinç", "galata vinç"]
      }
    }
  ]
}
```

## 🎨 Tasarım Sistemi

### Renk Paleti

```css
:root {
  --primary-color: #ff6b35; /* Ana turuncu */
  --secondary-color: #004e89; /* Koyu mavi */
  --accent-color: #ffd23f; /* Sarı */
  --text-dark: #1a1a1a; /* Ana metin */
  --text-light: #6c757d; /* Açık metin */
  --background: #f8f9fa; /* Arka plan */
  --white: #ffffff; /* Beyaz */
  --success: #28a745; /* Yeşil */
  --warning: #ffc107; /* Sarı uyarı */
  --danger: #dc3545; /* Kırmızı */
}
```

### Tipografi

- **Ana Font**: 'Poppins', sans-serif
- **Başlık Font**: 'Roboto Slab', serif
- **Kod Font**: 'Fira Code', monospace

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Prodüksiyon build'i oluştur
npm run build

# Linting
npm run lint

# CSS dosyalarını optimize et
npm run css:build

# JavaScript dosyalarını minimize et
npm run js:build

# Tüm static dosyaları optimize et
npm run optimize

# Test
npm run test
```

## 🚀 SEO Optimizasyonları

### 1. Meta Tags

- Dinamik title ve description
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### 2. Structured Data (JSON-LD)

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "İstanbul Vinç Kiralama",
  "description": "İstanbul'da profesyonel vinç kiralama hizmeti",
  "areaServed": "İstanbul",
  "serviceType": "Vinç Kiralama"
}
```

### 3. URL Yapısı

```
/ (Ana sayfa)
/beyoglu-vinc-kiralama (İlçe)
/beyoglu/taksim-vinc-kiralama (Mahalle)
/vinc/liebherr-ltm-100-ton (Vinç detay)
```

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Small devices (576px ve üzeri) */
@media (min-width: 576px) {
  ...;
}

/* Medium devices (768px ve üzeri) */
@media (min-width: 768px) {
  ...;
}

/* Large devices (992px ve üzeri) */
@media (min-width: 992px) {
  ...;
}

/* Extra large devices (1200px ve üzeri) */
@media (min-width: 1200px) {
  ...;
}

/* XXL devices (1400px ve üzeri) */
@media (min-width: 1400px) {
  ...;
}
```

## 🎯 Performans Optimizasyonları

### 1. Image Optimization

- WebP format desteği
- Lazy loading
- Responsive images
- Progressive JPEG

### 2. CSS/JS Optimization

- Minification
- Gzip compression
- Critical CSS inline
- Async/defer scripts

### 3. Caching Strategy

- Static file caching
- JSON data caching
- Browser caching headers

## 🔍 Arama Motoru Optimizasyonu

### Sayfa Türleri ve SEO Stratejileri

#### 1. Ana Sayfa

- **Title**: "İstanbul Vinç Kiralama - Mobil ve Sabit Vinç Hizmetleri"
- **Focus**: Genel vinç kiralama hizmetleri

#### 2. İlçe Sayfaları

- **Title Pattern**: "{İlçe} Vinç Kiralama - Mobil ve Sabit Vinç Hizmetleri"
- **Focus**: Lokasyon bazlı hizmetler

#### 3. Mahalle Sayfaları

- **Title Pattern**: "{Mahalle} Vinç Kiralama - {İlçe} İstanbul"
- **Focus**: Hyper-local SEO

#### 4. Vinç Detay Sayfaları

- **Title Pattern**: "{Vinç Modeli} - {Kapasite} Vinç Kiralama İstanbul"
- **Focus**: Ürün odaklı SEO

## 🌍 Deployment

### Production Build

```bash
# Environment variables ayarla
export NODE_ENV=production
export PORT=3000

# Başlat
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Analytics ve Tracking

### Google Analytics 4

- Sayfa görüntülemeleri
- Kullanıcı etkileşimleri
- Conversion tracking

### Google Search Console

- Sitemap.xml otomatik oluşturma
- Robots.txt optimizasyonu

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakınız.

## 📞 İletişim

- **Proje Sahibi**: [İsminiz]
- **Email**: [email@domain.com]
- **Website**: [https://domain.com]

---

### 🎉 Başarıyla Oluşturuldu!

Bu README.md dosyası, Cursor IDE'de mükemmel çalışacak şekilde optimize edilmiştir. Proje yapısından deployment'a kadar tüm detaylar dahil edilmiştir.
