import { useState } from 'react'
import Unitsdrawer from '../components/units-drawer'
import UnitsHeader from '../containers/units-header'
import UnitsList from '../containers/units-list'

function Units() {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <div className="container flex flex-col min-h-screen">
      <UnitsHeader setOpenDrawer={setOpenDrawer} />
      <UnitsList setOpenDrawer={setOpenDrawer} />
      <Unitsdrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  )
}

export default Units
