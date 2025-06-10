import CSelect from '@/components/cselect'
import CalendarIcon from '@/components/icons/calendar'
import { useQuery } from '@tanstack/react-query'
import { DatePicker, Divider, Form, Input, Typography } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getFreeRoom,
  getPaymentStatus,
  getRoomTariffs,
  getShortRooms,
} from '../api'
import dayjs from 'dayjs'
import { useBranchIdStore } from '@/store/branch-id-store'

const ThirdContent = ({
  price,
  typeNumber,
  setTypeNumber,
  setPrice,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  order,
  form,
}: {
  price: number
  typeNumber: any
  setTypeNumber: Dispatch<SetStateAction<string | undefined>>
  setPrice: Dispatch<SetStateAction<number>>
  startDate: string | null
  setStartDate: Dispatch<SetStateAction<string | null>>
  endDate: string | null
  setEndDate: Dispatch<SetStateAction<string | null>>
  order: any
  form: any
}) => {
  const { t } = useTranslation()
  const [tariff, setTariff] = useState<string | undefined>(undefined)
  const [livesDay, setLivesDay] = useState(0)
  const { branch } = useBranchIdStore()

  useEffect(() => {
    if (order) {
      const newTariff = order?.items?.[0]?.tariff?.id
      setTariff(newTariff)
    }
  }, [tariff])

  const { data: roomTypes } = useQuery({
    queryKey: ['room-type', tariff],
    queryFn: async () => {
      const res = await getShortRooms({ tariff, branch })
      return res
    },
    enabled: !!tariff,
  })

  const { data: status } = useQuery({
    queryKey: ['payment-status'],
    queryFn: async () => {
      const res = await getPaymentStatus({ branch })
      return res
    },
  })

  const { data: roomTariff } = useQuery({
    queryKey: ['room-tariff'],
    queryFn: async () => {
      const res = await getRoomTariffs({ branch })
      return res
    },
  })

  const { data: freeRoom } = useQuery({
    queryKey: ['free-room', typeNumber, startDate, endDate],
    queryFn: async () => {
      const params = {
        start_date: startDate,
        end_date: endDate,
        room: typeNumber?.value,
        branch,
      }
      const res = await getFreeRoom(params)
      return res
    },
    enabled: !!typeNumber && !!startDate && !!endDate,
  })

  useEffect(() => {
    if ((startDate && endDate) || (order?.start_date && order?.end_date)) {
      const diff = dayjs(endDate || order?.end_date).diff(
        dayjs(startDate || order?.start_date),
        'day',
      )
      setLivesDay(diff)

      const calculatedPrices: { price: number; date: string }[] = []
      for (let i = 0; i < diff; i++) {
        const date = dayjs(startDate).add(i, 'day').format('DD.MM.YYYY')
        calculatedPrices.push({
          price: price,
          date: date,
        })
      }

      // setStepData((prevData) => ({
      //   ...prevData,
      //   items: prevData.items.map((item) => ({
      //     ...item,
      //     prices: calculatedPrices,
      //   })),
      // }))
    }
  }, [startDate, endDate, price, order])

  const roomOptions = Array.isArray(roomTypes?.results)
    ? roomTypes?.results.map((roomType) => ({
        index: roomType?.id,
        key: roomType?.id,
        value: roomType?.id,
        label: roomType?.name,
      }))
    : []

  const statusOptions = Array.isArray(status)
    ? status.map((roomType) => ({
        index: roomType.id,
        value: roomType.id || roomType.name,
        label: t(`common.${roomType.key}`),
      }))
    : []

  const freeRoomOptions = Array.isArray(freeRoom)
    ? freeRoom.map((roomType) => ({
        key: roomType?.id,
        index: roomType?.id,
        value: roomType?.id,
        label: roomType?.name,
      }))
    : []

  const tariffOptions = Array.isArray(roomTariff?.results)
    ? roomTariff?.results.map((roomType) => ({
        key: roomType.id,
        value: roomType?.id,
        label: roomType?.name,
        price: roomType?.price,
      }))
    : []

  useEffect(() => {
    if (tariffOptions && order) {
      const defaultRoom = roomOptions.find(
        (option) => option.value === order?.items[0]?.room?.id,
      )
      console.log(defaultRoom, 'fist')

      if (defaultRoom) {
        form.setFieldsValue({
          type_number: { key: defaultRoom.key, label: defaultRoom.label },
        })
      }
    }
  }, [tariffOptions, roomOptions, form, order])

  const options = [
    { value: 'work', label: t('visit-type.work') },
    { value: 'education', label: t('visit-type.education') },
    { value: 'tourist', label: t('visit-type.tourist') },
    { value: 'private', label: t('visit-type.private') },
    { value: 'other', label: t('visit-type.other') },
    {
      value: 'visiting_friends_relatives',
      label: t('visit-type.visiting_friends_relatives'),
    },
    {
      value: 'health_and_wellness_procedures',
      label: t('visit-type.health_and_wellness_procedures'),
    },
    {
      value: 'religion_pilgrimage',
      label: t('visit-type.religion_pilgrimage'),
    },
    { value: 'visiting_shops', label: t('visit-type.visiting_shops') },
    { value: 'transit', label: t('visit-type.transit') },
    { value: 'sports_and_culture', label: t('visit-type.sports_and_culture') },
    { value: 'for_leisure', label: t('visit-type.for_leisure') },
    { value: 'guest', label: t('visit-type.guest') },
    { value: 'official', label: t('visit-type.official') },
    { value: 'as_a_compatriot', label: t('visit-type.as_a_compatriot') },
    {
      value: 'as_an_honorary_citizen',
      label: t('visit-type.as_an_honorary_citizen'),
    },
    { value: 'as_an_investor', label: t('visit-type.as_an_investor') },
  ]

  const totalSumm = livesDay * (price ? price : order?.items[0]?.price)
  return (
    <div className="flex flex-col max-h-[635px] h-full overflow-auto">
      <Typography.Text className="text-[18px] font-medium">
        {t('common.additional-information')}
      </Typography.Text>
      <Divider />
      {/* <Form form={form} className="grid grid-cols-1 gap-4 mb-6" layout="vertical"> */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            rules={[
              { required: true, message: t('tariff-plans-page.name.rule') },
            ]}
            label={t('fields.time-period.label-start')}
            name="start_date"
            className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          >
            <DatePicker
              format={{
                format: 'DD.MM.YYYY',
                type: 'mask',
              }}
              placeholder="DD.MM.YYYY"
              size="large"
              className="px-4 w-full h-[47px]"
              showNow={false}
              superPrevIcon={null}
              superNextIcon={null}
              suffixIcon={<CalendarIcon className="text-base" />}
              disabledDate={(current) =>
                current && current < dayjs().startOf('day')
              }
              onChange={(date) => {
                setStartDate(date ? date.format('YYYY-MM-DD') : '')
              }}
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: t('tariff-plans-page.name.rule') },
            ]}
            label={t('fields.time-period.label-end')}
            name="end_date"
            className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          >
            <DatePicker
              format={{
                format: 'DD.MM.YYYY',
                type: 'mask',
              }}
              placeholder="DD.MM.YYYY"
              size="large"
              className="px-4 w-full h-[47px]"
              showNow={false}
              superPrevIcon={null}
              superNextIcon={null}
              suffixIcon={<CalendarIcon className="text-base" />}
              disabledDate={(current) =>
                (current && current < dayjs(startDate)) ||
                (!!startDate && current < dayjs().startOf('day'))
              }
              onChange={(date) => {
                setEndDate(date ? date.format('YYYY-MM-DD') : '')
              }}
            />
          </Form.Item>
        </div>
        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          label={t('common.tariff-plans')}
          name="tariff"
        >
          <CSelect
            size="large"
            labelInValue
            allowClear
            showSearch={false}
            options={tariffOptions}
            onChange={(value) => {
              if (Array.isArray(tariffOptions)) {
                const selectedOption = tariffOptions.find(
                  (option) => option.value === value?.value, // To'g'ri solishtirish
                )
                setTariff(value.value)
                // console.log('vvvvv', tariffOptions, value)

                if (selectedOption) {
                  setPrice(selectedOption.price)
                }
              }
            }}
            placeholder={t('new-booking-page.visit_type.placeholder')}
            optionRender={(props: any) => (
              <div className="flex gap-4 items-center">{props.label}</div>
            )}
            tagRender={(props: any) => (
              <div className="flex gap-4 items-center">{props.label}</div>
            )}
          />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            rules={[
              { required: true, message: t('tariff-plans-page.name.rule') },
            ]}
            label={t('all-rooms.number-type')}
            name="type_number"
          >
            <CSelect
              size="large"
              allowClear
              labelInValue
              showSearch={true}
              placeholder={t('common.select-room')}
              options={roomOptions}
              onChange={(value) => {
                setTypeNumber(value)
              }}
              filterOption={
                (input, option) => !!option?.value?.toString().includes(input) // || value orqali qidiruv
                // option?.label?.toLowerCase().includes(input.toLowerCase()) // label orqali qidiruv
              }
              optionRender={(props: any) => (
                <div className="flex gap-4 items-center">{props.label}</div>
              )}
              tagRender={(props: any) => (
                <div className="flex gap-4 items-center">{props.label}</div>
              )}
              notFoundContent={
                <div className="text-gray-500">{t('common.no-options')}</div>
              }
            />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: t('tariff-plans-page.name.rule') },
            ]}
            label={t('common.room-number')}
            name="number_room"
          >
            <CSelect
              size="large"
              allowClear
              labelInValue
              showSearch={true}
              placeholder={t('common.select-room')}
              options={freeRoomOptions}
              filterOption={(input, option) =>
                !!option?.value?.toString().includes(input)
              }
              optionRender={(props: any) => (
                <div className="flex gap-4 items-center">{props.label}</div>
              )}
              tagRender={(props: any) => (
                <div className="flex gap-4 items-center">{props.label}</div>
              )}
              notFoundContent={
                <div className="text-gray-500">{t('common.no-options')}</div>
              }
            />
          </Form.Item>
        </div>

        <Form.Item label={t('new-booking-page.arrive_days.label')}>
          <Input
            value={livesDay}
            type="number"
            readOnly
            placeholder={t('new-booking-page.arrive_days.placeholder')}
            size="large"
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          label={t('new-booking-page.visit_type.label')}
          name="visit_type"
        >
          <CSelect
            size="large"
            allowClear
            showSearch={false}
            options={options}
            placeholder={t('new-booking-page.visit_type.placeholder')}
            optionRender={(props: any) => (
              <div className="flex gap-4 items-center">{props.label}</div>
            )}
            tagRender={(props: any) => (
              <div className="flex gap-4 items-center">{props.label}</div>
            )}
          />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          label={t('fields.payment_status.label')}
          name="payment_status"
        >
          <CSelect
            size="large"
            allowClear
            showSearch={false}
            options={statusOptions}
            placeholder={t('fields.payment_status.placeholder')}
            optionRender={(props: any) => (
              <div className="flex gap-4 items-center">{props.label}</div>
            )}
            tagRender={(props: any) => (
              <div className="flex gap-4 items-center">{props.label}</div>
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('fields.payment_amount.label')}
          // name="payment_amount"
        >
          <Input
            value={totalSumm}
            type="number"
            // placeholder={t('fields.payment_amount.placeholder')}
            size="large"
            disabled
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          label={t('new-booking-page.guest_type.label')}
          name="type_guest"
        >
          <CSelect
            size="large"
            allowClear
            showSearch={false}
            options={[
              {
                value: 'pensioner',
                label: t('guest-type.pensioner'),
              },
              {
                value: 'student',
                label: t('guest-type.student'),
              },
              {
                value: 'dependent',
                label: t('guest-type.dependent'),
              },
              {
                value: 'other',
                label: t('guest-type.other'),
              },
            ]}
            placeholder={t('new-booking-page.guest_type.placeholder')}
            optionRender={(props: any) => {
              return (
                <div className="flex gap-4 items-center">{props.label}</div>
              )
            }}
            tagRender={(props: any) => {
              return (
                <div className="flex gap-4 items-center">{props.label}</div>
              )
            }}
          />
        </Form.Item>

        {/* </Form> */}
      </div>
    </div>
  )
}

export default ThirdContent
