import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

import AddCircleIcon from '@/components/icons/add-circle'
import NotificationsIllustration from '@/assets/notifications-illustration'
import { useTranslation } from 'react-i18next'

const RoleManagementNotFound = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <NotificationsIllustration />
        <Typography.Text className="text-[24px] font-semibold">
          {t('common.nothing-select')}
        </Typography.Text>
        <Typography.Text className="max-w-[514px] text-center text-secondary">
          {t('common.nothing-select-desc')}
        </Typography.Text>
        <Button
          type="link"
          size="small"
          className="flex items-center font-medium"
          onClick={() => navigate('/role-management/new-role')}
        >
          <AddCircleIcon className="text-[20px]" />
         {t('role-management.add-role')}
        </Button>
      </div>
    </div>
  )
}

export default RoleManagementNotFound
