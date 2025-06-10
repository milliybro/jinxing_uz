import { Fragment, useState } from 'react'
import { Button, Divider, Form, Input, Typography } from 'antd'

import PlusIcon from '@/components/icons/plus'
import DeleteIcon from '@/components/icons/delete'

const GuestInformation = () => {
  const [guests, setGuests] = useState(0)
  return (
    <div className="flex flex-col max-h-[635px] h-full overflow-auto">
      <Typography.Text className="text-[18px] font-medium">
        Информация о гостях
      </Typography.Text>
      <Divider />
      <Form className="grid grid-cols-3 gap-4 mb-6" layout="vertical">
        <Form.Item label="Имя">
          <Input placeholder="Введите имя" size="large" />
        </Form.Item>
        <Form.Item label="Фамилия">
          <Input placeholder="Введите фамилию" size="large" />
        </Form.Item>
        <Form.Item label="Паспортные данные">
          <Input placeholder="AC 0000000" size="large" />
        </Form.Item>
        <Form.Item label="Год рождения">
          <Input placeholder="Год рождения" size="large" />
        </Form.Item>
        <Form.Item label="Страна">
          <Input placeholder="Страна" size="large" />
        </Form.Item>
        <Form.Item label="Номер телефона">
          <Input placeholder="Введите номер" size="large" />
        </Form.Item>
        <Form.Item label="E-mail">
          <Input placeholder="Введите электронную почту" size="large" />
        </Form.Item>
      </Form>
      {[...Array(guests)].map((_, i) => (
        <Fragment key={`new-guests-${i}`}>
            <Divider />
          <div className="mb-4 flex items-center">
            <Typography.Text className="text-[18px] font-medium">
              Информация о гостях
            </Typography.Text>
            <div className="">
              <Button
                danger
                type="text"
                className="text-base w-14 h-12 p-4 ps-20 font-medium flex items-center leading-[16.4px]"
              >
                <DeleteIcon className="text-[20px]" />  Удалить
              </Button>
            </div>
          </div>
          <Form className="grid grid-cols-3 gap-4 mb-6" layout="vertical">
            <Form.Item label="Имя">
              <Input placeholder="Введите имя" size="large" />
            </Form.Item>
            <Form.Item label="Фамилия">
              <Input placeholder="Введите фамилию" size="large" />
            </Form.Item>
            <Form.Item label="Паспортные данные">
              <Input placeholder="AC 0000000" size="large" />
            </Form.Item>
            <Form.Item label="Год рождения">
              <Input placeholder="Год рождения" size="large" />
            </Form.Item>
            <Form.Item label="Страна">
              <Input placeholder="Страна" size="large" />
            </Form.Item>
            <Form.Item label="Номер телефона">
              <Input placeholder="Введите номер" size="large" />
            </Form.Item>
            <Form.Item label="E-mail">
              <Input placeholder="Введите электронную почту" size="large" />
            </Form.Item>
            
          </Form>
        </Fragment>
      ))}
      <Button
        type="dashed"
        className="flex border-primary text-base text-primary items-center font-medium w-full justify-center"
        onClick={() => setGuests((prev) => prev + 1)}
      >
        <PlusIcon />
        Дополнительный гость
      </Button>
    </div>
  )
}

export default GuestInformation
