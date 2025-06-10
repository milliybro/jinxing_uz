/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'

import type { CustomRoute } from '@/types'
const StatusStats = lazy(() => import('./views/status-stats'))

const bookingStatsRoutes: CustomRoute = {
  id: 'status-stats',
  title: 'Статистика по статусам',
  path: 'status-stats',
  element: <StatusStats />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default bookingStatsRoutes
