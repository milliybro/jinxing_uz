import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="16"
      cy="11.5"
      rx="6.5"
      ry="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M22.5 16C22.5 17.1046 19.5899 18 16 18C12.4101 18 9.5 17.1046 9.5 16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M22.5 11.5V20.3C22.5 21.515 19.5899 22.5 16 22.5C12.4101 22.5 9.5 21.515 9.5 20.3V11.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <ellipse
      cx="9"
      cy="4.5"
      rx="6.5"
      ry="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6.5 11.5C4.60819 11.2698 2.86991 10.6745 2.5 9.5M6.5 16.5C4.60819 16.2698 2.86991 15.6745 2.5 14.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.5 21.5C4.60819 21.2698 2.86991 20.6745 2.5 19.5L2.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15.5 6.5V4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export default function CoinsIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
