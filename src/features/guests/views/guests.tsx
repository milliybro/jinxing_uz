import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { GuestsProvider } from '../context'

import Breadcrumb from '@/components/breadcrumb'
import GuestsTable from '../components/guests-table'
import GuestsHeader from '../components/guests-header'

export default function Guests(): React.ReactElement {
  const { t } = useTranslation()

  return (
    <GuestsProvider>
      <div className="container">
        <div className="flex flex-col min-h-screen">
          <Breadcrumb
            items={[
              {
                title: t('common.main'),
                href: '/',
              },
              {
                title: t('common.guests'),
              },
            ]}
          />
          <div className="mb-6">
            <Typography.Text className="text-2xl font-semibold leading-[30.6px]">
              {t('common.guests')}
            </Typography.Text>
          </div>
          <Card
            className="mb-[50px] flex-1 overflow-hidden"
            classNames={{ body: '' }}
          >
            <GuestsHeader />
            <div className="overflow-auto w-full h-full">
              <GuestsTable />
            </div>
          </Card>
        </div>
      </div>
    </GuestsProvider>
  )
}
