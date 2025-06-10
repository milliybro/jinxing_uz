/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'

import type { CustomRoute } from '@/types'

const Booking = lazy(() => import('./views/booking'))

const bookingRoutes: CustomRoute = {
  id: 'booking',
  title: 'Booking',
  path: 'booking',
  element: <Booking />,
}

export default bookingRoutes
