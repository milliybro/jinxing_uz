import type { FC } from 'react'

import { useTranslation } from 'react-i18next'
import BalanceStatisticsCard from '../components/statistics-card'
import MoneyReceiveIcon from '@/components/icons/money-receive-icon'
import CheckMarkCircleIcon from '@/components/icons/check-mark-circle'
import PaymentSuccessIcon from '@/components/icons/payment-success'

interface IProps {}

const BalanceStatistics: FC<IProps> = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6 gap-6">
        <BalanceStatisticsCard
          title={t('common.balance')}
          icon={<MoneyReceiveIcon />}
          summ={514350000}
        />
        <BalanceStatisticsCard
          title={t('balance-page.approved')}
          icon={<CheckMarkCircleIcon />}
          summ={459921574}
        />
        <BalanceStatisticsCard
          title={t('balance-page.accrued')}
          icon={<PaymentSuccessIcon />}
          summ={164642850}
        />
      </div>
    </div>
  )
}

export default BalanceStatistics
