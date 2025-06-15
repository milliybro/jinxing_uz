import { useState, useMemo, useEffect } from 'react'
import { authContext } from '@/contexts/auth-context'
import { useMutation } from '@tanstack/react-query'
import { login, refresh } from '@/api'
import { message } from 'antd'
import WebApp from '@twa-dev/sdk'

interface Props {
  children: React.ReactElement
}

export default function AuthProvider(props: Props): React.ReactElement {
  const { children } = props
  const [messageApi, contextHolder] = message.useMessage()
  const [isAuth, setIsAuth] = useState<boolean>(
    Boolean(localStorage.getItem('access_token')),
  )
  const [user, setUser] = useState('')

  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth])
  // const { user } = useTelegram()

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

  useEffect(() => {
    WebApp.ready()
    WebApp.expand()
    WebApp.enableClosingConfirmation()

    const initData = WebApp.initDataUnsafe
    if (initData && initData.user) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setUser(initData.user?.id)
      // onSubmit({
      //   name: initData.user.first_name,
      //   username: initData.user.username,
      //   language_code: initData.user.language_code,
      //   photo_url: initData.user.photo_url,
      // })
    }
  }, [])

  const tryAutoLogin = () => {
    if (!user) {
      messageApi.warning('Telegram foydalanuvchisi aniqlanmadi')
      return
    }
    loginMutate({ telegram_id: user })
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
      {/* Val:{user} */}
      {contextHolder}
      {isLoggingIn ? <div>Loading...</div> : children}
    </authContext.Provider>
  )
}
