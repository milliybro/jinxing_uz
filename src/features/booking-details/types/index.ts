import { IRoomStatus } from '@/features/calendar/types'

interface AuthResponse {
  access: string
  refresh: string
}

type sthElse = unknown

interface DataType {
  key: string
  action: number
  total: number
  available: number
  adults: number
  children: number
  details: string
}

interface IBookingDetails {
  id: number
  start_date: string
  end_date: string
  order_total_price: number
  service_total_price: number
  total_paid: number
  total: number
  status: number
  placement: number
  source: ISource | null
  items: Item[]
  order_notes: IOrderNote[]
  services: Service[]
  payments: Payment[]
  prices: Price[]
  order_guests: IOrderGuest[]
  payment_cards: IPaymentCard[]
  created_at: string
  count: number
}

type Service = {
  id: number
  price: number
  total_price: number
  quantity: number
  date: string
  order: number
  order_item: number
  service: {
    id: number
    name: string
    key: string
  }
  created_at: string
}

interface ISource {
  id: number
  name: string
}

interface Item {
  id: number
  price: number
  subtotal: number
  order: number
  room: Room
  room_item: RoomItem
  start_date: string
  end_date: string
  status: IRoomStatus
  order_guests: OrderGuest[]
  created_at: string
}

interface Room {
  id: number
  name: string
  description: string
  person_count: number
  children_allowed: boolean
}

interface RoomItem {
  id: number
  name: string
  floor: number
  status: boolean
}

interface OrderGuest {
  id: number
  first_name: string
  last_name: string
  phone?: string
  email?: string
  passport?: string
  birthday: string
  guest?: number
  main_guest: boolean
  country: Country
  order: number
  order_item: OrderItem
  created_at: string
}

interface Country {
  id: number
  name: string
}

interface OrderItem {
  id: number
  order: number
  room: Room2
  room_item: RoomItem2
  start_date: string
  end_date: string
  status: string
  created_at: string
}

interface Room2 {
  id: number
  name: string
  description: string
  person_count: number
  children_allowed: boolean
}

interface RoomItem2 {
  id: number
  name: string
  floor: number
}

interface IOrderNote {
  id: number
  note: string
  employee: Employee
  order: number
  order_item: number
  created_at: string
}

interface Employee {
  id: number
  first_name: string
  last_name: string
  avatar: string
}

interface Payment {
  id: number
  amount: string
  order: number
  payment_type: PaymentType
  payment_card: any
  created_at: string
}

interface PaymentType {
  id: number
  image: string
  name: string
  key: string
  payment_type: any
  payment_cards: any
}

interface Price {
  id: number
  price: number
  date: string
}

interface IOrderGuest {
  id: number
  first_name: string
  last_name: string
  phone?: string
  email?: string
  passport?: string
  birthday: string
  guest?: number
  main_guest: boolean
  country: Country2
  order: number
  order_item: OrderItem2
  created_at: string
}

interface Country2 {
  id: number
  name: string
  translations: any
}

interface OrderItem2 {
  id: number
  order: number
  room: Room3
  room_item: RoomItem3
  start_date: string
  end_date: string
  status: string
  created_at: string
}

interface Room3 {
  id: number
  name: string
  description: string
  person_count: number
  children_allowed: boolean
}

interface RoomItem3 {
  id: number
  name: string
  floor: number
}

interface IPaymentCard {
  id: number
  card_number: number
  expiry_date: string
  card_holder: CardHolder
  card_holder_name: string
  order: number
  payment_type: PaymentType2
  created_at: string
  payment_card: any
  card: string
}

interface CardHolder {
  id: number
  first_name: string
  last_name: string
}

interface PaymentType2 {
  id: number
  image: string
  name: string
  key: string
}

interface IPaymentType {
  id: number
  amount: number
  order: number
  payment_type: PaymentType
  payment_card: any
  created_at: string
}

interface PaymentType {
  id: number
  image: string
  name: string
  key: string
}

interface IGuestHistory {
  id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  passport: string
  birthday: string
  guest: number
  main_guest: boolean
  country: {
    id: number
    name: string
  }
  order: {
    id: number
    source: {
      id: number
      name: string
    }
    created_at: string
  }
  order_item: {
    id: number
    order: number
    room: {
      id: number
      name: string
      description: string
      person_count: number
      children_allowed: boolean
    }
    room_item: {
      id: number
      name: string
      floor: number
    }
    start_date: string
    end_date: string
    status: string
    created_at: string
  }
  created_at: string
}

interface IServiceType {
  category: {
    id: number
    name: string
    key: string | null
  }
  id: number
  name: string
  key: string | null
  icon: string | null
  price: number
  status: boolean
  created_at: string
}

export type {
  AuthResponse,
  IServiceType,
  sthElse,
  DataType,
  Service,
  IBookingDetails,
  IPaymentType,
  PaymentType,
  IGuestHistory,
}
