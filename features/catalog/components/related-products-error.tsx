import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { products } from "@/features/catalog/data/products"
import Link from "next/link"
import { useCart } from "@/features/cart/context/cart-context"

interface RelatedProductsProps {
  currentProductId: string
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const { addItem } = useCart()
  const relatedProducts = products.filter((p) => p.id !== currentProductId).slice(0, 4)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>

      <div className="grid grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className="border rounded-lg hover:shadow-md transition-shadow">
            <div className="relative">
              <div className="aspect-square bg-blue-50 rounded-t-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-500 rounded"></div>
              </div>
              <Badge className="absolute top-2 left-2 bg-green-600">NEW</Badge>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-sm text-gray-800 hover:text-green-600 cursor-pointer mb-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between">
                <span className="text-green-600 font-bold">${product.price}</span>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => addItem(product)}
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