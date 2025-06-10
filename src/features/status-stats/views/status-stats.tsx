import ChannelRevenueList from '../components/bookings-list'
import StatusStatsHeader from '../components/status-stats-header'
import StatusStatsFilters from '../components/status-stats-filter'
import StatusStatsChart from '../components/status-stats-chart'

export default function StatusStats(): React.ReactElement {
  return (
    <div className="container flex flex-col min-h-screen">
      <StatusStatsHeader />
      <StatusStatsFilters />
      <StatusStatsChart />
      <ChannelRevenueList />
    </div>
  )
}
