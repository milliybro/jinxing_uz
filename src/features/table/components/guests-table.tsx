import { Fragment, useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Typography,
} from 'antd'

import TableAccordion from '../containers/table-accordion'
import CloseIcon from '@/components/icons/close'
import CalendarIcon from '@/components/icons/calendar'

import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getRoomItemStatistics } from '../api'
import EditIcon from '@/components/icons/edit'
import { useBranchIdStore } from '@/store/branch-id-store'

const { Text } = Typography

interface IState {
  month: string
  days: string[]
}

const generateRemainingMonthsDays = () => {
  const now = dayjs()
  const months = []
  let remainingDays = 31

  for (let month = now.month(); month <= 11 && remainingDays > 0; month++) {
    const daysInMonth = dayjs(new Date(now.year(), month + 1, 0)).date()
    const startDay = month === now.month() ? now.date() : 1
    const daysArray = []

    for (let day = startDay; day <= daysInMonth && remainingDays > 0; day++) {
      const date = dayjs(new Date(now.year(), month, day))
      daysArray.push(`${day} ${date.locale('ru').format('dd')}`)
      remainingDays--
    }

    const monthName = dayjs(new Date(now.year(), month))
      .locale('ru')
      .format('MMMM, YYYY')

    months.push({
      month: monthName,
      days: daysArray,
    })
  }
  return months
}

const GuestsTable = () => {
  const { search } = useLocation()
  const queries = queryString.parse(search)
  const [open, setOpen] = useState(false)
  const [remainingMonthsDays, setRemainingMonthsDays] = useState<
    IState[] | null
  >(null)
  const { branch } = useBranchIdStore()

  const showDrawer = () => {
    setOpen((prev) => !prev)
  }

  const { data: items } = useQuery({
    queryKey: ['room-item-statistics', queries],
    queryFn: async () => {
      const res = await getRoomItemStatistics({
        ...queries,
        sources: queries.sources?.toString(),
        branch,
      })
      return res
    },
  })

  useEffect(() => {
    const months = generateRemainingMonthsDays()
    setRemainingMonthsDays(months)
  }, [])

  items?.result?.forEach((item: any) => {
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
  })

  items?.result?.forEach((item: any) => {
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
  })

  return (
    <div className="flex flex-col">
      <table className="w-full border-separate border-spacing-0 calendar-table">
        <thead className="bg-white sticky top-0 z-[5]">
          <tr className="text-xs text-secondary">
            <th
              className="w-[163px] border-t border-l dark:border-secondary-dark font-medium bg-white dark:bg-primary-dark sticky left-0 z-[5]"
              rowSpan={3}
            >
              Номера
            </th>
            {remainingMonthsDays?.map((val, i) => (
              <th
                key={`${val.month}+${i}`}
                colSpan={val.days.length}
                className="h-[40px] overflow-hidden whitespace-nowrap px-4 relative text-start border-t dark:border-secondary-dark dark:bg-primary-dark"
                style={{ lineHeight: '40px', height: '40px' }} // Ensure the height does not exceed 40px
              >
                <Text className="sticky left-[12.5%] text-xs font-medium">
                  {val.month}
                </Text>
              </th>
            ))}
          </tr>
          <tr>
            {items?.daily_orders?.map((val: any, i: number) => (
              <Fragment key={`${val.day}-123123-${i}`}>
                <th
                  className="h-[40px] font-norma dark:border-secondary-dark dark:bg-primary-dark select-none relative text-secondary text-xs min-w-[90px]"
                  tabIndex={0}
                >
                  {dayjs(val.date).locale('ru').format('DD dd')}
                </th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <div className="h-2"></div>
        <tbody className="">
          <th colSpan={32} className="mt-10 p-0 border-[1px] border-[#E5E7EB]">
            <div className="py-2 bg-secondary-light dark:bg-secondary-dark">
              <div className="flex items-center gap-2 w-fit sticky left-[20px]">
                <div className="flex items-center gap-2">
                  <Text className="text-sm font-medium">TWIN DLX</Text>
                  <div className="text-sm text-primary-dark dark:bg-primary-dark dark:text-white font-medium rounded flex items-center justify-center bg-white px-2 py-1">
                    ID 323
                  </div>
                </div>
                <button
                  type="button"
                  className=" flex items-center gap-1 font-medium text-sm text-primary"
                  onClick={showDrawer}
                >
                  <EditIcon className="text-base" />
                  Редактировать
                </button>
              </div>
            </div>
          </th>
          <tr>
            <th className="sticky left-0 z-[4] dark:border-secondary-dark whitespace-nowrap bg-white dark:bg-primary-dark border-l text-xs font-medium">
              Статус номер
            </th>
            {[...Array(31)].map((_, i) => (
              <td
                key={i}
                height={40}
                className="text-center dark:border-secondary-dark"
              >
                <div className="bg-[#D1FAE5]">
                  <span className="text-[#16A34A] font-medium text-[10px] py-[1px] px-[3px]">
                    Активный
                  </span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <th className="sticky left-0 z-[4] dark:border-secondary-dark whitespace-nowrap bg-white dark:bg-primary-dark border-l text-xs font-medium">
              На продажу
            </th>
            {[...Array(31)].map((_, i) => (
              <td
                key={i}
                height={40}
                className="text-center dark:border-secondary-dark"
              >
                <span className="text-sm font-medium">
                  {Math.floor(Math.random() * 90 + 10)}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <th className="sticky left-0 z-[4] dark:border-secondary-dark whitespace-nowrap bg-white dark:bg-primary-dark border-l text-xs font-medium">
              Активные брони
            </th>
            {[...Array(31)].map((_, i) => (
              <td
                key={i}
                height={40}
                className="text-center dark:border-secondary-dark"
              >
                <span className="text-sm font-medium">
                  {Math.floor(Math.random() * 90 + 10)}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <th className="sticky left-0 z-[4] dark:border-secondary-dark whitespace-nowrap bg-white dark:bg-primary-dark border-l text-xs font-medium">
              Цена
            </th>
            {[...Array(31)].map((_, i) => (
              <td
                key={i}
                height={40}
                className="text-center dark:border-secondary-dark"
              >
                <span className="text-sm font-medium">
                  {Math.floor(Math.random() * 10000000 + 10)}
                </span>
              </td>
            ))}
          </tr>
        </tbody>
        <div className="h-2"></div>
        <tbody className="">
          <th colSpan={32} className="mt-10 p-0 border-[1px] border-[#E5E7EB]">
            <div className="py-2 bg-secondary-light dark:bg-secondary-dark">
              <div className="flex items-center gap-2 w-fit sticky left-[20px]">
                <div className="flex items-center gap-2">
                  <Text className="text-sm font-medium">TWIN</Text>
                  <div className="text-sm text-primary-dark dark:bg-primary-dark dark:text-white font-medium rounded flex items-center justify-center bg-white px-2 py-1">
                    ID 324
                  </div>
                </div>
                <button
                  type="button"
                  className=" flex items-center gap-1 font-medium text-sm text-primary"
                  onClick={showDrawer}
                >
                  <EditIcon className="text-base" />
                  Редактировать
                </button>
              </div>
            </div>
          </th>
          <tr>
            <th className="sticky left-0 z-[4] dark:border-secondary-dark whitespace-nowrap bg-white dark:bg-primary-dark border-l text-xs font-medium">
              Статус номер
            </th>
            {[...Array(31)].map((_, i) => (
              <td
                key={i}
                height={40}
                className="text-center dark:border-secondary-dark"
              >
                <div className="bg-[#D1FAE5]">
                  <span className="text-[#16A34A] font-medium text-[10px] py-[1px] px-[3px]">
                    Активный
                  </span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <th className="sticky left-0 z-[4] dark:border-secondary-dark whitespace-nowrap bg-white dark:bg-primary-dark border-l text-xs font-medium">
              На продажу
            </th>
            {[...Array(31)].map((_, i) => (
              <td
                key={i}
                height={40}
                className="text-center dark:border-secondary-dark"
              >
                <span className="text-sm font-medium">
                  {Math.floor(Math.random() * 90 + 10)}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <th className="sticky left-0 z-[4] dark:border-secondary-dark whitespace-nowrap bg-white dark:bg-primary-dark border-l text-xs font-medium">
              Активные брони
            </th>
            {[...Array(31)].map((_, i) => (
              <td
                key={i}
                height={40}
                className="text-center dark:border-secondary-dark"
              >
                <span className="text-sm font-medium">
                  {Math.floor(Math.random() * 90 + 10)}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <th className="sticky left-0 z-[4] dark:border-secondary-dark whitespace-nowrap bg-white dark:bg-primary-dark border-l text-xs font-medium">
              Цена
            </th>
            {[...Array(31)].map((_, i) => (
              <td
                key={i}
                height={40}
                className="text-center dark:border-secondary-dark"
              >
                <span className="text-sm font-medium">
                  {Math.floor(Math.random() * 10000000 + 10)}
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Drawer
        width={581}
        closeIcon={null}
        footer={
          <div className="flex justify-end gap-4">
            <Button className="text-primary-dark font-semibold">Отмена</Button>
            <Button
              htmlType="submit"
              className="bg-primary text-white font-semibold"
            >
              Сохранить изменения
            </Button>
          </div>
        }
        title={
          <div className="flex w-full items-center justify-between">
            <span className="text-[18px] font-medium">
              Редактирование списком
            </span>
            <Button
              shape="circle"
              type="text"
              className="flex items-center justify-center"
              onClick={showDrawer}
              icon={<CloseIcon className="text-base" />}
            />
          </div>
        }
        onClose={showDrawer}
        open={open}
      >
        <div className="flex flex-col">
          <Form layout="vertical">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Form.Item
                label="Начало периода"
                className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
              >
                <DatePicker
                  inputReadOnly
                  placeholder="Укажите дату"
                  size="large"
                  className="px-4 w-full h-[47px]"
                  showNow={false}
                  superPrevIcon={null}
                  superNextIcon={null}
                  suffixIcon={
                    <CalendarIcon className="text-success-dark text-base" />
                  }
                />
              </Form.Item>
              <Form.Item
                label="Конец периода"
                className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
              >
                <DatePicker
                  inputReadOnly
                  placeholder="Укажите дату"
                  size="large"
                  className="px-4 w-full h-[47px]"
                  showNow={false}
                  superPrevIcon={null}
                  superNextIcon={null}
                  suffixIcon={
                    <CalendarIcon className="text-success-dark text-base" />
                  }
                />
              </Form.Item>
            </div>
            <Form.Item label="К каким дням недели вы хотите применить изменения?">
              <Checkbox.Group
                className="flex justify-between"
                options={[
                  { label: 'Пн', value: 'Пн' },
                  { label: 'Вт', value: 'Вт' },
                  { label: 'Ср', value: 'Ср' },
                  { label: 'Чт', value: 'Чт' },
                  { label: 'Пт', value: 'Пт' },
                  { label: 'Сб', value: 'Сб' },
                  { label: 'Вс', value: 'Вс' },
                ]}
                // disabled
                // defaultValue={['Apple']}
                // onChange={onChange}
              />
            </Form.Item>
            <Divider />
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-[18px] leading-[22.95px] font-medium text-primary-dark">
                TWIN DLX
              </span>
              <span className="text-secondary leading-[20.4px] text-base">
                Цены от стойки
              </span>
            </div>
            <TableAccordion />
          </Form>
        </div>
      </Drawer>
    </div>
  )
}

export default GuestsTable
