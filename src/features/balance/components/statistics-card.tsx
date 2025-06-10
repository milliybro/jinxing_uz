import type { FC, ReactNode } from 'react'
import { formatAmount } from '@/helpers/format-amount'
import { Card } from 'antd'

interface IStatistics {
  title: string
  icon: ReactNode
  summ: number
}

const BalanceStatisticsCard: FC<IStatistics> = ({ title, icon, summ }) => {
  return (
    <Card
      className="p-6 bg-white rounded-2xl w-full dark:bg-primary-dark"
      classNames={{ body: 'p-0' }}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-base font-medium text-[#14B8A6]">{title}</h4>
        <span className="bg-[#F8FAFC] dark:bg-dark-bg dark:text-white w-12 h-12 rounded-lg flex items-center justify-center">
          {icon}
        </span>
      </div>
      <h2 className="text-[32px] font-bold text-[#1F2937] dark:text-white">
        {formatAmount(summ)} UZS
      </h2>
    </Card>
  )
}

export default BalanceStatisticsCard
