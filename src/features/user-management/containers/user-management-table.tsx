import { useQuery } from '@tanstack/react-query'
import { Card, Table, TablePaginationConfig, TableProps } from 'antd'

import { getUsers } from '../api'

import TableActions from '../components/table-actions'
import ResetPassword from '../components/reset-password'
import TableNotFound from '@/components/table-not-found.tsx'

import { useMemo, type Dispatch, type FC, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { IUser } from '@/types'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { SorterResult } from 'antd/es/table/interface'
import { truthyObject } from '@/helpers/truthy-object'

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const UserManagementTable: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { search, pathname } = useLocation()

  const queries = useMemo(() => queryString.parse(search), [search])

  const columns: TableProps<IUser>['columns'] = [
    {
      title: t('common.name-user'),
      width: 0,
      dataIndex: 'first_name',
      key: 'first_name',
      className: 'whitespace-nowrap font-medium',
      sorter: true,
    },
    {
      title: t('common.surname-user'),
      width: 0,
      dataIndex: 'last_name',
      key: 'last_name',
      className: 'whitespace-nowrap font-medium',
      sorter: true,
    },
    {
      title: t('common.role'),
      dataIndex: 'type',
      key: 'type',
      className: 'font-medium',
      width: 0,
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: t('common.login'),
      dataIndex: 'email',
      key: 'email',
      className: 'font-medium',
      width: 0,
      sorter: true,
    },
    {
      title: t('common.phone-number'),
      dataIndex: 'phone',
      key: 'phone',
      className: 'font-medium',
      width: 0,
      sorter: false,
      render: (_, values) => (
        <div className="flex w-max">
          {values?.phone?.[0] !== '+' && '+'} {values.phone}
        </div>
      ),
    },
    {
      title: t('common.birthdays'),
      dataIndex: 'birth_date',
      key: 'birth_date',
      className: 'font-medium',
      width: 0,
      sorter: true,
    },
    {
      title: t('common.password'),
      dataIndex: 'user_password',
      key: 'user_password',
      width: 10,
      className: 'font-medium',
      render: (_, values) => <ResetPassword id={values.id} />,
    },
    {
      title: t('common.action'),
      width: 110,
      dataIndex: 'action',
      key: 'action',
      className: 'font-medium',
      render: (_, values) => (
        <TableActions setOpenDrawer={setOpenDrawer} values={values} />
      ),
    },
  ]

  const { data: list, isFetching } = useQuery({
    queryKey: ['user-management-list', queries?.ordering, queries?.page],
    queryFn: async () => {
      const res = await getUsers({ ...queries })
      return res
    },
    cacheTime: 0,
    keepPreviousData: true,
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort.field
      : null

    const newPage = pagination.current

    const updatedQuery = queryString.stringify(
      truthyObject({
        ...queries,
        page: newPage,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <Card
      className="mb-[50px] flex-1 overflow-hidden "
      classNames={{ body: '' }}
    >
      {list?.count === 0 ? (
        <TableNotFound
          title={t('user-management.not-found.title')}
          subtitle={t('user-management.not-found.subtitle')}
          actionText={t('user-management.not-found.action-text')}
          action={setOpenDrawer}
        />
      ) : (
        <Table
          bordered
          columns={columns}
          dataSource={list?.results.map((user) => ({ ...user, key: user.id }))}
          loading={isFetching}
          onChange={handleTableChange}
          pagination={{
            total: list?.count,
            hideOnSinglePage: true,
            showSizeChanger: false,
            showLessItems: true,
            current: queries.page ? Number(queries.page) : 1,
            position: ['bottomCenter'],
            nextIcon: (
              <span className="table-pagination-btn">{t('common.next')}</span>
            ),
            prevIcon: (
              <span className="table-pagination-btn">{t('common.prev')}</span>
            ),
          }}
          className="custom-table"
        />
      )}
    </Card>
  )
}

export default UserManagementTable
