import { useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  Form,
  Input,
  notification,
  Switch,
  Typography,
} from 'antd'
import AddCircleIcon from '@/components/icons/add-circle'
import {
  createUserRole,
  getRolePermissions,
  getUserRole,
  updateRole,
} from '../api'
import { useMutation, useQuery } from '@tanstack/react-query'
import CloseIcon from '@/components/icons/close'
import RoleNotSelected from '../components/role-not-found'
import { useLocation, useNavigate } from 'react-router-dom'
import queryClient from '@/utils/query-client'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'

interface Item {
  id: number
  name: string
}
interface ErrorResponse {
  message: string
}

const NewRoleTable = () => {
  const { search, pathname } = useLocation()
  const [form] = Form.useForm()
  const [checkedItems, setCheckedItems] = useState<Item[]>([])
  const { t } = useTranslation()
  const navigate = useNavigate()
  const checked = Form.useWatch('status', form)

  const roleId = queryString.parse(search)?.id

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Item,
    children: Item[] = [],
  ) => {
    const { checked } = e.target
    setCheckedItems((prev: Item[]) => {
      if (checked) {
        return [
          ...prev,
          { id: item.id, name: item.name },
          ...children.map((child) => ({ id: child.id, name: child.name })),
        ]
      } else {
        return prev.filter(
          (i) =>
            i.id !== item.id && !children.some((child) => child.id === i.id),
        )
      }
    })
  }

  const handleRemoveItem = (id: number) => {
    setCheckedItems((prev) => prev.filter((i) => i.id !== id))
  }

  const { data: list } = useQuery({
    queryKey: ['user-roles'],
    queryFn: async () => {
      if (!roleId) return
      const res = await getUserRole()
      return res.results
    },
  })

  const { data } = useQuery({
    queryKey: ['role-permissions', roleId],
    queryFn: async () => {
      const res = await getRolePermissions({ id: roleId })
      return res
    },
    onSuccess: (data) => {
      form.setFieldsValue({
        name: data.name,
      })

      setCheckedItems(
        data.permissions.map((perm) => ({ id: perm.id, name: perm.name })),
      )
    },
    enabled: !!roleId,
  })

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: (values: { name: string }) => {
      const body = {
        name: values.name,
        status: checked,
        permissions: checkedItems.map((item) => item.id), // Map the IDs from checkedItems
        translations: {
          en: { name: values.name },
          ru: { name: values.name },
          'uz-latin': { name: values.name },
          'uz-cyrillic': { name: values.name },
        },
      }

      if (pathname.includes('edit-role')) {
        return updateRole(body, roleId!)
      }

      return createUserRole(body)
    },
    onSuccess: () => {
      openNotification()
      queryClient.invalidateQueries(['user-roles', 'role-permissions'])
      navigate('/role-management/')
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      form.setFields([
        {
          name: 'name',
          errors: [error.response?.data?.message || 'Error saving role'],
        },
      ])
    },
  })

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

  const onFinish = (values: () => void) => {
    create(values)
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="mb-[50px] overflow-hidden">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="grid grid-cols-11 gap-3"
        >
          <Form.Item
            label={t('role-management.role-name')}
            name="name"
            rules={[
              { required: true, message: t('role-management.rule') as string },
            ]}
            className="mb-6 col-span-9"
          >
            <Input
              size="large"
              placeholder={t('role-management.placeholder') as string}
              className="shadow-sm"
            />
          </Form.Item>
          <div className="inline-flex justify-center items-center gap-2 col-span-2">
            <Form.Item
              name="status"
              className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
            >
              <Switch />
            </Form.Item>
            <Typography.Text className="text-secondary text-sm font-normal">
              {checked ? t('common.active') : t('common.inactive')}
            </Typography.Text>
          </div>
        </Form>

        <div className="border flex items-center justify-between border-b-0 dark:border-slate-700 px-[24px] py-3">
          <Typography.Text className="text-xs text-secondary font-medium">
            {t('common.function')}
          </Typography.Text>
          <Checkbox
            className="flex-row-reverse last:[&_span]:text-secondary last:[&_span]:font-medium last:[&_span]:text-xs justify-between after:hidden"
            onChange={(e) => {
              if (e.target.checked) {
                const allItems =
                  list?.flatMap((item) =>
                    item.permissions.map((perm) => ({
                      id: perm.id,
                      name: perm.name,
                    })),
                  ) || []
                setCheckedItems(allItems)
              } else {
                setCheckedItems([])
              }
            }}
          >
            {t('common.select-all')}
          </Checkbox>
        </div>
        <Collapse
          expandIcon={() => <AddCircleIcon className="text-[24px]" />}
          items={list?.map((item) => {
            const childPermissions = item.permissions.map((perm) => ({
              id: perm.id,
              name: perm.name,
            }))
            return {
              key: item.id.toString(),
              label: (
                <div className="flex items-center justify-between">
                  {item.model}
                  <Checkbox
                    checked={childPermissions.every((perm) =>
                      checkedItems.some((checked) => checked.id === perm.id),
                    )}
                    onChange={(e: any) =>
                      handleCheckboxChange(
                        e,
                        { id: item.id, name: item.model },
                        childPermissions,
                      )
                    }
                  />
                </div>
              ),
              children: (
                <ul>
                  {item.permissions.map((permission) => (
                    <li
                      key={permission.id}
                      className="border-b border-border last:border-none dark:border-slate-700"
                    >
                      <Checkbox
                        className="flex-row-reverse py-3 pl-[52px] pr-[24px] w-full justify-between after:hidden"
                        checked={checkedItems.some(
                          (checked) => checked.id === permission.id,
                        )}
                        onChange={(e: any) =>
                          handleCheckboxChange(e, {
                            id: permission.id,
                            name: permission.name,
                          })
                        }
                      >
                        {permission.name}
                      </Checkbox>
                    </li>
                  ))}
                </ul>
              ),
              className:
                'bg-white dark:bg-primary-dark [&_.ant-collapse-content-box]:p-0',
            }
          })}
        />
      </Card>
      <Card className="mb-[50px] p-4 w-full dark:text-dark-bg ">
        <div className="inline-block w-full">
          {checkedItems && checkedItems.length ? (
            <div className="flex flex-wrap gap-4 ">
              {checkedItems.map((item) => (
                <div
                  className="flex items-center py-2 px-3 bg-[#F4F5F7] dark:bg-dark-bg dark:text-white "
                  key={item.id}
                >
                  {item.name}
                  <Button
                    size="small"
                    type="text"
                    className=""
                    icon={<CloseIcon className="text-base" />}
                    onClick={() => handleRemoveItem(item.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full">
              <RoleNotSelected />
            </div>
          )}
        </div>
        <Divider className="my-6" />
        <div className="flex justify-end items-center gap-3">
          <Button
            size="large"
            className="w-[150px]"
            type="default"
            htmlType="reset"
            onClick={() => {
              setCheckedItems([])
              
              form.resetFields()
              navigate('/role-management/')
            }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            size="large"
            className="w-[150px]"
            type="primary"
            htmlType="submit"
            onClick={() => form.submit()}
          >
            {isCreating ? t('common.saving') : t('common.save')}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default NewRoleTable
