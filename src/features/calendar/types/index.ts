interface IDailyOrder {
  date: string
  ordered_rooms: number
  ordered_rooms_percent: number
  week_day: number
  day: number
  year: number
}

interface IResult {
  id: number
  data: IResultData[]
  room_item_name: string
  room_id: number
  room_name: string
}

interface IResultData {
  date: string
  order_item_id: number
  order_start_date: string
  order_end_date: string
  order_price: number
  order_subtotal: number
  order_status: string
  guest_fullname: string
  arrival_time: string
  order_source_name: string
  order_payment_status_key: any
  blocked_room_id: any
  br_start_date: any
  br_end_date: any
  br_reason: any
  repeated?: boolean
  br_repeated?: boolean
  order_id: number
}

interface IByRoomData {
  date: string
  room_id: number
  blocked_rooms: number
  ordered_rooms: number
  free_rooms: number
  week_day: number
  day: number
  year: number
}

interface IByRoom {
  room_id: number
  data: IByRoomData[]
}

interface IRoomItemStatistics {
  daily_orders?: IDailyOrder[]
  result?: IResult[]
  by_room?: IByRoom[]
}

interface IOrderGuest {
  id: number
  first_name: string
  last_name: string
  middle_name: string
}

interface IBlockDate {
  id: number
  start_date: string
  end_date: string
}

export type IRoomStatus =
  | 'departure'
  | 'reside'
  | 'arrival'
  | 'pre_booked'
  | 'cancelled'

interface IRoomReview {
  id: number
  start_date: string
  end_date: string
  subtotal: string
  status: IRoomStatus
  order_guests: IOrderGuest[]
  guest_count: number | null
  room_item_name: string
  room_item_id: number
  room_name: string
  room_description: string
  updated_at?: string
}

interface IOrderPaymentStatus {
  id: number
  name: string
  icon: any
  key: string
}

interface IRoom {
  id: number
  name: string
  description: string
  area: number
  bathrooms: number
  bedrooms: number
  person_count: number
  children_age: number
  children_allowed: boolean
  crib_provided: boolean
  placement_id: number
  facilities: any[]
}

interface ISource {
  id: number
  name: string
}

interface ISearchGuest {
  id: number
  first_name: string
  last_name: string
  passport: any
}

interface RoomData {
  date: string
  ordered_rooms: number
  revenue: number
}

interface IGroupedByMonthData {
  month: string
  data: RoomData[]
}

export type {
  IRoomItemStatistics,
  IOrderPaymentStatus,
  IRoom,
  ISource,
  ISearchGuest,
  IDailyOrder,
  IResultData,
  IResult,
  IRoomReview,
  IBlockDate,
  IGroupedByMonthData,
}
