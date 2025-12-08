"use client"

import { ProductCard } from "@/components/ProductCard"
import ProductFilters from "@/components/ProductFilters"
import SearchBar from "@/components/SearchBar"
import { useEffect, useState } from "react"
import { getProducts, getSubcategories } from "@/lib/api"
import { Product, Subcategory, SortOption } from "@/types"
import { motion } from "framer-motion"

export default function ProductsPage() {
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
        const [productsData, subcategoriesData] = await Promise.all([
          getProducts({
            subcategorySlug: selectedSubcategory,
            minPrice,
            maxPrice,
            inStock,
            sortBy,
            search: searchQuery,
          }),
          getSubcategories(),
        ])
        setProducts(productsData)
        setSubcategories(subcategoriesData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [selectedSubcategory, minPrice, maxPrice, inStock, sortBy, searchQuery])

  const handleClearFilters = () => {
    setSelectedSubcategory(undefined)
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setInStock(false)
    setSortBy('newest')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent"
          >
            Tüm Ürünler
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            {loading ? 'Yükleniyor...' : `${products.length} ürün bulundu`}
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <SearchBar
            onSearch={setSearchQuery}
            initialValue={searchQuery}
            placeholder="Ürün ara..."
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
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
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-square bg-white rounded-2xl mb-4 shadow-sm"></div>
                    <div className="h-4 bg-white rounded w-full mb-2 shadow-sm"></div>
                    <div className="h-4 bg-white rounded w-2/3 shadow-sm"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">Ürün Bulunamadı</h3>
                <p className="text-gray-600 mb-6">
                  Arama kriterlerinize uygun ürün bulunamadı.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
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
