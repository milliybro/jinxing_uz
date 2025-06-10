/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const ContentForEMehmon = lazy(() => import('./views/content-for-emehmon'))

const contentForEMehmon: CustomRoute = {
  id: 'content-for-emehmon',
  title: 'Content-for-emehmon',
  path: 'content-for-emehmon',
  element: <ContentForEMehmon />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default contentForEMehmon
