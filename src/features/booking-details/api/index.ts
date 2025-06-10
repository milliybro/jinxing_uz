import request from '@/utils/axios'
import type { ListResponse } from '@/types'
import type {
  IBookingDetails,
  IGuestHistory,
  IPaymentType,
  IServiceType,
  PaymentType,
  Service,
} from '../types'

export async function getOrders(
  branch: number,
  id?: number | string,
): Promise<IBookingDetails> {
  const res: IBookingDetails = await request({
    url: `/orders/branches/${branch}/orders/${id}/`,
    method: 'get',
  })

  return res
}

export async function getOrderPayment(
  params?: any,
): Promise<ListResponse<IPaymentType[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IPaymentType[]> = await request({
    url: `/orders/branches/${branch}/order_payment/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getPaymentTypes(
  params?: any,
): Promise<ListResponse<PaymentType[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<PaymentType[]> = await request({
    url: `/placements/branches/${branch}/payment_types/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getGuestsBookingHistory(
  params?: any,
): Promise<ListResponse<IGuestHistory[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IGuestHistory[]> = await request({
    url: `/orders/branches/${branch}/order_guests/guest_history/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getServiceTypes(
  params?: any,
): Promise<ListResponse<IServiceType[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<IServiceType[]> = await request({
    url: `/placement_references/branches/${branch}/service/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function getOrderServicesList(
  params?: any,
): Promise<ListResponse<Service[]>> {
  const { branch, ...rest } = params
  const res: ListResponse<Service[]> = await request({
    url: `/orders/branches/${branch}/order_service/order_services_list/`,
    method: 'get',
    params: rest,
  })

  return res
}

export async function postAddPayment(data: {
  amount: string | number
  order: string | number
  payment_type: string
  payment_card?: string
  branch: number
}): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/orders/branches/${branch}/order_payment/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function postAddNote(data: {
  note: string
  order: string | number
  branch: number
}): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/orders/branches/${branch}/order_note/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function postAddCard(data: {
  card_number: number
  expiry_date: string
  card_holder: number
  order: number
  payment_type: number
  branch: number
}): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/orders/branches/${branch}/payment_card/`,
    method: 'post',
    data: rest,
  })

  return res
}

export async function postAddService(data: {
  price: number
  total_price: number
  quantity: number
  date: string
  order: number
  order_item: number
  service: number
  branch: number
}): Promise<any> {
  const { branch, ...rest } = data
  const res: any = await request({
    url: `/orders/branches/${branch}/order_service/`,
    method: 'post',
    data: rest,
  })

  return res
}
