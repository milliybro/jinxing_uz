interface IGoodsAndServices {
  id: number
  name: string
  key: any
  icon: any
  price: number
  status: boolean
  category: {
    id: number
    name: string
    key: any
  }

  created_at: string
}

export type { IGoodsAndServices }
