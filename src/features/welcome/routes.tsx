/* eslint-disable @typescript-eslint/promise-function-async */

import type { CustomRoute } from '@/types'
import Welcome from './views/welcome'

const welcomeRoutes: CustomRoute = {
  id: '/',
  title: '/',
  path: '/',
  element: <Welcome />,
}

export default welcomeRoutes
