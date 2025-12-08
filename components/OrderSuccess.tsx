"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Package, Truck, Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import confetti from "canvas-confetti"

interface OrderSuccessProps {
  orderNumber: string
  totalAmount: number
  onNewOrder: () => void
}

export function OrderSuccess({ orderNumber, totalAmount, onNewOrder }: OrderSuccessProps) {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6"
        >
          <CheckCircle2 className="w-14 h-14 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Siparişiniz Alındı!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          Ödemeniz başarıyla tamamlandı. Siparişiniz en kısa sürede hazırlanacaktır.
        </motion.p>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sipariş Numarası</p>
              <p className="font-bold text-gray-900 font-mono">#{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ödenen Tutar</p>
              <p className="font-bold text-gray-900">
                {totalAmount.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY"
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Order Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Sipariş Süreci</h3>
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 h-1 bg-gray-200 top-6" style={{ zIndex: 0 }} />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute left-0 h-1 bg-gradient-to-r from-pink-500 to-orange-500 top-6"
              style={{ zIndex: 1 }}
            />

            {/* Step 1 - Completed */}
            <div className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center mb-2"
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-sm font-semibold text-gray-900">Onaylandı</span>
            </div>

            {/* Step 2 - Current */}
            <div className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                className="w-12 h-12 rounded-full bg-white border-4 border-pink-500 flex items-center justify-center mb-2"
              >
                <Package className="w-6 h-6 text-pink-500" />
              </motion.div>
              <span className="text-sm font-semibold text-gray-700">Hazırlanıyor</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1 }}
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2"
              >
                <Truck className="w-6 h-6 text-gray-500" />
              </motion.div>
              <span className="text-sm font-medium text-gray-500">Kargoda</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3 }}
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2"
              >
                <Home className="w-6 h-6 text-gray-500" />
              </motion.div>
              <span className="text-sm font-medium text-gray-500">Teslim Edildi</span>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-4 mb-8 text-left border border-pink-100"
        >
          <p className="text-sm text-gray-800">
            <span className="font-semibold">📧 E-posta gönderildi:</span> Sipariş detaylarınız e-posta adresinize gönderilmiştir.
          </p>
          <p className="text-sm text-gray-800 mt-2">
            <span className="font-semibold">🚚 Kargo takibi:</span> Kargoya verildiğinde SMS ile bilgilendirileceksiniz.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/urunler" className="flex-1">
            <Button
              variant="outline"
              className="w-full"
              size="lg"
            >
              Alışverişe Devam Et
            </Button>
          </Link>
          <Button
            onClick={onNewOrder}
            className="flex-1 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600"
            size="lg"
          >
            Siparişlerim
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
