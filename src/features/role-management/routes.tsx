/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from 'react'
import type { CustomRoute } from '@/types'

const RoleManagement = lazy(() => import('./views/role-management'))
import RoleManagementNewRole from './views/role-management-new-role'
import Container from './components/container'

const roleManagementRoots: CustomRoute = {
  id: 'role-management',
  title: 'Role-management',
  path: 'role-management',
  element: <Container of={<RoleManagement />} />,
  children: [
    {
      id: 'New Role',
      title: 'New Role',
      path: ':id',
      element: <RoleManagementNewRole />,
    },
  ],
}

export default roleManagementRoots
