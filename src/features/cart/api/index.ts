import request from '@/utils/axios'
import type { AxiosResponse } from 'axios'
import type { AuthResponse, ISingleOrder } from '../types'
import { IRoomItemStatistics, IRoomReview } from '@/features/calendar/types'
import { ListResponse } from '@/types'

export async function login(data: {
  username: string
  password: string
}): Promise<AuthResponse> {
  const res: AuthResponse = await request({
    url: '/account/me/',
    method: 'post',
    data,
  })

  return res
}

export async function refreshToken(data: {
  refresh: string
}): Promise<AxiosResponse<AuthResponse>> {
  const res = await request({
    url: '/account/me/refresh/',
    method: 'post',
    data,
  })

  return res
}

export async function getStatistics(
  params?: any,
): Promise<IRoomItemStatistics> {
  const { branch, ...rest } = params
  const res: IRoomItemStatistics = await request({
    url: `/orders/branches/${branch}/order_items/daily/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getOrderItems(
  params?: any,
): Promise<ListResponse<IRoomReview[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IRoomReview[]> = await request({
    url: `/orders/branches/${branch}/order_items/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getOrderLangItems(
  params?: any,
): Promise<ListResponse<IRoomReview[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IRoomReview[]> = await request({
    url: `/orders/branches/${branch}/order_items/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function updateOrderItem(data: any): Promise<any> {
  const { branch, ...rest } = data
  const res = await request({
    url: `/orders/branches/${branch}/order_items/${data.id}/`,
    method: 'patch',
    data: rest,
  })

  return res
}

export async function getOrderItemById(
  branch: number,
  id: number,
): Promise<ISingleOrder> {
  const res: ISingleOrder = await request({
    url: `/orders/branches/${branch}/order_items/${id}/`,
    method: 'get',
  })
  return res
}
