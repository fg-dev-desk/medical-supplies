import { Suspense } from "react"
import { ShopSidebar } from "@/features/catalog/components/shop-sidebar"
import { ProductGrid } from "@/features/catalog/components/product-grid"
import { Breadcrumb } from "@/features/shared/components/breadcrumb"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tienda de Productos Médicos</h1>
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Tienda", href: "/shop" },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-1/4">
            <ShopSidebar />
          </div>

          {/* Product Grid */}
          <div className="w-3/4">
            <Suspense fallback={<div>Cargando productos...</div>}>
              <ProductGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}