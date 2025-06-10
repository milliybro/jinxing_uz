import { useEffect, useState } from 'react'

import FeaturesHeader from '../containers/features-header'
import FeaturesTable from '../containers/features-table'
import { useQuery } from '@tanstack/react-query'
import { getFeatures } from '../api'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export default function Features(): React.ReactElement {
  // const [openDrawer, setOpenDrawer] = useState(false)
  const { i18n } = useTranslation()
  const [lang, setLang] = useState('')
  const { search, pathname } = useLocation()
  const { branch } = useBranchIdStore()

  const queries = queryString.parse(search)

  useEffect(() => {
    const storedLang = i18n.language
    const resolvedLang =
      storedLang === 'oz'
        ? 'uz-latin'
        : storedLang === 'uz'
        ? 'uz-cyrillic'
        : storedLang || 'oz'
    setLang(resolvedLang)
  }, [localStorage.getItem('i18nextLng'), lang])

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = i18n.language
      const resolvedLang =
        storedLang === 'oz'
          ? 'uz-latin'
          : storedLang === 'uz'
          ? 'uz-cyrillic'
          : storedLang || 'oz'
      setLang(resolvedLang)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [i18n.language, lang])

  // const updateLangOnChange = () => {
  //   const storedLang = localStorage.getItem('i18nextLng')
  //   const resolvedLang =
  //     storedLang === 'oz'
  //       ? 'uz-latin'
  //       : storedLang === 'uz'
  //       ? 'uz-cyrillic'
  //       : storedLang || 'oz'
  //   setLang(resolvedLang)
  // }

  const { data: list, isLoading: isListLoading } = useQuery({
    queryKey: [
      'features-table',
      lang,
      localStorage.getItem('i18nextLng'),
      queries?.page,
    ],
    queryFn: async () => {
      return await getFeatures({ branch, page: queries?.page || 1 })
    },
    enabled: !!lang,
  })
  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <FeaturesHeader />
        {/* <FeaturesDrawer
          data={list}
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
        /> */}
        <FeaturesTable
          data={list}
          // setOpenDrawer={setOpenDrawer}
          isLoading={isListLoading}
        />
      </div>
    </div>
  )
}
