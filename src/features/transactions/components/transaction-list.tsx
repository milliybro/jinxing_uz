import { useQuery } from '@tanstack/react-query'
import { Table, Typography } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import 'dayjs/locale/uz'
import queryString from 'query-string'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { formatAmount } from '@/helpers/format-amount'
import { getOrderItems } from '../api'

import CTag from '@/components/ctag'

import { useBranchIdStore } from '@/store/branch-id-store'
import type { TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import type { IOrdersItem } from '../types'
import NotFound from '@/components/not-found'

const { Text } = Typography

const TransactionsList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { search, pathname } = useLocation()
  const { branch } = useBranchIdStore()
  const queries = queryString.parse(search)

  const columns: TableProps<IOrdersItem>['columns'] = [
    {
      title: '№',
      width: 80,
      dataIndex: 'booking_number',
      key: 'booking_number',
      className: 'whitespace-nowrap font-medium',
      render: (_, values) => {
        return `${values?.id}`
      },
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: t('common.staff'),
      width: 170,
      dataIndex: 'guest_name',
      key: 'guest_name',
      className: 'font-medium',
      // sorter: (a, b) => a.guest_name.localeCompare(b.guest_name),
      render(_, values) {
        const guest = values?.order_guests.sort((a, b) => a?.id - b?.id)

        return `${guest?.[0]?.first_name || ''} ${guest?.[0]?.last_name || ''}`
      },
    },
    {
      title: t('common.booking-number'),
      dataIndex: 'order',
      key: 'order',
      className: 'font-medium',
      sorter: (a, b) => a?.order - b?.order,
      render: (value) => (
        <Link to={`/booking-details/${value}`} className="text-primary">
          # {value}
        </Link>
      ),
    },
    {
      title: t('common.guest-name'),
      width: 170,
      dataIndex: 'guest_name',
      key: 'guest_name',
      className: 'font-medium',
      // sorter: (a, b) => a.guest_name.localeCompare(b.guest_name),
      render(_, values) {
        const guest = values.order_guests.sort((a, b) => a?.id - b?.id)

        return `${guest?.[0]?.first_name || ''} ${guest?.[0]?.last_name || ''}`
      },
    },
    {
      title: t('common.status'),
      key: 'status',
      dataIndex: 'status',
      className: 'font-medium',
      sorter: (a, b) => a?.status.localeCompare(b?.status),
      render: (value) => {
        return <CTag type={value}>value</CTag>
      },
    },
    {
      title: t('common.created-at'),
      dataIndex: 'created_at',
      key: 'created_at',
      className: 'font-medium',
      // sorter: (a, b) => a?.created_at.localeCompare(b?.created_at),
      render(value) {
        return dayjs(value).format('DD MMM, YYYY hh:mm').replace('.', '')
      },
    },
    {
      title: t('common.check-in') + ' - ' + t('common.check-out'),
      dataIndex: 'dates', // This is a dummy dataIndex as we're combining two fields
      key: 'start_end_dates',
      className: 'font-medium',
      sorter: (a, b) =>
        a?.start_date.localeCompare(b?.start_date) ||
        a?.end_date.localeCompare(b?.end_date),
      render(_, record) {
        const startDate = dayjs(record?.start_date)
          .format('DD MMM, YYYY')
          .replace('.', '')
        const endDate = dayjs(record?.end_date)
          .format('DD MMM, YYYY')
          .replace('.', '')
        return `${startDate} - ${endDate}`
      },
    },
    {
      title: t('common.room'),
      dataIndex: 'room_item',
      key: 'room_item',
      className: 'font-medium',
      // sorter: (a, b) => a?.room_item?.name.localeCompare(b?.room_item?.name),
      render(_, values) {
        return `${values.room_item_name}`
      },
    },
    // {
    //   title: 'Тип',
    //   dataIndex: 'source',
    //   key: 'source',
    //   className: 'font-medium',
    //   // sorter: (a, b) =>
    //   //   a?.order?.source?.name.localeCompare(b?.order?.source?.name),
    //   render: (_, values) => 'Наличные',
    // },
    {
      title: t('common.transaction'),
      key: 'status',
      dataIndex: 'status',
      className: 'font-medium',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (value) => {
        return <CTag type={value}>{value}</CTag>
      },
    },
    {
      title: 'Сумма',
      dataIndex: 'subtotal',
      key: 'subtotal',
      className: 'font-medium',
      width: 158,
      sorter: (a, b) => a.subtotal - b.subtotal,
      render: (value) => <span>{formatAmount(value)} UZS</span>,
    },
  ]

  const { data: items, isFetching: isLoading } = useQuery({
    queryKey: ['order-items', queries],
    queryFn: async () => {
      const res = await getOrderItems({
        ...queries,
        statuses: queries?.statuses?.toString(),
        sources: queries?.sources?.toString(),
        branch,
      })
      return res
    },
    keepPreviousData: true,
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

export default TransactionsList
