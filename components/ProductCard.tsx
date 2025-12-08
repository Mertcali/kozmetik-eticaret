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
import { isInStock, getDiscountPercentage } from "@/lib/api"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!isInStock(product)) {
      toast({
        title: "Stokta Yok",
        description: "Bu ürün şu anda stokta bulunmamaktadır.",
        type: "error",
      })
      return
    }

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

  const discountPercentage = product.compare_at_price 
    ? getDiscountPercentage(product.price, product.compare_at_price)
    : 0

  return (
    <Link href={`/urun/${product.slug}`}>
      <motion.div 
        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
              {discountPercentage}% İndirim
            </div>
          )}
          {/* Stock Badge */}
          {!isInStock(product) && (
            <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
              Stokta Yok
            </div>
          )}
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
          <div className="flex items-center justify-between mb-2">
            <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              {product.stock_quantity} Adet
            </div>
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">({product.review_count})</span>
              </div>
            )}
          </div>
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.short_description && (
            <p className="text-sm text-gray-600 line-clamp-1 mb-3">
              {product.short_description}
            </p>
          )}
          <div className="flex items-center justify-between mt-4">
            <div>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <span className="text-sm text-gray-400 line-through block">
                  {product.compare_at_price.toFixed(2)} ₺
                </span>
              )}
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                {product.price.toFixed(2)} ₺
              </span>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="icon"
                onClick={handleAddToCart}
                disabled={!isInStock(product)}
                className="h-11 w-11 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50"
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
