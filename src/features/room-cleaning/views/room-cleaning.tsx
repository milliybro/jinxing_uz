import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as XLSX from 'xlsx'
// import { saveAs } from 'file-saver';
import dayjs from 'dayjs'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import {
  Button,
  Checkbox,
  message,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from 'antd'

import { useBranchIdStore } from '@/store/branch-id-store'
import CTag from '@/components/ctag'
import CSelect from '@/components/cselect'
import EditIcon from '@/components/icons/edit'
import { useMutation, useQuery } from '@tanstack/react-query'

import RoomCleaningList from '../components/room-cleaning-list'
import RoomCleaningHeader from '../components/room-cleaning-header'
import RoomCleaningFilters from '../components/room-cleaning-filters'
import { IOrdersItem } from '../types'
import Switch from '../components/switch'
import { getcleaners, getCleaningList, updateCleaningRoom } from '../api'

export default function RoomCleaning(): React.ReactElement {
  const { t } = useTranslation()
  const { search } = useLocation()
  const queries = useMemo(() => queryString.parse(search), [search])
  const { branch } = useBranchIdStore()
  const [addNoteOpen, setAddNoteOpen] = useState(false)
  const [currentRecordId, setCurrentRecordId] = useState<
    number | string | null
  >(null)

  const {
    data: list,
    isFetching,
    refetch,
  } = useQuery(
    ['cleaning-items', queries, branch],
    () =>
      getCleaningList({
        ...queries,
        statuses: queries.statuses?.toString(),
        sources: queries.sources?.toString(),
        branch,
      }),
    {
      keepPreviousData: true,
    },
  )

  const { data: cleaners } = useQuery(
    ['cleaner-items', queries.statuses, queries.sources],
    () =>
      getcleaners({
        ...queries,
        page: undefined,
        statuses: queries.statuses?.toString(),
        sources: queries.sources?.toString(),
      }),
  )

  const columns: TableProps<IOrdersItem>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'font-medium',
    },
    {
      title: t('common.room'),
      dataIndex: 'room_item__translation__name',
      key: 'room_item__translation__name',
      width: 300,
      className: 'whitespace-nowrap font-medium',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Typography.Text className="text-sm font-medium">
            {record.name}
          </Typography.Text>
          <Typography.Text className="text-xs bg-secondary-light dark:bg-dark-bg font-medium px-2 rounded py-1">
            {record.room.name}
          </Typography.Text>
        </div>
      ),
      sorter: true,
    },
    {
      title: t('common.state'),
      dataIndex: 'room_clean',
      key: 'room_clean',
      width: 205,
      className: 'font-medium',
      render: (state, record) => (
        <Switch
          value={state}
          onToggle={(checked) => handleStateChange(checked, record)}
        />
      ),
      sorter: true,
    },
    {
      title: t('common.number-status'),
      key: 'room_free',
      width: 150,
      dataIndex: 'room_free',
      className: 'font-medium',
      render: (value) => (
        <div
        // onClick={() => handleRoomFreeChange(record)} // Call the toggle function on click
        // style={{ cursor: 'pointer' }} // Optional: Change the cursor to indicate clickability
        >
          {/* <StatusTag value={value} /> */}
          <Tag
            className={`h-[27px] leading-[26px] rounded-md ${
              value === false ||
              value === 'Неактивный' ||
              value === 'Занято' ||
              value === 'Отдыхает' ||
              value === t('common.unworking')
                ? 'bg-primary-dark text-white border-primary-dark'
                : 'bg-white dark:bg-white/5'
            }`}
            style={{ boxShadow: '0px 1px 2px 0px #0000000D' }}
          >
            {value === 'Неактивный' ||
            value === 'Занято' ||
            value === 'Отдыхает' ||
            value === t('common.unworking') ||
            value === t('common.working')
              ? value
              : ''}
            {value === false ? t('common.inactive') : ''}
            {value === true ? t('common.active') : ''}
          </Tag>
        </div>
      ),
      sorter: true,
    },
    {
      title: t('common.check-in-date'),
      width: 120,
      dataIndex: 'order_start_date',
      key: 'order_start_date',
      className: 'font-medium',
      render: (value) => (value ? dayjs(value).format('DD MMMM, YYYY') : ''),
      sorter: true,
    },
    {
      title: t('common.check-out-date'),
      width: 120,
      dataIndex: 'order_end_date',
      key: 'order_end_date',
      className: 'font-medium',
      render: (value) => (value ? dayjs(value).format('DD MMMM, YYYY') : ''),
      sorter: true,
    },
    {
      title: t('common.registration-status'),
      width: 150,
      dataIndex: 'order_status',
      key: 'order_status',
      className: 'font-medium',
      render: (value) => {
        return <CTag type={value}>{value}</CTag>
      },
      sorter: true,
    },
    {
      title: t('common.housemaid'),
      dataIndex: 'cleaner__first_name',
      key: 'cleaner__first_name',
      className: 'font-medium',
      render: (_, record) => {
        const options =
          cleaners?.results.map((cleaner) => ({
            label: cleaner?.first_name,
            value: cleaner.id,
          })) || []

        return (
          <CSelect
            size="large"
            defaultValue={{
              value: record.cleaner?.id,
              label: record.cleaner?.first_name,
            }}
            options={options}
            className="w-full"
            onChange={(value) => handleCleanerChange(value, record)}
          />
        )
      },
      sorter: true,
    },
    {
      title: t('common.do-not-disturb'),
      width: 90,
      dataIndex: 'not_disturb',
      key: 'not_disturb',
      className: 'font-medium text-center',
      render: (value, record) => (
        <Checkbox
          checked={value}
          onChange={(e) => handleDisturbChange(e.target.checked, record)}
        />
      ),
      sorter: true,
    },
    {
      title: t('common.notes'),
      dataIndex: 'description',
      key: 'description',
      className: 'font-medium',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {record.description ? (
            <>
              <Typography.Text className="text-sm font-medium">
                {record.description}
              </Typography.Text>
              <Tooltip title={t('common.edit')}>
                <Button
                  shape="circle"
                  type="text"
                  size="small"
                  icon={<EditIcon className="text-[20px] text-primary" />}
                  onClick={() => handleNoteClick(record.id)} // Pass the recordId
                />
              </Tooltip>
            </>
          ) : (
            <Typography.Text className="text-sm text-gray-500">
              {t('common.no-notes')}
              <Tooltip title={t('common.edit')}>
                <Button
                  shape="circle"
                  type="text"
                  size="small"
                  icon={<EditIcon className="text-[20px] text-primary" />}
                  onClick={() => handleNoteClick(record.id)} // Pass the recordId
                />
              </Tooltip>
            </Typography.Text>
          )}
        </div>
      ),
    },
  ]

  const dataSource = useMemo(
    () =>
      list?.results.map((val, i) => ({
        ...val,
        key: val.id + i,
        id: val.id,
        name: `${val.room_item.name}`,
        room: val.room_item.room,
        description: val.note,
        room_free: val.room_free,
        order_status: val.order_status,
        not_disturb: val.not_disturb,
        cleaner: val.cleaner,
      })),
    [list?.results],
  )

  const mutation = useMutation(
    (data: any) => updateCleaningRoom({ data, id: data.id, branch }),
    {
      onSuccess: () => {
        message.success(t('common.changes-successfully-saved'))
        refetch()
      },
    },
  )

  const handleStateChange = (checked: boolean, record: IOrdersItem) => {
    const payload = {
      id: record.id,
      room_clean: checked,
    }
    mutation.mutate(payload)
  }

  const handleDisturbChange = (checked: boolean, record: IOrdersItem) => {
    const payload = {
      id: record.id,
      not_disturb: checked,
    }

    mutation.mutate(payload)
  }

  const handleCleanerChange = (cleanerId: number, record: IOrdersItem) => {
    mutation.mutate({
      id: record.id,
      cleaner: cleanerId,
    })
  }

  const handleNoteClick = (recordId: number | string) => {
    setCurrentRecordId(recordId)
    setAddNoteOpen(true)
  }

  const exportToExcel = () => {
    if (!dataSource || dataSource.length === 0) return

    const headers = columns
      .filter((col: any) => col.dataIndex)
      .map((col) => col.title)

    const formattedData = dataSource.map((row: any) =>
      columns
        .filter((col: any) => col.dataIndex)
        .map((col: any) => row[col.dataIndex]),
    )

    const ws = XLSX.utils.aoa_to_sheet([headers, ...formattedData])

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Cleaning List')

    // const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    // const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    // saveAs(data, 'cleaning_list.xlsx');
  }

  return (
    <div className="container mb-[50px] flex flex-col min-h-screen">
      <RoomCleaningHeader exportToExcel={exportToExcel} />
      <div className="p-6 rounded-3xl flex-1 border bg-white dark:border-secondary-dark dark:bg-primary-dark">
        <RoomCleaningFilters />
        <RoomCleaningList
          columns={columns}
          dataSource={dataSource}
          refetch={refetch}
          isLoading={isFetching}
          list={list}
          addNoteOpen={addNoteOpen}
          setAddNoteOpen={setAddNoteOpen}
          currentRecordId={currentRecordId}
          setCurrentRecordId={setCurrentRecordId}
        />
      </div>
    </div>
  )
}
