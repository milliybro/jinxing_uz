import NotFoundIllustration from '@/assets/not-found-illustration'
import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CancelCircleIcon from '../icons/cancel-circle'

function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="min-h-[500px] w-full flex text-center flex-col justify-center items-center">
      <NotFoundIllustration className="text-primary-dark dark:text-primary-light" />
      <Typography.Text className="text-[24px] mb-4 font-semibold leading-[30.6px] text-primary-dark">
        {t('common.not-found')}
      </Typography.Text>
      <Typography.Text className="max-w-[592px] mb-4 text-secondary">
        {t('common.not-found-text')}
      </Typography.Text>
      <Button
        type="link"
        size="large"
        className="leading-[20.4px] flex items-center"
        icon={<CancelCircleIcon />}
      >
        {t('common.reset-filter')}
      </Button>
    </div>
  )
}

export default NotFound
