"use client"

import { Button } from "@/components/ui/button"
import { UserCheck, Users } from "lucide-react"
import { useState, useEffect } from "react"

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 7) // 7 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <p className="text-emerald-100 mb-2">Oferta Especial de Hoy</p>
            <h2 className="text-4xl font-bold mb-4">
              Kit Completo de
              <br />
              Emergencias Médicas
            </h2>
            <p className="text-emerald-100 mb-8">
              Nuestro equipo médico profesional está disponible las 24 horas para brindar el mejor servicio y
              asesoramiento en productos médicos.
            </p>

            {/* Countdown Timer */}
            <div className="flex space-x-6 mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-white text-emerald-600 rounded-lg p-3 font-bold text-xl min-w-[60px]">
                    {value.toString().padStart(2, "0")}
                  </div>
                  <p className="text-emerald-100 text-sm mt-1 capitalize">{unit}</p>
                </div>
              ))}
            </div>

            <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3">RESERVAR AHORA</Button>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="bg-white bg-opacity-10 rounded-full w-80 h-80 mx-auto flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <UserCheck className="w-20 h-20 text-white" />
                <Users className="w-20 h-20 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
