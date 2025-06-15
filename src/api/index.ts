import request from '@/utils/axios'

import type { ICountry, IDistrict, IRegion, ListResponse } from '@/types'
import { AuthTokens } from '@/features/auth/types'

export async function login(data: {
  telegram_id: string
}): Promise<AuthTokens> {
  const res: AuthTokens = await request({
    url: '/telegram-token/',
    method: 'post',
    data,
  })

  return res
}

export async function refresh(data: { refresh: string }): Promise<AuthTokens> {
  return await request({
    url: '/token/refresh/',
    method: 'post',
    data,
  })
}

export async function getCountries(
  params?: any,
): Promise<ListResponse<ICountry[]>> {
  const res: ListResponse<ICountry[]> = await request({
    url: '/regions/countries/',
    method: 'get',
    params,
  })

  return res
}

export async function getDistricts(
  params: any,
): Promise<ListResponse<IDistrict[]>> {
  const res: ListResponse<IDistrict[]> = await request({
    url: 'regions/districts',
    method: 'get',
    params,
  })

  return res
}

export async function getRegions(
  params: any,
): Promise<ListResponse<IRegion[]>> {
  const res: ListResponse<IRegion[]> = await request({
    url: '/regions/regions',
    method: 'get',
    params,
  })
  return res
}

export async function getRoomsList(params?: any): Promise<ListResponse<any[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<any[]> = await request({
    url: `/placements/branches/${branch}/rooms/room_shortinfo/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getRoomFacility(
  params?: any,
): Promise<ListResponse<any[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<any[]> = await request({
    url: `/placement_references/branches/${branch}/r_facility/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getStaff(params: any): Promise<ListResponse<any[]>> {
  const res: ListResponse<any[]> = await request({
    url: '/account/staffs/',
    method: 'get',
    params,
  })

  return res
}
