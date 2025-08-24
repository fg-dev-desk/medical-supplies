import { notFound } from "next/navigation"
import { ProductDetails } from "@/features/catalog/components/product-details"
import { RelatedProducts } from "@/features/catalog/components/related-products"
import { TopRatedSidebar } from "@/features/catalog/components/top-rated-sidebar"
// import { Breadcrumb } from "@/features/shared/components/breadcrumb"
import { products } from "@/features/catalog/data/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Product Details */}
          <div className="w-3/4">
            <ProductDetails product={product} />
            <div className="mt-12">
              <RelatedProducts currentProductId={product.id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-1/4">
            <TopRatedSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}