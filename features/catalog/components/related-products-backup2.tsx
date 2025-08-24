"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { products } from "@/features/catalog/data/products"
import { useCart } from "@/features/cart/context/cart-context"
import { useRouter } from "next/navigation"

interface RelatedProductsProps {
  currentProductId: string
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const { addItem } = useCart()
  const router = useRouter()
  const relatedProducts = products.filter((p) => p.id !== currentProductId).slice(0, 4)

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() // Prevent card click navigation
    addItem(product)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Relacionados</h2>

      <div className="grid grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div 
            key={product.id} 
            className="border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCardClick(product.id)}
          >
            <div className="relative">
              <div className="aspect-square bg-blue-50 rounded-t-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-500 rounded"></div>
              </div>
              <Badge className="absolute top-2 left-2 bg-green-600">NUEVO</Badge>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <h3 className="font-semibold text-sm text-gray-800 hover:text-green-600 mb-2">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-green-600 font-bold">${product.price}</span>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <ShoppingCart className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}