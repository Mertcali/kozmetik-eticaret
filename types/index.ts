export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  featured?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface Category {
  id: string
  name: string
  image: string
  description: string
}
