import TransactionsList from '../components/transaction-list'
import TransactionsFilters from '../components/transactions-filters'
import TransactionsHeader from '../components/transactions-header'

export default function Transactions(): React.ReactElement {
  return (
    <div className="container flex flex-col min-h-screen">
      <TransactionsHeader />
      <TransactionsFilters />
      <div className="p-6 rounded-3xl mb-[50px] flex-1 border bg-white dark:border-secondary-dark dark:bg-primary-dark">
        <TransactionsList />
      </div>
    </div>
  )
}
