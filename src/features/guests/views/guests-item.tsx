import { useQuery } from '@tanstack/react-query'
import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Breadcrumb from '@/components/breadcrumb'

import { useBranchIdStore } from '@/store/branch-id-store'
import { getSingleGuest } from '../api'

import GuestsItemTable from '../components/guests-item-table'

export default function GuestsItem(): React.ReactElement {
  const { t } = useTranslation()
  const params = useParams()
  const { branch } = useBranchIdStore()

  const { data: guest } = useQuery({
    queryKey: ['order-guest'],
    queryFn: async () => {
      const res = await getSingleGuest({ branch, id: params.id })
      return res
    },
  })

  const guestName = guest?.first_name + ' ' + guest?.last_name

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
              title: t('common.guests'),
              href: '/guests',
            },
            { title: guestName },
          ]}
        />
        <div className="flex items-center justify-between mb-6">
          <Typography.Text className="text-2xl font-semibold leading-[30.6px]">
            {guestName}
          </Typography.Text>

          {/* <Button
            type="link"
            size="small"
            className="flex items-center font-medium"
          >
            Экспортировать данные <FileDownloadIcon className="text-[20px]" />
          </Button> */}
        </div>
        <Card
          className="mb-[50px] flex-1 overflow-hidden"
          classNames={{ body: '' }}
        >
          <div className="overflow-auto w-full h-full">
            <GuestsItemTable />
          </div>
        </Card>
      </div>
    </div>
  )
}
