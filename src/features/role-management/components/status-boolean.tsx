import { Tag } from 'antd'
import { memo } from 'react'

import type { FC } from 'react'

const StatusBooleanTags: FC<{ value: boolean }> = ({ value }) => {
  return (
    <Tag
      className={`h-[27px] leading-[26px] rounded-md ${
        value === false
          ? 'bg-primary-dark text-white border-primary-dark'
          : 'bg-white dark:bg-white/5'
      }`}
      style={{ boxShadow: '0px 1px 2px 0px #0000000D' }}
    >
      {value}
    </Tag>
  )
}

export default memo(StatusBooleanTags)
