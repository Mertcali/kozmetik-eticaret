"use client"

import { useState, useEffect, useRef, useMemo, memo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Category, Subcategory, Product } from "@/types"

interface CategoryMenuProps {
  categories: Category[]
  subcategories: Subcategory[]
  onCategorySelect?: (categorySlug: string) => void
  onSubcategorySelect?: (subcategorySlug: string) => void
}

function CategoryMenuComponent({ 
  categories, 
  subcategories,
  onCategorySelect,
  onSubcategorySelect
}: CategoryMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  // Get subcategories for a specific category (only with products)
  const getSubcategoriesForCategory = useMemo(() => {
    return (categoryId: string) => {
      return subcategories.filter(sub => {
        if (sub.category_id !== categoryId) return false
        // Check if this subcategory has any products
        return (sub.product_count || 0) > 0
      })
    }
  }, [subcategories])

  // Filter categories that have products - memoize to prevent unnecessary recalculations
  const activeCategoriesWithProducts = useMemo(() => {
    return categories.filter(category => {
      const subs = getSubcategoriesForCategory(category.id)
      return subs.length > 0 || category.is_active
    })
  }, [categories, subcategories, getSubcategoriesForCategory])

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-bold text-lg text-gray-900">Kategoriler</h3>
      </div>
      <div className="divide-y divide-gray-100 relative">
        {activeCategoriesWithProducts.map((category) => {
          const categorySubcategories = getSubcategoriesForCategory(category.id)
          const hasSubcategories = categorySubcategories.length > 0

          return (
            <div
              key={category.id}
              className="relative group/category"
              onMouseEnter={() => {
                // Clear any existing timeout
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current)
                }
                setHoveredCategory(category.id)
              }}
              onMouseLeave={() => {
                // Delay hiding to allow moving to submenu
                hoverTimeoutRef.current = setTimeout(() => {
                  setHoveredCategory(null)
                }, 200)
              }}
            >
              <Link
                href={`/kategori/${category.slug}`}
                onClick={(e) => {
                  if (onCategorySelect) {
                    e.preventDefault()
                    onCategorySelect(category.slug)
                    // Clear hover state when category is selected
                    setHoveredCategory(null)
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current)
                    }
                  }
                }}
                className="flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors"
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
                  <span className="font-medium text-gray-700 group-hover/category:text-pink-600 transition-colors">
                    {category.name}
                  </span>
                </div>
                {hasSubcategories && (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover/category:text-pink-600 transition-colors" />
                )}
              </Link>

              {/* Subcategory Dropdown */}
              {hasSubcategories && hoveredCategory === category.id && (() => {
                return (
                  <div 
                    className="absolute left-full top-0 ml-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-[100] pointer-events-auto"
                    style={{ 
                      backgroundColor: 'white',
                      minHeight: '100px'
                    }}
                    onMouseEnter={() => {
                      // Clear timeout when mouse enters submenu
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current)
                      }
                    }}
                    onMouseLeave={() => {
                      // Hide submenu when mouse leaves it
                      setHoveredCategory(null)
                    }}
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
                            // Clear hover state when subcategory is selected
                            setHoveredCategory(null)
                            if (hoverTimeoutRef.current) {
                              clearTimeout(hoverTimeoutRef.current)
                            }
                          }
                        }}
                        className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 transition-colors group/sub"
                      >
                        <span className="text-sm text-gray-700 group-hover/sub:text-pink-600 font-medium">
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
                </div>
                )
              })()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
// Only re-render if props actually change
export const CategoryMenu = memo(CategoryMenuComponent, (prevProps, nextProps) => {
  // Only re-render if categories or subcategories actually changed
  return prevProps.categories === nextProps.categories && 
         prevProps.subcategories === nextProps.subcategories
})
