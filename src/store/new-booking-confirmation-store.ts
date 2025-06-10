import { IAvailableRoom } from '@/features/new-booking/types'
import { create } from 'zustand'

interface IState {
  selectedRooms: null | IAvailableRoom[]
  show: boolean
  setShow: (value: boolean) => void
  addSelectedRooms: (value: IAvailableRoom) => void
  removeSelectedRooms: (value: IAvailableRoom) => void
}

const useNewBookingConfirmationStore = create<IState>((set, get) => ({
  selectedRooms: null,
  show: false,
  setShow: (show: boolean) => set({ show }),
  // setSelectedRooms: (rooms: any) => set({ selectedRooms:[] }),

  addSelectedRooms: (product: any) => {
    const { selectedRooms } = get()
    // const updatedCart = updateCart(product, selectedRooms)

    const updateCart = selectedRooms ? [product, ...selectedRooms] : [product]
    set({ selectedRooms: updateCart })
  },

  // removeSelectedRooms: (product: any) => {
  //   const { selectedRooms } = get()

  //   const index = selectedRooms?.findIndex((item) => item.id === product.id)

  //   console.log(index)

  //   if (index !== -1) {
  //     const newItems = [...selectedRooms]
  //     newItems.splice(index, 1)

  //     set({ selectedRooms: newItems })
  //   }
  // },

  removeSelectedRooms: (product: any) =>
    set((state) => {
      const index = state.selectedRooms?.findIndex(
        (item) => item.id === product.id,
      )
      if (index && index !== -1) {
        const newItems = state.selectedRooms ? [...state.selectedRooms] : []
        newItems.splice(index, 1)
        return { selectedRooms: newItems }
      }
      return state
    }),
}))

// function updateCart(product: any, cart: any[]): any[] {
//   const cartItem = { ...product, count: 1 } as any

//   const productOnCart = cart?.map((item) => item.id).includes(product.id)

//   if (!productOnCart) cart?.push(cartItem)
//   else {
//     return cart?.map((item) => {
//       if (item.id === product.id)
//         return { ...item, count: item.count + 1 } as any
//       return item
//     })
//   }

//   return cart
// }

export default useNewBookingConfirmationStore
