export interface IAllRooms {
  id: number
  name: string
  floor: number
  status: boolean
  room: Room
}

export interface ISingleRoom {
  area: number | null
  bathrooms: number | null
  bedrooms: number | null
  children_age: number
  children_allowed: boolean
  children_count: number
  crib_provided: boolean
  facilities: number[]
  id: number
  person_count: number
  placement: number
  images: string[]
  translations: {
    en: {
      name: string
      description: string
    }
    ru: {
      name: string
      description: string
    }
    'uz-cyrillic': {
      name: string
      description: string
    }
    'uz-latin': {
      name: string
      description: string
    }
  }
}

interface Room {
  id: number
  name: string
  description: string
  person_count: number
  children_count: number
  children_allowed: boolean
}

export interface ISingleRoomForm {
  room_type: {
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
  max_people: number
  max_child: number
  room_facilities: number[] | string[]
  images: any
}
