import { lazy } from 'react'
import { sift } from 'radash'

import { routes as authRoutes } from '@/features/auth'

import welcomeRoutes from '@/features/welcome/routes'

import type { CustomRoute } from '@/types'
import ProductsRoutes from '@/features/products/routes'
import searchRoute from '@/features/search/routes'
import cartRoute from '@/features/cart/routes'
import categoriesRoute from '@/features/categories/routes'
import historyRoute from '@/features/history/routes'

// Global Pages
const Root = lazy(() => import('@/views/root'))
const NotFound = lazy(() => import('@/views/not-found'))
const Error = lazy(() => import('@/views/error'))

const routes: CustomRoute[] = [
  {
    id: 'root',
    title: 'Spa Starter',
    path: '/',
    element: <Root getRoutes={() => routes} />,
    loader: async () => null,
    errorElement: <Error />,
    children: sift([
      // ROUTES
      welcomeRoutes,
      ProductsRoutes,
      searchRoute,
      cartRoute,
      categoriesRoute,
      historyRoute,
      {
        id: 'local-not-found',
        title: 'not-found',
        path: '*',
        element: <NotFound />,
      },
    ]),
  },
  authRoutes,
  // mainRoutes,
  // bookingDetailsRoutes,
  {
    id: 'global-not-found',
    title: 'Not found',
    path: '*',
    element: <NotFound />,
  },
]

export default routes
