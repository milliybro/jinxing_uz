import { useState } from 'react'
import { Button, Flex, Modal, Space, Typography } from 'antd'

import Breadcrumb from '@/components/breadcrumb'
import VideoReplayIcon from '@/components/icons/video-replay'

import banner from '../assets/instruction-banner.png'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BookingsHeader = () => {
  const [showInstruction, setShowInstruction] = useState(false)
  const params = useParams()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      <Breadcrumb
        items={[
          {
            title: t('common.main'),
            href: '/',
          },
          {
            title: `${t('common.booking-details')} #${params?.id}`,
          },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Typography.Text className="text-2xl font-semibold leading-[30.6px]">
          {t('common.booking-details')} #{params?.id}
          </Typography.Text>

          {/* <Button
            type="link"
            size="small"
            className="flex items-center font-medium"
            onClick={() => setShowInstruction(true)}
          >
            Иструкция <VideoReplayIcon className="text-[20px]" />
          </Button> */}
        </div>
        {/* <Button
          type="link"
          size="small"
          className="flex items-center font-medium"
        >
          Экспортировать данные <FileDownloadIcon className="text-[20px]" />
        </Button> */}
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
          <Typography.Text className="text-[24px] mb-[10px] font-bold leading-[30.6px]">
            Видео инструкция
          </Typography.Text>
          <Typography.Text className="text-secondary mb-[20px]">
            Далее вы можете ознакомиться с видео инструкцией, как работать с
            разделом бронирования, а также с другими важными разделами нашей
            платформы
          </Typography.Text>
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

export default BookingsHeader
