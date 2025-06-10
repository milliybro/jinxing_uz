import { Card, Table, TableProps } from 'antd'

import TariffPlansNotFound from '../components/features-not-found'

import { ListResponse } from '@/types'
import type { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { IFeatures } from '../types'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'

interface DataType {
  key: string
  feature: string
  icon: ReactNode
}

interface IProps {
  data?: ListResponse<IFeatures[]>
  isLoading?: boolean
}

const FeaturesTable: FC<IProps> = ({ data: list, isLoading }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { search, pathname } = useLocation()

  const queries = queryString.parse(search)

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('common.icon'),
      dataIndex: 'icon',
      width: 1000,
      key: 'icon',
      className: 'whitespace-nowrap font-medium',
      render(value, record) {
        return (
          <img
            src={value}
            alt={record.feature}
            className="size-5 *:!stroke-white"
          />
        )
      },
    },
    {
      title: t('features-page.title'),
      dataIndex: 'feature',
      width: 1000,
      key: 'feature',
      className: 'font-medium',
      sorter: (a, b) => a.feature.localeCompare(b.feature),
    },
    // {
    //   title: t('common.action'),
    //   width: 110,
    //   dataIndex: 'action',
    //   key: 'action',
    //   className: 'font-medium',
    //   render: (_, values) => (
    //     <TableActions setOpenDrawer={setOpenDrawer} values={values} />
    //   ),
    // },
  ]

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
      {list?.count === 0 ? (
        <TariffPlansNotFound />
      ) : (
        <Table
          bordered
          columns={columns}
          loading={isLoading}
          dataSource={list?.results.map((val) => ({
            ...val,
            feature: val.name,
            icon: val.icon,
            key: val.key + val.id,
          }))}
          locale={{ emptyText: ' ' }}
          onChange={handleTableChange}
          pagination={{
            total: list?.count,
            hideOnSinglePage: true,
            showSizeChanger: false,
            current: queries.page ? Number(queries.page) : 1,
            showLessItems: true,
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

export default FeaturesTable
