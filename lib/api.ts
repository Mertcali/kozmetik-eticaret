import { supabase } from './supabase'
import { Product, Category, Subcategory, CarouselBanner } from '@/types/supabase'
import { ProductFilters, SortOption } from '@/types'

// =====================================================
// CAROUSEL BANNERS
// =====================================================

/**
 * Fetch active carousel banners
 */
export async function getCarouselBanners(): Promise<CarouselBanner[]> {
  const now = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('carousel_banners')
    .select('*')
    .eq('is_active', true)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order('display_order', { ascending: true })
    .limit(5)

  if (error) {
    console.error('Error fetching carousel banners:', error)
    return []
  }

  return data || []
}

// =====================================================
// CATEGORIES
// =====================================================

/**
 * Fetch all active categories
 */
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    throw error
  }

  return data || []
}

/**
 * Fetch a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

/**
 * Fetch a single category by ID
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

// =====================================================
// SUBCATEGORIES
// =====================================================

/**
 * Fetch all active subcategories
 */
export async function getSubcategories(): Promise<Subcategory[]> {
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching subcategories:', error)
    throw error
  }

  return data || []
}

/**
 * Fetch subcategories by category ID
 */
export async function getSubcategoriesByCategory(categoryId: string): Promise<Subcategory[]> {
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching subcategories:', error)
    throw error
  }

  return data || []
}

/**
 * Fetch subcategories by category slug
 */
export async function getSubcategoriesByCategorySlug(categorySlug: string): Promise<Subcategory[]> {
  const category = await getCategoryBySlug(categorySlug)
  if (!category) return []
  
  return getSubcategoriesByCategory(category.id)
}

/**
 * Fetch a single subcategory by slug and category
 */
export async function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): Promise<Subcategory | null> {
  const category = await getCategoryBySlug(categorySlug)
  if (!category) return null

  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', category.id)
    .eq('slug', subcategorySlug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching subcategory:', error)
    return null
  }

  return data
}

// =====================================================
// PRODUCTS
// =====================================================

/**
 * Apply sorting to a query
 */
function applySorting(query: any, sortBy?: SortOption) {
  switch (sortBy) {
    case 'price-asc':
      return query.order('price', { ascending: true })
    case 'price-desc':
      return query.order('price', { ascending: false })
    case 'popular':
      return query.order('sales_count', { ascending: false })
    case 'rating':
      return query.order('rating', { ascending: false })
    case 'newest':
    default:
      return query.order('created_at', { ascending: false })
  }
}

/**
 * Fetch all active products with optional filters
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)

  // Apply filters
  if (filters?.categorySlug) {
    const category = await getCategoryBySlug(filters.categorySlug)
    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  // Filter by subcategory (works independently or with category)
  if (filters?.subcategorySlug) {
    // If categorySlug is provided, get subcategory by both
    if (filters.categorySlug) {
      const subcategory = await getSubcategoryBySlug(filters.categorySlug, filters.subcategorySlug)
      if (subcategory) {
        query = query.eq('subcategory_id', subcategory.id)
      }
    } else {
      // If only subcategorySlug is provided, query all subcategories and find by slug
      const { data: subcategories } = await supabase
        .from('subcategories')
        .select('id')
        .eq('slug', filters.subcategorySlug)
        .limit(1)
      
      if (subcategories && subcategories.length > 0) {
        query = query.eq('subcategory_id', (subcategories[0] as any).id)
      }
    }
  }

  if (filters?.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice)
  }

  if (filters?.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice)
  }

  if (filters?.inStock) {
    query = query.gt('stock_quantity', 0)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  // Apply sorting
  query = applySorting(query, filters?.sortBy)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    throw error
  }

  return data || []
}

/**
 * Fetch featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('sales_count', { ascending: false })
    .limit(8)

  if (error) {
    console.error('Error fetching featured products:', error)
    throw error
  }

  return data || []
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single<Product>()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  // Increment view count
  if (data && data.id) {
    // Using RPC or separate update to avoid type inference issues
    supabase
      .from('products')
      // @ts-expect-error Supabase generated types have issues with partial updates
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', data.id)
      .then(({ error: updateError }) => {
        if (updateError) {
          console.error('Error updating view count:', updateError)
        }
      })
  }

  return data
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

/**
 * Fetch products by category ID
 */
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }

  return data || []
}

/**
 * Search products by name or description
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .eq('is_active', true)
    .order('sales_count', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error searching products:', error)
    throw error
  }

  return data || []
}

/**
 * Get related products (same category, excluding current product)
 */
export async function getRelatedProducts(
  productId: string,
  categoryId: string | null,
  limit: number = 4
): Promise<Product[]> {
  if (!categoryId) return []

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', productId)
    .order('sales_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related products:', error)
    return []
  }

  return data || []
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Format price with Turkish Lira symbol
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(price)
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(price: number, compareAtPrice: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}

/**
 * Check if product is in stock
 */
export function isInStock(product: Product): boolean {
  return product.stock_quantity > 0
}

/**
 * Check if product stock is low
 */
export function isLowStock(product: Product): boolean {
  return product.stock_quantity > 0 && product.stock_quantity <= product.low_stock_threshold
}
