import { useQuery } from '@tanstack/react-query'
import { Form, TablePaginationConfig } from 'antd'
import queryString from 'query-string'
import { createContext, useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useBranchIdStore } from '@/store/branch-id-store'
import { getOrderItems, getOrderTypes, getOrdersList } from '../api'

import { truthyObject } from '@/helpers/truthy-object'
import { SorterResult } from 'antd/es/table/interface'
import type { ReactNode } from 'react'
import type { IBookingContextType } from '../types'

const BookingContext = createContext<IBookingContextType | null>(null)

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()
  const { branch } = useBranchIdStore()

  const { pathname, search } = location
  const queries = useMemo(() => queryString.parse(search), [search])

  const orderTypes = useQuery({
    queryKey: ['order-types'],
    queryFn: () => getOrderTypes({ branch }),
  })

  const ordersList = useQuery({
    queryKey: ['orders-list'],
    queryFn: () => getOrdersList({ branch }),
  })

  const orderItems = useQuery({
    queryKey: ['order-items', queries],
    queryFn: () =>
      getOrderItems({
        ...queries,
        statuses: queries.statuses?.toString(),
        sources: queries.sources?.toString(),
        page: queries.page || 1,
        branch,
      }),
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
    <BookingContext.Provider
      value={{
        form,
        orderTypes,
        ordersList,
        orderItems,
        handleTableChange,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBookingContext = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBookingContext must be used within an BookingContext')
  }
  return context
}
