/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'

import type { CustomRoute } from '@/types'
const ChannelRevenue = lazy(() => import('./views/channel-revenue'))

const bookingStatsRoutes: CustomRoute = {
  id: 'channel-revenue',
  title: 'Обороты каналов',
  path: 'channel-revenue',
  element: <ChannelRevenue />,
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
