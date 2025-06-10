import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import Breadcrumb from '@/components/breadcrumb'
import CalendarTable from '../components/calendar-table'
import CalendarHeader from '../components/calendar-header'

export default function Calendar(): React.ReactElement {
  const { t } = useTranslation()

  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <Breadcrumb
          items={[
            {
              title: t('common.main'),
              href: '/',
            },
            {
              title: t('common.calendar'),
            },
          ]}
        />
        <div className="mb-6">
          <Typography.Text className="text-2xl font-semibold leading-[30.6px]">
            {t('common.calendar')}
          </Typography.Text>
        </div>
        <Card
          className="mb-[50px] flex-1 overflow-hidden"
          classNames={{ body: '' }}
        >
          <CalendarHeader />
          <CalendarTable />
        </Card>
      </div>
    </div>
  )
}
