/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const CategoryOfGoodsAndServices = lazy(
  () => import('./views/category-of-goods-and-services'),
)

const categoryOfGoodsAndServicesRoutes: CustomRoute = {
  id: 'category-of-goods-and-services',
  title: 'Category-of-goods-and-services',
  path: 'category-of-goods-and-services',
  element: <CategoryOfGoodsAndServices />,
}

export default categoryOfGoodsAndServicesRoutes
