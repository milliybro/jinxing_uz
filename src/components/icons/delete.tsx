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
      d="M21.625 5.95801L20.9536 16.8185C20.7821 19.5933 20.6963 20.9807 20.0008 21.9782C19.6569 22.4714 19.2142 22.8876 18.7008 23.2004C17.6623 23.833 16.2722 23.833 13.4921 23.833C10.7084 23.833 9.3165 23.833 8.27731 23.1992C7.76353 22.8858 7.32066 22.4689 6.97691 21.9749C6.28161 20.9758 6.19774 19.5865 6.02999 16.8078L5.375 5.95801"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10.25 12.7124H16.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M11.875 16.9585H15.125"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3.75 5.95817H23.25M17.8935 5.95817L17.1539 4.43254C16.6627 3.41912 16.417 2.9124 15.9933 2.59638C15.8993 2.52628 15.7998 2.46392 15.6957 2.40993C15.2265 2.1665 14.6634 2.1665 13.5372 2.1665C12.3827 2.1665 11.8054 2.1665 11.3285 2.42013C11.2227 2.47635 11.1219 2.54122 11.0269 2.6141C10.5982 2.94293 10.3588 3.46819 9.87995 4.5187L9.2238 5.95817"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export default function DeleteIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
