import { supabase } from './supabase'
import { Product, Category } from '@/types/supabase'

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
// PRODUCTS
// =====================================================

/**
 * Fetch all active products
 */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

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
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  // Increment view count
  if (data) {
    await supabase
      .from('products')
      .update({ view_count: data.view_count + 1 })
      .eq('id', data.id)
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
