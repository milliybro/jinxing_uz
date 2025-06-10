import { useState } from 'react'
import { Button, Flex, Modal, Space, Typography } from 'antd'

import Breadcrumb from '@/components/breadcrumb'
import VideoReplayIcon from '@/components/icons/video-replay'

import banner from '../assets/instruction-banner.png'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

const BookingsHeader = () => {
  const { t } = useTranslation()
  const [showInstruction, setShowInstruction] = useState(false)

  return (
    <div className="flex flex-col">
      <Breadcrumb
        items={[
          {
            title: t('common.main'),
            href: '/',
          },
          {
            title: t('new-booking-page.title'),
          },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Text className="text-2xl font-semibold leading-[30.6px]">
            {t('new-booking-page.title')}
          </Text>
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
          <Text className="text-[24px] mb-[10px] font-bold leading-[30.6px]">
            {t('video-instruction.title')}
          </Text>
          <Text className="text-secondary mb-[20px]">
            {t('video-instruction.description')}
          </Text>
          <Space>
            <Button type="primary" className="bg-primary hover:bg-primary/50">
              {t('video-instruction.watch-video')}
            </Button>
            <Button
              type="text"
              className="text-secondary"
              onClick={() => setShowInstruction(false)}
            >
              {t('video-instruction.next-time')}
            </Button>
          </Space>
        </Flex>
      </Modal>
    </div>
  )
}

export default BookingsHeader
