import { Card, Table, TableProps, Tabs } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { formatAmount } from '@/helpers/format-amount'

import TableActions from '../components/table-action'

import NotFound from '@/components/not-found'
import type { Dispatch, FC, SetStateAction } from 'react'
import TableActionArchive from '../components/table-action-archive'
import { ITariffPlan } from '../types'
import { ListResponse } from '@/types'

interface DataType {
  key: string
  meals: string
  rooms: string
  name: string
  price: number
  min_stay_nights: number
  order_advance_days: number
  end_date: string
}

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  active?: ListResponse<ITariffPlan[]>
  isLoading: boolean
  refetch: () => void
  archived: any
  fetched: () => void
}

const TariffPlansTable: FC<IProps> = ({
  setOpenDrawer,
  active,
  isLoading,
  refetch,
  archived,
  fetched,
}) => {
  const { t } = useTranslation()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('common.tariff-name'),
      width: 50,
      dataIndex: 'name',
      key: 'name',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('common.validity-period'),
      width: 50,
      dataIndex: 'end_date',
      key: 'end_date',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.end_date.localeCompare(b.end_date),
      render(value) {
        return value ? dayjs(value).format('DD.MM.YYYY') : ''
      },
    },
    {
      title: t('common.meal-plan'),
      dataIndex: 'meals',
      key: 'meals',
      width: 120,
      className: 'font-medium',
      render(value) {
        return (
          <ul>
            {value?.map((val: any, i: number) => (
              <li
                key={val?.name + i}
                className="text-xs text-secondary list-disc list-inside leading-[16px]"
              >
                {val?.name}
              </li>
            ))}
          </ul>
        )
      },
    },
    {
      title: t('common.min-stay-nights'),
      dataIndex: 'min_stay_nights',
      width: 40,
      key: 'min_stay_nights',
      className: 'font-medium',
      sorter: (a, b) => a.min_stay_nights - b.min_stay_nights,
      render(value) {
        return (
          <p>
            {value}{' '}
            {value > 1 && value < 5
              ? t('common.days2').toLowerCase()
              : value > 4
              ? t('common.days').toLowerCase()
              : t('common.day').toLowerCase()}
          </p>
        )
      },
    },
    {
      title: t('common.order-advance-days'),
      dataIndex: 'order_advance_days',
      key: 'order_advance_days',
      width: 100,
      className: 'font-medium',
      sorter: (a, b) => a.order_advance_days - b.order_advance_days,
      render: (value) => (value ? value : 0),
    },
    {
      title: t('common.services'),
      dataIndex: 'services',
      key: 'services',
      className: 'font-medium',
      render(value) {
        return (
          <ul>
            {value?.map((val: any, i: number) => (
              <li
                key={val?.name + i}
                className="text-xs text-secondary list-disc list-inside leading-[16px]"
              >
                {val?.name}
              </li>
            ))}
          </ul>
        )
      },
    },
    {
      title: t('common.price'),
      dataIndex: 'price',
      key: 'price',
      className: 'font-medium',
      sorter: (a, b) => a.price - b.price,
      render(value) {
        return `${formatAmount(Number(value))} ${t('common.sum')}`
      },
    },
    {
      title: t('common.room-types'),
      key: 'rooms',
      dataIndex: 'rooms',
      className: 'font-medium',
      sorter: (a, b) => a.price - b.price,
      render(value) {
        return (
          <div key={value} className="flex flex-col gap-2">
            {value?.map((val: any, i: number) => (
              <div className="flex items-center gap-4" key={i}>
                <span className="whitespace-nowrap">{val.name}</span>
                <span className="text-xs text-secondary whitespace-nowrap">
                  {val.description}
                </span>
              </div>
            ))}
          </div>
        )
      },
    },
    // {
    //   title: 'Контрагенты',
    //   dataIndex: 'price',
    //   key: 'price',
    //   className: 'font-medium',
    //   sorter: (a, b) => a.price - b.price,
    //   render() {
    //     return (
    //       <ul>
    //         {[...Array(1)].map((val: any, i: number) => (
    //           <li
    //             key={val?.name + i}
    //             className="text-xs text-secondary list-disc list-inside leading-[16px]"
    //           >
    //             Все
    //           </li>
    //         ))}
    //       </ul>
    //     )
    //   },
    // },
    {
      title: t('common.action'),
      width: 110,
      dataIndex: 'action',
      key: 'action',
      className: 'font-medium',
      render: (_, values: any) => {
        return (
          <TableActions
            fetched={fetched}
            refetch={refetch}
            setOpenDrawer={setOpenDrawer}
            values={values}
          />
        )
      },
    },
  ]

  const columnsArchive: TableProps<DataType>['columns'] = [
    {
      title: t('common.tariff-name'),
      width: 50,
      dataIndex: 'name',
      key: 'name',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('common.validity-period'),
      width: 50,
      dataIndex: 'end_date',
      key: 'end_date',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.end_date.localeCompare(b.end_date),
      render(value) {
        return value ? dayjs(value).format('DD.MM.YYYY') : ''
      },
    },
    {
      title: t('common.meal-plan'),
      dataIndex: 'meals',
      key: 'meals',
      width: 120,
      className: 'font-medium',
      render(value) {
        return (
          <ul>
            {value?.map((val: any, i: number) => (
              <li
                key={val?.name + i}
                className="text-xs text-secondary list-disc list-inside leading-[16px]"
              >
                {val?.name}
              </li>
            ))}
          </ul>
        )
      },
    },
    {
      title: t('common.min-stay-nights'),
      dataIndex: 'min_stay_nights',
      width: 40,
      key: 'min_stay_nights',
      className: 'font-medium',
      sorter: (a, b) => a.min_stay_nights - b.min_stay_nights,
      render(value) {
        return (
          <p>
            {value}{' '}
            {value > 1 && value < 5
              ? t('common.days2').toLowerCase()
              : value > 4
              ? t('common.days').toLowerCase()
              : t('common.day').toLowerCase()}
          </p>
        )
      },
    },
    {
      title: t('common.order-advance-days'),
      dataIndex: 'order_advance_days',
      key: 'order_advance_days',
      width: 100,
      className: 'font-medium',
      sorter: (a, b) => a.order_advance_days - b.order_advance_days,
      render: (value) => value || 0,
    },
    {
      title: t('common.services'),
      dataIndex: 'services',
      key: 'services',
      className: 'font-medium',
      render(value) {
        return (
          <ul>
            {value?.map((val: any, i: number) => (
              <li
                key={val?.name + i}
                className="text-xs text-secondary list-disc list-inside leading-[16px]"
              >
                {val?.name}
              </li>
            ))}
          </ul>
        )
      },
    },
    {
      title: t('common.price'),
      dataIndex: 'price',
      key: 'price',
      className: 'font-medium',
      sorter: (a, b) => a.price - b.price,
      render(value) {
        return `${formatAmount(Number(value))} ${t('common.sum')}`
      },
    },
    {
      title: t('common.room-types'),
      key: 'rooms',
      dataIndex: 'rooms',
      className: 'font-medium',
      sorter: (a, b) => a.price - b.price,
      render(value) {
        return (
          <div key={value} className="flex flex-col gap-2">
            {value?.map((val: any) => (
              <div className="flex items-center gap-4">
                <span className="whitespace-nowrap">{val.name}</span>
                <span className="text-xs text-secondary whitespace-nowrap">
                  {val.description}
                </span>
              </div>
            ))}
          </div>
        )
      },
    },
    // {
    //   title: 'Контрагенты',
    //   dataIndex: 'price',
    //   key: 'price',
    //   className: 'font-medium',
    //   sorter: (a, b) => a.price - b.price,
    //   render() {
    //     return (
    //       <ul>
    //         {[...Array(1)].map((val: any, i: number) => (
    //           <li
    //             key={val?.name + i}
    //             className="text-xs text-secondary list-disc list-inside leading-[16px]"
    //           >
    //             Все
    //           </li>
    //         ))}
    //       </ul>
    //     )
    //   },
    // },
    {
      title: t('common.action'),
      width: 200,
      dataIndex: 'action',
      key: 'action',
      className: 'font-medium',
      render: (_, values: any) => {
        return (
          <TableActionArchive
            refetch={refetch}
            fetched={fetched}
            setOpenDrawer={setOpenDrawer}
            values={values}
          />
        )
      },
    },
  ]
  const dataSource = active?.results.map((val: any, i: number) => ({
    ...val,
    key: val.name + i,
  }))

  const dataSourceArchived = archived?.results.map((val: any, i: number) => ({
    ...val,
    key: val.name + i,
  }))

  return (
    <Card
      className="mb-[50px] flex-1 overflow-hidden"
      classNames={{ body: '' }}
    >
      {/* {active?.count === 0 ? (
        <TariffPlansNotFound setOpenDrawer={setOpenDrawer} />
      ) : ( */}
      <>
        <Tabs
          items={[
            {
              label: t('common.actives'),
              id: 'active',
              key: 'active',
              children:
                active?.count !== 0 ? (
                  <Table
                    loading={isLoading}
                    bordered
                    columns={columns}
                    locale={{ emptyText: ' ' }}
                    dataSource={dataSource?.map((val: any, i: number) => ({
                      ...val,
                      key: i,
                    }))}
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
                  <NotFound />
                ),
            },
            {
              label: t('common.archives'),
              id: 'archived',
              key: 'archived',
              children:
                archived?.count !== 0 ? (
                  <Table
                    loading={isLoading}
                    bordered
                    columns={columnsArchive}
                    locale={{ emptyText: t('common.no-data') }}
                    dataSource={dataSourceArchived as any}
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
                  <NotFound />
                ),
            },
          ]}
        />
      </>
      {/* )} */}
    </Card>
  )
}

export default TariffPlansTable
