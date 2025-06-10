interface IOrderGuest {
  id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  passport: string
  birthday: string
  guest: number
  main_guest: boolean
  country: {
    id: number
    name: string
  }
  order: {
    id: number
    source: {
      id: number
      name: string
    }
    created_at: string
  }
  order_item: {
    id: number
    order: number
    room: {
      id: number
      name: string
      description: string
      person_count: number
      children_allowed: boolean
    }
    room_item: {
      id: number
      name: string
      floor: number
    }
    start_date: string
    end_date: string
    status: string
    created_at: string
  }
  created_at: string
}

export type { IOrderGuest }
