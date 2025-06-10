/* eslint-disable @typescript-eslint/promise-function-async */

import type { CustomRoute } from '@/types'
import Welcome from './views/welcome'

const categoriesRoute: CustomRoute = {
  id: 'categories',
  title: 'categories',
  path: 'categories',
  element: <Welcome />,
}

export default categoriesRoute
