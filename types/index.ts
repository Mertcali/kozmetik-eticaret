import { Product as SupabaseProduct, Category as SupabaseCategory, Subcategory as SupabaseSubcategory } from './supabase'

// Re-export Supabase types
export type { Product, Category, Order, OrderItem } from './supabase'

// Extended Subcategory with product count
export interface Subcategory extends SupabaseSubcategory {
  product_count?: number
}

// Extended types for cart functionality
export interface CartItem {
  id: string
  name: string
  price: number
  image_url: string
  quantity: number
  slug: string
  stock_quantity: number
}

// Filter and sort types
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating'

export interface ProductFilters {
  categorySlug?: string
  subcategorySlug?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  search?: string
  sortBy?: SortOption
}

// Helper function to convert Supabase Product to CartItem
export function productToCartItem(product: SupabaseProduct, quantity: number = 1): CartItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image_url: product.image_url,
    quantity,
    slug: product.slug,
    stock_quantity: product.stock_quantity,
  }
}
