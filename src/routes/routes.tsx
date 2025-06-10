import { lazy } from 'react'
import { sift } from 'radash'

import { routes as authRoutes } from '@/features/auth'

import mainRoutes from '@/features/main/routes'
import tableRoutes from '@/features/table/routes'
import guestsRoutes from '@/features/guests/routes'
import bookingRoutes from '@/features/booking/routes'
import welcomeRoutes from '@/features/welcome/routes'
import analyticsRoutes from '@/features/analytics/routes'
import newBookingRoutes from '@/features/new-booking/routes'
import tariffPlansRoutes from '@/features/tariff-plans/routes'
import contrAgentsRoutes from '@/features/contr-agents/routes'
import bookingDetailsRoutes from '@/features/booking-details/routes'
import tariffsAndNumbersRoutes from '@/features/tariffs-and-numbers/routes'

import type { CustomRoute } from '@/types'
import goodsAndServicesRoots from '@/features/goods-and-services/routes'
import roleManagementRoots from '@/features/role-management/routes'
import featuresRoutes from '@/features/features/routes'
import categoryOfGoodsAndServicesRoutes from '@/features/category-of-goods-and-services/routes'
import paymentTypesRoutes from '@/features/payment-types/routes'
import userManagementRoutes from '@/features/user-management/routes'
import roomCleaningRoutes from '@/features/room-cleaning/routes'
import bookingStats from '@/features/booking-stats/routes'
import channelRevenue from '@/features/channel-revenue/routes'
import statusStats from '@/features/status-stats/routes'
import transactions from '@/features/transactions/routes'
import bookingBalances from '@/features/booking-balances/routes'
import roomTypes from '@/features/room-types/routes'
import contentForEMehmon from '@/features/content-for-emehmon/routes'
import balanceRoutes from '@/features/balance/routes'
import unitRoutes from '@/features/units/routes'
import ProductsRoutes from '@/features/products/routes'
import searchRoute from '@/features/search/routes'
import cartRoute from '@/features/cart/routes'
import categoriesRoute from '@/features/categories/routes'

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
      tableRoutes,
      bookingDetailsRoutes,
      contrAgentsRoutes,
      tariffsAndNumbersRoutes,
      newBookingRoutes,
      guestsRoutes,
      goodsAndServicesRoots,
      analyticsRoutes,
      bookingRoutes,
      unitRoutes,
      welcomeRoutes,
      tariffPlansRoutes,
      roleManagementRoots,
      categoryOfGoodsAndServicesRoutes,
      featuresRoutes,
      paymentTypesRoutes,
      userManagementRoutes,
      roomCleaningRoutes,
      bookingStats,
      channelRevenue,
      statusStats,
      transactions,
      bookingBalances,
      roomTypes,
      balanceRoutes,
      ProductsRoutes,
      contentForEMehmon,
      searchRoute,
      cartRoute,
      categoriesRoute,
      {
        id: 'local-not-found',
        title: 'not-found',
        path: '*',
        element: <NotFound />,
      },
    ]),
  },
  authRoutes,
  mainRoutes,
  // bookingDetailsRoutes,
  {
    id: 'global-not-found',
    title: 'Not found',
    path: '*',
    element: <NotFound />,
  },
]

export default routes
