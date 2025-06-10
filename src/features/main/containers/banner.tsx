import { Button, Card } from 'antd'

import banner from '../assets/banner-image.png'
import { useTranslation } from 'react-i18next'

const Banner = () => {
  const { t } = useTranslation()

  return (
    <div className="container max-w-[1200px] mb-[80px]">
      <Card
        classNames={{ body: 'px-[80px] py-[60px]' }}
        className="rounded-[40px] overflow-hidden bg-[#D8DCE4] shadow-none border-none"
        bordered={false}
      >
        <img
          className="absolute bottom-0 right-0 max-h-[50vh]"
          src={banner}
          alt="banner image"
        />
        <div className="flex relative flex-col gap-4 max-w-[570px]">
          <div className="text-primary-dark text-[32px] font-bold">
            {t('welcome.banner.title')}
          </div>
          <div className="text-[18px] text-secondary">
            {t('welcome.banner.text')}
          </div>
          <Button
            size="large"
            type="primary"
            className="bg-primary w-fit px-[40px] hover:bg-primary/50 h-[56px] rounded-2xl"
          >
            {t('common.join')}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Banner
