import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { App, Avatar, Button, Flex, Form, Input, Modal, Typography } from 'antd'

import { updateCleaningRoom } from '../api'

import NoteIcon from '@/components/icons/note'
import CloseIcon from '@/components/icons/close'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'

import type { Dispatch, FC, SetStateAction } from 'react'
import { IOrdersListItem } from '../types'
import { useBranchIdStore } from '@/store/branch-id-store'

interface IProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  recordId: number | string | null
  refetch: () => void
  data?: IOrdersListItem[]
}

const AddNoteModal: FC<IProps> = ({
  open,
  setOpen,
  recordId,
  refetch,
  data,
}) => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { notification } = App.useApp()
  const { branch } = useBranchIdStore()

  const onFinish = async (values: any) => {
    if (recordId === null) return

    try {
      await updateCleaningRoom({
        id: recordId,
        branch,
        data: { note: values.note },
      })

      setOpen(false)
      refetch() // Trigger refetch of the list
      openNotification()
    } catch (error) {
      console.error('Failed to update:', error)
    }
  }

  const openNotification = () => {
    notification.info({
      closeIcon: null,
      className:
        'w-[406px] border-t-[5px] border-primary rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
      icon: <CheckmarkCircleIcon className="text-[24px] text-primary" />,
      message: (
        <Typography.Text className="font-medium text-[18px] leading-[22.95px]">
          {t('common.changes-saved')}
        </Typography.Text>
      ),
      placement: 'topRight',
      description: (
        <div>
          <Button
            size="small"
            type="text"
            className="grid place-items-center rounded-lg absolute right-[10px] top-[10px]"
            icon={<CloseIcon className="text-base" />}
            onClick={() => notification.destroy()}
          />
          <Typography.Text className="text-secondary text-base">
            {t('common.changes-successfully-saved')}
          </Typography.Text>
          {/* <Button
            danger
            type="text"
            size="small"
            className="flex px-0 mt-[10px] hover:bg-transparent items-center text-[16px] font-medium"
          >
            {t('common.cancel-action')} <CloseIcon className="text-[20px]" />
          </Button> */}
        </div>
      ),
    })
  }

  useEffect(() => {
    if (open) {
      form.setFieldValue(
        'note',
        data?.find((item) => item.id === recordId)?.note,
      )
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      onOk={handleClose}
      onCancel={handleClose}
      centered
      width={515}
      className="p-[40px] [&>.ant-modal-close]:text-primary-dark"
      footer={null}
    >
      <Flex vertical align="center">
        <Avatar
          shape="circle"
          size={62}
          className="bg-[#DBEAFE] mb-5 border-[7px] border-[#EFF6FF]"
          icon={<NoteIcon className="text-[26px] text-primary" />}
        />
        <Typography.Text className="text-[24px] font-bold dark:text-white text-primary-dark leading-[30.6px] mb-[10px]">
          {t('room-cleaning-page.add-note-modal.title')}
        </Typography.Text>
        <Typography.Text className="text-secondary text-center leading-[25.6px] mb-[20px]">
          {t('room-cleaning-page.add-note-modal.description')}
        </Typography.Text>
        <Form
          layout="vertical"
          className="w-full"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label={t('room-cleaning-page.note.label')}
            name="note"
            className="mb-[20px] [&_label]:font-medium"
          >
            <Input.TextArea
              size="large"
              placeholder={t('room-cleaning-page.note.placeholder')}
              className="resize-none h-[174px]"
            />
          </Form.Item>

          <Flex justify="center" gap={16}>
            <Button
              className="text-primary-dark dark:text-white font-semibold"
              onClick={handleClose}
            >
              {t('common.cancel')}
            </Button>
            <Button
              htmlType="submit"
              className="bg-primary text-white font-semibold"
            >
              {t('room-cleaning-page.add-note-modal.title')}
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Modal>
  )
}

export default memo(AddNoteModal)
