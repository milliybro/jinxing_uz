/* eslint-disable @typescript-eslint/promise-function-async */

import type { CustomRoute } from '@/types'
import StatisticsPage from './views'

const StatisticsRoutes: CustomRoute = {
  id: '/admin',
  title: '/admin',
  path: '/admin',
  element: <StatisticsPage />,
}

export default StatisticsRoutes
