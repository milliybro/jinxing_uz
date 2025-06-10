import { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Spinner from '@/components/spinner'
// import { useAuthContext } from '@/contexts'
import DefaultLayout from '@/layouts/default-layout'

import type { CustomRoute } from '@/types'

interface Props {
  getRoutes: () => CustomRoute[]
}

const SpinnerWrapper = () => {
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return showSpinner ? <Spinner /> : null
}
export default function Root(props: Props): React.ReactElement {
  const { getRoutes } = props

  // const { isAuth } = useAuthContext()

  const routes = getRoutes()

  // if (!isAuth) {
  //   return <Navigate to="/welcome" replace />
  // }

  return (
    <DefaultLayout sidebarRoutes={routes[0].children as CustomRoute[]}>
      <Suspense fallback={<SpinnerWrapper />}>
        <Outlet />
      </Suspense>
    </DefaultLayout>
  )
}
