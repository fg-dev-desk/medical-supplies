"use client"

import { X, Minus, Plus, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../context/cart-context"
import { useRouter } from "next/navigation"

export function CartSidebar() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, total } = useCart()
  const router = useRouter()

  const handleRequestQuote = () => {
    // Guardar datos del carrito en localStorage
    const quoteData = {
      items: items,
      total: total,
      timestamp: new Date().toISOString(),
      quoteNumber: `COT-${Date.now()}`,
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem("currentQuote", JSON.stringify(quoteData))
    }

    toggleCart()
    router.push("/quote/final")
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900/30 z-40" onClick={toggleCart} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 z-50 flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Carrito de Compras</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleCart}
            className="hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Tu carrito está vacío</p>
              <p className="text-sm text-gray-400 mt-1">Agrega algunos productos para empezar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-md flex-shrink-0 flex items-center justify-center">
                        <div className="text-center">
                          <Package className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                          <div className="text-xs text-emerald-600">IMG</div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h3>
                        <Badge variant="secondary" className="text-xs mt-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                          {item.category}
                        </Badge>

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-emerald-600">${item.price.toFixed(2)}</span>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0 border-gray-300 hover:bg-gray-50 hover:border-emerald-300"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>

                            <span className="w-8 text-center text-sm font-medium text-gray-700">{item.quantity}</span>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0 border-gray-300 hover:bg-gray-50 hover:border-emerald-300"
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="w-8 h-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right mt-1">
                          <span className="text-sm font-medium text-gray-600">
                            Subtotal: <span className="text-emerald-600 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-emerald-600">${total.toFixed(2)}</span>
            </div>

            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0" 
              size="lg" 
              onClick={handleRequestQuote}
            >
              Solicitar Cotización
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">Los precios son solo referenciales</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}