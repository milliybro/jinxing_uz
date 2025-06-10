import { Button, Flex, Modal, Space, Typography } from 'antd'
import { useState } from 'react'

import Breadcrumb from '@/components/breadcrumb'
// import VideoReplayIcon from '@/components/icons/video-replay'
import FileDownloadIcon from '@/components/icons/file-download'

const { Text } = Typography

import banner from '../assets/instruction-banner.png'
// import CancelCircleIcon from '@/components/icons/cancel-circle'
import ReloadIcon from '@/components/icons/reload'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

const TransactionsHeader = () => {
  const [showInstruction, setShowInstruction] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <div className="flex flex-col">
      <Breadcrumb
        items={[
          {
            title: t('common.main'),
            href: '/',
          },
          {
            title: t('transactions-page.title'),
          },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Text className="text-2xl font-semibold leading-[30.6px]">
            {t('transactions-page.title')}
          </Text>
        </div>
        <div className="flex items-center gap-6">
          <Button
            type="link"
            size="small"
            className="flex items-center font-medium text-[#DC2626]"
            onClick={() => navigate(pathname, { replace: true })}
          >
            {t('common.reset')} <ReloadIcon className="text-[20px]" />
          </Button>
          <Button
            type="link"
            size="small"
            className="flex items-center font-medium"
          >
            {t('common.export-data')}
            <FileDownloadIcon className="text-[20px]" />
          </Button>
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

export default TransactionsHeader
