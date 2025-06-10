import dayjs from 'dayjs'
import { useRef, memo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import type { FC } from 'react'
import {
  Avatar,
  Button,
  DatePicker,
  Flex,
  Form,
  Modal,
  Popover,
  Space,
  Typography,
} from 'antd'
import ArrowUpRightIcon from '@/components/icons/arrow-up-right'
import CalendarIcon from '@/components/icons/calendar'
import { useMutation } from '@tanstack/react-query'
import { deleteBlock, updateBlockDate } from '../api'

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { useBranchIdStore } from '@/store/branch-id-store'
const { Text } = Typography

interface IProps {
  val: {
    br_start_date: string
    br_end_date: string
    date: string
    br_reason: string
    blocked_room_id?: number
  }
  refetch?: any
}

const BlockedBox: FC<IProps> = ({ val, refetch }) => {
  const { t } = useTranslation()
  const targetRef = useRef<HTMLDivElement>(null)
  const [form] = Form.useForm()
  const [moveGuestModal, setMoveGuestModal] = useState(false)
  const [unBlockModal, setUnBlockModal] = useState(false)
  const { branch } = useBranchIdStore()

  const { mutate: update, isLoading: isUpdate } = useMutation({
    mutationFn: ({ id, values }: { id: number | string; values: any }) => {
      return updateBlockDate(id, { ...values, branch })
    },
    onSuccess: () => {
      setMoveGuestModal(false)
      refetch()
    },
  })

  const differenceInDays =
    dayjs(val.br_end_date).diff(dayjs(val.br_start_date), 'day') -
    dayjs(val.date).diff(dayjs(val.br_start_date), 'day')

  const { mutate: deleteBlockMutation, isLoading: isDeleting } = useMutation({
    mutationFn: (id: string | number) => deleteBlock({ id, branch }), //
    onSuccess: () => {
      setUnBlockModal(false)
      refetch()
    },
  })

  useEffect(() => {
    form.setFieldsValue({
      br_start_date: dayjs(val.br_start_date),
      br_end_date: dayjs(val.br_end_date),
    })
  }, [val, form])

  const handleSubmit = (values: any) => {
    if (val?.blocked_room_id) {
      update({
        id: val?.blocked_room_id,
        values: {
          start_date: dayjs(values.br_start_date).format('YYYY-MM-DD'),
          end_date: dayjs(values.br_end_date).format('YYYY-MM-DD'),
        },
      })
    }
  }

  const unBlock = () => {
    if (val?.blocked_room_id) {
      deleteBlockMutation(val.blocked_room_id)
    } else {
      console.warn('Blocked room ID is missing')
    }
  }

  dayjs.extend(isSameOrBefore)

  return (
    <>
      <Popover
        overlayClassName="popover-shadow"
        content={
          <div className="flex flex-col">
            <div className="text-sm text-secondary mb-4">
              {dayjs(val.br_start_date).format('D MMMM, YYYY')} |{' '}
              {dayjs(val.br_end_date).format('D MMMM, YYYY')}
            </div>

            <ul className="flex flex-col gap-2">
              <li className="text-primary flex items-center gap-1 text-sm">
                <button
                  onClick={() => {
                    setMoveGuestModal(true)
                  }}
                >
                  {t('common.edit-date')}{' '}
                  <ArrowUpRightIcon className="text-[16px]" />
                </button>
              </li>
              <li className="text-primary flex items-center gap-1 text-sm">
                <button
                  onClick={() => {
                    setUnBlockModal(true)
                  }}
                >
                  {t('common.unblock-date')}{' '}
                  <ArrowUpRightIcon className="text-[16px]" />
                </button>
              </li>
            </ul>
          </div>
        }
        arrow={false}
        placement="bottomLeft"
      >
        <div
          ref={targetRef}
          style={{
            width: `calc(${100 * differenceInDays}% + ${differenceInDays}px ${
              dayjs(val.date).diff(dayjs(val.br_start_date), 'day')
                ? '+ 50%'
                : ''
            })`,
          }}
          className={`absolute top-0 left-0 h-full z-[1] px-4 text-white py-[13px] bg-primary-dark dark:bg-dark-bg ${
            dayjs(val.date).diff(dayjs(val.br_start_date), 'day')
              ? ''
              : 'ml-[50%]'
          }`}
        >
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs line-clamp-1 break-words w-full">
              {t('common.blocked')}
            </span>
            <span className="text-xs font-normal line-clamp-1 break-words w-full text-secondary">
              {val.br_reason === 'repair'
                ? t('common.needs-renovation')
                : val.br_reason === 'electr'
                ? t('common.electrical-problems')
                : val.br_reason === 'storage'
                ? t('common.storage')
                : val.br_reason}
            </span>
          </div>
        </div>
      </Popover>
      <Modal
        open={moveGuestModal}
        centered
        width={515}
        onOk={() => {
          setMoveGuestModal(false)
        }}
        onCancel={() => {
          setMoveGuestModal(false)
        }}
        classNames={{
          content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
      >
        <Flex vertical align="center" className="text-center">
          <Avatar
            shape="circle"
            size={62}
            className=" bg-[#DBEAFE] mb-5 border-[7px] border-[#EFF6FF]"
            icon={<CalendarIcon className="text-[26px] text-primary" />}
          />
          <Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[10px]">
            {t('block.modal-title')}
          </Text>
          <Text className="text-secondary leading-[25.6px] mb-[20px]">
            {t('block.modal-description')}
          </Text>
          <Form
            form={form}
            className="w-full"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <div className="flex gap-2 w-full">
              <Form.Item
                className="w-full"
                name="br_start_date"
                label={t('block.start-date')}
              >
                <DatePicker
                  size="large"
                  placeholder={t('fields.current_date.placeholder')}
                  className="hide-range-second-input h-[47px] w-full"
                  disabledDate={(current) =>
                    current && current.isBefore(dayjs(), 'day')
                  }
                />
              </Form.Item>

              <Form.Item
                className="w-full"
                name="br_end_date"
                label={t('block.end-date')}
              >
                <DatePicker
                  size="large"
                  placeholder={t('fields.new_date.placeholder')}
                  className="hide-range-second-input h-[47px] w-full"
                  disabledDate={(current) => {
                    const startDate = form.getFieldValue('br_start_date')
                    return (
                      (current && current.isBefore(dayjs(), 'day')) ||
                      (startDate &&
                        current.isSameOrBefore(dayjs(startDate), 'day'))
                    )
                  }}
                />
              </Form.Item>
            </div>
            <Space className="mt-[28px]">
              <Button
                className="text-primary-dark dark:text-white font-semibold"
                onClick={() => {
                  setMoveGuestModal(false)
                  //   form.resetFields()
                }}
              >
                {t('common.cancel')}
              </Button>

              <Button
                className="bg-primary-dark text-white font-semibold"
                htmlType="submit"
              >
                {t('common.save-changes')}
              </Button>
            </Space>
          </Form>
        </Flex>
      </Modal>
      <Modal
        open={unBlockModal}
        centered
        width={515}
        onOk={() => {
          setUnBlockModal(false)
        }}
        onCancel={() => {
          setUnBlockModal(false)
        }}
        classNames={{
          content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
      >
        <Flex vertical align="center" className="text-center">
          <Avatar
            shape="circle"
            size={62}
            className=" bg-[#DBEAFE] mb-5 border-[7px] border-[#EFF6FF]"
            icon={<CalendarIcon className="text-[26px] text-primary" />}
          />
          <Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[10px]">
            {t('block.unblock')}
          </Text>
          <Text className="text-secondary leading-[25.6px] mb-[20px]">
            {t('block.unblock-description')}
          </Text>

          <Space className="mt-[0px]">
            <Button
              className="text-primary-dark dark:text-white font-semibold"
              onClick={() => {
                setUnBlockModal(false)
                //   form.resetFields()
              }}
            >
              {t('common.cancel')}
            </Button>

            <Button
              className="bg-primary-dark text-white font-semibold"
              onClick={unBlock}
              loading={isDeleting}
            >
              {t('block.unblock-btn')}
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}

export default memo(BlockedBox)
