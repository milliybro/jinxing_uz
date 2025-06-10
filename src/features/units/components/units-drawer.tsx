import CloseIcon from '@/components/icons/close'
import { useBranchIdStore } from '@/store/branch-id-store'
import queryClient from '@/utils/query-client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Drawer, Form, Input, Tabs } from 'antd'
import { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { createUnit, getSingleUnit, updateUnit } from '../api'
import { ICreateUnitForm } from '../types'

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

const Unitsdrawer: FC<IProps> = ({ openDrawer, setOpenDrawer }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm<ICreateUnitForm>()
  const [searchParams] = useSearchParams()
  const { branch } = useBranchIdStore()
  const navigate = useNavigate()

  const editing = searchParams.get('edit')

  const showDrawer = () => {
    setOpenDrawer((prev) => {
      if (prev) {
        form.resetFields()
        navigate('/units', { replace: true })
      }

      return !prev
    })
  }

  const { mutate: createUnitMutate } = useMutation({
    mutationKey: ['create-unit'],
    mutationFn: (values: ICreateUnitForm) => createUnit({ ...values, branch }),
    onSuccess: () => {
      showDrawer()
      queryClient.invalidateQueries(['units', branch])
    },
  })

  const { mutate: updateMutate } = useMutation({
    mutationKey: ['create-unit'],
    mutationFn: (values: ICreateUnitForm) =>
      updateUnit({ ...values, branch, id: Number(editing) }),
    onSuccess: () => {
      showDrawer()
      queryClient.invalidateQueries(['units', branch])
    },
  })

  const { isFetching } = useQuery({
    queryKey: ['single-unit', branch, editing],
    queryFn: () => getSingleUnit(branch, Number(editing)),
    enabled: Boolean(editing),
    onSuccess: (data) => {
      form.setFieldsValue(data)
    },
    cacheTime: 0,
  })

  return (
    <Drawer
      width={581}
      closeIcon={null}
      loading={isFetching}
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
            form="add-unit-form"
            // loading={isCreating}
          >
            {t('common.save')}
          </Button>
        </div>
      }
      title={
        <div className="flex w-full items-center justify-between">
          <span className="text-[18px] font-medium">
            {editing ? t('units-page.edit-unit') : t('units-page.add-unit')}
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
        id="add-unit-form"
        layout="vertical"
        className="flex flex-col gap-6 [&_.ant-form-item-required]:before:hidden"
        onFinish={editing ? updateMutate : createUnitMutate}
      >
        <Tabs
          className="custom-tabs"
          rootClassName="custom-tabs"
          defaultActiveKey="en"
          items={languages?.map((lan) => ({
            key: lan.lang,
            label: lan.label,
            forceRender: true,
            children: (
              <>
                <Form.Item
                  label={t('units-page.unit-name')}
                  name={['translations', lan.lang, 'name']}
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
              </>
            ),
          }))}
        />
      </Form>
    </Drawer>
  )
}

export default Unitsdrawer
