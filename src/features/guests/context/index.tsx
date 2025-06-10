import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { Form, FormInstance } from 'antd'
import queryString from 'query-string'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useBranchIdStore } from '@/store/branch-id-store'
import { getGuests } from '../api'

import { getCountries } from '@/api'
import { truthyObject } from '@/helpers/truthy-object'
import { ICountry, ListResponse } from '@/types'
import { SorterResult } from 'antd/es/table/interface'
import { TablePaginationConfig } from 'antd/lib'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { IGuest } from '../types'

interface IGuestsContextType {
  form: FormInstance<any>
  orderGuests: UseQueryResult<ListResponse<IGuest[]>, unknown>
  countries: UseQueryResult<ListResponse<ICountry[]>, unknown>
  handleTableChange: (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => void
  countrySearch: string
  setCountrySearch: Dispatch<SetStateAction<string>>
}

const GuestsContext = createContext<IGuestsContextType | null>(null)

export const GuestsProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()
  const { branch } = useBranchIdStore()
  const [countrySearch, setCountrySearch] = useState<string>('')

  const { pathname, search } = location
  const queries = useMemo(() => queryString.parse(search), [search])

  const [lang, setLang] = useState('')
  useEffect(() => {
    const storedLang = localStorage.getItem('i18nextLng')
    setLang(
      storedLang === 'oz'
        ? 'uz-latin'
        : storedLang === 'uz'
        ? 'uz-cyrillic'
        : storedLang || 'oz',
    )
  }, [localStorage.getItem('i18nextLng')])

  const orderGuests = useQuery(
    ['order-guests', queries, lang],
    async () => {
      const res = await getGuests({
        ...queries,
        branch,
        page: queries?.page || 1,
      })

      return res
    },
    {
      enabled: Boolean(lang),
      keepPreviousData: true,
    },
  )

  const countries = useQuery({
    queryKey: ['regions-countries', countrySearch],
    queryFn: async () => {
      const res = await getCountries({ page_size: 250, search: countrySearch })
      return res
    },
    keepPreviousData: true,
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort.field
      : null
    const updatedQuery = queryString.stringify(
      truthyObject({
        ...queries,
        page: pagination.current,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <GuestsContext.Provider
      value={{
        form,
        orderGuests,
        countries,
        handleTableChange,
        countrySearch,
        setCountrySearch,
      }}
    >
      {children}
    </GuestsContext.Provider>
  )
}

export const useGuestsContext = () => {
  const context = useContext(GuestsContext)
  if (!context) {
    throw new Error('useGuestsContext must be used within an GuestsContext')
  }
  return context
}
