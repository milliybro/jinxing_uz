import { Button, Typography } from 'antd'

import AddCircleIcon from '@/components/icons/add-circle'
import NotificationsIllustration from '@/assets/notifications-illustration'

import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const CategoryOfGoodsNotFound: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <NotificationsIllustration />
        <Typography.Text className="text-[24px] font-semibold">
          {t('category-of-goods.not-found.title')}
        </Typography.Text>
        <Typography.Text className="max-w-[514px] text-center text-secondary">
          {t('category-of-goods.not-found.desc')}
        </Typography.Text>
        <Button
          type="link"
          size="small"
          className="flex items-center font-medium"
          onClick={() => setOpenDrawer(true)}
        >
          <AddCircleIcon className="text-[20px]" />
          {t('category-of-goods.add-category')}
        </Button>
      </div>
    </div>
  )
}

export default CategoryOfGoodsNotFound
