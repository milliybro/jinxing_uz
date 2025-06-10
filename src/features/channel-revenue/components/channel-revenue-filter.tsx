import { useQuery } from '@tanstack/react-query'
import { Form, Switch } from 'antd'
import dayjs from 'dayjs'
import queryString from 'query-string'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// import CheckObjectProperty from '@/helpers/check-object-property'
import { getRoomsList } from '@/api'
import { getOrderTypes, getOrdersList, getSalesSources } from '../api'

import CSelect from '@/components/cselect'
import BedDoubleIcon from '@/components/icons/bed-double'
import CheckmarkIcon from '@/components/icons/checkmark'
import CircleIcon from '@/components/icons/circle'
import FlowConnectionIcon from '@/components/icons/flow-connection'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import RangePicker from '@/components/rangepicker'
import { useBranchIdStore } from '@/store/branch-id-store'
import { useTranslation } from 'react-i18next'

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

const ChannelRevenueFilters = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const isGroup = Form.useWatch(['group'], form)

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
      className="grid grid-cols-[1fr,1fr,1fr,max-content] gap-6 mb-6"
      onFieldsChange={(val) => {
        const search = queryString.stringify({
          ...queries,
          [val?.[0].name?.[0]]:
            val?.[0].name?.[0] === 'date'
              ? dayjs(val?.[0].value).format('YYYY-MM-DD')
              : val?.[0].value || undefined,
          page: 1,
        })
        navigate({ pathname, search }, { replace: true })
      }}
      initialValues={{
        ...queries,
        date: queries.date
          ? [dayjs(queries.date[0] as string), dayjs(queries.date[1] as string)]
          : undefined,
      }}
    >
      <Form.Item label={t('fields.period.label')} name="date">
        <RangePicker
          singlePlaceholder={t('fields.period.placeholder')}
          iconColor="text-secondary"
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
      <Form.Item
        label={t('fields.group.label')}
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
        name="group"
      >
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default ChannelRevenueFilters
