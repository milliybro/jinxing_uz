type LanguageMap<T> = {
  [key in 'en' | 'ru' | 'uz-cyrillic' | 'uz-latin']: T
}

export interface ICreateUnitForm {
  translations: LanguageMap<{ name: string }>
}

export interface IUnit {
  id: number
  name: string
  is_active: boolean
}

export interface ISingleUnit {
  id: number
  is_active: boolean
  translations: LanguageMap<{ name: string }>
}
