"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"

export default function CategoryPage() {
  const params = useParams()
  const category = categories.find((c) => c.id === params.id)
  const categoryProducts = products.filter((p) => p.category === params.id)

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Kategori Bulunamadı</h2>
        <Link href="/">
          <Button>Ana Sayfaya Dön</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Ana Sayfaya Dön
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600">
          {category.description} - {categoryProducts.length} ürün
        </p>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">Bu kategoride henüz ürün bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
