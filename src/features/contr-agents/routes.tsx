/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const ContrTable = lazy(() => import('./views/contr-table'))

const contrAgentsRoutes: CustomRoute = {
  id: 'contr-agents',
  title: 'Контрагенты',
  path: 'contr-agents',
  element: <ContrTable />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default contrAgentsRoutes
