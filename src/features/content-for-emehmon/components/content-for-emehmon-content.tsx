import { Divider, Form, FormInstance, Input, Tabs, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/cselect'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import YandexMapComponent from './yandex-map-content'
import { IHotelContentForm } from '../types'
import { getDistricts, getRegions } from '../api'
import queryClient from '@/utils/query-client'

const languages = [
  { label: 'English', lang: 'en' },
  { label: 'Русский', lang: 'ru' },
  { label: "У'збекча (Кириллица)", lang: 'uz_cyrillic' },
  { label: "O'zbekcha (Lotin)", lang: 'uz_latin' },
]

const ContentForEMehmonContent = ({
  form,
  setLang,
  lang,
}: {
  form: FormInstance<IHotelContentForm>
  lang: string
  setLang: any
}) => {
  const { Text } = Typography
  const { t, i18n } = useTranslation()
  const selectedRegion = Form.useWatch(['region'], form)

  const [districtSearch, setDistrictSearch] = useState<string>('')
  const [regionSearch, setRegionSearch] = useState<string>('')

  const resolveLang = (storedLang: any) => {
    return storedLang === 'oz'
      ? 'uz-latin'
      : storedLang === 'uz'
      ? 'uz-cyrillic'
      : storedLang || 'oz'
  }
  useEffect(() => {
    setLang(resolveLang(i18n.language))
  }, [i18n.language])
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const storedLang = i18n.language
  //     const resolvedLang =
  //       storedLang === 'oz'
  //         ? 'uz-latin'
  //         : storedLang === 'uz'
  //         ? 'uz-cyrillic'
  //         : storedLang || 'oz'
  //     setLang(resolvedLang)
  //   }

  //   window.addEventListener('storage', handleStorageChange)

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange)
  //   }
  // }, [i18n.language, lang])

  const { data: regions } = useQuery({
    queryKey: ['regions', regionSearch, lang],
    queryFn: async () => {
      const res = await getRegions({
        search: regionSearch,
      })
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        'district',
        districtSearch,
        selectedRegion,
      ])
    },
    enabled: true,
  })

  const { data: districts } = useQuery({
    queryKey: ['district', districtSearch, selectedRegion, lang],
    queryFn: async () => {
      const res = await getDistricts({
        search: districtSearch,
        region: selectedRegion,
      })
      return res
    },
    enabled: true,
  })

  return (
    <div id="basic-info" className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="p-6 bg-white dark:bg-[#0F172A] rounded-xl w-full flex flex-col border dark:border-slate-800 gap-6">
          <Text className="text-2xl font-medium dark:text-[#fcfcfc] text-[#1E1E1E] leading-[30.6px]">
            {t('common.basic-information')}
          </Text>
          <Divider />
          <Tabs
            rootClassName="custom-tabs-panel"
            items={languages.map((lan) => ({
              key: lan.lang,
              label: lan.label,
              children: (
                <div className="flex flex-col gap-6">
                  <Form.Item
                    label={t('content-page.hotel_name.label')}
                    name={['name', lan.lang]}
                    rules={[
                      { required: true, message: 'Это поле обязательно' },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder={t('content-page.hotel_name.placeholder')}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('content-page.hotel_description.label')}
                    name={['description', lan.lang]}
                    rules={[
                      { required: true, message: 'Это поле обязательно' },
                    ]}
                  >
                    <TextArea
                      placeholder={t(
                        'content-page.hotel_description.placeholder',
                      )}
                      style={{ height: 200, resize: 'none' }}
                    />
                  </Form.Item>
                </div>
              ),
              forceRender: true,
            }))}
          />
          <div className="flex gap-5 items-center">
            <Form.Item
              name="region"
              label={t('fields.regions.label')}
              className="basis-1/2"
            >
              <CSelect
                size="large"
                placeholder={t('fields.regions.placeholder')}
                options={regions?.results?.map((reg) => ({
                  label:
                    reg.name.charAt(0).toUpperCase() +
                    reg.name.slice(1).toLowerCase(),
                  value: reg.id,
                }))}
                value={selectedRegion}
                allowClear
                showSearch
                filterOption={false}
                searchValue={regionSearch}
                onSearch={setRegionSearch}
              />
            </Form.Item>

            <Form.Item
              name="district"
              label={t('fields.districts.label')}
              className="basis-1/2"
            >
              <CSelect
                size="large"
                placeholder={t('fields.districts.placeholder')}
                filterOption={false}
                options={districts?.results?.map((dist) => ({
                  label:
                    dist.name.charAt(0).toUpperCase() +
                    dist.name.slice(1).toLowerCase(),
                  value: dist.id,
                }))}
                allowClear
                showSearch
                searchValue={districtSearch}
                onSearch={setDistrictSearch}
              />
            </Form.Item>
          </div>
          <Form.Item label={t('content-page.address.label')} name="address">
            <Input
              size="large"
              placeholder={t('content-page.address.placeholder')}
            />
          </Form.Item>

          <Form.Item name="lat" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="long" hidden>
            <Input />
          </Form.Item>

          <div className="w-full">
            <YandexMapComponent
              lat={form.getFieldValue('lat')}
              long={form.getFieldValue('long')}
              form={form}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentForEMehmonContent
