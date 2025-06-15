import { lazy } from 'react'
import { sift } from 'radash'

import { routes as authRoutes } from '@/features/auth'

import welcomeRoutes from '@/features/welcome/routes'

import type { CustomRoute } from '@/types'
import ProductsRoutes from '@/features/products/routes'
import searchRoute from '@/features/search/routes'

import categoriesRoute from '@/features/categories/routes'
import historyRoute from '@/features/history/routes'
import StatisticsRoutes from '@/features/statistics/routes'
import ordersRoute from '@/features/orders/routes'
import cartRoute from '@/features/cart/routes'
import usersRoute from '@/features/users/routes'
import resoursRoute from '@/features/resourses/routes'

const Root = lazy(() => import('@/views/root'))
const NotFound = lazy(() => import('@/views/not-found'))
const Error = lazy(() => import('@/views/error'))

const routes: CustomRoute[] = [
  {
    id: 'root',
    title: 'Jinxing Uz',
    path: '/',
    element: <Root getRoutes={() => routes} />,
    loader: async () => null,
    errorElement: <Error />,
    children: sift([
      // user
      welcomeRoutes,
      ProductsRoutes,
      searchRoute,
      cartRoute,
      categoriesRoute,
      historyRoute,

      // admin 
      ordersRoute,
      StatisticsRoutes,
      usersRoute,
      resoursRoute,
      {
        id: 'local-not-found',
        title: 'not-found',
        path: '*',
        element: <NotFound />,
      },
    ]),
  },
  authRoutes,
  
  {
    id: 'global-not-found',
    title: 'Not found',
    path: '*',
    element: <NotFound />,
  },
]

export default routes
