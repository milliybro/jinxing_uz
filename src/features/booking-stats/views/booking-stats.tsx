import BookingsStatsHeader from '../components/bookings-header'
import BookingsStatsFilters from '../components/bookings-filters'
import BookingsStatsList from '../components/bookings-list'
import BookingsStatsChart from '../components/booking-stats-chart'

export default function BookingStats(): React.ReactElement {
  return (
    <div className="container flex flex-col min-h-screen">
      <BookingsStatsHeader />
      <BookingsStatsFilters />
      <BookingsStatsChart />
      <BookingsStatsList />
    </div>
  )
}
