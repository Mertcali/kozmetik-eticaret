"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ArrowLeft, Package, Truck, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { toast } from "@/components/ui/toaster"
import { useEffect, useState } from "react"
import { getProductBySlug, getRelatedProducts, isInStock, getDiscountPercentage } from "@/lib/api"
import { Product } from "@/types"
import { ProductCard } from "@/components/ProductCard"

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function loadProduct() {
      try {
        const slug = params.id as string
        const productData = await getProductBySlug(slug)
        
        if (productData) {
          setProduct(productData)
          const related = await getRelatedProducts(productData.id, productData.category_id)
          setRelatedProducts(related)
        }
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
    if (!isInStock(product)) {
      toast({
        title: "Stokta Yok",
        description: "Bu ürün şu anda stokta bulunmamaktadır.",
        type: "error",
      })
      return
    }

    if (quantity > product.stock_quantity) {
      toast({
        title: "Yetersiz Stok",
        description: `Bu üründen sadece ${product.stock_quantity} adet mevcut.`,
        type: "error",
      })
      return
    }

    addToCart(product, quantity)
    toast({
      title: "Sepete Eklendi!",
      description: `${product.name} (${quantity} adet) başarıyla sepetinize eklendi.`,
      type: "success",
    })
  }

  const discountPercentage = product.compare_at_price 
    ? getDiscountPercentage(product.price, product.compare_at_price)
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/urunler" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Ürünlere Dön
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              {discountPercentage}% İndirim
            </div>
          )}
          {!isInStock(product) && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Stokta Yok</span>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({product.review_count} değerlendirme)</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          {product.short_description && (
            <p className="text-lg text-gray-600 mb-4">{product.short_description}</p>
          )}

          <div className="mb-6">
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-xl text-gray-400 line-through block mb-1">
                {product.compare_at_price.toFixed(2)} ₺
              </span>
            )}
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {product.price.toFixed(2)} ₺
            </p>
          </div>

          {product.description && (
            <div className="prose prose-gray mb-8">
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Stok Durumu:</span>
              <span className={isInStock(product) ? "text-green-600" : "text-red-600"}>
                {isInStock(product) 
                  ? `${product.stock_quantity} adet mevcut` 
                  : 'Stokta yok'}
              </span>
            </div>
            {product.sku && (
              <div className="flex items-center gap-2 text-sm mt-2">
                <span className="font-semibold">SKU:</span>
                <span className="text-gray-600">{product.sku}</span>
              </div>
            )}
          </div>

          {isInStock(product) && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Miktar:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!isInStock(product)}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isInStock(product) ? 'Sepete Ekle' : 'Stokta Yok'}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <Truck className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xs font-semibold">Hızlı Kargo</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-xs font-semibold">Güvenli Ödeme</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <Package className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-xs font-semibold">Orijinal Ürün</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Benzer Ürünler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
