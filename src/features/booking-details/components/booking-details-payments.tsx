import dayjs from 'dayjs'
import { useState } from 'react'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Flex,
  Modal,
  Table,
  Tag,
  Typography,
  Button,
  Form,
  Input,
} from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'

import queryClient from '@/utils/query-client'
import { formatAmount } from '@/helpers/format-amount'
import { getOrderPayment, getPaymentTypes, postAddPayment } from '../api'

import CSelect from '@/components/cselect'
import PlusIcon from '@/components/icons/plus'
import MoneyIcon from '@/components/icons/money'
import CheckmarkIcon from '@/components/icons/checkmark'
import UncheckmarkIcon from '@/components/icons/uncheckmark'

import NotFoundIllustration from '@/assets/not-found-illustration'

import type { FC } from 'react'
import type { TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'

interface DataType {
  key: string
  total: number
  status: string
  payment_type: string
  date: string
}

const BookingDetailsPayments: FC<{ id?: number; refetch?: any }> = ({
  id,
  refetch,
}) => {
  const [form] = Form.useForm()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const [addPaymentModal, setAddPaymentModal] = useState(false)
  const queries = queryString.parse(restQueries)
  const { branch } = useBranchIdStore()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('fields.payment-type.label'),
      width: 190,
      dataIndex: 'payment_type',
      key: 'payment_type',
      className: 'whitespace-nowrap font-medium',
    },
    {
      title: t('common.status'),
      width: 190,
      dataIndex: 'status',
      key: 'status',
      className: 'font-medium',
      render: () => (
        <Tag color="blue" bordered={false}>
          {t('common.paid')}
        </Tag>
      ),
    },
    {
      title: t('common.date'),
      width: 190,
      dataIndex: 'date',
      key: 'date',
      className: 'font-medium',
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
  const { data, isLoading: dataIsLoading } = useQuery({
    queryKey: ['orders-payment-r', queries],
    queryFn: async () => {
      const res = await getOrderPayment({
        payment_types: queries.payment_types?.toString(),
        order: id,
        branch,
      })
      return res
    },
  })

  const { data: paymentTypes } = useQuery({
    queryKey: ['payment-types'],
    queryFn: async () => {
      const res = await getPaymentTypes({ branch })
      return res
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: any) => {
      const allValues = {
        ...values,
        order: id,
        branch,
      }
      return postAddPayment(allValues)
    },
    onSuccess: () => {
      form.resetFields()
      setAddPaymentModal(false)
      queryClient.invalidateQueries(['orders-payment-r'])
      refetch()
    },
  })

  const getLocale = () => {
    if (i18n.language === 'ru') return 'ru'
    if (i18n.language === 'uz') return 'uz'
    if (i18n.language === 'oz') return 'uz-latn'
    return 'en' // Fallback to English if none match
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <Button
          type="link"
          size="large"
          className="flex items-center"
          onClick={() => setAddPaymentModal(true)}
        >
          <PlusIcon /> {t('common.add-payment')}
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
          <Form.Item name="payment_types" className="min-w-[264px] w-max">
            <CSelect
              size="large"
              // className="[&>.ant-select-selection-overflow]:flex-nowrap"
              allowClear
              placeholder={t('fields.payment-type.label')}
              showSearch={false}
              prefixIcon={<MoneyIcon className="text-secondary text-base" />}
              options={paymentTypes?.results.map((val) => ({
                label: val?.payment_type?.name,
                value: val?.id,
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
      {data?.count === 0 ? (
        <div className="grid place-items-center mb-[50px]">
          <div className="flex flex-col max-w-[696px] items-center">
            <NotFoundIllustration className="text-primary-dark dark:text-primary-light" />
            <Typography.Text className="text-primary-dark mt-6 text-2xl font-semibold mb-[16px]">
              {t('booking-detail.not-found.title')}
            </Typography.Text>
            <Typography.Text className="text-secondary">
              {t('booking-detail.not-found.subtitle')}
            </Typography.Text>
            <Typography.Text className="text-secondary">
              <button
                type="button"
                className="font-semibold text-primary"
                onClick={() => setAddPaymentModal(true)}
              >
                {t('booking-detail.not-found.action-text')}
              </button>{' '}
              {/* или{' '}
          <button type="button" className="font-semibold text-primary">
            Добавить товар/услугу
          </button> */}
            </Typography.Text>
          </div>
        </div>
      ) : (
        <Table
          className="custom-table"
          bordered
          loading={dataIsLoading}
          columns={columns as any}
          dataSource={data?.results.map((val) => ({
            key: val?.id + 'item',
            payment_type: val?.payment_type?.payment_type?.name,
            date: dayjs(val?.created_at)
              .locale(getLocale())
              .format('DD MMMM, YYYY'),
            total: val?.amount,
          }))}
          pagination={false}
        />
      )}
      <Modal
        open={addPaymentModal}
        centered
        width={515}
        onOk={() => setAddPaymentModal(false)}
        onCancel={() => setAddPaymentModal(false)}
        classNames={{
          content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
      >
        <Flex vertical align="center">
          <Avatar
            shape="circle"
            size={62}
            className=" bg-[#DBEAFE] mb-5 border-[7px] border-[#EFF6FF]"
            icon={<MoneyIcon className="text-[26px] text-primary" />}
          />
          <Typography.Text className="text-[24px] font-bold text-primary-dark dark:text-primary-light leading-[30.6px] mb-[10px]">
            {t('common.add-payment')}
          </Typography.Text>
          <Typography.Text className="text-secondary leading-[25.6px] mb-[20px]">
            {t('common.add-payment-desc')}
          </Typography.Text>
          <Form
            layout="vertical"
            className="w-full"
            onFinish={mutate}
            form={form}
          >
            <Form.Item
              label={t('common.add-payment-desc')}
              name="payment_type"
              className="mb-[16px]"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <CSelect
                size="large"
                placeholder={t('common.select')}
                options={paymentTypes?.results.map((val) => ({
                  label: val?.payment_type?.name,
                  value: val?.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              label={t('common.total')}
              name="amount"
              className="mb-[20px]"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input size="large" placeholder="0" />
            </Form.Item>
            <Flex justify="center" gap={16}>
              <Button
                className="text-primary-dark font-semibold dark:text-primary-light"
                onClick={() => setAddPaymentModal(false)}
              >
                {t('common.cancel')}
              </Button>
              <Button
                htmlType="submit"
                className="bg-primary text-white font-semibold"
                loading={isLoading}
              >
                {t('common.add-payment')}
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Modal>
    </div>
  )
}

export default BookingDetailsPayments
