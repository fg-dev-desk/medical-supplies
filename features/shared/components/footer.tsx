import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MS</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">MedSupply</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Suministros médicos de calidad para profesionales de la salud. Más de 15 años de experiencia en el sector.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#catalog" className="text-muted-foreground hover:text-primary">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-primary">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/catalog?category=equipment" className="text-muted-foreground hover:text-primary">
                  Equipos
                </a>
              </li>
              <li>
                <a href="/catalog?category=instruments" className="text-muted-foreground hover:text-primary">
                  Instrumentos
                </a>
              </li>
              <li>
                <a href="/catalog?category=consumables" className="text-muted-foreground hover:text-primary">
                  Consumibles
                </a>
              </li>
              <li>
                <a href="/catalog?category=safety" className="text-muted-foreground hover:text-primary">
                  Seguridad
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <a 
                  href="https://maps.google.com/?q=Centro+Medico+ABC+Santa+Fe,+Ciudad+de+Mexico" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Av. Principal 123
                  <br />
                  Centro Médico Plaza
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <a 
                  href="https://wa.me/5215555551234" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  +52 (55) 555-1234
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <a 
                  href="mailto:ventas@medsupply.com" 
                  className="text-muted-foreground hover:text-primary"
                >
                  ventas@medsupply.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 MedSupply. Todos los derechos reservados. |<span className="ml-1">Términos y Condiciones</span> |
            <span className="ml-1">Política de Privacidad</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
