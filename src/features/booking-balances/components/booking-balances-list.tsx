import dayjs from 'dayjs'
import i18next from 'i18next'
import queryString from 'query-string'
import { Table, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import { formatAmount } from '@/helpers/format-amount'
import { getOrderItems } from '../api'

import CTag from '@/components/ctag'

import type { TableProps } from 'antd'
import type { IOrdersItem } from '../types'
import BookingBalancesNotFound from './booking-balances-not-found'

const { Text } = Typography

const columns: TableProps<IOrdersItem>['columns'] = [
  {
    title: i18next.t('common.booking-number'),
    dataIndex: 'id',
    key: 'id',
    className: 'font-medium',
    sorter: (a, b) => a.order_guests.length - b.order_guests.length,
    render: (value) => <p className="text-primary">#{value}</p>,
  },
  {
    title: i18next.t('common.guest-name'),
    dataIndex: 'guest_name',
    key: 'guest_name',
    className: 'font-medium',
    // sorter: (a, b) => a.guest_name.localeCompare(b.guest_name),
    render(_, values) {
      const guest = values.order_guests
        // .filter((val) => val.main_guest)
        .sort((a, b) => a.id - b.id)

      return `${guest?.[0]?.first_name} ${guest?.[0]?.last_name}`
    },
  },
  {
    title: i18next.t('common.created-at'),
    dataIndex: 'created_at',
    key: 'created_at',
    className: 'font-medium',
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    render(value) {
      return dayjs(value).format('DD MMM, YYYY hh:mm').replace('.', '')
    },
  },
  {
    title: i18next.t('common.check-in-date'),
    dataIndex: 'start_date',
    key: 'start_date',
    className: 'font-medium',
    sorter: (a, b) => a.start_date.localeCompare(b.start_date),
    render(value) {
      return dayjs(value).format('DD MMM, YYYY').replace('.', '')
    },
  },
  {
    title: i18next.t('common.check-out-date'),
    dataIndex: 'end_date',
    key: 'end_date',
    className: 'font-medium',
    sorter: (a, b) => a.end_date.localeCompare(b.end_date),
    render(value) {
      return dayjs(value).format('DD MMM, YYYY').replace('.', '')
    },
  },
  {
    title: i18next.t('all-rooms.filter.status.label'),
    key: 'status',
    dataIndex: 'status',
    className: 'font-medium',
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (value) => {
      return <CTag type={value}>{i18next.t(`common.${value}`)}</CTag>
    },
  },
  {
    title: i18next.t('booking-page.sources.label'),
    dataIndex: 'source',
    key: 'source',
    className: 'font-medium',
    sorter: (a, b) => a.order.source?.name.localeCompare(b.order.source?.name),
    render: (_, values) => {
      return values.order.source?.name
    },
  },
  {
    title: i18next.t('common.total-pay'),
    dataIndex: 'subtotal',
    key: 'subtotal',
    className: 'font-medium',
    sorter: (a, b) => a.subtotal - b.subtotal,
    render: (value) => <span>{formatAmount(value)} UZS</span>,
  },
  {
    title: i18next.t('common.paid'),
    dataIndex: 'subtotal',
    key: 'subtotal',
    className: 'font-medium',
    sorter: (a, b) => a.subtotal - b.subtotal,
    render: () => <span>0 UZS</span>,
  },
  {
    title: i18next.t('common.debt'),
    dataIndex: 'subtotal',
    key: 'subtotal',
    className: 'font-medium',
    sorter: (a, b) => a?.subtotal - b?.subtotal,
    render: (value) => <span>{formatAmount(value)} UZS</span>,
  },
]

const BookingBalancesList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
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
    <div className="flex flex-col gap-4">
      <Text className="text-lg font-medium leading-[30.6px]">
        {t('common.filter-results')}
      </Text>
      {/* Table is breaking the site */}
      <Table
        className={`custom-table ${
          items?.count ? '' : '[&_.ant-table-cell]:border-b-0 mt-[5%]'
        }`}
        bordered={Boolean(items?.count)}
        showHeader={Boolean(items?.count)}
        columns={columns}
        dataSource={items?.results}
        loading={isLoading}
        locale={{ emptyText: <BookingBalancesNotFound /> }}
        onChange={handleTableChange}
        pagination={{
          total: items?.count,
          showSizeChanger: false,
          showLessItems: true,
          hideOnSinglePage: true,
          current: queries.page ? Number(queries.page) : 1,
          position: ['bottomCenter'],
          nextIcon: (
            <span className="table-pagination-btn">{t('common.next')}</span>
          ),
          prevIcon: (
            <span className="table-pagination-btn">{t('common.prev')}</span>
          ),
        }}
      />
    </div>
  )
}

export default BookingBalancesList
