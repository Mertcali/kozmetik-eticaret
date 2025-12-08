"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProductCard } from "@/components/ProductCard"
import ProductFilters from "@/components/ProductFilters"
import SearchBar from "@/components/SearchBar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getCategoryBySlug, getProducts, getSubcategoriesByCategorySlug } from "@/lib/api"
import { Product, Category, Subcategory, SortOption } from "@/types"
import { motion } from "framer-motion"

export default function CategoryPage() {
  const params = useParams()
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>()
  const [minPrice, setMinPrice] = useState<number>()
  const [maxPrice, setMaxPrice] = useState<number>()
  const [inStock, setInStock] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const slug = params.id as string
        const categoryData = await getCategoryBySlug(slug)
        
        if (categoryData) {
          setCategory(categoryData)
          
          const [productsData, subcategoriesData] = await Promise.all([
            getProducts({
              categorySlug: slug,
              subcategorySlug: selectedSubcategory,
              minPrice,
              maxPrice,
              inStock,
              sortBy,
              search: searchQuery,
            }),
            getSubcategoriesByCategorySlug(slug),
          ])
          
          setProducts(productsData)
          setSubcategories(subcategoriesData)
        }
      } catch (error) {
        console.error('Error loading category data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [params.id, selectedSubcategory, minPrice, maxPrice, inStock, sortBy, searchQuery])

  const handleClearFilters = () => {
    setSelectedSubcategory(undefined)
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setInStock(false)
    setSortBy('newest')
    setSearchQuery('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-white rounded w-1/4 mb-8 shadow-sm"></div>
            <div className="h-12 bg-white rounded w-1/2 mb-4 shadow-sm"></div>
            <div className="h-6 bg-white rounded w-1/3 mb-8 shadow-sm"></div>
            <div className="flex gap-8">
              <div className="w-64 space-y-4">
                <div className="h-64 bg-white rounded-xl shadow-sm"></div>
                <div className="h-64 bg-white rounded-xl shadow-sm"></div>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-96 bg-white rounded-2xl shadow-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4">Kategori Bulunamadı</h2>
          <Link href="/">
            <Button>Ana Sayfaya Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
        </motion.div>

        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent"
          >
            {category.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            {category.description} • {products.length} ürün
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <SearchBar
            onSearch={setSearchQuery}
            initialValue={searchQuery}
            placeholder={`${category.name} içinde ara...`}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:w-64 flex-shrink-0"
          >
            <ProductFilters
              subcategories={subcategories}
              selectedSubcategory={selectedSubcategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              inStock={inStock}
              sortBy={sortBy}
              onSubcategoryChange={setSelectedSubcategory}
              onPriceChange={(min, max) => {
                setMinPrice(min)
                setMaxPrice(max)
              }}
              onStockChange={setInStock}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </motion.aside>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">Ürün Bulunamadı</h3>
                <p className="text-gray-600 mb-6">
                  Bu kategoride henüz ürün bulunmamaktadır veya filtrelere uygun ürün yok.
                </p>
                {(selectedSubcategory || minPrice || maxPrice || inStock || searchQuery) && (
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
