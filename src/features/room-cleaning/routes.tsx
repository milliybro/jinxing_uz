/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'

import type { CustomRoute } from '@/types'

const RoomCleaning = lazy(() => import('./views/room-cleaning'))

const roomCleaningRoutes: CustomRoute = {
  id: 'room-cleaning',
  title: 'Room-cleaning',
  path: 'room-cleaning',
  element: <RoomCleaning />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default roomCleaningRoutes
