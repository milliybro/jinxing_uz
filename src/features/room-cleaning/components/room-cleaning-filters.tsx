import dayjs from 'dayjs'
import { Form, Select } from 'antd'
import { useEffect } from 'react'
import queryString from 'query-string'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

// import CheckObjectProperty from '@/helpers/check-object-property'
import { getOrderTypes, getOrdersList, getSalesSources } from '../api'

import CSelect from '@/components/cselect'
import CircleIcon from '@/components/icons/circle'
import CheckmarkIcon from '@/components/icons/checkmark'
import BedDoubleIcon from '@/components/icons/bed-double'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import FileDownloadIcon from '@/components/icons/file-download'
import FileVerifiedIcon from '@/components/icons/file-verified'
import CleaningBucketIcon from '@/components/icons/cleaning-bucket'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'
import { getRoomsList, getStaff } from '@/api'

const circleColor = (value: string) => {
  return (
    <CircleIcon
      className={
        value === 'reside'
          ? 'text-warn'
          : value === 'arrival'
          ? 'text-primary'
          : value === 'Выехал' || value === 'cancelled'
          ? 'text-danger'
          : 'text-secondary/50'
      }
    />
  )
}

const RoomCleaningFilters = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
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

  const { data: roomsList } = useQuery({
    queryKey: ['room-types'],
    queryFn: () => {
      return getRoomsList({ branch })
    },
    select: (data) =>
      data.results.map((val) => ({
        label: val.name,
        value: '' + val.id,
      })),
  })

  const { data: staffList } = useQuery({
    queryKey: ['staff-list'],
    queryFn: () => getStaff({ status: true }),
    select: (data) =>
      data.results.map((staff) => ({
        label: staff.first_name,
        value: '' + staff.id,
      })),
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
        label={t('room-cleaning-page.room_type.label')}
        name="room_item__room"
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
        // rules={[{ required: true, message: 'Пожалуйста, введите!' }]}
      >
        <CSelect
          size="large"
          placeholder={t('room-cleaning-page.room_type.placeholder')}
          prefixIcon={<BedDoubleIcon className="text-success-dark" />}
          allowClear
          options={roomsList}
          // labelRender={(props) => {
          //   return <div>{props.label}</div>
          // }}
        />
      </Form.Item>
      <Form.Item
        label={t('room-cleaning-page.statuses.label')}
        name="order_status"
      >
        <CSelect
          size="large"
          // className="[&>.ant-select-selection-overflow]:flex-nowrap"
          allowClear
          showSearch={false}
          prefixIcon={
            <FileDownloadIcon className="text-success-dark text-base" />
          }
          options={[
            {
              index: 1,
              value: 'arrival',
              label: t('common.confirmed'),
            },
            {
              index: 2,
              value: 'reside',
              label: t('common.reside'),
            },
            {
              index: 3,
              value: 'departure',
              label: t('common.departure'),
            },
            {
              index: 4,
              value: 'cancelled',
              label: t('common.cancelled'),
            },
          ]}
          mode="multiple"
          placeholder={t('room-cleaning-page.statuses.placeholder')}
          optionRender={(props) => {
            return (
              <div className="flex gap-4 items-center">
                {circleColor(props?.value as string)}
                <span className="font-medium">{props.label}</span>
              </div>
            )
          }}
          menuItemSelectedIcon={({ isSelected }: any) =>
            isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
          }
          tagRender={(props: any) => {
            return (
              <div className="flex gap-2 items-center">
                {circleColor(props.value)}
                {props.label}
              </div>
            )
          }}
        />
      </Form.Item>

      <Form.Item
        label={t('room-cleaning-page.order_type.label')}
        name="cleaner"
      >
        <CSelect
          size="large"
          placeholder={t('room-cleaning-page.order_type.placeholder')}
          allowClear
          prefixIcon={
            <CleaningBucketIcon className="text-success-dark text-base" />
          }
          notFoundContent={null}
          defaultActiveFirstOption={false}
          options={staffList}
        />
      </Form.Item>

      <Form.Item label={t('room-cleaning-page.state.label')} name="room_clean">
        <CSelect
          size="large"
          placeholder={t('room-cleaning-page.state.placeholder')}
          allowClear
          prefixIcon={<BedDoubleIcon className="text-success-dark text-base" />}
          notFoundContent={null}
          defaultActiveFirstOption={false}
          options={[
            { label: t('common.clean'), value: 'true' },
            { label: t('common.unclean'), value: 'false' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label={t('room-cleaning-page.number_status.label')}
        name="room_free"
      >
        <CSelect
          prefixIcon={
            <FileVerifiedIcon className="text-success-dark text-base" />
          }
          placeholder={t('room-cleaning-page.number_status.placeholder')}
          size="large"
          allowClear
          showSearch={false}
          options={[
            {
              label: t('common.active'),
              value: 'true',
            },
            {
              label: t('common.inactive'),
              value: 'false',
            },
          ]}
        />
      </Form.Item>
    </Form>
  )
}

export default RoomCleaningFilters
