import dayjs from 'dayjs'
import { useEffect } from 'react'
import queryString from 'query-string'
import { DatePicker, Form } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import { getSalesSources } from '../api'

import CSelect from '@/components/cselect'
import CalendarIcon from '@/components/icons/calendar'
import CheckmarkIcon from '@/components/icons/checkmark'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import FlowConnectionIcon from '@/components/icons/flow-connection'
import { useTranslation } from 'react-i18next'

// const circleColor = (value: string) => {
//   return (
//     <CircleIcon
//       className={
//         value === 'В номере'
//           ? 'text-warn'
//           : value === 'Подтверждено'
//           ? 'text-primary'
//           : value === 'Выехал' || value === 'canceled'
//           ? 'text-danger'
//           : 'text-secondary/50'
//       }
//     />
//   )
// }

const StatusStatsFilters = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const { t } = useTranslation()

  // const { data: orderTypes } = useQuery({
  //   queryKey: ['order-types'],
  //   queryFn: async () => {
  //     const res = await getOrderTypes()
  //     return res
  //   },
  // })

  // const { data: ordersList } = useQuery({
  //   queryKey: ['orders-list'],
  //   queryFn: async () => {
  //     const res = await getOrdersList()
  //     return res
  //   },
  // })

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

  // const { data: roomsList } = useQuery({
  //   queryKey: ['rooms-list-r'],
  //   queryFn: async () => {
  //     const res = await getRoomsList()
  //     return res
  //   },
  // })

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
      <Form.Item
        label={t('fields.time-period.label-start')}
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
      >
        <DatePicker
          inputReadOnly
          placeholder={t('fields.time-period.placeholder')}
          size="large"
          className="px-4 w-full h-[47px]"
          showNow={false}
          superPrevIcon={null}
          superNextIcon={null}
          suffixIcon={<CalendarIcon className="text-success-dark text-base" />}
        />
      </Form.Item>
      <Form.Item
        label={t('fields.time-period.label-end')}
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
      >
        <DatePicker
          inputReadOnly
          placeholder={t('fields.time-period.placeholder')}
          size="large"
          className="px-4 w-full h-[47px]"
          showNow={false}
          superPrevIcon={null}
          superNextIcon={null}
          suffixIcon={<CalendarIcon className="text-success-dark text-base" />}
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
    </Form>
  )
}

export default StatusStatsFilters
