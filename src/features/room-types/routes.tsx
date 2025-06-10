/* eslint-disable @typescript-eslint/promise-function-async */

import type { CustomRoute } from '@/types'
import RoomTypes from './views/room-types'

const roomTypes: CustomRoute = {
  id: 'room-types',
  title: 'Типы номеров',
  path: 'room-types',
  element: <RoomTypes />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default roomTypes
