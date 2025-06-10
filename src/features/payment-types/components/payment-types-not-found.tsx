import { Button, Typography } from 'antd'

import AddCircleIcon from '@/components/icons/add-circle'
import NotFoundIllustration from '@/assets/not-found-illustration'

import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const PaymentTypesNotFound: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <NotFoundIllustration />
        <Typography.Text className="text-[24px] font-semibold">
          {t('payment-types.not-found.title')}
        </Typography.Text>
        <Typography.Text className="max-w-[514px] text-center text-secondary">
          {t('payment-types.not-found.description')}
        </Typography.Text>
        <Button
          type="link"
          size="small"
          className="flex items-center font-medium"
          onClick={() => setOpenDrawer(true)}
        >
          <AddCircleIcon className="text-[20px]" />
          {t('common.add-type-payment')}
        </Button>
      </div>
    </div>
  )
}

export default PaymentTypesNotFound
