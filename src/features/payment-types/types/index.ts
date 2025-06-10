interface AuthResponse {
  access: string
  refresh: string
}

interface PaymentType {
  created_at: string
  icon: string
  id: number
  key: string
  name: string
  status: boolean
}

interface IPayment {
  created_at: string
  id: number
  payment_type: PaymentType
  placement: number
}

export type { AuthResponse, IPayment, PaymentType }
