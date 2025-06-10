import { ListResponse } from '@/types'
import request from '@/utils/axios'
import type { IPayment, PaymentType } from '../types'

export async function getPaymentTypes(
  params?: any,
): Promise<ListResponse<IPayment[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IPayment[]> = await request({
    url: `/placements/branches/${branch}/payment_types/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getPaymentType(
  params?: any,
): Promise<ListResponse<PaymentType[]>> {
  const res: ListResponse<PaymentType[]> = await request({
    url: '/payments/payment_types/',
    method: 'get',
    params,
  })

  return res
}

export async function createPaymentpayment(data: any): Promise<any> {
  const { branch, ...rest } = data

  const res: any = await request({
    url: `/placements/branches/${branch}/payment_types/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function deleteType({
  branch,
  id,
}: {
  id: string | number
  branch: number
}): Promise<any> {
  const res: any = await request({
    url: `/placements/branches/${branch}/payment_types/${id}/`,
    method: 'delete',
  })

  return res
}

export async function updateType(data: any, id: string | number): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/placements/branches/${branch}/payment_types/${id}/`,
    method: 'put',
    data: rest,
  })

  return res
}
