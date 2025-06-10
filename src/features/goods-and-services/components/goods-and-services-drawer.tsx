import { useMutation, useQuery } from '@tanstack/react-query'
import {
  App,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Switch,
  Typography,
} from 'antd'
import queryString from 'query-string'
import { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getGoodsAndServices } from '@/features/category-of-goods-and-services/api'
import queryClient from '@/utils/query-client'
import {
  getGoodsAndService,
  postGoodsAndService,
  putGoodsAndService,
} from '../api'

import CSelect from '@/components/cselect'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import CloseIcon from '@/components/icons/close'

import { useBranchIdStore } from '@/store/branch-id-store'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const GoodsAndServicesDrawer: FC<IProps> = ({ openDrawer, setOpenDrawer }) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { notification } = App.useApp()
  const [checked, setChecked] = useState(false)
  const { search } = useLocation()
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const showDrawer = () => {
    setOpenDrawer((prev) => {
      if (prev) {
        form.resetFields()
        navigate('/goods-and-services', { replace: true })
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
          {search.includes('edit')
            ? t('goods-and-services.editted-goods-service')
            : t('goods-and-services.added-goods-service')}
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
            {search.includes('edit')
              ? t('goods-and-services.editted-goods-service-success')
              : t('goods-and-services.added-goods-service-success')}
          </Typography.Text>
        </div>
      ),
    })
  }

  const { data: categories } = useQuery({
    queryKey: ['category-of-goods-and-services'],
    queryFn: async () => {
      const res = await getGoodsAndServices({ branch })
      return res
    },
  })

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: (values: any) => {
      const body = {
        translations: {
          en: { name: values.name },
          ru: { name: values.name },
          'uz-latin': { name: values.name },
          'uz-cyrillic': { name: values.name },
        },
        category: Number(values.category),
        price: values.price,
        status: values.status,
        max_adults: +values.max_adults,
        branch,
      }

      if (search.includes('edit')) {
        return putGoodsAndService(body, queryString.parse(search)?.edit as any)
      }

      return postGoodsAndService(body)
    },
    onSuccess: () => {
      showDrawer()
      openNotification()
      queryClient.invalidateQueries(['goods-and-services-table'])
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  const { data: singleGood, isFetching } = useQuery({
    queryKey: ['single-room', queryString.parse(search)?.edit],
    queryFn: async () => {
      const res = await getGoodsAndService(
        queryString.parse(search)?.edit as any,
        branch,
      )

      return res
    },
    enabled: search.includes('edit') && openDrawer,
  })

  useEffect(() => {
    if (openDrawer && singleGood && search.includes('edit')) {
      form.setFieldsValue({
        ...singleGood,
        category: `${singleGood.category.id}`,
      })
    }

    if (!search.includes('edit')) {
      form.resetFields()
    }
  }, [search, singleGood])

  useEffect(() => {
    if (singleGood) setChecked(singleGood?.status)
  }, [singleGood])

  return (
    <Drawer
      width={581}
      closeIcon={null}
      loading={isFetching}
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
            form="add-room-form"
            loading={isCreating}
          >
            {t('common.save')}
          </Button>
        </div>
      }
      title={
        <div className="flex w-full items-center justify-between">
          <span className="text-[18px] font-medium">
            {search.includes('edit')
              ? t('goods-and-services.edit-goods-service')
              : t('goods-and-services.add-goods-service')}
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
        onFinish={create}
        layout="vertical"
        className="flex flex-col gap-6 [&_.ant-form-item-required]:before:hidden"
        initialValues={{ status: false }}
      >
        <Form.Item
          label={
            <span className="text-sm font-medium">
              {t('goods-and-services.form.name-goods.label')}
            </span>
          }
          name="name"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            {
              required: true,
              message: t('goods-and-services.form.name-goods.rule'),
            },
          ]}
        >
          <Input
            size="large"
            className="shadow-sm"
            placeholder={t('goods-and-services.form.name-goods.placeholder')}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-sm font-medium">
              {t('goods-and-services.form.category.label')}
            </span>
          }
          name="category"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            {
              required: true,
              message: t('goods-and-services.form.category.rule'),
            },
          ]}
        >
          <CSelect
            size="large"
            className="w-full"
            placeholder={t('goods-and-services.form.category.placeholder')}
            options={categories?.results.map((val) => ({
              label: val.name,
              value: `${val.id}`,
            }))}
          />
        </Form.Item>
        {/* <Form.Item
          label={<span className="text-sm font-medium">Максимум взрослых</span>}
          name="adults_count"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[{ required: true, message: 'Пожалуйста, введите!' }]}
        >
          <CSelect
            size="large"
            className="w-full"
            placeholder="Выберите категорию"
            options={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
            ]}
          />
        </Form.Item> */}
        {/* <Form.Item
          label={
            <span className="text-sm font-medium">
              {t('goods-and-services.form.adults.label')}
            </span>
          }
          name="max_adults"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            {
              required: true,
              message: t('goods-and-services.form.adults.rule') as string,
            },
          ]}
        >
          <CSelect
            size="large"
            options={[
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
              { label: 5, value: 5 },
              { label: 6, value: 6 },
            ]}
          />
        </Form.Item> */}
        <Form.Item
          label={
            <span className="text-sm font-medium">
              {t('goods-and-services.form.price.label')}
            </span>
          }
          name="price"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            {
              required: true,
              message: t('goods-and-services.form.price.rule') as string,
            },
          ]}
        >
          <InputNumber
            controls={false}
            size="large"
            className="shadow-sm w-full"
            suffix={<span className="text-secondary text-xs">UZS</span>}
            placeholder={
              t('goods-and-services.form.price.placeholder') as string
            }
          />
        </Form.Item>
        <div className="inline-flex items-end gap-2">
          <Form.Item
            label={
              <span className="text-sm font-medium">{t('common.status')}</span>
            }
            name="status"
            className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
            rules={[{ required: true, message: 'Пожалуйста, введите!' }]}
          >
            <Switch value={checked} onChange={(value) => setChecked(value)} />
          </Form.Item>
          <Typography.Text className="mb-[10px] text-secondary text-sm font-normal">
            {checked ? t('common.active') : t('common.inactive')}
          </Typography.Text>
        </div>
      </Form>
    </Drawer>
  )
}

export default memo(GoodsAndServicesDrawer)
