import { useQuery } from '@tanstack/react-query'
import { Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { getGuestHistory } from '../api'

import CSelect from '@/components/cselect'
import CTag from '@/components/ctag'

import NotFound from '@/components/not-found'
import type { IGuestHistory } from '@/features/booking-details/types'
import { useBranchIdStore } from '@/store/branch-id-store'
import type { TablePaginationConfig, TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import queryString from 'query-string'
import { SorterResult } from 'antd/es/table/interface'
import { truthyObject } from '@/helpers/truthy-object'
import { useMemo } from 'react'

interface DataType extends IGuestHistory {
  key: string
  booking_number: string
  check_in: string
  check_out: string
  email: string
  status: string
}

const GuestsItemTable = () => {
  const params = useParams()
  const { branch } = useBranchIdStore()
  const { t } = useTranslation()

  const { search, pathname } = useLocation()
  const navigate = useNavigate()

  const query = useMemo(() => queryString.parse(search), [search])

  const columns: TableProps<DataType>['columns'] = [
    {
      width: 348,
      title: t('common.number'),
      dataIndex: 'booking_number',
      key: 'booking_number',
      className: 'whitespace-nowrap font-medium',
      sorter: false,
      render: (value) => <Typography.Link>{value}</Typography.Link>,
    },
    {
      width: 348,
      title: t('common.birthday'),
      dataIndex: 'birthday',
      key: 'birthday',
      className: 'font-medium',
      sorter: false,
      render(value) {
        return value === null ? '' : dayjs(value).format('DD MMM, YYYY')
      },
    },
    {
      width: 348,
      title: t('common.check-in-date'),
      dataIndex: 'check_in',
      key: 'check_in',
      className: 'font-medium',
      sorter: false,
      render(value) {
        return dayjs(value).format('DD MMM, YYYY').replace(/\./g, '')
      },
    },
    {
      width: 348,
      title: t('common.check-out-date'),
      dataIndex: 'check_out',
      key: 'check_out',
      className: 'font-medium',
      sorter: false,
      render(value) {
        return dayjs(value).format('DD MMM, YYYY').replace(/\./g, '')
      },
    },
    {
      width: 348,
      title: t('common.room'),
      dataIndex: 'email',
      key: 'email',
      className: 'font-medium',
      sorter: false,
      render: (_, values) => {
        const room =
          values?.order_item.room.name + ' ' + values?.order_item.room_item.name
        return (
          <CSelect
            className="w-full"
            size="large"
            defaultValue={room}
            options={[
              {
                label: room,
                value: room,
              },
            ]}
          />
        )
      },
    },
    {
      width: 348,
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      className: 'font-medium',
      sorter: false,
      render: (value) => <CTag type={value}>{value}</CTag>,
    },
  ]

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort.field
      : null
    const updatedQuery = queryString.stringify(
      truthyObject({
        ...query,
        page: pagination.current,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  const { data: mainData, isFetching } = useQuery({
    queryKey: ['order-guest-history', params.id, query],
    queryFn: async () => {
      const res = await getGuestHistory({ guest: params.id, branch, ...query })
      return res
    },
    enabled: Boolean(params.id),
    keepPreviousData: true,
  })

  const dataSource = mainData?.results.map((val, i) => ({
    ...val,
    key: val?.first_name + i,
    booking_number: val?.order_item.id,
    check_in: val?.order_item?.start_date,
    check_out: val?.order_item?.end_date,
    email: val?.email,
    status: val?.order_item?.status,
  }))

  return (
    <div>
      <Table
        className="custom-table"
        bordered
        rowClassName="text-start"
        loading={isFetching}
        columns={columns}
        dataSource={dataSource as any}
        locale={{ emptyText: <NotFound /> }}
        onChange={handleTableChange}
        pagination={{
          total: mainData?.count,
          showSizeChanger: false,
          hideOnSinglePage: true,
          showLessItems: true,
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
    </div>
  )
}

export default GuestsItemTable
