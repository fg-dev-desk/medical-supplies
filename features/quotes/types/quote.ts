export interface QuoteRequest {
  id: string
  customerInfo: {
    name: string
    email: string
    phone: string
    company?: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    category: string
  }>
  subtotal: number
  requestDate: Date
  status: "pending" | "sent" | "approved" | "rejected"
  notes?: string
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  company?: string
  address: string
  city: string
  state: string
  zipCode: string
}
