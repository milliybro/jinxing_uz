import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6953 11.1953C11.9556 10.9349 12.3777 10.9349 12.6381 11.1953L15.6381 14.1953C15.8984 14.4556 15.8984 14.8777 15.6381 15.1381C15.3777 15.3984 14.9556 15.3984 14.6953 15.1381L11.6953 12.1381C11.4349 11.8777 11.4349 11.4556 11.6953 11.1953Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.16666 7.33268C1.16666 3.65078 4.15143 0.666016 7.83333 0.666016C11.5152 0.666016 14.5 3.65078 14.5 7.33268C14.5 11.0146 11.5152 13.9993 7.83333 13.9993C4.15143 13.9993 1.16666 11.0146 1.16666 7.33268ZM7.83333 1.99935C4.88781 1.99935 2.5 4.38716 2.5 7.33268C2.5 10.2782 4.88781 12.666 7.83333 12.666C10.7788 12.666 13.1667 10.2782 13.1667 7.33268C13.1667 4.38716 10.7788 1.99935 7.83333 1.99935Z"
      fill="currentColor"
    />
  </svg>
)

export default function SearchIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
