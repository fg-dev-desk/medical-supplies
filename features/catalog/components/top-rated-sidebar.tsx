"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Package } from "lucide-react"
import { products } from "@/features/catalog/data/products"
import Link from "next/link"

export function TopRatedSidebar() {
  const topRatedProducts = products?.slice(0, 3) || []

  return (
    <div className="space-y-6">
      {/* Top Rated Products */}
      <Card>
        <CardHeader>
          <CardTitle>Productos Mejor Valorados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRatedProducts.map((product) => (
              <div 
                key={product.id} 
                className="flex items-center space-x-3 hover:bg-emerald-50 p-2 rounded cursor-pointer transition-colors"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = `/product/${product.id}`
                  }
                }}
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors">{product.name}</h4>
                  <div className="flex items-center space-x-1 my-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-emerald-600 font-semibold">${product.price}</span>
                    <span className="text-xs text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Promotional Banner */}
      <Card className="bg-emerald-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-bold text-emerald-800 mb-2">Ahorra 20%</h3>
          <p className="text-sm text-emerald-600 mb-4">En cada pedido</p>
          <div className="w-20 h-20 bg-emerald-200 rounded-lg mx-auto mb-4 flex items-center justify-center overflow-hidden">
            <img 
              src="/placeholder.svg?height=200&width=200&text=20%+OFF"
              alt="Descuento 20%"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-emerald-500 font-medium cursor-pointer hover:text-emerald-600" onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/catalog'
            }
          }}>Comprar Ahora</p>
        </CardContent>
      </Card>
    </div>
  )
}