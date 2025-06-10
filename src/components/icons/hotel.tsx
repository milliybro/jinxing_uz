import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 3.33398V16.6673C2.5 17.453 2.5 17.8458 2.74408 18.0899C2.98816 18.334 3.38099 18.334 4.16667 18.334H15.8333C16.619 18.334 17.0118 18.334 17.2559 18.0899C17.5 17.8458 17.5 17.453 17.5 16.6673V3.33398"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.75 6.66602V7.91602M8.75 7.91602V9.16602M8.75 7.91602H11.25M11.25 6.66602V7.91602M11.25 7.91602V9.16602"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.6666 18.3341V15.0007C11.6666 14.0802 10.9204 13.334 9.99992 13.334C9.07942 13.334 8.33325 14.0802 8.33325 15.0007V18.3341"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.66675 3.33268H6.66675C7.2 2.35541 8.4915 1.66602 10.0001 1.66602C11.5087 1.66602 12.8002 2.35541 13.3334 3.33268H18.3334"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 6.66602H5.83333M5 9.99935H5.83333M5 13.3327H5.83333"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1667 6.66602H15.0001M14.1667 9.99935H15.0001M14.1667 13.3327H15.0001"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function HotelIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
