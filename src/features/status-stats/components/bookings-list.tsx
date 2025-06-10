import { formatAmount } from '@/helpers/format-amount'
import { useQuery } from '@tanstack/react-query'
import { Table, Typography } from 'antd'
import dayjs from 'dayjs'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import { getOrderItems } from '../api'

const { Text } = Typography

import NotFound from '@/components/not-found'
import { useBranchIdStore } from '@/store/branch-id-store'
import type { TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import type { IOrdersItem } from '../types'

const columns: TableProps<IOrdersItem>['columns'] = [
  {
    title: 'Источник',
    dataIndex: 'start_date',
    key: 'start_date',
    className: 'font-medium',
    sorter: (a, b) => a.start_date.localeCompare(b.start_date),
    render(value) {
      return dayjs(value).format('DD MMMM, YYYY')
    },
  },
  {
    title: 'Реализовано',
    dataIndex: 'nights',
    key: 'nights',
    className: 'font-medium',
    sorter: (a, b) => a.start_date.localeCompare(b.end_date),
    render(_, values) {
      const startDate = dayjs(values.start_date)
      const endDate = dayjs(values.end_date)

      const differenceInDays = endDate.diff(startDate, 'day')
      return differenceInDays
    },
  },
  {
    title: 'Незаезд',
    dataIndex: 'nights',
    key: 'nights',
    className: 'font-medium',
    sorter: (a, b) => a.start_date.localeCompare(b.end_date),
    render(_, values) {
      const startDate = dayjs(values.start_date)
      const endDate = dayjs(values.end_date)

      const differenceInDays = endDate.diff(startDate, 'day')
      return differenceInDays
    },
  },
  {
    title: 'Отменено',
    dataIndex: 'nights',
    key: 'nights',
    className: 'font-medium',
    sorter: (a, b) => a.start_date.localeCompare(b.end_date),
    render(_, values) {
      const startDate = dayjs(values.start_date)
      const endDate = dayjs(values.end_date)

      const differenceInDays = endDate.diff(startDate, 'day')
      return differenceInDays
    },
  },
  {
    title: 'Общее кол-во броней',
    dataIndex: 'nights',
    key: 'nights',
    className: 'font-medium',
    sorter: (a, b) => a.start_date.localeCompare(b.end_date),
    render(_, values) {
      const startDate = dayjs(values.start_date)
      const endDate = dayjs(values.end_date)

      const differenceInDays = endDate.diff(startDate, 'day')
      return differenceInDays
    },
  },
  {
    title: 'Общий доход',
    dataIndex: 'subtotal',
    key: 'subtotal',
    className: 'font-medium',
    sorter: (a, b) => a.subtotal - b.subtotal,
    render: (value) => <span>{formatAmount(value)} UZS</span>,
  },
]

const StatusStatsList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { branch } = useBranchIdStore()
  const { search, pathname } = useLocation()
  const queries = queryString.parse(search)

  const { data: items, isLoading } = useQuery({
    queryKey: ['order-items', queries],
    queryFn: async () => {
      const res = await getOrderItems({
        ...queries,
        statuses: queries.statuses?.toString(),
        sources: queries.sources?.toString(),
        page: queries?.page || 1,
        branch,
      })
      return res
    },
  })

  const handleTableChange = (pagination: any) => {
    const newPage = pagination.current

    const updatedQuery = queryString.stringify({
      ...queries,
      page: newPage,
    })

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <div className="rounded-3xl mb-[50px] flex-1 border bg-white dark:border-secondary-dark dark:bg-primary-dark">
      <div className="flex items-center p-6 gap-4">
        <Text className="text-lg font-medium leading-[30.6px]">
          {t('chart.room-load')}
        </Text>
      </div>
      <Table
        className={`custom-table ${
          items?.count ? '' : '[&_.ant-table-cell]:border-b-0 mt-[5%]'
        }`}
        bordered={Boolean(items?.count)}
        showHeader={Boolean(items?.count)}
        columns={columns}
        dataSource={items?.results?.map((item) => ({ ...item, key: item.id }))}
        loading={isLoading}
        locale={{ emptyText: <NotFound /> }}
        onChange={handleTableChange}
        pagination={{
          total: items?.count,
          showSizeChanger: false,
          showLessItems: true,
          hideOnSinglePage: true,
          position: ['bottomCenter'],
          nextIcon: (
            <span className="bg-transparent select-none text-secondary hover:border-secondary border inline-block font-medium rounded-lg px-3">
              {t('common.next')}
            </span>
          ),
          prevIcon: (
            <span className="bg-transparent select-none text-secondary hover:border-secondary border inline-block font-medium rounded-lg px-3">
              {t('common.prev')}
            </span>
          ),
        }}
      />
    </div>
  )
}

export default StatusStatsList
