"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Search, Filter } from "lucide-react"
import { categories, popularTags, availableColors, availableSizes, products } from "@/features/catalog/data/products"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  colors: string[]
  sizes: string[]
  tags: string[]
  searchQuery: string
}

interface ShopSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function ShopSidebar({ filters, onFiltersChange }: ShopSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)

    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked ? [...filters.colors, color] : filters.colors.filter((c) => c !== color)

    onFiltersChange({ ...filters, colors: newColors })
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked ? [...filters.sizes, size] : filters.sizes.filter((s) => s !== size)

    onFiltersChange({ ...filters, sizes: newSizes })
  }

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag]

    onFiltersChange({ ...filters, tags: newTags })
  }

  const handlePriceChange = (newRange: number[]) => {
    onFiltersChange({ ...filters, priceRange: [newRange[0], newRange[1]] })
  }

  const handleSearch = () => {
    onFiltersChange({ ...filters, searchQuery: searchTerm })
  }

  const getCategoryCount = (categoryKey: string) => {
    return (products || []).filter((p) => p.category === categoryKey).length
  }

  const topRatedProducts = (products || [])
    .filter((p) => p.rating && p.rating >= 4.5)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Product Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Categorías de Productos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={filters.categories.includes(key)}
                    onCheckedChange={(checked) => handleCategoryChange(key, checked as boolean)}
                    className="border-2 border-gray-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  />
                  <label htmlFor={key} className="text-sm cursor-pointer hover:text-emerald-600">
                    {category.name}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({getCategoryCount(key)})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filter By Price */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar por Precio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={500}
              step={5}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Rated Product */}
      <Card>
        <CardHeader>
          <CardTitle>Productos Mejor Valorados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRatedProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-3 hover:bg-emerald-50 p-2 rounded cursor-pointer transition-colors"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = `/product/${product.id}`
                  }
                }}>
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium line-clamp-2">{product.name}</h4>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= (product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <p className="text-sm text-emerald-600 font-semibold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Objects */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 border border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
            <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSearch}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer ${filters.tags.includes(tag) ? "bg-teal-600" : "hover:bg-teal-50"}`}
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Size */}
      <Card>
        <CardHeader>
          <CardTitle>Tallas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {availableSizes.map((size) => (
              <Button
                key={size}
                variant={filters.sizes.includes(size) ? "default" : "outline"}
                size="sm"
                className={`h-12 text-xs ${filters.sizes.includes(size) ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-white border-gray-300 hover:bg-emerald-50 hover:border-emerald-300 text-gray-700"}`}
                onClick={() => handleSizeChange(size, !filters.sizes.includes(size))}
              >
                {size}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Color */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Colores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {availableColors.map((color) => (
              <button
                key={color.value}
                className={`w-8 h-8 rounded border-2 ${filters.colors.includes(color.value) ? "border-emerald-600 ring-2 ring-emerald-200" : "border-gray-200 hover:border-gray-400"}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleColorChange(color.value, !filters.colors.includes(color.value))}
                title={color.name}
              />
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Promotional Banner */}
      <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">Protección Covid-19</h3>
            <p className="text-sm mb-4">Mascarillas y Equipos</p>
            <Button variant="secondary" size="sm" className="bg-white text-blue-700 hover:bg-gray-100">
              Ver Productos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
