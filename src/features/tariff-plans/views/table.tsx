import { useEffect, useState } from 'react'

import TariffPlansHeader from '../containers/tariff-plans-header'
import TariffPlansTable from '../containers/tariff-plans-table'
import TariffPlansDrawer from '../components/tariff-plans-drawer'
import { useQuery } from '@tanstack/react-query'
import { getActiveTariffPlans, getArchivedTariffPlans } from '../api'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'

export default function Table(): React.ReactElement {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language)
  const { branch } = useBranchIdStore()

  useEffect(() => {
    const storedLang = i18n.language
    const resolvedLang =
      storedLang === 'oz'
        ? 'uz-latin'
        : storedLang === 'uz'
        ? 'uz-cyrillic'
        : storedLang || 'oz'
    setLang(resolvedLang)
  }, [i18n.language, lang])
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

  const {
    data: active,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tariff-plans-r-tariff', lang],
    cacheTime: 0,
    queryFn: async () => {
      const res = await getActiveTariffPlans({})
      return res
    },
  })

  const { data: archived, refetch: fetched } = useQuery({
    queryKey: ['tariff-plans-r-tariff-archived'],
    cacheTime: 0,
    queryFn: async () => {
      const res = await getArchivedTariffPlans({ branch })
      return res
    },
  })

  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <TariffPlansHeader setOpenDrawer={setOpenDrawer} />
        <TariffPlansDrawer
          refetch={refetch}
          fetched={fetched}
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
        />
        <TariffPlansTable
          active={active}
          isLoading={isLoading}
          refetch={refetch}
          archived={archived}
          fetched={fetched}
          setOpenDrawer={setOpenDrawer}
        />
      </div>
    </div>
  )
}
