import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SwitchProps {
  content?: string
}

const Switch: React.FC<SwitchProps> = ({ content }) => {
  const [isChecked, setIsChecked] = useState<boolean>(true)
  const { t } = useTranslation()

  const handleToggle = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className="switch-container">
      <input
        type="checkbox"
        id="customSwitch"
        className="custom-switch"
        checked={isChecked}
        onChange={handleToggle}
      />
      {content ? (
        <label htmlFor="customSwitch" className="switch-label">
          <span className="switch-inner"></span>
          <span className="switch-text">
            {isChecked ? (
              <p>{t('common.yes')}</p>
            ) : (
              <p className="text-[#777E90]">{t('common.no')}</p>
            )}
          </span>
        </label>
      ) : (
        <label htmlFor="customSwitch" className="switch-label">
          <span className="switch-inner"></span>
          <span className="switch-text">
            {isChecked ? (
              <p>{t('common.included')}</p>
            ) : (
              <p className="text-[#777E90]">{t('common.excluded')}</p>
            )}
          </span>
        </label>
      )}
    </div>
  )
}

export default Switch
