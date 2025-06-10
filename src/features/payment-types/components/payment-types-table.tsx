import { Card, Table, TableProps } from 'antd'


import NotFound from '@/components/not-found'
import { ListResponse } from '@/types'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { IPayment } from '../types'
import TableActionsPaymentTypes from './table-actions'

interface DataType {
  key: string
  id: number
  name: string
  payment_type: {
    created_at: string
    icon: string
    id: number
    key: string
    name: string
    status: boolean
  }
  placement: number
}

interface IProps {
  data?: ListResponse<IPayment[]>
  refetch: () => void
  isLoading: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const PaymentTypesTable: FC<IProps> = ({
  setOpenDrawer,
  data: list,
  refetch,
  isLoading,
}) => {
  const { t } = useTranslation()
  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('payment-types.type'),
      dataIndex: ['payment_type', 'name'], // Accesses nested property correctly
      key: 'payment_type_name', // Use a unique and descriptive key
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.payment_type.name.localeCompare(b.payment_type.name),
      render: (value, record) => {
        return (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6">
              <img
                src={record.payment_type.icon}
                // alt={record.payment_type.name}
              />
            </div>
            <span>{value}</span>
          </div>
        )
      },
    },
    {
      title: t('common.action'),
      width: 110,
      dataIndex: 'action',
      key: 'action',
      className: 'font-medium',
      render: (_, values) => {
        return (
          <TableActionsPaymentTypes
            setOpenDrawer={setOpenDrawer}
            values={values}
            refetch={refetch}
          />
        )
      },
    },
  ]

  return (
    <Card className="flex-1" classNames={{ body: '' }}>
      <Table
        className="custom-table"
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={
          list?.results?.map((item) => ({ ...item, key: item.id })) as any
        }
        locale={{ emptyText: <NotFound /> }}
        pagination={{
          total: list?.count,
          showSizeChanger: false,
          showLessItems: true,
          hideOnSinglePage: true,
          position: ['bottomCenter'],
          nextIcon: (
            <span className="table-pagination-btn">
              {t('common.pagination-next')}
            </span>
          ),
          prevIcon: (
            <span className="table-pagination-btn">
              {t('common.pagination-prev')}
            </span>
          ),
        }}
      />
    </Card>
  )
}

export default PaymentTypesTable
