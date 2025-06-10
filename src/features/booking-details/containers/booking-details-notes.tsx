import { useState } from 'react'
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Table,
  Typography,
} from 'antd'
import { useMutation } from '@tanstack/react-query'

import NoteIcon from '@/components/icons/note'
import PlusIcon from '@/components/icons/plus'

import queryClient from '@/utils/query-client'

import { postAddNote } from '../api'

import type { FC } from 'react'
import type { TableProps } from 'antd'
import type { IBookingDetails } from '../types'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'

interface DataType {
  key: number | string
  staff: string
  date: string
  notes: string
}

const BookingDetailsNotes: FC<{ data?: IBookingDetails; refetch?: any }> = ({
  data,
  refetch,
}) => {
  const [form] = Form.useForm()
  const [addNoteModal, setAddNoteModal] = useState(false)
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const columns: TableProps<DataType>['columns'] = [
    {
      width: 263,
      title: t('common.staff'),
      dataIndex: 'staff',
      key: 'staff',
      className: 'whitespace-nowrap font-medium',
    },
    {
      width: 263,
      title: t('common.date'),
      dataIndex: 'date',
      key: 'date',
      className: 'font-medium',
    },
    {
      title: t('common.notes'),
      dataIndex: 'notes',
      key: 'notes',
      className: 'font-medium',
    },
  ]

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: any) => {
      const allValues = {
        ...values,
        order: data?.id,
        branch,
      }
      return postAddNote(allValues)
    },
    onSuccess: () => {
      form.resetFields()
      setAddNoteModal(false)
      return queryClient.invalidateQueries(['orders-types-r-tariff'])
      refetch()
    },
  })

  const formatDate = (dateString: any) => {
    if (!dateString) return '' // Agar sana bo'sh bo'lsa, bo'sh qiymat qaytaradi
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0') // Kun
    const month = String(date.getMonth() + 1).padStart(2, '0') // Oy (0-based, shuning uchun +1)
    const year = date.getFullYear() // Yil
    const hours = String(date.getHours()).padStart(2, '0') // Soat
    const minutes = String(date.getMinutes()).padStart(2, '0') // Daqiqa

    return `${day}.${month}.${year} ${hours}:${minutes}`
  }
  const dataSource = data?.order_notes?.map((val, i) => ({
    key: val?.employee.first_name + i,
    staff: val?.employee.first_name + ' ' + val?.employee.last_name,
    date: formatDate(val?.created_at),
    notes: val?.note,
  }))

  return (
    <div>
      <div className="mb-6">
        <Button
          type="link"
          size="large"
          className="flex items-center"
          onClick={() => setAddNoteModal(true)}
        >
          <PlusIcon /> {t('room-cleaning-page.add-note-modal.title')}
        </Button>
      </div>
      <Table
        className="custom-table"
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      <Modal
        open={addNoteModal}
        centered
        width={515}
        onOk={() => setAddNoteModal(false)}
        onCancel={() => setAddNoteModal(false)}
        classNames={{
          content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
      >
        <Flex vertical align="center">
          <Avatar
            shape="circle"
            size={62}
            className=" bg-[#DBEAFE] mb-5 border-[7px] border-[#EFF6FF]"
            icon={<NoteIcon className="text-[26px] text-primary" />}
          />
          <Typography.Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[10px]">
            {t('room-cleaning-page.add-note-modal.title')}
          </Typography.Text>
          <Typography.Text className="text-secondary text-center leading-[25.6px] mb-[20px]">
            {t('room-cleaning-page.add-note-modal.description')}
          </Typography.Text>
          <Form
            layout="vertical"
            className="w-full"
            onFinish={mutate}
            form={form}
          >
            <Form.Item
              label={t('common.notes')}
              name="note"
              className="mb-[20px]"
            >
              <Input.TextArea
                size="large"
                placeholder={t('common.text')}
                className="h-[174px] resize-none"
              />
            </Form.Item>
            <Flex justify="center" gap={16}>
              <Button
                className="text-primary-dark font-semibold"
                onClick={() => setAddNoteModal(false)}
              >
                {t('common.cancel')}
              </Button>
              <Button
                htmlType="submit"
                className="bg-primary text-white font-semibold"
                loading={isLoading}
              >
                {t('room-cleaning-page.add-note-modal.title')}
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Modal>
    </div>
  )
}

export default BookingDetailsNotes
