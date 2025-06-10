import { BookingProvider } from '../context'

import BookingsList from '../components/bookings-list'
import BookingsHeader from '../components/bookings-header'
import BookingsFilters from '../components/bookings-filters'

export default function Booking(): React.ReactElement {
  return (
    <BookingProvider>
      <div className="container flex flex-col min-h-screen">
        <BookingsHeader />
        <div className="p-6 rounded-3xl mb-[50px] flex-1 border bg-white dark:border-secondary-dark dark:bg-primary-dark">
          <BookingsFilters />
          <BookingsList />
        </div>
      </div>
    </BookingProvider>
  )
}
