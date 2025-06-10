import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="9.99935"
      cy="10.5013"
      r="8.33333"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12.9205 8.2536H6.66602M6.66602 8.2536L8.33268 6.75M6.66602 8.2536L8.33268 9.66667M6.66602 12.7252H13.3327M13.3327 12.7252L11.666 14.25M13.3327 12.7252L11.666 11.3333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function WithdrawIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
