import { FC, useState } from 'react'
import { Button, Table } from 'antd'

import PlusIcon from '@/components/icons/plus'

import type { TableProps } from 'antd'
import AddGuestModal from './add-guest-modal'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import LogoutIcon from '@/components/icons/logout'

interface DataType {
  key?: string
  name?: string
  surname?: string
  passport?: string
  country?: string
  birth_date?: string
  email?: string
  phone?: string
  order_guests?: any
}

interface IProps {
  data: DataType
}

const BookingGuestDetails: FC<IProps> = ({ data }) => {
  const [addGuestModal, setAddGuestModal] = useState(false)
  const { t } = useTranslation()

  let currentLang = localStorage.getItem('i18nextLng') || 'ru'

  if (currentLang === 'uz') {
    currentLang = 'uz-cyrillic'
  } else if (currentLang === 'oz') {
    currentLang = 'uz-latin'
  }
  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('common.first-name'),
      width: 190,
      dataIndex: 'name',
      key: 'name',
      className: 'whitespace-nowrap font-medium',
    },
    {
      title: t('common.last-name'),
      width: 190,
      dataIndex: 'surname',
      key: 'surname',
      className: 'font-medium',
    },
    {
      title: t('common.middle-name'),
      width: 190,
      dataIndex: 'middleName',
      key: 'middleName',
      className: 'font-medium',
    },
    {
      title: t('common.passport-details'),
      width: 190,
      dataIndex: 'passport',
      key: 'passport',
      className: 'font-medium',
    },
    {
      title: t('common.birthday'),
      width: 190,
      dataIndex: 'birth_date',
      key: 'birth_date',
      className: 'font-medium',
    },
    {
      title: t('common.country'),
      width: 190,
      key: 'country',
      className: 'font-medium',
      render: (record: any) =>
        record?.country?.translations?.[currentLang]?.name || 'N/A',
    },

    // {
    //   title: 'E-mail',
    //   width: 190,
    //   dataIndex: 'email',
    //   key: 'email',
    //   className: 'font-medium',
    // },
    {
      title: t('common.phone-number'),
      width: 190,
      dataIndex: 'phone',
      key: 'phone',
      className: 'font-medium',
    },
    {
      title: t('common.action'),
      width: 190,
      dataIndex: 'phone',
      key: 'phone',
      className: 'font-medium',
      render: (_: any) => (
        <Button
          type="link"
          size="small"
          // onClick={() => setAddGuestModal(true)}
        >
          <LogoutIcon />
          {t('common.departure')}
        </Button>
      ),
    },
  ]

  const items =
    data?.order_guests?.map((guest: any, index: any) => ({
      key: index,
      name: guest.first_name || 'N/A',
      surname: guest.last_name || 'N/A',
      middleName: guest.middle_name || 'N/A',
      passport: guest.passport || 'N/A',
      birth_date: guest?.birthday
        ? dayjs(guest.birthday).isValid()
          ? dayjs(guest.birthday).format('DD MMMM YYYY')
          : 'N/A'
        : 'N/A',
      country: guest.birth_country || 'N/A',
      email: guest.email || 'N/A',
      phone: guest.phone || 'N/A',
    })) || []
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button
          type="link"
          size="large"
          className="flex items-center"
          onClick={() => setAddGuestModal(true)}
        >
          <PlusIcon /> {t('common.add-guests')}
        </Button>
      </div>
      <Table
        className="custom-table"
        bordered
        columns={columns}
        dataSource={items}
        pagination={false}
      />
      <AddGuestModal
        addGuestModal={addGuestModal}
        setAddGuestModal={setAddGuestModal}
        data={data}
      />
    </>
  )
}

export default BookingGuestDetails
