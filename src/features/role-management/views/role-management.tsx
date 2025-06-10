import RoleManagementTable from '../containers/role-management-table'
import RoleManagementHeader from '../containers/role-management-header'

export default function RoleManagement(): React.ReactElement {
  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <RoleManagementHeader />
        <RoleManagementTable />
      </div>
    </div>
  )
}
