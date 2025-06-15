import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface ITelegramContext {
  webApp?: any
  user?: any
}

export const TelegramContext = createContext<ITelegramContext>({})

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [webApp, setWebApp] = useState<any | null>(null)

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp
    if (app) {
      app.ready()
      setWebApp(app)
    }
  }, [])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {}
  }, [webApp])

  return (
    <TelegramContext.Provider value={value}>
      {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
      {/* <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />{' '} */}
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = () => useContext(TelegramContext)
