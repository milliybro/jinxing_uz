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
      d="M2.4668 7.16667C2.4668 7.16667 6.19776 3 10.8001 3C15.4025 3 19.1335 7.16667 19.1335 7.16667"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M18.7535 11.3708C19.0068 11.7261 19.1335 11.9037 19.1335 12.1667C19.1335 12.4296 19.0068 12.6072 18.7535 12.9625C17.615 14.5588 14.7078 18 10.8001 18C6.89245 18 3.98521 14.5588 2.84683 12.9625C2.59347 12.6072 2.4668 12.4296 2.4668 12.1667C2.4668 11.9037 2.59347 11.7261 2.84683 11.3708C3.98521 9.7745 6.89245 6.33333 10.8001 6.33333C14.7078 6.33333 17.615 9.7745 18.7535 11.3708Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M13.3008 12.1667C13.3008 10.7859 12.1815 9.66667 10.8008 9.66667C9.42003 9.66667 8.30078 10.7859 8.30078 12.1667C8.30078 13.5474 9.42003 14.6667 10.8008 14.6667C12.1815 14.6667 13.3008 13.5474 13.3008 12.1667Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
  </svg>
)

export default function ViewIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
