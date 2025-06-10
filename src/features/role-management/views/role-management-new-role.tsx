import NewRoleTable from '../containers/new-role-table'
import NewRoleHeader from '../containers/new-role-header'

export default function RoleManagementNewRole(): React.ReactElement {
  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <NewRoleHeader />
        <NewRoleTable />
      </div>
    </div>
  )
}
