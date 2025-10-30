"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { categories } from "@/data/products"
import { fadeInUp, staggerContainer } from "@/lib/animations"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            Kategoriler
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            İhtiyacınıza uygun kategoriyi seçin ve mükemmel ürünleri keşfedin
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/kategori/${category.id}`}>
                <motion.div
                  className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white"
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <motion.h2 
                        className="text-3xl font-serif font-bold text-white mb-3 group-hover:translate-y-[-8px] transition-transform duration-300"
                      >
                        {category.name}
                      </motion.h2>
                      <p className="text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {category.description}
                      </p>
                      
                      {/* Arrow Icon */}
                      <motion.div
                        className="mt-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg 
                          className="w-6 h-6 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M17 8l4 4m0 0l-4 4m4-4H3" 
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-pink-100 to-purple-100 shadow-xl">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              Aradığınızı bulamadınız mı?
            </h3>
            <p className="text-gray-600 mb-6">
              Tüm ürünlerimize göz atın
            </p>
            <Link href="/urunler">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tüm Ürünleri Görüntüle
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
