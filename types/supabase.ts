export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subcategories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          category_id: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          category_id: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          category_id?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          price: number
          compare_at_price: number | null
          cost_price: number | null
          category_id: string | null
          subcategory_id: string | null
          image_url: string
          images: string[] | null
          sku: string | null
          barcode: string | null
          stock_quantity: number
          low_stock_threshold: number
          weight: number | null
          dimensions: Json | null
          is_featured: boolean
          is_active: boolean
          meta_title: string | null
          meta_description: string | null
          tags: string[] | null
          rating: number
          review_count: number
          view_count: number
          sales_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          price: number
          compare_at_price?: number | null
          cost_price?: number | null
          category_id?: string | null
          subcategory_id?: string | null
          image_url: string
          images?: string[] | null
          sku?: string | null
          barcode?: string | null
          stock_quantity?: number
          low_stock_threshold?: number
          weight?: number | null
          dimensions?: Json | null
          is_featured?: boolean
          is_active?: boolean
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[] | null
          rating?: number
          review_count?: number
          view_count?: number
          sales_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          price?: number
          compare_at_price?: number | null
          cost_price?: number | null
          category_id?: string | null
          subcategory_id?: string | null
          image_url?: string
          images?: string[] | null
          sku?: string | null
          barcode?: string | null
          stock_quantity?: number
          low_stock_threshold?: number
          weight?: number | null
          dimensions?: Json | null
          is_featured?: boolean
          is_active?: boolean
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[] | null
          rating?: number
          review_count?: number
          view_count?: number
          sales_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_name: string
          customer_email: string
          customer_phone: string | null
          shipping_address: Json
          billing_address: Json | null
          subtotal: number
          tax: number
          shipping_cost: number
          discount: number
          total: number
          status: string
          payment_status: string
          payment_method: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_name: string
          customer_email: string
          customer_phone?: string | null
          shipping_address: Json
          billing_address?: Json | null
          subtotal: number
          tax?: number
          shipping_cost?: number
          discount?: number
          total: number
          status?: string
          payment_status?: string
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string | null
          shipping_address?: Json
          billing_address?: Json | null
          subtotal?: number
          tax?: number
          shipping_cost?: number
          discount?: number
          total?: number
          status?: string
          payment_status?: string
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          product_sku: string | null
          quantity: number
          price: number
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          product_sku?: string | null
          quantity: number
          price: number
          subtotal: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          product_sku?: string | null
          quantity?: number
          price?: number
          subtotal?: number
          created_at?: string
        }
      }
      carousel_banners: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          description: string | null
          image_url: string
          button_text: string
          button_link: string
          badge: string | null
          gradient_class: string
          display_order: number
          is_active: boolean
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          description?: string | null
          image_url: string
          button_text?: string
          button_link: string
          badge?: string | null
          gradient_class?: string
          display_order?: number
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          description?: string | null
          image_url?: string
          button_text?: string
          button_link?: string
          badge?: string | null
          gradient_class?: string
          display_order?: number
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Helper types for easier usage
export type Category = Database['public']['Tables']['categories']['Row']
export type Subcategory = Database['public']['Tables']['subcategories']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type CarouselBanner = Database['public']['Tables']['carousel_banners']['Row']

export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type SubcategoryInsert = Database['public']['Tables']['subcategories']['Insert']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']
export type CarouselBannerInsert = Database['public']['Tables']['carousel_banners']['Insert']
