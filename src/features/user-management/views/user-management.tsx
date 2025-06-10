import { useState } from 'react'

import UserManagementTable from '../containers/user-management-table'
import UserManagementHeader from '../containers/user-management-header'

import AddUserModal from '../components/add-user-modal'

export default function UserManagement(): React.ReactElement {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <UserManagementHeader setOpenDrawer={setOpenModal} />
        <AddUserModal open={openModal} setOpen={setOpenModal} />
        <UserManagementTable setOpenDrawer={setOpenModal} />
      </div>
    </div>
  )
}
