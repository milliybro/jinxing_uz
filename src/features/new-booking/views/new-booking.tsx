import BookingsList from '../containers/bookings-list'
import BookingsHeader from '../components/bookings-header'

export default function NewBooking(): React.ReactElement {
  return (
    <div className="container mb-[50px]">
      <div className="flex flex-col min-h-screen">
        <BookingsHeader />
        <BookingsList />
      </div>
    </div>
  )
}
