import { Outlet } from 'react-router-dom'

import useMatchEither from '@/hooks/use-match-either'

interface Props {
  of: React.ReactElement
}

export default function Container(props: Props): React.ReactElement {
  const { of } = props

  const match = useMatchEither(['/guests/:id'])

  if (match) {
    return <Outlet />
  }

  return of
}
