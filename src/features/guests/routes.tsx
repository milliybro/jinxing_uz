/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'

import GuestsItem from './views/guests-item'
import Container from './components/container'

import type { CustomRoute } from '@/types'

const Guests = lazy(() => import('./views/guests'))

const guestsRoutes: CustomRoute = {
  id: 'guests',
  title: 'Guests',
  path: 'guests',
  element: <Container of={<Guests />} />,
  children: [
    {
      id: 'guests-item',
      title: 'Guests-item',
      path: ':id',
      element: <GuestsItem />,
    },
  ],
}

export default guestsRoutes
