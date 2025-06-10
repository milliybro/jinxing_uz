/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'

import type { CustomRoute } from '@/types'

const Units = lazy(() => import('./views/units'))

const unitRoutes: CustomRoute = {
  id: 'units',
  title: 'Блоки',
  path: 'units',
  element: <Units />,
}

export default unitRoutes
