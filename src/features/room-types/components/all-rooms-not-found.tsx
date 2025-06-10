import { Button, Typography } from 'antd'

import AddCircleIcon from '@/components/icons/add-circle'
import NotFoundIllustration from '@/assets/not-found-illustration'

import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const AllRoomsNotFound: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <NotFoundIllustration />
        <Typography.Text className="text-[24px] font-semibold">
          {t('all-rooms.not-found.title')}
        </Typography.Text>
        <Typography.Text className="max-w-[514px] text-center text-secondary">
          {t('all-rooms.not-found.desc')}
        </Typography.Text>
        <Button
          type="link"
          size="small"
          className="flex items-center font-medium"
          onClick={() => setOpenDrawer(true)}
        >
          <AddCircleIcon className="text-[20px]" />
          {t('all-rooms.add-room')}
        </Button>
      </div>
    </div>
  )
}

export default AllRoomsNotFound
