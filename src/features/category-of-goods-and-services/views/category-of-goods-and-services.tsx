import { useState } from 'react'

import CategoryOfGoodsHeader from '../containers/category-of-goods-header'
import CategoryOfGoodsDrawer from '../components/category-of-goods-drawer'
import CategoryOfGoodsTable from '../containers/category-of-goods-table'

export default function CategoryOfGoodsAndServices(): React.ReactElement {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <CategoryOfGoodsHeader setOpenDrawer={setOpenDrawer} />
        <CategoryOfGoodsDrawer
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
        />
        <CategoryOfGoodsTable setOpenDrawer={setOpenDrawer} />
      </div>
    </div>
  )
}
