export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  stock: number
  image?: string
  rating?: number
  reviews?: number
  isNew?: boolean
  isOnSale?: boolean
  colors?: string[]
  sizes?: string[]
  tags?: string[]
  brand?: string
}
