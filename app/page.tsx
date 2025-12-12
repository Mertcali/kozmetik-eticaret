"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Star, Package, Truck, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { fadeInUp, fadeIn, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations"
import { PromoCarousel } from "@/components/Carousel"
import { useEffect, useState } from "react"
import { getCategories, getFeaturedProducts, getCarouselBanners } from "@/lib/api"
import { Product, Category, CarouselBanner } from "@/types"

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [carouselBanners, setCarouselBanners] = useState<CarouselBanner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData, bannersData] = await Promise.all([
          getFeaturedProducts(),
          getCategories(),
          getCarouselBanners(),
        ])
        setFeaturedProducts(productsData)
        setCategories(categoriesData)
        setCarouselBanners(bannersData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[700px] md:min-h-[800px] overflow-hidden bg-gradient-to-br from-pink-50 via-orange-50 to-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-lg mb-8"
              >
                <ShoppingBag className="w-5 h-5 bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent" />
                <span className="text-sm font-bold text-gray-800">Global Alışveriş Deneyimi</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-pink-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  Her Şey
                </span>
                <br />
                <span className="text-gray-900">Bir Tıkla</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0"
              >
                Geniş ürün yelpazemizle ihtiyacınız olan her şeyi bulabilirsiniz. 
                Kaliteli ürünler, hızlı teslimat, güvenli alışveriş.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/urunler"
                  className="group relative inline-flex items-center justify-center h-14 px-12 rounded-2xl text-base font-bold transition-all duration-300 bg-gradient-to-r from-pink-600 to-orange-500 text-white hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10">Alışverişe Başla</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                <Link
                  href="/kategoriler"
                  className="inline-flex items-center justify-center h-14 px-12 rounded-2xl text-base font-semibold transition-all duration-300 border-2 border-pink-300 text-gray-800 hover:bg-pink-50 hover:border-pink-400 hover:scale-105"
                >
                  Kategorileri Keşfet
                </Link>
              </motion.div>
            </motion.div>
            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&auto=format&fit=crop&q=90"
                  alt="Kozmetik Ürünleri"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-10 -left-10 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">10.000+</div>
                <div className="text-sm text-gray-600">Ürün Çeşidi</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 -right-10 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="text-3xl font-bold text-green-600 mb-1">%99</div>
                <div className="text-sm text-gray-600">Müşteri Memnuniyeti</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none" />
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none"
            style={{ animationDelay: '1s' }}
          />
      </section>

      {/* New Year Promotions Carousel */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <PromoCarousel banners={carouselBanners} />
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 bg-gradient-to-r from-pink-50 to-orange-50 px-6 py-3 rounded-2xl border border-pink-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <p className="text-sm md:text-base font-semibold text-gray-800">
                  Yeni Yıl Kampanyası: 500 TL ve üzeri alışverişlerde 100 TL indirim!
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-lg shadow-sm">
                <span className="text-xs text-gray-600 font-medium">Kod:</span>
                <span className="text-sm font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">YENIYIL2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              Popüler Kategoriler
            </h2>
            <p className="text-lg text-gray-600">Aradığınız ürünü kategorilerden keşfedin</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))
            ) : (
              categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/kategori/${category.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <Image
                        src={category.image_url || 'https://via.placeholder.com/400'}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-end p-6">
                        <h3 className="text-white font-bold text-xl group-hover:translate-y-[-4px] transition-transform duration-300">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-lg text-gray-600">En popüler ve beğenilen ürünlerimiz</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Henüz öne çıkan ürün bulunmamaktadır.</p>
              </div>
            )}
          </div>
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/urunler">
              <Button size="lg" variant="outline" className="border-2 hover:bg-blue-50 shadow-lg">
                Tüm Ürünleri Görüntüle
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Package,
                title: "Geniş Ürün Yelpazesi",
                description: "Binlerce ürün seçeneği ile ihtiyacınızı bulun"
              },
              {
                icon: Truck,
                title: "Hızlı Kargo",
                description: "Siparişleriniz özenle paketlenir ve hızlıca teslim edilir"
              },
              {
                icon: Shield,
                title: "Güvenli Alışveriş",
                description: "256-bit SSL sertifikası ile güvenli ödeme"
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
