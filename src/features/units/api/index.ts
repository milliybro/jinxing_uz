import request from '@/utils/axios'
import { ICreateUnitForm, ISingleUnit, IUnit } from '../types'
import { ListResponse } from '@/types'

export async function getUnits(branch: number): Promise<ListResponse<IUnit[]>> {
  const res: ListResponse<IUnit[]> = await request({
    url: `/placements/branches/${branch}/buildings/`,
    method: 'get',
  })

  return res
}

export async function getSingleUnit(
  branch: number,
  id: number,
): Promise<ISingleUnit> {
  const res: ISingleUnit = await request({
    url: `/placements/branches/${branch}/buildings/${id}`,
    method: 'get',
  })

  return res
}

export async function createUnit(
  data: ICreateUnitForm & { branch: number },
): Promise<any> {
  const { branch, ...rest } = data
  const res = await request({
    url: `/placements/branches/${branch}/buildings/`,
    method: 'post',
    data: { ...rest, is_active: true },
  })

  return res
}

export async function updateUnit(
  data: ICreateUnitForm & { branch: number; id: number },
): Promise<any> {
  const { branch, id, ...rest } = data
  const res = await request({
    url: `/placements/branches/${branch}/buildings/${id}`,
    method: 'put',
    data: { ...rest, is_active: true },
  })

  return res
}

export async function deleteUnit(data: {
  branch: number
  id: number
}): Promise<any> {
  const { branch, id } = data
  const res = await request({
    url: `/placements/branches/${branch}/buildings/${id}`,
    method: 'delete',
  })

  return res
}
