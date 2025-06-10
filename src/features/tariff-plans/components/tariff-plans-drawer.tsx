import dayjs from 'dayjs'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'
import { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  App,
  Button,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Typography,
} from 'antd'

import {
  getActiveServicesList,
  getMealsList,
  getTariffPlan,
  postAddTariffPlan,
  updateTariffPlan,
} from '../api'
import { getRoomsList } from '@/api'

import queryClient from '@/utils/query-client'

import CSelect from '@/components/cselect'
import CloseIcon from '@/components/icons/close'
import CalendarIcon from '@/components/icons/calendar'
import CheckmarkIcon from '@/components/icons/checkmark'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'

import type { IAddTariffProps } from '../types'
import type { Dispatch, FC, SetStateAction } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useBranchIdStore } from '@/store/branch-id-store'

interface IProps {
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  refetch: () => void
  fetched: () => void
}

const TariffPlansDrawer: FC<IProps> = ({
  openDrawer,
  setOpenDrawer,
  refetch,
  fetched,
}) => {
  const { search } = useLocation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const [minDayValue, setMinDayValue] = useState(false)
  const [roomTypeValue, setRoomTypeValue] = useState(false)
  const { t } = useTranslation()

  const { branch } = useBranchIdStore()

  const onRoomChange = (e: RadioChangeEvent) => {
    setRoomTypeValue(e.target.value)
  }

  const onDaysChange = (e: RadioChangeEvent) => {
    setMinDayValue(e.target.value)
  }

  const isEditing = queryString.parse(search)?.edit

  const showDrawer = () => {
    setOpenDrawer((prev) => {
      if (prev) {
        form.resetFields()
        navigate('/tariff-plans', { replace: true })
      }

      return !prev
    })
  }

  const openNotification = () => {
    notification.info({
      closeIcon: null,
      className:
        'w-[406px] border-t-[5px] border-primary rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
      icon: <CheckmarkCircleIcon className="text-[24px] text-primary" />,
      message: (
        <Typography.Text className="text-[18px] font-semibold leading-[22.95px]">
          {isEditing
            ? t('common.successfully-changed')
            : t('common.successfully-added')}
        </Typography.Text>
      ),
      placement: 'topRight',
      description: (
        <div>
          <Button
            size="small"
            type="text"
            className="grid place-items-center rounded-lg absolute right-[10px] top-[10px]"
            icon={<CloseIcon className="text-base" />}
            onClick={() => notification.destroy()}
          />
          <Typography.Text className="text-secondary text-base">
            {t('common.new-tariff-plan-added')}
          </Typography.Text>
        </div>
      ),
    })
  }

  const errorNotification = (desc?: string) => {
    notification.info({
      closeIcon: null,
      className:
        'w-[406px] border-t-[5px] border-danger rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
      icon: <CloseCircleOutlined className="text-[24px] text-danger" />,
      message: (
        <Typography.Text className="text-[18px] font-semibold leading-[22.95px]">
          {t('common.error')}
        </Typography.Text>
      ),
      placement: 'topRight',
      description: (
        <div>
          <Button
            size="small"
            type="text"
            className="grid place-items-center rounded-lg absolute right-[10px] top-[10px]"
            icon={<CloseIcon className="text-base" />}
            onClick={() => notification.destroy()}
          />
          <Typography.Text className="text-secondary text-base">
            {desc}
          </Typography.Text>
        </div>
      ),
    })
  }

  const { data: mealsData } = useQuery({
    queryKey: ['meals-list-r'],
    queryFn: async () => {
      const res = await getMealsList({ branch })
      return res
    },
  })

  const { data: servicesList, isLoading: servicesLoading } = useQuery({
    queryKey: ['services-list-r'],
    queryFn: async () => {
      const res = await getActiveServicesList({ branch })
      return res
    },
  })

  const { data: roomsList, isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms-list-r'],
    queryFn: async () => {
      const res = await getRoomsList({ branch })
      return res
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: any) => {
      const formattedValues: IAddTariffProps & { branch: number } = {
        ...values,
        end_date: dayjs(values.end_date).format('YYYY-MM-DD'),
        translations: {
          en: { name: values.name },
          ru: { name: values.name },
          'uz-latin': { name: values.name },
          'uz-cyrillic': { name: values.name },
        },
        branch,
      }

      if (search.includes('edit')) {
        return updateTariffPlan(
          formattedValues,
          queryString.parse(search)?.edit as any,
        )
      }

      return postAddTariffPlan(formattedValues)
    },
    onSuccess: () => {
      form.resetFields()
      showDrawer()
      openNotification()
      queryClient.invalidateQueries(['tariff-plans-r-tariff'])
      fetched()
      refetch()
    },
    onError: () => {
      form.getFieldsError()
      // console.log('error', error)
      // errorNotification(error?.data?.rooms)
    },
  })

  const { data: singleTariff } = useQuery({
    queryKey: ['tariff-plans-single-r-tariff', queryString.parse(search)?.edit],
    queryFn: async () => {
      const res = await getTariffPlan(
        queryString.parse(search)?.edit as any,
        branch,
      )

      return res as any
    },
    enabled: search.includes('edit') && openDrawer,
  })

  useEffect(() => {
    if (openDrawer && singleTariff && search.includes('edit')) {
      form.setFieldsValue({
        ...singleTariff,
        end_date: dayjs(singleTariff.end_date),
        rooms: singleTariff.rooms.map((val: any) => `${val.id}`),
        meals: singleTariff.meals.map((val: any) => `${val.id}`),
        services: singleTariff.services.map((val: any) => `${val.id}`),
      })
    }

    if (openDrawer && !search.includes('edit')) {
      form.resetFields()
    }
  }, [search, singleTariff])

  return (
    <Drawer
      width={581}
      closeIcon={null}
      footer={
        <div className="flex justify-end gap-4">
          <Button
            className="text-primary-dark dark:text-white font-semibold"
            onClick={showDrawer}
          >
            {t('common.cancel')}
          </Button>
          <Button
            htmlType="submit"
            className="bg-primary text-white font-semibold"
            form="add-room-form"
            loading={isLoading}
          >
            {t('common.save')}
          </Button>
        </div>
      }
      title={
        <div className="flex w-full items-center justify-between">
          <span className="text-[18px] font-medium">
            {isEditing ? t('common.edit-tariff') : t('common.new-tariff')}
          </span>
          <Button
            shape="circle"
            type="text"
            className="flex items-center justify-center"
            onClick={showDrawer}
            icon={<CloseIcon className="text-base" />}
          />
        </div>
      }
      onClose={showDrawer}
      open={openDrawer}
    >
      <Form
        form={form}
        id="add-room-form"
        onFinish={mutate}
        layout="vertical"
        className="flex flex-col gap-6 [&_.ant-form-item-required]:before:hidden"
        initialValues={{
          include_food: false,
          min_stay: false,
        }}
      >
        <Form.Item
          label={
            <span className="text-base font-medium">
              1 . {t('tariff-plans-page.name.label')}
            </span>
          }
          name="name"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
        >
          <Input
            size="large"
            className="shadow-sm"
            placeholder={t('tariff-plans-page.name.placeholder')}
          />
        </Form.Item>
        <Divider className="m-0" />
        <Form.Item
          label={
            <span className="text-base font-medium">
              2 . {t('tariff-plans-page.price.label')}
            </span>
          }
          name="price"
          className=""
          rules={[
            { required: true, message: t('tariff-plans-page.price.rule') },
          ]}
        >
          <InputNumber
            size="large"
            controls={false}
            className="shadow-sm w-full"
            suffix={<span className="text-secondary text-xs">UZS</span>}
            placeholder={t('tariff-plans-page.price.placeholder')}
          />
        </Form.Item>
        <Divider className="m-0" />
        <Form.Item
          label={
            <span className="text-base font-medium">
              3 . {t('tariff-plans-page.end_date.label')}
            </span>
          }
          name="end_date"
          className=""
          rules={[
            { required: true, message: t('tariff-plans-page.end_date.rule') },
          ]}
        >
          <DatePicker
            size="large"
            className="w-full"
            placeholder={t('tariff-plans-page.end_date.placeholder')}
            suffixIcon={
              <CalendarIcon className="text-[16px] text-success-dark" />
            }
          />
        </Form.Item>
        <Divider className="m-0" />
        <Form.Item
          label={
            <span className="text-base font-medium">
              4 . {t('tariff-plans-page.meals_included.label')}
            </span>
          }
          name="meals_included"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            {
              required: true,
              message: t('tariff-plans-page.meals_included.rule'),
            },
          ]}
        >
          <Radio.Group onChange={onRoomChange} value={roomTypeValue}>
            <Radio value={true}>{t('common.yes')}</Radio>
            <Radio value={false}>{t('common.no')}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.meals_included !== currentValues.meals_included
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('meals_included') === true ? (
              <Form.Item
                label={
                  <span className="text-base font-medium">
                    {t('tariff-plans-page.meals.label')}
                  </span>
                }
                name="meals"
                className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
                rules={[
                  {
                    required: true,
                    message: t('tariff-plans-page.meals.rule'),
                  },
                ]}
              >
                <CSelect
                  size="large"
                  placeholder={t('tariff-plans-page.meals.placeholder')}
                  mode="multiple"
                  showSearch={false}
                  loading={servicesLoading}
                  menuItemSelectedIcon={({ isSelected }: any) =>
                    isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
                  }
                  options={mealsData?.results.map((val) => ({
                    label: val.name,
                    value: `${val.id}`,
                  }))}
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Divider className="m-0" />
        <Form.Item
          label={
            <span className="text-base font-medium">
              5 . {t('tariff-plans-page.services.label')}
            </span>
          }
          name="services"
          className=""
          rules={[
            { required: true, message: t('tariff-plans-page.services.rule') },
          ]}
        >
          <CSelect
            size="large"
            placeholder={t('tariff-plans-page.services.placeholder')}
            mode="multiple"
            showSearch={false}
            loading={servicesLoading}
            menuItemSelectedIcon={({ isSelected }: any) =>
              isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
            }
            options={servicesList?.results.map((val) => ({
              label: val.name,
              value: `${val.id}`,
            }))}
          />
        </Form.Item>
        <Divider className="m-0" />
        <Form.Item
          label={
            <span className="text-base font-medium">
              6 . {t('tariff-plans-page.rooms.label')}
            </span>
          }
          name="rooms"
          className=""
          rules={[
            { required: true, message: t('tariff-plans-page.rooms.rule') },
          ]}
        >
          <CSelect
            size="large"
            placeholder={t('tariff-plans-page.rooms.placeholder')}
            mode="multiple"
            loading={roomsLoading}
            showSearch={false}
            menuItemSelectedIcon={({ isSelected }: any) =>
              isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
            }
            options={roomsList?.results.map((val) => ({
              label: val.name,
              value: `${val.id}`,
            }))}
          />
        </Form.Item>
        <Divider className="m-0" />
        <Form.Item
          label={
            <div className="flex flex-col">
              <span className="text-base font-medium">
                7 . {t('tariff-plans-page.has_min_stay_nights.label')}
              </span>
              <span className="text-sm font-medium text-secondary">
                {t('tariff-plans-page.has_min_stay_nights.label-info')}
              </span>
            </div>
          }
          name="has_min_stay_nights"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            {
              required: true,
              message: t('tariff-plans-page.has_min_stay_nights.rule'),
            },
          ]}
        >
          <Radio.Group value={minDayValue} onChange={onDaysChange}>
            <Radio value={true}>{t('common.yes')}</Radio>
            <Radio value={false}>{t('common.no')}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.has_min_stay_nights !== currentValues.has_min_stay_nights
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('has_min_stay_nights') === true ? (
              <Form.Item
                name="min_stay_nights"
                className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
                rules={[
                  {
                    required: true,
                    message: t('tariff-plans-page.min_stay_nights.rule'),
                  },
                ]}
              >
                <InputNumber
                  controls={false}
                  suffix={
                    <span className="text-[#D1D5DB]">
                      {t('tariff-plans-page.min_stay_nights.suffix')}
                    </span>
                  }
                  size="large"
                  className="max-w-[295px] w-full"
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Divider className="m-0" />

        <Form.Item
          label={
            <div className="flex flex-col">
              <span className="text-base font-medium">
                8 . {t('tariff-plans-page.has_order_advance_days.label')}
              </span>
              <span className="text-sm font-medium text-secondary">
                {t('tariff-plans-page.has_order_advance_days.label-info')}
              </span>
            </div>
          }
          name="has_order_advance_days"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            {
              required: true,
              message: t('tariff-plans-page.has_order_advance_days.rule'),
            },
          ]}
        >
          <Radio.Group className="flex flex-col gap-3 mt-2">
            <Radio value={true}>
              {t('tariff-plans-page.has_order_advance_days.true')}
            </Radio>
            <Radio value={false}>
              {t('tariff-plans-page.has_order_advance_days.false')}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.has_order_advance_days !==
            currentValues.has_order_advance_days
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('has_order_advance_days') === true ? (
              <Form.Item
                name="order_advance_days"
                className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
                rules={[
                  {
                    required: true,
                    message: t('tariff-plans-page.has_order_advance_days.rule'),
                  },
                ]}
              >
                <InputNumber
                  controls={false}
                  suffix={
                    <span className="text-[#D1D5DB]">{t('common.day')}</span>
                  }
                  size="large"
                  className="max-w-[295px] w-full"
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Divider className="m-0" />
        <div>
          <Form.Item
            label={
              <div className="flex flex-col">
                <span className="text-base font-medium">
                  9 . {t('tariff-plans-page.national-turism.title')}
                </span>
                <span className="text-sm font-medium text-secondary">
                  {t('tariff-plans-page.national-turism.description')}
                </span>
              </div>
            }
            name="for_mturizm"
            // rules={[{ required: true, message: 'Пожалуйста, введите!' }]}
          >
            <Radio.Group>
              <Radio value={true}>{t('common.yes')}</Radio>
              <Radio value={false}>{t('common.no')}</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item
            name="contr-agents-select"
            // rules={[{ required: true, message: 'Пожалуйста, введите!' }]}
          >
            <CSelect
              size="large"
              placeholder={t(
                'tariff-plans-page.contr-agents-select.placeholder',
              )}
              mode="multiple"
              showSearch={false}
              menuItemSelectedIcon={({ isSelected }: any) =>
                isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
              }
              options={[
                {
                  value: 'Выбрать все',
                  label: 'Выбрать все',
                },
                {
                  value: 'Sogda Travel',
                  label: 'Sogda Travel',
                },
                {
                  value: 'Booking.com',
                  label: 'Booking.com',
                },
              ]}
            />
          </Form.Item> */}
        </div>
      </Form>
    </Drawer>
  )
}

export default memo(TariffPlansDrawer)
