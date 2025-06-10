import {
  App,
  Button,
  Card,
  Col,
  Flex,
  Form,
  FormInstance,
  Row,
  Typography,
} from 'antd'
import { useTranslation } from 'react-i18next'

import useStepParams from '@/hooks/use-step-params'
import useNewBookingConfirmationStore from '@/store/new-booking-confirmation-store'

import ArrowLeftCircleIcon from '@/components/icons/arrow-left-circle'
import ArrowRightCircleIcon from '@/components/icons/arrow-right-circle'

import { getCountries } from '@/api'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import CloseIcon from '@/components/icons/close'
import {
  postAddGuestCreate,
  postPassportInfo,
} from '@/features/new-booking/api'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letters'
import { useBranchIdStore } from '@/store/branch-id-store'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { FC, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LatestStepModal from './guest-modal-fifth-step'
import FirstStepModal from './guest-modal-first-step'
import ForthStepModal from './guest-modal-forth-step'
import SecondStepModal from './guest-modal-second-step'
import GuestBookingSteps from './guest-modal-steps'
import ThirdStepModal from './guest-modal-third-step'

interface IProps {
  data: any
  setAddGuestModal: (open: boolean) => void
  form: FormInstance<any>
}
// interface IPassport {
//   id: number
//   datebegin: string
//   nationality: string
//   passport_issued_by: string
//   middle_name: string
//   phone: string
//   gender: string
//   first_name: string
//   last_name: string
//   docgiveplace: string
//   pinfl: number
// }

const INITIAL_COUNTRIES = [67, 68, 67, 70, 14, 67, 21]

const GuestBookingsList: FC<IProps> = ({ data, setAddGuestModal, form }) => {
  const { step, setStep, next, prev, searchParams, setSearchParams } =
    useStepParams()
  const { t } = useTranslation()

  // const [api, contextHolder] = notification.useNotification()
  const { setShow } = useNewBookingConfirmationStore((state) => state)
  const [placement, setPlacement] = useState(null)
  const [price, setPrice] = useState(0)
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [typeNumber, setTypeNumber] = useState<string | undefined>(undefined)
  const [editId, setEditId] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const navigation = useNavigate()
  const [formDatas, setFormData] = useState(null)
  const [passportInfo, setPassportInfo] = useState<any>()

  const { branch } = useBranchIdStore()

  useEffect(() => {
    const userData = localStorage.getItem('user_data')

    if (userData) {
      try {
        const parsedData = JSON.parse(userData)
        const branch = parsedData?.branch_user?.branch
        setPlacement(branch)
      } catch (error) {
        console.error('Error parsing user_data:', error)
      }
    } else {
    }
  }, [])

  const nextHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const updateStep = (step: number) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('step', step.toString())
        setSearchParams(newParams)
      }

      const fieldsByStep: { [key: number]: string[] } = {
        1: ['country', 'document_type', 'birthday', 'passport'],
        2: [
          'pinfl',
          'phone',
          'gender',
          'transit_country',
          'birth_country',
          'middle_name',
          'first_name',
          'last_name',
          'document_given_by',
          'document_given_date',
        ],
        3: [
          'start_date',
          'end_date',
          'tariff',
          'type_number',
          'number_room',
          'visit_type',
          'payment_status',
          'type_guest',
        ],
      }

      if (step < 5) {
        const currentFields = fieldsByStep[step]

        if (currentFields) {
          await form.validateFields(currentFields)
          next()
        } else {
          next()
        }
      } else if (step === 5) {
        await form.validateFields()
        sendMutate()
      }
    } catch (errorInfo: any) {
      console.error('Validation failed:', errorInfo)

      const checkErrorField = (fieldName: string, stepNumber: number) => {
        const isFieldError = errorInfo.errorFields.some(
          (field: any) => field.name[0] === fieldName,
        )
        if (isFieldError) {
          setStep(stepNumber)
          // updateStep(stepNumber)
        }
      }

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

      fieldsWithSteps.forEach(({ field, step }) => checkErrorField(field, step))

      if (errorInfo.errorFields.length > 0) {
        const firstErrorField = errorInfo.errorFields[0]
        const name = firstErrorField.name[0]

        const fieldInstance = form?.getFieldInstance(name)
        if (fieldInstance) {
          fieldInstance?.focus()
        }
      }
    }
  }

  const handleFormSubmit = (values: any) => {}

  //   const { data: countries } = useQuery({
  //     queryKey: ['regions-countries'],
  //     queryFn: async () => {
  //       const res = await getCountries()
  //       return res
  //     },
  //   })

  const { isFetching, data: countries } = useQuery(
    ['regions-countries', search],
    () => getCountries({ search, page_size: 250 }),
    {
      enabled: true,
      select: (data) => {
        const uniqueId: number[] = []
        return [
          ...data.results
            .map((country, i) => ({
              value: country?.id,
              label: capitalizeFirstLetters(country?.name),
              key: i,
            }))
            .filter((country) => {
              if (uniqueId.includes(country.value)) {
                return false
              } else {
                uniqueId.push(country.value)
                return true
              }
            })
            .sort((a, b) => a.label.localeCompare(b.label))
            .sort((a, b) =>
              INITIAL_COUNTRIES.includes(a.value) ? a.value - b.value : 1,
            ),
          // .sort((a, b) => (a.value === userInfo?.country ? -1 : 1)),
        ]
      },
    },
  )

  const location = useLocation()
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('edit')
    setEditId(id)
  }, [location.search])

  // const {
  //   data: order,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['order', editId],
  //   queryFn: async () => {
  //     if (editId) {
  //       const res = await getOrder({ id: editId })
  //       return res
  //     }
  //     throw new Error('editId is required')
  //   },
  //   enabled: !!editId,
  // })

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      // const [primaryGuest, ...otherGuests] = data.order_guests || []
      form.setFieldsValue({
        start_date: data?.start_date
          ? dayjs(data.start_date, 'YYYY-MM-DD')
          : null,
        end_date: data?.end_date ? dayjs(data.end_date, 'YYYY-MM-DD') : null,
        type_number: data?.items?.[0]?.room?.id,
        number_room: data?.items?.[0]?.room_item?.id,
        payment_status: data?.payment_status?.id,
        payment_amount: data?.total,
        // type_guest: primaryGuest?.guest_type,
        tariff: data?.items[0]?.tariff?.id,
        // guests: otherGuests.map((guest) => ({
        //   last_name: guest.last_name,
        //   first_name: guest.first_name,
        //   middle_name: guest.middle_name,
        //   birth_country: guest.birth_country,
        //   birthday: guest.birthday ? dayjs(guest.birthday, 'YYYY-MM-DD') : null,
        // })),
      })
    }
  }, [data, form])
  const formData = form?.getFieldsValue()

  const filteredGuests = formData?.guests?.map((guest: any) => ({
    birthday: guest.birthday.format('YYYY-MM-DD'),
    gender: guest?.gender,
    first_name: guest?.first_name,
    last_name: guest?.last_name,
    middle_name: guest?.middle_name,
    birth_country: guest?.birth_country,
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

  const payload = {
    first_name: finalData?.first_name,
    last_name: finalData?.last_name,
    middle_name: finalData?.middle_name,
    phone: finalData?.phone,
    document_type: finalData?.document_type,
    pinfl: finalData?.pinfl,
    passport: finalData?.passport,
    birthday: finalData?.birthday,
    document_given_date: finalData?.document_given_date,
    document_given_by: finalData?.document_given_by,
    guest: passportInfo?.id,
    main_guest: false,
    country: finalData?.country?.key,
    birth_country: finalData?.birth_country?.key,
    transit_country: finalData?.transit_country?.key,
    order: data?.id,
    order_item: data?.items[0]?.id,
    branch,
  }

  const { notification }: { notification: any } = App.useApp()
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

  const { mutate, isLoading } = useMutation({
    mutationFn: postAddGuestCreate,
    onSuccess: (e) => {
      setShow(false)
      // openNotification()
      setAddGuestModal(false)
      navigation(`/booking-details/${data?.id}`)
    },
    // onError: (error: any) => {
    //   console.error('Mutation error:', error)

    //   const status = error?.status
    //   if (status === 500) {
    //     console.error('Server Error:', 'server bilan ulanishda xatolik')
    //     openNotification(
    //       'error',
    //       'Server bilan ulanishda xatolik',
    //       'Iltimos, keyinroq urinib ko‘ring.',
    //     )
    //   } else {
    //     const errorMessage =
    //       error.request.response ||
    //       error.message ||
    //       'Buyurtmani yangilashda xatolik'
    //     console.error('Failed to update order:', errorMessage)
    //     openNotification('error', 'Xatolik', errorMessage)
    //   }
    // },
  })

  const sendMutate = () => {
    mutate(payload as any)
  }

  const { mutate: passportMutate } = useMutation({
    mutationFn: postPassportInfo,
    onSuccess: (data: any) => {
      setPassportInfo(data)
    },
  })
  const previousValues = useRef({ birthday: '', passport: '' })

  useEffect(() => {
    if (!formDatas) return

    const { birthday, passport } = formDatas

    if (birthday && passport) {
      if (
        birthday !== previousValues.current.birthday ||
        passport !== previousValues.current.passport
      ) {
        const birthDateFormatted = dayjs(birthday, 'DD.MM.YYYY').format(
          'YYYY-MM-DD',
        )

        const payload = {
          serialnumber_or_pinfl: passport,
          birth_date: birthDateFormatted,
          citizenship_id: 1,
        }

        passportMutate(payload as any)

        previousValues.current = { birthday, passport }
      }
    }
  }, [formDatas, passportMutate])

  useEffect(() => {
    if (passportInfo) {
      form.setFieldsValue({
        pinfl: passportInfo.pinfl,
        document_given_date: passportInfo.datebegin
          ? dayjs(passportInfo.datebegin, 'YYYY-MM-DD')
          : null,
        document_given_by: passportInfo.docgiveplace,
        last_name: passportInfo.last_name,
        first_name: passportInfo.first_name,
        gender: passportInfo.gender,
        phone: passportInfo.phone,
        middle_name: passportInfo.middle_name,
        passport_issued_by: passportInfo.passport_issued_by,
        nationality: passportInfo.nationality,
        birth_country: passportInfo.country?.id,
      })
    }
  }, [passportInfo])

  return (
    <div className="flex flex-col mt-6">
      <GuestBookingSteps />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        className="flex flex-col"
      >
        <div className="flex flex-col flex-1 mb-6">
          <div className="h-[50vh] overflow-auto">
            <div className={step === 1 ? '' : 'hidden'}>
              <FirstStepModal
                isFetching={isFetching}
                countries={countries}
                setSearch={setSearch}
                setFormData={setFormData}
                search={search}
              />
            </div>
            <div className={step === 2 ? '' : 'hidden'}>
              <SecondStepModal
                isFetching={isFetching}
                countries={countries}
                setSearch={setSearch}
                search={search}
                passportInfo={passportInfo}
              />
            </div>
            <div className={step === 3 ? '' : 'hidden'}>
              <ThirdStepModal
                price={price}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={startDate}
                endDate={endDate}
                setPrice={setPrice}
                setTypeNumber={setTypeNumber}
                typeNumber={typeNumber}
                data={data}
              />
            </div>
            <div className={step === 4 ? '' : 'hidden'}>
              <ForthStepModal
                countries={countries}
                form={form}
                isFetching={isFetching}
                setSearch={setSearch}
                search={search}
              />
            </div>
            <div className={step === 5 ? '' : 'hidden'}>
              <LatestStepModal />
            </div>
          </div>
        </div>
        <div className="flex justify-between bg-white sticky bottom-0 items-center">
          <button
            type="button"
            key={12}
            className={`flex items-center disabled:opacity-50 disabled:text-secondary gap-1 ${
              step >= 1 ? 'text-primary' : 'text-secondary/50'
            }`}
            onClick={prev}
            disabled={step === 1}
          >
            <ArrowLeftCircleIcon className="text-[20px]" />{' '}
            <span className="text-base leading-[20px] font-medium">
              {t('common.back')}
            </span>
          </button>
          <Button
            htmlType="button"
            className="flex items-center gap-1"
            onClick={nextHandler}
            type="primary"
            loading={isLoading}
          >
            <span
              className={`text-base leading-[20px] font-medium ${
                step === 5 ? 'py-[10px] px-3 rounded-[8px]' : ''
              }`}
            >
              {step === 5 ? t('common.add-guests') : t('common.continue')}
            </span>
            {step === 5 ? '' : <ArrowRightCircleIcon className="text-[20px]" />}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default GuestBookingsList
