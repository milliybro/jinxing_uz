import { Link, useLocation } from 'react-router-dom'

import CategoriesIcon from '../icons/categories-icon'
import SearchIcon from '../icons/search'
import CartIcon from '../icons/cart-icon'
import { HistoryOutlined, HomeOutlined } from '@ant-design/icons'
import { useCartStore } from '@/store/cart-store'
import { useEffect, useState } from 'react'
import UserCircleIcon from '../icons/user-circle'
import PieChartIcon from '../icons/statistics-icon'
import FileIcon from '../icons/file'

const Navigation = () => {
  const { pathname } = useLocation()
  const cart = useCartStore((state) => state.cart)

  const [userId, setUserId] = useState<number | null>(null)
  const [isSuperUser, setIsSuperUser] = useState<number | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1]
        const payloadJson = atob(
          payloadBase64.replace(/-/g, '+').replace(/_/g, '/'),
        )
        const payload = JSON.parse(payloadJson)
        setUserId(payload.id)
        setIsSuperUser(payload?.is_superuser)
      } catch (error) {
        console.error('Token decode qilishda xatolik:', error)
      }
    }
  }, [])

  const routes = [
    {
      key: 'home',
      label: <HomeOutlined className="text-[24px]" aria-hidden="true" />,
      path: '/',
      name: 'Asosiy',
      ariaLabel: 'Asosiy sahifa',
    },
    {
      key: 'categories',
      label: <CategoriesIcon className="text-[24px]" aria-hidden="true" />,
      path: '/categories',
      name: 'Katalog',
      ariaLabel: 'Katalog',
    },
    {
      key: 'search',
      label: <SearchIcon className="text-[24px]" aria-hidden="true" />,
      path: '/search',
      name: 'Qidiruv',
      ariaLabel: 'Qidiruv',
    },
    {
      key: 'history',
      label: <HistoryOutlined className="text-[24px]" aria-hidden="true" />,
      path: '/history',
      name: 'Tarix',
      ariaLabel: 'Tarix',
    },
    {
      key: 'cart',
      label: (
        <div className="relative">
          <CartIcon className="text-[24px]" aria-hidden="true" />
          {cart?.length > 0 && (
            <span
              className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center leading-none"
              aria-label={`${cart?.length} ta mahsulot savatda`}
            >
              {cart?.length}
            </span>
          )}
        </div>
      ),
      path: '/cart',
      name: 'Savatcha',
      ariaLabel: 'Savatcha',
    },
  ]

  const adminRoutes = [
    {
      key: 'statistics',
      label: <PieChartIcon className="text-[24px]" aria-hidden="true" />,
      path: '/admin',
      name: 'Statistika',
      ariaLabel: 'Statistika',
    },
    {
      key: 'orders',
      label: <FileIcon className="text-[24px]" aria-hidden="true" />,
      path: '/orders',
      name: 'Buyurtma',
      ariaLabel: 'Buyurtmalar',
    },
    {
      key: 'users',
      label: <UserCircleIcon className="text-[24px]" aria-hidden="true" />,
      path: '/users',
      name: 'Foydalanuvchi',
      ariaLabel: 'Foydalanuvchilar',
    },
    {
      key: 'categories',
      label: <CategoriesIcon className="text-[24px]" aria-hidden="true" />,
      path: '/resourses',
      name: 'Mahsulotlar',
      ariaLabel: 'Kategoriyalar',
    },
  ]

  if (userId === null) {
    return null
  }

  const activeRoute = isSuperUser ? adminRoutes : routes

  return (
    <nav
      className="flex container items-center justify-between w-full"
      aria-label="Sayt navigatsiyasi"
    >
      <ul className="flex items-center gap-4 justify-between w-full">
        {activeRoute.map(({ key, path, label, name, ariaLabel }) => {
          const isActive = pathname === path
          // const match = useMatch(path)
          // const isActive = Boolean(match)
          return (
            <li key={key}>
              <Link
                to={path}
                aria-label={ariaLabel}
                className={`w-[32px] h-[32px] flex flex-col items-center px-1 pt-4 pb-3 rounded-lg select-none font-medium hover:text-inherit ${
                  isActive ? 'text-[#fdbb31]' : 'dark:text-white'
                }`}
              >
                {label}
                <span className="text-[14px] mt-1">{name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
