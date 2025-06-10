import { useMutation, useQuery } from '@tanstack/react-query'
import {
  App,
  Avatar,
  Button,
  Drawer,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Typography,
} from 'antd'
import queryString from 'query-string'
import { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import queryClient from '@/utils/query-client'
import { getBaseFeaturesIcons, postFeature, updateFeature } from '../api'

import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import CloseIcon from '@/components/icons/close'
import GridViewIcon from '@/components/icons/grid-view'

import { ListResponse } from '@/types'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { IFeatures } from '../types'
import { useBranchIdStore } from '@/store/branch-id-store'

interface IProps {
  data?: ListResponse<IFeatures[]>
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const FeaturesDrawer: FC<IProps> = ({ openDrawer, setOpenDrawer, data }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { t } = useTranslation()
  const { notification } = App.useApp()

  const [iconModal, setIconModal] = useState(false)
  const [searchIcons, setSearchIcons] = useState<any[]>([])
  const [activeIcon, setActiveIcon] = useState<any | null>(null)

  const { branch } = useBranchIdStore()

  const showDrawer = () => {
    if (openDrawer) {
      setActiveIcon(null)
    }

    setOpenDrawer((prev) => {
      if (prev) {
        form.resetFields()
        navigate('/features', { replace: true })
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
          {t('common.successfully-added')}
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
            {t('features-page.added-features')}
          </Typography.Text>
        </div>
      ),
    })
  }

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: (values: any) => {
      const body = {
        translations: {
          en: { name: values.name },
          ru: { name: values.name },
          'uz-latin': { name: values.name },
          'uz-cyrillic': { name: values.name },
        },
        icon: values.icon,
        branch,
      }

      if (search.includes('edit')) {
        return updateFeature(body, queryString.parse(search)?.edit as any)
      }

      return postFeature(body)
    },
    onSuccess: () => {
      showDrawer()
      openNotification()
      queryClient.invalidateQueries(['features-table'])
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  const { data: icons } = useQuery({
    queryKey: ['base-features-icons-table', iconModal],
    queryFn: async () => {
      const res = await getBaseFeaturesIcons()

      setSearchIcons(res.results)
      return res
    },
  })

  // const { data: singleIcon } = useQuery({
  //   queryKey: ['single-features-icons-table', queryString.parse(search)?.edit],
  //   queryFn: async () => {
  //     const res = await getFeature(queryString.parse(search)?.edit)

  //     return res
  //   },
  //   enabled: search.includes('edit') && openDrawer,
  // })

  useEffect(() => {
    const id = queryString.parse(search)?.edit

    const singleIcon = id && data?.results.find((feature) => feature.id === +id)
    if (openDrawer && singleIcon && search.includes('edit')) {
      form.setFieldsValue({
        name: singleIcon.name,
        icon: singleIcon.icon.split('relative_media/').slice(1)[0],
      })

      setActiveIcon(singleIcon)
    }

    if (!search.includes('edit') && openDrawer) {
      form.resetFields()
    }
  }, [search])

  return (
    <>
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
                ? t('features-page.edit')
                : t('features-page.add-features')}
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
                {t('features-page.form.name.label')}
              </span>
            }
            name="name"
            className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
            rules={[
              { required: true, message: t('features-page.form.name.rule') },
            ]}
          >
            <Input
              size="large"
              className="shadow-sm"
              placeholder={t('features-page.form.name.placeholder')}
            />
          </Form.Item>

          <div>
            <span className="text-sm font-medium">
              {t('features-page.form.icon.label')}
            </span>
            <Form.Item
              name="icon"
              className="[&>.ant-row]:h-full h-full w-full [&>.ant-form-item-control-input]:h-full"
              rules={[
                { required: true, message: t('features-page.form.icon.rule') },
              ]}
            >
              <Input
                readOnly
                prefix={
                  <button
                    type="button"
                    className="text-[#6B7280] border-r whitespace-nowrap text-[15px] border-border w-fit bg-[#F8FAFC] px-3 py-[10px]"
                    onClick={() => setIconModal(true)}
                  >
                    {t('features-page.form.icon.placeholder')}
                  </button>
                }
                className="p-0 overflow-hidden [&_input] pr-3 [&_input]:pl-3 [&_input]:cursor-default focus:border-border hover:border-border"
                suffix={
                  activeIcon?.file || activeIcon?.icon ? (
                    <img
                      alt="suffix icon"
                      src={activeIcon?.file ?? activeIcon.icon}
                      className="size-4"
                    />
                  ) : undefined
                }
              />
            </Form.Item>
          </div>
        </Form>
      </Drawer>
      <Modal
        open={iconModal}
        centered
        width={884}
        onOk={() => setIconModal(false)}
        onCancel={() => setIconModal(false)}
        classNames={{
          content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
      >
        <Flex vertical align="center" className="text-center">
          <Avatar
            shape="circle"
            size={62}
            className=" bg-[#DBEAFE] mb-5 border-[7px] border-[#EFF6FF]"
            icon={<GridViewIcon className="text-[26px] text-primary" />}
          />
          <Typography.Text className="text-[24px] font-bold dark:text-white text-primary-dark leading-[30.6px] mb-[10px]">
            {t('features-page.select-icon')}
          </Typography.Text>
          <Typography.Text className="text-secondary leading-[25.6px] mb-[20px]">
            {t('features-page.select-icon-desc')}
          </Typography.Text>
          <Form
            layout="vertical"
            className="w-full"
            onFinish={(values) => {
              const icon = icons?.results.find((val) => val.id === values.icon)

              setActiveIcon(icon)
              form.setFieldsValue({ icon: icon.file_url })
              setIconModal(false)
            }}
          >
            <Form.Item
              label={t('features-page.search-features')}
              className="mb-4"
            >
              <Input
                className="shadow-sm"
                onChange={(val) => {
                  if (icons?.count) {
                    if (val.target.value) {
                      return setSearchIcons(
                        icons?.results?.filter((valF) =>
                          valF.name.toLowerCase().includes(val.target.value),
                        ),
                      )
                    }

                    return setSearchIcons(icons?.results)
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              name="icon"
              rules={[
                { required: true, message: t('features-page.select-icon') },
              ]}
            >
              <Radio.Group className="w-full grid grid-cols-10 gap-[16px] mb-[20px] hide-radio-group ">
                {searchIcons?.map((val, i) => (
                  <Radio
                    key={val.key + i}
                    value={val.id}
                    className="flex items-center justify-center size-16 border border-[#F8F8FA] rounded-lg bg-[#F8F8FA]"
                  >
                    <img
                      src={val.file}
                      alt={val.name}
                      className="size-8 select-none"
                      // style={{
                      //   filter:
                      //     'brightness(0) saturate(100%) invert(29%) sepia(98%) saturate(7471%) hue-rotate(10deg) brightness(101%) contrast(102%)',
                      // }}
                    />
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Space>
              <Button
                className="text-primary-dark dark:text-white font-semibold"
                onClick={() => setIconModal(false)}
              >
                {t('common.cancel')}
              </Button>
              <Button
                className="bg-primary text-white font-semibold"
                htmlType="submit"
              >
                {t('features-page.select-icon')}
              </Button>
            </Space>
          </Form>
        </Flex>
      </Modal>
    </>
  )
}

export default memo(FeaturesDrawer)
