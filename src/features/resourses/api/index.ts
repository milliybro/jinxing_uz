import request from '@/utils/axios'
import type { AxiosResponse } from 'axios'
import type { AuthResponse } from '../types'
import { ListResponse } from '@/types'

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

export async function getCategories(
  params?: any,
): Promise<ListResponse<any[]>> {
  const res: ListResponse<any[]> = await request({
    url: '/categories/',
    method: 'get',
    params,
  })

  return res
}

export async function createCategory(data: any): Promise<AuthResponse> {
  const res: AuthResponse = await request({
    url: '/categories/',
    method: 'post',
    data,
  })

  return res
}

export async function getCategoryId(id: number): Promise<any> {
  const res: any = await request({
    url: `/categories/${id}/`,
    method: 'get',
  })
  return res
}

export async function updateCategory(id: any, data: any): Promise<any> {
  const res = await request({
    url: `/categories/${id}/`,
    method: 'patch',
    data: data,
  })

  return res
}

export async function deleteCategory(id: any): Promise<any> {
  const res = await request({
    url: `/categories/${id}/`,
    method: 'delete',
  })

  return res
}

export async function createProduct(data: any): Promise<AuthResponse> {
  const res: AuthResponse = await request({
    url: '/products/',
    method: 'post',
    data,
  })

  return res
}

export async function updateProduct(id: any, data: any): Promise<any> {
  const res = await request({
    url: `/products/${id}/`,
    method: 'patch',
    data: data,
  })

  return res
}

export async function deleteProduct(id: any): Promise<any> {
  const res = await request({
    url: `/products/${id}/`,
    method: 'delete',
  })

  return res
}
