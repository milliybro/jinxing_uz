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
      d="M1.66675 5L7.4276 8.26414C9.55141 9.4675 10.4487 9.4675 12.5726 8.26414L18.3334 5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M1.67989 11.2296C1.73436 13.7843 1.76161 15.0615 2.70421 16.0078C3.64681 16.954 4.95869 16.9869 7.58244 17.0528C9.1995 17.0935 10.8007 17.0935 12.4177 17.0528C15.0415 16.9869 16.3533 16.954 17.296 16.0078C18.2386 15.0615 18.2658 13.7843 18.3202 11.2296C18.3378 10.4082 18.3378 9.59171 18.3202 8.77029C18.2658 6.21568 18.2386 4.93837 17.296 3.99218C16.3533 3.04599 15.0415 3.01303 12.4177 2.9471C10.8007 2.90647 9.1995 2.90647 7.58243 2.94709C4.95869 3.01301 3.64681 3.04597 2.70421 3.99217C1.7616 4.93836 1.73436 6.21567 1.67988 8.77029C1.66236 9.59171 1.66237 10.4082 1.67989 11.2296Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  </svg>
)

export default function MailIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
