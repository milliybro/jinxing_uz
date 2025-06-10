/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const Calendar = lazy(() => import('./views/calendar'))

const calendarRoutes: CustomRoute = {
  id: 'calendar',
  title: 'Calendar',
  path: 'calendar',
  element: <Calendar />,
}

export default calendarRoutes
