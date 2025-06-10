import request from '@/utils/axios'

import type { ListResponse } from '@/types'
import type { IGoodsAndServices } from '../types'

export async function getGoodsAndServices(
  params?: any,
): Promise<ListResponse<IGoodsAndServices[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IGoodsAndServices[]> = await request({
    url: `/placement_references/branches/${branch}/service/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getGoodsAndService(
  id: number | string,
  branch: number,
): Promise<IGoodsAndServices> {
  const res: IGoodsAndServices = await request({
    url: `/placement_references/branches/${branch}/service/${id}/`,
    method: 'get',
  })

  return res
}

export async function postGoodsAndService(data: any): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placement_references/branches/${branch}/service/`,
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
    url: `/placement_references/branches/${branch}/service/${id}/`,
    method: 'put',
    data: rest,
  })

  return res
}

export async function deleteGoodsAndService({
  branch,
  id,
}: {
  id: string | number
  branch: number
}): Promise<any> {
  const res: any = await request({
    url: `/placement_references/branches/${branch}/service/${id}/`,
    method: 'delete',
  })

  return res
}
