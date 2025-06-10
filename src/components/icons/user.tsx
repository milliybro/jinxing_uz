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
      d="M4.38505 10.8212C3.44187 11.3828 0.96891 12.5296 2.47511 13.9645C3.21087 14.6655 4.03033 15.1668 5.06058 15.1668H10.9394C11.9697 15.1668 12.7891 14.6655 13.5249 13.9645C15.0311 12.5296 12.5581 11.3828 11.615 10.8212C9.40321 9.50425 6.59679 9.50426 4.38505 10.8212Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 4.8335C11 6.49035 9.65685 7.8335 8 7.8335C6.34315 7.8335 5 6.49035 5 4.8335C5 3.17664 6.34315 1.8335 8 1.8335C9.65685 1.8335 11 3.17664 11 4.8335Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
  </svg>
)

export default function UserIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
