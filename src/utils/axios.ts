import axios from 'axios'
import i18next from 'i18next'
import settings from '@/config/settings'

import type { AxiosError } from 'axios'
import type { IErrorMessage } from '@/types'

const request = axios.create({
  baseURL: settings.baseURL,
  timeout: settings.requestTimeout,
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  const cookie = document?.cookie
    ?.split('; ')
    ?.find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1]

  const locale = i18next.language

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`
  }

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

request.interceptors.response.use((response) => response.data, errorHandler)

export async function errorHandler(error: AxiosError): Promise<void> {
  const errorStatus = error.response?.status
  const errorData = error?.response?.data as IErrorMessage[]

  console.error(error.message)

  console.log('Error config object:', error.config)

  // Using toJSON you get an object with more information about the HTTP error
  console.log('\nError object as json:', error.toJSON())

  await Promise.reject(error)
}

export default request
