import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const Management = () => {
  const { t } = useTranslation()

  const items = [
    {
      title: t('welcome.management.items.item1-title'),
      description: t('welcome.management.items.item1-desc'),
    },
    {
      title: t('welcome.management.items.item2-title'),
      description: t('welcome.management.items.item2-desc'),
    },
    {
      title: t('welcome.management.items.item3-title'),
      description: t('welcome.management.items.item3-desc'),
    },
    {
      title: t('welcome.management.items.item4-title'),
      description: t('welcome.management.items.item4-desc'),
    },
  ]
  return (
    <div className="container max-w-[1200px] mb-[100px]">
      <div className="flex flex-col gap-[40px]">
        <div className="flex flex-col items-center">
          <Typography.Text className="text-[32px] font-bold">
            {t('welcome.management.title')}
          </Typography.Text>
          <Typography.Text className="text-[18px] text-secondary">
            {t('welcome.management.text')}
          </Typography.Text>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {items.map((val, i) => (
            <div key={val.title + i} className="flex flex-col">
              <div className="h-[199px] w-full rounded-3xl bg-secondary-light mb-[17px]" />
              <div className="flex flex-col">
                <Typography.Text className="text-[20px] font-bold">
                  {val.title}
                </Typography.Text>
                <Typography.Text className="text-secondary text-sm">
                  {val.description}
                </Typography.Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Management
