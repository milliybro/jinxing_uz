import dayjs from 'dayjs'
import { useEffect } from 'react'
import queryString from 'query-string'
import { DatePicker, Form, Select } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

// import CheckObjectProperty from '@/helpers/check-object-property'
import {
  //  getOrderTypes,
  getOrdersList,
  getSalesSources,
} from '../api'

import CSelect from '@/components/cselect'
import SearchIcon from '@/components/icons/search'
import CircleIcon from '@/components/icons/circle'
import CalendarIcon from '@/components/icons/calendar'
import CheckmarkIcon from '@/components/icons/checkmark'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import FileDownloadIcon from '@/components/icons/file-download'
import FlowConnectionIcon from '@/components/icons/flow-connection'
// import PasswordValidationIcon from '@/components/icons/password-validation'
import Switch from '@/components/switch'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'

const circleColor = (value: string) => {
  return (
    <CircleIcon
      className={
        value === 'reside'
          ? 'text-warn'
          : value === 'arrival'
          ? 'text-primary'
          : value === 'departure' || value === 'cancelled'
          ? 'text-danger'
          : 'text-secondary/50'
      }
    />
  )
}

const BookingBalancesFilters = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  // const { data: orderTypes } = useQuery({
  //   queryKey: ['order-types'],
  //   queryFn: async () => {
  //     const res = await getOrderTypes({ branch })
  //     return res
  //   },
  // })

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

  return (
    <Form
      form={form}
      layout="vertical"
      className=" mb-6"
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
      <div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Form.Item label={t('fields.order.label')} name="order">
            <Select
              size="large"
              suffixIcon={
                <SearchIcon className="ml-2 text-success-dark text-base" />
              }
              allowClear
              notFoundContent={null}
              showSearch
              defaultActiveFirstOption={false}
              options={ordersList?.results.map((val) => ({
                label: val.id,
                value: `${val.id}`,
              }))}
              placeholder={t('payment-types.enter-name-number')}
              className="[&>.ant-select-selector]:px-4 custom-ant-select-move-icon"
            />
          </Form.Item>
          <Form.Item
            label={t('fields.checkin-start.label')}
            name="start_date"
            className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          >
            <DatePicker
              inputReadOnly
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
          <Form.Item label={t('fields.checkout-end.label')} name="end_date">
            <DatePicker
              inputReadOnly
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
        <div className="grid grid-cols-[1fr,1fr,1fr,max-content] gap-6 mb-6">
          <Form.Item label={t('guests-page.statuses.label')} name="statuses">
            <CSelect
              size="large"
              // className="[&>.ant-select-selection-overflow]:flex-nowrap"
              allowClear
              showSearch={false}
              prefixIcon={<FileDownloadIcon className="" />}
              options={[
                {
                  index: 1,
                  value: 'arrival',
                  label: t('common.confirmed'),
                },
                {
                  index: 2,
                  value: 'reside',
                  label: t('common.in-room'),
                },
                {
                  index: 3,
                  value: 'departure',
                  label: t('common.departure'),
                },
                {
                  index: 4,
                  value: 'cancelled',
                  label: t('common.canceled'),
                },
              ]}
              mode="multiple"
              placeholder={t('fields.payment_status.placeholder')}
              optionRender={(props: any) => {
                return (
                  <div className="flex gap-4 items-center">
                    {circleColor(props.value)}
                    <span className="font-medium">{props.label}</span>
                  </div>
                )
              }}
              menuItemSelectedIcon={({ isSelected }: any) =>
                isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
              }
              tagRender={(props: any) => {
                return (
                  <div className="flex gap-2 items-center mr-2">
                    <span>{circleColor(props.value)}</span>
                    <span>{props.label}</span>
                  </div>
                )
              }}
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
          <Form.Item label={t('fields.booking-balance.label')} name="payment">
            <CSelect
              size="large"
              // className="[&>.ant-select-selection-overflow]:flex-nowrap"
              allowClear
              showSearch={false}
              prefixIcon={<FileDownloadIcon className="" />}
              options={[
                {
                  index: 1,
                  value: 'arrival',
                  label: t('fields.payment-type.placeholder'),
                },
                {
                  index: 2,
                  value: 'reside',
                  label: 'Apple Pay',
                },
                {
                  index: 3,
                  value: 'departure',
                  label: t('common.cash'),
                },
                {
                  index: 4,
                  value: 'canceled',
                  label: 'Visa',
                },
              ]}
              mode="multiple"
              placeholder={t('fields.booking-balance.placeholder')}
              optionRender={(props: any) => {
                return (
                  <div className="flex gap-4 items-center">
                    {/* {circleColor(props.label)} */}
                    <span className="font-medium">{props.label}</span>
                  </div>
                )
              }}
              menuItemSelectedIcon={({ isSelected }: any) =>
                isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
              }
              // tagRender={(props: any) => {
              //   return (
              //     <div className="flex gap-4 items-center">
              //       {/* {circleColor(props.label)} */}
              //     </div>
              //   )
              // }}
            />
          </Form.Item>
          <Form.Item
            label={t('fields.group.label')}
            className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full "
          >
            <Switch content="yesno" />
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}

export default BookingBalancesFilters
