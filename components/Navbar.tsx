"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Search, Store, Menu, X, Home, Grid3x3, Package } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function Navbar() {
  const { totalItems } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200' 
          : 'bg-white/70 backdrop-blur-md border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
              className="relative"
            >
              {/* Gradient Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-pink-500/10 rounded-full blur-xl group-hover:from-pink-500/20 group-hover:via-orange-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
              
              {/* Logo Container */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <Image
                  src="/images/pickprime.jpeg"
                  alt="PickPrime"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                  unoptimized
                />
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/0 via-transparent to-orange-600/0 group-hover:from-pink-600/10 group-hover:to-orange-600/10 transition-all duration-500"></div>
              </div>
              
              {/* Pulse Animation Ring - Only on Hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></div>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: '/', label: 'Ana Sayfa', Icon: Home },
              { href: '/kategoriler', label: 'Kategoriler', Icon: Grid3x3 },
              { href: '/urunler', label: 'Ürünler', Icon: Package },
              { href: '/hakkimizda', label: 'Hakkımızda', Icon: Package },
              { href: '/iletisim', label: 'İletişim', Icon: Package },
            ].map((link) => {
              const IconComponent = link.Icon
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="group relative px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-pink-600 transition-all duration-300 rounded-xl hover:bg-pink-50"
                >
                  <span className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {link.label}
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="hidden md:flex rounded-xl">
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
            
            <Link href="/sepet">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="relative rounded-xl">
                  <ShoppingCart className="h-5 w-5" />
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span 
                        className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-xs text-white flex items-center justify-center font-bold shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-2">
                {[
                  { href: '/', label: 'Ana Sayfa', Icon: Home },
                  { href: '/kategoriler', label: 'Kategoriler', Icon: Grid3x3 },
                  { href: '/urunler', label: 'Ürünler', Icon: Package },
                  { href: '/hakkimizda', label: 'Hakkımızda', Icon: Package },
                  { href: '/iletisim', label: 'İletişim', Icon: Package },
                ].map((link) => {
                  const IconComponent = link.Icon
                  return (
                    <Link 
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all rounded-xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <IconComponent className="w-5 h-5" />
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
