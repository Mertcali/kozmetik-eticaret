"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react"

const SLIDES = [
  {
    id: 1,
    title: "Yaz Kampanyası",
    description: "Tüm cilt bakım ürünlerinde %25 indirim",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=2000&h=1200&auto=format&fit=crop&q=90",
    badge: "Kampanya",
    gradient: "from-pink-600/90 to-purple-600/90",
  },
  {
    id: 2,
    title: "Yeni Ürünler",
    description: "Doğal içerikli yeni sezon koleksiyonu",
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=2000&h=1200&auto=format&fit=crop&q=90",
    badge: "Yeni",
    gradient: "from-rose-600/90 to-pink-600/90",
  },
  {
    id: 3,
    title: "Çok Satanlar",
    description: "En çok tercih edilen ürünlerimiz",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=2000&h=1200&auto=format&fit=crop&q=90",
    badge: "Popüler",
    gradient: "from-purple-600/90 to-indigo-600/90",
  },
]

export function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[currentIndex].image}
            alt={SLIDES[currentIndex].title}
            fill
            className="object-cover"
            priority
            quality={95}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${SLIDES[currentIndex].gradient} mix-blend-multiply opacity-40`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 lg:px-24">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md w-fit mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-bold text-gray-900">{SLIDES[currentIndex].badge}</span>
            </motion.div>
            
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 100 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl leading-tight"
            >
              {SLIDES[currentIndex].title}
            </motion.h2>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="text-xl md:text-2xl text-white mb-8 max-w-2xl drop-shadow-lg font-medium"
            >
              {SLIDES[currentIndex].description}
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, type: "spring", stiffness: 100 }}
            >
              <Link
                href="/urunler"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-pink-50 transition-all shadow-2xl hover:shadow-pink-500/50 hover:scale-105 text-lg"
              >
                Ürünleri İncele
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center transition-all shadow-xl hover:shadow-2xl hover:scale-110 z-10 opacity-0 group-hover:opacity-100"
        aria-label="Önceki"
      >
        <ChevronLeft className="w-7 h-7 text-gray-900" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center transition-all shadow-xl hover:shadow-2xl hover:scale-110 z-10 opacity-0 group-hover:opacity-100"
        aria-label="Sonraki"
      >
        <ChevronRight className="w-7 h-7 text-gray-900" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full shadow-lg ${
              index === currentIndex
                ? "w-10 h-3.5 bg-white"
                : "w-3.5 h-3.5 bg-white/60 hover:bg-white/90 hover:scale-110"
            }`}
            aria-label={`Slayt ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
