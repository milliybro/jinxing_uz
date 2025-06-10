import dayjs from 'dayjs'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'
import { DatePicker, Form, Select } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { useBookingContext } from '../context'

import CSelect from '@/components/cselect'

import CircleIcon from '@/components/icons/circle'
import SearchIcon from '@/components/icons/search'
import CalendarIcon from '@/components/icons/calendar'
import CheckmarkIcon from '@/components/icons/checkmark'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import FileDownloadIcon from '@/components/icons/file-download'
// import FlowConnectionIcon from '@/components/icons/flow-connection'
import PasswordValidationIcon from '@/components/icons/password-validation'

const circleColor = (value: string) => {
  return (
    <CircleIcon
      className={
        value === 'reside'
          ? 'text-warn'
          : value === 'confirmed' || value === 'arrival'
          ? 'text-primary'
          : value === 'departure' || value === 'cancelled'
          ? 'text-danger'
          : 'text-secondary/50'
      }
    />
  )
}

const BookingsFilters = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)

  const { orderTypes, ordersList, form } = useBookingContext()

  // const { data: salesSources } = useQuery({
  //   queryKey: ['sales-sources'],
  //   queryFn: async () => {
  //     const res = await getSalesSources()
  //     return res
  //   },
  // })

  // the effect below breaks the end_date field
  // useEffect(() => {
  //   form.resetFields()
  // }, [queries])

  const fieldChangeHandler = ([changedField]: any) => {
    const fieldName = changedField?.name?.[0]
    const fieldValue = changedField?.value

    if (!fieldName) return

    const isDateField = ['start_date', 'end_date'].includes(fieldName)
    const value = fieldValue
      ? isDateField
        ? dayjs(fieldValue).format('YYYY-MM-DD')
        : fieldValue
      : undefined

    const search = queryString.stringify({
      ...queries,
      page: 1,
      [fieldName]: value,
    })

    navigate({ pathname, search })
  }

  const initialValues = {
    ...queries,
    start_date: queries.start_date
      ? dayjs(queries.start_date as string)
      : undefined,
    end_date: queries.end_date ? dayjs(queries.end_date as string) : undefined,
  }

  return (
    <Form
      form={form}
      layout="vertical"
      className="grid grid-cols-5 gap-6 mb-6"
      onFieldsChange={fieldChangeHandler}
      initialValues={initialValues}
    >
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
          options={ordersList?.data?.results.map((val) => ({
            label: val.id,
            value: `${val.id}`,
          }))}
          placeholder={t('fields.order.placeholder')}
          className="[&>.ant-select-selector]:px-4 custom-ant-select-move-icon"
        />
      </Form.Item>
      <Form.Item label={t('booking-page.room.label')} name="category__key">
        <CSelect
          size="large"
          placeholder={t('booking-page.room.placeholder')}
          allowClear
          prefixIcon={
            <PasswordValidationIcon className="text-success-dark text-base" />
          }
          notFoundContent={null}
          defaultActiveFirstOption={false}
          // popupClassName="w-full"
          options={orderTypes?.data?.results.map((val) => ({
            label:
              val.key === 'granted'
                ? t('common.granted')
                : val.key === 'not_granted'
                ? t('common.not-granted')
                : val.name,
            value: `${val.id}`,
          }))}
        />
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
          suffixIcon={<CalendarIcon className="text-success-dark text-base" />}
          onChange={(value) => {
            const endDate = form.getFieldValue('end_date')
            if (endDate && value && dayjs(endDate).isBefore(value)) {
              form.setFieldsValue({ end_date: value, start_date: endDate })
            }
          }}
        />
      </Form.Item>
      <Form.Item
        label={t('booking-page.end_date.label')}
        name="end_date"
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
        rules={[
          {
            validator: async (_, value) => {
              const startDate = form.getFieldValue('start_date')
              if (startDate && value && dayjs(value).isBefore(startDate)) {
                throw new Error(t('booking-page.end_date.rule'))
              }
            },
          },
        ]}
      >
        <DatePicker
          inputReadOnly
          placeholder={t('booking-page.end_date.placeholder')}
          size="large"
          className="px-4 w-full h-[47px]"
          showNow={false}
          superPrevIcon={null}
          superNextIcon={null}
          suffixIcon={<CalendarIcon className="text-success-dark text-base" />}
          disabledDate={(currentDate) => {
            const startDate = form.getFieldValue('start_date')
            return (
              startDate && currentDate && currentDate.isBefore(startDate, 'day')
            )
          }}
        />
      </Form.Item>
      <Form.Item label={t('booking-page.statuses.label')} name="statuses">
        <CSelect
          size="large"
          allowClear
          showSearch={false}
          prefixIcon={
            <FileDownloadIcon className="text-success-dark text-base" />
          }
          options={[
            {
              index: 1,
              value: 'reside',
              label: t('common.in-room'),
            },
            {
              index: 2,
              value: 'arrival',
              label: t('common.confirmed'),
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
          placeholder={t('room-cleaning-page.statuses.placeholder')}
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
              <div className="flex gap-1 items-center mr-2">
                {circleColor(props.value)}
                {props.label}
              </div>
            )
          }}
        />
      </Form.Item>
      {/* <Form.Item label={t('booking-page.sources.label')} name="sources">
        <CSelect
          prefixIcon={
            <FlowConnectionIcon className="text-success-dark text-base" />
          }
          placeholder={t('booking-page.sources.placeholder')}
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
      </Form.Item> */}
    </Form>
  )
}

export default BookingsFilters
