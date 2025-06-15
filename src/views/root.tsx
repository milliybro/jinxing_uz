import { Suspense, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '@/components/spinner'

import DefaultLayout from '@/layouts/default-layout'
import type { CustomRoute } from '@/types'

interface Props {
  getRoutes: () => CustomRoute[]
}

const SpinnerWrapper = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Spinner />
    </div>
  )
}

export default function Root(props: Props): React.ReactElement {
  const { getRoutes } = props
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1]
        const payloadJson = atob(
          payloadBase64.replace(/-/g, '+').replace(/_/g, '/'),
        )
        const payload = JSON.parse(payloadJson)
        setUserId(payload.id)
      } catch (error) {
        console.error('Token decode qilishda xatolik:', error)
      }
    }

    setLoading(false)
  }, [])

  const routes = getRoutes()

  if (loading) {
    return <SpinnerWrapper />
  }

  // if (userId === 2) {
  //   return <Navigate to="/admin" replace />
  // }

  return (
    <DefaultLayout sidebarRoutes={routes[0].children as CustomRoute[]}>
      <Suspense fallback={<SpinnerWrapper />}>
        <Outlet />
      </Suspense>
    </DefaultLayout>
  )
}
