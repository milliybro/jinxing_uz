import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.1667 15C15.8486 15 18.8333 12.0152 18.8333 8.33329C18.8333 4.65139 15.8486 1.66663 12.1667 1.66663C8.48477 1.66663 5.5 4.65139 5.5 8.33329C5.5 12.0152 8.48477 15 12.1667 15Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M3.1308 9.16663C2.52135 10.098 2.16699 11.2112 2.16699 12.4073C2.16699 15.6801 4.82014 18.3333 8.09296 18.3333C9.28908 18.3333 10.4023 17.979 11.3337 17.3695"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M14.667 10.4102C14.2683 11.1631 13.543 11.6667 12.7143 11.6667C11.4562 11.6667 10.4362 10.5059 10.4362 9.07408V7.59259C10.4362 6.16074 11.4562 5 12.7143 5C13.543 5 14.2683 5.50355 14.667 6.25645M9.66699 8.33333H12.9362"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
)

export default function CoinsEuroIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
