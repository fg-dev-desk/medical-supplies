import { HeroSection } from "@/features/shared/components/hero-section"
import { CategoryIcons } from "@/features/shared/components/category-icons"
import { FeaturedProducts } from "@/features/catalog/components/featured-products"
import { BrandsStrip } from "@/features/shared/components/brands-strip"
import { PromoBanner } from "@/features/shared/components/promo-banner"
import { TrendingProducts } from "@/features/catalog/components/trending-products"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryIcons />
      <FeaturedProducts />
      <BrandsStrip />
      <PromoBanner />
      <TrendingProducts />
    </>
  )
}