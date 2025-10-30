"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import { motion } from "framer-motion"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { fadeInUp, fadeIn, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations"
import { PromoCarousel } from "@/components/Carousel"

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[700px] md:min-h-[800px] overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-white">
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
                <Sparkles className="w-5 h-5 text-pink-600" />
                <span className="text-sm font-bold text-gray-800">Yeni Sezon Koleksiyonu</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  Güzelliğinizi
                </span>
                <br />
                <span className="text-gray-900">Keşfedin</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0"
              >
                En kaliteli kozmetik ürünleri ile güzelliğinizin tadını çıkarın. 
                Doğal içerikli, dermatolojik olarak test edilmiş ürünler.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/urunler"
                  className="group relative inline-flex items-center justify-center h-14 px-12 rounded-2xl text-base font-bold transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10">Alışverişe Başla</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                <div className="text-3xl font-bold text-pink-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Ürün Çeşidi</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 -right-10 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="text-3xl font-bold text-purple-600 mb-1">%100</div>
                <div className="text-sm text-gray-600">Doğal İçerik</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none" />
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none"
            style={{ animationDelay: '1s' }}
          />
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Popüler Kategoriler
            </h2>
            <p className="text-lg text-gray-600">İhtiyacınıza uygun kategoriyi seçin</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/kategori/${category.id}`}
                  className="group block"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <Image
                      src={category.image}
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
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Carousel */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <PromoCarousel />
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-lg text-gray-600">En popüler ve beğenilen ürünlerimiz</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/urunler">
              <Button size="lg" variant="outline" className="border-2 hover:bg-pink-50 shadow-lg">
                Tüm Ürünleri Görüntüle
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Star,
                title: "Kaliteli Ürünler",
                description: "Dermatolojik olarak test edilmiş, güvenilir markalar"
              },
              {
                icon: Sparkles,
                title: "Hızlı Teslimat",
                description: "Siparişleriniz özenle paketlenir ve hızlıca teslim edilir"
              },
              {
                icon: Star,
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
                    className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
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
