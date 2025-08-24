"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Pill, Heart, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-cyan-100 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Hero */}
          <div className="lg:col-span-2 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10">
              <Badge className="bg-emerald-500 text-white mb-4">Hasta 50% OFF Hoy Solamente!</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Equipos Médicos
                <br />
                <span className="text-emerald-600">Profesionales</span>
              </h1>
              <p className="text-gray-600 mb-6 text-lg">Desde $89.99</p>
              <Button
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 flex items-center gap-2"
                onClick={() => (window.location.href = "/catalog")}
              >
                <ShoppingBag className="w-5 h-5" />
                Comprar Ahora
              </Button>
            </div>

            <div className="absolute right-8 top-8 text-emerald-300 opacity-20">
              <Stethoscope className="w-16 h-16" />
            </div>
            <div className="absolute right-16 bottom-8 text-emerald-400 opacity-30">
              <Pill className="w-10 h-10" />
            </div>
          </div>

          {/* Side Offers */}
          <div className="space-y-6">
            {/* First Aid Kit Offer */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Kit Primeros
                    <br />
                    Auxilios
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Completo</p>
                  <Button
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2"
                    onClick={() => (window.location.href = "/catalog?category=safety")}
                  >
                    <Heart className="w-4 h-4" />
                    Comprar
                  </Button>
                </div>
                <div className="text-emerald-500">
                  <Heart className="w-12 h-12" />
                </div>
              </div>
            </div>

            {/* Hand Sanitizer Offer */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Gel Antibacterial
                    <br />
                    500ml
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Desinfectante</p>
                  <Button
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2"
                    onClick={() => (window.location.href = "/catalog?category=safety")}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Comprar
                  </Button>
                </div>
                <div className="text-emerald-500">
                  <Pill className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
