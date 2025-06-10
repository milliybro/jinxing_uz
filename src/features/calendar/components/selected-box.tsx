import dayjs from 'dayjs'
import Moveable from 'react-moveable'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Popover,
  Radio,
  Space,
  Typography,
} from 'antd'

import { postBlockReason } from '../api'

import BlockedBox from './blocked-box'
import AlertIcon from '@/components/icons/alert'
import ArrowUpRightIcon from '@/components/icons/arrow-up-right'

import type { FC } from 'react'
import type { IResult, IResultData } from '../types'
import { useNavigate } from 'react-router-dom'
import { useBranchIdStore } from '@/store/branch-id-store'

const { Text } = Typography

interface IProps {
  val: IResultData
  parVal: IResult
}

function daysUntilNextEvent(date: string, datas: IResult['data']) {
  const inputDate = dayjs(date)

  let startIndex = datas.findIndex((data) =>
    dayjs(data.date).isSame(inputDate, 'day'),
  )

  if (startIndex === -1) {
    throw new Error('Input date not found in the data array.')
  }

  for (let i = startIndex; i < datas.length; i++) {
    const currentData = datas[i]
    if (
      currentData.order_item_id !== null ||
      currentData.blocked_room_id !== null
    ) {
      const currentDate = dayjs(currentData.date)
      const diffDays = currentDate.diff(inputDate, 'day')
      return diffDays
    }
  }

  return -1
}

const SelectedBox: FC<IProps> = (props) => {
  const [form] = Form.useForm()
  const [width, setWidth] = useState(0)
  const targetRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [modalBlock, setModalBlock] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { branch } = useBranchIdStore()

  const [createdData, setCreatedData] = useState<{
    id: number
    start_date: string
    end_date: string
    reason: string
    reason_text: any
    room: number
    room_item: number
    created_at: string
  } | null>(null)

  const daysCount = Math.floor(width / 90)

  const reasons = [
    { value: 'storage', label: t('common.storage') },
    { value: 'electr', label: t('common.electrical-problems') },
    { value: 'repair', label: t('common.needs-renovation') },
    { value: 'another', label: t('common.another-reason') },
  ]

  const { mutate: blockMutate, isLoading } = useMutation({
    mutationFn: (values: any) => {
      const allValues = {
        ...values,
        start_date: props?.val.date,
        room: props?.parVal.room_id,
        room_item: props?.parVal.id,
        end_date: dayjs(props?.val.date)
          .add(daysCount, 'day')
          .format('YYYY-MM-DD'),
        branch,
      }
      return postBlockReason(allValues)
    },
    onSuccess: (values) => {
      // form.resetFields()
      setCreatedData(values)
      setIsBlocked(true)
      setModalBlock(false)
      setIsEditing(false)
    },
  })

  return (
    <div
      className={`w-full h-full`}
      onDoubleClick={() => {
        setIsEditing((prev) => !prev)
      }}
    >
      {isEditing ? (
        <>
          <Popover
            arrow={false}
            trigger="hover"
            placement="bottomRight"
            overlayClassName={`popover-shadow z-10 ${
              daysCount < 1 ? 'collapse pointer-events-none' : ''
            }`}
            content={
              <div className="flex flex-col">
                <div className="text-sm text-secondary mb-4">
                  {dayjs(props.val.date).format('DD MMMM, YYYY')} |{' '}
                  {dayjs(props.val.date)
                    .add(daysCount, 'day')
                    .format('DD MMMM, YYYY')}
                </div>
                <div className="text-[18px] mb-2 text-primary-dark font-bold">
                  3 680 000 UZS
                </div>

                <ul className="flex flex-col gap-2">
                  <li
                    onClick={() => navigate('/new-booking')}
                    className="text-primary flex items-center gap-1 text-sm cursor-pointer"
                  >
                    {t('common.new-booking')}{' '}
                    <ArrowUpRightIcon className="text-base" />
                  </li>
                  {/* <li className="text-primary flex items-center gap-1 text-sm">
                      {t('common.room-saving')}{' '}
                      <ArrowUpRightIcon className="text-base" />
                    </li> */}
                  <li>
                    <button
                      type="button"
                      className="text-primary flex items-center gap-1 text-sm"
                      onClick={() => setModalBlock(true)}
                    >
                      {t('common.block-dates')}
                      <ArrowUpRightIcon className="text-base" />
                    </button>
                  </li>
                </ul>
              </div>
            }
          >
            <div
              ref={targetRef}
              onDoubleClickCapture={() => {
                setWidth(0)
                setIsEditing(false)
              }}
              // onMouseLeave={() => setIsEditing(false)}

              style={{
                backgroundImage: 'url(../assets/blocked-img.png)',
              }}
              className={`absolute top-0 bg-repeat z-[1] flex  min-w-[45px] ml-[50%] items-center cursor-pointer text-xs font-medium left-0 bottom-0 
                ${
                  isBlocked
                    ? 'bg-primary-dark text-white'
                    : 'bg-primary-dark/10 dark:bg-primary/30'
                }`}
            >
              {isEditing && !isBlocked && width / 45 > 1 ? (
                <span className="ml-4 w-full line-clamp-1">
                  {daysCount +
                    ' ' +
                    (daysCount === 1 ? t('common.night') : t('common.nightss'))}
                </span>
              ) : null}
            </div>
          </Popover>
        </>
      ) : null}
      {isEditing && !isBlocked ? (
        <Moveable
          target={targetRef}
          resizable={true}
          keepRatio={true}
          throttleResize={90}
          // renderDirections={['w', 'e']}
          renderDirections={['e']}
          onResize={(e) => {
            setWidth(e.width)
            e.target.style.width = `${e.width}px`
            e.target.style.maxWidth = `${Math.floor(
              daysUntilNextEvent(props.val.date, props.parVal.data) * 100,
            )}%`
            // e.target.style.transform = e.drag.transform
          }}
        />
      ) : null}
      {isBlocked && !isEditing && createdData ? (
        <BlockedBox
          val={{
            br_start_date: createdData?.start_date,
            br_end_date: createdData?.end_date,
            date: props.val.date,
            br_reason: createdData?.reason,
          }}
        />
      ) : null}
      <Modal
        open={modalBlock}
        centered
        width={515}
        onOk={() => {
          setModalBlock(false)
          form.resetFields()
        }}
        onCancel={() => {
          setModalBlock(false)
          form.resetFields()
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
            className=" bg-[#FEE2E2] mb-5 border-[7px] border-[#FEF2F2]"
            icon={<AlertIcon className="text-[26px] text-danger" />}
          />
          <Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[10px]">
            {t('calendar-page.block-dates-modal-title')}
          </Text>
          <Text className="text-secondary leading-[25.6px] mb-[20px]">
            {t('calendar-page.block-dates-modal-description')}
          </Text>
          <Form
            form={form}
            className="w-full"
            layout="vertical"
            onFinish={blockMutate}
          >
            <Form.Item className="w-full" name="reason">
              <Radio.Group className="w-full">
                <Flex className="flex flex-col w-full">
                  {reasons.map((val, i) => (
                    <Radio
                      key={val.label + i}
                      value={val.value}
                      className="flex-row-reverse justify-between after:hidden after:content-none hover:bg-[#F8FAFC] px-3 py-[10px] font-medium w-full rounded-lg"
                    >
                      {val.label}
                    </Radio>
                  ))}
                </Flex>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.reason !== currentValues.reason
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('reason') === 'another' ? (
                  <Form.Item
                    className="w-full mt-5"
                    name="reason_text"
                    label="Опишите причину"
                  >
                    <Input.TextArea
                      placeholder="Принича"
                      className="h-[128px] resize-none"
                    />
                  </Form.Item>
                ) : null
              }
            </Form.Item>

            <Space className="mt-[28px]">
              <Button
                className="text-primary-dark dark:text-white font-semibold"
                onClick={() => {
                  setModalBlock(false)
                  form.resetFields()
                }}
              >
                {t('common.cancel')}
              </Button>
              <Button
                className="bg-primary-dark text-white font-semibold"
                htmlType="submit"
                // onClick={() => {
                //   setIsBlocked(true)
                //   setModalBlock(false)
                // }}
                loading={isLoading}
              >
                {t('common.block')}
              </Button>
            </Space>
          </Form>
        </Flex>
      </Modal>
    </div>
  )
}

export default SelectedBox
