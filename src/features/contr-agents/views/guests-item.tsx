import { useParams } from 'react-router-dom'
import { Button, Card, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { getOrderGuests } from '../api'
import Breadcrumb from '@/components/breadcrumb'

import FileDownloadIcon from '@/components/icons/file-download'
import { useBranchIdStore } from '@/store/branch-id-store'
// import GuestsItemTable from '../components/guests-item-table'

export default function GuestsItem(): React.ReactElement {
  const params = useParams()
  const { branch } = useBranchIdStore()

  const { data: allGuests } = useQuery({
    queryKey: ['order-guests'],
    queryFn: async () => {
      const res = await getOrderGuests({ branch })
      return res
    },
  })

  const guest = allGuests?.results.find((val) => `${val.id}` === params.id)
  const guestName = guest?.first_name + ' ' + guest?.last_name

  return (
    <div className="container">
      <div className="flex flex-col min-h-screen">
        <Breadcrumb
          items={[
            {
              title: 'Главная',
              href: '/',
            },
            {
              title: 'Гости',
              href: '/guests',
            },
            { title: guestName },
          ]}
        />
        <div className="flex items-center justify-between mb-6">
          <Typography.Text className="text-2xl font-semibold leading-[30.6px]">
            {guestName}
          </Typography.Text>

          <Button
            type="link"
            size="small"
            className="flex items-center font-medium"
          >
            Экспортировать данные <FileDownloadIcon className="text-[20px]" />
          </Button>
        </div>
        <Card
          className="mb-[50px] flex-1 overflow-hidden"
          classNames={{ body: '' }}
        >
          {/* <div className="overflow-auto w-full h-full max-h-[550px]">
            <GuestsItemTable />
          </div> */}
        </Card>
      </div>
    </div>
  )
}
