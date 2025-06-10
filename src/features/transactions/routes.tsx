/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'

import type { CustomRoute } from '@/types'

const Transactions = lazy(() => import('./views/transactions'))

const bookingRoutes: CustomRoute = {
  id: 'transactions',
  title: 'Транзакции',
  path: 'transactions',
  element: <Transactions />,
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
