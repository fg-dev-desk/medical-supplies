import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { CartProvider } from "@/features/cart/context/cart-context"
import { QuoteProvider } from "@/features/quotes/context/quote-context"
import { CartSidebar } from "@/features/cart/components/cart-sidebar"
import { Header } from "@/features/shared/components/header"
import { Footer } from "@/features/shared/components/footer"

export const metadata: Metadata = {
  title: "MedSupply Pro - Suministros Médicos",
  description: "Suministros médicos profesionales con sistema de cotizaciones",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: GeistSans.style.fontFamily }} className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <QuoteProvider>
          <CartProvider>
            <div className="min-h-screen bg-background">
              <Header />
              <main>
                {children}
              </main>
              <Footer />
              <CartSidebar />
            </div>
          </CartProvider>
        </QuoteProvider>
      </body>
    </html>
  )
}