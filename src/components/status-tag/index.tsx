import { Tag } from 'antd'
import { memo } from 'react'

import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

const StatusTag: FC<{ value: string | boolean }> = ({ value }) => {
  const { t } = useTranslation()

  return (
    <Tag
      className={`h-[27px] leading-[26px] rounded-md ${
        value === false ||
        value === 'Неактивный' ||
        value === 'Занято' ||
        value === 'Отдыхает' ||
        value === t('common.unworking')
          ? 'bg-primary-dark text-white border-primary-dark'
          : 'bg-white dark:bg-white/5'
      }`}
      style={{ boxShadow: '0px 1px 2px 0px #0000000D' }}
    >
      {value === 'Неактивный' ||
      value === 'Занято' ||
      value === 'Отдыхает' ||
      value === t('common.unworking') ||
      value ===  t('common.working')
        ? value
        : ''}
      {value === false ? t('common.inactive') : ''}
      {value === true ? t('common.active') : ''}
    </Tag>
  )
}

export default memo(StatusTag)
