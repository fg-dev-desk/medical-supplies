"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Stethoscope, Building2, Shield, Syringe } from "lucide-react"
import { useCart } from "@/features/cart/context/cart-context"
import { medicalProducts } from "../data/products"
import { useRouter } from "next/navigation"

// Medical product image mappings by category
const getMedicalImage = (category: string, productName: string) => {
  const categoryImages = {
    instruments: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center", // Stethoscope
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop&crop=center", // Medical tools
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop&crop=center", // Thermometer
    ],
    equipment: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center", // Medical equipment
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&crop=center", // Hospital equipment
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center", // Medical devices
    ],
    safety: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&crop=center", // Medical masks
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop&crop=center", // PPE equipment
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop&crop=center", // Medical gloves
    ],
    supplies: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center", // Medical supplies
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop&crop=center", // Syringes
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop&crop=center", // Medical bandages
    ]
  }

  const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.supplies
  const hash = productName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return images[hash % images.length]
}

export function FeaturedProducts() {
  const { addItem } = useCart()
  const router = useRouter()

  // Get first 6 products as featured
  const featuredProducts = medicalProducts.slice(0, 6)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "instruments":
        return <Stethoscope className="w-12 h-12 text-emerald-500" />
      case "equipment":
        return <Building2 className="w-12 h-12 text-emerald-500" />
      case "safety":
        return <Shield className="w-12 h-12 text-emerald-500" />
      default:
        return <Syringe className="w-12 h-12 text-emerald-500" />
    }
  }

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation()
    addItem(product)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Productos Destacados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer relative group"
              onClick={() => handleCardClick(product.id)}
            >
              {/* Product Badge */}
              {index < 2 && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-emerald-500 text-white">NUEVO</Badge>
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={getMedicalImage(product.category, product.name)}
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
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2 hover:text-emerald-600 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-emerald-600">${product.price}</span>
                    {index < 3 && (
                      <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors" 
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