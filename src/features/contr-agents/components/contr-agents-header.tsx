import { Form, Input } from 'antd'

import SearchIcon from '@/components/icons/search'

import 'dayjs/locale/ru'

const ContrAgentsHeader = () => {
  const [form] = Form.useForm()


  return (
    <Form
      form={form}
      layout="vertical"
      className="grid grid-cols-1 gap-6 mb-6"
    >
      <Form.Item label="Поиск контрагента" name="search">
        <Input
          size="large"
          placeholder="Введите название"
          prefix={<SearchIcon className=" text-base mr-1" />}
        />
      </Form.Item>
    </Form>
  )
}

export default ContrAgentsHeader
