import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.83337 7.16683C2.83337 4.65267 2.83337 3.39559 3.66324 2.61454C4.4931 1.8335 5.82875 1.8335 8.50004 1.8335H9.01519C11.1893 1.8335 12.2764 1.8335 13.0313 2.36539C13.2476 2.51778 13.4397 2.69851 13.6016 2.90209C14.1667 3.61261 14.1667 4.63573 14.1667 6.68198V8.37895C14.1667 10.3544 14.1667 11.3421 13.8541 12.131C13.3515 13.3992 12.2886 14.3996 10.9411 14.8726C10.103 15.1668 9.0535 15.1668 6.95459 15.1668C5.75521 15.1668 5.15552 15.1668 4.67656 14.9987C3.90657 14.7284 3.29921 14.1568 3.01202 13.4321C2.83337 12.9813 2.83337 12.4169 2.83337 11.288V7.16683Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M14.1667 8.5C14.1667 9.7273 13.1717 10.7222 11.9444 10.7222C11.5006 10.7222 10.9773 10.6444 10.5458 10.7601C10.1623 10.8628 9.86282 11.1623 9.76008 11.5458C9.64445 11.9773 9.72222 12.5006 9.72222 12.9444C9.72222 14.1717 8.7273 15.1667 7.5 15.1667"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83337 5.16699H10.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83337 7.8335H7.83337"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function FileIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
