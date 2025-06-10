import { useQuery } from '@tanstack/react-query'
import { Card, Table, TablePaginationConfig, TableProps } from 'antd'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { formatAmount } from '@/helpers/format-amount'
import { useBranchIdStore } from '@/store/branch-id-store'
import { getGoodsAndServices } from '../api'

import NotFound from '@/components/not-found'
import StatusTag from '@/components/status-tag'
import TableActions from '../components/table-actions'

import { useMemo, type Dispatch, type FC, type SetStateAction } from 'react'
import { SorterResult } from 'antd/es/table/interface'
import { truthyObject } from '@/helpers/truthy-object'

interface DataType {
  key: string
  category_name: string
  service_name: string
  price: number
  status: string
}

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const GoodsAndServicesTable: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { branch } = useBranchIdStore()
  const { search, pathname } = useLocation()

  const queries = useMemo(() => queryString.parse(search), [search])

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('common.service-name'),
      dataIndex: 'translations__name',
      width: 500,
      key: 'translations__name',
      className: 'whitespace-nowrap font-medium',
      sorter: true,
    },
    {
      title: t('category-of-goods.name-category'),
      dataIndex: 'category',
      width: 500,
      key: 'category',
      className: 'font-medium',
      sorter: true,
      render: (_, values) => values.category_name,
    },
    {
      title: t('common.price'),
      dataIndex: 'price',
      width: 500,
      key: 'price',
      className: 'font-medium',
      sorter: true,
      render(value) {
        return `${formatAmount(value) || 0} UZS`
      },
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      width: 500,
      key: 'status',
      className: 'font-medium',
      sorter: true,
      render: (value) => <StatusTag value={value} />,
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

  const { data: list, isFetching: isListLoading } = useQuery({
    queryKey: ['goods-and-services-table', queries],
    queryFn: async () => {
      const res = await getGoodsAndServices({ branch, ...queries })
      return res
    },
    keepPreviousData: true,
  })

  const dataSource = list?.results.map((val) => ({
    ...val,
    key: val?.name + val?.id,
    category_name: val?.category.name,
    translations__name: val?.name,
    price: val?.price,
    status: val?.status,
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
    <Card
      className="mb-[25px] overflow-hidden flex-1"
      classNames={{ body: '' }}
    >
      <Table
        bordered
        loading={isListLoading}
        columns={columns as DataType[]}
        dataSource={dataSource}
        locale={{ emptyText: <NotFound /> }}
        onChange={handleTableChange}
        pagination={{
          hideOnSinglePage: true,
          total: list?.count,
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
    </Card>
  )
}

export default GoodsAndServicesTable
