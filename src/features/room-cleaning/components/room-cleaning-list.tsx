import { Table, TablePaginationConfig } from 'antd'
import AddNoteModal from './add-note-modal'
import { useTranslation } from 'react-i18next'
import NotFound from '@/components/not-found'
import { useMemo } from 'react'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import { SorterResult } from 'antd/es/table/interface'
import { truthyObject } from '@/helpers/truthy-object'

const RoomCleaningList = ({
  columns,
  dataSource,
  refetch,
  isLoading,
  list,
  addNoteOpen,
  setAddNoteOpen,
  currentRecordId,
}: any) => {
  const { t } = useTranslation()
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const queries = useMemo(() => queryString.parse(search), [search])

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
        ...queries,
        page: pagination.current,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <>
      <Table
        bordered
        locale={{ emptyText: <NotFound /> }}
        loading={isLoading}
        columns={columns as any}
        dataSource={dataSource}
        onChange={handleTableChange}
        pagination={{
          total: list?.count,
          showSizeChanger: false,
          showLessItems: true,
          hideOnSinglePage: true,
          position: ['bottomCenter'],
          current: queries.page ? Number(queries.page) : 1,
          nextIcon: (
            <span className="table-pagination-btn">{t('common.next')}</span>
          ),
          prevIcon: (
            <span className="table-pagination-btn">{t('common.prev')}</span>
          ),
        }}
        className="custom-table"
      />
      <AddNoteModal
        open={addNoteOpen}
        setOpen={setAddNoteOpen}
        data={list?.results}
        recordId={currentRecordId}
        refetch={refetch}
      />
    </>
  )
}

export default RoomCleaningList
