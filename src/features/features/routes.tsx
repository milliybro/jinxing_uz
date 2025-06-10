/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const Features = lazy(() => import('./views/features'))

const featuresRoutes: CustomRoute = {
  id: 'features',
  title: 'Features',
  path: 'features',
  element: <Features />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default featuresRoutes
