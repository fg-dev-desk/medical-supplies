"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Printer,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ArrowLeft,
  Banknote,
  FileText,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  stock: number
}

interface QuoteData {
  items: CartItem[]
  total: number
  timestamp: string
  quoteNumber: string
}

export default function FinalQuotePage() {
  const router = useRouter()
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const savedQuote = localStorage.getItem("currentQuote")
    if (!savedQuote) {
      router.push("/")
      return
    }

    try {
      const quote = JSON.parse(savedQuote)
      setQuoteData(quote)
    } catch (error) {
      console.error("Error parsing quote data:", error)
      router.push("/")
    }
  }, [router])

  const handlePrintPDF = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    if (!quoteData) return

    const iva = quoteData.total * 0.16
    const totalWithIva = quoteData.total + iva

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Cotización ${quoteData.quoteNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #00B894; padding-bottom: 20px; }
              .company-info { background: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
              .quote-info { margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
              .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
              .items-table th { background-color: #00B894; color: white; }
              .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; background: #f8f9fa; padding: 15px; }
              .payment-info { margin-top: 30px; border-top: 2px solid #00B894; padding-top: 20px; }
              .payment-section { margin-bottom: 20px; }
              .highlight { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="color: #00B894; margin: 0;">MedSupply Pro</h1>
              <p style="margin: 5px 0;">Suministros Médicos Profesionales</p>
              <h2 style="margin: 10px 0;">COTIZACIÓN ${quoteData.quoteNumber}</h2>
            </div>
            
            <div class="company-info">
              <h3>Datos de la Empresa</h3>
              <p><strong>MedSupply Pro S.A. de C.V.</strong></p>
              <p>RFC: MSP123456789</p>
              <p>Av. Médica 123, Col. Salud, CP 01234, Ciudad de México, CDMX</p>
              <p>Tel: +52 55 1234-5678 | Email: ventas@medsupplypro.com</p>
            </div>

            <div class="quote-info">
              <div>
                <h3>Información de Cotización</h3>
                <p><strong>Número:</strong> ${quoteData.quoteNumber}</p>
                <p><strong>Fecha:</strong> ${new Date(quoteData.timestamp).toLocaleDateString("es-MX")}</p>
                <p><strong>Válida hasta:</strong> ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("es-MX")}</p>
                <p><strong>Moneda:</strong> Pesos Mexicanos (MXN)</p>
              </div>
            </div>

            <table class="items-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${quoteData.items
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</td>
                    <td>$${(item.price * item.quantity).toLocaleString("es-MX", { minimumFractionDigits: 2 })}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
            
            <div class="total">
              <p>Subtotal: $${quoteData.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</p>
              <p>IVA (16%): $${iva.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</p>
              <p style="font-size: 20px; color: #00B894;">TOTAL: $${totalWithIva.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</p>
            </div>

            <div class="payment-info">
              <h3>INFORMACIÓN PARA PAGO Y COMPRA</h3>
              
              <div class="payment-section">
                <h4>🏦 TRANSFERENCIA BANCARIA / SPEI</h4>
                <p><strong>Banco:</strong> BBVA México</p>
                <p><strong>Cuenta:</strong> 0123456789</p>
                <p><strong>CLABE:</strong> 012345678901234567</p>
                <p><strong>Beneficiario:</strong> MedSupply Pro S.A. de C.V.</p>
                <p><strong>RFC:</strong> MSP123456789</p>
              </div>

              <div class="highlight">
                <h4>📧 ENVÍO DE COMPROBANTE</h4>
                <p>Una vez realizado el pago, enviar comprobante a:</p>
                <p><strong>Email:</strong> pagos@medsupplypro.com</p>
                <p><strong>WhatsApp:</strong> +52 55 1234-5678</p>
                <p>Incluir número de cotización: <strong>${quoteData.quoteNumber}</strong></p>
              </div>

              <div class="payment-section">
                <h4>🧾 DATOS PARA FACTURACIÓN</h4>
                <p>Para solicitar factura, proporcionar:</p>
                <ul>
                  <li>Razón Social completa</li>
                  <li>RFC con homoclave</li>
                  <li>Dirección fiscal completa</li>
                  <li>Email para envío de factura</li>
                  <li>Uso de CFDI</li>
                </ul>
              </div>

              <div class="payment-section">
                <h4>📋 INSTRUCCIONES DE COMPRA</h4>
                <ol>
                  <li>Realizar transferencia SPEI por el monto total</li>
                  <li>Enviar comprobante de pago al email indicado</li>
                  <li>Proporcionar datos de facturación (si requiere)</li>
                  <li>Confirmar dirección de entrega</li>
                  <li>Tiempo de entrega: 3-5 días hábiles</li>
                  <li>Envío gratuito en pedidos mayores a $2,000 MXN</li>
                </ol>
              </div>

              <div class="highlight">
                <p><strong>⚠️ IMPORTANTE:</strong> Esta cotización es válida por 30 días. Los precios incluyen IVA. Productos sujetos a disponibilidad.</p>
              </div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  if (!quoteData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando cotización...</p>
        </div>
      </div>
    )
  }

  const iva = quoteData.total * 0.16
  const totalWithIva = quoteData.total + iva

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
            <div className="flex gap-2">
              <Button onClick={handlePrintPDF} variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
              <Button onClick={handleDownloadPDF} className="bg-primary">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Quote Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quote Header */}
            <Card>
              <CardHeader className="text-center bg-primary text-white">
                <CardTitle className="text-2xl">Cotización Generada</CardTitle>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>#{quoteData.quoteNumber}</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Información de la Cotización</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Fecha:</strong> {new Date(quoteData.timestamp).toLocaleDateString("es-MX")}
                      </p>
                      <p>
                        <strong>Válida hasta:</strong>{" "}
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("es-MX")}
                      </p>
                      <p>
                        <strong>Número:</strong> #{quoteData.quoteNumber}
                      </p>
                      <p>
                        <strong>Moneda:</strong> Pesos Mexicanos (MXN)
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        <Clock className="w-3 h-3 mr-1" />
                        Válida por 30 días
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Datos de la Empresa</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>MedSupply Pro S.A. de C.V.</strong>
                      </p>
                      <p>RFC: MSP123456789</p>
                      <p>Av. Médica 123, Col. Salud</p>
                      <p>CP 01234, Ciudad de México, CDMX</p>
                      <p>Tel: +52 55 1234-5678</p>
                      <p>ventas@medsupplypro.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quote Items */}
            <Card>
              <CardHeader>
                <CardTitle>Productos Cotizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quoteData.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-md flex-shrink-0">
                          <img
                            src={`/abstract-geometric-shapes.png?height=64&width=64&query=${encodeURIComponent(item.name)}`}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.category} • Cantidad: {item.quantity} × $
                            {item.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Subtotal:</span>
                    <span>${quoteData.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>IVA (16%):</span>
                    <span>${iva.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-primary">
                      ${totalWithIva.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="w-5 h-5" />
                  Información de Pago
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Transferencia SPEI</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Banco:</strong> BBVA México
                    </p>
                    <p>
                      <strong>Cuenta:</strong> 0123456789
                    </p>
                    <p>
                      <strong>CLABE:</strong> 012345678901234567
                    </p>
                    <p>
                      <strong>Beneficiario:</strong> MedSupply Pro S.A. de C.V.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Envío de Comprobante</h4>
                      <p className="text-sm text-yellow-800">
                        Enviar comprobante de pago a:
                        <br />
                        <strong>pagos@medsupplypro.com</strong>
                        <br />
                        WhatsApp: <strong>+52 55 1234-5678</strong>
                        <br />
                        Incluir: <strong>{quoteData.quoteNumber}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Datos para Facturación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p className="font-medium">Para solicitar factura, proporcionar:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Razón Social completa</li>
                    <li>RFC con homoclave</li>
                    <li>Dirección fiscal completa</li>
                    <li>Email para envío de factura</li>
                    <li>Uso de CFDI</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">+52 55 1234-5678</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">Email Ventas</p>
                    <p className="text-sm text-muted-foreground">ventas@medsupplypro.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-sm text-muted-foreground">
                      Av. Médica 123, Col. Salud
                      <br />
                      CP 01234, Ciudad de México, CDMX
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instrucciones de Compra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>
                    1. <strong>Realizar</strong> transferencia SPEI
                  </p>
                  <p>
                    2. <strong>Enviar</strong> comprobante de pago
                  </p>
                  <p>
                    3. <strong>Proporcionar</strong> datos de facturación
                  </p>
                  <p>
                    4. <strong>Confirmar</strong> dirección de entrega
                  </p>
                  <p>
                    5. <strong>Tiempo de entrega:</strong> 3-5 días hábiles
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-sm">
                  <p className="text-green-800">
                    <strong>Envío gratuito</strong> en pedidos mayores a $2,000 MXN
                  </p>
                </div>
                <Button className="w-full mt-4">
                  <Phone className="w-4 h-4 mr-2" />
                  Contactar Ventas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
