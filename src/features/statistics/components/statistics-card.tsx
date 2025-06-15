import { useTranslation } from 'react-i18next'
import { Avatar, Card, Typography } from 'antd'

import type { FC, JSXElementConstructor, SVGProps } from 'react'

const { Text } = Typography

interface IProps {
  title: string
  icon: JSXElementConstructor<SVGProps<SVGSVGElement>>
  value: string | number
  unit?: string
  out_of?: string | number
}

const StatisticsCard: FC<IProps> = (props) => {
  const { title, value, unit, out_of } = props
  const { t } = useTranslation()

  return (
    <Card>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <Text className="text-medium text-success">
            {t('home-page.' + title)}
          </Text>
          <Avatar
            size={48}
            shape="square"
            className="bg-[#F8FAFC] text-primary-dark dark:bg-white/5 dark:text-white rounded-lg"
            icon={<props.icon className="text-[24px]" />}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Text className="text-[32px] font-bold text-primary-dark dark:text-white">
              {value}
            </Text>
            {out_of || out_of === 0 ? <Text className="text-success">/</Text> : null}
            <Text className="text-[32px] font-bold text-secondary">
              {unit || out_of}
            </Text>
          </div>
          {/* <div className="flex items-center gap-2">
            <Text className="flex items-center gap-1 text-primary">
              <TrendingUpIcon className="text-[20px]" />
              <Text className=" text-inherit font-medium">4.5%</Text>
            </Text>
            <Text className="text-success">чем вчера (26.11.2024)</Text>
          </div> */}
        </div>
      </div>
    </Card>
  )
}

export default StatisticsCard
