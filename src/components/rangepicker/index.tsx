import { Ref, useRef, useState } from 'react'
import { DatePicker } from 'antd'

import CalendarIcon from '../icons/calendar'

import type { FC } from 'react'
import type { RangePickerProps } from 'antd/es/date-picker'
import { useTranslation } from 'react-i18next'
import { Dayjs } from 'dayjs'

interface IProps extends RangePickerProps {
  singlePlaceholder?: string
  iconColor?: string
}

const RangePicker: FC<IProps> = (props) => {
  const [dates, setDates] = useState<null | [Dayjs, Dayjs]>(null)
  const [open, setOpen] = useState(false)
  const ref = useRef<any>(null)
  const { t } = useTranslation()

  const handleChange = (dates: any, dateString: [string, string]) => {
    setDates(dates)
  }

  const handleOpen = (open: boolean) => {
    setOpen(open)
  }

  // const defaultValue =
  //   Boolean(ref.current?.nativeElement?.children?.[0]?.children?.[0]?.value) ||
  //   Boolean(ref.current?.nativeElement?.children?.[2]?.children?.[0]?.value)

  // console.log(defaultValue)

  return (
    <div className="relative">
      <DatePicker.RangePicker
        ref={ref}
        {...props}
        placeholder={[
          t('common.select-perod-first') +
            ' ' +
            t('common.select-perod-second'),
          '',
        ]}
        separator={null}
        inputReadOnly
        className="pl-4 hide-range-second-input w-full custom-ant-picker h-[47px]"
        size="large"
        format="YYYY-MM-DD"
        suffixIcon={
          <CalendarIcon
            className={`text-base ${props.iconColor ?? 'text-success-dark'}`}
          />
        }
        onChange={handleChange}
        value={dates}
        onOpenChange={handleOpen}
      />
      {/* {((!dates || dates.every((item) => item === null)) && !open) ||
      defaultValue ? (
        <span className="text-secondary text-[15px] absolute left-11 pointer-events-none top-[50%] translate-y-[calc(-50%+0.5px)]">
          {props.singlePlaceholder}12312312
        </span>
      ) : null} */}
    </div>
  )
}

export default RangePicker
