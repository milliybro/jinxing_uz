import { Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import NotFoundIllustration from '@/assets/not-found-illustration'

const BookingNotSelected = () => {
  const { t } = useTranslation()

  return (
    <Flex vertical align="center" className="py-[50px]">
      <NotFoundIllustration className="text-primary-dark dark:text-primary-light" />

      <Typography.Text className="text-[24px] mb-4 font-semibold">
        {t('common.nothing-selected')}
      </Typography.Text>
      <Typography.Text className="text-secondary">
        {t('common.nothing-selected-info')}
      </Typography.Text>
    </Flex>
  )
}

export default BookingNotSelected
