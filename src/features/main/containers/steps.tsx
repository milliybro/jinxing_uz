import { Typography } from 'antd'

import CheckmarkCircleFilledIcon from '@/components/icons/checkmark-circle-filled'

import banner from '../assets/steps-banner.png'
import { useTranslation } from 'react-i18next'

const Steps = () => {
  const { t } = useTranslation()
  const items = [
    t('welcome.steps.items.item1'),
    t('welcome.steps.items.item2'),
    t('welcome.steps.items.item3'),
    t('welcome.steps.items.item4'),
    t('welcome.steps.items.item5'),
  ]

  return (
    <div className="container max-w-[1200px] mb-[100px]">
      <div className="flex flex-col gap-[40px]">
        <div className="flex flex-col items-center">
          <Typography.Text className="text-[32px] font-bold">
            {t('welcome.steps.title')}
          </Typography.Text>
          <Typography.Text className="text-[18px] text-secondary">
            {t('welcome.steps.text')}
          </Typography.Text>
        </div>
        <div className="grid grid-cols-2 gap-[48px] items-center">
          <div className="h-[550px]">
            <img src={banner} alt="banner image" />
          </div>
          <div className="flex flex-col gap-6">
            {items.map((val, i) => (
              <div key={'steps-' + i} className="flex items-start gap-2">
                <CheckmarkCircleFilledIcon className="text-[37px] text-primary" />
                <span className="text-sm text-primary-dark">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Steps
