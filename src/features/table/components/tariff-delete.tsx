import { useState } from 'react'
import { Avatar, Button, Flex, Modal, Space, Typography } from 'antd'

import DeleteIcon from '@/components/icons/delete'

const TariffDelete = () => {
  const [modalDelete, setModalDelete] = useState(false)

  return (
    <>
      <Button
        type="text"
        danger
        className="flex items-center"
        onClick={() => setModalDelete(true)}
      >
        <DeleteIcon className="text-[20px]" /> Удалить
      </Button>
      <Modal
        open={modalDelete}
        centered
        width={515}
        onOk={() => setModalDelete(false)}
        onCancel={() => setModalDelete(false)}
        classNames={{
          content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
      >
        <Flex vertical align="center" className="text-center">
          <Avatar
            shape="circle"
            size={62}
            className=" bg-[#FEE2E2] mb-5 border-[7px] border-[#FEF2F2]"
            icon={<DeleteIcon className="text-[26px] text-danger" />}
          />
          <Typography.Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[10px]">
            Хотите удалить тариф?
          </Typography.Text>
          <Typography.Text className="text-secondary leading-[25.6px] mb-[20px]">
            Подтвердите, что вы действительно хотите удалить данный тариф?
          </Typography.Text>
          <Space>
            <Button
              className="text-primary-dark font-semibold"
              onClick={() => setModalDelete(false)}
            >
              Отмена
            </Button>
            <Button className="bg-primary-dark text-white font-semibold">
              Удалить
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}

export default TariffDelete
