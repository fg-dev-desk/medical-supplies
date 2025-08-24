"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../context/cart-context"
import type { Product } from "@/features/catalog/types/product"

interface CartItemProps {
  item: Product & { quantity: number }
  compact?: boolean
}

export function CartItem({ item, compact = false }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className={`flex items-start space-x-3 ${compact ? "py-2" : "py-4"}`}>
      <div className={`bg-muted rounded-md flex-shrink-0 ${compact ? "w-12 h-12" : "w-16 h-16"}`}>
        <img
          src={`/generic-placeholder-icon.png?height=${compact ? 48 : 64}&width=${compact ? 48 : 64}&query=${encodeURIComponent(item.name)}`}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-foreground line-clamp-2 ${compact ? "text-sm" : ""}`}>{item.name}</h3>

        <Badge variant="secondary" className="text-xs mt-1">
          {item.category}
        </Badge>

        <div className="flex items-center justify-between mt-2">
          <span className={`font-semibold text-primary ${compact ? "text-sm" : ""}`}>${item.price.toFixed(2)}</span>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>

            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 p-0"
              disabled={item.quantity >= item.stock}
            >
              <Plus className="w-3 h-3" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.id)}
              className="w-7 h-7 p-0 text-destructive hover:text-destructive ml-2"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="text-right mt-1">
          <span className={`font-medium ${compact ? "text-sm" : ""}`}>
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
