import request from '@/utils/axios'

import type { ListResponse } from '@/types'
import type { IFeatures } from '../types'

export async function getFeatures(
  params?: any,
): Promise<ListResponse<IFeatures[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IFeatures[]> = await request({
    url: `/placement_references/branches/${branch}/r_facility/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getFeature(branch: number, id?: any): Promise<IFeatures> {
  const res: IFeatures = await request({
    url: `/placement_references/branches/${branch}/r_facility/${id}/`,
    method: 'get',
  })

  return res
}

export async function postGoodsAndService(data: any): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placement_references/branches/${branch}/service_category/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function putGoodsAndService(
  data: any,
  id: string | number,
): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placement_references/branches/${branch}/service_category/${id}/`,
    method: 'put',
    data: rest,
  })

  return res
}

export async function deleteGoodsAndService(
  branch: number,
  id: string | number,
): Promise<any> {
  const res: any = await request({
    url: `/placement_references/branches/${branch}/service_category/${id}/`,
    method: 'delete',
  })

  return res
}

export async function getFeaturesIcons(
  params?: any,
): Promise<ListResponse<any[]>> {
  const res: ListResponse<any[]> = await request({
    url: '/base/files/service_icons/',
    method: 'get',
    params,
  })

  return res
}

export async function getBaseFeaturesIcons(
  params?: any,
): Promise<ListResponse<any[]>> {
  const res: ListResponse<any[]> = await request({
    url: '/base/files/room_facility_icons/',
    method: 'get',
    params,
  })

  return res
}

export async function postFeature(data: any): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placement_references/branches/${branch}/r_facility/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function updateFeature(
  data: any,
  id: string | number,
): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placement_references/branches/${branch}/r_facility/${id}/`,
    method: 'put',
    data: rest,
  })

  return res
}

export async function deleteFeature({
  branch,
  id,
}: {
  id: string | number
  branch: number
}): Promise<any> {
  const res: any = await request({
    url: `/placement_references/branches/${branch}/r_facility/${id}/`,
    method: 'delete',
  })

  return res
}
