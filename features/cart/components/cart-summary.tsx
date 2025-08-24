"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "../context/cart-context"

export function CartSummary() {
  const { items, total } = useCart()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Productos ({itemCount})</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span className="font-medium">A cotizar</span>
        </div>

        <div className="border-t border-border pt-2">
          <div className="flex justify-between font-semibold">
            <span>Total Estimado</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-2">* El precio final se determinará en la cotización</p>
      </CardContent>
    </Card>
  )
}
