"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Star, ShoppingCart } from "lucide-react"
import { products } from "@/features/catalog/data/products"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useCart } from "@/features/cart/context/cart-context"
import { useRouter } from "next/navigation"

export function ProductGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("default")
  const { addItem } = useCart()
  const router = useRouter()

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() // Prevent card click navigation
    addItem(product)
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Mostrando 1-{products.length} de {products.length} resultados
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Ordenar Por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Ordenar Por</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="name">Nombre: A a Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-3 gap-6" : "space-y-4"}>
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCardClick(product.id)}
          >
            <div className="relative">
              <div className="aspect-square bg-blue-50 rounded-t-lg flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-500 rounded"></div>
              </div>
              <Badge className="absolute top-2 left-2 bg-green-600">NUEVO</Badge>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <h3 className="font-semibold text-gray-800 hover:text-green-600 mb-2">{product.name}</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${(product.price * 1.3).toFixed(2)}</span>
                </div>

                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        <Button variant="outline" size="sm">
          Anterior
        </Button>
        <Button variant="default" size="sm" className="bg-green-600">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          Siguiente
        </Button>
      </div>
    </div>
  )
}