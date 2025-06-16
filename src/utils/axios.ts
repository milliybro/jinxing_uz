import axios from 'axios'
import i18next from 'i18next'
import { notification } from 'antd'
import settings from '@/config/settings'
import { refreshToken } from '@/features/auth'

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

  // if (error.response !== null) {
  //   if (errorStatus === 403) {
  //     const rToken = localStorage.getItem('refresh_token')

  //     // if (rToken !== null) {
  //     //   try {
  //     //     const res = await refreshToken({ refresh: rToken })
  //     //     const { refresh, access } = res.data
  //     //     localStorage.setItem('refresh_token', refresh)
  //     //     localStorage.setItem('access_token', access)
  //     //   } catch (err) {
  //     //     localStorage.removeItem('refresh_token')
  //     //     localStorage.removeItem('access_token')

  //     //   } finally {
  //     //     window.location.reload()
  //     //   }
  //     // }
  //   }
  //   if (errorStatus === 401) {
  //     notification.error({
  //       message: '401',
  //       description: '',
  //     })
  //   }

  //   if (errorStatus === 500) {
  //     notification.error({
  //       message: 'Server error | 500',
  //       description: 'Please try again later',
  //     })
  //   } else if (Array.isArray(errorData)) {
  //     errorData.forEach((val: IErrorMessage) => {
  //       notification.error({
  //         message: val?.error_type,
  //         description: val?.detail,
  //       })
  //     })
  //   } else {
  //     notification.error({
  //       message: 'Xatolik yuz berdi',
  //       description: 'An error occurred. Please try again.',
  //     })
  //   }

  //   await Promise.reject(error.response)
  // }
  // if (error.request !== null) {
  //   // no response received from server
  //   await Promise.reject(error.request)
  // }

  // something happened in setting up the request
  console.error(error.message)

  console.log('Error config object:', error.config)

  // Using toJSON you get an object with more information about the HTTP error
  console.log('\nError object as json:', error.toJSON())

  await Promise.reject(error)
}

export default request
