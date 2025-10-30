"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import { motion } from "framer-motion"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { fadeInUp, fadeIn, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations"

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200 text-pink-700 text-sm font-medium mb-6 shadow-lg"
              variants={fadeIn}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Yeni Sezon Ürünleri
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent leading-tight"
              variants={fadeInUp}
            >
              Güzelliğinizi Keşfedin
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              En kaliteli kozmetik ürünleri ile güzelliğinizin tadını çıkarın. 
              Doğal içerikli, dermatolojik olarak test edilmiş ürünler.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <Link href="/urunler">
                <Button size="lg" className="group w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all">
                  Alışverişe Başla
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/kategoriler">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 hover:bg-pink-50">
                  Kategorileri Keşfet
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hidden lg:block absolute right-0 top-0 w-1/2 h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-pink-50 z-10" />
            <Image
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop"
              alt="Kozmetik Ürünleri"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 right-20 w-20 h-20 bg-pink-200 rounded-full blur-3xl opacity-50"
            animate={{ 
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-40"
            animate={{ 
              y: [0, 30, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
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
