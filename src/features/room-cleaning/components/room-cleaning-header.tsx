import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Flex, Form, Modal, Space, Typography } from 'antd'

import CSelect from '@/components/cselect'
import Breadcrumb from '@/components/breadcrumb'
// import VideoReplayIcon from '@/components/icons/video-replay'
import FileDownloadIcon from '@/components/icons/file-download'

import banner from '../assets/instruction-banner.png'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

const RoomCleaningHeader = ({ exportToExcel }: any) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [showInstruction, setShowInstruction] = useState(false)
  const [addPaymentModal, setAddPaymentModal] = useState(false)

  return (
    <div className="flex flex-col">
      <Breadcrumb
        items={[
          {
            title: t('common.main'),
            href: '/',
          },
          {
            title: t('common.room-cleaning'),
          },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Text className="text-2xl font-semibold leading-[30.6px]">
            {t('common.room-cleaning')}
          </Text>

          <Button
            type="link"
            size="small"
            className="flex items-center font-medium"
            onClick={() => navigate('/all-maids')}
          >
            {t('common.maids')} <FileDownloadIcon className="text-[20px]" />
          </Button>
        </div>
        <Button
          type="link"
          size="small"
          className="flex items-center font-medium"
          onClick={() => setAddPaymentModal(true)}
        >
          {t('common.export-data')} <FileDownloadIcon className="text-[20px]" />
        </Button>
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
            {t('common.video-instruction.title')}
          </Text>
          <Text className="text-secondary mb-[20px]">
            {t('common.video-instruction.description')}
          </Text>
          <Space>
            <Button type="primary" className="bg-primary hover:bg-primary/50">
              {t('common.video-instruction.watch-video')}
            </Button>
            <Button
              type="text"
              className="text-secondary"
              onClick={() => setShowInstruction(false)}
            >
              {t('common.video-instruction.next-time')}
            </Button>
          </Space>
        </Flex>
      </Modal>

      <Modal
        open={addPaymentModal}
        centered
        width={515}
        onOk={() => setAddPaymentModal(false)}
        onCancel={() => setAddPaymentModal(false)}
        classNames={{
          content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
      >
        <Flex vertical align="center">
          <Avatar
            shape="circle"
            size={62}
            className=" bg-[#DBEAFE] mb-5 border-[7px] border-[#EFF6FF]"
            icon={<FileDownloadIcon className="text-[26px] text-primary" />}
          />
          <Typography.Text className="text-[24px] font-bold light:text-primary-dark leading-[30.6px] mb-[10px]">
            {t('common.export')}
          </Typography.Text>
          <Typography.Text className="text-secondary text-center leading-[25.6px] mb-[20px]">
            {t('room-cleaning-page.export-info')}
          </Typography.Text>
          <Form
            layout="vertical"
            className="w-full"
            // onFinish={mutate}
            // form={form}
          >
            <Form.Item
              label={t('room-cleaning-page.type.label')}
              name="type"
              className="mb-[16px]"
            >
              <CSelect
                size="large"
                // defaultValue="Массаж"
                placeholder={t('room-cleaning-page.type.placeholder')}
                // options={paymentTypes?.results.map((val) => ({
                //   label: val?.name,
                //   value: val?.id,
                // }))}
              />
            </Form.Item>

            <Form.Item
              label={t('room-cleaning-page.maid_type.label')}
              name="maid_type"
              className="mb-[16px]"
            >
              <CSelect
                size="large"
                // defaultValue="Массаж"
                placeholder={t('room-cleaning-page.maid_type.placeholder')}
                // options={paymentTypes?.results.map((val) => ({
                //   label: val?.name,
                //   value: val?.id,
                // }))}
              />
            </Form.Item>
            <Flex justify="center" gap={16}>
              <Button
                className="text-primary-dark dark:text-white font-semibold"
                onClick={() => setAddPaymentModal(false)}
              >
                {t('common.cancel')}
              </Button>
              <Button
                htmlType="submit"
                className="bg-primary text-white font-semibold"
                onClick={exportToExcel}
                // loading={isLoading}
              >
                {t('common.export')}
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Modal>
    </div>
  )
}

export default RoomCleaningHeader
