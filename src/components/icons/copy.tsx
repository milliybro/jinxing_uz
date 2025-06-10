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
      d="M8.25 13C8.25 10.643 8.25 9.4645 8.98223 8.73223C9.7145 8 10.893 8 13.25 8H14.0833C16.4403 8 17.6188 8 18.3511 8.73223C19.0833 9.4645 19.0833 10.643 19.0833 13V13.8333C19.0833 16.1903 19.0833 17.3688 18.3511 18.1011C17.6188 18.8333 16.4403 18.8333 14.0833 18.8333H13.25C10.893 18.8333 9.7145 18.8333 8.98223 18.1011C8.25 17.3688 8.25 16.1903 8.25 13.8333V13Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.9159 7.99935C14.9139 5.53511 14.8767 4.25869 14.1593 3.38471C14.0208 3.21592 13.8661 3.06117 13.6973 2.92265C12.7753 2.16602 11.4056 2.16602 8.66602 2.16602C5.92645 2.16602 4.55667 2.16602 3.63471 2.92265C3.46592 3.06116 3.31117 3.21592 3.17265 3.38471C2.41602 4.30667 2.41602 5.67645 2.41602 8.41602C2.41602 11.1556 2.41602 12.5253 3.17265 13.4473C3.31116 13.6161 3.46592 13.7708 3.63471 13.9093C4.50869 14.6267 5.78511 14.6639 8.24935 14.6659"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CopyIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
