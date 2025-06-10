import request from '@/utils/axios'

import type { IAllRooms, ISingleRoom } from '../types'
import type { ListResponse } from '@/types'

export async function getAllRooms(
  params?: any,
): Promise<ListResponse<IAllRooms[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IAllRooms[]> = await request({
    url: `/placements/branches/${branch}/room_item/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getRoom(
  branch: number,
  id?: string | number,
): Promise<IAllRooms> {
  const res: IAllRooms = await request({
    url: `/placements/branches/${branch}/room_item/${id}`,
    method: 'get',
  })

  return res
}

export async function getOneRoomType(
  branch: number,
  id?: string | number,
): Promise<ISingleRoom> {
  const res: ISingleRoom = await request({
    url: `/placements/branches/${branch}/rooms/${id}`,
    method: 'get',
  })

  return res
}

export async function postRoom(data: any): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placements/branches/${branch}/room_item/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function postRoomType(data: any): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `placements/branches/${branch}/rooms/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function deleteRoom(
  branch: number,
  id: string | number,
): Promise<any> {
  const res: any = await request({
    url: `/placements/branches/${branch}/room_item/${id}/`,
    method: 'delete',
  })

  return res
}

export async function deleteRoomType({
  branch,
  id,
}: {
  branch: number
  id: string | number
}): Promise<any> {
  const res: any = await request({
    url: `placements/branches/${branch}/rooms/${id}/`,
    method: 'delete',
  })

  return res
}

export async function updateRoom({
  data,
  id,
  branch,
}: {
  data: any
  id: string | number
  branch: number
}): Promise<any> {
  const res: any = await request({
    url: `/placements/branches/${branch}/rooms/${id}/`,
    method: 'patch',
    data,
  })

  return res
}
