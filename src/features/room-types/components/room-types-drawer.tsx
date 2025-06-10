import { useMutation, useQuery } from '@tanstack/react-query'
import {
  App,
  Button,
  Drawer,
  Form,
  Input,
  Tabs,
  Typography,
  Upload,
} from 'antd'
import queryString from 'query-string'
import { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { getRoomFacility } from '@/api'
import queryClient from '@/utils/query-client'
import { getOneRoomType, postRoomType, updateRoom } from '../api'

import CSelect from '@/components/cselect'
import BedDoubleIcon from '@/components/icons/bed-double'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import CloseIcon from '@/components/icons/close'

import { useBranchIdStore } from '@/store/branch-id-store'
import { UploadOutlined } from '@ant-design/icons'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { ISingleRoomForm } from '../types'

interface IProps {
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const languages = [
  { label: 'English', lang: 'en' },
  { label: 'Русский', lang: 'ru' },
  { label: "У'збекча (Кириллица)", lang: 'uz_cyrillic' },
  { label: "O'zbekcha (Lotin)", lang: 'uz_latin' },
]

const RoomTypesDrawer: FC<IProps> = ({ openDrawer, setOpenDrawer }) => {
  const [form] = Form.useForm<ISingleRoomForm>()
  const { notification } = App.useApp()
  const { search } = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { branch } = useBranchIdStore()
  const [activeLang, setActiveLang] = useState('en')
  const editing = searchParams.get('edit')

  const showDrawer = () => {
    setOpenDrawer((prev) => {
      if (prev) {
        form.resetFields()
        navigate('/room-types', { replace: true })
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

  const { data: roomsList } = useQuery({
    queryKey: ['rooms-facilities'],
    queryFn: async () => {
      const res = await getRoomFacility({ branch })
      return res
    },
  })

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: async (values: ISingleRoomForm) => {
      const body = {
        translations: {
          en: { name: values.room_type.en, description: values.description.en },
          ru: { name: values.room_type.ru, description: values.description.ru },
          'uz-cyrillic': {
            name: values.room_type.uz_cyrillic,
            description: values.description.uz_cyrillic,
          },
          'uz-latin': {
            name: values.room_type.uz_latin,
            description: values.description.uz_latin,
          },
        },
        person_count: values.max_people,
        children_count: values.max_child,
        facilities: values?.room_facilities?.map((val) => +val),
        placement: branch,
      }

      let roomId: string | undefined

      if (search.includes('edit')) {
        const updateResponse = await updateRoom({
          data: body,
          id: queryString.parse(search)?.edit as any,
          branch,
        })
        roomId = updateResponse.id
      } else {
        const createResponse = await postRoomType(body)
        roomId = createResponse.id
      }

      if (values.images && roomId) {
        for (const image of values.images as any) {
          if (image) {
            const formData = new FormData()
            formData.append('images', image?.originFileObj)

            try {
              const response = await updateRoom({
                data: formData,
                id: (queryString.parse(search)?.edit as any) || roomId,
                branch,
              })

              if (response.status === 200) {
              } else {
                console.error('Failed to upload image')
              }
            } catch (error) {
              console.error('Error uploading image', error)
            }
          }
        }
      }

      return roomId
    },
    onSuccess: () => {
      showDrawer()
      openNotification()
      queryClient.invalidateQueries(['all-room-type'])
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  const { data: singleRoom, isFetching } = useQuery({
    queryKey: ['single-room-type', queryString.parse(search)?.edit],
    queryFn: async () => {
      const res = await getOneRoomType(
        branch,
        queryString.parse(search)?.edit as string,
      )

      return res
    },
    enabled: search.includes('edit') && openDrawer,
    cacheTime: 0,
  })

  useEffect(() => {
    if (openDrawer && singleRoom && search.includes('edit')) {
      const formattedImages = (singleRoom?.images || []).map((image: any) => ({
        uid: image.id.toString(),
        name: image.image.split('/').pop(),
        status: 'done',
        url: image.image,
      }))
      form.setFieldsValue({
        ...singleRoom,
        description: {
          en: singleRoom?.translations.en?.description,
          ru: singleRoom?.translations.ru?.description,
          uz_cyrillic: singleRoom?.translations['uz-cyrillic']?.description,
          uz_latin: singleRoom?.translations['uz-latin']?.description,
        },
        room_type: {
          en: singleRoom?.translations.en?.name,
          ru: singleRoom?.translations.ru?.name,
          uz_cyrillic: singleRoom?.translations['uz-cyrillic']?.name,
          uz_latin: singleRoom?.translations['uz-latin']?.name,
        },
        max_people: singleRoom?.person_count,
        max_child: singleRoom?.children_count,
        room_facilities: singleRoom?.facilities,
        images: formattedImages,
      })
    }

    if (!search.includes('edit')) {
      form.resetFields()
    }
  }, [search, singleRoom])

  // const handleSubmit = async (values) => {
  //   const formData = new FormData()

  //   Object.entries(values).forEach(([key, value]) => {
  //     if (key === 'images') {
  //       value.forEach((image, index) => {
  //         formData.append(`images[${index}]`, image)
  //       })
  //     } else {
  //       formData.append(key, value)
  //     }
  //   })

  //   try {
  //     await axios.post('/api/rooms', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     message.success('Room updated successfully')
  //   } catch (error) {
  //     message.error('Failed to update the room')
  //   }
  // }

  const onFormFinish = async (values: any) => {
    try {
      const values = await form.validateFields()
      create(values)
    } catch (error: any) {
      const errorFields = error?.errorFields || []

      const firstLangError = errorFields.find(
        (field: any) =>
          Array.isArray(field.name) &&
          languages.some((lang) => lang.lang === field.name[1]),
      )

      if (firstLangError) {
        const langKey = firstLangError.name[1]
        setActiveLang(langKey)
      }
    }
  }
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onFormFinish(values)
    } catch (error: any) {
      const errorFields = error?.errorFields || []

      const firstLangError = errorFields.find(
        (field: any) =>
          Array.isArray(field.name) &&
          languages.some((lang) => lang.lang === field.name[1]),
      )

      if (firstLangError) {
        const langKey = firstLangError.name[1]
        setActiveLang(langKey)
      }
    }
  }

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
            onClick={handleSubmit}
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
            {editing
              ? t('room-types.form.editing-title')
              : t('room-types.form.title')}
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
        // onFinish={onFormFinish}
        layout="vertical"
        className="flex flex-col gap-6 [&_.ant-form-item-required]:before:hidden"
        initialValues={{
          status: false,
        }}
      >
        <Tabs
          className="custom-tabs"
          onChange={(key) => setActiveLang(key)}
          activeKey={activeLang}
          rootClassName="custom-tabs"
          items={languages?.map((lan) => ({
            key: lan.lang,
            label: lan.label,
            forceRender: true,
            children: (
              <>
                <Form.Item
                  label={t('room-types.form.number-room.label')}
                  name={['room_type', lan.lang]}
                  className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
                  rules={[
                    {
                      required: true,
                      message: t('room-types.form.number-room.rule'),
                    },
                  ]}
                >
                  <Input size="large" className="shadow-sm" />
                </Form.Item>

                <Form.Item
                  label={t('room-types.form.description.label')}
                  name={['description', lan.lang]}
                  rules={[
                    {
                      required: true,
                      message: t('room-types.form.description.rule'),
                    },
                  ]}
                >
                  <Input.TextArea className="h-[165px] resize-none shadow-sm" />
                </Form.Item>
              </>
            ),
          }))}
        />

        <Form.Item
          label={t('fields.max-adults.label')}
          name="max_people"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            { required: true, message: t('room-types.form.number-room.rule') },
          ]}
        >
          <CSelect
            size="large"
            placeholder={t('fields.max-adults.placeholder')}
            allowClear
            options={[
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
              { label: 5, value: 5 },
            ]}
            // onChange={(value) => {
            //   form.setFieldValue('room', value) // Set the selected room's id
            // }}
          />
        </Form.Item>
        <Form.Item
          label={t('fields.max-children.label')}
          name="max_child"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            { required: true, message: t('room-types.form.number-room.rule') },
          ]}
        >
          <CSelect
            size="large"
            placeholder={t('fields.max-children.placeholder')}
            allowClear
            options={[
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
              { label: 5, value: 5 },
            ]}
            // onChange={(value) => {
            //   form.setFieldValue('room', value) // Set the selected room's id
            // }}
          />
        </Form.Item>

        <Form.Item
          label={t('fields.facilities.label')}
          name="room_facilities"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            { required: true, message: t('room-types.form.room-type.label') },
          ]}
        >
          <CSelect
            size="large"
            placeholder={t('fields.facilities.placeholder')}
            allowClear
            prefixIcon={
              <BedDoubleIcon className="text-success-dark text-base w-min" />
            }
            options={roomsList?.results.map((val) => ({
              label: val.name,
              value: val.id,
              title: val.name,
            }))}
            labelRender={(props: any) => `${props?.label}`}
            mode="multiple"
          />
        </Form.Item>
        <Form.Item
          label={t('fields.room-photos.label')}
          name="images"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
          rules={[
            { required: false, message: t('room-types.form.room-type.label') },
          ]}
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          valuePropName="fileList"
        >
          <Upload listType="picture-card" beforeUpload={() => false}>
            <div>
              <Button
                type="primary"
                className="bg-transparent text-[#6B7280] flex flex-col w-[90px]"
                icon={<UploadOutlined />}
              >
                <div className="" style={{ marginTop: 8 }}>
                  {t('common.choose-file')}
                </div>
              </Button>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default memo(RoomTypesDrawer)
