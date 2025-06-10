/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const NewBooking = lazy(() => import('./views/new-booking'))

const newBookingRoutes: CustomRoute = {
  id: 'new-booking',
  title: 'New-booking',
  path: 'new-booking',
  element: <NewBooking />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default newBookingRoutes
