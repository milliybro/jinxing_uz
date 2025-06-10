import dayjs from 'dayjs'
import { Card, Table, Typography } from 'antd'

import CSelect from '@/components/cselect'

import type { FC } from 'react'
import type { TableProps } from 'antd'
import type { IBookingDetails } from '../types'
import { useTranslation } from 'react-i18next'
import { T } from 'ramda'

interface IColumns {
  key?: string
  check_in?: string
  check_out?: string
  nights?: number
  guests?: number
  rooms_count?: number
  source?: string
  booking_number?: number
}


const BookingDetails: FC<{ data?: IBookingDetails }> = ({ data }) => {
  const { t, i18n } = useTranslation()
  const columns: TableProps<IColumns>['columns'] = [
    {
      title: t('common.check-in-date'),
      width: 190,
      dataIndex: 'check_in',
      key: 'check_in',
      className: 'whitespace-nowrap font-medium',
    },
    {
      title: t('common.check-out-date'),
      width: 190,
      dataIndex: 'check_out',
      key: 'check_out',
      className: 'font-medium',
    },
    {
      title: t('common.nights'),
      width: 190,
      dataIndex: 'nights',
      key: 'nights',
      className: 'font-medium',
    },
    {
      title: t('common.guests'),
      width: 190,
      dataIndex: 'guests',
      key: 'guests',
      className: 'font-medium',
    },
    {
      title: t('common.number-of-rooms'),
      width: 190,
      dataIndex: 'rooms_count',
      key: 'rooms_count',
      className: 'font-medium',
    },
    {
      title:  t('booking-page.sources.label'),
      dataIndex: 'source',
      width: 190,
      key: 'source',
      className: 'font-medium',
    },
    {
      title: t('common.booking-number'),
      dataIndex: 'booking_number',
      width: 190,
      key: 'booking_number',
      className: 'font-medium',
    },
  ]

  const startDate = dayjs(data?.start_date)
  const endDate = dayjs(data?.end_date)

  const differenceInDays = endDate.diff(startDate, 'day')
  const getLocale = () => {
    if (i18n.language === 'ru') return 'ru';
    if (i18n.language === 'uz') return 'uz';
    if (i18n.language === 'oz') return 'uz-latn';
    return 'en'; 
  };

  const tableData: IColumns[] = [
    {
      key: 'string' + data?.id,
      nights: differenceInDays,
      check_in: dayjs(data?.start_date).locale(getLocale()).format('DD MMMM, YYYY'),
      check_out: dayjs(data?.end_date).locale(getLocale()).format('DD MMMM, YYYY'),
      guests: data?.order_guests?.length,
      rooms_count: data?.items?.length,
      source: data?.source?.name,
      booking_number: data?.id,
    },
  ]

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <Typography.Text className="text-[18px] font-medium">
            {t('common.booking')} #{data?.id}
          </Typography.Text>
          <CSelect
            size="large"
            className="w-[200px]"
            defaultValue={t('common.confirmed')}
            options={[
              {
                value: t('common.confirmed'),
                label: t('common.confirmed'),
              },
            ]}
          />
        </div>
      }
    >
      <Table
        className="custom-table"
        bordered
        loading={!Boolean(data)}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    </Card>
  )
}

export default BookingDetails
