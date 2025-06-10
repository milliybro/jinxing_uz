import { Form } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { getRoomTypes, getTariffPrices } from '../api'

import CSelect from '@/components/cselect'
import RangePicker from '@/components/rangepicker'

import FileIcon from '@/components/icons/file'
import BedDoubleIcon from '@/components/icons/bed-double'

import { getRoomsList } from '@/api'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import dayjs from 'dayjs'
import { useBranchIdStore } from '@/store/branch-id-store'

const BookingsFilters = () => {
  const [form] = Form.useForm()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const navigate = useNavigate()
  const { branch } = useBranchIdStore()

  const { data: roomsList, isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms-list-r'],
    queryFn: async () => {
      const res = await getRoomsList({ branch })
      return res
    },
  })

  const { data: tariffs } = useQuery({
    queryKey: ['room-types-r-tariff-prices'],
    queryFn: async () => {
      const res = await getTariffPrices({ branch })
      return res
    },
  })

  return (
    <Form
      form={form}
      layout="vertical"
      className="grid grid-cols-3 gap-6 mb-6"
      onFieldsChange={(val) => {
        const search = queryString.stringify({
          ...queries,
          [val?.[0].name?.[0]]:
            val?.[0].value &&
            (val?.[0].name?.[0] === 'start_date' ||
              val?.[0].name?.[0] === 'end_date')
              ? dayjs(val?.[0].value).format('YYYY-MM-DD')
              : val?.[0].value || undefined,
          start_date:
            val?.[0].name?.[0] === 'date' && val?.[0]?.value?.[0]
              ? dayjs(val?.[0]?.value?.[0]).format('YYYY-MM-DD')
              : undefined,
          end_date:
            val?.[0].name?.[0] === 'date' && val?.[0]?.value?.[1]
              ? dayjs(val?.[0]?.value?.[1]).format('YYYY-MM-DD')
              : undefined,
          date: undefined,
        })
        navigate({ pathname, search })
      }}
      initialValues={{
        ...queries,
        date: [
          queries.start_date ? dayjs(queries?.start_date as any) : undefined,
          queries.end_date ? dayjs(queries?.end_date as any) : undefined,
        ],
      }}
    >
      {/* <Form.Item label="Тип гостя">
        <CSelect
          size="large"
          placeholder="Выберите тип"
          prefixIcon={<UserIcon className="text-secondary text-base" />}
          options={[
            {
              value: 'Резидент',
              label: 'Резидент',
            },
            {
              value: 'Не резидент',
              label: 'Не резидент',
            },
            {
              value: 'Другой',
              label: 'Другой',
            },
          ]}
        />
      </Form.Item> */}
      <Form.Item label="Период" name="date">
        <RangePicker
          singlePlaceholder="Выберите период"
          iconColor="text-secondary"
        />
      </Form.Item>

      <Form.Item label="Типы номеров" name="room_type">
        <CSelect
          size="large"
          allowClear
          placeholder="Выберите тип"
          prefixIcon={<BedDoubleIcon className="text-secondary text-base" />}
          options={roomsList?.results.map((val) => ({
            label: val.description,
            value: `${val.id}`,
            title: val.name,
          }))}
          optionRender={(props: any) => {
            return (
              <div className="flex items-center">
                <div className="font-medium w-[100px]">{props?.data.title}</div>
                <div className="font-medium text truncate text-xs text-secondary w-full">
                  {props?.label}
                </div>
              </div>
            )
          }}
          labelRender={(props: any) => `${props.title} - ${props.label}`}
          tagRender={(props: any) => (
            <span className="text-xs leading-3">{props?.label}</span>
          )}
        />
      </Form.Item>

      <Form.Item label="Тарифы и цены" name="tariff">
        <CSelect
          size="large"
          placeholder="Выберите тариф"
          showSearch={false}
          allowClear
          prefixIcon={<FileIcon className="text-secondary text-base" />}
          options={tariffs?.results.map((val) => ({
            label: val.name,
            value: `${val.id}`,
          }))}
          // className="[&>.ant-select-selection-overflow]:flex-nowrap"
        />
      </Form.Item>
    </Form>
  )
}

export default BookingsFilters
