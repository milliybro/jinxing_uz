import queryString from 'query-string'
import { memo, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { App, Button, Drawer, Form, Input, Typography } from 'antd'

import queryClient from '@/utils/query-client'
import { postGoodsAndService, putGoodsAndService } from '../api'

import CloseIcon from '@/components/icons/close'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'

import type { IPostGoodsAndService } from '../types'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'

interface IProps {
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const CategoryOfGoodsDrawer: FC<IProps> = ({ openDrawer, setOpenDrawer }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { notification } = App.useApp()
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const showDrawer = () => {
    setOpenDrawer((prev) => {
      if (prev) {
        form.resetFields()
        navigate('/category-of-goods-and-services', { replace: true })
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
        <Typography.Text className="font-medium text-[18px] leading-[22.95px]">
          {t('category-of-goods.added-category')}
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
            {t('category-of-goods.added-category-success')}
          </Typography.Text>
        </div>
      ),
    })
  }

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: (values: any) => {
      const body: IPostGoodsAndService = {
        translations: {
          en: { name: values.name },
          ru: { name: values.name },
          'uz-latin': { name: values.name },
          'uz-cyrillic': { name: values.name },
        },
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
      queryClient.invalidateQueries(['category-of-goods-and-services'])
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  useEffect(() => {
    if (search.includes('name')) {
      form.setFieldValue('name', queryString.parse(search)?.name)
    }
  }, [search])

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
              ? t('category-of-goods.edit-category')
              : t('category-of-goods.add-category')}
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
      >
        <Form.Item
          label={
            <span className="text-sm font-medium">
              {t('category-of-goods.name-category')}
            </span>
          }
          name="name"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            {
              required: true,
              message: t('category-of-goods.one-rule') as string,
            },
          ]}
        >
          <Input
            size="large"
            className="shadow-sm"
            placeholder={t('category-of-goods.one-placeholder') as string}
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default memo(CategoryOfGoodsDrawer)
