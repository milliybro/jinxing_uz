import request from '@/utils/axios'
import type { AxiosResponse } from 'axios'
import type { AuthResponse } from '../types'
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

export async function getProducts(params?: any): Promise<ListResponse<any[]>> {
  const res: ListResponse<any[]> = await request({
    url: '/products/',
    method: 'get',
    params,
  })

  return res
}
