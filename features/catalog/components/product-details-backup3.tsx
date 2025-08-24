"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, ShoppingCart, Plus, Minus } from "lucide-react"
import type { Product } from "@/features/catalog/types/product"
import { useCart } from "@/features/cart/context/cart-context"

interface ProductDetailsProps {
  product: Product
}

// Medical product image mappings by category
const getMedicalImage = (category: string, productName: string, index: number = 0) => {
  const categoryImages = {
    instruments: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&crop=center", // Stethoscope main
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=600&fit=crop&crop=center", // Medical tools angle 1
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600&h=600&fit=crop&crop=center", // Thermometer angle 2
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&crop=center&brightness=0.8", // Different angle
    ],
    equipment: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=600&fit=crop&crop=center", // Medical equipment main
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=600&fit=crop&crop=center", // Hospital equipment angle 1
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=600&fit=crop&crop=center", // Medical devices angle 2
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=600&fit=crop&crop=center&brightness=0.8", // Different angle
    ],
    safety: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop&crop=center", // Medical masks main
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&h=600&fit=crop&crop=center", // PPE equipment angle 1
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=600&fit=crop&crop=center", // Medical gloves angle 2
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop&crop=center&brightness=0.8", // Different angle
    ],
    supplies: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&crop=center", // Medical supplies main
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=600&fit=crop&crop=center", // Syringes angle 1
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=600&fit=crop&crop=center", // Medical bandages angle 2
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&crop=center&brightness=0.8", // Different angle
    ]
  }

  const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.supplies
  return images[index % images.length]
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  const productImages = [
    getMedicalImage(product.category, product.name, 0),
    getMedicalImage(product.category, product.name, 1),
    getMedicalImage(product.category, product.name, 2),
    getMedicalImage(product.category, product.name, 3),
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">MÉDICO</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === index ? "border-emerald-600 shadow-md" : "border-gray-200 hover:border-emerald-300"
                }`}
              >
                <img
                  src={productImages[index]}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    // Fallback to gradient background if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                  <span className="text-emerald-600 text-xs font-bold">{index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="bg-emerald-600 text-white mb-2">NUEVO</Badge>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-600">(5 reseñas)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-emerald-600">${product.price}</span>
              <span className="text-xl text-gray-500 line-through">${(product.price * 1.3).toFixed(2)}</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center border rounded">
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleAddToCart} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  AGREGAR AL CARRITO
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-emerald-50 hover:border-emerald-300">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-emerald-50 hover:border-emerald-300">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Pago Seguro Garantizado</h3>
            <div className="flex space-x-2">
              {["visa", "mastercard", "paypal", "stripe"].map((payment) => (
                <div key={payment} className="w-12 h-8 bg-gray-100 rounded border flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <span className="text-xs font-bold">{payment.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Descripción</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Información detallada del producto</h3>
            <p className="text-gray-600 mb-4">
              Este es un producto médico de alta calidad, diseñado para proporcionar precisión y confiabilidad en entornos médicos profesionales. Fabricado con materiales de primera calidad y siguiendo los más altos estándares de la industria.
            </p>
            <p className="text-gray-600">
              Ideal para uso profesional en hospitales, clínicas y consultorios médicos. Cuenta con certificaciones internacionales y garantía de calidad. Su diseño ergonómico facilita su uso y proporciona comodidad durante procedimientos prolongados.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b pb-4">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold text-sm">{review}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Cliente {review}</h4>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">¡Excelente producto! Muy satisfecho con la calidad y la entrega rápida.</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}