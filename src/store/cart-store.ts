import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  count: number
  maxCount: number
}

interface CartStore {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'count'>, quantity: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  increment: (id: number) => void
  decrement: (id: number) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item, quantity) => {
        const existing = get().cart.find((i) => i.id === item.id)
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    count:
                      i.count + quantity > i.maxCount
                        ? i.maxCount
                        : i.count + quantity,
                  }
                : i,
            ),
          })
        } else {
          set({
            cart: [
              ...get().cart,
              {
                ...item,
                count: quantity > item.maxCount ? item.maxCount : quantity,
              },
            ],
          })
        }
      },
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((item) => item.id !== id) }),
      clearCart: () => set({ cart: [] }),
      increment: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  count:
                    item.count + 1 > item.maxCount
                      ? item.maxCount
                      : item.count + 1,
                }
              : item,
          ),
        }),

      decrement: (id) =>
        set({
          cart: get()
            .cart.map((item) =>
              item.id === id
                ? {
                    ...item,
                    count: item.count - 1 < 0 ? 0 : item.count - 1,
                  }
                : item,
            )
            .filter((item) => item.count > 0),
        }),
    }),
    {
      name: 'cart-storage',
    },
  ),
)
