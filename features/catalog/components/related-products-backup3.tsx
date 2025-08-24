"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { products } from "@/features/catalog/data/products"
import { useCart } from "@/features/cart/context/cart-context"
import { useRouter } from "next/navigation"

interface RelatedProductsProps {
  currentProductId: string
}

// Medical product image mappings by category
const getMedicalImage = (category: string, productName: string) => {
  const categoryImages = {
    instruments: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop&crop=center", // Stethoscope
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=300&h=300&fit=crop&crop=center", // Medical tools
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=300&fit=crop&crop=center", // Thermometer
    ],
    equipment: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop&crop=center", // Medical equipment
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop&crop=center", // Hospital equipment
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=300&fit=crop&crop=center", // Medical devices
    ],
    safety: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop&crop=center", // Medical masks
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=300&h=300&fit=crop&crop=center", // PPE equipment
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop&crop=center", // Medical gloves
    ],
    supplies: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop&crop=center", // Medical supplies
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=300&h=300&fit=crop&crop=center", // Syringes
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop&crop=center", // Medical bandages
    ]
  }

  const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.supplies
  const hash = productName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return images[hash % images.length]
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const { addItem } = useCart()
  const router = useRouter()
  const relatedProducts = products.filter((p) => p.id !== currentProductId).slice(0, 4)

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() // Prevent card click navigation
    addItem(product)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Relacionados</h2>

      <div className="grid grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div 
            key={product.id} 
            className="border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
            onClick={() => handleCardClick(product.id)}
          >
            <div className="relative">
              <div className="aspect-square rounded-t-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={getMedicalImage(product.category, product.name)}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to colored div if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MED</span>
                  </div>
                </div>
              </div>
              <Badge className="absolute top-2 left-2 bg-emerald-600 text-white">NUEVO</Badge>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <h3 className="font-semibold text-sm text-gray-800 hover:text-emerald-600 group-hover:text-emerald-600 mb-2 line-clamp-2 transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-emerald-600 font-bold">${product.price}</span>
                <Button 
                  size="sm" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-2"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <ShoppingCart className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}