"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { QuoteForm } from "@/features/quotes/components/quote-form"
import { useCart } from "@/features/cart/context/cart-context"
import { useQuote } from "@/features/quotes/context/quote-context"
import type { CustomerInfo } from "@/features/quotes/types/quote"

export default function QuotePage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { currentQuote, submitQuote, clearQuote } = useQuote()
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmitQuote = async (customerInfo: CustomerInfo, notes?: string) => {
    if (items.length === 0) {
      router.push("/")
      return
    }

    const quote = await submitQuote(customerInfo, items, total, notes)

    if (typeof window !== 'undefined') {
      localStorage.setItem("currentQuote", JSON.stringify(quote))
    }
    clearCart()
    router.push("/quote/final")
  }

  const handleNewQuote = () => {
    clearQuote()
    setIsSuccess(false)
    router.push("/")
  }

  const handleBackToShop = () => {
    clearQuote()
    setIsSuccess(false)
    router.push("/")
  }

  const handleCancel = () => {
    router.push("/")
  }

  if (items.length === 0) {
    router.push("/")
    return null
  }

  return <QuoteForm onSubmit={handleSubmitQuote} onCancel={handleCancel} />
}
