interface IGoodsAndServices {
  id: number
  name: string
  key: any
  icon: any
  created_at: string
}

interface IPostGoodsAndService {
  translations: Translations
  branch?: number
}

interface Translations {
  en: lang
  ru: lang
  'uz-latin': lang
  'uz-cyrillic': lang
}

interface lang {
  name: string
}

export type { IGoodsAndServices, IPostGoodsAndService }
