import type { CustomRoute } from '@/types'
import UsersPage from './views'

const usersRoute: CustomRoute = {
  id: 'users',
  title: 'users',
  path: 'users',
  element: <UsersPage />,
}

export default usersRoute
