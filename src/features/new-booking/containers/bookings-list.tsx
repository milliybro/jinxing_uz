import { Button, Card, Col, Flex, Form, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'

import useStepParams from '@/hooks/use-step-params'
import useNewBookingConfirmationStore from '@/store/new-booking-confirmation-store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useBranchIdStore } from '@/store/branch-id-store'

import ArrowLeftCircleIcon from '@/components/icons/arrow-left-circle'
import ArrowRightCircleIcon from '@/components/icons/arrow-right-circle'

import { ICountry } from '@/types'
import { getCountries } from '@/api'
import { getOrder, postPassportInfo } from '../api'
import BookingSteps from '../components/booking-steps'
import TotalPayable from '../components/total-payable'
import BookingSelectedRooms from '../components/booking-selected-rooms'
import FirstContent from './first-content'
import SecondContent from './second-content'
import ThirdContent from './third-content'
import LatestContent from './latest-content'
import ForthContent from './forth-content'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letters'

interface IPassport {
  id: number
  datebegin: string
  nationality: string
  passport_issued_by: string
  middle_name: string
  phone: string
  gender: string
  first_name: string
  last_name: string
  docgiveplace: string
  pinfl: number
  country: { id: number }
}

const INITIAL_COUNTRIES = [16, 2, 69, 71]

const BookingsList = () => {
  const { step, next, prev } = useStepParams()
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()
  // const [api, contextHolder] = notification.useNotification()
  const { setShow } = useNewBookingConfirmationStore((state) => state)
  const [form] = Form.useForm()
  const [placement, setPlacement] = useState(null)
  const [price, setPrice] = useState(0)
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [typeNumber, setTypeNumber] = useState<string | undefined>(undefined)
  const [editId, setEditId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState<ICountry[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [formData, setFormData] = useState(null)
  const [passportInfo, setPassportInfo] = useState<IPassport>()

  const passportInputData = Form.useWatch('passport', form)

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
      console.log('No user_data found in localStorage.')
    }
  }, [])

  const nextHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      if (step < 5) {
        next()
      } else if (step === 5) {
        setShow(true)
      }
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleFormSubmit = (values: any) => {
    form.isFieldsValidating()
  }

  const { isFetching } = useQuery(
    ['regions-countries', page, search],
    () => getCountries({ page, search, page_size: 250 }),
    {
      onSuccess: (data: any) => {
        setCountries(data.results)
      },
      cacheTime: 0,
    },
  )

  const location = useLocation()
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('edit')
    setEditId(id)
  }, [location.search])

  const { data: order } = useQuery({
    queryKey: ['order', editId],
    queryFn: async () => {
      if (editId) {
        const res = await getOrder({ id: editId, branch })
        return res
      }
      throw new Error('editId is required')
    },
    enabled: !!editId,
  })

  const { mutate } = useMutation({
    mutationFn: postPassportInfo,
    onSuccess: (data: any) => {
      setPassportInfo(data)
    },
  })

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

  useEffect(() => {
    if (order && Object.keys(order).length > 0) {
      const primaryGuest =
        order.order_guests?.find((guest) => guest.main_guest) ||
        order.order_guests?.[0]
      const otherGuests =
        order.order_guests?.filter(
          (guest) => guest !== primaryGuest && guest.child,
        ) || []

      form.setFieldsValue({
        country: primaryGuest?.country?.id,
        document_type: primaryGuest?.document_type,
        birthday: primaryGuest?.birthday
          ? dayjs(primaryGuest.birthday, 'YYYY-MM-DD')
          : null,
        passport: primaryGuest?.passport,
        pinfl: primaryGuest?.pinfl,
        document_given_date: primaryGuest?.document_given_date
          ? dayjs(primaryGuest.document_given_date, 'YYYY-MM-DD')
          : null,
        document_given_by: primaryGuest?.document_given_by,
        last_name: primaryGuest?.last_name,
        first_name: primaryGuest?.first_name,
        middle_name: primaryGuest?.middle_name,
        gender: primaryGuest?.gender,
        birth_country: primaryGuest?.birth_country?.id,
        transit_country: primaryGuest?.transit_country?.id,
        phone: primaryGuest?.phone,
        start_date: order?.start_date
          ? dayjs(order.start_date, 'YYYY-MM-DD')
          : null,
        end_date: order?.end_date ? dayjs(order.end_date, 'YYYY-MM-DD') : null,
        type_number: {
          key: order?.items?.[0]?.room?.id,
          label: order?.items?.[0]?.room?.name,
        },
        number_room: order?.items?.[0]?.room_item?.id,
        tariff: {
          value: order?.items?.[0]?.tariff?.id,
          label: order?.items?.[0]?.tariff?.name,
        },
        visit_type: order?.items?.[0]?.visit_type,
        payment_status: order?.payment_status?.id,
        payment_amount: order?.total,
        type_guest: primaryGuest?.guest_type,
        guests: otherGuests.map((guest) => ({
          last_name: guest.last_name,
          first_name: guest.first_name,
          middle_name: guest.middle_name,
          birth_country: guest.birth_country,
          birthday: guest.birthday ? dayjs(guest.birthday, 'YYYY-MM-DD') : null,
        })),
      })
    }
  }, [order, form])
  const previousValues = useRef({ birthday: '', passport: '' })
  useEffect(() => {
    if (!formData) return

    const { birthday, passport } = formData

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

        mutate(payload as any)

        previousValues.current = { birthday, passport }
      }
    }
  }, [formData, mutate])

  const countryOptions = Array.isArray(countries)
    ? countries
        .map((country) => ({
          index: country.id,
          value: country.id,
          label: capitalizeFirstLetters(country?.name),
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
        .sort((a, b) =>
          INITIAL_COUNTRIES.includes(a.value) ? a.value - b.value : 1,
        )
    : []

  // console.log('Order: ', formData)

  return (
    <Row gutter={[24, 24]} className="flex-1">
      <Col span={17} className="flex flex-col min-h-[65vh]">
        <BookingSteps />
        <Form
          form={form}
          className="grid grid-cols-1 gap-4 mb-6"
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Card
            className="flex flex-col h-full card-actions-shadow"
            styles={{ body: { flex: '1 1 0%' } }}
            actions={[
              <Button
                htmlType="button"
                type="text"
                key={12}
                className={`flex items-center disabled:opacity-50 disabled:text-secondary gap-1 ${
                  step >= 1 ? 'text-primary' : 'text-secondary/50'
                }`}
                onClick={prev}
                disabled={step === 1}
                size="small"
                icon={<ArrowLeftCircleIcon className="text-[20px]" />}
                iconPosition="start"
              >
                {t('common.back')}
              </Button>,
              <Button
                htmlType="button"
                type="text"
                className="flex justify-self-end gap-1 text-primary disabled:text-secondary/50"
                onClick={nextHandler}
                icon={<ArrowRightCircleIcon className="text-[20px]" />}
                iconPosition="end"
                size="small"
                disabled={step === 1 && passportInputData?.length < 5}
              >
                {t('common.continue')}
              </Button>,
            ]}
          >
            <div className={step === 1 ? '' : 'hidden'}>
              <FirstContent
                isFetching={isFetching}
                countries={countryOptions}
                setPage={setPage}
                page={page}
                hasMore={hasMore}
                setSearch={setSearch}
                search={search}
                setFormData={setFormData}
                order={order}
              />
            </div>
            <div className={step === 2 ? '' : 'hidden'}>
              <SecondContent
                isFetching={isFetching}
                countries={countryOptions}
                setPage={setPage}
                page={page}
                hasMore={hasMore}
                setSearch={setSearch}
                passportInfo={passportInfo}
              />
            </div>
            <div className={step === 3 ? '' : 'hidden'}>
              <ThirdContent
                price={price}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={startDate}
                endDate={endDate}
                setPrice={setPrice}
                setTypeNumber={setTypeNumber}
                typeNumber={typeNumber}
                order={order}
                form={form}
              />
            </div>
            <div className={step === 4 ? '' : 'hidden'}>
              <ForthContent
                countries={countryOptions}
                form={form}
                isFetching={isFetching}
                setPage={setPage}
                page={page}
                hasMore={hasMore}
                setSearch={setSearch}
              />
            </div>
            <div className={step === 5 ? '' : 'hidden'}>
              <LatestContent />
            </div>
          </Card>
        </Form>
      </Col>
      <Col span={7}>
        <Flex vertical gap={24}>
          <BookingSelectedRooms
            form={form}
            price={price}
            startDate={startDate}
            endDate={endDate}
            setTypeNumber={setTypeNumber}
            typeNumber={typeNumber}
            setFormData={setFormData}
            order={order}
            passportInfo={passportInfo}
            editId={editId}
          />
          <TotalPayable
            order={order}
            price={price}
            startDate={startDate}
            endDate={endDate}
          />
        </Flex>
      </Col>
    </Row>
  )
}

export default BookingsList
