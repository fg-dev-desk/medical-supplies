"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Star, ShoppingCart, Package } from "lucide-react"
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

export function ProductGrid({ 
  products, 
  viewMode, 
  sortBy, 
  onViewModeChange, 
  onSortChange 
}: ProductGridProps) {
  const { addItem } = useCart()
  const router = useRouter()
  
  // Pagination state
  const PRODUCTS_PER_PAGE = 9
  const [displayedCount, setDisplayedCount] = useState(PRODUCTS_PER_PAGE)
  const [loading, setLoading] = useState(false)
  const [loadingAll, setLoadingAll] = useState(false)
  
  // Reset pagination when products change (due to filtering/sorting)
  useEffect(() => {
    setDisplayedCount(PRODUCTS_PER_PAGE)
  }, [products])
  
  // Get products to display
  const displayedProducts = (products || []).slice(0, displayedCount)
  const hasMore = displayedCount < (products || []).length

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation() // Prevent card click navigation
    addItem(product)
  }
  
  const handleLoadMore = () => {
    setLoading(true)
    // Simulate loading time
    setTimeout(() => {
      setDisplayedCount(prev => prev + PRODUCTS_PER_PAGE)
      setLoading(false)
    }, 500)
  }
  
  const handleShowAll = () => {
    setLoadingAll(true)
    // Simulate loading time for showing all
    setTimeout(() => {
      setDisplayedCount(products.length)
      setLoadingAll(false)
    }, 800)
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Mostrando 1-{displayedProducts.length} de {products.length} resultados
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
        {displayedProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCardClick(product.id)}
          >
            <div className="relative">
              <div className="aspect-square rounded-t-lg overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Package className="w-12 h-12 text-emerald-500 mx-auto" />
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-emerald-700">{product.name}</div>
                    <div className="text-xs text-emerald-600">Imagen aquí</div>
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

      {/* Load More Buttons */}
      {hasMore && (
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={handleLoadMore}
            disabled={loading || loadingAll}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-base font-medium"
            size="lg"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Cargando...
              </>
            ) : (
              <>
                <Package className="w-4 h-4 mr-2" />
                Cargar Más (+{PRODUCTS_PER_PAGE})
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleShowAll}
            disabled={loading || loadingAll}
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 hover:text-emerald-700 px-6 py-3 text-base font-medium"
            size="lg"
          >
            {loadingAll ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600 mr-2"></div>
                Cargando Todo...
              </>
            ) : (
              <>
                <Grid className="w-4 h-4 mr-2" />
                Mostrar Todo ({products.length})
              </>
            )}
          </Button>
        </div>
      )}
      
      {/* End of products message */}
      {!hasMore && products.length > PRODUCTS_PER_PAGE && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">¡Has visto todos los productos disponibles!</p>
          <p className="text-sm text-gray-400 mt-2">
            Mostrando {products.length} productos en total
          </p>
        </div>
      )}
    </div>
  )
}