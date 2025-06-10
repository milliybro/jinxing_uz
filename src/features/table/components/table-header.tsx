import { DatePicker, Form, Switch } from 'antd'

import 'dayjs/locale/ru'

import CSelect from '@/components/cselect'
import CalendarIcon from '@/components/icons/calendar'
import CheckmarkIcon from '@/components/icons/checkmark'
import BedDoubleIcon from '@/components/icons/bed-double'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import FlowConnectionIcon from '@/components/icons/flow-connection'

const TableHeader = () => {
  const [form] = Form.useForm()

  return (
    <Form form={form} layout="vertical" className="grid grid-cols-4 gap-6 mb-6">
      <Form.Item label="Канал продаж">
        <CSelect
          size="large"
          placeholder="Выберите статус"
          prefixIcon={
            <FlowConnectionIcon className="text-success-dark text-base" />
          }
          mode="multiple"
          showSearch={false}
          options={[
            {
              value: 'Все статусы',
              label: 'Все статусы',
            },
            {
              value: 'Подтверждено',
              label: 'Подтверждено',
            },
            {
              value: 'Отменено',
              label: 'Отменено',
            },
            {
              value: 'Выехал',
              label: 'Выехал',
            },
          ]}
          optionRender={(props: any) => {
            return <span className="font-medium">{props.value}</span>
          }}
          menuItemSelectedIcon={({ isSelected }: any) =>
            isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
          }
          tagRender={(props: any) => (
            <div>
              <span className="text-xs leading-3">{props.value}</span>
            </div>
          )}
        />
      </Form.Item>
      <Form.Item label="Типы номеров">
        <CSelect
          size="large"
          placeholder="Выберите тип"
          prefixIcon={<BedDoubleIcon className="text-success-dark text-base" />}
          options={[
            {
              value: 'Эконом',
              label: 'Эконом',
            },
            {
              value: 'Стандарт',
              label: 'Стандарт',
            },
            {
              value: 'Люкс',
              label: 'Люкс',
            },
          ]}
          optionRender={(props: any) => {
            return <span className="font-medium">{props.value}</span>
          }}
        />
      </Form.Item>
      <Form.Item
        label="Начало периода"
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
      >
        <DatePicker
          inputReadOnly
          placeholder="Укажите дату"
          size="large"
          className="px-4 w-full h-[47px]"
          showNow={false}
          superPrevIcon={null}
          superNextIcon={null}
          suffixIcon={<CalendarIcon className="text-success-dark text-base" />}
        />
      </Form.Item>
      <Form.Item
        label="Конец периода"
        className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
      >
        <DatePicker
          inputReadOnly
          placeholder="Укажите дату"
          size="large"
          className="px-4 w-full h-[47px]"
          showNow={false}
          superPrevIcon={null}
          superNextIcon={null}
          suffixIcon={<CalendarIcon className="text-success-dark text-base" />}
        />
      </Form.Item>
    </Form>
  )
}

export default TableHeader
