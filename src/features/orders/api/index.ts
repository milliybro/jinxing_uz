import request from '@/utils/axios'
import { ListResponse } from '@/types'

export async function getHistory({
  pageParam,
}: {
  pageParam?: number
}): Promise<ListResponse<any[]>> {
  const res: ListResponse<any[]> = await request({
    url: '/orders/',
    method: 'get',
    params: { page: pageParam },
  })

  return res
}

export async function updateOrders(id: any, data: any): Promise<any> {
  const res = await request({
    url: `/orders/${id}/`,
    method: 'patch',
    data: data,
  })

  return res
}
