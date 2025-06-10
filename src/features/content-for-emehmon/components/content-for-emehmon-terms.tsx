import { Divider, Form, TimePicker, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

// import CircleIcon from '@/components/icons/circle'
import CSelect from '@/components/cselect'
import { getPaymentType } from '@/features/payment-types/api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

const ContentForEMehmonTerms = () => {
  const { Text } = Typography
  const { t } = useTranslation()

  const { data: paymentTypes } = useQuery({
    queryKey: ['payment-types'],
    queryFn: getPaymentType,
  })

  // const circleColor = (value: string) => {
  //   return (
  //     <CircleIcon
  //       className={
  //         value === 'В номере'
  //           ? 'text-warn'
  //           : value === 'Подтверждено'
  //           ? 'text-primary'
  //           : value === 'Выехал' || value === 'canceled'
  //           ? 'text-danger'
  //           : 'text-secondary/50'
  //       }
  //     />
  //   )
  // }

  return (
    <div id="terms" className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="p-6 bg-white dark:bg-[#0F172A] rounded-xl w-full flex flex-col border dark:border-slate-800 gap-6">
          <Text className="text-2xl font-medium text-[#1E1E1E] dark:text-[#fcfcfc] leading-[30.6px]">
            {t('common.accommodation-terms')}
          </Text>
          <Divider />
          <div className="flex items-center gap-5 w-full">
            <Form.Item
              className="basis-1/2"
              label={t('common.check-in')}
              getValueProps={(value) => ({
                value: value ? dayjs(value) : null,
              })}
              name="checkin_start"
            >
              <TimePicker
                size="large"
                className="w-full"
                order={false}
                format="HH:mm"
                needConfirm={false}
                placeholder={t('common.no-restrictions')}
              />
            </Form.Item>
            <Form.Item
              className="basis-1/2"
              label={t('common.check-out')}
              getValueProps={(value) => ({
                value: value ? dayjs(value) : null,
              })}
              name="checkout_end"
            >
              <TimePicker
                size="large"
                className="w-full"
                order={false}
                format="HH:mm"
                needConfirm={false}
                placeholder={t('common.no-restrictions')}
              />
            </Form.Item>
          </div>
          {/* <Form.Item
              label={t('content-page.link-to-booking-conditions')}
              name="http"
            >
              <Input
                size="large"
                prefix={
                  <div className="text-[#6B7280] font-normal text-[15px]">
                    https://
                  </div>
                }
              />
            </Form.Item> */}
          <div className="flex gap-5 items-center">
            <Form.Item
              className="basis-1/2"
              label={t('common.children-beds')}
              name="children_allowed"
            >
              <CSelect
                size="large"
                placeholder={t('common.no-restrictions')}
                options={[
                  { label: t('common.allowed'), value: 'true' },
                  { label: t('common.restricted'), value: 'false' },
                ]}
              />
            </Form.Item>
            <Form.Item
              className="basis-1/2"
              label={t('common.age-restrictions')}
              name="age_allowed"
            >
              <CSelect
                size="large"
                placeholder={t('common.no-restrictions')}
                options={Array.from({ length: 12 }, (_, i) => ({
                  label: (i + 1).toString(),
                  value: (i + 1).toString(),
                }))}
              />
            </Form.Item>
          </div>
          <div className="flex items-center gap-5">
            <Form.Item
              className="basis-1/2"
              label={t('common.pets')}
              name="animals_allowed"
            >
              <CSelect
                size="large"
                placeholder={t('common.no-restrictions')}
                options={[
                  { label: t('common.allowed'), value: 'true' },
                  { label: t('common.restricted'), value: 'false' },
                ]}
              />
            </Form.Item>
            <Form.Item
              className="basis-1/2"
              label={t('common.payment-methods')}
              name="payment_types"
            >
              <CSelect
                size="large"
                placeholder={t('common.no-restrictions')}
                options={paymentTypes?.results?.map((type) => ({
                  key: type.id,
                  label: type.name,
                  value: type.id,
                }))}
                mode="multiple"
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentForEMehmonTerms
