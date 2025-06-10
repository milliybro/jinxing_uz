import {
  Avatar,
  Button,
  Divider,
  Flex,
  Modal,
  Popover,
  Space,
  Switch,
  // Tag,
  Typography,
} from 'antd'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'

import useUserData from '@/hooks/use-user-data'

import UserIcon from '../icons/user'
import HotelIcon from '../icons/hotel'
import LogoutIcon from '../icons/logout'
import SettingsIcon from '../icons/settings'
import ArrowDownIcon from '../icons/arrow-down'
import UserCircleIcon from '../icons/user-circle'
import { useTranslation } from 'react-i18next'

const ProfilePopover = () => {
  const { t } = useTranslation()
  const user = useUserData()
  const [modalLogout, setModalLogout] = useState(false)
  const [cookies, setCookie] = useCookies(['darkTheme'])

  const changeThemeHandler = (val: boolean) => {
    // save darkThemes value as cookie
    setCookie('darkTheme', val)
  }

  useEffect(() => {
    // set tailwinds dark theme
    if (cookies.darkTheme) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }

    // remove scrollbars
    document.documentElement.style.overflow = 'hidden'
    // trigger reflow so that overflow style is applied
    document.body.clientWidth
    // change scheme
    document.documentElement.setAttribute(
      'data-color-scheme',
      cookies.darkTheme ? 'dark' : 'light',
    )
    // remove overflow style, which will bring back the scrollbar with the correct scheme
    document.documentElement.style.overflow = ''
  }, [cookies.darkTheme])

  return (
    <>
      <Popover
        arrow={false}
        trigger="click"
        placement="bottomRight"
        overlayClassName="z-[10]"
        overlayInnerStyle={{
          padding: 0,
          overflow: 'hidden',
          width: 347,
        }}
        content={
          <div className="flex flex-col py-2 dark:bg-primary-dark">
            <Button
              size="large"
              type="text"
              className="flex items-center font-medium"
            >
              <div className="flex items-center gap-5 w-full text-left">
                <UserIcon className="text-[20px]" />
                {t('common.my-account')}
              </div>
            </Button>
            <Button
              size="large"
              type="text"
              className="flex items-center font-medium"
            >
              <div className="flex items-center gap-5 w-full text-left">
                <HotelIcon className="text-[20px]" />
                {t('common.hotel-managment')}
              </div>
            </Button>
            <Divider className="my-2" />
            <div className="flex items-center w-full px-[15px] text-[15px] py-[11px] justify-between font-medium">
              {t('common.dark-mode')}
              <Switch
                onChange={changeThemeHandler}
                checked={cookies.darkTheme}
              />
            </div>
            {/* <Divider className="my-2" />
             <Button
              size="large"
              type="text"
              className="flex items-center font-medium"
            >
              <div className="flex items-center gap-1">
                Подписка Milliy Turizm
                <Tag
                  bordered={false}
                  className="text-primary h-[20px] leading-[18px] bg-primary/20 rounded-full flex items-center text-[10px] font-semibold uppercase"
                >
                  Pro
                </Tag>
              </div>
            </Button> */}
            <Divider className="my-2" />
            <Button
              size="large"
              type="text"
              className="flex items-center font-medium"
            >
              <div className="flex items-center gap-5 w-full text-left">
                <SettingsIcon className="text-[20px]" />
                {t('common.settings-system')}
              </div>
            </Button>
            <Button
              size="large"
              type="text"
              danger
              className="flex items-center font-medium hover:bg-danger/20"
              onClick={() => setModalLogout(true)}
            >
              <div className="flex items-center gap-5 w-full text-left">
                <LogoutIcon className="text-[20px]" />
                {t('common.exit')}
              </div>
            </Button>
          </div>
        }
      >
        <button
          type="button"
          className="flex items-center select-none group font-semibold hover:bg-transparent text-primary-dark dark:text-white text-[15px] leading-[19.12px]"
        >
          <Avatar
            shape="square"
            size={46}
            icon={<UserCircleIcon className="text-[24px]" />}
            src={user?.avatar}
            className="bg-secondary-light mr-4 text-primary-dark dark:text-white dark:bg-white/5 font-normal"
          />
          {user?.first_name + ' ' + user?.last_name}
          <ArrowDownIcon className="ml-2 text-base" />
        </button>
      </Popover>
      <Modal
        open={modalLogout}
        centered
        width={515}
        onOk={() => setModalLogout(false)}
        onCancel={() => setModalLogout(false)}
        classNames={{
          content:
            'p-[40px] [&>.ant-modal-close]:text-primary-dark dark:[&>.ant-modal-close]:text-dark-bg',
        }}
        footer={null}
      >
        <Flex vertical align="center" className="text-center">
          <Avatar
            shape="circle"
            size={62}
            className=" bg-danger/20 mb-5 border-[7px] border-danger/5"
            icon={<LogoutIcon className="text-[26px] text-danger" />}
          />
          <Typography.Text className="text-[24px] font-bold leading-[30.6px] mb-[10px]">
            {t('common.exit-title')}
          </Typography.Text>
          <Typography.Text className="text-secondary leading-[25.6px] mb-[20px]">
            {t('common.exit-desc')}
          </Typography.Text>
          <Space>
            <Button
              className=" font-semibold"
              onClick={() => setModalLogout(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              className="bg-primary-dark dark:bg-dark-bg text-white font-semibold"
              onClick={() => {
                setModalLogout(false)
                localStorage.clear()
                window.location.reload()
              }}
            >
              {t('common.exit')}
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}

export default ProfilePopover
