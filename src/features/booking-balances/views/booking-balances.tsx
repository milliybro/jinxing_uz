import BookingBalancesFilters from '../components/booking-balances-filters'
import BookingBalancesHeader from '../components/booking-balances-header'
import BookingBalancesList from '../components/booking-balances-list'

export default function BookingBalances(): React.ReactElement {
  return (
    <div className="container flex flex-col min-h-screen">
      <BookingBalancesHeader />
      <BookingBalancesFilters />
      <div className="p-6 rounded-3xl mb-[50px] flex-1 border bg-white dark:border-secondary-dark dark:bg-primary-dark">
        <BookingBalancesList />
      </div>
    </div>
  )
}
