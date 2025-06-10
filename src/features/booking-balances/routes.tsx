/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'

import type { CustomRoute } from '@/types'

const BookingBalances = lazy(() => import('./views/booking-balances'))

const bookingRoutes: CustomRoute = {
  id: 'booking-balances',
  title: 'Транзакции',
  path: 'booking-balances',
  element: <BookingBalances />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default bookingRoutes
