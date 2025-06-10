/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const Table = lazy(() => import('./views/table'))

const tableRoutes: CustomRoute = {
  id: 'table',
  title: 'Table',
  path: 'table',
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

export default tableRoutes
