import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.7002 10.0996C2.7002 14.5178 6.28192 18.0996 10.7002 18.0996C15.1184 18.0996 18.7002 14.5178 18.7002 10.0996C18.7002 5.68133 15.1184 2.09961 10.7002 2.09961"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M4.81846 4.56301C4.92914 4.44569 5.04319 4.3316 5.16049 4.22089M7.45747 2.68351C7.60268 2.61824 7.75011 2.55702 7.89961 2.5M3.28499 6.85354C3.21901 7.00014 3.15717 7.14902 3.09961 7.3"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0998 7.69922L10.6998 10.0992M10.6998 10.0992L8.2998 12.4992M10.6998 10.0992L13.0998 12.4992M10.6998 10.0992L8.2998 7.69922"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CancelCircleIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
