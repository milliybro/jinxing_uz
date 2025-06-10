import { Button, Spin, Table } from 'antd'
import { useTranslation } from 'react-i18next'

import CTag from '@/components/ctag'
import { formatAmount } from '@/helpers/format-amount'

import { IRoomReview } from '@/features/calendar/types'
import { useMutation } from '@tanstack/react-query'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { updateOrderItem } from '../api'
// import PDFReport from './pdf-report'
import TableActions from './table-action'
import { useBranchIdStore } from '@/store/branch-id-store'
import StatusTag from './status-tag'
import PDFReport from './pdf-report'
import { Link } from 'react-router-dom'

interface ReviewArrivalsProps {
  data?: any
  refetch: () => void
  tab?: '1' | '2' | '3' | '5' | '6'
  loading: boolean
}

const ReviewArrivals: React.FC<ReviewArrivalsProps> = ({
  data,
  refetch,
  tab,
  loading,
}) => {
  const { t } = useTranslation()
  const [isShowingPrint, setIsShowingPrint] = useState<number | null>(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { branch } = useBranchIdStore()

  const { mutate, isLoading } = useMutation({
    mutationFn: updateOrderItem,
    onSuccess: refetch,
  })

  const columns: TableProps<IRoomReview>['columns'] = [
    {
      title: t('common.details'),
      width: 280,
      dataIndex: 'order_guests',
      key: 'guest_name',
      className: 'font-medium',
      sorter: (a, b) => {
        const getFirstGuestName = (order_guests: any[]) =>
          order_guests?.length > 0
            ? order_guests.reduce((minGuest, currentGuest) =>
                currentGuest.id < minGuest.id ? currentGuest : minGuest,
              )
            : { first_name: '', last_name: '' }
        const aName = `${getFirstGuestName(a.order_guests).first_name} ${
          getFirstGuestName(a.order_guests).last_name
        }`
        const bName = `${getFirstGuestName(b.order_guests).first_name} ${
          getFirstGuestName(b.order_guests).last_name
        }`
        return aName.localeCompare(bName)
      },
      render: (order_guests: IRoomReview['order_guests'], record: any) => {
        if (!order_guests?.length) return null

        const mainGuest = order_guests.reduce((maxGuest, currentGuest) =>
          currentGuest.id > maxGuest.id ? currentGuest : maxGuest,
        )

        return (
          <div>
            <Link
              to={`/booking-details/${record?.order}`}
              className="text-sm font-medium flex items-center gap-2"
            >
              {`${mainGuest.first_name} ${mainGuest.last_name}`}
            </Link>
            <div className="text-xs text-secondary">
              {record?.room_description || t('common.no-description')}
            </div>
          </div>
        )
      },
    },
    {
      title: t('common.guests'),
      width: 90,
      key: 'guests',
      className: 'font-medium',
      sorter: (a, b) =>
        (a.order_guests?.length || 0) - (b.order_guests?.length || 0),
      render: (_, record) => {
        return record.order_guests ? record.order_guests.length : 0
      },
    },
    {
      title: t('common.nights'),
      width: 90,
      key: 'nights',
      className: 'font-medium',
      sorter: (a, b) => {
        const getNights = (start: string, end: string) => {
          const startDate = new Date(start) as any
          const endDate = new Date(end) as any
          return (endDate - startDate) / (1000 * 60 * 60 * 24)
        }
        return (
          getNights(a.start_date, a.end_date) -
          getNights(b.start_date, b.end_date)
        )
      },
      render: (_: any, record: { start_date: string; end_date: string }) => {
        const startDate = new Date(record.start_date).getTime()
        const endDate = new Date(record.end_date).getTime()
        const nights = (endDate - startDate) / (1000 * 60 * 60 * 24)
        return nights > 0 ? nights : 0
      },
    },
    {
      title: t('common.check-in'),
      dataIndex: 'start_date',
      key: 'check_in',
      className: 'font-medium',
      render: (value: string) => {
        return <span>{dayjs(value).format('DD.MM.YYYY')}</span>
      },
      sorter: (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    },
    {
      title: t('common.check-out'),
      dataIndex: 'end_date',
      key: 'check_out',
      className: 'font-medium',
      render: (value: string) => {
        return <span>{dayjs(value).format('DD.MM.YYYY')}</span>
      },
      sorter: (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    },
    {
      title: t('common.room-number'),
      dataIndex: 'room_item_name',
      key: 'room_item_name',
      className: 'font-medium',
      sorter: (a, b) => a.room_item_name.localeCompare(b.room_item_name),
      render: (value, val: any) => {
        return (
          <div className="flex  items-center">
            {value}{' '}
            {data[0]?.status === 'arrival' ? (
              <>
                {data?.room_clean}
                <StatusTag status={val?.room_clean} />
              </>
            ) : null}
          </div>
        )
      },
    },
    {
      title: t('common.status'),
      key: 'status',
      dataIndex: 'status',
      className: 'font-medium',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (value) => {
        return <CTag type={value}>{value}</CTag>
      },
    },
    {
      title: t('common.total'),
      dataIndex: 'subtotal',
      key: 'subtotal',
      className: 'font-medium',
      sorter: (a: any, b: any) => a.total - b.total,
      render: (value: string) => <span>{formatAmount(+value)} UZS</span>,
    },
    {
      title: t('common.action'),
      dataIndex: 'booking_date',
      key: 'booking_date',
      className: 'font-medium w-0',
      sorter: (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
      render: (_, record) => {
        console.log(record)
        const handleStop = () => {
          mutate({
            id: record.id,
            status: 'reside', // statusni yashamoqda ga o‘tkazish
            branch,
          })
        }

        const handleLeft = () => {
          mutate({
            id: record.id,
            status: 'departure', // statusni ketdi ga o‘tkazish
            branch,
          })
        }

        if (tab === '6') {
          return <TableActions setOpenModal={setIsOpenModal} values={[]} />
        } else if (record.status === 'arrival') {
          return (
            <Button
              onClick={handleStop}
              className="font-semibold border-primary text-primary hover:bg-primary-light dark:hover:bg-transparent"
            >
              {t('common.stopped')}
            </Button>
          )
        } else if (record.status === 'reside') {
          return (
            <Button
              onClick={handleLeft}
              className="font-semibold border-primary text-primary hover:bg-primary-light dark:hover:bg-transparent"
            >
              {t('common.left')}
            </Button>
          )
        } else if (record.status === 'pre_booked') {
          return (
            <Button
              onClick={handleStop}
              className="font-semibold border-primary text-primary hover:bg-primary-light dark:hover:bg-transparent"
            >
              {t('common.stopped')}
            </Button>
          )
        } else if (record.status === 'departure') {
          return <span></span>
        } else {
          return (
            <Button className="font-semibold border-primary text-primary hover:bg-primary-light dark:hover:bg-transparent">
              {t('common.action')}
            </Button>
          )
        }
      },
    },
    {
      title: t('common.reports'),
      dataIndex: 'action',
      key: 'action',
      className: 'font-medium',
      sorter: (a: any, b: any) => a.total - b.total,
      render: (_, values) => {
        if (['reside', 'departure'].includes(values.status)) {
          return (
            <Button onClick={() => setIsShowingPrint(values.id)}>
              {t('common.report')}
            </Button>
          )
        }
      },
    },
  ]

  const filteredColumns =
    Array.isArray(data) && data.some((item) => item.status !== 'cancelled')
      ? columns
      : columns.filter(
          (col) => col.key !== 'booking_date' && col.key !== 'room_item_name',
        )

  return (
    <Spin spinning={isLoading}>
      <Table
        className="custom-table"
        bordered
        columns={filteredColumns}
        dataSource={data}
        pagination={false}
        loading={loading}
      />
      {!!isShowingPrint && (
        <div className="hidden">
          <PDFReport
            onClose={() => setIsShowingPrint(null)}
            id={isShowingPrint}
          />
        </div>
      )}
    </Spin>
  )
}

export default ReviewArrivals
