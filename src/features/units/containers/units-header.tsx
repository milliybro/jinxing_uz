import Breadcrumb from '@/components/breadcrumb'
import AddCircleIcon from '@/components/icons/add-circle'
import { Button, Typography } from 'antd'
import { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

const UnitsHeader: FC<IProps> = ({ setOpenDrawer }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col mb-6">
        <Breadcrumb
          items={[
            {
              title: t('common.main'),
              href: '/',
            },
            {
              title: t('common.units'),
            },
          ]}
        />
        <Typography.Text className="text-2xl font-semibold leading-[30.6px]">
          {t('common.units')}
        </Typography.Text>
      </div>
      <Button
        type="link"
        size="small"
        className="flex items-center font-medium"
        onClick={() => {
          setOpenDrawer(true)
          navigate('/units', { replace: true })
        }}
      >
        <AddCircleIcon className="text-[20px]" />
        {t('units-page.add-unit')}
      </Button>
    </div>
  )
}

export default UnitsHeader
