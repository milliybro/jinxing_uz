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
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = () => useContext(TelegramContext)
