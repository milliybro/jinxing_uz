import { Button, Table } from 'antd'
import queryString from 'query-string'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

import { getOrderGuests } from '../api'

import type { TableProps } from 'antd'
import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'
import SettingsIcon from '@/components/icons/settings'
import { useBranchIdStore } from '@/store/branch-id-store'
import { useTranslation } from 'react-i18next'

interface DataType {
  key: string
  id?: number
  first_name: string
  passport: string
  email: string
  country: string
  birthday: string
  last_name: string
  check_in: string
  check_out: string
  phone: string
  order: {
    source: {
      name: string
    }
  }
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Название',
    dataIndex: ['order', 'source', 'name'],
    key: 'order_source_name',
    className: 'font-medium',
    sorter: (a, b) => a.order.source.name.localeCompare(b.order.source.name),
  },
  {
    title: 'Тип контрагента',
    dataIndex: 'email',
    key: 'birthday',
    className: 'font-medium',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: 'Налоги / сборы',
    dataIndex: 'email',
    key: 'email',
    className: 'font-medium',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    width: 205,
    title: 'Действие',
    key: 'action',
    dataIndex: 'action',
    className: 'font-medium',
    render: (_, values) => (
      <div className="flex items-center gap-6">
        <Button
          size="small"
          type="link"
          className="flex font-medium items-center"
          // onClick={editHandler}
        >
          <SettingsIcon className="text-[20px]" /> Настройка цен
        </Button>
        <Button
          size="small"
          type="link"
          className="flex font-medium items-center"
          // onClick={editHandler}
        >
          <EditIcon className="text-[20px]" /> Редактировать
        </Button>
        <Button
          className="flex items-center font-medium"
          size="small"
          danger
          type="text"
          // onClick={() => setDeleteModal(true)}
        >
          <DeleteIcon className="text-[20px]" />
          Удалить
        </Button>
      </div>
    ),
  },
]

const ContrTable = () => {
  const { t } = useTranslation()
  const { search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const { branch } = useBranchIdStore()

  const { data: mainData, isLoading } = useQuery({
    queryKey: ['order-guests', queries],
    queryFn: async () => {
      const res = await getOrderGuests({ ...queries, branch })
      return res
    },
  })

  const dataSource = mainData?.results.map((val, i) => ({
    ...val,
    key: val?.id + val?.first_name + i,
    check_in: val?.order_item?.start_date,
    check_out: val?.order_item?.end_date,
    country: val?.country.name,
  }))

  return (
    <Table
      className="custom-table"
      bordered
      loading={isLoading}
      rowClassName="text-start"
      columns={columns}
      dataSource={dataSource as any}
      locale={{ emptyText: ' ' }}
      pagination={{
        total: mainData?.count,
        showSizeChanger: false,
        showLessItems: true,
        hideOnSinglePage: true,
        position: ['bottomCenter'],
        nextIcon: (
          <span className="table-pagination-btn">{t('common.next')}</span>
        ),
        prevIcon: (
          <span className="table-pagination-btn">{t('common.prev')}</span>
        ),
      }}
      // pagination={false}
    />
  )
}

export default ContrTable
