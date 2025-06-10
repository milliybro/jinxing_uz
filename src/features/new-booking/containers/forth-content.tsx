import {
  Button,
  DatePicker,
  Divider,
  Form,
  FormInstance,
  Input,
  Typography,
} from 'antd'

import DeleteIcon from '@/components/icons/delete'
import PlusIcon from '@/components/icons/plus'
// import CalendarIcon from '@/components/icons/calendar'
import CSelect from '@/components/cselect'
import { useTranslation } from 'react-i18next'
import CountrySelect from '@/components/country-select'
import { Dispatch, SetStateAction } from 'react'

const ForthContent = ({
  countries,
  isFetching,
  setPage,
  hasMore,
  setSearch,
}: {
  countries?: any
  form: FormInstance
  isFetching: boolean
  setPage: Dispatch<SetStateAction<number>>
  page: number
  hasMore: boolean
  setSearch: Dispatch<SetStateAction<string>>
}) => {
  const { t } = useTranslation()

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop === clientHeight && hasMore && !isFetching) {
      setPage((prev) => prev + 1)
    }
  }

  const handleSearch = (value: string) => {}

  // const defaultCountry = countries?.order_guests[0]?.country

  let currentLang = localStorage.getItem('i18nextLng') || 'ru'

  if (currentLang === 'uz') {
    currentLang = 'uz-cyrillic'
  } else if (currentLang === 'oz') {
    currentLang = 'uz-latin'
  }

  // const handleInputChange = (field: string, value: string) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }))
  // }

  return (
    <div className="flex flex-col max-h-[635px] h-full overflow-auto">
      <Typography.Text className="text-[18px] font-medium">
        {t('common.information-about-children')}
      </Typography.Text>
      <Divider />

      <Form.List name="guests">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key}>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <Form.Item
                      // name={`last_name-${index}`}
                      name={[name, 'last_name']}
                      fieldKey={[fieldKey ?? 0, 'last_name']}
                      label={t('new-booking-page.lastname.label')}
                      {...restField}
                    >
                      <Input
                        type="text"
                        placeholder={t('new-booking-page.lastname.placeholder')}
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      // name={`first_name-${index}`}
                      label={t('new-booking-page.name.label')}
                      name={[name, 'first_name']}
                      fieldKey={[fieldKey ?? 0, 'first_name']}
                      {...restField}
                    >
                      <Input
                        type="text"
                        placeholder={t('new-booking-page.name.placeholder')}
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      // name={`middle_name-${index}`}
                      label={t('new-booking-page.surname.label')}
                      name={[name, 'middle_name']}
                      fieldKey={[fieldKey ?? 0, 'middle_name']}
                      {...restField}
                    >
                      <Input
                        type="text"
                        placeholder={t('new-booking-page.surname.placeholder')}
                        size="large"
                      />
                    </Form.Item>
                  </div>

                  <div className="grid grid-cols-10 gap-4 mb-6">
                    <Form.Item
                      label={t('new-booking-page.birthdate.label')}
                      className="col-span-3"
                      name={[name, 'birthday']}
                      fieldKey={[fieldKey ?? 0, 'birthday']}
                      {...restField}
                    >
                      <DatePicker
                        format={{
                          format: 'DD.MM.YYYY',
                          type: 'mask',
                        }}
                        placeholder="DD.MM.YYYY"
                        size="large"
                        className="px-4 w-full h-[47px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label={t('fields.gender.label')}
                      name={[name, 'gender']}
                      fieldKey={[fieldKey ?? 0, 'gender']}
                      className="col-span-3"
                      {...restField}
                    >
                      <CSelect
                        size="large"
                        allowClear
                        showSearch={false}
                        options={[
                          { index: 1, value: 'male', label: t('common.male') },
                          {
                            index: 2,
                            value: 'female',
                            label: t('common.female'),
                          },
                        ]}
                        placeholder={t('fields.gender.placeholder')}
                      />
                    </Form.Item>
                    <Form.Item
                      label={t('new-booking-page.birthplace.label')}
                      className="col-span-3"
                      name={[name, 'birth_country']}
                      fieldKey={[fieldKey ?? 0, 'birth_country']}
                      {...restField}
                    >
                      <CountrySelect
                        size="large"
                        allowClear
                        showSearch
                        options={countries}
                        placeholder={t(
                          'new-booking-page.citizenship.placeholder',
                        )}
                        onSearch={handleSearch}
                        onPopupScroll={handleScroll}
                        onChange={(value) => {
                          if (!value) {
                            setSearch('')
                            setPage(1)
                          } else {
                            setSearch(value)
                            setPage(1)
                          }
                        }}
                        optionRender={(props: any) => {
                          return (
                            <div className="flex gap-4 items-center">
                              {props.label}
                            </div>
                          )
                        }}
                        tagRender={(props: any) => {
                          return (
                            <div className="flex gap-4 items-center">
                              {props.label}
                            </div>
                          )
                        }}
                        loading={isFetching}
                      />
                    </Form.Item>

                    <div className="flex flex-col justify-end">
                      <Button
                        danger
                        type="text"
                        className="text-base w-14 h-12 p-4 font-medium flex flex-col justify-end items-center border-[#EF4444]"
                        onClick={() => remove(name)}
                      >
                        <DeleteIcon className="text-[20px]" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="dashed"
                className="flex border-primary text-base text-primary items-center font-medium w-full justify-center"
                onClick={add}
              >
                <PlusIcon />
                {t('common.add-a-child')}
              </Button>
            </>
          )
        }}
      </Form.List>
    </div>
  )
}

export default ForthContent
