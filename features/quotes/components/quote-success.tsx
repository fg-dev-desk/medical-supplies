"use client"

import { CheckCircle, Download, Mail, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import type { QuoteRequest } from "../types/quote"

interface QuoteSuccessProps {
  quote: QuoteRequest
  onNewQuote: () => void
  onBackToShop: () => void
}

export function QuoteSuccess({ quote, onNewQuote, onBackToShop }: QuoteSuccessProps) {
  const router = useRouter()

  const handleViewFullQuote = () => {
    const quoteData = {
      customerName: quote.customerInfo.name,
      customerEmail: quote.customerInfo.email,
      customerPhone: quote.customerInfo.phone,
      company: quote.customerInfo.company || "N/A",
      address: quote.customerInfo.address || "N/A",
      items: quote.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: quote.subtotal,
      quoteNumber: quote.id,
      date: new Date().toLocaleDateString("es-ES"),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("es-ES"),
    }

    localStorage.setItem("currentQuote", JSON.stringify(quoteData))
    router.push("/quote/final")
  }

  const handleDownloadPDF = () => {
    handleViewFullQuote()
  }

  const handleEmailQuote = () => {
    // Simulate email sending
    console.log("Emailing quote to:", quote.customerInfo.email)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Cotización Enviada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Su solicitud de cotización ha sido enviada exitosamente.</p>
            <p className="font-medium">
              Número de cotización: <span className="text-primary">{quote.id}</span>
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Detalles de la Cotización:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Cliente:</span>
              <span>{quote.customerInfo.name}</span>
              <span className="text-muted-foreground">Email:</span>
              <span>{quote.customerInfo.email}</span>
              <span className="text-muted-foreground">Productos:</span>
              <span>{quote.items.length} artículos</span>
              <span className="text-muted-foreground">Total Estimado:</span>
              <span className="font-semibold text-primary">${quote.subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Recibirá una respuesta en su email dentro de las próximas 24 horas con los precios finales, disponibilidad
              y opciones de envío.
            </p>

            <div className="flex flex-col gap-3">
              <Button onClick={handleViewFullQuote} className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Ver Cotización Completa
              </Button>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleDownloadPDF} variant="outline" className="flex-1 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button onClick={handleEmailQuote} variant="outline" className="flex-1 bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Reenviar Email
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={onNewQuote} variant="outline" className="flex-1 bg-transparent">
                Nueva Cotización
              </Button>
              <Button onClick={() => (window.location.href = "/catalog")} className="flex-1">
                Volver a Comprar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
