"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import { useCart } from "@/features/cart/context/cart-context"
import { medicalProducts } from "../data/products"
import { useRouter } from "next/navigation"

export function FeaturedProducts() {
  const { addItem } = useCart()
  const router = useRouter()

  // Get first 6 products as featured
  const featuredProducts = medicalProducts.slice(0, 6)

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation()
    addItem(product)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Productos Destacados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer relative group"
              onClick={() => handleCardClick(product.id)}
            >
              {/* Product Badge */}
              {index < 2 && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-emerald-500 text-white">NUEVO</Badge>
                </div>
              )}

              {/* Product Image Placeholder */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Package className="w-12 h-12 text-emerald-500 mx-auto" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-emerald-700 line-clamp-2">{product.name}</div>
                    <div className="text-xs text-emerald-600">Imagen aquí</div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2 hover:text-emerald-600 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-emerald-600">${product.price}</span>
                    {index < 3 && (
                      <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors" 
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