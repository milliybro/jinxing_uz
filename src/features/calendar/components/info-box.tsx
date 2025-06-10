import dayjs from 'dayjs'
import { useRef, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Button,
  DatePicker,
  Flex,
  Form,
  Modal,
  Popover,
  Space,
  Tag,
  Typography,
} from 'antd'

import { formatAmount } from '@/helpers/format-amount'

import CSelect from '@/components/cselect'
import AlertIcon from '@/components/icons/alert'
import ArrowUpRightIcon from '@/components/icons/arrow-up-right'

import type { FC } from 'react'
import type { IResult, IResultData } from '../types'
import { useMutation } from '@tanstack/react-query'
import { updateOrderItem } from '@/features/welcome/api'
import { useBranchIdStore } from '@/store/branch-id-store'

const { Text } = Typography

interface IProps {
  parVal: IResult
  val: IResultData
  refetch?: () => void
}

const InfoBox: FC<IProps> = ({ val, parVal, refetch }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const targetRef = useRef<HTMLDivElement>(null)
  const [moveGuestModal, setMoveGuestModal] = useState(false)
  const { branch } = useBranchIdStore()
  const navigate = useNavigate()

  const differenceInDays =
    dayjs(val.order_end_date).diff(dayjs(val.order_start_date), 'day') -
    dayjs(val.date).diff(dayjs(val.order_start_date), 'day')

  const { mutate } = useMutation({
    mutationFn: updateOrderItem,
    onSuccess: refetch,
  })

  return (
    <>
      <Popover
        overlayClassName="popover-shadow"
        content={
          <div className="flex flex-col">
            <div className="text-sm text-secondary mb-4">
              {dayjs(val.order_start_date).format('D MMMM, YYYY')} |{' '}
              {dayjs(val.order_end_date).format('D MMMM, YYYY')}
            </div>
            <div className="text-[18px] mb-2 text-primary-dark dark:text-white font-bold">
              {val.guest_fullname}
            </div>
            <div className="text-sm text-secondary font-normal mb-2">
              {formatAmount(val.order_subtotal)} UZS{' '}
              <Tag className="text-xs h-[24px] leading-[23px] ml-2 rounded">
                {parVal.room_name}
              </Tag>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="text-primary flex items-center gap-1 text-sm">
                <button
                  onClick={() => {
                    navigate(`/booking-details/${val.order_id}`)
                  }}
                >
                  {t('calendar-page.view-bookings')}{' '}
                  <ArrowUpRightIcon className="text-[16px]" />
                </button>
              </li>
              {val.order_status !== 'reside' && (
                <li className="text-primary flex items-center gap-1 text-sm">
                  <button
                    type="button"
                    className="text-primary flex items-center gap-1 text-sm"
                    onClick={() =>
                      mutate({
                        id: val.order_item_id,
                        status: 'reside',
                        branch,
                      })
                    }
                  >
                    {t('common.check-in-a-guest')}{' '}
                    <ArrowUpRightIcon className="text-[16px]" />
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="text-primary flex items-center gap-1 text-sm"
                  onClick={() => setMoveGuestModal(true)}
                >
                  {t('common.relocate-guest')}{' '}
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
              // width: `calc(${100 * 0.5}% + ${0.5}px ${
              dayjs(val.date).diff(dayjs(val.order_start_date), 'day')
                ? '+ 50%'
                : ''
            })`,
          }}
          className={`absolute top-0 left-0 cursor-pointer h-full z-[1] px-4 py-[13px] bg-[#F8F8FA] dark:bg-dark-bg border-l-4 ${
            val.order_payment_status_key === 'half_paid'
              ? 'border-[#EAB308]'
              : val.order_payment_status_key === 'paid'
              ? 'border-[#2563EB]'
              : 'border-red-500'
          }  ${
            dayjs(val.date).diff(dayjs(val.order_start_date), 'day')
              ? ''
              : 'ml-[50%]'
          } ${differenceInDays < 2 ? 'overflow-hidden' : ''}`}
        >
          <div className="flex flex-col">
            <div className="text-xs sticky text-secondary-dark dark:text-secondary-light w-fit left-[170px] font-medium line-clamp-1 text-start mb-2">
              {`${val.guest_fullname}`}
              {/* <span className="font-normal ml-2 text-secondary">
                {val.order_source_name}
              </span> */}
            </div>
            <div className="flex w-fit gap-2 sticky line-clamp-1 left-[170px]">
              <span
                className={`text-[10px] px-2 h-[18px] m-0 rounded-sm  font-medium leading-[17px] ${
                  val.order_payment_status_key === 'half_paid'
                    ? 'text-[#EAB308]'
                    : val.order_payment_status_key === 'paid'
                    ? 'text-[#2563EB]'
                    : 'text-red-500'
                } ${
                  val.order_payment_status_key === 'half_paid'
                    ? 'bg-[#FEF9C3]'
                    : val.order_payment_status_key === 'paid'
                    ? 'bg-[#DBEAFE]'
                    : 'bg-[#FEE2E2]'
                }`}
              >
                {val.order_payment_status_key
                  ? val.order_payment_status_key === 'paid'
                    ? t('common.paid')
                    : val.order_payment_status_key === 'half_paid'
                    ? t('common.half_paid')
                    : val.order_payment_status_key === 'not_paid'
                    ? t('common.not_paid')
                    : val.order_payment_status_key
                  : ''}
              </span>
              {/* <span className="text-[10px] px-2 h-[18px] leading-[17px] m-0 bg-[#CCFBF1] font-medium rounded-sm text-[#115E59]">
                {val.arrival_time?.split(':').slice(0, -1).join(':')}
              </span> */}
            </div>
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
            icon={<AlertIcon className="text-[26px] text-primary" />}
          />
          <Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[10px]">
            {t('calendar-page.relocate-guest-modal-title')}
          </Text>
          <Text className="text-secondary leading-[25.6px] mb-[20px]">
            {t('calendar-page.relocate-guest-modal-description')}
          </Text>
          <Form
            form={form}
            className="w-full"
            layout="vertical"
            initialValues={{ current_date: [dayjs(), dayjs('2024-05-20')] }}
            // onFinish={(values) => console.log(values)}
          >
            <div className="flex gap-2 mb-6">
              <Form.Item
                name="current_room"
                label={t('fields.current_room.label')}
                className="min-w-[133px]"
              >
                <CSelect
                  disabled
                  size="large"
                  defaultValue={'TDL 204'}
                  options={[{ label: 'TDL 204', value: 'TDL 204' }]}
                />
              </Form.Item>
              <Form.Item
                name="current_date"
                label={t('fields.current_date.label')}
              >
                <DatePicker.RangePicker
                  size="large"
                  inputReadOnly
                  separator={null}
                  suffixIcon={t('fields.current_date.suffix')}
                  placeholder={[t('fields.current_date.placeholder'), '']}
                  className="hide-range-second-input h-[47px]"
                  disabled={true}
                />
              </Form.Item>
            </div>
            <div className="flex gap-2">
              <Form.Item
                name="new_room"
                label={t('fields.new_room.label')}
                className="min-w-[133px]"
              >
                <CSelect
                  size="large"
                  defaultValue={'TDL 204'}
                  options={[{ label: 'TDL 204', value: 'TDL 204' }]}
                />
              </Form.Item>
              <Form.Item name="new_date" label={t('fields.new_date.label')}>
                <DatePicker.RangePicker
                  size="large"
                  inputReadOnly
                  separator={null}
                  suffixIcon={t('fields.new_date.suffix')}
                  placeholder={[t('fields.new_date.placeholder'), '']}
                  className="hide-range-second-input h-[47px]"
                />
              </Form.Item>
            </div>

            {/* <div className=" bg-[#FEE2E2] rounded-lg mt-5 p-2">
              <Typography.Text className="text-base font-medium text-danger leading-[25.6px]">
                {t('calendar-page.relocate-guest-modal-notice')}
              </Typography.Text>
            </div> */}

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
                htmlType="submit"
                className="bg-white text-primary-dark border-primary-dark font-semibold"
                // onClick={() => {
                //   setIsBlocked(true)
                //   setMoveGuestModal(false)
                // }}
                // loading={isLoading}
              >
                {t('common.relocate')}
              </Button>
              <Button
                className="bg-primary-dark text-white font-semibold"
                htmlType="submit"
              >
                {t('common.booking-details')}
              </Button>
            </Space>
          </Form>
        </Flex>
      </Modal>
    </>
  )
}

export default memo(InfoBox)
