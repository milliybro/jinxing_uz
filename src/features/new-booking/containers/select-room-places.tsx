import { useQuery } from '@tanstack/react-query'
import { Select, Table, Typography } from 'antd'

import { getAvailableRooms } from '../api'
import { formatAmount } from '@/helpers/format-amount'
import useNewBookingConfirmationStore from '@/store/new-booking-confirmation-store'

import AddAction from '@/features/new-booking/components/add-action'
import ArrowDownIcon from '@/components/icons/arrow-down'

import BookingsFilters from '../components/bookings-filters'
import BookingRoomDetails from '../components/booking-room-details'

import type { TableProps } from 'antd'
import type { IAvailableRoom } from '../types'
import { useBranchIdStore } from '@/store/branch-id-store'

const SelectRoomPlaces = () => {
  const { addSelectedRooms, removeSelectedRooms, selectedRooms } =
    useNewBookingConfirmationStore((state) => state)
  const { branch } = useBranchIdStore()

  const { data: items, isLoading } = useQuery({
    queryKey: ['available-rooms'],
    queryFn: async () => {
      const res = await getAvailableRooms({ branch })
      return res
    },
  })

  const columns: TableProps<IAvailableRoom>['columns'] = [
    {
      title: 'Детали',
      width: 190,
      dataIndex: 'name',
      key: 'name',
      className: 'whitespace-nowrap font-medium',
      render: (text) => <BookingRoomDetails text={text} />,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Сумма',
      width: 190,
      dataIndex: 'price',
      key: 'price',
      className: 'font-medium',
      sorter: (a, b) => a.price - b.price,
      render: (value) => (
        <Typography.Text>{formatAmount(value)} UZS</Typography.Text>
      ),
    },
    {
      title: 'Доступно',
      width: 190,
      dataIndex: 'available_rooms',
      key: 'available_rooms',
      className: 'font-medium',
      sorter: (a, b) => a.available_rooms - b.available_rooms,
    },
    {
      title: 'Взрослых',
      width: 190,
      dataIndex: 'person_count',
      key: 'person_count',
      className: 'font-medium',
      sorter: (a, b) => a.person_count - b.person_count,
      render: () => (
        <Select
          size="large"
          notFoundContent={null}
          suffixIcon={<ArrowDownIcon />}
          defaultValue={2}
          options={[
            { label: 0, value: 0 },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
          ]}
          className="flex items-center text-base font-medium"
        />
      ),
    },
    {
      title: 'Детей',
      dataIndex: 'children',
      width: 190,
      key: 'children',
      className: 'font-medium',
      sorter: (a, b) => a.children_age - b.children_age,
      render: (_, values) => (
        <Select
          size="large"
          notFoundContent={null}
          suffixIcon={<ArrowDownIcon />}
          disabled={!values.children_allowed}
          defaultValue={0}
          options={[
            { label: 0, value: 0 },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
          ]}
          className="flex items-center text-base font-medium"
        />
      ),
    },
    {
      title: 'Действие',
      dataIndex: 'action',
      width: 190,

      key: 'action',
      className: 'font-medium',
      render: (_, values) => {
        return (
          <AddAction
            addSelectedRooms={() => addSelectedRooms(values)}
            removeSelectedRooms={() => removeSelectedRooms(values)}
          />
          // <button type="button" onClick={() => addSelectedRooms(values)}>
          //   123
          // </button>
        )
      },
      // sorter: (a, b) => a.action - b.action,
    },
  ]

  return (
    <>
      <BookingsFilters />
      <Table
        className="custom-table"
        bordered
        columns={columns}
        dataSource={items?.results.map((val, i) => ({
          ...val,
          key: val.name + i,
        }))}
        loading={isLoading}
        locale={{ emptyText: ' ' }}
        // pagination={{
        //   total: 80,
        //   showSizeChanger: false,
        //   showLessItems: true,
        //   position: ['bottomCenter'],
        //   nextIcon: (
        //     <span className="table-pagination-btn">
        //       {t('common.next')}
        //     </span>
        //   ),
        //   prevIcon: (
        //     <span className="table-pagination-btn">
        //       {t('common.prev')}
        //     </span>
        //   ),
        // }}
        pagination={false}
      />
      {/* <BookingsNotFound /> */}
    </>
  )
}

export default SelectRoomPlaces
