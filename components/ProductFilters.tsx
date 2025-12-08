'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Subcategory } from '@/types'
import { SortOption } from '@/types'

interface ProductFiltersProps {
  subcategories: Subcategory[]
  selectedSubcategory?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: SortOption
  onSubcategoryChange: (slug: string | undefined) => void
  onPriceChange: (min?: number, max?: number) => void
  onStockChange: (inStock: boolean) => void
  onSortChange: (sort: SortOption) => void
  onClearFilters: () => void
}

export default function ProductFilters({
  subcategories,
  selectedSubcategory,
  minPrice,
  maxPrice,
  inStock,
  sortBy,
  onSubcategoryChange,
  onPriceChange,
  onStockChange,
  onSortChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(true)
  const [subcategoryOpen, setSubcategoryOpen] = useState(true)
  const [localMinPrice, setLocalMinPrice] = useState(minPrice?.toString() || '')
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice?.toString() || '')

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'En Yeni' },
    { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
    { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
    { value: 'popular', label: 'En Popüler' },
    { value: 'rating', label: 'En Yüksek Puan' },
  ]

  const hasActiveFilters = selectedSubcategory || minPrice !== undefined || maxPrice !== undefined || inStock

  const handlePriceApply = () => {
    const min = localMinPrice ? parseFloat(localMinPrice) : undefined
    const max = localMaxPrice ? parseFloat(localMaxPrice) : undefined
    onPriceChange(min, max)
  }

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4 flex gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filtreler</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
              Aktif
            </span>
          )}
        </button>

        <select
          value={sortBy || 'newest'}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Filters Sidebar */}
      <div className="hidden lg:block space-y-6">
        {/* Sort */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Sıralama</h3>
          <select
            value={sortBy || 'newest'}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <button
              onClick={() => setSubcategoryOpen(!subcategoryOpen)}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="text-lg font-semibold">Alt Kategoriler</h3>
              {subcategoryOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {subcategoryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <button
                    onClick={() => onSubcategoryChange(undefined)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      !selectedSubcategory
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Tümü
                  </button>
                  {subcategories.map((subcat) => (
                    <button
                      key={subcat.id}
                      onClick={() => onSubcategoryChange(subcat.slug)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedSubcategory === subcat.slug
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {subcat.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Price Range */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <button
            onClick={() => setPriceOpen(!priceOpen)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="text-lg font-semibold">Fiyat Aralığı</h3>
            {priceOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {priceOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-3 overflow-hidden"
              >
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Min Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={localMinPrice}
                    onChange={(e) => setLocalMinPrice(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Max Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={localMaxPrice}
                    onChange={(e) => setLocalMaxPrice(e.target.value)}
                    placeholder="10000"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handlePriceApply}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Uygula
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stock Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inStock || false}
              onChange={(e) => onStockChange(e.target.checked)}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-gray-700">Sadece Stokta Olanlar</span>
          </label>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Filtreleri Temizle
          </button>
        )}
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Filtreler</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Subcategories */}
                {subcategories.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Alt Kategoriler</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          onSubcategoryChange(undefined)
                          setIsOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          !selectedSubcategory
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        Tümü
                      </button>
                      {subcategories.map((subcat) => (
                        <button
                          key={subcat.id}
                          onClick={() => {
                            onSubcategoryChange(subcat.slug)
                            setIsOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedSubcategory === subcat.slug
                              ? 'bg-primary text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {subcat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile Price Range */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Fiyat Aralığı</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Min Fiyat (₺)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={localMinPrice}
                        onChange={(e) => setLocalMinPrice(e.target.value)}
                        placeholder="0"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Max Fiyat (₺)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={localMaxPrice}
                        onChange={(e) => setLocalMaxPrice(e.target.value)}
                        placeholder="10000"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={() => {
                        handlePriceApply()
                        setIsOpen(false)
                      }}
                      className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Uygula
                    </button>
                  </div>
                </div>

                {/* Mobile Stock Filter */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStock || false}
                      onChange={(e) => {
                        onStockChange(e.target.checked)
                      }}
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-gray-700">Sadece Stokta Olanlar</span>
                  </label>
                </div>

                {/* Mobile Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      onClearFilters()
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Filtreleri Temizle
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
