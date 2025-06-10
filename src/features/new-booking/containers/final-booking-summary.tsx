import { Divider, Table, Typography } from 'antd'

// import type { DataType } from '../types'

const columns = [
  {
    title: 'Дата Заезда',
    width: 190,
    dataIndex: 'details',
    key: 'details',
    className: 'whitespace-nowrap font-medium',
  },
  {
    title: 'Дата Выезда',
    width: 190,
    dataIndex: 'total',
    key: 'total',
    className: 'font-medium',
  },
  {
    title: 'Ночей',
    width: 190,
    dataIndex: 'available',
    key: 'available',
    className: 'font-medium',
  },
  {
    title: 'Дата бронирования',
    width: 190,
    dataIndex: 'adults',
    key: 'adults',
    className: 'font-medium',
  },
  {
    title: 'Источник',
    dataIndex: 'children',
    width: 190,
    key: 'children',
    className: 'font-medium',
  },
]

const data = [
  {
    key: '1',
    details: 'TWIN DLX',
    total: 2729000,
    available: 13,
    adults: 2,
    children: 0,
    action: 0,
  },
  {
    key: '2',
    details: 'DBL',
    total: 1950000,
    available: 7,
    adults: 2,
    children: 0,
    action: 0,
  },
]

const FinalBookingSummary = () => {
  return (
    <div className="flex flex-col">
      <Typography.Text className="text-[18px] font-medium">
        Финальная сводка бронирования
      </Typography.Text>
      <Divider />
      <div className="flex flex-col gap-4 mb-6">
        <Typography.Text className="text-[18px] font-medium ">
          Информация о бронировании
        </Typography.Text>
        <Table
          className="custom-table"
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <Typography.Text className="text-[18px] font-medium ">
          Информация о гостях
        </Typography.Text>
        <Table
          className="custom-table"
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <Typography.Text className="text-[18px] font-medium ">
          Размещение по номерам
        </Typography.Text>
        <Table
          className="custom-table"
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default FinalBookingSummary
