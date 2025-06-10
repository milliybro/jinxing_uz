import { useState } from 'react'
import { Button, Card, Flex, Modal, Space, Typography } from 'antd'

import Breadcrumb from '@/components/breadcrumb'

import GuestsTable from '../components/guests-table'
import GuestsHeader from '../components/table-header'
import VideoReplayIcon from '@/components/icons/video-replay'

import banner from '../assets/instruction-banner.png'

const { Text } = Typography

export default function Table(): React.ReactElement {
  const [showInstruction, setShowInstruction] = useState(false)

  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <Breadcrumb
          items={[
            {
              title: 'Главная',
              href: '/',
            },
            {
              title: 'Шахматка',
            },
          ]}
        />
        <div className="flex items-center mb-6">
          <Text className="text-2xl font-semibold leading-[30.6px]">
            Шахматка
          </Text>

          {/* <Button
            type="link"
            size="small"
            className="flex items-center font-medium"
            onClick={() => setShowInstruction(true)}
          >
            Иструкция <VideoReplayIcon className="text-[20px]" />
          </Button> */}
        </div>
        <Card
          className="mb-[50px] flex-1 overflow-hidden"
          classNames={{ body: '' }}
        >
          <GuestsHeader />
          <div className="overflow-auto w-full h-full max-h-[550px]">
            <GuestsTable />
          </div>
        </Card>
      </div>
      <Modal
        width={733}
        centered
        open={showInstruction}
        onOk={() => setShowInstruction(false)}
        onCancel={() => setShowInstruction(false)}
        footer={null}
        styles={{ content: { padding: 0, overflow: 'hidden' } }}
      >
        <div className="w-full h-[200px]">
          <img src={banner} alt="" className="w-full h-full object-cover" />
        </div>
        <Flex vertical className="p-[40px] text-center" align="center">
          <Text className="text-[24px] mb-[10px] font-bold leading-[30.6px]">
            Видео инструкция
          </Text>
          <Text className="text-secondary mb-[20px]">
            Далее вы можете ознакомиться с видео инструкцией, как работать с
            разделом бронирования, а также с другими важными разделами нашей
            платформы
          </Text>
          <Space>
            <Button type="primary" className="bg-primary hover:bg-primary/50">
              Посмотреть видео
            </Button>
            <Button
              type="text"
              className="text-secondary"
              onClick={() => setShowInstruction(false)}
            >
              В следующий раз
            </Button>
          </Space>
        </Flex>
      </Modal>
    </div>
  )
}
