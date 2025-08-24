"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/features/cart/context/cart-context"
import type { CustomerInfo } from "../types/quote"

interface QuoteFormProps {
  onSubmit: (customerInfo: CustomerInfo, notes?: string) => void
  onCancel: () => void
}

export function QuoteForm({ onSubmit, onCancel }: QuoteFormProps) {
  const { items, total } = useCart()
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(customerInfo, notes)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateCustomerInfo = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Solicitar Cotización</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => updateCustomerInfo("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => updateCustomerInfo("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => updateCustomerInfo("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={customerInfo.company}
                  onChange={(e) => updateCustomerInfo("company", e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Dirección *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => updateCustomerInfo("address", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  value={customerInfo.city}
                  onChange={(e) => updateCustomerInfo("city", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado/Provincia *</Label>
                <Input
                  id="state"
                  value={customerInfo.state}
                  onChange={(e) => updateCustomerInfo("state", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">Código Postal *</Label>
                <Input
                  id="zipCode"
                  value={customerInfo.zipCode}
                  onChange={(e) => updateCustomerInfo("zipCode", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                    >
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 font-semibold text-lg">
                    <span>Total Estimado:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Información adicional sobre su pedido, fechas de entrega preferidas, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Enviando..." : "Solicitar Cotización"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
