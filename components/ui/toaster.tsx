"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Toast, ToastProps } from "./toast"

let toastIdCounter = 0
const listeners: Array<(toast: Omit<ToastProps, "onClose">) => void> = []

export function toast({
  title,
  description,
  type = "success",
}: {
  title?: string
  description?: string
  type?: "success" | "error" | "info"
}) {
  const id = String(toastIdCounter++)
  listeners.forEach((listener) => listener({ id, title, description, type }))
}

export function Toaster() {
  const [toasts, setToasts] = useState<Omit<ToastProps, "onClose">[]>([])

  useEffect(() => {
    const listener = (toast: Omit<ToastProps, "onClose">) => {
      setToasts((prev) => [...prev, toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 4000) // 4 saniye göster
    }

    listeners.push(listener)

    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            {...t}
            onClose={() =>
              setToasts((prev) => prev.filter((toast) => toast.id !== t.id))
            }
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
