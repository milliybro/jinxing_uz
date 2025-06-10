import dayjs from 'dayjs'
import { useEffect } from 'react'
import queryString from 'query-string'
import { DatePicker, Form, Select } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

// import CheckObjectProperty from '@/helpers/check-object-property'
import { getOrderTypes, getOrdersList, getSalesSources } from '../api'
import { getRoomsList } from '@/api'

import CSelect from '@/components/cselect'
import SearchIcon from '@/components/icons/search'
import CircleIcon from '@/components/icons/circle'
import CalendarIcon from '@/components/icons/calendar'
import CheckmarkIcon from '@/components/icons/checkmark'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import FileDownloadIcon from '@/components/icons/file-download'
import FlowConnectionIcon from '@/components/icons/flow-connection'
import PasswordValidationIcon from '@/components/icons/password-validation'
import BedDoubleIcon from '@/components/icons/bed-double'
import DisplayFormat from '@/components/icons/display-format'
import Switch from '../../../components/switch'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'

const circleColor = (value: string) => {
  return (
    <CircleIcon
      className={
        value === 'В номере'
          ? 'text-warn'
          : value === 'Подтверждено'
          ? 'text-primary'
          : value === 'Выехал' || value === 'canceled'
          ? 'text-danger'
          : 'text-secondary/50'
      }
    />
  )
}

const BookingsStatsFilters = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const { data: orderTypes } = useQuery({
    queryKey: ['order-types'],
    queryFn: async () => {
      const res = await getOrderTypes({ branch })
      return res
    },
  })

  const { data: ordersList } = useQuery({
    queryKey: ['orders-list'],
    queryFn: async () => {
      const res = await getOrdersList({ branch })
      return res
    },
  })

  const { data: salesSources } = useQuery({
    queryKey: ['sales-sources'],
    queryFn: async () => {
      const res = await getSalesSources()
      return res
    },
  })

  useEffect(() => {
    // if (CheckObjectProperty({ ...queries })) {
    //   form.resetFields()
    // }

    form.resetFields()
  }, [queries])

  const { data: roomsList } = useQuery({
    queryKey: ['rooms-list-r'],
    queryFn: async () => {
      const res = await getRoomsList({ branch })
      return res
    },
  })

  return (
    <Form
      form={form}
      layout="vertical"
      className="grid grid-cols-5 gap-6 mb-6"
      onFieldsChange={(val) => {
        const search = queryString.stringify({
          ...queries,
          [val?.[0].name?.[0]]:
            val?.[0].value &&
            (val?.[0].name?.[0] === 'start_date' ||
              val?.[0].name?.[0] === 'end_date')
              ? dayjs(val?.[0].value).format('YYYY-MM-DD')
              : val?.[0].value || undefined,
          page: 1,
        })
        navigate({ pathname, search })
      }}
      initialValues={{
        ...queries,
        start_date: queries.start_date
          ? dayjs(queries.start_date as string)
          : undefined,
        end_date: queries.end_date
          ? dayjs(queries.end_date as string)
          : undefined,
      }}
    >
      <Form.Item label={t('fields.period.label')} name="period">
        <CSelect
          size="large"
          // className="[&>.ant-select-selection-overflow]:flex-nowrap"
          allowClear
          showSearch={false}
          prefixIcon={<CalendarIcon />}
          options={[
            {
              index: 1,
              value: '2024-2025',
              label: `2024 - 2025 ${t('fields.period.suffix')}`,
            },
            {
              index: 2,
              value: '2023-2024',
              label: `2023 - 2024 ${t('fields.period.suffix')}`,
            },
            {
              index: 3,
              value: '2022-2023',
              label: `2022 - 2023 ${t('fields.period.suffix')}`,
            },
            {
              index: 4,
              value: '2021-2022',
              label: `2021 - 2022 ${t('fields.period.suffix')}`,
            },
          ]}
          mode="multiple"
          placeholder={t('fields.period.placeholder')}
          optionRender={(props: any) => {
            return <div className="flex gap-4 items-center">{props.label}</div>
          }}
          tagRender={(props: any) => {
            return <div className="flex gap-4 items-center">{props.label}</div>
          }}
        />
      </Form.Item>
      <Form.Item label={t('fields.room.label')} name="room">
        <CSelect
          size="large"
          placeholder={t('fields.room.placeholder')}
          allowClear
          prefixIcon={<BedDoubleIcon />}
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
      <Form.Item label={t('fields.sources.label')} name="sources">
        <CSelect
          prefixIcon={<FlowConnectionIcon />}
          placeholder={t('fields.sources.placeholder')}
          size="large"
          allowClear
          showSearch={false}
          options={salesSources?.results.map((val) => ({
            label: val.name,
            value: `${val.id}`,
          }))}
          mode="multiple"
          optionRender={(props: any) => {
            return <span className="font-medium">{props.label}</span>
          }}
          menuItemSelectedIcon={({ isSelected }: any) =>
            isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
          }
          tagRender={(props: any) => (
            <div>
              <span className="text-xs leading-3">{props.label}</span>
            </div>
          )}
        />
      </Form.Item>
      <Form.Item label={t('fields.format.label')} name="format">
        <CSelect
          size="large"
          // className="[&>.ant-select-selection-overflow]:flex-nowrap"
          allowClear
          showSearch={false}
          prefixIcon={<DisplayFormat />}
          options={[
            {
              index: 1,
              value: 'month',
              label: t('fields.format.options.month'),
            },
            {
              index: 2,
              value: 'week',
              label: t('fields.format.options.week'),
            },
            {
              index: 3,
              value: 'day',
              label: t('fields.format.options.day'),
            },
          ]}
          mode="multiple"
          placeholder={t('fields.format.placeholder')}
          optionRender={(props: any) => {
            return <div className="flex gap-4 items-center">{props.label}</div>
          }}
          tagRender={(props: any) => {
            return <div className="flex gap-4 items-center">{props.label}</div>
          }}
        />
      </Form.Item>
      <Form.Item
        label={t('common.empty-dates')}
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full "
      >
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default BookingsStatsFilters
