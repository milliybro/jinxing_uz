import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 2V10"
      stroke="#14B8A6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 6H10.5"
      stroke="#14B8A6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function AddIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
