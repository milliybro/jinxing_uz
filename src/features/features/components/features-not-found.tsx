import { Typography } from 'antd'

import NotificationsIllustration from '@/assets/notifications-illustration'

import { useTranslation } from 'react-i18next'

const FeaturesNotFound = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <NotificationsIllustration />
        <Typography.Text className="text-[24px] font-semibold">
          {t('features-page.not-found.title')}
        </Typography.Text>
        <Typography.Text className="max-w-[514px] text-center text-secondary">
          {t('features-page.not-found.desc')}
        </Typography.Text>
        {/* <Button
          type="link"
          size="small"
          className="flex items-center font-medium"
          onClick={() => setOpenDrawer(true)}
        >
          <AddCircleIcon className="text-[20px]" />
          {t('features-page.add-features')}
        </Button> */}
      </div>
    </div>
  )
}

export default FeaturesNotFound
