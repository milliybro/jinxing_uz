import { Flex, Typography } from 'antd'

import NotFoundIllustration from '@/assets/not-found-illustration'
import { useTranslation } from 'react-i18next'

const RoleNotSelected = () => {
  const { t } = useTranslation()

  return (
    <Flex vertical align="center" className="py-[50px] justify-center w-full">
      <NotFoundIllustration className="text-primary-dark dark:text-primary-light" />

      <Typography.Text className="text-[24px] mb-4 font-semibold">
        {t('common.nothing-select')}
      </Typography.Text>
      <Typography.Text className="text-secondary">
      {t('common.nothing-select-desc')}

      </Typography.Text>
    </Flex>
  )
}

export default RoleNotSelected
