import { useState } from 'react'

import PaymentTypesTable from '../components/payment-types-table'
import PaymentTypesHeader from '../components/payment-types-header'
import PaymentTypesDrawer from '../components/payment-types-drawer'
import { useQuery } from '@tanstack/react-query'
import { getPaymentTypes } from '../api'
import { useBranchIdStore } from '@/store/branch-id-store'

export default function PaymentTypes(): React.ReactElement {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { branch } = useBranchIdStore()

  const {
    data: list,
    isLoading: isListLoading,
    refetch,
  } = useQuery({
    queryKey: ['payment-types-table'],
    queryFn: async () => {
      const res = await getPaymentTypes({ branch })
      return res
    },
  })

  return (
    <div className="container mb-[50px]">
      <div className="flex flex-col min-h-screen">
        <PaymentTypesHeader setOpenDrawer={setOpenDrawer} />
        <PaymentTypesDrawer
          data={list}
          refetch={refetch}
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
        />
        <PaymentTypesTable
          data={list}
          refetch={refetch}
          isLoading={isListLoading}
          setOpenDrawer={setOpenDrawer}
        />
      </div>
    </div>
  )
}
