"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Globe, Shield, Zap, Users, TrendingUp, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hakkımızda
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Global ölçekte hizmet veren, teknoloji odaklı ve müşteri memnuniyetini merkeze alan uluslararası bir e-ticaret platformu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Vizyonumuz</h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                  <strong className="text-blue-600">PickPrime LLC</strong>, global ölçekte hizmet veren, teknoloji odaklı ve müşteri memnuniyetini merkeze alan uluslararası bir e-ticaret platformudur. Amacımız, dünyanın her köşesindeki müşterilere güvenilir markaları, kaliteli ürünleri ve hızlı teslimatı tek bir dijital çatı altında sunmaktır.
                </p>
                <p>
                  Küresel tedarik zincirimiz, doğrulanmış üreticiler ve güvenilir lojistik iş ortaklarımız sayesinde her kategoride geniş ürün çeşitliliği sunuyoruz; elektronik, moda, aksesuar, ev & yaşam ürünleri ve daha fazlasını dünyanın dört bir yanındaki kullanıcılara ulaştırıyoruz.
                </p>
                <p>
                  PickPrime olarak yalnızca bir alışveriş platformu değil, modern e-ticaretin geleceğini şekillendiren bir teknoloji ekosistemi olmayı hedefliyoruz. Kullanıcı dostu arayüzümüz, güvenli ödeme altyapımız, hızlı teslimat süreçlerimiz ve sürekli geliştirilen hizmet modelimizle müşterilerimize değer katıyoruz.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Neden PickPrime?</h2>
            <p className="text-lg text-gray-600">Müşterilerimize sunduğumuz değerler</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Global Erişim",
                description: "Dünyanın her yerinden binlerce ürüne tek platformda erişim imkanı"
              },
              {
                icon: Shield,
                title: "Güvenli Alışveriş",
                description: "256-bit SSL şifreleme ve güvenli ödeme altyapısı ile korunan işlemler"
              },
              {
                icon: Zap,
                title: "Hızlı Teslimat",
                description: "Güvenilir lojistik ortaklarımızla hızlı ve güvenli kargo hizmeti"
              },
              {
                icon: Users,
                title: "Müşteri Memnuniyeti",
                description: "7/24 müşteri destek ekibimiz her zaman yanınızda"
              },
              {
                icon: TrendingUp,
                title: "Rekabetçi Fiyatlar",
                description: "Doğrudan üreticilerden tedarik ile en uygun fiyat garantisi"
              },
              {
                icon: Award,
                title: "Kalite Güvencesi",
                description: "Doğrulanmış satıcılar ve orijinal ürün garantisi"
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: "150+", label: "Ülke" },
              { number: "10K+", label: "Ürün Çeşidi" },
              { number: "50K+", label: "Mutlu Müşteri" },
              { number: "99%", label: "Müşteri Memnuniyeti" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Alışverişe Başlamaya Hazır mısınız?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Binlerce ürün arasından size en uygun olanı bulun ve güvenle sipariş verin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/urunler"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                Ürünleri Keşfet
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all"
              >
                Bize Ulaşın
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
