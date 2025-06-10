import { Card, Tabs, TabsProps, Typography } from 'antd'

import ArrowUpRightIcon from '@/components/icons/arrow-up-right'
import ReviewArrivals from '../components/review-arrivals'
// import ReviewBreakfast from '../components/review-breakfast'
import { useBranchIdStore } from '@/store/branch-id-store'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getOrderLangItems } from '../api'

const ReviewOfBookings = () => {
  const { t } = useTranslation()
  const branch = useBranchIdStore((store) => store.branch)
  const [todayItems, setTodayItems] = useState('0')

  const onChange = (key: string) => {
    setTodayItems(key)
  }

  const {
    data: orderItems,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['order-lang-items', todayItems, branch],
    queryFn: async () => {
      const res = await getOrderLangItems({ branch, today_items: todayItems })
      return res.results
    },
    enabled: true,
  })

  const items: TabsProps['items'] = [
    {
      key: '0',
      label: t('common.check-ins'),
      children: (
        <ReviewArrivals
          data={orderItems}
          refetch={refetch}
          loading={isLoading}
        />
      ),
    },
    {
      key: '1',
      label: t('common.check-outs'),
      children: (
        <ReviewArrivals
          data={orderItems}
          refetch={refetch}
          loading={isLoading}
        />
      ),
    },
    {
      key: '2',
      label: t('common.staying'),
      children: (
        <ReviewArrivals
          data={orderItems}
          refetch={refetch}
          loading={isLoading}
        />
      ),
    },
    // {
    //   key: '4',
    //   label: t('common.sale'),
    //   children: <ReviewArrivals />,
    // },
    {
      key: '3',
      label: t('common.canceled'),
      children: (
        <ReviewArrivals
          data={orderItems}
          refetch={refetch}
          loading={isLoading}
        />
      ),
    },
    // {
    //   key: '4',
    //   label: t('common.rebooking'),
    //   children: <ReviewArrivals data={orderItems} refetch={refetch} tab="6" />,
    // },
    // {
    //   key: '7',
    //   label: t('common.breakfast'),
    //   children: <ReviewBreakfast />,
    // },
  ]

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <Typography.Text className="text-[24px] font-semibold">
          {t('home-page.bookings-review')}
        </Typography.Text>
        <Link to="/booking">
          <Typography.Link className="flex items-center gap-1 font-medium">
            {t('home-page.view-all-bookings')}
            <ArrowUpRightIcon className="text-[20px]" />
          </Typography.Link>
        </Link>
      </div>
      <Card>
        <Tabs items={items} onChange={onChange} />
      </Card>
    </div>
  )
}

export default ReviewOfBookings
