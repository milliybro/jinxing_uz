/* eslint-disable @typescript-eslint/promise-function-async */

import type { CustomRoute } from '@/types'
import Welcome from './views/welcome'
import Product from './views/Product'

const resoursRoute: CustomRoute = {
  id: 'resourses',
  title: 'resourses',
  path: 'resourses',
  element: <Welcome />,
  children: [
    {
      id: 'product',
      title: 'product',
      path: 'product',
      element: <Product />,
    },
  ],
}

export default resoursRoute
