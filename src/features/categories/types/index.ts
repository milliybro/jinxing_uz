interface AuthResponse {
  access: string
  refresh: string
}

interface Status {
  id: number
  name: string
  icon: string | null
  key: string
}

interface Source {
  id: number
  name: string
}

interface Order {
  id: number
  total: number
  status: Status
  source: Source
  created_at: string
}

interface Room {
  id: number
  name: string
  description: string
  person_count: number
  children_count: number
  children_allowed: boolean
}

interface RoomItem {
  id: number
  name: string
  floor: number
  status: boolean
}

interface CountryTranslations {
  [key: string]: {
    name: string
  }
}

interface Country {
  id: number
  translations: CountryTranslations
  code: string
  sp_id: number | null
}

interface OrderGuest {
  id: number
  first_name: string
  last_name: string
  middle_name: string | null
  phone: string
  email: string
  document_type: string
  pinfl: string | null
  passport: string
  birthday: string | null
  document_given_date: string | null
  document_given_by: string | null
  guest: number
  guest_type: string
  country: Country
  birth_country: Country | null
  transit_country: string | null
  order: number
  order_item: number
  created_at: string
  gender: string | null
  main_guest: boolean
  child: boolean
}

interface ISingleOrder {
  id: number
  price: number
  subtotal: number
  tariff: number
  order: Order
  room: Room
  room_item: RoomItem
  start_date: string
  end_date: string
  status: string
  visit_type: string
  order_guests: OrderGuest[]
  created_at: string
  parent_item: any | null
}

export type {
  AuthResponse,
  ISingleOrder,
  OrderGuest,
  Country,
  CountryTranslations,
  RoomItem,
  Room,
  Order,
  Source,
  Status,
}
