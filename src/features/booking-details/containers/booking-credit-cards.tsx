import { useState } from 'react'
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  Typography,
} from 'antd'

import CSelect from '@/components/cselect'
import InputMask from 'react-input-mask'
import CardDetailsHider from '../components/card-details-hider'

import PlusIcon from '@/components/icons/plus'
import CreditCardIcon from '@/components/icons/credit-card'

import type { FC } from 'react'
import type { TableProps } from 'antd'
import type { IBookingDetails } from '../types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getPaymentTypes, postAddCard } from '../api'
import queryClient from '@/utils/query-client'

interface DataType {
  key: string
  full_name: string
  type: string
  card_details: number
  expiration_date: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Владелец карты',
    width: 190,
    dataIndex: 'full_name',
    key: 'full_name',
    className: 'whitespace-nowrap font-medium',
  },
  {
    title: 'Тип',
    width: 190,
    dataIndex: 'type',
    key: 'type',
    className: 'font-medium',
  },
  {
    title: 'Данные карты',
    width: 190,
    dataIndex: 'card_details',
    key: 'card_details',
    className: 'font-medium',
    render: (val) => <CardDetailsHider text={val} />,
  },
  {
    title: 'Срок годности',
    width: 190,
    dataIndex: 'expiration_date',
    key: 'expiration_date',
    className: 'font-medium',
  },
]

const BookingCreditCards: FC<{ data?: IBookingDetails }> = ({ data }) => {
  const [form] = Form.useForm()
  const [addNoteModal, setAddNoteModal] = useState(false)

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: any) => {
      const allValues = {
        ...values,
        order: data?.id,
        expiry_date: values?.expiry_date,
      }
      return postAddCard(allValues)
    },
    onSuccess: () => {
      form.resetFields()
      setAddNoteModal(false)
      queryClient.invalidateQueries(['orders-types-r-tariff'])
    },
  })

  const { data: paymentTypes } = useQuery({
    queryKey: ['payment-types'],
    queryFn: async () => {
      const res = await getPaymentTypes()
      return res
    },
  })

  const [value, setValue] = useState('')

  const handleInputChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '') // Faqat raqamlar qabul qilinsin
    if (inputValue.length > 4) inputValue = inputValue.slice(0, 4) // Maksimal uzunlik 4 ta raqam

    if (inputValue.length > 2) {
      inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`
    }

    setValue(inputValue)
  }

  const dataSource = data?.payment_cards.map((val, i) => ({
    key: val?.card_holder_name + i,
    full_name: val?.card_holder_name,
    type: val?.payment_type?.name,
    card_details: val?.card_number,
    expiration_date: val?.expiry_date,
  }))

  const MaskedInput = ({
    value,
    onChange,
    placeholder,
  }: {
    value: string
    onChange: any
    placeholder: string
  }) => {
    return (
      <InputMask
        mask="99/99"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'MM/YY'}
      >
        {(inputProps) => (
          <input
            {...inputProps}
            className="border-[1px] rounded-[8px] py-[12px] px-3 w-full ant-input ant-input-lg  outline-none"
          />
        )}
      </InputMask>
    )
  }

  return (
    <>
      <Button
        type="link"
        size="large"
        className="flex items-center mb-6"
        onClick={() => setAddNoteModal(true)}
      >
        <PlusIcon /> Добавить карту
      </Button>
      <Table
        className="custom-table"
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      <Modal
        open={addNoteModal}
        centered
        width={515}
        onOk={() => setAddNoteModal(false)}
        onCancel={() => setAddNoteModal(false)}
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
            icon={<CreditCardIcon className="text-[26px] text-primary" />}
          />
          <Typography.Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[10px]">
            Добавить карту
          </Typography.Text>
          <Typography.Text className="text-secondary text-center leading-[25.6px] mb-[20px]">
            Добавьте необходимые параметры карты для того чтобы добавить его в
            бронирование
          </Typography.Text>
          <Form
            layout="vertical"
            className="w-full [&_.ant-form-item-required]:before:hidden"
            onFinish={mutate}
            form={form}
          >
            <Form.Item
              label="Имя владельца карта"
              name="card_holder_name"
              className="mb-[20px]"
              rules={[{ required: true, message: 'Пожалуйста, введите!' }]}
            >
              <Input
                size="large"
                placeholder="Введите имя"
                className="shadow-sm"
              />
            </Form.Item>

            <Form.Item
              label="Тип карты"
              name="payment_type"
              className="mb-[20px]"
              rules={[{ required: true, message: 'Пожалуйста, введите!' }]}
            >
              <CSelect
                size="large"
                allowClear={false}
                placeholder="Тип оплаты"
                showSearch={false}
                options={paymentTypes?.results.map((val) => ({
                  label: val?.payment_type?.name,
                  value: val?.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Номер карты"
              name="card_number"
              className="mb-[20px]"
              rules={[{ required: true, message: 'Пожалуйста, введите!' }]}
            >
              <InputNumber
                size="large"
                placeholder="0000 0000 0000 0000"
                className="shadow-sm w-full"
                maxLength={19}
                inputMode="numeric"
                controls={false}
                formatter={(value) =>
                  `${value}`.replace(/(\d{4})/g, '$1 ').trim()
                }
                parser={(value) =>
                  value?.replace(/\D/g, '').trim() as unknown as number
                }
              />
            </Form.Item>
            <Form.Item
              label="Срок действия"
              name="expiry_date"
              rules={[
                { required: true, message: 'Пожалуйста, введите дату!' },
                {
                  pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: 'Введите дату в формате MM/YY (например, 06/26)',
                },
              ]}
            >
              <MaskedInput />
            </Form.Item>

            <Flex justify="center" gap={16}>
              <Button
                className="text-primary-dark font-semibold"
                onClick={() => setAddNoteModal(false)}
              >
                Отмена
              </Button>
              <Button
                htmlType="submit"
                className="bg-primary text-white font-semibold"
                loading={isLoading}
              >
                Добавить карту
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Modal>
    </>
  )
}

export default BookingCreditCards
