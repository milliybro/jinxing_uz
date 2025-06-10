import { Select } from 'antd'

import ArrowDownIcon from '../icons/arrow-down'

import type { SelectProps } from 'antd'
import type { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
interface IProps extends SelectProps {
  prefixIcon?: ReactNode
  containerClassName?: string
}

const CSelect: FC<IProps> = (props) => {
  const { suffixIcon, prefixIcon, className, containerClassName, ...rest } =
    props

  const isClearAllowed = rest.allowClear !== undefined ? rest.allowClear : false

  return (
    <div className={`relative ${containerClassName ? containerClassName : ''}`}>
      <Select
        {...rest}
        // notFoundContent={rest.notFoundContent ?? <div>No options available</div>}
        defaultActiveFirstOption={false}
        rootClassName="group"
        suffixIcon={
          suffixIcon || (
            <ArrowDownIcon
              className={twMerge(
                'text-base text-primary-dark dark:text-white pointer-events-none',
                isClearAllowed && 'group-hover:opacity-0',
              )}
            />
          )
        }
        className={`w-full [&>.ant-select-selector]:px-4 ${className ?? ''} ${
          prefixIcon ? 'custom-select' : ''
        }`}
      />
      {prefixIcon ? (
        <span className="left-[16px] absolute top-[calc(50%-8px)] flex pointer-events-none">
          {prefixIcon}
        </span>
      ) : null}
    </div>
  )
}

export default CSelect
