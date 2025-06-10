import { Col, Flex, Row } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getOrders } from '../api'

import BookingDetails from './booking-details'
import BookingDebts from '../components/booking-debts'
import BookingDetailsList from './booking-details-list'
import BookingMainGuest from '../components/booking-main-guest'
import { useEffect } from 'react'
import { useBranchIdStore } from '@/store/branch-id-store'

const BookingContent = () => {
  const params = useParams()
  const { branch } = useBranchIdStore()

  // console.log(params)

  const { data, refetch } = useQuery({
    queryKey: ['orders-types-r-tariff'],
    queryFn: async () => {
      const res = await getOrders(branch, params?.id)
      return res
    },
    enabled: Boolean(params?.id),
  })
  useEffect(() => {
    if (params?.id) {
      refetch()
    }
  }, [params])

  return (
    <Row gutter={[24, 24]}>
      <Col span={17} className="flex flex-col gap-6 min-h-[100vh]">
        <BookingDetails data={data} />
        <BookingDetailsList data={data} refetch={refetch} />
      </Col>
      <Col span={7}>
        <Flex vertical gap={24}>
          <BookingMainGuest data={data} />
          <BookingDebts data={data} />
        </Flex>
      </Col>
    </Row>
  )
}

export default BookingContent
