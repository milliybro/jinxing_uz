import { Button, Table } from 'antd'

import TariffDelete from './tariff-delete'
import InformationCircleIcon from '@/components/icons/information-circle'

import type { TableProps } from 'antd'

interface DataType {
  key: string
  action: string
  tariffs: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Тарифы',
    width: 190,
    dataIndex: 'tariffs',
    key: 'tariffs',
    className: 'whitespace-nowrap font-medium',
    render: () => (
      <div className="flex items-center">
        <span>Стандарт</span>
        <Button
          type="link"
          shape="circle"
          className="flex items-center justify-center"
          icon={<InformationCircleIcon className="text-[20px]" />}
        />
      </div>
    ),
  },
  {
    title: 'Действие',
    width: 190,
    dataIndex: 'action',
    key: 'action',
    className: 'font-medium',
    render: () => <TariffDelete />,
  },
]

const data: DataType[] = [
  {
    key: '1',
    tariffs: 'Humo',
    action: 'Оплачено',
  },
  {
    key: '2',
    tariffs: 'Visa',
    action: 'Оплачено',
  },
]

const TariffClosure = () => {
  return (
    <Table
      className="custom-table"
      bordered
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  )
}

export default TariffClosure
