import { useQuery } from '@tanstack/react-query'
import { DatePicker, Form } from 'antd'
import dayjs from 'dayjs'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'

import 'dayjs/locale/ru'

import CSelect from '@/components/cselect'
import BedDoubleIcon from '@/components/icons/bed-double'
import CheckmarkIcon from '@/components/icons/checkmark'
import PasswordValidationIcon from '@/components/icons/password-validation'
import SearchIcon from '@/components/icons/search'
import UncheckmarkIcon from '@/components/icons/uncheckmark'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getGuestsList,
  getOrderPaymentStatus,
  getPlacementRooms,
  getSalesSources,
} from '../api'
import { useBranchIdStore } from '@/store/branch-id-store'

const CalendarHeader = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const [search, setSearch] = useState('')
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const { data: status } = useQuery({
    queryKey: ['order-payment-status'],
    queryFn: async () => {
      const res = await getOrderPaymentStatus({ branch })
      return res
    },
  })

  const { data: roomTypes } = useQuery({
    queryKey: ['placement-rooms-types'],
    queryFn: async () => {
      const res = await getPlacementRooms({ branch })
      return res
    },
  })

  const { data: sources } = useQuery({
    queryKey: ['sales-rooms-sources'],
    queryFn: async () => {
      const res = await getSalesSources()
      return res
    },
  })

  const { data: guests, refetch } = useQuery({
    queryKey: ['search-guests-list', search],
    queryFn: async () => {
      const res = await getGuestsList({ search, branch })
      return res
    },
    cacheTime: 0,
    enabled: false,
  })

  useEffect(() => {
    refetch()
  }, [search, refetch])

  return (
    <Form
      form={form}
      layout="vertical"
      onFieldsChange={(changedFields) => {
        const field = changedFields?.[0]
        if (!field) return

        const updatedQueries = { ...queries }

        if (field.name?.[0] === 'current_date') {
          const [startDate, endDate] = field.value || []
          updatedQueries['start_date'] = startDate
            ? dayjs(startDate).format('YYYY-MM-DD')
            : null
          updatedQueries['end_date'] = endDate
            ? dayjs(endDate).format('YYYY-MM-DD')
            : null
        } else {
          // Boshqa holatlar uchun oddiy ishlov beriladi
          updatedQueries[field.name?.[0]] =
            field.value &&
            (field.name?.[0] === 'start_date' || field.name?.[0] === 'end_date')
              ? dayjs(field.value).format('YYYY-MM-DD')
              : field.value || undefined
        }

        const search = queryString.stringify(updatedQueries)
        navigate({ pathname, search })
      }}
      className="grid grid-cols-4 gap-6 mb-6"
      initialValues={{
        ...queries,
      }}
    >
      <Form.Item label={t('fields.guest.label')} name="guest">
        <CSelect
          size="large"
          allowClear
          showSearch
          filterOption={false}
          placeholder={t('fields.guest.placeholder')}
          onSearch={(val) => setSearch(val)}
          onChange={(val, option: any) => {
            if (!val) {
              setSearch('')
            } else {
              setSearch(option?.label || '')
            }
          }}
          suffixIcon={''}
          prefixIcon={<SearchIcon className="text-success-dark " />}
          options={(guests?.results || []).map((val) => ({
            label: `${val.first_name} ${val.last_name}`,
            value: val.id,
          }))}
        />
      </Form.Item>

      <Form.Item label={t('fields.payment_status.label')} name="payment_status">
        <CSelect
          allowClear
          size="large"
          placeholder={t('fields.payment_status.placeholder')}
          prefixIcon={
            <PasswordValidationIcon className="text-success-dark text-base" />
          }
          mode="multiple"
          showSearch={false}
          options={status?.map((val) => {
            let translatedLabel

            if (val.name === 'Not Paid') {
              translatedLabel = t('common.not_paid')
            } else if (val.name === 'Half Paid') {
              translatedLabel = t('common.half_paid')
            } else if (val.name === 'Paid') {
              translatedLabel = t('common.paid')
            } else {
              translatedLabel = val.name
            }

            return {
              label: translatedLabel,
              value: `${val.id}`,
            }
          })}
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
      <Form.Item label={t('fields.room.label')} name="room">
        <CSelect
          allowClear
          size="large"
          placeholder={t('fields.room.label')}
          prefixIcon={<BedDoubleIcon className="text-success-dark text-base" />}
          options={roomTypes?.results.map((val) => ({
            value: `${val.id}`,
            label: val.description,
            short_label: val.name,
          }))}
          optionRender={(props: any) => {
            return (
              <div className="flex items-center">
                <div className="font-medium w-[220px]">
                  {props.data.short_label}
                </div>
                <div className="font-medium text truncate text-xs text-secondary w-full">
                  {props.label}
                </div>
              </div>
            )
          }}
          tagRender={(props: any) => (
            <div>
              <span className="text-xs leading-3">{props.value}</span>
            </div>
          )}
        />
      </Form.Item>
      {/* <Form.Item label={t('fields.sources.label')} name="sources">
        <CSelect
          allowClear
          size="large"
          placeholder={t('fields.sources.placeholder')}
          prefixIcon={
            <FlowConnectionIcon className="text-success-dark text-base" />
          }
          mode="multiple"
          showSearch={false}
          options={sources?.results.map((val) => ({
            label: val.name,
            value: `${val.id}`,
          }))}
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
      <Form.Item name="current_date" label={t('fields.current_date.label')}>
        <DatePicker.RangePicker
          size="large"
          placeholder={[t('fields.current_date.placeholder'), '']}
          className="hide-range-second-input h-[47px] w-full"
        />
      </Form.Item>
    </Form>
  )
}

export default CalendarHeader
