/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const Analytics = lazy(() => import('./views/analytics'))

const analyticsRoutes: CustomRoute = {
  id: 'analytics',
  title: 'Analytics',
  path: 'analytics',
  element: <Analytics />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default analyticsRoutes
