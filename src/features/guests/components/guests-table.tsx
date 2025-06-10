import { Table } from 'antd'
import dayjs from 'dayjs'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { useGuestsContext } from '../context'

import GuestsNotFound from './guests-not-found'
import CalendarIcon from '@/components/icons/calendar'

import type { TableProps } from 'antd'

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
}

const GuestsTable = () => {
  const { t } = useTranslation()
  const { search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const { orderGuests, handleTableChange } = useGuestsContext()

  const dataSource = orderGuests?.data?.results.map((val, i) => ({
    ...val,
    key: `${val.id}_${val.first_name}_${i}`,
    check_in: val?.start_date,
    check_out: val?.end_date,
    country: val?.country,
  }))

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('common.first-name'),
      dataIndex: 'first_name',
      key: 'first_name',
      className: 'whitespace-nowrap font-medium',
      sorter: true,
    },
    {
      title: t('common.last-name'),
      dataIndex: 'last_name',
      key: 'last_name',
      className: 'font-medium',
      sorter: true,
    },
    {
      title: t('common.passport-details'),
      dataIndex: 'passport',
      key: 'passport',
      className: 'font-medium',
      sorter: true,
    },
    {
      title: t('common.birthday'),
      dataIndex: 'birth_date',
      key: 'birth_date',
      className: 'font-medium',
      sorter: true,
      render(value) {
        return value ? dayjs(value).format('DD MMM, YYYY') : null
      },
    },
    {
      title: t('common.check-in-date'),
      dataIndex: 'check_in',
      key: 'check_in',
      className: 'font-medium',
      sorter: false,
      render(value) {
        return value
          ? dayjs(value).format('DD MMM, YYYY').replace(/\./g, '')
          : ''
      },
    },
    {
      title: t('common.check-out-date'),
      dataIndex: 'check_out',
      key: 'check_out',
      className: 'font-medium',
      sorter: false,
      render(value) {
        return value
          ? dayjs(value).format('DD MMM, YYYY').replace(/\./g, '')
          : ''
      },
    },
    {
      title: t('common.email'),
      dataIndex: 'email',
      key: 'email',
      className: 'font-medium',
      sorter: false,
    },
    {
      title: t('common.phone-number'),
      dataIndex: 'phone',
      key: 'phone',
      className: 'font-medium',
      sorter: false,
      render(value) {
        return value?.replace(
          /(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/,
          '$1 $2 $3 $4 $5',
        )
      },
    },
    {
      title: t('common.country'),
      key: 'country',
      dataIndex: 'country',
      className: 'font-medium',
      sorter: false,
      render: (value) => value?.name,
    },
    {
      title: t('common.action'),
      key: 'action',
      dataIndex: 'action',
      className: 'font-medium',
      render: (_, values: any) => (
        <Link
          to={`/guests/${values?.guest}`}
          className="flex font-medium text-primary gap-1 items-center"
        >
          <CalendarIcon className="text-[20px]" /> {t('common.history')}
        </Link>
      ),
    },
  ]

  return (
    <div className="mb-[50px] flex-1">
      <Table
        className="custom-table"
        bordered
        loading={orderGuests?.isFetching}
        rowClassName="text-start"
        columns={columns}
        dataSource={dataSource}
        locale={{ emptyText: <GuestsNotFound /> }}
        onChange={handleTableChange}
        pagination={{
          total: orderGuests?.data?.count,
          showSizeChanger: false,
          showLessItems: true,
          hideOnSinglePage: true,
          current: queries.page ? Number(queries.page) : 1,
          position: ['bottomCenter'],
          nextIcon: (
            <span className="table-pagination-btn">{t('common.next')}</span>
          ),
          prevIcon: (
            <span className="table-pagination-btn">{t('common.prev')}</span>
          ),
        }}
      />
    </div>
  )
}

export default GuestsTable
