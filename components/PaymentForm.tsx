"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, Lock, Calendar, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentFormProps {
  amount: number
  onSubmit: () => void
  onBack: () => void
}

export function PaymentForm({ amount, onSubmit, onBack }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [isFlipped, setIsFlipped] = useState(false)
  const [errors, setErrors] = useState<{
    cardNumber?: string
    cardName?: string
    expiry?: string
    cvv?: string
  }>({})

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\s/g, "")
    const formatted = numbers.match(/.{1,4}/g)?.join(" ") || numbers
    return formatted
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + "/" + numbers.slice(2, 4)
    }
    return numbers
  }

  // Luhn algorithm for card validation
  const validateCardNumber = (number: string): boolean => {
    const digits = number.replace(/\s/g, "")
    if (!/^\d{16}$/.test(digits)) return false

    let sum = 0
    let isEven = false

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i])

      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  }

  // Detect card type
  const getCardType = (number: string): string => {
    const digits = number.replace(/\s/g, "")
    if (digits.startsWith("4")) return "visa"
    if (digits.startsWith("5")) return "mastercard"
    if (digits.startsWith("3")) return "amex"
    return "unknown"
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "")
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value))
      if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: undefined }))
    }
  }

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    if (/^[A-Z\s]*$/.test(value)) {
      setCardName(value)
      if (errors.cardName) setErrors(prev => ({ ...prev, cardName: undefined }))
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      setExpiry(formatExpiry(value))
      if (errors.expiry) setErrors(prev => ({ ...prev, expiry: undefined }))
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value)
      if (errors.cvv) setErrors(prev => ({ ...prev, cvv: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = "Geçersiz kart numarası"
    }

    if (!cardName.trim() || cardName.length < 3) {
      newErrors.cardName = "Kart üzerindeki ismi girin"
    }

    if (!expiry || expiry.length !== 5) {
      newErrors.expiry = "Geçerli tarih girin (AA/YY)"
    } else {
      const [month, year] = expiry.split("/").map(Number)
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1

      if (month < 1 || month > 12) {
        newErrors.expiry = "Geçersiz ay"
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = "Kartın süresi dolmuş"
      }
    }

    if (!cvv || cvv.length !== 3) {
      newErrors.cvv = "3 haneli CVV girin"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit()
    }
  }

  const cardType = getCardType(cardNumber)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ödeme Bilgileri</h2>
            <p className="text-gray-600">Güvenli ödeme için kart bilgilerinizi girin</p>
          </div>
        </div>

        {/* Animated Credit Card */}
        <div className="perspective-1000 mb-8">
          <motion.div
            className="relative w-full h-52 cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Card Front */}
            <div
              className="absolute inset-0 rounded-2xl p-6 text-white shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-10 bg-yellow-400 rounded opacity-80" />
                <div className="text-right">
                  {cardType === "visa" && (
                    <span className="text-2xl font-bold">VISA</span>
                  )}
                  {cardType === "mastercard" && (
                    <span className="text-2xl font-bold">Mastercard</span>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-2xl tracking-wider font-mono">
                  {cardNumber || "•••• •••• •••• ••••"}
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-70 mb-1">Kart Sahibi</div>
                  <div className="font-semibold tracking-wide">
                    {cardName || "AD SOYAD"}
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-70 mb-1">Son Kullanma</div>
                  <div className="font-semibold tracking-wide">
                    {expiry || "MM/YY"}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Back */}
            <div
              className="absolute inset-0 rounded-2xl text-white shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }}
            >
              <div className="h-12 bg-black/50 mt-6" />
              <div className="p-6">
                <div className="bg-white h-10 rounded flex items-center justify-end px-4">
                  <span className="text-black font-mono font-bold">
                    {cvv || "•••"}
                  </span>
                </div>
                <div className="mt-4 text-xs opacity-70">
                  Kartın arka yüzündeki 3 haneli güvenlik kodu
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="text-sm text-pink-600 hover:text-pink-700 font-semibold"
            >
              {isFlipped ? "Ön Yüzü Gör" : "Arka Yüzü Gör"}
            </button>
          </div>
        </div>

        {/* Payment Amount */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Ödenecek Tutar</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              {amount.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY"
              })}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kart Numarası *
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className={`w-full px-4 py-3 pl-12 rounded-xl border-2 transition-colors font-mono text-lg ${
                  errors.cardNumber
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                } focus:outline-none`}
                placeholder="1234 5678 9012 3456"
              />
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          {/* Card Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kart Üzerindeki İsim *
            </label>
            <input
              type="text"
              value={cardName}
              onChange={handleCardNameChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors uppercase ${
                errors.cardName
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-pink-500"
              } focus:outline-none`}
              placeholder="AD SOYAD"
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
            )}
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Son Kullanma *
              </label>
              <input
                type="text"
                value={expiry}
                onChange={handleExpiryChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors font-mono ${
                  errors.expiry
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                } focus:outline-none`}
                placeholder="MM/YY"
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-1" />
                CVV *
              </label>
              <input
                type="text"
                value={cvv}
                onChange={handleCvvChange}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors font-mono ${
                  errors.cvv
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                } focus:outline-none`}
                placeholder="123"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Security Info */}
          <div className="flex items-start gap-2 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-100">
            <Info className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-800">
              <p className="font-semibold mb-1">Güvenli Ödeme</p>
              <p className="text-gray-700">
                Ödeme bilgileriniz 256-bit SSL şifreleme ile korunmaktadır. 
                Kart bilgileriniz saklanmaz.
              </p>
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
              <Lock className="w-4 h-4 mr-2" />
              Ödemeyi Tamamla
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
