import type { CustomRoute } from '@/types'
import SearchPage from './views'

const searchRoute: CustomRoute = {
  id: 'search',
  title: 'search',
  path: 'search',
  element: <SearchPage />,
}

export default searchRoute
