import { useState, useEffect } from 'react'
import { Switch as AntSwitch, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const Switch = ({
  value,
  onToggle,
}: {
  value?: boolean
  onToggle?: (check: boolean) => void
}) => {
  const [checked, setChecked] = useState<boolean>(!!value)
    const { t } = useTranslation()
  

  useEffect(() => {
    setChecked(!!value)
  }, [value])

  const handleChange = async (value: boolean) => {
    setChecked(value)

    if (onToggle) {
      onToggle(value)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <AntSwitch checked={checked} onChange={handleChange} />
      <Typography.Text className="ml-2 text-secondary text-xs font-normal">
        {checked ? t('common.clean') : t('common.unclean')}
      </Typography.Text>
    </div>
  )
}

export default Switch
