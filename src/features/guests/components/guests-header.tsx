import dayjs from 'dayjs'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'
import { DatePicker, Form, Input } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { useGuestsContext } from '../context'

import CSelect from '@/components/cselect'

import SearchIcon from '@/components/icons/search'
import LocationIcon from '@/components/icons/location'
import CalendarIcon from '@/components/icons/calendar'
import CheckmarkIcon from '@/components/icons/checkmark'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import PasswordValidationIcon from '@/components/icons/password-validation'

import 'dayjs/locale/ru'
import { useMemo } from 'react'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letters'

const GuestsHeader = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = useMemo(() => queryString.parse(restQueries), [restQueries])

  const { countries, form, countrySearch, setCountrySearch } =
    useGuestsContext()

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
      <Form.Item label={t('fields.guest.label')} name="search">
        <Input
          size="large"
          placeholder={t('fields.guest.placeholder')}
          prefix={<SearchIcon className="text-success-dark text-base mr-1" />}
        />
      </Form.Item>

      <Form.Item label={t('guests-page.statuses.label')} name="statuses">
        <CSelect
          size="large"
          placeholder={t('guests-page.statuses.placeholder')}
          prefixIcon={
            <PasswordValidationIcon className="text-success-dark text-base" />
          }
          mode="multiple"
          showSearch={false}
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
          optionRender={(props: any) => {
            return <span className="font-medium">{props.label}</span>
          }}
          menuItemSelectedIcon={({ isSelected }: any) =>
            isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
          }
          tagRender={(props: any) => (
            <div>
              <span className="text-xs leading-3 flex gap-3">
                {props.label}
              </span>
            </div>
          )}
        />
      </Form.Item>
      <Form.Item label={t('guests-page.countries.label')} name="country">
        <CSelect
          size="large"
          mode="multiple"
          placeholder={t('guests-page.countries.placeholder')}
          prefix={
            <LocationIcon className="text-success-dark text-base relative -left-2" />
          }
          allowClear
          options={countries?.data?.results.map((val, i) => ({
            label: capitalizeFirstLetters(val?.name),
            value: val?.id,
            key: i,
          }))}
          showSearch
          filterOption={false}
          searchValue={countrySearch}
          onSearch={setCountrySearch}
          loading={countries.isFetching}
        />
      </Form.Item>
      <Form.Item
        label={t('common.check-in-date')}
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
        name="start_date"
      >
        <DatePicker
          inputReadOnly
          placeholder={t('common.enter-a-date')}
          size="large"
          className="px-4 w-full h-[47px]"
          showNow={false}
          superPrevIcon={null}
          superNextIcon={null}
          suffixIcon={<CalendarIcon className="text-success-dark text-base" />}
        />
      </Form.Item>
      <Form.Item
        label={t('common.check-out-date')}
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
        name="end_date"
      >
        <DatePicker
          inputReadOnly
          placeholder={t('common.enter-a-date')}
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
    </Form>
  )
}

export default GuestsHeader
