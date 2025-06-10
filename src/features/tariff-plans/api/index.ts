import request from '@/utils/axios'

import type { ListResponse } from '@/types'
import type {
  IAddTariffProps,
  IMeals,
  // IRooms,
  IServices,
  ITariffPlan,
} from '../types'

export async function getTariffPlans(
  params?: any,
  id?: string | number,
): Promise<ListResponse<ITariffPlan[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<ITariffPlan[]> = await request({
    url: `/placement_references/branches/${branch}/r_tariff/${id ?? ''}`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getActiveTariffPlans(
  params?: any,
  id?: string | number,
): Promise<ListResponse<ITariffPlan[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<ITariffPlan[]> = await request({
    url: `/placement_references/branches/${branch}/r_tariff/active_tariffs/${
      id ?? ''
    }`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getArchivedTariffPlans(
  params?: any,
  id?: string | number,
): Promise<ListResponse<ITariffPlan[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<ITariffPlan[]> = await request({
    url: `/placement_references/branches/${branch}/r_tariff/archived_tariffs/${
      id ?? ''
    }`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getTariffPlan(
  id: string | number,
  branch: number,
): Promise<ITariffPlan> {
  const res: ITariffPlan = await request({
    url: `/placement_references/branches/${branch}/r_tariff/${id ?? ''}`,
    method: 'get',
  })

  return res
}

export async function getMealsList(
  params?: any,
): Promise<ListResponse<IMeals[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IMeals[]> = await request({
    url: `/placement_references/branches/${branch}/meals/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getActiveServicesList(
  params?: any,
): Promise<ListResponse<IServices[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IServices[]> = await request({
    url: `/placement_references/branches/${branch}/service/?status=true`,
    method: 'get',
    params: rest,
  })

  return res
}

// export async function getRoomsList(
//   params?: any,
// ): Promise<ListResponse<IRooms[]>> {
//   const res: ListResponse<IRooms[]> = await request({
//     url: '/placements/branches/:branch_pk/rooms/room_shortinfo/',
//     method: 'get',
//     params,
//   })

//   return res
// }

export async function postAddTariffPlan(
  data: IAddTariffProps & { branch: number },
  id?: string | number,
): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placement_references/branches/${branch}/r_tariff/${id ?? ''}`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function updateTariffPlan(
  data: IAddTariffProps & { branch: number },
  id: string | number,
): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placement_references/branches/${branch}/r_tariff/${id}/`,
    method: 'patch',
    data: rest,
  })

  return res
}

export async function deleteTariffPlan({
  branch,
  id,
}: {
  id: string | number
  branch: number
}): Promise<any> {
  const res: any = await request({
    url: `/placement_references/branches/${branch}/r_tariff/${id}/`,
    method: 'delete',
  })

  return res
}
