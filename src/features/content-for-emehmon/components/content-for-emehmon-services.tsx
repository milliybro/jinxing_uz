import { Divider, Form, Typography } from 'antd'
import CSelect from '@/components/cselect'
// import CircleIcon from '@/components/icons/circle'
import CheckmarkIcon from '@/components/icons/checkmark'
import UncheckmarkIcon from '@/components/icons/uncheckmark'
import { useTranslation } from 'react-i18next'
import { ListResponse } from '@/types'
import { IFacility } from '../types'

const ContentForEMehmonServices = ({
  facilities,
}: {
  facilities?: ListResponse<IFacility[]>
}) => {
  const { Text } = Typography
  const { t } = useTranslation()

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
    <div id="services" className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="p-6 bg-white dark:bg-[#0F172A] rounded-xl w-full flex flex-col border dark:border-slate-800 gap-6">
          <Text className="text-2xl font-medium text-[#1E1E1E] dark:text-[#fcfcfc] leading-[30.6px]">
            {t('common.facilities-and-services')}
          </Text>
          <Divider />
          <Form.Item label={t('content-page.statuses.label')} name="facilities">
            <CSelect
              size="large"
              allowClear
              showSearch={false}
              options={facilities?.results.map((fc) => ({
                label: fc.name,
                value: fc.id,
              }))}
              mode="multiple"
              placeholder={t('content-page.statuses.placeholder')}
              optionRender={(props: any) => {
                return (
                  <div className="flex gap-4 items-center">
                    {/* {circleColor(props.label)} */}
                    <span className="font-medium">{props.label}</span>
                  </div>
                )
              }}
              menuItemSelectedIcon={({ isSelected }: any) =>
                isSelected ? <CheckmarkIcon /> : <UncheckmarkIcon />
              }
            />
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

export default ContentForEMehmonServices
