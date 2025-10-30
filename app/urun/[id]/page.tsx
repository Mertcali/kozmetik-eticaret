"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { toast } from "@/components/ui/toaster"

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const product = products.find((p) => p.id === Number(params.id))

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h2>
        <Link href="/urunler">
          <Button>Ürünlere Dön</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Sepete Eklendi!",
      description: `${product.name} başarıyla sepetinize eklendi.`,
      type: "success",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/urunler" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Ürünlere Dön
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full mb-4">
            {product.category}
          </div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mb-6">
            {product.price} ₺
          </p>
          
          <div className="prose prose-gray mb-8">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Sepete Ekle
            </Button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Ürün Özellikleri</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Dermatolojik olarak test edilmiştir</li>
              <li>✓ Paraben içermez</li>
              <li>✓ Hayvanlar üzerinde test edilmemiştir</li>
              <li>✓ Orijinal üründür</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
