import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { useBookingContext } from '../context'

import CancelCircleIcon from '@/components/icons/cancel-circle'
import NotFoundIllustration from '@/assets/not-found-illustration'

const BookingsNotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { form } = useBookingContext()

  const resetHandler = () => {
    navigate(pathname, { replace: true })

    form.setFieldsValue({
      order: undefined,
      category__key: undefined,
      start_date: undefined,
      end_date: undefined,
      statuses: undefined,
    })
  }

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
        onClick={resetHandler}
      >
        {t('booking-page.not-found.reset')}
      </Button>
    </div>
  )
}

export default BookingsNotFound
