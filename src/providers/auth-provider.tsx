import { useState, useMemo, useEffect } from 'react'
import { authContext } from '@/contexts/auth-context'
import { useMutation } from '@tanstack/react-query'
import { login, refresh } from '@/api'
import { message } from 'antd'
import { useTelegram } from './telegram-provider'

interface Props {
  children: React.ReactElement
}

export default function AuthProvider(props: Props): React.ReactElement {
  const { children } = props
  const [messageApi, contextHolder] = message.useMessage()
  const [isAuth, setIsAuth] = useState<boolean>(
    Boolean(localStorage.getItem('access_token')),
  )

  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth])
  const { user } = useTelegram()

  const { mutate: loginMutate, isLoading: isLoggingIn } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem('refresh_token', res?.refresh)
      localStorage.setItem('access_token', res?.access)
      setIsAuth(true)
    },
    onError: (err) => {
      console.error('Login error:', err)
      messageApi.error('Login muvaffaqiyatsiz tugadi')
    },
  })

  const { mutate: refreshMutate } = useMutation({
    mutationFn: refresh,
    onSuccess: (res) => {
      localStorage.setItem('access_token', res?.access)
      setIsAuth(true)
      window.location.reload()
    },
    onError: (err) => {
      console.error('Token refresh failed:', err)
      setIsAuth(false)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      tryAutoLogin()
    },
  })

  const tryAutoLogin = () => {
    if (!user?.id) {
      messageApi.warning('Telegram foydalanuvchisi aniqlanmadi')
      return
    }
    loginMutate({ telegram_id: user.id.toString() })
  }

  useEffect(() => {
    const access = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')

    if (!access && refreshToken) {
      refreshMutate({ refresh: refreshToken })
    } else if (!access && !refreshToken) {
      tryAutoLogin()
    }
  }, [user])

  return (
    <authContext.Provider value={value}>
      {contextHolder}
      {isLoggingIn ? <div>Loading...</div> : children}
    </authContext.Provider>
  )
}
