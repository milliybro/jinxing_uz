import request from '@/utils/axios'

import type { ListResponse } from '@/types'
import type { IGoodsAndServices, IPostGoodsAndService } from '../types'

export async function getGoodsAndServices(
  params?: any,
): Promise<ListResponse<IGoodsAndServices[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IGoodsAndServices[]> = await request({
    url: `/placement_references/branches/${branch}/service_category/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function postGoodsAndService(
  data: IPostGoodsAndService,
): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placement_references/branches/${branch}/service_category/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function putGoodsAndService(
  data: IPostGoodsAndService,
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

export async function deleteGoodsAndService({
  branch,
  id,
}: {
  id: string | number
  branch: number
}): Promise<any> {
  const res: any = await request({
    url: `/placement_references/branches/${branch}/service_category/${id}/`,
    method: 'delete',
  })

  return res
}
