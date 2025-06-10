import {
  App,
  Avatar,
  Button,
  Card,
  Flex,
  FormInstance,
  message,
  Modal,
  Space,
  Typography,
} from 'antd'
import { useNavigate } from 'react-router-dom'

import useNewBookingConfirmationStore from '@/store/new-booking-confirmation-store'

import ArrowUpRightIcon from '@/components/icons/arrow-up-right'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import CloseIcon from '@/components/icons/close'

import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getShortRooms, postOrderCreate, updateOrder } from '../api'
import BookingNotSelected from './booking-not-selected'
import SelectedBookingCard from './selected-booking-card'
import { useBranchIdStore } from '@/store/branch-id-store'
import useStepParams from '@/hooks/use-step-params'

const { Text } = Typography

const BookingSelectedRooms = ({
  typeNumber,
  price,
  startDate,
  endDate,
  form,
  passportInfo,
  order,
  editId,
}: {
  setTypeNumber: Dispatch<SetStateAction<string | undefined>>
  typeNumber: string | undefined
  price: number
  startDate: string | null
  endDate: string | null
  form?: FormInstance<any>
  setFormData?: any
  passportInfo: any
  order: any
  editId: any
}) => {
  const { t } = useTranslation()
  const navigation = useNavigate()
  const { notification }: { notification: any } = App.useApp()
  const { setShow, show } = useNewBookingConfirmationStore((state) => state)
  const { branch } = useBranchIdStore()
  const { step, setStep, next, prev, searchParams, setSearchParams } =
    useStepParams()

  const formData = form?.getFieldsValue()

  const filteredGuests = formData?.guests?.map((guest: any) => ({
    birthday: guest.birthday.format('YYYY-MM-DD'),
    gender: guest?.gender,
    first_name: guest?.first_name,
    last_name: guest?.last_name,
    middle_name: guest?.middle_name,
    birth_country: guest?.birth_country?.key,
    child: true,
  }))

  const newData = {
    citized: '',
    document_type: '',
    birthday: '',
    passport_number: '',
    pinfl: '',
    passport_start_date: '',
    passport_end_date: '',
    passport_given: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    birthday_country: '',
    lived_country: '',
    gender: '',
    start_date: '',
    end_date: '',
    type_number: '',
    number_room: '',
    lives_day: '',
    visit_type: '',
    payment_status: '',
    payment_amount: '',
    type_guest: '',
    children: {
      name: '',
      birthday: '',
      gender: '',
    },
  }

  const finalData = {
    ...newData,
    ...formData,
    guests: filteredGuests,
    start_date: formData?.start_date?.format('YYYY-MM-DD'),
    end_date: formData?.end_date?.format('YYYY-MM-DD'),
    document_given_date: formData?.document_given_date?.format('YYYY-MM-DD'),
    birthday: formData?.birthday?.format('YYYY-MM-DD'),
  }

  // console.log(order?.order_guests[0]?.id, 'finalData')
  useEffect(() => {
    // setFormData(finalData)
  })

  const formattedPhone = `+${finalData?.phone?.countryCode}${finalData?.phone?.areaCode}${finalData?.phone?.phoneNumber}`

  const payload = {
    items: [
      {
        // ...finalData,
        guests: [
          ...(finalData?.guests ?? []),
          {
            country: finalData?.country?.key,
            document_type: finalData?.document_type,
            passport: finalData?.passport,
            pinfl: finalData?.pinfl,
            jshshir: finalData?.jshshir,
            document_given_date: finalData?.document_given_date,
            document_given_by: finalData?.document_given_by,
            first_name: finalData?.first_name,
            last_name: finalData?.last_name,
            middle_name: finalData?.middle_name,
            birth_country: finalData?.birth_country?.key,
            transit_country: finalData?.transit_country?.key,
            gender: finalData?.gender,
            guest_type: finalData?.type_guest,
            phone: formattedPhone,
            birthday: finalData?.birthday,
            guest: order ? order?.order_guests[0]?.guest : passportInfo?.id,
            id: order?.order_guests[0]?.id,
            main_guest: true,
            child: false,
          },
        ],
        start_date: finalData?.start_date,
        end_date: finalData?.end_date,
        visit_type: finalData?.visit_type,
        room: order
          ? finalData?.type_number?.key
          : finalData?.type_number?.value,
        room_item: order
          ? finalData.number_room?.value
          : finalData.number_room?.value,
        ...(order ? { id: order.items[0]?.id } : {}),
        // payment_status: 1,
        tariff: finalData?.tariff?.value
          ? finalData?.tariff?.value
          : order?.items[0]?.tariff?.id,
        prices: [
          ...(order
            ? order.prices
                .filter((price: any) => {
                  const priceDate = dayjs(price.date)
                  // Ensure the price date is after or equal to start_date and strictly before end_date
                  return (
                    priceDate.diff(dayjs(finalData.start_date), 'day') >= 0 && // priceDate >= start_date
                    priceDate.diff(dayjs(finalData.end_date), 'day') < 0 // priceDate < end_date (exclude end_date)
                  )
                })
                .map((price: any) => ({ ...price }))
            : []),
          ...Array.from(
            {
              length: dayjs(finalData.end_date).diff(
                dayjs(finalData.start_date),
                'day',
              ),
            },
            (_, i) => ({
              price: order ? order?.items[0]?.price : price,
              date: dayjs(finalData.start_date)
                .add(i, 'day')
                .format('YYYY-MM-DD'),
            }),
          ),
        ].filter(
          (item, index, self) =>
            index === self.findIndex((p) => p.date === item.date),
        ),
      },
    ],
    placement: branch,
    payment_status: finalData.payment_status,
    branch,
  }

  const { mutate: updateMutate } = useMutation({
    mutationFn: (data: any) => updateOrder(data, editId),
    onSuccess: () => {
      openNotification()
      navigation(`/booking-details/${editId}`)
    },
  })

  const sendUpdate = () => {
    updateMutate(payload)
  }

  const { mutate } = useMutation({
    mutationFn: postOrderCreate,
    onSuccess: (data) => {
      setShow(false)
      // console.log(data)
      openNotification('info', 'Muvaffaqiyatli', 'Yangi bandlov yaratildi')
      navigation(`/booking-details/${data?.id}`)
    },
  })

  const sendMutate = () => {
    const updateStep = (step: any) => {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('step', step)
      setSearchParams(newParams)
    }

    form
      ?.validateFields()
      .then(() => {
        mutate(payload)
      })
      .catch((errorInfo) => {
        const checkErrorField = (fieldName: string, step: number) => {
          const isFieldError = errorInfo.errorFields.some(
            (field: any) => field.name[0] === fieldName,
          )
          if (isFieldError) {
            setStep(step)
            updateStep(step)
          }
        }
        setShow(false)
        const fieldsWithSteps = [
          { field: 'start_date', step: 3 },
          { field: 'end_date', step: 3 },
          { field: 'tariff', step: 3 },
          { field: 'type_number', step: 3 },
          { field: 'number_room', step: 3 },
          { field: 'visit_type', step: 3 },
          { field: 'payment_status', step: 3 },
          { field: 'type_guest', step: 3 },
          { field: 'pinfl', step: 2 },
          { field: 'phone', step: 2 },
          { field: 'gender', step: 2 },
          { field: 'transit_country', step: 2 },
          { field: 'birth_country', step: 2 },
          { field: 'middle_name', step: 2 },
          { field: 'first_name', step: 2 },
          { field: 'last_name', step: 2 },
          { field: 'document_given_by', step: 2 },
          { field: 'document_given_date', step: 2 },
          { field: 'country', step: 1 },
          { field: 'document_type', step: 1 },
          { field: 'birthday', step: 1 },
          { field: 'passport', step: 1 },
        ]

        fieldsWithSteps.forEach(({ field, step }) =>
          checkErrorField(field, step),
        )

        if (errorInfo.errorFields.length > 0) {
          const firstErrorField = errorInfo.errorFields[0]
          const name = firstErrorField.name[0]

          const fieldInstance = form?.getFieldInstance(name)
          if (fieldInstance) {
            fieldInstance?.focus()
          }
        }
      })
  }

  const { data: roomTypes } = useQuery({
    queryKey: ['room-type'],
    queryFn: async () => {
      const res = await getShortRooms({ branch })
      return res
    },
  })

  const typeName = roomTypes?.results?.find(
    (room) => room.id === typeNumber,
  )?.name

  const openNotification = (type = 'error', message = '', description = '') => {
    notification[type]({
      closeIcon: null,
      className: 'w-[406px] border-t-[5px] border-primary rounded-[12px]',
      icon:
        type === 'error' ? (
          <CloseIcon className="text-[24px] text-red-500" />
        ) : (
          <CheckmarkCircleIcon className="text-[24px] text-primary" />
        ),
      message: (
        <Typography.Text className="text-[18px] font-semibold leading-[22.95px]">
          {message}
        </Typography.Text>
      ),
      placement: 'topRight',
      description: description && (
        <Flex vertical>
          <Typography.Text className="text-secondary">
            {description}
          </Typography.Text>
        </Flex>
      ),
    })
  }

  return (
    <>
      <Card
        title={t('common.selected-number')}
        classNames={{ body: 'py-0 px-6' }}
      >
        <div className="max-h-[432px] h-full overflow-auto py-6">
          {price || order ? (
            <Flex vertical gap={24}>
              <SelectedBookingCard
                // setTypeNumber={setTypeNumber}
                typeNumber={typeNumber}
                price={price}
                startDate={startDate}
                endDate={endDate}
                order={order}
              />
            </Flex>
          ) : (
            <BookingNotSelected />
          )}
        </div>
      </Card>
      <Modal
        open={show}
        centered
        width={625}
        onOk={() => setShow(false)}
        onCancel={() => setShow(false)}
        classNames={{
          content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
      >
        <Flex vertical align="center" className="text-center">
          <Avatar
            shape="circle"
            size={62}
            className=" bg-[#BBF7D0] mb-5 border-[7px] border-[#DCFCE7]"
            icon={<CheckmarkCircleIcon className="text-[26px] text-success" />}
          />
          <Text className="text-[24px] font-bold dark:text-[#fcfcfc] text-primary-dark leading-[30.6px] mb-[10px]">
            {editId
              ? t('new-booking-page.edit-booking-confirmation')
              : t('new-booking-page.send-booking-confirmation')}
          </Text>
          <Text className="text-secondary leading-[25.6px] mb-[20px]">
            {t('new-booking-page.send-booking-confirmation-info')}
          </Text>
          <Space>
            <Button
              className="text-primary-dark dark:text-[#fcfcfc] font-semibold"
              onClick={() => setShow(false)}
            >
              {t('common.cancel')}
            </Button>
            {/* <Button
              className=" dark:text-[#fcfcfc] text-primary-dark font-semibold"
              // onClick={() => {
              //   setShow(false)
              //   openNotification()
              //   navigation('/booking-details/1')
              // }}
              onClick={editId ? sendUpdate : sendMutate}
            >
              {editId
                ? t('common.edit-without-sending')
                : t('common.continue-without-sending')}
              {/* {t('common.continue-without-sending')} 
            </Button> */}
            <Button
              className="bg-primary-dark text-white font-semibold"
              // onClick={() => {
              //   setShow(false)
              //   openNotification()
              //   navigation('/booking-details/1')
              // }}
              onClick={editId ? sendUpdate : sendMutate}
            >
              {editId
                ? t('common.edit-and-continue')
                : t('common.submit-and-continue')}
              {/* t('common.continue-without-sending') */}
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}

export default BookingSelectedRooms
