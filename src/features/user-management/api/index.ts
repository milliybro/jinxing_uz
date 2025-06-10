import request from '@/utils/axios'

import type { IRole } from '../types'
import type { IUser, ListResponse } from '@/types'

export async function getUsers(params?: any): Promise<ListResponse<IUser[]>> {
  const res: ListResponse<IUser[]> = await request({
    url: '/account/users/',
    method: 'get',
    params,
  })

  return res
}

export async function getUser(id?: string | number): Promise<IUser> {
  const res: IUser = await request({
    url: `/account/users/${id}/`,
    method: 'get',
  })

  return res
}

export async function getGroups(params?: any): Promise<ListResponse<IRole[]>> {
  const res: ListResponse<IRole[]> = await request({
    url: '/account/groups/',
    method: 'get',
    params,
  })

  return res
}

export async function resetPassword(
  data: any,
  id: string | number,
): Promise<any> {
  const res: any = await request({
    url: `/account/users/${id}/admin_change_user_password/`,
    method: 'post',
    data,
  })

  return res
}

export async function createUser(data: any): Promise<any> {
  const res: any = await request({
    url: `/account/users/`,
    method: 'post',
    data,
  })

  return res
}

export async function updateUser(data: any, id: string | number): Promise<any> {
  const res: any = await request({
    url: `/account/users/${id}/`,
    method: 'patch',
    data,
  })

  return res
}

export async function deleteUser(id: string | number): Promise<any> {
  const res: any = await request({
    url: `/account/users/${id}/`,
    method: 'delete',
  })

  return res
}
