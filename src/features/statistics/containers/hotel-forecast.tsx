import { Card, Tabs, Typography } from 'antd'

import BookedAccommodation from '../components/booked-accommodation'
import RoomAvailability from '../components/room-availability'

import type { TabsProps } from 'antd'

const HotelForecast = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Забронированное жилье и заблокировано',
      children: <BookedAccommodation />,
    },
    {
      key: '2',
      label: 'Доступность номеров',
      children: <RoomAvailability />,
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <Typography.Text className="text-[24px] font-semibold">
          Загруженость отеля и прогноз бронирования
        </Typography.Text>
      </div>
      <Card>
        <Tabs items={items} />
      </Card>
    </div>
  )
}

export default HotelForecast
