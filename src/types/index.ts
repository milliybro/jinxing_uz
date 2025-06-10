import type {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from 'react-router-dom'

type AppLang = 'uz-latn' | 'uz' | 'ru'

interface RouteExtensions {
  title?: string
  Icon?: (props: Partial<{}>) => React.ReactElement | null
}

interface Translations<T> {
  en: T
  ru: T
  'uz-cyryllic': T
  'uz-latin': T
}

interface IUser {
  id: number
  username: string
  first_name: string
  last_name: string
  avatar: string
  email: string
  phone: string
  birth_date: string
  gender: string
  type: string
  password_changed: boolean
  branch_user: BranchUser
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  groups: Groups
  user_permissions: any[]
  date_joined: string
  last_login: string
  created_at: string
  updated_at: string
  deleted: any
  deleted_by_cascade: boolean
}

interface BranchUser {
  branch: number
  user: number
}

interface Groups {
  name: any
  description: any
  key: any
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: Array<RouteObject & RouteExtensions>
}

type CustomRoute = (IndexRouteObject | CustomNonIndexRouteObject) &
  RouteExtensions

interface BaseEntity {
  id: number
  name: string
}

interface BaseParams {
  page?: number
  page_size?: number
}

interface ListResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T
}

interface ICountry {
  id: number
  translations: Translations<Lang>
  code: string
  sp_id: number | null
  name: string
  results: any
}

interface IRegion {
  id: number
  name: string
  code: string
  parent: any | null
}

interface IDistrict {
  id: number
  name: string
  code: string
  region: IRegion
}

interface Lang {
  name: string
}

interface IErrorMessage {
  error_type: string
  field: any
  detail: string
  status_code: number
}

export type {
  ICountry,
  CustomRoute,
  IUser,
  BaseEntity,
  BaseParams,
  ListResponse,
  AppLang,
  Translations,
  Lang,
  IRegion,
  IDistrict,
  IErrorMessage,
}
