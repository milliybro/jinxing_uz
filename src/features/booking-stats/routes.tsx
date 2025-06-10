/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'

import type { CustomRoute } from '@/types'

const BookingStats = lazy(() => import('./views/booking-stats'))

const bookingStatsRoutes: CustomRoute = {
  id: 'booking-stats',
  title: 'Статистика броней',
  path: 'booking-stats',
  element: <BookingStats />,
}

export default bookingStatsRoutes
