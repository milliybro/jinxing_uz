import dayjs from 'dayjs'
import { Fragment } from 'react'
import { Typography } from 'antd'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { InView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loading3QuartersOutlined } from '@ant-design/icons'

import { getRoomItemStatistics } from '../api'

import InfoBox from './info-box'
import BlockedBox from './blocked-box'
import SelectedBox from './selected-box'

import type { IGroupedByMonthData, IRoomItemStatistics } from '../types'
import { useBranchIdStore } from '@/store/branch-id-store'

const { Text } = Typography

const CalendarTable = () => {
  const { t } = useTranslation()
  const { search } = useLocation()
  const queries = queryString.parse(search)
  const { branch } = useBranchIdStore()

  const {
    data: items,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['room-item-statistics', queries],
    queryFn: async ({ pageParam = 1 }) => {
      const currentStartDate = dayjs()

      const start_date = currentStartDate
        .add(pageParam - 1, 'month')
        .format('YYYY-MM-DD')
      const end_date = currentStartDate
        .add(pageParam, 'month')
        .format('YYYY-MM-DD')

      const params = {
        ...queries,
        sources: queries.sources?.toString(),
        start_date: queries?.start_date || start_date,
        end_date: queries?.end_date || end_date,
        branch,
      }

      return await getRoomItemStatistics(params)
    },
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1
    },
  })

  // console.log('Items', items)

  // *** notice, useInfiniteQuery is used, so it's not fetching all data
  // *** instead it's merging the old data with the new one (which are fetched during scrolling horizontally) into a single object
  const merged: IRoomItemStatistics = {
    by_room: items?.pages
      ?.flat()
      .reduce<IRoomItemStatistics['by_room']>((acc, curr) => {
        curr?.by_room?.forEach((room) => {
          const existingRoom = acc?.find((r) => r.room_id === room.room_id)
          if (existingRoom) {
            const updatedRoom = {
              ...existingRoom,
              data: [...existingRoom.data, ...room.data],
            }
            acc = acc?.map((r) =>
              r.room_id === room.room_id ? updatedRoom : r,
            )
          } else {
            acc?.push(room)
          }
        })
        return acc
      }, []),

    daily_orders: items?.pages
      ?.flat()
      .reduce<IRoomItemStatistics['daily_orders']>((acc, curr) => {
        return [...(acc || []), ...(curr.daily_orders || [])]
      }, []),

    result: items?.pages
      ?.flat()
      .reduce<IRoomItemStatistics['result']>((acc, curr) => {
        curr?.result?.forEach((room) => {
          const existingRoom = acc?.find((r) => r.id === room.id)
          if (existingRoom) {
            const updatedRoom = {
              ...existingRoom,
              data: [...existingRoom.data, ...room.data],
            }
            acc = acc?.map((r) => (r.id === room.id ? updatedRoom : r))
          } else {
            acc?.push(room)
          }
        })
        return acc
      }, [])
      ?.map((item: any) => {
        const orderItemIdFound = new Set()
        item.data = item.data.map((order: any) => {
          if (order.order_item_id !== null) {
            if (orderItemIdFound.has(order.order_item_id)) {
              order.repeated = true
            } else {
              orderItemIdFound.add(order.order_item_id)
            }
          }
          return order
        })

        const blockedRoomIds = new Set()
        item.data = item.data.map((order: any) => {
          if (order.blocked_room_id !== null) {
            if (blockedRoomIds.has(order.blocked_room_id)) {
              order.br_repeated = true
            } else {
              blockedRoomIds.add(order.blocked_room_id)
            }
          }
          return order
        })

        return item
      }),
  }

  const groupedByMonth: IGroupedByMonthData[] =
    merged?.daily_orders && Array.isArray(merged?.daily_orders)
      ? Object.values(
          merged?.daily_orders?.reduce((acc: any, item) => {
            const monthKey = item.date.slice(0, 7)
            if (!acc[monthKey]) {
              acc[monthKey] = { month: `${monthKey}-01`, data: [] }
            }
            acc[monthKey].data.push(item)
            return acc
          }, {}),
        )
      : []

  return (
    <div className="overflow-auto w-full h-full max-h-[550px]">
      <table className="w-full relative border-separate border-spacing-0 calendar-table">
        <thead className="bg-white sticky top-0 z-[5]">
          <tr className="text-xs text-secondary">
            <th
              className="w-[163px] border-t border-l dark:border-secondary-dark font-medium bg-white dark:bg-primary-dark sticky left-0 z-[5]"
              rowSpan={3}
            >
              {t('common.rooms')}
            </th>
            {groupedByMonth?.map((val, i) => (
              <th
                key={`${val.month}-${i}`}
                colSpan={val.data.length}
                className="max-h-[40px] px-4 relative text-start border-t dark:border-secondary-dark dark:bg-primary-dark"
              >
                <Text className="sticky left-[12.5%] text-xs font-medium">
                  {dayjs(val.month).format('MMMM, YYYY')}
                </Text>
              </th>
            ))}
          </tr>
          <tr>
            {merged?.daily_orders?.map((val, i) => (
              <Fragment key={`${val.day}-123123-${i}`}>
                <th
                  className="h-[40px] font-norma dark:border-secondary-dark dark:bg-primary-dark select-none relative text-secondary text-xs min-w-[90px]"
                  tabIndex={0}
                >
                  {dayjs(val.date).format('DD dd')}
                </th>
              </Fragment>
            ))}
          </tr>
          <tr>
            {merged?.daily_orders?.map((val, i) => (
              <th
                key={`days-2-${i}`}
                className="h-[40px] font-normal dark:border-secondary-dark text-secondary dark:bg-primary-dark align-baseline text-xs min-w-[90px]"
              >
                {val.ordered_rooms}
                <span className="text-[10px] text-[#115E59] ml-2 font-medium bg-[#CCFBF1] py-[2px] px-1 rounded-sm">
                  {val.ordered_rooms_percent
                    ? Math.round(val.ordered_rooms_percent)
                    : null}{' '}
                  %
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="relative">
          <div className=" duration-200 border-r-2 border-blue-500 absolute pointer-events-none top-0 bottom-0 z-[4] left-[185px]">
            <div className="w-[8px] h-[8px] translate-x-[4.8px] translate-y-[-2px] rounded-full bg-blue-500" />
          </div>
          {merged?.result?.map((parVal, i: number) => (
            <tr key={`tr-${i}`}>
              <th className="sticky left-0 z-[4] dark:border-secondary-dark whitespace-nowrap bg-white dark:bg-primary-dark border-l text-xs font-medium">
                {parVal.room_item_name}
                <span className="text-[10px] ml-2 font-medium bg-[#F3F4F6] dark:bg-secondary-dark py-[2px] px-1 rounded-sm">
                  {parVal.room_name}
                </span>
              </th>
              {parVal?.data.map((val, index: number) => (
                <td
                  key={`key-${index}`}
                  width={98}
                  height={69}
                  className="relative dark:border-secondary-dark"
                >
                  {val.order_item_id && !val.repeated ? (
                    <InfoBox val={val} parVal={parVal} refetch={refetch} />
                  ) : (
                    <SelectedBox val={val} parVal={parVal} />
                  )}

                  {val.blocked_room_id && !val.br_repeated ? (
                    <BlockedBox val={val} />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <InView
          as="span"
          onChange={(inView) => {
            if (inView) {
              fetchNextPage()
            }
          }}
          className="absolute right-1 duration-200 select-none pointer-events-none top-[50%]"
        >
          <Loading3QuartersOutlined
            className={`text-primary duration-200 text-[32px] animate-spin ${
              isFetchingNextPage ? '' : ' opacity-0'
            }`}
          />
        </InView>
      </table>
    </div>
  )
}

export default CalendarTable
