import { Button, Table } from 'antd'

import RangePicker from '@/components/rangepicker'
import FileDownloadIcon from '@/components/icons/file-download'

import type { TableProps } from 'antd'

interface DataType {
  key: string
  total: number
  guests: number
  nights: number
  status: string
  source: string
  check_in: string
  check_out: string
  guest_name: string
  room_number: number
  booking_date: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Число',
    width: 400,
    dataIndex: 'guest_name',
    key: 'guest_name',
    className: 'font-medium',
    render: () => {
      return (
        <div>
          <div className="text-sm font-medium flex items-center gap-2">
            Гости
          </div>
          <div className="text-xs text-secondary">
            Количество гостей в отелей
          </div>
        </div>
      )
    },
  },
  {
    title: 'Гостей',
    dataIndex: 'guests',
    key: 'guests',
    className: 'font-medium',
  },
  {
    title: 'Ночей',
    dataIndex: 'nights',
    key: 'nights',
    className: 'font-medium',
  },
  {
    title: 'Заезд',
    dataIndex: 'check_in',
    key: 'check_in',
    className: 'font-medium',
  },
  {
    title: 'Выезд',
    dataIndex: 'check_out',
    key: 'check_out',
    className: 'font-medium',
  },
  {
    title: '№ комнаты',
    dataIndex: 'room_number',
    key: 'room_number',
    className: 'font-medium',
  },
  {
    title: 'Статус',
    key: 'status',
    dataIndex: 'status',
    className: 'font-medium',
  },
  {
    title: 'Сумма',
    dataIndex: 'total',
    key: 'total',
    className: 'font-medium',
  },
  {
    title: 'Действие',
    dataIndex: 'booking_date',
    key: 'booking_date',
    className: 'font-medium',
  },
]

const data: DataType[] = [
  {
    key: '1',
    guest_name: 'Гости',
    check_in: '9 янв, 2024',
    check_out: '22 янв, 2024',
    guests: 2,
    room_number: 105,
    nights: 13,
    booking_date: '12 янв, 2024',
    status: 'Ожидает',
    source: 'От стойки',
    total: 14560000,
  },
]

const ReviewBreakfast = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <RangePicker singlePlaceholder="Выберите период" />
        <Button
          type="link"
          size="small"
          className="flex items-center font-medium"
        >
          Экспортировать данные <FileDownloadIcon className="text-[20px]" />
        </Button>
      </div>
      <Table bordered columns={columns} dataSource={data} pagination={false} />
    </div>
  )
}

export default ReviewBreakfast
