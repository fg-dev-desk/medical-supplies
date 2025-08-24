"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/features/cart/context/cart-context"
// import { Breadcrumb } from "@/features/shared/components/breadcrumb"
import { ShopSidebar } from "@/features/catalog/components/shop-sidebar"
import { ProductGrid } from "@/features/catalog/components/product-grid"
import { products } from "@/features/catalog/data/products"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  colors: string[]
  sizes: string[]
  tags: string[]
  searchQuery: string
}

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const { items, toggleCart } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const categoryParam = searchParams.get("category")
  const searchParam = searchParams.get("search")

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    colors: [],
    sizes: [],
    tags: [],
    searchQuery: "",
  })

  const [sortBy, setSortBy] = useState("default")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    if (categoryParam && !filters.categories.includes(categoryParam)) {
      setFilters((prev) => ({
        ...prev,
        categories: [categoryParam],
      }))
    }
  }, [categoryParam])

  useEffect(() => {
    if (searchParam && filters.searchQuery !== searchParam) {
      setFilters((prev) => ({
        ...prev,
        searchQuery: searchParam,
      }))
    }
  }, [searchParam])

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }
      if (filters.colors.length > 0 && product.colors) {
        const hasMatchingColor = product.colors.some((color) => filters.colors.includes(color))
        if (!hasMatchingColor) return false
      }
      if (filters.sizes.length > 0 && product.sizes) {
        const hasMatchingSize = product.sizes.some((size) => filters.sizes.includes(size))
        if (!hasMatchingSize) return false
      }
      if (filters.tags.length > 0 && product.tags) {
        const hasMatchingTag = product.tags.some((tag) => filters.tags.includes(tag))
        if (!hasMatchingTag) return false
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesName = product.name.toLowerCase().includes(query)
        const matchesDescription = product.description.toLowerCase().includes(query)
        const matchesTags = product.tags?.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesName && !matchesDescription && !matchesTags) return false
      }
      return true
    })

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return (b.rating || 0) - (a.rating || 0)
        })
    }

    return filtered
  }, [products, filters, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleCart}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-4 shadow-lg relative"
          size="lg"
        >
          <ShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {itemCount}
            </Badge>
          )}
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Catálogo", href: "/catalog" },
          ]}
        /> */}
        <div className="flex gap-8 mt-6">
          <div className="w-80 flex-shrink-0">
            <ShopSidebar filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              viewMode={viewMode}
              sortBy={sortBy}
              onViewModeChange={setViewMode}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      </div>
    </div>
  )
}