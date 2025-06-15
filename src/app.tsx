import { ConfigProvider } from 'antd'
import { useCookies } from 'react-cookie'

import {
  QueryProvider,
  AuthProvider,
  RouteProvider as Routes,
  LanguageProvider,
} from './providers'
import { darkTheme, lightTheme } from './providers/theme-provider'
import { useTranslation } from 'react-i18next'
import uz from 'antd/locale/uz_UZ'
import ru from 'antd/locale/ru_RU'
import { TelegramProvider } from './providers/telegram-provider'

export default function App(): React.ReactElement {
  const [cookies] = useCookies(['darkTheme'])

  const { i18n } = useTranslation()

  const lang = i18n.language

  return (
    <LanguageProvider>
      <QueryProvider>
        <TelegramProvider>
          <AuthProvider>
            <ConfigProvider
              theme={cookies.darkTheme ? darkTheme : lightTheme}
              locale={lang === 'ru' ? ru : uz}
            >
              <Routes />
            </ConfigProvider>
          </AuthProvider>
        </TelegramProvider>
      </QueryProvider>
    </LanguageProvider>
  )
}
