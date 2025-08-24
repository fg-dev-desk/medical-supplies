"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { QuoteRequest, CustomerInfo } from "../types/quote"

interface QuoteContextType {
  currentQuote: QuoteRequest | null
  submitQuote: (customerInfo: CustomerInfo, items: any[], total: number, notes?: string) => Promise<QuoteRequest>
  clearQuote: () => void
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [currentQuote, setCurrentQuote] = useState<QuoteRequest | null>(null)

  const submitQuote = async (
    customerInfo: CustomerInfo,
    items: any[],
    total: number,
    notes?: string,
  ): Promise<QuoteRequest> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const quote: QuoteRequest = {
      id: `QT-${Date.now()}`,
      customerInfo,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
      })),
      subtotal: total,
      requestDate: new Date(),
      status: "pending",
      notes,
    }

    setCurrentQuote(quote)
    return quote
  }

  const clearQuote = () => {
    setCurrentQuote(null)
  }

  return <QuoteContext.Provider value={{ currentQuote, submitQuote, clearQuote }}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (context === undefined) {
    throw new Error("useQuote must be used within a QuoteProvider")
  }
  return context
}
