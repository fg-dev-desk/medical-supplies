"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Package } from "lucide-react"
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
            className="border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
            onClick={() => handleCardClick(product.id)}
          >
            <div className="relative">
              <div className="aspect-square rounded-t-lg overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <div className="text-center space-y-1">
                  <Package className="w-8 h-8 text-emerald-500 mx-auto" />
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-emerald-700 line-clamp-1">{product.name}</div>
                    <div className="text-xs text-emerald-600">Imagen aquí</div>
                  </div>
                </div>
              </div>
              <Badge className="absolute top-2 left-2 bg-emerald-600 text-white">NUEVO</Badge>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <h3 className="font-semibold text-sm text-gray-800 hover:text-emerald-600 group-hover:text-emerald-600 mb-2 line-clamp-2 transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-emerald-600 font-bold">${product.price}</span>
                <Button 
                  size="sm" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-2"
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