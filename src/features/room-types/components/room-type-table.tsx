import { useQuery } from '@tanstack/react-query'
import { Card, Table, TablePaginationConfig, TableProps } from 'antd'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'

// import { getAllRooms } from '../api'

import TableActions from './table-actions'
// import StatusTag from '@/components/status-tag'

import { getRoomsList } from '@/api'
import NotFound from '@/components/not-found'
import { useBranchIdStore } from '@/store/branch-id-store'
import { useMemo, type Dispatch, type FC, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { SorterResult } from 'antd/es/table/interface'
import { truthyObject } from '@/helpers/truthy-object'

interface DataType {
  key: string
  person_count: number
  room_number: number
  status: boolean
  room: string
  children_count: number
  description: string
  name: string
}

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const RoomTypesTable: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  const { search, pathname } = useLocation()
  const queries = useMemo(() => queryString.parse(search), [search])
  const { branch } = useBranchIdStore()
  const navigate = useNavigate()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('fields.room.label'),
      dataIndex: 'name',
      key: 'name',
      className: 'font-medium',
      width: 300,
      sorter: true,
    },
    {
      title: t('room-types.form.description.label'),
      dataIndex: 'description',
      key: 'description',
      className: 'font-medium',
      width: 300,
      sorter: true,
      render: (val) => (
        <div className="line-clamp-1" title={val}>
          {val}
        </div>
      ),
    },
    {
      title: t('room-types.max-adults'),
      dataIndex: 'person_count',
      key: 'person_count',
      className: 'font-medium',
      sorter: true,
    },
    {
      title: t('room-types.max-child'),
      dataIndex: 'children_count',
      key: 'children_count',
      className: 'font-medium',
      sorter: true,
    },
    {
      title: t('common.action'),
      width: 110,
      dataIndex: 'action',
      key: 'action',
      className: 'font-medium',
      render: (_, values) => {
        return <TableActions setOpenDrawer={setOpenDrawer} values={values} />
      },
    },
  ]
  const { data: list, isFetching } = useQuery(
    [
      'all-room-type',
      queries?.person_count,
      queries?.status,
      queries?.room,
      queries?.ordering,
      localStorage.getItem('i18nextLng'),
    ],
    async () => {
      // const lang =
      //   localStorage.getItem('i18nextLng') === 'oz'
      //     ? 'uz-latin'
      //     : localStorage.getItem('i18nextLng') === 'uz'
      //     ? 'uz-cyrillic'
      //     : localStorage.getItem('i18nextLng') || 'oz'

      const res = await getRoomsList({
        ...queries,
        status: queries.status?.toString(),
        branch,
      })

      return res
    },
    {
      enabled: Boolean(localStorage.getItem('i18nextLng')),
      keepPreviousData: true,
    },
  )

  const dataSource = list?.results.map((val, i) => ({
    ...val,
    key: val?.name + i,
    name: `${val?.name}`,
    description: val?.description,
    person_count: val?.person_count,
    children_count: val?.children_count,
    room_number: val?.name,
  }))

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
    <Card className="flex-1">
      <Table
        className="custom-table"
        bordered
        loading={isFetching}
        columns={columns as any}
        dataSource={dataSource}
        locale={{ emptyText: <NotFound /> }}
        onChange={handleTableChange}
        pagination={{
          total: list?.count,
          showLessItems: true,
          hideOnSinglePage: true,
          showSizeChanger: false,
          current: queries?.page ? Number(queries?.page) : 1,
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

export default RoomTypesTable
