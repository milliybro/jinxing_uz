import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Modal,
  Typography,
} from 'antd'
import queryString from 'query-string'
import { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import UserSquareIcon from '@/components/icons/user-square'

import { ListResponse } from '@/types'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import BalanceStatisticsCard from './statistics-card'
import MoneyReceiveIcon from '@/components/icons/money-receive-icon'
import { formatAmount } from '@/helpers/format-amount'

interface IWithdraw {
  id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  password: string
  confirm_password: string
  terms: boolean
}

interface IProps {
  data?: ListResponse<IWithdraw[]>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  refetch?: () => void
}

const WithDrawModal: FC<IProps> = ({ open, setOpen }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { search: restQueries } = useLocation()
  const [singleUser, setSignleUser] = useState<IWithdraw | null>(null)

  const queries = queryString.parse(restQueries)

  const closeModal = () => {
    setOpen((prev) => {
      if (prev) {
        form.resetFields()
        navigate('/balance', { replace: true })
      }

      return !prev
    })
  }

  useEffect(() => {
    if (open && singleUser && Boolean(queries.edit)) {
      form.setFieldsValue({
        ...singleUser,
        first_name: `${singleUser.first_name}`,
      })
    }
    if (open && !queries.edit) {
      form.resetFields()
    }
  }, [queries, singleUser])

  return (
    <Modal
      open={open}
      centered
      width={515}
      onOk={closeModal}
      onCancel={closeModal}
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
          icon={<UserSquareIcon className="text-[26px] text-primary" />}
        />
        <Typography.Text className="text-[24px] font-bold dark:text-white text-primary-dark leading-[30.6px] mb-6">
          {t('balance-page.withdraw')}
        </Typography.Text>
        <div className="p-4 border bg-white rounded-2xl w-full mb-4">
          <div className="flex justify-between items-center">
            <h4 className="text-base font-medium text-[#14B8A6]">
              {t('balance-page.approved')}
            </h4>
          </div>
          <h2 className="text-[24px] font-bold text-[#1F2937]">
            {formatAmount(46494555)} UZS
          </h2>
        </div>
        <Form layout="vertical" className="w-full" form={form}>
          <Form.Item
            label={t('balance-page.accrual-amount')}
            name="accrualAmount"
            className="mb-[20px] [&_label]:font-medium"
          >
            <Input
              size="large"
              placeholder={t('balance-page.accrual-amount-rule')}
            />
          </Form.Item>
          <Form.Item
            label={t('balance-page.current-account')}
            name="first_name"
            className="mb-[20px] [&_label]:font-medium"
          >
            <Input
              size="large"
              placeholder={t('balance-page.current-account-rule')}
            />
          </Form.Item>
          <Form.Item
            label={t('balance-page.mfo-bank')}
            name="first_name"
            className="mb-[20px] [&_label]:font-medium"
          >
            <Input size="large" placeholder={t('balance-page.mfo-bank-rule')} />
          </Form.Item>
          <Form.Item
            label={t('balance-page.inn')}
            name="first_name"
            className="mb-[20px] [&_label]:font-medium"
          >
            <Input size="large" placeholder={t('balance-page.inn-rule')} />
          </Form.Item>
          <Form.Item
            label={t('balance-page.bank-name')}
            name="first_name"
            className="mb-[20px] [&_label]:font-medium"
          >
            <Input
              size="large"
              placeholder={t('balance-page.bank-name-rule')}
            />
          </Form.Item>
          <Form.Item
            label={t('balance-page.fullname-recipient')}
            name="first_name"
            className="mb-[20px] [&_label]:font-medium"
          >
            <Input
              size="large"
              placeholder={t('balance-page.fullname-recipient-rule')}
            />
          </Form.Item>
          <Flex justify="center" gap={16}>
            <Button
              className="text-primary-dark dark:text-white font-semibold"
              onClick={closeModal}
            >
              {t('common.cancel')}
            </Button>
            <Button
              htmlType="submit"
              className="bg-primary text-white font-semibold"
            >
              {t('balance-page.withdraw-funds')}
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Modal>
  )
}

export default memo(WithDrawModal)
