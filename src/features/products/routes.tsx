/* eslint-disable @typescript-eslint/promise-function-async */

import type { CustomRoute } from '@/types'
import Welcome from './views/welcome'
import ProductItem from './views/ProductItem'

const ProductsRoutes: CustomRoute = {
  id: 'products',
  title: 'products',
  path: 'products',
  element: <Welcome />,
  children: [
    {
      id: 'id',
      title: 'id',
      path: ':id',
      element: <ProductItem />
    },
  ],
}

export default ProductsRoutes
