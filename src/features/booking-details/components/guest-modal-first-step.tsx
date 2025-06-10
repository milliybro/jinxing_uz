import CountrySelect from '@/components/country-select'
import CSelect from '@/components/cselect'
import CalendarIcon from '@/components/icons/calendar'
import { DatePicker, Form, Input } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'

const FirstStepModal = ({
  countries,
  isFetching,
  setSearch,
  setFormData,
  search,
}: {
  countries?: any
  isFetching: boolean
  setSearch: Dispatch<SetStateAction<string>>
  setFormData: Dispatch<SetStateAction<any>>
  search: string
}) => {
  const { t } = useTranslation()
  const [isDriver, setIsDriver] = useState<boolean>(false)

  let currentLang = localStorage.getItem('i18nextLng') || 'ru'

  if (currentLang === 'uz') {
    currentLang = 'uz-cyrillic'
  } else if (currentLang === 'oz') {
    currentLang = 'uz-latin'
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex flex-col max-h-[635px] h-full overflow-auto">
      <div className="grid grid-cols-1 gap-4 mb-6">
        <Form.Item
          label={t('new-booking-page.citizenship.label')}
          name="country"
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
        >
          <CountrySelect
            size="large"
            allowClear
            showSearch
            options={countries}
            searchValue={search}
            placeholder={t('new-booking-page.citizenship.placeholder')}
            onSearch={setSearch}
            onSelect={() => setSearch('')}
            optionRender={(props: any) => {
              return (
                <div className="flex gap-4 items-center">{props.label}</div>
              )
            }}
            tagRender={(props: any) => {
              return (
                <div className="flex gap-4 items-center">{props.label}</div>
              )
            }}
            loading={isFetching}
          />
        </Form.Item>
        <Form.Item
          label={t('new-booking-page.document_type.label')}
          name="document_type"
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
        >
          <CSelect
            size="large"
            allowClear
            showSearch={false}
            options={[
              {
                index: 1,
                value: 'passport',
                label: t('common.passport'),
              },
              {
                index: 2,
                value: 'id_card',
                label: t('common.id-card'),
              },
              {
                index: 3,
                value: 'military_ticket',
                label: t('common.military-ticket'),
              },
              {
                index: 4,
                value: 'drivers_license',
                label: t('common.drivers-license'),
              },
              {
                index: 5,
                value: 'other',
                label: t('common.other'),
              },
            ]}
            onChange={(val) => {
              setIsDriver(val === 'drivers_license')
            }}
            placeholder={t('new-booking-page.document_type.placeholder')}
            optionRender={(props: any) => {
              return (
                <div className="flex gap-4 items-center">{props.label}</div>
              )
            }}
            tagRender={(props: any) => {
              return (
                <div className="flex gap-4 items-center">{props.label}</div>
              )
            }}
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          label={t('common.birthday')}
          name="birthday"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
        >
          <DatePicker
            format={{
              format: 'DD.MM.YYYY',
              type: 'mask',
            }}
            placeholder="DD.MM.YYYY"
            size="large"
            className="px-4 w-full h-[47px]"
            showNow={false}
            superPrevIcon={null}
            superNextIcon={null}
            onChange={(dateString: any) =>
              handleInputChange('birthday', dateString)
            }
            suffixIcon={<CalendarIcon className="text-base" />}
          />
        </Form.Item>

        <Form.Item
          name="passport"
          label={t('common.passport-details')}
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
        >
          <Input
            placeholder={isDriver ? 'Водительское удостоверение' : 'AC0000000'}
            maxLength={9}
            size="large"
            onBlur={(e) => handleInputChange('passport', e.target.value)}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default FirstStepModal
