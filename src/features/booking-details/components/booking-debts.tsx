import { Collapse, CollapseProps, Table, TableProps, Typography } from 'antd'
import { FC } from 'react'
import { IBookingDetails } from '../types'
import { formatAmount } from '@/helpers/format-amount'
import { useTranslation } from 'react-i18next'

interface DataType {
  key: string
  name: string
  count: number
  total: number
}

const BookingDebts: FC<{ data?: IBookingDetails }> = ({ data }) => {
  const { t } = useTranslation()
  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('common.name'),
      dataIndex: 'name',
      key: 'name',
      className: 'whitespace-nowrap font-medium',
    },
    {
      title: t('common.quantity'),
      dataIndex: 'count',
      key: 'count',
      className: 'font-medium',
    },

    {
      title: t('common.total'),
      dataIndex: 'total',
      key: 'total',
      className: 'font-medium',
      render(value) {
        return `${value} UZS`
      },
    },
  ]
  const debt = data
    ? data?.total_paid - (data?.service_total_price + data?.order_total_price)
    : 0

  const dataSource = data?.prices
    ? data.prices.map((val, i) => ({
        key: 'prices' + i,
        name: t('common.accommodation'),
        count: 1,
        total: val.price,
      }))
    : []

  const dataSource2 = data?.services
    ? data.services.map((val, i) => ({
        key: 'services' + i,
        name: val?.service?.name,
        count: val?.quantity,
        total: val?.total_price,
      }))
    : []

  const combinedArray = [...dataSource, ...dataSource2]

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center justify-between">
          <Typography.Text className="text-lg font-medium">
            {t('common.debt')}
          </Typography.Text>
          <span
            className={`font-semibold text-lg ${
              debt > 0
                ? 'text-danger'
                : debt < 0
                ? 'text-danger'
                : 'opacity-0 collapse'
            }`}
          >
            {formatAmount(debt)} UZS
          </span>
        </div>
      ),
      children: (
        <Table
          className="custom-table"
          bordered
          loading={!Boolean(data)}
          columns={columns}
          dataSource={combinedArray}
          pagination={false}
        />
      ),
    },
  ]

  return (
    <Collapse
      className="[&_.ant-collapse-item]:rounded-2xl rounded-2xl [&_.ant-collapse-content]:rounded-b-2xl bg-white dark:bg-primary-dark"
      expandIconPosition="end"
      items={items}
      // defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-secondary duration-200 ${
            isActive ? '' : 'rotate-180'
          }`}
        >
          <path
            d="M5 12.5L10 7.5L15 12.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeMiterlimit="16"
          />
        </svg>
      )}
    />
  )
}

export default BookingDebts
