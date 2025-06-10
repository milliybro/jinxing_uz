import request from '@/utils/axios'

import type { ListResponse } from '@/types'
import type {
  IOrdersItem,
  IOrdersListItem,
  IOrdersType,
  ISource,
} from '../types'

export async function getOrderItems(
  params?: any,
): Promise<ListResponse<IOrdersItem[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IOrdersItem[]> = await request({
    url: `/orders/branches/${branch}/order_items`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getOrdersList(
  params?: any,
): Promise<ListResponse<IOrdersListItem[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IOrdersListItem[]> = await request({
    url: `/orders/branches/${branch}/orders`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getOrderTypes(
  params?: any,
): Promise<ListResponse<IOrdersType[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IOrdersType[]> = await request({
    url: `/orders/branches/${branch}/order_types`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getSalesSources(
  params?: any,
): Promise<ListResponse<ISource[]>> {
  const res: ListResponse<ISource[]> = await request({
    url: '/sales_channels/sources',
    method: 'get',
    params,
  })

  return res
}
