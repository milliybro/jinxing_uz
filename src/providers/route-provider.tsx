import { Suspense } from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import routes from '@/routes/routes'
import ContentSpinner from '@/components/spinner'

export default function RouteProvider(): React.ReactElement {
  const router = createHashRouter(routes)

  return (
    <Suspense fallback={<ContentSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
