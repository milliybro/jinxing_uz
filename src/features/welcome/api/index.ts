import request from '@/utils/axios'
import type { AxiosResponse } from 'axios'
import type { AuthResponse, ISingleOrder } from '../types'
import { IRoomItemStatistics, IRoomReview } from '@/features/calendar/types'
import { ListResponse } from '@/types'
import { ICleaner } from '@/features/room-cleaning/types'

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

export async function getCategories(params?: any): Promise<ListResponse<ICleaner[]>> {
  const res: ListResponse<ICleaner[]> = await request({
    url: '/categories/',
    method: 'get',
    params,
  })

  return res
}
