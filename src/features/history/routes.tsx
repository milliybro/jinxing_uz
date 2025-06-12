import type { CustomRoute } from '@/types'
import CartPage from './views'

const historyRoute: CustomRoute = {
  id: 'history',
  title: 'history',
  path: 'history',
  element: <CartPage />,
}

export default historyRoute
