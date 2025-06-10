import { useBranchIdStore } from '@/store/branch-id-store'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { getUnits } from '../api'
import NotFound from '@/components/not-found'
import { ColumnsType } from 'antd/es/table'
import { IUnit } from '../types'
import TableActions from '../components/table-actions'
import { Dispatch, FC, SetStateAction } from 'react'

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const UnitsList: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const { data: units, isLoading } = useQuery({
    queryKey: ['units', branch],
    queryFn: () => getUnits(branch),
    enabled: Boolean(branch),
  })

  const columns: ColumnsType<IUnit> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'font-medium',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('common.action'),
      dataIndex: 'actions',
      key: 'actions',
      width: 1,
      render: (_, values) => (
        <TableActions setOpenDrawer={setOpenDrawer} values={values} />
      ),
    },
  ]

  return (
    <div className="p-6 rounded-3xl mb-[50px] flex-1 border bg-white dark:border-secondary-dark dark:bg-primary-dark">
      <div className="flex flex-col gap-4">
        <Table
          className={`custom-table ${
            units?.count ? '' : '[&_.ant-table-cell]:border-b-0 mt-[5%]'
          }`}
          bordered={Boolean(units?.count)}
          showHeader={Boolean(units?.count)}
          columns={columns}
          dataSource={units?.results?.map((item) => ({
            ...item,
            key: item.id,
          }))}
          loading={isLoading}
          locale={{ emptyText: <NotFound /> }}
          pagination={{
            total: units?.count,
            showSizeChanger: false,
            showLessItems: true,
            hideOnSinglePage: true,
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
    </div>
  )
}

export default UnitsList
