import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Sobre MedSupply</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Más de 15 años proporcionando equipos y suministros médicos de la más alta calidad a profesionales de la
            salud en toda la región.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Nuestra Misión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Facilitar el acceso a equipos médicos de calidad superior, contribuyendo al mejoramiento de la atención
                sanitaria mediante productos confiables, servicio personalizado y precios competitivos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Nuestra Visión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ser la empresa líder en distribución de suministros médicos, reconocida por nuestra excelencia en
                servicio, innovación tecnológica y compromiso con la salud de la comunidad.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Nuestros Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Calidad</h3>
                <p className="text-sm text-muted-foreground">
                  Productos certificados que cumplen los más altos estándares internacionales
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Servicio</h3>
                <p className="text-sm text-muted-foreground">
                  Atención personalizada y asesoramiento especializado para cada cliente
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Confianza</h3>
                <p className="text-sm text-muted-foreground">
                  Relaciones duraderas basadas en transparencia y cumplimiento
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Rapidez</h3>
                <p className="text-sm text-muted-foreground">
                  Entregas oportunas y respuesta ágil a las necesidades urgentes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Company Stats */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">Nuestra Experiencia</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Clientes Satisfechos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-muted-foreground">Productos Disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Soporte Técnico</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-6">Certificaciones y Acreditaciones</h2>
          <p className="text-muted-foreground mb-8">
            Contamos con todas las certificaciones necesarias para garantizar la calidad y seguridad de nuestros
            productos.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <span>ISO 9001:2015</span>
            <span>FDA Registered</span>
            <span>CE Marking</span>
            <span>INVIMA</span>
          </div>
        </div>
      </main>
    </div>
  )
}
