/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const NewBooking = lazy(() => import('./views/booking-details'))

const bookingDetailsRoutes: CustomRoute = {
  id: 'booking-details',
  title: 'Booking-details',
  path: 'booking-details/:id',
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

export default bookingDetailsRoutes
