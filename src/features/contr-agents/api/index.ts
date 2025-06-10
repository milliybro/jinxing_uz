import request from '@/utils/axios'

import type { ListResponse } from '@/types'
import type { IOrderGuest } from '../types'

export async function getOrderGuests(
  params?: any,
): Promise<ListResponse<IOrderGuest[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IOrderGuest[]> = await request({
    url: `/orders/branches/${branch}/order_guests/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getGuestHistory(
  params?: any,
): Promise<ListResponse<IOrderGuest[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IOrderGuest[]> = await request({
    url: `/orders/branches/${branch}/order_guests/guest_history/`,
    method: 'get',
    params: rest,
  })

  return res
}
