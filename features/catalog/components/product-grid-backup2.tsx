"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Star, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/features/cart/context/cart-context"
import { useRouter } from "next/navigation"
import type { Product } from "@/features/catalog/types/product"

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
  sortBy: string
  onViewModeChange: (viewMode: "grid" | "list") => void
  onSortChange: (sortBy: string) => void
}

// Medical product image mappings by category
const getMedicalImage = (category: string, productName: string) => {
  const categoryImages = {
    instruments: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center", // Stethoscope
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=400&fit=crop&crop=center", // Medical tools
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=400&fit=crop&crop=center", // Thermometer
    ],
    equipment: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center", // Medical equipment
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&crop=center", // Hospital equipment
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=400&fit=crop&crop=center", // Medical devices
    ],
    safety: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center", // Medical masks
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=400&fit=crop&crop=center", // PPE equipment
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&crop=center", // Medical gloves
    ],
    supplies: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center", // Medical supplies
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=400&fit=crop&crop=center", // Syringes
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&crop=center", // Medical bandages
    ]
  }

  const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.supplies
  const hash = productName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return images[hash % images.length]
}

export function ProductGrid({ 
  products, 
  viewMode, 
  sortBy, 
  onViewModeChange, 
  onSortChange 
}: ProductGridProps) {
  const { addItem } = useCart()
  const router = useRouter()

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
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
          <Select value={sortBy} onValueChange={onSortChange}>
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
              onClick={() => onViewModeChange("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
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
              <div className="aspect-square rounded-t-lg overflow-hidden bg-gray-50">
                <img
                  src={getMedicalImage(product.category, product.name)}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    // Fallback to colored div if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MÉDICO</span>
                  </div>
                </div>
              </div>
              <Badge className="absolute top-2 left-2 bg-emerald-600 text-white">NUEVO</Badge>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <h3 className="font-semibold text-gray-800 hover:text-emerald-600 mb-2 line-clamp-2">{product.name}</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-emerald-600">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${(product.price * 1.3).toFixed(2)}</span>
                </div>

                <Button 
                  size="sm" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
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
        <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
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