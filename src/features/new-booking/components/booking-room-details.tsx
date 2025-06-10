import { useState } from 'react'
import { Button, Flex, Form, Input, Modal, Space, Typography } from 'antd'

import { colors } from '@/config/theme'
import InformationCircleIcon from '@/components/icons/information-circle'

import type { FC } from 'react'

const BookingRoomDetails: FC<{ text: string }> = ({ text }) => {
  const [modalDelete, setModalDelete] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Typography.Text className="text-sm font-medium">
            {text}
          </Typography.Text>
          <button type="button" onClick={() => setModalDelete(true)}>
            <InformationCircleIcon className="text-[18px] text-primary" />
          </button>
        </div>
        <Typography.Text className="text-xs text-secondary">
          Стандартный
        </Typography.Text>
      </div>
      <Modal
        open={modalDelete}
        centered
        width={515}
        title={
          <Flex vertical gap={8}>
            <Typography.Text className="text-[18px] leading-[22.95px]">
              {text}
            </Typography.Text>
            <Typography.Text className="font-normal leading-[22.4px] text-secondary">
              Стандартный номер
            </Typography.Text>
          </Flex>
        }
        onOk={() => setModalDelete(false)}
        onCancel={() => setModalDelete(false)}
        styles={{ header: { borderBottom: `1px solid ${colors.border}` } }}
        classNames={{
          body: 'p-[40px] pt-5',
          content: 'p-0 [&>.ant-modal-close]:text-primary-dark',
          header: 'px-[40px] py-[20px] m-0 ',
        }}
        footer={null}
      >
        <Flex vertical align="center" className="text-center">
          {/* <Avatar
            shape="circle"
            size={62}
            className=" bg-[#FEE2E2] mb-5 border-[7px] border-[#FEF2F2]"
            icon={<DeleteIcon className="text-[26px] text-danger" />}
          />
          <Typography.Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[10px]">
            Хотите удалить номер?
          </Typography.Text>
          <Typography.Text className="text-secondary leading-[25.6px] mb-[20px]">
            Подтвердите, что вы действительно хотите удалить номер с данного
            тура?
          </Typography.Text> */}
          <Form className="w-full mb-5">
            <div className="grid grid-cols-2 items-center py-2">
              <Typography.Text className="text-start text-[15px] font-medium leading-[24px]">
                9 января, 2024
              </Typography.Text>
              <Form.Item className="m-0">
                <Input
                  //   className="max-w-[213px]"
                  //   className="text-red-"
                  size="large"
                  placeholder="0"
                  suffix={
                    <Typography.Text className="font-medium  text-[15px] leading-[18.15px] text-secondary">
                      UZS
                    </Typography.Text>
                  }
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 mb-2">
              <span>{}</span>
              <div className="flex items-start">
                <button type="button" className="text-primary text-sm">
                  Применить ко всем
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center py-2">
              <Typography.Text className="text-start">
                9 января, 2024
              </Typography.Text>
              <Form.Item className="m-0">
                <Input
                  size="large"
                  placeholder="0"
                  suffix={
                    <Typography.Text className="font-medium  text-[15px] leading-[18.15px] text-secondary">
                      UZS
                    </Typography.Text>
                  }
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 items-center py-2">
              <Typography.Text className="text-start">
                9 января, 2024
              </Typography.Text>
              <Form.Item className="m-0">
                <Input
                  size="large"
                  placeholder="0"
                  suffix={
                    <Typography.Text className="font-medium  text-[15px] leading-[18.15px] text-secondary">
                      UZS
                    </Typography.Text>
                  }
                />
              </Form.Item>
            </div>
          </Form>
          <Space>
            <Button
              className="text-primary-dark font-semibold"
              onClick={() => setModalDelete(false)}
            >
              Отмена
            </Button>
            <Button className="bg-primary text-white font-semibold">
              Сохранить изменения
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}

export default BookingRoomDetails
