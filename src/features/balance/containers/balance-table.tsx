import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Card, Table, TableProps, Tabs, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { getActiveTariffPlans, getArchivedTariffPlans } from '../api'
import { formatAmount } from '@/helpers/format-amount'

import TariffPlansNotFound from '../components/tariff-plans-not-found'

import type { Dispatch, FC, SetStateAction } from 'react'
import StatusRoomTag from '../components/status-tag'
import { useBranchIdStore } from '@/store/branch-id-store'

interface DataType {
  id: number
  key: string
  meals: string
  room: string
  fullname: string
  price: number
  min_stay_nights: number
  status: string
  end_date: string
}

interface DataTypeAccrual {
  id: number
  key: string
  meals: string
  room: string
  fullname: string
  price: number
  account: string
  min_stay_nights: number
  status: string
  end_date: string
  bank: string
  inn: number
  mfo: number
}

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const BalanceTable: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const { data: active, isLoading } = useQuery({
    queryKey: ['tariff-plans-r-tariff'],
    cacheTime: 0,
    queryFn: async () => {
      const res = await getActiveTariffPlans({ branch })
      return res
    },
  })

  const { data: archived } = useQuery({
    queryKey: ['tariff-plans-r-tariff-archived'],
    cacheTime: 0,
    queryFn: async () => {
      const res = await getArchivedTariffPlans({ branch })
      return res
    },
  })

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.id - b.id,
      render(value) {
        return <div>{value}</div>
      },
    },
    {
      title: t('balance-page.fullname.label'),
      dataIndex: 'fullname',
      key: 'fullname',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      render(value) {
        return <div>{value}</div>
      },
    },

    {
      title: t('balance-page.method.label'),
      dataIndex: 'payment',
      key: 'payment',
      className: 'font-medium',
      render(value) {
        return <div>{value}</div>
      },
    },
    {
      title: t('balance-page.room.label'),
      dataIndex: 'room',
      key: 'room',
      className: 'font-medium',
      sorter: (a, b) => a.room.localeCompare(b.room),
      render(value) {
        return <p>{value}</p>
      },
    },
    {
      title: t('balance-page.summ.label'),
      dataIndex: 'price',
      key: 'price',
      className: 'font-medium',
      sorter: (a, b) => a.price - b.price,
      render(value) {
        return `${formatAmount(Number(value))} UZS`
      },
    },
    {
      title: t('balance-page.status.label'),
      dataIndex: 'status',
      key: 'status',
      className: 'font-medium',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render(value) {
        return <StatusRoomTag status={value} />
      },
    },

    {
      title: t('balance-page.date-and-time.label'),
      dataIndex: 'end_date',
      key: 'end_date',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.end_date.localeCompare(b.end_date),
      render(value) {
        return value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
      },
    },
  ]

  const columnsAccrual: TableProps<DataTypeAccrual>['columns'] = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.id - b.id,
      render(value) {
        return <div>{value}</div>
      },
    },
    {
      title: t('balance-page.recipient-name'),
      dataIndex: 'fullname',
      key: 'fullname',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      render(value) {
        return <div>{value}</div>
      },
    },
    {
      title: t('balance-page.accrual-amount'),
      dataIndex: 'price',
      key: 'price',
      className: 'font-medium',
      sorter: (a, b) => a.price - b.price,
      render(value) {
        return `${formatAmount(Number(value))} `
      },
    },
    {
      title: t('balance-page.current-account'),
      dataIndex: 'account',
      key: 'account',
      className: 'font-medium',
      sorter: (a, b) => a.account.localeCompare(b.account),
      render(value) {
        return `${value} `
      },
    },
    {
      title: t('balance-page.mfo-bank'),
      dataIndex: 'mfo',
      key: 'mfo',
      className: 'font-medium',
      sorter: (a, b) => a.mfo - b.mfo,
      render(value) {
        return `${value} `
      },
    },
    {
      title: t('balance-page.inn'),
      dataIndex: 'inn',
      key: 'inn',
      className: 'font-medium',
      sorter: (a, b) => a.inn - b.inn,
      render(value) {
        return `${value} `
      },
    },
    {
      title: t('balance-page.bank-name'),
      dataIndex: 'bank',
      key: 'bank',
      className: 'font-medium',
      sorter: (a, b) => a.bank.localeCompare(b.bank),
      render(value) {
        return <p>{value}</p>
      },
    },
    {
      title: t('balance-page.status.label'),
      dataIndex: 'status',
      key: 'status',
      className: 'font-medium',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render(value) {
        return <StatusRoomTag status={value} />
      },
    },

    {
      title: t('balance-page.date-and-time.label'),
      dataIndex: 'end_date',
      key: 'end_date',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.end_date.localeCompare(b.end_date),
      render(value) {
        return value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
      },
    },
  ]
  const dataSource = [
    {
      id: 'TX123',
      fullname: 'Alisher Makhmudov',
      payment: 'Наличные',
      room: 'Двухместный номер с 2 отдельными кроватями',
      price: 10000000,
      status: 'Подтвержден',
      end_date: '2022-12-31 14:45',
      key: 1,
    },
    {
      id: 'TX124',
      fullname: 'Victor Chernov',
      payment: 'Кредитная карта',
      room: 'Двухместный номер с 2 отдельными кроватями',
      price: 10000000,
      status: 'В ожидании',
      end_date: '2022-12-31 14:45',
      key: 2,
    },
  ]

  const dataSourceAccrual = [
    {
      id: 'TX123',
      fullname: 'Alisher Makhmudov',
      payment: 'Наличные',
      bank: 'Национальный банк Узбекистана',
      price: 35345345,
      mfo: 43535,
      inn: 83726487236,
      account: '8600 1234 5678 1234 56',
      status: 'Подтвержден',
      end_date: '2022-12-31 14:45',
    },
    {
      id: 'TX124',
      fullname: 'Victor Chernov',
      payment: 'Кредитная карта',
      bank: 'Национальный банк Узбекистана',
      price: 34656756,
      mfo: 34534,
      inn: 83726487236,
      account: '8600 1234 5678 1234 56',
      status: 'В ожидании',
      end_date: '2022-12-31 14:45',
    },
  ]

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Typography.Text className="text-2xl font-semibold leading-[30.6px]">
          {t('balance-page.last-transaction')}
        </Typography.Text>
      </div>
      <Card
        className="mb-[50px] flex-1 overflow-hidden"
        classNames={{ body: '' }}
      >
        <>
          <Tabs
            items={[
              {
                label: t('balance-page.replenishment'),
                id: 'replenishment',
                key: 'replenishment',
                children:
                  active?.count !== 0 ? (
                    <Table
                      loading={isLoading}
                      bordered
                      columns={columns}
                      locale={{ emptyText: ' ' }}
                      dataSource={dataSource as any}
                      pagination={{
                        total: active?.count,
                        showSizeChanger: false,
                        showLessItems: true,
                        hideOnSinglePage: true,
                        position: ['bottomCenter'],
                        nextIcon: (
                          <span className="pagination-btn">
                            {t('common.next')}
                          </span>
                        ),
                        prevIcon: (
                          <span className="pagination-btn">
                            {t('common.prev')}
                          </span>
                        ),
                      }}
                      className="custom-table"
                    />
                  ) : (
                    <TariffPlansNotFound setOpenDrawer={setOpenDrawer} />
                  ),
              },
              {
                label: t('balance-page.accrual'),
                id: 'accrual',
                key: 'accrual',
                children:
                  archived?.count !== 0 ? (
                    <Table
                      loading={isLoading}
                      bordered
                      columns={columnsAccrual}
                      locale={{ emptyText: t('common.no-data') }}
                      dataSource={dataSourceAccrual as any}
                      pagination={{
                        total: archived?.count || 0,
                        showSizeChanger: false,
                        showLessItems: true,
                        hideOnSinglePage: true,
                        position: ['bottomCenter'],
                        nextIcon: (
                          <span className="pagination-btn">
                            {t('common.next')}
                          </span>
                        ),
                        prevIcon: (
                          <span className="pagination-btn">
                            {t('common.prev')}
                          </span>
                        ),
                      }}
                      className="custom-table"
                    />
                  ) : (
                    <TariffPlansNotFound setOpenDrawer={setOpenDrawer} />
                  ),
              },
            ]}
          />
        </>
      </Card>
    </div>
  )
}

export default BalanceTable
