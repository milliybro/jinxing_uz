/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const TariffsAndNumbers = lazy(() => import('./views/tariffs-and-numbers'))

const tariffsAndNumbersRoutes: CustomRoute = {
  id: 'tariffs-and-numbers',
  title: 'Tariffs-and-numbers',
  path: 'tariffs-and-numbers',
  element: <TariffsAndNumbers />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default tariffsAndNumbersRoutes
