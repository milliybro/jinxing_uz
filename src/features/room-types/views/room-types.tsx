import { useState } from 'react'

// import AllRoomsDrawer from '../components/room-types-drawer'
import RoomTypesHeader from '../components/room-type-header'
import RoomTypesTable from '../components/room-type-table'
import RoomTypesDrawer from '../components/room-types-drawer'

export default function RoomTypes(): React.ReactElement {
  const [openRoomTypeDrawer, setOpenRoomTypeDrawer] = useState(false)

  return (
    <div className="container mb-[50px]">
      <div className="flex flex-col min-h-screen">
        <RoomTypesHeader setOpenDrawer={setOpenRoomTypeDrawer} />
        <RoomTypesDrawer
          setOpenDrawer={setOpenRoomTypeDrawer}
          openDrawer={openRoomTypeDrawer}
        />
        <RoomTypesTable setOpenDrawer={setOpenRoomTypeDrawer} />
      </div>
    </div>
  )
}
