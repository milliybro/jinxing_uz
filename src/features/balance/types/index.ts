interface ITariffPlan {
  id: number
  name: string
  key: string
  icon: any
  price: string
  meals_included: boolean
  meals: Meal[]
  rooms: Room[]
  has_min_stay_nights: boolean
  min_stay_nights: number
  has_order_advance_days: boolean
  order_advance_days: any
  source: any
  created_at: string
}

interface Meal {
  id: number
  name: string
  key: string
}

interface Room {
  id: number
  name: string
  person_count: number
  children_allowed: boolean
}

interface IMeals {
  id: number
  name: string
  key: string
  icon: any
  created_at: string
}

interface IServices {
  id: number
  name: string
  key: any
  icon: any
  price: number
  status: boolean
  category: {
    id: number
    name: string
    key: string
  }
  created_at: string
}

interface IRooms {
  id: number
  name: string
  description: string
  person_count: number
  children_count: number
  children_allowed: boolean
}

interface IAddTariffProps {
  translations: Translations
  price: number
  end_date: string
  rooms: number[]
  services: number[]
  meals_included: boolean
  has_min_stay_nights: boolean
  has_order_advance_days: boolean
}

interface Translations {
  en: Lang
  ru: Lang
  'uz-latin': Lang
  'uz-cyrillic': Lang
}

interface Lang {
  name: string
}

export type { ITariffPlan, IMeals, IServices, IRooms, IAddTariffProps }
