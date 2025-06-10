import { Avatar, Card, Divider, Typography } from 'antd'

import CallIcon from '@/components/icons/call'
import MailIcon from '@/components/icons/mail'
import AvatarIcon from '@/assets/avatar.jpg'

import type { FC } from 'react'
import type { IBookingDetails } from '../types'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

const BookingMainGuest: FC<{ data?: IBookingDetails }> = ({ data }) => {
  const guest =
    data?.order_guests.length === 1
      ? data.order_guests[0]
      : data?.order_guests.find((val) => val.main_guest)

  const { t } = useTranslation()

  let currentLang = localStorage.getItem('i18nextLng') || 'ru'

  if (currentLang === 'uz') {
    currentLang = 'uz-cyrillic'
  } else if (currentLang === 'oz') {
    currentLang = 'uz-latin'
  }

  return (
    <Card title={t('common.main-guest')}>
      <div className="flex flex-row items-center gap-3">
        <Avatar
          size={46}
          shape="square"
          className="bg-secondary-light dark:bg-white/5"
          src={AvatarIcon}
        />
        <div className="">
          <Text className="text-base font-semibold pe-2">
            {guest
              ? `${
                  guest.first_name.charAt(0).toUpperCase() +
                  guest.first_name.slice(1).toLowerCase()
                } 
    ${
      guest.last_name.charAt(0).toUpperCase() +
      guest.last_name.slice(1).toLowerCase()
    }`
              : ''}
          </Text>

          <Text className="text-secondary font-medium">
            {t('common.from')}{' '}
            {guest?.country?.translations?.[currentLang]?.name
              ? guest?.country?.translations?.[currentLang]?.name
                  .charAt(0)
                  .toUpperCase() +
                guest?.country?.translations?.[currentLang]?.name
                  .slice(1)
                  .toLowerCase()
              : ''}
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col">
        <Text className="text-[18px] mb-[16px] font-semibold">
          {t('common.contact-info')}
        </Text>
        <div className="flex items-center mb-3 gap-2">
          <CallIcon className="text-[20px] text-secondary" />
          <Text className="text-secondary text-base font-medium">
            {guest?.phone}
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <MailIcon className="text-[20px] text-secondary" />
          <Text className="text-secondary text-base font-medium">
            {guest?.email}
          </Text>
        </div>
      </div>
    </Card>
  )
}

export default BookingMainGuest
