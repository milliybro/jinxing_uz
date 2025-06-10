import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import Spinner from '@/components/spinner'
import { useAuthContext } from '@/contexts'
import DefaultLayout from '@/layouts/default-layout'

import type { CustomRoute } from '@/types'

interface Props {
  getRoutes: () => CustomRoute[]
}

export default function Root(props: Props): React.ReactElement {
  const { getRoutes } = props

  const { isAuth } = useAuthContext()

  const routes = getRoutes()

  // if (!isAuth) {
  //   return <Navigate to="/welcome" replace />
  // }

  return (
    <DefaultLayout sidebarRoutes={routes[0].children as CustomRoute[]}>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </DefaultLayout>
  )
}
