import request from '@/utils/axios'

import type { ListResponse } from '@/types'
import type { IOrder, IStepData, ITariffPlans } from '../types'

export async function getAvailableRooms(
  params?: any,
): Promise<ListResponse<any[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<any[]> = await request({
    url: `/placements/branches/${branch}/rooms/available_rooms/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getRoomTypes(params?: any): Promise<ListResponse<any[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<any[]> = await request({
    url: `/placement_references/branches/${branch}/r_tariff/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getTariffPrices(
  params?: any,
): Promise<ListResponse<ITariffPlans[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<ITariffPlans[]> = await request({
    url: `/placement_references/branches/${branch}/r_tariff/active_tariffs/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getShortRooms(
  params?: any,
): Promise<ListResponse<any[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<any[]> = await request({
    url: `/placements/branches/${branch}/rooms/room_shortinfo/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getOrder(params?: any): Promise<IOrder> {
  const { branch, ...rest } = params
  const res: IOrder = await request({
    url: `/orders/branches/${branch}/orders/${params?.id}/`,
    method: 'get',
    params: rest,
  })
  return res
}

export async function getPaymentStatus(
  params?: any,
): Promise<ListResponse<any[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<any[]> = await request({
    url: `/orders/branches/${branch}/order_payment_status/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getRoomTariffs(
  params?: any,
): Promise<ListResponse<any[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<any[]> = await request({
    url: `/placement_references/branches/${branch}/r_tariff/active_tariffs/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getFreeRoom(params: any): Promise<ListResponse<any[]>> {
  const { start_date, end_date, room, branch } = params

  const res: ListResponse<any[]> = await request({
    url: `/placements/branches/${branch}/room_item/free_room_items/`, // Replace with your actual API endpoint
    method: 'get',
    params: {
      start_date,
      end_date,
      room,
    },
  })

  return res
}

export async function postOrderCreate(
  data: IStepData & { branch: number },
): Promise<{
  id: number
  payment_status: any | null
  placement: number
  source: any | null
}> {
  const { branch, ...rest } = data
  const res: {
    id: number
    payment_status: any | null
    placement: number
    source: any | null
  } = await request({
    url: `/orders/branches/${branch}/orders/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function postAddGuestCreate(
  data: IStepData & { branch: number },
): Promise<{
  id: number
  payment_status: any | null
  placement: number
  source: any | null
}> {
  const { branch, ...rest } = data
  const res: {
    id: number
    payment_status: any | null
    placement: number
    source: any | null
  } = await request({
    url: `/orders/branches/${branch}/order_guests/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function postPassportInfo(data: IStepData): Promise<{}> {
  const res: {} = await request({
    url: '/guest/guests/find_guest_by_passport/',
    method: 'post',
    data,
  })

  return res
}

export async function updateOrder(
  data: any,
  id: string | number,
): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/orders/branches/${branch}/orders/${id}/`,
    method: 'put',
    data: rest,
  })

  return res
}
