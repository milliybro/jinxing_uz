import { PaymentType } from '@/features/payment-types/types'
import dayjs from 'dayjs'

export interface IFacility {
  id: number
  name: string
  key: string
  icon: string
  category_id: number
  external_id: number | null
}

export interface IHotelContent {
  id: number
  lat: number
  long: number
  checkin_start: string
  checkout_end: string
  facilities: IFacility[] | number[]
  payment_types: PaymentType[] | number[]
  children_allowed: boolean | null | string
  age_allowed: boolean | null
  animals_allowed: boolean | null | string
  country: number
  region: number
  district: number
  images?: IHotelImage[]
  translations: {
    en: { name: string; description: string; address: string; slug: string }
    'en-us'?: {
      name: string
      description: string
      address: string
      slug: string
    }
    ru: { name: string; description: string; address: string; slug: string }
    'uz-cyrillic': {
      name: string
      description: string
      address: string
      slug: string
    }
    'uz-latin': {
      name: string
      description: string
      address: string
      slug: string
    }
  }
}

export interface IHotelImage {
  id: number
  image: string
  is_main: boolean
}

export interface IHotelContentForm {
  name: {
    en: string
    ru: string
    uz_cyrillic: string
    uz_latin: string
  }
  description: {
    en: string
    ru: string
    uz_cyrillic: string
    uz_latin: string
  }
  address: string
  checkin_start: dayjs.Dayjs | null
  checkout_end: dayjs.Dayjs | null
  country: number
  facilities: number[] // Array of facility IDs
  children_allowed: string // 'true' or 'false'
  animals_allowed: string // 'true' or 'false'
  payment_types: number[] // Array of payment type IDs
  lat: number
  long: number
}
// name_en: string
// name_ru: string
// name_uz_cyryllic: string
// name_uz_latin: string
// description_en: string
// description_ru: string
// description_uz_cryllic: string
// description_uz_latin: string
