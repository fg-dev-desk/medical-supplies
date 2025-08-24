"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Stethoscope, Building2, Shield, Syringe } from "lucide-react"
import { useCart } from "@/features/cart/context/cart-context"
import { medicalProducts } from "../data/products"
import { useRouter } from "next/navigation"

// Medical supply product images by category - retail medical products
const getMedicalSupplyImage = (category: string, productName: string) => {
  const categoryImages = {
    instruments: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center", // Stethoscope product
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop&crop=center", // Digital thermometer
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop&crop=center", // Blood pressure monitor
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&crop=center", // Pulse oximeter
      "https://images.unsplash.com/photo-1559761176-3a3b29af9f30?w=400&h=300&fit=crop&crop=center", // Medical reflex hammer
    ],
    equipment: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center", // Wheelchair
      "https://images.unsplash.com/photo-1594824389284-2b1e7a6d0ddc?w=400&h=300&fit=crop&crop=center", // Hospital bed
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center", // IV drip stand
      "https://images.unsplash.com/photo-1559757177-7965ba48ccb1?w=400&h=300&fit=crop&crop=center", // Medical examination table
      "https://images.unsplash.com/photo-1606166187734-a4cb4d7d5b00?w=400&h=300&fit=crop&crop=center", // Defibrillator
    ],
    safety: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&crop=center", // Disposable face masks box
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop&crop=center", // Nitrile gloves box
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop&crop=center", // Hand sanitizer bottles
      "https://images.unsplash.com/photo-1606166187821-79cb9742c52b?w=400&h=300&fit=crop&crop=center", // PPE protective suit
      "https://images.unsplash.com/photo-1584308972449-e20069db20db?w=400&h=300&fit=crop&crop=center", // Face shields
    ],
    supplies: [
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop&crop=center", // Syringes and needles pack
      "https://images.unsplash.com/photo-1607619056575-ad5ed8dbfcc5?w=400&h=300&fit=crop&crop=center", // Medical bandages roll
      "https://images.unsplash.com/photo-1599045118108-bf9954418b76?w=400&h=300&fit=crop&crop=center", // Cotton swabs box
      "https://images.unsplash.com/photo-1576570716215-b5b1b2b4c9b4?w=400&h=300&fit=crop&crop=center", // Gauze pads package
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop&crop=center", // Medical tape rolls
    ]
  }

  const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.supplies
  const hash = productName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return images[hash % images.length]
}

export function TrendingProducts() {
  const { addItem } = useCart()
  const router = useRouter()

  // Get last 4 products as trending
  const trendingProducts = medicalProducts.slice(-4)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "instruments":
        return <Stethoscope className="w-8 h-8 text-emerald-500" />
      case "equipment":
        return <Building2 className="w-8 h-8 text-emerald-500" />
      case "safety":
        return <Shield className="w-8 h-8 text-emerald-500" />
      default:
        return <Syringe className="w-8 h-8 text-emerald-500" />
    }
  }

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() // Prevent card click navigation
    addItem(product)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Productos en Tendencia</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer relative group"
              onClick={() => handleCardClick(product.id)}
            >
              {/* Product Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-emerald-500 text-white">NUEVO</Badge>
              </div>

              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={getMedicalSupplyImage(product.category, product.name)}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                  {getCategoryIcon(product.category)}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 hover:text-emerald-600 mb-2 text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-emerald-600">${product.price}</span>
                    <span className="text-xs text-gray-500 line-through">${(product.price * 1.15).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs transition-colors"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Agregar al Carrito
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}