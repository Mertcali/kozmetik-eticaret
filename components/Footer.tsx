"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Store, Mail, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg ring-2 ring-pink-500/20 group-hover:ring-pink-500/40 transition-all">
                  <Image
                    src="/images/pickprime.jpeg"
                    alt="PickPrime Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                PickPrime
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Global ölçekte hizmet veren, teknoloji odaklı ve müşteri memnuniyetini merkeze alan uluslararası e-ticaret platformu.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" }
              ].map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Hızlı Erişim</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Ana Sayfa" },
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/kategoriler", label: "Kategoriler" },
                { href: "/urunler", label: "Tüm Ürünler" },
                { href: "/iletisim", label: "İletişim" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="hover:text-pink-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Müşteri Hizmetleri</h3>
            <ul className="space-y-3">
              {[
                { href: "#", label: "Sipariş Takibi" },
                { href: "#", label: "İade ve Değişim" },
                { href: "#", label: "Kargo Bilgileri" },
                { href: "#", label: "Sıkça Sorulan Sorular" },
                { href: "#", label: "Güvenli Alışveriş" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="hover:text-pink-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">E-posta</p>
                  <a 
                    href="mailto:contactpickprime@gmail.com" 
                    className="hover:text-pink-400 transition-colors break-all"
                  >
                    contactpickprime@gmail.com
                  </a>
                </div>
              </li>
              <li>
                <p className="text-sm text-gray-400 mb-2">Çalışma Saatleri</p>
                <p className="text-sm">Pazartesi - Cuma: 09:00 - 18:00</p>
                <p className="text-sm">Cumartesi: 10:00 - 16:00</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent font-semibold">PickPrime LLC</span>. Tüm hakları saklıdır.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="#" className="hover:text-pink-400 transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="#" className="hover:text-pink-400 transition-colors">
                Kullanım Koşulları
              </Link>
              <Link href="#" className="hover:text-pink-400 transition-colors">
                Çerez Politikası
              </Link>
              <Link href="#" className="hover:text-pink-400 transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
    </footer>
  )
}
