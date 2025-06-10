/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const Main = lazy(() => import('./views/main'))

const mainRoutes: CustomRoute = {
  id: 'welcome',
  title: 'Welcome',
  path: '/welcome',
  element: <Main />,
}

export default mainRoutes
