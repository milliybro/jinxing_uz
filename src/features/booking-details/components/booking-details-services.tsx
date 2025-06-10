import queryClient from '@/utils/query-client'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Avatar,
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { formatAmount } from '@/helpers/format-amount'
import { getOrderServicesList, getServiceTypes, postAddService } from '../api'

import CSelect from '@/components/cselect'

import NotFoundIllustration from '@/assets/not-found-illustration'

import CheckmarkIcon from '@/components/icons/checkmark'
import GridViewIcon from '@/components/icons/grid-view'
import PlusIcon from '@/components/icons/plus'
import UncheckmarkIcon from '@/components/icons/uncheckmark'

import { useBranchIdStore } from '@/store/branch-id-store'
import type { TableProps } from 'antd'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { IBookingDetails } from '../types'

interface DataType {
  key: string
  total: number
  service_name: string
  date: string
  count: number
}

const BookingDetailsServices: FC<{ data?: IBookingDetails; refetch?: any }> = ({
  data,
  refetch,
}) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()
  const [addServiceModal, setAddServiceModal] = useState<boolean>(false)

  const service = Form.useWatch('service', form)
  const quantity = Form.useWatch('quantity', form)

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('common.service-name'),
      width: 190,
      dataIndex: 'service_name',
      key: 'service_name',
      className: 'whitespace-nowrap font-medium',
    },
    {
      title: t('common.quantity'),
      width: 190,
      dataIndex: 'count',
      key: 'count',
      className: 'font-medium',
    },
    {
      title: t('common.date'),
      width: 190,
      dataIndex: 'date',
      key: 'date',
      className: 'font-medium',
      render: (val) => (val ? dayjs(val).format('DD MMMM, YYYY') : val),
    },
    {
      title: t('common.total'),
      width: 190,
      dataIndex: 'total',
      key: 'total',
      className: 'font-medium',
      render: (val) => `${formatAmount(val)} UZS`,
    },
  ]

  useEffect(() => {
    if (service || quantity) {
      const foundService = serviceTypes?.results.find((s) => s.id === service)

      form.setFieldsValue({
        price:
          quantity === 0 || quantity === undefined
            ? 0
            : (foundService?.price || 0) * (quantity || 0),
      })
    } else {
      form.setFieldsValue({
        price: '',
      })
    }
  }, [service, quantity])

  const { data: serviceTypes } = useQuery({
    queryKey: ['booking-details-service-types'],
    queryFn: async () => {
      const res = await getServiceTypes({ branch })
      return res
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: any) => {
      const allValues = {
        ...values,
        price: serviceTypes?.results.find((s) => s.id === values.service)
          ?.price,
        order: data?.id,
        total_price: values.price,
        date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
        branch,
      }
      return postAddService(allValues)
    },
    onSuccess: () => {
      form.resetFields()
      setAddServiceModal(false)
      queryClient.invalidateQueries(['order-services-list'])
      refetch()
    },
  })

  const { data: servicesList, isLoading: servicesLoading } = useQuery({
    queryKey: ['order-services-list', queries],
    queryFn: async () => {
      const res = await getOrderServicesList({
        order: data?.id,
        services: queries.services?.toString(),
        branch,
      })
      return res
    },
    keepPreviousData: true,
    enabled: Boolean(data?.id),
  })

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button
          type="link"
          size="large"
          className="flex items-center"
          onClick={() => setAddServiceModal(true)}
        >
          <PlusIcon /> {t('common.add-service')}
        </Button>
        <Form
          onFieldsChange={(val) => {
            const search = queryString.stringify({
              ...queries,
              [val?.[0].name?.[0]]: val?.[0].value || undefined,
            })
            navigate({ pathname, search })
          }}
        >
          <Form.Item name="services" className="min-w-[264px] w-max">
            <CSelect
              size="large"
              // className="[&>.ant-select-selection-overflow]:flex-nowrap"
              allowClear
              placeholder={t('common.select-service')}
              className="w-[264px]"
              showSearch={false}
              prefixIcon={<GridViewIcon className="text-secondary text-base" />}
              options={serviceTypes?.results.map((val) => ({
                label: val.name,
                value: val.id,
                // price: val.price,
              }))}
              mode="multiple"
              // optionRender={(props: any) => {
              //   return (
              //     <div className="flex gap-4 items-center">
              //       {circleColor(props.label)}
              //       <span className="font-medium">{props.value}</span>
              //     </div>
              //   )
              // }}
              menuItemSelectedIcon={({ isSelected }: any) =>
                isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
              }
              tagRender={(props: any) => {
                return (
                  <div className="flex gap-4 items-center mr-2">
                    {/* {circleColor(props.label)} */}
                    {props.label}
                  </div>
                )
              }}
            />
          </Form.Item>
        </Form>
      </div>
      {data?.count !== 0 ? (
        <div>
          <Table
            className="custom-table"
            bordered
            columns={columns}
            loading={servicesLoading}
            dataSource={servicesList?.results?.map((val, i) => ({
              key: 'services-table-' + i,
              service_name: val?.service?.name,
              date: val?.date,
              count: val?.quantity,
              total: val?.total_price,
            }))}
            pagination={false}
          />
          <Modal
            open={addServiceModal}
            centered
            width={515}
            onOk={() => setAddServiceModal(false)}
            onCancel={() => setAddServiceModal(false)}
            classNames={{
              content:
                'p-[40px] [&>.ant-modal-close]:text-primary-dark dark:text-white',
            }}
            footer={null}
          >
            <Flex vertical align="center">
              <Avatar
                shape="circle"
                size={62}
                className=" bg-[#DBEAFE] mb-5 border-[7px] border-[#EFF6FF]"
                icon={<GridViewIcon className="text-[26px] text-primary" />}
              />
              <Typography.Text className="text-[24px] font-bold text-primary-dark dark:text-white leading-[30.6px] mb-[10px]">
                {t('common.add-service')}
              </Typography.Text>
              <Typography.Text className="text-secondary leading-[25.6px] mb-[20px]">
                {t('common.add-payment-desc')}
              </Typography.Text>
              <Form
                layout="vertical"
                className="w-full [&_.ant-form-item-required]:before:hidden"
                onFinish={mutate}
                form={form}
              >
                <Form.Item
                  label={t('common.select-room')}
                  name="order_item"
                  className="mb-[16px]"
                  rules={[
                    {
                      required: true,
                      message: t('tariff-plans-page.end_date.rule'),
                    },
                  ]}
                >
                  <CSelect
                    size="large"
                    placeholder={t('common.select')}
                    options={data?.items.map((val) => ({
                      label: val?.room.name + ' ' + val?.room_item.name,
                      value: val?.id,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label={t('common.select-service')}
                  name="service"
                  className="mb-[16px]"
                  rules={[
                    {
                      required: true,
                      message: t('tariff-plans-page.end_date.rule'),
                    },
                  ]}
                >
                  <CSelect
                    size="large"
                    placeholder={t('common.select')}
                    options={serviceTypes?.results.map((val) => ({
                      label: val.name,
                      value: val.id,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label={t('fields.service_quantity.label')}
                  name="quantity"
                  className="mb-[16px]"
                  rules={[
                    {
                      required: true,
                      message: t('fields.service_quantity.error'),
                    },
                    {
                      pattern: /^(?:[1-9]|[1-9][0-9])$/,
                      message: t('fields.service_quantity.error2'),
                    },
                  ]}
                >
                  <InputNumber
                    size="large"
                    placeholder={t('fields.service_quantity.placeholder')}
                    className="shadow-sm w-full dark:bg-[#0F172A]"
                    maxLength={2}
                    controls={false}
                  />
                </Form.Item>

                <Form.Item
                  label={t('fields.payment_amount.label')}
                  name="price"
                  className="mb-[20px]"
                  rules={[
                    {
                      required: true,
                      message: t('tariff-plans-page.end_date.rule'),
                    },
                  ]}
                >
                  <InputNumber
                    size="large"
                    placeholder={t('fields.payment_amount.placeholder')}
                    className="shadow-sm w-full dark:bg-[#0F172A]"
                    controls={false}
                  />
                </Form.Item>

                <Form.Item
                  label={t('fields.time-period.placeholder')}
                  name="date"
                  className="mb-[20px]"
                  rules={[
                    {
                      required: true,
                      message: t('tariff-plans-page.end_date.rule'),
                    },
                  ]}
                >
                  <DatePicker
                    size="large"
                    suffixIcon={null}
                    className="w-full h-[47px]"
                    placeholder={t('common.select')}
                    disabledDate={(current) => {
                      if (!data?.start_date || !data?.end_date) return false
                      const startDate = dayjs(data.start_date)
                      const endDate = dayjs(data.end_date)
                      return (
                        current && (current < startDate || current > endDate)
                      )
                    }}
                    defaultPickerValue={
                      data?.start_date ? dayjs(data.start_date) : undefined
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={t('common.comments')}
                  name="comment"
                  className="mb-[20px]"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: t('tariff-plans-page.end_date.rule'),
                  //   },
                  // ]}
                >
                  <Input.TextArea placeholder={t('common.comments')} />
                </Form.Item>

                <Flex justify="center" gap={16}>
                  <Button
                    className="text-primary-dark dark:text-white font-semibold"
                    onClick={() => setAddServiceModal(false)}
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button
                    htmlType="submit"
                    className="bg-primary text-white font-semibold"
                    loading={isLoading}
                  >
                    {t('common.add-service')}
                  </Button>
                </Flex>
              </Form>
            </Flex>
          </Modal>
        </div>
      ) : (
        <div className="grid place-items-center mb-[50px]">
          <div className="flex flex-col max-w-[696px] items-center">
            <NotFoundIllustration className="text-primary-dark dark:text-primary-light" />
            <Typography.Text className="text-primary-dark mt-6 text-2xl font-semibold mb-[16px]">
              {t('booking-datail.not-found-service.title')}
            </Typography.Text>
            <Typography.Text className="text-secondary text-center">
              {t('booking-datail.not-found-service.subtitle')}
            </Typography.Text>
            <Typography.Text className="text-secondary">
              <button
                type="button"
                className="font-semibold text-primary"
                onClick={() => setAddServiceModal(true)}
              >
                {t('booking-datail.not-found-service.action-text')}
              </button>{' '}
            </Typography.Text>
          </div>
        </div>
      )}
    </>
  )
}

export default BookingDetailsServices
