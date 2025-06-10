import { useState } from 'react'

import BalanceHeader from '../containers/balance-header'
import BalanceTable from '../containers/balance-table'
import BalanceStatistics from '../containers/balance-stattistics'
import WithdrawModal from '../components/withdraw-modal'

export default function Table(): React.ReactElement {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <BalanceHeader setOpen={setOpen} />
        <BalanceStatistics />
        <WithdrawModal open={open} setOpen={setOpen} />
        <BalanceTable setOpenDrawer={setOpenDrawer} />
      </div>
    </div>
  )
}
