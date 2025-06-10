import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.06706 10.7337C9.53982 10.7337 10.7337 9.53982 10.7337 8.06706C10.7337 6.5943 9.53982 5.40039 8.06706 5.40039C6.5943 5.40039 5.40039 6.5943 5.40039 8.06706C5.40039 9.53982 6.5943 10.7337 8.06706 10.7337ZM6.73372 8.06706C6.73372 7.33068 7.33068 6.73372 8.06706 6.73372C8.80344 6.73372 9.40039 7.33068 9.40039 8.06706C9.40039 8.80344 8.80344 9.40039 8.06706 9.40039C7.33068 9.40039 6.73372 8.80344 6.73372 8.06706ZM8.06706 8.73372C8.43525 8.73372 8.73372 8.43525 8.73372 8.06706C8.73372 7.69887 8.43525 7.40039 8.06706 7.40039C7.69887 7.40039 7.40039 7.69887 7.40039 8.06706C7.40039 8.43525 7.69887 8.73372 8.06706 8.73372Z"
      fill="white"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CircleIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
