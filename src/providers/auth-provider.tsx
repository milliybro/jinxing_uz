import { useState, useMemo, useEffect } from 'react'
import { authContext } from '@/contexts/auth-context'
import { useMutation } from '@tanstack/react-query'
import { login, refresh } from '@/api'
import { message } from 'antd'

interface Props {
  children: React.ReactElement
}

export default function AuthProvider(props: Props): React.ReactElement {
  const { children } = props
  const [messageApi, contextHolder] = message.useMessage()
  const [values, setValue] = useState('')

  const [isAuth, setIsAuth] = useState<boolean>(
    Boolean(localStorage.getItem('access_token')),
  )
  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth])

  const { mutate: loginMutate, isLoading: isLoggingIn } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem('refresh_token', res?.refresh)
      localStorage.setItem('access_token', res?.access)
      setIsAuth(true)
    },
    onError: (err) => {
      console.error('Login error:', err)
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

  // const tryAutoLogin = () => {
  //   let telegramId

  //   if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
  //     telegramId = window.Telegram.WebApp.initDataUnsafe.user.id
  //   } else {
  //     telegramId = '1930372151'
  //   }

  //   loginMutate({ telegram_id: telegramId.toString() })
  // }
  const tryAutoLogin = () => {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user
    console.log('Telegram foydalanuvchi:', user)

    const telegramId = user?.id

    if (!telegramId) {
      messageApi.open({
        type: 'warning',
        content: 'Telegram SDK hali yuklanmagan yoki foydalanuvchi mavjud emas',
      })
      return
    }

    setValue(telegramId)
    loginMutate({ telegram_id: telegramId.toString() })
  }

  // useEffect(() => {
  //   if (!window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
  //     messageApi.open({
  //       type: 'warning',
  //       content: 'Telegram SDK hali yuklanmagan yoki foydalanuvchi mavjud emas',
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!accessToken && window.Telegram && window.Telegram.WebApp) {
  //     const tg = window.Telegram.WebApp
  //     const user = tg.initDataUnsafe.user
  //     if (user && user.id) {
  //       mutate({ telegram_id: user.id.toString() })
  //     }
  //   }
  // }, [accessToken, mutate])

  useEffect(() => {
    const access = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')

    if (!access && refreshToken) {
      refreshMutate({ refresh: refreshToken })
    } else if (!access && !refreshToken) {
      tryAutoLogin()
    }
  }, [])

  return (
    <authContext.Provider value={value}>
      {contextHolder}
      {isLoggingIn ? <div>Loading...</div> : children}
    </authContext.Provider>
  )
}
