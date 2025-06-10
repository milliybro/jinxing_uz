import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.08301 10.0007C2.08301 6.2687 2.08301 4.40273 3.24237 3.24335C4.40175 2.08398 6.26772 2.08398 9.99967 2.08398C13.7316 2.08398 15.5976 2.08398 16.757 3.24335C17.9163 4.40273 17.9163 6.2687 17.9163 10.0007C17.9163 13.7326 17.9163 15.5986 16.757 16.758C15.5976 17.9173 13.7316 17.9173 9.99967 17.9173C6.26772 17.9173 4.40175 17.9173 3.24237 16.758C2.08301 15.5986 2.08301 13.7326 2.08301 10.0007Z"
      stroke="#2563EB"
      stroke-width="1.25"
    />
    <path
      d="M6.66699 10.4167L8.75033 12.5L13.3337 7.5"
      stroke="#2563EB"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default function CheckMarkIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
