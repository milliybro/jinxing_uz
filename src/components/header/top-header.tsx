import { Divider, Input, Modal, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import CSelect from '../cselect'
import NotificationPopover from './notification-popover'

// import AddIcon from '../icons/add'
import NotFoundIllustration from '@/assets/not-found-illustration'
import AddCircleIcon from '../icons/add-circle'
import CommandIcon from '../icons/command'
import SearchIcon from '../icons/search'
import UserIcon from '../icons/user'
import ProfilePopover from './profile-popover'

import logo from '@/assets/logo.png'
import logo_white from '@/assets/uzlogo_white.png'

import type { InputRef } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/uz'
import 'dayjs/locale/ru'
import { useBranchIdStore } from '@/store/branch-id-store'
import { useQuery } from '@tanstack/react-query'
import { getHotelContent } from '@/features/content-for-emehmon/api'

const TopHeader = () => {
  const inputRef = useRef<InputRef>(null)
  const [searchVal, setSearchVal] = useState('')
  const [modal1Open, setModal1Open] = useState(false)

  const navigate = useNavigate()
  const { i18n } = useTranslation()

  const { setBranch: setBranchId } = useBranchIdStore()

  const changeLanguage = (val: string) => {
    i18n.changeLanguage(val)
    dayjs.locale(dayjs.locale(val === 'oz' ? 'uz-latn' : i18n.language))
  }

  useQuery(['branches'], getHotelContent, {
    enabled: true,
    onSuccess: (data) => {
      setBranchId(data?.results[0].id)
    },
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === '/') {
        setModal1Open(true)
        setTimeout(() => {
          inputRef.current?.focus()
        }, 500)
      }

      if (event.ctrlKey && event.key === 'b') {
        setModal1Open(false)
        navigate('/new-booking')
      }
    }

    dayjs.locale(i18n.language === 'oz' ? 'uz-latn' : i18n.language)

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // console.log(dayjs.locale(), 'locale')

  const clickHandler = (val: string) => (): void => {
    setModal1Open(false)
    navigate(val)
  }

  const recentActivities = [
    {
      title: 'Добавить бронирование',
      description: 'Бронирования',
      keyBtn: 'B',
      path: '/new-booking',
    },
    {
      title: 'Добавить номер',
      description: 'Тарифы и номера',
      keyBtn: 'N',
      path: '/404',
    },
    {
      title: 'Добавить контрагента',
      description: 'Контрагенты',
      keyBtn: 'C',
      path: '/404',
    },
  ]

  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null
    }
    return null
  }

  const darkTheme = getCookie('darkTheme')

  return (
    <div className="flex container py-2 items-center justify-between">
      <div>
        <Link to="/">
          {darkTheme !== 'true' ? (
            <img width={153} src={logo} />
          ) : (
            <img width={153} src={logo_white} />
          )}
        </Link>
      </div>

      {/* <div className="max-w-[600px] w-full relative">
        <Input
          readOnly
          prefix={<SearchIcon className="mr-1 text-secondary" />}
          placeholder="Поиск в системе"
          className="max-w-[600px] w-full"
          onClick={() => {
            setModal1Open(true)
            setTimeout(() => {
              inputRef.current?.focus()
            }, 500)
          }}
        />
        <div className="flex items-center text-success gap-1 absolute z-[1] pointer-events-none top-[calc(50%-12px)] right-[16px]">
          <CommandIcon />
          <AddIcon /> /
        </div>
      </div> */}
      <div className="flex items-center">
        <CSelect
          className="[&_.ant-select-selector]:shadow-none"
          rootClassName="shadow-none"
          size="large"
          variant="borderless"
          defaultValue={i18n.language}
          onChange={changeLanguage}
          options={[
            {
              label: "O'zbekcha",
              value: 'oz',
            },
            { label: 'Ўзбекча', value: 'uz' },
            { label: 'Русский', value: 'ru' },
          ]}
        />
        <NotificationPopover />
        <Divider type="vertical" className="mx-[20px] h-[24px]" />
        <ProfilePopover />
      </div>

      {/* <Modal
        width={620}
        open={modal1Open}
        closeIcon={null}
        footer={null}
        centered
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        classNames={{ content: 'rounded-[8px] p-0 overflow-hidden' }}
      >
        <Input
          ref={inputRef}
          prefix={<SearchIcon className="mr-1 text-secondary" />}
          className="h-[47px] rounded-b-none"
          variant="borderless"
          placeholder="Поиск в системе"
          value={searchVal}
          onChange={(val) => setSearchVal(val.currentTarget.value)}
        />
        {searchVal ? (
          <div className="h-[243px] w-full content-center text-center">
            <div className="mx-auto w-fit">
              <NotFoundIllustration className="text-primary-dark dark:text-primary-light" />
            </div>
            <Typography.Text className="text-xs text-secondary">
              К сожалению по вашему запросу ничего не найдено
            </Typography.Text>
          </div>
        ) : null}
        <Divider className="m-0" />
        <div className="p-2 flex flex-col">
          <Typography.Text className="text-xs text-secondary mb-2 px-2">
            Недавние действия
          </Typography.Text>

          {recentActivities.map((val, i) => (
            <div
              key={'recent-activity-item' + i}
              className="flex items-center gap-3 p-2 duration-200 rounded-lg cursor-pointer dark:hover:bg-secondary-light/5 hover:bg-secondary-light"
              onClick={clickHandler(val.path)}
            >
              <AddCircleIcon className="text-[20px]" />
              <div className="flex flex-col gap-1 flex-1">
                <Typography.Text className="text-[15px] font-medium">
                  {val.title}
                </Typography.Text>
                <Typography.Text className="text-xs text-secondary">
                  {val.description}
                </Typography.Text>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[22px] h-[22px] rounded border border-border dark:border-secondary-dark text-secondary text-center">
                  <CommandIcon />
                </div>
                <div className="w-[22px] h-[22px] text-xs content-center rounded border border-border dark:border-secondary-dark text-secondary text-center">
                  {val.keyBtn}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Divider className="m-0" />
        {!searchVal ? (
          <div className="p-4 flex flex-col">
            <Typography.Text className="text-xs text-secondary mb-2">
              Последние результаты поиска
            </Typography.Text>
            <div className="flex items-center gap-3 py-2">
              <UserIcon className="text-[20px]" />
              <div className="flex flex-col gap-1 flex-1">
                <Typography.Text className="text-[15px] font-medium">
                  Alexandra Penova
                </Typography.Text>
                <Typography.Text className="text-xs text-secondary">
                  Гость
                </Typography.Text>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2">
              <UserIcon className="text-[20px]" />
              <div className="flex flex-col gap-1 flex-1">
                <Typography.Text className="text-[15px] font-medium">
                  Alexandra Penova
                </Typography.Text>
                <Typography.Text className="text-xs text-secondary">
                  Гость
                </Typography.Text>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2">
              <UserIcon className="text-[20px]" />
              <div className="flex flex-col gap-1 flex-1">
                <Typography.Text className="text-[15px] font-medium">
                  Alexandra Penova
                </Typography.Text>
                <Typography.Text className="text-xs text-secondary">
                  Гость
                </Typography.Text>
              </div>
            </div>
          </div>
        ) : null}
      </Modal> */}
    </div>
  )
}

export default TopHeader
