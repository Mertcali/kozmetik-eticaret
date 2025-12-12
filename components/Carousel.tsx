"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShoppingBag } from "lucide-react"
import { CarouselBanner } from "@/types/supabase"

interface PromoCarouselProps {
  banners?: CarouselBanner[]
}

export function PromoCarousel({ banners = [] }: PromoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fallback banners if none provided
  const FALLBACK_SLIDES = [
    {
      id: "1",
      title: "Öne Çıkan Ürünler",
      subtitle: "Sezonun En İyileri",
      description: "En popüler ve en çok tercih edilen ürünlerimizi keşfedin",
      image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=2000&h=1200&auto=format&fit=crop&q=90",
      button_text: "Hemen İncele",
      button_link: "/urunler",
      badge: "Özel",
      gradient_class: "from-pink-600/90 to-orange-600/90",
      display_order: 1,
      is_active: true,
      start_date: null,
      end_date: null,
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      title: "En Çok Satanlar",
      subtitle: "Müşteri Favorileri",
      description: "Binlerce müşterimizin tercihi olan ürünler",
      image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=2000&h=1200&auto=format&fit=crop&q=90",
      button_text: "Tüm Ürünler",
      button_link: "/urunler?sortBy=popular",
      badge: "Popüler",
      gradient_class: "from-orange-600/90 to-pink-600/90",
      display_order: 2,
      is_active: true,
      start_date: null,
      end_date: null,
      created_at: "",
      updated_at: "",
    },
    {
      id: "3",
      title: "Yeni Koleksiyon",
      subtitle: "Taze Seçimler",
      description: "Yeni eklenen ürünlerimize göz atın",
      image_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=2000&h=1200&auto=format&fit=crop&q=90",
      button_text: "Keşfet",
      button_link: "/urunler?sortBy=newest",
      badge: "Yeni",
      gradient_class: "from-pink-500/90 to-orange-500/90",
      display_order: 3,
      is_active: true,
      start_date: null,
      end_date: null,
      created_at: "",
      updated_at: "",
    },
  ]

  const SLIDES = banners.length > 0 ? banners : FALLBACK_SLIDES

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [SLIDES.length])

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
            src={SLIDES[currentIndex].image_url}
            alt={SLIDES[currentIndex].title}
            fill
            className="object-cover"
            priority
            quality={95}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${SLIDES[currentIndex].gradient_class} mix-blend-multiply opacity-40`} />
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
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 drop-shadow-2xl leading-tight"
            >
              {SLIDES[currentIndex].title}
            </motion.h2>

            {SLIDES[currentIndex].subtitle && (
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, type: "spring", stiffness: 100 }}
                className="text-2xl md:text-3xl text-white/90 mb-2 drop-shadow-lg font-semibold"
              >
                {SLIDES[currentIndex].subtitle}
              </motion.p>
            )}
            
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
              transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
              className="flex gap-4"
            >
              <Link
                href={SLIDES[currentIndex].button_link}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-600 to-orange-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all text-lg shadow-xl"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {SLIDES[currentIndex].button_text}
              </Link>
              <Link
                href="/urunler"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-md text-gray-900 font-bold rounded-2xl hover:bg-white transition-all shadow-xl hover:scale-105 text-lg"
              >
                Tümünü Gör
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center transition-all shadow-xl hover:shadow-2xl hover:scale-110 z-20 opacity-0 group-hover:opacity-100"
        aria-label="Önceki"
      >
        <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-gray-900" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center transition-all shadow-xl hover:shadow-2xl hover:scale-110 z-20 opacity-0 group-hover:opacity-100"
        aria-label="Sonraki"
      >
        <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-gray-900" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
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
