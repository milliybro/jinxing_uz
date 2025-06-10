import { useQuery } from '@tanstack/react-query'
import { DatePicker, Form, Input, Select } from 'antd'
import dayjs from 'dayjs'
import queryString from 'query-string'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// import CheckObjectProperty from '@/helpers/check-object-property'
import { getOrderTypes, getOrdersList } from '../api'

import CSelect from '@/components/cselect'
import CalendarIcon from '@/components/icons/calendar'
import CheckmarkIcon from '@/components/icons/checkmark'
import CircleIcon from '@/components/icons/circle'
import FileDownloadIcon from '@/components/icons/file-download'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
// import FlowConnectionIcon from '@/components/icons/flow-connection'
import PasswordValidationIcon from '@/components/icons/password-validation'
import { useBranchIdStore } from '@/store/branch-id-store'
import { useTranslation } from 'react-i18next'
import ArrowDownIcon from '@/components/icons/arrow-down'

const circleColor = (value: string) => {
  return (
    <CircleIcon
      className={
        value === 'reside'
          ? 'text-warn'
          : value === 'arrival' || value === 'pre_booked'
          ? 'text-primary'
          : value === 'departure' || value === 'canceled'
          ? 'text-danger'
          : 'text-secondary/50'
      }
    />
  )
}

const TransactionsFilters = () => {
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

  // const { data: salesSources } = useQuery({
  //   queryKey: ['sales-sources'],
  //   queryFn: async () => {
  //     const res = await getSalesSources()
  //     return res
  //   },
  // })

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
        <div className="grid grid-cols-5 gap-6 mb-6">
          <Form.Item label={t('fields.order.label')} name="order">
            <Input.Group compact className="flex items-center">
              <Select
                suffixIcon={<ArrowDownIcon className="text-black" />}
                defaultValue="guest"
                options={[
                  { value: 'staff', label: t('common.staff') },
                  { value: 'guest', label: t('common.guests') },
                ]}
                style={{ width: '35%' }}
                size="large"
                className="relative"
                labelRender={(props) => (
                  <div className="text-sm">{props.label}</div>
                )}
              />
              <Select
                size="large"
                allowClear
                notFoundContent={null}
                suffixIcon={null}
                showSearch
                defaultActiveFirstOption={false}
                options={ordersList?.results.map((val) => ({
                  label: val.id,
                  value: `${val.id}`,
                }))}
                placeholder={t('fields.order.placeholder')}
                className="[&>.ant-select-selector]:px-4 p-0"
                style={{ width: '65%' }}
              />
            </Input.Group>
          </Form.Item>
          <Form.Item
            label={t('booking-page.start_date.label')}
            name="start_date"
            className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          >
            <DatePicker
              inputReadOnly
              placeholder={t('booking-page.start_date.placeholder')}
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
          <Form.Item label={t('booking-page.end_date.label')} name="end_date">
            <DatePicker
              inputReadOnly
              placeholder={t('booking-page.start_date.placeholder')}
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
                  label: t('common.arrival'),
                },
                {
                  index: 2,
                  value: 'reside',
                  label: t('common.reside'),
                },
                {
                  index: 3,
                  value: 'departure',
                  label: t('common.check-out'),
                },
                {
                  index: 4,
                  value: 'canceled',
                  label: t('common.canceled'),
                },
              ]}
              mode="multiple"
              placeholder={t('all-rooms.filter.status.placeholder')}
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
                  <div className="flex gap-2 items-center me-4">
                    {circleColor(props.value)}
                    <span className="font-medium">{props.label}</span>
                  </div>
                )
              }}
            />
          </Form.Item>
          <Form.Item label={t('fields.arrival-type.label')} name="order_type">
            <CSelect
              size="large"
              placeholder={t('fields.arrival-type.placeholder')}
              allowClear
              prefixIcon={
                <PasswordValidationIcon className="text-success-dark text-base" />
              }
              notFoundContent={null}
              defaultActiveFirstOption={false}
              popupClassName="w-fit"
              options={orderTypes?.results.map((val, i) => ({
                label: val.name,
                value: `${val.external_id + i}`,
              }))}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Form.Item
            label={t('fields.transaction-type.label')}
            name="order_type"
          >
            <CSelect
              size="large"
              placeholder={t('fields.arrival-type.placeholder')}
              allowClear
              prefixIcon={
                <PasswordValidationIcon className="text-success-dark text-base" />
              }
              notFoundContent={null}
              defaultActiveFirstOption={false}
              popupClassName="w-fit"
              options={orderTypes?.results.map((val, i) => ({
                label: val.name,
                value: `${val.external_id + i}`,
              }))}
            />
          </Form.Item>
          <Form.Item
            label={t('fields.transaction-status.label')}
            name="statuses"
          >
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
                  label: t('common.arrival'),
                },
                {
                  index: 2,
                  value: 'reside',
                  label: t('common.reside'),
                },
                {
                  index: 3,
                  value: 'departure',
                  label: t('common.check-out'),
                },
                {
                  index: 4,
                  value: 'canceled',
                  label: t('common.canceled'),
                },
              ]}
              mode="multiple"
              placeholder={t('fields.payment_status.placeholder')}
              optionRender={(props: any) => {
                return (
                  <div className="flex gap-4 items-center">
                    {circleColor(props.label)}
                    <span className="font-medium">{props.label}</span>
                  </div>
                )
              }}
              menuItemSelectedIcon={({ isSelected }: any) =>
                isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
              }
              tagRender={(props: any) => {
                return (
                  <div className="flex gap-2 items-center me-4">
                    {circleColor(props.label)}
                    <span className="font-medium">{props.label}</span>
                  </div>
                )
              }}
            />
          </Form.Item>
          <Form.Item label={t('fields.payment-type.label')} name="payment">
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
                    {circleColor(props.value)}
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
              //       {/* {circleColor(props.label)}
              //     </div>
              //   )
              // }}
            />
          </Form.Item>
          <Form.Item
            label={t('fields.goods-and-services.label')}
            name="product"
          >
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
              placeholder={t('fields.goods-and-services.placeholder')}
              optionRender={(props: any) => {
                return (
                  <div className="flex gap-4 items-center">
                    {circleColor(props.label)}
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
        </div>
      </div>
    </Form>
  )
}

export default TransactionsFilters
