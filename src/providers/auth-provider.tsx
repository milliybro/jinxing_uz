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

  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth])
  // const { user } = useTelegram()

  const { mutate: loginMutate, isLoading: isLoggingIn } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem('refresh_token', res?.refresh)
      localStorage.setItem('access_token', res?.access)
    },
    onError: (err) => {
      console.error('Login error:', err)
      messageApi.error('Login muvaffaqiyatsiz tugadi')
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
      loginMutate({ telegram_id: initData?.user?.id })
    }
  }, [])

  return (
    <authContext.Provider value={value}>
      {contextHolder}
      {isLoggingIn ? <div>Loading...</div> : children}
    </authContext.Provider>
  )
}
