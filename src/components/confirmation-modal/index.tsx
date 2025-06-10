import { Avatar, Button, Flex, Modal, Space, Typography } from 'antd'

// import DeleteIcon from '../icons/delete'

import { type Dispatch, type FC, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

const { Text } = Typography

interface IProps {
  title: string
  subTitle: string
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  isLoading?: boolean
  action?: any
  icon: any
  danger?: boolean
  warn?: boolean
  primaryBtnText: string
}

const ConfirmationModal: FC<IProps> = ({
  open,
  title,
  subTitle,
  setOpen,
  isLoading,
  action,
  icon,
  danger,
  primaryBtnText,
  warn,
}) => {
  const { t } = useTranslation()
  const cancelHandler = () => {
    if (setOpen) {
      setOpen(false)
    }
  }

  return (
    <Modal
      open={open}
      centered
      width={515}
      onOk={cancelHandler}
      onCancel={cancelHandler}
      classNames={{
        content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
      }}
      footer={null}
    >
      <Flex vertical align="center" className="text-center">
        <Avatar
          shape="circle"
          size={62}
          className={twMerge(
            'mb-5 border-[7px]',
            danger
              ? 'bg-[#FEE2E2] border-[#FEF2F2]'
              : 'bg-[#DBEAFE] border-[#EFF6FF]',
            warn
              ? 'bg-[#DBEAFE] border-[#EFF6FF]'
              : 'bg-[#DBEAFE] border-[#EFF6FF]',
          )}
          icon={
            icon
              ? icon({
                  className: twMerge(
                    danger
                      ? 'text-danger text-[26px]'
                      : 'text-primary text-[26px]',
                  ),
                })
              : icon({
                  className: twMerge(
                    warn ? 'text-warn text-[26px]' : 'text-primary text-[26px]',
                  ),
                })
          }
        />
        <Text className="text-[24px] font-bold dark:text-white text-primary-dark leading-[30.6px] mb-[10px]">
          {title}
        </Text>
        <Text className="text-secondary leading-[25.6px] mb-[20px]">
          {subTitle}
        </Text>
        <Space>
          <Button className="font-semibold" onClick={cancelHandler}>
            {t('common.cancel')}
          </Button>
          <Button
            className="bg-primary-dark text-white font-semibold"
            loading={isLoading ?? undefined}
            onClick={action ?? undefined}
          >
            {primaryBtnText}
          </Button>
        </Space>
      </Flex>
    </Modal>
  )
}

export default ConfirmationModal
