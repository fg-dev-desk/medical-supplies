import { Building2 } from "lucide-react"

export function BrandsStrip() {
  const medicalBrands = [
    "Johnson & Johnson",
    "Pfizer", 
    "Abbott",
    "Medtronic",
    "Bayer",
    "Roche",
    "Novartis",
    "3M Health Care"
  ]

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Marcas de Confianza
          </h2>
          <p className="text-sm text-muted-foreground">
            Distribuidores oficiales de las principales marcas médicas del mundo
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {medicalBrands.map((brand, index) => (
            <div 
              key={brand}
              className="flex items-center justify-center p-6 bg-background rounded-lg border border-border hover:shadow-md transition-all duration-300 group min-h-[80px]"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Building2 className="w-6 h-6 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-foreground/80 truncate">
                    {brand}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Logo aquí
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}