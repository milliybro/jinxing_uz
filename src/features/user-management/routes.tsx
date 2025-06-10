/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const UserManagement = lazy(() => import('./views/user-management'))

const userManagementRoutes: CustomRoute = {
  id: 'user-management',
  title: 'User-management',
  path: 'user-management',
  element: <UserManagement />,
}

export default userManagementRoutes
