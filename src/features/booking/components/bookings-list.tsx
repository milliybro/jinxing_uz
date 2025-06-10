import dayjs from 'dayjs'
import { Table } from 'antd'
import queryString from 'query-string'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { useBookingContext } from '../context'
import { formatAmount } from '@/helpers/format-amount'

import CTag from '@/components/ctag'
import BookingsNotFound from './bookings-not-found'

import type { TableProps } from 'antd'
import type { IOrdersItem } from '../types'

const BookingsList = () => {
  const { t } = useTranslation()
  const { search } = useLocation()

  const { orderItems, handleTableChange } = useBookingContext()

  const queries = queryString.parse(search)

  const count = orderItems?.data?.count

  const columns: TableProps<IOrdersItem>['columns'] = [
    {
      title: '№',
      width: 1,
      dataIndex: '',
      key: 'index',
      className: 'whitespace-nowrap font-medium',
      render: (text, record, index) =>
        ((Number(queries?.page) || 1) - 1) * 10 + index + 1,
    },
    {
      title: t('common.details'),
      width: 400,
      dataIndex: 'order_guests',
      key: 'guest_name',
      className: 'font-medium',
      sorter: true,
      render: (order_guests, record: any) => {
        if (!order_guests?.length) return null

        const smallestGuest = order_guests.reduce(
          (minGuest: any, currentGuest: any) =>
            currentGuest.id > minGuest.id ? currentGuest : minGuest,
        )

        return (
          <div>
            <div className="text-sm font-medium flex items-center gap-2">
              {`${smallestGuest.first_name} ${smallestGuest.last_name}`}
            </div>
            {/* <div className="text-xs text-secondary">
              {record?.room_description || t('common.no-description')}
            </div> */}
          </div>
        )
      },
    },
    {
      title: t('common.check-in-date'),
      width: 158,
      dataIndex: 'start_date',
      key: 'start_date',
      className: 'font-medium',
      sorter: true,
      render(value) {
        return dayjs(value).format('DD.MM.YYYY')
      },
    },
    {
      title: t('common.check-out-date'),
      width: 158,
      dataIndex: 'end_date',
      key: 'end_date',
      className: 'font-medium',
      sorter: true,
      render(value) {
        return dayjs(value).format('DD.MM.YYYY')
      },
    },
    {
      title: t('common.booking-number'),
      width: 145,
      dataIndex: 'order',
      key: 'order',
      className: 'whitespace-nowrap font-medium',
      render: (_, values) => (
        <Link to={`/booking-details/${values?.order}`} className="text-primary">
          {values?.order}
        </Link>
      ),
      sorter: true,
    },
    {
      title: t('common.guests'),
      dataIndex: 'order_guests',
      key: 'order_guests',
      className: 'font-medium',
      sorter: true,
      render: (value) => value.length,
    },
    {
      title: t('common.room-no'),
      dataIndex: 'id',
      key: 'id',
      className: 'font-medium',
      sorter: true,
      render(value) {
        return value
      },
    },
    {
      title: t('common.nights'),
      dataIndex: 'nights',
      key: 'nights',
      className: 'font-medium',
      sorter: false,
      render(_, values) {
        const startDate = dayjs(values.start_date)
        const endDate = dayjs(values.end_date)

        const differenceInDays = endDate.diff(startDate, 'day')
        return differenceInDays
      },
    },
    {
      title: t('common.booking-date'),
      width: 158,
      dataIndex: 'created_at',
      key: 'created_at',
      className: 'font-medium',
      sorter: true,
      render(value) {
        return dayjs(value).format('DD.MM.YYYY')
      },
    },
    {
      title: t('common.status'),
      key: 'status',
      dataIndex: 'status',
      className: 'font-medium',
      sorter: true,
      render: (value) => {
        return <CTag type={value}>{value}</CTag>
      },
    },
    // {
    //   title: 'Источник',
    //   dataIndex: 'source',
    //   key: 'source',
    //   className: 'font-medium',
    //   sorter: (a, b) => a.order.source.name.localeCompare(b.order.source.name),
    //   render: (_, values) => values.order.source.name,
    // },
    {
      title: t('common.total'),
      dataIndex: 'subtotal',
      key: 'subtotal',
      className: 'font-medium whitespace-nowrap',
      width: 158,
      sorter: true,
      render: (value) => <span>{formatAmount(value)} UZS</span>,
    },
  ]

  return (
    <Table
      className={twMerge(
        'custom-table',
        count ? '' : '[&_.ant-table-cell]:border-b-0 mt-[5%]',
      )}
      bordered={Boolean(count)}
      showHeader={Boolean(count)}
      columns={columns}
      dataSource={orderItems?.data?.results}
      rowKey="id"
      loading={orderItems?.isFetching}
      locale={{ emptyText: <BookingsNotFound /> }}
      onChange={handleTableChange}
      pagination={{
        total: count,
        showLessItems: true,
        hideOnSinglePage: true,
        showSizeChanger: false,
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
  )
}

export default BookingsList
