"use client"

import * as React from "react"
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  type?: "success" | "error" | "info"
  action?: React.ReactNode
  onClose: () => void
}

export function Toast({ title, description, type = "success", onClose }: ToastProps) {
  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  }

  const colors = {
    success: "from-green-500 to-emerald-600",
    error: "from-red-500 to-rose-600",
    info: "from-blue-500 to-indigo-600",
  }

  const bgColors = {
    success: "from-green-50 to-emerald-50",
    error: "from-red-50 to-rose-50",
    info: "from-blue-50 to-indigo-50",
  }

  const Icon = icons[type]

  return (
    <motion.div
      className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20"
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className={cn("h-1 bg-gradient-to-r", colors[type])} />
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon with gradient background */}
          <motion.div
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
              colors[type]
            )}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <Icon className="h-5 w-5 text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <motion.p
                className="text-sm font-bold text-gray-900 mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                {title}
              </motion.p>
            )}
            {description && (
              <motion.p
                className="text-sm text-gray-600 leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
