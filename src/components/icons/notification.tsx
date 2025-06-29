import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.02992 14.7696C2.81727 16.1636 3.768 17.1312 4.93205 17.6134C9.39481 19.4622 15.6052 19.4622 20.0679 17.6134C21.232 17.1312 22.1827 16.1636 21.9701 14.7696C21.8394 13.9129 21.1932 13.1995 20.7144 12.5029C20.0873 11.5793 20.025 10.5718 20.0249 9.5C20.0249 5.35786 16.6559 2 12.5 2C8.34413 2 4.97513 5.35786 4.97513 9.5C4.97503 10.5718 4.91272 11.5793 4.28561 12.5029C3.80684 13.1995 3.16061 13.9129 3.02992 14.7696Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 19C8.95849 20.7252 10.5755 22 12.5 22C14.4245 22 16.0415 20.7252 16.5 19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function NotificationIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
