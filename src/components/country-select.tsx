import { Select } from 'antd'

import type { SelectProps } from 'antd'
import type { FC, ReactNode } from 'react'
import ArrowDownIcon from './icons/arrow-down'

interface IProps extends SelectProps {
  prefixIcon?: ReactNode
  containerClassName?: string
}

const CountrySelect: FC<IProps> = (props) => {
  const { suffixIcon, prefixIcon, className, containerClassName, ...rest } =
    props

  return (
    <div className={`relative ${containerClassName || ''}`}>
      <Select
        {...rest}
        notFoundContent={null}
        defaultActiveFirstOption={false}
        labelInValue
        options={rest.options || []}
        suffixIcon={
          suffixIcon ? (
            suffixIcon
          ) : (
            <ArrowDownIcon className="text-base text-primary-dark dark:text-white pointer-events-none" />
          )
        }
        filterOption={false}
        className={`[&>.ant-select-selector]:px-4 ${className ?? ''} ${
          prefixIcon ? 'custom-select' : ''
        }`}
        {...{ autoComplete: 'none' }}
      />
      {prefixIcon ? (
        <span className="left-[16px] absolute top-[calc(50%-8px)] flex pointer-events-none">
          {prefixIcon}
        </span>
      ) : null}
    </div>
  )
}

export default CountrySelect
