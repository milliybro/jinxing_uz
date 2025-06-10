import { Collapse, Typography } from 'antd'

import ArrowDownIcon from '@/components/icons/arrow-down'

import type { CollapseProps } from 'antd'
import { useTranslation } from 'react-i18next'

const FAQ = () => {
  const { t } = useTranslation()
  const text = t('welcome.faq.items.content')

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: t('welcome.faq.items.item1-title'),
      children: <p>{text}</p>,
    },
    {
      key: '2',
      label: t('welcome.faq.items.item2-title'),
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: t('welcome.faq.items.item3-title'),
      children: <p>{text}</p>,
    },
    {
      key: '4',
      label: t('welcome.faq.items.item4-title'),
      children: <p>{text}</p>,
    },
    {
      key: '5',
      label: t('welcome.faq.items.item5-title'),
      children: <p>{text}</p>,
    },
    {
      key: '6',
      label: t('welcome.faq.items.item6-title'),
      children: <p>{text}</p>,
    },
    {
      key: '7',
      label: t('welcome.faq.items.item7-title'),
      children: <p>{text}</p>,
    },
  ]

  return (
    <div className="container max-w-[1200px] mb-[100px]">
      <div className="flex flex-col items-center gap-[40px]">
        <div className="flex flex-col items-center">
          <Typography.Text className="text-[32px] font-bold text-black">
            {t('welcome.faq.title')}
          </Typography.Text>
          <Typography.Text className="text-[18px] text-secondary">
            {t('welcome.faq.text')}
          </Typography.Text>
        </div>
        <Collapse
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <ArrowDownIcon
              className={`text-base duration-200 ${
                isActive ? 'rotate-180' : ''
              }`}
            />
          )}
          ghost
          className="bg-white w-[894px] rounded-[16px]"
          items={items}
        />
      </div>
    </div>
  )
}

export default FAQ
