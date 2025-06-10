import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.1335 7.16666C19.1335 7.16666 15.8001 12.1667 10.8001 12.1667C5.80013 12.1667 2.4668 7.16666 2.4668 7.16666"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M13.3008 11.75L14.5508 13.8333"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M17.4668 9.66666L19.1335 11.3333"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M2.4668 11.3333L4.13346 9.66666"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M8.30078 11.75L7.05078 13.8333"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ViewOffIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
