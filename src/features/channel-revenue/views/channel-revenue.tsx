import ChannelRevenueHeader from '../components/channel-revenue-header'
import ChannelRevenueFilters from '../components/channel-revenue-filter'
import ChannelRevenueChart from '../components/channel-revenue-chart'
import ChannelRevenueList from '../components/bookings-list'

export default function ChannelRevenue(): React.ReactElement {
  return (
    <div className="container flex flex-col min-h-screen">
      <ChannelRevenueHeader />
      <ChannelRevenueFilters />
      <ChannelRevenueChart />
      <ChannelRevenueList />
    </div>
  )
}
