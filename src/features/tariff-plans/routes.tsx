/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const Table = lazy(() => import('./views/table'))

const tariffPlansRoutes: CustomRoute = {
  id: 'tariff-plans',
  title: 'Tariff-plans',
  path: 'tariff-plans',
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

export default tariffPlansRoutes
