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
      d="M1.66663 4.16732C1.66663 3.06737 1.66663 2.5174 2.00833 2.17569C2.35004 1.83398 2.90002 1.83398 3.99996 1.83398C5.0999 1.83398 5.64988 1.83398 5.99158 2.17569C6.33329 2.5174 6.33329 3.06737 6.33329 4.16732C6.33329 5.26726 6.33329 5.81723 5.99158 6.15894C5.64988 6.50065 5.0999 6.50065 3.99996 6.50065C2.90002 6.50065 2.35004 6.50065 2.00833 6.15894C1.66663 5.81723 1.66663 5.26726 1.66663 4.16732Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M2.43788 10.9386C3.17426 10.2022 3.54245 9.83398 3.99998 9.83398C4.45751 9.83398 4.8257 10.2022 5.56208 10.9386C6.29846 11.6749 6.66665 12.0431 6.66665 12.5007C6.66665 12.9582 6.29846 13.3264 5.56208 14.0627C4.8257 14.7991 4.45751 15.1673 3.99998 15.1673C3.54245 15.1673 3.17426 14.7991 2.43788 14.0627C1.7015 13.3264 1.33331 12.9582 1.33331 12.5007C1.33331 12.0431 1.7015 11.6749 2.43788 10.9386Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M4 6.5V9.83333M6.66667 12.5H10"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 12.5013C10 11.4014 10 10.8514 10.3417 10.5097C10.6834 10.168 11.2334 10.168 12.3333 10.168C13.4333 10.168 13.9832 10.168 14.325 10.5097C14.6667 10.8514 14.6667 11.4014 14.6667 12.5013C14.6667 13.6012 14.6667 14.1512 14.325 14.4929C13.9832 14.8346 13.4333 14.8346 12.3333 14.8346C11.2334 14.8346 10.6834 14.8346 10.3417 14.4929C10 14.1512 10 13.6012 10 12.5013Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
)

export default function FlowConnectionIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
