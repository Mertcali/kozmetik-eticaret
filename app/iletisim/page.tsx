"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "@/components/ui/toaster"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast({
      title: "Mesajınız Gönderildi!",
      description: "En kısa sürede size dönüş yapacağız.",
      type: "success",
    })

    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
              İletişim
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sorularınız, önerileriniz veya destek talebiniz için bizimle iletişime geçin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-6">Bize Ulaşın</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Konu *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? (
                      "Gönderiliyor..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Mesaj Gönder
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">İletişim Bilgileri</h2>
                <p className="text-gray-600 mb-8">
                  Herhangi bir sorunuz veya öneriniz için bize ulaşabilirsiniz. Müşteri memnuniyeti bizim için önceliklidir.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">E-posta</h3>
                    <a 
                      href="mailto:contactpickprime@gmail.com" 
                      className="text-blue-600 hover:underline"
                    >
                      contactpickprime@gmail.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      7/24 e-posta desteği
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-700">Pazartesi - Cuma: 09:00 - 18:00</p>
                    <p className="text-gray-700">Cumartesi: 10:00 - 16:00</p>
                    <p className="text-gray-700">Pazar: Kapalı</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Konum</h3>
                    <p className="text-gray-700">
                      Global E-Commerce Platform
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Dünyanın her yerinden hizmet veriyoruz
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-3">Sıkça Sorulan Sorular</h3>
                <p className="mb-6 text-blue-100">
                  Aklınıza takılan soruların cevaplarını SSS sayfamızda bulabilirsiniz.
                </p>
                <Button 
                  variant="outline" 
                  className="bg-white text-blue-600 hover:bg-blue-50 border-0"
                >
                  SSS Sayfasını Görüntüle
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Response Time Banner */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Ortalama Yanıt Süresi: 24 Saat</h3>
            <p className="text-gray-600">
              Mesajınıza en geç 24 saat içinde dönüş yapıyoruz. Acil durumlar için e-posta adresimizden bize ulaşabilirsiniz.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
