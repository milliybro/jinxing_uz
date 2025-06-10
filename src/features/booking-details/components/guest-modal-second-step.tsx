import CountrySelect from '@/components/country-select'
import CSelect from '@/components/cselect'
import CalendarIcon from '@/components/icons/calendar'
import { DatePicker, Form, Input } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

const SecondStepModal = ({
  countries,
  isFetching,
  setSearch,
  passportInfo,
  search,
}: {
  countries?: any
  isFetching: boolean
  setSearch: Dispatch<SetStateAction<string>>
  passportInfo: any
  search: string
}) => {
  const { t } = useTranslation()

  let currentLang = localStorage.getItem('i18nextLng') || 'ru'

  if (currentLang === 'uz') {
    currentLang = 'uz-cyrillic'
  } else if (currentLang === 'oz') {
    currentLang = 'uz-latin'
  }

  return (
    <div className="flex flex-col max-h-[635px]">
      <div className="grid grid-cols-1 gap-4 mb-6">
        <Form.Item
          label={t('new-booking-page.pinfl.label')}
          name="pinfl"
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
        >
          <Input
            disabled={passportInfo?.pinfl}
            placeholder={t('new-booking-page.pinfl.placeholder')}
            size="large"
            maxLength={14}
            type="number"
          />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          label={t('new-booking-page.passport.label')}
          name="document_given_date"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
        >
          <DatePicker
            disabled={passportInfo?.dateend}
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
            suffixIcon={<CalendarIcon className="text-base" />}
          />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          name="document_given_by"
          label={t('new-booking-page.passport-issuer.label')}
        >
          <Input
            disabled={passportInfo?.docgiveplace}
            placeholder={t('new-booking-page.passport-issuer.placeholder')}
            size="large"
          />
        </Form.Item>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            rules={[
              { required: true, message: t('tariff-plans-page.name.rule') },
            ]}
            name="last_name"
            label={t('new-booking-page.lastname.label')}
          >
            <Input
              disabled={passportInfo?.last_name}
              type="text"
              placeholder={t('new-booking-page.lastname.placeholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: t('tariff-plans-page.name.rule') },
            ]}
            name="first_name"
            label={t('new-booking-page.name.label')}
          >
            <Input
              disabled={passportInfo?.first_name}
              type="text"
              placeholder={t('new-booking-page.name.placeholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: t('tariff-plans-page.name.rule') },
            ]}
            name="middle_name"
            label={t('new-booking-page.surname.label')}
          >
            <Input
              disabled={passportInfo?.middle_name}
              type="text"
              placeholder={t('new-booking-page.surname.placeholder')}
              size="large"
            />
          </Form.Item>
        </div>
        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          label={t('new-booking-page.birthplace.label')}
          name="birth_country"
        >
          <CountrySelect
            size="large"
            allowClear
            showSearch
            options={countries}
            placeholder={t('new-booking-page.citizenship.placeholder-birth')}
            disabled={passportInfo?.country}
            onSearch={setSearch}
            searchValue={search}
            onChange={(value) => {
              if (!value) {
                setSearch('')
              }
            }}
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
            filterOption={false}
          />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          label={t('new-booking-page.origin_country.label')}
          name="transit_country"
        >
          <CountrySelect
            size="large"
            allowClear
            showSearch
            options={countries}
            placeholder={t('new-booking-page.citizenship.placeholder-where')}
            onSearch={setSearch}
            searchValue={search}
            onChange={(value) => {
              if (!value) {
                setSearch('')
              }
            }}
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
            filterOption={false}
          />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: t('tariff-plans-page.name.rule') },
          ]}
          label={t('new-booking-page.gender.label')}
          name="gender"
        >
          <CSelect
            disabled={passportInfo?.gender}
            size="large"
            allowClear
            showSearch={false}
            options={[
              {
                index: 1,
                value: 'male',
                label: t('common.male'),
              },
              {
                index: 2,
                value: 'female',
                label: t('common.female'),
              },
            ]}
            placeholder={t('new-booking-page.gender.placeholder')}
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
          name="phone"
          label={t('common.phone-number')}
          className="mb-2"
        >
          <Input type="text" size="large" />
        </Form.Item>
        {/* <Form.Item
          label={t('new-booking-page.arrival_date.label')}
          name="passport_end_date"
          className="[&>.ant-row]:h-full [&>.ant-form-item-control-input]:h-full"
        >
          <DatePicker
            format={'DD.MM.YYYY'}
            placeholder="DD.MM.YYYY"
            size="large"
            className="px-4 w-full h-[47px]"
            showNow={false}
            superPrevIcon={null}
            superNextIcon={null}
            suffixIcon={<CalendarIcon className=" text-base" />}
          />
        </Form.Item> */}
      </div>
    </div>
  )
}

export default SecondStepModal
