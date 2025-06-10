import request from '@/utils/axios'

import type {
  IBlockDate,
  IOrderPaymentStatus,
  IRoom,
  IRoomItemStatistics,
  ISearchGuest,
  ISource,
} from '../types'
import type { ListResponse } from '@/types'

export async function getRoomItemStatistics(
  params?: any,
): Promise<IRoomItemStatistics> {
  const { branch, ...rest } = params
  const res: IRoomItemStatistics = await request({
    url: `/placements/branches/${branch}/room_item/room_item_statistics/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getOrderPaymentStatus(
  params?: any,
): Promise<IOrderPaymentStatus[]> {
  const { branch, ...rest } = params

  const res: IOrderPaymentStatus[] = await request({
    url: `/orders/branches/${branch}/order_payment_status/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getPlacementRooms(
  params?: any,
): Promise<ListResponse<IRoom[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IRoom[]> = await request({
    url: `/placements/branches/${branch}/rooms/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getSalesSources(
  params?: any,
): Promise<ListResponse<ISource[]>> {
  const res: ListResponse<ISource[]> = await request({
    url: '/sales_channels/sources/',
    method: 'get',
    params,
  })

  return res
}

export async function getGuestsList(
  params?: any,
): Promise<ListResponse<ISearchGuest[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<ISearchGuest[]> = await request({
    url: `/guest/guests/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function updateBlockDate(
  id: number | string,
  values: any,
): Promise<IBlockDate> {
  const { branch, ...rest } = values
  const res: IBlockDate = await request({
    url: `/placements/branches/${branch}/blocked_rooms/${id}/`,
    method: 'patch',
    data: rest,
  })

  return res
}

export async function postBlockReason(data: {
  start_date: string
  end_date: string
  reason: string
  reason_text?: string
  room: number
  room_item: number
  branch: number
}): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placements/branches/${branch}/blocked_rooms/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function deleteBlock({
  branch,
  id,
}: {
  id: string | number
  branch: number
}): Promise<any> {
  const res: any = await request({
    url: `/placements/branches/${branch}/blocked_rooms/${id}/`,
    method: 'delete',
  })

  return res
}
