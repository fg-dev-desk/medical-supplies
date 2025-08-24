"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import { useCart } from "@/features/cart/context/cart-context"
import { medicalProducts } from "../data/products"
import { useRouter } from "next/navigation"

export function TrendingProducts() {
  const { addItem } = useCart()
  const router = useRouter()

  // Get last 4 products as trending
  const trendingProducts = medicalProducts.slice(-4)

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() // Prevent card click navigation
    addItem(product)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Productos en Tendencia</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer relative group"
              onClick={() => handleCardClick(product.id)}
            >
              {/* Product Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-emerald-500 text-white">NUEVO</Badge>
              </div>

              {/* Product Image Placeholder */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Package className="w-10 h-10 text-emerald-500 mx-auto" />
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-emerald-700 line-clamp-2">{product.name}</div>
                    <div className="text-xs text-emerald-600">Imagen aquí</div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 hover:text-emerald-600 mb-2 text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-emerald-600">${product.price}</span>
                    <span className="text-xs text-gray-500 line-through">${(product.price * 1.15).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs transition-colors"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Agregar al Carrito
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}