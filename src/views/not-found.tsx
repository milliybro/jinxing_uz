import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function NotFound(): React.ReactElement {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      className="bg-[#40916C]"
      onClick={() => {
        navigate('/')
      }}
    >
      {t('common.not-found')}
    </button>
  )
}
