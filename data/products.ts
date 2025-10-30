import { Product, Category } from "@/types"

export const categories: Category[] = [
  {
    id: "cilt-bakimi",
    name: "Cilt Bakımı",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop",
    description: "Cildiniz için özel bakım ürünleri"
  },
  {
    id: "makyaj",
    name: "Makyaj",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop",
    description: "Profesyonel makyaj ürünleri"
  },
  {
    id: "parfum",
    name: "Parfüm",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop",
    description: "Kalıcı ve etkileyici kokular"
  },
  {
    id: "sac-bakimi",
    name: "Saç Bakımı",
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800&auto=format&fit=crop",
    description: "Sağlıklı saçlar için çözümler"
  }
]

export const products: Product[] = [
  // Cilt Bakımı
  {
    id: 1,
    name: "Nemlendirici Yüz Kremi",
    price: 299,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop",
    category: "cilt-bakimi",
    description: "24 saat nemlendirme etkisi ile cildinizi yumuşacık tutar. Hyaluronik asit içerir.",
    featured: true
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    price: 450,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop",
    category: "cilt-bakimi",
    description: "Cilt tonunu eşitler ve aydınlatır. %15 saf vitamin C içerir.",
    featured: true
  },
  {
    id: 3,
    name: "Göz Çevresi Kremi",
    price: 350,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b8f6f7?w=800&auto=format&fit=crop",
    category: "cilt-bakimi",
    description: "Göz çevresindeki kırışıklık ve şişlikleri azaltır."
  },
  {
    id: 4,
    name: "Yüz Temizleme Jeli",
    price: 199,
    image: "https://images.unsplash.com/photo-1556228852-80c3be8c9dff?w=800&auto=format&fit=crop",
    category: "cilt-bakimi",
    description: "Tüm cilt tiplerı için uygun, derin temizlik sağlar."
  },
  
  // Makyaj
  {
    id: 5,
    name: "Mat Ruj - Kırmızı",
    price: 189,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop",
    category: "makyaj",
    description: "Uzun süre kalıcı, mat bitişli ruj. Nemlendiricili formülü.",
    featured: true
  },
  {
    id: 6,
    name: "Fondöten - Doğal Ton",
    price: 350,
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800&auto=format&fit=crop",
    category: "makyaj",
    description: "Orta-yoğun kapatıcılık, doğal mat görünüm."
  },
  {
    id: 7,
    name: "Maskara - Siyah",
    price: 229,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db7f36dd?w=800&auto=format&fit=crop",
    category: "makyaj",
    description: "Kirpikleri uzatır ve dolgunlaştırır, akma yapmaz.",
    featured: true
  },
  {
    id: 8,
    name: "Far Paleti",
    price: 399,
    image: "https://images.unsplash.com/photo-1583241800698-c0411f5c72c2?w=800&auto=format&fit=crop",
    category: "makyaj",
    description: "12 farklı ton, mat ve simli karışımı."
  },

  // Parfüm
  {
    id: 9,
    name: "Rose Gold EDT",
    price: 599,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop",
    category: "parfum",
    description: "Çiçeksi ve odunsu notalar. 50ml, kadın parfümü.",
    featured: true
  },
  {
    id: 10,
    name: "Lavanta & Vanilya EDT",
    price: 549,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop",
    category: "parfum",
    description: "Rahatlatıcı lavanta ve sıcak vanilya karışımı."
  },
  {
    id: 11,
    name: "Citrus Fresh EDT",
    price: 499,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop",
    category: "parfum",
    description: "Ferah narenciye notaları, unisex parfüm."
  },

  // Saç Bakımı
  {
    id: 12,
    name: "Onarıcı Şampuan",
    price: 249,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop",
    category: "sac-bakimi",
    description: "Yıpranmış saçlar için keratinli formül."
  },
  {
    id: 13,
    name: "Saç Maskesi",
    price: 299,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop",
    category: "sac-bakimi",
    description: "Argan yağı içerir, derinlemesine bakım sağlar.",
    featured: true
  },
  {
    id: 14,
    name: "Hacim Veren Sprey",
    price: 219,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&auto=format&fit=crop",
    category: "sac-bakimi",
    description: "İnce telli saçlara hacim ve dolgunluk katar."
  },
  {
    id: 15,
    name: "Saç Serumu",
    price: 349,
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop",
    category: "sac-bakimi",
    description: "Elektriklenmeyi önler, parlak görünüm sağlar."
  }
]
