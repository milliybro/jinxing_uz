import queryString from 'query-string'
import { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { App, Button, Drawer, Form, Select, Typography } from 'antd'

import { createPaymentpayment, getPaymentType, updateType } from '../api'
import queryClient from '@/utils/query-client'

import CloseIcon from '@/components/icons/close'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import SearchIcon from '@/components/icons/search'

import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { IPayment } from '../types'
import { ListResponse } from '@/types'
import { useBranchIdStore } from '@/store/branch-id-store'

interface IProps {
  data?: ListResponse<IPayment[]>
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  refetch: () => void
}

const PaymentTypesDrawer: FC<IProps> = ({
  openDrawer,
  setOpenDrawer,
  refetch,
  data: list,
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { notification } = App.useApp()
  const { search } = useLocation()
  const navigate = useNavigate()
  const { branch } = useBranchIdStore()
  const [placementId, setPlacementId] = useState(null)

  useQuery(['branches'], {
    enabled: true,
    onSuccess: (data: any) => {
      setPlacementId(data?.results?.[0]?.id)
      // console.log(data?.results[0]?.id, 'asasas')
    },
  })

  const showDrawer = () => {
    setOpenDrawer((prev) => {
      if (prev) {
        form.resetFields()
        navigate('/payment-types', { replace: true }) // Adjust this path as needed
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
          {t('common.changes-saved')}
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
            {t('common.changes-successfully-saved')}
          </Typography.Text>
        </div>
      ),
    })
  }

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: async (values: any) => {
      const body = {
        payment_type: values.type, // Tanlangan idlarni massivga aylantirish
        placement: placementId,
        translations: {
          en: { name: 'Some name' }, // Tanlangan `type`ga qarab qiymatlarni sozlash
          ru: { name: 'Какое-то имя' },
          'uz-latin': { name: 'Biror nom' },
          'uz-cyrillic': { name: 'Бирор ном' },
        },
        branch,
      }

      if (search.includes('edit')) {
        return updateType(body, queryString.parse(search)?.edit as string)
      }

      return await createPaymentpayment(body)
    },
    onSuccess: () => {
      showDrawer()
      openNotification()
      refetch()
      queryClient.invalidateQueries(['payment_types'])
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  const { data: paymentTypes } = useQuery({
    queryKey: ['payment_types'],
    queryFn: getPaymentType,
  })

  useEffect(() => {
    const id = queryString.parse(search)?.edit
    if (!!paymentTypes?.results?.length && id) {
      form.setFieldsValue({
        type: list?.results.find((val) => val.id === +id)?.payment_type.id,
      })
    }
  }, [search, paymentTypes])

  const userData = localStorage.getItem('user_data')
  const userId = userData ? JSON.parse(userData).id : null

  // const { data: singleType } = useQuery({
  //   queryKey: ['single-payment-type', queryString.parse(search)?.edit],
  //   queryFn: async () => {
  //     const res = await getPaymentType(
  //       queryString.parse(search)?.edit as string,
  //     )
  //     return res
  //   },
  //   enabled: search.includes('edit') && openDrawer,
  // })

  return (
    <Drawer
      width={581}
      closeIcon={null}
      footer={
        <div className="flex justify-end gap-4">
          <Button
            className="text-primary-dark dark:text-white font-semibold"
            onClick={() => setOpenDrawer(false)}
          >
            {t('common.cancel')}
          </Button>
          <Button
            htmlType="submit"
            className="bg-primary text-white font-semibold"
            form="add-payment-type-form"
            loading={isCreating}
          >
            {t('common.save')}
          </Button>
        </div>
      }
      title={
        <div className="flex w-full items-center justify-between">
          <span className="text-[18px] font-medium">
            {t('payment-types.new-payment-type')}
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
        id="add-payment-type-form"
        onFinish={create}
        layout="vertical"
        className="flex flex-col gap-6 [&_.ant-form-item-required]:before:hidden"
      >
        <Form.Item
          label={t('payment-types.payment-type.label')}
          name="type"
          rules={[
            {
              required: true,
              message: t('payment-types.payment-type.rule') as string,
            },
          ]}
        >
          <Select
            size="large"
            suffixIcon={<SearchIcon className="ml-2  text-base" />}
            allowClear
            notFoundContent={null}
            defaultActiveFirstOption={false}
            options={paymentTypes?.results.map((val) => ({
              label: (
                <div key={val.id} className="flex items-center gap-2">
                  <img className="w-6 h-6" src={val?.icon} alt="" />
                  <h5>{val?.name}</h5>
                </div>
              ),
              value: val.id,
            }))}
            placeholder={t('payment-types.enter-name-number')}
            className=""
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default memo(PaymentTypesDrawer)
