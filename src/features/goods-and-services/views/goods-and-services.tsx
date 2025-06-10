import { useState } from 'react'

import GoodsAndServicesHeader from '../containers/goods-and-services-header'
import GoodsAndServicesTable from '../containers/goods-and-services-table'
import GoodsAndServicesDrawer from '../components/goods-and-services-drawer'

export default function GoodsAndServices(): React.ReactElement {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <GoodsAndServicesHeader setOpenDrawer={setOpenDrawer} />
        <GoodsAndServicesDrawer
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
        />
        <GoodsAndServicesTable setOpenDrawer={setOpenDrawer} />
      </div>
    </div>
  )
}
