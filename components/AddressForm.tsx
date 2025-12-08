"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, User, Phone, Mail, Home, Building2, MapPinned } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddressData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  district: string
  postalCode: string
  addressTitle: string
}

interface AddressFormProps {
  onSubmit: (data: AddressData) => void
  onBack: () => void
}

export function AddressForm({ onSubmit, onBack }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    addressTitle: "Ev"
  })

  const [errors, setErrors] = useState<Partial<AddressData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof AddressData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<AddressData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Ad Soyad gerekli"
    if (!formData.email.trim()) {
      newErrors.email = "E-posta gerekli"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta girin"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon gerekli"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Geçerli bir telefon numarası girin"
    }
    if (!formData.address.trim()) newErrors.address = "Adres gerekli"
    if (!formData.city.trim()) newErrors.city = "Şehir gerekli"
    if (!formData.district.trim()) newErrors.district = "İlçe gerekli"
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Posta kodu gerekli"
    } else if (!/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "5 haneli posta kodu girin"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Teslimat Adresi</h2>
            <p className="text-gray-600">Siparişinizin teslim edileceği adresi girin</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Adres Başlığı
            </label>
            <div className="flex gap-3">
              {["Ev", "İş", "Diğer"].map((title) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, addressTitle: title }))}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                    formData.addressTitle === title
                      ? "bg-gradient-to-r from-pink-600 to-orange-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {title === "Ev" && <Home className="w-4 h-4 inline mr-2" />}
                  {title === "İş" && <Building2 className="w-4 h-4 inline mr-2" />}
                  {title === "Diğer" && <MapPinned className="w-4 h-4 inline mr-2" />}
                  {title}
                </button>
              ))}
            </div>
          </div>

          {/* Full Name & Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Ad Soyad *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.fullName
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                } focus:outline-none`}
                placeholder="Adınız ve Soyadınız"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                E-posta *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                } focus:outline-none`}
                placeholder="ornek@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Telefon *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.phone
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-pink-500"
              } focus:outline-none`}
              placeholder="5XX XXX XX XX"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Home className="w-4 h-4 inline mr-1" />
              Adres *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors resize-none ${
                errors.address
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-pink-500"
              } focus:outline-none`}
              placeholder="Mahalle, Sokak, Bina No, Daire No"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* City, District, Postal Code */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Şehir *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.city
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                } focus:outline-none`}
                placeholder="İstanbul"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                İlçe *
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.district
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                } focus:outline-none`}
                placeholder="Kadıköy"
              />
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">{errors.district}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Posta Kodu *
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                maxLength={5}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.postalCode
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                } focus:outline-none`}
                placeholder="34000"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Geri Dön
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600"
              size="lg"
            >
              Ödemeye Geç
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
