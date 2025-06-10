import { Button, Typography } from 'antd'
import AddCircleIcon from '@/components/icons/add-circle'
import NotFoundIllustration from '@/assets/not-found-illustration'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const GuestsNotFound = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className="flex justify-center items-center h-[600px]">
      <div className="flex flex-col items-center gap-4">
        <NotFoundIllustration />
        <Typography.Text className="text-[24px] font-semibold">
          {t('guests-page.not-found.title')}
        </Typography.Text>
        <Typography.Text className="max-w-[514px] text-center text-secondary">
          {t('guests-page.not-found.desc')}
        </Typography.Text>
        <Button
          type="link"
          size="small"
          className="flex items-center font-medium"
          onClick={() => navigate('/new-booking')}
        >
          <AddCircleIcon className="text-[20px]" />
          {t('all-rooms.add-room')}
        </Button>
      </div>
    </div>
  )
}

export default GuestsNotFound
