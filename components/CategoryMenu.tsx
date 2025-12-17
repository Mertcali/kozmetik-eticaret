"use client"

import { useState, useEffect, useRef, useMemo, memo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, X, Menu } from "lucide-react"
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
  const [clickedCategory, setClickedCategory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Detect mobile/desktop on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  // Determine which category should show submenu
  // On mobile: only use click, on desktop: use hover or click
  const activeCategory = isMobile ? clickedCategory : (hoveredCategory || clickedCategory)

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
    <>
      {/* Mobile: Category Button */}
      {isMobile && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="lg:hidden w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 font-semibold"
        >
          <Menu className="w-5 h-5" />
          Kategorileri Görüntüle
        </button>
      )}

      {/* Mobile: Drawer */}
      <AnimatePresence>
        {isMobile && isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 z-[200] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[201] lg:hidden overflow-y-auto shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-orange-500 text-white p-4 flex items-center justify-between shadow-lg z-10">
                <h3 className="font-bold text-lg">Kategoriler</h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="divide-y divide-gray-100">
                {activeCategoriesWithProducts.map((category) => {
                  const categorySubcategories = getSubcategoriesForCategory(category.id)
                  const hasSubcategories = categorySubcategories.length > 0

                  return (
                    <div key={category.id}>
                      <div
                        className="flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors cursor-pointer"
                        onClick={() => {
                          if (hasSubcategories) {
                            setClickedCategory(clickedCategory === category.id ? null : category.id)
                          } else {
                            if (onCategorySelect) {
                              onCategorySelect(category.slug)
                              setIsDrawerOpen(false)
                            }
                          }
                        }}
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
                          <span className="font-medium text-gray-700">
                            {category.name}
                          </span>
                        </div>
                        {hasSubcategories && (
                          <ChevronRight 
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              clickedCategory === category.id ? 'rotate-90' : ''
                            }`} 
                          />
                        )}
                      </div>

                      {/* Subcategories in Drawer */}
                      {hasSubcategories && clickedCategory === category.id && (
                        <div className="bg-gray-50 border-t border-gray-200">
                          <div className="p-3 border-b border-gray-200">
                            <p className="text-xs text-gray-500">Alt Kategoriler</p>
                          </div>
                          {categorySubcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              href={`/kategori/${category.slug}/${subcategory.slug}`}
                              onClick={(e) => {
                                if (onSubcategorySelect) {
                                  e.preventDefault()
                                  onSubcategorySelect(subcategory.slug)
                                  setClickedCategory(null)
                                  setIsDrawerOpen(false)
                                }
                              }}
                              className="block px-4 py-2.5 pl-16 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 transition-colors"
                            >
                              <span className="text-sm text-gray-700 font-medium">
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
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop: Original Category Menu */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-lg">
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
                // Only handle hover on desktop
                if (!isMobile) {
                  // Clear any existing timeout
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                  }
                  setHoveredCategory(category.id)
                }
              }}
              onMouseLeave={() => {
                // Only handle hover on desktop
                if (!isMobile) {
                  // Delay hiding to allow moving to submenu
                  hoverTimeoutRef.current = setTimeout(() => {
                    setHoveredCategory(null)
                  }, 200)
                }
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors cursor-pointer"
                onClick={(e) => {
                  // On mobile (touch devices), toggle submenu on click
                  if (hasSubcategories && isMobile) {
                    e.preventDefault()
                    // Toggle: if already clicked, close it; otherwise open it
                    setClickedCategory(clickedCategory === category.id ? null : category.id)
                  } else if (onCategorySelect && !hasSubcategories) {
                    // On desktop without subcategories, navigate
                    onCategorySelect(category.slug)
                    setHoveredCategory(null)
                    setClickedCategory(null)
                  }
                }}
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
                  <ChevronRight 
                    className={`w-4 h-4 text-gray-400 group-hover/category:text-pink-600 transition-all ${
                      clickedCategory === category.id ? 'rotate-90' : ''
                    }`} 
                  />
                )}
              </div>

              {/* Subcategory Dropdown */}
              {hasSubcategories && activeCategory === category.id && (() => {
                return (
                  <div 
                    className="lg:absolute static lg:left-full lg:top-0 lg:ml-2 w-full lg:w-64 bg-gray-50 lg:bg-white lg:rounded-xl lg:shadow-2xl border-t lg:border border-gray-200 lg:z-[100] pointer-events-auto"
                    style={{ 
                      minHeight: '100px'
                    }}
                    onMouseEnter={() => {
                      // Clear timeout when mouse enters submenu (desktop only)
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current)
                      }
                    }}
                    onMouseLeave={() => {
                      // Hide submenu when mouse leaves it (desktop only)
                      if (window.innerWidth >= 1024) {
                        setHoveredCategory(null)
                      }
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
                            // Clear both hover and click states when subcategory is selected
                            setHoveredCategory(null)
                            setClickedCategory(null)
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
    </>
  )
}

// Memoize component to prevent unnecessary re-renders
// Only re-render if props actually change
export const CategoryMenu = memo(CategoryMenuComponent, (prevProps, nextProps) => {
  // Only re-render if categories or subcategories actually changed
  return prevProps.categories === nextProps.categories && 
         prevProps.subcategories === nextProps.subcategories
})
