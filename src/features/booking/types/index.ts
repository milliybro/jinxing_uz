import type { FormInstance, TablePaginationConfig } from 'antd'
import type { UseQueryResult } from '@tanstack/react-query'
import type { ListResponse } from '@/types'
import { SorterResult } from 'antd/es/table/interface'

interface IBookingContextType {
  form: FormInstance
  orderTypes: UseQueryResult<ListResponse<IOrdersType[]>, unknown>
  ordersList: UseQueryResult<ListResponse<IOrdersListItem[]>, unknown>
  orderItems: UseQueryResult<ListResponse<IOrdersItem[]>, unknown>
  handleTableChange: (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => void
}

interface IOrdersItem {
  id: number
  tariff_id: number | null
  start_date: string
  end_date: string
  subtotal: number
  status: string
  order_guests: OrderGuest[]
  guest_count: number | null
  order: number
  room_item_name: string
  room_item_id: number
  room_name: string
  room_description: string
  parent_item: any
  created_at: string
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
}

interface OrderGuest {
  id: number
  first_name: string | null
  last_name: string | null
  middle_name: string | null
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
  items: {
    id: number
    price: number
    subtotal: number
    room_id: number
    room_item_id: number
    start_date: string
    end_date: string
  }[]
  start_date: string
  end_date: string
  total: string
  status: number
  payment_type: number
  placement: number
  source: number
  created_at: string
}
export type {
  IOrdersItem,
  IOrdersType,
  IOrdersListItem,
  ISource,
  IBookingContextType,
}
