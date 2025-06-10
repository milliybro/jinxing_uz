interface IAvailableRoom {
  id: number
  name: string
  price: number
  person_count: number
  children_age: number
  children_allowed: boolean
  available_rooms: number
}

interface ITariffPlans {
  id: number
  name: string
  key: any
  icon: any
  price: number
  start_date: string
  end_date: string
  meals_included: boolean
  meals: any[]
  services: {
    id: number
    name: string
    key: string
    price: number
    status: boolean
  }[]
  rooms: {
    id: number
    name: string
    description: string
    person_count: number
    children_count: number
    children_allowed: boolean
  }[]
  has_min_stay_nights: boolean
  min_stay_nights: number
  has_order_advance_days: boolean
  order_advance_days: any
  created_at: string
}

export type { IAvailableRoom, ITariffPlans }

export interface IPrice {
  price: number
  date: string
}

export interface IGuest {
  country?: ICountry
  document_type?: string | null
  birthday?: string
  passport?: string
  jshshir?: string
  document_given_date?: string
  document_given_by?: string
  first_name: string
  last_name: string
  middle_name?: string
  birth_country?: ICountry
  transit_country?: ICountry
  gender?: string
  phone?: string
  main_guest?: boolean
  child: boolean
  guest_type: string
  pinfl: number
}

interface ICountry {
  id?: number
}

export interface Item {
  room?: number
  tariff?: number
  room_item?: number
  start_date?: string
  end_date?: string
  visit_type?: string
  payment_status?: number
  prices: IPrice[]
  guests: IGuest[]
}

export interface IGuest {
  id: number
  name: string
  child: boolean
}

export interface IOrder {
  id: number
  start_date: string
  end_date: string
  items: any
  order_guests: IGuest[]
  payment_status: IStatus
  total: number
}

export interface IStepData {
  items: Item[]
  placement?: unknown
}

interface IStatus {
  id?: number
}
