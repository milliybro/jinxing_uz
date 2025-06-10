/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const GoodsAndServices = lazy(() => import('./views/goods-and-services'))

const goodsAndServicesRoots: CustomRoute = {
  id: 'goods-and-services',
  title: 'Goods-and-services',
  path: 'goods-and-services',
  element: <GoodsAndServices />,
  // children: [
  //   {
  //     id: "login",
  //     title: "Login",
  //     path: "login",
  //     element: <Login />,
  //   },
  // ],
}

export default goodsAndServicesRoots
