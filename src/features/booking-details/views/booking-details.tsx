import BookingsContent from '../containers/booking-content'
import BookingsHeader from '../components/bookings-header'

export default function BookingDetails(): React.ReactElement {
  return (
    <div className="container mb-[50px]">
      <BookingsHeader />
      <BookingsContent />
    </div>
  )
}
