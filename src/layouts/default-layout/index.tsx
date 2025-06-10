import Header from '@/components/header'

// import { useTranslation } from 'react-i18next'
// import clsx from 'clsx'
// import { colors } from '@/config/theme'
// import useDefaultLayoutState from './state'

import type { CustomRoute } from '@/types'

interface Props {
  children: React.ReactElement
  sidebarRoutes: CustomRoute[]
}

export default function DefaultLayout(props: Props): React.ReactElement {
  const { children, sidebarRoutes } = props

  // const { defaultLanguage, handleLanguageChange } =
  //   useDefaultLayoutState(sidebarRoutes)

  // const { t } = useTranslation()

  return (
    <div className="h-screen">
      {children}
      <Header />
    </div>
  )
}
