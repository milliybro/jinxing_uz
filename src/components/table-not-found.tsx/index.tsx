import { memo } from 'react'
import { Button, Typography } from 'antd'

import AddCircleIcon from '@/components/icons/add-circle'
import NotificationsIllustration from '@/assets/notifications-illustration'

import type { Dispatch, FC, SetStateAction } from 'react'

const { Text } = Typography

interface IProps {
  title: string
  subtitle: string
  actionText: string
  action?: Dispatch<SetStateAction<boolean>>
}

const TableNotFound: FC<IProps> = ({ action, title, subtitle, actionText }) => {
  const clickHandler = () => {
    if (action) {
      action(true)
    }
  }

  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <NotificationsIllustration />
          <Text className="text-[24px] font-semibold">{title}</Text>
          <Text className="max-w-[514px] text-center text-secondary">
            {subtitle}
          </Text>
          <Button
            type="link"
            size="small"
            className="flex items-center font-medium"
            onClick={clickHandler}
          >
            <AddCircleIcon className="text-[20px]" />
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(TableNotFound)
