import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.4549 8.10127L19.6256 9.47893M13.3466 12.2145L15.9319 12.9033M13.4752 19.9636L14.5093 20.2392C17.4343 21.0185 18.8967 21.4081 20.0489 20.7467C21.201 20.0853 21.5929 18.631 22.3766 15.7226L23.485 11.6094C24.2688 8.70089 24.6606 7.24665 23.9954 6.101C23.3302 4.95535 21.8678 4.56569 18.9428 3.78637L17.9087 3.51084C14.9837 2.73152 13.5212 2.34186 12.3691 3.0033C11.2169 3.66474 10.8251 5.11897 10.0413 8.02744L8.93295 12.1406C8.14921 15.0491 7.75733 16.5033 8.42253 17.649C9.08772 18.7946 10.5502 19.1843 13.4752 19.9636Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13.5003 23.1917L12.4686 23.4726C9.55052 24.2672 8.09148 24.6645 6.94203 23.9901C5.79259 23.3157 5.40164 21.8329 4.61974 18.8674L3.51396 14.6735C2.73206 11.708 2.34111 10.2252 3.00474 9.05712C3.5788 8.04666 4.83366 8.08345 6.45866 8.08333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export default function NoteIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
