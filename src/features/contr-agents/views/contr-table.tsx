import { Typography } from 'antd'

import Breadcrumb from '@/components/breadcrumb'

import ContrAgentsHeader from '../components/contr-agents-header'
import ContrAgentsTable from '../components/contr-agents-table'

export default function ContrTable(): React.ReactElement {
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
              title: 'Контрагенты',
            },
          ]}
        />
        <div className="mb-6">
          <Typography.Text className="text-2xl font-semibold leading-[30.6px]">
            Контрагенты
          </Typography.Text>
        </div>
        
          <ContrAgentsHeader />
          <div className="overflow-auto w-full h-full max-h-[550px]">
            <ContrAgentsTable />
          </div>
      </div>
    </div>
  )
}
