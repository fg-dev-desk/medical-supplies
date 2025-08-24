import { Star, Building2, Wrench, Pill, Stethoscope, Target, Package } from "lucide-react"

export function CategoryIcons() {
  const categories = [
    { name: "Mejores Ofertas", icon: Star, href: "#deals" },
    { name: "Equipos Generales", icon: Building2, href: "#equipment" },
    { name: "Accesorios", icon: Wrench, href: "#accessories" },
    { name: "Medicamentos", icon: Pill, href: "#medicine" },
    { name: "Instrumentos", icon: Stethoscope, href: "#instruments" },
    { name: "Mejores Ofertas", icon: Target, href: "#best-deals" },
    { name: "Todos los Productos", icon: Package, href: "#all-products" },
  ]

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-12 overflow-x-auto">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <a
                key={index}
                href={category.href}
                className="flex flex-col items-center space-y-2 min-w-0 hover:text-emerald-500 transition-colors"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-50 transition-colors">
                  <IconComponent className="w-8 h-8 text-gray-600 hover:text-emerald-500 transition-colors" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center whitespace-nowrap">{category.name}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
