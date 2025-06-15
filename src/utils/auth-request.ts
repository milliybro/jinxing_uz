import axios from 'axios'
import { notification } from 'antd'
import settings from '@/config/settings'
import { refreshToken } from '@/features/auth'

import type { AxiosError } from 'axios'
import type { IErrorMessage } from '@/types'

export const baseURL = 'http://jinxingbot.uz/en/api/'

const requestAuth = axios.create({
  baseURL: baseURL,
  timeout: settings.requestTimeout,
})

requestAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  const cookie = document?.cookie
    ?.split('; ')
    ?.find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1]

  if (token !== null) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`
  }
  const locale = localStorage.getItem('i18nextLng')

  config.headers['Accept-Language'] =
    locale === 'uz'
      ? 'uz-cyrillic'
      : locale === 'oz'
      ? 'uz-latin'
      : locale || 'ru'

  if (cookie !== null) {
    config.headers['X-CSRFToken'] = cookie
  }


  return config
}, errorHandler)

requestAuth.interceptors.response.use((response) => response.data, errorHandler)

export async function errorHandler(error: AxiosError): Promise<void> {
  const errorStatus = error.response?.status
  const errorData = error?.response?.data as IErrorMessage[]

  if (error.response !== null) {
    if (errorStatus === 403) {
      const rToken = localStorage.getItem('refresh')

      if (rToken !== null) {
        try {
          const res = await refreshToken({ refresh: rToken })
          const { refresh, access } = res.data.auth_tokens
          localStorage.setItem('refresh', refresh)
          localStorage.setItem('access', access)
        } catch (err) {
          localStorage.setItem('refresh_token_error', JSON.stringify(err))
          localStorage.removeItem('refresh')
          localStorage.removeItem('access')
        } finally {
          window.location.reload()
        }
      }
    }

    if (errorStatus === 500) {
      notification.error({
        message: 'Server error | 500',
        description: 'Please try again later',
      })
    } else if (Array.isArray(errorData)) {
      errorData.forEach((val: IErrorMessage) => {
        notification.error({
          message: val?.error_type,
          description: val?.detail,
        })
      })
    } else {
      notification.error({
        message: 'Unexpected error',
        description: 'An error occurred. Please try again.',
      })
    }

    await Promise.reject(error.response)
  }
  if (error.request !== null) {
    await Promise.reject(error.request)
  }

  console.error(error.message)

  console.log('Error config object:', error.config)

  console.log('\nError object as json:', error.toJSON())

  await Promise.reject(error)
}

export default requestAuth
