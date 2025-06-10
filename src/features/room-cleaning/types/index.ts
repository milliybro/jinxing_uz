interface IOrdersItem {
  id: number
  price: number
  subtotal: number
  order: Order
  room: Room
  room_item: RoomItem
  start_date: string
  end_date: string
  status: string
  order_guests: OrderGuest[]
  created_at: string
  name: string
  room_clean: boolean
  description: string
  cleaner: {
    id: number | null
    first_name: string
    last_name: string
    status: boolean
  }
  room_free: boolean
  note?: string
}

interface Order {
  id: number
  total: number
  status: Status
  source: ISource
  created_at: string
}

interface Status {
  id: number
  name: string
  type: string
  key: string
}

interface ISource {
  id: number
  name: string
}

interface Room {
  id: number
  name: string
  description: string
  price: number
  person_count: number
  children_allowed: boolean
}

interface RoomItem {
  id: number
  name: string
  floor: number
  room: Room
}

interface OrderGuest {
  id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  passport: string
  birthday: string
  guest: any
  main_guest: boolean
  country: Country
  order: number
  order_item: number
  created_at: string
}

interface Country {
  id: number
  name: string
}

interface IOrdersType {
  id: number
  name: string
  key: string
  icon: string
  external_id: number
}

interface IOrdersListItem {
  id: number
  room_item: {
    id: number
    name: string
    price: number
    subtotal: number
    room_id: number
    room_item_id: number
    start_date: string
    end_date: string
    room: string
  }
  name: string
  room: string
  order_start_date: string
  order_end_date: string
  total: string
  status: number
  payment_type: number
  placement: number
  source: number
  created_at: string
  note: string
  room_clean: boolean
  room_free: boolean
  order_status: boolean
  not_disturb: boolean
  cleaner: number
  first_name: string
}

interface ICleaner {
  id: number
  first_name: string | null
  last_name: string | null
  status: boolean
  schedule: number[]
  key: number | null
  category: number
}

interface ICategory {
  id: number
  image: string
  name: string
}

export type {
  IOrdersItem,
  IOrdersType,
  IOrdersListItem,
  ISource,
  ICleaner,
  ICategory,
}
