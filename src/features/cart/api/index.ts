import request from '@/utils/axios'
import type { AxiosResponse } from 'axios'

export async function refreshToken(data: {
  refresh: string
}): Promise<AxiosResponse<any>> {
  const res = await request({
    url: '/account/me/refresh/',
    method: 'post',
    data,
  })

  return res
}

export async function createOrder(payload: any): Promise<any> {
  const res: any = await request({
    url: '/orders/',
    method: 'post',
    data: payload,
  })

  return res
}
