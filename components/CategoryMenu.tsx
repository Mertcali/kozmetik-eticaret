"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Category, Subcategory } from "@/types"

interface CategoryMenuProps {
  categories: Category[]
  subcategories: Subcategory[]
  onCategorySelect?: (categorySlug: string) => void
  onSubcategorySelect?: (subcategorySlug: string) => void
}

export function CategoryMenu({ 
  categories, 
  subcategories,
  onCategorySelect,
  onSubcategorySelect
}: CategoryMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Get subcategories for a specific category
  const getSubcategoriesForCategory = (categoryId: string) => {
    return subcategories.filter(sub => sub.category_id === categoryId)
  }

  // Check if category has products (we'll assume it does if it has subcategories or is active)
  const categoryHasProducts = (category: Category) => {
    const subs = getSubcategoriesForCategory(category.id)
    return subs.length > 0 || category.is_active
  }

  // Filter categories that have products
  const activeCategoriesWithProducts = categories.filter(categoryHasProducts)

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-bold text-lg text-gray-900">Kategoriler</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {activeCategoriesWithProducts.map((category) => {
          const categorySubcategories = getSubcategoriesForCategory(category.id)
          const hasSubcategories = categorySubcategories.length > 0

          return (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                href={`/kategori/${category.slug}`}
                onClick={(e) => {
                  if (onCategorySelect) {
                    e.preventDefault()
                    onCategorySelect(category.slug)
                  }
                }}
                className="flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {category.image_url && (
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={category.image_url} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <span className="font-medium text-gray-700 group-hover:text-pink-600 transition-colors">
                    {category.name}
                  </span>
                </div>
                {hasSubcategories && (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-pink-600 transition-colors" />
                )}
              </Link>

              {/* Subcategory Dropdown */}
              <AnimatePresence>
                {hasSubcategories && hoveredCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-0 ml-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
                  >
                    <div className="p-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{category.name}</p>
                      <p className="text-xs text-gray-500">Alt Kategoriler</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {categorySubcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/kategori/${category.slug}/${subcategory.slug}`}
                          onClick={(e) => {
                            if (onSubcategorySelect) {
                              e.preventDefault()
                              onSubcategorySelect(subcategory.slug)
                            }
                          }}
                          className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 transition-colors group"
                        >
                          <span className="text-sm text-gray-700 group-hover:text-pink-600 font-medium">
                            {subcategory.name}
                          </span>
                          {subcategory.description && (
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                              {subcategory.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
