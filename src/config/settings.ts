const isDev = import.meta.env.MODE === 'development'

const settings = {
  baseURL: isDev
    ? import.meta.env.VITE_BASE_URL
    : (window.location.origin || '') + '/api/v1',
  staleTime: 120000, // 2 mins,
  requestTimeout: 180000, // 3 mins
  idleTimeout: 3000, // 3 sec
  rowsPerPage: 10,
  messageDuration: 3,
  defaultLanguage: 'ru',
  project: {},
} as const

export default settings
