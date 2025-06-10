import { formatAmount } from '@/helpers/format-amount'
import { Card, Divider } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { IOrder } from '../types'

const TotalPayable = ({
  price,
  endDate,
  startDate,
  order,
}: {
  price: number
  startDate: string | null
  endDate: string | null
  order?: IOrder
}) => {
  const { t } = useTranslation()

  const nights =
    order?.start_date && order?.end_date
      ? dayjs(order.end_date).diff(dayjs(order.start_date), 'day') // Kunlar farqini hisoblash
      : startDate && endDate
      ? dayjs(endDate).diff(dayjs(startDate), 'day')
      : 0

  return (
    <Card title={t('common.total-pay')}>
      {price ? null : (
        <>
          <ul className="w-full flex flex-col gap-3">
            <li className="flex items-center justify-between">
              <span className="text-sm text-secondary">
                {t('common.price-per-room')}
              </span>
              <span className="font-medium">0 UZS</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-secondary">
                {t('common.taxes')}
              </span>
              <span className="font-medium">0 UZS</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-secondary">{t('common.fees')}</span>
              <span className="font-medium">0 UZS</span>
            </li>
          </ul>
          <Divider className="my-3" />
        </>
      )}
      <div className="flex justify-end text-[24px] font-semibold">
        {price ? formatAmount(price * nights) : formatAmount(order?.total)} UZS
      </div>
    </Card>
  )
}

export default TotalPayable
