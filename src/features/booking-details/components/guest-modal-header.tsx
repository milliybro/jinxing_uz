import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import UserSquareIconBlue from '@/components/icons/user-square-blue'

const { Text } = Typography

const GuestBookingsHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col items-center gap-[10px]">
          <div className="flex justify-center items-center w-[62px] h-[62px] bg-[#EFF6FF] rounded-full">
            <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#DBEAFE] rounded-full">
              <UserSquareIconBlue className="text-[#3276FF] w-[26px] h-[26px]" />
            </div>
          </div>
          <Text className="text-2xl flex items-center font-semibold leading-[30.6px]">
            {t('common.add-guest')}
          </Text>
          <Text className="text-xs flex items-center text-center font-medium text-[#6B7280]">
            {t('common.add-guest-desc')}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default GuestBookingsHeader
