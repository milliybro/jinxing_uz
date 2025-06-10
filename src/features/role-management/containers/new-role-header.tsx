import { useState } from 'react'
import { Button, Flex, Modal, Space, Typography } from 'antd'

import Breadcrumb from '@/components/breadcrumb'
import VideoReplayIcon from '@/components/icons/video-replay'

import banner from '../assets/instruction-banner.png'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

const NewRoleHeader = () => {
  const [showInstruction, setShowInstruction] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      <Breadcrumb
        items={[
          {
            title: t('common.main'),
            href: '/',
          },
          { title: t('common.role-management'), href: '/role-management' },
          { title: t('common.new-role'), href: '/role-management/new-role' },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Text className="text-2xl font-semibold leading-[30.6px]">
            {t('common.new-role')}
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

export default NewRoleHeader
