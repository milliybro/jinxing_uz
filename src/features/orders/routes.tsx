import type { CustomRoute } from '@/types'
import OrdersPage from './views'

const ordersRoute: CustomRoute = {
  id: 'orders',
  title: 'orders',
  path: 'orders',
  element: <OrdersPage />,
}

export default ordersRoute
