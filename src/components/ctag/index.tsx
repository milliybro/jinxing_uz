import { Tag, TagProps } from 'antd'

import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

const colorsClassNames = {
  warn: 'text-warn bg-warn/30',
  danger: 'text-danger bg-danger/30',
  departure: 'text-danger bg-danger/30',
  primary: 'text-primary bg-primary/30',
}

interface IProps extends TagProps {
  type?: 'arrival' | 'departure' | 'reside' | 'cancelled' | 'pre_booked'
}

const CTag: FC<IProps> = (props) => {
  const { t } = useTranslation()

  const tagTypesMap = {
    departure: {
      className: colorsClassNames.danger,
      text: t('common.departure'),
    },
    arrival: {
      className: colorsClassNames.primary,
      text: t('common.confirmed'),
    },
    reside: {
      className: colorsClassNames.warn,
      text: t('common.in-room'),
    },
    cancelled: {
      className: colorsClassNames.danger,
      text: t('common.cancelled'),
    },
    pre_booked: {
      className: colorsClassNames.primary,
      text: t('common.confirmed'),
    },
  }
  return (
    <Tag
      {...props}
      bordered={false}
      className={twMerge(
        'rounded-md h-[28px] leading-7 text-[12px] ${props.className}',
        props?.className,
        props.type ? tagTypesMap[props.type]?.className : '',
      )}
    >
      {props?.type ? tagTypesMap[props.type]?.text : props?.children}
    </Tag>
  )
}

export default CTag
