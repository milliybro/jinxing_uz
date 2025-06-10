import type { CustomRoute } from '@/types'
import CartPage from './views'

const cartRoute: CustomRoute = {
  id: 'cart',
  title: 'cart',
  path: 'cart',
  element: <CartPage />,
}

export default cartRoute
