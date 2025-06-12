import { Link, useLocation } from 'react-router-dom'

import CategoriesIcon from '../icons/categories-icon'
import SearchIcon from '../icons/search'
import CartIcon from '../icons/cart-icon'
import { HistoryOutlined, HomeOutlined } from '@ant-design/icons'
import { useCartStore } from '@/store/cart-store'

const Navigation = () => {
  const { pathname } = useLocation()
  const cart = useCartStore((state) => state.cart)

  // const cartCount = cart.reduce((sum, item) => sum + item.count, 0)

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

  return (
    <nav
      className="flex container items-center justify-between w-full"
      aria-label="Sayt navigatsiyasi"
    >
      <ul className="flex items-center gap-4 justify-between w-full">
        {routes.map(({ key, path, label, name, ariaLabel }) => {
          const isActive = pathname === path
          return (
            <li key={key}>
              <Link
                to={path}
                aria-label={ariaLabel}
                className={`flex flex-col items-center px-1 pt-4 pb-3 rounded-lg select-none font-medium hover:text-inherit hover:dark:bg-secondary-light/5 hover:bg-secondary-light ${
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
