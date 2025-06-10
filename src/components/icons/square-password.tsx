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
      d="M16.1999 16.791H16.2096M10.793 16.791H10.8027"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.12411 20.4151C5.36773 22.2246 6.86646 23.6421 8.69028 23.726C10.2249 23.7965 11.7839 23.8333 13.5007 23.8333C15.2174 23.8333 16.7764 23.7965 18.311 23.726C20.1348 23.6421 21.6336 22.2246 21.8772 20.4151C22.0362 19.2342 22.1673 18.0241 22.1673 16.7917C22.1673 15.5592 22.0362 14.3491 21.8772 13.1682C21.6336 11.3588 20.1348 9.9412 18.311 9.85735C16.7764 9.7868 15.2174 9.75 13.5007 9.75C11.7839 9.75 10.2249 9.7868 8.69028 9.85735C6.86646 9.9412 5.36773 11.3588 5.12411 13.1682C4.96512 14.3491 4.83398 15.5592 4.83398 16.7917C4.83398 18.0241 4.96512 19.2342 5.12411 20.4151Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8.625 9.74935V7.04102C8.625 4.34863 10.8076 2.16602 13.5 2.16602C16.1924 2.16602 18.375 4.34863 18.375 7.04102V9.74935"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function SquarePassword(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
