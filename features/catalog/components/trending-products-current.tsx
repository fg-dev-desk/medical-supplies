"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Stethoscope, Building2, Shield, Syringe } from "lucide-react"
import { useCart } from "@/features/cart/context/cart-context"
import { medicalProducts } from "../data/products"
import Link from "next/link"

export function TrendingProducts() {
  const { addItem } = useCart()

  // Get last 4 products as trending
  const trendingProducts = medicalProducts.slice(-4)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "instruments":
        return <Stethoscope className="w-12 h-12 text-emerald-400" />
      case "equipment":
        return <Building2 className="w-12 h-12 text-emerald-400" />
      case "safety":
        return <Shield className="w-12 h-12 text-emerald-400" />
      default:
        return <Syringe className="w-12 h-12 text-emerald-400" />
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Productos en Tendencia</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-emerald-500 text-white">NUEVO</Badge>
              </div>

              {/* Product Image */}
              <Link href={`/product/${product.id}`}>
                <div className="relative h-40 bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  {getCategoryIcon(product.category)}
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-800 hover:text-emerald-600 mb-2 text-sm cursor-pointer transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-emerald-600">${product.price}</span>
                    <span className="text-xs text-gray-500 line-through">${(product.price * 1.15).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-xs"
                  onClick={() => addItem(product)}
                >
                  Agregar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}