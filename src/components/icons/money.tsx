import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99998 13.5C7.11162 13.9149 5.94469 14.1667 4.66665 14.1667C3.95603 14.1667 3.27977 14.0888 2.66665 13.9484C1.61216 13.7069 1.33331 13.0864 1.33331 12.0907V4.90931C1.33331 4.25276 2.02667 3.80181 2.66665 3.9484C3.27977 4.08883 3.95603 4.16666 4.66665 4.16666C5.94469 4.16666 7.11162 3.9149 7.99998 3.49999C8.88834 3.08509 10.0553 2.83333 11.3333 2.83333C12.0439 2.83333 12.7202 2.91116 13.3333 3.05159C14.3878 3.29312 14.6666 3.91357 14.6666 4.90931V12.0907C14.6666 12.7472 13.9733 13.1982 13.3333 13.0516C12.7202 12.9112 12.0439 12.8333 11.3333 12.8333C10.0553 12.8333 8.88834 13.0851 7.99998 13.5Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M9.66665 8.49999C9.66665 9.42047 8.92045 10.1667 7.99998 10.1667C7.0795 10.1667 6.33331 9.42047 6.33331 8.49999C6.33331 7.57952 7.0795 6.83333 7.99998 6.83333C8.92045 6.83333 9.66665 7.57952 9.66665 8.49999Z"
      stroke="currentColor"
    />
    <path
      d="M3.66663 9.16666L3.66663 9.17264"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.3333 7.82812L12.3333 7.83411"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function MoneyIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
