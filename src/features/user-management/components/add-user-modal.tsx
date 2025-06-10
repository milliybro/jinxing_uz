import { memo, useEffect } from 'react'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useMutation, useQuery } from '@tanstack/react-query'
import {
  App,
  Avatar,
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Typography,
} from 'antd'
import PhoneInput, { PhoneNumber } from 'antd-phone-input'
import dayjs from 'dayjs'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'

import useUserData from '@/hooks/use-user-data'
import queryClient from '@/utils/query-client'
import { createUser, getGroups, getUser, updateUser } from '../api'

import CSelect from '@/components/cselect'
import generatePassword from '@/helpers/generate-password'

import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import CloseIcon from '@/components/icons/close'
import UserSquareIcon from '@/components/icons/user-square'

import ArrowDownIcon from '@/components/icons/arrow-down'
import { useBranchIdStore } from '@/store/branch-id-store'

interface IProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddUserModal: FC<IProps> = ({ open, setOpen }) => {
  const user = useUserData()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const { search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const openNotification = () => {
    notification.info({
      closeIcon: null,
      className:
        'w-[406px] border-t-[5px] border-primary rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
      icon: <CheckmarkCircleIcon className="text-[24px] text-primary" />,
      message: (
        <Typography.Text className="font-medium text-[18px] leading-[22.95px]">
          {t('user-management.user-edit')}
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
            {t('user-management.user-edit-success')}
          </Typography.Text>
          {/* <Button
            danger
            type="text"
            size="small"
            className="flex px-0 mt-[10px] hover:bg-transparent items-center text-[16px] font-medium"
          >
            {t('comon.cancel-action')} <CloseIcon className="text-[20px]" />
          </Button> */}
        </div>
      ),
    })
  }

  const passwordHandler = () => {
    const password = generatePassword()

    form.setFieldsValue({
      password: password,
      repeat_password: password,
    })
  }

  const { data: roles } = useQuery({
    queryKey: ['user-management-list-roles-filter'],
    cacheTime: 0,
    queryFn: async () => {
      const res = await getGroups()
      return res
    },
  })

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: (values: any) => {
      const { username, email, ...restValues } = values
      const phoneValue: PhoneNumber = values.phone
      const phoneString =
        '+' +
        (phoneValue?.countryCode ?? '') +
        (phoneValue?.areaCode ?? '') +
        (phoneValue?.phoneNumber ?? '')

      const formattedValues = {
        ...restValues,
        ...(username !== singleUser?.username && { username }),
        ...(email !== singleUser?.email && { email }),
        branch_id: branch,
        birth_date: dayjs(values.birthday).format('YYYY-MM-DD'),
        phone: phoneString,
      }

      if (queries.edit) {
        return updateUser(formattedValues, queries?.edit as any)
      }

      return createUser({
        ...formattedValues,
        branch_id: user?.branch_user?.branch,
        groups: [Number(values.groups)],
      })
    },
    onSuccess: () => {
      openNotification()
      form.resetFields()
      queryClient.invalidateQueries(['user-management-list'])
      setOpen(false)
    },
  })

  const showDrawer = () => {
    setOpen((prev) => {
      if (prev) {
        form.resetFields()
        navigate('/user-management', { replace: true })
      }

      return !prev
    })
  }

  const { data: singleUser } = useQuery({
    queryKey: ['user-management-list-user', queries.edit],
    queryFn: async () => {
      const res = await getUser(queries.edit as any)

      return res
    },
    enabled: Boolean(queries.edit) && open,
  })

  useEffect(() => {
    if (open && singleUser && Boolean(queries.edit)) {
      form.setFieldsValue({
        ...singleUser,
        birth_date: singleUser.birth_date ? dayjs(singleUser.birth_date) : '',
        branch_id: singleUser?.branch_user?.branch ?? '',
      })
    }
    if (open && !queries.edit) {
      form.resetFields()
    }
  }, [queries, singleUser])

  const validator = (_: any, { valid }: { valid?: any }) => {
    // if (valid(true)) return Promise.resolve(); // strict validation
    if (valid && valid()) return Promise.resolve() // non-strict validation
    return Promise.reject(t('user-management.modal-form.phone.rule'))
  }

  return (
    <Modal
      open={open}
      centered
      width={515}
      onOk={showDrawer}
      onCancel={showDrawer}
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
          icon={<UserSquareIcon className="text-[26px] text-primary" />}
        />
        {queries.edit ? (
          <>
            <Typography.Text className="text-[24px] font-bold light:text-primary-dark leading-[30.6px] mb-[10px]">
              {t('user-management.edit-user')}
            </Typography.Text>
            <Typography.Text className="text-secondary leading-[25.6px] mb-[20px]">
              {t('user-management.edit-user-click')}
            </Typography.Text>
          </>
        ) : (
          <>
            <Typography.Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[10px]">
              {t('user-management.add-user')}
            </Typography.Text>
            <Typography.Text className="text-secondary leading-[25.6px] mb-[20px]">
              {t('user-management.add-user-click')}
            </Typography.Text>
          </>
        )}
        <Form
          layout="vertical"
          className="w-full [&_.ant-form-item-required]:before:hidden"
          onFinish={create}
          form={form}
        >
          <Form.Item
            label={t('common.name-user')}
            name="first_name"
            className="mb-[20px] [&_label]:font-medium"
            rules={[
              {
                required: true,
                message: t(
                  'user-management.modal-form.first-name.rule',
                ) as string,
              },
            ]}
          >
            <Input
              size="large"
              placeholder={
                t('user-management.modal-form.first-name.placeholder') as string
              }
            />
          </Form.Item>

          <Form.Item
            label={t('common.surname-user')}
            name="last_name"
            className="mb-[20px] [&_label]:font-medium"
            rules={[
              {
                required: true,
                message: t(
                  'user-management.modal-form.last-name.rule',
                ) as string,
              },
            ]}
          >
            <Input
              size="large"
              placeholder={
                t('user-management.modal-form.last-name.placeholder') as string
              }
            />
          </Form.Item>

          <Form.Item
            label={t('user-management.modal-form.gender.label')}
            name="gender"
            className="mb-[16px] [&_label]:font-medium"
            rules={[
              {
                required: true,
                message: t('user-management.modal-form.gender.rule') as string,
              },
            ]}
          >
            <CSelect
              size="large"
              // defaultValue="Массаж"
              placeholder={t('user-management.modal-form.gender.label')}
              options={[
                { label: t('common.male'), value: 'man' },
                { label: t('common.female'), value: 'woman' },
              ]}
              suffixIcon={<ArrowDownIcon />}
              allowClear
            />
          </Form.Item>

          <Form.Item
            label={t('user-management.modal-form.birthday.label')}
            name="birth_date"
            className="mb-[16px] [&_label]:font-medium"
            rules={[
              {
                required: true,
                message: t(
                  'user-management.modal-form.birthday.rule',
                ) as string,
              },
            ]}
          >
            <DatePicker
              size="large"
              placeholder={
                t('user-management.modal-form.birthday.label') as string
              }
              suffixIcon={null}
              className="w-full"
              format="DD-MM-YYYY"
            />
          </Form.Item>

          {/* <Form.Item
            label={t('user-management.modal-form.email.label')}
            name="email"
            className="mb-[16px] [&_label]:font-medium"
            rules={[
              {
                required: true,
                message: t('user-management.modal-form.email.rule1') as string,
              },
              {
                type: 'email',
                message: t('user-management.modal-form.email.rule2') as string,
              },
            ]}
          >
            <Input
              placeholder={
                t('user-management.modal-form.email.placeholder') as string
              }
              size="large"
            />
          </Form.Item> */}

          <Form.Item name="branch_id" hidden>
            <Input placeholder="Введите почту" size="large" />
          </Form.Item>

          <Form.Item
            label={t('user-management.modal-form.phone.label')}
            name="phone"
            className="mb-[16px] [&_label]:font-medium "
            rules={[
              {
                required: true,
                message: t('user-management.modal-form.phone.rule') as string,
                validator,
              },
            ]}
          >
            <PhoneInput size="large" enableSearch={false} />
            {/* <InputNumber
              controls={false}
              size="large"
              placeholder={
                t('user-management.modal-form.phone.label') as string
              }
              className="w-full dark:bg-dark-bg"
              maxLength={12}
              formatter={(value) =>
                `${value}`.replace(
                  /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
                  '$1 $2 $3 $4 $5',
                )
              }
              parser={(value) =>
                value?.replace(/\D/g, '').trim() as unknown as number
              }
            /> */}
          </Form.Item>

          {singleUser?.is_superuser ? null : (
            <Form.Item
              label={t('user-management.modal-form.groups.label') as string}
              name="groups"
              className="mb-[16px] [&_label]:font-medium"
              rules={[
                {
                  required: true,
                  message: t(
                    'user-management.modal-form.phone.label',
                  ) as string,
                },
              ]}
            >
              <CSelect
                size="large"
                // defaultValue="Массаж"
                placeholder={
                  t('user-management.modal-form.groups.label') as string
                }
                options={roles?.results.map((val) => ({
                  label: val.name,
                  value: val.id,
                }))}
              />
            </Form.Item>
          )}

          <Form.Item
            label={t('user-management.modal-form.username.label') as string}
            name="username"
            className="mb-[20px] [&_label]:font-medium"
            rules={[
              {
                required: true,
                message: t('user-management.modal-form.phone.label') as string,
              },
            ]}
          >
            <Input
              size="large"
              placeholder={
                t('user-management.modal-form.username.placeholder') as string
              }
            />
          </Form.Item>

          {queries.edit ? null : (
            <>
              <Form.Item
                noStyle
                shouldUpdate
                // shouldUpdate={(prevValues, currentValues) =>
                //   prevValues.password !== currentValues.password
                // }
              >
                {({ getFieldValue }) => (
                  <Form.Item
                    label={
                      <div className="flex justify-between items-end w-full">
                        <Typography.Text className="text-[14px] font-medium">
                          {t('common.password')}
                        </Typography.Text>
                        <Button
                          size="small"
                          type="link"
                          className={`p-0 text-sm font-medium ${
                            getFieldValue('password') !== undefined
                              ? 'text-secondary'
                              : ''
                          }`}
                          onClick={passwordHandler}
                        >
                          {t('common.generate-password')}
                        </Button>
                      </div>
                    }
                    name="password"
                    className="mb-[20px] [&_label]:w-full [&_label]:after:hidden [&_label]:font-medium"
                    rules={[
                      {
                        required: true,
                        message: t(
                          'user-management.modal-form.phone.label',
                        ) as string,
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder={
                        t(
                          'user-management.modal-form.password.placeholder',
                        ) as string
                      }
                    />
                  </Form.Item>
                )}
              </Form.Item>

              <Form.Item
                label={
                  t('user-management.modal-form.password.repeat-pass') as string
                }
                name="repeat_password"
                dependencies={['password']}
                className="mb-[20px] [&_label]:font-medium [&_.ant-form-item-required]:before:hidden"
                rules={[
                  {
                    required: true,
                    message: t(
                      'user-management.modal-form.password.repeat-rule',
                    ) as string,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error(
                          t(
                            'user-management.modal-form.password.error',
                          ) as string,
                        ),
                      )
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder={
                    t(
                      'user-management.modal-form.password.placeholder',
                    ) as string
                  }
                />
              </Form.Item>
            </>
          )}

          <Flex justify="center" gap={16}>
            <Button
              className="text-primary-dark dark:text-white font-semibold"
              onClick={showDrawer}
            >
              {t('common.cancel')}
            </Button>
            <Button
              htmlType="submit"
              className="bg-primary text-white font-semibold"
              loading={isCreating}
            >
              {queries.edit
                ? t('user-management.edit-user')
                : t('user-management.add-user')}
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Modal>
  )
}

export default memo(AddUserModal)
