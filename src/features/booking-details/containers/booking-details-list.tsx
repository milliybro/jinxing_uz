import { Button, Card, Select, Switch, Table, Tabs } from 'antd'

import { formatAmount } from '@/helpers/format-amount'

import EditIcon from '@/components/icons/edit'
import UserIcon from '@/components/icons/user'
import ArrowDownIcon from '@/components/icons/arrow-down'

import BookingHistory from './booking-history'
// import BookingCreditCards from './booking-credit-cards'
import BookingDetailsNotes from './booking-details-notes'
import BookingGuestDetails from '../components/booking-guest-details'
import BookingDetailsPayments from '../components/booking-details-payments'
import BookingDetailsServices from '../components/booking-details-services'

import type { FC } from 'react'
import type { IBookingDetails } from '../types'
import type { TabsProps, TableProps } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { updateOrderItem } from '@/features/welcome/api'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'
import NotFound from '@/components/not-found'

interface DataType {
  key: string
  total: number
  guests: number
  booking_number: string
  room_type: string
  room: string
  resides: boolean
}

const BookingDetailsList: FC<{ data?: IBookingDetails; refetch?: any }> = ({
  data,
  refetch,
}) => {
  const navigation = useNavigate()
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const { mutate } = useMutation({
    mutationFn: updateOrderItem,
    onSuccess: refetch,
  })

  const mainGuest = data?.order_guests.filter((val) => val?.main_guest)?.[0]
  const handleStop = () => {
    mutate({
      id: data?.items[0]?.id,
      status: 'reside',
      branch,
    })
  }

  const handleComing = () => {
    mutate({
      id: data?.items[0]?.id,
      status: 'arrival',
      branch,
    })
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: "ID",
      width: 190,
      dataIndex: 'booking_number',
      key: 'booking_number',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.booking_number.localeCompare(b.booking_number),
    },
    {
      title: t('room-cleaning-page.room_type.label'),
      width: 190,
      dataIndex: 'room_type',
      key: 'room_type',
      className: 'font-medium',
      sorter: (a, b) => a.room_type.localeCompare(b.room_type),
    },
    {
      title: t('common.room'),
      width: 160,
      dataIndex: 'room',
      key: 'room',
      className: 'font-medium',
      sorter: (a, b) => a.room.localeCompare(b.room),
      render: (value) => (
        <Select
          className="w-full"
          size="large"
          defaultValue={value}
          notFoundContent={null}
          options={[{ value, label: value }]}
          suffixIcon={<ArrowDownIcon className="text-base" />}
        />
      ),
    },
    {
      title: t('common.guests'),
      width: 190,
      dataIndex: 'guests',
      key: 'guests',
      className: 'font-medium',
      sorter: (a, b) => a.guests - b.guests,
      render: (value) => (
        <div className="flex items-center gap-1">
          {[...Array(value)].map((_, i) => (
            <UserIcon
              key={`user-icon-${i}`}
              className="text-[20px] text-secondary"
            />
          ))}
        </div>
      ),
    },
    {
      title: t('common.total'),
      width: 190,
      dataIndex: 'subtotal',
      key: 'subtotal',
      className: 'font-medium',
      sorter: (a, b) => a.total - b.total,
      render: (value) => `${formatAmount(value)} UZS`,
    },
    {
      title: t('common.lives'),
      dataIndex: 'resides',
      width: 190,
      key: 'resides',
      className: 'font-medium',
      // sorter: (a, b) => a.resides - b.resides,
      render: (value) => (
        <Switch
          defaultChecked={value}
          onChange={(checked) => {
            if (checked) {
              handleStop()
            } else {
              handleComing()
            }
          }}
        />
      ),
    },
    {
      title: t('common.actions'),
      dataIndex: 'action',
      width: 190,
      key: 'action',
      className: 'font-medium',
      render: () => (
        <Button
          className="flex items-center text-base font-medium"
          icon={<EditIcon className="text-[20px]" />}
          type="link"
          onClick={() => {
            navigation(`/new-booking?edit=${data?.id}`)
          }}
        >
          {t('common.edit')}
        </Button>
      ),
    },
  ]
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('common.rooms'),
      children: (
        <Table
          className="custom-table"
          bordered
          columns={columns as any}
          dataSource={data?.items?.map((val) => ({
            key: val?.room.id + val?.room.name,
            booking_number: val?.id,
            room_type: val?.room.name,
            room: val?.room_item.name,
            guests: val?.order_guests.length,
            subtotal: val?.subtotal,
            resides: val?.status === 'reside',
          }))}
          pagination={false}
          locale={{ emptyText: <NotFound /> }}
          loading={!Boolean(data)}
        />
      ),
    },
    {
      key: '2',
      label: t('common.payments'),
      children: <BookingDetailsPayments id={data?.id} refetch={refetch} />,
    },
    {
      key: '3',
      label: t('common.services'),
      children: <BookingDetailsServices data={data} refetch={refetch} />,
    },
    {
      key: '4',
      label: t('common.guest-detail'),
      children: data ? (
        <BookingGuestDetails data={data} />
      ) : (
        <div>No data available</div>
      ),
    },
    {
      key: '5',
      label: t('common.notes'),
      children: <BookingDetailsNotes data={data} refetch={refetch} />,
    },
    // {
    //   key: '6',
    //   label: t('welcome.faq.items.item6-title'),
    //   children: <BookingCreditCards data={data} />,
    // },
    {
      key: '7',
      label: t('common.booking-history'),
      children: <BookingHistory guestId={mainGuest?.guest} />,
    },
  ]

  return (
    <Card className="flex-1">
      <Tabs items={items} />
    </Card>
  )
}

export default BookingDetailsList
