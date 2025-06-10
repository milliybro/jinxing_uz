/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const Table = lazy(() => import('./views/table'))

const balanceRoutes: CustomRoute = {
  id: 'balance',
  title: 'Balance',
  path: 'balance',
  element: <Table />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default balanceRoutes
