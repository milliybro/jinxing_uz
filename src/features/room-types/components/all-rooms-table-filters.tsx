import dayjs from 'dayjs'
import queryString from 'query-string'
import { Form, InputNumber } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import 'dayjs/locale/ru'
import { getRoomsList } from '@/api'

import CSelect from '@/components/cselect'

import UserIcon from '@/components/icons/user'
import CheckmarkIcon from '@/components/icons/checkmark'
import BedDoubleIcon from '@/components/icons/bed-double'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import FileVerifiedIcon from '@/components/icons/file-verified'
import { useBranchIdStore } from '@/store/branch-id-store'

const AllRoomsTableFilters = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname, search: restQueries } = useLocation()
  const queries = queryString.parse(restQueries)

  const { branch } = useBranchIdStore()

  const { data: roomsList } = useQuery({
    queryKey: ['rooms-list-r'],
    queryFn: async () => {
      const res = await getRoomsList({ branch })
      return res
    },
  })

  return (
    <Form
      form={form}
      layout="vertical"
      className="grid grid-cols-3 gap-6 mb-6"
      onFieldsChange={(val) => {
        const search = queryString.stringify({
          ...queries,
          [val?.[0].name?.[0]]:
            val?.[0].value &&
            (val?.[0].name?.[0] === 'start_date' ||
              val?.[0].name?.[0] === 'end_date')
              ? dayjs(val?.[0].value).format('YYYY-MM-DD')
              : val?.[0].value || undefined,
        })
        navigate({ pathname, search })
      }}
      initialValues={{
        ...queries,
      }}
    >
      <Form.Item label="Тип номера" name="room">
        <CSelect
          size="large"
          placeholder="Выберите тип номера"
          allowClear
          prefixIcon={<BedDoubleIcon className="text-success-dark text-base" />}
          options={roomsList?.results.map((val) => ({
            label: val.description,
            value: `${val.id}`,
            title: val.name,
          }))}
          optionRender={(props: any) => {
            return (
              <div className="flex items-center">
                <div className="font-medium w-[100px]">{props?.data.title}</div>
                <div className="font-medium text truncate text-xs text-secondary w-full">
                  {props?.label}
                </div>
              </div>
            )
          }}
          labelRender={(props: any) => `${props.title} - ${props.label}`}
          tagRender={(props: any) => (
            <span className="text-xs leading-3">{props?.label}</span>
          )}
        />
      </Form.Item>

      <Form.Item label="Статус" name="status">
        <CSelect
          size="large"
          placeholder="Выберите статус"
          prefixIcon={
            <FileVerifiedIcon className="text-success-dark text-base" />
          }
          mode="multiple"
          showSearch={false}
          options={[
            {
              value: 'true',
              label: 'Активные',
            },
            {
              value: 'false',
              label: 'Неактивные',
            },
          ]}
          optionRender={(props: any) => {
            return <span className="font-medium">{props.label}</span>
          }}
          menuItemSelectedIcon={({ isSelected }: any) =>
            isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
          }
          tagRender={(props: any) => (
            <span className="leading-3 mr-2">{props.label}, </span>
          )}
        />
      </Form.Item>

      <Form.Item label="Максимум кол-во взрослых" name="person_count">
        <InputNumber
          size="large"
          placeholder="Введите кол-во"
          className="w-full"
          controls={false}
          maxLength={2}
          prefix={<UserIcon className="text-success-dark text-base mr-1" />}
        />
      </Form.Item>
    </Form>
  )
}

export default AllRoomsTableFilters
