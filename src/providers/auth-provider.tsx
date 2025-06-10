import { useState, useMemo, useEffect } from 'react'
import { authContext } from '@/contexts/auth-context'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/api'

interface Props {
  children: React.ReactElement
}

export default function AuthProvider(props: Props): React.ReactElement {
  const { children } = props

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem('refresh_token', res?.refresh)
      localStorage.setItem('access_token', res?.access)
      window.location.reload()
    },
    onError: (err) => {
      console.error('Login error:', err)
    },
  })

  const accessToken = localStorage.getItem('access_token')
  const [isAuth, setIsAuth] = useState<boolean>(Boolean(accessToken))
  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth])

  useEffect(() => {
    if (!accessToken && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp
      const user = tg.initDataUnsafe.user
      if (user && user.id) {
        mutate({ telegram_id: user.id.toString() })
      }
    }
  }, [accessToken, mutate])
  // useEffect(() => {
  //   if (!accessToken) {
  //     let telegramId

  //     if (window.Telegram && window.Telegram.WebApp?.initDataUnsafe?.user?.id) {
  //       telegramId = window.Telegram.WebApp.initDataUnsafe.user.id
  //     } else {
  //       telegramId = '1930372151'
  //     }

  //     mutate({ telegram_id: telegramId.toString() })
  //   }
  // }, [accessToken, mutate])

  return (
    <authContext.Provider value={value}>
      {isLoading ? <div>Loading...</div> : children}
    </authContext.Provider>
  )
}
