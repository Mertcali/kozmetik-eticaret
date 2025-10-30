"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { toast } from "@/components/ui/toaster"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    toast({
      title: "Sepete Eklendi!",
      description: `${product.name} başarıyla sepetinize eklendi.`,
      type: "success",
    })
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  return (
    <Link href={`/urun/${product.id}`}>
      <motion.div 
        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Favorite Button */}
          <motion.button
            onClick={handleLike}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart 
              className={`h-5 w-5 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </motion.button>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5">
          <div className="inline-block px-2 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full mb-2">
            {product.category}
          </div>
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {product.price} ₺
            </span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="icon"
                onClick={handleAddToCart}
                className="h-11 w-11 rounded-xl shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
