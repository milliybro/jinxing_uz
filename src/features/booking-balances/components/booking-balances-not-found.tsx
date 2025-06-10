import { Button, Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import CancelCircleIcon from '@/components/icons/cancel-circle'
import NotFoundIllustration from '@/assets/not-found-illustration'
import { useTranslation } from 'react-i18next'

const BookingBalancesNotFound = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  return (
    <div className="w-full flex text-center flex-col justify-center items-center">
      <NotFoundIllustration className="text-primary-dark dark:text-primary-light" />
      <Typography.Text className="text-[24px] mb-4 font-semibold leading-[30.6px] text-primary-dark">
        {t('booking-page.not-found.title')}
      </Typography.Text>
      <Typography.Text className="max-w-[592px] mb-4 text-secondary">
        {t('booking-page.not-found.desc')}
      </Typography.Text>
      <Button
        type="link"
        size="large"
        className="leading-[20.4px] flex items-center"
        icon={<CancelCircleIcon />}
        onClick={() => {
          navigate(pathname, { replace: true })
        }}
      >
        {t('booking-page.not-found.reset')}
      </Button>
    </div>
  )
}

export default BookingBalancesNotFound
