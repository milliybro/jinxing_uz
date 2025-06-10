import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 27 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.66602 13C2.66602 9.16772 2.66602 7.25158 3.80655 5.9723C3.98897 5.76769 4.19003 5.57846 4.40743 5.40677C5.76666 4.33333 7.80256 4.33333 11.8743 4.33333H15.1243C19.1961 4.33333 21.232 4.33333 22.5913 5.40677C22.8087 5.57846 23.0097 5.76769 23.1922 5.9723C24.3327 7.25158 24.3327 9.16772 24.3327 13C24.3327 16.8323 24.3327 18.7484 23.1922 20.0277C23.0097 20.2323 22.8087 20.4215 22.5913 20.5932C21.232 21.6667 19.1961 21.6667 15.1243 21.6667H11.8743C7.80256 21.6667 5.76666 21.6667 4.40743 20.5932C4.19003 20.4215 3.98897 20.2323 3.80655 20.0277C2.66602 18.7484 2.66602 16.8323 2.66602 13Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.332 17.3333H12.957"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.207 17.3333L19.9987 17.3333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66602 9.75H24.3327"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CreditCardIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
