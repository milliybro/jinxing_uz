import dayjs from 'dayjs'
import { Table, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { getGuestsBookingHistory } from '../api'

import CTag from '@/components/ctag'
import CSelect from '@/components/cselect'

import type { FC } from 'react'
import type { TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'

interface DataType {
  key: string
  source: string
  check_in: string
  check_out: string
  booking_number: string
  birthday: string
  room: string
  status: string
}

const BookingHistory: FC<{ guestId?: number }> = ({ guestId }) => {
  const { t, i18n } = useTranslation()
  const { branch } = useBranchIdStore()

  const getLocale = () => {
    if (i18n.language === 'ru') return 'ru'
    if (i18n.language === 'uz') return 'uz'
    if (i18n.language === 'oz') return 'uz-latn'
    return 'en'
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('common.number'),
      width: 190,
      dataIndex: 'booking_number',
      key: 'booking_number',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.booking_number.localeCompare(b.booking_number),
      render: (value) => (
        <Typography.Link className="text-sm">{value}</Typography.Link>
      ),
    },
    {
      title: t('common.birthday'),
      width: 190,
      dataIndex: 'birthday',
      key: 'birthday',
      className: 'font-medium',
      sorter: (a, b) => a.birthday.localeCompare(b.birthday),
      render: (value) =>
        value
          ? dayjs(value).locale(getLocale()).format('DD MMMM, YYYY')
          : value,
    },

    {
      title: t('common.check-in-date'),
      width: 190,
      dataIndex: 'check_in',
      key: 'check_in',
      className: 'font-medium',
      sorter: (a, b) => a.check_in.localeCompare(b.check_in),
      render: (value) =>
        value
          ? dayjs(value).locale(getLocale()).format('DD MMMM, YYYY')
          : value,
    },
    {
      title: t('common.check-out-date'),
      width: 190,
      dataIndex: 'check_out',
      key: 'check_out',
      className: 'font-medium',
      sorter: (a, b) => a.check_out.localeCompare(b.check_out),
      render: (value) =>
        value
          ? dayjs(value).locale(getLocale()).format('DD MMMM, YYYY')
          : value,
    },
    // {
    //   title: t('booking-page.sources.label'),
    //   width: 190,
    //   dataIndex: 'source',
    //   key: 'source',
    //   className: 'font-medium',
    //   sorter: (a, b) => a.source.localeCompare(b.source),
    // },

    {
      title: t('common.room'),
      width: 190,
      dataIndex: 'room',
      key: 'room',
      className: 'font-medium',
      sorter: (a, b) => a.room.localeCompare(b.room),
      render: (value) => (
        <CSelect
          className="w-full"
          size="large"
          defaultValue={value}
          notFoundContent={null}
          options={[{ value, label: value }]}
        />
      ),
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      width: 190,
      key: 'status',
      className: 'font-medium',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (value) => {
        return <CTag type={value}>{value}</CTag>
      },
    },
  ]
  const { data: guestsBookingHistory, isLoading } = useQuery({
    queryKey: ['guests-booking-history'],
    queryFn: async () => {
      const res = await getGuestsBookingHistory({ guest: guestId, branch })
      return res
    },
  })

  const dataSource = guestsBookingHistory?.results.map((val, i) => ({
    key: val.first_name + i,
    booking_number: val?.order_item?.id,
    birthday: val?.birthday,
    room: val?.order_item?.room.name + ' ' + val?.order_item?.room_item?.name,
    check_in: val?.order_item?.start_date,
    check_out: val?.order_item?.end_date,
    source: val?.order?.source?.name,
    status: val?.order_item?.status,
  }))

  return (
    <Table
      className="custom-table"
      bordered
      columns={columns}
      loading={isLoading}
      dataSource={dataSource as any}
      pagination={false}
    />
  )
}

export default BookingHistory
