"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye } from "lucide-react"
import { useCart } from "@/features/cart/context/cart-context"
import Link from "next/link"
import type { Product } from "../types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <Card className="h-full flex flex-col group hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex-1">
        <Link href={`/product/${product.id}`} className="block">
          <div className="aspect-square bg-muted rounded-md mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
            <img
              src={`/placeholder_svg.png?height=200&width=200&text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </Link>

        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
              <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
            </Link>
            <Badge variant="secondary" className="ml-2 shrink-0">
              {product.category}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/product/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            <Eye className="w-4 h-4 mr-2" />
            Ver Detalles
          </Button>
        </Link>
        <Button onClick={() => addItem(product)} className="flex-1" disabled={product.stock === 0}>
          <Plus className="w-4 h-4 mr-2" />
          {product.stock === 0 ? "Sin Stock" : "Agregar"}
        </Button>
      </CardFooter>
    </Card>
  )
}
