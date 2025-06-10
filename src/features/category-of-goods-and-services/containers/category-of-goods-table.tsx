import { useQuery } from '@tanstack/react-query'
import { Card, Table, TableProps } from 'antd'

import { getGoodsAndServices } from '../api'
import TableActions from '../components/table-action'

import NotFound from '@/components/not-found'
import { useBranchIdStore } from '@/store/branch-id-store'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'

interface DataType {
  key: string
  id: number
  name: string
}

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const CategoryOfGoodsTable: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { branch } = useBranchIdStore()
  const { search, pathname } = useLocation()
  const queries = queryString.parse(search)

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('category-of-goods.name-category'),
      dataIndex: 'name',
      width: 1000,
      key: 'name',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('category-of-goods.code-category'),
      dataIndex: 'id',
      width: 1000,
      key: 'id',
      className: 'font-medium',
      sorter: (a, b) => a.id - b.id,
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

  const { data: list, isLoading: isListLoading } = useQuery({
    queryKey: ['category-of-goods-and-services', queries?.page],
    queryFn: async () => {
      const res = await getGoodsAndServices({
        branch,
        page: queries?.page || 1,
      })
      return res
    },
  })

  const handleTableChange = (pagination: any) => {
    const newPage = pagination.current

    const updatedQuery = queryString.stringify({
      ...queries,
      page: newPage,
    })

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <Card
      className="mb-[50px] flex-1 overflow-hidden"
      classNames={{ body: '' }}
    >
      <Table
        bordered
        locale={{ emptyText: <NotFound /> }}
        loading={isListLoading}
        columns={columns}
        dataSource={(list?.results as any)?.map((item: any, i: number) => ({
          ...item,
          key: i,
        }))}
        onChange={handleTableChange}
        pagination={{
          total: list?.count,
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
        className="custom-table"
      />
    </Card>
  )
}

export default CategoryOfGoodsTable
