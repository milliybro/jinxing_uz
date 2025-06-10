import { Divider, Result, Typography } from 'antd'
import { useState } from 'react'
import type { TableColumnsType, TableProps } from 'antd'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ExclamationCircleFilled } from '@ant-design/icons'

type OnChange = NonNullable<TableProps<DataType>['onChange']>
type Filters = Parameters<OnChange>[1]

type GetSingle<T> = T extends (infer U)[] ? U : never
type Sorts = GetSingle<Parameters<OnChange>[2]>

interface DataType {
  key: string
  name: string | JSX.Element
  age: string
  address: string
}

const data: DataType[] = [
  {
    key: '1',
    name: <p className="text-[#3276FF]">Oriente Palace Apartments</p>,
    age: '22 янв, 2024 - 29 янв, 2024',
    address:
      'Господин Иванов предпочитает номер на высоком этаже с видом на океан. Предпочитает завтракать в номере, заказывает блюдо из яиц и свежевыжатый сок. Очень ценит чистоту и порядок в номере, особенно обращает внимание на состояние ванной комнаты. Во время предыдущего визита оставил положительный отзыв о работе спа-салона.',
  },
  {
    key: '2',
    name: <p className="text-[#3276FF]">7Seasons Apartments Budapest</p>,
    age: '30 янв, 2024 - 7 фев, 2024',
    address:
      'Господин попросил предоставить подушку и одеяло гипоаллергенные. Он также интересовался возможностью позднего выезда, если это будет возможно. Ежедневно пользуется тренажерным залом с 6:00 до 7:00 утра. Обратил внимание на важность быстрого интернет-соединения, так как планирует работать удаленно из номера.',
  },
  {
    key: '3',
    name: <p className="text-[#3276FF]">Casa Portuguesa Prata</p>,
    age: '25 янв, 2024 - 14 фев, 2024',
    address:
      'Господин сообщил о необходимости обеспечения дополнительной безопасности из-за важного делового визита. Требует наличие сейфа в номере для хранения ценных документов. Заказал конференц-зал на 27 июня с 10:00 до 16:00 для проведения встречи с партнерами. Предпочитает обедать в ресторане отеля, обычно заказывает блюда из рыбы. Необходима проверка всех технических устройств в номере и конференц-зале перед его прибытием.',
  },
]

const LatestStepModal = () => {
  const { t } = useTranslation()
  const [filteredInfo, setFilteredInfo] = useState<Filters>({})
  const [sortedInfo, setSortedInfo] = useState<Sorts>({})

  const handleChange: OnChange = (filters, sorter) => {
    setSortedInfo(sorter as Sorts)
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: t('common.hotel'),
      width: 300,
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) =>
        typeof record.name === 'string' &&
        record.name.includes(value as string),
      sorter: (a, b) => {
        const nameA = typeof a.name === 'string' ? a.name : ''
        const nameB = typeof b.name === 'string' ? b.name : ''
        return nameA.length - nameB.length
      },
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t('common.period'),
      width: 250,
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age.localeCompare(b.age),
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t('common.comments'),
      dataIndex: 'address',
      key: 'address',
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value as string),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
    },
  ]

  return (
    <div className="flex flex-col max-h-[635px] h-full overflow-auto">
      {/* <Table columns={columns} dataSource={data} onChange={handleChange} /> */}
      <Result
        status="info"
        subTitle={t('common.no-guest-history')}
        icon={<ExclamationCircleFilled className="text-[50px]" />}
      />
    </div>
  )
}

export default LatestStepModal
