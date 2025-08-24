"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface ProductFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

const categories = [
  { id: "all", name: "Todos" },
  { id: "equipment", name: "Equipos" },
  { id: "consumables", name: "Consumibles" },
  { id: "instruments", name: "Instrumentos" },
  { id: "safety", name: "Seguridad" },
]

export function ProductFilter({ selectedCategory, onCategoryChange, searchTerm, onSearchChange }: ProductFilterProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar productos médicos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
