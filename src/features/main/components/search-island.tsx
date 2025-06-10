import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const SearchIsland = () => {
  const { t } = useTranslation()

  return (
    <div className="container mb-[70px] max-w-[1200px] mt-[-90px]">
      <Card
        bordered={false}
        className="rounded-[40px]"
        classNames={{ body: 'p-[48px]' }}
        style={{ boxShadow: '0px 40px 64px -32px #777E901A' }}
      >
        <div className="grid grid-cols-3 gap-[48px]">
          <div className="flex flex-col gap-4">
            <Typography.Text className="text-[40px] font-bold">
              2/3
            </Typography.Text>
            <Typography.Text className="text-secondary">
              {t('welcome.search-island.text1')}
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-4">
            <Typography.Text className="text-[40px] font-bold">
              48%
            </Typography.Text>
            <Typography.Text className="text-secondary">
              {t('welcome.search-island.text2')}
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-4">
            <Typography.Text className="text-[40px] font-bold">
              33%
            </Typography.Text>
            <Typography.Text className="text-secondary">
              {t('welcome.search-island.text3')}
            </Typography.Text>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SearchIsland
