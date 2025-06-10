/* eslint-disable @typescript-eslint/promise-function-async */
import AllRooms from './views/payment-types'

import type { CustomRoute } from '@/types'

const paymentTypesRoutes: CustomRoute = {
  id: 'payment-types',
  title: 'Payment-types',
  path: 'payment-types',
  element: <AllRooms />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default paymentTypesRoutes
