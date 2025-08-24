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
    "/medical-product.png",
    "/medical-product-angle-2.png",
    "/medical-product-angle-3.png",
    "/medical-product-angle-4.png",
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-blue-50 rounded-lg flex items-center justify-center">
            <img
              src={`/placeholder-9ihpy.png?key=q4v35&height=400&width=400&text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index - 1)}
                className={`w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center border-2 ${
                  selectedImage === index - 1 ? "border-green-600" : "border-gray-200"
                }`}
              >
                <img
                  src={`/text_9v5p5.png?key=9v5p5&height=80&width=80&text=${encodeURIComponent(product.name + " " + index)}`}
                  alt={`${product.name} ${index}`}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="bg-green-600 mb-2">NUEVO</Badge>
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
              <span className="text-3xl font-bold text-green-600">${product.price}</span>
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
                <Button onClick={handleAddToCart} className="flex-1 bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  AGREGAR AL CARRITO
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Pago Seguro Garantizado</h3>
            <div className="flex space-x-2">
              {["visa", "mastercard", "paypal", "stripe"].map((payment) => (
                <div key={payment} className="w-12 h-8 bg-gray-100 rounded border flex items-center justify-center">
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
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
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