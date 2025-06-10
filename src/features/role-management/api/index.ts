import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IUserRole, RolePermissions, UserPermissions } from '../types'

export async function getUserRoles(params?: any): Promise<ListResponse<any[]>> {
  const res: ListResponse<IUserRole[]> = await request({
    url: '/account/groups/',
    method: 'get',
    params,
  })

  return res
}

export async function getRolePermissions(
  params: any,
): Promise<RolePermissions> {
  const res: RolePermissions = await request({
    url: `/account/groups/${params.id}`,
    method: 'get',
  })

  return res
}

export async function getUserRole(
  params?: any,
): Promise<ListResponse<UserPermissions[]>> {
  const res: ListResponse<any[]> = await request({
    url: '/account/content_types/permissions/',
    method: 'get',
    params,
  })

  return res
}

export async function createUserRole(data: any): Promise<any> {
  const res: any = await request({
    url: `/account/groups/`,
    method: 'post',
    data,
  })

  return res
}

export async function deleteRole(id: string | number): Promise<any> {
  const res: any = await request({
    url: `/account/groups/${id}/`,
    method: 'delete',
  })

  return res
}

export async function updateRole(data: any, id: any): Promise<any> {
  const res: any = await request({
    url: `/account/groups/${id}/`,
    method: 'patch',
    data,
  })

  return res
}
